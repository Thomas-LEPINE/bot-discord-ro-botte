module.exports.run = (client, message, args) => {
    // La fonction associée à la commande :
    const user = message.mentions.users.first();
    return user ? message.channel.send(`Voici le tag de la personne mentionnée : ${user.tag}`) : message.channel.send(`L'utilisateur ne semble pas exister sur ce serveur`)
};

module.exports.help = { // Toutes les informations de la commande
    name: 'userinfo',
    descritpion: 'Récupère les infos d\'un utilisateur mentionné (tag) -> permet de le retrouver sur Discord malgré le pseudo sur un seveur',
    aliases: ['userinfo', 'infouser', 'user'], // Tous les mots clés permettant d'executer la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '@Username', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'classic', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};