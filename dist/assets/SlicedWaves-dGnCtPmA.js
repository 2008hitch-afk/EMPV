import{o as e,r as t,t as n}from"./index-DpUCXyrw.js";import{i as r,n as i,r as a,t as o}from"./Triangle-DmLXu-Tz.js";var s=e(t(),1),c=n(),l=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},u=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,d=`#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uColumns;
uniform float uRows;
uniform float uThickness;
uniform float uSpeed;
uniform float uTravel;
uniform float uWaveSpread;
uniform float uRowOffset;
uniform float uSoftness;
uniform float uGlow;
uniform float uBrightness;
uniform float uContrast;
uniform float uOpacity;
uniform float uVertical;
uniform float uAlternate;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform float uMouseRadius;
uniform float uEnableMouse;
uniform float uMouseActive;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uLightMode;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  vec2 grid = vec2(max(uColumns, 1.0), max(uRows, 1.0));
  vec2 p = uv * grid;
  vec2 gv = fract(p) - 0.5;
  vec2 id = floor(p);

  float barCoord, waveId, offId, along;
  if (uVertical > 0.5) {
    barCoord = gv.x; waveId = id.y; offId = id.x; along = uv.y;
  } else {
    barCoord = gv.y; waveId = id.x; offId = id.y; along = uv.x;
  }

  float dir = 1.0;
  if (uAlternate > 0.5 && mod(offId, 2.0) >= 1.0) dir = -1.0;

  float phase = iTime * uSpeed + waveId * uWaveSpread + cos(offId * uRowOffset);
  float mv = sin(phase) * 0.5 + 0.5;
  if (dir < 0.0) mv = 1.0 - mv;

  float infl = 0.0;
  if (uEnableMouse > 0.5) {
    float md = distance(uv, uMouse);
    infl = smoothstep(uMouseRadius, 0.0, md) * uMouseStrength * uMouseActive;
  }

  float thick = clamp(uThickness + infl * 0.25, 0.0, 1.0);
  float startPos = (0.5 - thick * 0.5) * uTravel;
  float endPos = (-0.5 + thick * 0.5) * uTravel;
  float pos = mix(startPos, endPos, mv);

  float aa = max(uSoftness, 0.0005);
  float d = abs(barCoord + pos) - thick * 0.5;
  float aaWidth = fwidth(uVertical > 0.5 ? p.x : p.y);
  float edge = max(aa, aaWidth);
  float mask = smoothstep(edge, -edge, d);
  float glow = exp(-max(d, 0.0) * (7.0 / (uGlow + 0.001))) * clamp(uGlow, 0.0, 1.0);
  float intensity = clamp(mask + glow * (1.0 - mask), 0.0, 1.0);

  if (uGrain > 0.5) {
    float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453);
    intensity = clamp(intensity + (g - 0.5) * uGrainIntensity, 0.0, 1.0);
  }

  float tint = mv;
  vec3 grad = mix(uColor2, uColor1, tint);
  grad = mix(grad, uColor3, clamp(along, 0.0, 1.0) * 0.45);

  vec3 col = grad * uBrightness * (1.0 + infl * 0.6);
  col = (col - 0.5) * uContrast + 0.5;
  col = clamp(col, 0.0, 1.0);

  float a = intensity * uOpacity;
  if (uLightMode > 0.5) {
    float peak = max(col.r, max(col.g, col.b));
    vec3 chroma = pow(clamp(col / max(peak, 0.0001), 0.0, 1.0), vec3(1.16));
    fragColor = vec4(mix(vec3(1.0), chroma, a * 0.94), 1.0);
  } else {
    fragColor = vec4(col * a, a);
  }
}
`,f=new WeakMap,p=({color1:e=`#FF9FFC`,color2:t=`#5227FF`,color3:n=`#B497CF`,columns:p=14,rows:m=8,barThickness:h=.1,speed:g=.35,travel:_=.7,waveSpread:v=.9,rowOffset:y=1,softness:b=.05,glow:x=0,brightness:S=1,contrast:C=1,opacity:w=.5,orientation:T=`horizontal`,alternate:E=!1,mouseInteraction:D=!0,mouseStrength:O=1,mouseRadius:k=.3,grain:A=!0,grainIntensity:j=.05,lightMode:M=!1,className:N=``})=>{let P=(0,s.useRef)(null);return(0,s.useEffect)(()=>{let e=P.current;if(!e)return;let t=new a({webgl:2,alpha:!0,premultipliedAlpha:!0,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,2)}),n=t.gl;n.clearColor(0,0,0,0);let s=n.canvas;s.style.width=`100%`,s.style.height=`100%`,s.style.display=`block`,e.appendChild(s);let c=new o(n),l=new r(n,{vertex:u,fragment:d,uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uColumns:{value:14},uRows:{value:8},uThickness:{value:.1},uSpeed:{value:.35},uTravel:{value:.7},uWaveSpread:{value:.9},uRowOffset:{value:1},uSoftness:{value:.05},uGlow:{value:0},uBrightness:{value:1},uContrast:{value:1},uOpacity:{value:.5},uVertical:{value:0},uAlternate:{value:0},uMouse:{value:new Float32Array([.5,.5])},uMouseStrength:{value:1},uMouseRadius:{value:.3},uEnableMouse:{value:1},uMouseActive:{value:0},uGrain:{value:1},uGrainIntensity:{value:.05},uLightMode:{value:0},uColor1:{value:new Float32Array([1,1,1])},uColor2:{value:new Float32Array([1,1,1])},uColor3:{value:new Float32Array([1,1,1])}}}),p=new i(n,{geometry:c,program:l});f.set(e,{renderer:t,program:l,mesh:p});let m=()=>{let r=e.getBoundingClientRect(),i=Math.max(1,Math.floor(r.width)),a=Math.max(1,Math.floor(r.height));t.setSize(i,a);let o=l.uniforms.iResolution.value;o[0]=n.drawingBufferWidth,o[1]=n.drawingBufferHeight,t.render({scene:p})},h=new ResizeObserver(m);h.observe(e),m();let g=[.5,.5],_=[.5,.5],v=0,y=0,b=e=>{let t=s.getBoundingClientRect();_=[(e.clientX-t.left)/t.width,1-(e.clientY-t.top)/t.height],y=1},x=()=>{y=0};s.addEventListener(`mousemove`,b),s.addEventListener(`mouseleave`,x);let S=0,C=!0,w=!document.hidden,T=performance.now(),E=e=>{l.uniforms.iTime.value=(e-T)*.001,g[0]+=.05*(_[0]-g[0]),g[1]+=.05*(_[1]-g[1]);let n=l.uniforms.uMouse.value;n[0]=g[0],n[1]=g[1],v+=.05*(y-v),l.uniforms.uMouseActive.value=v,t.render({scene:p}),S=requestAnimationFrame(E)},D=()=>{C&&w&&S===0&&(S=requestAnimationFrame(E))},O=()=>{S!==0&&(cancelAnimationFrame(S),S=0)},k=new IntersectionObserver(([e])=>{C=e.isIntersecting,C?D():O()},{threshold:0});k.observe(e);let A=()=>{w=!document.hidden,w?D():O()};return document.addEventListener(`visibilitychange`,A),D(),()=>{O(),h.disconnect(),k.disconnect(),document.removeEventListener(`visibilitychange`,A),s.removeEventListener(`mousemove`,b),s.removeEventListener(`mouseleave`,x),f.delete(e);try{e.removeChild(s)}catch{}n.getExtension(`WEBGL_lose_context`)?.loseContext()}},[]),(0,s.useEffect)(()=>{let r=P.current;if(!r)return;let i=f.get(r);if(!i)return;let a=i.program.uniforms;a.uColumns.value=Math.max(1,Math.round(p)),a.uRows.value=Math.max(1,Math.round(m)),a.uThickness.value=h,a.uSpeed.value=g,a.uTravel.value=_,a.uWaveSpread.value=v,a.uRowOffset.value=y,a.uSoftness.value=b,a.uGlow.value=x,a.uBrightness.value=S,a.uContrast.value=C,a.uOpacity.value=w,a.uVertical.value=+(T===`vertical`),a.uAlternate.value=+!!E,a.uMouseStrength.value=O,a.uMouseRadius.value=k,a.uEnableMouse.value=+!!D,a.uGrain.value=+!!A,a.uGrainIntensity.value=j,a.uLightMode.value=+!!M;let o=l(e),s=a.uColor1.value;s[0]=o[0],s[1]=o[1],s[2]=o[2];let c=l(t),u=a.uColor2.value;u[0]=c[0],u[1]=c[1],u[2]=c[2];let d=l(n),N=a.uColor3.value;N[0]=d[0],N[1]=d[1],N[2]=d[2]},[e,t,n,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M]),(0,c.jsx)(`div`,{ref:P,className:`sliced-waves-container ${N}`.trim()})};export{p as default};