const fetch = require("node-fetch"); // API
const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) => {
    // La fonction associée à la commande :
    const memegimme = await fetch("https://meme-api.herokuapp.com/gimme").then(res => res.json()); // On récupère un Json

    const embed = new MessageEmbed()
        .setTitle(memegimme.title)
        .setImage(memegimme.url)
        .setColor("#568f11")
        .setFooter(`By : ${memegimme.author}`)
    ;

    message.channel.send(embed)
};

module.exports.help = {
    name: 'meme', // nom de la commande
    aliases: ['meme', 'gimme', 'memegimme'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie une meme d\'une API github collaborative', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'fun', // Categorie de la commande (le nom du repertoire dans notre cas)
};