export const sanitizeText = (text) =>
  text
    ?.replace(/^---$|^\s*---\s*$/gm, "")
    .replace(/\*/g, "")
    .replace(/:/g, "")
    .replace(/\n{2,}/g, "\n\n")
    .trim() || "";

export const extractSection = (text, startPattern, endPattern = null) => {
  const startRegex = new RegExp(startPattern, "i");
  const endRegex = endPattern ? new RegExp(endPattern, "i") : null;

  const startMatch = text.match(startRegex);
  if (!startMatch) return null;

  let section = text.substring(startMatch.index + startMatch[0].length).trim();

  if (endRegex) {
    const endMatch = section.match(endRegex);
    if (endMatch) {
      section = section.substring(0, endMatch.index).trim();
    }
  }

  return sanitizeText(section) || "No information available.";
};

export const parseAiPlan = (plan, destination) => {
  if (!plan) return {};

  const aboutPlace = extractSection(plan, `\\s*${destination}.*?\\n`, "\\*\\*Top Activities\\*\\*");
  const topActivities = extractSection(plan, "Top Activities", "Top Places to Visit");
  const topPlaces = extractSection(plan, "Top Places to Visit", "Itinerary");
  const itinerary = extractSection(plan, "Itinerary", "Local Cuisines");
  const localCuisines = extractSection(plan, "Local Cuisines", "Packing Checklist");
  const packingChecklist = extractSection(plan, "Packing Checklist", "Best Time to Visit");
  const bestTimeToVisit = extractSection(plan, "Best Time to Visit", "Budget");
  const budget = extractSection(plan, "Budget");

  return {
    aboutPlace, topActivities, topPlaces, itinerary,
    localCuisines, packingChecklist, bestTimeToVisit, budget,
  };
};

export const convertToList = (content, emoji = "✅") => {
  if (!content) return [];
  return content
    .split("\n")
    .filter((item) => item.trim() !== "")
    .map((item, index) => (
      <li key={index} className="flex items-start gap-2">
        <span>{emoji}</span>
        <span>{item.trim()}</span>
      </li>
    ));
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export const formatItinerary = (itinerary) => {
  if (!itinerary || typeof itinerary !== "string") return [];

  const timeIcons = { Morning: "🌅", Afternoon: "🌞", Evening: "🌇", Night: "🌙" };
  const cleaned = itinerary.trim();
  const days = cleaned.split(/(?=Day\s+\d+)/gi);

  return days
    .map((dayBlock, dayIndex) => {
      const lines = dayBlock.trim().split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      const title = lines.find((line) => /^Day\s+\d+/i.test(line)) || "";

      const sections = [];
      let currentPeriod = "";
      let currentItems = [];

      lines.forEach((line) => {
        const periodMatch = line.match(/^(Morning|Afternoon|Evening|Night)$/i);
        if (periodMatch) {
          if (currentPeriod && currentItems.length > 0) {
            sections.push({ period: currentPeriod, items: currentItems });
          }
          currentPeriod = capitalize(periodMatch[1]);
          currentItems = [];
        } else if (line.startsWith("-")) {
          currentItems.push(line.replace(/^-+\s*/, ""));
        } else if (currentPeriod) {
          currentItems.push(line);
        }
      });

      if (currentPeriod && currentItems.length > 0) {
        sections.push({ period: currentPeriod, items: currentItems });
      }

      if (sections.length === 0) return null;

      return { dayIndex, title, sections };
    })
    .filter(Boolean);
};

export const parseBudget = (budgetText) => {
  if (!budgetText) return null;

  const categories = [
    "Flights",
    "Stay",
    "Food",
    "Transport",
    "Activities",
  ];

  const entries = [];

  categories.forEach((category) => {
    const regex = new RegExp(
      `${category}[\\s\\S]*?Estimated Range\\s*:?\\s*([₹$€£]?)([\\d,]+)\\s*[-–]\\s*([₹$€£]?)([\\d,]+)`,
      "i"
    );

    const match = budgetText.match(regex);

    if (!match) return;

    const min = parseInt(match[2].replace(/,/g, ""));
    const max = parseInt(match[4].replace(/,/g, ""));

    entries.push({
      label: category,
      amount: Math.round((min + max) / 2),
    });
  });

  return entries.length ? entries : null;
};

export const parseCuisines = (rawText) => {
  if (!rawText) return [];

  const entries = rawText
    .split("🍽️")
    .map((block) => block.trim())
    .filter(Boolean);

  return entries.map((entry) => {
    const lines = entry.split("\n").map((line) => line.trim()).filter(Boolean);

    const name = lines[0];
    const descriptionLine = lines.find((l) => l.startsWith("Description"));
    const description = descriptionLine
      ? descriptionLine.replace("Description", "").trim().replace(/^[:-]\s*/, "")
      : "";

    const placeLines = lines.filter((l) => l.startsWith("-"));

    const places = placeLines.map((line) => {
      const match = line.match(/- (.*?), (.*?) – (.*)/);
      if (match) {
        return {
          name: match[1].trim(),
          area: match[2].trim(),
          reason: match[3].trim(),
        };
      } else {
        return {
          name: line.replace("-", "").trim(),
          area: "",
          reason: "",
        };
      }
    });

    return {
      name,
      description,
      places,
    };
  });
};