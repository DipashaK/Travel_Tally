const express = require("express");
const router = express.Router();
const PlanContent = require("../models/PlanContent");

// Create a new plan
router.post("/", async (req, res) => {
  try {
    const { userId, title } = req.body;
    const plan = new PlanContent({ userId, title });
    const saved = await plan.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error creating plan", error: err.message });
  }
});

// Get a plan by ID
router.get("/:planId", async (req, res) => {
  try {
    const plan = await PlanContent.findById(req.params.planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: "Error fetching plan", error: err.message });
  }
});

// Update a specific section
router.put("/:planId/section/:sectionKey", async (req, res) => {
  try {
    const { planId, sectionKey } = req.params;
    const { content } = req.body;

    const update = {};
    update[`sections.${sectionKey}`] = content;

    const plan = await PlanContent.findByIdAndUpdate(
      planId,
      { $set: update },
      { new: true }
    );

    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: "Error updating section", error: err.message });
  }
});

// Delete section content
router.delete("/:planId/section/:sectionKey", async (req, res) => {
  try {
    const { planId, sectionKey } = req.params;

    const update = {};
    update[`sections.${sectionKey}`] = "";

    const plan = await PlanContent.findByIdAndUpdate(
      planId,
      { $set: update },
      { new: true }
    );

    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: "Error deleting section", error: err.message });
  }
});

// Optional: Delete entire plan
router.delete("/:planId", async (req, res) => {
  try {
    await PlanContent.findByIdAndDelete(req.params.planId);
    res.json({ message: "Plan deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting plan", error: err.message });
  }
});

module.exports = router;
