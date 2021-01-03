const superagent = require("superagent");
const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    // API : //https://random.dog/woof.json
    let {body} = await superagent.get(`https://random.dog/woof.json`);
    let dogEmbed = new Discord.RichEmbed()
        .setColor("#E8927C")
        .setTitle("Dog")
        .setImage(body.url);
        message.reply(dogEmbed);
        message.channel.send(embed);
};

module.exports.help = {
    name: 'dog', // nom de la commande
    aliases: ['dog', 'dogs'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie un chien (bark bark)', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'fun', // Categorie de la commande (le nom du repertoire dans notre cas)
};