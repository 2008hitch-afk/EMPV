import{o as e,r as t,t as n}from"./index-BFBksyuh.js";import{i as r,n as i,r as a,t as o}from"./Triangle-DmLXu-Tz.js";var s=e(t(),1),c=n(),l=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},u=e=>e===`horizontal`?1:e===`diagonal`?2:0,d=`#version 300 es
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
uniform vec2 uMouseVelocity;
uniform float uMouseEnabled;
uniform float uMouseRadius;
uniform float uMouseStrength;
uniform float uMouseActive;
uniform float uClickPulse;
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
    float dist = max(length(md), 0.0001);
    float r = max(uMouseRadius, 0.001);
    float local = exp(-dot(md, md) / (r * r));
    vec2 dir = md / dist;
    vec2 velocity = vec2(uMouseVelocity.x * aspect, uMouseVelocity.y);
    float velocityAmount = clamp(length(velocity) * 26.0, 0.0, 1.0);

    // The pointer bends the signal field instead of drawing a cursor halo.
    vec2 dragWarp = velocity * (0.9 + velocityAmount * 1.8);
    vec2 radialWarp = -dir * (0.035 + velocityAmount * 0.085);
    float clickWave = sin(dist * 32.0 - iTime * 16.0) * uClickPulse * 0.055;
    vec2 clickWarp = dir * clickWave;

    p += (dragWarp + radialWarp + clickWarp) * local * uMouseStrength * uMouseActive;
    mouseBoost = local * uMouseStrength * uMouseActive * (0.35 + velocityAmount * 0.65);
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
`,p=new WeakMap,m=({color1:e=`#5227FF`,color2:t=`#FF9FFC`,color3:n=`#FFFFFF`,speed:m=.5,sweepSpeed:h=.25,sweepWidth:g=1.6,sweepFalloff:_=6,scale:v=1.5,frequency:y=2,ripple:b=.22,bandDensity:x=11,lineSharpness:S=5.5,glow:C=.22,scanDirection:w=`vertical`,colorSpread:T=.7,brightness:E=1,contrast:D=1.15,softness:O=1.4,vignette:k=.45,scanline:A=!0,grain:j=!0,grainIntensity:M=.05,opacity:N=1,mouseInteraction:P=!0,mouseRadius:F=.5,mouseStrength:I=.5,className:L=``})=>{let R=(0,s.useRef)(null),z=(0,s.useRef)(P);return(0,s.useEffect)(()=>{let e=R.current;if(!e)return;let t=new a({webgl:2,alpha:!0,premultipliedAlpha:!0,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,2)}),n=t.gl;n.clearColor(0,0,0,0);let s=n.canvas;s.style.width=`100%`,s.style.height=`100%`,s.style.display=`block`,e.appendChild(s);let c=new o(n),l=new r(n,{vertex:d,fragment:f,uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uSpeed:{value:.5},uSweepSpeed:{value:.25},uSweepWidth:{value:1.6},uSweepFalloff:{value:6},uScale:{value:1.5},uFrequency:{value:2},uRipple:{value:.22},uBandDensity:{value:11},uLineSharpness:{value:5.5},uGlow:{value:.22},uColorSpread:{value:.7},uBrightness:{value:1},uContrast:{value:1.15},uSoftness:{value:1.4},uVignette:{value:.45},uOpacity:{value:1},uScanline:{value:1},uGrain:{value:1},uGrainIntensity:{value:.05},uDirection:{value:0},uMouse:{value:new Float32Array([.5,.5])},uMouseVelocity:{value:new Float32Array([0,0])},uMouseEnabled:{value:1},uMouseRadius:{value:.5},uMouseStrength:{value:.5},uMouseActive:{value:0},uClickPulse:{value:0},uColor1:{value:new Float32Array([1,1,1])},uColor2:{value:new Float32Array([1,1,1])},uColor3:{value:new Float32Array([1,1,1])}}}),u=new i(n,{geometry:c,program:l});p.set(e,{renderer:t,program:l,mesh:u});let m=()=>{let r=e.getBoundingClientRect(),i=Math.max(1,Math.floor(r.width)),a=Math.max(1,Math.floor(r.height));t.setSize(i,a);let o=l.uniforms.iResolution.value;o[0]=n.drawingBufferWidth,o[1]=n.drawingBufferHeight,t.render({scene:u})},h=new ResizeObserver(m);h.observe(e),m();let g=[.5,.5],_=[.5,.5],v=[.5,.5],y=[0,0],b=[0,0],x=0,S=0,C=0,w=e=>{let t=s.getBoundingClientRect();if(!(e.clientX>=t.left&&e.clientX<=t.right&&e.clientY>=t.top&&e.clientY<=t.bottom)){S=0;return}let n=[(e.clientX-t.left)/t.width,1-(e.clientY-t.top)/t.height];b=[n[0]-v[0],n[1]-v[1]],v=n,_=n,S=1},T=e=>{let t=s.getBoundingClientRect();e.clientX>=t.left&&e.clientX<=t.right&&e.clientY>=t.top&&e.clientY<=t.bottom&&(C=1)},E=()=>{S=0,b=[0,0]};window.addEventListener(`pointermove`,w,{passive:!0}),window.addEventListener(`pointerdown`,T,{passive:!0}),document.documentElement.addEventListener(`mouseleave`,E);let D=0,O=!0,k=!document.hidden,A=performance.now(),j=e=>{l.uniforms.iTime.value=(e-A)*.001,z.current||(S=0),g[0]+=.11*(_[0]-g[0]),g[1]+=.11*(_[1]-g[1]),y[0]+=.16*(b[0]-y[0]),y[1]+=.16*(b[1]-y[1]),b[0]*=.76,b[1]*=.76;let n=l.uniforms.uMouse.value;n[0]=g[0],n[1]=g[1];let r=l.uniforms.uMouseVelocity.value;r[0]=y[0],r[1]=y[1],x+=.09*(S-x),C*=.91,l.uniforms.uMouseActive.value=x,l.uniforms.uClickPulse.value=C,t.render({scene:u}),D=requestAnimationFrame(j)},M=()=>{O&&k&&D===0&&(D=requestAnimationFrame(j))},N=()=>{D!==0&&(cancelAnimationFrame(D),D=0)},P=new IntersectionObserver(([e])=>{O=e.isIntersecting,O?M():N()},{threshold:0});P.observe(e);let F=()=>{k=!document.hidden,k?M():N()};return document.addEventListener(`visibilitychange`,F),M(),()=>{N(),h.disconnect(),P.disconnect(),document.removeEventListener(`visibilitychange`,F),window.removeEventListener(`pointermove`,w),window.removeEventListener(`pointerdown`,T),document.documentElement.removeEventListener(`mouseleave`,E),p.delete(e);try{e.removeChild(s)}catch{}n.getExtension(`WEBGL_lose_context`)?.loseContext()}},[]),(0,s.useEffect)(()=>{let r=R.current;if(!r)return;let i=p.get(r);if(!i)return;let{program:a}=i,o=a.uniforms;o.uSpeed.value=m,o.uSweepSpeed.value=h,o.uSweepWidth.value=g,o.uSweepFalloff.value=_,o.uScale.value=v,o.uFrequency.value=y,o.uRipple.value=b,o.uBandDensity.value=x,o.uLineSharpness.value=S,o.uGlow.value=C,o.uColorSpread.value=T,o.uBrightness.value=E,o.uContrast.value=D,o.uSoftness.value=O,o.uVignette.value=k,o.uOpacity.value=N,o.uScanline.value=+!!A,o.uGrain.value=+!!j,o.uGrainIntensity.value=M,o.uDirection.value=u(w),o.uMouseEnabled.value=+!!P,o.uMouseRadius.value=F,o.uMouseStrength.value=I;let s=l(e),c=l(t),d=l(n);o.uColor1.value[0]=s[0],o.uColor1.value[1]=s[1],o.uColor1.value[2]=s[2],o.uColor2.value[0]=c[0],o.uColor2.value[1]=c[1],o.uColor2.value[2]=c[2],o.uColor3.value[0]=d[0],o.uColor3.value[1]=d[1],o.uColor3.value[2]=d[2],z.current=P},[m,h,g,_,v,y,b,x,S,C,T,E,D,O,k,N,A,j,M,w,P,F,I,e,t,n]),(0,c.jsx)(`div`,{ref:R,className:`scanner-container ${L}`.trim()})};export{m as default};