<template>
  <Row>
    <i-col span="16">
      <Row v-for="i in (customIconList.length / 3)" :key="`custom-icon-row-${i}`">
        <i-col
          span="8"
          v-for="item in customIconList.slice((i - 1) * 3, i * 3)"
          :key="`custom-icon-${item}`"
        >
          <Card style="margin: 0 5px 5px; text-align: center;">
            <Icons :size="30" :type="'icon-'+item"/>
            <p>&lt;CommonIcon :size="30" type="{{ item }}" &gt;</p>
          </Card>
        </i-col>
      </Row>
      <Row>
        <i-col>
          <Card style="margin: 0 5px 5px; text-align: center;">
            <CommonIcon :size="30" type="icon-meh"/>
            <p class="icon-code">自定义图标</p>
            <p>&lt;Icons :size="30" type="icon-meh" &gt;</p>
            <p>&lt;CommonIcon :size="30" type="icon-meh" &gt;</p>
          </Card>
        </i-col>
      </Row>
    </i-col>
    <i-col span="8">
      <Card>
        <p class="intro-p">Icons组件支持自定义图标的显示，如果是自定义图标则带前缀icon-。</p>
        <p class="intro-p">CommonIcon组件同时支持iView内置图标类型和自定义图标类型，为了区别这两种类型，如果是自定义图标则带前缀icon-</p>
      </Card>
    </i-col>
  </Row>
</template>

<script>
import Icons from '@/components/icons'
import CommonIcon from '@/components/common-icon'
export default {
  name: 'icons_pages',
  components: {
    Icons,
    CommonIcon
  },
  data () {
    return {
      customIconList: [
        'woman',
        'man',
        'smile',
        'meh',
        'frown',
        'bear'
      ]
    }
  }
}
</script>

<style lang="less">
.icon-code {
  margin: 20px 0 10px;
}
.intro-p {
  margin-bottom: 10px;
}
</style>
