module.exports = {
    name: "algnews",
    descritpion: "Retourne une édtion d'alligator news si elle existe",
    execute(client, message, args) {
        const numEdition = args[0];
        const lienEdition = 'https://alligator-news-polytech-angers.github.io/pop-news/edition' + numEdition + '.html'
        message.reply(`Voici l'édition numéro ${args} : \n ${lienEdition}`);
    },
  };