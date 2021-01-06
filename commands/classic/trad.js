const request = require('request');
const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
    message.channel.send('VAS BIEN TE FAIRE ENCULER CA MARCHE PAS CETTE MERDE, C\'EST GRATUIT MAIS OBLIGÉ DE METTRE UNE CARTE BANCAIRE');
};

module.exports.help = { // Toutes les informations de la commande
    name: 'trad', // nom de la commande
    aliases: ['trad'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie la traduction', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: 'langue de traduction, text', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'classic', // Categorie de la commande (le nom du repertoire dans notre cas)
};