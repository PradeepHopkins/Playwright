import test, { expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200")
})

test('Lists and Dropwons', async ({ page }) => {

    page.getByRole('list') // List can be used when the list has a ul tag. 
    page.getByRole('listitem') // list item can be used when the list has a lie tag.

    const dropDrownMenu = page.locator('ngx-header nb-select')
    await dropDrownMenu.click()
    const optionLists = page.locator('nb-option-list nb-option')
    //    const test = await optionLists.allTextContents()
    //    console.log(test)
    //    expect(optionLists).toHaveText([ ' Light', ' Dark', ' Cosmic', ' Corporate' ])
    await expect(optionLists).toHaveText([' Light', ' Dark', ' Cosmic', ' Corporate'])
    await optionLists.filter({ hasText: ' Cosmic' }).click()

    // To validate the color
    const headers = page.locator('nb-layout-header ')
    await expect(headers).toHaveCSS('background-color', 'rgb(50, 50, 89)')

})

test('Validate headers color', async ({ page }) => {

    // To validate every color and every selection option from the list.
    const dropDrownMenu = page.locator('ngx-header nb-select')
    await dropDrownMenu.click()
    const optionLists = page.locator('nb-option-list nb-option')

    const headers = page.locator('nb-layout-header ')
    // await dropDrownMenu.click() //  In order to repeat this loop, we want to open it again and to begin this loop.
    const colors = {
        ' Light': 'rgb(255, 255, 255)',
        ' Dark': 'rgb(34, 43, 69)',
        ' Cosmic': 'rgb(50, 50, 89)',
        ' Corporate': 'rgb(255, 255, 255)'
    }

    for (const color in colors) {
        await optionLists.filter({ hasText: color }).click()
        await expect(headers).toHaveCSS('background-color', colors[color])
        if(color !== ' Corporate')
        await dropDrownMenu.click()
    }
})
