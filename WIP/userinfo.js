module.exports = {
    name: 'userinfo',
    descritpion: 'Récupère les infos d\'un utilisateur mentionné (tag) -> permet de le retrouver sur Discord malgré le pseudo sur un seveur',
    execute(client, message, args) {
        const user_mention = message.mentions.users.first();
		message.channel.send(`Voici le tag de la personne mentionnée : ${user_mention.tag}`)
    }
}