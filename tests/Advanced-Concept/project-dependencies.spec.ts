import { expect, test } from '@playwright/test'
import 'dotenv/config'

test('Verfiy like button', async ({ page }) => {
    await page.goto(process.env.CONDUIT_URL)
    await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0')

    const likeButton = page.locator('app-article-preview').first().locator('button')
    await expect(likeButton).toContainText(' 0 ')
    await likeButton.click()
    await expect(likeButton).toContainText(' 1 ')
})
