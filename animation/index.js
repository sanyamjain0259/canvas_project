var canvas=document.getElementById('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c=canvas.getContext('2d');
function randomnum(minx,maxx){
  return(Math.floor(Math.random()*(maxx-minx)+minx));
}

window.addEventListener('resize',function() {
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
})
window.addEventListener('mousemove',function(event) {
  mouse.x=event.x;
  mouse.y=event.y;
})
var mouse={
  x:undefined,
  y:undefined
}
var maxradius=40;
function Circle() {
  this.radius=randomnum(4,20);
  this.x=randomnum(this.radius,window.innerWidth-this.radius);
  this.y=randomnum(this.radius,window.innerHeight-this.radius);
  this.dx=randomnum(-3,3);
  this.dy=randomnum(-3,3);
  this.minradius=this.radius;
  this.color=`rgb(${randomnum(0,255)},${randomnum(0,255)},${randomnum(0,255)})`;
  this.draw= function() {
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    c.fillStyle=this.color;
    c.fill();
    c.stroke();
  }
  this.update=function() {

    if(this.x+this.radius>=window.innerWidth || this.x-this.radius<=0){
      this.dx*=-1;
    }
    if(this.y+this.radius>=window.innerHeight || this.y-this.radius<=0){
      this.dy*=-1;
    }
    this.x+=this.dx;
    this.y+=this.dy;
    if(mouse.x-this.x<50 && mouse.x-this.x>-50){
      if(mouse.y-this.y<50 && mouse.y-this.y>-50){
        if(maxradius>this.radius){
          this.radius+=2;
        }
      }
    }
    else{
      if(this.radius>this.minradius){
        this.radius-=2;
      }
    }
    this.draw();
  }
}

var circlelist=[];
function init() {
  for(var i=0;i<500;i++){
    circlelist.push(new Circle());
  }
  animate();
}
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,window.innerWidth,window.innerHeight);
  for(var i=0;i<500;i++){
    circlelist[i].update();
  }
}
init();
