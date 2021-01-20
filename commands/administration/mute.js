const ms = require("ms");

module.exports.run = async (client, message, args) => {
    // La fonction associée à la commande :
    let user = message.mentions.users.first(); // Récupère l'user mentionné
    var muteRole = message.guild.roles.cache.find(role => role.name === 'muted'); // Récupération du rôle lié au mute
    const muteDuration = (args[1] || '120s'); // Récupère le temps de mute OU met par défaut 120s

    if(user != undefined) { //L'utilisateur existe
        user = message.guild.member(user);
        if (message.guild.member(user).hasPermission('ADMINISTRATOR')) {
            return message.channel.send('L\'utilisateur ne peux pas être muté');
        } else {
            if(!muteRole) { // Si le rôle mute n'existe pas encore on le créé
                muteRole = await message.guild.roles.create({ // On créé le rôle avant de passer à la suite du programme
                    data: {
                        name: 'muted',
                        color: '#333',
                        permissions: []
                    }
                });
                message.guild.channels.cache.forEach(async (channel, id) => { // On modifie les permissions sur tous les salons du serveurs
                    await channel.updateOverwrite(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        CONNECT: false,
                        EMBED_LINKS: null,
                    }, "Muted");
                });
            }
            try {
                user.roles.add(muteRole.id);
                message.channel.send(`<@${user.id}> est muté pour ${ms(ms(muteDuration))}.`);
            } catch (error) { // Si le membre identifié n'est pas dans la liste des membres banni :
                // return message.channel.send('```bat' + error + '```');
                return;
            }            

            // Quand le temps de mute est fini :
            setTimeout(() => {
                user.roles.remove(muteRole.id);
            }, ms(muteDuration));
        }
    } else {
        return message.channel.send('L\'utilisateur n\'est pas présent dans ce serveur ou n\'a pas correctement été mentionné');
    }
};

module.exports.help = { // Toutes les informations de la commande
    name: 'mute', // nom de la commande
    aliases: ['mute', 'fairetaire', 'stopspeak'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Mute un utilisateur', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '@Utilisateur + temps (par défault : 2min)', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'administration', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: true, // Si la commande nécessite des droits particulier
    permissionRequiered: 'MUTE_MEMBERS', //Permission minimimum demandé si besoin
};