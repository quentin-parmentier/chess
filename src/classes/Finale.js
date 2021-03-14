const axios = require('axios');

export default class Finale {
    constructor({_id,name,commentaire,id,origine} = {},color,piece){
        this.id = _id;
        this.color=color
        this.piece=piece
        this.name=name
        this.commentaire=commentaire
        this.idEmbed=id
        this.origine= origine
    }

    update(serv){

        const token = localStorage.getItem('token')
        const promise = axios.put(`${serv}/finales`,
        {
            data: {
                piece:this.piece,
                name:this.name,
                commentaire:this.commentaire,
                idEmbed:this.idEmbed,
                origine:this.origine,
                idFinale:this.id
            },
        },
        {headers: {'Authorization': 'Bearer ' + token}})
        
        return promise;
    }

    //Call API : Ajouter une ouverture
    add(serv){

        const token = localStorage.getItem('token')
        const promise = axios.post(`${serv}/finales`,
        {
            data: {
                piece:this.piece,
                name:this.name,
                commentaire:this.commentaire,
                idEmbed:this.idEmbed,
                origine:this.origine
            },
        },
        {headers: {'Authorization': 'Bearer ' + token}})
        
        return promise
    }

    delete(serv){
        const token = localStorage.getItem('token')
        const promise = axios.delete(`${serv}/finales`,
        {
          headers: {'Authorization': 'Bearer ' + token},
          data: {
            piece: this.piece,
            idFinale: this.id
          }
        }
      )

        return promise;

    }
}