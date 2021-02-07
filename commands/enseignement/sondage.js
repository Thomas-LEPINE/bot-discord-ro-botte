const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    // La fonction associée à la commande :

    const emojiYes = "✅";
    const emojiNeutre = "🤔";
    const emojiNo = "❌";

    const embed = new MessageEmbed()
        .setTitle("SONDAGE  :loudspeaker:")
        // .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setColor("#E8927C")
        .setTimestamp()
    ;
    if (Object.keys(args).length > 0) { // Si la commande a des arguments
      const question = args.join(" "); // Récupère la question qui a été posé
      // embed.addField(`Auteur : ${message.author.username}`, `-`);
      embed.addField(`:speech_balloon:  ${question.toUpperCase()}`, "\u200B");
    }
    embed.addField(
        "Répondre à l'aide de l'une des reactions suivantes : ",
        `
        ${emojiYes} - POUR / OUI
        ${emojiNeutre} - NEUTRE / NE SE PRONONCE PAS
        ${emojiNo} - CONTRE / NON
        `
    );
    
    return message.channel.send(embed).then(async msg => {
        await message.delete(); // Supprime le message
        await msg.react(emojiYes);
        await msg.react(emojiNeutre);
        await msg.react(emojiNo);        
    });
};

module.exports.help = { // Toutes les informations de la commande
    name: 'sondage', // nom de la commande
    aliases: ['sondage', 'survey', 'poll'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Réalise un sondage de qualité (oui / neutre / non)', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'enseignement', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};