module.exports.run = (client, message, args) => {
    // La fonction associée à la commande :
    message.channel.send('Fonctionnalité en cours d\'implémentation');
};

module.exports.help = { // Toutes les informations de la commande
    name: 'trad', // nom de la commande
    aliases: ['trad'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie la traduction', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: 'langue de traduction, text', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'classic', // Categorie de la commande (le nom du repertoire dans notre cas)
};
//https://translation.googleapis.com
