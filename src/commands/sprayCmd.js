const { sendAction } = require(`../libs/common`)

const sprayCmd = {
  invoke: `spray`,
  aliases: [],
  desc: `SPrays a user/multiple users!`,
  help: `<user>/<users>`,
  type: `action`,
  cmdFunc: (msg, args, client) => {
    const responses = [`%other just go sprayed by **%author**! Bad %other!`, `**%author** sprays %other for being bad! >:3`]
    return sendAction(client, msg, responses[Math.floor(Math.random() * responses.length)], args)
  }
}
exports.sprayCmd = sprayCmd
