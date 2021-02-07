const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    // La fonction associée à la commande :
    const cookierRole = message.guild.roles.cache.get("800130082533802004"); // Id role 1
    const okManRole = message.guild.roles.cache.get("800130131258638376"); // Id role 2
    const eightballisteRole = message.guild.roles.cache.get("800131600850485268"); // Id role 3

    const emojiCookie = "🍪";
    const emojieOkMan = "👌";
    const emojieEightball = message.guild.emojis.cache.get("800131531221106709"); // Emoji propre au serveur

    const embed = new MessageEmbed()
        .setTitle("Rôles")
        .setDescription("Cliquez sur l'emoji du rôle associé")
        .setColor("#015896")
        .addField(
            "Les rôles disponnibles :",
            `
            ${emojiCookie}  -  ${cookierRole.toString()}
            ${emojieOkMan}  -  ${okManRole.toString()}
            ${emojieEightball}  -  ${eightballisteRole.toString()}
            `
        )
    ;

    client.channels.cache.get('800126481875468302').send(embed).then(async msg => {
        await msg.react(emojiCookie);
        await msg.react(emojieOkMan);
        await msg.react(emojieEightball);
    });
};

module.exports.help = { // Toutes les informations de la commande
    name: 'roles', // nom de la commande
    aliases: ['roles', 'role', 'allrole'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie un message avec des réactions', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'administration', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: true, // Si la commande nécessite des droits particulier
    permissionRequiered: 'MANAGE_ROLES',
};