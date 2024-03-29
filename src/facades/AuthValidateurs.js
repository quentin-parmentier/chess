export function checkPseudo(pseudo,errors){
    errors.pseudo = null
    if(pseudo.length >= 4 && pseudo.length <= 20) return true
    errors.pseudo = "Entre 4 et 20 caractères"
}

export function checkMdp(mdp,errors){
    errors.mdp = null
    if(mdp.length >= 6 && mdp.length <= 20) return true
    errors.mdp = "Entre 6 et 20 caratères"
    return errors
}

export function checkEmail(email,errors){
    errors.email = null
    const regexEmail = /^\S+@\S+\.\S+$/
    if(email.length < 50 && regexEmail.test(email)) return true
    errors.email = "Format e-mail incorrect"
}

export function checkIdentique(pswNew,pswConfirm,errors){
    errors.pswNew = null
    errors.pswConfirm = null
    if(pswNew.length < 6 || pswNew.length > 20){
        errors.pswNew = "Entre 6 et 20 caratères"
        return false
    }
    if(pswNew == pswConfirm) return true
    if(pswConfirm != "") errors.pswConfirm = "Non identique"
}