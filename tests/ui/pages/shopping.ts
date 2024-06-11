import {type Locator, type Page, expect} from "@playwright/test"

export class ShoppingPage{

	readonly page: Page
	// readonly softwareProductLink: Locator;
	readonly cellPhoneProductLink: Locator;
	readonly addToCartButton: Locator;
	
	readonly checkOutButton: Locator;
	readonly agreeTermsOption: Locator;
	readonly removeItem: Locator;
	readonly searchPlaceholder: Locator;
	readonly itemInPage: Locator;
	readonly searchButton: Locator;

	unitPrice: Locator;
	totalPrice: Locator;
	attributeOfProduct: Locator;
	itemName: Locator;
	shoppingCartLink: Locator;
	categoryLink: Locator;
	productLink: Locator;
	itemInShoppingCart: Locator;
	quantity: Locator;


	constructor (page: Page){
		this.page = page;
		// this.softwareProductLink = page.getByRole('link', { name: 'Software' });
		// this.cellPhoneProductLink = page.getByRole('link', { name: 'Cell phones' });
		this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
		// this.shoppingCartLink = page.getByRole('link', { name: 'Shopping cart (', exact: true })
		// this.shoppingCartLink = page.locator('//*[@id="topcartlink"]/a/span[1]');
		
		this.checkOutButton = page.getByRole('button', { name: 'Checkout' });
		this.agreeTermsOption = page.getByLabel('I agree with the terms of');
		this.removeItem = page.locator('td:nth-child(7)');
		this.searchPlaceholder = page.getByPlaceholder('Search store');
		this.searchButton = page.getByRole('button', { name: 'Search' });
		this.itemInPage = page.locator('.product-item');
		this.attributeOfProduct = page.locator('#shopping-cart-form > div.table-wrapper > table > tbody > tr > td.product > div.attributes');
		
	}


	async itemInShoppingCartLocator(number: string){
		this.itemInShoppingCart = this.page.locator('//*[@id="shopping-cart-form"]//tr['+number+']/td[3]');
	}

	async productLinkLocator(productName : string){
		this.productLink = this.page.getByRole('heading', { name: productName }).getByRole('link');
	}

	async categoryLinkLocator(categoryName : string){
		this.categoryLink = this.page.getByRole('link', { name: categoryName }).first();
	}

	async itemLinkLocator(itemName: string){
		this.itemName = this.page.getByRole('link', { name: itemName }).first();
	}

	async unitPriceLocator(number: string){
		this.unitPrice = this.page.locator('#shopping-cart-form > div.table-wrapper > table > tbody > tr:nth-child('+ number +') > td.unit-price > span');
	}

	async totalPriceLocator(number: string){
		this.totalPrice = this.page.locator('#shopping-cart-form > div.table-wrapper > table > tbody > tr:nth-child('+ number +') > td.subtotal > span')
	}

	async quantityLocator(number: string){
		// this.quantity = this.page.locator('//*[@id="shopping-cart-form"]/div[1]/table/tbody/tr['+ number +']/td[5]/div');
		this.quantity = this.page.locator('xpath=//html/body/div[6]/div[3]/div/div/div/div[2]/div/form/div['+ number +']/table/tbody/tr/td[5]/div/input')
	}

	async clickProductLink(productName: string, category: string){
		await this.categoryLinkLocator(category);
		await this.categoryLink.click();
		await this.productLinkLocator(productName);
		await this.productLink.click();
	}

	getItemNameLocator(number: string): Locator{
		return this.page.locator('//*[@id="main"]/div/div[3]/div/div[2]/div[2]/div[2]/div/div/div['+number+']/div/div[2]/h2/a')
	}

	async clickProductName(productName: string){
		await this.itemInPage.getByText(productName).click();
	}

	async clickAddtoCart(number: number){
		await this.addToCartButton.nth(number).click({ delay: 1000 });
	}

	async clickShoppingCart(shoppingCart: string){
		this.shoppingCartLink = this.page.getByRole('link', { name: shoppingCart})
		await this.shoppingCartLink.click();
	}

	async clickCheckOutButton(){
		await this.checkOutButton.click();
	}

	async clickAgreeTerms(){
		await this.agreeTermsOption.click();
	}

	async clickItemLink(itemName: string){
		await this.itemLinkLocator(itemName);
		await this.itemName.click();
	}

	async searchForProduct(productName: string){
		await this.searchPlaceholder.fill(productName);
		await this.searchButton.click();
	}

	async checkOut(){
		await this.clickAgreeTerms();
		await this.clickCheckOutButton();
	}

	async removeFirstItem(){
		await this.removeItem.first().click();
	}

	async notContainWords(word: string, number: string){
		await this.itemInShoppingCartLocator(number);
		await expect(this.itemInShoppingCart).not.toHaveText(word);
	}

	async assertItemName(itemName: string|null, number: string){
		await this.itemInShoppingCartLocator(number);
		if (itemName)
			await expect(this.itemInShoppingCart).toHaveText(itemName);
	}

	async assertNumberOfItem(number: number){
		await expect(this.itemInPage).toHaveCount(number);
	}

	async assertAttributeOfProduct(attribute: string){
		let attributeString: string|null;
		attributeString = await this.attributeOfProduct.innerText();
		await expect(attributeString).toBe(attribute);
		
	}

	async assertPriceOfProduct(number: string, price: string|null){
		this.unitPriceLocator(number)
		if (price)
			await expect(this.unitPrice).toHaveText(price);
	}

	async assertTotalPrice(number: string){
		this.unitPriceLocator(number);
		this.totalPriceLocator(number);
		this.quantityLocator(number);

		let unitPriceStr = (await this.unitPrice.innerText()).replace('$', '');
		let totalPriceStr = (await this.totalPrice.innerText()).replace('$', '');
		// console.log(totalPriceStr);
		let quantityStr = await this.quantity.inputValue()
		await expect( parseFloat(unitPriceStr) * parseFloat(quantityStr) ).toBe(parseFloat(totalPriceStr));

	}


}

export default ShoppingPage