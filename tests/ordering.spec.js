const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login.page');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
});

// poderia deixar mais dinâmico -> sempre pegar o primeiro 
// item e verificar se é o menor preço da página
// classe="invectory_list"

test('Ordering products by lowest price', async({ page }) => {
    await page.selectOption('.product_sort_container', 'lohi');
    
    const pricesText = await page.locator('.inventory_item_price').allTextContents();

    const prices = pricesText.map(price => parseFloat(price.replace('$', '')));

    // Por que três pontinho (...prices)?
    const minPrice = Math.min(...prices);

    const firstItemText = await page.locator('.inventory_item_price').first().textContent();

    const firstItemPrice = parseFloat(firstItemText.replace('$', ''));

    expect(firstItemPrice).toBe(minPrice);
});

test('Ordering products by highest price', async({ page }) => {
    await page.selectOption('.product_sort_container', 'hilo');

    const priceText = await page.locator('.inventory_item_price').allTextContents();
    
    const prices = priceText.map(price => parseFloat(price.replace('$', '')));

    const maxPrice = Math.max(...prices);
    
    const firstItemText = await page.locator('.inventory_item_price').first().textContent();
    
    const firstItemPrice = parseFloat(firstItemText.replace('$', ''));

    expect(firstItemPrice).toBe(maxPrice);
});

test('Ordering products by name (A to Z)', async({ page }) => {
    await page.selectOption('.product_sort_container', 'az');
    
    const names = await page.locator('.inventory_item_name').allTextContents(); 

    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));

    const firstItemName = await page.locator('.inventory_item_name').first().textContent();

    expect(firstItemName).toBe(sortedNames[0]);
});

test('Ordering products by name (Z to A)', async({ page }) => {
    await page.selectOption('.product_sort_container', 'za');
    
    const names = await page.locator('.inventory_item_name').allTextContents(); 

    const sortedNames = [...names].sort((a, b) => b.localeCompare(a));

    const firstItemName = await page.locator('.inventory_item_name').first().textContent();

    expect(firstItemName).toBe(sortedNames[0]);
});