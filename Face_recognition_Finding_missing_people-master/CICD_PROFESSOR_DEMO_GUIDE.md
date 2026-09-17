# 🚀 FaceTrace CI/CD Pipeline: Professor Demonstration Guide

This guide gives you step-by-step instructions, commands, live demonstration workflows, and talking points to demonstrate your **CI/CD (Continuous Integration & Continuous Deployment)** pipeline to your professor or examiner.

---

## 📋 Table of Contents
1. [Overview of FaceTrace CI/CD](#-overview-of-facetrace-cicd)
2. [Demo Option 1: Live Push Demo (Recommended - Most Impressive)](#-demo-option-1-live-push-demo-recommended)
3. [Demo Option 2: Walkthrough on GitHub UI (Fastest - 2 Minutes)](#-demo-option-2-walkthrough-on-github-ui-fastest)
4. [Demo Option 3: Local Terminal Proof (If Internet / GitHub is Slow)](#-demo-option-3-local-terminal-proof)
5. [The 4 Stages Explained (What to say during the demo)](#-the-4-stages-explained)
6. [Bonus: Demonstrating Failure Protection (Examiners Love This!)](#-bonus-demonstrating-failure-protection)
7. [Viva & Examiner Q&A Cheatsheet](#-viva--examiner-qa-cheatsheet)

---

## 🌟 Overview of FaceTrace CI/CD

When presenting, introduce your pipeline with this 30-second elevator pitch:

> *"For FaceTrace, we implemented an automated enterprise-grade CI/CD pipeline using **GitHub Actions** and **Jenkins**. Every time a developer pushes code or opens a Pull Request, our pipeline automatically executes 4 sequential stages: automated unit testing across microservices, SAST security vulnerability scanning, Docker container artifact building with semantic versioning, and a zero-downtime Blue-Green deployment simulation."*

### Key Pipeline Files in this Repository:
- **GitHub Actions Workflow**: [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml)
- **Jenkins Pipeline**: [`Jenkinsfile`](Jenkinsfile)
- **Blue-Green Deployment Script**: [`scripts/blue-green-deploy.sh`](scripts/blue-green-deploy.sh) / [`scripts/blue-green-deploy.ps1`](scripts/blue-green-deploy.ps1)
- **Git Branching & Governance**: [`GIT_WORKFLOW.md`](GIT_WORKFLOW.md)

---

## 🎯 Demo Option 1: Live Push Demo (Recommended)
*Show that making a commit automatically triggers automated testing, security scans, and deployment in the cloud.*

### Step 1: Open GitHub Actions in your browser
1. Go to your repository:
   👉 **`https://github.com/JyotikaUppar/FaceTrace/actions`**
2. Show your professor the workflow named **"FaceTrace End-to-End CI/CD Pipeline"**.

### Step 2: Trigger a live run with a small commit
Open your terminal in VS Code and run:

```bash
# 1. Add a harmless comment or update to README or a docs file
echo "<!-- CI Demo Run -->" >> Readme.md

# 2. Stage and commit following conventional commits
git add Readme.md
git commit -m "docs: trigger CI/CD pipeline live demonstration"

# 3. Push to GitHub
git push origin main
```

### Step 3: Watch it run live with the professor
1. Immediately switch to the browser at `https://github.com/JyotikaUppar/FaceTrace/actions`.
2. Refresh the page: you will see a new workflow run with a **yellow pulsating circle** (In progress).
3. Click on the workflow name to view the visual DAG graph with all 4 stages:
   - `1. Code Lint & Automated Unit Testing` 🟡 ➔ 🟢
   - `2. CI/CD Security Checks & Vulnerability Scanning` 🟡 ➔ 🟢
   - `3. Build Automation & Artifact Versioning` 🟡 ➔ 🟢
   - `4. Deployment Pipeline & Blue-Green Simulation` 🟡 ➔ 🟢
4. Click on any job to expand the live console logs and show the test assertions passing.

---

## 🖥️ Demo Option 2: Walkthrough on GitHub UI (Fastest)
*If you don't want to push live code, walk through a previously completed successful run.*

1. Go to: **`https://github.com/JyotikaUppar/FaceTrace/actions`**
2. Click on the most recent run with a **green checkmark** (✅).
3. Show the professor the **4 stages** and explain what each one does:
   - **Job 1 (`lint-and-test`)**: Click to show the Node.js unit tests and Python `unittest` executing and passing.
   - **Job 2 (`security-sast`)**: Click to show `npm audit` scanning microservices for vulnerabilities and `hadolint` inspecting Dockerfiles.
   - **Job 3 (`docker-build-and-tag`)**: Click to show Docker Buildx validating compose configs and tagging images with Git commit hash `v1.0.0-<SHA>`.
   - **Job 4 (`deploy-simulation`)**: Click to show the Blue-Green script transitioning traffic to `green` containers.

---

## 💻 Demo Option 3: Local Terminal Proof
*If internet is slow, Wi-Fi drops, or the professor prefers local demonstration.*

You can run each stage directly in your PowerShell terminal to prove all tests and pipeline steps execute cleanly:

### 1. Run Unit Tests & Compiles (Stage 1 Simulation)
```powershell
# Test Person Service
cd "services/person-service"
npm test
cd "../.."

# Test Location Service
cd "services/location-service"
npm test
cd "../.."

# Test Python Face Recognition components
python -m py_compile face_recognition/apicall.py face_recognition/main.py
cd face_recognition
python -m unittest test_apicall.py
cd ..
```
*Result to show:* All tests pass with zero errors.

### 2. Run Security Audits (Stage 2 Simulation)
```powershell
cd "services/person-service"; npm audit --audit-level=high; cd "../.."
cd "services/location-service"; npm audit --audit-level=high; cd "../.."
cd "services/notification-service"; npm audit --audit-level=high; cd "../.."
```
*Result to show:* Audits completed without blocking critical security flaws.

### 3. Verify Docker Builds & Blue-Green Deployment (Stages 3 & 4 Simulation)
```powershell
# Validate Docker Compose config
docker compose config

# Run Blue-Green deployment simulation (PowerShell script)
.\scripts\blue-green-deploy.ps1 -TargetEnvironment green
```
*Result to show:* Health checks pass and Nginx upstream configuration dynamically switches without dropping connections.

---

## 🔬 The 4 Stages Explained

Use this section to answer when the professor asks: *"Explain what each stage in your pipeline does."*

| Stage | Name in Workflow | Purpose & Tools |
|---|---|---|
| **1** | **Code Lint & Unit Testing** | • Runs unit tests on `person-service` and `location-service` using Mocha/Jest.<br>• Compiles Python code to catch syntax issues before runtime.<br>• Executes Python unit tests on API call modules. |
| **2** | **Security & SAST Checks** | • Performs **Static Application Security Testing (SAST)**.<br>• Runs `npm audit` across microservices to detect compromised dependencies.<br>• Runs `hadolint` to enforce secure Dockerfile best practices (no root vulnerabilities). |
| **3** | **Build & Versioning** | • Validates Docker Compose multi-container configuration.<br>• Generates an immutable version tag (e.g. `v1.0.0-${GITHUB_SHA:0:7}`).<br>• Builds container images in parallel with build caching. |
| **4** | **Blue-Green Deployment** | • Executes zero-downtime deployment strategy.<br>• Spins up the new version on the inactive environment (`green`).<br>• Runs health check probes; if healthy, switches Nginx router traffic.<br>• Keeps old environment (`blue`) on standby for instant rollback if issues occur. |

---

## 🛡️ Bonus: Demonstrating Failure Protection
*Top marks tip: Show that the pipeline prevents broken code from ever being deployed.*

If the professor asks: *"What happens if a developer introduces a bug or a broken test?"*

1. **Explain the safety mechanism:**
   > *"The pipeline jobs use the `needs:` dependency keyword. Stage 2 only runs if Stage 1 passes. Stage 3 only runs if Stage 2 passes, and Stage 4 (Deployment) only runs if Stage 3 passes. If any unit test fails, the pipeline terminates immediately with a red alert, preventing any broken code from reaching production."*
2. **(Optional Live Proof):**
   - In `face_recognition/test_apicall.py`, change an `assertEqual(True, True)` to `assertEqual(True, False)`.
   - Run `python -m unittest test_apicall.py`. Show that it fails with `AssertionError`.
   - Explain: *"If pushed, GitHub Actions stops right here at Stage 1 and marks the build as failed. Production remains untouched and safe."*

---

## 💬 Viva & Examiner Q&A Cheatsheet

### Q1: Why did you choose GitHub Actions?
> **Answer:** *"GitHub Actions provides native integration with our GitHub repository. It runs natively in isolated cloud runners on every `git push` or `pull request`, providing fast feedback to developers without needing a dedicated self-hosted server."*

### Q2: Why is there also a `Jenkinsfile` in your repository?
> **Answer:** *"We designed our pipeline to be CI/CD platform-agnostic. The `.github/workflows/ci-cd.yml` handles automated cloud CI on GitHub, while `Jenkinsfile` provides support for on-premise enterprise environments using standard Jenkins Declarative Pipeline syntax."*

### Q3: What is the advantage of Blue-Green Deployment over traditional deployment?
> **Answer:** *"Traditional deployment causes downtime while old containers stop and new ones start. With Blue-Green deployment, we maintain two identical production environments (`blue` and `green`). We deploy the new code to `green`, verify it's healthy, and then instantly switch the Nginx routing proxy. Users experience **zero downtime**, and we have instantaneous rollback if an error is discovered."*

### Q4: What is SAST and why is it included in CI?
> **Answer:** *"SAST stands for Static Application Security Testing. By running `npm audit` and Dockerfile linting (`hadolint`) directly inside the CI pipeline, we implement 'Shift-Left Security'. We catch vulnerabilities and unpatched packages before code is even built or packaged into Docker containers."*

### Q5: What is your Git branching strategy?
> **Answer:** *"We follow the GitFlow model documented in [`GIT_WORKFLOW.md`](GIT_WORKFLOW.md): `main` is our protected production branch, `develop` is for feature integration, and short-lived `feature/*` branches require passing CI checks before merging."*

---

## 📝 Quick Checklist Before You Present
- [ ] You have internet connectivity to access `https://github.com/JyotikaUppar/FaceTrace/actions`.
- [ ] Make sure your last run on GitHub Actions has a **green checkmark**.
- [ ] Keep this guide open in a split window or tab for reference.
- [ ] Have VS Code open to show [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml).
