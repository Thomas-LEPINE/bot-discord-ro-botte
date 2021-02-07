const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    // La fonction associée à la commande :
    const cookieRole = message.guild.roles.cache.get("800130082533802004"); // Id role 1
    const ihrmvRole = message.guild.roles.cache.get("808081626457833527"); // Id role 5A IHMRV
    const cybersecuRole = message.guild.roles.cache.get("808081752958435418"); // Id role 5A Cyber-secu
    const cyberphysiqueRole = message.guild.roles.cache.get("808081825032962059"); // Id role 5A Cyberphysique

    const emojiCookie = "🍪";
    const emojiIhmrv =  message.guild.emojis.cache.get("808083967672188998"); // Emoji propre au serveur
    const emojiCybersecurity = message.guild.emojis.cache.get("808084011502534667"); // Emoji propre au serveur
    const emojiCyberPhysique = message.guild.emojis.cache.get("808084047870820392"); // Emoji propre au serveur

    const embed = new MessageEmbed()
        .setTitle("Rôles")
        .setDescription("Cliquez sur l'emoji du rôle associé")
        .setColor("#015896")
        .addField(
            "Les rôles disponnibles :",
            `
            ${emojiCookie}  -  ${cookieRole.toString()}
            ${emojiIhmrv}  -  ${ihrmvRole.toString()}
            ${emojiCybersecurity}  -  ${cybersecuRole.toString()}
            ${emojiCyberPhysique}  -  ${cyberphysiqueRole.toString()}
            `
        )
    ;

    client.channels.cache.get('800126481875468302').send(embed).then(async msg => {
        await msg.react(emojiCookie);
        await msg.react(emojiIhmrv);
        await msg.react(emojiCybersecurity);
        await msg.react(emojiCyberPhysique);
    });
};

module.exports.help = { // Toutes les informations de la commande
    name: 'roles', // nom de la commande
    aliases: ['roles', 'role', 'allrole'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie un message avec des réactions pour qu\'une personne puisse s\'attribuer un rôle', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'administration', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: true, // Si la commande nécessite des droits particulier
    permissionRequiered: 'MANAGE_ROLES',
};