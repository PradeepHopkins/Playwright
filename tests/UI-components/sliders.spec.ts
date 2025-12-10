import test, { expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200")
})

test('Slider - Update Attribute', async ({ page }) => {
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    await tempGauge.evaluate(node => {
        node.setAttribute('cx', '264.58840')
        node.setAttribute('cy', '180.48122')
    })
    await tempGauge.click()
})

// Note: Need to make sure that the area where you going to move your mouse is completely in the view of the browser.
// So that's why we need kind of a scroll down this section a little bit down to make sure that this entire view located in the browser view.
test('Slider - Mouse Movement', async ({ page }) => {
    // Locate the temperature slider container.
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    // Ensure the element is fully visible in the viewport before interacting with it.
    // Playwright will scroll the page automatically if needed.
    await tempBox.scrollIntoViewIfNeeded()
    const box = await tempBox.boundingBox()
    const centerX = box.x + box.width / 2
    const centerY = box.y + box.height / 2
    // Drag the slider using mouse events
    await page.mouse.move(centerX, centerY) // move to center
    await page.mouse.down()
    await page.mouse.move(centerX + 100, centerY) // drag right
    await page.mouse.move(centerX + 100, centerY + 100) // drag down-right
    await page.mouse.up()
    await expect(tempBox).toContainText('30')
})

// Summary:
// Playwright finds x and y by getting the pixel bounding box of the entire SVG element in the actual rendered page, 
// not by using the SVG’s internal coordinate system.
