import {
    getCookie
} from "./getCookie";

import {
        HTTPNamedParams,
} from "../functions/http";

import jsonHttpRequest from "../functions/httpJson";
import URLSanitize from "../functions/URLSanitize";

/**
 * 
 * Named Parameters for Django Fetcher.
 * 
 * @category NamedParameters
 * @expand
 * @since 0.13.0
 */
export interface djangoFetcherNamedParams {

    /**
     * {@inheritDoc HTTPNamedParams.url}
     */
    url: HTTPNamedParams["url"]

    /**
     * {@inheritDoc HTTPNamedParams.method}
     * 
     * @example
     * ``` js
     * method = "OPTIONS"
     * ```
     * 
     * **Note:** Calling with method `OPTIONS` will force only obtaining the
     * apiMetadata.
     */
    method?: HTTPNamedParams["method"]

    /**
     * {@inheritDoc HTTPNamedParams.body}
     */
    body?: HTTPNamedParams["body"]
    /**
     * Additionally, fetch metadata
     * 
     */
    getMetadata?: boolean

    /**
     * Only fetch metadata
     */
    onlyMetadata?: boolean

    /**
     * {@inheritDoc HTTPNamedParams.signal}
     */
    signal?: HTTPNamedParams["signal"]
}



/**
 * This Fetcher sets up everything required to fetch datasets from a backend
 * that is Django.
 * 
 * @summary Django based backend fetcher for datasets.
 * 
 * @category Hook
 * @expandType djangoFetcherNamedParams
 * @since 0.13.0
 */
export default async function useDjangoFetcher({
    url,
    body = null,
    method = 'GET',
    getMetadata = false,
    onlyMetadata = false,
    signal = null
}: djangoFetcherNamedParams ): Promise<{ apiData: Response, apiMetadata: Response }> {


    const options: HTTPNamedParams = {
        credentials: true,
        headers: {
            ...( getCookie( 'csrftoken' ) ? { 'X-CSRFToken': getCookie( 'csrftoken' ) } : {} )
        },
        signal: signal,
        url: String(`${window.env.API_URL}${URLSanitize(url)}`)
    }

    let requestsReturn: { apiData: Response, apiMetadata: Response } = {
        apiData: null,
        apiMetadata: null
    };

    if( ! onlyMetadata && method !== 'OPTIONS' ) {

        const responseData = await jsonHttpRequest({
            ...options,
            method: method,
            body: body
        });

        requestsReturn.apiData = responseData

    }


    if( getMetadata || onlyMetadata || method === 'OPTIONS' ) {

        const responseMetaData = await jsonHttpRequest({
            ...options,
            method: "OPTIONS",
        });

        requestsReturn.apiMetadata = responseMetaData

    }


    return requestsReturn;

}
