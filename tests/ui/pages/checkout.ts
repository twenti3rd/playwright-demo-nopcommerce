import {type Locator, type Page, expect} from '@playwright/test'

export class CheckOutPage{

	readonly page: Page
	readonly countryOption: Locator
	readonly cityTextbox: Locator;
	readonly addressTextbox: Locator;
	readonly postalCodeTextbox: Locator;
	readonly phoneNumberTextbox: Locator;
	readonly continueButton: Locator;
	readonly confirmButton: Locator;


	constructor (page: Page){
		this.page = page;
		this.countryOption = page.getByLabel('Country:');
		this.cityTextbox = page.getByLabel('City:');
		this.addressTextbox = page.getByLabel('Address 1:');
		this.postalCodeTextbox = page.getByLabel('Zip / postal code:');
		this.phoneNumberTextbox = page.getByLabel('Phone number:');
		this.continueButton = page.getByRole('button', { name: 'Continue' });
		this.confirmButton = page.getByRole('button', { name: 'Confirm' });
	}

	randomString(): string {
		let name: string;
		let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
		name = '';
		for (let i = 0; i < 8; i++) {
		  name += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return name;
	}

	randomNumber(): string {
		let number : string;
		let num = Math.floor(Math.random() * (241 - 0 + 1));
		number = num.toString();
		return number;
	}

	async fillCountry (country: string){
		// await this.countryOption.click();
		// console.log(countryNumber);
		
		// await this.countryOption.selectOption(countryNumber);
		await this.countryOption.selectOption(country)
	}

	async fillCity (city: string){
		await this.cityTextbox.fill(city);
	}

	async fillAddress (address: string){
		await this.addressTextbox.fill(address);
	}

	async fillPostalCode (postalCode: string){
		await this.postalCodeTextbox.fill(postalCode);
	}

	async fillPhoneNumber (phoneNumber: string){
		await this.phoneNumberTextbox.fill(phoneNumber);
	}

	async clickContinue (){
		await this.continueButton.click({delay: 200});
	}

	async clickConfirm (){
		await this.confirmButton.click({delay: 200});
		// await this.page.waitForURL('https://demo.nopcommerce.com/checkout/completed');
	}

	async fillAllRequiredInfo(countryName: string, city: string, address: string, postalCode: string, phoneNumber: string){
		await this.fillCountry(countryName);
		await this.fillCity(city);
		await this.fillAddress(address);
		await this.fillPostalCode(postalCode);
		await this.fillPhoneNumber(phoneNumber);
		await this.clickAllContinueButton();
	}
	
	async clickAllContinueButton(){
		for (let i=0;i<4;i++){
			await this.clickContinue();
		}
		await this.clickConfirm();
		await this.clickContinue();
	}

	async randomFillAllRequiredInfo(){
		// let countryNumber = this.randomNumber();
		let countryName = 'Albania';
		let city = this.randomString();
		let address = this.randomString();
		let postalCode = this.randomString();
		let phoneNumber = this.randomString();

		await this.fillAllRequiredInfo(countryName, city, address, postalCode, phoneNumber);
	}
}