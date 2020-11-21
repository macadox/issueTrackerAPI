const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An issue has to have a name!'],
    unique: true,
    minlength: [3, 'Minimum number of characters: 3'],
    maxlength: [60, 'Task cannot contain more than 30 characters'],
  },
  priority: {
    type: String,
    required: [true, 'An issue has to have a priority!'],
    enum: {
      values: ['MUST', 'SHOULD', 'COULD', 'WONT'],
      message: ['Task can either be a MUST, SHOULD, COULD or WONT'],
    },
  },
  difficulty: {
    type: Number,
    required: [true, 'An issue has to have a difficulty!'],
    min: [1, 'Minimum difficulty is 1'],
    max: [10, 'Maximum difficulty is 10'],
  },
  // assignees: [{ firstName: String, lastName: String, job: String }],
  description: String,
  acceptanceCriterias: [
    {
      criteria: {
        type: String,
        required: [true, 'Acceptance criteria has to have a name'],
        minlength: 10,
      },
      solved: {
        type: Boolean,
        default: false,
      },
      createdOn: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  deadline: {
    type: Date,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  lastModifiedOn: Date,
  lastModifiedBy: {
    type: String,
  },
  status: {
    type: String,
    default: 'New',
    required: [true, 'An issue has to have a status!'],
    enum: {
      values: ['New', 'In progress', 'Completed'],
      message: 'Task status can only be New, In progress or Completed',
    },
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: [true, 'An Issue must belong to a project!'],
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'An issue must have an author!'],
  },
  assignees: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  issueId: String,
});

// DOCUMENT Middleware: runs before .save() and .create()
issueSchema.pre('save', function (next) {
  this.modifiedOn = Date.now();
  console.log(Date.now());
  next();
});

issueSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author assignees',
    select: '-roles',
  });

  next();
});

// schema.pre('updateOne', { document: true, query: false }, function() {
//     console.log('Updating');
//   });

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
