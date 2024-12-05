import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company Name is Required"],
    },
    position: {
      type: String,
      required: [true, "Position is Required"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["Pending", "Recject", "Interview"],
      default: "Pending",
    },
    WorkType: {
      type: String,
      enum: ["Full-Time", "Part Time", "Internship", "Contractor"],
      default: "Full-Time",
    },
    workLocation: {
      type: String,
      default: "Delhi",
      required: [true, "Work Location is Reuired"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("job", jobsSchema);
