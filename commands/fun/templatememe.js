const fetch = require("node-fetch"); // API
const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) => {
    // La fonction associée à la commande :
    const templatememe = await fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json()) // On récupère un Json
    .then(json => json.data.memes)
    ;

    const imgData = templatememe[Math.floor(Math.random() * Object.keys(templatememe).length)];
    const embed = new MessageEmbed()
        .setTitle(imgData.name)
        .setImage(imgData.url)
        .setColor("#8f5612")
        .setFooter("API : https://imgflip.com/api")
    ;

    message.channel.send(embed)
};

module.exports.help = {
    name: 'template', // nom de la commande
    aliases: ['templatememe', 'template', 'tmeme', 'tempmeme'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie un template d\'un mème de manière aléatoire', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'fun', // Categorie de la commande (le nom du repertoire dans notre cas)
};