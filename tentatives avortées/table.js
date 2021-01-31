module.exports.run = (client, message, args) => {
    var nb_col = 0
    var nb_raw = 0
    var col_idx = 0 // nb de colonne pour chaque ligne
    var col_width = []
    var word = ""
    var total_width = 0
    var cells = [[]]
    
    try{
        // dimensionner le tableau
        for(var i in args[0]) //boucle comptage ligne
        {
            if(args[0][i] == '\n')
            {
                if(nb_raw==0)//first raw
                {
                    col_width.push(0)
                }
                
                if(word == "")
                {
                    cells[nb_raw].push(" ")
                }
                else
                {
                    cells[nb_raw].push(word)
                }
                
                if(col_width[col_idx] < word.length)
                {
                    col_width[col_idx] = word.length
                }
                nb_raw ++
                col_idx ++
                if(col_idx > nb_col)
                {
                    nb_col = col_idx
                }
                col_idx = 0
                word = ""
                cells[nb_raw] = []
            }
            else if(args[0][i] == ';')
            {
                if(nb_raw==0)//first raw
                {
                    col_width.push(0)
                }
                cells[nb_raw].push(word)
                if(col_width[col_idx] < word.length)
                {
                    col_width[col_idx] = word.length
                }
                col_idx ++
                word = ""
            }
            else 
            {
                word += args[0][i]
            }
        }
        
        //last cell
        if(col_width[col_idx] < word.length)
        {
            col_width[col_idx] = word.length
        }
        cells[nb_raw].push(word)
    
        for(var i in col_width)
        {
            total_width  += col_width[i]
        }
        
        var msg = "╔"
        var idx= 0
        
        for(var i in col_width)
        {
            for(var j=0; j<parseInt(col_width[i]*143/207)+1;j++)
            {
                msg += '─'
            }
            if( i < col_width.length-1)
            {
                msg += '┬'
            }
            else
            {
                msg += "╗\n"
            }
        }
        
        // création du msg
        for(var i in cells) //boucle ligne
        {
            msg += '║'
            for(var j in cells[i]) //boucle mots
            {
                msg += cells[i][j]
                for(var k=0;k<parseInt((col_width[i] - cells[i][j].length)*(377/174));k++)
                {
                    msg+=" "
                }
                
                if(j < cells[i].length-1)
                {
                    msg +='│'
                }
                else
                {
                    msg += '║\n'
                }
            }
            
            if(i < cells.length-1)
            {
                msg += "╠"
                for(var k in col_width)
                {
                    for(var l=0; l<parseInt(col_width[k]*143/207)+1;l++)
                    {
                        msg += '─'
                    }
                    if( k < col_width.length-1)
                    {
                        msg += '┼'
                    }
                    else
                    {
                        msg += "╣\n"
                    }
                }
            }
            else //last raw
            {
                msg += "╚"
                
                for(var k in col_width)
                {
                    for(var l=0; l<parseInt(col_width[k]*143/207);l++)
                    {
                        msg += '─'
                    }
                    if( k < col_width.length-1)
                    {
                        msg += '┴'
                    }
                    else
                    {
                        msg += "╝\n"
                    }
                }
            }
        }
        message.channel.send(msg)
        
    }catch(err){
        console.log(err)
    }
};

module.exports.help = { // Toutes les informations de la commande
    name: 'table', // nom de la commande
    aliases: ['table','tableau'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Format le contenu CSV en tableau', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'divers', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};