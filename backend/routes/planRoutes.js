const express = require("express");
const axios = require("axios");
const Plan = require("../models/Plan");
const authenticateUser = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.post("/generate-plan", authenticateUser, async (req, res) => {
  const {
    destination,
    startDate,
    endDate,
    selectedActivities,
    selectedGroup,
    budget,
  } = req.body;

  const formatDate = (date) => date.toISOString().split("T")[0];

  const day1 = new Date(startDate);
  const day2 = new Date(day1);
  day2.setDate(day1.getDate() + 1);

  const day3 = new Date(day1);
  day3.setDate(day1.getDate() + 2);

  const day4 = new Date(day1);
  day4.setDate(day1.getDate() + 3);

  const formattedEndDate = formatDate(new Date(endDate));

  const prompt = `
Create a detailed travel plan for a trip to ${destination} from ${formatDate(
    day1
  )} to ${formattedEndDate}.

The plan should be structured using the **exact section headings** below so it can be parsed cleanly by a frontend renderer.

---

**About ${destination}**

Start this section with a heading like "${destination}" (as the first line).  
Provide a short, engaging history of the place.  
Mention key cultural highlights and major historical landmarks or events.  
Focus on need-to-know details for travelers — keep it concise but vivid.

---

**Top Activities**

Use short activity titles (1–2 words) and follow each with 1–2 line descriptions.  
Blend popular and offbeat activities (culture, food, adventure, relaxation, etc.)

---

**Top Places to Visit**

List iconic places — use 1–2 word names only. No descriptions needed.  
Include major landmarks, natural wonders, cultural spots, or quirky sites.

---

**Itinerary**

Create a detailed, day-by-day itinerary from ${formatDate(
    day1
  )} to ${formattedEndDate}.  
Follow this **exact format** for each day:

Day 1: Arrival & Initial Exploration (${formatDate(day1)})
Morning:
- Arrive at ${destination} and check into accommodation.
- Freshen up and rest.

Afternoon:
- Visit a nearby market or park.
- Casual local lunch.

Evening:
- Explore a vibrant neighborhood or shopping area.
- Optional cultural experience (e.g., food tour or exhibit).

Night:
- Dinner with traditional ${destination} cuisine.
- Return to hotel and relax.

Repeat similar structure for Day 2–5.  
Day 5 should be lighter with rest and departure.

---

**Local Cuisines**

List 4–6 dishes using **this exact structure**:

🍽️ [Dish Name]  
Description: [Brief 1-sentence description]  
Popular Places:  
- [Place Name], [Area] – [Why it’s good]  
- [Place Name], [Area] – [Why it’s good]  

---

**Packing Checklist**

List only essentials based on the destination’s climate and activities:  
- Clothing  
- Shoes  
- Adapters  
- Medications  
- Travel documents  
- Special gear (if needed)

---

**Best Time to Visit**

Mention the best months to visit.  
Add any important festivals, seasonal events, or travel tips (short & useful).

---

**Budget**

Break down typical costs into these categories:  
- Flights  
- Stay  
- Food  
- Transport  
- Activities  

For each, give an estimated range and include 1–2 quick money-saving tips.

---

Keep the entire plan concise, immersive, and structured.  
Use consistent formatting (like **bold**, emojis, and lists) to improve readability for travelers.
`;

  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await axios.post(
      apiUrl,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = response.data;

    if (data.candidates && data.candidates.length > 0) {
      const generatedPlan = data.candidates[0].content.parts[0].text;

      console.log("User ID:", req.user.userId);
      console.log("Generated Plan:", generatedPlan);

      const newPlan = new Plan({
        userId: req.user.id,
        destination,
        startDate,
        endDate,
        selectedActivities,
        selectedGroup,
        budget,
        aiPlan: generatedPlan,
      });

      const savedPlan = await newPlan.save();

      return res.json({
        aiPlan: generatedPlan,
        planId: savedPlan._id, // ✅ Send planId to frontend
        message: "Plan saved successfully!",
      });
    }

    res
      .status(500)
      .json({ error: "AI could not generate a plan. Please try again." });
  } catch (error) {
    console.error("Error generating plan:", error);
    res.status(500).json({ error: "Error fetching AI plan." });
  }
});

router.get("/get-plan", authenticateUser, async (req, res) => {
  try {
    const plans = await Plan.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(plans);
  } catch (err) {
    console.error("Error fetching user plans:", err);
    res.status(500).json({ error: "Failed to fetch plans" });
  }
});

router.get("/get-plan/:planId", authenticateUser, async (req, res) => {
  try {
    const { planId } = req.params;
    const plan = await Plan.findById(planId);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json(plan);
  } catch (error) {
    console.error("Error fetching plan:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Example route handler for /api/plans/profile
// auth.js (route)
router.get("/me", authenticateUser, (req, res) => {
  res.json({ user: req.user });
});

// Public route to view a shared plan by ID (no authentication)
router.get("/public/:planId", async (req, res) => {
  const planId = req.params.planId;
  const plan = await Plan.findById(planId).lean();

  if (!plan) {
    return res.status(404).json({ message: "Plan not found" });
  }

  // Return public info including invitedEmail
  res.json({
    planId: plan._id,
    invitedEmail: plan.invitedEmail, // Make sure this exists
    // ...any other public info you want to expose
  });
});

// PUT /api/plans/:planId/invite
router.put("/:planId/invite", async (req, res) => {
  try {
    const planId = req.params.planId;
    const { invitedEmail } = req.body;

    if (!invitedEmail) {
      return res.status(400).json({ message: "invitedEmail is required" });
    }

    // Update the invitedEmail in the plan
    const updatedPlan = await Plan.findByIdAndUpdate(
      planId,
      { invitedEmail: invitedEmail },
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json({
      message: "Invited email updated",
      invitedEmail: updatedPlan.invitedEmail,
    });
  } catch (error) {
    console.error("Error updating invitedEmail:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
