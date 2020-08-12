<template>
  <div class="hello" ref="container">
    <img id="avatar" width="100%" height="100%" style="display:none" alt="">
    <!-- <canvas id="canvas"></canvas> -->
    <h1>{{ msg }}</h1>
    <input
      ref="imageInput"
      type="file"
      accept="image/*"
      @change="getImage($event)"
    />
    <img ref="uplodeImg" src width="100px" alt="">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAcCAYAAACZOmSXAAACrElEQVRIS72WS2xMcRTGf990qqKaYCUqIhHPms7MbYs2RCmpVyIshAVCE2EhVt1L7CwtLIQFC0REgkRFiApNPTqP20Y8IkSISmw0lFRn5sg0aId2+p9G+1/e+93v952bc869YgzHni8so2/qRcxqkJoVjp0dgw0ay0Pmexcwdv56tp8AtaqMxwr1KhhufnUTljmdAxLP6C2pUl3790ICFAS3Lm8xaTqAKf9ApBMKx46MC9zezJ1Mz4zHQGhYgMiQtkZ5iduuAZwrNz96EtOh/Mb2HrOQosnPLgGc4JaMHkQ6iTk0qNkNur9s16ZXfaMFyAu3pzUzSaWOgZqcwL9pGuiLwwrHH+YLkAO3jqpigiwH1mLWgKgFikerYMT70kvM7iJrJRhsVcWTj0O1ss7QdDLBfaD1wCqgdMyw/GUa8ALUijLXCCVuypJedjl44wLMZxrggMz3nmEsmnA4gSZZZ81qMulbwKQJDHCJcHzXQMNZV3Q/aZ2ZELhooV9bVR3r/9Pt5nvHMZrHOcADUmpUdexbljMIP0qAbVVXMNs6PgGUIMUaVcd6BtfBEJL5laVY8SOwiv8c4DUZWyEv8Slnzv+GmB9twOT8cXAKWaRGhWLZps45w65XS0bfgWY7GY8u6lYkPms42QhwrwXYMLqvi8LaFEmsLAR+HdjiYu2g8RWJRwqB/8fK+aBIvLwQeLbhGhyqcpH8UCRe4g73vVaM1S7OTpoyTdO8wfkeds5/X7RktA1U52TsIgoyX0vjr1xH7RFo2Qi+vciuEuAhaXqBcqSNwIoR/3YCVqfKRLsj3LsPDI6HLIPpHgHOUdR3WRVPv/6znJLhBahoDxl2I+bkbhNbp3Dijit8B3AK6AY7zyTOaUnircsbtoFvhFcP2gu2GXgDqXqFO7NvKef8BGGV5+nJl+6VAAAAAElFTkSuQmCC" width="100" alt="">
    <p>
      For a guide and recipes on how to configure customize this project,  check out the
    </p>
    <p>configure customize this project,</p>
    <p> check out the</p>
    <button @click="saveImg">下载为图片</button>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import vetDetailFixedBg from '../assets/vetDetailFixedBg.jpg';
// import logo from '../assets/logo.png';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      img:'',
      file: '',
      imgUrl: ''
    }
  },
  mounted() {
    // this.$nextTick(()=>{
    //   this.saveImg()
    // })
  },
  methods: {
    drawAndShareImage() {
      const dom = this.$refs.container
      var canvas = document.createElement('canvas')
      // var canvas = document.getElementById('canvas')
      let { width, height } = dom.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      var context = canvas.getContext('2d')
      context.rect(0, 0, canvas.width, canvas.height)
      context.fillStyle = '#fff'
      context.fill()
      var myImage = new Image()
      myImage.src = vetDetailFixedBg //背景图片 你自己本地的图片或者在线图片
      myImage.crossOrigin = 'Anonymous'
      myImage.onload = function() {
        context.drawImage(myImage, 0, 0, width, height)
        context.font = '20px Courier New'
        context.fillText('我是文字', 100, 100)
        var myImage2 = new Image()
        myImage2.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAcCAYAAACZOmSXAAACrElEQVRIS72WS2xMcRTGf990qqKaYCUqIhHPms7MbYs2RCmpVyIshAVCE2EhVt1L7CwtLIQFC0REgkRFiApNPTqP20Y8IkSISmw0lFRn5sg0aId2+p9G+1/e+93v952bc869YgzHni8so2/qRcxqkJoVjp0dgw0ay0Pmexcwdv56tp8AtaqMxwr1KhhufnUTljmdAxLP6C2pUl3790ICFAS3Lm8xaTqAKf9ApBMKx46MC9zezJ1Mz4zHQGhYgMiQtkZ5iduuAZwrNz96EtOh/Mb2HrOQosnPLgGc4JaMHkQ6iTk0qNkNur9s16ZXfaMFyAu3pzUzSaWOgZqcwL9pGuiLwwrHH+YLkAO3jqpigiwH1mLWgKgFikerYMT70kvM7iJrJRhsVcWTj0O1ss7QdDLBfaD1wCqgdMyw/GUa8ALUijLXCCVuypJedjl44wLMZxrggMz3nmEsmnA4gSZZZ81qMulbwKQJDHCJcHzXQMNZV3Q/aZ2ZELhooV9bVR3r/9Pt5nvHMZrHOcADUmpUdexbljMIP0qAbVVXMNs6PgGUIMUaVcd6BtfBEJL5laVY8SOwiv8c4DUZWyEv8Slnzv+GmB9twOT8cXAKWaRGhWLZps45w65XS0bfgWY7GY8u6lYkPms42QhwrwXYMLqvi8LaFEmsLAR+HdjiYu2g8RWJRwqB/8fK+aBIvLwQeLbhGhyqcpH8UCRe4g73vVaM1S7OTpoyTdO8wfkeds5/X7RktA1U52TsIgoyX0vjr1xH7RFo2Qi+vciuEuAhaXqBcqSNwIoR/3YCVqfKRLsj3LsPDI6HLIPpHgHOUdR3WRVPv/6znJLhBahoDxl2I+bkbhNbp3Dijit8B3AK6AY7zyTOaUnircsbtoFvhFcP2gu2GXgDqXqFO7NvKef8BGGV5+nJl+6VAAAAAElFTkSuQmCC' //你自己本地的图片或者在线图片
        myImage2.crossOrigin = 'Anonymous'
        myImage2.onload = function() {
          context.drawImage(myImage2, width/2-45,150, 90, 90);
          // context.drawImage(myImage2, width/2, 300, 90, 90)
          var base64 = canvas.toDataURL('image/png') //"image/png" 这里注意一下
          var img = document.getElementById('avatar')
          console.log(base64)
          img.setAttribute('src', base64)
        }
      }
    },
    saveImg() {
      // 获取想要转换的 DOM 节点
      const dom = this.$refs.container
      // DOM 节点计算后宽高
      let { width, height } = dom.getBoundingClientRect()
      // 获取像素比
      console.log(width, height)
      const dpr = window.devicePixelRatio || 1
      // 创建自定义 canvas 元素
      const canvas = document.createElement('canvas')
      console.log(canvas)
      // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
      canvas.width = width * dpr
      canvas.height = width * dpr
      // 设定 canvas css宽高为 DOM 节点宽高
      canvas.style.width = `${width * dpr}px`
      canvas.style.height = `${height * dpr}px`
      // 获取画笔
      const context = canvas.getContext('2d')
      // 将所有绘制内容放大像素比倍,解决dpr不同图片模糊问题
      context.scale(dpr, dpr)
      let opts = {
        scale: dpr, // 添加的scale 参数
        canvas: canvas, //自定义 canvas
        logging: false, //日志开关，便于查看html2canvas的内部执行流程
        width: width, //dom 原始宽度
        height: height,
        useCORS: true // 【重要】开启跨域配置
      }
      console.log(1)
      // 将自定义 canvas 作为配置项传入，开始绘制
      html2canvas(dom, opts).then(canvas => {
        console.log(2)
        let dataUrl = canvas.toDataURL('image/png', 1.0)
        // let parent = dom.parentNode
        var img = document.getElementById('avatar')
        console.log(dataUrl)
        img.setAttribute('src', dataUrl)
        img.style.display = 'block'
        // parent.innerHTML = `<img src="${dataUrl}" style="width: 100%">`
      }).catch((err)=>{
        console.log(3)
        console.log(err)
      })
    },
    getImage(){
      this.file = event.target.files[0]
      let maxImgSizeOfB = 5242880
      if (this.file.size > maxImgSizeOfB) {
          return alert('图片大小不能超过5M哦')
      }
      // const item = {
      //     name: this.file.name,
      //     size: this.file.size,
      //     file: this.file
      // }
      const reader = new FileReader()
      let that = this
      reader.onload = (e) => {
          // this.$set(item, 'src', e.target.result)
          console.log(that.$refs.uplodeImg.src)
          that.$refs.uplodeImg.src = e.target.result
          that.$refs.imageInput.style.display = 'none'
          // that.imgUrl = e.target.result
          that.saveImg()
      }
      reader.readAsDataURL(this.file)
      // this.f = item
      // this.$refs.imageInput.style.display = 'none'
      // this.$nextTick(()=>{
      //   this.saveImg()
      // })
      // this.saveImg()
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  width: 100vw;
  height: 100vh;
  /* background: url('../assets/vetDetailFixedBg.png') no-repeat; */
}
p{
  width: 100%;
}
/* canvas{
  border: 1px solid #000;
} */
</style>
