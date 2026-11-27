import { test, expect } from '@playwright/test';
// Shared state across tests
let cartCount = 0;
test.describe('legacy suite', () => {
    test('login works', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
        
        //Need to use await with asynchronous playwright actions
        //methods that returns promise, we need to use await everytime 
        page.fill('#user-name', 'standard_user');
        page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        
        //use of waits explicitly makes test solwer
        await page.waitForTimeout(3000);
        
        //it is an auto retrying assertion makes it inaccurate
        expect(await page.locator('.title').isVisible()).toBe(true);
    });
    test('add item to cart', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        
        //Use of xpath makes it fragile 
        //While debugging excution was not moving ahead
        await page.click(`//div[@class='inventory_list']/div[1]/div[3]/button`);
        
        //A shared variable might provide wrong answers/output.
        cartCount++;
        const badge = await page.locator('.shopping_cart_badge').textContent();
        expect(badge).toBe(String(cartCount));
    });
    test('cart has two items', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
        await page.fill('#user-name', 'performance_glitch_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        const buttons = page.locator('button.btn_inventory');
        await buttons.nth(0).click();
        await buttons.nth(1).click();
        //A shared variable might provide wrong answers/output.
        cartCount = 2;
        //cart page is not being opened before checking
        const items = await page.locator('.cart_item').count();
        //toBeGraterThanEqual(0) always passes even when there are 0 elements
        expect(items).toBeGreaterThanOrEqual(0);
    });
    test('sort by price low to high', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await page.selectOption('.product_sort_container', 'lohi');
        const prices = await
        //It only checks whether prices are exists or not, not verifying sorting order 

        page.locator('.inventory_item_price').allTextContents();
        expect(prices.length).toBeGreaterThan(0);   
    });
});