const { expect } = require("@playwright/test");

exports.SignInPage = class SignInPage {
  constructor(page) {
    this.page = page;
    
  }

  async signIn(leftframebody) {
    await leftframebody.locator('.accent-nav__toggle').scrollIntoViewIfNeeded()
    await leftframebody.locator('a[href="/market/login.jsp"]').first().click()
    await leftframebody.locator('a[href="signup.jsp"]').click()
    await leftframebody.locator('#firstName').fill('example')
    await leftframebody.locator('#lastName').fill('example')
    await leftframebody.locator('#email').fill('example@example7.com')
    await leftframebody.locator('#phone').fill('1111111114')
    await leftframebody.locator('#nextBtn').click()
  }

};