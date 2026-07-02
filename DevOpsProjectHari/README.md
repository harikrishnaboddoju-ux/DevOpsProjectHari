# Centralized Dependency Management and Release Automation Pipeline

This project demonstrates a robust CI/CD pipeline integrated with a centralized artifact registry, solving the problem commonly known as **"Dependency Hell"**.

## The Problem: Dependency Hell
In complex software projects, managing dependencies manually leads to:
- **Inconsistent Builds:** "It works on my machine" issues due to varying library versions.
- **Transitive Dependency Conflicts:** Library A requires version 1.0 of Library C, but Library B requires version 2.0.
- **Unreliable Sources:** External repositories might go down, removing access to critical libraries.
- **Security Risks:** Downloading unverified libraries directly from the internet exposes the system to vulnerabilities.

## The Solution
This architecture resolves these issues by using:
1. **Centralized Registry (JFrog Artifactory):** Acts as a single source of truth. All external libraries are cached locally, and internal artifacts are versioned and stored securely. If the internet goes down, builds can still succeed.
2. **Build Automation (Maven):** The `pom.xml` explicitly defines dependencies and their versions, ensuring every build resolves exactly the same artifacts.
3. **Continuous Integration (Jenkins):** The `Jenkinsfile` automates the process of checking out code, running tests, dynamically bumping the semantic version, packaging the `.jar`, and deploying it to the registry.

## Project Structure
- `pom.xml`: Maven configuration for dependencies, plugins, and distribution management.
- `src/`: Contains the Java source code and JUnit tests.
- `Jenkinsfile`: Declarative pipeline for automation.
- `dashboard/`: A real-time monitoring dashboard simulation with a cyber-physical resilience theme for presentations.

## Running Locally
To verify the build and tests locally, run:
```bash
mvn clean package
```

To view the dashboard, simply open `dashboard/index.html` in any modern web browser.
