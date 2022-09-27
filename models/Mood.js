import mongoose from "mongoose";

const MoodSchema = new mongoose.Schema(
  {
    currentMood: {
      type: String,
      required: [true, "Please provide current mood"],
      maxlength: 20,
    },
    social: {
      type: String,
      enum: ["friends", "family", "gf/bf", "acquaintance", "none"],
    },
    weather: {
      type: String,
      enum: ["sunny", "cloudy", "rainy", "snowy", "windy"],
    },
    sleep: {
      type: String,
      maxlength: 20,
    },
    notes: {
      type: String,
      maxlength: 20,
    },
    moodLocation: {
      type: String,
      default: "my city",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamp: true }
);

export default mongoose.model("Mood", MoodSchema);
