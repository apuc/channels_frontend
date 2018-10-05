import {API_URL} from '../../../../config/config'

export default {
    'REGISTRATION': ({commit, dispatch}, userData) => {
        commit('LOADING');
        return new Promise((resolve, reject) => {
            fetch(`${API_URL}/registration`, {
                method: 'post',
                body: userData
            }).then(res =>  {
                console.log(res);
                commit('SUCCESS_REGISTRATION');
                resolve(res);
            }).catch(err => {
                console.log(err);
                commit('ERROR', err);
                reject(err);
            });
        });
    },
    'GET_TOKEN': ({commit, dispatch}, userData) => {
        console.log('user', userData);
        commit('LOADING');
        return new Promise((resolve, reject) => {
            fetch(`${API_URL}/oauth/token`, {
                method: 'post',
                body: userData
            }).then(res =>  {
                console.log(res);
                localStorage.setItem('access_token', res.access_token); // store the token in localstorage
                localStorage.setItem('refresh_token', res.refresh_token); // store the token in localstorage
                commit('SUCCESS_TOKEN', res.access_token);
                // Получили токен, логинимся!
                dispatch('auth/LOGIN', res);
                resolve(res);
            }).catch(err => {
                console.log(err);
                commit('ERROR', err);
                localStorage.removeItem('access_token'); // if the request fails, remove any possible user token if possible
                localStorage.removeItem('refresh_token');
                reject(err);
            });
        });
    },
    'LOGIN': ({commit, dispatch}, tokenData) => {
        commit('LOADING');
        fetch(`${API_URL}/user`, {
            method: 'get',
            headers: new Headers({
                'Authorization': `${tokenData.token_type} ${tokenData.access_token}`
            })
        }).then(res =>  {
            console.log(res);
            commit('SUCCESS_LOGIN', res);
        }).catch(err => {
            console.log(err);
            commit('ERROR', err);
        });
    },
    'LOGOUT': ({commit}) => {
        return new Promise((resolve, reject) => {
            commit('LOGOUT');
            localStorage.removeItem('access_token'); // clear your user's token from localstorage
            localStorage.removeItem('refresh_token');
            resolve()
        })
    }
};
