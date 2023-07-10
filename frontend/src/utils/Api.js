import { apiOptions } from './constants.js';

class Api {
    constructor(apiRequestOptions) {
        this._baseUrl = apiRequestOptions.baseUrl;
    }


    _checkRequestResult = (res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    deleteItemRequest = (id, token) => {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            }
        })
            .then(res => {
                return this._checkRequestResult(res);
            })
            ;
    }

    takeProfileInfoRequest = (token) => {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            }
        })
            .then(res => {
                return this._checkRequestResult(res);
            })
    }

    takeCardsRequset = (token) => {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            }
        })
            .then(res => {
                return this._checkRequestResult(res);
            })
    }

    switchLikeStatusRequest = (item, isLiked, token) => {
        this._method = isLiked ? 'DELETE' : 'PUT';

        return fetch(`${this._baseUrl}/cards/${item}/likes`, {
            method: this._method,
            headers: {
                authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            }
        })
            .then(res => {
                return this._checkRequestResult(res);
            })
    }

    updateProfileInfoRequest = (item, token) => {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                avatar: item.avatar
            })
        })
            .then(res => {
                return this._checkRequestResult(res);
            })
    }

    postNewCardRequest = (item, token) => {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: `${item.name}`,
                link: `${item.link}`
            })
        })
            .then(res => {
                return this._checkRequestResult(res);
            })
    }

    editUserInfoRequet = (item, token) => {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: `${item.name}`,
                about: `${item.about}`
            })
        })
            .then(res => {
                return this._checkRequestResult(res);
            })
    }
}

const api = new Api(apiOptions);

export default api;


