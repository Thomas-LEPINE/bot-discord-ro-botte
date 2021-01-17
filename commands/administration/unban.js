module.exports.run = async (client, message, args) => {
    // La fonction associée à la commande :
    let user = await client.users.fetch(argrs[0]);
    if(!user) {
        return message.reply("L'utilisateur n'existe pas ou n'est pas ban de ce serveur.");
    } else {
        message.guild.members.unban(user); // Unban l'user mentionné
        return message.channel.send(`${user} est unban !`);
    }
};

module.exports.help = { // Toutes les informations de la commande
    name: 'unban', // nom de la commande
    aliases: ['unban', 'deban'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Unban un utilisateur', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: 'ID de l\'utilisteur à unban', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'administration', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: true, // Si la commande nécessite des droits particulier
    permissionRequiered: 'BAN_MEMBERS', //Permission minimimum demandé si besoin
};