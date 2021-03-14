const axios = require('axios');

export default class Ouverture {
    constructor({_id,name,commentaire,img,variantes} = {},color){
        this.id = _id;
        this.color = color;
        this.name = name;
        this.commentaire = commentaire;
        this.img = img;
        this.variantes = variantes;
    }

    update(serv){

        const token = localStorage.getItem('token')
        const promise = axios.put(`${serv}/ouvertures`,
        {
            data: {
                color: this.color,
                name:this.name,
                commentaire:this.commentaire,
                img:this.img,
                idOuverture:this.id
            },
        },
        {headers: {'Authorization': 'Bearer ' + token}})
        
        return promise;
    }

    //Call API : Ajouter une ouverture
    add(serv){

        const token = localStorage.getItem('token')

        const promise = axios.post(`${serv}/ouvertures`,
        {
            data: {
                color: this.color,
                name:this.name,
                commentaire:this.commentaire,
                img:this.img
            },
        },
        {headers: {'Authorization': 'Bearer ' + token}})
        
        return promise
    }

    delete(serv){
        const token = localStorage.getItem('token')
        const promise = axios.delete(`${serv}/ouvertures`,
        {
          headers: {'Authorization': 'Bearer ' + token},
          data: {
            color: this.color,
            idOuverture: this.id
          }
        })

        return promise;

    }
}