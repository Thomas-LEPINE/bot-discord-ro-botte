module.exports.run = async (client, message, args) => {
    var first = true;
    client.guilds.cache.get(message.guild.id).channels.cache.forEach(ch => { // lecture des message
        if (ch.type === 'text'){ // de type text
            ch.messages.fetch({
                limit: 100 //limite des 100 derniers messages du bot
            }).then(messages => {
                const msgs = messages.filter(m => m.author.id === '779099054084194415') //messages envoyés par le bot
                msgs.forEach(m => { //parcourir tous les messages
                    if(m.content.includes(message.author.id) && first) //dès le premier message trouver on arrête de chercher
                    {
                        first = false;
                        message.channel.send(`Participants de la réunion:\n`);
                        var team = 0;
                        m.reactions.cache.map(async (reaction) => { //collecter les réactions
                            let usersThatReacted = []; //liste des utilisateurs ayant réagi
                            let reactedUsers = await reaction.users.fetch(); 
                            reactedUsers.map((user) => {
                                if(!user.bot){ // tous les utilisateurs sauf le bot
                                    usersThatReacted.push(`${user.username}`); //ajout de l'utilisateur
                                }
                            });
                            await message.channel.send(`${team+"️⃣"} : ${usersThatReacted.join(' / ')}`); //affichage dans le chat
                            team += 1;
                            return;
                        });
                        return;
                    }
                })
            })
        } else {
            return;
        }
    })
    return;
};

module.exports.help = { // Toutes les informations de la commande
    name: 'participants', // nom de la commande
    aliases: ['participants', 'partgroup', 'participant'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Affiche les participants de la réunion', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    category: 'enseignement', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};