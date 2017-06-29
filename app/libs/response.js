function extendResponse(res) {

  res.setData = (value) => {
    if (value)
      res.data = value;
  };

  res.setMsg = (value) => {
    if (value)
      res.msg = value;
  };

  res.sendPreparedData = () => {
    let response = {};
    if (res.data) {
      response.data = res.data;
    }
    if (this.msg) {
      response.msg = res.msg;
    }
    res.json(response);
  };

  return res;
}

module.exports = extendResponse;
