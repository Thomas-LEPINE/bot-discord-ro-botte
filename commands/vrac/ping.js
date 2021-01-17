module.exports.run = (client, message, args) => {
    // La fonction associée à la commande :
    message.channel.send('Pong !');
};

module.exports.help = { // Toutes les informations de la commande
    name: 'ping', // nom de la commande
    aliases: ['ping'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie \"Pong !\"', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'classic', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};