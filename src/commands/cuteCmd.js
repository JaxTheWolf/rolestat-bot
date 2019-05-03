const { sendAction } = require(`../libs/common`)

const cuteCmd = {
  invoke: `cute`,
  aliases: [`cutie`],
  desc: `Reminds a user/multiple users of how cute they are!`,
  help: `<user>/<users>`,
  type: `action`,
  cmdFunc: (msg, args, client) => {
    const responses = [`**%author** helps %other realise their cute worth!`, `**%author** reminds %other how adorable they are!`, `**%author** lets %other know they're wanted!`]
    return sendAction(client, msg, responses, args)
  }
}
exports.booCmd = cuteCmd
