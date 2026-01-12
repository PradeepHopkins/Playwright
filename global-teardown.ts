import fs from 'fs'
import { AUTH_DIR, AUTH_FILE } from './auth-path';


export default function globalTeardown() {

    // Remove auth state file
    if (fs.existsSync(AUTH_FILE)) {
        fs.unlinkSync(AUTH_FILE)
        console.log('Global teardown: Authentication state file removed')
    }
    // Optional: remove the entire .auth directory if empty
    if (fs.existsSync(AUTH_DIR) && fs.readdirSync(AUTH_DIR).length === 0) {
        fs.rmdirSync(AUTH_DIR)
     console.log('Global teardown: .auth directory removed')
    }
}
