function a(str){
	console.log(str)
}
function Gobang(num,size){
	this.num=num;//每行棋子数量
	this.size=size;//棋盘尺寸
	this.chessboard;//棋盘
	this.chessArr=[];//放棋子的数组
	this.isover=false;  //判断游戏是否结束
	this.back=[];  //保存每次点击的对象
	this.nowtime=0;//思考计时
	this.ktime;//定时器

}
Gobang.prototype={
	// 开始游戏
	start:function(){
		this.box();
		this.chess();
		this.play();
		this.win();
		// this.gettime()
	},
	// 棋盘
	box:function(){
		this.chessboard=$("<div class='bigbox'>");
		this.chessboard.css({
			width:this.size+this.num*2,
			height:this.size+this.num*2,
			border:'1px solid #F24379'
		}).appendTo($('.box'))
	},
	// 棋子
	chess:function(){
		for(var i=0;i<(this.num*this.num);i++){
			var circle=$("<div>").css({
				width:(this.size/this.num),
				height:(this.size/this.num),
				float:'left',
				border:'1px solid red',
				borderRadius:'50%',
				opacity:0,
				animation:"move 0.3s ease "+(i*0.05)+"s 1 forwards"
			}).appendTo(this.chessboard);
			this.chessArr.push(circle);
		}			
	},
	// 如何赢
	win:function(){
		// var arr1=[];
		var winArr=[];
		for(var i=0;i<this.num;i++){
			winArr[i]=[]
			for(var j=0;j<this.num;j++){
				var n=(this.num*i)+j;
				winArr[i][j]=this.chessArr[n];
			}
		}
		
	},
	// 计时
	gettime:function(){
		var that=this;
		var time=this.nowtime;
		$(".time").html(time+"秒");
		this.ktime=setInterval(function(){
			time++;
			if(time<60){
				$(".time").html(time+"秒");
			}else{
				$(".time").html(parseInt(time/60)+"分"+time%60+"秒");
			}
			
		},1000);
		
	},
	// 开战
	play:function(){
		var that=this;
		var ying=[];
		var sbox=[];
		var onOff=true;//用于切换棋子

		$(".bigbox div").each(function(i){
			sbox.push(0);	//每个棋子对应一个 0 ，为了判断棋子颜色
			this.istap=true;//开关，实现点击每个棋子后再次点击该棋无效
		});

		$(".btn").on("click",function(){	//点击帮助按钮
			$(".help").css({
				display:"block",
				left:($(window).width()-$(".help").width())/2,
				top:($(window).height()-$(".help").height())/2
			});
			$(".base").show();
		});		

		$(".cfim").on("click",function(){ 	//点击确定
			$(".help").hide();
			$(".base").hide()
		});
		Gobang.gettime();
		$(".bigbox div").on("click",function(){	//点击棋子

			if(that.ktime){		//计算思考时间
				clearInterval(that.ktime);
				Gobang.gettime();
			}else{
				Gobang.gettime();
			}
			
			if(that.isover)return;
			if(!this.istap)return;
				if(onOff){
					$(this).addClass("white");
					sbox.splice($(this).index(),1,1);
					onOff=false;
					$(".tit").text("请红子出棋");
						this.istap=false;
					// a(sbox)
					
				}else{
					$(this).addClass("black");
					sbox.splice($(this).index(),1,2);
					onOff=true;
					$(".tit").text("请白子出棋");
						this.istap=false;
					// a(sbox)
				}
				
			
			//	记录下每个点击事件
			for(var i=0;i<that.num;i++){
				ying[i]=[];
				for(var j=0;j<that.num;j++){
					var m=(i*that.num)+j;
					ying[i][j]=sbox[m];
				}
			}
			// a(ying)
			
			var pos={x:parseInt($(this).index()/10),y:$(this).index()%10};
			that.back.unshift($(this));  //保存点击后的对象
			//以下是通过八个方向判断输赢
			if(pos.y<=5){
				if(ying[pos.x][pos.y]==1&&ying[pos.x][pos.y+1]==1&&ying[pos.x][pos.y+2]==1&&ying[pos.x][pos.y+3]==1&&ying[pos.x][pos.y+4]==1){
					alert("恭喜白子玩家，您赢了");that.isover=true;clearInterval(that.ktime);
				}else if(ying[pos.x][pos.y]==2&&ying[pos.x][pos.y+1]==2&&ying[pos.x][pos.y+2]==2&&ying[pos.x][pos.y+3]==2&&ying[pos.x][pos.y+4]==2){
					alert("恭喜红子玩家，您赢了");that.isover=true;clearInterval(that.ktime);
				}
			}
			if(pos.y>=4){
				if(ying[pos.x][pos.y]==1&&ying[pos.x][pos.y-1]==1&&ying[pos.x][pos.y-2]==1&&ying[pos.x][pos.y-3]==1&&ying[pos.x][pos.y-4]==1){
					alert("恭喜白子玩家，您赢了");that.isover=true;clearInterval(that.ktime);
				}else if(ying[pos.x][pos.y]==2&&ying[pos.x][pos.y-1]==2&&ying[pos.x][pos.y-2]==2&&ying[pos.x][pos.y-3]==2&&ying[pos.x][pos.y-4]==2){
					alert("恭喜红子玩家，您赢了");that.isover=true;clearInterval(that.ktime);
				}
			}
			if(pos.x>=4){
				if(ying[pos.x][pos.y]==1&&ying[pos.x-1][pos.y]==1&&ying[pos.x-2][pos.y]==1&&ying[pos.x-3][pos.y]==1&&ying[pos.x-4][pos.y]==1){
					alert("恭喜白子玩家，您赢了");that.isover=true;clearInterval(that.ktime);
				}else if(ying[pos.x][pos.y]==2&&ying[pos.x-1][pos.y]==2&&ying[pos.x-2][pos.y]==2&&ying[pos.x-3][pos.y]==2&&ying[pos.x-4][pos.y]==2){
					alert("恭喜红子玩家，您赢了");that.isover=true;clearInterval(that.ktime);
				}
			}
			if(pos.x<=5){
				if(ying[pos.x][pos.y]==1&&ying[pos.x+1][pos.y]==1&&ying[pos.x+2][pos.y]==1&&ying[pos.x+3][pos.y]==1&&ying[pos.x+4][pos.y]==1){
					alert("恭喜白子玩家，您赢了");that.isover=true;clearInterval(that.ktime);
				}else if(ying[pos.x][pos.y]==2&&ying[pos.x+1][pos.y]==2&&ying[pos.x+2][pos.y]==2&&ying[pos.x+3][pos.y]==2&&ying[pos.x+4][pos.y]==2){
					alert("恭喜红子玩家，您赢了");that.isover=true;clearInterval(that.ktime);
				}
			}
			if(pos.x<=5&&pos.y<=5){
				if(ying[pos.x][pos.y]==1&&ying[pos.x+1][pos.y+1]==1&&ying[pos.x+2][pos.y+2]==1&&ying[pos.x+3][pos.y+3]==1&&ying[pos.x+4][pos.y+4]==1){
					alert("恭喜白子玩家，您赢了");that.isover=true;clearInterval(that.ktime);
				}else if(ying[pos.x][pos.y]==2&&ying[pos.x+1][pos.y+1]==2&&ying[pos.x+2][pos.y+2]==2&&ying[pos.x+3][pos.y+3]==2&&ying[pos.x+4][pos.y+4]==2){
					alert("恭喜红子玩家，您赢了");that.isover=true;clearInterval(that.ktime);
				}
			}
			if(pos.x>=4&&pos.y>=4){
				if(ying[pos.x][pos.y]==1&&ying[pos.x-1][pos.y-1]==1&&ying[pos.x-2][pos.y-2]==1&&ying[pos.x-3][pos.y-3]==1&&ying[pos.x-4][pos.y-4]==1){
					alert("恭喜白子玩家，您赢了");that.isover=true;clearInterval(that.ktime);
				}else if(ying[pos.x][pos.y]==1&&ying[pos.x-1][pos.y-1]==2&&ying[pos.x-2][pos.y-2]==2&&ying[pos.x-3][pos.y-3]==2&&ying[pos.x-4][pos.y-4]==2){
					alert("恭喜红子玩家，您赢了");that.isover=true;clearInterval(that.ktime);
				}
			}
			if(pos.x<=5&&pos.y>=4){
				if(ying[pos.x][pos.y]==1&&ying[pos.x+1][pos.y-1]==1&&ying[pos.x+2][pos.y-2]==1&&ying[pos.x+3][pos.y-3]==1&&ying[pos.x+4][pos.y-4]==1){
					alert("恭喜白子玩家，您赢了");that.isover=true;clearInterval(that.ktime);
				}else if(ying[pos.x][pos.y]==1&&ying[pos.x+1][pos.y-1]==2&&ying[pos.x+2][pos.y-2]==2&&ying[pos.x+3][pos.y-3]==2&&ying[pos.x+4][pos.y-4]==2){
					alert("恭喜红子玩家，您赢了");that.isover=true;clearInterval(that.ktime);
				}
			}
			if(pos.x>=4&&pos.y<=5){
				if(ying[pos.x][pos.y]==1&&ying[pos.x-1][pos.y+1]==1&&ying[pos.x-2][pos.y+2]==1&&ying[pos.x-3][pos.y+3]==1&&ying[pos.x-4][pos.y+4]==1){
					alert("恭喜白子玩家，您赢了");that.isover=true;clearInterval(that.ktime);
				}else if(ying[pos.x][pos.y]==2&&ying[pos.x-1][pos.y+1]==2&&ying[pos.x-2][pos.y+2]==2&&ying[pos.x-3][pos.y+3]==2&&ying[pos.x-4][pos.y+4]==2){
					alert("恭喜红子玩家，您赢了");that.isover=true;clearInterval(that.ktime);
				}
			}
		});
		
		$(".back").click(function(){

			// Gobang.gettime();
			if(that.ktime){		//计算思考时间
				clearInterval(that.ktime);
				Gobang.gettime();
			}else{
				Gobang.gettime();
			}
			if(that.back.length==0){
				return alert("已经悔到初始状态了。")
			}
			that.back[0].removeClass();
			that.back[0].get(0).istap=true;  //棋子可再次点击
			that.back.shift();
			that.isover=false; //游戏结束后悔棋还可以继续
			if(onOff){
				$(".tit").text("请红子出棋");
			}
			if(!onOff){
				$(".tit").text("请白子出棋");
			}
			onOff=!onOff;   //控制悔棋至谁走
		})
		
	}
	



}
// if(this.nowtime==3){
// 	alert(1)
// }
var Gobang=new Gobang();
	Gobang.size=400;
	Gobang.num=10;
	Gobang.start()

