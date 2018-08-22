<template>
    <div class="tags" v-if="showTags">
      <ul>
        <li class="tags-li" v-for="(item, index) in tagsList" :class="{'active':isActive(item.path)}" :key="index">
          <router-link :to="item.path" class="tags-li-title">{{item.title}}</router-link>
          <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
        </li>
      </ul>
      <!--右侧信息-->
      <div class="tags-close-box">
        <el-dropdown @command="handleTags">
          <el-button size="mini" type="primary">
            标签选项<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu size="small" slot="dropdown">
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          tagsList: []
        }
      },
      created() { //（4）调用一下 这个方法 让 setTags这个方法执行，执行后数组中就有默认值
        this.setTags(this.$route)
      },
      computed:{
        showTags(){ //（3）判断是不是空的 空的就隐藏
          return this.tagsList.length>0
        }
      },
      methods: {
        //（5）添加选中样式
        isActive(path){ //传递过来的内容，和当前路径相同的，添加样式
          return path === this.$route.path
        },
        closeTags(index){ //删除
          const delItem = this.tagsList.splice(index,1)[0];
          const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
          if (item) {
            delItem.path === this.$route.path && this.$router.push(item.path)
          } else {
            this.$router.push('/')
          }
        },
        setTags(route){ //（2）数组存内容
          const  isExist = this.tagsList.some(item=>{
                return item.path === route.path
          });
          !isExist &&
            this.tagsList.push({
              title:route.meta.title,
              path:route.path
            })
        },
        handleTags(command){ //
          command === 'other' ? this.closeOther() : this.closeAll()
        },
        closeAll(){ // 关闭全部标签
          this.tagsList = [];
          this.$router.push('/')
        },
        closeOther(){ // 关闭其他标签
          const curItem = this.tagsList.filter(item =>{ //过滤数组
            return item.path === this.$route.path; //当前路由等于选中路由
          })
          this.tagsList =curItem
        }
      },

      watch: { //（1）监听路由
        $route(newValue, oldValue) {
           this.setTags(newValue)
        }
      }
    }
</script>

<style scoped>
  .tags {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    overflow: hidden;
    background: #fff;
    padding-right: 120px;
  }

  .tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .tags-li {
    float: left;
    margin: 3px 5px 2px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
  }

  .tags-li:not(.active):hover {
    background: #f8f8f8;
  }

  .tags-li.active {
    color: #fff;
    border: 1px solid #409EFF;
    background-color: #409EFF;
  }

  .tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
  }

  .tags-li.active .tags-li-title {
    color: #fff;
  }

  .tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
</style>
