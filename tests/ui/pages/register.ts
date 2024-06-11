import { type Locator, type Page, expect } from "@playwright/test";

export class RegisterPages {
  // variables
  readonly page: Page;
  readonly registerLink: Locator;
  readonly registerHeading: Locator;
  readonly maleOption: Locator;
  readonly femaleOption: Locator;
  readonly firstNameTextbox: Locator;
  readonly lastNameTextbox: Locator;
  readonly dateOfBirth: Locator;
  readonly monthOfBirth: Locator;
  readonly yearOfBirth: Locator;
  readonly emailTextbox: Locator;
  readonly companyTextbox: Locator;
  readonly newsletterOption: Locator;
  readonly passwordTextbox: Locator;
  readonly confirmPasswordTextbox: Locator;
  readonly registerButton: Locator;
  readonly registrationComplete: Locator;

  readonly passwordWrongPatternAlert: Locator;

  //constructors
  constructor(page: Page) {
    this.page = page;
    this.registerLink = page.getByRole("link", { name: "Register" });
    this.registerHeading = page.getByRole("heading", { name: "Register" });
    this.maleOption = page.getByLabel("Male", { exact: true });
    this.femaleOption = page.getByLabel("Female", { exact: true });
    this.firstNameTextbox = page.getByLabel("First name:");
    this.lastNameTextbox = page.getByLabel("Last name:");
    this.dateOfBirth = page.locator('select[name="DateOfBirthDay"]');
    this.monthOfBirth = page.locator('select[name="DateOfBirthMonth"]');
    this.yearOfBirth = page.locator('select[name="DateOfBirthYear"]');
    this.emailTextbox = page.getByLabel("Email:");
    this.companyTextbox = page.getByLabel("Company name:");
    this.newsletterOption = page.getByLabel("Newsletter:");
    this.passwordTextbox = page.getByLabel("Password:", { exact: true });
    this.confirmPasswordTextbox = page.getByLabel("Confirm password:");
    this.registerButton = page.getByRole("button", { name: "Register" });
    this.registrationComplete = page.getByText("Your registration");

    this.passwordWrongPatternAlert = page.getByText(
      "<p>Password must meet the"
    );
  }

  //method

  async clickRegister() {
    await this.registerLink.click();
  }

  async assertRegisterHeading() {
    await expect(this.registerHeading).toBeVisible();
    await expect(this.registerHeading).toHaveText("Register");
  }

  async fillFirstName(firstName: string) {
    await this.firstNameTextbox.click();
    await this.firstNameTextbox.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastNameTextbox.click();
    await this.lastNameTextbox.fill(lastName);
  }

  async fillDate(date: string, month: string, year: string) {
    await this.dateOfBirth.selectOption(date);
    await this.monthOfBirth.selectOption(month);
    await this.yearOfBirth.selectOption(year);
  }

  async fillEmail(email: string) {
    await this.emailTextbox.click();
    await this.emailTextbox.fill(email);
  }

  async fillCompany(company: string) {
    await this.companyTextbox.click();
    await this.companyTextbox.fill(company);
  }

  async checkNewsLetter() {
    await this.newsletterOption.check();
  }

  async uncheckNewsLetter() {
    await this.newsletterOption.uncheck();
  }

  async fillPassword(password: string) {
    await this.passwordTextbox.click();
    await this.passwordTextbox.fill(password);
  }

  async fillConfirmPassword(confirmPassword: string) {
    await this.confirmPasswordTextbox.click();
    await this.confirmPasswordTextbox.fill(confirmPassword);
  }

  async clickRegisterButton() {
    await this.registerButton.click();
    // await this.registerButton.click();
  }

  randomString(): string {
    let name: string;
    name = "";
    for (let i = 0; i < 6; i++) {
      name += "a" + Math.floor(Math.random() * (26 - 0 + 1));
    }
    return name;
  }
  //create a method to fill out the Register form only required fields

  async registerOnlyRequiredField(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.fillConfirmPassword(confirmPassword);
  }

  //Create a method to fill out the Register form
  async registerAllField(
    gender: string,
    firstName: string,
    lastName: string,
    date: string,
    month: string,
    year: string,
    email: string,
    newsLetter: boolean,
    company: string,
    password: string,
    confirmPassword: string
  ) {
    if (gender == "Male") await this.maleOption.click();
    else await this.femaleOption.click();
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillDate(date, month, year);
    if (newsLetter) await this.checkNewsLetter();
    else await this.uncheckNewsLetter();
    await this.fillCompany(company);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.fillConfirmPassword(confirmPassword);
  }

  //Assert error messages
  async assertPasswordWrongPattern() {
    // this.registerOnlyRequiredField(firstName, lastName, email, password, confirmPassword);
    await expect(this.passwordWrongPatternAlert).toBeVisible();
    await expect(this.passwordWrongPatternAlert).toHaveText(
      "<p>Password must meet the following rules: </p><ul><li>must have at least 6 characters and not greater than 64 characters</li></ul>"
    );
  }

  //Assert successful registered

  async assertSuccessfulRegistered() {
    // this.registerOnlyRequiredField(firstName, lastName, email, password, confirmPassword);
    // await this.re
    await expect(this.registrationComplete).toBeVisible();
    await expect(this.registrationComplete).toHaveText(
      "Your registration completed"
    );
  }
}

export default RegisterPages;
