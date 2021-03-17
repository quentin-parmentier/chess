import {dataServ} from '../constantes/server.json'
import {postRequest, putRequest, deleteRequest} from '../facades/AxiosMethodes'
export default class Ouverture {
    constructor({_id,name,commentaire,img,variantes} = {},color){
        this.id = _id;
        this.color = color;
        this.name = name;
        this.commentaire = commentaire;
        this.img = img;
        this.variantes = variantes;
    }

    update(){

        const params = {
            color: this.color,
            name:this.name,
            commentaire:this.commentaire,
            img:this.img,
            idOuverture:this.id
        }

        return putRequest(dataServ,'ouvertures',params)
    }

    //Call API : Ajouter une ouverture
    add(){
        const params = {
            color:this.color,
            name:this.name,
            commentaire:this.commentaire,
            img:this.img
        }

        return postRequest(dataServ,'ouvertures',params)

    }

    delete(){
        const params = {
            color: this.color,
            idOuverture: this.id
        }
        
        return deleteRequest(dataServ,'ouvertures',params)
    }
}