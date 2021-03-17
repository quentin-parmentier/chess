import {postRequest, getRequest} from './AxiosMethodes'
import {authServ, dataServ} from '../constantes/server.json'

export function connectUser(pseudo, password){
    const params = {pseudo,password}
    return postRequest(authServ,'login',params)
    .then((tokens) => {
        //On init le token
        localStorage.setItem('token',tokens.accessToken);
        localStorage.setItem('refreshToken',tokens.refreshToken);
        return tokens
    })
}

export function createUser(pseudo, mail, password){
    const params = {pseudo,mail,password}
    return postRequest(authServ,'signup',params)
}

export function getUser(){
    return getRequest(dataServ, 'users')
    .then((user) => {
        user.ouvertures = user.ouvertures ?? {white:{},black:{}}
        user.finales = user.finales ?? ({pion:{},tour:{}})
        return user
    })
}