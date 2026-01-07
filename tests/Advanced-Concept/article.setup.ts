import { test as setup, expect } from "@playwright/test"
import fs from 'fs'

const dataFile = '.auth/article.json'

// Manual Parsing
const authState = JSON.parse(fs.readFileSync('.auth/user.json', 'utf-8'));

const accessToken =
  authState.origins[0].localStorage.find(
    (item: { name: string }) => item.name === 'jwtToken'
  )?.value;

setup('NewArticles', async ({ request }) => {
  const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
    data: { "article": { "title": "Test-002", "description": "Testing Mock Scenario", "body": "UI/API Mock scenario for article delete", "tagList": [] } },
    headers: {
      'Authorization': `Token ${accessToken}`
    }

  })
  expect(articleResponse.status()).toEqual(201)

  const responseBody = await articleResponse.json()
  fs.mkdirSync('.auth', { recursive: true })
  fs.writeFileSync(dataFile, JSON.stringify({ slugId: responseBody.article.slug }, null, 2))
})
