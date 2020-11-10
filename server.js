const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');
mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.a9ra5.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true`,
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

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running on port ${process.env.PORT || 8080}`);
});
