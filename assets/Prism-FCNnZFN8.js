import{o as e,r as t,t as n}from"./index-DpUCXyrw.js";import{i as r,n as i,r as a,t as o}from"./Triangle-DmLXu-Tz.js";var s=e(t(),1),c=n(),l=({height:e=3.5,baseWidth:t=5.5,animationType:n=`rotate`,glow:l=1,offset:u={x:0,y:0},noise:d=.5,transparent:f=!0,scale:p=3.6,hueShift:m=0,colorFrequency:h=1,hoverStrength:g=2,inertia:_=.05,bloom:v=1,suspendWhenOffscreen:y=!1,timeScale:b=.5,lightMode:x=!1})=>{let S=(0,s.useRef)(null);return(0,s.useEffect)(()=>{let s=S.current;if(!s)return;let c=Math.max(.001,e),C=Math.max(.001,t)*.5,ee=Math.max(0,l),w=Math.max(0,d),te=u?.x??0,ne=u?.y??0,re=f?1.5:1,T=Math.max(.001,p),ie=m||0,ae=Math.max(0,h||1),oe=Math.max(0,v||1),E=Math.max(0,b||1),D=Math.max(0,g||1),O=Math.max(0,Math.min(1,_||.12)),k=Math.min(2,window.devicePixelRatio||1),A=new a({dpr:k,alpha:f,antialias:!1}),j=A.gl;j.disable(j.DEPTH_TEST),j.disable(j.CULL_FACE),j.disable(j.BLEND),Object.assign(j.canvas.style,{position:`absolute`,inset:`0`,width:`100%`,height:`100%`,display:`block`}),s.appendChild(j.canvas);let se=new o(j),M=new Float32Array(2),N=new Float32Array(2),P=new r(j,{vertex:`
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `,fragment:`
      precision highp float;

      uniform vec2  iResolution;
      uniform float iTime;

      uniform float uHeight;
      uniform float uBaseHalf;
      uniform mat3  uRot;
      uniform int   uUseBaseWobble;
      uniform float uGlow;
      uniform vec2  uOffsetPx;
      uniform float uNoise;
      uniform float uSaturation;
      uniform float uScale;
      uniform float uHueShift;
      uniform float uColorFreq;
      uniform float uBloom;
      uniform float uCenterShift;
      uniform float uInvBaseHalf;
      uniform float uInvHeight;
      uniform float uMinAxis;
      uniform float uPxScale;
      uniform float uTimeScale;
      uniform float uLightMode;

      vec4 tanh4(vec4 x){
        vec4 e2x = exp(2.0*x);
        return (e2x - 1.0) / (e2x + 1.0);
      }

      float rand(vec2 co){
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float sdOctaAnisoInv(vec3 p){
        vec3 q = vec3(abs(p.x) * uInvBaseHalf, abs(p.y) * uInvHeight, abs(p.z) * uInvBaseHalf);
        float m = q.x + q.y + q.z - 1.0;
        return m * uMinAxis * 0.5773502691896258;
      }

      float sdPyramidUpInv(vec3 p){
        float oct = sdOctaAnisoInv(p);
        float halfSpace = -p.y;
        return max(oct, halfSpace);
      }

      mat3 hueRotation(float a){
        float c = cos(a), s = sin(a);
        mat3 W = mat3(
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114
        );
        mat3 U = mat3(
           0.701, -0.587, -0.114,
          -0.299,  0.413, -0.114,
          -0.300, -0.588,  0.886
        );
        mat3 V = mat3(
           0.168, -0.331,  0.500,
           0.328,  0.035, -0.500,
          -0.497,  0.296,  0.201
        );
        return W + U * c + V * s;
      }

      void main(){
        vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;

        float z = 5.0;
        float d = 0.0;

        vec3 p;
        vec4 o = vec4(0.0);

        float centerShift = uCenterShift;
        float cf = uColorFreq;

        mat2 wob = mat2(1.0);
        if (uUseBaseWobble == 1) {
          float t = iTime * uTimeScale;
          float c0 = cos(t + 0.0);
          float c1 = cos(t + 33.0);
          float c2 = cos(t + 11.0);
          wob = mat2(c0, c1, c2, c0);
        }

        const int STEPS = 100;
        for (int i = 0; i < STEPS; i++) {
          p = vec3(f, z);
          p.xz = p.xz * wob;
          p = uRot * p;
          vec3 q = p;
          q.y += centerShift;
          d = 0.1 + 0.2 * abs(sdPyramidUpInv(q));
          z -= d;
          o += (sin((p.y + z) * cf + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;
        }

        o = tanh4(o * o * (uGlow * uBloom) / 1e5);

        vec3 col = o.rgb;
        float n = rand(gl_FragCoord.xy + vec2(iTime));
        col += (n - 0.5) * uNoise;
        col = clamp(col, 0.0, 1.0);

        float L = dot(col, vec3(0.2126, 0.7152, 0.0722));
        col = clamp(mix(vec3(L), col, uSaturation), 0.0, 1.0);

        if(abs(uHueShift) > 0.0001){
          col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);
        }

        if (uLightMode > 0.5) {
          float peak = max(col.r, max(col.g, col.b));
          vec3 chroma = pow(clamp(col / max(peak, 0.0001), 0.0, 1.0), vec3(1.14));
          gl_FragColor = vec4(mix(vec3(1.0), chroma, o.a * 0.94), 1.0);
        } else {
          gl_FragColor = vec4(col, o.a);
        }
      }
    `,uniforms:{iResolution:{value:M},iTime:{value:0},uHeight:{value:c},uBaseHalf:{value:C},uUseBaseWobble:{value:1},uRot:{value:new Float32Array([1,0,0,0,1,0,0,0,1])},uGlow:{value:ee},uOffsetPx:{value:N},uNoise:{value:w},uSaturation:{value:re},uScale:{value:T},uHueShift:{value:ie},uColorFreq:{value:ae},uBloom:{value:oe},uCenterShift:{value:c*.25},uInvBaseHalf:{value:1/C},uInvHeight:{value:1/c},uMinAxis:{value:Math.min(C,c)},uPxScale:{value:1/((j.drawingBufferHeight||1)*.1*T)},uTimeScale:{value:E},uLightMode:{value:+!!x}}}),ce=new i(j,{geometry:se,program:P}),F=()=>{let e=s.clientWidth||1,t=s.clientHeight||1;A.setSize(e,t),M[0]=j.drawingBufferWidth,M[1]=j.drawingBufferHeight,N[0]=te*k,N[1]=ne*k,P.uniforms.uPxScale.value=1/((j.drawingBufferHeight||1)*.1*T)},I=new ResizeObserver(F);I.observe(s),F();let L=new Float32Array(9),R=(e,t,n,r)=>{let i=Math.cos(e),a=Math.sin(e),o=Math.cos(t),s=Math.sin(t),c=Math.cos(n),l=Math.sin(n),u=i*c+a*s*l,d=-i*l+a*s*c,f=a*o,p=o*l,m=o*c,h=-s,g=-a*c+i*s*l,_=a*l+i*s*c,v=i*o;return r[0]=u,r[1]=p,r[2]=g,r[3]=d,r[4]=m,r[5]=_,r[6]=f,r[7]=h,r[8]=v,r},le=w<1e-6,z=0,ue=performance.now(),B=()=>{z||=requestAnimationFrame($)},V=()=>{z&&=(cancelAnimationFrame(z),0)},H=()=>Math.random(),de=(.3+H()*.6)*1,fe=(.2+H()*.7)*1,pe=(.1+H()*.5)*1,me=H()*Math.PI*2,he=H()*Math.PI*2,U=0,W=0,G=0,K=0,q=0,J=(e,t,n)=>e+(t-e)*n,Y={x:0,y:0,inside:!0},ge=e=>{let t=Math.max(1,window.innerWidth),n=Math.max(1,window.innerHeight),r=t*.5,i=n*.5,a=(e.clientX-r)/(t*.5),o=(e.clientY-i)/(n*.5);Y.x=Math.max(-1,Math.min(1,a)),Y.y=Math.max(-1,Math.min(1,o)),Y.inside=!0},X=()=>{Y.inside=!1},Z=()=>{Y.inside=!1},Q=null;n===`hover`?(Q=e=>{ge(e),B()},window.addEventListener(`pointermove`,Q,{passive:!0}),window.addEventListener(`mouseleave`,X),window.addEventListener(`blur`,Z),P.uniforms.uUseBaseWobble.value=0):n===`3drotate`?P.uniforms.uUseBaseWobble.value=0:P.uniforms.uUseBaseWobble.value=1;let $=e=>{let t=(e-ue)*.001;P.uniforms.iTime.value=t;let r=!0;if(n===`hover`){let e=.6*D,t=.6*D;K=(Y.inside?-Y.x:0)*t,q=(Y.inside?Y.y:0)*e;let n=U,i=W,a=G;U=J(n,K,O),W=J(i,q,O),G=J(a,0,.1),P.uniforms.uRot.value=R(U,W,G,L),le&&Math.abs(U-K)<1e-4&&Math.abs(W-q)<1e-4&&Math.abs(G)<1e-4&&(r=!1)}else if(n===`3drotate`){let e=t*E;U=e*fe,W=Math.sin(e*de+me)*.6,G=Math.sin(e*pe+he)*.5,P.uniforms.uRot.value=R(U,W,G,L),E<1e-6&&(r=!1)}else L[0]=1,L[1]=0,L[2]=0,L[3]=0,L[4]=1,L[5]=0,L[6]=0,L[7]=0,L[8]=1,P.uniforms.uRot.value=L,E<1e-6&&(r=!1);A.render({scene:ce}),z=r?requestAnimationFrame($):0};if(y){let e=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)?B():V()});e.observe(s),B(),s.__prismIO=e}else B();return()=>{if(V(),I.disconnect(),n===`hover`&&(Q&&window.removeEventListener(`pointermove`,Q),window.removeEventListener(`mouseleave`,X),window.removeEventListener(`blur`,Z)),y){let e=s.__prismIO;e&&e.disconnect(),delete s.__prismIO}j.canvas.parentElement===s&&s.removeChild(j.canvas)}},[e,t,n,l,d,u?.x,u?.y,p,f,m,h,b,g,_,v,y,x]),(0,c.jsx)(`div`,{className:`prism-container`,ref:S})};export{l as default};