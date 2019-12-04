export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: '框架标题',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    // dev: 'https://www.easy-mock.com/mock/5c481aed349db30a8801b415/custom-frame/',
    dev: 'http://localhost:5000/',
    pro: 'https://produce.com'
  },
  uploadFileUrl: 'api/file/uploadFile',
  downloadFileUrl: 'api/file/downloadFile',
  deleteFileUrl: 'api/file/deleteFile',
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
}
