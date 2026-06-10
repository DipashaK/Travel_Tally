const mongoose = require("mongoose");

const planContentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, default: "Untitled Plan" },
  sections: {
    about: { type: String, default: "" },
    weather: { type: String, default: "" },
    activities: { type: String, default: "" },
    places: { type: String, default: "" },
    itinerary: { type: String, default: "" },
    cuisines: { type: String, default: "" },
    packing: { type: String, default: "" },
    bestTime: { type: String, default: "" },
    collaborate: { type: String, default: "" },
    settings: { type: String, default: "" },
  },
}, { timestamps: true });

module.exports = mongoose.model("PlanContent", planContentSchema);
