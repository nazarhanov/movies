var f=Object.defineProperty;var l=Object.getOwnPropertySymbols;var p=Object.prototype.hasOwnProperty,y=Object.prototype.propertyIsEnumerable;var a=(r,e,t)=>e in r?f(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,d=(r,e)=>{for(var t in e||(e={}))p.call(e,t)&&a(r,t,e[t]);if(l)for(var t of l(e))y.call(e,t)&&a(r,t,e[t]);return r};var o=(r,e,t)=>(a(r,typeof e!="symbol"?e+"":e,t),t);import{_ as h,p as m}from"./vendor.4f1139c9.js";import{j as v,a as s,F as w}from"./main.3663003a.js";class j extends h{constructor(e){super(e);o(this,"state");o(this,"refRoot",m());o(this,"refVideo",m());this.state={trailer:!1};for(let t in e)this.state[t]=e[t]}async componentDidMount(){let e=Object(this.state);const t=e.url?decodeURIComponent(e.url).trim()+(decodeURIComponent(e.url).indexOf("?")+1?"&":"?")+"cache"+Math.random().toString().substr(2,3):"https://ahoy.yohoho.cc?cache"+Math.random().toString().substr(2,3),n=await fetch(t,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(e).toString()});let i;try{if(!n.ok)throw new Error("Invalid status");i=await n.json()}catch(u){console.error(u);return}let c=i.collaps;!c||this.refVideo.current.setAttribute("src",decodeURIComponent(c.iframe))}render(){return v("div",{class:"player",ref:this.refRoot,children:[s("div",{class:"player-loading"}),s("iframe",{class:"player-video",ref:this.refVideo,frameBorder:"0",allowFullScreen:!0})]})}}class b extends h{constructor(e){super(e);o(this,"state");this.state={id:e.id}}render(){const e={kinopoisk:this.state.id};return s(w,{children:s(j,d({},e))})}}export{b as default};
