class ReqError extends Error {
    constructor(resp) {
        this.name = "ReqError";
        if (resp.body.data.address.search(/valid address.*required/i >= 0)) {
            this.message = "Invalid address";
        } else {
            this.message = "API error occured";
        }
        this.resp = resp;
    }
}
  
  
class InvalidResponseError extends Error {
    constructor(opts) {
        this.name = "InvalidResponseError";
        this.message = opts.message || "Server response is invalid";
        this.response = opts.response;
        this.service = opts.service;
    }
}
  
  
module.exports = {
    "ReqError": ReqError,
    "InvalidResponseError": InvalidResponseError
};