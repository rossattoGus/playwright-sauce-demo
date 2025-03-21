const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login.page');

test('Check social media links', async ({ page, context }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');

    const socialLinks = [
        { selector: '[data-test="social-facebook"]', expectedUrl: 'https://www.facebook.com/saucelabs' },
        { selector: '[data-test="social-linkedin"]', expectedUrl: 'https://www.linkedin.com/company/sauce-labs/' }
    ];

    for (const link of socialLinks) {  
        await page.locator(link.selector).click();  
        const newPage = await context.waitForEvent('page');  
        await newPage.waitForLoadState();  
        await expect(newPage).toHaveURL(link.expectedUrl);  
        await newPage.close();  
    }
});
