let getConstLabel = function (key, constList) {
  let selecedItem = constList.find(item => item.key === key)
  if (selecedItem) {
    return selecedItem.label
  } else {
    return ''
  }
}

export default { getConstLabel }
