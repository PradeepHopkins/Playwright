import { expect } from '@playwright/test';
import { test } from '../utils/fixture.ts'

test("Get Articles", async ({ api }) => {
    const response = await api
        .path('api/articles')
        .param({ limit: 10, offset: 0 })
        .getRequest(200)
    console.log(response)
});

let authToken: string
let slug: string

test.beforeAll("Get Token", async ({ api }) => {
    const authTokenResponse = await api
        .path('api/users/login')
        .body({ "user": { "email": "pradeepmathialagan.work@gmail.com", "password": "Playwright@2025" } })
        .postRequest(200)
    authToken = 'Token ' + authTokenResponse.user.token
})

test("Create Articles and delete", async ({ api }) => {
    const createArticles = await api
        .path('api/articles/')
        .header({ authorization: authToken })
        .body({
            "article": {
                "title": "Sports",
                "description": "Cricket - Test Match",
                "body": "Australia vs England Ashes Test Series will be start at end of the November.",
                "tagList": []
            }
        })
        .postRequest(201)
    slug = createArticles.article.slug
    expect(createArticles.article.title).toBe('Sports')

    const deleteArticles = await api
        .path(`api/articles/${slug}`)
        .header({ authorization: authToken })
        .deleteRequest(204)
});

test("Update the Articles and delete", async ({ api }) => {
    const createArticles = await api
        .path('api/articles/')
        .header({ authorization: authToken })
        .body({
            "article": {
                "title": "Sports_01",
                "description": "Cricket - Test Match",
                "body": "Australia vs England Ashes Test Series will be start at end of the November.",
                "tagList": []
            }
        })
        .postRequest(201)
    slug = createArticles.article.slug
    expect(createArticles.article.title).toBe('Sports_01')

    const updateArticles = await api
        .path(`/api/articles/${slug}`)
        .header({ authorization: authToken })
        .body({ "article": { "title": "Sports_02", "description": "Test Match", "body": "Australia vs England Ashes Test Series will be start at end of the November.", "tagList": [], "slug": slug } })
        .putRequest(200)
    expect(updateArticles.article.title).toBe('Sports_02')
    const newSlugId = updateArticles.article.slug

    const deleteArticles = await api
        .path(`api/articles/${newSlugId}`)
        .header({ authorization: authToken })
        .deleteRequest(204)
});
