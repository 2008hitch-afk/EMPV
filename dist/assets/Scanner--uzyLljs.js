import{o as e,r as t,t as n}from"./index-DpUCXyrw.js";import{i as r,n as i,r as a,t as o}from"./Triangle-DmLXu-Tz.js";var s=e(t(),1),c=n(),l=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},u=e=>e===`horizontal`?1:e===`diagonal`?2:0,d=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,f=`#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uSweepSpeed;
uniform float uSweepWidth;
uniform float uSweepFalloff;
uniform float uScale;
uniform float uFrequency;
uniform float uRipple;
uniform float uBandDensity;
uniform float uLineSharpness;
uniform float uGlow;
uniform float uColorSpread;
uniform float uBrightness;
uniform float uContrast;
uniform float uSoftness;
uniform float uVignette;
uniform float uOpacity;
uniform float uScanline;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uDirection;
uniform vec2 uMouse;
uniform float uMouseEnabled;
uniform float uMouseRadius;
uniform float uMouseStrength;
uniform float uMouseActive;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;

const float TAU = 6.2831853;

float signalField(vec2 p, float t) {
  float w = sin(p.x * 1.3 + t * 0.7);
  w += sin(p.y * 1.7 - t * 0.52) * 0.8;
  w += sin((p.x + p.y) * 0.9 + t * 0.91) * 0.6;
  w += sin((p.x - p.y) * 1.53 - t * 0.63) * 0.42;
  return w * 0.35;
}

vec3 palette(float f) {
  f = clamp(f, 0.0, 1.0);
  f = pow(f, uContrast);
  vec3 c = mix(uColor1, uColor2, smoothstep(0.08, 0.6, f));
  return mix(c, uColor3, smoothstep(0.68, 1.0, f));
}

float scanBand(float x, float aa, float sharp) {
  float v = mix(0.5, 0.5 + 0.5 * cos(x * TAU), aa);
  return pow(v, sharp);
}

void main() {
  float aspect = iResolution.x / iResolution.y;
  vec2 uv0 = (gl_FragCoord.xy * 2.0 - iResolution.xy) / iResolution.y;
  vec2 p = uv0 / max(uScale, 0.001);

  float t = iTime * uSpeed;

  float mouseBoost = 0.0;
  if (uMouseEnabled > 0.5) {
    vec2 mUv = vec2((uMouse.x * 2.0 - 1.0) * aspect, uMouse.y * 2.0 - 1.0);
    vec2 md = uv0 - mUv;
    float r = max(uMouseRadius, 0.001);
    mouseBoost = exp(-dot(md, md) / (r * r)) * uMouseStrength * uMouseActive;
  }

  float axis;
  if (uDirection < 0.5) axis = p.y;
  else if (uDirection < 1.5) axis = p.x;
  else axis = (p.x + p.y) * 0.70710678;

  float sig = signalField(p * uFrequency, t);
  float coord = axis + sig * uRipple;

  float phase = coord / max(uSweepWidth, 0.05) - t * uSweepSpeed;
  float sweep = pow(0.5 + 0.5 * cos(phase * TAU), max(uSweepFalloff, 0.1));

  float lc = coord * uBandDensity;
  float aa = 1.0 / (1.0 + uSoftness * fwidth(lc) * 3.0);
  aa = clamp(aa * (1.0 + mouseBoost * 0.6), 0.0, 1.0);

  float bodyBase = clamp(0.5 + 0.5 * sig, 0.0, 1.0);
  float body = bodyBase * bodyBase * uGlow * sweep;

  float sharp = max(uLineSharpness, 0.1);
  float split = uColorSpread * 0.16;
  float fr = clamp(scanBand(lc + split, aa, sharp) * sweep + body, 0.0, 1.0);
  float fg = clamp(scanBand(lc, aa, sharp) * sweep + body, 0.0, 1.0);
  float fb = clamp(scanBand(lc - split, aa, sharp) * sweep + body, 0.0, 1.0);

  vec3 col = vec3(palette(fr).r, palette(fg).g, palette(fb).b);

  float inten = (fr + fg + fb) * 0.3333333 * uBrightness;
  inten *= 1.0 + mouseBoost * 0.9;

  if (uScanline > 0.5) {
    inten *= 1.0 - 0.18 * (0.5 + 0.5 * cos(gl_FragCoord.y * 1.7));
  }

  if (uGrain > 0.5) {
    float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453);
    inten += (g - 0.5) * uGrainIntensity;
  }

  inten *= clamp(1.0 - uVignette * smoothstep(0.55, 1.65, length(uv0)), 0.0, 1.0);
  inten = clamp(inten, 0.0, 1.0);

  float a = clamp(inten * uOpacity, 0.0, 1.0);
  fragColor = vec4(clamp(col, 0.0, 1.0) * a, a);
}
`,p=new WeakMap,m=({color1:e=`#5227FF`,color2:t=`#FF9FFC`,color3:n=`#FFFFFF`,speed:m=.5,sweepSpeed:h=.25,sweepWidth:g=1.6,sweepFalloff:_=6,scale:v=1.5,frequency:y=2,ripple:b=.22,bandDensity:x=11,lineSharpness:S=5.5,glow:C=.22,scanDirection:w=`vertical`,colorSpread:T=.7,brightness:E=1,contrast:D=1.15,softness:O=1.4,vignette:k=.45,scanline:A=!0,grain:j=!0,grainIntensity:M=.05,opacity:N=1,mouseInteraction:P=!0,mouseRadius:F=.5,mouseStrength:I=.5,className:L=``})=>{let R=(0,s.useRef)(null),z=(0,s.useRef)(P);return(0,s.useEffect)(()=>{let e=R.current;if(!e)return;let t=new a({webgl:2,alpha:!0,premultipliedAlpha:!0,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,2)}),n=t.gl;n.clearColor(0,0,0,0);let s=n.canvas;s.style.width=`100%`,s.style.height=`100%`,s.style.display=`block`,e.appendChild(s);let c=new o(n),l=new r(n,{vertex:d,fragment:f,uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uSpeed:{value:.5},uSweepSpeed:{value:.25},uSweepWidth:{value:1.6},uSweepFalloff:{value:6},uScale:{value:1.5},uFrequency:{value:2},uRipple:{value:.22},uBandDensity:{value:11},uLineSharpness:{value:5.5},uGlow:{value:.22},uColorSpread:{value:.7},uBrightness:{value:1},uContrast:{value:1.15},uSoftness:{value:1.4},uVignette:{value:.45},uOpacity:{value:1},uScanline:{value:1},uGrain:{value:1},uGrainIntensity:{value:.05},uDirection:{value:0},uMouse:{value:new Float32Array([.5,.5])},uMouseEnabled:{value:1},uMouseRadius:{value:.5},uMouseStrength:{value:.5},uMouseActive:{value:0},uColor1:{value:new Float32Array([1,1,1])},uColor2:{value:new Float32Array([1,1,1])},uColor3:{value:new Float32Array([1,1,1])}}}),u=new i(n,{geometry:c,program:l});p.set(e,{renderer:t,program:l,mesh:u});let m=()=>{let r=e.getBoundingClientRect(),i=Math.max(1,Math.floor(r.width)),a=Math.max(1,Math.floor(r.height));t.setSize(i,a);let o=l.uniforms.iResolution.value;o[0]=n.drawingBufferWidth,o[1]=n.drawingBufferHeight,t.render({scene:u})},h=new ResizeObserver(m);h.observe(e),m();let g=[.5,.5],_=[.5,.5],v=0,y=0,b=e=>{let t=s.getBoundingClientRect();_=[(e.clientX-t.left)/t.width,1-(e.clientY-t.top)/t.height],y=1},x=()=>{y=0};s.addEventListener(`mousemove`,b),s.addEventListener(`mouseleave`,x);let S=0,C=!0,w=!document.hidden,T=performance.now(),E=e=>{l.uniforms.iTime.value=(e-T)*.001,z.current||(y=0),g[0]+=.05*(_[0]-g[0]),g[1]+=.05*(_[1]-g[1]);let n=l.uniforms.uMouse.value;n[0]=g[0],n[1]=g[1],v+=.05*(y-v),l.uniforms.uMouseActive.value=v,t.render({scene:u}),S=requestAnimationFrame(E)},D=()=>{C&&w&&S===0&&(S=requestAnimationFrame(E))},O=()=>{S!==0&&(cancelAnimationFrame(S),S=0)},k=new IntersectionObserver(([e])=>{C=e.isIntersecting,C?D():O()},{threshold:0});k.observe(e);let A=()=>{w=!document.hidden,w?D():O()};return document.addEventListener(`visibilitychange`,A),D(),()=>{O(),h.disconnect(),k.disconnect(),document.removeEventListener(`visibilitychange`,A),s.removeEventListener(`mousemove`,b),s.removeEventListener(`mouseleave`,x),p.delete(e);try{e.removeChild(s)}catch{}n.getExtension(`WEBGL_lose_context`)?.loseContext()}},[]),(0,s.useEffect)(()=>{let r=R.current;if(!r)return;let i=p.get(r);if(!i)return;let{program:a}=i,o=a.uniforms;o.uSpeed.value=m,o.uSweepSpeed.value=h,o.uSweepWidth.value=g,o.uSweepFalloff.value=_,o.uScale.value=v,o.uFrequency.value=y,o.uRipple.value=b,o.uBandDensity.value=x,o.uLineSharpness.value=S,o.uGlow.value=C,o.uColorSpread.value=T,o.uBrightness.value=E,o.uContrast.value=D,o.uSoftness.value=O,o.uVignette.value=k,o.uOpacity.value=N,o.uScanline.value=+!!A,o.uGrain.value=+!!j,o.uGrainIntensity.value=M,o.uDirection.value=u(w),o.uMouseEnabled.value=+!!P,o.uMouseRadius.value=F,o.uMouseStrength.value=I;let s=l(e),c=l(t),d=l(n);o.uColor1.value[0]=s[0],o.uColor1.value[1]=s[1],o.uColor1.value[2]=s[2],o.uColor2.value[0]=c[0],o.uColor2.value[1]=c[1],o.uColor2.value[2]=c[2],o.uColor3.value[0]=d[0],o.uColor3.value[1]=d[1],o.uColor3.value[2]=d[2],z.current=P},[m,h,g,_,v,y,b,x,S,C,T,E,D,O,k,N,A,j,M,w,P,F,I,e,t,n]),(0,c.jsx)(`div`,{ref:R,className:`scanner-container ${L}`.trim()})};export{m as default};