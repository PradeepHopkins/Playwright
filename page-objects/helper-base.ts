import { Page } from "@playwright/test";

export class HelperBase {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async waitForNumberOfseconds(timeInSecond: number) {
        return this.page.waitForTimeout(timeInSecond * 1000)
    }
}

// Helper base class to centralize common methods and utilities that can be reused across multiple page objects.
// By moving shared functionality into a base class:
// We reduce code duplication
// Improve maintainability
// Keep page objects focused on page-specific behavior
// Make updates easier when common logic changes
// All page objects can now extend this base class and automatically inherit reusable methods, 
// ensuring consistency and cleaner architecture across the test framework.