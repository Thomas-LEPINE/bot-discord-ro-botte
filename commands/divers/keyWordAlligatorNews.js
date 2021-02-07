const request = require('request');
const { MessageEmbed } = require("discord.js");
const hastebin = require("hastebin-gen");


module.exports.run = (client, message, args) => {
    // La fonction associée à la commande :
    console.log(args[0])
    request('https://alligator-news-polytech-angers.github.io/pop-news/edition'+args[0]+'.html', function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        
        let articles = []
        articles = body.split('<div class="FullArticle">');
        articles.shift();

        let articleTab = []
        
        for(let i =0;i<Object.keys(articles).length;i++)
        {
            var split =  articles[i].split('<div class="signature">')
            articleTab.push(split[0])
        }

        let articleWithKW = []
        for(let i =0;i<Object.keys(articleTab).length;i++)
        {
            if(articleTab[i].includes(args[1]))
            {
                articleWithKW.push(articleTab[i])
            }          
        }
        
        if(Object.keys(articleWithKW).length==0)
        {
            message.channel.send("Aucun article ne contient ce mot ! ^^")
        }   
        else
        {
            
            Content = ''
           
            for(let i =0;i<Object.keys(articleWithKW).length;i++)
            {
                Content+='\n ---------------ARTICLE----------------- \n'
                
                
                var result = articleWithKW[i].match(/<p>(.*?)<\/p>/g).map(function(val){
                    return val.replace(/<\/?p>/g,'');
                });
                
                for(let i =0;i<Object.keys(result).length;i++)
                {
                    Content+=result[i]+'\n'       
                }
                
            }
           
            if(Object.keys(Content).length>=2000)
            {
                message.channel.send("Trop de caractères... génération hastebin :");
                hastebin(Content, { url:"https://paste.mod.gg", extension: "html" }).then(haste => {
                    message.channel.send(haste);
                }).catch(error => {
                    console.error(error);
                });
            }
            else
            {
                message.channel.send(Content);
            }
            
        }      
        
    });
};

module.exports.help = { // Toutes les informations de la commande
    name: 'newskw', // nom de la commande
    aliases: ['newskw'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Trouver l\'article alligator news correspondant à votre mot clé !', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '<numero edition> <keyword>', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'divers', // Categorie de la commande (le nom du repertoire dans notre cas)
};