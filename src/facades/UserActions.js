import {postRequest, getRequest, putRequest, deleteRequest} from './AxiosMethodes'
import {dataServ} from '../constantes/server.json'

export function connectUser(pseudo, password){
    const params = {pseudo,password}
    return postRequest(dataServ,'auth/login',params)
    .then((tokens) => {
        //On init le token
        localStorage.setItem('token',tokens.accessToken);
        localStorage.setItem('refreshToken',tokens.refreshToken);

        return tokens
    })
}

function refreshUserToken(expiresIn){

    setTimeout(function(){ 
        getNewToken()
    }, (expiresIn - 60) * 1000);
}

function getNewToken(){
    const refreshToken = localStorage.getItem('refreshToken');
    const params = {token : refreshToken}
    return postRequest(dataServ,'auth/refresh',params)
    .then((response) => {
        if(!response.accessToken) return localStorage.removeItem('token')
        localStorage.setItem('token',response.accessToken);
        refreshUserToken(response.expiresIn)
        return response
    })
    .catch(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
    })
}

export function createUser(pseudo, mail, password){
    const params = {pseudo,mail,password}
    return postRequest(dataServ,'auth/signup',params)
}

export async function getUser(){

    await getNewToken()

    return await getRequest(dataServ, 'users')
    .then((user) => {
        user.ouvertures = user.ouvertures ?? {white:{},black:{}}
        user.finales = user.finales ?? ({pion:{},tour:{},dame:{}})
        return user
    })
}

export function getProfilUser(){
    return getRequest(dataServ,'users/profil')
}

export function changePassword(user){
    return putRequest(dataServ,'users/password',user)
}

export function disconnectUser(){
    const token = localStorage.getItem('refreshToken')
    const params = {token}
    return deleteRequest(dataServ,'users/logout',params)
}