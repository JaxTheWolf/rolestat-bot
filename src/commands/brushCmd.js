const { sendAction } = require(`../libs/common`)

const brushCmd = {
  invoke: `brush`,
  aliases: [],
  desc: `Brushes a user/multiple users!`,
  help: `<user>/<users>`,
  type: `action`,
  cmdFunc: (msg, args, client) => {
    return sendAction(client, msg, `**%author** brushes %other's floof! So soft..`, args)
  }
}
exports.booCmd = brushCmd
