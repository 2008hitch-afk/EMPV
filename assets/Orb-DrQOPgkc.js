import{o as e,r as t,t as n}from"./index-DpUCXyrw.js";import{a as r,i,n as a,r as o,t as s}from"./Triangle-DmLXu-Tz.js";var c=e(t(),1),l=n();function u({hue:e=0,hoverIntensity:t=.2,rotateOnHover:n=!0,forceHoverState:u=!1,backgroundColor:d=`#000000`}){let p=(0,c.useRef)(null);return(0,c.useEffect)(()=>{let c=p.current;if(!c)return;let l=new o({alpha:!0,premultipliedAlpha:!1}),m=l.gl;m.clearColor(0,0,0,0),c.appendChild(m.canvas);let h=new s(m),g=new i(m,{vertex:`
    precision highp float;
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `,fragment:`
    precision highp float;

    uniform float iTime;
    uniform vec3 iResolution;
    uniform float hue;
    uniform float hover;
    uniform float rot;
    uniform float hoverIntensity;
    uniform vec3 backgroundColor;
    varying vec2 vUv;

    vec3 rgb2yiq(vec3 c) {
      float y = dot(c, vec3(0.299, 0.587, 0.114));
      float i = dot(c, vec3(0.596, -0.274, -0.322));
      float q = dot(c, vec3(0.211, -0.523, 0.312));
      return vec3(y, i, q);
    }
    
    vec3 yiq2rgb(vec3 c) {
      float r = c.x + 0.956 * c.y + 0.621 * c.z;
      float g = c.x - 0.272 * c.y - 0.647 * c.z;
      float b = c.x - 1.106 * c.y + 1.703 * c.z;
      return vec3(r, g, b);
    }
    
    vec3 adjustHue(vec3 color, float hueDeg) {
      float hueRad = hueDeg * 3.14159265 / 180.0;
      vec3 yiq = rgb2yiq(color);
      float cosA = cos(hueRad);
      float sinA = sin(hueRad);
      float i = yiq.y * cosA - yiq.z * sinA;
      float q = yiq.y * sinA + yiq.z * cosA;
      yiq.y = i;
      yiq.z = q;
      return yiq2rgb(yiq);
    }
    
    vec3 hash33(vec3 p3) {
      p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
      p3 += dot(p3, p3.yxz + 19.19);
      return -1.0 + 2.0 * fract(vec3(
        p3.x + p3.y,
        p3.x + p3.z,
        p3.y + p3.z
      ) * p3.zyx);
    }
    
    float snoise3(vec3 p) {
      const float K1 = 0.333333333;
      const float K2 = 0.166666667;
      vec3 i = floor(p + (p.x + p.y + p.z) * K1);
      vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
      vec3 e = step(vec3(0.0), d0 - d0.yzx);
      vec3 i1 = e * (1.0 - e.zxy);
      vec3 i2 = 1.0 - e.zxy * (1.0 - e);
      vec3 d1 = d0 - (i1 - K2);
      vec3 d2 = d0 - (i2 - K1);
      vec3 d3 = d0 - 0.5;
      vec4 h = max(0.6 - vec4(
        dot(d0, d0),
        dot(d1, d1),
        dot(d2, d2),
        dot(d3, d3)
      ), 0.0);
      vec4 n = h * h * h * h * vec4(
        dot(d0, hash33(i)),
        dot(d1, hash33(i + i1)),
        dot(d2, hash33(i + i2)),
        dot(d3, hash33(i + 1.0))
      );
      return dot(vec4(31.316), n);
    }
    
    vec4 extractAlpha(vec3 colorIn) {
      float a = max(max(colorIn.r, colorIn.g), colorIn.b);
      return vec4(colorIn.rgb / (a + 1e-5), a);
    }
    
    const vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);
    const vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);
    const vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);
    const float innerRadius = 0.6;
    const float noiseScale = 0.65;
    
    float light1(float intensity, float attenuation, float dist) {
      return intensity / (1.0 + dist * attenuation);
    }
    
    float light2(float intensity, float attenuation, float dist) {
      return intensity / (1.0 + dist * dist * attenuation);
    }
    
    vec4 draw(vec2 uv) {
      vec3 color1 = adjustHue(baseColor1, hue);
      vec3 color2 = adjustHue(baseColor2, hue);
      vec3 color3 = adjustHue(baseColor3, hue);
      
      float ang = atan(uv.y, uv.x);
      float len = length(uv);
      float invLen = len > 0.0 ? 1.0 / len : 0.0;
      
      float bgLuminance = dot(backgroundColor, vec3(0.299, 0.587, 0.114));
      
      float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;
      float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);
      float d0 = distance(uv, (r0 * invLen) * uv);
      float v0 = light1(1.0, 10.0, d0);

      v0 *= smoothstep(r0 * 1.05, r0, len);
      float innerFade = smoothstep(r0 * 0.8, r0 * 0.95, len);
      v0 *= mix(innerFade, 1.0, bgLuminance * 0.7);
      float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;
      
      float a = iTime * -1.0;
      vec2 pos = vec2(cos(a), sin(a)) * r0;
      float d = distance(uv, pos);
      float v1 = light2(1.5, 5.0, d);
      v1 *= light1(1.0, 50.0, d0);
      
      float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);
      float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);
      
      vec3 colBase = mix(color1, color2, cl);
      float fadeAmount = mix(1.0, 0.1, bgLuminance);
      
      vec3 darkCol = mix(color3, colBase, v0);
      darkCol = (darkCol + v1) * v2 * v3;
      darkCol = clamp(darkCol, 0.0, 1.0);
      
      vec3 lightCol = (colBase + v1) * mix(1.0, v2 * v3, fadeAmount);
      lightCol = mix(backgroundColor, lightCol, v0);
      lightCol = clamp(lightCol, 0.0, 1.0);
      
      vec3 finalCol = mix(darkCol, lightCol, bgLuminance);
      
      return extractAlpha(finalCol);
    }
    
    vec4 mainImage(vec2 fragCoord) {
      vec2 center = iResolution.xy * 0.5;
      float size = min(iResolution.x, iResolution.y);
      vec2 uv = (fragCoord - center) / size * 2.0;
      
      float angle = rot;
      float s = sin(angle);
      float c = cos(angle);
      uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);
      
      uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);
      uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);
      
      return draw(uv);
    }
    
    void main() {
      vec2 fragCoord = vUv * iResolution.xy;
      vec4 col = mainImage(fragCoord);
      gl_FragColor = vec4(col.rgb * col.a, col.a);
    }
  `,uniforms:{iTime:{value:0},iResolution:{value:new r(m.canvas.width,m.canvas.height,m.canvas.width/m.canvas.height)},hue:{value:e},hover:{value:0},rot:{value:0},hoverIntensity:{value:t},backgroundColor:{value:f(d)}}}),_=new a(m,{geometry:h,program:g});function v(){if(!c)return;let e=window.devicePixelRatio||1,t=c.clientWidth,n=c.clientHeight;l.setSize(t*e,n*e),m.canvas.style.width=t+`px`,m.canvas.style.height=n+`px`,g.uniforms.iResolution.value.set(m.canvas.width,m.canvas.height,m.canvas.width/m.canvas.height)}window.addEventListener(`resize`,v),v();let y=0,b=0,x=0,S=e=>{let t=c.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top,i=t.width,a=t.height,o=Math.min(i,a),s=i/2,l=a/2,u=(n-s)/o*2,d=(r-l)/o*2;y=+(Math.sqrt(u*u+d*d)<.8)},C=()=>{y=0};c.addEventListener(`mousemove`,S),c.addEventListener(`mouseleave`,C);let w,T=r=>{w=requestAnimationFrame(T);let i=(r-b)*.001;b=r,g.uniforms.iTime.value=r*.001,g.uniforms.hue.value=e,g.uniforms.hoverIntensity.value=t;let a=u?1:y;g.uniforms.hover.value+=(a-g.uniforms.hover.value)*.1,n&&a>.5&&(x+=i*.3),g.uniforms.rot.value=x,g.uniforms.backgroundColor.value=f(d),l.render({scene:_})};return w=requestAnimationFrame(T),()=>{cancelAnimationFrame(w),window.removeEventListener(`resize`,v),c.removeEventListener(`mousemove`,S),c.removeEventListener(`mouseleave`,C),c.removeChild(m.canvas),m.getExtension(`WEBGL_lose_context`)?.loseContext()}},[e,t,n,u,d]),(0,l.jsx)(`div`,{ref:p,className:`orb-container`})}function d(e,t,n){let i,a,o;if(t===0)i=a=o=n;else{let r=(e,t,n)=>(n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e),s=n<.5?n*(1+t):n+t-n*t,c=2*n-s;i=r(c,s,e+1/3),a=r(c,s,e),o=r(c,s,e-1/3)}return new r(i,a,o)}function f(e){if(e.startsWith(`#`)){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,i=parseInt(e.slice(5,7),16)/255;return new r(t,n,i)}let t=e.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(t)return new r(parseInt(t[1])/255,parseInt(t[2])/255,parseInt(t[3])/255);let n=e.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%/);return n?d(parseInt(n[1])/360,parseInt(n[2])/100,parseInt(n[3])/100):new r(0,0,0)}export{u as default};