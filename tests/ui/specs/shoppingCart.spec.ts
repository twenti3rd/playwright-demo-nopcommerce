import {test, expect} from '@playwright/test'
import { LoginPages } from '../pages/login';
import ShoppingPage from '../pages/shopping';
import { CheckOutPage } from '../pages/checkout';


let loginPage : LoginPages
let shoppingPage : ShoppingPage
let checkoutPage : CheckOutPage


test.beforeEach('Log In', async ({page}) => {

	let email = "test123@gmail.com"
	let password = "123456"

	loginPage = new LoginPages(page);
	await page.goto('https://demo.nopcommerce.com/');
	await loginPage.clickLogIn();
	await loginPage.Login(email, password);

})

test('Computer product', async ({ page }) => {

	let product = "Notebooks";
	let category = "Computers";
	let itemName: string|null;
	let number1 = '2';
	let shoppingCart = 'Shopping cart (1)'

	shoppingPage = new ShoppingPage(page);
	checkoutPage = new CheckOutPage(page);

	

	await shoppingPage.clickProductLink(product, category);
	await shoppingPage.clickAddtoCart(parseInt(number1)-1);
	itemName = await shoppingPage.getItemNameLocator(number1).first().textContent()
	await shoppingPage.clickShoppingCart(shoppingCart);
	await shoppingPage.assertItemName(itemName, '1');
	await shoppingPage.checkOut();

	await checkoutPage.randomFillAllRequiredInfo();


  });

  test('Electronics product', async ({ page }) => {

	let product = "Cell phones";
	let category = "Electronics";
	let itemName1: string|null;
	let itemName2: string|null;
	let forbiddenWord = "computer"
	let number1 = '1';
	let number2 = '2';
	let shoppingCart = 'Shopping cart (2)'
	
	shoppingPage = new ShoppingPage(page);
	checkoutPage = new CheckOutPage(page);

	

	await shoppingPage.clickProductLink(product, category);
	await shoppingPage.clickAddtoCart(parseInt(number1)-1);
	await shoppingPage.clickAddtoCart(parseInt(number2)-1);
	itemName1 = await shoppingPage.getItemNameLocator(number1).first().textContent()
	itemName2 = await shoppingPage.getItemNameLocator(number2).first().textContent()
	await shoppingPage.clickShoppingCart(shoppingCart);
	// await shoppingPage.removeFirstItem();
	await shoppingPage.assertItemName(itemName1, '1');
	await shoppingPage.assertItemName(itemName2, '2');
	
	await shoppingPage.notContainWords(forbiddenWord,'1');
	await shoppingPage.notContainWords(forbiddenWord,'2');
	await shoppingPage.checkOut();

	await checkoutPage.randomFillAllRequiredInfo();
	// await checkoutPage.clickAllContinueButton();

  });

  test('Search Item', async({ page }) => {


	shoppingPage = new ShoppingPage(page);

	let searchWord = 'pride';
	let numberOfItem = 1;

	await shoppingPage.searchForProduct(searchWord);
	await shoppingPage.assertNumberOfItem(numberOfItem);

  })


