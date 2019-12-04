
import config from '@/config'
export default {

  enum: {
    // 用户状态
    user_state: [
      { key: 1, label: '启用' },
      { key: 0, label: '禁用' }
    ],
    user_gender: [
      { key: 1, label: '男' },
      { key: 0, label: '女' }
    ]
  },
  CONST_TYPE_1: 1,
  CONST_TYPE_2: 2,
  ACTION_TYPE: {
    CREATE: 'create',
    EDIT: 'edit',
    VIEW: 'view'
  },
  rowBtnSetting: {
    btn_p: {
      type: 'primary',
      size: 'small'
    },
    btn_e: {
      type: 'error',
      size: 'small'
    },
    style: {
      marginRight: '5px'
    }

  },
  fileUploadUrl: (process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev) + config.uploadFileUrl,
  fileDownloadUrl: (process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev) + config.downloadFileUrl
}
