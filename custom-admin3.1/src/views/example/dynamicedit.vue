<template>
  <Card>
    <Form ref="formDynamic" :model="formDynamic" :rules="rules" :label-width="120">
      <FormItem label="姓名" prop="name">
        <Input v-model="formDynamic.name" placeholder="请输入姓名"></Input>
      </FormItem>
      <div class="dynamic-rows-container ivu-card ivu-card-bordered">
        <div class="dynamick-rows-header">
          <Row :gutter="16">
            <Col span="6">
              <span class="form-item-required">学校名称</span>
            </Col>
            <Col span="6">
              <span>起止时间</span>
            </Col>
            <Col span="4">
              <span class="form-item-required">联系人</span>
            </Col>
            <Col span="4">
              <span class="form-item-required">联系方式</span>
            </Col>
            <Col span="4">
              <span>操作</span>
            </Col>
          </Row>
        </div>
        <div class="dynamic-rows-body">
          <div
            v-for="(job,index) in formDynamic.jobs"
            :key="index"
            :class="'dynamic-row-'+job.rIndex"
          >
            <Row :gutter="16">
              <Col span="6">
                <div>
                  <FormItem :rules="rules.schoolNames" :prop="'jobs.'+index+'.schoolName'">
                    <Input v-model="job.schoolName" placeholder="请输入学校名称"></Input>
                  </FormItem>
                </div>
              </Col>
              <Col span="6">
                <div>
                  <FormItem>
                    <DatePicker
                      type="daterange"
                      v-model="job.datetimes"
                      format="yyyy-MM-dd"
                      placement="bottom-end"
                      placeholder="请选择时间"
                    ></DatePicker>
                  </FormItem>
                </div>
              </Col>
              <Col span="4">
                <div>
                  <FormItem :rules="rules.contactPersons" :prop="'jobs.'+index+'.contactPerson'">
                    <Input v-model="job.contactPerson" placeholder="请输入联系人"></Input>
                  </FormItem>
                </div>
              </Col>
              <Col span="4">
                <div>
                  <FormItem :rules="rules.phones" :prop="'jobs.'+index+'.phone'">
                    <Input v-model="job.phone" placeholder="请输入联系方式"></Input>
                  </FormItem>
                </div>
              </Col>
              <Col span="4">
                <div class="dynamick-rows-btns">
                  <Icon type="ios-close-circle-outline" size="26" @click="handleRemove(job)"/>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <Row>
          <Col span="24">
            <Button type="dashed" long @click="handleAdd" icon="md-add">添加</Button>
          </Col>
        </Row>
      </div>
      <Row :gutter="16">
        <Col :span="24">
          <FormItem class="form-right-group">
            <Button @click="handleReset" class="form-action-btn">重置</Button>
            <Button type="primary" class="form-action-btn" @click="handleSubmit">提交</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Card>
</template>
<script>
import Vue from 'vue'
export default {
  data () {
    return {
      rowIndex: 1,
      formDynamic: {
        name: '',
        jobs: []
      },
      rules: {
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        schoolNames: [{ required: true, message: '学校名称不能为空', trigger: 'blur' }],
        contactPersons: [{ required: true, message: '联系人不能为空', trigger: 'blur' }],
        phones: [{ required: true, message: '联系方式不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      let _this = this
      this.$refs.formDynamic.validate((valid) => {
        if (valid) {
          console.log(_this.formDynamic)
          _this.formDynamic.jobs.forEach(el => {
            let moment = Vue.filter('moment')
            el.startDate = moment(el.datetimes[0], 'YYYY-MM-DD')
            el.endDate = moment(el.datetimes[1], 'YYYY-MM-DD')
          })
          console.log(_this.formDynamic)
          _this.$Message.success('提交成功!')
        } else {
          _this.$Message.error('表单验证失败!')
        }
      })
    },
    handleReset (name) {
      this.$refs.formDynamic.resetFields()
    },
    handleAdd () {
      let _this = this
      _this.formDynamic.jobs.push({ rIndex: _this.rowIndex, schoolName: '', datetimes: null, contactPerson: '', phone: '' })
      setTimeout(function () { // form样式有个label 120px的宽度去掉
        Array.from(_this.$('.dynamic-row-' + _this.rowIndex + ' .ivu-form-item-content')).forEach(el => {
          _this.$(el).css('margin-left', '0px')
          console.log(_this.$(el))
        })
        _this.rowIndex++
      }, 0)
    },
    handleRemove (job) {
      let _this = this
      _this.$Modal.confirm({
        title: '确认删除？',
        onOk: () => {
          _this.formDynamic.jobs.splice(_this.formDynamic.jobs.indexOf(job), 1)
        }
      })
    }
  },
  mounted () {
    if (this.$route.query) {
      this.formDynamic.name = this.$route.query.name
    }
  }
}
</script>
<style lang="less">
</style>
