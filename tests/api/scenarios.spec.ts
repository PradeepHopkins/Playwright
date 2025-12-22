import test, { expect } from "@playwright/test"
/* 
Scenario: Validate Delete Article Functionality

Objective:
Verify that an article can be successfully deleted through the UI after being created via an API call.

Approach:
To speed up the test execution, the article will be created using an API instead of the UI. 
The UI will then be used only for validating the delete functionality.

*/

// test.beforeEach('Sign in', async ({ page }) => {
//     await page.goto('https://conduit.bondaracademy.com/')
//     await page.getByRole('link', { name: ' Sign in ' }).click()
//     await page.getByRole('textbox', { name: 'Email' }).fill('pradeepmathialagan.work@gmail.com')
//     await page.getByRole('textbox', { name: 'Password' }).fill('Playwright@2025')
//     await page.getByRole('button', { name: ' Sign in ' }).click()
// })

test('Delete Article', async ({ page, request }) => {
    // Get Login Token
    const tokenResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { "user": { "email": "pradeepmathialagan.work@gmail.com", "password": "Playwright@2025" } }
    })
    const tokenResponseBody = await tokenResponse.json()
    const token = tokenResponseBody.user.token
    expect(tokenResponse.status()).toEqual(200)
    // Create Articles
    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: { "article": { "title": "Test-001", "description": "Testing Mock Scenario", "body": "UI/API Mock scenario for article delete", "tagList": [] } },
        headers: {
            authorization: `Token ${token}`
        },

    })
    expect(articleResponse.status()).toEqual(201)
    // const articleResponseBody = await articleResponse.json()
    // const slugId = articleResponseBody.article.slug

    // Article list container
    const articleTitle = 'Test-001';
    const articleList = page.locator('app-article-list');

    // Specific article preview by title
    const articlePreview = articleList
        .locator('app-article-preview')
        .filter({ has: page.locator('h1', { hasText: articleTitle }) });

    // Open the article
    await articlePreview.click();

    // Delete the article
    const articleMeta = page.locator('.banner')
    await articleMeta
        .getByRole('button', { name: ' Delete Article ' })
        .click();
    // Verify article is removed from the list
    await expect(articleList).not.toContainText(articleTitle);
})
/* 
Scenario:
create a new article using the UI, verify that it appears in the Global Feed, and then remove the article using the backend API 
instead of the UI to keep the test environment clean.

Objective:
Validate that a user can successfully create and publish a new article.
Confirm that the article is visible in the Global Feed.
Ensure test data cleanup by deleting the article via the API.
Allow the test to be executed repeatedly without conflicts caused by duplicate article titles.

Approach:
create and publish a new article through the UI.
Navigate to the Home Page and open the Global Feed.
Assert that the newly created article is displayed.
Capture the article identifier (such as slug) from the API response or Network tab.
Send a DELETE request to the backend API to remove the article.
Verify that the cleanup is successful, ensuring a stable and reusable test. */

test('Create Articles', async ({ page, request }) => {
     await page.goto('https://conduit.bondaracademy.com/')
    const newArticles = 'Mock Test for Create and Delete'
    await page.getByRole('link', { name: ' New Article ' }).click()
    await page.getByRole('textbox', { name: 'Article Title' })
        .fill(newArticles)
    await page.getByRole('textbox', { name: `What's this article about?` })
        .fill('create Articles via UI and delete articles using API')
    await page.getByRole('textbox', { name: 'Write your article (in markdown)' })
        .fill('create a new article using the UI, verify that it appears in the Global Feed')
    await page.getByRole('textbox', { name: 'Enter tags' })
        .fill('Articles')
    await page.getByRole('button', { name: ' Publish Article ' }).click()
    const response = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
    const articleResponseBody = await response.json()
    const slugId = articleResponseBody.article.slug
    // Navigate to Home Page
    await page.getByRole('link', { name: ' Home ' }).click()
    // Verfiy Articles published
    await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0')
   // Article list container
    const articleList = page.locator('app-article-list');
    // Specific article preview by title
    articleList.locator('app-article-preview').filter({ has: page.locator('h1', { hasText: newArticles }) });
    await expect(articleList).toContainText(newArticles)
    // Get Login Token
    const tokenResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { "user": { "email": "pradeepmathialagan.work@gmail.com", "password": "Playwright@2025" } }
    })
    const tokenResponseBody = await tokenResponse.json()
    const accesToken = tokenResponseBody.user.token
    expect(tokenResponse.status()).toEqual(200)
    // Delete Article
    const deleteResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
        headers: {
            authorization: `Token ${accesToken}`
        }
    })
    expect(deleteResponse.status()).toEqual(204)

})