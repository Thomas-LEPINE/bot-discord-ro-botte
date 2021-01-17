module.exports.run = (client, message, args) => { // La fonction associée à la commande
    message.reply(`https://discord.js.org/#/docs/main/stable/general/welcome`);
};

module.exports.help = { // Toutes les informations de la commande
    name: "rtfm",
    descritpion: "Retourne le lien de la documentation de Discord.js",
    aliases: ['rtfm', 'discordjs', 'doc'],
    usage: '',
    args: false, // Nécessite des arguments
    category: 'classic', // Categorie de la commande (le nom du repertoire dans notre cas)
};