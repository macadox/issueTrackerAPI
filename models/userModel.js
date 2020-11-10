const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name'],
    },
    email: {
      type: String,
      required: [true, 'A user must have an email'],
      validate: {
        validator: validator.isEmail,
        message: 'Email field has to have an email format',
      },
      unique: true,
      lowercase: true,
    },
    roles: [
      {
        type: String,
        required: [true, 'A user must have a role!'],
        enum: {
          values: [
            'developer',
            'designer',
            'product owner',
            'tester',
            'manager',
            'user',
            'admin',
          ],
          message:
            'role has to be a developer, designer, product owner, tester or manager',
        },
      },
    ],
    password: {
      type: String,
      required: [true, 'Please provide a password!'],
      minlength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please provide a password confirm!'],
      validate: {
        validator: function (val) {
          return this.password === val;
        },
        message: 'Passwords have to match',
      },
    },
    createdOn: {
      type: Date,
      default: Date.now(),
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('projects', {
  ref: 'Project',
  foreignField: 'teamMembers',
  localField: '_id',
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isNew) return next();

  if (this.roles.length == 0) this.roles.push('user');
  next();
});

userSchema.pre(/^find/, function (next) {
  this.select(
    '-__v -createdOn -passwordChangedAt -passwordResetExpires -passwordResetToken'
  );

  next();
});

userSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: '',
  // });

  next();
});

userSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.checkPasswordChangedAfterIat = function (JWTTimestamp) {
  // Compare JWT Timestamp with this.passwordChangedAt
  if (this.passwordChangedAt) {
    const timestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < timestamp;
  }
  return false;
};

userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  console.log(this.passwordResetToken, resetToken);
  this.passwordResetExpires =
    Date.now() + process.env.PASSWORD_RESET_EXPIRES * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
