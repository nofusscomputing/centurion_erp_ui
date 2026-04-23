
jest.mock('../../hooks/apiFetch', () => {

    const fs = require('fs/promises');


    const apiFetch = async ({
        src,
        callback = null,
        http_method = 'GET',
        data_body = null,
        metadata = true,
        patch = true
    }) => {

        const url = String(src);

        const demoRootPath = `${process.cwd()}/includes/usr/share/nginx/html/mock/api/v2`

        let pageData = '{}';

        let pageMetadata = '{}';

        try {

            pageData = require('fs').readFileSync(`${demoRootPath}${url}/${http_method}.json`, 'utf-8')

            if(
                String(http_method).toLowerCase() !== 'options'
                && metadata
            ) {

                pageMetadata = require('fs').readFileSync(`${demoRootPath}${url}/OPTIONS.json`, 'utf-8')

            }

        } catch (err) {

            return {
                api_metadata: JSON.parse(pageMetadata),
                api_page_data: JSON.parse(pageData),
                status: false,
            };
        }


        return {
            api_metadata: JSON.parse(pageMetadata),
            api_page_data: JSON.parse(pageData),
            // response: api_data_response.response,
            status: true,
        };
    }


    return {
        __esModule: true,
        default: apiFetch,
        apiFetch
    };

});

import { apiFetch } from '../../hooks/apiFetch';
