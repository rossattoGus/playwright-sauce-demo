const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login.page');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
});

test('Add item to cart', async({ page }) => {
    await page.click('.inventory_item button');
    await page.click('.shopping_cart_link');

    await expect(page.locator('.cart_list')).toHaveCount(1);
});

test('Remove item from cart', async({ page }) => {
    await page.click('.inventory_item button');
    await page.click('.shopping_cart_link');
    
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    await expect(page.locator('.cart_item')).toHaveCount(0);
});