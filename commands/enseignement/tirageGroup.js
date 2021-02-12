module.exports.run = (client, message, args) => {
    var find = false;
    client.guilds.cache.get(message.guild.id).channels.cache.forEach(ch => { // lecture des message
        if (ch.type === 'text'){ // de type text
            ch.messages.fetch({
                limit: 100 //verficiation des 100 derniers message du bot (max autorisé)
            }).then(messages => {
                const msgs = messages.filter(m => m.author.id === '779099054084194415') //messages envoyés par le bot
                msgs.forEach(m => {
                    if(m.content.includes(message.author.id) && !find && m.content.includes(`S\'inscrire à l\'un des groupes à l'aide des réactions`)) //formattage du message
                    {
                        find = true;
                        var nb_teams = 0; //nombre d'équipe dans la réunion
                        var in_nb = false; //curseur en lecture
                        for(var i in m.content) //lecture du message
                        {
                            if(m.content[i] == "_") //borne début/fin du nombre (souligné)
                            {
                                if(in_nb)
                                {
                                    break;
                                }
                                in_nb = true;
                            }
                            else if(in_nb)
                            {
                                nb_teams += m.content[i]; //comptage du nb de participants
                            }
                        }
                        nb_teams = parseInt(nb_teams);
                        if(args[0] == 'group' && nb_teams>0)
                        {
                            let randomteam = Math.floor(Math.random()*(nb_teams));
                            return message.channel.send(`Personne tirée au sort: Équipe ${randomteam+"️⃣"}`); //Shows the randomly selected user that reacted. If you want to show all users, simply exchange: ${usersThatReacted[randomuser]} with ${users} !!
                        }
                        else if(args[0] == 'group' && nb_teams < 2)
                        {
                            return message.channel.send(`Vous n'êtes pas/plus chef de groupe (*!help group*)`);
                        }
                        console.log(find)
                        var team = 0;
                        var participants = []; //liste de tous les participants
                        m.reactions.cache.map(async (reaction) => { //collecter les réactions
                            let reactedUsers = await reaction.users.fetch();
                            reactedUsers.map((user) => {
                                if(user.id != '779099054084194415'){ // tous les utilisateurs sauf le bot
                                    
                                    participants.push(`**${user.username}**`);
                                }
                            });
                            let randomparticipant = Math.floor(Math.random()*participants.length); //nombre aléatoire pour le tirage
                            
                            if(team == nb_teams - 1 && participants.length > 0)
                            {
                                return message.channel.send(`Personne tirée au sort: @${participants[randomparticipant]}`); //Affichage (msg chat)
                            }
                            else if (team == nb_teams - 1 && participants.length == 0) // pas de msg trouvé = plus de groupe
                            {
                                return message.channel.send(`Vous n'êtes pas/plus chef de groupe (*!help group*)`)
                            }
                            team += 1;
                        });
                        return ;
                    }
                })
            })
        } else {
            return;
        }
    })
    return ;
};

module.exports.help = { // Toutes les informations de la commande
    name: 'tirage', // nom de la commande
    aliases: ['draw','tirage', 'tiragegroup'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Tire aléatoire un membre de la réunion', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'enseignement', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};