const { test, expect } = require('@playwright/test');
const { config } = require('./config');

test('Sarcina 3 - testare autentificare utilizatori', async ({ page }) => {
    for (const user of config.testUsers) {
        if (!isValidEmail(user.email)) {
            console.log(`⚠️  E-Mail-ul ${user.email} este invalid!`);
        } else {
            await page.goto(config.url, { timeout: config.timeout });
            const expectedLoggedInUrl = "https://999.md/";
            await page.goto(config.url, { timeout: config.timeout });
            await page.fill('[name="login"]', user.username);
            await page.fill('[name="password"]', user.password);
            await page.screenshot({ path: `screenshot_before_submit_${user.email}.png` });
            await page.click('.login__form__footer__submit');

            try {
                await page.waitForSelector('p.login__form__field__message', { timeout: 3000 }).catch(() => {});
                const currentUrlAfterLogin = page.url();

                if (currentUrlAfterLogin === expectedLoggedInUrl) {
                    console.log(`✅ E-Mail-ul ${user.email} s-a logat cu succes!`);
                    await expect(page).toHaveURL(expectedLoggedInUrl);
                } else {
                    console.log(`❌ E-Mail-ul ${user.email} nu a reusit sa se logheze!`);
                }
            } catch (error) {
                console.log(`❌ E-Mail-ul ${user.email} nu a reusit sa se logheze!`);
            }

            await page.context().clearCookies();
        }
    }
});

function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}