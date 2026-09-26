import{o as e,r as t,t as n}from"./index-DpUCXyrw.js";import{i as r,n as i,r as a,t as o}from"./Triangle-DmLXu-Tz.js";var s=e(t(),1),c=n(),l=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},u=e=>{switch(e){case`top-left`:return[1,0];case`bottom-right`:return[0,1];case`bottom-left`:return[1,1];default:return[0,0]}},d=({speed:e=2.5,rayColor1:t=`#EAB308`,rayColor2:n=`#96c8ff`,intensity:d=2,spread:f=2,origin:p=`top-right`,tilt:m=0,saturation:h=1.5,blend:g=.75,falloff:_=1.6,opacity:v=1,className:y=``})=>{let b=(0,s.useRef)(null),x=(0,s.useRef)(null),S=(0,s.useRef)(null),C=(0,s.useRef)(null),w=(0,s.useRef)(null),T=(0,s.useRef)(null),[E,D]=(0,s.useState)(!1),O=(0,s.useRef)(null);return(0,s.useEffect)(()=>{if(b.current)return O.current=new IntersectionObserver(e=>{let t=e[0];D(t.isIntersecting)},{threshold:.1}),O.current.observe(b.current),()=>{O.current&&=(O.current.disconnect(),null)}},[]),(0,s.useEffect)(()=>!E||!b.current?void 0:(T.current&&=(T.current(),null),(async()=>{if(!b.current||(await new Promise(e=>setTimeout(e,10)),!b.current))return;let s=new a({dpr:Math.min(window.devicePixelRatio,2),alpha:!0});S.current=s;let c=s.gl;for(c.canvas.style.width=`100%`,c.canvas.style.height=`100%`;b.current.firstChild;)b.current.removeChild(b.current.firstChild);b.current.appendChild(c.canvas);let[y,E]=u(p),D={iTime:{value:0},iResolution:{value:[1,1]},iSpeed:{value:e},iRayColor1:{value:l(t)},iRayColor2:{value:l(n)},iIntensity:{value:d},iSpread:{value:f},iFlipX:{value:y},iFlipY:{value:E},iTilt:{value:m},iSaturation:{value:h},iBlend:{value:g},iFalloff:{value:_},iOpacity:{value:v}};x.current=D;let O=new o(c),k=new r(c,{vertex:`
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`,fragment:`precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform float iSpeed;
uniform vec3 iRayColor1;
uniform vec3 iRayColor2;
uniform float iIntensity;
uniform float iSpread;
uniform float iFlipX;
uniform float iFlipY;
uniform float iTilt;
uniform float iSaturation;
uniform float iBlend;
uniform float iFalloff;
uniform float iOpacity;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
  return clamp(
    (0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)),
    0.0, 1.0) *
    clamp((iResolution.x - length(sourceToCoord)) / iResolution.x, 0.5, 1.0);
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  if (iFlipX > 0.5) fragCoord.x = iResolution.x - fragCoord.x;
  if (iFlipY > 0.5) fragCoord.y = iResolution.y - fragCoord.y;

  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  vec2 rayPos = vec2(iResolution.x * 1.1, -0.5 * iResolution.y);

  float tiltRad = iTilt * 3.14159265 / 180.0;
  float cs = cos(tiltRad);
  float sn = sin(tiltRad);
  vec2 rel = coord - rayPos;
  vec2 tiltedCoord = vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs) + rayPos;

  float halfSpread = iSpread * 0.275;
  vec2 rayRefDir1 = normalize(vec2(cos(0.785398 + halfSpread), sin(0.785398 + halfSpread)));
  vec2 rayRefDir2 = normalize(vec2(cos(0.785398 - halfSpread), sin(0.785398 - halfSpread)));

  vec4 rays1 = vec4(iRayColor1, 1.0) * rayStrength(rayPos, rayRefDir1, tiltedCoord, 36.2214, 21.11349, iSpeed);
  vec4 rays2 = vec4(iRayColor2, 1.0) * rayStrength(rayPos, rayRefDir2, tiltedCoord, 22.3991, 18.0234, iSpeed * 0.2);

  vec4 color = rays1 * (1.0 - iBlend) * 0.9 + rays2 * iBlend * 0.9;

  float distanceToLight = length(fragCoord.xy - vec2(rayPos.x, iResolution.y - rayPos.y)) / iResolution.y;
  float brightness = iIntensity * 0.4 / pow(max(distanceToLight, 0.001), iFalloff);
  color.rgb *= brightness;

  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = mix(vec3(gray), color.rgb, iSaturation);

  color.a = max(color.r, max(color.g, color.b)) * iOpacity;
  gl_FragColor = color;
}`,uniforms:D}),A=new i(c,{geometry:O,program:k});w.current=A;let j=()=>{if(!b.current||!s)return;s.dpr=Math.min(window.devicePixelRatio,2);let{clientWidth:e,clientHeight:t}=b.current;s.setSize(e,t),D.iResolution.value=[e*s.dpr,t*s.dpr]},M=e=>{if(S.current&&x.current&&w.current){D.iTime.value=e*.001;try{s.render({scene:A}),C.current=requestAnimationFrame(M)}catch{return}}};window.addEventListener(`resize`,j),j(),C.current=requestAnimationFrame(M),T.current=()=>{if(C.current&&=(cancelAnimationFrame(C.current),null),window.removeEventListener(`resize`,j),s)try{let e=s.gl.getExtension(`WEBGL_lose_context`);e&&e.loseContext();let t=s.gl.canvas;t&&t.parentNode&&t.parentNode.removeChild(t)}catch{}S.current=null,x.current=null,w.current=null}})(),()=>{T.current&&=(T.current(),null)}),[E,e,t,n,d,f,p,m,h,g,_,v]),(0,s.useEffect)(()=>{if(!x.current)return;let r=x.current;r.iSpeed.value=e,r.iRayColor1.value=l(t),r.iRayColor2.value=l(n),r.iIntensity.value=d,r.iSpread.value=f;let[i,a]=u(p);r.iFlipX.value=i,r.iFlipY.value=a,r.iTilt.value=m,r.iSaturation.value=h,r.iBlend.value=g,r.iFalloff.value=_,r.iOpacity.value=v},[e,t,n,d,f,p,m,h,g,_,v]),(0,c.jsx)(`div`,{ref:b,className:`side-rays-container ${y}`.trim()})};export{d as default};