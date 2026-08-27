import {
    loaderNamedParams
} from ".";

import {
    apiRootMetadata
} from "../../types/backend/apiMetadata/root";

import useDjangoFetcher from "../../hooks/useDjangoFetcher";



/**
 * 
 * This loader uses a {@link useDjangoFetcher | Django backend} to fetch the
 * Metadata **only**. This loader returns the the same essential object as
 * {@link djangoLoader} so they can be used interchangeably.
 * 
 * @summary Django loader that only fetches Metadata.
 * 
 * @category Loader
 * @expandType loaderNamedParams
 * @since 0.13.0
 */
const djangoRootMetadataLoader = async ({
    baseURL,
    request,
}: loaderNamedParams): Promise<{metadata: apiRootMetadata, page_data: null}> => {

    console.debug('Django Root MetaData Loader', {url: '/'})

    const {apiMetadata, apiData } = await useDjangoFetcher({
        onlyMetadata: true,
        url: '/',
        baseURL: baseURL,
        signal: request.signal,
    })

    return {
        metadata: await apiMetadata.clone().json(),
        page_data: null
    }

}

export default djangoRootMetadataLoader;
