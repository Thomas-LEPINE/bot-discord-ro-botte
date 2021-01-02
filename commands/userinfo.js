module.exports.run = (client, message, args) => {
    // La fonction associée à la commande :
    const user_mention = message.mentions.users.first();
    message.channel.send(`Voici le tag de la personne mentionnée : ${user_mention.tag}`)
};

module.exports.help = { // Toutes les informations de la commande
    name: 'userinfo',
    descritpion: 'Récupère les infos d\'un utilisateur mentionné (tag) -> permet de le retrouver sur Discord malgré le pseudo sur un seveur',
    aliases: ['userinfo', 'infouser', 'infoof'], // Tous les mots clés permettant d'executer la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '@Mention de la personne', // Message d'usage de la commande (indication quand des arguments sont attendus)
};