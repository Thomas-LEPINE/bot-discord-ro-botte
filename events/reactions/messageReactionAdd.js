module.exports = async (client, messageReaction, user) => {
    const message = messageReaction.message; // Récupère le message envoyé
    const member = message.guild.members.cache.get(user.id); // Récupère les informations de l'utilisateur
    const emoji = messageReaction.emoji.name; // Récupère l'emoji cliqué

    const channel = message.guild.channels.cache.find(c => c.id === '800126481875468302'); // Récupère le channel demandé (ici général)

    const cookieRole = message.guild.roles.cache.get("800130082533802004"); // Id role cookie
    const ihrmvRole = message.guild.roles.cache.get("808081626457833527"); // Id role 5A IHMRV
    const cybersecuRole = message.guild.roles.cache.get("808081752958435418"); // Id role 5A Cyber-secu
    const cyberphysiqueRole = message.guild.roles.cache.get("808081825032962059"); // Id role 5A Cyberphysique

    if(member.user.bot) return; // Les réactions ajouté au bot ne lui donnent pas les rôles
    if(["🍪", "ihmrv", "cybersecurity", "cyberphysique"].includes(emoji) && message.channel.id === channel.id) {
        switch (emoji) {
            case "🍪":
                await member.roles.add(cookieRole);
                message.channel.send(`Le rôle ${cookieRole} a été ajouté à ${user.username}`);
                break;
            case "ihmrv":
                await member.roles.add(ihrmvRole);
                message.channel.send(`Le rôle ${ihrmvRole} a été ajouté à ${user.username}`);
                break;
            case "cybersecurity":
                await member.roles.add(cybersecuRole);
                message.channel.send(`Le rôle ${cybersecuRole} a été ajouté à ${user.username}`);
                break;
            case "cyberphysique":
                await member.roles.add(cyberphysiqueRole);
                message.channel.send(`Le rôle ${cyberphysiqueRole} a été ajouté à ${user.username}`);
                break;
        }
    } else {
        return;
    }
}
