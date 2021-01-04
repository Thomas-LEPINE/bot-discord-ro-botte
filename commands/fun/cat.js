const fetch = require("node-fetch"); // API
const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) => {
    // La fonction associée à la commande :
    const cat = await fetch("http://aws.random.cat/meow")
        .then(res => res.json()) // On récupère un Json
        .then(json => json.file)
    ;
    const embed = new MessageEmbed()
        .setImage(cat)
        .setColor("#666666")
        .setFooter("API : http://aws.random.cat/meow")
    ;

    message.channel.send(embed)
};

module.exports.help = {
    name: 'cat', // nom de la commande
    aliases: ['cat', 'cats', 'chat', 'chats'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie un chat (miaou)', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'fun', // Categorie de la commande (le nom du repertoire dans notre cas)
};