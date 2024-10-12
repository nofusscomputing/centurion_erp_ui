
export class ResponseException extends Error {


    constructor(response) {

        super(response);

        this.name = this.constructor.name;

        this.message = response.statusText;

        this.status = response.status;

        this.response = response

    }


      toString() {

        return `message: ${this.message}, code: ${this.status}`

    }

}
