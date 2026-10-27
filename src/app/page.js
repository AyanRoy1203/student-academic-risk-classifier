'use client';

import { useState, useMemo } from 'react';
import {
  evaluateAcademicRisk,
  STUDENT_PRESETS,
  MEMBERSHIP_PARAMS,
} from '@/utils/fuzzyLogic';

export default function Home() {
  const [attendance, setAttendance] = useState(65);
  const [marks, setMarks] = useState(58);
  const [assignment, setAssignment] = useState(62);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'rules' | 'theory'

  // Evaluate Mamdani FIS dynamically
  const result = useMemo(() => {
    return evaluateAcademicRisk(attendance, marks, assignment);
  }, [attendance, marks, assignment]);

  // Load a preset
  const handleApplyPreset = (preset) => {
    setAttendance(preset.attendance);
    setMarks(preset.marks);
    setAssignment(preset.assignment);
  };

  // Color mappings
  const getRiskStyle = (level) => {
    switch (level) {
      case 'High Risk':
        return {
          bg: 'bg-rose-50 dark:bg-rose-950/30',
          border: 'border-rose-300 dark:border-rose-800',
          text: 'text-rose-700 dark:text-rose-400',
          badge: 'bg-rose-600 text-white',
          meter: 'from-amber-400 via-rose-500 to-rose-600',
          shadow: 'shadow-rose-100 dark:shadow-none',
        };
      case 'Moderate Risk':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/30',
          border: 'border-amber-300 dark:border-amber-800',
          text: 'text-amber-700 dark:text-amber-400',
          badge: 'bg-amber-500 text-white',
          meter: 'from-emerald-400 via-amber-400 to-amber-500',
          shadow: 'shadow-amber-100 dark:shadow-none',
        };
      case 'Low Risk':
      default:
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/30',
          border: 'border-emerald-300 dark:border-emerald-800',
          text: 'text-emerald-700 dark:text-emerald-400',
          badge: 'bg-emerald-600 text-white',
          meter: 'from-emerald-500 to-teal-400',
          shadow: 'shadow-emerald-100 dark:shadow-none',
        };
    }
  };

  const riskTheme = getRiskStyle(result.riskLevel);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 sticky top-0 z-20 backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-lg shadow-sm">
                λ
              </span>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Student Academic-Risk Classifier
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Soft Computing Mamdani Fuzzy Inference System (Centroid Defuzzification)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800">
              27 Mamdani Rules Active
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
              3 Inputs → 1 Output
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Preset Selector Banner */}
        <section className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Sample Student Presets
              </h2>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Click a preset to quickly simulate academic profiles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {STUDENT_PRESETS.map((preset) => {
              const isSelected =
                attendance === preset.attendance &&
                marks === preset.marks &&
                assignment === preset.assignment;
              return (
                <button
                  key={preset.name}
                  onClick={() => handleApplyPreset(preset)}
                  className={`text-left p-3 rounded-lg border transition-all text-xs flex flex-col justify-between ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 dark:border-indigo-500 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {preset.name}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        preset.color === 'rose' || preset.color === 'red'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
                          : preset.color === 'emerald'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                      }`}
                    >
                      {preset.badge}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] line-clamp-2 mb-2">
                    {preset.desc}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700/60 pt-1.5 mt-auto">
                    <span>Att: {preset.attendance}%</span>
                    <span>•</span>
                    <span>Marks: {preset.marks}%</span>
                    <span>•</span>
                    <span>Assg: {preset.assignment}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Dashboard Core: Inputs & Risk Result */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Input Sliders & Fuzzification Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Input Parameters (Antecedents)
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setAttendance(65);
                    setMarks(58);
                    setAssignment(62);
                  }}
                  className="text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium"
                >
                  Reset Defaults
                </button>
              </div>

              {/* Slider 1: Attendance */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold">
                      A
                    </span>
                    Attendance Rate
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={attendance}
                      onChange={(e) => setAttendance(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
                      className="w-16 px-2 py-1 text-sm text-right font-mono font-semibold rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-semibold text-slate-400">%</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={attendance}
                  onChange={(e) => setAttendance(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />

                {/* Membership Breakdown */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-2.5 border border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1.5 flex justify-between">
                    <span>Fuzzified Attendance Memberships (μ):</span>
                    <span className="font-mono">
                      Dominant: <strong className="text-slate-700 dark:text-slate-200 uppercase">
                        {result.memberships.attendance.low > result.memberships.attendance.medium && result.memberships.attendance.low > result.memberships.attendance.high ? 'Low' : result.memberships.attendance.high > result.memberships.attendance.medium ? 'High' : 'Medium'}
                      </strong>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-1">
                        <span>Low [0-55%]</span>
                        <span className="font-bold">{result.memberships.attendance.low.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-rose-500 h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.attendance.low * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-1">
                        <span>Med [40-85%]</span>
                        <span className="font-bold">{result.memberships.attendance.medium.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.attendance.medium * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-1">
                        <span>High [70-100%]</span>
                        <span className="font-bold">{result.memberships.attendance.high.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.attendance.high * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider 2: Exam Marks */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 flex items-center justify-center text-xs font-bold">
                      M
                    </span>
                    Exam & Test Marks
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={marks}
                      onChange={(e) => setMarks(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
                      className="w-16 px-2 py-1 text-sm text-right font-mono font-semibold rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-semibold text-slate-400">%</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={marks}
                  onChange={(e) => setMarks(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />

                {/* Membership Breakdown */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-2.5 border border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1.5 flex justify-between">
                    <span>Fuzzified Marks Memberships (μ):</span>
                    <span className="font-mono">
                      Dominant: <strong className="text-slate-700 dark:text-slate-200 uppercase">
                        {result.memberships.marks.low > result.memberships.marks.medium && result.memberships.marks.low > result.memberships.marks.high ? 'Low' : result.memberships.marks.high > result.memberships.marks.medium ? 'High' : 'Medium'}
                      </strong>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-1">
                        <span>Low [0-55%]</span>
                        <span className="font-bold">{result.memberships.marks.low.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-rose-500 h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.marks.low * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-1">
                        <span>Med [40-80%]</span>
                        <span className="font-bold">{result.memberships.marks.medium.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.marks.medium * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-1">
                        <span>High [65-100%]</span>
                        <span className="font-bold">{result.memberships.marks.high.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.marks.high * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider 3: Assignment Performance */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 flex items-center justify-center text-xs font-bold">
                      S
                    </span>
                    Assignment Performance
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={assignment}
                      onChange={(e) => setAssignment(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
                      className="w-16 px-2 py-1 text-sm text-right font-mono font-semibold rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-semibold text-slate-400">%</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={assignment}
                  onChange={(e) => setAssignment(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />

                {/* Membership Breakdown */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-2.5 border border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1.5 flex justify-between">
                    <span>Fuzzified Assignment Memberships (μ):</span>
                    <span className="font-mono">
                      Dominant: <strong className="text-slate-700 dark:text-slate-200 uppercase">
                        {result.memberships.assignment.low > result.memberships.assignment.medium && result.memberships.assignment.low > result.memberships.assignment.high ? 'Low' : result.memberships.assignment.high > result.memberships.assignment.medium ? 'High' : 'Medium'}
                      </strong>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-1">
                        <span>Low [0-55%]</span>
                        <span className="font-bold">{result.memberships.assignment.low.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-rose-500 h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.assignment.low * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-1">
                        <span>Med [40-80%]</span>
                        <span className="font-bold">{result.memberships.assignment.medium.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.assignment.medium * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-1">
                        <span>High [65-100%]</span>
                        <span className="font-bold">{result.memberships.assignment.high.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.assignment.high * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Output Risk Card & Defuzzification (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Result Card */}
            <div
              className={`rounded-xl p-6 border transition-all ${riskTheme.bg} ${riskTheme.border} ${riskTheme.shadow} shadow-md`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                  Inference Result
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${riskTheme.badge}`}>
                  {result.riskLevel}
                </span>
              </div>

              {/* Big Score Display */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-5xl font-extrabold tracking-tight font-mono text-slate-900 dark:text-white">
                  {result.defuzzifiedValue}%
                </span>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Risk Index (Centroid)
                </span>
              </div>

              {/* Meter Bar */}
              <div className="space-y-1.5 mb-4">
                <div className="relative w-full h-4 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${riskTheme.meter} transition-all duration-300`}
                    style={{ width: `${result.defuzzifiedValue}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span className="text-emerald-600 dark:text-emerald-400">0% Low Risk</span>
                  <span className="text-amber-600 dark:text-amber-400">50% Moderate</span>
                  <span className="text-rose-600 dark:text-rose-400">100% Critical</span>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800/80 pt-3">
                {result.riskDescription}
              </p>

              {/* Consequent clipping summary */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/80 dark:bg-slate-900/80 rounded-lg p-2 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-semibold text-emerald-600 block uppercase">Low Consequent</span>
                  <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200">
                    {result.consequentStrengths.low.toFixed(2)}
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-slate-900/80 rounded-lg p-2 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-semibold text-amber-600 block uppercase">Mod Consequent</span>
                  <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200">
                    {result.consequentStrengths.moderate.toFixed(2)}
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-slate-900/80 rounded-lg p-2 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-semibold text-rose-600 block uppercase">High Consequent</span>
                  <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200">
                    {result.consequentStrengths.high.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Academic Recommendations Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Diagnostic Insights & Actions
              </h4>
              <div className="space-y-2">
                {result.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-lg text-xs border flex items-start gap-2.5 ${
                      rec.severity === 'critical'
                        ? 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-300'
                        : rec.severity === 'warning'
                        ? 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/40 dark:border-amber-900/60 dark:text-amber-300'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-300'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                        rec.severity === 'critical'
                          ? 'bg-rose-500'
                          : rec.severity === 'warning'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                    <div>
                      <strong className="font-semibold block">{rec.metric}</strong>
                      <span className="text-[11px] opacity-90">{rec.alert}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections: Firing Rules & Fuzzy Mathematics */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Navigation Bar */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 px-5 pt-3 bg-slate-50/50 dark:bg-slate-900">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-4 text-xs font-semibold tracking-wide border-b-2 transition-all ${
                activeTab === 'overview'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Active Firing Rules ({result.activeRules.length})
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`pb-3 px-4 text-xs font-semibold tracking-wide border-b-2 transition-all ${
                activeTab === 'rules'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Complete Rule Base (27 Rules)
            </button>
            <button
              onClick={() => setActiveTab('theory')}
              className={`pb-3 px-4 text-xs font-semibold tracking-wide border-b-2 transition-all ${
                activeTab === 'theory'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Fuzzy Membership Intervals & Theory
            </button>
          </div>

          <div className="p-5">
            {/* Tab 1: Active Rules */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    These rules currently satisfy conditions (firing strength &alpha; = min(&mu;<sub>att</sub>, &mu;<sub>marks</sub>, &mu;<sub>assign</sub>) &gt; 0) and participate in Centroid Defuzzification:
                  </p>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {result.activeRules.length} rule(s) fired
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.activeRules.map((rule) => {
                    const ruleBadge =
                      rule.risk === 'high'
                        ? 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800'
                        : rule.risk === 'moderate'
                        ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800';

                    return (
                      <div
                        key={rule.id}
                        className="rounded-lg p-3.5 border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400">
                            Rule #{rule.id}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${ruleBadge}`}>
                            {rule.risk} Risk
                          </span>
                        </div>

                        <div className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                          {rule.description}
                        </div>

                        {/* Firing Strength bar */}
                        <div className="pt-1">
                          <div className="flex justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                            <span>Firing Strength (α):</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">
                              {rule.firingStrength.toFixed(4)}
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-200"
                              style={{ width: `${rule.firingStrength * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: All 27 Mamdani Rules */}
            {activeTab === 'rules' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Complete Mamdani Rule Base (3 × 3 × 3 = 27 rules)</span>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" /> Low
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 ml-2" /> Moderate
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 ml-2" /> High
                  </div>
                </div>

                <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
                  <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[11px] uppercase font-semibold">
                      <tr>
                        <th className="py-2.5 px-3">Rule #</th>
                        <th className="py-2.5 px-3">Attendance</th>
                        <th className="py-2.5 px-3">Marks</th>
                        <th className="py-2.5 px-3">Assignment</th>
                        <th className="py-2.5 px-3">Consequent Risk</th>
                        <th className="py-2.5 px-3 text-right">Current α</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-[11px]">
                      {result.allRules.map((rule) => {
                        const isActive = rule.firingStrength > 0.0001;
                        return (
                          <tr
                            key={rule.id}
                            className={
                              isActive
                                ? 'bg-indigo-50/50 dark:bg-indigo-950/30 font-semibold'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'
                            }
                          >
                            <td className="py-2 px-3 text-slate-500 font-bold">R{rule.id}</td>
                            <td className="py-2 px-3 uppercase">{rule.att}</td>
                            <td className="py-2 px-3 uppercase">{rule.marks}</td>
                            <td className="py-2 px-3 uppercase">{rule.assign}</td>
                            <td className="py-2 px-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  rule.risk === 'high'
                                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                                    : rule.risk === 'moderate'
                                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                }`}
                              >
                                {rule.risk}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-right">
                              {isActive ? (
                                <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                                  {rule.firingStrength.toFixed(4)}
                                </span>
                              ) : (
                                <span className="text-slate-400">0.0000</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 3: Mathematical & Theoretical Foundations */}
            {activeTab === 'theory' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                      1. Fuzzification & Membership Functions
                    </h5>
                    <p>
                      Each input variable $x \in [0, 100]$ is mapped into fuzzy linguistic sets using Trapezoidal ($\text{trapmf}$) and Triangular ($\text{trimf}$) membership functions:
                    </p>
                    <ul className="list-disc pl-4 space-y-1 font-mono text-[11px]">
                      <li>
                        <strong>Attendance</strong>: Low [0, 0, 35, 55], Med [40, 65, 85], High [70, 85, 100, 100]
                      </li>
                      <li>
                        <strong>Marks</strong>: Low [0, 0, 35, 55], Med [40, 60, 80], High [65, 82, 100, 100]
                      </li>
                      <li>
                        <strong>Assignment</strong>: Low [0, 0, 35, 55], Med [40, 60, 80], High [65, 82, 100, 100]
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                      2. Mamdani Inference & Defuzzification
                    </h5>
                    <p>
                      Mamdani min-operator is applied for antecedent conjunction:
                    </p>
                    <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[11px] text-center">
                      &alpha;<sub>k</sub> = min(&mu;<sub>att</sub>, &mu;<sub>marks</sub>, &mu;<sub>assign</sub>)
                    </div>
                    <p>
                      Consequent sets are clipped and aggregated via max operator, then defuzzified using Centroid (Center of Gravity):
                    </p>
                    <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[11px] text-center">
                      y* = (&Sigma; y<sub>i</sub> &middot; &mu;<sub>agg</sub>(y<sub>i</sub>)) / (&Sigma; &mu;<sub>agg</sub>(y<sub>i</sub>))
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200">
                  <strong className="block font-semibold mb-1">Academic Risk Interpretation:</strong>
                  <span>
                    - <strong>Low Risk (0 - 34.99%)</strong>: Green standing. High retention probability, good lecture attendance and solid performance.
                    <br />
                    - <strong>Moderate Risk (35 - 59.99%)</strong>: Warning zone. Identified weaknesses in attendance, assignments, or exam marks requiring faculty mentoring.
                    <br />
                    - <strong>High Risk (60 - 100%)</strong>: Critical. High probability of course failure or dropout. Immediate remediation protocol recommended.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 mt-12 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>Soft Computing Course Project • Student Academic-Risk Fuzzy Logic Classifier</p>
        <p className="mt-1 font-mono text-[11px]">Implemented with Next.js, React, Tailwind CSS & Mamdani FIS</p>
      </footer>
    </div>
  );
}
