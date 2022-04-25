require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const router = require('./routes');

// security
const helmet = require('helmet');
const cors = require('cors');

// connect DB
const db = require('./db');
db.connect();

// errors handler
const errorMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(helmet());
app.use(cors());
// route
router(app);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Example app listening on port ${port}`)})
