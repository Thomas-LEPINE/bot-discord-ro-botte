const ytdl = require('ytdl-core');
const { MessageEmbed } = require("discord.js");
var connection
const time = 600000;
const emojiPause = '⏸️'; // unicode emoji are identified by the emoji itself
const emojiPlay = '▶️';
const reactions = [emojiPause, emojiPlay];

module.exports.run = async (client, message, args) => {
    
    try{
    var infos =""
    
    const URL = args[0]
    const audio = ytdl(URL, { filter: 'audioonly'})
    
    const pause_embed = new MessageEmbed()
      .setAuthor(infos, "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fde%2F1c%2F91%2Fde1c91788be0d791135736995109272a.png&f=1&nofb=1")
      .setColor('#AAA')
      .setTitle('Pause ⏸️');
    const play_embed = new MessageEmbed()
      .setAuthor(infos, "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fde%2F1c%2F91%2Fde1c91788be0d791135736995109272a.png&f=1&nofb=1")
      .setColor('#548')
      .setTitle('Play ▶️');
      
      
    const list = [pause_embed,play_embed]
    
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voice.channel) {
        connection = await message.member.voice.channel.join();
        connection.play(audio);
        connection.on("end", end => {
                    message.member.voice.channel.leave();
                });
    } else {
      message.channel.send('⚠️ Rejoignez d\'abord un channel vocal ⚠️');
    }
        message.channel.send(list[1])
          .then(msg => msg.react(emojiPause))
          .then(msgReaction => msgReaction.message.react(emojiPlay))
          .then(msgReaction => createCollectorMessage(msgReaction.message, list));
        
        const collector = message.createReactionCollector(filter, { time });
          collector.on('collect', r => {
            onCollect(r.emoji, message, list);
          });
          collector.on('end', collected => message.clearReactions());
    }catch(err)
    {
        console.log(err)
    }
};

function createCollectorMessage(message, list) {
  const collector = message.createReactionCollector(filter, { time });
  collector.on('collect', r => {
    onCollect(r.emoji, message, list);
  });
  collector.on('end', collected => message.clearReactions());
}

function onCollect(emoji, message, list) {
  if (emoji.name === '⏸️') {
    message.edit(list[0]);
    connection.dispatcher.pause();
  } else if (emoji.name === '▶️') {
    message.edit(list[1]);
    connection.dispatcher.resume();
  }
}

function filter(reaction, user){
  return (!user.bot) && (reactions.includes(reaction.emoji.name)); // check if the emoji is inside the list of emojis, and if the user is not a bot
}

module.exports.help = { // Toutes les informations de la commande
    name: 'audio', // nom de la commande
    aliases: ['audio'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Joue un audio en spécifiant l\'URL', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'divers', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};