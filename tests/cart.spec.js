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
    
    await page.locator('[data-test^="remove-"]').click();

    await expect(page.locator('.cart_item')).toHaveCount(0);
});

test('Add multiple items and remove some', async({ page }) => {
    for (let i = 0; i < 3; i++) {
        await page.locator('.inventory_item button').nth(i).click(); // por que usei nth(i)
    }

    await page.click('.shopping_cart_link');

    // Remover o primeiro item do carrinho
    await page.locator('.cart_item').first().locator('[data-test^="remove-"]').click(); // entender porque funciona

    await expect(page.locator('.cart_item')).toHaveCount(2);
});
