

/**
 * This Exception is the base exception for ALL http exceptions. You should not
 * use this exception directly and instead use one of the predefined ones.
 * 
 * @see HTTPNotAuthenticated
 * 
 * @summary Base class for all HTTP Exceptions.
 * 
 * @category Exception
 * @since 0.13.0
 */
export class HttpError extends Error {

    /**
     * HTTP response that caused the error.
     */
    response: Response;

    /**
     * @param response - The HTTP response that was returned from the request made.
     */
    constructor(response: Response) {

        super(`HTTP ${response.status}: ${response.statusText}`);

        this.name = this.constructor.name;

        this.response = response;

    }
}



/**
 * This exception is intended to be thrown as soon as a HTTP request returns
 * a status of `401`. In the case of this exception, it must **only** be caught
 * within the root ErrorBoundary
 * 
 * @summary User is not authenticated.
 * 
 * @category Exception
 * @since 0.13.0
 * @see {@link httpRequest}
 * 
 */
export class HTTPNotAuthenticated extends HttpError {}



/**
 * This exception is intended to be thrown as soon as a HTTP request returns
 * a status of `403`. In the case of this exception, it must be caught
 * within the view ErrorBoundary so it can be displayed as an
 * Alert.
 * 
 * @summary User is not authorised to perform the action.
 * 
 * @category Exception
 * @since 0.13.0
 * @see {@link httpRequest}
 */
export class HTTPNotAuthorised extends HttpError {}



/* istanbul ignore next */
/**
 * 
 * @category Exception
 * @since ...
 * 
 * @deprecated Since 0.13.0, use {@link HttpError} instead.
 */
export class ResponseException extends Error {

    /**
     * 
     * @param response - http response object
     */
    constructor(response) {

        super(response);

        this.name = this.constructor.name;

        this.message = response.statusText;

        this.status = response.status;

        this.response = response

    }


    /**
     * 
     * @returns string
     */
      toString() {

        return `message: ${this.message}, code: ${this.status}`

    }

}
