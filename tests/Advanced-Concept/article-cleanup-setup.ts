import { expect, test as setup } from "@playwright/test";
import 'dotenv/config';
import fs from 'fs';

// Manual Parsing
const authState = JSON.parse(fs.readFileSync('.auth/user.json', 'utf-8'));

const accessToken = authState.origins[0].localStorage.find(
    (item: { name: string }) => item.name === 'jwtToken')?.value;

setup('DeleteArticles', async ({ request }) => {
    const deleteResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${process.env.SLUGID}`, {
       headers: {
            'Authorization': `Token ${accessToken}`
        }
    })
    expect(deleteResponse.status()).toEqual(204)
})
