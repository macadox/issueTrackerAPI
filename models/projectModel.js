const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A project must have a name!'],
      minlength: [5, 'Project name has to be at least 5 characters long'],
      unique: true,
    },
    prefix: {
      type: String,
      validate: {
        validator: function (val) {
          return /^([A-Z]{2}\d{2}|[A-Z]{3}\d|[A-Z]{4})/.test(val);
        },
        message:
          'Project id must consist of four characters in following manner: CCDD, CCCD, CCCC',
      },
      uppercase: true,
      required: [true, 'A project must have a prefix'],
      unique: true,
    },
    prefixSequence: {
      type: Number,
      default: 1,
    },
    deadline: Date,
    createdOn: {
      type: Date,
      default: Date.now(),
    },
    icon: {
      type: String,
      default: function () {
        return `https://loremicon.com/grad/128/128/${Math.floor(
          Math.random() * 9999999
        )}/jpeg`;
      },
    },
    progress: {
      type: Number,
      default: 0,
    },
    resolvedIssues: {
      type: Number,
      default: 0,
    },
    unresolvedIssues: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: 'Not released',
      enum: {
        values: ['Not released', 'In progress', 'Testing', 'Released'],
        message:
          'Project status can only be Unreleased, In progress, Testing or Released',
      },
    },
    description: {
      type: String,
      required: [true, 'A project has to have a description'],
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    teamLead: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A project must have a team lead!'],
    },
    teamMembers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Users can find only their projects 
// projectSchema.pre(/^find/, async function (next) {
//   // console.log(req)
//   this.p = await this.findOne()
//   console.log(this.p);
//   // this.find({ $or: [{ teamLead: req.user._id }, { teamMembers: req.user._id }] });
//   next();
// });

projectSchema.virtual('numIssues').get(function () {
  return this.resolvedIssues + this.unresolvedIssues;
});

projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'teamLead teamMembers',
    select: '-roles',
  });

  next();
});

module.exports = mongoose.model('Project', projectSchema);
