module.exports.run = (client, message, args) => {

    if(args[0]==="create")
    {
        try{
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
                                var server = message.guild;

                                server.channels.create("Groupes "+message.author.username, {type: 'category',topic: 'Groupes'}).then();   
                                first = false;
                                var team = 0;
                                let reactions = m.reactions.cache.find(emoji => emoji.emoji.name == '✅'); //Collects the reactions of the message, where reaction = :white_check_mark: (✅)
                                m.reactions.cache.map(async (reaction) => { //Maps out every reaction made on the collected message
                                    
                                    server.channels.create("Groupe "+team, {type: 'voice',topic: 'Groupes'}).then((channel)=>{
                                        channel.setParent(server.channels.cache.find((channel) => channel.name==="Groupes "+message.author.username).id)
                                    });                                                   
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

        
        }
        catch(err){
            console.log(err);
        }
    }
    else if(args[0]==="delete")
    {   

        var server = message.guild;

        try{
            let channel_to_delete = [];
            server.channels.cache.find((channel)=> {
                if(channel.parent===server.channels.cache.find((channel) => channel.name==="Groupes "+message.author.username)){ 
                    channel_to_delete.push(channel);
                }
            });
            channel_to_delete.push(server.channels.cache.find((channel) => channel.name==="Groupes "+message.author.username));
            channel_to_delete.forEach( (channel) =>{
                channel.delete();
            });
        }
        catch(err){
            console.log(err);
        }
    }
    else if(args[0]==="move")
    {
        try{

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
                                var team = 0;
                                let reactions = m.reactions.cache.find(emoji => emoji.emoji.name == '✅'); //Collects the reactions of the message, where reaction = :white_check_mark: (✅)
                                m.reactions.cache.map(async (reaction) => { //Maps out every reaction made on the collected message
                                    let usersThatReacted = []; //Initiates usersThatReacted as an array
                                    let reactedUsers = await reaction.users.fetch(); //Fetches the users that reacted with the ✅ on the collected message
                                    reactedUsers.map((user) => { //Maps out every user that reacted with ✅
                                        if(user.id != '779099054084194415'){ //if it's not the bot
                                            usersThatReacted.push(user);
                                        }
                                    });                                 
   
                                   var server = message.guild;
                                                           
                                   usersThatReacted.forEach( (user) =>{
                                       message.guild.members.cache.forEach(  (member) => {
                                           //guard clause, early return
                                           if(member.id === user.id){ member.voice.setChannel(message.guild.channels.cache.find((channel) => channel.name==="Groupe "+team && channel.parent===server.channels.cache.find((channel) => channel.name==="Groupes "+message.author.username)));}
                                       });
                                       
                                   });
   
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
   
          
       }
       catch(err){
           console.log(err)
       }
    }

};


module.exports.help = { // Toutes les informations de la commande
    name: 'channel', // nom de la commande
    aliases: ['channel','chan'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Creates or deletes the channels for the group!', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '[create | delete | move]', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'administration', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: true, // Si la commande nécessite des droits particulier
    permissionRequiered: 'MANAGE_CHANNELS', //Permission minimimum demandé si besoin
};