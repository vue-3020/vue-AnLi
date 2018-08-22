<template>
  <div>
    <div>
      <ul>
        <li>
          filter的使用，
        </li>
      </ul>
    </div>
    <ul>
      <li v-for='(key, user) in userList' :key='key' :class='{"man": $options.filters.isMan(item)}'>用户id是：{{user.id}}, 姓名是{{user.name}}，性别是： {{user.sex}}，</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [
        {
          id: 001,
          name: '张三',
          sex: '男'
        },
        {
          id: 002,
          name: '李四',
          sex: '男'
        },
        {
          id: 003,
          name: '王五',
          sex: '女'
        }
      ]
    };
  },
  filters: {
    isMan(item) {
      return item.sex === '男' ? true : false
    }
  },
  computed: {

  },
  created() {

  },
  mounted() {

  }
};
</script>


<style scoped>
.man {
  background: #e5e5e5;
}
</style>
