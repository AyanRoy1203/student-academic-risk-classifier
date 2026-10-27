# Student Academic-Risk Classifier

A **Soft Computing Mamdani Fuzzy Inference System (FIS)** built with **Next.js**, **React**, and **Tailwind CSS** to classify and predict student academic vulnerability based on multidimensional performance factors.

---

## 🎯 Overview

Predicting student academic risk early enables targeted academic mentoring, counseling, and intervention. This project models non-linear, imprecise academic evaluations using **Fuzzy Logic (Mamdani Inference)** with **Centroid Defuzzification**.

### 🌟 Key Features

- **Mamdani Fuzzy Inference System (FIS)**:
  - **3 Input Dimensions**:
    - **Attendance** ($0 - 100\%$): Low (`trapmf`), Medium (`trimf`), High (`trapmf`)
    - **Exam Marks** ($0 - 100\%$): Low (`trapmf`), Medium (`trimf`), High (`trapmf`)
    - **Assignment Performance** ($0 - 100\%$): Low (`trapmf`), Medium (`trimf`), High (`trapmf`)
  - **Consequent Output**:
    - **Academic Risk Index** ($0 - 100\%$): Low Risk, Moderate Risk, and High Risk.
  - **27 Mamdani Rules**: Full rule matrix covering all possible antecedent combinations.
  - **Centroid Defuzzification**: Center of Gravity (CoG) integration for a continuous, defensible crisp risk score.
- **Interactive Tailwind CSS Dashboard**:
  - Dual-input controls (smooth sliders + numerical inputs).
  - Live fuzzification inspector showing degrees of membership ($\mu$) and dominant sets.
  - Dynamic risk meter card with color-coded alerts (Green, Amber, Red).
  - Diagnostic insight generator suggesting targeted remediation based on individual deficiencies.
  - Sample student profile presets (*Critical At-Risk*, *Diligent but Exam-Deficient*, *Irregular Aptitude*, *Average*, *Top Honors*).
  - Live active firing rules breakdown and theoretical reference documentation.

---

## 🧮 Fuzzy Logic Architecture

### 1. Antecedents (Input Membership Functions)

- **Attendance**:
  - `Low`: $\text{trapmf}(x, [0, 0, 35, 55])$
  - `Medium`: $\text{trimf}(x, [40, 65, 85])$
  - `High`: $\text{trapmf}(x, [70, 85, 100, 100])$
- **Marks**:
  - `Low`: $\text{trapmf}(x, [0, 0, 35, 55])$
  - `Medium`: $\text{trimf}(x, [40, 60, 80])$
  - `High`: $\text{trapmf}(x, [65, 82, 100, 100])$
- **Assignment**:
  - `Low`: $\text{trapmf}(x, [0, 0, 35, 55])$
  - `Medium`: $\text{trimf}(x, [40, 60, 80])$
  - `High`: $\text{trapmf}(x, [65, 82, 100, 100])$

### 2. Consequent (Academic Risk)

- `Low Risk`: $\text{trapmf}(y, [0, 0, 20, 42])$
- `Moderate Risk`: $\text{trimf}(y, [28, 50, 72])$
- `High Risk`: $\text{trapmf}(y, [58, 80, 100, 100])$

### 3. Defuzzification (Centroid Method)

$$y^* = \frac{\sum_{i=1}^N y_i \cdot \mu_{\text{agg}}(y_i)}{\sum_{i=1}^N \mu_{\text{agg}}(y_i)}$$

Where:
- $\alpha_k = \min(\mu_{\text{att}}, \mu_{\text{marks}}, \mu_{\text{assign}})$ is the firing strength of Rule $k$.
- $\mu_{\text{agg}}(y) = \max_k \min(\alpha_k, \mu_{\text{consequent}}(y))$ is the aggregated fuzzy output set.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.17+ or v20+)
- npm (v9+)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/AyanRoy1203/Student-Academic-Risk-Classifier.git
cd Student-Academic-Risk-Classifier
npm install
```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.js       # App layout with Google Geist fonts
│   │   ├── page.js         # Interactive Fuzzy Logic Dashboard
│   │   └── globals.css     # Tailwind CSS styles
│   └── utils/
│       └── fuzzyLogic.js   # Pure JavaScript Mamdani FIS Engine
├── postcss.config.mjs      # PostCSS configuration
├── next.config.mjs         # Next.js configuration
└── package.json            # Dependencies & scripts
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
