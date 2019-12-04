const btns = {

  show: (h, params, vm) => {
    return h('Button', {
      props: {
        size: 'small'
      },
      style: {
        marginRight: '2px'
      },
      on: {
        click: () => {
          vm.$emit('on-show', params.row)
        }
      }
    }, '查看')
  },
  edit: (h, params, vm) => {
    return h('Button', {
      props: {
        size: 'small'
      },
      style: {
        marginRight: '2px'
      },
      on: {
        click: () => {
          vm.$emit('on-edit', params.row)
        }
      }
    }, '编辑')
  },
  delete: (h, params, vm) => {
    return h('Poptip', {
      props: {
        confirm: true,
        title: '你确定要删除吗?'
      },
      on: {
        'on-ok': () => {
          vm.$emit('on-delete', params.row)
        }
      }
    }, [
      h('Button', {
        props: {
          size: 'small'
        },
        style: {
          marginRight: '2px'
        }
      }, '删除')
    ])
  }
}

export default btns
