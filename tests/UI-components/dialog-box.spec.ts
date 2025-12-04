import test, { expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200")
    await page.getByRole('link', { name: 'Tables & Data' }).click()
    await page.getByRole('link', { name: 'Smart Table' }).click()
})

test("Dialog Box", async ({ page }) => {

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })
    const tableColumn = page.getByRole('table').locator('tr', { hasText: 'mdo@gmail.com' })
    await tableColumn.locator('.nb-trash').click()
    expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})