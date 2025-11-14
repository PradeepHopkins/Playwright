import test, { expect } from "@playwright/test";

let authToken: string

test.beforeAll('Get Authorization for API', async ({ request }) => {
    const tokenResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { "user": { "email": "pradeepmathialagan.work@gmail.com", "password": "Playwright@2025" } }
    })
    const tokenResponseJson = await tokenResponse.json()
    authToken = 'Token ' + tokenResponseJson.user.token
});

test('Delete Articles', async ({ request }) => {
    // Create Articles API
    const newArticlesResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            "article": {
                "title": "Cricket_03",
                "description": "Test",
                "body": "Australia vs England Ashes Test Series will be start at end of the November.",
                "tagList": []
            }
        },
        headers: {
            Authorization: authToken
        }
    })

    const newArticlesResponseJson = await newArticlesResponse.json()
    expect(newArticlesResponse.status()).toEqual(201)
    expect(newArticlesResponseJson.article.title).toBe('Cricket_03')
    const slug = newArticlesResponseJson.article.slug

    // Delete API
    const deleteArticlesResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slug}`, {
        headers: {
            Authorization: authToken
        }
    })
    expect(deleteArticlesResponse.status()).toBe(204)
});
