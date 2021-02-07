const { MessageEmbed } = require("discord.js");
const emojiNext = '⏸️'; // unicode emoji are identified by the emoji itself
const emojiPrevious = '▶️';
const reactionArrow = [emojiPrevious, emojiNext];

const time = 60000;

const first = () => new MessageEmbed()
    .setAuthor('TOTO', "https://i.imgur.com/ezC66kZ.png")
    .setColor('#AAA')
    .setTitle('First')
    .setDescription('First');

const second = () => new MessageEmbed()
    .setAuthor('TOTO', "https://i.imgur.com/ezC66kZ.png")
    .setColor('#548')
    .setTitle('Second')
    .setDescription('Second');

const third = () => new MessageEmbed()
    .setAuthor('TOTO', "https://i.imgur.com/ezC66kZ.png")
    .setColor('#35D')
    .setTitle('Third')
    .setDescription('Third');

const list = [first, second, third];

module.exports.run = (client, message, args) => {
    
    try{
        sendList(message.channel, getList)
    }
    catch(err)
    {
        console.log(err)
    }
};

function getList(i) {
    return list[i]().setTimestamp().setFooter(`Page ${i+1}`); // i+1 because we start at 0
}

function filter(reaction, user){
  return (!user.bot) && (reactionArrow.includes(reaction.emoji.name)); // check if the emoji is inside the list of emojis, and if the user is not a bot
}

function onCollect(emoji, message, i, getList) {
  if ((emoji.name === emojiPrevious) && (i > 0)) {
    message.edit(getList(--i));
  } else if ((emoji.name === emojiNext) && (i < list.length-1)) {
    message.edit(getList(++i));
  }
  return i;
}

function createCollectorMessage(message, getList) {
  let i = 0;
  const collector = message.createReactionCollector(filter, { time });
  collector.on('collect', r => {
    i = onCollect(r.emoji, message, i, getList);
  });
  // collector.on('end', collected => message.clearReactions());
}

function sendList(channel, getList){
  channel.send(getList(0))
    .then(msg => msg.react(emojiPrevious))
    .then(msgReaction => msgReaction.message.react(emojiNext))
    .then(msgReaction => createCollectorMessage(msgReaction.message, getList));
}

module.exports.help = { // Toutes les informations de la commande
    name: 'multipage', // nom de la commande
    aliases: ['multipage'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Embed multipage', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'divers', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};