const token = require("../../tokens.json");
const fetch = require("node-fetch"); // API
/* Token API TENOR : */
const TOKEN = token.TOKEN_API_TENOR;

module.exports.run = async (client, message, args) => {
    args = args.join(' ').toLowerCase(); // Réunni les arguments avec un espace entre eux
    switch(args) {
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
        case 'les plus beaux':
            await message.channel.send({files: ['./assets/images/cmd-please/la_team_thorains.jpg']});
            break;
        case 'logo alligator news':
            await message.channel.send({files: ['./assets/images/cmd-please/logo_alligator_news.png']});
            break;
        case 'alligator news':
            await message.channel.send({files: ['./assets/images/cmd-please/logo_alligator_news_portrait_fond_bleu.png']});
            break;
        case 'cs':
            await message.channel.send({files: ['./assets/images/cmd-please/happy.png']});
            await message.react('🙂'); await message.react('🤜'); await message.react('👌'); await message.react('🤷'); await message.react('🇪'); await message.react('🇿');
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
        case '1er ro-botte':
            await message.channel.send({files: ['./assets/images/logo_ro-botte1.png']});
            break;
        case 'old ro-botte':
            await message.channel.send({files: ['./assets/images/robot_bottes.jpg']});
            break;
        case 'thomas lépine':
            await message.channel.send({files: ['./assets/images/cmd-please/portraitthomaslepine.jpg']});
            break;
        case 'thomas lepine':
            await message.channel.send({files: ['./assets/images/cmd-please/portraitthomaslepine.jpg']});
            break;
        case 'lépine thomas':
            await message.channel.send({files: ['./assets/images/cmd-please/thomaslepine.jpg']});
            break;

        default:
            
            var search_url = "https://g.tenor.com/v1/random?key=" + TOKEN + "&locale=" + "fr_FR" + "&limit=12" + "&media_filter=minimal" + "&q=" + args;
            try {  
                var gif = await fetch(search_url)
                    .then((res) => res.json()) // On récupère un Json
                    .then((json) => json.results); // On récupère les résultats obtenus
            } catch(error){}
    
            if(gif === undefined || gif.length === 0) {
                return message.reply('🤷 J\'ai pas trouvé ... Sorry 😅'); // Dans le cas où le gif n'est pas trouvé
            } else {
                // Récupère le gif :
                gifToSend = await gif[Math.floor(Math.random() * Object.keys(gif).length)]['url']; // Un gif récupéré au hasard
                // gifToSend = gif[0]['url']
                await message.channel.send(gifToSend);
            }
            break;
    }
    return;
};

module.exports.help = {
    name: 'fungif', // nom de la commande
    aliases: ['fungif', 'fun', 'fn', 'pitiemonsieur', 'stp'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie un gif ou une image selon votre envie (ce que vous demandez)', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '+ le nom de ce que vous souhaitez (ex café) ⚠️ les résultats sont ... approximatifs', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'fun', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};