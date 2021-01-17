module.exports.run = async (client, message, args) => {
    // La fonction associée à la commande :
    const user = message.mentions.users.first(); // Récupère l'user mentionné
    const reason = args.splice(1).join(" ") || 'Aucune raison n\'a été donné' /* Message par défaut */; // Récupère la raison qui a été donné (si donné)

    if(user != undefined) { //L'utilisateur existe
        if (message.guild.member(user).hasPermission('ADMINISTRATOR')) {
            return message.channel.send('L\'utilisateur ne peux pas être banni');
        } else {
            // message.channel.send('Bien essayé, mais la commande a été mise en commentaire, bien trop dangereuse entre de mauvaises mains ...');
            await message.guild.member(user).ban({reason: reason}).catch(console.error);
            return message.channel.send(`L'utilisateur \`${user.username}\` est ban (ID : ${user.id})`);
        }        
    } else {
        return message.channel.send('L\'utilisateur n\'est pas présent dans ce serveur ou n\'a pas correctement mentionné');
    }
};

module.exports.help = { // Toutes les informations de la commande
    name: 'ban', // nom de la commande
    aliases: ['ban', 'exclusion', 'hardcancel'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Ban un utilisateur', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '@Utilisateur + la raison (facultatif)', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'administration', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: true, // Si la commande nécessite des droits particulier
    permissionRequiered: 'BAN_MEMBERS', //Permission minimimum demandé si besoin
};