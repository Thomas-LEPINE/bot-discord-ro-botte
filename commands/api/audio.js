const { MessageEmbed } = require("discord.js");
const { getInfo } = require("ytdl-core");
const ytdl = require('ytdl-core');

var connection
const time = 600000;
const emojiPause = '⏸️'; // unicode emoji are identified by the emoji itself
const emojiPlay = '▶️';
const emojiStop = '⏹️';
const reactions = [emojiPause, emojiPlay,emojiStop];

/* FONCTIONS : */
function createCollectorMessage(message, list) {
  const collector = message.createReactionCollector(filter, { time });
  collector.on('collect', r => {
    onCollect(r.emoji, message, list);
  });
  collector.on('end', collected => 
    message.clearReactions()
  );
}

function onCollect(emoji, message, list) {
  if (emoji.name === '⏸️') {
    message.reactions.removeAll()
    message.react('⏸️')
    message.react('▶️')
    message.react('⏹️')
    message.edit(list[0]);
    connection.dispatcher.pause();
  } else if (emoji.name === '▶️') {
    message.reactions.removeAll()
    message.react('⏸️')
    message.react('▶️')
    message.react('⏹️')
    message.edit(list[1]);
    connection.dispatcher.resume();
  } else if (emoji.name === '⏹️') {
    message.delete();
    connection.dispatcher.destroy();
  }
}

function filter(reaction, user){
  return (!user.bot) && (reactions.includes(reaction.emoji.name)); // check if the emoji is inside the list of emojis, and if the user is not a bot
}

function secondsToHms(d) {
    
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    
    var hDisplay = h > 0 ? (h < 10 ? "0" : "") + h + (":") : "";
    var mDisplay = m > 0 ? (m < 10 ? "0" : "") + m + (":") : "";
    var sDisplay = s > 0 ? (s < 10 ? "0" : "") + s : "00";
    
    return `Durée • ${hDisplay}${mDisplay}${sDisplay}`; 
}

module.exports.run = async (client, message, args) => {
  
  // Si la commande a plus d'un argument :
  if (Object.keys(args).length >= 2) { return message.channel.send('⚠️ Un seul argument est attendu : l\'URL de la vidéo YouTube souhaitée'); }

  try {
    var infos = ""
    const URL = args[0]

    if(!ytdl.validateURL(URL)) { // Si le lien n'est pas valide 
      return message.channel.send('⛔ Lien non-valide ! ⛔');
    }

    const audio = ytdl(URL, { filter: 'audioonly'})
    let videoTitle = "";
    let videoAuthor =  "";
    let videoDuration =  "";
    try {
      let infosVideo = await ytdl.getInfo(URL)
        .then((res) => res.player_response)
        .then((pars1) => pars1.videoDetails)
      ;
      videoTitle = infosVideo.title;
      videoAuthor = infosVideo.author;
      videoDuration = infosVideo.lengthSeconds;
    } catch(error) {
      console.log(error);
    }
      
    infos =  videoTitle;
    var h = Math.floor(videoDuration / 3600);
    var m = Math.floor(videoDuration % 3600 / 60);
    var s = Math.floor(videoDuration % 3600 % 60);
    
    var hDisplay = h > 0 ? (h < 10 ? "0" : "") + h + (":") : "";
    var mDisplay = m > 0 ? (m < 10 ? "0" : "") + m + (":") : "";
    var sDisplay = s > 0 ? (s < 10 ? "0" : "") + s : "00";
    const duration = secondsToHms(videoDuration);
    
    const pause_embed = new MessageEmbed()
      .setAuthor(infos, "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fde%2F1c%2F91%2Fde1c91788be0d791135736995109272a.png&f=1&nofb=1")
      //.addField('Pause  ⏸️')
      .setColor('#AAA')
      .setTitle(videoAuthor, '\u200B')
      .setDescription(duration + `\nPause  ⏸️`);

    const play_embed = new MessageEmbed()
      .setAuthor(infos, "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fde%2F1c%2F91%2Fde1c91788be0d791135736995109272a.png&f=1&nofb=1")
      //.addField('Play  ▶️')
      .setColor('#548')
      .setTitle(videoAuthor, '\u200B')
      .setDescription(duration + `\nPlay  ▶️`);
      
    const list = [pause_embed, play_embed];
    
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voice.channel) {
      connection = await message.member.voice.channel.join();
      await connection.play(audio);
      connection.on("end", end => {
        message.member.voice.channel.leave();
      });
      message.channel.send(list[1])
        .then(msg => msg.react(emojiPause))
        .then(msgReaction => msgReaction.message.react(emojiPlay))
        .then(msgReaction => msgReaction.message.react(emojiStop))
        .then(msgReaction => createCollectorMessage(msgReaction.message, list));
    
      const collector = message.createReactionCollector(filter, { time });
      collector.on('collect', r => {
        onCollect(r.emoji, message, list);
      });
      collector.on('end', collected => message.clearReactions());
    } else {
      return message.channel.send('⚠️ Rejoignez d\'abord un channel vocal ⚠️');
    }
    
  } catch(err) {
    console.log(err);
  }
};

module.exports.help = { // Toutes les informations de la commande
    name: 'audio', // nom de la commande
    aliases: ['audio', 'ad', 'yt'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Joue un audio en spécifiant l\'URL', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '+ l\'URL de la vidéo youtube souhaitée', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'api', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};