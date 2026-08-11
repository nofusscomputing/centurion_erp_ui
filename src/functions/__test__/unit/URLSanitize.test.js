
import URLSanitize from "../../URLSanitize";



describe('Returns Correct Value', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    const URLPatternsDifferentAPIHost = [
        {
            "name": "Different API Host - Strips API prefix",
            "api_url": "http://domain.tld/api/v2",
            "value": "http://domain.tld/api/v2/module/view",
            "expected": "/module/view"
        },
        {
            "name": "Different API Host, Relative - Strips API prefix",
            "api_url": "http://domain.tld/api/v2",
            "value": "/api/v2/module/view",
            "expected": "/module/view"
        },
        {
            "name": "Different API Host, with QueryString - Strips API prefix",
            "api_url": "http://domain.tld/api/v2",
            "value": "http://domain.tld/api/v2/module/view?key=value",
            "expected": "/module/view?key=value"
        },
        {
            "name": "Different API Host, Relative with QueryString - Strips API prefix",
            "api_url": "http://domain.tld/api/v2",
            "value": "/api/v2/module/view?key=value",
            "expected": "/module/view?key=value"
        },
    ]

    const URLPatternsDifferentAPIHostOnPort = [
        {
            "name": "Different API Host, On Port - Strips API prefix",
            "api_url": "http://domain.tld:8000/api/v2",
            "value": "http://domain.tld:8000/api/v2/module/view",
            "expected": "/module/view"
        },
        {
            "name": "Different API Host, On Port, Relative - Strips API prefix",
            "api_url": "http://domain.tld:8000/api/v2",
            "value": "/api/v2/module/view",
            "expected": "/module/view"
        },
        {
            "name": "Different API Host, On Port, with QueryString - Strips API prefix",
            "api_url": "http://domain.tld:8000/api/v2",
            "value": "http://domain.tld/api/v2/module/view?key=value",
            "expected": "/module/view?key=value"
        },
        {
            "name": "Different API Host, On Port, Relative with QueryString - Strips API prefix",
            "api_url": "http://domain.tld:8000/api/v2",
            "value": "/api/v2/module/view?key=value",
            "expected": "/module/view?key=value"
        },
    ]

    const URLPatternsSameAPIHost = [
        {
            "name": "Same API Host - Strips API prefix",
            "api_url": "http://localhost/api/v2",
            "value": "http://localhost/api/v2/module/view",
            "expected": "/module/view"
        },
        {
            "name": "Same API Host, Relative - Strips API prefix",
            "api_url": "http://localhost/api/v2",
            "value": "/api/v2/module/view",
            "expected": "/module/view"
        },
        {
            "name": "Same API Host, with QueryString - Strips API prefix",
            "api_url": "http://localhost/api/v2",
            "value": "http://localhost/api/v2/module/view?key=value",
            "expected": "/module/view?key=value"
        },
        {
            "name": "Same API Host, Relative with QueryString - Strips API prefix",
            "api_url": "http://localhost/api/v2",
            "value": "/api/v2/module/view?key=value",
            "expected": "/module/view?key=value"
        },
    ]

    const URLPatternsSameAPIHostOnPort = [
        {
            "name": "Same API Host, On Port - Strips API prefix",
            "api_url": "http://localhost:8000/api/v2",
            "value": "http://localhost:8000/api/v2/module/view",
            "expected": "/module/view"
        },
        {
            "name": "Same API Host, On Port, Relative - Strips API prefix",
            "api_url": "http://localhost:8000/api/v2",
            "value": "/api/v2/module/view",
            "expected": "/module/view"
        },
        {
            "name": "Same API Host, On Port, with QueryString - Strips API prefix",
            "api_url": "http://localhost:8000/api/v2",
            "value": "http://localhost/api/v2/module/view?key=value",
            "expected": "/module/view?key=value"
        },
        {
            "name": "Same API Host, On Port, Relative with QueryString - Strips API prefix",
            "api_url": "http://localhost:8000/api/v2",
            "value": "/api/v2/module/view?key=value",
            "expected": "/module/view?key=value"
        },
    ]

    const URLPatterns = [
        ...URLPatternsDifferentAPIHost,
        ...URLPatternsDifferentAPIHostOnPort,
        ...URLPatternsSameAPIHost,
        ...URLPatternsSameAPIHostOnPort,
    ]


    test.each(URLPatterns)(
        "$name",
        ({ api_url, value, expected, env = {} }) => {


            window.env = {
                API_URL: api_url,
            };

            window.history.replaceState({}, "", "http://localhost");

            expect(URLSanitize(value)).toBe(expected)

    });



    test("Ensure unknown URL throws an error", () => {

        window.env = {
                API_URL: "http://localhost:8000/api/v2",
            };

            window.history.replaceState({}, "", "http://localhost");

            expect(() => URLSanitize("http://some.random.host/api/v2")).toThrow(Error)

    });


});
