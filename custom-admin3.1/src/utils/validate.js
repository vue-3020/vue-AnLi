export const notNull = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('性别不能为空'))
  }
  callback()
}
