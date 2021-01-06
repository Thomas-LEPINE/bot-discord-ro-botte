const request = require('request');
const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
    // La fonction associée à la commande :
    message.channel.send('Fonctionnalité en cours d\'implémentation');
    request('https://translation.googleapis.com' +  args[0] "&tl=" + args[1] + "&dt=t&q=" + args[2], function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        
        var json = {
          'sourceText' : sourceText,
          'translatedText' : translatedText
        };
    });
};

module.exports.help = { // Toutes les informations de la commande
    name: 'trad', // nom de la commande
    aliases: ['trad'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie la traduction', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: 'langue de traduction, text', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'classic', // Categorie de la commande (le nom du repertoire dans notre cas)
};