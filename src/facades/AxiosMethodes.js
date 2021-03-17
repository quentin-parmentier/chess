const axios = require('axios');

export function getRequest(serv, ressource){
    const token = localStorage.getItem('token')
    return axios.get(`${serv}/${ressource}`,
    {headers: {'Authorization': 'Bearer ' + token}})
    .then((response) =>  response = response.data)
    .catch((err) => {
        throw err.response.data.message
    })
}

export function postRequest(serv, ressource, params = {}){

    const token = localStorage.getItem('token')

    return axios.post(`${serv}/${ressource}`,
    {
        data: params,
    },
    {headers: {'Authorization': 'Bearer ' + token}})
    .then((response) => response = response.data)
    .catch((err) => {
        throw err.response.data.message
    })
    
}

export function putRequest(serv, ressource, params = {}){

    const token = localStorage.getItem('token')

    return axios.put(`${serv}/${ressource}`,
    {
        data: params
    },
    {headers: {'Authorization': 'Bearer ' + token}})
    .then((response) => response = response.data)
    .catch((err) => {
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
    .then((response) => response = response.data)
    .catch((err) => {
        throw err.response.data.message
    })
}