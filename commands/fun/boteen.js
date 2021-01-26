module.exports.run = (client, message, args) => {
    message.channel.send("bot-teen pour les collèges, botine, ta compris?\n\n\n\n\nPS : Lucas est un gros chien");

};

module.exports.help = { // Toutes les informations de la commande
    name: 'bot-teen', // nom de la commande
    aliases: ['bot-teen', 'botine'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'la vérité', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'fun', // Categorie de la commande (le nom du repertoire dans notre cas)
};