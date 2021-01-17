const request = require('request');
const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
    // La fonction associée à la commande :
    request('https://data.angers.fr/api/records/1.0/search/?dataset=objets-trouves-dans-les-gares-en-temps-reel&q=&rows=1130&facet=date&facet=gc_obo_gare_origine_r_name&facet=gc_obo_type_c', function (error, response, body) {
        // console.error('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        ///Parsing JSON DATA
        const obj = JSON.parse(body);

        ///Count occurence of value in array
        const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

        ///Variables
        let allObj = []
        let objTab = []
        let occuTab = []
        let nbObjTotal 
        let typeObj

        ///Computing
        for (let k = 0; k < obj.nhits; k++) {         
            allObj.push(obj.records[k].fields.gc_obo_nature_c)           
        } 
        nbObjTotal = allObj.length
        for (let i = 0; i < nbObjTotal; i++) {
            if(!objTab.includes(allObj[i]))
            {
                objTab.push(allObj[i])
            }
        }
        typeObj =  objTab.length
        for(let j =0; j< objTab.length; j++)
        {
            occuTab.push(countOccurrences(allObj, objTab[j]))
        }

        ///Create embeded
        const embed = new MessageEmbed()
            .setColor("#ef4f4f")
            .setTitle("Les objets trouvés de la gare d'Angers !")
            .setDescription("=> Les 10 objets les plus présents aux objets trouvés de la gare d'Angers !")
            .setThumbnail('https://static.data.gouv.fr/avatars/58/da9908bc7c42f48a9ddd61e873fe91.png')
            .setURL('https://data.angers.fr/explore/dataset/objets-trouves-dans-les-gares-en-temps-reel/api/?rows=1130')
            .setFooter('Check open data Angers !', 'https://static.data.gouv.fr/avatars/58/da9908bc7c42f48a9ddd61e873fe91.png')  
            .addField('\u200B',  '\u200B')         
            .addField(`${nbObjTotal} objets sont en attente d'un gentil propriéraire à la gare !`,`=> Ces objets sont regroupés en ${typeObj} catégories, voici les 10 principales :`)
            .addField('\u200B',  '\u200B')
        ;

        for(let v=0;v<10;v++)
        {
            //Get maximum value
            let valueMax = Math.max(...occuTab)

            //Get index
            let indexValueMax = occuTab.indexOf(valueMax)

            //Add to embeded
            let nom = objTab[indexValueMax]
            embed.addField(`${nom}`, `=> ${valueMax} sont en attente de leur propriétaire !`, true);

            //Delete value from array
            objTab.splice(indexValueMax,1)
            occuTab.splice(indexValueMax,1)
        }
        embed.addField('\u200B',  '\u200B')
        message.channel.send(embed);
    });
};

module.exports.help = { // Toutes les informations de la commande
    name: 'objgare', // nom de la commande
    aliases: ['objGare'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Les objets trouvés de la gare d\'Angers !', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'classic', // Categorie de la commande (le nom du repertoire dans notre cas)
};