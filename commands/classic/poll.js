const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    // La fonction associée à la commande :
    const embed = new MessageEmbed()
        .setTitle(":loudspeaker:  SONDAGE")
        // .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setColor("#E8927C")
        .setTimestamp()
    ;
    if (Object.keys(args).length > 0) { // Si la commande a des arguments
        const question = args.join(" "); // Récupère la question qui a été posé
        embed.addField(`Auteur : ${message.author.username}`, `-`);
        embed.addField("Question  :speech_balloon: :  ", question);
    }
    embed.addField(
        "Répondre à l'aide de l'une des reactions suivantes : ",
        `
        ✅ - POUR / OUI
        🤔 - NEUTRE / NE SE PRONONCE PAS
        ❌ - CONTRE / NON
        `
    );
    
    const poll_message = await message.channel.send(embed);
    await poll_message.react("✅");
    await poll_message.react("🤔");
    await poll_message.react("❌");
};

module.exports.help = { // Toutes les informations de la commande
    name: 'poll', // nom de la commande
    aliases: ['poll', 'sondage'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Réalise un sondage de qualité (oui / neutre / non)', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'classic', // Categorie de la commande (le nom du repertoire dans notre cas)
};