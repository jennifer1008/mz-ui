<template>
  <div>
    <MZButton type="primary" :round="true" @click="showPopup=true">打开popup</MZButton>
    <MZButton type="success" :plain="true" @click="showOverlay=true">打开Overlay</MZButton>
    <MZButton type="info" @click="show=true">打开picker</MZButton>
    <MZButton type="warning">警告按钮</MZButton>
    <MZButton type="danger">危险按钮</MZButton>
    <MZDialog type="dialog"></MZDialog>
    <MZPopup :show="showPopup" @closeDialog="showPopup=false"></MZPopup>
    <MZOverlay :show="showOverlay" @click="showOverlay=false"></MZOverlay>
    <!-- <MZPicker
      :show="true"
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
    ></MZPicker> -->
      <MZArea title="标题" :show="show" :value="areaValue" @confirm="onConfirm" @cancel="onCancel"/> 
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      areaValue:'110106',
      showPopup: false,
      showOverlay: false,
      columns: [
        // 第一列
        {
          values: ['周一', '周二', '周三', '周四', '周五'],
          defaultIndex: 2,
        },
        // 第二列
        {
          values: ['上午', '下午', '晚上'],
          defaultIndex: 1,
        },
      ],
    }
  },
  mounted() {
    // console.log(this.$loading)
    // this.$loading.Show({
    //     message:'加载中。。。',
    //     // icon: 'mz-icon-tanhao',
    //     // img:'data:image/png;base64,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'
    // });
    // setTimeout(()=>{
    //     this.$loading.Hide()
    // },2000)
  },
  methods: {
    onConfirm(values, index) {
      console.log(values)
      console.log(`当前值：${values}, 当前索引：${index}`)
    },
    onChange(picker, value, index) {
      alert(`当前值：${value}, 当前索引：${index}`)
    },
    onCancel() {
      this.show = false
      alert('取消')
    }
  }
}
</script>