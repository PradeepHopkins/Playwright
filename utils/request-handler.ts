/**
 * Fluent Interface for API Testing
 * 
 * Allows method chaining to build and execute HTTP requests in a readable way
 * 
 */

export class RequestHandler {
    private defaultBaseUrl: string = "https://conduit-api.bondaracademy.com"
    private baseUrl: string = ''
    private apiPath: string = ''
    private apiParams: object = {}
    private apiHeader: object = {}
    private apiBody: object = {}
    private request: any = null

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
    header(header: object): this {
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

    /**
     * Set Playwright request object (usually passed from test context)
     * @param request - Playwright's request object
     * @returns this - For method chaining
     */
    withRequest(request: any): this {
        this.request = request
        return this
    }

    /**
     * Reset all configuration to defaults
     * Useful for test cleanup or running multiple requests
     * @returns this - For method chaining
     */
    reset(): this {
        this.baseUrl = ''
        this.apiPath = ''
        this.apiParams = {}
        this.apiHeader = {}
        this.apiBody = {}
        return this
    }

    private buildUrl() {
        const url = new URL(`${this.baseUrl ?? this.defaultBaseUrl}`)
        
        for (const [Key, value] of Object.entries(this.apiParams)) {
            url.searchParams.append(Key, value)
        }
        console.log(url.toString())
        return url.toString()
    }
}
