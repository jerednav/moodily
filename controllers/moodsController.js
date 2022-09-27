import Mood from "../models/Mood.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const createMood = async (req, res) => {
  const { currentMood } = req.body;

  if (!currentMood) {
    throw new BadRequestError("Please provide current mood");
  }

  req.body.createdBy = req.user.userId;
  const mood = await Mood.create(req.body);

  res.status(StatusCodes.CREATED).json({ mood });
};
const deleteMood = async (req, res) => {
  res.send("delete mood");
};
const getAllMoods = async (req, res) => {
  res.send("get all moods");
};
const updateMood = async (req, res) => {
  res.send("update mood");
};
const showStats = async (req, res) => {
  res.send("show stats mood");
};

export { createMood, deleteMood, getAllMoods, updateMood, showStats };
