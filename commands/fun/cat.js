const superagent = require("superagent");
const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    // La fonction associée à la commande :
    message.channel.send('Miaou                Enculer');
};

module.exports.help = {
    name: 'cat', // nom de la commande
    aliases: ['cat', 'cats'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie un chat (burk burk)', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'fun', // Categorie de la commande (le nom du repertoire dans notre cas)
};