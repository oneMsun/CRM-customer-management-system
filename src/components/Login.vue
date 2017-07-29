<template>
  <div class="Login" id="Login">
    <canvas id="canvas" class="canvas"></canvas>
    <!-- <router-link to="/Home">登录</router-link> -->
    <p class="cR">copyRight@crm客户管理系统 版本归宋文鑫所有</p>
    <p class="cr_logo_text">CRM客户管理系统</p>
    <div class="Login_box">
      <img src="../assets/login.gif" alt="" class="logo ">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px">
      <el-form-item prop="account" class="input-list top_1">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass" class="input-list top_2">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="input-list top_3">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
      <el-button type="primary" class="input-list top_4" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
  import { requestLogin } from '../api/api';
  // import NProgress from 'nprogress'
  // 开始设置默认账号密码，和对应的输入提示和焦点的位置
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: 'admin',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入用户', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
          ]
        },
        checked: true
      }
    },
    methods: {
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            // NProgress.start();
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
            requestLogin(loginParams).then(data => {
              this.logining = false;
              // NProgress.done();
              let { msg, code, user } = data;
              if (code !== 200) {
                this.$notify({
                  title: '错误',
                  message: msg,
                  type: 'error'
                });
              } else {
                localStorage.setItem('user', JSON.stringify(user));
                if (this.$route.query.redirect) {
                  this.$router.push({ path: this.$route.query.redirect });
                } else {
                  this.$router.push({ path: '/Welcome' });
                }
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    mounted() {
		var canvas = document.querySelector('canvas'),
		ctx = canvas.getContext('2d')
    var w,h;
    window.onresize = function(){
      w = canvas.width = window.innerWidth;
  		h = canvas.height = window.innerHeight;
    }
    window.onresize();
		ctx.lineWidth = .3;
		ctx.strokeStyle = (new Color(150)).style;
		var mousePosition = {
			x:  w,
			y:  h
		};
		var dots = {
			nb: 250,
			distance: 100,
			d_radius: 150,
			array: []
		};
		function colorValue(min) {
			return Math.floor(Math.random() * 255 + min);
		}
		function createColorStyle(r,g,b) {
			return 'rgba(' + r + ',' + g + ',' + b + ', 0.5)';
		}
		function mixComponents(comp1, weight1, comp2, weight2) {
			return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
		}
		function averageColorStyles(dot1, dot2) {
			var color1 = dot1.color,
			color2 = dot2.color;
			var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
			g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
			b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
			return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
		}
		function Color(min) {
			min = min || 0;
			this.r = 255;
			this.g = 255;
			this.b = 255;
			this.style = createColorStyle(this.r, this.g, this.b);
		}
		function Dot(){
			this.x = Math.random() * w;
			this.y = Math.random() * h;
			this.vx = -.5 + Math.random();
			this.vy = -.5 + Math.random();
			this.radius = Math.random() * 2;
			this.color = new Color();
		}
		Dot.prototype = {
			draw: function(){
				ctx.beginPath();
				ctx.fillStyle = this.color.style;
				ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
				ctx.fill();
			}
		};
		function createDots(){
			for(var i = 0; i < dots.nb; i++){
				dots.array.push(new Dot());
			}
		}
		function moveDots() {
			for(var i = 0; i < dots.nb; i++){

				var dot = dots.array[i];

				if(dot.y < 0 || dot.y > canvas.height){
					dot.vx = dot.vx;
					dot.vy = - dot.vy;
				}
				else if(dot.x < 0 || dot.x > canvas.width){
					dot.vx = - dot.vx;
					dot.vy = dot.vy;
				}
				dot.x += dot.vx;
				dot.y += dot.vy;
			}
		}
		function connectDots() {
			for(var i = 0; i < dots.nb; i++){
				for(var j = 0; j < dots.nb; j++){
					var i_dot = dots.array[i];
					var j_dot = dots.array[j];

					if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
						if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
							ctx.beginPath();
							ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
							ctx.moveTo(i_dot.x, i_dot.y);
							ctx.lineTo(j_dot.x, j_dot.y);
							ctx.stroke();
							ctx.closePath();
						}
					}
				}
			}
		}
		function drawDots() {
			for(var i = 0; i < dots.nb; i++){
				var dot = dots.array[i];
				dot.draw();
			}
		}
		function animateDots() {
			ctx.clearRect(0, 0, w, h);
			moveDots();
			connectDots();
			drawDots();

			requestAnimationFrame(animateDots);
		}

		//----------------------跟着鼠标动--------------------
		document.getElementById('Login').addEventListener('mousemove', function(e){
			mousePosition.x = e.pageX;
			mousePosition.y = e.pageY;
		});

		document.getElementById('Login').addEventListener('mouseleave', function(e){
			mousePosition.x = canvas.width / 2;
			mousePosition.y = canvas.height / 2;
		});
		//----------------------跟着鼠标动--------------------
		createDots();
		requestAnimationFrame(animateDots);
	}
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #canvas{
    padding: 0;
    margin:0;
    width: 100%;
    height: 90%;
    overflow: hidden;
  }
  .Login{
    padding: 0;
    width: 100%;
    height: 100%;
    /*background-color: #58B7FF;*/
    background: -webkit-linear-gradient(left top, #25ad9f, #4b9bfa);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .Login_box{
    width: 30%;
    height: 400px;
    border-radius: 10px;
    background: rgba(255,255,255, 0.95);
    position: absolute;
    left:35%;
    top: 120px;
  }
  .logo{
    width:80px;
    height: 80px;
    border-radius: 80px;
    position: absolute;
    left: calc(50% - 40px);
    top:30px;
  }
  .input-list{
    width: 70%;
    /*height: 30px;*/
    position: absolute;
    left:15%;
  }
  .top_1{
    top: 150px;
  }
  .top_2{
    top: 200px;
  }
  .top_3{
    top: 250px;
  }
  .top_4{
    top: 290px;
  }
  .login_btn{
    width: 70%;
    position: absolute;
    left:15%;
    text-align: center;
    text-decoration: none;
    background-color: red;
    padding:8px 0px;
    color:#fff;
    border-radius: 5px;
  }
  .cR{
    color:#fff;
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 12px;
    opacity: 0.3
  }
  .cr_logo_text{
    position: absolute;
    top: 40px;
    width: 390px;
    left: calc(50% - 195px);
    text-align: center;
    font-size: 30px;
    color: #fff;
  }

</style>
