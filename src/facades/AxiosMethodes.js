const axios = require('axios');
import {showSuccess, showError} from './Toast'

export function getRequest(serv, ressource){
    const token = localStorage.getItem('token')
    return axios.get(`${serv}/${ressource}`,
    {headers: {'Authorization': 'Bearer ' + token}})
    .then((response) => {
        response = response.data
        if(response.message) showSuccess(response.message)
        return response
    })
    .catch((err) => {
        showError(err.response.data.message)
        throw err.response.data.champs
    })
}

export function postRequest(serv, ressource, params = {}){

    const token = localStorage.getItem('token')
    return axios.post(`${serv}/${ressource}`,
    {
        data: params,
    },
    {headers: {'Authorization': 'Bearer ' + token}})
    .then((response) => {
        response = response.data
        if(response.message) showSuccess(response.message)
        return response
    })
    .catch((err) => {
        showError(err.response.data.message)
        throw err.response.data.champs
    })
}

export function putRequest(serv, ressource, params = {}){

    const token = localStorage.getItem('token')

    return axios.put(`${serv}/${ressource}`,
    {
        data: params
    },
    {headers: {'Authorization': 'Bearer ' + token}})
    .then((response) => {
        response = response.data
        if(response.message) showSuccess(response.message)
        return response
    })
    .catch((err) => {
        showError(err.response.data.message)
        throw err.response.data.message
    })
}

export function deleteRequest(serv, ressource, params = {}){

    const token = localStorage.getItem('token')

    return axios.delete(`${serv}/${ressource}`,
    {
        headers: {'Authorization': 'Bearer ' + token},
        data: params
    })
    .then((response) => {
        response = response.data
        if(response.message) showSuccess(response.message)
        return response
    })
    .catch((err) => {
        showError(err.response.data.message)
        throw err.response.data.message
    })
}