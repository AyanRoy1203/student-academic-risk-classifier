'use client';

import { useState, useMemo } from 'react';
import {
  evaluateAcademicRisk,
  STUDENT_PRESETS,
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

  // Color mappings adhering to: Warm Cream, Soft Brown, Dusty Blue, Light Sage
  const getRiskStyle = (level) => {
    switch (level) {
      case 'High Risk':
        return {
          bg: 'bg-terracotta-50/80 dark:bg-terracotta-950/30',
          border: 'border-terracotta-300 dark:border-terracotta-800',
          text: 'text-terracotta-700 dark:text-terracotta-300',
          badge: 'bg-terracotta-600 text-white',
          meter: 'from-honey-400 via-terracotta-500 to-terracotta-600',
          shadow: 'shadow-terracotta-100/50 dark:shadow-none',
        };
      case 'Moderate Risk':
        return {
          bg: 'bg-honey-50/80 dark:bg-honey-950/30',
          border: 'border-honey-300 dark:border-honey-800',
          text: 'text-honey-700 dark:text-honey-300',
          badge: 'bg-honey-600 text-white',
          meter: 'from-sage-400 via-honey-400 to-honey-600',
          shadow: 'shadow-honey-100/50 dark:shadow-none',
        };
      case 'Low Risk':
      default:
        return {
          bg: 'bg-sage-50/80 dark:bg-sage-950/30',
          border: 'border-sage-300 dark:border-sage-800',
          text: 'text-sage-700 dark:text-sage-300',
          badge: 'bg-sage-600 text-white',
          meter: 'from-sage-500 to-dusty-400',
          shadow: 'shadow-sage-100/50 dark:shadow-none',
        };
    }
  };

  const riskTheme = getRiskStyle(result.riskLevel);

  return (
    <div className="min-h-screen bg-cream-100 text-brown-900 dark:bg-brown-950 dark:text-cream-100 transition-colors">
      {/* Top Header */}
      <header className="border-b border-cream-300/80 bg-cream-50/95 dark:border-brown-800 dark:bg-brown-900/95 sticky top-0 z-20 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-dusty-600 text-cream-50 font-bold text-lg shadow-xs">
                λ
              </span>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-brown-900 dark:text-cream-50">
                  Student Academic-Risk Classifier
                </h1>
                <p className="text-xs text-brown-500 dark:text-cream-400">
                  Soft Computing Mamdani Fuzzy Inference System (Centroid Defuzzification)
                </p>
              </div>
            </div>
          </div>

          {/* Palette Indicators & System Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Palette Preview Dots */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream-200/70 dark:bg-brown-800/80 border border-cream-300 dark:border-brown-700 text-[11px] text-brown-600 dark:text-cream-300 mr-1">
              <span className="text-[10px] font-medium mr-0.5">Palette:</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FAF7F2] border border-brown-300" title="Warm Cream" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#7E6554]" title="Soft Brown" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#577D94]" title="Dusty Blue" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#68856B]" title="Light Sage" />
            </div>

            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-dusty-100 text-dusty-700 border border-dusty-200 dark:bg-dusty-950/60 dark:text-dusty-300 dark:border-dusty-800">
              27 Mamdani Rules Active
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-sage-100 text-sage-800 border border-sage-200 dark:bg-sage-950/60 dark:text-sage-300 dark:border-sage-800">
              3 Inputs → 1 Output
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Preset Selector Banner */}
        <section className="bg-cream-50 dark:bg-brown-900 rounded-xl p-4 border border-cream-200 dark:border-brown-800 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-dusty-600 dark:text-dusty-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-brown-700 dark:text-cream-300">
                Sample Student Presets
              </h2>
            </div>
            <span className="text-xs text-brown-500 dark:text-cream-400">
              Click a preset to quickly simulate academic profiles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {STUDENT_PRESETS.map((preset) => {
              const isSelected =
                attendance === preset.attendance &&
                marks === preset.marks &&
                assignment === preset.assignment;

              const getBadgeColor = (color) => {
                switch (color) {
                  case 'rose':
                  case 'red':
                  case 'terracotta':
                    return 'bg-terracotta-100 text-terracotta-700 dark:bg-terracotta-900/50 dark:text-terracotta-300';
                  case 'emerald':
                  case 'sage':
                    return 'bg-sage-100 text-sage-800 dark:bg-sage-900/50 dark:text-sage-300';
                  case 'honey':
                  case 'amber':
                  default:
                    return 'bg-honey-100 text-honey-700 dark:bg-honey-900/50 dark:text-honey-300';
                }
              };

              return (
                <button
                  key={preset.name}
                  onClick={() => handleApplyPreset(preset)}
                  className={`text-left p-3 rounded-lg border transition-all text-xs flex flex-col justify-between ${
                    isSelected
                      ? 'border-dusty-500 bg-dusty-50 dark:bg-dusty-950/40 dark:border-dusty-400 shadow-xs ring-1 ring-dusty-400/40'
                      : 'border-cream-300 dark:border-brown-800 hover:border-dusty-300 dark:hover:border-dusty-700 bg-cream-50/60 dark:bg-brown-900/40 hover:bg-cream-100/80 dark:hover:bg-brown-850'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-semibold text-brown-900 dark:text-cream-100">
                      {preset.name}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${getBadgeColor(preset.color)}`}
                    >
                      {preset.badge}
                    </span>
                  </div>
                  <p className="text-brown-500 dark:text-cream-400 text-[11px] line-clamp-2 mb-2">
                    {preset.desc}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-brown-600 dark:text-cream-400 border-t border-cream-200 dark:border-brown-800 pt-1.5 mt-auto">
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
            <div className="bg-cream-50 dark:bg-brown-900 rounded-xl p-5 border border-cream-200 dark:border-brown-800 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-cream-200 dark:border-brown-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-dusty-500 animate-pulse" />
                  <h3 className="font-semibold text-brown-900 dark:text-cream-100">
                    Input Parameters (Antecedents)
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setAttendance(65);
                    setMarks(58);
                    setAssignment(62);
                  }}
                  className="text-xs text-dusty-600 hover:text-dusty-700 dark:text-dusty-400 font-medium"
                >
                  Reset Defaults
                </button>
              </div>

              {/* Slider 1: Attendance (Themed Dusty Blue) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-brown-800 dark:text-cream-200 flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-dusty-100 dark:bg-dusty-900/60 text-dusty-700 dark:text-dusty-300 flex items-center justify-center text-xs font-bold">
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
                      className="w-16 px-2 py-1 text-sm text-right font-mono font-semibold rounded border border-cream-300 dark:border-brown-700 bg-cream-100 dark:bg-brown-800 text-brown-900 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-dusty-500"
                    />
                    <span className="text-xs font-semibold text-brown-400 dark:text-brown-500">%</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={attendance}
                  onChange={(e) => setAttendance(Number(e.target.value))}
                  className="w-full h-2 bg-cream-200 dark:bg-brown-800 rounded-lg appearance-none cursor-pointer accent-dusty-600"
                />

                {/* Membership Breakdown */}
                <div className="bg-cream-100/70 dark:bg-brown-850/60 rounded-lg p-2.5 border border-cream-200 dark:border-brown-800">
                  <div className="text-[11px] font-medium text-brown-600 dark:text-cream-400 mb-1.5 flex justify-between">
                    <span>Fuzzified Attendance Memberships (μ):</span>
                    <span className="font-mono">
                      Dominant: <strong className="text-brown-800 dark:text-cream-200 uppercase">
                        {result.memberships.attendance.low > result.memberships.attendance.medium && result.memberships.attendance.low > result.memberships.attendance.high ? 'Low' : result.memberships.attendance.high > result.memberships.attendance.medium ? 'High' : 'Medium'}
                      </strong>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono text-brown-600 dark:text-cream-400 mb-1">
                        <span>Low [0-55%]</span>
                        <span className="font-bold">{result.memberships.attendance.low.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-cream-200 dark:bg-brown-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-terracotta-500 h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.attendance.low * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono text-brown-600 dark:text-cream-400 mb-1">
                        <span>Med [40-85%]</span>
                        <span className="font-bold">{result.memberships.attendance.medium.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-cream-200 dark:bg-brown-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-honey-500 h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.attendance.medium * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono text-brown-600 dark:text-cream-400 mb-1">
                        <span>High [70-100%]</span>
                        <span className="font-bold">{result.memberships.attendance.high.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-cream-200 dark:bg-brown-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-sage-500 h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.attendance.high * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider 2: Exam Marks (Themed Soft Brown) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-brown-800 dark:text-cream-200 flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-brown-200/80 dark:bg-brown-800 text-brown-800 dark:text-cream-200 flex items-center justify-center text-xs font-bold">
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
                      className="w-16 px-2 py-1 text-sm text-right font-mono font-semibold rounded border border-cream-300 dark:border-brown-700 bg-cream-100 dark:bg-brown-800 text-brown-900 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-brown-500"
                    />
                    <span className="text-xs font-semibold text-brown-400 dark:text-brown-500">%</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={marks}
                  onChange={(e) => setMarks(Number(e.target.value))}
                  className="w-full h-2 bg-cream-200 dark:bg-brown-800 rounded-lg appearance-none cursor-pointer accent-brown-600"
                />

                {/* Membership Breakdown */}
                <div className="bg-cream-100/70 dark:bg-brown-850/60 rounded-lg p-2.5 border border-cream-200 dark:border-brown-800">
                  <div className="text-[11px] font-medium text-brown-600 dark:text-cream-400 mb-1.5 flex justify-between">
                    <span>Fuzzified Marks Memberships (μ):</span>
                    <span className="font-mono">
                      Dominant: <strong className="text-brown-800 dark:text-cream-200 uppercase">
                        {result.memberships.marks.low > result.memberships.marks.medium && result.memberships.marks.low > result.memberships.marks.high ? 'Low' : result.memberships.marks.high > result.memberships.marks.medium ? 'High' : 'Medium'}
                      </strong>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono text-brown-600 dark:text-cream-400 mb-1">
                        <span>Low [0-55%]</span>
                        <span className="font-bold">{result.memberships.marks.low.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-cream-200 dark:bg-brown-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-terracotta-500 h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.marks.low * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono text-brown-600 dark:text-cream-400 mb-1">
                        <span>Med [40-80%]</span>
                        <span className="font-bold">{result.memberships.marks.medium.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-cream-200 dark:bg-brown-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-honey-500 h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.marks.medium * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono text-brown-600 dark:text-cream-400 mb-1">
                        <span>High [65-100%]</span>
                        <span className="font-bold">{result.memberships.marks.high.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-cream-200 dark:bg-brown-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-sage-500 h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.marks.high * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider 3: Assignment Performance (Themed Light Sage) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-brown-800 dark:text-cream-200 flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-sage-200 dark:bg-sage-900/60 text-sage-800 dark:text-sage-300 flex items-center justify-center text-xs font-bold">
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
                      className="w-16 px-2 py-1 text-sm text-right font-mono font-semibold rounded border border-cream-300 dark:border-brown-700 bg-cream-100 dark:bg-brown-800 text-brown-900 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-sage-500"
                    />
                    <span className="text-xs font-semibold text-brown-400 dark:text-brown-500">%</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={assignment}
                  onChange={(e) => setAssignment(Number(e.target.value))}
                  className="w-full h-2 bg-cream-200 dark:bg-brown-800 rounded-lg appearance-none cursor-pointer accent-sage-600"
                />

                {/* Membership Breakdown */}
                <div className="bg-cream-100/70 dark:bg-brown-855/60 rounded-lg p-2.5 border border-cream-200 dark:border-brown-800">
                  <div className="text-[11px] font-medium text-brown-600 dark:text-cream-400 mb-1.5 flex justify-between">
                    <span>Fuzzified Assignment Memberships (μ):</span>
                    <span className="font-mono">
                      Dominant: <strong className="text-brown-800 dark:text-cream-200 uppercase">
                        {result.memberships.assignment.low > result.memberships.assignment.medium && result.memberships.assignment.low > result.memberships.assignment.high ? 'Low' : result.memberships.assignment.high > result.memberships.assignment.medium ? 'High' : 'Medium'}
                      </strong>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono text-brown-600 dark:text-cream-400 mb-1">
                        <span>Low [0-55%]</span>
                        <span className="font-bold">{result.memberships.assignment.low.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-cream-200 dark:bg-brown-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-terracotta-500 h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.assignment.low * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono text-brown-600 dark:text-cream-400 mb-1">
                        <span>Med [40-80%]</span>
                        <span className="font-bold">{result.memberships.assignment.medium.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-cream-200 dark:bg-brown-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-honey-500 h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.assignment.medium * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono text-brown-600 dark:text-cream-400 mb-1">
                        <span>High [65-100%]</span>
                        <span className="font-bold">{result.memberships.assignment.high.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-cream-200 dark:bg-brown-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-sage-500 h-full rounded-full transition-all duration-150"
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
              className={`rounded-xl p-6 border transition-all ${riskTheme.bg} ${riskTheme.border} ${riskTheme.shadow} shadow-sm`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider font-bold text-brown-500 dark:text-cream-400">
                  Inference Result
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${riskTheme.badge}`}>
                  {result.riskLevel}
                </span>
              </div>

              {/* Big Score Display */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-5xl font-extrabold tracking-tight font-mono text-brown-900 dark:text-cream-50">
                  {result.defuzzifiedValue}%
                </span>
                <span className="text-sm font-semibold text-brown-500 dark:text-cream-400">
                  Risk Index (Centroid)
                </span>
              </div>

              {/* Meter Bar */}
              <div className="space-y-1.5 mb-4">
                <div className="relative w-full h-4 rounded-full bg-cream-200 dark:bg-brown-800 overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full bg-linear-to-r ${riskTheme.meter} transition-all duration-300`}
                    style={{ width: `${result.defuzzifiedValue}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-sage-700 dark:text-sage-400">0% Low Risk</span>
                  <span className="text-honey-700 dark:text-honey-400">50% Moderate</span>
                  <span className="text-terracotta-700 dark:text-terracotta-400">100% Critical</span>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-brown-700 dark:text-cream-300 border-t border-cream-200 dark:border-brown-800/80 pt-3">
                {result.riskDescription}
              </p>

              {/* Consequent clipping summary */}
              <div className="mt-4 pt-3 border-t border-cream-200 dark:border-brown-800/80 grid grid-cols-3 gap-2 text-center">
                <div className="bg-cream-50/90 dark:bg-brown-900/90 rounded-lg p-2 border border-cream-200 dark:border-brown-800">
                  <span className="text-[10px] font-semibold text-sage-700 dark:text-sage-400 block uppercase">Low Consequent</span>
                  <span className="text-sm font-bold font-mono text-brown-800 dark:text-cream-200">
                    {result.consequentStrengths.low.toFixed(2)}
                  </span>
                </div>
                <div className="bg-cream-50/90 dark:bg-brown-900/90 rounded-lg p-2 border border-cream-200 dark:border-brown-800">
                  <span className="text-[10px] font-semibold text-honey-700 dark:text-honey-400 block uppercase">Mod Consequent</span>
                  <span className="text-sm font-bold font-mono text-brown-800 dark:text-cream-200">
                    {result.consequentStrengths.moderate.toFixed(2)}
                  </span>
                </div>
                <div className="bg-cream-50/90 dark:bg-brown-900/90 rounded-lg p-2 border border-cream-200 dark:border-brown-800">
                  <span className="text-[10px] font-semibold text-terracotta-700 dark:text-terracotta-400 block uppercase">High Consequent</span>
                  <span className="text-sm font-bold font-mono text-brown-800 dark:text-cream-200">
                    {result.consequentStrengths.high.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Academic Recommendations Card */}
            <div className="bg-cream-50 dark:bg-brown-900 rounded-xl p-5 border border-cream-200 dark:border-brown-800 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brown-500 dark:text-cream-400 mb-3 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-dusty-600 dark:text-dusty-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        ? 'bg-terracotta-50/90 border-terracotta-200 text-terracotta-800 dark:bg-terracotta-950/40 dark:border-terracotta-900/60 dark:text-terracotta-300'
                        : rec.severity === 'warning'
                        ? 'bg-honey-50/90 border-honey-200 text-honey-800 dark:bg-honey-950/40 dark:border-honey-900/60 dark:text-honey-300'
                        : 'bg-sage-50/90 border-sage-200 text-sage-800 dark:bg-sage-950/40 dark:border-sage-900/60 dark:text-sage-300'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                        rec.severity === 'critical'
                          ? 'bg-terracotta-500'
                          : rec.severity === 'warning'
                          ? 'bg-honey-500'
                          : 'bg-sage-500'
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
        <div className="bg-cream-50 dark:bg-brown-900 rounded-xl border border-cream-200 dark:border-brown-800 shadow-xs overflow-hidden">
          {/* Navigation Bar */}
          <div className="flex border-b border-cream-200 dark:border-brown-800 px-5 pt-3 bg-cream-100/50 dark:bg-brown-950/30">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-4 text-xs font-semibold tracking-wide border-b-2 transition-all ${
                activeTab === 'overview'
                  ? 'border-dusty-600 text-dusty-700 dark:border-dusty-400 dark:text-dusty-300'
                  : 'border-transparent text-brown-500 hover:text-brown-800 dark:text-cream-400 dark:hover:text-cream-200'
              }`}
            >
              Active Firing Rules ({result.activeRules.length})
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`pb-3 px-4 text-xs font-semibold tracking-wide border-b-2 transition-all ${
                activeTab === 'rules'
                  ? 'border-dusty-600 text-dusty-700 dark:border-dusty-400 dark:text-dusty-300'
                  : 'border-transparent text-brown-500 hover:text-brown-800 dark:text-cream-400 dark:hover:text-cream-200'
              }`}
            >
              Complete Rule Base (27 Rules)
            </button>
            <button
              onClick={() => setActiveTab('theory')}
              className={`pb-3 px-4 text-xs font-semibold tracking-wide border-b-2 transition-all ${
                activeTab === 'theory'
                  ? 'border-dusty-600 text-dusty-700 dark:border-dusty-400 dark:text-dusty-300'
                  : 'border-transparent text-brown-500 hover:text-brown-800 dark:text-cream-400 dark:hover:text-cream-200'
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
                  <p className="text-xs text-brown-600 dark:text-cream-400">
                    These rules currently satisfy conditions (firing strength &alpha; = min(&mu;<sub>att</sub>, &mu;<sub>marks</sub>, &mu;<sub>assign</sub>) &gt; 0) and participate in Centroid Defuzzification:
                  </p>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-cream-200 dark:bg-brown-800 text-brown-800 dark:text-cream-200">
                    {result.activeRules.length} rule(s) fired
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.activeRules.map((rule) => {
                    const ruleBadge =
                      rule.risk === 'high'
                        ? 'bg-terracotta-100 text-terracotta-800 border-terracotta-300 dark:bg-terracotta-950 dark:text-terracotta-300 dark:border-terracotta-800'
                        : rule.risk === 'moderate'
                        ? 'bg-honey-100 text-honey-800 border-honey-300 dark:bg-honey-950 dark:text-honey-300 dark:border-honey-800'
                        : 'bg-sage-100 text-sage-800 border-sage-300 dark:bg-sage-950 dark:text-sage-300 dark:border-sage-800';

                    return (
                      <div
                        key={rule.id}
                        className="rounded-lg p-3.5 border border-cream-200 dark:border-brown-800 bg-cream-100/60 dark:bg-brown-850/40 space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold font-mono text-dusty-700 dark:text-dusty-300">
                            Rule #{rule.id}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${ruleBadge}`}>
                            {rule.risk} Risk
                          </span>
                        </div>

                        <div className="text-xs text-brown-700 dark:text-cream-300 leading-snug">
                          {rule.description}
                        </div>

                        {/* Firing Strength bar */}
                        <div className="pt-1">
                          <div className="flex justify-between text-[11px] font-mono text-brown-500 dark:text-cream-400 mb-1">
                            <span>Firing Strength (α):</span>
                            <span className="font-bold text-brown-800 dark:text-cream-200">
                              {rule.firingStrength.toFixed(4)}
                            </span>
                          </div>
                          <div className="w-full bg-cream-200 dark:bg-brown-800 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-dusty-600 dark:bg-dusty-500 h-full rounded-full transition-all duration-200"
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
                <div className="flex items-center justify-between text-xs text-brown-500 dark:text-cream-400">
                  <span>Complete Mamdani Rule Base (3 × 3 × 3 = 27 rules)</span>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-sage-500" /> Low
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-honey-500 ml-2" /> Moderate
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-terracotta-500 ml-2" /> High
                  </div>
                </div>

                <div className="overflow-x-auto border border-cream-200 dark:border-brown-800 rounded-lg">
                  <table className="w-full text-left text-xs text-brown-700 dark:text-cream-300">
                    <thead className="bg-cream-200/70 dark:bg-brown-850 text-brown-800 dark:text-cream-200 text-[11px] uppercase font-semibold">
                      <tr>
                        <th className="py-2.5 px-3">Rule #</th>
                        <th className="py-2.5 px-3">Attendance</th>
                        <th className="py-2.5 px-3">Marks</th>
                        <th className="py-2.5 px-3">Assignment</th>
                        <th className="py-2.5 px-3">Consequent Risk</th>
                        <th className="py-2.5 px-3 text-right">Current α</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-200 dark:divide-brown-800 font-mono text-[11px]">
                      {result.allRules.map((rule) => {
                        const isActive = rule.firingStrength > 0.0001;
                        return (
                          <tr
                            key={rule.id}
                            className={
                              isActive
                                ? 'bg-dusty-50/80 dark:bg-dusty-950/40 font-semibold'
                                : 'hover:bg-cream-100/50 dark:hover:bg-brown-800/30'
                            }
                          >
                            <td className="py-2 px-3 text-brown-500 dark:text-cream-400 font-bold">R{rule.id}</td>
                            <td className="py-2 px-3 uppercase">{rule.att}</td>
                            <td className="py-2 px-3 uppercase">{rule.marks}</td>
                            <td className="py-2 px-3 uppercase">{rule.assign}</td>
                            <td className="py-2 px-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  rule.risk === 'high'
                                    ? 'bg-terracotta-100 text-terracotta-800 dark:bg-terracotta-950 dark:text-terracotta-300'
                                    : rule.risk === 'moderate'
                                    ? 'bg-honey-100 text-honey-800 dark:bg-honey-950 dark:text-honey-300'
                                    : 'bg-sage-100 text-sage-800 dark:bg-sage-950 dark:text-sage-300'
                                }`}
                              >
                                {rule.risk}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-right">
                              {isActive ? (
                                <span className="text-dusty-700 dark:text-dusty-300 font-bold">
                                  {rule.firingStrength.toFixed(4)}
                                </span>
                              ) : (
                                <span className="text-brown-400 dark:text-brown-600">0.0000</span>
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
              <div className="space-y-4 text-xs text-brown-700 dark:text-cream-300 leading-relaxed">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-cream-100/70 dark:bg-brown-850/50 border border-cream-200 dark:border-brown-800 space-y-2">
                    <h5 className="font-bold text-brown-900 dark:text-cream-100 text-sm">
                      1. Fuzzification & Membership Functions
                    </h5>
                    <p>
                      Each input variable $x \in [0, 100]$ is mapped into fuzzy linguistic sets using Trapezoidal (<code>trapmf</code>) and Triangular (<code>trimf</code>) membership functions:
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

                  <div className="p-4 rounded-lg bg-cream-100/70 dark:bg-brown-850/50 border border-cream-200 dark:border-brown-800 space-y-2">
                    <h5 className="font-bold text-brown-900 dark:text-cream-100 text-sm">
                      2. Mamdani Inference & Defuzzification
                    </h5>
                    <p>
                      Mamdani min-operator is applied for antecedent conjunction:
                    </p>
                    <div className="p-2 rounded bg-cream-50 dark:bg-brown-900 border border-cream-200 dark:border-brown-700 font-mono text-[11px] text-center">
                      &alpha;<sub>k</sub> = min(&mu;<sub>att</sub>, &mu;<sub>marks</sub>, &mu;<sub>assign</sub>)
                    </div>
                    <p>
                      Consequent sets are clipped and aggregated via max operator, then defuzzified using Centroid (Center of Gravity):
                    </p>
                    <div className="p-2 rounded bg-cream-50 dark:bg-brown-900 border border-cream-200 dark:border-brown-700 font-mono text-[11px] text-center">
                      y* = (&Sigma; y<sub>i</sub> &middot; &mu;<sub>agg</sub>(y<sub>i</sub>)) / (&Sigma; &mu;<sub>agg</sub>(y<sub>i</sub>))
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-dusty-50/80 dark:bg-dusty-950/40 border border-dusty-200 dark:border-dusty-800 text-dusty-900 dark:text-dusty-200">
                  <strong className="block font-semibold mb-1">Academic Risk Interpretation:</strong>
                  <span>
                    - <strong>Low Risk (0 - 34.99%)</strong>: Light Sage standing. High retention probability, good lecture attendance and solid performance.
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
      <footer className="border-t border-cream-300 dark:border-brown-800 mt-12 py-6 text-center text-xs text-brown-500 dark:text-cream-400">
        <p>Soft Computing Course Project • Student Academic-Risk Fuzzy Logic Classifier</p>
        <p className="mt-1 font-mono text-[11px]">Styled in Warm Cream, Soft Brown, Dusty Blue & Light Sage</p>
      </footer>
    </div>
  );
}
