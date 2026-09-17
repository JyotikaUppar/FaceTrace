# FaceTrace Git Workflow & Development Governance

This document outlines the standard Git branching strategy, commit conventions, and pull request workflows for the **FaceTrace** microservices application.

---

## 🌿 Branching Strategy (GitFlow Model)

We adopt a structured **GitFlow** branching model to maintain stability across environments:

```
  main (Production)         -------------------●--------------> (v1.0.0 Release)
                                              /
  release/*                               ---●---------------
                                            /
  develop (Integration)     ---●-----------●------------------>
                                \         /
  feature/*                      ---●---●--------------------->
```

### Key Branches

- **`main`**: Production-ready code. Every commit on `main` is tagged with a semantic version (e.g. `v1.0.0`) and automatically triggers deployment pipelines.
- **`develop`**: Integration branch for upcoming releases. Feature branches merge into `develop` after passing automated CI testing.
- **`feature/<feature-name>`**: Dedicated branches for new features or user stories (e.g., `feature/person-face-indexing`).
- **`bugfix/<bug-description>`**: Branches for resolving non-critical bugs found during integration testing.
- **`hotfix/<issue-id>`**: Emergency fixes branched directly off `main` and merged into both `main` and `develop`.

---

## 📝 Commit Conventions (Conventional Commits)

Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

`<type>(<scope>): <short description>`

### Allowed Types
- `feat`: A new feature for the user or API endpoint.
- `fix`: A bug fix in code or configuration.
- `docs`: Documentation changes only.
- `style`: Formatting, missing semi-colons, no code change.
- `refactor`: Code change that neither fixes a bug nor adds a feature.
- `test`: Adding missing tests or refactoring existing tests.
- `ci`: Changes to CI/CD workflows (`Jenkinsfile`, `.github/workflows/`).
- `chore`: Maintenance tasks, dependency updates.

### Examples
- `feat(person-service): add search endpoint by aadhaar number`
- `fix(face_recognition): resolve console log variable error in apicall`
- `ci(github-actions): integrate trivy vulnerability scanner`

---

## 🔀 Pull Request & Merge Workflow

1. Create a feature branch off `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/aadhaar-indexing
   ```
2. Develop changes, ensuring all unit tests and syntax checks pass locally:
   ```bash
   npm test
   python -m pytest
   ```
3. Commit using conventional format and push to remote:
   ```bash
   git add .
   git commit -m "feat(person-service): implement search by aadhaar ID"
   git push origin feature/aadhaar-indexing
   ```
4. Open a Pull Request targeting `develop`.
5. Automated CI pipelines will execute unit tests, SAST scans, and Docker container verification before allowing merge.
