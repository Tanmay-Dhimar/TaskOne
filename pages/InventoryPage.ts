import{Page,Locator} from '@playwright/test';
export class InventoryPage{
    page:Page;
    srtDropdown:Locator;
    products:Locator;
    productsName:Locator;
    productsPrice:Locator;
    removeBtn:Locator;
    cartIcon:Locator;
    cartBadge:Locator;
    cartProducts:Locator;
    constructor(page:Page){
        this.page=page;
        this.srtDropdown=page.locator('.product_sort_container');
        this.products=page.locator('.inventory_item');
        this.productsName=page.locator('.inventory_item_name');
        this.productsPrice=page.locator('.inventory_item_price');
        this.removeBtn=page.locator("#remove-sauce-labs-backpack");
        this.cartIcon=page.locator('.shopping_cart_link');
        this.cartBadge=page.locator('.shopping_cart_badge');
        this.cartProducts=page.locator(".cart_item_label>a>div");
    }
    async sortProductsBy(sortOption:string)
    {
        await this.srtDropdown.selectOption(sortOption);
    }
    async addProductToCart(productName:string){
        let product = this.products.filter({hasText:productName});
        await product.getByRole('button',{name:'Add to cart'}).click();
    }
    async porductRemoveCart(productName:string){
        let product = this.products.filter({hasText:productName});
        await product.getByRole('button',{name:'Add to cart'}).click();
        await this.cartIcon.click();
        await this.removeBtn.click();
    }
    async countAddToCart(productOne:string,productTwo:string)
    {
        let itemOne = this.products.filter({hasText:productOne});
        await itemOne.getByRole('button',{name:'Add to cart'}).click();
        
        let itemTwo = this.products.filter({hasText:productTwo});
        await itemTwo.getByRole('button',{name:'Add to cart'}).click();
    }
    async cartProductsVerify(productOne:string,productTwo:string)
    {
        let itemOne = this.products.filter({hasText:productOne});
        await itemOne.getByRole('button',{name:'Add to cart'}).click();
        
        let itemTwo = this.products.filter({hasText:productTwo});
        await itemTwo.getByRole('button',{name:'Add to cart'}).click();

        await this.cartIcon.click();
    }
    async checkoutProducts(productOne:string,productTwo:string)
    {
        let itemOne = this.products.filter({hasText:productOne});
        await itemOne.getByRole('button',{name:'Add to cart'}).click();
        
        let itemTwo = this.products.filter({hasText:productTwo});
        await itemTwo.getByRole('button',{name:'Add to cart'}).click();

        await this.cartIcon.click();
    }
}