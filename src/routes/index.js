const authRouter = require('./auth');
const jobsRouter = require('./job');

// middleware
const authenticationUser = require('../middleware/authentication');

function route(app) {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/job', authenticationUser ,jobsRouter);
}

module.exports = route;
