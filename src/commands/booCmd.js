const booCmd = {
  invoke: `boo`,
  aliases: [`spook`],
  desc: `Spooks a user/multiple users!`,
  help: `<user>/<users>`,
  type: `action`,
  cmdFunc: (msg, args, client) => {
    return msg.channel.send(`WIP!`)
  }
}

exports.booCmd = booCmd
