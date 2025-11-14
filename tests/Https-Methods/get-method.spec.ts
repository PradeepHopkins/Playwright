import { expect, test } from "@playwright/test";

// Why toBe()?
// It checks strict equality (===).
// It’s faster and clearer for primitive types (numbers, strings, booleans).

// When would you use toEqual()?
// toEqual() is intended for deep equality—objects, arrays, nested structures.

test('Get Tags', async ({ request }) => {

  const tagsResponse= await request.get('https://conduit-api.bondaracademy.com/api/tags')
  const responseJson = await tagsResponse.json()
  // console.log(responseJson)

  expect(tagsResponse.status()).toBe(200)
  expect(responseJson.tags[0]).toBe('Test')
  expect(responseJson.tags.length).toBeLessThanOrEqual(10)
})

test('Get All Articles', async ({ request }) => {

  const allArticlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0')
  const responseJson = await allArticlesResponse.json()
  //  console.log(responseJson)

  expect(allArticlesResponse.status()).toBe(200)
  expect(responseJson.articles.length).toBeLessThanOrEqual(10)
  expect(responseJson.articlesCount).toBe(10)
  expect(Array.isArray(responseJson.articles)).toBeTruthy()
})
