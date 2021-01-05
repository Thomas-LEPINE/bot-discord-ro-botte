module.exports.run = (client, message, args) => {
    // La fonction associée à la commande :
    var sommep1=0;
    var sommep2=0;
    args[0]=args[0].toLowerCase();
    args[1]=args[1].toLowerCase();
    for (i = 0; i < args[0].length; i++) {
        sommep1+=args[0].charCodeAt(i)
    }

    for (i = 0; i < args[1].length; i++) {
        sommep2+=args[1].charCodeAt(i)
    }

    var compat=(sommep1+sommep2)%101;
    var final_message="";

    if(compat ==0)
    {
        final_message=final_message.concat(final_message,"0%, aucun love ici");
    }
    else
    {
        if(compat <=25)
        {
            final_message=final_message.concat(final_message,compat.toString(),"%, pas d'espoir entre ces deux là");
        }
        else
        {
            if(compat <=50)
            {
                final_message=final_message.concat(final_message,compat.toString(),"%, ça peut faire un coup d'un soir");
            }
            else
            {
                if(compat <=75)
                {
                    final_message=final_message.concat(final_message,compat.toString(),"%, le mariage est clairement envisageable");
                }
                else
                {
                    if(compat <=99)
                    {
                        final_message=final_message.concat(final_message,compat.toString(),"%, commencez à réfléchir aux enfants");
                    }
                    else
                    {
                        final_message=final_message.concat(final_message,"100%, c'est le véritable amour !!!!");
                    }
                }
            }
        }
    }    

    message.channel.send(final_message);

};

module.exports.help = { // Toutes les informations de la commande
    name: 'love', // nom de la commande
    aliases: ['love', 'amour'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Calcul la comptabilité amoureuse de deux prénoms', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: 'prénom1 prénom2', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'fun', // Categorie de la commande (le nom du repertoire dans notre cas)
};