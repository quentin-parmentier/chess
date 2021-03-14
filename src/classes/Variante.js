const axios = require('axios');

export default class Variante {
    constructor({_id,name,commentaire,id,origine} = {},color,idOuverture){
        this.id = _id;
        this.color=color
        this.idOuverture=idOuverture
        this.name=name
        this.commentaire=commentaire
        this.idEmbed=id
        this.origine= origine
    }

    update(serv){
        console.log(this.origine)
        const token = localStorage.getItem('token')
        const promise = axios.put(`${serv}/variantes`,
        {
            data: {
                color: this.color,
                name:this.name,
                commentaire:this.commentaire,
                idEmbed:this.idEmbed,
                idOuverture:this.idOuverture,
                idVariante: this.id,
                origine:this.origine
            },
        },
        {headers: {'Authorization': 'Bearer ' + token}})
        
        return promise;
    }

    //Call API : Ajouter une ouverture
    add(serv){

        const token = localStorage.getItem('token')
        const promise = axios.post(`${serv}/variantes`,
        {
            data: {
                color: this.color,
                name:this.name,
                commentaire:this.commentaire,
                idEmbed:this.idEmbed,
                idOuverture:this.idOuverture,
                origine:this.origine
            },
        },
        {headers: {'Authorization': 'Bearer ' + token}})
        
        return promise
    }

    delete(serv){
        const token = localStorage.getItem('token')
        const promise = axios.delete(`${serv}/variantes`,
        {
          headers: {'Authorization': 'Bearer ' + token},
          data: {
            color: this.color,
            idOuverture: this.idOuverture,
            idVariante: this.id
          }
        }
      )

        return promise;

    }
}