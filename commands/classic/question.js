const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    // La fonction associée à la commande :

    const emojiYes = "✅";
    const emojiNeutre = "❔";
    const emojiNo = "❌";

    await message.react(emojiYes);
    await message.react(emojiNeutre);
    await message.react(emojiNo);
    return;
};

module.exports.help = { // Toutes les informations de la commande
    name: 'question', // nom de la commande
    aliases: ['question', 'yesno', 'q', 'yn', 'ny'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Ajoute des réactions de vote sur votre message', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'classic', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};