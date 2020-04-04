!function(t){var e={};function i(o){if(e[o])return e[o].exports;var s=e[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(o,s,function(e){return t[e]}.bind(null,s));return o},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){t.exports=i(1)},function(t,e,i){"use strict";i.r(e);var o={scoreField:document.querySelector(".score h3 span"),playBtn:document.getElementById("play"),pauseBtn:document.getElementById("pause"),canvas:document.getElementById("board")};const s=()=>{return parseInt((t="high-score",localStorage.getItem(t)));var t},r=t=>{var e,i;e="high-score",i=t.toString(),localStorage.setItem(e,i)},n=new class{constructor(t){const e=document.getElementById(t).getContext("2d");this.context=e}arc(){}circle(t,e,i,o,s=!0){this.context.beginPath(),this.context.arc(t,e,i,0,2*Math.PI,!0),this.context.fillStyle=o,s?this.context.fill():this.context.stroke(),this.context.closePath()}draw_image(t,e,i,o){this.context.drawImage(t,e,i,o,o)}draw_rect(t,e,i,o,s,r=!1){this.context.fillStyle=s,r?this.context.fillRect(t,e,i,o):this.context.strokeRect(t,e,i,o)}draw_wall(t,e,i,o,s,r,n=!1){for(let a=0;a<r;a++)this.draw_rect(t,e,i,o,s,n),t+=i+10}clear(t,e,i,o){this.context.clearRect(t,e,i,o)}}("board");let a=new Image;const c=new Audio("assets/audio/Apple-bite.mp3"),h=new Audio("assets/audio/fail.mp3");class l{constructor(){}static approximateBlock(t){return Math.floor((t-0)/20)}static adjustDimension(){let t=document.documentElement.clientWidth,e=document.documentElement.clientHeight;if(t>768)t*=.75,e*=.7;else{let i=20;t-=2*i,e=.7*e-2*i}return this.blocksInRow=this.approximateBlock(t),this.blocksInCol=this.approximateBlock(e),this.height=20*this.blocksInCol+0,this.width=20*this.blocksInRow+0,{height:this.height,width:this.width}}}function d(){const{height:t,width:e}=l.adjustDimension();var i,s;i=t,s=e,o.canvas.setAttribute("height",i.toString()),o.canvas.setAttribute("width",s.toString())}window.addEventListener("resize",()=>{d(),u.display()}),d();const u=new class{constructor(){this.size=20,this.gap=0,this.pos=[{x:this.gap,y:this.gap},{x:2*this.gap+this.size,y:this.gap}],this.color="blue",this.direction="right",this.getRandomBlock(),this.flag=!1,this.totalScore=0,this.level=1,this.foodEaten=0,a.src="assets/images/food-30x30.png",a.onload=()=>n.draw_image(a,this.randomBlock.x,this.randomBlock.y,this.size)}init(){n.draw_rect(0,0,l.width,l.height,"red",!0)}getFlag(){return this.flag}async start(){this.flag=!0;try{for(;this.flag;)await this.update()}catch(t){h.play(),"vibrate"in navigator&&navigator.vibrate(100);let e=s();(!e||e<this.totalScore)&&r(this.totalScore),console.log(t)}}async pause(){this.flag=!1}async resume(){!0!==this.flag&&this.start()}async update(){await async function(t){return new Promise((e,i)=>setTimeout(e,t))}(300-40*this.level);const t=this.updateArray();this.checkBoundary(),t?this.clear(t.x,t.y):(c.play(),this.updateScore(),this.manageLevel(),this.getRandomBlock());const e=this.pos[this.pos.length-1];this.draw(e.x,e.y)}display(){for(let t of this.pos)this.draw(t.x,t.y);this.drawFood()}checkFood(){const t=this.pos[this.pos.length-1];return this.randomBlock.x==t.x&&this.randomBlock.y==t.y}manageLevel(){this.foodEaten++,this.foodEaten>=5*this.level&&(this.level++,this.foodEaten=0)}checkBoundary(){const t=this.pos[this.pos.length-1];if(t.x>=l.width||t.x<0||t.y<0||t.y>=l.height)throw Error("collision with wall");if(this.isSnake(t.x,t.y))throw Error("collision with snake")}isSnake(t,e){const i=this.pos.length;return!!this.pos.find((o,s)=>s!=i-1&&o.x===t&&o.y===e)}getRandomBlock(){const t=Math.floor(Math.random()*l.blocksInRow),e=Math.floor(Math.random()*l.blocksInCol),i={x:this.gap+t*(this.gap+this.size),y:this.gap+e*(this.gap+this.size)};return this.pos.find(t=>t.x==i.x&&t.y==i.y)?this.getRandomBlock():(this.randomBlock=i,this.drawFood(),i)}drawFood(){n.draw_image(a,this.randomBlock.x,this.randomBlock.y,this.size)}updateArray(){const t=this.pos[this.pos.length-1],e=this.size+this.gap,i={x:t.x,y:t.y};switch(this.direction){case"right":i.x+=e;break;case"down":i.y+=e;break;case"left":i.x-=e;break;case"up":i.y-=e}if(this.pos.push(i),!this.checkFood())return this.pos.shift()}updateScore(){var t;this.totalScore+=10*this.level,t=this.totalScore,o.scoreField.textContent=t}draw(t,e,i=this.color){const o=this.size;n.draw_rect(t,e,o,o,i,!0)}clear(t,e){const i=this.size+this.gap;n.clear(t,e,i,i)}};function p(){u.resume()}function g(){u.pause()}u.display(),window.addEventListener("keydown",t=>{switch(t.code){case"ArrowRight":"left"!=u.direction&&(u.direction="right");break;case"ArrowLeft":"right"!=u.direction&&(u.direction="left");break;case"ArrowUp":"down"!=u.direction&&(u.direction="up");break;case"ArrowDown":"up"!=u.direction&&(u.direction="down");break;case"Space":u.getFlag()?g():p()}}),o.playBtn.addEventListener("click",p),o.pauseBtn.addEventListener("click",g),"serviceWorker"in navigator&&navigator.serviceWorker.register("../sw.js").then(()=>{console.log("service worker is installing")})}]);