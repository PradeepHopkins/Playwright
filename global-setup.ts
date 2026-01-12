import { request } from "@playwright/test";
import 'dotenv/config'
import fs from 'fs'
import {AUTH_DIR, AUTH_FILE} from './auth-path'

async function globalSetup() {
    const authState = AUTH_FILE
    // Ensure .auth directory exists
    if (!fs.existsSync(AUTH_DIR)) {
        fs.mkdirSync(AUTH_DIR)
    }
    // Create API request context
    const context = await request.newContext();
    // Login via API
    const tokenResponse = await context.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { "user": { "email": process.env.USER_EMAIL, "password": process.env.USER_PASSWORD } }
    })
    // Validate login
    if (!tokenResponse.ok()) {
        throw new Error('Global setup failed: Login request was not successful')
    }
    const tokenResponseBody = await tokenResponse.json()
    const accessToken = tokenResponseBody.user?.token

    if (!accessToken) {
        throw new Error('JWT token not found in response')
    }
    // Create Playwright storage state
    const storageState = {
        cookies: [],
        origins: [
            {
                origin: 'https://conduit.bondaracademy.com',
                localStorage: [
                    {
                        name: 'jwtToken',
                        value: accessToken
                    }
                ]
            }
        ]
    }
    // Save authentication state
    fs.writeFileSync(authState, JSON.stringify(storageState));
    process.stdout.write('Global setup completed: Authentication state created\n') // always prints, even when console.log is swallowed.
}

export default globalSetup;