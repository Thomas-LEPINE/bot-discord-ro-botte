module.exports.run = {
    execute(client, message, args) {
        message.channel.send('Pong !');
    }
}

module.exports.help = {
    name: 'ping',
    descritpion: 'Renvoie \"Pong !\"',
    execute(client, message, args) {
        message.channel.send('Pong !');
    }
}