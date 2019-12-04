<template>
  <Modal
    :title="modal.title"
    v-model="modal.isvisible"
    :mask-closable="false"
    class-name="vertical-center-modal"
  >
    <Form ref="exampleForm" :model="exampleForm" :rules="ruleValidate" :label-width="120">
      <FormItem label="姓名" prop="name">
        <Input :disabled="isView" v-model="exampleForm.name" placeholder="请输入姓名"></Input>
      </FormItem>
      <FormItem label="性别" prop="gender">
        <RadioGroup v-model="exampleForm.gender" type="button">
          <Radio
            :disabled="isView"
            v-for="item in $appConst.enum.user_gender"
            :key="item.key"
            :label="item.key"
          >{{item.label}}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="地址">
        <Input :disabled="isView" v-model="exampleForm.address" placeholder="请输入地址"></Input>
      </FormItem>
      <FormItem label="创建时间" prop="createTime">
        <DatePicker
          :disabled="isView"
          type="date"
          placeholder="请选择时间"
          v-model="exampleForm.createTime"
        ></DatePicker>
      </FormItem>
    </Form>
    <div slot="footer">
      <template v-if="isView">
        <Button @click="handelUnvisible" class="btn-group">返回</Button>
      </template>
      <template v-else>
        <Button type="primary" @click="handleSubmit">提交</Button>
        <Button @click="handleReset" class="btn-group">重置</Button>
        <Button @click="handelUnvisible" class="btn-group">取消</Button>
      </template>
    </div>
  </Modal>
</template>
<script>
import { addApp, updateApp, fetchApp } from '@/api/example'
export default {
  props: ['modal'],
  data () {
    return {
      exampleForm: {
        id: '',
        name: null,
        gender: null,
        address: null,
        createTime: null
      },
      ruleValidate: {
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        gender: [{ required: true, type: 'integer', message: '性别不能为空', trigger: 'blur' }],
        createTime: [{ required: true, type: 'date', message: '请选择时间', trigger: 'blur' }]
      },
      isView: false
    }
  },

  methods: {
    handleSubmit () {
      let _this = this
      this.$refs.exampleForm.validate((valid) => {
        // this.$Message.success('Success!')
        if (!valid) {
          return false
        }
        if (_this.modal.actionType === this.$appConst.ACTION_TYPE.CREATE) {
          addApp(_this.exampleForm).then(res => {
            _this.$router.push({ path: 'list' })
            _this.handelUnvisible()
          })
        } else if (_this.modal.actionType === this.$appConst.ACTION_TYPE.EDIT) {
          updateApp(_this.exampleForm).then(res => {
            _this.$router.push({ path: 'list' })
            _this.handelUnvisible()
          })
        }
      })
    },
    handleReset () {
      this.$refs.exampleForm.resetFields()
    },
    handelUnvisible () {
      this.modal.isvisible = false
    },
    initExample () {
      if (this.modal.actionType === this.$appConst.ACTION_TYPE.VIEW) {
        this.isView = true
      } else {
        this.isView = false
      }
      if (this.modal.actionType !== this.$appConst.ACTION_TYPE.CREATE) {
        fetchApp(this.modal.id).then(res => {
          this.exampleForm = res.data
        })
      }
    }
  },
  computed: {
  }
}
</script>
