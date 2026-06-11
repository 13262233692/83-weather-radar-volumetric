import{E as rt,V as _,M as K,T as X,S as Oe,Q as Ie,a as F,R as lt,P as ht,b as ct,C as dt,c as ut,d as ze,e as pt,W as mt,G as gt,f as ft,L as ee,B as le,g as he,A as bt,D as Re,h as ve,i as vt,j as xt,k as Be,l as yt,m as Ve,n as wt,o as At,U as Et,p as ce,q as te,N as _t,r as Mt,s as Ct}from"./three-BPePtYlZ.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))e(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const Ne={type:"change"},xe={type:"start"},je={type:"end"},de=new lt,He=new ht,Pt=Math.cos(70*ct.DEG2RAD);class Lt extends rt{constructor(t,n){super(),this.object=t,this.domElement=n,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new _,this.cursor=new _,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:K.ROTATE,MIDDLE:K.DOLLY,RIGHT:K.PAN},this.touches={ONE:X.ROTATE,TWO:X.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return d.phi},this.getAzimuthalAngle=function(){return d.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(i){i.addEventListener("keydown",fe),this._domElementKeyEvents=i},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",fe),this._domElementKeyEvents=null},this.saveState=function(){e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=function(){e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(Ne),e.update(),o=s.NONE},this.update=function(){const i=new _,a=new Ie().setFromUnitVectors(t.up,new _(0,1,0)),b=a.clone().invert(),w=new _,S=new Ie,N=new _,k=2*Math.PI;return function(at=null){const Fe=e.object.position;i.copy(Fe).sub(e.target),i.applyQuaternion(a),d.setFromVector3(i),e.autoRotate&&o===s.NONE&&T(ne(at)),e.enableDamping?(d.theta+=c.theta*e.dampingFactor,d.phi+=c.phi*e.dampingFactor):(d.theta+=c.theta,d.phi+=c.phi);let R=e.minAzimuthAngle,B=e.maxAzimuthAngle;isFinite(R)&&isFinite(B)&&(R<-Math.PI?R+=k:R>Math.PI&&(R-=k),B<-Math.PI?B+=k:B>Math.PI&&(B-=k),R<=B?d.theta=Math.max(R,Math.min(B,d.theta)):d.theta=d.theta>(R+B)/2?Math.max(R,d.theta):Math.min(B,d.theta)),d.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,d.phi)),d.makeSafe(),e.enableDamping===!0?e.target.addScaledVector(u,e.dampingFactor):e.target.add(u),e.target.sub(e.cursor),e.target.clampLength(e.minTargetRadius,e.maxTargetRadius),e.target.add(e.cursor),e.zoomToCursor&&I||e.object.isOrthographicCamera?d.radius=Y(d.radius):d.radius=Y(d.radius*f),i.setFromSpherical(d),i.applyQuaternion(b),Fe.copy(e.target).add(i),e.object.lookAt(e.target),e.enableDamping===!0?(c.theta*=1-e.dampingFactor,c.phi*=1-e.dampingFactor,u.multiplyScalar(1-e.dampingFactor)):(c.set(0,0,0),u.set(0,0,0));let be=!1;if(e.zoomToCursor&&I){let q=null;if(e.object.isPerspectiveCamera){const Q=i.length();q=Y(Q*f);const re=Q-q;e.object.position.addScaledVector(D,re),e.object.updateMatrixWorld()}else if(e.object.isOrthographicCamera){const Q=new _(P.x,P.y,0);Q.unproject(e.object),e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/f)),e.object.updateProjectionMatrix(),be=!0;const re=new _(P.x,P.y,0);re.unproject(e.object),e.object.position.sub(re).add(Q),e.object.updateMatrixWorld(),q=i.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),e.zoomToCursor=!1;q!==null&&(this.screenSpacePanning?e.target.set(0,0,-1).transformDirection(e.object.matrix).multiplyScalar(q).add(e.object.position):(de.origin.copy(e.object.position),de.direction.set(0,0,-1).transformDirection(e.object.matrix),Math.abs(e.object.up.dot(de.direction))<Pt?t.lookAt(e.target):(He.setFromNormalAndCoplanarPoint(e.object.up,e.target),de.intersectPlane(He,e.target))))}else e.object.isOrthographicCamera&&(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/f)),e.object.updateProjectionMatrix(),be=!0);return f=1,I=!1,be||w.distanceToSquared(e.object.position)>l||8*(1-S.dot(e.object.quaternion))>l||N.distanceToSquared(e.target)>0?(e.dispatchEvent(Ne),w.copy(e.object.position),S.copy(e.object.quaternion),N.copy(e.target),!0):!1}}(),this.dispose=function(){e.domElement.removeEventListener("contextmenu",$e),e.domElement.removeEventListener("pointerdown",Se),e.domElement.removeEventListener("pointercancel",J),e.domElement.removeEventListener("wheel",De),e.domElement.removeEventListener("pointermove",ge),e.domElement.removeEventListener("pointerup",J),e._domElementKeyEvents!==null&&(e._domElementKeyEvents.removeEventListener("keydown",fe),e._domElementKeyEvents=null)};const e=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=s.NONE;const l=1e-6,d=new Oe,c=new Oe;let f=1;const u=new _,p=new F,v=new F,g=new F,x=new F,A=new F,M=new F,m=new F,h=new F,y=new F,D=new _,P=new F;let I=!1;const C=[],z={};let Z=!1;function ne(i){return i!==null?2*Math.PI/60*e.autoRotateSpeed*i:2*Math.PI/60/60*e.autoRotateSpeed}function L(i){const a=Math.abs(i*.01);return Math.pow(.95,e.zoomSpeed*a)}function T(i){c.theta-=i}function $(i){c.phi-=i}const se=function(){const i=new _;return function(b,w){i.setFromMatrixColumn(w,0),i.multiplyScalar(-b),u.add(i)}}(),oe=function(){const i=new _;return function(b,w){e.screenSpacePanning===!0?i.setFromMatrixColumn(w,1):(i.setFromMatrixColumn(w,0),i.crossVectors(e.object.up,i)),i.multiplyScalar(b),u.add(i)}}(),E=function(){const i=new _;return function(b,w){const S=e.domElement;if(e.object.isPerspectiveCamera){const N=e.object.position;i.copy(N).sub(e.target);let k=i.length();k*=Math.tan(e.object.fov/2*Math.PI/180),se(2*b*k/S.clientHeight,e.object.matrix),oe(2*w*k/S.clientHeight,e.object.matrix)}else e.object.isOrthographicCamera?(se(b*(e.object.right-e.object.left)/e.object.zoom/S.clientWidth,e.object.matrix),oe(w*(e.object.top-e.object.bottom)/e.object.zoom/S.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}}();function V(i){e.object.isPerspectiveCamera||e.object.isOrthographicCamera?f/=i:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function j(i){e.object.isPerspectiveCamera||e.object.isOrthographicCamera?f*=i:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function H(i,a){if(!e.zoomToCursor)return;I=!0;const b=e.domElement.getBoundingClientRect(),w=i-b.left,S=a-b.top,N=b.width,k=b.height;P.x=w/N*2-1,P.y=-(S/k)*2+1,D.set(P.x,P.y,1).unproject(e.object).sub(e.object.position).normalize()}function Y(i){return Math.max(e.minDistance,Math.min(e.maxDistance,i))}function W(i){p.set(i.clientX,i.clientY)}function ue(i){H(i.clientX,i.clientX),m.set(i.clientX,i.clientY)}function ae(i){x.set(i.clientX,i.clientY)}function pe(i){v.set(i.clientX,i.clientY),g.subVectors(v,p).multiplyScalar(e.rotateSpeed);const a=e.domElement;T(2*Math.PI*g.x/a.clientHeight),$(2*Math.PI*g.y/a.clientHeight),p.copy(v),e.update()}function U(i){h.set(i.clientX,i.clientY),y.subVectors(h,m),y.y>0?V(L(y.y)):y.y<0&&j(L(y.y)),m.copy(h),e.update()}function me(i){A.set(i.clientX,i.clientY),M.subVectors(A,x).multiplyScalar(e.panSpeed),E(M.x,M.y),x.copy(A),e.update()}function We(i){H(i.clientX,i.clientY),i.deltaY<0?j(L(i.deltaY)):i.deltaY>0&&V(L(i.deltaY)),e.update()}function Ge(i){let a=!1;switch(i.code){case e.keys.UP:i.ctrlKey||i.metaKey||i.shiftKey?$(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):E(0,e.keyPanSpeed),a=!0;break;case e.keys.BOTTOM:i.ctrlKey||i.metaKey||i.shiftKey?$(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):E(0,-e.keyPanSpeed),a=!0;break;case e.keys.LEFT:i.ctrlKey||i.metaKey||i.shiftKey?T(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):E(e.keyPanSpeed,0),a=!0;break;case e.keys.RIGHT:i.ctrlKey||i.metaKey||i.shiftKey?T(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):E(-e.keyPanSpeed,0),a=!0;break}a&&(i.preventDefault(),e.update())}function Ee(i){if(C.length===1)p.set(i.pageX,i.pageY);else{const a=G(i),b=.5*(i.pageX+a.x),w=.5*(i.pageY+a.y);p.set(b,w)}}function _e(i){if(C.length===1)x.set(i.pageX,i.pageY);else{const a=G(i),b=.5*(i.pageX+a.x),w=.5*(i.pageY+a.y);x.set(b,w)}}function Me(i){const a=G(i),b=i.pageX-a.x,w=i.pageY-a.y,S=Math.sqrt(b*b+w*w);m.set(0,S)}function Ke(i){e.enableZoom&&Me(i),e.enablePan&&_e(i)}function Xe(i){e.enableZoom&&Me(i),e.enableRotate&&Ee(i)}function Ce(i){if(C.length==1)v.set(i.pageX,i.pageY);else{const b=G(i),w=.5*(i.pageX+b.x),S=.5*(i.pageY+b.y);v.set(w,S)}g.subVectors(v,p).multiplyScalar(e.rotateSpeed);const a=e.domElement;T(2*Math.PI*g.x/a.clientHeight),$(2*Math.PI*g.y/a.clientHeight),p.copy(v)}function Pe(i){if(C.length===1)A.set(i.pageX,i.pageY);else{const a=G(i),b=.5*(i.pageX+a.x),w=.5*(i.pageY+a.y);A.set(b,w)}M.subVectors(A,x).multiplyScalar(e.panSpeed),E(M.x,M.y),x.copy(A)}function Le(i){const a=G(i),b=i.pageX-a.x,w=i.pageY-a.y,S=Math.sqrt(b*b+w*w);h.set(0,S),y.set(0,Math.pow(h.y/m.y,e.zoomSpeed)),V(y.y),m.copy(h);const N=(i.pageX+a.x)*.5,k=(i.pageY+a.y)*.5;H(N,k)}function Ue(i){e.enableZoom&&Le(i),e.enablePan&&Pe(i)}function Je(i){e.enableZoom&&Le(i),e.enableRotate&&Ce(i)}function Se(i){e.enabled!==!1&&(C.length===0&&(e.domElement.setPointerCapture(i.pointerId),e.domElement.addEventListener("pointermove",ge),e.domElement.addEventListener("pointerup",J)),st(i),i.pointerType==="touch"?it(i):qe(i))}function ge(i){e.enabled!==!1&&(i.pointerType==="touch"?nt(i):Qe(i))}function J(i){ot(i),C.length===0&&(e.domElement.releasePointerCapture(i.pointerId),e.domElement.removeEventListener("pointermove",ge),e.domElement.removeEventListener("pointerup",J)),e.dispatchEvent(je),o=s.NONE}function qe(i){let a;switch(i.button){case 0:a=e.mouseButtons.LEFT;break;case 1:a=e.mouseButtons.MIDDLE;break;case 2:a=e.mouseButtons.RIGHT;break;default:a=-1}switch(a){case K.DOLLY:if(e.enableZoom===!1)return;ue(i),o=s.DOLLY;break;case K.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(e.enablePan===!1)return;ae(i),o=s.PAN}else{if(e.enableRotate===!1)return;W(i),o=s.ROTATE}break;case K.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(e.enableRotate===!1)return;W(i),o=s.ROTATE}else{if(e.enablePan===!1)return;ae(i),o=s.PAN}break;default:o=s.NONE}o!==s.NONE&&e.dispatchEvent(xe)}function Qe(i){switch(o){case s.ROTATE:if(e.enableRotate===!1)return;pe(i);break;case s.DOLLY:if(e.enableZoom===!1)return;U(i);break;case s.PAN:if(e.enablePan===!1)return;me(i);break}}function De(i){e.enabled===!1||e.enableZoom===!1||o!==s.NONE||(i.preventDefault(),e.dispatchEvent(xe),We(et(i)),e.dispatchEvent(je))}function et(i){const a=i.deltaMode,b={clientX:i.clientX,clientY:i.clientY,deltaY:i.deltaY};switch(a){case 1:b.deltaY*=16;break;case 2:b.deltaY*=100;break}return i.ctrlKey&&!Z&&(b.deltaY*=10),b}function tt(i){i.key==="Control"&&(Z=!0,document.addEventListener("keyup",Te,{passive:!0,capture:!0}))}function Te(i){i.key==="Control"&&(Z=!1,document.removeEventListener("keyup",Te,{passive:!0,capture:!0}))}function fe(i){e.enabled===!1||e.enablePan===!1||Ge(i)}function it(i){switch(ke(i),C.length){case 1:switch(e.touches.ONE){case X.ROTATE:if(e.enableRotate===!1)return;Ee(i),o=s.TOUCH_ROTATE;break;case X.PAN:if(e.enablePan===!1)return;_e(i),o=s.TOUCH_PAN;break;default:o=s.NONE}break;case 2:switch(e.touches.TWO){case X.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Ke(i),o=s.TOUCH_DOLLY_PAN;break;case X.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Xe(i),o=s.TOUCH_DOLLY_ROTATE;break;default:o=s.NONE}break;default:o=s.NONE}o!==s.NONE&&e.dispatchEvent(xe)}function nt(i){switch(ke(i),o){case s.TOUCH_ROTATE:if(e.enableRotate===!1)return;Ce(i),e.update();break;case s.TOUCH_PAN:if(e.enablePan===!1)return;Pe(i),e.update();break;case s.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Ue(i),e.update();break;case s.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Je(i),e.update();break;default:o=s.NONE}}function $e(i){e.enabled!==!1&&i.preventDefault()}function st(i){C.push(i.pointerId)}function ot(i){delete z[i.pointerId];for(let a=0;a<C.length;a++)if(C[a]==i.pointerId){C.splice(a,1);return}}function ke(i){let a=z[i.pointerId];a===void 0&&(a=new F,z[i.pointerId]=a),a.set(i.pageX,i.pageY)}function G(i){const a=i.pointerId===C[0]?C[1]:C[0];return z[a]}e.domElement.addEventListener("contextmenu",$e),e.domElement.addEventListener("pointerdown",Se),e.domElement.addEventListener("pointercancel",J),e.domElement.addEventListener("wheel",De,{passive:!1}),document.addEventListener("keydown",tt,{passive:!0,capture:!0}),this.update()}}const St=`
  varying vec3 vWorldPosition;
  varying vec3 vLocalPosition;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vLocalPosition = position * 0.5 + 0.5;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`,Dt=`
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

  vec4 sampleVolume(vec3 pos) {
    float scalar = texture(u_volume, pos).r;
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
      float eps = 0.01;
      vec3 grad;
      grad.x = texture(u_volume, maxPos + vec3(eps, 0.0, 0.0)).r - texture(u_volume, maxPos - vec3(eps, 0.0, 0.0)).r;
      grad.y = texture(u_volume, maxPos + vec3(0.0, eps, 0.0)).r - texture(u_volume, maxPos - vec3(0.0, eps, 0.0)).r;
      grad.z = texture(u_volume, maxPos + vec3(0.0, 0.0, eps)).r - texture(u_volume, maxPos - vec3(0.0, 0.0, eps)).r;
      float gradLen = length(grad);
      if (gradLen > 0.0001) grad /= gradLen;
      vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
      float diffuse = max(dot(grad, lightDir), 0.0);
      float ambient = 0.3;
      vec4 baseColor = texture2D(u_transferFunc, vec2(texture(u_volume, maxPos).r, 0.5));
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
`,Tt=`
  varying vec3 vLocalPosition;
  varying vec3 vNormal;

  void main() {
    vLocalPosition = position * 0.5 + 0.5;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,$t=`
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
`;function Ze(r=0,t=70,n="default"){const o=document.createElement("canvas");o.width=256,o.height=1;const l=o.getContext("2d"),d=l.createImageData(256,1),c={default:[{pos:0,r:0,g:0,b:0,a:0},{pos:.08,r:0,g:100,b:200,a:.02},{pos:.15,r:0,g:180,b:255,a:.06},{pos:.25,r:0,g:220,b:180,a:.1},{pos:.35,r:80,g:255,b:80,a:.15},{pos:.45,r:200,g:255,b:50,a:.22},{pos:.55,r:255,g:220,b:0,a:.3},{pos:.65,r:255,g:150,b:0,a:.4},{pos:.75,r:255,g:80,b:40,a:.5},{pos:.85,r:220,g:20,b:120,a:.65},{pos:.95,r:180,g:0,b:180,a:.8},{pos:1,r:255,g:50,b:255,a:.95}],severe:[{pos:0,r:0,g:0,b:0,a:0},{pos:.1,r:0,g:120,b:180,a:.05},{pos:.2,r:0,g:200,b:220,a:.1},{pos:.3,r:50,g:220,b:100,a:.18},{pos:.4,r:150,g:240,b:50,a:.25},{pos:.5,r:255,g:240,b:0,a:.35},{pos:.57,r:255,g:160,b:0,a:.5},{pos:.65,r:255,g:80,b:0,a:.65},{pos:.75,r:255,g:0,b:80,a:.8},{pos:.85,r:220,g:0,b:220,a:.9},{pos:1,r:255,g:100,b:255,a:1}],thermal:[{pos:0,r:0,g:0,b:0,a:0},{pos:.1,r:20,g:0,b:80,a:.08},{pos:.2,r:60,g:0,b:140,a:.15},{pos:.35,r:120,g:0,b:160,a:.25},{pos:.5,r:180,g:40,b:100,a:.4},{pos:.65,r:220,g:100,b:40,a:.55},{pos:.8,r:255,g:180,b:0,a:.75},{pos:1,r:255,g:255,b:150,a:1}],monochrome:[{pos:0,r:0,g:0,b:0,a:0},{pos:.1,r:30,g:30,b:40,a:.05},{pos:.3,r:80,g:80,b:100,a:.15},{pos:.5,r:140,g:140,b:160,a:.3},{pos:.7,r:190,g:190,b:210,a:.5},{pos:.85,r:230,g:230,b:240,a:.7},{pos:1,r:255,g:255,b:255,a:.95}]},f=c[n]||c.default;for(let u=0;u<256;u++){const p=u/255;let v=0;for(let P=0;P<f.length-1;P++)if(p>=f[P].pos&&p<=f[P+1].pos){v=P;break}const g=f[v],x=f[Math.min(v+1,f.length-1)],A=x.pos===g.pos?0:(p-g.pos)/(x.pos-g.pos),M=Math.round(g.r+(x.r-g.r)*A),m=Math.round(g.g+(x.g-g.g)*A),h=Math.round(g.b+(x.b-g.b)*A),y=Math.round((g.a+(x.a-g.a)*A)*255),D=u*4;d.data[D]=M,d.data[D+1]=m,d.data[D+2]=h,d.data[D+3]=y}return l.putImageData(d,0,0),o}function kt(r,t,n,e=0,s=70){const o=r.getContext("2d"),l=o.getImageData(0,0,r.width,r.height),d=l.data,c=(t-e)/(s-e),f=(n-e)/(s-e);for(let u=0;u<r.width;u++){const p=u/(r.width-1),v=u*4;(p<c||p>f)&&(d[v+3]=0)}return o.putImageData(l,0,0),r}class Ft{constructor(t){this.container=t,this.clock=new dt,this.volumeMesh=null,this.volumeTexture=null,this.transferFuncTexture=null,this.volumeMaterial=null,this.bboxMesh=null,this.dataReady=!1,this.params={stepSize:.003,density:.6,brightness:1.3,thresholdMin:5,thresholdMax:70,renderMode:0,colormap:"default",showBBox:!0,showAxes:!0,showSlice:!1,sliceZ:.5,sliceOpacity:.8,sliceAnimate:!1,rotationSpeed:0},this.stats={resolution:{x:0,y:0,z:0},range:{min:0,max:0},voxelCount:0,nonZero:0},this.init()}init(){const{clientWidth:t,clientHeight:n}=this.container;this.width=t,this.height=n,this.scene=new ut,this.scene.background=new ze(328976),this.camera=new pt(45,t/n,.1,1e3),this.camera.position.set(2.8,2,3.2),this.camera.lookAt(0,.3,0),this.renderer=new mt({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(t,n),this.renderer.setClearColor(328976,1),this.container.appendChild(this.renderer.domElement),this.controls=new Lt(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.minDistance=.8,this.controls.maxDistance=12,this.controls.target.set(0,.3,0),this.addAxesGrid(),this.addLightingRig(),this.createBBox(),window.addEventListener("resize",this.onResize.bind(this)),this.animate()}addAxesGrid(){const t=new gt(2,20,1718876,662058);t.position.y=-1.01,this.scene.add(t);const n=new _(-1,-1,-1),e=2,s=new ft,o=new ee({color:16729156,transparent:!0,opacity:.5}),l=new ee({color:4521796,transparent:!0,opacity:.5}),d=new ee({color:4491519,transparent:!0,opacity:.5}),c=new le().setFromPoints([n,new _(n.x+e,n.y,n.z)]),f=new le().setFromPoints([n,new _(n.x,n.y+e,n.z)]),u=new le().setFromPoints([n,new _(n.x,n.y,n.z+e)]);s.add(new he(c,o)),s.add(new he(f,l)),s.add(new he(u,d)),this.scene.add(s);for(let p=1;p<=3;p++){const v=p*.66,g=[];for(let M=0;M<=64;M++){const m=M/64*Math.PI*2;g.push(new _(Math.cos(m)*v,-1,Math.sin(m)*v))}const x=new le().setFromPoints(g),A=new ee({color:2245734,transparent:!0,opacity:.3});this.scene.add(new he(x,A))}}addLightingRig(){const t=new bt(16777215,.4);this.scene.add(t);const n=new Re(5227511,.3);n.position.set(3,5,3),this.scene.add(n);const e=new Re(11225020,.2);e.position.set(-3,2,-3),this.scene.add(e)}createBBox(){const t=new ve(2,2,2),n=new vt(t),e=new ee({color:5227511,transparent:!0,opacity:.25});this.bboxLine=new xt(n,e),this.scene.add(this.bboxLine);const s=new ve(2,2,2),o=new Be({vertexShader:Tt,fragmentShader:$t,uniforms:{u_bboxColor:{value:new ze(5227511)},u_opacity:{value:.1}},side:yt,transparent:!0,depthWrite:!1});this.bboxMesh=new Ve(s,o),this.scene.add(this.bboxMesh)}setVolumeData(t,n,e,s){this.disposeVolume(),this.stats.resolution=n,this.stats.range=e,this.stats.voxelCount=(s==null?void 0:s.voxelCount)||n.x*n.y*n.z,this.stats.nonZero=(s==null?void 0:s.nonZero)||0,this.volumeTexture=new wt(t,n.x,n.y,n.z),this.volumeTexture.format=At,this.volumeTexture.type=Et,this.volumeTexture.minFilter=ce,this.volumeTexture.magFilter=ce,this.volumeTexture.unpackAlignment=1,this.volumeTexture.wrapS=te,this.volumeTexture.wrapT=te,this.volumeTexture.wrapR=te,this.volumeTexture.needsUpdate=!0,this.updateTransferFunction();const o=new ve(2,2,2);this.volumeMaterial=new Be({vertexShader:St,fragmentShader:Dt,uniforms:{u_volume:{value:this.volumeTexture},u_transferFunc:{value:this.transferFuncTexture},u_cameraPos:{value:new _},u_threshold:{value:.1},u_maxdBZ:{value:e.max},u_mindBZ:{value:e.min},u_stepSize:{value:this.params.stepSize},u_density:{value:this.params.density},u_brightness:{value:this.params.brightness},u_renderMode:{value:this.params.renderMode},u_boundsMin:{value:new _(0,0,0)},u_boundsMax:{value:new _(1,1,1)},u_showSlice:{value:this.params.showSlice},u_sliceZ:{value:this.params.sliceZ},u_sliceOpacity:{value:this.params.sliceOpacity}},side:Mt,transparent:!0,depthWrite:!1,blending:_t}),this.volumeMesh=new Ve(o,this.volumeMaterial),this.scene.add(this.volumeMesh),this.dataReady=!0}updateTransferFunction(){const t=Ze(this.stats.range.min,this.stats.range.max,this.params.colormap);kt(t,this.params.thresholdMin,this.params.thresholdMax,this.stats.range.min,this.stats.range.max),this.transferFuncTexture&&this.transferFuncTexture.dispose(),this.transferFuncTexture=new Ct(t),this.transferFuncTexture.minFilter=ce,this.transferFuncTexture.magFilter=ce,this.transferFuncTexture.wrapS=te,this.transferFuncTexture.wrapT=te,this.transferFuncTexture.needsUpdate=!0,this.volumeMaterial&&(this.volumeMaterial.uniforms.u_transferFunc.value=this.transferFuncTexture)}updateUniforms(){if(!this.volumeMaterial)return;const t=this.volumeMaterial.uniforms;t.u_stepSize.value=this.params.stepSize,t.u_density.value=this.params.density,t.u_brightness.value=this.params.brightness,t.u_renderMode.value=this.params.renderMode,t.u_showSlice.value=this.params.showSlice,t.u_sliceZ.value=this.params.sliceZ,t.u_sliceOpacity.value=this.params.sliceOpacity}setParam(t,n){this.params[t]=n,t==="colormap"||t==="thresholdMin"||t==="thresholdMax"?this.updateTransferFunction():this.updateUniforms()}disposeVolume(){this.volumeMesh&&(this.scene.remove(this.volumeMesh),this.volumeMesh.geometry.dispose(),this.volumeMesh.material.dispose(),this.volumeMesh=null),this.volumeTexture&&(this.volumeTexture.dispose(),this.volumeTexture=null),this.transferFuncTexture&&(this.transferFuncTexture.dispose(),this.transferFuncTexture=null),this.volumeMaterial=null,this.dataReady=!1}onResize(){const{clientWidth:t,clientHeight:n}=this.container;this.width=t,this.height=n,this.camera.aspect=t/n,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,n)}animate(){requestAnimationFrame(this.animate.bind(this));const t=this.clock.getDelta();if(this.controls.update(),this.volumeMesh&&this.volumeMaterial){const n=new _;this.camera.getWorldPosition(n);const e=this.volumeMesh.worldToLocal(n.clone()).multiplyScalar(.5).addScalar(.5);this.volumeMaterial.uniforms.u_cameraPos.value.copy(e),this.params.sliceAnimate&&(this.params.sliceZ=(Math.sin(this.clock.elapsedTime*.4)+1)*.5,this.volumeMaterial.uniforms.u_sliceZ.value=this.params.sliceZ),this.params.rotationSpeed>0&&(this.volumeMesh.rotation.y+=t*this.params.rotationSpeed,this.bboxMesh&&(this.bboxMesh.rotation.y+=t*this.params.rotationSpeed),this.bboxLine&&(this.bboxLine.rotation.y+=t*this.params.rotationSpeed))}this.renderer.render(this.scene,this.camera)}dispose(){this.disposeVolume(),this.renderer.dispose(),this.controls.dispose(),this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)}}function Ot(r={}){var g,x,A,M,m;const t=(g=r.numElevations)!=null?g:14,n=(x=r.numAzimuths)!=null?x:360,e=(A=r.numRanges)!=null?A:500,s=(M=r.maxRange)!=null?M:200,o=(m=r.noise)!=null?m:.05,l=[],d=[.5,1.5,2.5,3.5,4.5,6,8,10,12,15,19,25,32,40];for(let h=0;h<Math.min(t,d.length);h++)l.push(d[h]*Math.PI/180);for(;l.length<t;)l.push(l[l.length-1]+.1);const c=new Float32Array(t*n*e),f=[{azim:45*Math.PI/180,range:60,height:8,intensity:55,width:12,coreHeight:5},{azim:120*Math.PI/180,range:100,height:14,intensity:65,width:15,coreHeight:8},{azim:210*Math.PI/180,range:80,height:10,intensity:50,width:10,coreHeight:6},{azim:300*Math.PI/180,range:130,height:6,intensity:42,width:8,coreHeight:3.5},{azim:180*Math.PI/180,range:150,height:5,intensity:35,width:14,coreHeight:2.5}],u={maxIntensity:28,height:4,bandCenterAzim:90*Math.PI/180,bandWidthAzim:120*Math.PI/180,innerRange:30,outerRange:180,brightBandHeight:3.5},p=s/e,v=2*Math.PI/n;for(let h=0;h<t;h++){const y=l[h],D=Math.cos(y),P=Math.sin(y);for(let I=0;I<n;I++){const C=I*v;for(let z=0;z<e;z++){const Z=z*p,ne=h*n*e+I*e+z;let L=-32;const T=Z*P,$=Z*D;if($<2){L=-32,c[ne]=L;continue}for(const E of f){const V=Math.atan2(Math.sin(C-E.azim),Math.cos(C-E.azim)),j=Math.abs(V)*$,H=Math.abs($-E.range),Y=E.width*1.2,W=E.width*.8,ue=E.height*.4,ae=-.5*(j/Y)**2,pe=-.5*(H/W)**2;let U;T<E.coreHeight?U=-.5*((T-E.coreHeight)/ue)**2:U=-.5*((T-E.coreHeight)/(E.height*.6))**2;const me=E.intensity*Math.exp(ae+pe+U);L=Math.max(L,me)}{let E=Math.atan2(Math.sin(C-u.bandCenterAzim),Math.cos(C-u.bandCenterAzim));if(E=Math.abs(E),E<u.bandWidthAzim/2&&$>u.innerRange&&$<u.outerRange){const V=Math.cos(Math.PI*E/(u.bandWidthAzim/2)),j=Math.sin(Math.PI*($-u.innerRange)/(u.outerRange-u.innerRange)),H=Math.exp(-.5*((T-u.brightBandHeight)/1)**2),Y=u.maxIntensity*V*j*H,W=u.maxIntensity*.4*V*j*Math.exp(-.5*(T/(u.height*.7))**2);L=Math.max(L,Math.max(Y,W))}}const se=(Math.random()-.5)*2*o*10;L+=se;const oe=Math.exp(-$/5)*Math.exp(-T/1)*(15*Math.random());L=Math.max(L,oe-10),c[ne]=Math.max(-32,Math.min(80,L))}}}return{reflectivity:c,elevations:l,numElevations:t,numAzimuths:n,numRanges:e,rangeStep:p,maxRangeKm:s,minValue:-32,maxValue:80}}function It(r){return new Worker(""+new URL("VolumeProcessor.worker-DpcZcVNG.js",import.meta.url).href,{type:"module",name:r==null?void 0:r.name})}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.19.2
 * @author George Michael Brower
 * @license MIT
 */class O{constructor(t,n,e,s,o="div"){this.parent=t,this.object=n,this.property=e,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(o),this.domElement.classList.add("controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("name"),O.nextNameID=O.nextNameID||0,this.$name.id=`lil-gui-name-${++O.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",l=>l.stopPropagation()),this.domElement.addEventListener("keyup",l=>l.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(e)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const n=this.parent.add(this.object,this.property,t);return n.name(this._name),this.destroy(),n}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class zt extends O{constructor(t,n,e){super(t,n,e,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function we(r){let t,n;return(t=r.match(/(#|0x)?([a-f0-9]{6})/i))?n=t[2]:(t=r.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?n=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=r.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(n=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),n?"#"+n:!1}const Rt={isPrimitive:!0,match:r=>typeof r=="string",fromHexString:we,toHexString:we},ie={isPrimitive:!0,match:r=>typeof r=="number",fromHexString:r=>parseInt(r.substring(1),16),toHexString:r=>"#"+r.toString(16).padStart(6,0)},Bt={isPrimitive:!1,match:r=>Array.isArray(r),fromHexString(r,t,n=1){const e=ie.fromHexString(r);t[0]=(e>>16&255)/255*n,t[1]=(e>>8&255)/255*n,t[2]=(e&255)/255*n},toHexString([r,t,n],e=1){e=255/e;const s=r*e<<16^t*e<<8^n*e<<0;return ie.toHexString(s)}},Vt={isPrimitive:!1,match:r=>Object(r)===r,fromHexString(r,t,n=1){const e=ie.fromHexString(r);t.r=(e>>16&255)/255*n,t.g=(e>>8&255)/255*n,t.b=(e&255)/255*n},toHexString({r,g:t,b:n},e=1){e=255/e;const s=r*e<<16^t*e<<8^n*e<<0;return ie.toHexString(s)}},Nt=[Rt,ie,Bt,Vt];function jt(r){return Nt.find(t=>t.match(r))}class Ht extends O{constructor(t,n,e,s){super(t,n,e,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=jt(this.initialValue),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const o=we(this.$text.value);o&&this._setValueFromHexString(o)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const n=this._format.fromHexString(t);this.setValue(n)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class ye extends O{constructor(t,n,e){super(t,n,e,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Yt extends O{constructor(t,n,e,s,o,l){super(t,n,e,"number"),this._initInput(),this.min(s),this.max(o);const d=l!==void 0;this.step(d?l:this._getImplicitStep(),d),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,n=!0){return this._step=t,this._stepExplicit=n,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let n=(t-this._min)/(this._max-this._min);n=Math.max(0,Math.min(n,1)),this.$fill.style.width=n*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const n=()=>{let h=parseFloat(this.$input.value);isNaN(h)||(this._stepExplicit&&(h=this._snap(h)),this.setValue(this._clamp(h)))},e=h=>{const y=parseFloat(this.$input.value);isNaN(y)||(this._snapClampSetValue(y+h),this.$input.value=this.getValue())},s=h=>{h.key==="Enter"&&this.$input.blur(),h.code==="ArrowUp"&&(h.preventDefault(),e(this._step*this._arrowKeyMultiplier(h))),h.code==="ArrowDown"&&(h.preventDefault(),e(this._step*this._arrowKeyMultiplier(h)*-1))},o=h=>{this._inputFocused&&(h.preventDefault(),e(this._step*this._normalizeMouseWheel(h)))};let l=!1,d,c,f,u,p;const v=5,g=h=>{d=h.clientX,c=f=h.clientY,l=!0,u=this.getValue(),p=0,window.addEventListener("mousemove",x),window.addEventListener("mouseup",A)},x=h=>{if(l){const y=h.clientX-d,D=h.clientY-c;Math.abs(D)>v?(h.preventDefault(),this.$input.blur(),l=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(y)>v&&A()}if(!l){const y=h.clientY-f;p-=y*this._step*this._arrowKeyMultiplier(h),u+p>this._max?p=this._max-u:u+p<this._min&&(p=this._min-u),this._snapClampSetValue(u+p)}f=h.clientY},A=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",x),window.removeEventListener("mouseup",A)},M=()=>{this._inputFocused=!0},m=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",n),this.$input.addEventListener("keydown",s),this.$input.addEventListener("wheel",o,{passive:!1}),this.$input.addEventListener("mousedown",g),this.$input.addEventListener("focus",M),this.$input.addEventListener("blur",m)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=(m,h,y,D,P)=>(m-h)/(y-h)*(P-D)+D,n=m=>{const h=this.$slider.getBoundingClientRect();let y=t(m,h.left,h.right,this._min,this._max);this._snapClampSetValue(y)},e=m=>{this._setDraggingStyle(!0),n(m.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",o)},s=m=>{n(m.clientX)},o=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",o)};let l=!1,d,c;const f=m=>{m.preventDefault(),this._setDraggingStyle(!0),n(m.touches[0].clientX),l=!1},u=m=>{m.touches.length>1||(this._hasScrollBar?(d=m.touches[0].clientX,c=m.touches[0].clientY,l=!0):f(m),window.addEventListener("touchmove",p,{passive:!1}),window.addEventListener("touchend",v))},p=m=>{if(l){const h=m.touches[0].clientX-d,y=m.touches[0].clientY-c;Math.abs(h)>Math.abs(y)?f(m):(window.removeEventListener("touchmove",p),window.removeEventListener("touchend",v))}else m.preventDefault(),n(m.touches[0].clientX)},v=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",p),window.removeEventListener("touchend",v)},g=this._callOnFinishChange.bind(this),x=400;let A;const M=m=>{if(Math.abs(m.deltaX)<Math.abs(m.deltaY)&&this._hasScrollBar)return;m.preventDefault();const y=this._normalizeMouseWheel(m)*this._step;this._snapClampSetValue(this.getValue()+y),this.$input.value=this.getValue(),clearTimeout(A),A=setTimeout(g,x)};this.$slider.addEventListener("mousedown",e),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",M,{passive:!1})}_setDraggingStyle(t,n="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${n}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:n,deltaY:e}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(n=0,e=-t.wheelDelta/120,e*=this._stepExplicit?1:10),n+-e}_arrowKeyMultiplier(t){let n=this._stepExplicit?1:10;return t.shiftKey?n*=10:t.altKey&&(n/=10),n}_snap(t){const n=Math.round(t/this._step)*this._step;return parseFloat(n.toPrecision(15))}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Zt extends O{constructor(t,n,e,s){super(t,n,e,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(s)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(n=>{const e=document.createElement("option");e.textContent=n,this.$select.appendChild(e)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),n=this._values.indexOf(t);return this.$select.selectedIndex=n,this.$display.textContent=n===-1?t:this._names[n],this}}class Wt extends O{constructor(t,n,e){super(t,n,e,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const Gt=`.lil-gui {
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
}`;function Kt(r){const t=document.createElement("style");t.innerHTML=r;const n=document.querySelector("head link[rel=stylesheet], head style");n?document.head.insertBefore(t,n):document.head.appendChild(t)}let Ye=!1;class Ae{constructor({parent:t,autoPlace:n=t===void 0,container:e,width:s,title:o="Controls",closeFolders:l=!1,injectStyles:d=!0,touchStyles:c=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",f=>{(f.code==="Enter"||f.code==="Space")&&(f.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(o),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),c&&this.domElement.classList.add("allow-touch-styles"),!Ye&&d&&(Kt(Gt),Ye=!0),e?e.appendChild(this.domElement):n&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this._closeFolders=l}add(t,n,e,s,o){if(Object(e)===e)return new Zt(this,t,n,e);const l=t[n];switch(typeof l){case"number":return new Yt(this,t,n,e,s,o);case"boolean":return new zt(this,t,n);case"string":return new Wt(this,t,n);case"function":return new ye(this,t,n)}console.error(`gui.add failed
	property:`,n,`
	object:`,t,`
	value:`,l)}addColor(t,n,e=1){return new Ht(this,t,n,e)}addFolder(t){const n=new Ae({parent:this,title:t});return this.root._closeFolders&&n.close(),n}load(t,n=!0){return t.controllers&&this.controllers.forEach(e=>{e instanceof ye||e._name in t.controllers&&e.load(t.controllers[e._name])}),n&&t.folders&&this.folders.forEach(e=>{e._title in t.folders&&e.load(t.folders[e._title])}),this}save(t=!0){const n={controllers:{},folders:{}};return this.controllers.forEach(e=>{if(!(e instanceof ye)){if(e._name in n.controllers)throw new Error(`Cannot save GUI with duplicate property "${e._name}"`);n.controllers[e._name]=e.save()}}),t&&this.folders.forEach(e=>{if(e._title in n.folders)throw new Error(`Cannot save GUI with duplicate folder "${e._title}"`);n.folders[e._title]=e.save()}),n}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const n=this.$children.clientHeight;this.$children.style.height=n+"px",this.domElement.classList.add("transition");const e=o=>{o.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",e))};this.$children.addEventListener("transitionend",e);const s=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(e=>e.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(n=>{t=t.concat(n.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(n=>{t=t.concat(n.foldersRecursive())}),t}}class Xt{constructor(){this.container=document.getElementById("canvas-container"),this.loader=document.getElementById("loading-overlay"),this.loaderFill=document.getElementById("loader-fill"),this.loaderText=document.getElementById("loader-text"),this.dropZone=document.getElementById("file-drop-zone"),this.dropText=document.getElementById("drop-text"),this.fileInput=document.getElementById("file-input"),this.currentData=null,this.worker=null,this.gui=null,this.init()}async init(){this.renderer=new Ft(this.container),this.initWorker(),this.initGUI(),this.initFileHandler(),await this.loadDemoData()}initWorker(){this.worker=new It,this.worker.onmessage=t=>{const{type:n,payload:e,error:s}=t.data;n==="processProgress"?this.updateLoader(e.percent,e.message):n==="processComplete"?this.onVolumeProcessed(e):(n==="processError"||n==="parseError")&&(this.hideLoader(),alert("处理失败: "+s),console.error(s))}}initGUI(){this.gui=new Ae({title:"⚙ 体积渲染参数",width:320}),this.gui.domElement.style.position="absolute",this.gui.domElement.style.top="16px",this.gui.domElement.style.right="16px",this.gui.domElement.style.zIndex="50";const t=this.gui.addFolder("🎛 渲染参数");t.add(this.renderer.params,"stepSize",5e-4,.02,1e-4).name("步进大小").onChange(c=>this.renderer.setParam("stepSize",c)),t.add(this.renderer.params,"density",.05,3,.01).name("密度系数").onChange(c=>this.renderer.setParam("density",c)),t.add(this.renderer.params,"brightness",.2,3,.01).name("亮度").onChange(c=>this.renderer.setParam("brightness",c)),t.add(this.renderer.params,"rotationSpeed",0,2,.01).name("自动旋转").onChange(c=>this.renderer.setParam("rotationSpeed",c)),t.open();const n=this.gui.addFolder("🎨 渲染模式"),e={"0-体渲染(累积)":0,"1-MIP最大投影":1,"2-等值面渲染":2};n.add(this.renderer.params,"renderMode",e).name("模式").onChange(c=>this.renderer.setParam("renderMode",parseInt(c)));const s={"default-气象色板":"default","severe-强对流增强":"severe","thermal-热力":"thermal","monochrome-单色调":"monochrome"};n.add(this.renderer.params,"colormap",s).name("颜色映射").onChange(c=>this.renderer.setParam("colormap",c)),n.open();const o=this.gui.addFolder("📊 反射率阈值 (dBZ)");o.add(this.renderer.params,"thresholdMin",-32,70,.5).name("最小 dBZ").onChange(c=>this.renderer.setParam("thresholdMin",c)),o.add(this.renderer.params,"thresholdMax",-30,80,.5).name("最大 dBZ").onChange(c=>this.renderer.setParam("thresholdMax",c)),o.open();const l=this.gui.addFolder("🔪 切片显示");l.add(this.renderer.params,"showSlice").name("启用切片").onChange(c=>this.renderer.setParam("showSlice",c)),l.add(this.renderer.params,"sliceZ",0,1,.001).name("Z层位置").onChange(c=>this.renderer.setParam("sliceZ",c)),l.add(this.renderer.params,"sliceOpacity",0,1,.01).name("切片不透明度").onChange(c=>this.renderer.setParam("sliceOpacity",c)),l.add(this.renderer.params,"sliceAnimate").name("自动扫切");const d=this.gui.addFolder("📁 数据操作");d.add({加载模拟数据:()=>this.loadDemoData()},"加载模拟数据"),d.add({从文件上传:()=>this.fileInput.click()},"从文件上传"),d.add({重置视角:()=>{this.renderer.camera.position.set(2.8,2,3.2),this.renderer.controls.target.set(0,.3,0),this.renderer.controls.update()}},"重置视角"),this.createColorBar()}createColorBar(){const t=document.createElement("div");t.style.cssText=`
      position:absolute; left:16px; bottom:48px; width:24px; height:220px;
      background: linear-gradient(to top, transparent);
      border-radius: 4px; z-index: 20; pointer-events: none;
      border: 1px solid rgba(79,195,247,0.3);
    `;const n=document.createElement("canvas");n.width=24,n.height=256,n.style.cssText="display:block; width:24px; height:220px; border-radius:3px;",t.appendChild(n),document.getElementById("app").appendChild(t);const e=document.createElement("div");e.style.cssText=`
      position:absolute; left:48px; bottom:48px; height:220px;
      display:flex; flex-direction:column; justify-content:space-between;
      font-size:10px; color:#888; z-index:20; font-family:Consolas,monospace;
      pointer-events:none;
    `;for(let s=0;s<=8;s++){const o=document.createElement("span");e.appendChild(o)}document.getElementById("app").appendChild(e),this.colorBar={canvas:n,labels:e},this.updateColorBar(),setInterval(()=>this.updateColorBar(),500)}updateColorBar(){if(!this.colorBar)return;const{canvas:t,labels:n}=this.colorBar,e=Ze(this.renderer.stats.range.min,this.renderer.stats.range.max,this.renderer.params.colormap),s=t.getContext("2d");s.clearRect(0,0,t.width,t.height);const l=e.getContext("2d").getImageData(0,0,256,1).data,d=Math.max(0,(this.renderer.params.thresholdMin-this.renderer.stats.range.min)/(this.renderer.stats.range.max-this.renderer.stats.range.min)),c=Math.min(1,(this.renderer.params.thresholdMax-this.renderer.stats.range.min)/(this.renderer.stats.range.max-this.renderer.stats.range.min));for(let p=0;p<t.height;p++){const v=1-p/(t.height-1);let g=Math.floor(v*255);g=Math.max(0,Math.min(255,g));let x=l[g*4+3];(v<d||v>c)&&(x=0),s.fillStyle=`rgba(${l[g*4]},${l[g*4+1]},${l[g*4+2]},${x/255})`,s.fillRect(0,p,t.width,1)}const f=n.querySelectorAll("span"),u=f.length;for(let p=0;p<u;p++){const v=1-p/(u-1),g=this.renderer.stats.range.min+v*(this.renderer.stats.range.max-this.renderer.stats.range.min);f[p].textContent=`${g>=0?" ":""}${g.toFixed(0)} dBZ`}}initFileHandler(){const t=s=>{s.preventDefault(),this.dropZone.classList.add("drag"),this.dropText.textContent="释放文件以解析 NetCDF 雷达数据"},n=()=>{this.dropZone.classList.remove("drag"),this.dropText.textContent="📁 拖入 NetCDF 文件或点击上传"},e=s=>{s.preventDefault(),n(),s.dataTransfer.files[0]&&this.handleFile(s.dataTransfer.files[0])};this.dropZone.addEventListener("dragover",t),this.dropZone.addEventListener("dragleave",n),this.dropZone.addEventListener("drop",e),this.fileInput.addEventListener("change",s=>{s.target.files[0]&&this.handleFile(s.target.files[0])})}handleFile(t){this.updateLoader(2,`读取文件: ${t.name} (${(t.size/1024/1024).toFixed(1)} MB)`),this.showLoader();const n=new FileReader;n.onload=e=>{this.updateLoader(8,"提交 Web Worker 处理..."),this.worker.postMessage({type:"processNetCDFAndConvert",payload:{buffer:e.target.result}})},n.readAsArrayBuffer(t)}async loadDemoData(){this.showLoader(),this.updateLoader(2,"生成模拟雷达体扫数据 (5个风暴系统)..."),await new Promise(n=>setTimeout(n,100));const t=Ot({numElevations:14,numAzimuths:360,numRanges:500,maxRange:200});this.currentData=t,this.updateLoader(10,"极坐标→笛卡尔坐标重采样插值中..."),this.worker.postMessage({type:"processPolar",payload:{...t,reflectivity:t.reflectivity,gridSize:160,gridHeight:96}},[t.reflectivity.buffer])}onVolumeProcessed(t){this.renderer.setVolumeData(t.data,t.size,t.range,t.stats),this.updateInfoPanel(t),this.updateColorBar(),setTimeout(()=>this.hideLoader(),400)}updateInfoPanel(t){const{x:n,y:e,z:s}=t.size;document.getElementById("stat-resolution").textContent=`${n} × ${e} × ${s}`,document.getElementById("stat-range").textContent=`${t.range.min} ~ ${t.range.max} dBZ`;const o=n*e*s;document.getElementById("stat-count").textContent=o>=1e6?`${(o/1e6).toFixed(2)} M`:o.toLocaleString();const l=["体渲染","MIP投影","等值面"];document.getElementById("stat-mode").textContent=l[this.renderer.params.renderMode]}showLoader(){this.loader.classList.remove("hidden")}hideLoader(){this.loader.classList.add("hidden")}updateLoader(t,n){this.loaderFill.style.width=Math.max(0,Math.min(100,t))+"%",n&&(this.loaderText.textContent=n)}}window.addEventListener("DOMContentLoaded",()=>{new Xt});
//# sourceMappingURL=index-CKUqMEfI.js.map
