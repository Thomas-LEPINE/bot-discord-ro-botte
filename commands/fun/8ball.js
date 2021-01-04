const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
    // La fonction associée à la commande :
    const replies = [
        "Oui :white_check_mark:",
        "Non :x:", "Peut-être ...",
        "Ne poses plus jamais la question ...",
        "Bonne question !",
        "J'ai pas la réponse",
        "Sans doute !",
        "Oui !",
        ":no_entry: Stop !",
        "No way !"
    ];
    const question = args.join(" "); // Récupère la question qui a été posé
    const response = Math.floor(Math.random() * replies.length); // Nombre random
    const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setColor("#000")
        // .setThumbnail(client.user.displayAvatarURL()) // Avatar du bot
        // .setThumbnail('https://raw.githubusercontent.com/Thomas-LEPINE/bot-discord/main/assets/images/eight-ball.png?token=APJH2GYZNKDTDGXWALCURNS76NT6U') // Image bule num 8 avec fond rose saumon
        .setThumbnail('https://raw.githubusercontent.com/Thomas-LEPINE/bot-discord/main/assets/images/billiard.png?token=APJH2GYZV4IBTP4UG7DLCCK76NURA') // Image bule num 8 classique
        .addField(question, replies[response])
    ;
    return message.channel.send(embed);
};

module.exports.help = { // Toutes les informations de la commande
    name: '8ball', // nom de la commande
    aliases: ['8ball', 'eightball', '8'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Eight ball', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: 'La question existencielle que vous vous posez', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'fun', // Categorie de la commande (le nom du repertoire dans notre cas)
};