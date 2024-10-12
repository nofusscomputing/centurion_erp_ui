/**
 * Fetch the value of a cookie
 * 
 * @param {String} name Name of the Cookie to get
 * @returns 
 */
export function getCookie(name) {

    let value = null

    if (document.cookie && document.cookie !== '') {

        const cookies = document.cookie.split(';');


        for (let i = 0; i < cookies.length; i++) {

            const cookie = cookies[i].trim();

            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {

                value = decodeURIComponent(cookie.substring(name.length + 1));

                break;

            }

        }

    }


    return value
}
