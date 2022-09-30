import Mood from "../models/Mood.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";

const createMood = async (req, res) => {
  const { currentMood } = req.body;

  if (!currentMood) {
    throw new BadRequestError("Please provide current mood");
  }

  req.body.createdBy = req.user.userId;
  const mood = await Mood.create(req.body);

  res.status(StatusCodes.CREATED).json({ mood });
};
const getAllMoods = async (req, res) => {
  const moods = await Mood.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ moods, totalMoods: moods.length, numOfPages: 1 });
};
const updateMood = async (req, res) => {
  const { id: moodId } = req.params;
  const { currentMood, moodLocation } = req.body;

  if (!currentMood || !moodLocation) {
    throw new BadRequestError("Please provide all values");
  }
  const mood = await Mood.findOne({ _id: moodId });

  if (!mood) {
    throw new NotFoundError(`No mood with id :${moodId}`);
  }

  //check permissions
  checkPermissions(req.user, mood.createdBy);

  const updatedMood = await Mood.findOneAndUpdate({ _id: moodId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updatedMood });
};

const deleteMood = async (req, res) => {
  const { id: moodId } = req.params;

  const mood = await Mood.findOne({ _id: moodId });

  if (!mood) {
    throw new BadRequestError(`No mood with id :${moodId}`);
  }

  checkPermissions(req.user, mood.createdBy);

  await mood.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! mood removed" });
};
const showStats = async (req, res) => {
  let stats = await Mood.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$currentMood", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    currentMood: stats.currentMood || 0,
  };

  let monthlyMoods = [];
  res.status(StatusCodes.OK).json({ defaultStats, monthlyMoods });
};

export { createMood, deleteMood, getAllMoods, updateMood, showStats };
