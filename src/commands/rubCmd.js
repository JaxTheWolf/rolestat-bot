const { sendAction } = require(`../libs/common`)

const rubCmd = {
  invoke: `rub`,
  aliases: [`belly_rub`, `brub`, `rub_b`],
  desc: `Rubs a user's/multiple users' belly!`,
  help: `<user>/<users>`,
  type: `action`,
  cmdFunc: (msg, args, client) => {
    const responses = [`**%author** rubs %other's soft belly. Ruby-rub! 😄`, `**%author** rubbed %other's belly so much that they burst out laughing!`, `**%author** randomly decided to give %other some belly rubs. **Rubrub!**`]
    return sendAction(client, msg, responses, args)
  }
}
exports.rubCmd = rubCmd
