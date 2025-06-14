const express = require("express");
const axios = require("axios");
const Plan = require("../models/Plan");
const authenticateUser = require("../middleware/authMiddleware");
const User = require("../models/User")

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
    The plan should include the following:
  
    **About ${destination}:**
    - Provide a brief history of ${destination}, including key events and cultural significance.
    - Mention any notable historical landmarks or periods that shaped the destination.
  
    **Top Activities:**
    - List and describe the top activities available in ${destination}.
    - Highlight both popular and unique activities that align with the traveler’s interests (e.g., nature, culture, food).
  
    **Top Places to Visit:**
    - Provide a list of must-visit attractions in ${destination}.
    - Include iconic landmarks, natural wonders, and cultural spots that should not be missed.
    - Only provide the names of the main places to be visited.
  
    **Itinerary:**
Create a detailed, day-by-day travel itinerary from ${formatDate(
    day1
  )} to ${formattedEndDate} for a trip to ${destination}. Tailor the activities to the traveler’s interests based on selected group and activity preferences.

Each day should have a clear structure with time blocks like Morning, Afternoon, Evening, and Night, and under each block list relevant activities. Format it exactly like this:

Day 1: Arrival & Initial Exploration (${formatDate(day1)})
Morning:
- Arrive at ${destination} and check into accommodation.
- Short rest or freshening up at hotel.

Afternoon:
- Visit a nearby market or local park for light exploration.
- Try a casual local lunch spot.

Evening:
- Explore popular neighborhood or shopping street.
- Optional cultural activity (e.g., art exhibit, live show, or food walk).

Night:
- Dinner at a restaurant offering traditional ${destination} cuisine.
- Return to hotel for rest.

Day 2: [Custom Title] (${formatDate(day2)})
Morning:
- Visit [Landmark A] or [Cultural Museum].
...

Day 3: ...
Day 4: ...
Day 5: Relaxation & Departure (${formattedEndDate})
Morning:
- Relax at hotel or nearby garden.
...

Be consistent in formatting, and ensure the structure is maintained for all 5 days. Make sure the activities reflect the interests provided and offer both popular and offbeat experiences. Keep descriptions concise and practical for travel planning.

  
    **Local Cuisines:**
    - Describe the top local dishes to try in ${destination}, including street food and fine dining options.
    - Mention where to find the best versions of these dishes and any must-try specialties.
  
    **Packing Checklist:**
    - Provide a packing list that includes essentials for the trip to ${destination}.
    - Consider clothing, accessories, and any special items needed (e.g., adapters, hiking gear, travel documents).
  
    **Best Time to Visit:**
    - Recommend the best time of year to visit ${destination}, taking into account weather, festivals, and peak tourist seasons.
    - Mention any key events or festivals that might enhance the travel experience.
  
    **Budget:**
    - Estimate a budget for the trip, breaking down costs by flights, accommodation, meals, activities, and local transportation.
    - Offer tips for saving money or finding more affordable options for each category.
  
    Ensure the itinerary is tailored to the traveler's interests, includes flexibility for spontaneous activities, and provides an immersive experience of ${destination}.
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
    invitedEmail: plan.invitedEmail,  // Make sure this exists
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

    res.json({ message: "Invited email updated", invitedEmail: updatedPlan.invitedEmail });
  } catch (error) {
    console.error("Error updating invitedEmail:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;