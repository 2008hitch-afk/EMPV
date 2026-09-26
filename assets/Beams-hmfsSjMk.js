import{o as e,r as t,t as n}from"./index-DpUCXyrw.js";import{A as r,D as i,F as a,a as o,c as s,d as c,h as l,i as u,l as d,m as f,p,r as m,s as h,t as g,x as _}from"./react-three-fiber.esm-BUfUTInR.js";function v(){return v=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},v.apply(null,arguments)}var y=e(t());function b(e,t,n){let r=u(e=>e.size),i=u(e=>e.viewport),o=typeof e==`number`?e:r.width*i.dpr,s=typeof t==`number`?t:r.height*i.dpr,d=(typeof e==`number`?n:e)||{},{samples:m=0,depth:h,...g}=d,_=h??d.depthBuffer,v=y.useMemo(()=>{let e=new a(o,s,{minFilter:l,magFilter:l,type:f,...g});return _&&(e.depthTexture=new c(o,s,p)),e.samples=m,e},[]);return y.useLayoutEffect(()=>{v.setSize(o,s),m&&(v.samples=m)},[m,v,o,s]),y.useEffect(()=>()=>v.dispose(),[]),v}var x=e=>typeof e==`function`,S=y.forwardRef(({envMap:e,resolution:t=256,frames:n=1/0,makeDefault:r,children:i,...a},o)=>{let s=u(({set:e})=>e),c=u(({camera:e})=>e),l=u(({size:e})=>e),d=y.useRef(null);y.useImperativeHandle(o,()=>d.current,[]);let f=y.useRef(null),p=b(t);y.useLayoutEffect(()=>{a.manual||(d.current.aspect=l.width/l.height)},[l,a]),y.useLayoutEffect(()=>{d.current.updateProjectionMatrix()});let h=0,g=null,_=x(i);return m(t=>{_&&(n===1/0||h<n)&&(f.current.visible=!1,t.gl.setRenderTarget(p),g=t.scene.background,e&&(t.scene.background=e),t.gl.render(t.scene,d.current),t.scene.background=g,t.gl.setRenderTarget(null),f.current.visible=!0,h++)}),y.useLayoutEffect(()=>{if(r){let e=c;return s(()=>({camera:d.current})),()=>s(()=>({camera:e}))}},[d,r,s]),y.createElement(y.Fragment,null,y.createElement(`perspectiveCamera`,v({ref:d},a),!_&&i),y.createElement(`group`,{ref:f},_&&i(p.texture)))}),C=Math.PI/180;function w(e){return e*C}var T=n();function E(e,t){let n=o.physical,{vertexShader:a,fragmentShader:s,uniforms:c}=n,l=n.defines??{},u=r.clone(c),d=new e(t.material||{});d.color&&(u.diffuse.value=d.color),`roughness`in d&&(u.roughness.value=d.roughness),`metalness`in d&&(u.metalness.value=d.metalness),`envMap`in d&&(u.envMap.value=d.envMap),`envMapIntensity`in d&&(u.envMapIntensity.value=d.envMapIntensity),Object.entries(t.uniforms??{}).forEach(([e,t])=>{u[e]=typeof t==`object`&&t&&`value`in t?t:{value:t}});let f=`${t.header}\n${t.vertexHeader??``}\n${a}`,p=`${t.header}\n${t.fragmentHeader??``}\n${s}`;for(let[e,n]of Object.entries(t.vertex??{}))f=f.replace(e,`${e}\n${n}`);for(let[e,n]of Object.entries(t.fragment??{}))p=p.replace(e,`${e}\n${n}`);return new i({defines:{...l},uniforms:u,vertexShader:f,fragmentShader:p,lights:!0,fog:!!t.material?.fog})}var D=({children:e})=>(0,T.jsx)(g,{dpr:[1,2],frameloop:`always`,className:`beams-container`,children:e}),O=e=>{let t=e.replace(`#`,``),n=parseInt(t.substring(0,2),16),r=parseInt(t.substring(2,4),16),i=parseInt(t.substring(4,6),16);return[n/255,r/255,i/255]},k=`
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) +
           (c - a)* u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
}
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
float cnoise(vec3 P){
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;
  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);
  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x,Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x,Pf1.y,Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy,Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy,Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x,Pf0.y,Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x,Pf1.yz));
  float n111 = dot(g111, Pf1);
  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
  vec2 n_yz = mix(n_z.xy,n_z.zw,fade_xyz.y);
  float n_xyz = mix(n_yz.x,n_yz.y,fade_xyz.x);
  return 2.2 * n_xyz;
}
`,A=({beamWidth:e=2,beamHeight:t=15,beamNumber:n=12,lightColor:r=`#ffffff`,beamColor:i=`#000000`,backgroundColor:a=`#000000`,speed:o=2,noiseIntensity:s=1.75,scale:c=.2,rotation:l=0,lightMode:u=!1})=>{let f=(0,y.useRef)(null),p=(0,y.useMemo)(()=>E(_,{header:`
  varying vec3 vEye;
  varying float vNoise;
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float time;
  uniform float uSpeed;
  uniform float uNoiseIntensity;
  uniform float uScale;
  ${k}`,vertexHeader:`
  float getPos(vec3 pos) {
    vec3 noisePos =
      vec3(pos.x * 0., pos.y - uv.y, pos.z + time * uSpeed * 3.) * uScale;
    return cnoise(noisePos);
  }
  vec3 getCurrentPos(vec3 pos) {
    vec3 newpos = pos;
    newpos.z += getPos(pos);
    return newpos;
  }
  vec3 getNormal(vec3 pos) {
    vec3 curpos = getCurrentPos(pos);
    vec3 nextposX = getCurrentPos(pos + vec3(0.01, 0.0, 0.0));
    vec3 nextposZ = getCurrentPos(pos + vec3(0.0, -0.01, 0.0));
    vec3 tangentX = normalize(nextposX - curpos);
    vec3 tangentZ = normalize(nextposZ - curpos);
    return normalize(cross(tangentZ, tangentX));
  }`,fragmentHeader:`uniform float uLightMode;`,vertex:{"#include <begin_vertex>":`transformed.z += getPos(transformed.xyz);`,"#include <beginnormal_vertex>":`objectNormal = getNormal(position.xyz);`},fragment:{"#include <dithering_fragment>":`
    float randomNoise = noise(gl_FragCoord.xy);
    gl_FragColor.rgb -= randomNoise / 15. * uNoiseIntensity;
    if (uLightMode > 0.5) {
      float energy = max(max(gl_FragColor.r, gl_FragColor.g), gl_FragColor.b);
      vec3 chroma = clamp(gl_FragColor.rgb / max(energy, 0.0001), 0.0, 1.0);
      chroma = pow(chroma, vec3(1.2));
      gl_FragColor.rgb = mix(vec3(1.0), chroma, clamp(energy * 0.98, 0.0, 0.94));
    }`},material:{fog:!0},uniforms:{diffuse:new d(...O(i)),time:{shared:!0,mixed:!0,linked:!0,value:0},roughness:.3,metalness:.3,uSpeed:{shared:!0,mixed:!0,linked:!0,value:o},envMapIntensity:10,uNoiseIntensity:s,uScale:c,uLightMode:+!!u}}),[i,o,s,c,u]);return(0,T.jsxs)(D,{children:[(0,T.jsxs)(`group`,{rotation:[0,0,w(l)],children:[(0,T.jsx)(N,{ref:f,material:p,count:n,width:e,height:t}),(0,T.jsx)(P,{color:r,position:[0,3,10]})]}),(0,T.jsx)(`ambientLight`,{intensity:1}),(0,T.jsx)(`color`,{attach:`background`,args:[a]}),(0,T.jsx)(S,{makeDefault:!0,position:[0,0,20],fov:30})]})};function j(e,t,n,r,i){let a=new s,o=e*(i+1)*2,c=e*i*2,l=new Float32Array(o*3),u=new Uint32Array(c*3),d=new Float32Array(o*2),f=0,p=0,m=0,g=-(e*t+(e-1)*r)/2;for(let a=0;a<e;a++){let e=g+a*(t+r),o=Math.random()*300,s=Math.random()*300;for(let r=0;r<=i;r++){let a=n*(r/i-.5),c=[e,a,0],h=[e+t,a,0];l.set([...c,...h],f*3);let g=r/i;if(d.set([o,g+s,o+1,g+s],m),r<i){let e=f,t=f+1,n=f+2,r=f+3;u.set([e,t,n,n,t,r],p),p+=6}f+=2,m+=4}}return a.setAttribute(`position`,new h(l,3)),a.setAttribute(`uv`,new h(d,2)),a.setIndex(new h(u,1)),a.computeVertexNormals(),a}var M=(0,y.forwardRef)(({material:e,width:t,count:n,height:r},i)=>{let a=(0,y.useRef)(null);(0,y.useImperativeHandle)(i,()=>a.current);let o=(0,y.useMemo)(()=>j(n,t,r,0,100),[n,t,r]);return m((e,t)=>{a.current.material.uniforms.time.value+=.1*t}),(0,T.jsx)(`mesh`,{ref:a,geometry:o,material:e})});M.displayName=`MergedPlanes`;var N=(0,y.forwardRef)((e,t)=>(0,T.jsx)(M,{ref:t,material:e.material,width:e.width,count:e.count,height:e.height}));N.displayName=`PlaneNoise`;var P=({position:e,color:t})=>{let n=(0,y.useRef)(null);return(0,y.useEffect)(()=>{if(!n.current)return;let e=n.current.shadow.camera;e.top=24,e.bottom=-24,e.left=-24,e.right=24,e.far=64,n.current.shadow.bias=-.004},[]),(0,T.jsx)(`directionalLight`,{ref:n,color:t,intensity:1,position:e})};export{A as default};