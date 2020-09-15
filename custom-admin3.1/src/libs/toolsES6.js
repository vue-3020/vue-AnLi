//求并集 数组对象去重
export const doubleUnique = (arr, attr, flag = false) => {
  
  let obj = {}
  debugger
  if (flag) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 1; j < arr.length; j++) {
        arr[i] = arr[i][attr] == arr[j][attr] ? arr[j] : arr[i]; //如果两个数组相等， 需要后面覆盖前面的
      }
    };
  }
  let res = arr.reduce((cur, next) => {
    obj[next[attr]] ? "" : obj[next[attr]] = true && cur.push(next)
    return cur
  }, [])
  return res
}
//求差集  第一个数组，和第二部数组 不重叠的部分，保留A的部分
export const diff = (arr, arr2, attr) => {
  let res = arr.filter(item => {
    let listCon = arr2.map(v => v[attr])
    return !listCon.includes(item[attr])
  })
  return res
}

//求重叠部分
export const overlap = (arr, arr2, attr) => {
  let res = arr.filter(item => {
    let listCon = arr2.map(v => v[attr])
    return listCon.includes(item[attr])
  })
  return res
}

//求补集
export const complement = (arr, arr2, attr) => {
  let res = arr2.filter(item => {
    let listCon = arr.map(v => v[attr])
    return !listCon.includes(item[attr])
  })
  return res
}

// 数组删除左右中括号，
export const deleteBracket = (arr) => {
  return arr.toString()
}

//判断数据类型
export const getType = (obj) => {
  let type = typeof obj;
  if (type != "object") {
    return type;
  }
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
}


//数组对象降序删除 只有在大数据量的情况下，删除同一个数组才会出问题
export const deleteDescendingOrder = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i].id === arr[i].uid) {
      arr.splice(i, 1)
    }
  }
  return arr
}

//查询对象是否包含这个属性
export const judgeAttr = (obj, attr) => {
  return obj.hasOwnProperty(attr)
}

//删除所有空格
export const trimAll = (str) => {
  return str.replace(/\s+/g, "")
}

//深拷贝
export const filesCopy = (files) => {
  return JSON.parse(JSON.stringify(files))
}

//对象转换为年月日时分秒
export const getMonthDays = (timeStamp) => {
  let year = new Date(timeStamp).getFullYear();
  let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
  let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
  let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
  let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
  let ss = new Date(timeStamp).getSeconds() < 10 ? "0" + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds();
  let dateString = `${year}-${month}-${date} ${hh}:${mm}:${ss}`;
  return dateString
}