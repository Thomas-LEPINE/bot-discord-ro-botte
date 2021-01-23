const fetch = require("node-fetch"); // API
const { MessageEmbed } = require("discord.js");
const gifSearch = require('gif-search');

module.exports.run = async (client, message, args) => {
    // La fonction associée à la commande :
    args = args.join(' ').toLowerCase(); // Réunni les arguments avec un espace entre eux
    // const embed = new MessageEmbed().setColor("#D386F5");
    switch(args) {
        case 'cyber-secu':
            await message.channel.send({files: ['./assets/images/cmd-please/smile.png']});
            break;
        case 'ag':
            await message.channel.send({files: ['./assets/images/cmd-please/happy.png']});
            break;
        case 'milk':
            await message.channel.send({files: ['./assets/images/cmd-please/milk.gif']});
            break;
        case 'café':
            await message.channel.send({files: ['./assets/images/cmd-please/cafe.gif']});
            break;
        case 'coffe':
            await message.channel.send({files: ['./assets/images/cmd-please/coffee.gif']});
            break;
        case 'i need coffee':
            await message.channel.send({files: ['./assets/images/cmd-please/ineedcoffee.gif']});
            break;
        case 'thomas lépine':
            await message.channel.send({files: ['./assets/images/cmd-please/thomas_ee.jpg']});
            break;
        case 'logo alligator news':
            await message.channel.send({files: ['./assets/images/cmd-please/logo_alligator_news.png']});
            break;
        case 'alligator news':
            await message.channel.send({files: ['./assets/images/cmd-please/logo_alligator_news_portrait_fond_bleu.png']});
            break;
        case 'eight ball':
            await message.channel.send({files: ['./assets/images/billiards.png']});
            break;
        case 'robotte':
            await message.channel.send({files: ['./assets/images/logo_ro-botte2.png']});
            break;
        case 'ro-botte':
            await message.channel.send({files: ['./assets/images/logo_ro-botte2.png']});
            break;
        case 'ro botte':
            await message.channel.send({files: ['./assets/images/logo_ro-botte2.png']});
            break;
        case 'old ro-botte':
            await message.channel.send({files: ['./assets/images/robot_bottes.jpg']});
            break;

        default:
            try {                
                gifSearch.query(args).then((gifurl) => { // Recherche un gif correspondant aux arguments
                    message.channel.send(gifurl);
                });        
            } catch(error){}
            break;
    }
    return;
};

module.exports.help = {
    name: 'gif', // nom de la commande
    aliases: ['gif', 'please', 'fun', 'pls', 'fn', 'pitiemonsieur', 'stp'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie un gif ou une image selon votre envie (ce que vous demandez)', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '+ le nom de ce que vous souhaitez (ex café)', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'fun', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};