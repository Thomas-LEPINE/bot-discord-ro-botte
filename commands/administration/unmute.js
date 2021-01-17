module.exports.run = (client, message, args) => {
    // La fonction associée à la commande :
    let user = message.mentions.users.first(); // Récupère l'user mentionné
    var muteRole = message.guild.roles.cache.find(role => role.name === 'muted'); // Récupération du rôle lié au mute

    if(user != undefined) { //L'utilisateur existe
        user = message.guild.member(user);
        if (!user.roles.cache.has(muteRole.id)) {
            return message.channel.send('L\'utilisateur n\'est pas muté');
        } else {
            user.roles.remove(muteRole.id);
            message.channel.send(`<@${user.id}> n\'est plus muté.`);
        }
    } else {
        return message.channel.send('L\'utilisateur n\'est pas présent dans ce serveur ou n\'a pas correctement mentionné');
    }
};

module.exports.help = { // Toutes les informations de la commande
    name: 'unmute', // nom de la commande
    aliases: ['unmute', 'reparle'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Unmute un utilisateur', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '@Utilisateur', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'administration', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: true, // Si la commande nécessite des droits particulier
    permissionRequiered: 'MUTE_MEMBERS', //Permission minimimum demandé si besoin
};