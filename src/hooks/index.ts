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
     * Backend base URL.
     * 
     * This value is always to be supplied when a loader is calling.
     * Additionally you **should not** supply this param a value as it is a
     * requirement that **all** fetchers ignore it and obtain the `backend.url`
     * via the {@link BackendProvider} from the nearest {@link BackendLayout}.
     */
    baseURL?: HTTPNamedParams["url"]

    // params: any

    /**
     * {@inheritDoc HTTPNamedParams.signal}
     */
    signal?: HTTPNamedParams["signal"]
}
