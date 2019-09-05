/* eslint-env node, es-6 */
const forceSsl = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect (`https://${req.get ('Host') + req.url}`)
  }

  return next ()
}

export default forceSsl
