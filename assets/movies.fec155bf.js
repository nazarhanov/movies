var p=Object.defineProperty;var l=Object.getOwnPropertySymbols;var y=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable;var n=(t,e,r)=>e in t?p(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,u=(t,e)=>{for(var r in e||(e={}))y.call(e,r)&&n(t,r,e[r]);if(l)for(var r of l(e))v.call(e,r)&&n(t,r,e[r]);return t};var o=(t,e,r)=>(n(t,typeof e!="symbol"?e+"":e,r),r);import{_ as h,p as m,r as w}from"./vendor.136ee9b8.js";import{r as b,j,a as s,F as x}from"./main.b53f63de.js";class R extends h{constructor(e){super(e);o(this,"state");o(this,"refRoot",m());o(this,"refVideo",m());this.state={trailer:!1};for(let r in e)this.state[r]=e[r]}async componentDidMount(){let e=Object(this.state);const r=e.url?decodeURIComponent(e.url).trim()+(decodeURIComponent(e.url).indexOf("?")+1?"&":"?")+"cache"+Math.random().toString().substr(2,3):"https://ahoy.yohoho.cc?cache"+Math.random().toString().substr(2,3),i=await fetch(r,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(e).toString()});let c;try{if(!i.ok)throw new Error("Invalid status");c=await i.json()}catch(f){console.error(f);return}let a=c.collaps,d=a==null?void 0:a.iframe;if(!d)return w(b("/error"),!0);this.refVideo.current.setAttribute("src",decodeURIComponent(d))}render(){return j("div",{class:"player",ref:this.refRoot,children:[s("div",{class:"player-loading"}),s("iframe",{class:"player-video",ref:this.refVideo,frameBorder:"0",allowFullScreen:!0})]})}}class C extends h{constructor(e){super(e);o(this,"state");this.state={id:e.id}}render(){const e={kinopoisk:this.state.id};return s(x,{children:s(R,u({},e))})}}export{C as default};