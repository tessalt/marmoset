function post(url, params, cb) {
  return fetch(url, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify(params)
  }).then((data) => cb(data));
}

const auth = {
  login(params, cb) {
    return post('/login', {auth: params}, cb);
  },
  signup(params, cb) {
    return post('/api/users', {user: params}, cb);
  }
}

export default auth;
