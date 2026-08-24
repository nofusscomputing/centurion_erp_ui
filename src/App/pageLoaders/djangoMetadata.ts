import {
    loaderNamedParams
} from ".";

import {
    APIMetadata
} from "../../../types/APIMetadata";

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
const djangoMetadataLoader = async ({
    baseURL,
    request,
}: loaderNamedParams): Promise<{metadata: APIMetadata, page_data: null}> => {

    console.debug('Django MetaData Loader', request)

    const {apiMetadata, apiData } = await useDjangoFetcher({
        onlyMetadata: true,
        url: String(request.url).replace('/add', ''),
        baseURL: baseURL,
        signal: request.signal,
    })

    return {
        metadata: await apiMetadata.clone().json(),
        page_data: null
    }

}

export default djangoMetadataLoader;
