import test, { expect } from "@playwright/test";

test('Create Articles', async ({ request }) => {
    
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
                "title": "Cricket",
                "description": "Test Match",
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
    expect(newArticlesResponseJson.article.title).toBe('Cricket')
    const slug = newArticlesResponseJson.article.slug

    // To Cofirm Articles published 
    const allArticlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', {
        headers: {
            Authorization: authToken
        }
    })
    const allArticlesResponseJson = await allArticlesResponse.json()
    expect(allArticlesResponseJson.articles[0].title).toBe('Cricket')

    // Delete API
    const deleteArticlesResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slug}`, {
        headers: {
            Authorization: authToken
        }
    })
    expect(deleteArticlesResponse.status()).toBe(204)
});
