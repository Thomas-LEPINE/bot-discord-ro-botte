module.exports.run = async (client, message, args) => {
    var first = true;
    client.guilds.cache.get(message.guild.id).channels.cache.forEach(ch => {
        if (ch.type === 'text'){
            ch.messages.fetch({
                limit: 100
            }).then(messages => {
                const msgs = messages.filter(m => m.author.id === '779099054084194415') //messages envoyés par le bot
                msgs.forEach(m => {
                    if(m.content.includes(message.author.id) && first)
                    {
                        first = false;
                        message.channel.send(`Participants de la réunion:\n`);
                        var team = 0;
                        m.reactions.cache.map(async (reaction) => { //Maps out every reaction made on the collected message
                            let usersThatReacted = []; //Initiates usersThatReacted as an array
                            let reactedUsers = await reaction.users.fetch(); // Fetches the users that reacted with the ✅ on the collected message
                            reactedUsers.map((user) => { // Maps out every user that reacted with ✅
                                if(!user.bot){ // if it's not the bot
                                    usersThatReacted.push(`${user.username}`); //Pushes each user into the array with formatting ** (bold text) username#discriminator
                                }
                            });
                            await message.channel.send(`${team+"️⃣"} : ${usersThatReacted.join(' / ')}`); //Shows the randomly selected user that reacted. If you want to show all users, simply exchange: ${usersThatReacted[randomuser]} with ${users} !!
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