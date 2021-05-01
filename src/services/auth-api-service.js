import config from '../config'

const AuthApiService = {
  postLogin(credentials) {
    return fetch(`${config.AUTH_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `${config.APP_API_TOKEN}`
      },
      body: JSON.stringify(credentials),
      
    })
      .then(res =>
        (!res.ok) ?
          res.json().then(e => Promise.reject(e)) :
          res.json()
      )
      .catch(err => {
        
      })
  },
  postUser(user) {
    return fetch(`${config.AUTH_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `${config.APP_API_TOKEN}`
      },
      body: JSON.stringify(user),
    })
      .then(res =>
        (!res.ok) ?
          res.json().then(e => Promise.reject(e)) :
          res.json()
      )
      .catch(err => {
        this.setState({ 
          error: "Error"
        })
      })
  },
}

export default AuthApiService;