import { test, expect } from '@playwright/test';
import RegisterPages from '../pages/register';

let registerPage :RegisterPages;
const URL = 'https://demo.nopcommerce.com/';

test.beforeEach(async ({page}) =>{
	registerPage = new RegisterPages(page);
	await page.goto(URL);
	await registerPage.clickRegister();
})

test('Assert Succesful Register Message', async ({ page }) => {

	registerPage = new RegisterPages(page);

	// await page.goto(URL);
	// await registerPage.clickRegister();

	let firstName = registerPage.randomString();
	let lastName = registerPage.randomString();
	let email = registerPage.randomString()+"@email.com";
	let password = registerPage.randomString();

	await registerPage.registerOnlyRequiredField(firstName, lastName, email, password, password);
	await registerPage.clickRegisterButton();
	await registerPage.assertSuccessfulRegistered();

});

test('Assert Warning Message password wrong pattern', async ({ page }) => {

	registerPage = new RegisterPages(page);

	// await page.goto(URL);
	// await registerPage.clickRegister();

	let firstName = registerPage.randomString();
	let lastName = registerPage.randomString();
	let email = registerPage.randomString()+"@email.com";
	let password = '1234';

	await registerPage.registerOnlyRequiredField(firstName, lastName, email, password, password);
	await registerPage.clickRegisterButton();
	await registerPage.assertPasswordWrongPattern();

});







/*

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByLabel('First name:').click();
  await page.getByLabel('First name:').fill('sdvsd');
  await page.getByLabel('Last name:').click();
  await page.getByLabel('First name:').click();
  await page.getByLabel('First name:').fill('');
  await page.getByLabel('Last name:').click();
  await page.getByLabel('Last name:').fill('sfdsd');
  await page.getByLabel('First name:').click();
  await page.getByLabel('Last name:').click();
  await page.getByLabel('Last name:').fill('');
  await page.getByText('Last name: * Last name is').click();
  await page.getByText('First name is required.').click();
  await page.getByText('Last name is required.').click();
  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('hioih');
  await page.getByText('Gender: Male Female First').click();
  await page.getByText('Please enter a valid email').click();
  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('hioih@wef');
  await page.getByText('Wrong email').click();
  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('hioih@wef.c');
  await page.getByText('Gender: Male Female First').click();
  await page.getByText('Wrong email').click();
  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('');
  await page.getByText('Email is required.').click();
  await page.getByLabel('Company name:').click();
  await page.getByLabel('Confirm password:').click();
  await page.getByLabel('Confirm password:').fill('dsfdsfds\\');
  await page.getByText('Password: * Confirm password').click();
  await page.locator('div').filter({ hasText: 'Skip navigationUS' }).first().click();
  await page.getByText('The password and confirmation').click();
  await page.getByLabel('Confirm password:').click();
  await page.getByLabel('Confirm password:').fill('');
});

*/