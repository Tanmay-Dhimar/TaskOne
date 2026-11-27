import { test as base, expect } from '@playwright/test';

import { LoginPageSause } from '../pages/loginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { AddToCart } from '../pages/cartPage';
import { CheckOut } from '../pages/checkoutPage';

type PageFixtures = {
    loginPage: LoginPageSause;
    inventoryPage: InventoryPage;
    cartPage: AddToCart;
    checkoutPage: CheckOut;
};

export const test = base.extend<PageFixtures>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPageSause(page));
    },

    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new AddToCart(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckOut(page));
    },

});

export { expect };