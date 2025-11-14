import test from "@playwright/test";
import { RequestHandler } from "../utils/request-handler";

test('Fluent Interface Design Test', async () => {

    const api = new RequestHandler()

    api.url('https://conduit-api.bondaracademy.com')
        .path('/api/articles')
        .param({ limit: 10, offset: 0 })
        .header({ Authorization: 'authToken' })
})
