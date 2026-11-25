    import{test,expect} from '@playwright/test';
    import {LoginPageSause} from '../pages/loginPage';
    test("Saving state",async({page})=>{
        let obj1 = new LoginPageSause(page);
        await obj1.loginSauce('standard_user','secret_sauce');
        
        await expect(page).toHaveURL(/inventory/);

        await page.context().storageState({
            path:'authentication/state.json',
        })
    });