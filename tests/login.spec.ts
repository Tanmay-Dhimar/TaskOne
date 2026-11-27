import { test, expect } from '../fixtures/test-fixtures';
test.use({
    storageState:{cookies:[],origins:[]}
});

test('TC_02 - Unsuccessful Login'{tag:'@regression'},async({loginPage,page})=>{
    await loginPage.loginSauceFailed('locked_out_user','secret_sauce');
    await expect(loginPage.loginMsg).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
});