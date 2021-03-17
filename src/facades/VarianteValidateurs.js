export function checkName(name,errors){
    errors.name = null
    if(name) return true
    errors.name = "Un nom est requis"
}

export function checkEmbed(idEmbed,errors){
    errors.idEmbed = null
    if(idEmbed) return true
    errors.idEmbed = "Un id Embed est requis"
}