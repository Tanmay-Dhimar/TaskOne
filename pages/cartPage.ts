import {Page,Locator} from "@playwright/test";
export class AddToCart{
    page:Page;
    checkOutBtn:Locator;
    constructor(page:Page)
    {
        this.page=page;
        this.checkOutBtn = page.getByRole("button",{name:"Checkout"});
    }
    async checkout()
    {
        await this.checkOutBtn.click();
    }
}