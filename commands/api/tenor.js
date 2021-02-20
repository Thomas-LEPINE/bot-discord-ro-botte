const token = require("../../tokens.json");
const fetch = require("node-fetch"); // API
/* Token API TENOR : */
const TOKEN = token.TOKEN_API_TENOR;
var search_url = "https://g.tenor.com/v1/";

module.exports.run = async (client, message, args) => {
    if(!Object.keys(args).length) { // Si la commande n'a pas d'arguments
        return message.channel.send("Des arguments sont attendus");
    } else {
        if(Object.keys(args).length > 2 && args[0] === "random") {
            search_url += "random?"; // Random gif
        } else {
            search_url += "search?"; // Searching gif
        }
        search_url += "key=" + TOKEN + "&locale=" + "fr_FR" + "&limit=40";
        if(args[0 === "café"]){args = "coffee";} // La recher de 'café' donne de très mauvais résultats
        args = args.join(' ').toLowerCase(); // Réunni les arguments avec un espace entre eux

        // Doc : https://tenor.com/gifapi/documentation#endpoints-search
        search_url += "&q=" + args;
        try {  
            var gif = await fetch(search_url)
                .then((res) => res.json()) // On récupère un Json
                .then((json) => json.results); // On récupère les résultats obtenus
        } catch(error){}

        if(gif === undefined) {
            return message.reply('🤷 J\'ai pas trouvé ... Sorry 😅'); // Dans le cas où le gif n'est pas trouvé
        }
        // Récupère le gif :
        gifToSend = await gif[Math.floor(Math.random() * Object.keys(gif).length)]['url']; // Un gif récupéré au hasard
        // gifToSend = gif[0]['url']
        return message.channel.send(gifToSend);
    }
};

module.exports.help = {
    name: 'gif', // nom de la commande
    aliases: ['gif', 'tenor', 'needgif', 'need'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie un gif ou une image selon votre envie (ce que vous demandez)', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '+ le nom de ce que vous souhaitez voir en gif (utilise l\'API Tenor)\nNB : Utilisez la commande suivi de "random" puis de ce que vous voulez, pour obtenir un résultat un peu moins prévisible 😉', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'api', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};