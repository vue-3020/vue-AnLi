<template>
  <div>
    <Row :gutter="16" v-for="(job,index) in jobs" :key="index">
      <Col span="6">
        <div>
          <FormItem :rules="jobsRule.schoolNames" :prop="'jobs.'+index+'.schoolName'">
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
          <FormItem :rules="jobsRule.contactPersons" :prop="'jobs.'+index+'.contactPerson'">
            <Input v-model="job.contactPerson" placeholder="请输入联系人"></Input>
          </FormItem>
        </div>
      </Col>
      <Col span="4">
        <div>
          <FormItem :rules="jobsRule.phones" :prop="'jobs.'+index+'.phone'">
            <Input v-model="job.phone" placeholder="请输入联系方式"></Input>
          </FormItem>
        </div>
      </Col>
      <Col span="4">
        <div>
          <i class @click="delJobs(job)" title="删除"></i>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  props: { jobs: Array },
  data () {
    return {
      jobsRule: {
        schoolNames: [{ required: true, message: '学校名称不能为空', trigger: 'blur' }],
        contactPersons: [{ required: true, type: 'number', message: '联系人不能为空', trigger: 'blur' }],
        phones: [{ required: true, type: 'number', message: '联系方式不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    delJobs (job) {
      let _this = this
      _this.$Modal.confirm({
        title: '确认删除？',
        onOk: () => {
          _this.jobs.splice(_this.jobs.indexOf(job), 1)
        }
      })
    }
  }
}
</script>
