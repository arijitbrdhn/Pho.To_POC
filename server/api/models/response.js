/**
 * Response Model for successful response
 * @export
 * @class Response
 */
module.exports = class Response {
    constructor(data = {}, message = 'Operation completed successfully', statusCode) {
        this.data = data || {};
        this.message = message;
        this.statusCode = statusCode || 200;
    }
}
