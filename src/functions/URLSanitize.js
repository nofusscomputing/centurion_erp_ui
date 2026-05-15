/** Sanitize URL
 * 
 * Pass in a URL from an API URL field, it will be cleaned up and be returned
 * as a UI navigation path.
 * 
 * @param {string} url 
 * @returns {String} UI Navigation Path
 */
export default function URLSanitize(url) {

    const PROTOCOL = "(?<protocol>https?)://";

    const IPV4 =
        "(?:(?:[1-9]\\d?|1\\d\\d|2[0-1]\\d|22[0-3])" +
        "(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})";

    const HOSTNAME =
        "(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?" +
        "(?:\\.[a-zA-Z]{2,63})+)";

    const LOCALHOST = "localhost";

    const HOST =
        "(?<host>(?:localhost|" +
        IPV4 +
        "|" +
        HOSTNAME +
        "))";

    const PORT = "(?::(?<port>[0-9]{1,5}))?";

    const PATH = "(?<path>/[^\\s?#]+)?";

    const URL_REGEX = new RegExp(
        `^(?:${PROTOCOL})?(?:${HOST})?(?:${PORT})?(?:${PATH})$`
    );

    function parse(value) {
        const match = String(value).match(URL_REGEX);

        return {
            protocol: match?.groups?.protocol ?? null,
            host: match?.groups?.host ?? null,
            port: match?.groups?.port ?? null,
            path: match?.groups?.path ?? null
        };
    }


    const known = parse( window.env.API_URL );
    const raw = parse( url );


    let cleanURL = String(url)

    if(cleanURL.startsWith(known.protocol)) {

        cleanURL = cleanURL.replace( `${known.protocol}://`, '')
    }

    if(cleanURL.startsWith(known.host)) {
        
        cleanURL = cleanURL.replace( known.host, '')
    }

    if(cleanURL.startsWith(`:${known.port}`)) {
        
        cleanURL = cleanURL.replace( `:${known.port}`, '')
    }


    if( cleanURL !== raw.path ) { // URL path must match the API path

        throw Error( `URL ${url} does not match when it should. known=raw [${known.path}=${cleanURL}]` )
    }


    if(cleanURL.startsWith(known.path)) {
        
        cleanURL = cleanURL.replace(known.path, '')
    }


    return cleanURL;

}
