module.exports = {
    name: 'ping',
    descritpion: 'Renvoie \"Pong !\"',
    execute(client, message, args) {
        message.channel.send('Pong !');
    }
}