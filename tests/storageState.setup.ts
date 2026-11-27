    import { test, expect } from '../fixtures/test-fixtures';
    test("TC_01 - Successful Login",{tag:['@smoke','@regression']},async({loginPage,page})=>{
        await loginPage.loginSauce('standard_user','secret_sauce');
        await expect(page).toHaveURL(/inventory/);
        await page.context().storageState({
            path:'authentication/state.json',
        })
    });