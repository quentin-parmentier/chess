import {dataServ} from '../constantes/server.json'
import {postRequest, putRequest, deleteRequest} from '../facades/AxiosMethodes'
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

    update(){
        const params = {
            color: this.color,
            name:this.name,
            commentaire:this.commentaire,
            idEmbed:this.idEmbed,
            idOuverture:this.idOuverture,
            idVariante: this.id,
            origine:this.origine
        }
        
        return putRequest(dataServ,'variantes',params)
    }

    //Call API : Ajouter une ouverture
    add(){
        const params = {
            color: this.color,
            name:this.name,
            commentaire:this.commentaire,
            idEmbed:this.idEmbed,
            idOuverture:this.idOuverture,
            origine:this.origine
        }

        return postRequest(dataServ,'variantes',params)
    }

    delete(){
        const params = {
            color: this.color,
            idOuverture: this.idOuverture,
            idVariante: this.id
        }

        return deleteRequest(dataServ,'variantes',params)

    }
}