import test, { expect } from "@playwright/test";

test('PUt Update Articles', async ({ request }) => {

    // Get Authorization for API
    const tokenResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { "user": { "email": "pradeepmathialagan.work@gmail.com", "password": "Playwright@2025" } }
    })
    const tokenResponseJson = await tokenResponse.json()
    const authToken = 'Token ' + tokenResponseJson.user.token
    // console.log(authToken)

    // Create Articles API
    const newArticlesResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            "article": {
                "title": "Cricket_02",
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
    expect(newArticlesResponseJson.article.title).toBe('Cricket_02')
    const slug = newArticlesResponseJson.article.slug

    // Put API
    const updateArticlesResponse = await request.put(`https://conduit-api.bondaracademy.com/api/articles/${slug}`, {
        data: { "article": { "title": "Cricket_03", "description": "Test Match", "body": "Australia vs England Ashes Test Series will be start at end of the November.", "tagList": [], "slug": "Cricket-38638" } },
        headers: {
            Authorization: authToken
        }
    })
    const updateArticlesResponseJson = await updateArticlesResponse.json()
    expect(updateArticlesResponse.status()).toEqual(200)
    expect(updateArticlesResponseJson.article.title).toBe('Cricket_03')
    const newSlugId = updateArticlesResponseJson.article.slug

    // Delete API
    const deleteArticlesResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${newSlugId}`, {
        headers: {
            Authorization: authToken
        }
    })
    expect(deleteArticlesResponse.status()).toBe(204)
});
