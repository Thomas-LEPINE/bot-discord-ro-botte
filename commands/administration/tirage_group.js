module.exports.run = (client, message, args) => {
    var find = false;
    client.guilds.cache.get(message.guild.id).channels.cache.forEach(ch => {
        if (ch.type === 'text'){
            ch.messages.fetch({
                limit: 100 //verficiation de 100 message (max autorisé)
            }).then(messages => {
                const msgs = messages.filter(m => m.author.id === '779099054084194415') //messages envoyés par le bot
                msgs.forEach(m => {
                    if(m.content.includes(message.author.id) && !find && m.content.includes(`S\'inscrire à l\'un des groupes à l'aide des réactions`))
                    {
                        find = true;
                        console.log(find)
                        var nb_teams = 0; //nombre d'équipe dans la réunion
                        var in_nb = false; //curseur en lecture
                        for(var i in m.content)
                        {
                            if(m.content[i] == "_") //borne début/fin du nombre
                            {
                                if(in_nb)
                                {
                                    break;
                                }
                                in_nb = true;
                            }
                            else if(in_nb)
                            {
                                nb_teams += m.content[i];
                            }
                        }
                        nb_teams = parseInt(nb_teams);
                        if(args[0] == 'group' && nb_teams>0)
                        {
                            let randomteam = Math.floor(Math.random()*(nb_teams));
                            console.log(nb_teams)
                            console.log(randomteam)
                            return message.channel.send(`Personne tirée au sort: Équipe ${randomteam+"️⃣"}`); //Shows the randomly selected user that reacted. If you want to show all users, simply exchange: ${usersThatReacted[randomuser]} with ${users} !!
                        }
                        else if(args[0] == 'group' && nb_teams < 2)
                        {
                            return message.channel.send(`Vous n'êtes pas/plus chef de groupe (*!help group*)`);
                        }
                        console.log(find)
                        var team = 0;
                        var participants = []; //liste de tous les participants
                        let reactions = m.reactions.cache.find(emoji => emoji.emoji.name == '✅'); //Collects the reactions of the message, where reaction = :white_check_mark: (✅)
                        m.reactions.cache.map(async (reaction) => { //Maps out every reaction made on the collected message
                            let reactedUsers = await reaction.users.fetch(); //Fetches the users that reacted with the ✅ on the collected message
                            reactedUsers.map((user) => { //Maps out every user that reacted with ✅
                                if(user.id != '779099054084194415'){ //if it's not the bot
                                    
                                    participants.push(`**${user.username}**`);
                                }
                            });
                            let users = participants.join('-').trim(); //Joins all items in the array with a hyphen 
                            let randomparticipant = Math.floor(Math.random()*participants.length); //Selects a random number, based on the length of the above array
                            
                            if(team == nb_teams - 1 && participants.length > 0)
                            {
                                return message.channel.send(`Personne tirée au sort: @${participants[randomparticipant]}`); //Shows the randomly selected user that reacted. If you want to show all users, simply exchange: ${usersThatReacted[randomuser]} with ${users} !!
                            }
                            else if (team == nb_teams - 1 && participants.length == 0)
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
    name: 'draw', // nom de la commande
    aliases: ['draw','tirage'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Tire aléatoire un membre de la réunion', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'administration', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};