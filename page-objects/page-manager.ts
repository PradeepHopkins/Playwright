import { Page } from "@playwright/test";
import { NavigationPage } from "./navigation-page";
import { DatePickerPage } from "./date-picker-page";
import { FormLayoutsPage } from "./form-layouts-page";

export class PageManager {

    private readonly page: Page
    private readonly navigation: NavigationPage
    private readonly datePicker: DatePickerPage
    private readonly formLayouts: FormLayoutsPage

    constructor(page: Page) {
        this.page = page
        this.navigation = new NavigationPage(this.page)
        this.formLayouts = new FormLayoutsPage(this.page)
        this.datePicker = new DatePickerPage(this.page)
    }
    // Using this.page ensures every page object operates on the exact same browser page passed from the test.

    navigateTo() {
        return this.navigation
    }

    onFormLayouts() {
        return this.formLayouts
    }

    onDatePicker() {
        return this.datePicker
    }

}

// The PageManager acts as a central factory for all page objects.
// It receives the Playwright `page` fixture once from the test and shares the same instance across all page objects.

// This guarantees:
// - A single browser context and page lifecycle
// - Consistent navigation and state across pages
// - No accidental creation of multiple Page instances

// Instead of passing the raw `page` everywhere,
// we store it as `this.page` and cascade it to all page objects.