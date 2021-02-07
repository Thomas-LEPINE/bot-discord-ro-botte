const fetch = require("node-fetch"); // API
const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) => {
    // La fonction associée à la commande :
    const animeme = await fetch("https://www.reddit.com/user/emdix/m/animemes/top/.json?sort=top&t=day&limit=500")
    .then(res => res.json()) // On récupère un Json
    .then(json => json.data.children)
    ;

    const imgData = animeme[Math.floor(Math.random() * Object.keys(animeme).length)].data;
    const embed = new MessageEmbed()
        .setTitle(imgData.title)
        .setImage(imgData.url)
        .setColor("#AAD3E9")
        .setFooter("API : anime meme by Reddit")
    ;

    message.channel.send(embed)
};

module.exports.help = {
    name: 'animeme', // nom de la commande
    aliases: ['anime', 'animemes', 'animememes', 'animeme'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie une meme Reddit provenant d\'un animé', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'fun', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};