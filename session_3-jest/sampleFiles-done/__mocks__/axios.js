let ipsumData = {};
let error = '';
let calls = [];

module.exports = {
  /* *** Data setters and getters ** */
  setData(data) {
    ipsumData = data;
  },
  setError(data) {
    error = data;
  },
  getCalls() {
    return calls;
  },
  reset() {
    ipsumData = {};
    error = '';
    calls = [];
  },

  /* **** GET **** */
  get: jest.fn(endpoint => {
    calls.push(endpoint);

    if (error !== '') {
      return Promise.reject(new Error(error));
    }

    switch (true) {
      case /foo/.test(endpoint):
        return Promise.resolve({ data: ipsumData });
      default:
        return Promise.resolve({ data: ipsumData });
    }
  })
};
