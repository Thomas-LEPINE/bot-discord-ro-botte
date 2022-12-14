module.exports.run = (client, message, args) => {
    // La fonction associée à la commande :
    const user = message.mentions.users.first(); // Récupère l'user mentionné
    const reason = args.splice(1).join(" ") || 'Aucun message n\'a été donné' /* Message par défaut */; // Récupère la raison qui a été donné (si donné)

    if(user != undefined) { //L'utilisateur existe
        if (message.guild.member(user).hasPermission('ADMINISTRATOR')) {
            message.channel.send('L\'utilisateur ne peux pas être exclu');
        } else {
            if(user.id === "299934484327825408") {
                // Easter-egg, le bot ne pourra jamais me kick (signé Thomas Lépine)
                return message.channel.send(`Je ne peux pas kick mon créateur ... Gloire à mon créateur <@${user.id}> ✊`);
            }

            // return message.channel.send('Bien essayé, mais la commande a été mise en commentaire, bien trop dangereuse entre de mauvaises mains ...');
            return message.guild.member(user).kick(reason);
        }        
    } else {
        message.channel.send('L\'utilisateur n\'est pas présent dans ce serveur ou n\'a pas correctement mentionné');
    }
};

module.exports.help = { // Toutes les informations de la commande
    name: 'kick', // nom de la commande
    aliases: ['kick', 'degage', 'cancel'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Kick un utilisateur', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '@Utilisateur + la raison (facultatif)', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'administration', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: true, // Si la commande nécessite des droits particulier
    permissionRequiered: 'BAN_MEMBERS', //Permission minimimum demandé si besoin
};