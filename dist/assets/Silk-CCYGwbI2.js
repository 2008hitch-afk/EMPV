import{o as e,r as t,t as n}from"./index-DpUCXyrw.js";import{i as r,l as i,r as a,t as o}from"./react-three-fiber.esm-BUfUTInR.js";var s=e(t(),1),c=n(),l=e=>{let t=e.replace(`#`,``);return[parseInt(t.slice(0,2),16)/255,parseInt(t.slice(2,4),16)/255,parseInt(t.slice(4,6),16)/255]},u=`
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,d=`
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;
uniform float uLightMode;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  float grain = rnd / 15.0 * uNoiseIntensity;
  vec3 result = uColor * pattern - vec3(grain);
if (uLightMode > 0.5) {
  float fold = smoothstep(0.28, 0.9, pattern);
  float specular = smoothstep(0.72, 0.98, pattern);
  vec3 shadowColor = uColor * 0.72;
  vec3 bodyColor = min(uColor * 1.18, vec3(1.0));
  vec3 lightBase = mix(shadowColor, bodyColor, fold);
  lightBase = mix(lightBase, vec3(1.0), specular * 0.92);
  float fineNoise = noise(gl_FragCoord.xy * 0.63 + vec2(17.0, 41.0));
  float grainSignal = (rnd + fineNoise - 1.0);
  float grainStrength = clamp(uNoiseIntensity * 0.038, 0.0, 0.16);
  result = lightBase + grainSignal * grainStrength;
}
  gl_FragColor = vec4(clamp(result, 0.0, 1.0), 1.0);
}
`,f=(0,s.forwardRef)(function({uniforms:e},t){let{viewport:n}=r();return(0,s.useLayoutEffect)(()=>{let e=t;e.current&&e.current.scale.set(n.width,n.height,1)},[t,n]),a((e,n)=>{let r=t;if(r.current){let e=r.current.material;e.uniforms.uTime.value+=.1*n}}),(0,c.jsxs)(`mesh`,{ref:t,children:[(0,c.jsx)(`planeGeometry`,{args:[1,1,1,1]}),(0,c.jsx)(`shaderMaterial`,{uniforms:e,vertexShader:u,fragmentShader:d})]})});f.displayName=`SilkPlane`;var p=({speed:e=5,scale:t=1,color:n=`#7B7481`,noiseIntensity:r=1.5,rotation:a=0,lightMode:u=!1})=>{let d=(0,s.useRef)(null),p=(0,s.useMemo)(()=>({uSpeed:{value:e},uScale:{value:t},uNoiseIntensity:{value:r},uColor:{value:new i(...l(n))},uRotation:{value:a},uLightMode:{value:+!!u},uTime:{value:0}}),[]);return(0,s.useEffect)(()=>{p.uSpeed.value=e,p.uScale.value=t,p.uNoiseIntensity.value=r,p.uColor.value.setRGB(...l(n)),p.uRotation.value=a,p.uLightMode.value=+!!u},[e,t,r,n,a,u,p]),(0,c.jsx)(o,{dpr:[1,2],frameloop:`always`,children:(0,c.jsx)(f,{ref:d,uniforms:p})})};export{p as default};