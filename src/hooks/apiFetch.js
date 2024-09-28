import { ResponseException } from "../classes/Exceptions";
import { getCookie } from "./getCookie";

/**
 * Make an API call to fetch data
 * 
 * @param {String} url_path The URL path to fetch from
 * @param {Function} callback The callback function for the collected data
 * @param {String} http_method The HTTP method to use
 * @returns 
 */
export async function apiFetch(
    url_path,
    callback = null,
    http_method = 'GET'
) {

    let api_data = null

    if(
        ! url_path.startsWith('/')
        && url_path != ''
    ) {

        url_path = '/' + url_path

    }

    await fetch('http://127.0.0.1:8002/api/v2' + url_path, {
        credentials: 'include',
        headers: {'X-CSRFToken': getCookie('csrftoken')},
        method: http_method,
    })

        .then(response => {

            if( ! response.ok ) {

                throw new ResponseException(response)
            }

            return response.json()


        })

        .then(data => {

            if( callback ) {

                callback(data)

            }
        })

        .catch(err => {

            throw Error(err)

        });

    return api_data;
}
