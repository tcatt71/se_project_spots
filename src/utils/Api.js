class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._apiKey = options.headers.authorization;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._apiKey,
      },
    }).then((res) => this._processResponse(res));
  }

  getUserInformation() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._apiKey,
      },
    }).then((res) => this._processResponse(res));
  }

  editProfile() {}

  _processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error: ${response.status}`);
  }
}

export default Api;
