import { expect } from "@playwright/test";
import { test } from "../utils/fixture";

test('Tesst Fixture', async ({ api }) => {

    api.url('https://conduit-api.bondaracademy.com')
        .path('/api/tags')
        .header({ Authorization: 'Token' })
})
