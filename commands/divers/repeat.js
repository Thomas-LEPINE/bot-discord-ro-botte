module.exports.run = (client, message, args) => {
    // La fonction associée à la commande :
    message.channel.send(args.join(" "));
};

module.exports.help = { // Toutes les informations de la commande
    name: 'repeat', // nom de la commande
    aliases: ['repeat', 'say', 'dit'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Répète le message de l\'utilisateur', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: 'mot1 mot2 ...', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'divers', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};