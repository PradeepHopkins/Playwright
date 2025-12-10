import test, { expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200")
    await page.getByRole('link', { name: 'Modal & Overlays' }).click()
    await page.getByRole('link', { name: 'Toastr' }).click()
})

// difference between check and click, check method will check the status of the checkbox
// and if the checkbox already checked it will not unselect this checkbox it will remain selected
// while Click Command is just performing the click and doesn't validate the status of the checkbox.
// So better to use a method check.

test('CheckBoxes', async ({ page }) => {
    // To check checkbox
    await page.getByRole('checkbox', { name: 'Hide on click' }).check({ force: true })
    expect(await page.getByRole('checkbox', { name: 'Hide on click' }).isChecked()).toBeTruthy()
    // To uncheck checkbox
    await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true })
    expect(await page.getByRole('checkbox', { name: 'Hide on click' }).isChecked()).toBeFalsy()

    // To validate all checkboxes
    const allCheckboxes = page.getByRole('checkbox')
    // Locator.all(): Promise<Locator[]>
    // When the locator points to a list of elements, this returns an array of locators, pointing to their respective elements.

    // To be checked
    for (const box of await allCheckboxes.all()) {
        await box.check({ force: true })
        await expect(box).toBeChecked()
    }

    // To be unchecked
    for (const box of await allCheckboxes.all()) {
        await box.uncheck({ force: true })
        expect(await box.isChecked()).toBeFalsy()
    }

})

// ✅ Summary

// Use .check() and .uncheck() instead of .click() because they automatically ensure the checkbox ends up in the correct state.

// .check() → checks only if not already checked

// .uncheck() → unchecks only if not already unchecked

// .click() does not verify checkbox state and may toggle it unintentionally.

// To work with multiple checkboxes, get their locator list and use .all() to create an array of checkbox locators, then loop through them.

// Validation is done using .isChecked() or Playwright’s toBeChecked() expectation.