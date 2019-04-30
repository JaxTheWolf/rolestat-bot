const { sendAction } = require(`../libs/common`)

const booCmd = {
  invoke: `boo`,
  aliases: [`spook`],
  desc: `Spooks a user/multiple users!`,
  help: `<user>/<users>`,
  type: `action`,
  cmdFunc: (msg, args, client) => {
    const responses = [`**%author** scares %other! BOO!`, `**%author** yelled at %other and they jumped up real high!`]
    return sendAction(client, msg, responses, args)
  }
}
exports.booCmd = booCmd
