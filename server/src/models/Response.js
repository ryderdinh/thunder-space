function Response(status, message, data){
    this.status = status;
    this.message = message
    this.data = data
}
module.exports = Response