const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError } = require('../errors');

// [GET] /api/v1/job
const getAllJobs = async (req, res, next) => {
    // Sort jobs
    const { sort } = req.query;
    let tempJobs = Job.find({createdBy: req.user.userId}); 
    if (sort) {
        const sortList = sort.split(',').join(' ');
        tempJobs = tempJobs.sort(sortList);
    } else {
        tempJobs = tempJobs.sort("createdAt");
    }
    // paging
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 1;
    const skip = (page - 1) * limit;
    tempJobs = tempJobs.skip(skip);
    const jobs = await tempJobs;
    res.status(StatusCodes.OK).json({jobs, countJob: jobs.length});
}

// [GET] /api/v1/job/:id
const getSingleJob = async (req, res, next) => {
    const {user : {userId}, params: {id: jobId} } = req;
    const job = await Job.find({createdBy: userId, _id: jobId});
    if (!job) {
        throw new NotFoundError("No job with id " + jobId);
    }
    res.status(StatusCodes.OK).json({job});
}

// [POST] /api/v1/job
const createJob = async (req, res, next) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create({...req.body});
    res.status(StatusCodes.CREATED).json({ job });
}

// [PATCH] /api/v1/job/:id
const updateJob = async (req, res, next) => {
    const {body:{company, position}, user: {userId}, params: {id: jobId}} = req;
    if (company === '' || position === '') {
        throw new BadRequestError('Company and position fields cannot be empty');
    }
    const job = await Job.findOneAndUpdate({_id: jobId, createdBy: userId}, req.body, {new: true, runValidators: true});
    if (!job) {
        throw new NotFoundError('No job with id ' + jobId);
    }
    res.status(StatusCodes.OK).json({job})
}

// [DELETE] /api/v1/job/:id
const deleteJob = async (req, res, next) => {
    const {user:{userId}, params:{id:jobId}} = req
    const job = await Job.deleteOne({
        _id: jobId, createdBy: userId
    })
    if (!job) {
        throw new NotFoundError('No job with id' + jobId)
    }
    res.status(StatusCodes.OK).json({job})
}

module.exports = {getAllJobs, getSingleJob, createJob, updateJob, deleteJob}