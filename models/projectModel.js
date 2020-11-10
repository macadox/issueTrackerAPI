const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A project must have a name!'],
    minlength: [5, 'Project name has to be at least 5 characters long'],
  },
  deadline: Date,
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  progress: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: 'Unreleased',
    enum: {
      values: ['Unreleased', 'In progress', 'Released'],
      message: 'Project status can only be Unreleased, In progress or Released',
    },
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A project must have an owner'],
  },
  teamMembers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
});

// projectSchema.pre(/^find/, function (func, next) {
//   // console.log(req)
//   // this.find({ $or: [{ owner: req.user._id }, { teamMembers: req.user._id }] });
//   next();
// });

projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'owner teamMembers',
    select: '-roles',
  });

  next();
});

module.exports = mongoose.model('Project', projectSchema);
