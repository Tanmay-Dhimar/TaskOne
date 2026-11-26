import{test,expect} from '@playwright/test';
import{InventoryPage} from '../pages/InventoryPage';
import{AddToCart} from '../pages/cartPage';
import { CheckOut } from '../pages/checkoutPage';

test.beforeEach("Launch",async({page})=>{
    await page.goto("https://www.saucedemo.com/inventory.html");
});
test('TC_03 – Product Sorting',{tag:'@regression'},async({page})=>{
    const inventoryPageobj=new InventoryPage(page);
    await inventoryPageobj.sortProductsBy('lohi');
    const prices =await  inventoryPageobj.productsPrice.allTextContents();
    for (let i=0;i<prices.length-1;i++){
        let currentPrice = Number(prices[i].replace('$',''));
        let nextprice = Number(prices[i+1].replace('$',''));
    
        expect(currentPrice).toBeLessThanOrEqual(nextprice);     
    }
});
test('TC_04 - Add product to cart',{tag:['@smoke','@regression']},async({page})=>{
    const inventoryPageObj=new InventoryPage(page);
    await inventoryPageObj.addProductToCart('Sauce Labs Backpack');
    await expect(inventoryPageObj.removeBtn).toBeVisible();
});
test('TC_05 - Remve product from cart',{tag:'@regression'},async({page})=>{
    const inventoryPageObj=new InventoryPage(page);
    await inventoryPageObj.porductRemoveCart('Sauce Labs Backpack');
    await expect(inventoryPageObj.cartBadge).toBeHidden();
});
test('TC_06 - Verify cart item count',{tag:['@smoke','@regression']},async({page})=>{
    const inventoryPageObj = new InventoryPage(page);
    await inventoryPageObj.countAddToCart('Sauce Labs Backpack','Sauce Labs Bike Light');
    await expect(inventoryPageObj.cartBadge).toHaveText('2');
});
test('TC_07 - Verify cart contents',{tag:'@regression'},async({page})=>{
    const invetoryPageObj = new InventoryPage(page);
    await invetoryPageObj.cartProductsVerify('Sauce Labs Backpack','Sauce Labs Bike Light');
    //.cart_item_label>a>div
    await expect(invetoryPageObj.cartProducts.nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(invetoryPageObj.cartProducts.nth(1)).toHaveText('Sauce Labs Bike Light');
});
test('TC_08 - Verify complete checkout',{tag:['@smoke','@regression']},async({page})=>{
    const cartObj = new AddToCart(page);
    const checkOutObj = new CheckOut(page);
    const inventoryObj = new InventoryPage(page);
    
    await inventoryObj.checkoutProducts('Sauce Labs Backpack','Sauce Labs Bike Light');
    await expect(inventoryObj.cartProducts.nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(inventoryObj.cartProducts.nth(1)).toHaveText('Sauce Labs Bike Light');
    await cartObj.checkout();

    await checkOutObj.fillCheckoutDetails('Tanmay','Dhimar','395001');
    await expect(checkOutObj.pName.nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(checkOutObj.pName.nth(1)).toHaveText('Sauce Labs Bike Light');
    
    const calSubTotal = await checkOutObj.calTotalOfItem();
    const displayedItemTotal = await checkOutObj.totalOfItems();
    expect(displayedItemTotal).toBe(calSubTotal);
    
    const taxAmount = await checkOutObj.calTax();
    expect(taxAmount).toBeGreaterThan(0);
    
    const actualOrderTotal = await checkOutObj.totalAmt();
    const expectedOrderTotal = Number((displayedItemTotal+taxAmount));
    expect(actualOrderTotal).toBe(expectedOrderTotal);
});
test('TC_09 - Verify Checkout Form Validation',{tag:'@regression'},async({page})=>{
    const checkOutObj = new CheckOut(page);
    const inventoryObj= new InventoryPage(page);
    const cartObj = new AddToCart(page);
    
    await inventoryObj.checkoutProducts('Sauce Labs Backpack','Sauce Labs Bike Light');
    
    await cartObj.checkout();
    
    await checkOutObj.checkOutEmpty();
    
    await expect(checkOutObj.errorMsg).toHaveText('Error: First Name is required');
});
test('TC_10 – Verify Cart Persistence After Page Reload',{tag:'@regression'},async({page})=>{
    const invObj = new InventoryPage(page);
    const checkOutObj = new CheckOut(page);
    await invObj.itemCountRefresh('Sauce Labs Backpack','Sauce Labs Bike Light');
    await expect(invObj.cartBadge).toHaveText('2');
    await page.reload();
    await expect(invObj.cartBadge).toHaveText('2');
    await invObj.cartIcon.click();
    await expect(checkOutObj.pName.nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(checkOutObj.pName.nth(1)).toHaveText('Sauce Labs Bike Light');
});