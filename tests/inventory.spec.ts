import{test,expect} from '@playwright/test';
import{InventoryPage} from '../pages/InventoryPage';
import{AddToCart} from '../pages/cartPage';
import { CheckOut } from '../pages/checkoutPage';

test.beforeEach("Launch",async({page})=>{
    await page.goto("https://www.saucedemo.com/inventory.html");
});
test('sorting',async({page})=>{
    const inventoryPageobj=new InventoryPage(page);
    await inventoryPageobj.sortProductsBy('lohi');
    const prices =await  inventoryPageobj.productsPrice.allTextContents();
    for (let i=0;i<prices.length-1;i++){
        let currentPrice = Number(prices[i].replace('$',''));
        let nextprice = Number(prices[i+1].replace('$',''));
    
        expect(currentPrice).toBeLessThanOrEqual(nextprice);     
    }
});
test('Add to cart',async({page})=>{
    const inventoryPageObj=new InventoryPage(page);
    await inventoryPageObj.addProductToCart('Sauce Labs Backpack');
    await expect(inventoryPageObj.removeBtn).toBeVisible();
});
test('Product removed from cart',async({page})=>{
    const inventoryPageObj=new InventoryPage(page);
    await inventoryPageObj.porductRemoveCart('Sauce Labs Backpack');
    await expect(inventoryPageObj.cartBadge).toBeHidden();
});
test('Add to cart products count',async({page})=>{
    const inventoryPageObj = new InventoryPage(page);
    await inventoryPageObj.countAddToCart('Sauce Labs Backpack','Sauce Labs Bike Light');
    await expect(inventoryPageObj.cartBadge).toHaveText('2');
});
test('Cart products count',async({page})=>{
    const invetoryPageObj = new InventoryPage(page);
    await invetoryPageObj.cartProductsVerify('Sauce Labs Backpack','Sauce Labs Bike Light');
    //.cart_item_label>a>div
    await expect(invetoryPageObj.cartProducts.nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(invetoryPageObj.cartProducts.nth(1)).toHaveText('Sauce Labs Bike Light');
});
test.only('checkput',async({page})=>{
    const cartObj = new AddToCart(page);
    const checkOutObj = new CheckOut(page);
    const inventoryObj = new InventoryPage(page);
    
    await inventoryObj.checkoutProducts('Sauce Labs Backpack','Sauce Labs Bike Light');
    await expect(inventoryObj.cartProducts.nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(inventoryObj.cartProducts.nth(1)).toHaveText('Sauce Labs Bike Light');
    await cartObj.checkout();

    await checkOutObj.fillCheckoutDetails('Tanmay','Dhimar','395001');
    expect(checkOutObj.pName.nth(0)).toHaveText('Sauce Labs Backpack');
    expect(checkOutObj.pName.nth(1)).toHaveText('Sauce Labs Bike Light');
    
    const calSubTotal = await checkOutObj.calTotalOfItem();
    const displayedItemTotal = await checkOutObj.totalOfItems();
    expect(displayedItemTotal).toBe(calSubTotal);
    
    const taxAmount = await checkOutObj.calTax();
    expect(taxAmount).toBeGreaterThan(0);
    
    const actualOrderTotal = await checkOutObj.totalAmt();
    const expectedOrderTotal = Number((displayedItemTotal+taxAmount));
    expect(actualOrderTotal).toBe(expectedOrderTotal);
});