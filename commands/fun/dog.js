const fetch = require("node-fetch"); // API
const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) => {
    // La fonction associée à la commande :
    const dog = await fetch("https://dog.ceo/api/breeds/image/random")
        .then(res => res.json()) // On récupère un Json
        .then(json => json.message)
    ;
    const embed = new MessageEmbed()
        .setImage(dog)
        .setColor("#F9E4B7")
        .setFooter("API : https://dog.ceo/api/breeds/image/random")
    ;

    message.channel.send(embed)
};

module.exports.help = {
    name: 'dog', // nom de la commande
    aliases: ['dog', 'dogs', 'chient', 'chients', 'bark', 'barkbark', 'grosdog'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie une image de chien (bark bark)', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'fun', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};