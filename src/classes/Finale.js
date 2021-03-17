import {dataServ} from '../constantes/server.json'
import {postRequest, putRequest, deleteRequest} from '../facades/AxiosMethodes'
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

    update(){

        const params = {
            piece:this.piece,
            name:this.name,
            commentaire:this.commentaire,
            idEmbed:this.idEmbed,
            origine:this.origine,
            idFinale:this.id
        }
        return putRequest(dataServ,'finales',params)
    }

    //Call API : Ajouter une ouverture
    add(){

        const params = {
            piece:this.piece,
            name:this.name,
            commentaire:this.commentaire,
            idEmbed:this.idEmbed,
            origine:this.origine
        }
        return postRequest(dataServ,'finales',params)
    }

    delete(){

        const params = {
            piece: this.piece,
            idFinale: this.id
        }
        return deleteRequest(dataServ,'finales',params)

    }
}