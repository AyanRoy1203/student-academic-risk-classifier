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

  // Helper for preset badge styling
  const getPresetBadgeStyle = (badge) => {
    const lower = (badge || '').toLowerCase();
    if (lower.includes('high')) {
      return 'bg-[var(--risk-high)] text-[var(--bg-page)]';
    }
    if (lower.includes('low')) {
      return 'bg-[var(--risk-low)] text-[var(--ink)]';
    }
    return 'bg-[var(--risk-moderate)] text-[var(--ink)]';
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--ink)] antialiased">
      {/* Top Header */}
      <header className="border-b border-[var(--border-soft)] bg-[var(--bg-page)] sticky top-0 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--fill)] text-[var(--bg-page)] font-bold text-lg shadow-xs">
                λ
              </span>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
                  Student academic-risk classifier
                </h1>
                <p className="text-xs text-[var(--ink-soft)]">
                  Soft Computing Mamdani Fuzzy Inference System (Centroid Defuzzification)
                </p>
              </div>
            </div>
          </div>

          {/* System Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[var(--bg-result)] text-[var(--ink)] border border-[var(--border-soft)]">
              27 rules active
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[var(--bg-result)] text-[var(--ink)] border border-[var(--border-soft)]">
              3 inputs → 1 output
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Preset Selector Banner */}
        <section className="bg-[var(--bg-card)] rounded-[12px] p-4 border border-[var(--border-soft)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-sage)]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                Sample student presets
              </h2>
            </div>
            <span className="text-xs text-[var(--ink-soft)]">
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
                  className={`text-left p-3 rounded-[10px] border transition-all text-xs flex flex-col justify-between ${
                    isSelected
                      ? 'border-[var(--fill)] ring-2 ring-[var(--fill)] bg-white/80'
                      : 'border-[var(--border-soft)] bg-[var(--bg-card)] hover:bg-white/70'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold text-[var(--ink)]">
                      {preset.name}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${getPresetBadgeStyle(
                        preset.badge
                      )}`}
                    >
                      {preset.badge}
                    </span>
                  </div>
                  <p className="text-[var(--ink-soft)] text-[11px] line-clamp-2 mb-2">
                    {preset.desc}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-mono font-semibold text-[var(--ink)] border-t border-[var(--border-soft)] pt-1.5 mt-auto">
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
            <div className="bg-[var(--bg-card)] rounded-[12px] p-5 border border-[var(--border-soft)] space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--border-soft)] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-sage)]" />
                  <h3 className="font-bold text-sm text-[var(--ink)]">
                    Input parameters (Antecedents)
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setAttendance(65);
                    setMarks(58);
                    setAssignment(62);
                  }}
                  className="text-xs text-[var(--ink)] font-semibold hover:underline"
                >
                  Reset defaults
                </button>
              </div>

              {/* Slider 1: Attendance */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-[var(--ink)] flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[var(--bg-result)] text-[var(--ink)] flex items-center justify-center text-xs font-bold border border-[var(--border-soft)]">
                      A
                    </span>
                    Attendance rate
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={attendance}
                      onChange={(e) =>
                        setAttendance(Math.min(100, Math.max(0, Number(e.target.value) || 0)))
                      }
                      className="w-16 px-2 py-1 text-sm text-right font-mono font-bold rounded-lg border border-[var(--border-soft)] bg-[var(--bg-page)] text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--fill)]"
                    />
                    <span className="text-xs font-bold text-[var(--ink-soft)]">%</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={attendance}
                  onChange={(e) => setAttendance(Number(e.target.value))}
                  className="warm-slider"
                  style={{
                    background: `linear-gradient(to right, var(--fill) 0%, var(--fill) ${attendance}%, var(--track) ${attendance}%, var(--track) 100%)`,
                  }}
                />

                {/* Membership Breakdown */}
                <div className="bg-[var(--bg-result)]/25 rounded-[10px] p-2.5 border border-[var(--border-soft)]">
                  <div className="text-[11px] font-semibold text-[var(--ink)] mb-1.5 flex justify-between">
                    <span>Fuzzified Attendance Memberships (μ):</span>
                    <span className="font-mono">
                      Dominant:{' '}
                      <strong className="text-[var(--ink)] uppercase">
                        {result.memberships.attendance.low > result.memberships.attendance.medium &&
                        result.memberships.attendance.low > result.memberships.attendance.high
                          ? 'Low'
                          : result.memberships.attendance.high > result.memberships.attendance.medium
                          ? 'High'
                          : 'Medium'}
                      </strong>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono font-semibold text-[var(--ink)] mb-1">
                        <span>Low [0-55%]</span>
                        <span>{result.memberships.attendance.low.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-[var(--track)] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[var(--fill)] h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.attendance.low * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono font-semibold text-[var(--ink)] mb-1">
                        <span>Med [40-85%]</span>
                        <span>{result.memberships.attendance.medium.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-[var(--track)] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[var(--fill)] h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.attendance.medium * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono font-semibold text-[var(--ink)] mb-1">
                        <span>High [70-100%]</span>
                        <span>{result.memberships.attendance.high.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-[var(--track)] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[var(--fill)] h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.attendance.high * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider 2: Exam Marks */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-[var(--ink)] flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[var(--bg-result)] text-[var(--ink)] flex items-center justify-center text-xs font-bold border border-[var(--border-soft)]">
                      M
                    </span>
                    Exam and test marks
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={marks}
                      onChange={(e) =>
                        setMarks(Math.min(100, Math.max(0, Number(e.target.value) || 0)))
                      }
                      className="w-16 px-2 py-1 text-sm text-right font-mono font-bold rounded-lg border border-[var(--border-soft)] bg-[var(--bg-page)] text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--fill)]"
                    />
                    <span className="text-xs font-bold text-[var(--ink-soft)]">%</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={marks}
                  onChange={(e) => setMarks(Number(e.target.value))}
                  className="warm-slider"
                  style={{
                    background: `linear-gradient(to right, var(--fill) 0%, var(--fill) ${marks}%, var(--track) ${marks}%, var(--track) 100%)`,
                  }}
                />

                {/* Membership Breakdown */}
                <div className="bg-[var(--bg-result)]/25 rounded-[10px] p-2.5 border border-[var(--border-soft)]">
                  <div className="text-[11px] font-semibold text-[var(--ink)] mb-1.5 flex justify-between">
                    <span>Fuzzified Marks Memberships (μ):</span>
                    <span className="font-mono">
                      Dominant:{' '}
                      <strong className="text-[var(--ink)] uppercase">
                        {result.memberships.marks.low > result.memberships.marks.medium &&
                        result.memberships.marks.low > result.memberships.marks.high
                          ? 'Low'
                          : result.memberships.marks.high > result.memberships.marks.medium
                          ? 'High'
                          : 'Medium'}
                      </strong>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono font-semibold text-[var(--ink)] mb-1">
                        <span>Low [0-55%]</span>
                        <span>{result.memberships.marks.low.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-[var(--track)] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[var(--fill)] h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.marks.low * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono font-semibold text-[var(--ink)] mb-1">
                        <span>Med [40-80%]</span>
                        <span>{result.memberships.marks.medium.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-[var(--track)] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[var(--fill)] h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.marks.medium * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono font-semibold text-[var(--ink)] mb-1">
                        <span>High [65-100%]</span>
                        <span>{result.memberships.marks.high.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-[var(--track)] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[var(--fill)] h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.marks.high * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider 3: Assignment Performance */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-[var(--ink)] flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[var(--bg-result)] text-[var(--ink)] flex items-center justify-center text-xs font-bold border border-[var(--border-soft)]">
                      S
                    </span>
                    Assignment performance
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={assignment}
                      onChange={(e) =>
                        setAssignment(Math.min(100, Math.max(0, Number(e.target.value) || 0)))
                      }
                      className="w-16 px-2 py-1 text-sm text-right font-mono font-bold rounded-lg border border-[var(--border-soft)] bg-[var(--bg-page)] text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--fill)]"
                    />
                    <span className="text-xs font-bold text-[var(--ink-soft)]">%</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={assignment}
                  onChange={(e) => setAssignment(Number(e.target.value))}
                  className="warm-slider"
                  style={{
                    background: `linear-gradient(to right, var(--fill) 0%, var(--fill) ${assignment}%, var(--track) ${assignment}%, var(--track) 100%)`,
                  }}
                />

                {/* Membership Breakdown */}
                <div className="bg-[var(--bg-result)]/25 rounded-[10px] p-2.5 border border-[var(--border-soft)]">
                  <div className="text-[11px] font-semibold text-[var(--ink)] mb-1.5 flex justify-between">
                    <span>Fuzzified Assignment Memberships (μ):</span>
                    <span className="font-mono">
                      Dominant:{' '}
                      <strong className="text-[var(--ink)] uppercase">
                        {result.memberships.assignment.low > result.memberships.assignment.medium &&
                        result.memberships.assignment.low > result.memberships.assignment.high
                          ? 'Low'
                          : result.memberships.assignment.high > result.memberships.assignment.medium
                          ? 'High'
                          : 'Medium'}
                      </strong>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono font-semibold text-[var(--ink)] mb-1">
                        <span>Low [0-55%]</span>
                        <span>{result.memberships.assignment.low.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-[var(--track)] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[var(--fill)] h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.assignment.low * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono font-semibold text-[var(--ink)] mb-1">
                        <span>Med [40-80%]</span>
                        <span>{result.memberships.assignment.medium.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-[var(--track)] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[var(--fill)] h-full rounded-full transition-all duration-150"
                          style={{ width: `${result.memberships.assignment.medium * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-[11px] font-mono font-semibold text-[var(--ink)] mb-1">
                        <span>High [65-100%]</span>
                        <span>{result.memberships.assignment.high.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-[var(--track)] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[var(--fill)] h-full rounded-full transition-all duration-150"
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
            {/* Primary Result Card (Mint background matching reference screenshot) */}
            <div className="rounded-[12px] p-6 border border-[var(--border-soft)] bg-[var(--bg-result)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-[var(--ink)]">
                  Risk index
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    result.riskLevel === 'High Risk'
                      ? 'bg-[var(--risk-high)] text-[var(--bg-page)]'
                      : result.riskLevel === 'Low Risk'
                      ? 'bg-[var(--fill)] text-[var(--bg-page)]'
                      : 'bg-[var(--fill)] text-[var(--bg-page)]'
                  }`}
                >
                  {result.riskLevel}
                </span>
              </div>

              {/* Big Score Display */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-5xl sm:text-6xl font-bold tracking-tight font-mono text-[var(--ink)]">
                  {result.defuzzifiedValue}%
                </span>
              </div>

              {/* Meter Bar: Cream track, Forest fill */}
              <div className="space-y-1.5 mb-4">
                <div className="relative w-full h-3 rounded-full bg-[var(--bg-page)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--fill)] transition-all duration-300"
                    style={{ width: `${result.defuzzifiedValue}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-semibold text-[var(--ink)]">
                  <span>0% Low</span>
                  <span>50% Moderate</span>
                  <span>100% Critical</span>
                </div>
              </div>

              {/* Consequent clipping summary (cream background at ~70% opacity, forest text) */}
              <div className="grid grid-cols-3 gap-2 text-center mb-4">
                <div className="bg-[var(--bg-page)]/70 rounded-lg p-2.5 border border-[var(--border-soft)]">
                  <span className="text-[11px] font-semibold text-[var(--ink)] block">
                    Low
                  </span>
                  <span className="text-base font-bold font-mono text-[var(--ink)]">
                    {result.consequentStrengths.low.toFixed(2)}
                  </span>
                </div>
                <div className="bg-[var(--bg-page)]/70 rounded-lg p-2.5 border border-[var(--border-soft)]">
                  <span className="text-[11px] font-semibold text-[var(--ink)] block">
                    Mod
                  </span>
                  <span className="text-base font-bold font-mono text-[var(--ink)]">
                    {result.consequentStrengths.moderate.toFixed(2)}
                  </span>
                </div>
                <div className="bg-[var(--bg-page)]/70 rounded-lg p-2.5 border border-[var(--border-soft)]">
                  <span className="text-[11px] font-semibold text-[var(--ink)] block">
                    High
                  </span>
                  <span className="text-base font-bold font-mono text-[var(--ink)]">
                    {result.consequentStrengths.high.toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-[var(--ink)] border-t border-[var(--ink)]/15 pt-3">
                {result.riskDescription}
              </p>
            </div>

            {/* Academic Recommendations Card */}
            <div className="bg-[var(--bg-card)] rounded-[12px] p-5 border border-[var(--border-soft)]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-sage)]" />
                Diagnostic insights & actions
              </h4>
              <div className="space-y-2">
                {result.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-[10px] text-xs border border-[var(--border-soft)] bg-[var(--bg-page)]/60 flex items-start gap-2.5"
                  >
                    <span className="w-2 h-2 rounded-full mt-1 shrink-0 bg-[var(--accent-sage)]" />
                    <div>
                      <strong className="font-bold text-[var(--ink)] block text-xs">
                        {rec.metric}
                      </strong>
                      <span className="text-xs text-[var(--ink)] leading-snug">
                        {rec.alert}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections: Firing Rules & Fuzzy Mathematics */}
        <div className="bg-[var(--bg-card)] rounded-[12px] border border-[var(--border-soft)] overflow-hidden">
          {/* Navigation Bar */}
          <div className="flex border-b border-[var(--border-soft)] px-5 pt-3 bg-[var(--bg-page)]/40">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-4 text-xs tracking-wide transition-all ${
                activeTab === 'overview'
                  ? 'border-b-2 border-[var(--fill)] text-[var(--ink)] font-bold'
                  : 'border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)] font-semibold'
              }`}
            >
              Active Firing Rules ({result.activeRules.length})
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`pb-3 px-4 text-xs tracking-wide transition-all ${
                activeTab === 'rules'
                  ? 'border-b-2 border-[var(--fill)] text-[var(--ink)] font-bold'
                  : 'border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)] font-semibold'
              }`}
            >
              Complete Rule Base (27 Rules)
            </button>
            <button
              onClick={() => setActiveTab('theory')}
              className={`pb-3 px-4 text-xs tracking-wide transition-all ${
                activeTab === 'theory'
                  ? 'border-b-2 border-[var(--fill)] text-[var(--ink)] font-bold'
                  : 'border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)] font-semibold'
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
                  <p className="text-xs text-[var(--ink-soft)]">
                    These rules currently satisfy conditions (firing strength &alpha; = min(&mu;<sub>att</sub>, &mu;<sub>marks</sub>, &mu;<sub>assign</sub>) &gt; 0) and participate in Centroid Defuzzification:
                  </p>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[var(--bg-result)] text-[var(--ink)] border border-[var(--border-soft)]">
                    {result.activeRules.length} rule(s) fired
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.activeRules.map((rule) => {
                    const ruleBadgeStyle =
                      rule.risk === 'high'
                        ? 'bg-[var(--risk-high)] text-[var(--bg-page)]'
                        : rule.risk === 'moderate'
                        ? 'bg-[var(--risk-moderate)] text-[var(--ink)]'
                        : 'bg-[var(--risk-low)] text-[var(--ink)]';

                    return (
                      <div
                        key={rule.id}
                        className="rounded-[10px] p-3.5 border border-[var(--border-soft)] bg-[var(--bg-page)]/70 space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold font-mono text-[var(--ink)]">
                            Rule #{rule.id}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-[var(--border-soft)] ${ruleBadgeStyle}`}
                          >
                            {rule.risk} Risk
                          </span>
                        </div>

                        <div className="text-xs text-[var(--ink)] leading-snug">
                          {rule.description}
                        </div>

                        {/* Firing Strength bar */}
                        <div className="pt-1">
                          <div className="flex justify-between text-[11px] font-mono font-semibold text-[var(--ink)] mb-1">
                            <span>Firing Strength (α):</span>
                            <span>{rule.firingStrength.toFixed(4)}</span>
                          </div>
                          <div className="w-full bg-[var(--track)] h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-[var(--fill)] h-full rounded-full transition-all duration-200"
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
                <div className="flex items-center justify-between text-xs text-[var(--ink-soft)]">
                  <span>Complete Mamdani Rule Base (3 × 3 × 3 = 27 rules)</span>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--risk-low)]" /> Low
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--risk-moderate)] ml-2" /> Moderate
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--risk-high)] ml-2" /> High
                  </div>
                </div>

                <div className="overflow-x-auto border border-[var(--border-soft)] rounded-[10px]">
                  <table className="w-full text-left text-xs text-[var(--ink)]">
                    <thead className="bg-[var(--bg-result)] text-[var(--ink)] text-[11px] uppercase font-bold">
                      <tr>
                        <th className="py-2.5 px-3">Rule #</th>
                        <th className="py-2.5 px-3">Attendance</th>
                        <th className="py-2.5 px-3">Marks</th>
                        <th className="py-2.5 px-3">Assignment</th>
                        <th className="py-2.5 px-3">Consequent Risk</th>
                        <th className="py-2.5 px-3 text-right">Current α</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-soft)] font-mono text-[11px]">
                      {result.allRules.map((rule) => {
                        const isActive = rule.firingStrength > 0.0001;
                        return (
                          <tr
                            key={rule.id}
                            className={
                              isActive
                                ? 'bg-[var(--bg-result)]/35 font-bold text-[var(--ink)]'
                                : 'hover:bg-[var(--bg-page)]/50 text-[var(--ink)]'
                            }
                          >
                            <td className="py-2 px-3 font-bold">R{rule.id}</td>
                            <td className="py-2 px-3 uppercase">{rule.att}</td>
                            <td className="py-2 px-3 uppercase">{rule.marks}</td>
                            <td className="py-2 px-3 uppercase">{rule.assign}</td>
                            <td className="py-2 px-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-[var(--border-soft)] ${
                                  rule.risk === 'high'
                                    ? 'bg-[var(--risk-high)] text-[var(--bg-page)]'
                                    : rule.risk === 'moderate'
                                    ? 'bg-[var(--risk-moderate)] text-[var(--ink)]'
                                    : 'bg-[var(--risk-low)] text-[var(--ink)]'
                                }`}
                              >
                                {rule.risk}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-right font-bold">
                              {isActive ? rule.firingStrength.toFixed(4) : '0.0000'}
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
              <div className="space-y-4 text-xs text-[var(--ink)] leading-relaxed">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-[10px] bg-[var(--bg-page)]/70 border border-[var(--border-soft)] space-y-2">
                    <h5 className="font-bold text-[var(--ink)] text-sm">
                      1. Fuzzification & Membership Functions
                    </h5>
                    <p>
                      Each input variable {'$x \\in [0, 100]$'} is mapped into fuzzy linguistic sets using Trapezoidal ({'$\\text{trapmf}$'}) and Triangular ({'$\\text{trimf}$'}) membership functions:
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

                  <div className="p-4 rounded-[10px] bg-[var(--bg-page)]/70 border border-[var(--border-soft)] space-y-2">
                    <h5 className="font-bold text-[var(--ink)] text-sm">
                      2. Mamdani Inference & Defuzzification
                    </h5>
                    <p>
                      Mamdani min-operator is applied for antecedent conjunction:
                    </p>
                    <div className="p-2 rounded-[8px] bg-[var(--bg-result)]/35 border border-[var(--border-soft)] font-mono text-[11px] text-center font-bold">
                      &alpha;<sub>k</sub> = min(&mu;<sub>att</sub>, &mu;<sub>marks</sub>, &mu;<sub>assign</sub>)
                    </div>
                    <p>
                      Consequent sets are clipped and aggregated via max operator, then defuzzified using Centroid (Center of Gravity):
                    </p>
                    <div className="p-2 rounded-[8px] bg-[var(--bg-result)]/35 border border-[var(--border-soft)] font-mono text-[11px] text-center font-bold">
                      y* = (&Sigma; y<sub>i</sub> &middot; &mu;<sub>agg</sub>(y<sub>i</sub>)) / (&Sigma; &mu;<sub>agg</sub>(y<sub>i</sub>))
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-[10px] bg-[var(--bg-result)]/35 border border-[var(--border-soft)] text-[var(--ink)]">
                  <strong className="block font-bold mb-1">Academic Risk Interpretation:</strong>
                  <span className="space-y-1 block">
                    <span>
                      • <strong>Low Risk (0 - 34.99%)</strong>: Sage standing. High retention probability, good lecture attendance and solid performance.
                    </span>
                    <br />
                    <span>
                      • <strong>Moderate Risk (35 - 59.99%)</strong>: Sand warning zone. Identified weaknesses requiring faculty mentoring.
                    </span>
                    <br />
                    <span>
                      • <strong>High Risk (60 - 100%)</strong>: Terracotta critical alert. High probability of course failure. Immediate remediation protocol recommended.
                    </span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-soft)] mt-12 py-6 text-center text-xs text-[var(--ink-soft)] bg-[var(--bg-page)]">
        <p className="font-medium">Soft Computing Course Project • Student Academic-Risk Fuzzy Logic Classifier</p>
        <p className="mt-1 font-mono text-[11px]">Styled in Warm Cream, Sand, Forest, Mint & Sage</p>
      </footer>
    </div>
  );
}
