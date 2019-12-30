class Result {
  constructor(errno = 0, errmsg = '', data = {}) {
    this.errno = errno;
    this.errmsg = errmsg;
    this.data = data;
  }
}

module.exports = { Result };
