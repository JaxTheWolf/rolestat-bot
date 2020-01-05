const { sendAction } = require(`../libs/common`)

const frightenCmd = {
  invoke: `frighten`,
  aliases: [`fright`],
  desc: `Frightens a user/multiple users!`,
  help: `<user>/<users>`,
  type: `action`,
  cmdFunc: (msg, args, client) => {
    const responses = [`**%author** does %other the big frighten!`]
    return sendAction(client, msg, responses, args)
  }
}
exports.booCmd = frightenCmd
