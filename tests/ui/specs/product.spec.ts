import {test, expect} from '@playwright/test'
import ProductPage from '../pages/product'
import ShoppingPage from '../pages/shopping';
import LoginPages from '../pages/login';
import { CheckOutPage } from '../pages/checkout';

let productPage: ProductPage;
let loginPage : LoginPages
let shoppingPage : ShoppingPage
let checkoutPage: CheckOutPage


test.beforeEach('Log In', async ({page}) => {

	let email = "test123@gmail.com"
	let password = "123456"

	loginPage = new LoginPages(page);
	await page.goto('https://demo.nopcommerce.com/');
	await loginPage.clickLogIn();
	await loginPage.Login(email, password);

})

test('Computer Product', async ({ page }) => {

	let product = "Desktops";
	let category = "Computers";
	let productName = "Build your own computer";
	let productShortDescript = "Build it"

	let processor = "2.2 GHz Intel Pentium Dual-Core E2200"
	let ram = "4GB [+$20.00]"
	let hdd = "320 GB"
	let os = "Vista Home [+$50.00]";
	let software = "Microsoft Office [+$50.00]"
	let price: string|null;
	let shoppingCart = 'Shopping cart (1)'
	let numberOfProduct = '1;'

	
	productPage = new ProductPage(page);
	shoppingPage = new ShoppingPage(page);
	checkoutPage = new CheckOutPage(page);


	await shoppingPage.clickProductLink(product, category);
	await shoppingPage.clickItemLink(productName);
	await productPage.assertBasicDetail(productName, productShortDescript);
	await productPage.fillRequiredAttributeComputer(processor, ram, hdd);
	await productPage.clickAddToCart();
	price = await productPage.getPrice().first().textContent();
	await shoppingPage.clickShoppingCart(shoppingCart);

	let attribute = "Processor: " + processor + '\n' 
					+ "RAM: " + ram + '\n'
					+ "HDD: " + hdd + '\n'
					+ "OS: " + os + '\n' 
					+ "Software: " + software 

	await shoppingPage.assertAttributeOfProduct(attribute);
	await shoppingPage.assertPriceOfProduct('1', price);
	await shoppingPage.assertTotalPrice('1');
	await shoppingPage.checkOut();


	await checkoutPage.randomFillAllRequiredInfo();


	
})


test('Levi product', async ({ page }) => {

	let product = "Clothing";
	let category = "Apparel";
	let productName = "Levi's 511 Jeans";
	let productShortDescript = "Levi's Faded Black 511 Jeans"
	let numberOfProduct = '1'
	let shoppingCart = 'Shopping cart (1)'


	productPage = new ProductPage(page);
	shoppingPage = new ShoppingPage(page);
	checkoutPage = new CheckOutPage(page);

	await shoppingPage.clickProductLink(product, category);
	await shoppingPage.clickItemLink(productName);
	await productPage.assertBasicDetail(productName, productShortDescript);
	await productPage.clickAddToCart();
	await shoppingPage.clickShoppingCart(shoppingCart);
	await shoppingPage.assertTotalPrice('1');

	await shoppingPage.checkOut();
	await checkoutPage.clickAllContinueButton();

})

