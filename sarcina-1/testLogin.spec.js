const { test, expect } = require('@playwright/test');
const { testConfig } = require('./testConfig');

test('Sarcina 1 - simulare autentificare', async ({ page }) => {
    await page.goto(testConfig.url, { timeout: testConfig.timeout });
    await page.fill('[name="login"]', testConfig.user.username);
    await page.fill('[name="password"]', testConfig.user.password);
    await page.click('.login__form__footer__submit');

    const errorElement = await page.$('p.login__form__field__message');

    if (errorElement) {
        const errorText = await errorElement.textContent();
        
        if (errorText.includes("Numele de utilizator sau parola introduces nu sunt corecte")) {
            throw new Error('❌ Numele de utilizator sau parola introduse nu sunt corecte!');
        }
    }

    const expectedUrl = "https://999.md/";
    await expect(page).toHaveURL(expectedUrl);
    console.log(`✅ E-Mail-ul ${testConfig.user.username} s-a logat cu succes!`);
});