import{test,expect} from '@playwright/test';
test.use({
    storageState:{cookies:[],origins:[]}
});
// Shared state across tests not required
//let cartCount = 0;
test.describe('legacy suite', () => {
    test('login works', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    //await page.waitForTimeout(3000);
    
    await expect(page.locator('.title')).toHaveText('Products');
    });
    test('add item to cart', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        
        //xpath locator is fragile while debugging unable to move ahead from this locator.
        //await page.click(`//div[@class='inventory_list']/div[1]/div[3]/button`);
        await page.getByRole('button',{name:'Add to cart'}).first().click();   
        //shared variable is acceptable for same test but it will not work accorss different tests as it is shared among all the tests
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
    //We don't need cartCount variable here
    //cartCount = 2;
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    await page.locator('.shopping_cart_link').click();
    
     await expect(page.locator('.cart_item')).toHaveCount(2);

});
test('sort by price low to high', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await page.selectOption('.product_sort_container', 'lohi');

  await expect(page.locator('.inventory_item_price')).toHaveCount(6);

  const priceTexts = await page.locator('.inventory_item_price').allTextContents();

  for (let i = 0; i < priceTexts.length - 1; i++) {
    const currentPrice = Number(priceTexts[i].replace('$', ''));
    const nextPrice = Number(priceTexts[i + 1].replace('$', ''));
    expect(currentPrice).toBeLessThanOrEqual(nextPrice);
  }
});
});