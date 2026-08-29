import { HttpError, HTTPNotAuthenticated, HTTPNotAuthorised } from "../../Exceptions";


describe("HTTP", () => {

    const HTTPExceptions = [
        {
            "exception": HTTPNotAuthenticated,
            "status": 401,
            "statusText": "Not Authenticated"
        },
        {
            "exception": HTTPNotAuthorised,
            "status": 403,
            "statusText": "Not Authorized"
        }
    ]


    describe("Instance of Error", () => {

        test.each(HTTPExceptions)(
            "$exception.name",
            ({ exception, status, statusText}) => {

                const response = new Response(null, {
                    status: status,
                    statusText: statusText,
                });

                const err = new exception(response);

                expect(err).toBeInstanceOf(Error);
        });

    });


    describe("Instance of HttpError", () => {

        test.each(HTTPExceptions)(
            " - $exception.name",
            ({ exception, status, statusText}) => {

                const response = new Response(null, {
                    status: status,
                    statusText: statusText,
                });

                const err = new exception(response);

                expect(err).toBeInstanceOf(HttpError);

        });

    });

    describe("Property Value", () => {

        describe("response", () => {

            test.each(HTTPExceptions)(
                "$exception.name",
                ({ exception, status, statusText}) => {

                    const response = new Response(null, {
                        status: status,
                        statusText: statusText,
                    });

                    const err = new exception(response);

                    expect(err.response).toBe(response);
            });

        });


        describe("message", () => {

            test.each(HTTPExceptions)(
                "property message value - $exception.name",
                ({ exception, status, statusText}) => {

                    const response = new Response(null, {
                        status: status,
                        statusText: statusText,
                    });

                    const err = new exception(response);

                    expect(err.message).toBe(`HTTP ${status}: ${statusText}`);
            });

        });
    });


});
