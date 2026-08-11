
/**
 * Named parameters for a HTTP request.
 * 
 * @category NamedParameters
 * @expand
 * @since 0.13.0
 */
export interface HTTPNamedParams {

    /**
     * HTTP method to use for the request.
     */
    method?: "GET" | "OPTIONS" | "POST" | "PATCH",

    /**
     * URL for the request to be made against.
     */
    url: string,
}

/**
 * This object is intended to serve as the single point for all HTTP requests
 * that the UI will make.
 * 
 * @category fetcher
 * @expandType HTTPNamedParams
 * @since 0.13.0
 */
export default async function httpRequest({
    method = "GET",
    url,
}: HTTPNamedParams): Promise<Response> {

    return

}
