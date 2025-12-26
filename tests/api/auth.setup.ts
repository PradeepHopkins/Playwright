import { test as setup } from '@playwright/test'
import user from '../../.auth/user.json'
import fs from 'fs'
// Instead of importing this as `test`, import it as `setup`.
// This is effectively a local alias, renaming how the module is referenced within the TypeScript file.
// Renamed on import: `test` is aliased to `setup` to better reflect its role here.

setup('UI Authentication', async ({ page }) => {
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

// summarize:
// created a new file offset setups where we moved the step related to authentication.

// Authentication now is saved into the auth dot user dot Json and then the state is shared across other tests.

// Using this file, we set this configuration inside the playwright config and that the dependency on

// the setup project that will run the offset opts.

// And now every time we run the framework authentication will happen just once and all other tests will

// share this authentication state for the other tests.
/* 
const authState = '.auth/user.json'

setup('API Authentication', async ({ request }) => {
    const tokenResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { "user": { "email": "pradeepmathialagan.work@gmail.com", "password": "Playwright@2025" } }
    })
    const tokenResponseBody = await tokenResponse.json()
    const accesToken = tokenResponseBody.user.token
    user.origins[0].localStorage[0].value = accesToken

    fs.writeFileSync(authState, JSON.stringify(user))
    process.env['ACCESS_TOKEN'] = accesToken
}) */