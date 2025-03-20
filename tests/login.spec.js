const {test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login.page');

let loginPage;

test.beforeEach(async ({ page }) => {
    await page.goto('');
    loginPage = new LoginPage(page);
});

test('Test Valid Login', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
});

test('Test Invalid Login', async ({ page }) => {
    await loginPage.login('login_false', 'senha_false');
    await page.locator('[data-test="login-button"]').click();
    await expect(loginPage.errorMessage).toBeVisible();   
});
