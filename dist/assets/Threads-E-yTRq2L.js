import{o as e,r as t,t as n}from"./index-DpUCXyrw.js";import{i as r,n as i,r as a,t as o}from"./Triangle-DmLXu-Tz.js";import{t as s}from"./Color-xVu7ktDx.js";var c=e(t(),1),l=n(),u=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,d=`
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

float Perlin2D(vec2 P) {
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    float xnoise = mix(
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
        st.x * 0.3
    );

    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float line_start = smoothstep(
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`,f=({color:e=[1,1,1],amplitude:t=1,distance:n=0,enableMouseInteraction:f=!1,...p})=>{let m=(0,c.useRef)(null),h=(0,c.useRef)(0),g=(0,c.useRef)({color:e,amplitude:t,distance:n,enableMouseInteraction:f});return g.current={color:e,amplitude:t,distance:n,enableMouseInteraction:f},(0,c.useEffect)(()=>{if(!m.current)return;let e=m.current,t=new a({alpha:!0}),n=t.gl;n.clearColor(0,0,0,0),n.enable(n.BLEND),n.blendFunc(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA),e.appendChild(n.canvas);let c=new o(n),l=new r(n,{vertex:u,fragment:d,uniforms:{iTime:{value:0},iResolution:{value:new s(n.canvas.width,n.canvas.height,n.canvas.width/n.canvas.height)},uColor:{value:new s(...g.current.color)},uAmplitude:{value:g.current.amplitude},uDistance:{value:g.current.distance},uMouse:{value:new Float32Array([.5,.5])}}}),f=new i(n,{geometry:c,program:l}),p=1920;function _(){let{clientWidth:r,clientHeight:i}=e,a=Math.min(window.devicePixelRatio||1,2),o=Math.max(r,i)*a,s=o>p?a*p/o:a;t.dpr=s,t.setSize(r,i),l.uniforms.iResolution.value.r=n.canvas.width,l.uniforms.iResolution.value.g=n.canvas.height,l.uniforms.iResolution.value.b=n.canvas.width/n.canvas.height}let v=new ResizeObserver(_);v.observe(e),window.addEventListener(`resize`,_),_();let y=[.5,.5],b=[.5,.5];function x(t){let n=e.getBoundingClientRect();b=[(t.clientX-n.left)/n.width,1-(t.clientY-n.top)/n.height]}function S(){b=[.5,.5]}e.addEventListener(`mousemove`,x),e.addEventListener(`mouseleave`,S);let C=!0,w=new IntersectionObserver(e=>{C=e[0].isIntersecting},{threshold:0});w.observe(e);function T(e){if(h.current=requestAnimationFrame(T),!C||document.hidden)return;let{color:n,amplitude:r,distance:i,enableMouseInteraction:a}=g.current;if(l.uniforms.uColor.value.set(...n),l.uniforms.uAmplitude.value=r,l.uniforms.uDistance.value=i,a){let e=.05;y[0]+=e*(b[0]-y[0]),y[1]+=e*(b[1]-y[1]),l.uniforms.uMouse.value[0]=y[0],l.uniforms.uMouse.value[1]=y[1]}else l.uniforms.uMouse.value[0]=.5,l.uniforms.uMouse.value[1]=.5;l.uniforms.iTime.value=e*.001,t.render({scene:f})}return h.current=requestAnimationFrame(T),()=>{h.current&&cancelAnimationFrame(h.current),v.disconnect(),w.disconnect(),window.removeEventListener(`resize`,_),e.removeEventListener(`mousemove`,x),e.removeEventListener(`mouseleave`,S),e.contains(n.canvas)&&e.removeChild(n.canvas),n.getExtension(`WEBGL_lose_context`)?.loseContext()}},[]),(0,l.jsx)(`div`,{ref:m,className:`threads-container`,...p})};export{f as default};