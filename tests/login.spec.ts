import{test,expect} from '@playwright/test'
import { LoginPageSause } from '../pages/loginPage';

test.use({
    storageState:{cookies:[],origins:[]}
});

test('TC_02 - Unsuccessful Login',async({page})=>{
    const loginObj = new LoginPageSause(page);
    await loginObj.loginSauceFailed('locked_out_user','secret_sauce');
    await expect(loginObj.loginMsg).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
});