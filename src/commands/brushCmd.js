const { sendAction } = require(`../libs/common`)

const brushCmd = {
  invoke: `brush`,
  aliases: [],
  desc: `Brushes a user/multiple users!`,
  help: `<user>/<users>`,
  type: `action`,
  cmdFunc: (msg, args, client) => {
    const responses = [`**%author** brushes %other's floof! So soft..`, `**%author** wants to brush %other! Brushie brushie! \\:D`]
    return sendAction(client, msg, responses[Math.floor(Math.random() * responses.length)], args)
  }
}
exports.brushCmd = brushCmd
