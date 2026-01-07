import { expect, test as setup } from "@playwright/test";
import 'dotenv/config';
import fs from 'fs';

// Manual Parsing
const authState = JSON.parse(fs.readFileSync('.auth/user.json', 'utf-8'));

const accessToken = authState.origins[0].localStorage.find(
    (item: { name: string }) => item.name === 'jwtToken')?.value;

// parse Article ID
const article = JSON.parse(fs.readFileSync('.auth/article.json', 'utf-8'));
const slugId = article.slugId;

setup('DeleteArticles', async ({ request }) => {
    const deleteResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
        headers: {
            'Authorization': `Token ${accessToken}`
        }
    })
    expect(deleteResponse.status()).toEqual(204)
})
