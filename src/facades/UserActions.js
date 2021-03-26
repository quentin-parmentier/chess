import {postRequest, getRequest, putRequest, deleteRequest} from './AxiosMethodes'
import {authServ, dataServ} from '../constantes/server.json'

export function connectUser(pseudo, password){
    const params = {pseudo,password}
    return postRequest(authServ,'login',params)
    .then((tokens) => {
        //On init le token
        localStorage.setItem('token',tokens.accessToken);
        localStorage.setItem('refreshToken',tokens.refreshToken);

        //On set un timer qui va refresh le token
        refreshUserToken(tokens.expiresIn)
        return tokens
    })
}

function refreshUserToken(expiresIn){

    setTimeout(function(){ 
        const refreshToken = localStorage.getItem('refreshToken');
        const params = {token : refreshToken}
        postRequest(authServ,'refresh',params)
        .then((response) => {
            if(!response.accessToken) return localStorage.removeItem('token')
            localStorage.setItem('token',response.accessToken);
            refreshUserToken(response.expiresIn)
        })
        .catch(() => {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
        })
    }, (expiresIn - 60) * 1000);

}

export function createUser(pseudo, mail, password){
    const params = {pseudo,mail,password}
    return postRequest(authServ,'signup',params)
}

export async function getUser(){
    return await getRequest(dataServ, 'users')
    .then((user) => {
        user.ouvertures = user.ouvertures ?? {white:{},black:{}}
        user.finales = user.finales ?? ({pion:{},tour:{},dame:{}})
        refreshUserToken(0)
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