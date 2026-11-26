import {Page,Locator} from "@playwright/test";
export class CheckOut{
    page:Page;
    checkName:Locator;
    checkLastName:Locator;
    checkZip:Locator;
    continueBtn:Locator;
    pPrices:Locator;
    totalItem:Locator;
    tax:Locator;
    total:Locator;
    pName:Locator;
    finishBtn:Locator;
    textConfm:Locator;
    errorMsg:Locator;
    constructor(page:Page)
    {
        this.page=page;
        this.checkName=page.getByPlaceholder("First Name");
        this.checkLastName=page.getByPlaceholder("Last Name");
        this.checkZip=page.getByPlaceholder("Zip/Postal Code");
        this.continueBtn=page.locator("#continue");
        this.pName=page.locator(".cart_item_label>a>div");
        this.pPrices=page.locator(".inventory_item_price");
        this.totalItem=page.locator(".summary_subtotal_label");
        this.tax=page.locator(".summary_tax_label");
        this.total=page.locator(".summary_total_label");
        this.finishBtn=page.getByRole("button",{name:'Finish'});
        this.textConfm=page.locator(".complete-header");
        this.errorMsg=page.getByText('Error: First Name is required');
    }
    async fillCheckoutDetails(Name:string,lName:string,zip:string)
    {
        await this.checkName.fill(Name);
        await this.checkLastName.fill(lName);
        await this.checkZip.fill(zip);    
        await this.continueBtn.click();
    }
    async calTotalOfItem()
    {
        let pricesTexts = await this.pPrices.allInnerTexts();
        let prices = pricesTexts.map(text => parseFloat(text.replace('$','')));
        return Number(prices.reduce((sum,price)=>sum+price,0));
    }
    async totalOfItems()
    {
        let amtText = await this.totalItem.innerText();
        return parseFloat(amtText.replace(/[^0-9.]/g,''));
    }
    async calTax()
    {
        let txText = await this.tax.innerText();
        return parseFloat(txText.replace(/[^0-9.]/g,'')); 
    }
    async totalAmt()
    {
        let text = await this.total.innerText();
        return parseFloat(text.replace(/[^0-9.]/g,''));
    }
    async finish()
    {
        await this.finishBtn.click();
    }
    async confirmation()
    {
        await this.textConfm.innerText();
    }
    async checkOutEmpty()
    {
        await this.continueBtn.click();
    }
}