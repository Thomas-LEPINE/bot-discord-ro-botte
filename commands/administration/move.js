module.exports.run = (client, message, args) => {
    try{
    //const channel = client.channel('800126482046648381');
    const channel = message.guild.channels.cache.find(channel => channel.id === '800126482046648381');
    //channel now holds the channel you want to move people into

    const member = client.author;
    //member now holds the user that you want to move
    
    member.setVoiceChannel(channel).then(() => console.log(`Succes`))
    //move(channel);
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