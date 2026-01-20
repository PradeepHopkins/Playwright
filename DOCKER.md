# Docker Configuration Guide

This project includes Docker configuration for containerized development and testing of the Playwright test automation framework.

## Overview

Docker allows you to run the entire test suite in a consistent, isolated environment without worrying about local dependencies.

## Files

- **Dockerfile** - Production image for running Playwright tests with all dependencies pre-installed
- **docker-compose.yaml** - Multi-service orchestration for full-stack development and testing
- **.dockerignore** - Excludes unnecessary files from Docker build context

## Prerequisites

- Docker (v20.10+)
- Docker Compose (v2.0+)

## Docker Commands Reference

### Build Docker Image

```bash
docker build -t <IMAGE_NAME> .
```

Builds a Docker image from the Dockerfile in the current directory.

**Parameters:**
- `-t` – Tag name for the image (e.g., `pw-pageobject-test`)
- `.` – Use Dockerfile in current directory

**Example:**
```bash
docker build -t pw-pageobject-test .
```

### View Docker Images

```bash
docker images
```

Lists all locally available Docker images.

**Output fields:**
- `REPOSITORY` – Image name
- `TAG` – Version tag (e.g., latest)
- `IMAGE ID` – Unique identifier
- `CREATED` – Creation timestamp
- `SIZE` – Disk size of the image

### Run Docker Container

```bash
docker run -it <IMAGE_NAME>
```

Creates and starts a new container from the image and attaches your terminal to it.

**Parameters:**
- `-i` – Interactive mode
- `-t` – Allocate pseudo-terminal

**Example:**
```bash
docker run -it pw-pageobject-test
```

### Open an Interactive Shell

```bash
docker run -it <IMAGE_NAME> /bin/bash
```

Opens a bash shell in the container for interactive commands.

**Example:**
```bash
docker run -it pw-pageobject-test /bin/bash
```

### Open Interactive Shell with Auto-Cleanup

```bash
docker run -it --rm <IMAGE_NAME> /bin/bash
```

Opens a bash shell and automatically removes the container when you exit (best practice for testing).

**Parameters:**
- `--rm` – Automatically remove container on exit

**Example:**
```bash
docker run -it --rm pw-pageobject-test /bin/bash
```

### Run Playwright Tests in Container

```bash
docker run <IMAGE_NAME> npx playwright test
```

Executes all Playwright tests inside the container.

**Example:**
```bash
docker run pw-pageobject-test npx playwright test
```

### Run Specific Project in Container

```bash
docker run <IMAGE_NAME> npx playwright test --project=<PROJECT_NAME>
```

Runs tests for a specific project.

**Parameters:**
- `<IMAGE_NAME>` – Your Docker image name
- `<PROJECT_NAME>` – Project name from playwright.config.ts

**Example:**
```bash
docker run pw-pageobject-test npx playwright test --project=verifyLikeButton
```

## Docker Compose Commands Reference

### Run Docker Compose Services

```bash
docker-compose up
```

Builds and starts all services defined in `docker-compose.yaml`.

### Run with Auto-Cleanup

```bash
docker-compose up && docker-compose down --rmi all
```

Runs all services and automatically removes containers, networks, and images after completion.

### Stop and Remove Services

```bash
docker-compose down
```

Stops and removes containers and networks created by the previous `up` command.

### Remove Services with Images

```bash
docker-compose down --rmi all
```

Removes containers, networks, and all images built for this project. Clean removal of all resources.

## Quick Start Guide

### Option 1: Using Docker CLI

**1. Build the image:**
```bash
docker build -t pw-pageobject-test .
```

**2. Run all tests:**
```bash
docker run pw-pageobject-test npx playwright test
```

**3. Run specific project:**
```bash
docker run pw-pageobject-test npx playwright test --project=verifyLikeButton
```

**4. Access container shell (with auto-cleanup):**
```bash
docker run -it --rm pw-pageobject-test /bin/bash
```

### Option 2: Using Docker Compose

**1. Run services and tests:**
```bash
docker-compose up
```

**2. Run and auto-cleanup (recommended):**
```bash
docker-compose up && docker-compose down --rmi all
```

**3. Manual cleanup:**
```bash
docker-compose down --rmi all
```

## Common Workflow

```bash
# 1. Build image
docker build -t pw-pageobject-test .

# 2. Run tests
docker run pw-pageobject-test npx playwright test

# 3. Access shell for debugging
docker run -it --rm pw-pageobject-test /bin/bash

# 4. Using Docker Compose with auto-cleanup
docker-compose up && docker-compose down --rmi all
```

## Best Practices

- Always use `--rm` flag when opening interactive shells to avoid leaving orphaned containers
- Use `docker-compose down --rmi all` after testing to clean up all resources
- Check `playwright-report/` and `test-results/` directories for test reports (mounted volumes)
