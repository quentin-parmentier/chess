import {postRequest, getRequest, putRequest, deleteRequest} from './AxiosMethodes'
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
        user.finales = user.finales ?? ({pion:{},tour:{},dame:{}})
        return user
    })
}

export function changePassword(user){
    return putRequest(dataServ,'auth/password',user)
}

export function getProfilUser(){
    return getRequest(dataServ,'users/profil')
}

export function disconnectUser(){
    return deleteRequest(dataServ,'auth/logout')
}