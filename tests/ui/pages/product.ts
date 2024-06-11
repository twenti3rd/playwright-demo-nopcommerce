import {type Page, type Locator, expect} from '@playwright/test'

export class ProductPage{

	readonly page: Page;
	productHeader: Locator;
	productDescript: Locator;


	readonly rating: Locator;
	readonly seeReviewLink: Locator;
	readonly addReviewLink: Locator;
	readonly price: Locator;
	readonly addToWishListButton: Locator;
	readonly addToCompareListButton: Locator;
	readonly emailAFriendButton: Locator;
	readonly quantityTextbox: Locator;
	readonly addToCartButton: Locator
	readonly sku: Locator;
	

	//Levi
	readonly oldPrice: Locator;
	readonly addAddressToShip: Locator;
	readonly description: Locator;
	readonly priceWithHeaders: Locator;

	//build com
	readonly
	readonly freeShipping: Locator;
	productAttribute: Locator;


	constructor (page: Page){
		this.page = page;
		this.rating = page.locator('.rating > div').first();
		this.seeReviewLink = page.getByRole('link', { name: 'review(s)' })
		this.addReviewLink = page.getByRole('link', { name: 'Add your review' })
		this.sku = page.getByText('SKU:');
		this.quantityTextbox = page.getByLabel('Enter a quantity');
		this.addToCartButton = page.getByRole('button', { name: 'Add to cart' }).first();
		this.addToWishListButton = page.getByRole('button', { name: 'Add to wishlist'}).first();
		this.addToCompareListButton = page.getByRole('button', { name: 'Add to compare list' }).first();
		this.emailAFriendButton = page.getByRole('button', { name: 'Email a friend' }).first();

	}

	async assertBasicDetail (header: string, descript: string){
		await expect(this.rating).toHaveCount(1);
		await expect(this.page.getByText(descript)).toHaveCount(1);
		// await expect(this.page.locator('div.short-description').element).toHaveText(descript);
		// await expect(this.page.getByText(descript)).toHaveClass('short-description');
		await expect(this.rating).toHaveCount(1);
		await expect(this.seeReviewLink).toHaveCount(1);
		await expect(this.addReviewLink).toHaveCount(1);
		await expect(this.sku).toHaveCount(1);
		// await expect(this.page.getByText(/\$\d+/)).toHaveCount(1);
		await expect(this.quantityTextbox).toHaveCount(1);
		await expect(this.addToWishListButton).toHaveCount(1);
		await expect(this.addToCartButton).toHaveCount(1);
		await expect(this.emailAFriendButton).toHaveCount(1);
	}

	async clickAddToCart(){
		this.addToCartButton.click();
	}

	async fillRequiredAttributeComputer(processor: string, ram:string, hdd: string){
		await this.page.locator('#product_attribute_1').selectOption(processor);
		await this.page.locator('#product_attribute_2').selectOption(ram);
		await this.page.getByText(hdd).click();
	}

	getPrice(): Locator{
		return this.page.locator("#product-details-form > div > div.product-essential > div.overview > div.prices > div.product-price")
	}

}

export default ProductPage