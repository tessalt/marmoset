
const auth = {
  login(params, cb) {
    fetch('/login', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({auth: params})
    }).then((data) => cb(data));
  }
}

export default auth;
