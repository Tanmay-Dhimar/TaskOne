import{Locator,Page} from '@playwright/test';
export class LoginPageSause
{
    page:Page;
    userName:Locator;
    password:Locator;
    loginButton:Locator;
    constructor(page:Page)
    {
        this.page=page;
        this.userName=page.getByPlaceholder('Username');
        this.password=page.getByPlaceholder('Password');
        this.loginButton=page.locator('#login-button');
    }

    async loginSauce(uName:string,pWord:string)
    {
        await this.page.goto('https://www.saucedemo.com/');
        await this.userName.fill(uName);
        await this.password.fill(pWord);
        await this.loginButton.click();
    }
}