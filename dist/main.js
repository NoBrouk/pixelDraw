!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="dist/",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);var s=class{constructor(t){this.palette=t.palette,this.selectedElement=t.selectedElement,this.color=this.selectedElement.getAttribute("data-bgc"),this.palette.addEventListener("click",this.selectColor.bind(this))}selectColor(t){t.target.hasAttribute("data-bgc")&&(this.color=t.target.getAttribute("data-bgc"),this.selectedElement.classList.remove("color-active"),t.target.classList.add("color-active"),this.selectedElement=t.target)}get getColor(){return this.color}};var n=class{constructor(t){this.socket=t.socket,this.arrDraw=[],this.sizePixel=15,this.canvas=t.canvas,this.ctx=this.canvas.getContext("2d",{alpha:!1}),this.updateSizeCanvas(),this.resetScreen(),this.palette=t.palette,this.bgc="#000000",this.canvas.addEventListener("mousedown",this.eventMouse.bind(this)),this.canvas.addEventListener("touchstart",this.eventMouse.bind(this)),window.onresize=this.updateSizeCanvas.bind(this),this.camera={x:0,y:0},this.socket.on("uploadToClient",t=>{this.arrDraw=t.data,this.drawPixels()})}updateSizeCanvas(){this.w=canvas.width=window.innerWidth,this.h=canvas.height=window.innerHeight,this.drawPixels()}uploadToServer(){this.socket.emit("uploadToServer",this.arrDraw)}deletePixel(t,e){this.arrDraw=this.arrDraw.filter(i=>!(i.x==t&&i.y==e)&&i.color!=this.bgc)}eventMouse(t){let e=t.clientX,i=t.clientY,s=!0,n=e,a=i;this.canvas.onmousemove=t=>{(Math.abs(e-t.clientX)>8||Math.abs(i-t.clientY)>8)&&(document.body.style.cursor="move",s=!1,this.camera.x+=t.clientX-n,this.camera.y+=t.clientY-a,n=t.clientX,a=t.clientY,this.drawPixels())},this.canvas.onmouseup=t=>{s&&(e=Math.floor((e-this.camera.x)/this.sizePixel)*this.sizePixel,i=Math.floor((i-this.camera.y)/this.sizePixel)*this.sizePixel,this.deletePixel(e,i),this.arrDraw.push({x:e,y:i,color:this.palette.getColor}),this.uploadToServer()),document.body.style.cursor="auto",this.canvas.onmousemove=null}}eventTouch(t){t.preventDefault(),t.stopPropagation(),console.log(t.changedTouches[0].pageX)}drawPixels(){this.resetScreen(),this.arrDraw.forEach(t=>{this.ctx.fillStyle=t.color,this.ctx.fillRect(t.x+this.camera.x,t.y+this.camera.y,this.sizePixel,this.sizePixel)})}resetScreen(){this.ctx.fillStyle=this.bgc,this.ctx.fillRect(0,0,this.w,this.h)}};var a=class{constructor(t){this.socket=t.socket,this.panel=document.createElement("form"),this.input=document.createElement("input"),this.panel.append(this.input),this.initStyle(),this.panel.hid=!0,this.panel.onsubmit=this.reqCommand.bind(this)}reqCommand(t){t.preventDefault(),this.socket.emit("adminCommand",this.input.value),this.input.value=""}toggle(){this.panel.hid?(this.panel.style.top="30px",this.input.focus(),this.panel.hid=!1):(this.panel.style.top="-80px",this.panel.hid=!0)}initStyle(){this.panel.style.boxSizing="border-box",this.panel.style.position="absolute",this.panel.style.width="50%",this.panel.style.top="-100px",this.panel.style.left="50%",this.panel.style.marginLeft="-25%",this.panel.style.padding="20px",this.panel.style.backgroundColor="#40407a",this.panel.style.borderRadius="3px",this.panel.style.transition="0.5s",this.input.style.boxSizing="border-box",this.input.style.width="100%",this.input.style.padding="7px 10px 7px 10px",this.input.style.fontSize="14px",this.input.style.color="#dfe4ea",this.input.style.backgroundColor="#1e272e",this.input.style.border="none",this.input.style.outline="none"}render(){return this.panel}};let l=io.connect(),r=document.getElementById("palette"),o=new s({palette:r,selectedElement:r.children[0].children[0]}),h=new a({socket:l});new n({canvas:document.getElementById("canvas"),palette:o,socket:l});document.body.append(h.render()),document.addEventListener("keydown",t=>{t.ctrlKey&&"q"==t.key&&h.toggle()})}]);