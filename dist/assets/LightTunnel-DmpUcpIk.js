import{o as e,r as t,t as n}from"./index-DpUCXyrw.js";import{i as r,n as i,r as a,t as o}from"./Triangle-DmLXu-Tz.js";var s=e(t(),1),c=n(),l=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},u=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,d=`#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uFlowDir;
uniform float uPulseSpeed;
uniform float uPulseLength;
uniform float uPulseBlend;
uniform float uPulseWidth;
uniform float uCableCount;
uniform float uThickness;
uniform float uRimWidth;
uniform float uWaviness;
uniform float uSway;
uniform float uSize;
uniform vec2 uCenter;
uniform vec2 uMouseOffset;
uniform float uGlow;
uniform float uFadeNear;
uniform float uFadeFar;
uniform float uBrightness;
uniform float uColorVariance;
uniform float uOpacity;
uniform vec3 uCableColor;
uniform vec3 uPulseColor;
uniform vec3 uTunnelColor;
uniform float uTunnelOpacity;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uLightMode;
out vec4 fragColor;

void mainImage(out vec4 o, in vec2 fragCoord) {
  float size = uSize * 2.0;
  float flowDir = uFlowDir;
  float speedBase = uSpeed * 4.0 * flowDir;
  float waviness = uWaviness * 0.15;
  float rotationOsc = uSway * 0.5;
  float baseThick = uThickness * 0.35 + 0.05;
  float borderWeight = uRimWidth * 0.15 + 0.01;
  float cablesCount = floor(uCableCount);

  vec2 res = iResolution.xy;
  vec2 uv = (fragCoord - 0.5 * res) / min(res.y, res.x);
  uv -= (uCenter + uMouseOffset);
  uv /= (size + 0.0001);

  float r = length(uv);
  float angle = atan(uv.y, uv.x);
  float depth = -log(r + 0.0001);

  float swing = sin(iTime * (uSpeed * 0.5 + 0.1)) * rotationOsc;
  float waveOffset = sin(depth * 1.2 + iTime * speedBase * 0.25) * waviness;

  float angleNormalized = (angle / 6.2831853) + 0.5;
  float finalAngle = fract(angleNormalized + waveOffset + swing);

  float cableID = floor(finalAngle * cablesCount);
  float gvX = (fract(finalAngle * cablesCount) - 0.5);

  float rand = fract(sin(cableID * 12.9898) * 43758.5453);
  float randSpeed = (0.4 + rand * 0.6) * speedBase * uPulseSpeed;
  float cableThick = baseThick * (0.6 + rand * 0.4);

  vec3 cableCol = uCableColor;
  cableCol *= 1.0 + (rand - 0.5) * 0.4 * uColorVariance;
  cableCol = mix(cableCol, uPulseColor, rand * 0.25 * uColorVariance);

  float scroll = depth + (iTime * randSpeed);
  float pulseFact = fract(scroll);

  float distToCore = abs(gvX);
  float wireMask = smoothstep(cableThick, cableThick - 0.05, distToCore);
  float rimGlow = smoothstep(borderWeight, 0.0, abs(distToCore - cableThick));

  float pulseThick = cableThick * uPulseWidth;
  float pulseMask = smoothstep(pulseThick, pulseThick - 0.05 * uPulseWidth, distToCore);

  float pulseDist = abs(pulseFact - 0.5);
  float pulseTotal = uPulseLength;
  float pulseCore = pulseTotal * (1.0 - uPulseBlend);
  float pulseLo = min(pulseCore, pulseTotal - max(fwidth(scroll), 1e-4));
  float dataPulse = 1.0 - smoothstep(pulseLo, pulseTotal, pulseDist);

  float aBody = wireMask * uTunnelOpacity;
  float aRim = rimGlow;
  float aPulse = clamp(dataPulse * pulseMask, 0.0, 1.0);

  vec3 fiberCol = uTunnelColor * aBody
    + cableCol * aRim * 1.3 * uGlow
    + uPulseColor * dataPulse * 3.0 * pulseMask;

  float distFade = smoothstep(0.0, uFadeNear, r) * smoothstep(uFadeFar, uFadeFar - 0.9, r);
  float inten = clamp(aBody + aRim + aPulse, 0.0, 1.0) * distFade;

  vec3 finalCol = fiberCol * uBrightness;
  float alpha = clamp(inten, 0.0, 1.0) * uOpacity;
  vec3 outRgb = finalCol * alpha;

  if (uGrain > 0.5) {
    float gv = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453) - 0.5) * uGrainIntensity;
    outRgb = clamp(outRgb + gv, 0.0, 1.0);
    alpha = clamp(alpha + gv, 0.0, 1.0);
  }

  o = vec4(outRgb, alpha);
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  if (uLightMode > 0.5) {
    float peak = max(o.r, max(o.g, o.b));
    vec3 chroma = pow(clamp(o.rgb / max(peak, 0.0001), 0.0, 1.0), vec3(1.16));
    fragColor = vec4(mix(vec3(1.0), chroma, o.a * 0.95), 1.0);
  } else {
    fragColor = o;
  }
}
`,f=new WeakMap,p=({cableColor:e=`#A855F7`,pulseColor:t=`#A855F7`,tunnelColor:n=`#5227FF`,tunnelOpacity:p=0,speed:m=.1,flowDirection:h=`outward`,pulseSpeed:g=2,pulseLength:_=.28,pulseBlend:v=1,pulseWidth:y=1,cableCount:b=20,thickness:x=.35,rimWidth:S=.15,waviness:C=.3,sway:w=.5,size:T=1,centerX:E=0,centerY:D=0,glow:O=1,fadeNear:k=.5,fadeFar:A=2,brightness:j=1,colorVariance:M=!0,grain:N=!0,grainIntensity:P=.05,opacity:F=1,mouseInteraction:I=!0,mouseStrength:L=.1,lightMode:R=!1,className:z=``})=>{let B=(0,s.useRef)(null),V=(0,s.useRef)(I),H=(0,s.useRef)(L);return(0,s.useEffect)(()=>{let e=B.current;if(!e)return;let t=new a({webgl:2,alpha:!0,premultipliedAlpha:!0,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,2)}),n=t.gl;n.clearColor(0,0,0,0);let s=n.canvas;s.style.width=`100%`,s.style.height=`100%`,s.style.display=`block`,e.appendChild(s);let c=new o(n),l=new r(n,{vertex:u,fragment:d,uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uSpeed:{value:.1},uFlowDir:{value:-1},uPulseSpeed:{value:2},uPulseLength:{value:.28},uPulseBlend:{value:1},uPulseWidth:{value:1},uCableCount:{value:20},uThickness:{value:.35},uRimWidth:{value:.15},uWaviness:{value:.3},uSway:{value:.5},uSize:{value:1},uCenter:{value:new Float32Array([0,0])},uMouseOffset:{value:new Float32Array([0,0])},uGlow:{value:1},uFadeNear:{value:.5},uFadeFar:{value:2},uBrightness:{value:1},uColorVariance:{value:1},uOpacity:{value:1},uCableColor:{value:new Float32Array([.65882353,.33333333,.96862745])},uPulseColor:{value:new Float32Array([.65882353,.33333333,.96862745])},uTunnelColor:{value:new Float32Array([.32156863,.15294118,1])},uTunnelOpacity:{value:0},uGrain:{value:1},uGrainIntensity:{value:.05},uLightMode:{value:0}}}),p=new i(n,{geometry:c,program:l});f.set(e,{renderer:t,program:l,mesh:p});let m=()=>{let r=e.getBoundingClientRect(),i=Math.max(1,Math.floor(r.width)),a=Math.max(1,Math.floor(r.height));t.setSize(i,a);let o=l.uniforms.iResolution.value;o[0]=n.drawingBufferWidth,o[1]=n.drawingBufferHeight,t.render({scene:p})},h=new ResizeObserver(m);h.observe(e),m();let g=[.5,.5],_=[.5,.5],v=e=>{let t=s.getBoundingClientRect();_=[(e.clientX-t.left)/t.width,1-(e.clientY-t.top)/t.height]},y=()=>{_=[.5,.5]};s.addEventListener(`mousemove`,v),s.addEventListener(`mouseleave`,y);let b=0,x=!0,S=!document.hidden,C=performance.now(),w=e=>{l.uniforms.iTime.value=(e-C)*.001,V.current?(g[0]+=.05*(_[0]-g[0]),g[1]+=.05*(_[1]-g[1])):(g[0]+=.05*(.5-g[0]),g[1]+=.05*(.5-g[1]));let n=l.uniforms.uMouseOffset.value;n[0]=(g[0]-.5)*H.current,n[1]=(g[1]-.5)*H.current,t.render({scene:p}),b=requestAnimationFrame(w)},T=()=>{x&&S&&b===0&&(b=requestAnimationFrame(w))},E=()=>{b!==0&&(cancelAnimationFrame(b),b=0)},D=new IntersectionObserver(([e])=>{x=e.isIntersecting,x?T():E()},{threshold:0});D.observe(e);let O=()=>{S=!document.hidden,S?T():E()};return document.addEventListener(`visibilitychange`,O),T(),()=>{E(),h.disconnect(),D.disconnect(),document.removeEventListener(`visibilitychange`,O),s.removeEventListener(`mousemove`,v),s.removeEventListener(`mouseleave`,y),f.delete(e);try{e.removeChild(s)}catch{}n.getExtension(`WEBGL_lose_context`)?.loseContext()}},[]),(0,s.useEffect)(()=>{V.current=I,H.current=L;let r=B.current;if(!r)return;let i=f.get(r);if(!i)return;let{program:a}=i,o=a.uniforms;o.uSpeed.value=m,o.uFlowDir.value=h===`outward`?-1:1,o.uPulseSpeed.value=g,o.uPulseLength.value=_,o.uPulseBlend.value=v,o.uPulseWidth.value=y,o.uCableCount.value=b,o.uThickness.value=x,o.uRimWidth.value=S,o.uWaviness.value=C,o.uSway.value=w,o.uSize.value=T;let s=o.uCenter.value;s[0]=E,s[1]=D,o.uGlow.value=O,o.uFadeNear.value=k,o.uFadeFar.value=A,o.uBrightness.value=j,o.uColorVariance.value=+!!M,o.uGrain.value=+!!N,o.uGrainIntensity.value=P,o.uOpacity.value=F,o.uLightMode.value=+!!R;let c=l(e),u=o.uCableColor.value;u[0]=c[0],u[1]=c[1],u[2]=c[2];let d=l(t),z=o.uPulseColor.value;z[0]=d[0],z[1]=d[1],z[2]=d[2];let U=l(n),W=o.uTunnelColor.value;W[0]=U[0],W[1]=U[1],W[2]=U[2],o.uTunnelOpacity.value=p},[e,t,n,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R]),(0,c.jsx)(`div`,{ref:B,className:`light-tunnel-container ${z}`.trim()})};export{p as default};