import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";

//======== CREATE JOB ==========
export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please Provide all fields");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobsModel.create(req.body);
  res.status(201).json({ job });
};

//======= GET JOBS ======
export const getAlljobsController = async (req, res, next) => {
  const { status, workType, workLocation, serach, sort } = req.query;
  //condition for seraching filters
  const queryObject = {
    createdBy: req.user.userId,
  };
  //logic filters
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (workLocation && workLocation !== "all") {
    queryObject.workLocation = workLocation;
  }
  if (workLocation && workLocation !== "all") {
    queryObject.workLocation = workLocation;
  }
  //search
  if (serach) {
    queryObject.position = { $regex: serach, $options: "i" };
  }
  let queryResult = jobsModel.find(queryObject);

  //sorting
  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }
  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }
  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }
  if (sort === "z-a") {
    queryResult = queryResult.sort("-position");
  }

  //pagination
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const skip = (page - 1) * limit;

  queryResult = queryResult.skip(skip).limit(limit);
  //job count
  const totaJobs = await jobsModel.countDocuments(queryResult);
  const numOfPage = Math.ceil(totaJobs / limit);

  const jobs = await queryResult;

  //const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totaJobs,
    jobs,
    numOfPage,
  });
};

//======= UPDATE JOBS ======
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  //vali
  if (!company || !position) next("Please Provide all feilds");
  //find job
  const job = await jobsModel.findOne({ _id: id });
  //validation
  if (!job) {
    next(`no jobs found with this id ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("Your Not Authorized to update this job");
    return;
  }
  const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  //res
  res.status(200).json({ updateJob });
};

//======= DELETE JOBS ======
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  //find job
  const job = await jobsModel.findOne({ _id: id });
  if (!job) {
    next(`no jobs found with this id ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("Your Not Authorize to delete this job");
    return;
  }
  await job.deleteOne();
  res.status(200).json({ message: "Success, Job Deleted!" });
};

//======= JOBS STATS & FILTER ======
export const jobStatsController = async (req, res) => {
  const stats = await jobsModel.aggregate([
    //Search by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  //detaults stats
  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };

  //monthly yearly stats
  let monthlyApplication = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  res
    .status(200)
    .json({ totalJob: stats.length, stats, defaultStats, monthlyApplication });
};