import test, { expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200")
    await page.getByRole('link', { name: 'Modal & Overlays' }).click()
    await page.getByRole('link', { name: 'Tooltip' }).click()
})

test("Tooltip", async ({ page }) => {
    const tooltipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    // To hover the mouse to visible tooltip
    await tooltipCard.getByRole('button', {name: 'Top'}).hover()
    // page.getByRole('tooltip') if you have role tooltip create
    const tooltipText = await page.getByText('This is a tooltip').textContent()
    expect(tooltipText).toEqual('This is a tooltip')
})
