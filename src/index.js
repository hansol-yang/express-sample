const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

const { auth, posts } = require('./routes');
const { testDB } = require('./db');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/auth', auth);
app.use('/posts', posts);

app.listen(port, async () => {
    await testDB();
    console.log(`express-sample is listening on port ${port}`);
});
