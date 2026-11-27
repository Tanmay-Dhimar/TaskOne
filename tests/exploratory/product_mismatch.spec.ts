
import { test, expect } from '../../fixtures/test-fixtures';

// Start without the existing authenticated session.
test.use({
    storageState: {
        cookies: [],
        origins: []
    }
});

test.fail('Known defect: problem_user displays an incorrect product', async ({ page }) => {


    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('problem_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    const selectedProduct = await page.locator('.inventory_item_name').first().innerText();

    await page.locator('.inventory_item_name').first().click();

    await expect(page.locator('.inventory_details_name')).toHaveText(selectedProduct);
});
