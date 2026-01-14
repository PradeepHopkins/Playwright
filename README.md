# Playwright Allure Report Configuration

This document describes how to configure **Allure Reports** in a **Playwright (JavaScript/TypeScript) test automation framework**. The setup supports local execution and CI/CD pipelines.

## Prerequisites

Ensure the following are installed:

* Node.js (v16 or higher recommended)
* Playwright test framework
* npm or yarn package manager

Verify Playwright installation:

```bash
npx playwright test
```

---

## Install Dependencies

### Install Allure Playwright Reporter

```bash
npm install --save-dev allure-playwright
```

### Install Allure Command Line Tool (Global)

```bash
npm install --global allure-commandline
```

Verify installation:

```bash
allure --version
```

---

## Playwright Configuration

Update `playwright.config.ts` or `playwright.config.js` to enable Allure reporting.

### Basic Configuration

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['allure-playwright'],
    ['html'],
    ['list']
  ],
});
```

### Custom Output Directory (Recommended)

```ts
reporter: [
  ['allure-playwright', { outputFolder: 'allure-results' }]
]
```

---

## Run Tests

Execute Playwright tests:

```bash
npx playwright test
```

This generates Allure result files in:

```
allure-results/
```

---

## Generate and View Allure Report

### Generate Report

```bash
allure generate -o allure-report --open
```

### Open Report

```bash
allure open allure-report
```

The report opens in a browser with interactive dashboards.

---

## Add Allure Metadata

Enhance reports with features, stories, and severity.

```ts
import { test } from '@playwright/test';
import { allure } from 'allure-playwright';

test('Login test', async ({ page }) => {
  await allure.feature('Authentication');
  await allure.story('User Login');
  await allure.severity('critical');

  await page.goto('https://example.com');
});
```

### Supported Labels

* epic
* feature
* story
* severity
* owner
* tag

---

## Screenshots, Videos, and Traces

Enable automatic attachments in `playwright.config.ts`:

```ts
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry',
}
```

These artifacts are automatically attached to the Allure report.

### Manual Attachments

```ts
import { allure } from 'allure-playwright';

await allure.attachment(
  'API Response',
  JSON.stringify(responseBody, null, 2),
  'application/json'
);
```

---

## Environment Information

Create the following file:

```
allure-results/environment.properties
```

Example:

```properties
Browser=Chromium
Environment=QA
BaseURL=https://example.com
```

This information appears under the **Environment** section in the report.

---

## CI/CD Integration Example (GitHub Actions)

```yaml
- name: Run Playwright Tests
  run: npx playwright test

- name: Generate Allure Report
  run: allure generate allure-results --clean -o allure-report

- name: Upload Allure Report
  uses: actions/upload-artifact@v4
  with:
    name: allure-report
    path: allure-report
```

---

## Recommended Project Structure

```
project-root/
 ├── tests/
 ├── playwright.config.ts
 ├── allure-results/
 ├── allure-report/
 └── package.json
```

---

## Common Issues

| Issue                       | Resolution                                  |
| --------------------------- | ------------------------------------------- |
| `allure: command not found` | Install Allure CLI globally                 |
| Empty report                | Ensure tests executed successfully          |
| Missing screenshots         | Enable Playwright screenshot/video settings |
| CI report missing           | Persist `allure-results` directory          |

---

## Summary

* Install `allure-playwright`
* Configure Playwright reporter
* Execute tests
* Generate and view Allure report
* Enhance with metadata and attachments

---

If you want, I can also:

* Convert this to **enterprise README standards**
* Add **badges and report links**
* Create **Docker-based Allure setup**
* Add **multi-environment configuration**

State your preference and I will update the README accordingly.
