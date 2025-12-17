# 1. request (just observing)

# A request is a read-only representation of a network call that already happened or is about to happen.

# You use it to:
1. Inspect URL, method, headers, payload

2. Assert that a request was made

3. Wait for a specific request

# Example: listening to requests
✅ You can see the request
❌ You cannot change or stop it

# 2. Intercepting a request (route)

# Intercepting means Playwright pauses the request before it is sent, gives you a route, and waits for your decision.

# You use interception to:
1. Modify the request

2. Mock the response

3. Block the request

4. Simulate failures

# Example: intercept & mock
Here:
The real request never goes to the server
You control the outcome

# When to use what?

# Use request when:
1. You want to assert API calls

2. You’re debugging network traffic

3. You don’t want to affect behavior

# Use interception when:
1. You need deterministic tests

2. You want to mock APIs

3. You need to block or modify traffic

# In Playwright, page.route and browserContext.route do the same kind of thing (network interception), but at different scopes.

# 1. page.route()
# What it does

Intercepts requests only from one page.

Example
await page.route('**/api/users', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify([]),
  });
});


✔ Only this page is affected
✔ Good for page-specific mocks

# When to use page.route

1. ou want different mocks per page

2. You are testing a single flow

3. You don’t want side effects on other tabs/pages

# 2. browserContext.route()
# What it does

Intercepts requests from all pages in the same browser context.

await context.route('**/api/users', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify([]),
  });
});

✔ Applies to every page in the context
✔ Includes: new pages, popups, iframes, redirects

# When to use browserContext.route

1. You want global mocks

2. You want to block analytics everywhere

3. You want consistent auth headers across pages