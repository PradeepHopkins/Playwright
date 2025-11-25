/**
 * Fluent Interface for API Testing
 * 
 * Allows method chaining to build and execute HTTP requests in a readable way
 * 
 */

import { APIRequestContext, expect } from "@playwright/test"

export class RequestHandler {
    private request: APIRequestContext
    private baseUrl: string = ''
    private defaultBaseUrl: string
    private apiPath: string = ''
    private apiParams: object = {}
    private apiHeader: Record<string, string> = {}
    private apiBody: object = {}


    constructor(request: APIRequestContext, apiBaseUrl: string) {
        this.request = request
        this.defaultBaseUrl = apiBaseUrl

    }

    /**
     * Set the base URL for the API
     * @param url - The base URL (e.g., 'https://api.example.com')
     * @returns this - For method chaining
     */
    url(url: string): this {
        this.baseUrl = url
        return this
    }

    /**
     * Set the API endpoint path
     * @param path - The API path (e.g., '/users', '/articles/123')
     * @returns this - For method chaining
     */
    path(path: string): this {
        this.apiPath = path
        return this
    }

    /**
     * Set query parameters
     * @param param - Query parameters object (e.g., { limit: 10, offset: 0 })
     * @returns this - For method chaining
     */
    param(param: object): this {
        this.apiParams = param
        return this
    }

    /**
     * Set HTTP headers
     * @param header - Headers object (e.g., { 'Authorization': 'Bearer token' })
     * @returns this - For method chaining
     */
    header(header: Record<string, string>): this {
        this.apiHeader = header
        return this
    }

    /**
     * Set request body
     * @param body - Request body object
     * @returns this - For method chaining
     */
    body(body: object): this {
        this.apiBody = body
        return this
    }

    /* 
        private getUrl() {
            const url = new URL(`${this.baseUrl ?? this.defaultBaseUrl}${this.apiPath}`)
            for (const [Key, value] of Object.entries(this.apiParams)) {
                url.searchParams.append(Key, value)
            }
            console.log(url.toString())
            return url.toString()
        }
     */

    private getUrl() {
        // Prefer baseUrl only if it is NOT empty, otherwise fall back to defaultBaseUrl
        const base = this.baseUrl.trim() !== '' ? this.baseUrl : this.defaultBaseUrl;

        // Correct URL joining
        const url = new URL(this.apiPath, base);

        // Append query params
        for (const [key, value] of Object.entries(this.apiParams)) {
            url.searchParams.append(key, String(value));
        }

        console.log(url.toString());
        return url.toString();
    }

    async getRequest(statusCode: number) {
        const url = this.getUrl()
        const response = await this.request.get(url, {
            headers: this.apiHeader
        })
        const responseJson = await response.json()
        expect(response.status()).toEqual(statusCode)
        return responseJson
    }

    async postRequest(statusCode: number) {
        const url = this.getUrl()
        const response = await this.request.post(url, {
            headers: this.apiHeader,
            data: this.apiBody
        })
        const responseJson = await response.json()
        expect(response.status()).toEqual(statusCode)
        return responseJson
    }

    async putRequest(statusCode: number) {
        const url = this.getUrl()
        const response = await this.request.put(url, {
            headers: this.apiHeader,
            data: this.apiBody
        })
        const responseJson = await response.json()
        expect(response.status()).toEqual(statusCode)
        return responseJson
    }

    async deleteRequest(statusCode: number) {
        const url = this.getUrl()
        const response = await this.request.delete(url, {
            headers: this.apiHeader
        })
        expect(response.status()).toEqual(statusCode)
    }
}
