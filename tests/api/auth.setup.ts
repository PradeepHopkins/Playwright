import { test as setup } from '@playwright/test'
// Instead of importing this as `test`, import it as `setup`.
// This is effectively a local alias, renaming how the module is referenced within the TypeScript file.
// Renamed on import: `test` is aliased to `setup` to better reflect its role here.

setup('authentication', async ({ page }) => {

    const authState = '.auth/user.json'
    await page.goto('https://conduit.bondaracademy.com/')
    await page.getByRole('link', { name: ' Sign in ' }).click()
    await page.getByRole('textbox', { name: 'Email' }).fill('pradeepmathialagan.work@gmail.com')
    await page.getByRole('textbox', { name: 'Password' }).fill('Playwright@2025')
    await page.getByRole('button', { name: ' Sign in ' }).click()
    // Ensure the application is fully logged in.
    // As a precaution, add an additional check to confirm the application has finished loading.
    await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')

    await page.context().storageState({ path: authState })
})