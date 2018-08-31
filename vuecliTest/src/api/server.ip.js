let nodeEnv = process.env.NODE_ENV
let IP = ''
if (nodeEnv === 'development') {
  IP = 'http://localhost:3000'
} else if (nodeEnv === 'production') {
  IP = 'http://localhost:4000'
} else if (nodeEnv === 'testing') {
  IP = 'http://localhost:3000'
}
export let baseHref = IP
