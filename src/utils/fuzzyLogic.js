/**
 * Mamdani Fuzzy Inference System for Student Academic-Risk Classification
 *
 * Inputs:
 * - Attendance (0 - 100%)
 * - Marks (0 - 100%)
 * - Assignment Performance (0 - 100%)
 *
 * Consequent:
 * - Academic Risk (0 - 100%) -> [Low Risk, Moderate Risk, High Risk]
 */

// Triangular Membership Function
export function trimf(x, a, b, c) {
  if (x < a || x > c) return 0;
  if (x === b) return 1;
  if (x > a && x < b) {
    return b === a ? 1 : (x - a) / (b - a);
  }
  if (x > b && x < c) {
    return c === b ? 1 : (c - x) / (c - b);
  }
  if (x === a) return a === b ? 1 : 0;
  if (x === c) return b === c ? 1 : 0;
  return 0;
}

// Trapezoidal Membership Function
export function trapmf(x, a, b, c, d) {
  if (x < a || x > d) return 0;
  if (x >= b && x <= c) return 1;
  if (x > a && x < b) {
    return b === a ? 1 : (x - a) / (b - a);
  }
  if (x > c && x < d) {
    return d === c ? 1 : (d - x) / (d - c);
  }
  if (x === a) return a === b ? 1 : 0;
  if (x === d) return c === d ? 1 : 0;
  return 0;
}

// Membership parameters for inputs (0 - 100)
export const MEMBERSHIP_PARAMS = {
  attendance: {
    low: [0, 0, 35, 55],       // trapmf (critical below 35, fades to 55)
    medium: [40, 65, 85],       // trimf (peaks at 65)
    high: [70, 85, 100, 100],   // trapmf (full above 85)
  },
  marks: {
    low: [0, 0, 35, 55],       // trapmf
    medium: [40, 60, 80],       // trimf
    high: [65, 82, 100, 100],   // trapmf
  },
  assignment: {
    low: [0, 0, 35, 55],       // trapmf
    medium: [40, 60, 80],       // trimf
    high: [65, 82, 100, 100],   // trapmf
  },
  risk: {
    low: [0, 0, 20, 42],        // trapmf
    moderate: [28, 50, 72],     // trimf
    high: [58, 80, 100, 100],   // trapmf
  },
};

// Compute membership values for a single input variable
export function calculateInputMemberships(value, params) {
  const clamped = Math.max(0, Math.min(100, Number(value) || 0));
  return {
    low: trapmf(clamped, ...params.low),
    medium: trimf(clamped, ...params.medium),
    high: trapmf(clamped, ...params.high),
  };
}

// Full 27-rule Mamdani Rule Base (3 x 3 x 3 combinations)
export const RULE_BASE = [
  // Attendance: Low
  { id: 1, att: 'low', marks: 'low', assign: 'low', risk: 'high' },
  { id: 2, att: 'low', marks: 'low', assign: 'medium', risk: 'high' },
  { id: 3, att: 'low', marks: 'low', assign: 'high', risk: 'high' },
  { id: 4, att: 'low', marks: 'medium', assign: 'low', risk: 'high' },
  { id: 5, att: 'low', marks: 'medium', assign: 'medium', risk: 'high' },
  { id: 6, att: 'low', marks: 'medium', assign: 'high', risk: 'moderate' },
  { id: 7, att: 'low', marks: 'high', assign: 'low', risk: 'moderate' },
  { id: 8, att: 'low', marks: 'high', assign: 'medium', risk: 'moderate' },
  { id: 9, att: 'low', marks: 'high', assign: 'high', risk: 'moderate' },

  // Attendance: Medium
  { id: 10, att: 'medium', marks: 'low', assign: 'low', risk: 'high' },
  { id: 11, att: 'medium', marks: 'low', assign: 'medium', risk: 'high' },
  { id: 12, att: 'medium', marks: 'low', assign: 'high', risk: 'moderate' },
  { id: 13, att: 'medium', marks: 'medium', assign: 'low', risk: 'moderate' },
  { id: 14, att: 'medium', marks: 'medium', assign: 'medium', risk: 'moderate' },
  { id: 15, att: 'medium', marks: 'medium', assign: 'high', risk: 'low' },
  { id: 16, att: 'medium', marks: 'high', assign: 'low', risk: 'moderate' },
  { id: 17, att: 'medium', marks: 'high', assign: 'medium', risk: 'low' },
  { id: 18, att: 'medium', marks: 'high', assign: 'high', risk: 'low' },

  // Attendance: High
  { id: 19, att: 'high', marks: 'low', assign: 'low', risk: 'high' },
  { id: 20, att: 'high', marks: 'low', assign: 'medium', risk: 'moderate' },
  { id: 21, att: 'high', marks: 'low', assign: 'high', risk: 'moderate' },
  { id: 22, att: 'high', marks: 'medium', assign: 'low', risk: 'moderate' },
  { id: 23, att: 'high', marks: 'medium', assign: 'medium', risk: 'low' },
  { id: 24, att: 'high', marks: 'medium', assign: 'high', risk: 'low' },
  { id: 25, att: 'high', marks: 'high', assign: 'low', risk: 'low' },
  { id: 26, att: 'high', marks: 'high', assign: 'medium', risk: 'low' },
  { id: 27, att: 'high', marks: 'high', assign: 'high', risk: 'low' },
];

/**
 * Evaluate Mamdani Fuzzy Inference System
 * @param {number} attendance - Attendance score (0 - 100)
 * @param {number} marks - Exam / marks score (0 - 100)
 * @param {number} assignment - Assignment score (0 - 100)
 */
export function evaluateAcademicRisk(attendance, marks, assignment) {
  const attVal = Math.max(0, Math.min(100, Number(attendance) || 0));
  const marksVal = Math.max(0, Math.min(100, Number(marks) || 0));
  const assignVal = Math.max(0, Math.min(100, Number(assignment) || 0));

  // 1. Fuzzification
  const muAtt = calculateInputMemberships(attVal, MEMBERSHIP_PARAMS.attendance);
  const muMarks = calculateInputMemberships(marksVal, MEMBERSHIP_PARAMS.marks);
  const muAssign = calculateInputMemberships(assignVal, MEMBERSHIP_PARAMS.assignment);

  // 2. Rule Evaluation & Consequent Aggregation (Mamdani Min operator)
  let maxLow = 0;
  let maxMod = 0;
  let maxHigh = 0;

  const evaluatedRules = RULE_BASE.map((rule) => {
    const wAtt = muAtt[rule.att];
    const wMarks = muMarks[rule.marks];
    const wAssign = muAssign[rule.assign];

    // Firing strength alpha = min(wAtt, wMarks, wAssign)
    const firingStrength = Math.min(wAtt, wMarks, wAssign);

    if (rule.risk === 'low') maxLow = Math.max(maxLow, firingStrength);
    if (rule.risk === 'moderate') maxMod = Math.max(maxMod, firingStrength);
    if (rule.risk === 'high') maxHigh = Math.max(maxHigh, firingStrength);

    const description = `IF Attendance is ${rule.att.toUpperCase()} (${wAtt.toFixed(2)}) AND Marks is ${rule.marks.toUpperCase()} (${wMarks.toFixed(2)}) AND Assignment is ${rule.assign.toUpperCase()} (${wAssign.toFixed(2)}) THEN Risk is ${rule.risk.toUpperCase()}`;

    return {
      ...rule,
      wAtt,
      wMarks,
      wAssign,
      firingStrength,
      description,
    };
  });

  const activeRules = evaluatedRules
    .filter((r) => r.firingStrength > 0.0001)
    .sort((a, b) => b.firingStrength - a.firingStrength);

  // Consequent clipping heights
  const consequentStrengths = {
    low: maxLow,
    moderate: maxMod,
    high: maxHigh,
  };

  // 3. Defuzzification (Centroid Method / Center of Gravity)
  // Domain y in [0, 100] with fine step resolution
  const steps = 200;
  let numerator = 0;
  let denominator = 0;
  const aggregatedCurve = [];

  for (let i = 0; i <= steps; i++) {
    const y = (i / steps) * 100;

    // Membership in consequence sets
    const muRiskLow = trapmf(y, ...MEMBERSHIP_PARAMS.risk.low);
    const muRiskMod = trimf(y, ...MEMBERSHIP_PARAMS.risk.moderate);
    const muRiskHigh = trapmf(y, ...MEMBERSHIP_PARAMS.risk.high);

    // Mamdani implication (min) and aggregation (max)
    const clipLow = Math.min(maxLow, muRiskLow);
    const clipMod = Math.min(maxMod, muRiskMod);
    const clipHigh = Math.min(maxHigh, muRiskHigh);

    const muAgg = Math.max(clipLow, clipMod, clipHigh);

    numerator += y * muAgg;
    denominator += muAgg;

    aggregatedCurve.push({ y, muAgg, clipLow, clipMod, clipHigh });
  }

  // Defuzzified crisp value
  const defuzzifiedValue = denominator > 0 ? numerator / denominator : 50;
  const roundedValue = Math.round(defuzzifiedValue * 100) / 100;

  // 4. Classification & Diagnostic recommendations
  let riskLevel = 'Low Risk';
  let riskBadgeColor = 'emerald';
  let riskDescription = 'Student is performing consistently well and maintains satisfactory academic standing.';

  if (roundedValue >= 60) {
    riskLevel = 'High Risk';
    riskBadgeColor = 'rose';
    riskDescription = 'Student is at critical academic risk. Immediate intervention and academic counselling required.';
  } else if (roundedValue >= 35) {
    riskLevel = 'Moderate Risk';
    riskBadgeColor = 'amber';
    riskDescription = 'Student shows signs of academic vulnerability. Needs targeted remedial support and regular monitoring.';
  }

  // Targeted recommendations based on individual metrics
  const recommendations = [];
  if (attVal < 60) {
    recommendations.push({
      metric: 'Attendance',
      alert: `Attendance is critically low (${attVal}%). Schedule an attendance recovery session and issue caution notice.`,
      severity: 'critical',
    });
  } else if (attVal < 75) {
    recommendations.push({
      metric: 'Attendance',
      alert: `Attendance (${attVal}%) is bordering minimum requirement (75%). Monitor regularity.`,
      severity: 'warning',
    });
  }

  if (marksVal < 50) {
    recommendations.push({
      metric: 'Exam Marks',
      alert: `Exam score is deficient (${marksVal}%). Assign peer tutor and schedule chapter-wise revision tests.`,
      severity: 'critical',
    });
  } else if (marksVal < 70) {
    recommendations.push({
      metric: 'Exam Marks',
      alert: `Exam score (${marksVal}%) is average. Focus on core conceptual problem-solving.`,
      severity: 'warning',
    });
  }

  if (assignVal < 50) {
    recommendations.push({
      metric: 'Assignments',
      alert: `Assignment submission score is low (${assignVal}%). Review pending submissions and enforce deadlines.`,
      severity: 'critical',
    });
  } else if (assignVal < 70) {
    recommendations.push({
      metric: 'Assignments',
      alert: `Assignment quality is moderate (${assignVal}%). Provide constructive feedback on recent reports.`,
      severity: 'warning',
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      metric: 'Overall',
      alert: 'All metrics are strong! Encourage participation in honors projects and advanced seminars.',
      severity: 'success',
    });
  }

  return {
    inputs: {
      attendance: attVal,
      marks: marksVal,
      assignment: assignVal,
    },
    memberships: {
      attendance: muAtt,
      marks: muMarks,
      assignment: muAssign,
    },
    consequentStrengths,
    allRules: evaluatedRules,
    activeRules,
    defuzzifiedValue: roundedValue,
    riskLevel,
    riskBadgeColor,
    riskDescription,
    recommendations,
    aggregatedCurve,
  };
}

// Student Presets for quick evaluation
export const STUDENT_PRESETS = [
  {
    name: 'Critical At-Risk',
    badge: 'High Risk',
    color: 'rose',
    attendance: 20,
    marks: 25,
    assignment: 15,
    desc: 'Severe attendance deficit, failing test marks, incomplete assignments.',
  },
  {
    name: 'Exam Deficient (Diligent)',
    badge: 'Moderate Risk',
    color: 'amber',
    attendance: 88,
    marks: 35,
    assignment: 65,
    desc: 'Attends lectures regularly and submits assignments, but struggles with written exams.',
  },
  {
    name: 'Irregular (High Aptitude)',
    badge: 'Moderate Risk',
    color: 'amber',
    attendance: 35,
    marks: 85,
    assignment: 50,
    desc: 'Low attendance and spotty assignments, but scores well on tests.',
  },
  {
    name: 'Average Student',
    badge: 'Moderate / Borderline',
    color: 'amber',
    attendance: 65,
    marks: 60,
    assignment: 65,
    desc: 'Moderate scores across attendance, internal exams, and course assignments.',
  },
  {
    name: 'Top Performer',
    badge: 'Low Risk',
    color: 'emerald',
    attendance: 95,
    marks: 92,
    assignment: 94,
    desc: 'Consistent excellence in attendance, internal exams, and assignments.',
  },
];

