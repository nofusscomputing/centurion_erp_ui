import {
    HTTPNamedParams
} from "../functions/http"



/**
 * These parameters are used by **all** fetchers.
 * 
 * @summary Common fetcher named parameters.
 * 
 * @category Params
 * @since 0.13.0
 */
export interface fetcherCommonNamedParams {

    /**
     * {@inheritDoc HTTPNamedParams.url}
     */
    url: HTTPNamedParams["url"]

    /**
     * 
     */
    baseURL?: HTTPNamedParams["url"]

    // params: any

    /**
     * {@inheritDoc HTTPNamedParams.signal}
     */
    signal?: HTTPNamedParams["signal"]
}
