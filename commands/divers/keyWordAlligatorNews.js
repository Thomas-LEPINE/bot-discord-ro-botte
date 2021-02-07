const request = require('request');
const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
    // La fonction associée à la commande :
    request('https://alligator-news-polytech-angers.github.io/pop-news/edition1.html', function (error, response, body) {
        // console.error('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        let articles = []
        articles = body.split('<div class="FullArticle">');
        articles.shift();

        let articleTab = []
        
        for(let i =0;i<Object.keys(articles).length;i++)
        {
            var split =  articles[i].split('<div class="signature">')
            articleTab.push(split[0])
        }
        
        let articlesWithKW = []
        
        for(let i =0;i<Object.keys(articleTab).length;i++)
        {
            if(articleTab[i].includes(args[0]))
            {
                articlesWithKW.push(articleTab[i])
                // console.log(articleTab[i])
            }          
        }
    });
};

module.exports.help = { // Toutes les informations de la commande
    name: 'algnewskeyword', // nom de la commande
    aliases: ['newskw', 'algnewskeyword'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Trouver l\'article alligator news correspondant à votre mot clé !', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '+ le mot clé', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'divers', // Categorie de la commande (le nom du repertoire dans notre cas)
};