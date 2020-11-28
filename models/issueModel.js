const mongoose = require('mongoose');
const Project = require('./projectModel');
const AppError = require('./../utils/appError');

const issueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An issue has to have a name!'],
    minlength: [3, 'Minimum number of characters: 3'],
    maxlength: [60, 'Task cannot contain more than 30 characters'],
  },
  issueId: { type: String },
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
  // lastModifiedOn: Date,
  // lastModifiedBy: {
  //   type: String,
  // },
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
});

// Unique issues for project
issueSchema.index({ name: 1, project: 1 }, { unique: true });

// DOCUMENT Middleware: runs before .save() and .create() Comment
// PRE SAVE
issueSchema.pre('save', function (next) {
  this.modifiedOn = Date.now();
  next();
});
if (process.env.NODE_ENV !== 'import') {
  issueSchema.pre('save', assignIssueId);
}
// QUERY Middleware
// Pre find
issueSchema.pre(/^find/, populateUserData);

// Post save (do not require next()); Comment
issueSchema.post('save', function () {
  this.constructor.calcProjectIssues(this.project);
});

// Also update, when findOneAndUpdate or findOneAndDeleteis used.
issueSchema.pre(/^findOneAnd/, async function (next) {
  this.i = await this.findOne();
  next();
});

issueSchema.post(/^findOneAnd/, async function () {
  this.i.constructor.calcProjectIssues(this.i.project);
});

// Static method (do not mix with instance methods) Comment
issueSchema.statics.calcProjectIssues = async function (projectId) {
  const stats = await this.aggregate([
    {
      $match: { project: projectId },
    },
    {
      $group: {
        _id: '$status',
        numIssues: { $sum: 1 },
      },
    },
  ]);

  const numCompletedIssues = stats.some((obj) =>
    Object.values(obj).includes('Completed')
  )
    ? stats.find((agg) => agg._id === 'Completed').numIssues
    : 0;
  const numInprogressIssues = stats.some((obj) =>
    Object.values(obj).includes('In progress')
  )
    ? stats.find((agg) => agg._id === 'In progress').numIssues
    : 0;
  const numNewIssues = stats.some((obj) => Object.values(obj).includes('New'))
    ? stats.find((agg) => agg._id === 'New').numIssues
    : 0;

  await Project.findByIdAndUpdate(projectId, {
    resolvedIssues: numCompletedIssues,
    unresolvedIssues: numInprogressIssues + numNewIssues,
  });
};

async function assignIssueId(next) {
  const project = await Project.findOne({ _id: this.project }).select(
    '+prefixSequence'
  );

  if (!project) {
    return next(new AppError('This project no longer exists!'));
  }
  this.issueId = project.prefix.concat(
    '-',
    project.prefixSequence.toString().padStart(3, '0')
  );
  // Save incrementation of the sequence
  project.prefixSequence = project.prefixSequence + 1;
  console.log(project)
  await project.save({ validateBeforeSave: false });
  next();
}

function populateUserData(next) {
  this.populate({
    path: 'author assignees',
    select: '-roles',
  });

  next();
}

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
