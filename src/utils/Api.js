class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.apiKey = options.headers.authorization;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.apiKey,
      },
    }).then((res) => this._processResponse(res));
  }

  getUserInformation() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.apiKey,
      },
    }).then((res) => this._processResponse(res));
  }

  _processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error: ${response.status}`);
  }
}

export default Api;
