import{E as pt,V as E,M as X,T as K,S as Ve,Q as Ne,a as I,R as gt,P as ft,b as bt,C as vt,c as xt,d as je,e as yt,W as wt,D as Ct,f as At,U as Et,L as de,g as te,h as _t,i as Ge,N as Mt,B as Ue,j as ce,k as ue,l as ie,m as N,n as Pt,o as Ye,p as St,G as Tt,q as Lt,r as se,s as me,A as Dt,t as Ze,u as $t,v as Ft}from"./three-CXv9FpL2.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function i(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function e(n){if(n.ep)return;n.ep=!0;const a=i(n);fetch(n.href,a)}})();const We={type:"change"},Ee={type:"start"},Xe={type:"end"},pe=new gt,Ke=new ft,It=Math.cos(70*bt.DEG2RAD);class kt extends pt{constructor(t,i){super(),this.object=t,this.domElement=i,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new E,this.cursor=new E,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:X.ROTATE,MIDDLE:X.DOLLY,RIGHT:X.PAN},this.touches={ONE:K.ROTATE,TWO:K.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return c.phi},this.getAzimuthalAngle=function(){return c.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(s){s.addEventListener("keydown",Ce),this._domElementKeyEvents=s},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Ce),this._domElementKeyEvents=null},this.saveState=function(){e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=function(){e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(We),e.update(),a=n.NONE},this.update=function(){const s=new E,r=new Ne().setFromUnitVectors(t.up,new E(0,1,0)),b=r.clone().invert(),w=new E,T=new Ne,V=new E,F=2*Math.PI;return function(mt=null){const Be=e.object.position;s.copy(Be).sub(e.target),s.applyQuaternion(r),c.setFromVector3(s),e.autoRotate&&a===n.NONE&&D(ae(mt)),e.enableDamping?(c.theta+=g.theta*e.dampingFactor,c.phi+=g.phi*e.dampingFactor):(c.theta+=g.theta,c.phi+=g.phi);let R=e.minAzimuthAngle,H=e.maxAzimuthAngle;isFinite(R)&&isFinite(H)&&(R<-Math.PI?R+=F:R>Math.PI&&(R-=F),H<-Math.PI?H+=F:H>Math.PI&&(H-=F),R<=H?c.theta=Math.max(R,Math.min(H,c.theta)):c.theta=c.theta>(R+H)/2?Math.max(R,c.theta):Math.min(H,c.theta)),c.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,c.phi)),c.makeSafe(),e.enableDamping===!0?e.target.addScaledVector(u,e.dampingFactor):e.target.add(u),e.target.sub(e.cursor),e.target.clampLength(e.minTargetRadius,e.maxTargetRadius),e.target.add(e.cursor),e.zoomToCursor&&O||e.object.isOrthographicCamera?c.radius=U(c.radius):c.radius=U(c.radius*o),s.setFromSpherical(c),s.applyQuaternion(b),Be.copy(e.target).add(s),e.object.lookAt(e.target),e.enableDamping===!0?(g.theta*=1-e.dampingFactor,g.phi*=1-e.dampingFactor,u.multiplyScalar(1-e.dampingFactor)):(g.set(0,0,0),u.set(0,0,0));let Ae=!1;if(e.zoomToCursor&&O){let Q=null;if(e.object.isPerspectiveCamera){const ee=s.length();Q=U(ee*o);const he=ee-Q;e.object.position.addScaledVector(L,he),e.object.updateMatrixWorld()}else if(e.object.isOrthographicCamera){const ee=new E(P.x,P.y,0);ee.unproject(e.object),e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/o)),e.object.updateProjectionMatrix(),Ae=!0;const he=new E(P.x,P.y,0);he.unproject(e.object),e.object.position.sub(he).add(ee),e.object.updateMatrixWorld(),Q=s.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),e.zoomToCursor=!1;Q!==null&&(this.screenSpacePanning?e.target.set(0,0,-1).transformDirection(e.object.matrix).multiplyScalar(Q).add(e.object.position):(pe.origin.copy(e.object.position),pe.direction.set(0,0,-1).transformDirection(e.object.matrix),Math.abs(e.object.up.dot(pe.direction))<It?t.lookAt(e.target):(Ke.setFromNormalAndCoplanarPoint(e.object.up,e.target),pe.intersectPlane(Ke,e.target))))}else e.object.isOrthographicCamera&&(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/o)),e.object.updateProjectionMatrix(),Ae=!0);return o=1,O=!1,Ae||w.distanceToSquared(e.object.position)>l||8*(1-T.dot(e.object.quaternion))>l||V.distanceToSquared(e.target)>0?(e.dispatchEvent(We),w.copy(e.object.position),T.copy(e.object.quaternion),V.copy(e.target),!0):!1}}(),this.dispose=function(){e.domElement.removeEventListener("contextmenu",Re),e.domElement.removeEventListener("pointerdown",ke),e.domElement.removeEventListener("pointercancel",q),e.domElement.removeEventListener("wheel",Oe),e.domElement.removeEventListener("pointermove",we),e.domElement.removeEventListener("pointerup",q),e._domElementKeyEvents!==null&&(e._domElementKeyEvents.removeEventListener("keydown",Ce),e._domElementKeyEvents=null)};const e=this,n={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let a=n.NONE;const l=1e-6,c=new Ve,g=new Ve;let o=1;const u=new E,m=new I,v=new I,f=new I,x=new I,C=new I,_=new I,p=new I,d=new I,y=new I,L=new E,P=new I;let O=!1;const M=[],z={};let Y=!1;function ae(s){return s!==null?2*Math.PI/60*e.autoRotateSpeed*s:2*Math.PI/60/60*e.autoRotateSpeed}function S(s){const r=Math.abs(s*.01);return Math.pow(.95,e.zoomSpeed*r)}function D(s){g.theta-=s}function $(s){g.phi-=s}const oe=function(){const s=new E;return function(b,w){s.setFromMatrixColumn(w,0),s.multiplyScalar(-b),u.add(s)}}(),re=function(){const s=new E;return function(b,w){e.screenSpacePanning===!0?s.setFromMatrixColumn(w,1):(s.setFromMatrixColumn(w,0),s.crossVectors(e.object.up,s)),s.multiplyScalar(b),u.add(s)}}(),A=function(){const s=new E;return function(b,w){const T=e.domElement;if(e.object.isPerspectiveCamera){const V=e.object.position;s.copy(V).sub(e.target);let F=s.length();F*=Math.tan(e.object.fov/2*Math.PI/180),oe(2*b*F/T.clientHeight,e.object.matrix),re(2*w*F/T.clientHeight,e.object.matrix)}else e.object.isOrthographicCamera?(oe(b*(e.object.right-e.object.left)/e.object.zoom/T.clientWidth,e.object.matrix),re(w*(e.object.top-e.object.bottom)/e.object.zoom/T.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}}();function B(s){e.object.isPerspectiveCamera||e.object.isOrthographicCamera?o/=s:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function j(s){e.object.isPerspectiveCamera||e.object.isOrthographicCamera?o*=s:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function G(s,r){if(!e.zoomToCursor)return;O=!0;const b=e.domElement.getBoundingClientRect(),w=s-b.left,T=r-b.top,V=b.width,F=b.height;P.x=w/V*2-1,P.y=-(T/F)*2+1,L.set(P.x,P.y,1).unproject(e.object).sub(e.object.position).normalize()}function U(s){return Math.max(e.minDistance,Math.min(e.maxDistance,s))}function Z(s){m.set(s.clientX,s.clientY)}function ve(s){G(s.clientX,s.clientX),p.set(s.clientX,s.clientY)}function le(s){x.set(s.clientX,s.clientY)}function xe(s){v.set(s.clientX,s.clientY),f.subVectors(v,m).multiplyScalar(e.rotateSpeed);const r=e.domElement;D(2*Math.PI*f.x/r.clientHeight),$(2*Math.PI*f.y/r.clientHeight),m.copy(v),e.update()}function J(s){d.set(s.clientX,s.clientY),y.subVectors(d,p),y.y>0?B(S(y.y)):y.y<0&&j(S(y.y)),p.copy(d),e.update()}function ye(s){C.set(s.clientX,s.clientY),_.subVectors(C,x).multiplyScalar(e.panSpeed),A(_.x,_.y),x.copy(C),e.update()}function Qe(s){G(s.clientX,s.clientY),s.deltaY<0?j(S(s.deltaY)):s.deltaY>0&&B(S(s.deltaY)),e.update()}function et(s){let r=!1;switch(s.code){case e.keys.UP:s.ctrlKey||s.metaKey||s.shiftKey?$(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):A(0,e.keyPanSpeed),r=!0;break;case e.keys.BOTTOM:s.ctrlKey||s.metaKey||s.shiftKey?$(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):A(0,-e.keyPanSpeed),r=!0;break;case e.keys.LEFT:s.ctrlKey||s.metaKey||s.shiftKey?D(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):A(e.keyPanSpeed,0),r=!0;break;case e.keys.RIGHT:s.ctrlKey||s.metaKey||s.shiftKey?D(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):A(-e.keyPanSpeed,0),r=!0;break}r&&(s.preventDefault(),e.update())}function Te(s){if(M.length===1)m.set(s.pageX,s.pageY);else{const r=W(s),b=.5*(s.pageX+r.x),w=.5*(s.pageY+r.y);m.set(b,w)}}function Le(s){if(M.length===1)x.set(s.pageX,s.pageY);else{const r=W(s),b=.5*(s.pageX+r.x),w=.5*(s.pageY+r.y);x.set(b,w)}}function De(s){const r=W(s),b=s.pageX-r.x,w=s.pageY-r.y,T=Math.sqrt(b*b+w*w);p.set(0,T)}function tt(s){e.enableZoom&&De(s),e.enablePan&&Le(s)}function it(s){e.enableZoom&&De(s),e.enableRotate&&Te(s)}function $e(s){if(M.length==1)v.set(s.pageX,s.pageY);else{const b=W(s),w=.5*(s.pageX+b.x),T=.5*(s.pageY+b.y);v.set(w,T)}f.subVectors(v,m).multiplyScalar(e.rotateSpeed);const r=e.domElement;D(2*Math.PI*f.x/r.clientHeight),$(2*Math.PI*f.y/r.clientHeight),m.copy(v)}function Fe(s){if(M.length===1)C.set(s.pageX,s.pageY);else{const r=W(s),b=.5*(s.pageX+r.x),w=.5*(s.pageY+r.y);C.set(b,w)}_.subVectors(C,x).multiplyScalar(e.panSpeed),A(_.x,_.y),x.copy(C)}function Ie(s){const r=W(s),b=s.pageX-r.x,w=s.pageY-r.y,T=Math.sqrt(b*b+w*w);d.set(0,T),y.set(0,Math.pow(d.y/p.y,e.zoomSpeed)),B(y.y),p.copy(d);const V=(s.pageX+r.x)*.5,F=(s.pageY+r.y)*.5;G(V,F)}function st(s){e.enableZoom&&Ie(s),e.enablePan&&Fe(s)}function nt(s){e.enableZoom&&Ie(s),e.enableRotate&&$e(s)}function ke(s){e.enabled!==!1&&(M.length===0&&(e.domElement.setPointerCapture(s.pointerId),e.domElement.addEventListener("pointermove",we),e.domElement.addEventListener("pointerup",q)),ct(s),s.pointerType==="touch"?ht(s):at(s))}function we(s){e.enabled!==!1&&(s.pointerType==="touch"?dt(s):ot(s))}function q(s){ut(s),M.length===0&&(e.domElement.releasePointerCapture(s.pointerId),e.domElement.removeEventListener("pointermove",we),e.domElement.removeEventListener("pointerup",q)),e.dispatchEvent(Xe),a=n.NONE}function at(s){let r;switch(s.button){case 0:r=e.mouseButtons.LEFT;break;case 1:r=e.mouseButtons.MIDDLE;break;case 2:r=e.mouseButtons.RIGHT;break;default:r=-1}switch(r){case X.DOLLY:if(e.enableZoom===!1)return;ve(s),a=n.DOLLY;break;case X.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(e.enablePan===!1)return;le(s),a=n.PAN}else{if(e.enableRotate===!1)return;Z(s),a=n.ROTATE}break;case X.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(e.enableRotate===!1)return;Z(s),a=n.ROTATE}else{if(e.enablePan===!1)return;le(s),a=n.PAN}break;default:a=n.NONE}a!==n.NONE&&e.dispatchEvent(Ee)}function ot(s){switch(a){case n.ROTATE:if(e.enableRotate===!1)return;xe(s);break;case n.DOLLY:if(e.enableZoom===!1)return;J(s);break;case n.PAN:if(e.enablePan===!1)return;ye(s);break}}function Oe(s){e.enabled===!1||e.enableZoom===!1||a!==n.NONE||(s.preventDefault(),e.dispatchEvent(Ee),Qe(rt(s)),e.dispatchEvent(Xe))}function rt(s){const r=s.deltaMode,b={clientX:s.clientX,clientY:s.clientY,deltaY:s.deltaY};switch(r){case 1:b.deltaY*=16;break;case 2:b.deltaY*=100;break}return s.ctrlKey&&!Y&&(b.deltaY*=10),b}function lt(s){s.key==="Control"&&(Y=!0,document.addEventListener("keyup",ze,{passive:!0,capture:!0}))}function ze(s){s.key==="Control"&&(Y=!1,document.removeEventListener("keyup",ze,{passive:!0,capture:!0}))}function Ce(s){e.enabled===!1||e.enablePan===!1||et(s)}function ht(s){switch(He(s),M.length){case 1:switch(e.touches.ONE){case K.ROTATE:if(e.enableRotate===!1)return;Te(s),a=n.TOUCH_ROTATE;break;case K.PAN:if(e.enablePan===!1)return;Le(s),a=n.TOUCH_PAN;break;default:a=n.NONE}break;case 2:switch(e.touches.TWO){case K.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;tt(s),a=n.TOUCH_DOLLY_PAN;break;case K.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;it(s),a=n.TOUCH_DOLLY_ROTATE;break;default:a=n.NONE}break;default:a=n.NONE}a!==n.NONE&&e.dispatchEvent(Ee)}function dt(s){switch(He(s),a){case n.TOUCH_ROTATE:if(e.enableRotate===!1)return;$e(s),e.update();break;case n.TOUCH_PAN:if(e.enablePan===!1)return;Fe(s),e.update();break;case n.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;st(s),e.update();break;case n.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;nt(s),e.update();break;default:a=n.NONE}}function Re(s){e.enabled!==!1&&s.preventDefault()}function ct(s){M.push(s.pointerId)}function ut(s){delete z[s.pointerId];for(let r=0;r<M.length;r++)if(M[r]==s.pointerId){M.splice(r,1);return}}function He(s){let r=z[s.pointerId];r===void 0&&(r=new I,z[s.pointerId]=r),r.set(s.pageX,s.pageY)}function W(s){const r=s.pointerId===M[0]?M[1]:M[0];return z[r]}e.domElement.addEventListener("contextmenu",Re),e.domElement.addEventListener("pointerdown",ke),e.domElement.addEventListener("pointercancel",q),e.domElement.addEventListener("wheel",Oe,{passive:!1}),document.addEventListener("keydown",lt,{passive:!0,capture:!0}),this.update()}}const Ot=`
  varying vec3 vWorldPosition;
  varying vec3 vLocalPosition;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vLocalPosition = position * 0.5 + 0.5;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`,zt=`
  precision highp float;
  precision highp sampler3D;
  precision highp sampler2D;

  varying vec3 vWorldPosition;
  varying vec3 vLocalPosition;

  uniform sampler3D u_volume;
  uniform sampler2D u_transferFunc;
  uniform vec3 u_cameraPos;
  uniform float u_threshold;
  uniform float u_maxdBZ;
  uniform float u_mindBZ;
  uniform float u_stepSize;
  uniform float u_density;
  uniform float u_brightness;
  uniform int u_renderMode;
  uniform vec3 u_boundsMin;
  uniform vec3 u_boundsMax;
  uniform bool u_showSlice;
  uniform float u_sliceZ;
  uniform float u_sliceOpacity;
  uniform vec3 u_activeSize;

  bool intersectBox(vec3 ro, vec3 rd, vec3 bmin, vec3 bmax, out float tNear, out float tFar) {
    vec3 invR = 1.0 / rd;
    vec3 tbot = invR * (bmin - ro);
    vec3 ttop = invR * (bmax - ro);
    vec3 tmin = min(ttop, tbot);
    vec3 tmax = max(ttop, tbot);
    tNear = max(max(tmin.x, tmin.y), tmin.z);
    tFar = min(min(tmax.x, tmax.y), tmax.z);
    return tNear < tFar;
  }

  float sampleScalar(vec3 localPos) {
    vec3 texCoord = localPos * u_activeSize;
    return texture(u_volume, texCoord).r;
  }

  vec4 sampleVolume(vec3 localPos) {
    float scalar = sampleScalar(localPos);
    vec4 tf = texture2D(u_transferFunc, vec2(scalar, 0.5));
    return tf;
  }

  vec4 raymarchVolume(vec3 rayOrigin, vec3 rayDir) {
    vec3 bmin = vec3(0.0);
    vec3 bmax = vec3(1.0);

    float tNear, tFar;
    if (!intersectBox(rayOrigin, rayDir, bmin, bmax, tNear, tFar)) {
      discard;
    }
    tNear = max(tNear, 0.0);

    vec3 startPos = rayOrigin + rayDir * tNear;
    vec3 endPos = rayOrigin + rayDir * tFar;
    float dist = length(endPos - startPos);
    int maxSteps = 512;
    int stepCount = int(dist / u_stepSize);
    stepCount = min(stepCount, maxSteps);
    if (stepCount < 1) stepCount = 1;
    float actualStep = dist / float(stepCount);

    vec4 accumulatedColor = vec4(0.0);
    float accumulatedAlpha = 0.0;

    vec3 stepVec = rayDir * actualStep;
    vec3 currentPos = startPos;

    float maxVal = 0.0;
    vec3 maxPos = vec3(0.0);

    for (int i = 0; i < 512; i++) {
      if (i >= stepCount) break;
      if (accumulatedAlpha >= 0.99) break;

      vec4 col = sampleVolume(currentPos);

      if (u_showSlice) {
        float sliceDist = abs(currentPos.z - u_sliceZ);
        if (sliceDist < 0.01) {
          col.a = max(col.a, u_sliceOpacity);
        }
      }

      if (col.a > 0.001) {
        if (u_renderMode == 0) {
          float alpha = col.a * u_density * actualStep * 100.0;
          alpha = min(alpha, 1.0);
          accumulatedColor.rgb += (1.0 - accumulatedAlpha) * col.rgb * alpha;
          accumulatedAlpha += (1.0 - accumulatedAlpha) * alpha;
        } else if (u_renderMode == 1) {
          if (col.a > maxVal) {
            maxVal = col.a;
            accumulatedColor = col;
            maxPos = currentPos;
          }
        } else if (u_renderMode == 2) {
          if (col.a > maxVal) {
            maxVal = col.a;
            maxPos = currentPos;
          }
        }
      }

      currentPos += stepVec;
    }

    if (u_renderMode == 2 && maxVal > 0.001) {
      float eps = 0.005;
      vec3 grad;
      grad.x = sampleScalar(maxPos + vec3(eps, 0.0, 0.0)) - sampleScalar(maxPos - vec3(eps, 0.0, 0.0));
      grad.y = sampleScalar(maxPos + vec3(0.0, eps, 0.0)) - sampleScalar(maxPos - vec3(0.0, eps, 0.0));
      grad.z = sampleScalar(maxPos + vec3(0.0, 0.0, eps)) - sampleScalar(maxPos - vec3(0.0, 0.0, eps));
      float gradLen = length(grad);
      if (gradLen > 0.0001) grad /= gradLen;
      vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
      float diffuse = max(dot(grad, lightDir), 0.0);
      float ambient = 0.3;
      vec4 baseColor = texture2D(u_transferFunc, vec2(sampleScalar(maxPos), 0.5));
      accumulatedColor.rgb = baseColor.rgb * (ambient + diffuse * 0.7);
      accumulatedColor.a = baseColor.a;
    }

    if (u_renderMode == 1) {
      accumulatedColor.a = maxVal;
    }

    accumulatedColor.rgb *= u_brightness;
    accumulatedColor.a = clamp(accumulatedAlpha, 0.0, 1.0);

    return accumulatedColor;
  }

  void main() {
    vec3 rayDir = normalize(vWorldPosition - u_cameraPos);
    vec4 color = raymarchVolume(vLocalPosition, rayDir);

    if (color.a < 0.01) {
      discard;
    }

    gl_FragColor = vec4(color.rgb, color.a);
  }
`,Rt=`
  varying vec3 vLocalPosition;
  varying vec3 vNormal;

  void main() {
    vLocalPosition = position * 0.5 + 0.5;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ht=`
  varying vec3 vLocalPosition;
  varying vec3 vNormal;

  uniform vec3 u_bboxColor;
  uniform float u_opacity;

  void main() {
    vec3 edge = abs(vNormal);
    float isEdge = max(max(edge.x, edge.y), edge.z);
    if (isEdge < 0.99) discard;

    gl_FragColor = vec4(u_bboxColor, u_opacity);
  }
`;function qe(h=0,t=70,i="default"){const a=document.createElement("canvas");a.width=256,a.height=1;const l=a.getContext("2d"),c=l.createImageData(256,1),g={default:[{pos:0,r:0,g:0,b:0,a:0},{pos:.08,r:0,g:100,b:200,a:.02},{pos:.15,r:0,g:180,b:255,a:.06},{pos:.25,r:0,g:220,b:180,a:.1},{pos:.35,r:80,g:255,b:80,a:.15},{pos:.45,r:200,g:255,b:50,a:.22},{pos:.55,r:255,g:220,b:0,a:.3},{pos:.65,r:255,g:150,b:0,a:.4},{pos:.75,r:255,g:80,b:40,a:.5},{pos:.85,r:220,g:20,b:120,a:.65},{pos:.95,r:180,g:0,b:180,a:.8},{pos:1,r:255,g:50,b:255,a:.95}],severe:[{pos:0,r:0,g:0,b:0,a:0},{pos:.1,r:0,g:120,b:180,a:.05},{pos:.2,r:0,g:200,b:220,a:.1},{pos:.3,r:50,g:220,b:100,a:.18},{pos:.4,r:150,g:240,b:50,a:.25},{pos:.5,r:255,g:240,b:0,a:.35},{pos:.57,r:255,g:160,b:0,a:.5},{pos:.65,r:255,g:80,b:0,a:.65},{pos:.75,r:255,g:0,b:80,a:.8},{pos:.85,r:220,g:0,b:220,a:.9},{pos:1,r:255,g:100,b:255,a:1}],thermal:[{pos:0,r:0,g:0,b:0,a:0},{pos:.1,r:20,g:0,b:80,a:.08},{pos:.2,r:60,g:0,b:140,a:.15},{pos:.35,r:120,g:0,b:160,a:.25},{pos:.5,r:180,g:40,b:100,a:.4},{pos:.65,r:220,g:100,b:40,a:.55},{pos:.8,r:255,g:180,b:0,a:.75},{pos:1,r:255,g:255,b:150,a:1}],monochrome:[{pos:0,r:0,g:0,b:0,a:0},{pos:.1,r:30,g:30,b:40,a:.05},{pos:.3,r:80,g:80,b:100,a:.15},{pos:.5,r:140,g:140,b:160,a:.3},{pos:.7,r:190,g:190,b:210,a:.5},{pos:.85,r:230,g:230,b:240,a:.7},{pos:1,r:255,g:255,b:255,a:.95}]},o=g[i]||g.default;for(let u=0;u<256;u++){const m=u/255;let v=0;for(let P=0;P<o.length-1;P++)if(m>=o[P].pos&&m<=o[P+1].pos){v=P;break}const f=o[v],x=o[Math.min(v+1,o.length-1)],C=x.pos===f.pos?0:(m-f.pos)/(x.pos-f.pos),_=Math.round(f.r+(x.r-f.r)*C),p=Math.round(f.g+(x.g-f.g)*C),d=Math.round(f.b+(x.b-f.b)*C),y=Math.round((f.a+(x.a-f.a)*C)*255),L=u*4;c.data[L]=_,c.data[L+1]=p,c.data[L+2]=d,c.data[L+3]=y}return l.putImageData(c,0,0),a}function Bt(h,t,i,e=0,n=70){const a=h.getContext("2d"),l=a.getImageData(0,0,h.width,h.height),c=l.data,g=(t-e)/(n-e),o=(i-e)/(n-e);for(let u=0;u<h.width;u++){const m=u/(h.width-1),v=u*4;(m<g||m>o)&&(c[v+3]=0)}return a.putImageData(l,0,0),h}const ge=256,fe=256,be=128;class Vt{constructor(t){this.container=t,this.clock=new vt,this.volumeMesh=null,this.volumeTexture=null,this.transferFuncTexture=null,this.transferFuncCanvas=null,this.volumeMaterial=null,this.bboxMesh=null,this.hailCoreMesh=null,this.hailCoreMaterial=null,this.hailCoreGeom=null,this.hailCoreGlow=null,this.hailCoreReady=!1,this.dataReady=!1,this.glInitialized=!1,this.contextLost=!1,this.pendingData=null,this.frameCount=0,this.activeSize={x:0,y:0,z:0},this.params={stepSize:.003,density:.6,brightness:1.3,thresholdMin:5,thresholdMax:70,renderMode:0,colormap:"default",showBBox:!0,showAxes:!0,showSlice:!1,sliceZ:.5,sliceOpacity:.8,sliceAnimate:!1,rotationSpeed:0,showHailCore:!0,hailThreshold:65,hailPulseSpeed:2.5,hailPulseIntensity:.35,hailOpacity:1,hailWireframe:!1},this.stats={resolution:{x:0,y:0,z:0},range:{min:0,max:0},voxelCount:0,nonZero:0},this.init()}init(){const{clientWidth:t,clientHeight:i}=this.container;this.width=t,this.height=i,this.scene=new xt,this.scene.background=new je(328976),this.camera=new yt(45,t/i,.1,1e3),this.camera.position.set(2.8,2,3.2),this.camera.lookAt(0,.3,0),this.renderer=new wt({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(t,i),this.renderer.setClearColor(328976,1),this.container.appendChild(this.renderer.domElement),this.controls=new kt(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.minDistance=.8,this.controls.maxDistance=12,this.controls.target.set(0,.3,0),this.renderer.domElement.addEventListener("webglcontextlost",this.onContextLost.bind(this)),this.renderer.domElement.addEventListener("webglcontextrestored",this.onContextRestored.bind(this)),this.addAxesGrid(),this.addLightingRig(),this.createBBox(),this.initPersistentResources(),window.addEventListener("resize",this.onResize.bind(this)),this.animate()}onContextLost(t){t.preventDefault(),this.contextLost=!0,this.glInitialized=!1,console.error("[VolumeRenderer] WebGL Context Lost! 显存溢出或GPU异常。等待恢复...")}onContextRestored(){if(this.contextLost=!1,console.log("[VolumeRenderer] WebGL Context 已恢复，重新初始化资源..."),this.initPersistentResources(),this.pendingData){const t=this.pendingData;this.pendingData=null,this.updateVolumeData(t.data,t.size,t.range,t.stats)}}initPersistentResources(){this.glInitialized||(this._createPersistentVolumeTexture(),this._createPersistentTransferFunc(),this._createPersistentMaterial(),this._createPersistentMesh(),this.glInitialized=!0)}_createPersistentVolumeTexture(){if(this.volumeTexture)return;const t=new Uint8Array(ge*fe*be);this.volumeTexture=new Ct(t,ge,fe,be),this.volumeTexture.format=At,this.volumeTexture.type=Et,this.volumeTexture.minFilter=de,this.volumeTexture.magFilter=de,this.volumeTexture.unpackAlignment=1,this.volumeTexture.wrapS=te,this.volumeTexture.wrapT=te,this.volumeTexture.wrapR=te,this._forceUploadTexture()}_forceUploadTexture(){this.volumeTexture&&(this.volumeTexture.needsUpdate=!0,this.renderer.render(this.scene,this.camera))}_createPersistentTransferFunc(){this.transferFuncTexture||(this.transferFuncCanvas=document.createElement("canvas"),this.transferFuncCanvas.width=256,this.transferFuncCanvas.height=1,this.transferFuncTexture=new _t(this.transferFuncCanvas),this.transferFuncTexture.minFilter=de,this.transferFuncTexture.magFilter=de,this.transferFuncTexture.wrapS=te,this.transferFuncTexture.wrapT=te)}_createPersistentMaterial(){this.volumeMaterial||(this.volumeMaterial=new Ge({vertexShader:Ot,fragmentShader:zt,uniforms:{u_volume:{value:this.volumeTexture},u_transferFunc:{value:this.transferFuncTexture},u_cameraPos:{value:new E},u_threshold:{value:.1},u_maxdBZ:{value:80},u_mindBZ:{value:-32},u_stepSize:{value:this.params.stepSize},u_density:{value:this.params.density},u_brightness:{value:this.params.brightness},u_renderMode:{value:this.params.renderMode},u_boundsMin:{value:new E(0,0,0)},u_boundsMax:{value:new E(1,1,1)},u_showSlice:{value:this.params.showSlice},u_sliceZ:{value:this.params.sliceZ},u_sliceOpacity:{value:this.params.sliceOpacity},u_activeSize:{value:new E(1,1,1)}},side:Ue,transparent:!0,depthWrite:!1,blending:Mt}))}_createPersistentMesh(){if(this.volumeMesh)return;const t=new ce(2,2,2);this.volumeMesh=new ue(t,this.volumeMaterial),this.scene.add(this.volumeMesh)}_initHailCoreMesh(){if(this.hailCoreMesh)return;this.hailCoreGeom=new ie;const t=new Float32Array(0),i=new Float32Array(0),e=new Float32Array(0),n=new Uint32Array(0);this.hailCoreGeom.setAttribute("position",new N(t,3)),this.hailCoreGeom.setAttribute("normal",new N(i,3)),this.hailCoreGeom.setAttribute("color",new N(e,4)),this.hailCoreGeom.setIndex(new N(n,1)),this.hailCoreMaterial=new Pt({color:16724016,emissive:16715792,emissiveIntensity:.8,shininess:100,transparent:!0,opacity:.95,side:Ye,vertexColors:!0,wireframe:!1}),this.hailCoreMesh=new ue(this.hailCoreGeom,this.hailCoreMaterial),this.hailCoreMesh.visible=this.params.showHailCore,this.scene.add(this.hailCoreMesh);const a=new St({color:16719904,transparent:!0,opacity:.15,side:Ue,depthWrite:!1}),l=new ce(2.08,2.08,2.08);this.hailCoreGlow=new ue(l,a),this.hailCoreGlow.visible=!1,this.scene.add(this.hailCoreGlow)}setHailCoreGeometry(t){if(this._initHailCoreMesh(),!t||t.vertexCount===0){this.hailCoreMesh.visible=!1,this.hailCoreGlow.visible=!1,this.hailCoreReady=!1;return}const i=this.hailCoreGeom.getAttribute("position");if(i.count!==t.vertices.length/3)this.hailCoreGeom.setAttribute("position",new N(t.vertices,3)),this.hailCoreGeom.setAttribute("normal",new N(t.normals,3)),this.hailCoreGeom.setAttribute("color",new N(t.colors,4)),this.hailCoreGeom.setIndex(new N(t.indices,1));else{i.array.set(t.vertices),i.needsUpdate=!0;const e=this.hailCoreGeom.getAttribute("normal");e.array.set(t.normals),e.needsUpdate=!0;const n=this.hailCoreGeom.getAttribute("color");n.array.set(t.colors),n.needsUpdate=!0;const a=this.hailCoreGeom.getIndex();a.array.set(t.indices),a.needsUpdate=!0}this.hailCoreGeom.computeBoundingBox(),this.hailCoreGeom.computeBoundingSphere(),this.hailCoreMesh.visible=this.params.showHailCore,this.hailCoreGlow.visible=this.params.showHailCore&&t.vertexCount>0,this.hailCoreReady=!0}_updateHailCorePulse(t){if(!this.hailCoreReady||!this.params.showHailCore)return;const i=.5+.5*Math.sin(t*this.params.hailPulseSpeed),e=.6+i*this.params.hailPulseIntensity;if(this.hailCoreMaterial&&(this.hailCoreMaterial.emissiveIntensity=e,this.hailCoreMaterial.opacity=this.params.hailOpacity*(.85+i*.15)),this.hailCoreGlow&&this.hailCoreGlow.material){this.hailCoreGlow.material.opacity=.1+i*.2;const n=1+i*.04;this.hailCoreGlow.scale.set(n,n,n)}}setVolumeData(t,i,e,n){this.initPersistentResources(),this.activeSize={x:i.x,y:i.y,z:i.z},this.stats.resolution=i,this.stats.range=e,this.stats.voxelCount=(n==null?void 0:n.voxelCount)||i.x*i.y*i.z,this.stats.nonZero=(n==null?void 0:n.nonZero)||0,this.volumeMaterial&&(this.volumeMaterial.uniforms.u_maxdBZ.value=e.max,this.volumeMaterial.uniforms.u_mindBZ.value=e.min,this.volumeMaterial.uniforms.u_activeSize.value.set(i.x/ge,i.y/fe,i.z/be)),this._uploadVolumeDataInPlace(t,i),this.updateTransferFunction(),this.dataReady=!0}updateVolumeData(t,i,e,n){if(this.contextLost){this.pendingData={data:t,size:i,range:e,stats:n};return}this.activeSize={x:i.x,y:i.y,z:i.z},this.stats.resolution=i,e&&(this.stats.range=e,this.volumeMaterial&&(this.volumeMaterial.uniforms.u_maxdBZ.value=e.max,this.volumeMaterial.uniforms.u_mindBZ.value=e.min)),n&&(this.stats.voxelCount=n.voxelCount||i.x*i.y*i.z,this.stats.nonZero=n.nonZero||0),this.volumeMaterial&&this.volumeMaterial.uniforms.u_activeSize.value.set(i.x/ge,i.y/fe,i.z/be),this._uploadVolumeDataInPlace(t,i),this.dataReady=!0}_uploadVolumeDataInPlace(t,i){if(!this.volumeTexture)return;const e=this.renderer.getContext(),n=this.renderer.properties.get(this.volumeTexture);if(!n||!n.__webglTexture){this.volumeTexture.image.data.set(t),this.volumeTexture.needsUpdate=!0;return}e.bindTexture(e.TEXTURE_3D,n.__webglTexture),e.texSubImage3D(e.TEXTURE_3D,0,0,0,0,i.x,i.y,i.z,e.RED,e.UNSIGNED_BYTE,t),e.bindTexture(e.TEXTURE_3D,null)}updateTransferFunction(){if(!this.transferFuncCanvas)return;const t=qe(this.stats.range.min,this.stats.range.max,this.params.colormap);Bt(t,this.params.thresholdMin,this.params.thresholdMax,this.stats.range.min,this.stats.range.max);const i=this.transferFuncCanvas.getContext("2d");i.clearRect(0,0,this.transferFuncCanvas.width,this.transferFuncCanvas.height),i.drawImage(t,0,0),this.transferFuncTexture.needsUpdate=!0}updateUniforms(){if(!this.volumeMaterial)return;const t=this.volumeMaterial.uniforms;t.u_stepSize.value=this.params.stepSize,t.u_density.value=this.params.density,t.u_brightness.value=this.params.brightness,t.u_renderMode.value=this.params.renderMode,t.u_showSlice.value=this.params.showSlice,t.u_sliceZ.value=this.params.sliceZ,t.u_sliceOpacity.value=this.params.sliceOpacity}setParam(t,i){this.params[t]=i,t==="colormap"||t==="thresholdMin"||t==="thresholdMax"?this.updateTransferFunction():t==="showHailCore"?(this.hailCoreMesh&&(this.hailCoreMesh.visible=i),this.hailCoreGlow&&(this.hailCoreGlow.visible=i&&this.hailCoreReady)):t==="hailWireframe"?this.hailCoreMaterial&&(this.hailCoreMaterial.wireframe=i):t==="hailOpacity"?this.hailCoreMaterial&&(this.hailCoreMaterial.opacity=i):this.updateUniforms()}addAxesGrid(){const t=new Tt(2,20,1718876,662058);t.position.y=-1.01,this.scene.add(t);const i=new E(-1,-1,-1),e=2,n=new Lt,a=new se({color:16729156,transparent:!0,opacity:.5}),l=new se({color:4521796,transparent:!0,opacity:.5}),c=new se({color:4491519,transparent:!0,opacity:.5}),g=new ie().setFromPoints([i,new E(i.x+e,i.y,i.z)]),o=new ie().setFromPoints([i,new E(i.x,i.y+e,i.z)]),u=new ie().setFromPoints([i,new E(i.x,i.y,i.z+e)]);n.add(new me(g,a)),n.add(new me(o,l)),n.add(new me(u,c)),this.scene.add(n);for(let m=1;m<=3;m++){const v=m*.66,f=[];for(let _=0;_<=64;_++){const p=_/64*Math.PI*2;f.push(new E(Math.cos(p)*v,-1,Math.sin(p)*v))}const x=new ie().setFromPoints(f),C=new se({color:2245734,transparent:!0,opacity:.3});this.scene.add(new me(x,C))}}addLightingRig(){const t=new Dt(16777215,.4);this.scene.add(t);const i=new Ze(5227511,.3);i.position.set(3,5,3),this.scene.add(i);const e=new Ze(11225020,.2);e.position.set(-3,2,-3),this.scene.add(e)}createBBox(){const t=new ce(2,2,2),i=new $t(t),e=new se({color:5227511,transparent:!0,opacity:.25});this.bboxLine=new Ft(i,e),this.scene.add(this.bboxLine);const n=new ce(2,2,2),a=new Ge({vertexShader:Rt,fragmentShader:Ht,uniforms:{u_bboxColor:{value:new je(5227511)},u_opacity:{value:.1}},side:Ye,transparent:!0,depthWrite:!1});this.bboxMesh=new ue(n,a),this.scene.add(this.bboxMesh)}onResize(){const{clientWidth:t,clientHeight:i}=this.container;this.width=t,this.height=i,this.camera.aspect=t/i,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,i)}animate(){if(requestAnimationFrame(this.animate.bind(this)),this.contextLost)return;const t=this.clock.getDelta();if(this.controls.update(),this.volumeMesh&&this.volumeMaterial&&this.dataReady){const i=new E;this.camera.getWorldPosition(i);const e=this.volumeMesh.worldToLocal(i.clone()).multiplyScalar(.5).addScalar(.5);this.volumeMaterial.uniforms.u_cameraPos.value.copy(e),this.params.sliceAnimate&&(this.params.sliceZ=(Math.sin(this.clock.elapsedTime*.4)+1)*.5,this.volumeMaterial.uniforms.u_sliceZ.value=this.params.sliceZ),this.params.rotationSpeed>0&&(this.volumeMesh.rotation.y+=t*this.params.rotationSpeed,this.bboxMesh&&(this.bboxMesh.rotation.y+=t*this.params.rotationSpeed),this.bboxLine&&(this.bboxLine.rotation.y+=t*this.params.rotationSpeed),this.hailCoreMesh&&(this.hailCoreMesh.rotation.y+=t*this.params.rotationSpeed),this.hailCoreGlow&&(this.hailCoreGlow.rotation.y+=t*this.params.rotationSpeed))}this._updateHailCorePulse(this.clock.elapsedTime),this.renderer.render(this.scene,this.camera),this.frameCount++}dispose(){this.volumeMesh&&(this.scene.remove(this.volumeMesh),this.volumeMesh.geometry.dispose(),this.volumeMesh=null),this.volumeMaterial&&(this.volumeMaterial.dispose(),this.volumeMaterial=null),this.volumeTexture&&(this.volumeTexture.dispose(),this.volumeTexture=null),this.transferFuncTexture&&(this.transferFuncTexture.dispose(),this.transferFuncTexture=null),this.transferFuncCanvas=null,this.renderer.dispose(),this.controls.dispose(),this.glInitialized=!1,this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)}}function Nt(h={}){var f,x,C,_,p;const t=(f=h.numElevations)!=null?f:14,i=(x=h.numAzimuths)!=null?x:360,e=(C=h.numRanges)!=null?C:500,n=(_=h.maxRange)!=null?_:200,a=(p=h.noise)!=null?p:.05,l=[],c=[.5,1.5,2.5,3.5,4.5,6,8,10,12,15,19,25,32,40];for(let d=0;d<Math.min(t,c.length);d++)l.push(c[d]*Math.PI/180);for(;l.length<t;)l.push(l[l.length-1]+.1);const g=new Float32Array(t*i*e),o=[{azim:45*Math.PI/180,range:60,height:8,intensity:55,width:12,coreHeight:5},{azim:120*Math.PI/180,range:100,height:14,intensity:65,width:15,coreHeight:8},{azim:210*Math.PI/180,range:80,height:10,intensity:50,width:10,coreHeight:6},{azim:300*Math.PI/180,range:130,height:6,intensity:42,width:8,coreHeight:3.5},{azim:180*Math.PI/180,range:150,height:5,intensity:35,width:14,coreHeight:2.5}],u={maxIntensity:28,height:4,bandCenterAzim:90*Math.PI/180,bandWidthAzim:120*Math.PI/180,innerRange:30,outerRange:180,brightBandHeight:3.5},m=n/e,v=2*Math.PI/i;for(let d=0;d<t;d++){const y=l[d],L=Math.cos(y),P=Math.sin(y);for(let O=0;O<i;O++){const M=O*v;for(let z=0;z<e;z++){const Y=z*m,ae=d*i*e+O*e+z;let S=-32;const D=Y*P,$=Y*L;if($<2){S=-32,g[ae]=S;continue}for(const A of o){const B=Math.atan2(Math.sin(M-A.azim),Math.cos(M-A.azim)),j=Math.abs(B)*$,G=Math.abs($-A.range),U=A.width*1.2,Z=A.width*.8,ve=A.height*.4,le=-.5*(j/U)**2,xe=-.5*(G/Z)**2;let J;D<A.coreHeight?J=-.5*((D-A.coreHeight)/ve)**2:J=-.5*((D-A.coreHeight)/(A.height*.6))**2;const ye=A.intensity*Math.exp(le+xe+J);S=Math.max(S,ye)}{let A=Math.atan2(Math.sin(M-u.bandCenterAzim),Math.cos(M-u.bandCenterAzim));if(A=Math.abs(A),A<u.bandWidthAzim/2&&$>u.innerRange&&$<u.outerRange){const B=Math.cos(Math.PI*A/(u.bandWidthAzim/2)),j=Math.sin(Math.PI*($-u.innerRange)/(u.outerRange-u.innerRange)),G=Math.exp(-.5*((D-u.brightBandHeight)/1)**2),U=u.maxIntensity*B*j*G,Z=u.maxIntensity*.4*B*j*Math.exp(-.5*(D/(u.height*.7))**2);S=Math.max(S,Math.max(U,Z))}}const oe=(Math.random()-.5)*2*a*10;S+=oe;const re=Math.exp(-$/5)*Math.exp(-D/1)*(15*Math.random());S=Math.max(S,re-10),g[ae]=Math.max(-32,Math.min(80,S))}}}return{reflectivity:g,elevations:l,numElevations:t,numAzimuths:i,numRanges:e,rangeStep:m,maxRangeKm:n,minValue:-32,maxValue:80}}function jt(h){return new Worker(""+new URL("VolumeProcessor.worker-B9Zl7HBT.js",import.meta.url).href,{type:"module",name:h==null?void 0:h.name})}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.19.2
 * @author George Michael Brower
 * @license MIT
 */class k{constructor(t,i,e,n,a="div"){this.parent=t,this.object=i,this.property=e,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(a),this.domElement.classList.add("controller"),this.domElement.classList.add(n),this.$name=document.createElement("div"),this.$name.classList.add("name"),k.nextNameID=k.nextNameID||0,this.$name.id=`lil-gui-name-${++k.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",l=>l.stopPropagation()),this.domElement.addEventListener("keyup",l=>l.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(e)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const i=this.parent.add(this.object,this.property,t);return i.name(this._name),this.destroy(),i}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Gt extends k{constructor(t,i,e){super(t,i,e,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Pe(h){let t,i;return(t=h.match(/(#|0x)?([a-f0-9]{6})/i))?i=t[2]:(t=h.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=h.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),i?"#"+i:!1}const Ut={isPrimitive:!0,match:h=>typeof h=="string",fromHexString:Pe,toHexString:Pe},ne={isPrimitive:!0,match:h=>typeof h=="number",fromHexString:h=>parseInt(h.substring(1),16),toHexString:h=>"#"+h.toString(16).padStart(6,0)},Yt={isPrimitive:!1,match:h=>Array.isArray(h),fromHexString(h,t,i=1){const e=ne.fromHexString(h);t[0]=(e>>16&255)/255*i,t[1]=(e>>8&255)/255*i,t[2]=(e&255)/255*i},toHexString([h,t,i],e=1){e=255/e;const n=h*e<<16^t*e<<8^i*e<<0;return ne.toHexString(n)}},Zt={isPrimitive:!1,match:h=>Object(h)===h,fromHexString(h,t,i=1){const e=ne.fromHexString(h);t.r=(e>>16&255)/255*i,t.g=(e>>8&255)/255*i,t.b=(e&255)/255*i},toHexString({r:h,g:t,b:i},e=1){e=255/e;const n=h*e<<16^t*e<<8^i*e<<0;return ne.toHexString(n)}},Wt=[Ut,ne,Yt,Zt];function Xt(h){return Wt.find(t=>t.match(h))}class Kt extends k{constructor(t,i,e,n){super(t,i,e,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Xt(this.initialValue),this._rgbScale=n,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const a=Pe(this.$text.value);a&&this._setValueFromHexString(a)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const i=this._format.fromHexString(t);this.setValue(i)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class _e extends k{constructor(t,i,e){super(t,i,e,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",n=>{n.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Jt extends k{constructor(t,i,e,n,a,l){super(t,i,e,"number"),this._initInput(),this.min(n),this.max(a);const c=l!==void 0;this.step(c?l:this._getImplicitStep(),c),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,i=!0){return this._step=t,this._stepExplicit=i,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let i=(t-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const i=()=>{let d=parseFloat(this.$input.value);isNaN(d)||(this._stepExplicit&&(d=this._snap(d)),this.setValue(this._clamp(d)))},e=d=>{const y=parseFloat(this.$input.value);isNaN(y)||(this._snapClampSetValue(y+d),this.$input.value=this.getValue())},n=d=>{d.key==="Enter"&&this.$input.blur(),d.code==="ArrowUp"&&(d.preventDefault(),e(this._step*this._arrowKeyMultiplier(d))),d.code==="ArrowDown"&&(d.preventDefault(),e(this._step*this._arrowKeyMultiplier(d)*-1))},a=d=>{this._inputFocused&&(d.preventDefault(),e(this._step*this._normalizeMouseWheel(d)))};let l=!1,c,g,o,u,m;const v=5,f=d=>{c=d.clientX,g=o=d.clientY,l=!0,u=this.getValue(),m=0,window.addEventListener("mousemove",x),window.addEventListener("mouseup",C)},x=d=>{if(l){const y=d.clientX-c,L=d.clientY-g;Math.abs(L)>v?(d.preventDefault(),this.$input.blur(),l=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(y)>v&&C()}if(!l){const y=d.clientY-o;m-=y*this._step*this._arrowKeyMultiplier(d),u+m>this._max?m=this._max-u:u+m<this._min&&(m=this._min-u),this._snapClampSetValue(u+m)}o=d.clientY},C=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",x),window.removeEventListener("mouseup",C)},_=()=>{this._inputFocused=!0},p=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",i),this.$input.addEventListener("keydown",n),this.$input.addEventListener("wheel",a,{passive:!1}),this.$input.addEventListener("mousedown",f),this.$input.addEventListener("focus",_),this.$input.addEventListener("blur",p)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=(p,d,y,L,P)=>(p-d)/(y-d)*(P-L)+L,i=p=>{const d=this.$slider.getBoundingClientRect();let y=t(p,d.left,d.right,this._min,this._max);this._snapClampSetValue(y)},e=p=>{this._setDraggingStyle(!0),i(p.clientX),window.addEventListener("mousemove",n),window.addEventListener("mouseup",a)},n=p=>{i(p.clientX)},a=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",a)};let l=!1,c,g;const o=p=>{p.preventDefault(),this._setDraggingStyle(!0),i(p.touches[0].clientX),l=!1},u=p=>{p.touches.length>1||(this._hasScrollBar?(c=p.touches[0].clientX,g=p.touches[0].clientY,l=!0):o(p),window.addEventListener("touchmove",m,{passive:!1}),window.addEventListener("touchend",v))},m=p=>{if(l){const d=p.touches[0].clientX-c,y=p.touches[0].clientY-g;Math.abs(d)>Math.abs(y)?o(p):(window.removeEventListener("touchmove",m),window.removeEventListener("touchend",v))}else p.preventDefault(),i(p.touches[0].clientX)},v=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",m),window.removeEventListener("touchend",v)},f=this._callOnFinishChange.bind(this),x=400;let C;const _=p=>{if(Math.abs(p.deltaX)<Math.abs(p.deltaY)&&this._hasScrollBar)return;p.preventDefault();const y=this._normalizeMouseWheel(p)*this._step;this._snapClampSetValue(this.getValue()+y),this.$input.value=this.getValue(),clearTimeout(C),C=setTimeout(f,x)};this.$slider.addEventListener("mousedown",e),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",_,{passive:!1})}_setDraggingStyle(t,i="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${i}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:i,deltaY:e}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(i=0,e=-t.wheelDelta/120,e*=this._stepExplicit?1:10),i+-e}_arrowKeyMultiplier(t){let i=this._stepExplicit?1:10;return t.shiftKey?i*=10:t.altKey&&(i/=10),i}_snap(t){const i=Math.round(t/this._step)*this._step;return parseFloat(i.toPrecision(15))}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class qt extends k{constructor(t,i,e,n){super(t,i,e,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(n)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(i=>{const e=document.createElement("option");e.textContent=i,this.$select.appendChild(e)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),i=this._values.indexOf(t);return this.$select.selectedIndex=i,this.$display.textContent=i===-1?t:this._names[i],this}}class Qt extends k{constructor(t,i,e){super(t,i,e,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",n=>{n.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const ei=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: none;
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
  }
  .lil-gui button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function ti(h){const t=document.createElement("style");t.innerHTML=h;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(t,i):document.head.appendChild(t)}let Je=!1;class Se{constructor({parent:t,autoPlace:i=t===void 0,container:e,width:n,title:a="Controls",closeFolders:l=!1,injectStyles:c=!0,touchStyles:g=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",o=>{(o.code==="Enter"||o.code==="Space")&&(o.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(a),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),g&&this.domElement.classList.add("allow-touch-styles"),!Je&&c&&(ti(ei),Je=!0),e?e.appendChild(this.domElement):i&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),n&&this.domElement.style.setProperty("--width",n+"px"),this._closeFolders=l}add(t,i,e,n,a){if(Object(e)===e)return new qt(this,t,i,e);const l=t[i];switch(typeof l){case"number":return new Jt(this,t,i,e,n,a);case"boolean":return new Gt(this,t,i);case"string":return new Qt(this,t,i);case"function":return new _e(this,t,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,t,`
	value:`,l)}addColor(t,i,e=1){return new Kt(this,t,i,e)}addFolder(t){const i=new Se({parent:this,title:t});return this.root._closeFolders&&i.close(),i}load(t,i=!0){return t.controllers&&this.controllers.forEach(e=>{e instanceof _e||e._name in t.controllers&&e.load(t.controllers[e._name])}),i&&t.folders&&this.folders.forEach(e=>{e._title in t.folders&&e.load(t.folders[e._title])}),this}save(t=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(e=>{if(!(e instanceof _e)){if(e._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${e._name}"`);i.controllers[e._name]=e.save()}}),t&&this.folders.forEach(e=>{if(e._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${e._title}"`);i.folders[e._title]=e.save()}),i}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("transition");const e=a=>{a.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",e))};this.$children.addEventListener("transitionend",e);const n=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=n+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(e=>e.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(i=>{t=t.concat(i.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(i=>{t=t.concat(i.foldersRecursive())}),t}}const Me=15e3;class ii{constructor(){this.container=document.getElementById("canvas-container"),this.loader=document.getElementById("loading-overlay"),this.loaderFill=document.getElementById("loader-fill"),this.loaderText=document.getElementById("loader-text"),this.dropZone=document.getElementById("file-drop-zone"),this.dropText=document.getElementById("drop-text"),this.fileInput=document.getElementById("file-input"),this.currentData=null,this.worker=null,this.gui=null,this.liveUpdateTimer=null,this.liveUpdateCount=0,this.firstLoad=!0,this.init()}async init(){this.renderer=new Vt(this.container),this.initWorker(),this.initGUI(),this.initFileHandler(),await this.loadDemoData()}initWorker(){this.worker=new jt,this.worker.onmessage=t=>{const{type:i,payload:e,error:n}=t.data;i==="processProgress"?this.updateLoader(e.percent,e.message):i==="processComplete"?this.onVolumeProcessed(e):i==="hailCoreProgress"?this.updateLoader(e.percent,e.message):i==="hailCoreComplete"?this.onHailCoreProcessed(e):i==="hailCoreError"?console.warn("冰雹核心提取失败:",n):(i==="processError"||i==="parseError")&&(this.hideLoader(),alert("处理失败: "+n),console.error(n))}}initGUI(){this.gui=new Se({title:"⚙ 体积渲染参数",width:320}),this.gui.domElement.style.position="absolute",this.gui.domElement.style.top="16px",this.gui.domElement.style.right="16px",this.gui.domElement.style.zIndex="50";const t=this.gui.addFolder("🎛 渲染参数");t.add(this.renderer.params,"stepSize",5e-4,.02,1e-4).name("步进大小").onChange(o=>this.renderer.setParam("stepSize",o)),t.add(this.renderer.params,"density",.05,3,.01).name("密度系数").onChange(o=>this.renderer.setParam("density",o)),t.add(this.renderer.params,"brightness",.2,3,.01).name("亮度").onChange(o=>this.renderer.setParam("brightness",o)),t.add(this.renderer.params,"rotationSpeed",0,2,.01).name("自动旋转").onChange(o=>this.renderer.setParam("rotationSpeed",o)),t.open();const i=this.gui.addFolder("🎨 渲染模式"),e={"0-体渲染(累积)":0,"1-MIP最大投影":1,"2-等值面渲染":2};i.add(this.renderer.params,"renderMode",e).name("模式").onChange(o=>this.renderer.setParam("renderMode",parseInt(o)));const n={"default-气象色板":"default","severe-强对流增强":"severe","thermal-热力":"thermal","monochrome-单色调":"monochrome"};i.add(this.renderer.params,"colormap",n).name("颜色映射").onChange(o=>this.renderer.setParam("colormap",o)),i.open();const a=this.gui.addFolder("📊 反射率阈值 (dBZ)");a.add(this.renderer.params,"thresholdMin",-32,70,.5).name("最小 dBZ").onChange(o=>this.renderer.setParam("thresholdMin",o)),a.add(this.renderer.params,"thresholdMax",-30,80,.5).name("最大 dBZ").onChange(o=>this.renderer.setParam("thresholdMax",o)),a.open();const l=this.gui.addFolder("🔪 切片显示");l.add(this.renderer.params,"showSlice").name("启用切片").onChange(o=>this.renderer.setParam("showSlice",o)),l.add(this.renderer.params,"sliceZ",0,1,.001).name("Z层位置").onChange(o=>this.renderer.setParam("sliceZ",o)),l.add(this.renderer.params,"sliceOpacity",0,1,.01).name("切片不透明度").onChange(o=>this.renderer.setParam("sliceOpacity",o)),l.add(this.renderer.params,"sliceAnimate").name("自动扫切");const c=this.gui.addFolder("📁 数据操作");c.add({加载模拟数据:()=>this.loadDemoData()},"加载模拟数据"),c.add({从文件上传:()=>this.fileInput.click()},"从文件上传"),c.add({重置视角:()=>{this.renderer.camera.position.set(2.8,2,3.2),this.renderer.controls.target.set(0,.3,0),this.renderer.controls.update()}},"重置视角"),this.liveUpdateObj={enabled:!1},c.add(this.liveUpdateObj,"enabled").name("🔄 模拟实时更新").onChange(o=>{o?this.startLiveUpdate():this.stopLiveUpdate()});const g=this.gui.addFolder("🧊 冰雹核心提取");g.add(this.renderer.params,"showHailCore").name("显示冰雹核心").onChange(o=>this.renderer.setParam("showHailCore",o)),g.add(this.renderer.params,"hailThreshold",40,75,1).name("dBZ 阈值").onChange(o=>{this.renderer.params.hailThreshold=o,this._scheduleHailReextract()}),g.add(this.renderer.params,"hailPulseSpeed",0,8,.1).name("脉动速度").onChange(o=>this.renderer.setParam("hailPulseSpeed",o)),g.add(this.renderer.params,"hailPulseIntensity",0,1,.01).name("脉动强度").onChange(o=>this.renderer.setParam("hailPulseIntensity",o)),g.add(this.renderer.params,"hailOpacity",0,1,.01).name("不透明度").onChange(o=>this.renderer.setParam("hailOpacity",o)),g.add(this.renderer.params,"hailWireframe").name("线框模式").onChange(o=>this.renderer.setParam("hailWireframe",o)),g.add({重新提取:()=>this.extractHailCore()},"重新提取"),this.hailStatEl=document.createElement("div"),this.hailStatEl.style.cssText="font-size:10px; color:#888; margin-top:6px; font-family:Consolas,monospace;",this.hailStatEl.textContent="冰雹核心: 等待提取...",g.domElement.appendChild(this.hailStatEl),g.open(),this._hailReextractTimer=null,this.createColorBar()}startLiveUpdate(){this.stopLiveUpdate(),this.liveUpdateCount=0,this.liveUpdateTimer=setInterval(()=>{this.liveUpdateCount++,this.updateLoader(5,`⏱ 实时更新 #${this.liveUpdateCount} (模拟 ${Me/1e3}s 间隔)...`),this.showLoader(),this.generateAndProcessData()},Me),console.log("[LiveUpdate] 已启动模拟实时雷达流，间隔",Me/1e3,"秒")}stopLiveUpdate(){this.liveUpdateTimer&&(clearInterval(this.liveUpdateTimer),this.liveUpdateTimer=null,console.log("[LiveUpdate] 已停止，共更新",this.liveUpdateCount,"帧"))}generateAndProcessData(){const t=Nt({numElevations:14,numAzimuths:360,numRanges:500,maxRange:200});this.currentData=t,this.worker.postMessage({type:"processPolar",payload:{...t,reflectivity:t.reflectivity,gridSize:160,gridHeight:96}},[t.reflectivity.buffer])}_scheduleHailReextract(){this._hailReextractTimer&&clearTimeout(this._hailReextractTimer),this._hailReextractTimer=setTimeout(()=>{this.extractHailCore()},250)}extractHailCore(){if(!this.currentVolumeData){console.warn("暂无体数据，无法提取冰雹核心");return}const t=new Uint8Array(this.currentVolumeData.data);this.worker.postMessage({type:"extractHailCore",payload:{volumeData:t,size:this.currentVolumeData.size,range:this.currentVolumeData.range,threshold:this.renderer.params.hailThreshold,zdrThreshold:.5}},[t.buffer])}onHailCoreProcessed(t){this.renderer.setHailCoreGeometry(t),this.hailStatEl&&(t.vertexCount>0?this.hailStatEl.innerHTML=`✅ 冰雹核心: ${t.triangleCount.toLocaleString()} 三角面 / ${t.vertexCount.toLocaleString()} 顶点`:this.hailStatEl.innerHTML="⚠ 未检测到冰雹核心 (阈值过高或无强对流区)")}createColorBar(){const t=document.createElement("div");t.style.cssText=`
      position:absolute; left:16px; bottom:48px; width:24px; height:220px;
      background: linear-gradient(to top, transparent);
      border-radius: 4px; z-index: 20; pointer-events: none;
      border: 1px solid rgba(79,195,247,0.3);
    `;const i=document.createElement("canvas");i.width=24,i.height=256,i.style.cssText="display:block; width:24px; height:220px; border-radius:3px;",t.appendChild(i),document.getElementById("app").appendChild(t);const e=document.createElement("div");e.style.cssText=`
      position:absolute; left:48px; bottom:48px; height:220px;
      display:flex; flex-direction:column; justify-content:space-between;
      font-size:10px; color:#888; z-index:20; font-family:Consolas,monospace;
      pointer-events:none;
    `;for(let n=0;n<=8;n++){const a=document.createElement("span");e.appendChild(a)}document.getElementById("app").appendChild(e),this.colorBar={canvas:i,labels:e},this.updateColorBar(),setInterval(()=>this.updateColorBar(),2e3)}updateColorBar(){if(!this.colorBar)return;const{canvas:t,labels:i}=this.colorBar,e=qe(this.renderer.stats.range.min,this.renderer.stats.range.max,this.renderer.params.colormap),n=t.getContext("2d");n.clearRect(0,0,t.width,t.height);const l=e.getContext("2d").getImageData(0,0,256,1).data,c=Math.max(0,(this.renderer.params.thresholdMin-this.renderer.stats.range.min)/(this.renderer.stats.range.max-this.renderer.stats.range.min)),g=Math.min(1,(this.renderer.params.thresholdMax-this.renderer.stats.range.min)/(this.renderer.stats.range.max-this.renderer.stats.range.min));for(let m=0;m<t.height;m++){const v=1-m/(t.height-1);let f=Math.floor(v*255);f=Math.max(0,Math.min(255,f));let x=l[f*4+3];(v<c||v>g)&&(x=0),n.fillStyle=`rgba(${l[f*4]},${l[f*4+1]},${l[f*4+2]},${x/255})`,n.fillRect(0,m,t.width,1)}const o=i.querySelectorAll("span"),u=o.length;for(let m=0;m<u;m++){const v=1-m/(u-1),f=this.renderer.stats.range.min+v*(this.renderer.stats.range.max-this.renderer.stats.range.min);o[m].textContent=`${f>=0?" ":""}${f.toFixed(0)} dBZ`}}initFileHandler(){const t=n=>{n.preventDefault(),this.dropZone.classList.add("drag"),this.dropText.textContent="释放文件以解析 NetCDF 雷达数据"},i=()=>{this.dropZone.classList.remove("drag"),this.dropText.textContent="📁 拖入 NetCDF 文件或点击上传"},e=n=>{n.preventDefault(),i(),n.dataTransfer.files[0]&&this.handleFile(n.dataTransfer.files[0])};this.dropZone.addEventListener("dragover",t),this.dropZone.addEventListener("dragleave",i),this.dropZone.addEventListener("drop",e),this.fileInput.addEventListener("change",n=>{n.target.files[0]&&this.handleFile(n.target.files[0])})}handleFile(t){this.updateLoader(2,`读取文件: ${t.name} (${(t.size/1024/1024).toFixed(1)} MB)`),this.showLoader();const i=new FileReader;i.onload=e=>{this.updateLoader(8,"提交 Web Worker 处理..."),this.worker.postMessage({type:"processNetCDFAndConvert",payload:{buffer:e.target.result}})},i.readAsArrayBuffer(t)}async loadDemoData(){this.showLoader(),this.updateLoader(2,"生成模拟雷达体扫数据 (5个风暴系统)..."),await new Promise(t=>setTimeout(t,100)),this.firstLoad=!0,this.generateAndProcessData()}onVolumeProcessed(t){if(this.currentVolumeData={data:t.data,size:t.size,range:t.range,stats:t.stats},this.firstLoad?(this.renderer.setVolumeData(t.data,t.size,t.range,t.stats),this.firstLoad=!1):this.renderer.updateVolumeData(t.data,t.size,t.range,t.stats),this.updateInfoPanel(t),this.updateColorBar(),this.renderer.params.showHailCore&&this.extractHailCore(),this.liveUpdateCount>0){const i=this.getMemoryInfo(),e=i?` | JS堆: ${(i.usedJSHeapSize/1048576).toFixed(1)}MB`:"";this.loaderText.textContent=`✅ 实时更新 #${this.liveUpdateCount} 完成${e}`,setTimeout(()=>this.hideLoader(),2e3)}else setTimeout(()=>this.hideLoader(),400)}getMemoryInfo(){return performance.memory?{usedJSHeapSize:performance.memory.usedJSHeapSize,totalJSHeapSize:performance.memory.totalJSHeapSize,jsHeapSizeLimit:performance.memory.jsHeapSizeLimit}:null}updateInfoPanel(t){const{x:i,y:e,z:n}=t.size;document.getElementById("stat-resolution").textContent=`${i} × ${e} × ${n}`,document.getElementById("stat-range").textContent=`${t.range.min} ~ ${t.range.max} dBZ`;const a=i*e*n;document.getElementById("stat-count").textContent=a>=1e6?`${(a/1e6).toFixed(2)} M`:a.toLocaleString();const l=["体渲染","MIP投影","等值面"];document.getElementById("stat-mode").textContent=l[this.renderer.params.renderMode]}showLoader(){this.loader.classList.remove("hidden")}hideLoader(){this.loader.classList.add("hidden")}updateLoader(t,i){this.loaderFill.style.width=Math.max(0,Math.min(100,t))+"%",i&&(this.loaderText.textContent=i)}}window.addEventListener("DOMContentLoaded",()=>{new ii});
//# sourceMappingURL=index-DPRo9YYR.js.map
