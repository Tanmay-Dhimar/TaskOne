import { test, expect } from '../fixtures/test-fixtures';

test.beforeEach("Launch",async({page})=>{
    await page.goto("https://www.saucedemo.com/inventory.html");
});
test('TC_03 – Product Sorting',{tag:'@regression'},async({inventoryPage})=>{
    await inventoryPage .sortProductsBy('lohi');
    const prices = await inventoryPage .productsPrice.allTextContents();
    for (let i=0;i<prices.length-1;i++){
        let currentPrice = Number(prices[i].replace('$',''));
        let nextprice = Number(prices[i+1].replace('$',''));
    
        expect(currentPrice).toBeLessThanOrEqual(nextprice);     
    }
});
test('TC_04 - Add product to cart',{tag:['@smoke','@regression']},async({inventoryPage})=>{
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await expect(inventoryPage .removeBtn).toBeVisible();
});
test('TC_05 - Remve product from cart',{tag:'@regression'},async({inventoryPage})=>{
    await inventoryPage .porductRemoveCart('Sauce Labs Backpack');
    await expect(inventoryPage .cartBadge).toBeHidden();
});
test('TC_06 - Verify cart item count',{tag:['@smoke','@regression']},async({inventoryPage})=>{
    await inventoryPage.countAddToCart('Sauce Labs Backpack','Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');
});
test('TC_07 - Verify cart contents',{tag:'@regression'},async({inventoryPage})=>{
    await inventoryPage.cartProductsVerify('Sauce Labs Backpack','Sauce Labs Bike Light');
    //.cart_item_label>a>div
    await expect(inventoryPage.cartProducts.nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(inventoryPage .cartProducts.nth(1)).toHaveText('Sauce Labs Bike Light');
});
test('TC_08 - Verify complete checkout',{tag:['@smoke','@regression']},async({inventoryPage, cartPage, checkoutPage})=>{
    
    await inventoryPage.checkoutProducts('Sauce Labs Backpack','Sauce Labs Bike Light');
    await expect(inventoryPage.cartProducts.nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(inventoryPage.cartProducts.nth(1)).toHaveText('Sauce Labs Bike Light');
    await cartPage.checkout();

    await checkoutPage.fillCheckoutDetails('Tanmay','Dhimar','395001');
    await expect(checkoutPage.pName.nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(checkoutPage.pName.nth(1)).toHaveText('Sauce Labs Bike Light');
    
    const calSubTotal = await checkoutPage.calTotalOfItem();
    const displayedItemTotal = await checkoutPage.totalOfItems();
    expect(displayedItemTotal).toBe(calSubTotal);
    
    const taxAmount = await checkoutPage.calTax();
    expect(taxAmount).toBeGreaterThan(0);
    
    const actualOrderTotal = await checkoutPage.totalAmt();
    const expectedOrderTotal = Number((displayedItemTotal+taxAmount).toFixed(2));
    expect(actualOrderTotal).toBe(expectedOrderTotal);
});
test('TC_09 - Verify Checkout Form Validation',{tag:'@regression'},async({inventoryPage,cartPage,checkoutPage})=>{
    
    await inventoryPage.checkoutProducts('Sauce Labs Backpack','Sauce Labs Bike Light');
    
    await cartPage.checkout();
    
    await checkoutPage.checkOutEmpty();
    
    await expect(checkoutPage.errorMsg).toHaveText('Error: First Name is required');
});
test('TC_10 – Verify Cart Persistence After Page Reload',{tag:'@regression'},async({page,inventoryPage,checkoutPage})=>{
    await inventoryPage.itemCountRefresh('Sauce Labs Backpack','Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');
    await page.reload();
    await expect(inventoryPage.cartBadge).toHaveText('2');
    await inventoryPage.cartIcon.click();
    await expect(checkoutPage.pName.nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(checkoutPage.pName.nth(1)).toHaveText('Sauce Labs Bike Light');
});