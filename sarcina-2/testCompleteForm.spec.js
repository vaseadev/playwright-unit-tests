const { test, expect } = require('@playwright/test');
const { user } = require('./user');

test('Sarcina 2 - validare formular', async ({ page }) => {
    await page.goto("https://simpalsid.com/user/register", { timeout: 5000 });

    if (user.isValidEmail()) {
        await page.fill('[name="login"]', user.getFullName());
        await page.fill('[name="email"]', user.email);
        await page.check('#agree-rules');
        await page.click('#simpalsid-submit-btn');
        await page.waitForTimeout(1000);

        const errorElementPassword = await page.waitForSelector('#simpalsid-progressbar', { timeout: 3000 }).catch(() => null);

        if (errorElementPassword) {
            console.log(`✅ Nume: ${user.getFullName()} | E-Mail: ${user.email}`)
            expect(true).toBe(true);
        } else {
            throw new Error('❌ Validarea numelui si parolei nu au trecut!');
        }
    } else {
        throw new Error(`⚠️  E-Mail-ul ${user.email} nu este valid!`);
    }
});
