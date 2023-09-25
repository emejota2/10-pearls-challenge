// @ts-check
const { test, expect } = require('@playwright/test');
const { HomePage } = require("./page_objects/HomePage");
const { SignInPage } = require("./page_objects/SignInPage");
const fs = require('fs');

test.describe('return url, button elements and input texts in a file and sign in on the page', () => {

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

  })

  test('Navigate to about us and return url, buttons elements,links, and input texts and return a file and sign in', async ({ page }) => {

    const homePage = new HomePage(page);
    const signInPage = new SignInPage(page);

    await homePage.removeCookies();

    const leftframebody = await homePage.accessToIframe();

    await leftframebody.locator('footer').scrollIntoViewIfNeeded();
    await leftframebody.getByTitle('Company').click({ force: true });
    //1. is loaded and the program navigates into the page below 
    //“Document content goes here…“, interacts with the “About us” link return the link
    await expect(leftframebody.getByTitle('Company')).toHaveAttribute('href', '/about/index.htm')

    const newPageURL = await homePage.urlCurrentPage();
    const allURLs = await homePage.allUrlsCurrentPage();
    const allButtons = await homePage.allButtonsCurrentPage();
    const allTextInputs = await homePage.allInputTextCurrentPage();

    await homePage.createFile
      ({
        fs,
        newPageURL,
        allURLs,
        allButtons,
        allTextInputs
      });

    await signInPage.signIn(leftframebody);
  });


});


