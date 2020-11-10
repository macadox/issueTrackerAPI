const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Issue = require('../models/issueModel');

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
      useFindAndModify: true,
      useUnifiedTopology: true,
    }
  )
  .then(() =>
    console.log(
      `Connected to DB ${process.env.DATABASE_NAME} as ${process.env.DATABASE_USER}`
    )
  );

const issues = fs.readFileSync(`${__dirname}/test-data.json`, {encoding: 'utf-8'});

const importData = async () => {
    try {
        await Issue.create(JSON.parse(issues));
        console.log('Data successfully imported!')
        process.exit()
    } catch (err) {
        console.log(err)
    }
}

const clearDb = async () => {
    try {
        await Issue.deleteMany({});
        console.log('Data successflly deleted')
        process.exit()
    } catch (err) {
        console.log(err)
    }
}


if (process.argv[2] == '--delete') {
    clearDb();
} else if (process.argv[2] == '--import') {
    importData();
} else {
    console.log('Command now known')
    process.exit()
}