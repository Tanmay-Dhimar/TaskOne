# QA Automation Assignment – Playwright with TypeScript

## 1. Project Overview

This project contains UI automation tests for the SauceDemo application using Playwright and TypeScript.

The framework follows the Page Object Model (POM) design pattern and uses custom fixtures to improve code reusability and maintainability.

The assignment also includes debugging unreliable legacy tests and performing manual exploratory testing with different SauceDemo test users.

## 2. Technology Stack

- **Programming Language:** TypeScript
- **Automation Tool:** Playwright
- **Test Framework:** Playwright Test
- **Design Pattern:** Page Object Model (POM)
- **Assertions:** Playwright Web-First Assertions
- **Browser Coverage:** Chromium, Firefox, WebKit
- **Version Control:** Git and GitHub

## 3. Project Structure

```text
TaskOne/
│
├── authentication/
│   └── state.json
│
├── fixtures/
│   └── test-fixtures.ts
│
├── pages/
│   ├── loginPage.ts
│   ├── InventoryPage.ts
│   ├── cartPage.ts
│   └── checkoutPage.ts
│
├── tests/
│   ├── legacy/
│   │   ├── legacy.old.spec.ts
│   │   └── legacy.corrected.spec.ts
│   │
│   ├── exploratory/
│   │   └── product_mismatch.spec.ts
│   │
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   └── storageState.setup.ts
│
├── docs/
│   └── exploratory-testing-report.md
│
├── evidence/
│   └── Exploratory testing video evidence
│
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md
```

## 4. Framework Design

### Page Object Model (POM)

Page classes contain locators and reusable actions for their respective application pages.

This approach improves code organization, reusability, and maintainability.

### Custom Fixtures

Custom fixtures are created in `fixtures/test-fixtures.ts` to initialize and provide reusable page objects to test files.

The framework includes:

- `loginPage`
- `inventoryPage`
- `cartPage`
- `checkoutPage`

### Authentication and Storage State

The setup test logs in using valid SauceDemo credentials and saves the authenticated browser state to:

`authentication/state.json`

The Chromium project reuses this saved state, avoiding repeated login steps in inventory tests.

Exploratory tests that require a different test user use a fresh browser storage state.

### Test Tags

Tests use the following tags:

- `@smoke`
- `@regression`

## 5. UI Test Coverage

The UI automation suite covers the following scenarios:

| Test ID | Scenario                                    |
| ------- | ------------------------------------------- |
| TC_01   | Successful login and storage state creation |
| TC_02   | Unsuccessful login with locked-out user     |
| TC_03   | Product sorting – Price low to high         |
| TC_04   | Add product to cart                         |
| TC_05   | Remove product from cart                    |
| TC_06   | Verify cart item count                      |
| TC_07   | Verify cart contents                        |
| TC_08   | Complete checkout and validate order total  |
| TC_09   | Checkout form validation                    |
| TC_10   | Cart persistence after page reload          |

## 6. Installation and Setup

Clone the repository:

```bash
git clone https://github.com/Tanmay-Dhimar/TaskOne.git
```

Navigate to the project directory:

```bash
cd TaskOne
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## 7. Running UI Tests

Run all tests:

```bash
npx playwright test
```

Run inventory tests:

```bash
npx playwright test tests/inventory.spec.ts
```

Run login tests:

```bash
npx playwright test tests/login.spec.ts
```

Run smoke tests:

```bash
npx playwright test --grep @smoke
```

Run regression tests:

```bash
npx playwright test --grep @regression
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run the exploratory product mismatch test:

```bash
npx playwright test tests/exploratory/product_mismatch.spec.ts --project=chromium --headed
```

View the HTML report:

```bash
npx playwright show-report
```

## 8. API Testing

API automation was not implemented as part of this submission.

I am currently learning API automation and do not yet have sufficient practical experience to implement and validate API test scenarios independently.

I prefer to be transparent about this limitation rather than submit incomplete or unverified tests.

This is an area I am actively working to improve.

## 9. Legacy Test Analysis

The legacy test suite contained several issues that could lead to unreliable test execution and incorrect validations.

### Issues Identified

- Missing `await` statements for asynchronous Playwright actions.
- Usage of fixed waits such as `waitForTimeout()`.
- Fragile locators.
- Shared mutable state between tests.
- Incorrect cart navigation and validation.
- Assertions that did not properly validate the expected behaviour.
- Sorting test checked whether products existed instead of verifying their actual order.

### Improvements Made

- Added `await` to asynchronous Playwright actions.
- Replaced fixed waits with Playwright assertions.
- Improved locator usage.
- Removed unnecessary shared state.
- Added appropriate cart navigation.
- Improved assertions to validate actual application behaviour.
- Added proper sorting validation by comparing product prices.

### Repeated Execution

The corrected legacy tests were executed using Playwright's repeat execution option.

- **Total test scenarios:** 4
- **Repeat count:** 10
- **Total executions:** 40
- **Result:** All 40 executions passed.

Command used:

```bash
npx playwright test tests/legacy --repeat-each=10 --workers=4
```

### Practices to Avoid Unreliable Tests

1. Always use `await` with asynchronous Playwright actions and avoid fixed waits.
2. Avoid shared mutable test data and use reliable locators with meaningful assertions.

## 10. Exploratory Testing

Manual exploratory testing was performed using the following SauceDemo users:

- `problem_user`
- `performance_glitch_user`

### Findings

The following behaviours were observed during exploratory testing:

**Using `problem_user`:**

1. Product details page displays a different product from the one selected on the inventory dashboard.
2. Product sorting does not work as expected.
3. Removing products from the inventory dashboard does not appear to work correctly.
4. Product details page displays Add to Cart instead of Remove after the product has already been added.
5. Checkout form has an issue involving the last name field.
6. Checkout information page can be accessed with an empty cart.
7. About Us page returns a 404 error.

**Using `performance_glitch_user`:**

1. Checkout information page can be accessed with an empty cart.
2. Navigation between pages takes noticeably longer than expected.
3. About Us page is accessible.

### Detailed Bug Reports and Evidence

Detailed descriptions, reproduction steps, expected results, actual results, severity, and evidence are documented separately:

`docs/exploratory-testing-report.md`

Supporting video recordings are stored in the `evidence/` directory.

### Automated Exploratory Finding

The product mismatch issue was selected as the most important finding for automation.

**Test File:**

`tests/exploratory/product_mismatch.spec.ts`

**Test User:** `problem_user`

**Expected Behaviour:**

The product details page should display the same product selected from the inventory dashboard.

**Actual Behaviour:**

The test selected `Sauce Labs Backpack` from the dashboard, but the details page displayed `Sauce Labs Fleece Jacket`.

**Automation Result:**

The test reproduced the defect successfully. It is marked as an expected failure using Playwright's `test.fail()`.

## 11. Known Limitations and Assumptions

- API automation has not been implemented as I don't have experience with API automation. I'll be learning API automation with playwright&#x20;
- Performance observations have not been supported by formal timing measurements.
- The exploratory automation currently covers the product mismatch finding only.
- The About Us page behavior differs between the two test users.

## 12. AI Assistance

I used an AI assistant (Claude) in this assignment for learning and understanding web-first assertions, learning how to create and use custom fixtures, Reviewing my page objects, setup file and config for mistakes, structuring and improving this README file, structuring the bug reporting document (format, severity and wording). All exploratory testing, test execution and verification were done by me.
