const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login.page');

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    page.loginPage = new LoginPage(page);
});

test('Test Valid Login', async ({ page }) => {
    await page.loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
});

test('Test Invalid Login', async ({ page }) => {
    await page.loginPage.login('login_false', 'senha_false');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.loginPage.errorMessage).toBeVisible();   
});
