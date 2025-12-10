import test, { expect } from "@playwright/test";

// iFrame is a kind of embedded HTML document inside of the existing HTML document.
// So it's a kind of a website inside of the website and you can tell that by HTML code and body.
// So every HTML website has only a single body and every HTML web page begins with just a single HTML.
test('Drag and Drop with Iframes', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')

    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
    const trash = frame.locator('#trash')
    await frame.locator('li', { hasText: 'High Tatras 2' }).dragTo(trash)

    // more presice control
    await frame.locator('li', { hasText: 'High Tatras 4' }).hover()
    await page.mouse.down()
    await trash.hover()
    await page.mouse.up()

   await expect(frame.locator('#trash ul h5')).toHaveText(['High Tatras 2', 'High Tatras 4'])
})