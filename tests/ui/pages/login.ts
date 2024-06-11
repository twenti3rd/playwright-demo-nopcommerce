import { type Locator,type Page, expect } from '@playwright/test'

export class LoginPages {
	readonly page: Page
	readonly loginLink: Locator;
	readonly emailTextbox: Locator;
	readonly passwordTextbox: Locator;
	readonly loginButton: Locator;
	

	constructor (page: Page){
		this.page = page;
		this.loginLink = page.getByRole('link', { name: 'Log in' });
		this.emailTextbox = page.getByLabel('Email:');
		this.passwordTextbox = page.getByLabel('Password:');
		this.loginButton =  page.getByRole('button', { name: 'Log in' });
	}

	async clickLogIn(){
		await this.loginLink.click();
	}

	async fillEmail(email: string){
		await this.emailTextbox.fill(email);
	}

	async fillPassword(password: string){
		await this.passwordTextbox.fill(password);
	}

	async clickLogInButton(){
		await this.loginButton.click();
	}

	async Login(email: string, password: string){
		await this.fillEmail(email);
		await this.fillPassword(password);
		await this.clickLogInButton();
	}


}

export default LoginPages