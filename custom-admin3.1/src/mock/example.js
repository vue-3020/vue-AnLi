import Mock from 'mockjs'
import {
  doCustomTimes,
  getParams
} from '@/utils'
const Random = Mock.Random

let List = []
const count = 26
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    gender: Mock.Random.integer(0, 1),
    createTime: Mock.Random.datetime(),
    image: Mock.Random.image()
  }))
}

export const fetchPages = req => {
  const {
    name,
    city,
    gender,
    page = 1,
    pageSize = 10,
    sort
  } = JSON.parse(req.body)
  let mockList = List.filter(query => {
    if (name && query.name.indexOf(name) === -1) return false
    return true
  })
  mockList = mockList.filter(query => {
    if (city && query.address.indexOf(city) === -1) return false
    return true
  })

  mockList = mockList.filter(query => {
    // if (gender) {
    //   if (query.gender !== gender) {
    //     return false
    //   } else return true
    // } else { return true }

    if (gender !== undefined && query.gender !== gender) return false
    return true
  })
  if (sort) {
    mockList = mockList.sort((first, next) => {
      if (sort.isDesc) {
        if (first[sort.key] > next[sort.key]) return true
        else return false
      } else {
        if (first[sort.key] > next[sort.key]) return false
        else return true
      }
    })
  }
  const pageList = mockList.filter((item, index) => index < pageSize * page && index >= pageSize * (page - 1))
  return {
    code: 0,
    data: {
      total: mockList.length,
      list: pageList
    }
  }
}

export const fetchList = req => {
  return {
    code: 0,
    data: List
  }
}

export const fetchApp = req => {
  let params = getParams(req.url)
  let selectedApp = List.find(item => item.id === params.id)
  return {
    code: 0,
    data: selectedApp
  }
}

export const addApp = req => {
  let newapp = JSON.parse(req.body)
  newapp.id = Mock.Random.guid()
  List.push({
    id: Mock.Random.guid(),
    name: newapp.name,
    address: newapp.address,
    gender: newapp.gender,
    createTime: newapp.createTime
  })
  return {
    code: 0,
    data: List
  }
}

export const updateApp = req => {
  let editapp = JSON.parse(req.body)
  List = List.map(function (item) {
    if (item.id === editapp.id) {
      return {
        id: editapp.id,
        name: editapp.name,
        address: editapp.address,
        gender: editapp.gender,
        createTime: editapp.createTime
      }
    } else {
      return item
    }
  })

  return {
    code: 0,
    data: List
  }
}

export const deleteApp = req => {
  let id = req.body
  List = List.filter(element => {
    return element.id !== id
  })
  return {
    code: 0,
    data: {
      total: List.length,
      list: List
    }
  }
}

export const getDragList = req => {
  let dragList = []
  doCustomTimes(5, () => {
    dragList.push(Mock.mock({
      name: Random.csentence(10, 13),
      id: Random.increment(10)
    }))
  })
  return dragList
}

export const fetchCities = req => {
  let cities = [{
      key: '110000',
      label: '北京市'
    },
    {
      key: '120000',
      label: '天津市'
    },
    {
      key: '130000',
      label: '河北省'
    },
    {
      key: '140000',
      label: '山西省'
    },
    {
      key: '150000',
      label: '内蒙古自治区'
    },
    {
      key: '210000',
      label: '辽宁省'
    },
    {
      key: '220000',
      label: '吉林省'
    },
    {
      key: '230000',
      label: '黑龙江省'
    },
    {
      key: '310000',
      label: '上海市'
    },
    {
      key: '320000',
      label: '江苏省'
    },
    {
      key: '330000',
      label: '浙江省'
    },
    {
      key: '340000',
      label: '安徽省'
    },
    {
      key: '350000',
      label: '福建省'
    },
    {
      key: '360000',
      label: '江西省'
    },
    {
      key: '370000',
      label: '山东省'
    },
    {
      key: '410000',
      label: '河南省'
    },
    {
      key: '420000',
      label: '湖北省'
    },
    {
      key: '430000',
      label: '湖南省'
    },
    {
      key: '440000',
      label: '广东省'
    },
    {
      key: '450000',
      label: '广西壮族自治区'
    },
    {
      key: '460000',
      label: '海南省'
    },
    {
      key: '500000',
      label: '重庆市'
    },
    {
      key: '510000',
      label: '四川省'
    },
    {
      key: '520000',
      label: '贵州省'
    },
    {
      key: '530000',
      label: '云南省'
    },
    {
      key: '540000',
      label: '西藏自治区'
    },
    {
      key: '610000',
      label: '陕西省'
    },
    {
      key: '620000',
      label: '甘肃省'
    },
    {
      key: '630000',
      label: '青海省'
    },
    {
      key: '640000',
      label: '宁夏回族自治区'
    },
    {
      key: '650000',
      label: '新疆维吾尔自治区'
    },
    {
      key: '710000',
      label: '台湾省'
    },
    {
      key: '810000',
      label: '香港特别行政区'
    },
    {
      key: '820000',
      label: '澳门特别行政区'
    }
  ]

  return {
    code: 0,
    data: cities

  }
}


export const footerData = req => {
  let dataList = []
  const count = 16
  for (let i = 0; i < count; i++) {
    dataList.push(Mock.mock({
      id: Mock.Random.guid(),
      text: Mock.Random.ctitle(),
      text2: '皮蛋瘦肉粥',
      price:10,
      count:0,
      time: Mock.Random.date('yyyy-MM-dd'),
      imgSrc: Mock.Random.image('200x100'),
    }))
  }
  return {
    code: 0,
    data: dataList
  }
}

export const uploadFile = req => {
  // let file = JSON.parse(req.body)
  let formdata = req.body
  let files = []
  formdata.forEach(item => {
    files.push(item)
  })
  return {
    code: 0,
    data: {
      attId: Mock.Random.guid(),
      attName: files[0].name,
      attType: files[0].type,
      attSize: files[0].size,
      attPath: ''
    }
  }
}

export const removeFile = req => {
  // let file = JSON.parse(req.body)
  return {
    code: 0,
    data: ''
  }
}