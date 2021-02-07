module.exports = async (client, messageReaction, user) => {
    const message = messageReaction.message; // Récupère le message envoyé
    const member = message.guild.members.cache.get(user.id); // Récupère les informations de l'utilisateur
    const emoji = messageReaction.emoji.name; // Récupère l'emoji cliqué

    const channel = message.guild.channels.cache.find(c => c.id === '800126481875468302');

    const cookierRole = message.guild.roles.cache.get("800130082533802004"); //Id role 1
    const okManRole = message.guild.roles.cache.get("800130131258638376"); //Id role 2
    const eightballisteRole = message.guild.roles.cache.get("800131600850485268"); //Id role 3

    if(member.user.bot) return; // Les réactions ajouté au bot ne lui donnent pas les rôles
    if(["eightball", "🍪", "👌"].includes(emoji) && message.channel.id === channel.id) {
        switch (emoji) {
            case "eightball":
                member.roles.add(eightballisteRole);
                message.channel.send(`Le rôle ${eightballisteRole} a été ajouté à ${user.username}`);
                break;
            case "🍪":
                member.roles.add(cookierRole);
                message.channel.send(`Le rôle ${cookierRole} a été ajouté à ${user.username}`);
                break;
            case "👌":
                member.roles.add(okManRole);
                message.channel.send(`Le rôle ${okManRole} a été ajouté à ${user.username}`);
                break;
        }
    } else {
        return;
    }
}
