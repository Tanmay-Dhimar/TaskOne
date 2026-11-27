# Task 4 – Manual Exploratory Testing Report

**Application:** SauceDemo  
**Testing Type:** Manual Exploratory Testing  
**Test Users:**
- `problem_user`
- `performance_glitch_user`

## 1. Findings – problem_user

### Bug 1: Product Details Page Displays an Incorrect Product
- **Severity:** Medium
- **Description:** The product displayed on the inventory dashboard differs from the product displayed after opening its details page.
- **Steps to Reproduce:**
  1. Log in using `problem_user`.
  2. Select a product from the inventory dashboard.
  3. Open its product details page.
  4. Compare the product displayed on both pages.
- **Expected Result:** The details page should display the same product selected from the dashboard.
- **Actual Result:** A different product is displayed on the details page.
- **Status:** Confirmed by manual testing.

### Bug 2: Product Sorting Does Not Work
- **Severity:** Medium
- **Description:** Selecting a sorting option does not appear to sort products correctly on the inventory dashboard.
- **Steps to Reproduce:**
  1. Log in using `problem_user`.
  2. Open the product sorting dropdown.
  3. Select a sorting option, such as Price (low to high).
  4. Observe the product order.
- **Expected Result:** Products should be displayed according to the selected sorting option.
- **Actual Result:** Products do not appear to be sorted according to the selected option.
- **Status:** Observed; exact sorting option and resulting order should be verified.

### Bug 3: Remove Product Behaviour on Inventory Dashboard
- **Severity:** Medium
- **Description:** Removing a product from the inventory dashboard does not appear to work as expected.
- **Steps to Reproduce:**
  1. Log in using `problem_user`.
  2. Add a product to the cart.
  3. Click the Remove button on the inventory dashboard.
  4. Observe the cart badge and product button.
- **Expected Result:** The product should be removed from the cart and the cart count should be updated.
- **Actual Result:** The product appeared to remain in the cart during the observed test.
- **Status:** Needs further verification.

### Bug 4: Incorrect Add to Cart Button on Product Details Page
- **Severity:** Medium
- **Description:** After adding a product to the cart, the product details page still displays the Add to Cart button instead of Remove.
- **Steps to Reproduce:**
  1. Log in using `problem_user`.
  2. Add a product to the cart from the inventory dashboard.
  3. Open that product's details page.
  4. Observe the cart action button.
- **Expected Result:** The button should display Remove because the product has already been added to the cart.
- **Actual Result:** The button still displays Add to Cart.
- **Status:** Observed in screen recording.

### Bug 5: Checkout Last Name Field Issue
- **Severity:** Medium
- **Description:** The checkout process could not be completed because of an issue entering the last name in the checkout information form.
- **Steps to Reproduce:**
  1. Log in using `problem_user`.
  2. Add a product to the cart.
  3. Navigate to checkout.
  4. Enter the checkout information.
  5. Attempt to enter the last name.
- **Expected Result:** The last name field should accept valid text input.
- **Actual Result:** The checkout process could not proceed as expected.
- **Status:** Observed; confirm whether the field itself rejects input or another validation issue prevents checkout.

### Bug 6: Checkout Accessible with an Empty Cart
- **Severity:** Medium
- **Description:** The application allows navigation to the checkout information page even when the cart is empty.
- **Steps to Reproduce:**
  1. Log in using `problem_user`.
  2. Navigate to the cart without adding products.
  3. Click Checkout.
- **Expected Result:** The application should prevent checkout and inform the user that the cart is empty.
- **Actual Result:** The checkout information page opens despite the empty cart.
- **Status:** Observed in screen recording.

### Bug 7: About Us Page Returns 404
- **Severity:** Low
- **Description:** The About Us page returned a 404 error when accessed using `problem_user`.
- **Steps to Reproduce:**
  1. Log in using `problem_user`.
  2. Navigate to the About Us page using the available navigation option.
  3. Observe the page response.
- **Expected Result:** The About Us page should open successfully, if it is intended to be available.
- **Actual Result:** A 404 error was displayed.
- **Status:** User-specific observation; the page was accessible using `performance_glitch_user`.

## 2. Findings – performance_glitch_user

### Bug 8: Checkout Accessible with an Empty Cart
- **Severity:** Medium
- **Description:** The application allows navigation to the checkout information page even when the cart is empty.
- **Steps to Reproduce:**
  1. Log in using `performance_glitch_user`.
  2. Navigate to the cart without adding products.
  3. Click Checkout.
- **Expected Result:** The application should prevent checkout and inform the user that the cart is empty.
- **Actual Result:** The checkout information page opens despite the empty cart.
- **Status:** Observed during manual testing.

### Observation 9: Slow Page Navigation
- **Severity:** To be determined
- **Description:** Navigation between pages takes longer than expected when using `performance_glitch_user`.
- **Steps to Reproduce:**
  1. Log in using `performance_glitch_user`.
  2. Navigate between the inventory, product details, cart, and checkout pages.
  3. Observe the time taken for navigation.
- **Expected Result:** Pages should load and respond within an acceptable time.
- **Actual Result:** Navigation takes noticeably longer than expected.
- **Status:** Performance observation; requires timing measurements and comparison before reporting as a confirmed defect.

## 3. Additional Notes

- The empty-cart checkout behaviour was observed with both test users. It can be documented as one shared finding with both usernames listed, rather than as two separate bugs.
- The About Us 404 behaviour was observed with `problem_user`, while the page was accessible with `performance_glitch_user`.
- Username case sensitivity alone was not considered a confirmed defect.
- The inability to add products was not included because the available recording showed the Add to Cart action working.
- Findings requiring further verification should not be presented as confirmed defects.

## 4. Automation Coverage

**Automated Finding:** Product Details Page Displays an Incorrect Product

**Test File:** `tests/exploratory/product_mismatch.spec.ts`

**Test User:** `problem_user`

**Result:** Expected Failure (XFAIL)

**Observation:**
The automated test selected Sauce Labs Backpack from the inventory dashboard, but the details page displayed Sauce Labs Fleece Jacket.

**Assertion:**
The product name on the details page should match the product selected from the inventory dashboard.

**Conclusion:**
The test successfully reproduced the reported defect.