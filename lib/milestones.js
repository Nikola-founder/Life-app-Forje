// Automatically breaks a goal into milestones based on how far away
// the target date is and what kind of goal it is. This is what powers
// "the app breaks my goals into milestones itself".

const PHASES_BY_CATEGORY = {
  education: [
    "Build the basics",
    "Deepen understanding",
    "Halfway through the syllabus",
    "Exam-ready practice",
    "Sit the exam / finish",
  ],
  career: [
    "Lay the groundwork",
    "Build momentum",
    "Halfway checkpoint",
    "Refine and polish",
    "Achieve the goal",
  ],
  health: [
    "Establish the routine",
    "Build consistency",
    "Halfway progress check",
    "Push past the plateau",
    "Reach the target",
  ],
  financial: [
    "Set up the plan",
    "First savings milestone",
    "Halfway to target",
    "Final stretch",
    "Target reached",
  ],
  personal: [
    "Get started",
    "Build the habit",
    "Halfway there",
    "Fine-tune the approach",
    "Complete the goal",
  ],
  creative: [
    "Sketch the concept",
    "Build the first draft",
    "Halfway through the project",
    "Refine the details",
    "Finish and share",
  ],
};

export const GOAL_CATEGORIES = Object.keys(PHASES_BY_CATEGORY);

function pickCheckpoints(totalDays) {
  if (totalDays <= 14) return [50, 100];
  if (totalDays <= 60) return [33, 66, 100];
  if (totalDays <= 180) return [25, 50, 75, 100];
  return [20, 40, 60, 80, 100];
}

/**
 * @param {string} category - one of GOAL_CATEGORIES
 * @param {string} startDateISO - yyyy-mm-dd, defaults to today
 * @param {string} targetDateISO - yyyy-mm-dd
 * @returns {Array<{title: string, target_date: string, order_index: number}>}
 */
export function generateMilestones(category, startDateISO, targetDateISO) {
  const start = startDateISO ? new Date(startDateISO) : new Date();
  const end = new Date(targetDateISO);
  const totalDays = Math.max(1, Math.round((end - start) / 86400000));
  const checkpoints = pickCheckpoints(totalDays);
  const labels = PHASES_BY_CATEGORY[category] || PHASES_BY_CATEGORY.personal;

  return checkpoints.map((pct, i) => {
    const offsetDays = Math.round((totalDays * pct) / 100);
    const date = new Date(start.getTime() + offsetDays * 86400000);
    return {
      title: labels[i] || `${pct}% milestone`,
      target_date: date.toISOString().slice(0, 10),
      order_index: i,
      is_done: false,
    };
  });
}
