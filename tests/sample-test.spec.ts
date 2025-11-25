import { test } from "@playwright/test"

test('First Test', async ({ page }) => {

  await page.goto("http://localhost:4200")
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
})