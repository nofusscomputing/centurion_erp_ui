import {
    fetcherCommonNamedParams
} from ".";

import {
    getCookie
} from "./getCookie";

import {
    useBackendProvider
} from "../App/providers/backend";

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
export interface djangoFetcherNamedParams extends fetcherCommonNamedParams {

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

}



/**
 * This Fetcher sets up everything required to fetch datasets from a backend
 * that is Django.
 * 
 * @example
 * 
 * ``` js
 * const { apiMetadata, apiData } = await useDjangoFetcher({
 *     url: '/',
 *         onlyMetadata: true
 *     });
 *
 *      const data = await apiMetadata.clone().json();
 * 
 * ```
 * 
 * @summary Django based backend fetcher for datasets.
 * 
 * @category Hook
 * @expandType djangoFetcherNamedParams
 * @since 0.13.0
 */
export default async function useDjangoFetcher({
    url,
    baseURL = undefined,
    body = null,
    method = 'GET',
    getMetadata = false,
    onlyMetadata = false,
    signal = null
}: djangoFetcherNamedParams ): Promise<{ apiData: Response, apiMetadata: Response }> {

    let backend = null

    try {

        backend = useBackendProvider();

        baseURL = backend.url;

    } catch (err) {

        // Silently ignore error.

    }


    const options: HTTPNamedParams = {
        credentials: 'include',
        mode: 'cors',
        headers: {
            ...( getCookie( 'csrftoken' ) ? { 'X-CSRFToken': getCookie( 'csrftoken' ) } : {} )
        },
        signal: signal,
        url: String(`${(
            baseURL ? baseURL : window.env.API_URL
        )}${URLSanitize(url)}`)
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
