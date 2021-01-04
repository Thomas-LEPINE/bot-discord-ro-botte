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
        // .setThumbnail(client.user.displayAvatarURL())
        .setImage("../../assets/images/eight-ball.png")
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