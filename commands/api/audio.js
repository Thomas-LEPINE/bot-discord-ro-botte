const { MessageEmbed } = require("discord.js");
const { getInfo } = require("ytdl-core");
const ytdl = require('ytdl-core');

var connection
const time = 600000;
const emojiPause = '⏸️'; // unicode emoji are identified by the emoji itself
const emojiPlay = '▶️';
const emojiStop = '⏹️';
const reactions = [emojiPause, emojiPlay, emojiStop];

/* FONCTIONS : */
// déclanché lors de l'ajout d'une réaction
function createCollectorMessage(message, list) {
  const collector = message.createReactionCollector(filter, { time });
  collector.on('collect', r => {
    onCollect(r.emoji, message, list);
  });
  collector.on('end', collected => 
    message.clearReactions()
  );
}

// action lors de l'ajout d'une réaction
async function onCollect(emoji, message, list) {
  if (emoji.name === '⏸️' && connection.status == 0) { // pause connection.status permet de voir que l'audio est en lecture (4 lorsqu'il a été stopé
    await message.reactions.removeAll() // clear les réactions à chaque fois (imitation de boutons)
    await message.react('⏸️')
    await message.react('▶️')
    await message.react('⏹️')
    await message.edit(list[0]);
    connection.dispatcher.pause();
    // console.log(connection.status)
  } else if (emoji.name === '▶️' && connection.status == 0) { // play
    await message.reactions.removeAll()
    await message.react('⏸️')
    await message.react('▶️')
    await message.react('⏹️')
    await message.edit(list[1]);
    connection.dispatcher.resume();
  } else if (emoji.name === '⏹️' && connection.status == 0) { //arrêt de l'audio (fermeture)
    await message.edit(list[2]);
    await connection.disconnect();
    await message.reactions.removeAll()
  }
}

//ne renvoie que lorsque ce n'est pas le bot
function filter(reaction, user){
  return (!user.bot) && (reactions.includes(reaction.emoji.name)); // check if the emoji is inside the list of emojis, and if the user is not a bot
}


//commencer la vidéo à un temps donné (non fonctionnnel)
//convertion temps de la forme XX:XX:XX à des nombres de secondes
function time2sec(time)
{
    var time_code_sec = 0
    try{
        var time_code = [""]
        //temps de la forme int ou XX:XX:XX
        var idx = 0
        for(var i in time)
        {
          if(isNaN(parseInt(time[i])) && time[i] != ":")
          {
              return message.channel.send('⚠️ Le temps spécifié doit être un nombre ou de la forme XX:XX:XX');
          }
          else if(time[i] == ":")
          {
              idx++
              time_code.push("")
          }
          else
          {
              time_code[idx] += time[i]
          }
        }
        for(var i in time_code)
        {
          time_code_sec += parseInt(time_code[i]) * (60 ** (time_code.length - 1 - i))
        }
    }catch(err){
      console.log('cmd audio' + err)
    }
    return time_code_sec
}

//convertion sec à heure/minutes/secs
function sec2time(time) {
    
    var h = Math.floor(time / 3600);
    var m = Math.floor(time % 3600 / 60);
    var s = Math.floor(time % 3600 % 60);
    
    var hDisplay = h > 0 ? (h < 10 ? "0" : "") + h + (":") : "";
    var mDisplay = m > 0 ? (m < 10 ? "0" : "") + m + (":") : "";
    var sDisplay = s > 0 ? (s < 10 ? "0" : "") + s : "00";
    
    return `Durée • ${hDisplay}${mDisplay}${sDisplay}`; 
}

module.exports.run = async (client, message, args) => {
  const URL = args[0]
  // Si la commande a plus de 1 arguments :
  if (Object.keys(args).length >= 2) { return message.channel.send('⚠️ Un argument est attendus : l\'URL de la vidéo YouTube souhaitée'); }
  
  try {
    if(!ytdl.validateURL(URL)) { // Si le lien n'est pas valide 
      return message.channel.send('⛔ Lien non-valide ! ⛔');
    }

    let videoTitle = "";
    let videoAuthor =  "";
    let videoDuration =  "";
    //récupération des infos de l'audio
    try {
      let infosVideo = await ytdl.getInfo(URL)
        .then((res) => res.player_response)
        .then((pars1) => pars1.videoDetails)
      ;
      videoTitle = infosVideo.title;
      videoAuthor = infosVideo.author;
      videoDuration = infosVideo.lengthSeconds;
    } catch(error) {
      console.log('cmd audio' + error);
    }
      
    const infos =  videoTitle;
    if (Object.keys(args).length == 2)
    {
        if(parseInt(args[1]) > videoDuration)
        {
            return message.channel.send('⚠️ Temps spécifié superieur à la durée de la vidéo');
        }
    }
    
    //affichage de la durée de l'audio dans le message (player) du bot
    const duration = sec2time(videoDuration);
    
    //trois types de messages pour play/pause/stop avec le contenu différent
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
    
    const stop_embed = new MessageEmbed()
      .setAuthor(infos, "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fde%2F1c%2F91%2Fde1c91788be0d791135736995109272a.png&f=1&nofb=1")
      //.addField('Stop  ⏹️')
      .setTitle(videoAuthor, '\u200B')
      .setDescription(duration + `\nStoped  ⏹️`);
    
    //lists des versions du message
    const list = [pause_embed, play_embed, stop_embed];
    
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voice.channel) {
      connection = await message.member.voice.channel.join(); //connection au channel
      await connection.play(ytdl(URL, { filter: 'audioonly'})); //lancement de l'audio
      connection.on('end', end => {
        if(connection.status == 0){
            connection.disconnect();
        }
        message.reactions.removeAll()
        return;
      });
      // gestion réactions
      message.channel.send(list[1])
        .then(msg => msg.react(emojiPause))
        .then(msgReaction => msgReaction.message.react(emojiPlay)) //ajout des réaction
        .then(msgReaction => msgReaction.message.react(emojiStop))
        .then(msgReaction => createCollectorMessage(msgReaction.message, list));
    
      const collector = message.createReactionCollector(filter, { time }); //collecteur de réactions
      collector.on('collect', r => {
        onCollect(r.emoji, message, list);
      });
      collector.on('end', collected => message.clearReactions());
    } else {
      return message.channel.send('⚠️ Rejoignez d\'abord un channel vocal ⚠️'); // lance l'audio dans le channel l'utilisateur qui a lancé la commande
    }
    
  } catch(err) {
    console.log('cmd audio' + err);
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