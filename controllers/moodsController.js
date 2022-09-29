import Mood from "../models/Mood.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

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
  // console.log(typeof req.user.userId);
  // console.log(typeof mood.createdBy);

  checkPermissions(req.user, mood.createdBy);

  const updatedMood = await Mood.findOneAndUpdate({ _id: moodId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updatedMood });
};

const deleteMood = async (req, res) => {
  res.send("delete mood");
};
const showStats = async (req, res) => {
  res.send("show stats mood");
};

export { createMood, deleteMood, getAllMoods, updateMood, showStats };
