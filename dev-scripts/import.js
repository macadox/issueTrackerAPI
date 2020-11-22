const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Issue = require('../models/issueModel');
const Project = require('../models/projectModel');
const User = require('../models/userModel');

dotenv.config({ path: './config.env' });

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${[
      process.env.DATABASE_PASSWORD,
    ]}@cluster0.a9ra5.mongodb.net/${
      process.env.DATABASE_NAME
    }?retryWrites=true`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() =>
    console.log(
      `Connected to DB ${process.env.DATABASE_NAME} as ${process.env.DATABASE_USER}`
    )
  );

const users = fs.readFileSync(`${__dirname}/users-data.json`, {
  encoding: 'utf-8',
});
const projects = fs.readFileSync(`${__dirname}/projects-data.json`, {
  encoding: 'utf-8',
});
const issues = fs.readFileSync(`${__dirname}/issues-data.json`, {
  encoding: 'utf-8',
});
const importData = async () => {
  try {
    await User.create(JSON.parse(users));
    await Project.create(JSON.parse(projects));
    await Issue.create(JSON.parse(issues));

    console.log('Data successfully imported!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const clearDb = async () => {
  try {
    await User.deleteMany({});
    await Project.deleteMany({});
    await Issue.deleteMany({});
    console.log('Data successflly deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] == '--delete') {
  clearDb();
} else if (process.argv[2] == '--import') {
  importData();
} else {
  console.log('Command now known');
  process.exit();
}
