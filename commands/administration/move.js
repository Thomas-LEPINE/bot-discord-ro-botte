module.exports.run = (client, message, args) => {
    try{
        /*
        
          */


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

                                 team += 1;

                                var server = message.guild;
                            
                                await server.channels.create("Groupe "+team, {type: 'voice',topic: 'Groupes'});                                                    
                            
                                usersThatReacted.forEach(user =>{
                                    message.guild.members.cache.forEach( async member => {
                                        //guard clause, early return
                                        if(member.id === user.id){ member.voice.setChannel(message.guild.channels.cache.find(channel => channel.name==="Groupe "+team));}
                                    });
                                });

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
};
/*
async function move(member, channel) {
   await member.setVoiceChannel(channel);
}
*/

module.exports.help = { // Toutes les informations de la commande
    name: 'move', // nom de la commande
    aliases: ['move'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Move you!', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'administration', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};