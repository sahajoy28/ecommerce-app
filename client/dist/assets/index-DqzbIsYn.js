var yS=Object.defineProperty;var wS=(e,t,r)=>t in e?yS(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var $n=(e,t,r)=>wS(e,typeof t!="symbol"?t+"":t,r);function Kb(e,t){for(var r=0;r<t.length;r++){const n=t[r];if(typeof n!="string"&&!Array.isArray(n)){for(const o in n)if(o!=="default"&&!(o in e)){const i=Object.getOwnPropertyDescriptor(n,o);i&&Object.defineProperty(e,o,i.get?i:{enumerable:!0,get:()=>n[o]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();function Yb(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Xb={exports:{}},ad={},Qb={exports:{}},xe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ra=Symbol.for("react.element"),kS=Symbol.for("react.portal"),SS=Symbol.for("react.fragment"),jS=Symbol.for("react.strict_mode"),$S=Symbol.for("react.profiler"),CS=Symbol.for("react.provider"),_S=Symbol.for("react.context"),zS=Symbol.for("react.forward_ref"),ES=Symbol.for("react.suspense"),BS=Symbol.for("react.memo"),TS=Symbol.for("react.lazy"),Am=Symbol.iterator;function PS(e){return e===null||typeof e!="object"?null:(e=Am&&e[Am]||e["@@iterator"],typeof e=="function"?e:null)}var Jb={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Zb=Object.assign,ex={};function Xi(e,t,r){this.props=e,this.context=t,this.refs=ex,this.updater=r||Jb}Xi.prototype.isReactComponent={};Xi.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Xi.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function tx(){}tx.prototype=Xi.prototype;function th(e,t,r){this.props=e,this.context=t,this.refs=ex,this.updater=r||Jb}var rh=th.prototype=new tx;rh.constructor=th;Zb(rh,Xi.prototype);rh.isPureReactComponent=!0;var Im=Array.isArray,rx=Object.prototype.hasOwnProperty,nh={current:null},nx={key:!0,ref:!0,__self:!0,__source:!0};function ox(e,t,r){var n,o={},i=null,a=null;if(t!=null)for(n in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(i=""+t.key),t)rx.call(t,n)&&!nx.hasOwnProperty(n)&&(o[n]=t[n]);var l=arguments.length-2;if(l===1)o.children=r;else if(1<l){for(var c=Array(l),d=0;d<l;d++)c[d]=arguments[d+2];o.children=c}if(e&&e.defaultProps)for(n in l=e.defaultProps,l)o[n]===void 0&&(o[n]=l[n]);return{$$typeof:Ra,type:e,key:i,ref:a,props:o,_owner:nh.current}}function NS(e,t){return{$$typeof:Ra,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function oh(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ra}function FS(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var Om=/\/+/g;function tu(e,t){return typeof e=="object"&&e!==null&&e.key!=null?FS(""+e.key):t.toString(36)}function Gl(e,t,r,n,o){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(i){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case Ra:case kS:a=!0}}if(a)return a=e,o=o(a),e=n===""?"."+tu(a,0):n,Im(o)?(r="",e!=null&&(r=e.replace(Om,"$&/")+"/"),Gl(o,t,r,"",function(d){return d})):o!=null&&(oh(o)&&(o=NS(o,r+(!o.key||a&&a.key===o.key?"":(""+o.key).replace(Om,"$&/")+"/")+e)),t.push(o)),1;if(a=0,n=n===""?".":n+":",Im(e))for(var l=0;l<e.length;l++){i=e[l];var c=n+tu(i,l);a+=Gl(i,t,r,c,o)}else if(c=PS(e),typeof c=="function")for(e=c.call(e),l=0;!(i=e.next()).done;)i=i.value,c=n+tu(i,l++),a+=Gl(i,t,r,c,o);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function rl(e,t,r){if(e==null)return e;var n=[],o=0;return Gl(e,n,"","",function(i){return t.call(r,i,o++)}),n}function RS(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var qt={current:null},Kl={transition:null},AS={ReactCurrentDispatcher:qt,ReactCurrentBatchConfig:Kl,ReactCurrentOwner:nh};function ix(){throw Error("act(...) is not supported in production builds of React.")}xe.Children={map:rl,forEach:function(e,t,r){rl(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return rl(e,function(){t++}),t},toArray:function(e){return rl(e,function(t){return t})||[]},only:function(e){if(!oh(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};xe.Component=Xi;xe.Fragment=SS;xe.Profiler=$S;xe.PureComponent=th;xe.StrictMode=jS;xe.Suspense=ES;xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=AS;xe.act=ix;xe.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var n=Zb({},e.props),o=e.key,i=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,a=nh.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)rx.call(t,c)&&!nx.hasOwnProperty(c)&&(n[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)n.children=r;else if(1<c){l=Array(c);for(var d=0;d<c;d++)l[d]=arguments[d+2];n.children=l}return{$$typeof:Ra,type:e.type,key:o,ref:i,props:n,_owner:a}};xe.createContext=function(e){return e={$$typeof:_S,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:CS,_context:e},e.Consumer=e};xe.createElement=ox;xe.createFactory=function(e){var t=ox.bind(null,e);return t.type=e,t};xe.createRef=function(){return{current:null}};xe.forwardRef=function(e){return{$$typeof:zS,render:e}};xe.isValidElement=oh;xe.lazy=function(e){return{$$typeof:TS,_payload:{_status:-1,_result:e},_init:RS}};xe.memo=function(e,t){return{$$typeof:BS,type:e,compare:t===void 0?null:t}};xe.startTransition=function(e){var t=Kl.transition;Kl.transition={};try{e()}finally{Kl.transition=t}};xe.unstable_act=ix;xe.useCallback=function(e,t){return qt.current.useCallback(e,t)};xe.useContext=function(e){return qt.current.useContext(e)};xe.useDebugValue=function(){};xe.useDeferredValue=function(e){return qt.current.useDeferredValue(e)};xe.useEffect=function(e,t){return qt.current.useEffect(e,t)};xe.useId=function(){return qt.current.useId()};xe.useImperativeHandle=function(e,t,r){return qt.current.useImperativeHandle(e,t,r)};xe.useInsertionEffect=function(e,t){return qt.current.useInsertionEffect(e,t)};xe.useLayoutEffect=function(e,t){return qt.current.useLayoutEffect(e,t)};xe.useMemo=function(e,t){return qt.current.useMemo(e,t)};xe.useReducer=function(e,t,r){return qt.current.useReducer(e,t,r)};xe.useRef=function(e){return qt.current.useRef(e)};xe.useState=function(e){return qt.current.useState(e)};xe.useSyncExternalStore=function(e,t,r){return qt.current.useSyncExternalStore(e,t,r)};xe.useTransition=function(){return qt.current.useTransition()};xe.version="18.3.1";Qb.exports=xe;var x=Qb.exports;const Ie=Yb(x),la=Kb({__proto__:null,default:Ie},[x]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var IS=x,OS=Symbol.for("react.element"),qS=Symbol.for("react.fragment"),MS=Object.prototype.hasOwnProperty,LS=IS.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,DS={key:!0,ref:!0,__self:!0,__source:!0};function sx(e,t,r){var n,o={},i=null,a=null;r!==void 0&&(i=""+r),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(a=t.ref);for(n in t)MS.call(t,n)&&!DS.hasOwnProperty(n)&&(o[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)o[n]===void 0&&(o[n]=t[n]);return{$$typeof:OS,type:e,key:i,ref:a,props:o,_owner:LS.current}}ad.Fragment=qS;ad.jsx=sx;ad.jsxs=sx;Xb.exports=ad;var s=Xb.exports;const WS=Yb(s),HS=Kb({__proto__:null,default:WS},[s]);var jf={},ax={exports:{}},lr={},lx={exports:{}},cx={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(P,A){var D=P.length;P.push(A);e:for(;0<D;){var ae=D-1>>>1,ee=P[ae];if(0<o(ee,A))P[ae]=A,P[D]=ee,D=ae;else break e}}function r(P){return P.length===0?null:P[0]}function n(P){if(P.length===0)return null;var A=P[0],D=P.pop();if(D!==A){P[0]=D;e:for(var ae=0,ee=P.length,fe=ee>>>1;ae<fe;){var me=2*(ae+1)-1,Se=P[me],_e=me+1,rt=P[_e];if(0>o(Se,D))_e<ee&&0>o(rt,Se)?(P[ae]=rt,P[_e]=D,ae=_e):(P[ae]=Se,P[me]=D,ae=me);else if(_e<ee&&0>o(rt,D))P[ae]=rt,P[_e]=D,ae=_e;else break e}}return A}function o(P,A){var D=P.sortIndex-A.sortIndex;return D!==0?D:P.id-A.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var a=Date,l=a.now();e.unstable_now=function(){return a.now()-l}}var c=[],d=[],f=1,p=null,h=3,y=!1,m=!1,v=!1,$=typeof setTimeout=="function"?setTimeout:null,S=typeof clearTimeout=="function"?clearTimeout:null,j=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function k(P){for(var A=r(d);A!==null;){if(A.callback===null)n(d);else if(A.startTime<=P)n(d),A.sortIndex=A.expirationTime,t(c,A);else break;A=r(d)}}function w(P){if(v=!1,k(P),!m)if(r(c)!==null)m=!0,T(_);else{var A=r(d);A!==null&&z(w,A.startTime-P)}}function _(P,A){m=!1,v&&(v=!1,S(N),N=-1),y=!0;var D=h;try{for(k(A),p=r(c);p!==null&&(!(p.expirationTime>A)||P&&!R());){var ae=p.callback;if(typeof ae=="function"){p.callback=null,h=p.priorityLevel;var ee=ae(p.expirationTime<=A);A=e.unstable_now(),typeof ee=="function"?p.callback=ee:p===r(c)&&n(c),k(A)}else n(c);p=r(c)}if(p!==null)var fe=!0;else{var me=r(d);me!==null&&z(w,me.startTime-A),fe=!1}return fe}finally{p=null,h=D,y=!1}}var B=!1,E=null,N=-1,L=5,V=-1;function R(){return!(e.unstable_now()-V<L)}function M(){if(E!==null){var P=e.unstable_now();V=P;var A=!0;try{A=E(!0,P)}finally{A?W():(B=!1,E=null)}}else B=!1}var W;if(typeof j=="function")W=function(){j(M)};else if(typeof MessageChannel<"u"){var Z=new MessageChannel,I=Z.port2;Z.port1.onmessage=M,W=function(){I.postMessage(null)}}else W=function(){$(M,0)};function T(P){E=P,B||(B=!0,W())}function z(P,A){N=$(function(){P(e.unstable_now())},A)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(P){P.callback=null},e.unstable_continueExecution=function(){m||y||(m=!0,T(_))},e.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):L=0<P?Math.floor(1e3/P):5},e.unstable_getCurrentPriorityLevel=function(){return h},e.unstable_getFirstCallbackNode=function(){return r(c)},e.unstable_next=function(P){switch(h){case 1:case 2:case 3:var A=3;break;default:A=h}var D=h;h=A;try{return P()}finally{h=D}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(P,A){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var D=h;h=P;try{return A()}finally{h=D}},e.unstable_scheduleCallback=function(P,A,D){var ae=e.unstable_now();switch(typeof D=="object"&&D!==null?(D=D.delay,D=typeof D=="number"&&0<D?ae+D:ae):D=ae,P){case 1:var ee=-1;break;case 2:ee=250;break;case 5:ee=1073741823;break;case 4:ee=1e4;break;default:ee=5e3}return ee=D+ee,P={id:f++,callback:A,priorityLevel:P,startTime:D,expirationTime:ee,sortIndex:-1},D>ae?(P.sortIndex=D,t(d,P),r(c)===null&&P===r(d)&&(v?(S(N),N=-1):v=!0,z(w,D-ae))):(P.sortIndex=ee,t(c,P),m||y||(m=!0,T(_))),P},e.unstable_shouldYield=R,e.unstable_wrapCallback=function(P){var A=h;return function(){var D=h;h=A;try{return P.apply(this,arguments)}finally{h=D}}}})(cx);lx.exports=cx;var US=lx.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var VS=x,sr=US;function K(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var dx=new Set,ca={};function Uo(e,t){Fi(e,t),Fi(e+"Capture",t)}function Fi(e,t){for(ca[e]=t,e=0;e<t.length;e++)dx.add(t[e])}var bn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),$f=Object.prototype.hasOwnProperty,GS=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,qm={},Mm={};function KS(e){return $f.call(Mm,e)?!0:$f.call(qm,e)?!1:GS.test(e)?Mm[e]=!0:(qm[e]=!0,!1)}function YS(e,t,r,n){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return n?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function XS(e,t,r,n){if(t===null||typeof t>"u"||YS(e,t,r,n))return!0;if(n)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Mt(e,t,r,n,o,i,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=n,this.attributeNamespace=o,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=a}var yt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){yt[e]=new Mt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];yt[t]=new Mt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){yt[e]=new Mt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){yt[e]=new Mt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){yt[e]=new Mt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){yt[e]=new Mt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){yt[e]=new Mt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){yt[e]=new Mt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){yt[e]=new Mt(e,5,!1,e.toLowerCase(),null,!1,!1)});var ih=/[\-:]([a-z])/g;function sh(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ih,sh);yt[t]=new Mt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ih,sh);yt[t]=new Mt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ih,sh);yt[t]=new Mt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){yt[e]=new Mt(e,1,!1,e.toLowerCase(),null,!1,!1)});yt.xlinkHref=new Mt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){yt[e]=new Mt(e,1,!1,e.toLowerCase(),null,!0,!0)});function ah(e,t,r,n){var o=yt.hasOwnProperty(t)?yt[t]:null;(o!==null?o.type!==0:n||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(XS(t,r,o,n)&&(r=null),n||o===null?KS(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):o.mustUseProperty?e[o.propertyName]=r===null?o.type===3?!1:"":r:(t=o.attributeName,n=o.attributeNamespace,r===null?e.removeAttribute(t):(o=o.type,r=o===3||o===4&&r===!0?"":""+r,n?e.setAttributeNS(n,t,r):e.setAttribute(t,r))))}var Sn=VS.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,nl=Symbol.for("react.element"),fi=Symbol.for("react.portal"),pi=Symbol.for("react.fragment"),lh=Symbol.for("react.strict_mode"),Cf=Symbol.for("react.profiler"),ux=Symbol.for("react.provider"),fx=Symbol.for("react.context"),ch=Symbol.for("react.forward_ref"),_f=Symbol.for("react.suspense"),zf=Symbol.for("react.suspense_list"),dh=Symbol.for("react.memo"),Nn=Symbol.for("react.lazy"),px=Symbol.for("react.offscreen"),Lm=Symbol.iterator;function fs(e){return e===null||typeof e!="object"?null:(e=Lm&&e[Lm]||e["@@iterator"],typeof e=="function"?e:null)}var He=Object.assign,ru;function qs(e){if(ru===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);ru=t&&t[1]||""}return`
`+ru+e}var nu=!1;function ou(e,t){if(!e||nu)return"";nu=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var n=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){n=d}e.call(t.prototype)}else{try{throw Error()}catch(d){n=d}e()}}catch(d){if(d&&n&&typeof d.stack=="string"){for(var o=d.stack.split(`
`),i=n.stack.split(`
`),a=o.length-1,l=i.length-1;1<=a&&0<=l&&o[a]!==i[l];)l--;for(;1<=a&&0<=l;a--,l--)if(o[a]!==i[l]){if(a!==1||l!==1)do if(a--,l--,0>l||o[a]!==i[l]){var c=`
`+o[a].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=a&&0<=l);break}}}finally{nu=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?qs(e):""}function QS(e){switch(e.tag){case 5:return qs(e.type);case 16:return qs("Lazy");case 13:return qs("Suspense");case 19:return qs("SuspenseList");case 0:case 2:case 15:return e=ou(e.type,!1),e;case 11:return e=ou(e.type.render,!1),e;case 1:return e=ou(e.type,!0),e;default:return""}}function Ef(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case pi:return"Fragment";case fi:return"Portal";case Cf:return"Profiler";case lh:return"StrictMode";case _f:return"Suspense";case zf:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case fx:return(e.displayName||"Context")+".Consumer";case ux:return(e._context.displayName||"Context")+".Provider";case ch:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case dh:return t=e.displayName||null,t!==null?t:Ef(e.type)||"Memo";case Nn:t=e._payload,e=e._init;try{return Ef(e(t))}catch{}}return null}function JS(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ef(t);case 8:return t===lh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Jn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function hx(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function ZS(e){var t=hx(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),n=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var o=r.get,i=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(a){n=""+a,i.call(this,a)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(a){n=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ol(e){e._valueTracker||(e._valueTracker=ZS(e))}function mx(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),n="";return e&&(n=hx(e)?e.checked?"true":"false":e.value),e=n,e!==r?(t.setValue(e),!0):!1}function xc(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Bf(e,t){var r=t.checked;return He({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function Dm(e,t){var r=t.defaultValue==null?"":t.defaultValue,n=t.checked!=null?t.checked:t.defaultChecked;r=Jn(t.value!=null?t.value:r),e._wrapperState={initialChecked:n,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function gx(e,t){t=t.checked,t!=null&&ah(e,"checked",t,!1)}function Tf(e,t){gx(e,t);var r=Jn(t.value),n=t.type;if(r!=null)n==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(n==="submit"||n==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Pf(e,t.type,r):t.hasOwnProperty("defaultValue")&&Pf(e,t.type,Jn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Wm(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var n=t.type;if(!(n!=="submit"&&n!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function Pf(e,t,r){(t!=="number"||xc(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var Ms=Array.isArray;function _i(e,t,r,n){if(e=e.options,t){t={};for(var o=0;o<r.length;o++)t["$"+r[o]]=!0;for(r=0;r<e.length;r++)o=t.hasOwnProperty("$"+e[r].value),e[r].selected!==o&&(e[r].selected=o),o&&n&&(e[r].defaultSelected=!0)}else{for(r=""+Jn(r),t=null,o=0;o<e.length;o++){if(e[o].value===r){e[o].selected=!0,n&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function Nf(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(K(91));return He({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Hm(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(K(92));if(Ms(r)){if(1<r.length)throw Error(K(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:Jn(r)}}function vx(e,t){var r=Jn(t.value),n=Jn(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),n!=null&&(e.defaultValue=""+n)}function Um(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function bx(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ff(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?bx(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var il,xx=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,n,o){MSApp.execUnsafeLocalFunction(function(){return e(t,r,n,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(il=il||document.createElement("div"),il.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=il.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function da(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var Vs={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ej=["Webkit","ms","Moz","O"];Object.keys(Vs).forEach(function(e){ej.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Vs[t]=Vs[e]})});function yx(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||Vs.hasOwnProperty(e)&&Vs[e]?(""+t).trim():t+"px"}function wx(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var n=r.indexOf("--")===0,o=yx(r,t[r],n);r==="float"&&(r="cssFloat"),n?e.setProperty(r,o):e[r]=o}}var tj=He({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Rf(e,t){if(t){if(tj[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(K(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(K(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(K(61))}if(t.style!=null&&typeof t.style!="object")throw Error(K(62))}}function Af(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var If=null;function uh(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Of=null,zi=null,Ei=null;function Vm(e){if(e=Oa(e)){if(typeof Of!="function")throw Error(K(280));var t=e.stateNode;t&&(t=fd(t),Of(e.stateNode,e.type,t))}}function kx(e){zi?Ei?Ei.push(e):Ei=[e]:zi=e}function Sx(){if(zi){var e=zi,t=Ei;if(Ei=zi=null,Vm(e),t)for(e=0;e<t.length;e++)Vm(t[e])}}function jx(e,t){return e(t)}function $x(){}var iu=!1;function Cx(e,t,r){if(iu)return e(t,r);iu=!0;try{return jx(e,t,r)}finally{iu=!1,(zi!==null||Ei!==null)&&($x(),Sx())}}function ua(e,t){var r=e.stateNode;if(r===null)return null;var n=fd(r);if(n===null)return null;r=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(K(231,t,typeof r));return r}var qf=!1;if(bn)try{var ps={};Object.defineProperty(ps,"passive",{get:function(){qf=!0}}),window.addEventListener("test",ps,ps),window.removeEventListener("test",ps,ps)}catch{qf=!1}function rj(e,t,r,n,o,i,a,l,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(r,d)}catch(f){this.onError(f)}}var Gs=!1,yc=null,wc=!1,Mf=null,nj={onError:function(e){Gs=!0,yc=e}};function oj(e,t,r,n,o,i,a,l,c){Gs=!1,yc=null,rj.apply(nj,arguments)}function ij(e,t,r,n,o,i,a,l,c){if(oj.apply(this,arguments),Gs){if(Gs){var d=yc;Gs=!1,yc=null}else throw Error(K(198));wc||(wc=!0,Mf=d)}}function Vo(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function _x(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Gm(e){if(Vo(e)!==e)throw Error(K(188))}function sj(e){var t=e.alternate;if(!t){if(t=Vo(e),t===null)throw Error(K(188));return t!==e?null:e}for(var r=e,n=t;;){var o=r.return;if(o===null)break;var i=o.alternate;if(i===null){if(n=o.return,n!==null){r=n;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===r)return Gm(o),e;if(i===n)return Gm(o),t;i=i.sibling}throw Error(K(188))}if(r.return!==n.return)r=o,n=i;else{for(var a=!1,l=o.child;l;){if(l===r){a=!0,r=o,n=i;break}if(l===n){a=!0,n=o,r=i;break}l=l.sibling}if(!a){for(l=i.child;l;){if(l===r){a=!0,r=i,n=o;break}if(l===n){a=!0,n=i,r=o;break}l=l.sibling}if(!a)throw Error(K(189))}}if(r.alternate!==n)throw Error(K(190))}if(r.tag!==3)throw Error(K(188));return r.stateNode.current===r?e:t}function zx(e){return e=sj(e),e!==null?Ex(e):null}function Ex(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Ex(e);if(t!==null)return t;e=e.sibling}return null}var Bx=sr.unstable_scheduleCallback,Km=sr.unstable_cancelCallback,aj=sr.unstable_shouldYield,lj=sr.unstable_requestPaint,et=sr.unstable_now,cj=sr.unstable_getCurrentPriorityLevel,fh=sr.unstable_ImmediatePriority,Tx=sr.unstable_UserBlockingPriority,kc=sr.unstable_NormalPriority,dj=sr.unstable_LowPriority,Px=sr.unstable_IdlePriority,ld=null,Jr=null;function uj(e){if(Jr&&typeof Jr.onCommitFiberRoot=="function")try{Jr.onCommitFiberRoot(ld,e,void 0,(e.current.flags&128)===128)}catch{}}var Ar=Math.clz32?Math.clz32:hj,fj=Math.log,pj=Math.LN2;function hj(e){return e>>>=0,e===0?32:31-(fj(e)/pj|0)|0}var sl=64,al=4194304;function Ls(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Sc(e,t){var r=e.pendingLanes;if(r===0)return 0;var n=0,o=e.suspendedLanes,i=e.pingedLanes,a=r&268435455;if(a!==0){var l=a&~o;l!==0?n=Ls(l):(i&=a,i!==0&&(n=Ls(i)))}else a=r&~o,a!==0?n=Ls(a):i!==0&&(n=Ls(i));if(n===0)return 0;if(t!==0&&t!==n&&!(t&o)&&(o=n&-n,i=t&-t,o>=i||o===16&&(i&4194240)!==0))return t;if(n&4&&(n|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=n;0<t;)r=31-Ar(t),o=1<<r,n|=e[r],t&=~o;return n}function mj(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function gj(e,t){for(var r=e.suspendedLanes,n=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var a=31-Ar(i),l=1<<a,c=o[a];c===-1?(!(l&r)||l&n)&&(o[a]=mj(l,t)):c<=t&&(e.expiredLanes|=l),i&=~l}}function Lf(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Nx(){var e=sl;return sl<<=1,!(sl&4194240)&&(sl=64),e}function su(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function Aa(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ar(t),e[t]=r}function vj(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var n=e.eventTimes;for(e=e.expirationTimes;0<r;){var o=31-Ar(r),i=1<<o;t[o]=0,n[o]=-1,e[o]=-1,r&=~i}}function ph(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var n=31-Ar(r),o=1<<n;o&t|e[n]&t&&(e[n]|=t),r&=~o}}var Ce=0;function Fx(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Rx,hh,Ax,Ix,Ox,Df=!1,ll=[],Ln=null,Dn=null,Wn=null,fa=new Map,pa=new Map,Rn=[],bj="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ym(e,t){switch(e){case"focusin":case"focusout":Ln=null;break;case"dragenter":case"dragleave":Dn=null;break;case"mouseover":case"mouseout":Wn=null;break;case"pointerover":case"pointerout":fa.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":pa.delete(t.pointerId)}}function hs(e,t,r,n,o,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:r,eventSystemFlags:n,nativeEvent:i,targetContainers:[o]},t!==null&&(t=Oa(t),t!==null&&hh(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function xj(e,t,r,n,o){switch(t){case"focusin":return Ln=hs(Ln,e,t,r,n,o),!0;case"dragenter":return Dn=hs(Dn,e,t,r,n,o),!0;case"mouseover":return Wn=hs(Wn,e,t,r,n,o),!0;case"pointerover":var i=o.pointerId;return fa.set(i,hs(fa.get(i)||null,e,t,r,n,o)),!0;case"gotpointercapture":return i=o.pointerId,pa.set(i,hs(pa.get(i)||null,e,t,r,n,o)),!0}return!1}function qx(e){var t=_o(e.target);if(t!==null){var r=Vo(t);if(r!==null){if(t=r.tag,t===13){if(t=_x(r),t!==null){e.blockedOn=t,Ox(e.priority,function(){Ax(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Yl(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=Wf(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var n=new r.constructor(r.type,r);If=n,r.target.dispatchEvent(n),If=null}else return t=Oa(r),t!==null&&hh(t),e.blockedOn=r,!1;t.shift()}return!0}function Xm(e,t,r){Yl(e)&&r.delete(t)}function yj(){Df=!1,Ln!==null&&Yl(Ln)&&(Ln=null),Dn!==null&&Yl(Dn)&&(Dn=null),Wn!==null&&Yl(Wn)&&(Wn=null),fa.forEach(Xm),pa.forEach(Xm)}function ms(e,t){e.blockedOn===t&&(e.blockedOn=null,Df||(Df=!0,sr.unstable_scheduleCallback(sr.unstable_NormalPriority,yj)))}function ha(e){function t(o){return ms(o,e)}if(0<ll.length){ms(ll[0],e);for(var r=1;r<ll.length;r++){var n=ll[r];n.blockedOn===e&&(n.blockedOn=null)}}for(Ln!==null&&ms(Ln,e),Dn!==null&&ms(Dn,e),Wn!==null&&ms(Wn,e),fa.forEach(t),pa.forEach(t),r=0;r<Rn.length;r++)n=Rn[r],n.blockedOn===e&&(n.blockedOn=null);for(;0<Rn.length&&(r=Rn[0],r.blockedOn===null);)qx(r),r.blockedOn===null&&Rn.shift()}var Bi=Sn.ReactCurrentBatchConfig,jc=!0;function wj(e,t,r,n){var o=Ce,i=Bi.transition;Bi.transition=null;try{Ce=1,mh(e,t,r,n)}finally{Ce=o,Bi.transition=i}}function kj(e,t,r,n){var o=Ce,i=Bi.transition;Bi.transition=null;try{Ce=4,mh(e,t,r,n)}finally{Ce=o,Bi.transition=i}}function mh(e,t,r,n){if(jc){var o=Wf(e,t,r,n);if(o===null)gu(e,t,n,$c,r),Ym(e,n);else if(xj(o,e,t,r,n))n.stopPropagation();else if(Ym(e,n),t&4&&-1<bj.indexOf(e)){for(;o!==null;){var i=Oa(o);if(i!==null&&Rx(i),i=Wf(e,t,r,n),i===null&&gu(e,t,n,$c,r),i===o)break;o=i}o!==null&&n.stopPropagation()}else gu(e,t,n,null,r)}}var $c=null;function Wf(e,t,r,n){if($c=null,e=uh(n),e=_o(e),e!==null)if(t=Vo(e),t===null)e=null;else if(r=t.tag,r===13){if(e=_x(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return $c=e,null}function Mx(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(cj()){case fh:return 1;case Tx:return 4;case kc:case dj:return 16;case Px:return 536870912;default:return 16}default:return 16}}var In=null,gh=null,Xl=null;function Lx(){if(Xl)return Xl;var e,t=gh,r=t.length,n,o="value"in In?In.value:In.textContent,i=o.length;for(e=0;e<r&&t[e]===o[e];e++);var a=r-e;for(n=1;n<=a&&t[r-n]===o[i-n];n++);return Xl=o.slice(e,1<n?1-n:void 0)}function Ql(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function cl(){return!0}function Qm(){return!1}function cr(e){function t(r,n,o,i,a){this._reactName=r,this._targetInst=o,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(r=e[l],this[l]=r?r(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?cl:Qm,this.isPropagationStopped=Qm,this}return He(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=cl)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=cl)},persist:function(){},isPersistent:cl}),t}var Qi={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},vh=cr(Qi),Ia=He({},Qi,{view:0,detail:0}),Sj=cr(Ia),au,lu,gs,cd=He({},Ia,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:bh,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==gs&&(gs&&e.type==="mousemove"?(au=e.screenX-gs.screenX,lu=e.screenY-gs.screenY):lu=au=0,gs=e),au)},movementY:function(e){return"movementY"in e?e.movementY:lu}}),Jm=cr(cd),jj=He({},cd,{dataTransfer:0}),$j=cr(jj),Cj=He({},Ia,{relatedTarget:0}),cu=cr(Cj),_j=He({},Qi,{animationName:0,elapsedTime:0,pseudoElement:0}),zj=cr(_j),Ej=He({},Qi,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Bj=cr(Ej),Tj=He({},Qi,{data:0}),Zm=cr(Tj),Pj={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nj={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Fj={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Rj(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Fj[e])?!!t[e]:!1}function bh(){return Rj}var Aj=He({},Ia,{key:function(e){if(e.key){var t=Pj[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ql(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Nj[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:bh,charCode:function(e){return e.type==="keypress"?Ql(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ql(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Ij=cr(Aj),Oj=He({},cd,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),eg=cr(Oj),qj=He({},Ia,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:bh}),Mj=cr(qj),Lj=He({},Qi,{propertyName:0,elapsedTime:0,pseudoElement:0}),Dj=cr(Lj),Wj=He({},cd,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Hj=cr(Wj),Uj=[9,13,27,32],xh=bn&&"CompositionEvent"in window,Ks=null;bn&&"documentMode"in document&&(Ks=document.documentMode);var Vj=bn&&"TextEvent"in window&&!Ks,Dx=bn&&(!xh||Ks&&8<Ks&&11>=Ks),tg=" ",rg=!1;function Wx(e,t){switch(e){case"keyup":return Uj.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Hx(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var hi=!1;function Gj(e,t){switch(e){case"compositionend":return Hx(t);case"keypress":return t.which!==32?null:(rg=!0,tg);case"textInput":return e=t.data,e===tg&&rg?null:e;default:return null}}function Kj(e,t){if(hi)return e==="compositionend"||!xh&&Wx(e,t)?(e=Lx(),Xl=gh=In=null,hi=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Dx&&t.locale!=="ko"?null:t.data;default:return null}}var Yj={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ng(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Yj[e.type]:t==="textarea"}function Ux(e,t,r,n){kx(n),t=Cc(t,"onChange"),0<t.length&&(r=new vh("onChange","change",null,r,n),e.push({event:r,listeners:t}))}var Ys=null,ma=null;function Xj(e){ry(e,0)}function dd(e){var t=vi(e);if(mx(t))return e}function Qj(e,t){if(e==="change")return t}var Vx=!1;if(bn){var du;if(bn){var uu="oninput"in document;if(!uu){var og=document.createElement("div");og.setAttribute("oninput","return;"),uu=typeof og.oninput=="function"}du=uu}else du=!1;Vx=du&&(!document.documentMode||9<document.documentMode)}function ig(){Ys&&(Ys.detachEvent("onpropertychange",Gx),ma=Ys=null)}function Gx(e){if(e.propertyName==="value"&&dd(ma)){var t=[];Ux(t,ma,e,uh(e)),Cx(Xj,t)}}function Jj(e,t,r){e==="focusin"?(ig(),Ys=t,ma=r,Ys.attachEvent("onpropertychange",Gx)):e==="focusout"&&ig()}function Zj(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return dd(ma)}function e2(e,t){if(e==="click")return dd(t)}function t2(e,t){if(e==="input"||e==="change")return dd(t)}function r2(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var qr=typeof Object.is=="function"?Object.is:r2;function ga(e,t){if(qr(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(n=0;n<r.length;n++){var o=r[n];if(!$f.call(t,o)||!qr(e[o],t[o]))return!1}return!0}function sg(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ag(e,t){var r=sg(e);e=0;for(var n;r;){if(r.nodeType===3){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=sg(r)}}function Kx(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Kx(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Yx(){for(var e=window,t=xc();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=xc(e.document)}return t}function yh(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function n2(e){var t=Yx(),r=e.focusedElem,n=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&Kx(r.ownerDocument.documentElement,r)){if(n!==null&&yh(r)){if(t=n.start,e=n.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=r.textContent.length,i=Math.min(n.start,o);n=n.end===void 0?i:Math.min(n.end,o),!e.extend&&i>n&&(o=n,n=i,i=o),o=ag(r,i);var a=ag(r,n);o&&a&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),i>n?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var o2=bn&&"documentMode"in document&&11>=document.documentMode,mi=null,Hf=null,Xs=null,Uf=!1;function lg(e,t,r){var n=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;Uf||mi==null||mi!==xc(n)||(n=mi,"selectionStart"in n&&yh(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Xs&&ga(Xs,n)||(Xs=n,n=Cc(Hf,"onSelect"),0<n.length&&(t=new vh("onSelect","select",null,t,r),e.push({event:t,listeners:n}),t.target=mi)))}function dl(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var gi={animationend:dl("Animation","AnimationEnd"),animationiteration:dl("Animation","AnimationIteration"),animationstart:dl("Animation","AnimationStart"),transitionend:dl("Transition","TransitionEnd")},fu={},Xx={};bn&&(Xx=document.createElement("div").style,"AnimationEvent"in window||(delete gi.animationend.animation,delete gi.animationiteration.animation,delete gi.animationstart.animation),"TransitionEvent"in window||delete gi.transitionend.transition);function ud(e){if(fu[e])return fu[e];if(!gi[e])return e;var t=gi[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Xx)return fu[e]=t[r];return e}var Qx=ud("animationend"),Jx=ud("animationiteration"),Zx=ud("animationstart"),ey=ud("transitionend"),ty=new Map,cg="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function oo(e,t){ty.set(e,t),Uo(t,[e])}for(var pu=0;pu<cg.length;pu++){var hu=cg[pu],i2=hu.toLowerCase(),s2=hu[0].toUpperCase()+hu.slice(1);oo(i2,"on"+s2)}oo(Qx,"onAnimationEnd");oo(Jx,"onAnimationIteration");oo(Zx,"onAnimationStart");oo("dblclick","onDoubleClick");oo("focusin","onFocus");oo("focusout","onBlur");oo(ey,"onTransitionEnd");Fi("onMouseEnter",["mouseout","mouseover"]);Fi("onMouseLeave",["mouseout","mouseover"]);Fi("onPointerEnter",["pointerout","pointerover"]);Fi("onPointerLeave",["pointerout","pointerover"]);Uo("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Uo("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Uo("onBeforeInput",["compositionend","keypress","textInput","paste"]);Uo("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Uo("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Uo("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ds="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),a2=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ds));function dg(e,t,r){var n=e.type||"unknown-event";e.currentTarget=r,ij(n,t,void 0,e),e.currentTarget=null}function ry(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var n=e[r],o=n.event;n=n.listeners;e:{var i=void 0;if(t)for(var a=n.length-1;0<=a;a--){var l=n[a],c=l.instance,d=l.currentTarget;if(l=l.listener,c!==i&&o.isPropagationStopped())break e;dg(o,l,d),i=c}else for(a=0;a<n.length;a++){if(l=n[a],c=l.instance,d=l.currentTarget,l=l.listener,c!==i&&o.isPropagationStopped())break e;dg(o,l,d),i=c}}}if(wc)throw e=Mf,wc=!1,Mf=null,e}function Pe(e,t){var r=t[Xf];r===void 0&&(r=t[Xf]=new Set);var n=e+"__bubble";r.has(n)||(ny(t,e,2,!1),r.add(n))}function mu(e,t,r){var n=0;t&&(n|=4),ny(r,e,n,t)}var ul="_reactListening"+Math.random().toString(36).slice(2);function va(e){if(!e[ul]){e[ul]=!0,dx.forEach(function(r){r!=="selectionchange"&&(a2.has(r)||mu(r,!1,e),mu(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ul]||(t[ul]=!0,mu("selectionchange",!1,t))}}function ny(e,t,r,n){switch(Mx(t)){case 1:var o=wj;break;case 4:o=kj;break;default:o=mh}r=o.bind(null,t,r,e),o=void 0,!qf||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),n?o!==void 0?e.addEventListener(t,r,{capture:!0,passive:o}):e.addEventListener(t,r,!0):o!==void 0?e.addEventListener(t,r,{passive:o}):e.addEventListener(t,r,!1)}function gu(e,t,r,n,o){var i=n;if(!(t&1)&&!(t&2)&&n!==null)e:for(;;){if(n===null)return;var a=n.tag;if(a===3||a===4){var l=n.stateNode.containerInfo;if(l===o||l.nodeType===8&&l.parentNode===o)break;if(a===4)for(a=n.return;a!==null;){var c=a.tag;if((c===3||c===4)&&(c=a.stateNode.containerInfo,c===o||c.nodeType===8&&c.parentNode===o))return;a=a.return}for(;l!==null;){if(a=_o(l),a===null)return;if(c=a.tag,c===5||c===6){n=i=a;continue e}l=l.parentNode}}n=n.return}Cx(function(){var d=i,f=uh(r),p=[];e:{var h=ty.get(e);if(h!==void 0){var y=vh,m=e;switch(e){case"keypress":if(Ql(r)===0)break e;case"keydown":case"keyup":y=Ij;break;case"focusin":m="focus",y=cu;break;case"focusout":m="blur",y=cu;break;case"beforeblur":case"afterblur":y=cu;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=Jm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=$j;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=Mj;break;case Qx:case Jx:case Zx:y=zj;break;case ey:y=Dj;break;case"scroll":y=Sj;break;case"wheel":y=Hj;break;case"copy":case"cut":case"paste":y=Bj;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=eg}var v=(t&4)!==0,$=!v&&e==="scroll",S=v?h!==null?h+"Capture":null:h;v=[];for(var j=d,k;j!==null;){k=j;var w=k.stateNode;if(k.tag===5&&w!==null&&(k=w,S!==null&&(w=ua(j,S),w!=null&&v.push(ba(j,w,k)))),$)break;j=j.return}0<v.length&&(h=new y(h,m,null,r,f),p.push({event:h,listeners:v}))}}if(!(t&7)){e:{if(h=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",h&&r!==If&&(m=r.relatedTarget||r.fromElement)&&(_o(m)||m[xn]))break e;if((y||h)&&(h=f.window===f?f:(h=f.ownerDocument)?h.defaultView||h.parentWindow:window,y?(m=r.relatedTarget||r.toElement,y=d,m=m?_o(m):null,m!==null&&($=Vo(m),m!==$||m.tag!==5&&m.tag!==6)&&(m=null)):(y=null,m=d),y!==m)){if(v=Jm,w="onMouseLeave",S="onMouseEnter",j="mouse",(e==="pointerout"||e==="pointerover")&&(v=eg,w="onPointerLeave",S="onPointerEnter",j="pointer"),$=y==null?h:vi(y),k=m==null?h:vi(m),h=new v(w,j+"leave",y,r,f),h.target=$,h.relatedTarget=k,w=null,_o(f)===d&&(v=new v(S,j+"enter",m,r,f),v.target=k,v.relatedTarget=$,w=v),$=w,y&&m)t:{for(v=y,S=m,j=0,k=v;k;k=Xo(k))j++;for(k=0,w=S;w;w=Xo(w))k++;for(;0<j-k;)v=Xo(v),j--;for(;0<k-j;)S=Xo(S),k--;for(;j--;){if(v===S||S!==null&&v===S.alternate)break t;v=Xo(v),S=Xo(S)}v=null}else v=null;y!==null&&ug(p,h,y,v,!1),m!==null&&$!==null&&ug(p,$,m,v,!0)}}e:{if(h=d?vi(d):window,y=h.nodeName&&h.nodeName.toLowerCase(),y==="select"||y==="input"&&h.type==="file")var _=Qj;else if(ng(h))if(Vx)_=t2;else{_=Zj;var B=Jj}else(y=h.nodeName)&&y.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(_=e2);if(_&&(_=_(e,d))){Ux(p,_,r,f);break e}B&&B(e,h,d),e==="focusout"&&(B=h._wrapperState)&&B.controlled&&h.type==="number"&&Pf(h,"number",h.value)}switch(B=d?vi(d):window,e){case"focusin":(ng(B)||B.contentEditable==="true")&&(mi=B,Hf=d,Xs=null);break;case"focusout":Xs=Hf=mi=null;break;case"mousedown":Uf=!0;break;case"contextmenu":case"mouseup":case"dragend":Uf=!1,lg(p,r,f);break;case"selectionchange":if(o2)break;case"keydown":case"keyup":lg(p,r,f)}var E;if(xh)e:{switch(e){case"compositionstart":var N="onCompositionStart";break e;case"compositionend":N="onCompositionEnd";break e;case"compositionupdate":N="onCompositionUpdate";break e}N=void 0}else hi?Wx(e,r)&&(N="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(N="onCompositionStart");N&&(Dx&&r.locale!=="ko"&&(hi||N!=="onCompositionStart"?N==="onCompositionEnd"&&hi&&(E=Lx()):(In=f,gh="value"in In?In.value:In.textContent,hi=!0)),B=Cc(d,N),0<B.length&&(N=new Zm(N,e,null,r,f),p.push({event:N,listeners:B}),E?N.data=E:(E=Hx(r),E!==null&&(N.data=E)))),(E=Vj?Gj(e,r):Kj(e,r))&&(d=Cc(d,"onBeforeInput"),0<d.length&&(f=new Zm("onBeforeInput","beforeinput",null,r,f),p.push({event:f,listeners:d}),f.data=E))}ry(p,t)})}function ba(e,t,r){return{instance:e,listener:t,currentTarget:r}}function Cc(e,t){for(var r=t+"Capture",n=[];e!==null;){var o=e,i=o.stateNode;o.tag===5&&i!==null&&(o=i,i=ua(e,r),i!=null&&n.unshift(ba(e,i,o)),i=ua(e,t),i!=null&&n.push(ba(e,i,o))),e=e.return}return n}function Xo(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ug(e,t,r,n,o){for(var i=t._reactName,a=[];r!==null&&r!==n;){var l=r,c=l.alternate,d=l.stateNode;if(c!==null&&c===n)break;l.tag===5&&d!==null&&(l=d,o?(c=ua(r,i),c!=null&&a.unshift(ba(r,c,l))):o||(c=ua(r,i),c!=null&&a.push(ba(r,c,l)))),r=r.return}a.length!==0&&e.push({event:t,listeners:a})}var l2=/\r\n?/g,c2=/\u0000|\uFFFD/g;function fg(e){return(typeof e=="string"?e:""+e).replace(l2,`
`).replace(c2,"")}function fl(e,t,r){if(t=fg(t),fg(e)!==t&&r)throw Error(K(425))}function _c(){}var Vf=null,Gf=null;function Kf(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Yf=typeof setTimeout=="function"?setTimeout:void 0,d2=typeof clearTimeout=="function"?clearTimeout:void 0,pg=typeof Promise=="function"?Promise:void 0,u2=typeof queueMicrotask=="function"?queueMicrotask:typeof pg<"u"?function(e){return pg.resolve(null).then(e).catch(f2)}:Yf;function f2(e){setTimeout(function(){throw e})}function vu(e,t){var r=t,n=0;do{var o=r.nextSibling;if(e.removeChild(r),o&&o.nodeType===8)if(r=o.data,r==="/$"){if(n===0){e.removeChild(o),ha(t);return}n--}else r!=="$"&&r!=="$?"&&r!=="$!"||n++;r=o}while(r);ha(t)}function Hn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function hg(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var Ji=Math.random().toString(36).slice(2),Xr="__reactFiber$"+Ji,xa="__reactProps$"+Ji,xn="__reactContainer$"+Ji,Xf="__reactEvents$"+Ji,p2="__reactListeners$"+Ji,h2="__reactHandles$"+Ji;function _o(e){var t=e[Xr];if(t)return t;for(var r=e.parentNode;r;){if(t=r[xn]||r[Xr]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=hg(e);e!==null;){if(r=e[Xr])return r;e=hg(e)}return t}e=r,r=e.parentNode}return null}function Oa(e){return e=e[Xr]||e[xn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function vi(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(K(33))}function fd(e){return e[xa]||null}var Qf=[],bi=-1;function io(e){return{current:e}}function Fe(e){0>bi||(e.current=Qf[bi],Qf[bi]=null,bi--)}function Be(e,t){bi++,Qf[bi]=e.current,e.current=t}var Zn={},Pt=io(Zn),Ut=io(!1),Io=Zn;function Ri(e,t){var r=e.type.contextTypes;if(!r)return Zn;var n=e.stateNode;if(n&&n.__reactInternalMemoizedUnmaskedChildContext===t)return n.__reactInternalMemoizedMaskedChildContext;var o={},i;for(i in r)o[i]=t[i];return n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function Vt(e){return e=e.childContextTypes,e!=null}function zc(){Fe(Ut),Fe(Pt)}function mg(e,t,r){if(Pt.current!==Zn)throw Error(K(168));Be(Pt,t),Be(Ut,r)}function oy(e,t,r){var n=e.stateNode;if(t=t.childContextTypes,typeof n.getChildContext!="function")return r;n=n.getChildContext();for(var o in n)if(!(o in t))throw Error(K(108,JS(e)||"Unknown",o));return He({},r,n)}function Ec(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Zn,Io=Pt.current,Be(Pt,e),Be(Ut,Ut.current),!0}function gg(e,t,r){var n=e.stateNode;if(!n)throw Error(K(169));r?(e=oy(e,t,Io),n.__reactInternalMemoizedMergedChildContext=e,Fe(Ut),Fe(Pt),Be(Pt,e)):Fe(Ut),Be(Ut,r)}var un=null,pd=!1,bu=!1;function iy(e){un===null?un=[e]:un.push(e)}function m2(e){pd=!0,iy(e)}function so(){if(!bu&&un!==null){bu=!0;var e=0,t=Ce;try{var r=un;for(Ce=1;e<r.length;e++){var n=r[e];do n=n(!0);while(n!==null)}un=null,pd=!1}catch(o){throw un!==null&&(un=un.slice(e+1)),Bx(fh,so),o}finally{Ce=t,bu=!1}}return null}var xi=[],yi=0,Bc=null,Tc=0,mr=[],gr=0,Oo=null,pn=1,hn="";function So(e,t){xi[yi++]=Tc,xi[yi++]=Bc,Bc=e,Tc=t}function sy(e,t,r){mr[gr++]=pn,mr[gr++]=hn,mr[gr++]=Oo,Oo=e;var n=pn;e=hn;var o=32-Ar(n)-1;n&=~(1<<o),r+=1;var i=32-Ar(t)+o;if(30<i){var a=o-o%5;i=(n&(1<<a)-1).toString(32),n>>=a,o-=a,pn=1<<32-Ar(t)+o|r<<o|n,hn=i+e}else pn=1<<i|r<<o|n,hn=e}function wh(e){e.return!==null&&(So(e,1),sy(e,1,0))}function kh(e){for(;e===Bc;)Bc=xi[--yi],xi[yi]=null,Tc=xi[--yi],xi[yi]=null;for(;e===Oo;)Oo=mr[--gr],mr[gr]=null,hn=mr[--gr],mr[gr]=null,pn=mr[--gr],mr[gr]=null}var ir=null,rr=null,Ae=!1,Fr=null;function ay(e,t){var r=vr(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function vg(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,ir=e,rr=Hn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,ir=e,rr=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=Oo!==null?{id:pn,overflow:hn}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=vr(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,ir=e,rr=null,!0):!1;default:return!1}}function Jf(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Zf(e){if(Ae){var t=rr;if(t){var r=t;if(!vg(e,t)){if(Jf(e))throw Error(K(418));t=Hn(r.nextSibling);var n=ir;t&&vg(e,t)?ay(n,r):(e.flags=e.flags&-4097|2,Ae=!1,ir=e)}}else{if(Jf(e))throw Error(K(418));e.flags=e.flags&-4097|2,Ae=!1,ir=e}}}function bg(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ir=e}function pl(e){if(e!==ir)return!1;if(!Ae)return bg(e),Ae=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Kf(e.type,e.memoizedProps)),t&&(t=rr)){if(Jf(e))throw ly(),Error(K(418));for(;t;)ay(e,t),t=Hn(t.nextSibling)}if(bg(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(K(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){rr=Hn(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}rr=null}}else rr=ir?Hn(e.stateNode.nextSibling):null;return!0}function ly(){for(var e=rr;e;)e=Hn(e.nextSibling)}function Ai(){rr=ir=null,Ae=!1}function Sh(e){Fr===null?Fr=[e]:Fr.push(e)}var g2=Sn.ReactCurrentBatchConfig;function vs(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(K(309));var n=r.stateNode}if(!n)throw Error(K(147,e));var o=n,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(a){var l=o.refs;a===null?delete l[i]:l[i]=a},t._stringRef=i,t)}if(typeof e!="string")throw Error(K(284));if(!r._owner)throw Error(K(290,e))}return e}function hl(e,t){throw e=Object.prototype.toString.call(t),Error(K(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function xg(e){var t=e._init;return t(e._payload)}function cy(e){function t(S,j){if(e){var k=S.deletions;k===null?(S.deletions=[j],S.flags|=16):k.push(j)}}function r(S,j){if(!e)return null;for(;j!==null;)t(S,j),j=j.sibling;return null}function n(S,j){for(S=new Map;j!==null;)j.key!==null?S.set(j.key,j):S.set(j.index,j),j=j.sibling;return S}function o(S,j){return S=Kn(S,j),S.index=0,S.sibling=null,S}function i(S,j,k){return S.index=k,e?(k=S.alternate,k!==null?(k=k.index,k<j?(S.flags|=2,j):k):(S.flags|=2,j)):(S.flags|=1048576,j)}function a(S){return e&&S.alternate===null&&(S.flags|=2),S}function l(S,j,k,w){return j===null||j.tag!==6?(j=$u(k,S.mode,w),j.return=S,j):(j=o(j,k),j.return=S,j)}function c(S,j,k,w){var _=k.type;return _===pi?f(S,j,k.props.children,w,k.key):j!==null&&(j.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===Nn&&xg(_)===j.type)?(w=o(j,k.props),w.ref=vs(S,j,k),w.return=S,w):(w=oc(k.type,k.key,k.props,null,S.mode,w),w.ref=vs(S,j,k),w.return=S,w)}function d(S,j,k,w){return j===null||j.tag!==4||j.stateNode.containerInfo!==k.containerInfo||j.stateNode.implementation!==k.implementation?(j=Cu(k,S.mode,w),j.return=S,j):(j=o(j,k.children||[]),j.return=S,j)}function f(S,j,k,w,_){return j===null||j.tag!==7?(j=No(k,S.mode,w,_),j.return=S,j):(j=o(j,k),j.return=S,j)}function p(S,j,k){if(typeof j=="string"&&j!==""||typeof j=="number")return j=$u(""+j,S.mode,k),j.return=S,j;if(typeof j=="object"&&j!==null){switch(j.$$typeof){case nl:return k=oc(j.type,j.key,j.props,null,S.mode,k),k.ref=vs(S,null,j),k.return=S,k;case fi:return j=Cu(j,S.mode,k),j.return=S,j;case Nn:var w=j._init;return p(S,w(j._payload),k)}if(Ms(j)||fs(j))return j=No(j,S.mode,k,null),j.return=S,j;hl(S,j)}return null}function h(S,j,k,w){var _=j!==null?j.key:null;if(typeof k=="string"&&k!==""||typeof k=="number")return _!==null?null:l(S,j,""+k,w);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case nl:return k.key===_?c(S,j,k,w):null;case fi:return k.key===_?d(S,j,k,w):null;case Nn:return _=k._init,h(S,j,_(k._payload),w)}if(Ms(k)||fs(k))return _!==null?null:f(S,j,k,w,null);hl(S,k)}return null}function y(S,j,k,w,_){if(typeof w=="string"&&w!==""||typeof w=="number")return S=S.get(k)||null,l(j,S,""+w,_);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case nl:return S=S.get(w.key===null?k:w.key)||null,c(j,S,w,_);case fi:return S=S.get(w.key===null?k:w.key)||null,d(j,S,w,_);case Nn:var B=w._init;return y(S,j,k,B(w._payload),_)}if(Ms(w)||fs(w))return S=S.get(k)||null,f(j,S,w,_,null);hl(j,w)}return null}function m(S,j,k,w){for(var _=null,B=null,E=j,N=j=0,L=null;E!==null&&N<k.length;N++){E.index>N?(L=E,E=null):L=E.sibling;var V=h(S,E,k[N],w);if(V===null){E===null&&(E=L);break}e&&E&&V.alternate===null&&t(S,E),j=i(V,j,N),B===null?_=V:B.sibling=V,B=V,E=L}if(N===k.length)return r(S,E),Ae&&So(S,N),_;if(E===null){for(;N<k.length;N++)E=p(S,k[N],w),E!==null&&(j=i(E,j,N),B===null?_=E:B.sibling=E,B=E);return Ae&&So(S,N),_}for(E=n(S,E);N<k.length;N++)L=y(E,S,N,k[N],w),L!==null&&(e&&L.alternate!==null&&E.delete(L.key===null?N:L.key),j=i(L,j,N),B===null?_=L:B.sibling=L,B=L);return e&&E.forEach(function(R){return t(S,R)}),Ae&&So(S,N),_}function v(S,j,k,w){var _=fs(k);if(typeof _!="function")throw Error(K(150));if(k=_.call(k),k==null)throw Error(K(151));for(var B=_=null,E=j,N=j=0,L=null,V=k.next();E!==null&&!V.done;N++,V=k.next()){E.index>N?(L=E,E=null):L=E.sibling;var R=h(S,E,V.value,w);if(R===null){E===null&&(E=L);break}e&&E&&R.alternate===null&&t(S,E),j=i(R,j,N),B===null?_=R:B.sibling=R,B=R,E=L}if(V.done)return r(S,E),Ae&&So(S,N),_;if(E===null){for(;!V.done;N++,V=k.next())V=p(S,V.value,w),V!==null&&(j=i(V,j,N),B===null?_=V:B.sibling=V,B=V);return Ae&&So(S,N),_}for(E=n(S,E);!V.done;N++,V=k.next())V=y(E,S,N,V.value,w),V!==null&&(e&&V.alternate!==null&&E.delete(V.key===null?N:V.key),j=i(V,j,N),B===null?_=V:B.sibling=V,B=V);return e&&E.forEach(function(M){return t(S,M)}),Ae&&So(S,N),_}function $(S,j,k,w){if(typeof k=="object"&&k!==null&&k.type===pi&&k.key===null&&(k=k.props.children),typeof k=="object"&&k!==null){switch(k.$$typeof){case nl:e:{for(var _=k.key,B=j;B!==null;){if(B.key===_){if(_=k.type,_===pi){if(B.tag===7){r(S,B.sibling),j=o(B,k.props.children),j.return=S,S=j;break e}}else if(B.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===Nn&&xg(_)===B.type){r(S,B.sibling),j=o(B,k.props),j.ref=vs(S,B,k),j.return=S,S=j;break e}r(S,B);break}else t(S,B);B=B.sibling}k.type===pi?(j=No(k.props.children,S.mode,w,k.key),j.return=S,S=j):(w=oc(k.type,k.key,k.props,null,S.mode,w),w.ref=vs(S,j,k),w.return=S,S=w)}return a(S);case fi:e:{for(B=k.key;j!==null;){if(j.key===B)if(j.tag===4&&j.stateNode.containerInfo===k.containerInfo&&j.stateNode.implementation===k.implementation){r(S,j.sibling),j=o(j,k.children||[]),j.return=S,S=j;break e}else{r(S,j);break}else t(S,j);j=j.sibling}j=Cu(k,S.mode,w),j.return=S,S=j}return a(S);case Nn:return B=k._init,$(S,j,B(k._payload),w)}if(Ms(k))return m(S,j,k,w);if(fs(k))return v(S,j,k,w);hl(S,k)}return typeof k=="string"&&k!==""||typeof k=="number"?(k=""+k,j!==null&&j.tag===6?(r(S,j.sibling),j=o(j,k),j.return=S,S=j):(r(S,j),j=$u(k,S.mode,w),j.return=S,S=j),a(S)):r(S,j)}return $}var Ii=cy(!0),dy=cy(!1),Pc=io(null),Nc=null,wi=null,jh=null;function $h(){jh=wi=Nc=null}function Ch(e){var t=Pc.current;Fe(Pc),e._currentValue=t}function ep(e,t,r){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===r)break;e=e.return}}function Ti(e,t){Nc=e,jh=wi=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Ht=!0),e.firstContext=null)}function yr(e){var t=e._currentValue;if(jh!==e)if(e={context:e,memoizedValue:t,next:null},wi===null){if(Nc===null)throw Error(K(308));wi=e,Nc.dependencies={lanes:0,firstContext:e}}else wi=wi.next=e;return t}var zo=null;function _h(e){zo===null?zo=[e]:zo.push(e)}function uy(e,t,r,n){var o=t.interleaved;return o===null?(r.next=r,_h(t)):(r.next=o.next,o.next=r),t.interleaved=r,yn(e,n)}function yn(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var Fn=!1;function zh(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function fy(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function mn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Un(e,t,r){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,we&2){var o=n.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),n.pending=t,yn(e,r)}return o=n.interleaved,o===null?(t.next=t,_h(n)):(t.next=o.next,o.next=t),n.interleaved=t,yn(e,r)}function Jl(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,ph(e,r)}}function yg(e,t){var r=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,r===n)){var o=null,i=null;if(r=r.firstBaseUpdate,r!==null){do{var a={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};i===null?o=i=a:i=i.next=a,r=r.next}while(r!==null);i===null?o=i=t:i=i.next=t}else o=i=t;r={baseState:n.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:n.shared,effects:n.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function Fc(e,t,r,n){var o=e.updateQueue;Fn=!1;var i=o.firstBaseUpdate,a=o.lastBaseUpdate,l=o.shared.pending;if(l!==null){o.shared.pending=null;var c=l,d=c.next;c.next=null,a===null?i=d:a.next=d,a=c;var f=e.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==a&&(l===null?f.firstBaseUpdate=d:l.next=d,f.lastBaseUpdate=c))}if(i!==null){var p=o.baseState;a=0,f=d=c=null,l=i;do{var h=l.lane,y=l.eventTime;if((n&h)===h){f!==null&&(f=f.next={eventTime:y,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var m=e,v=l;switch(h=t,y=r,v.tag){case 1:if(m=v.payload,typeof m=="function"){p=m.call(y,p,h);break e}p=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=v.payload,h=typeof m=="function"?m.call(y,p,h):m,h==null)break e;p=He({},p,h);break e;case 2:Fn=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,h=o.effects,h===null?o.effects=[l]:h.push(l))}else y={eventTime:y,lane:h,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(d=f=y,c=p):f=f.next=y,a|=h;if(l=l.next,l===null){if(l=o.shared.pending,l===null)break;h=l,l=h.next,h.next=null,o.lastBaseUpdate=h,o.shared.pending=null}}while(!0);if(f===null&&(c=p),o.baseState=c,o.firstBaseUpdate=d,o.lastBaseUpdate=f,t=o.shared.interleaved,t!==null){o=t;do a|=o.lane,o=o.next;while(o!==t)}else i===null&&(o.shared.lanes=0);Mo|=a,e.lanes=a,e.memoizedState=p}}function wg(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var n=e[t],o=n.callback;if(o!==null){if(n.callback=null,n=r,typeof o!="function")throw Error(K(191,o));o.call(n)}}}var qa={},Zr=io(qa),ya=io(qa),wa=io(qa);function Eo(e){if(e===qa)throw Error(K(174));return e}function Eh(e,t){switch(Be(wa,t),Be(ya,e),Be(Zr,qa),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ff(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ff(t,e)}Fe(Zr),Be(Zr,t)}function Oi(){Fe(Zr),Fe(ya),Fe(wa)}function py(e){Eo(wa.current);var t=Eo(Zr.current),r=Ff(t,e.type);t!==r&&(Be(ya,e),Be(Zr,r))}function Bh(e){ya.current===e&&(Fe(Zr),Fe(ya))}var Me=io(0);function Rc(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var xu=[];function Th(){for(var e=0;e<xu.length;e++)xu[e]._workInProgressVersionPrimary=null;xu.length=0}var Zl=Sn.ReactCurrentDispatcher,yu=Sn.ReactCurrentBatchConfig,qo=0,De=null,ct=null,ft=null,Ac=!1,Qs=!1,ka=0,v2=0;function jt(){throw Error(K(321))}function Ph(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!qr(e[r],t[r]))return!1;return!0}function Nh(e,t,r,n,o,i){if(qo=i,De=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Zl.current=e===null||e.memoizedState===null?w2:k2,e=r(n,o),Qs){i=0;do{if(Qs=!1,ka=0,25<=i)throw Error(K(301));i+=1,ft=ct=null,t.updateQueue=null,Zl.current=S2,e=r(n,o)}while(Qs)}if(Zl.current=Ic,t=ct!==null&&ct.next!==null,qo=0,ft=ct=De=null,Ac=!1,t)throw Error(K(300));return e}function Fh(){var e=ka!==0;return ka=0,e}function Yr(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ft===null?De.memoizedState=ft=e:ft=ft.next=e,ft}function wr(){if(ct===null){var e=De.alternate;e=e!==null?e.memoizedState:null}else e=ct.next;var t=ft===null?De.memoizedState:ft.next;if(t!==null)ft=t,ct=e;else{if(e===null)throw Error(K(310));ct=e,e={memoizedState:ct.memoizedState,baseState:ct.baseState,baseQueue:ct.baseQueue,queue:ct.queue,next:null},ft===null?De.memoizedState=ft=e:ft=ft.next=e}return ft}function Sa(e,t){return typeof t=="function"?t(e):t}function wu(e){var t=wr(),r=t.queue;if(r===null)throw Error(K(311));r.lastRenderedReducer=e;var n=ct,o=n.baseQueue,i=r.pending;if(i!==null){if(o!==null){var a=o.next;o.next=i.next,i.next=a}n.baseQueue=o=i,r.pending=null}if(o!==null){i=o.next,n=n.baseState;var l=a=null,c=null,d=i;do{var f=d.lane;if((qo&f)===f)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),n=d.hasEagerState?d.eagerState:e(n,d.action);else{var p={lane:f,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(l=c=p,a=n):c=c.next=p,De.lanes|=f,Mo|=f}d=d.next}while(d!==null&&d!==i);c===null?a=n:c.next=l,qr(n,t.memoizedState)||(Ht=!0),t.memoizedState=n,t.baseState=a,t.baseQueue=c,r.lastRenderedState=n}if(e=r.interleaved,e!==null){o=e;do i=o.lane,De.lanes|=i,Mo|=i,o=o.next;while(o!==e)}else o===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function ku(e){var t=wr(),r=t.queue;if(r===null)throw Error(K(311));r.lastRenderedReducer=e;var n=r.dispatch,o=r.pending,i=t.memoizedState;if(o!==null){r.pending=null;var a=o=o.next;do i=e(i,a.action),a=a.next;while(a!==o);qr(i,t.memoizedState)||(Ht=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),r.lastRenderedState=i}return[i,n]}function hy(){}function my(e,t){var r=De,n=wr(),o=t(),i=!qr(n.memoizedState,o);if(i&&(n.memoizedState=o,Ht=!0),n=n.queue,Rh(by.bind(null,r,n,e),[e]),n.getSnapshot!==t||i||ft!==null&&ft.memoizedState.tag&1){if(r.flags|=2048,ja(9,vy.bind(null,r,n,o,t),void 0,null),ht===null)throw Error(K(349));qo&30||gy(r,t,o)}return o}function gy(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=De.updateQueue,t===null?(t={lastEffect:null,stores:null},De.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function vy(e,t,r,n){t.value=r,t.getSnapshot=n,xy(t)&&yy(e)}function by(e,t,r){return r(function(){xy(t)&&yy(e)})}function xy(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!qr(e,r)}catch{return!0}}function yy(e){var t=yn(e,1);t!==null&&Ir(t,e,1,-1)}function kg(e){var t=Yr();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Sa,lastRenderedState:e},t.queue=e,e=e.dispatch=y2.bind(null,De,e),[t.memoizedState,e]}function ja(e,t,r,n){return e={tag:e,create:t,destroy:r,deps:n,next:null},t=De.updateQueue,t===null?(t={lastEffect:null,stores:null},De.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(n=r.next,r.next=e,e.next=n,t.lastEffect=e)),e}function wy(){return wr().memoizedState}function ec(e,t,r,n){var o=Yr();De.flags|=e,o.memoizedState=ja(1|t,r,void 0,n===void 0?null:n)}function hd(e,t,r,n){var o=wr();n=n===void 0?null:n;var i=void 0;if(ct!==null){var a=ct.memoizedState;if(i=a.destroy,n!==null&&Ph(n,a.deps)){o.memoizedState=ja(t,r,i,n);return}}De.flags|=e,o.memoizedState=ja(1|t,r,i,n)}function Sg(e,t){return ec(8390656,8,e,t)}function Rh(e,t){return hd(2048,8,e,t)}function ky(e,t){return hd(4,2,e,t)}function Sy(e,t){return hd(4,4,e,t)}function jy(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function $y(e,t,r){return r=r!=null?r.concat([e]):null,hd(4,4,jy.bind(null,t,e),r)}function Ah(){}function Cy(e,t){var r=wr();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&Ph(t,n[1])?n[0]:(r.memoizedState=[e,t],e)}function _y(e,t){var r=wr();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&Ph(t,n[1])?n[0]:(e=e(),r.memoizedState=[e,t],e)}function zy(e,t,r){return qo&21?(qr(r,t)||(r=Nx(),De.lanes|=r,Mo|=r,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Ht=!0),e.memoizedState=r)}function b2(e,t){var r=Ce;Ce=r!==0&&4>r?r:4,e(!0);var n=yu.transition;yu.transition={};try{e(!1),t()}finally{Ce=r,yu.transition=n}}function Ey(){return wr().memoizedState}function x2(e,t,r){var n=Gn(e);if(r={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null},By(e))Ty(t,r);else if(r=uy(e,t,r,n),r!==null){var o=It();Ir(r,e,n,o),Py(r,t,n)}}function y2(e,t,r){var n=Gn(e),o={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null};if(By(e))Ty(t,o);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var a=t.lastRenderedState,l=i(a,r);if(o.hasEagerState=!0,o.eagerState=l,qr(l,a)){var c=t.interleaved;c===null?(o.next=o,_h(t)):(o.next=c.next,c.next=o),t.interleaved=o;return}}catch{}finally{}r=uy(e,t,o,n),r!==null&&(o=It(),Ir(r,e,n,o),Py(r,t,n))}}function By(e){var t=e.alternate;return e===De||t!==null&&t===De}function Ty(e,t){Qs=Ac=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function Py(e,t,r){if(r&4194240){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,ph(e,r)}}var Ic={readContext:yr,useCallback:jt,useContext:jt,useEffect:jt,useImperativeHandle:jt,useInsertionEffect:jt,useLayoutEffect:jt,useMemo:jt,useReducer:jt,useRef:jt,useState:jt,useDebugValue:jt,useDeferredValue:jt,useTransition:jt,useMutableSource:jt,useSyncExternalStore:jt,useId:jt,unstable_isNewReconciler:!1},w2={readContext:yr,useCallback:function(e,t){return Yr().memoizedState=[e,t===void 0?null:t],e},useContext:yr,useEffect:Sg,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,ec(4194308,4,jy.bind(null,t,e),r)},useLayoutEffect:function(e,t){return ec(4194308,4,e,t)},useInsertionEffect:function(e,t){return ec(4,2,e,t)},useMemo:function(e,t){var r=Yr();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var n=Yr();return t=r!==void 0?r(t):t,n.memoizedState=n.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},n.queue=e,e=e.dispatch=x2.bind(null,De,e),[n.memoizedState,e]},useRef:function(e){var t=Yr();return e={current:e},t.memoizedState=e},useState:kg,useDebugValue:Ah,useDeferredValue:function(e){return Yr().memoizedState=e},useTransition:function(){var e=kg(!1),t=e[0];return e=b2.bind(null,e[1]),Yr().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var n=De,o=Yr();if(Ae){if(r===void 0)throw Error(K(407));r=r()}else{if(r=t(),ht===null)throw Error(K(349));qo&30||gy(n,t,r)}o.memoizedState=r;var i={value:r,getSnapshot:t};return o.queue=i,Sg(by.bind(null,n,i,e),[e]),n.flags|=2048,ja(9,vy.bind(null,n,i,r,t),void 0,null),r},useId:function(){var e=Yr(),t=ht.identifierPrefix;if(Ae){var r=hn,n=pn;r=(n&~(1<<32-Ar(n)-1)).toString(32)+r,t=":"+t+"R"+r,r=ka++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=v2++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},k2={readContext:yr,useCallback:Cy,useContext:yr,useEffect:Rh,useImperativeHandle:$y,useInsertionEffect:ky,useLayoutEffect:Sy,useMemo:_y,useReducer:wu,useRef:wy,useState:function(){return wu(Sa)},useDebugValue:Ah,useDeferredValue:function(e){var t=wr();return zy(t,ct.memoizedState,e)},useTransition:function(){var e=wu(Sa)[0],t=wr().memoizedState;return[e,t]},useMutableSource:hy,useSyncExternalStore:my,useId:Ey,unstable_isNewReconciler:!1},S2={readContext:yr,useCallback:Cy,useContext:yr,useEffect:Rh,useImperativeHandle:$y,useInsertionEffect:ky,useLayoutEffect:Sy,useMemo:_y,useReducer:ku,useRef:wy,useState:function(){return ku(Sa)},useDebugValue:Ah,useDeferredValue:function(e){var t=wr();return ct===null?t.memoizedState=e:zy(t,ct.memoizedState,e)},useTransition:function(){var e=ku(Sa)[0],t=wr().memoizedState;return[e,t]},useMutableSource:hy,useSyncExternalStore:my,useId:Ey,unstable_isNewReconciler:!1};function Br(e,t){if(e&&e.defaultProps){t=He({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}function tp(e,t,r,n){t=e.memoizedState,r=r(n,t),r=r==null?t:He({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var md={isMounted:function(e){return(e=e._reactInternals)?Vo(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var n=It(),o=Gn(e),i=mn(n,o);i.payload=t,r!=null&&(i.callback=r),t=Un(e,i,o),t!==null&&(Ir(t,e,o,n),Jl(t,e,o))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var n=It(),o=Gn(e),i=mn(n,o);i.tag=1,i.payload=t,r!=null&&(i.callback=r),t=Un(e,i,o),t!==null&&(Ir(t,e,o,n),Jl(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=It(),n=Gn(e),o=mn(r,n);o.tag=2,t!=null&&(o.callback=t),t=Un(e,o,n),t!==null&&(Ir(t,e,n,r),Jl(t,e,n))}};function jg(e,t,r,n,o,i,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,i,a):t.prototype&&t.prototype.isPureReactComponent?!ga(r,n)||!ga(o,i):!0}function Ny(e,t,r){var n=!1,o=Zn,i=t.contextType;return typeof i=="object"&&i!==null?i=yr(i):(o=Vt(t)?Io:Pt.current,n=t.contextTypes,i=(n=n!=null)?Ri(e,o):Zn),t=new t(r,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=md,e.stateNode=t,t._reactInternals=e,n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=i),t}function $g(e,t,r,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,n),t.state!==e&&md.enqueueReplaceState(t,t.state,null)}function rp(e,t,r,n){var o=e.stateNode;o.props=r,o.state=e.memoizedState,o.refs={},zh(e);var i=t.contextType;typeof i=="object"&&i!==null?o.context=yr(i):(i=Vt(t)?Io:Pt.current,o.context=Ri(e,i)),o.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(tp(e,t,i,r),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&md.enqueueReplaceState(o,o.state,null),Fc(e,r,o,n),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function qi(e,t){try{var r="",n=t;do r+=QS(n),n=n.return;while(n);var o=r}catch(i){o=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:o,digest:null}}function Su(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function np(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var j2=typeof WeakMap=="function"?WeakMap:Map;function Fy(e,t,r){r=mn(-1,r),r.tag=3,r.payload={element:null};var n=t.value;return r.callback=function(){qc||(qc=!0,pp=n),np(e,t)},r}function Ry(e,t,r){r=mn(-1,r),r.tag=3;var n=e.type.getDerivedStateFromError;if(typeof n=="function"){var o=t.value;r.payload=function(){return n(o)},r.callback=function(){np(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(r.callback=function(){np(e,t),typeof n!="function"&&(Vn===null?Vn=new Set([this]):Vn.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),r}function Cg(e,t,r){var n=e.pingCache;if(n===null){n=e.pingCache=new j2;var o=new Set;n.set(t,o)}else o=n.get(t),o===void 0&&(o=new Set,n.set(t,o));o.has(r)||(o.add(r),e=O2.bind(null,e,t,r),t.then(e,e))}function _g(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function zg(e,t,r,n,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=mn(-1,1),t.tag=2,Un(r,t,1))),r.lanes|=1),e)}var $2=Sn.ReactCurrentOwner,Ht=!1;function At(e,t,r,n){t.child=e===null?dy(t,null,r,n):Ii(t,e.child,r,n)}function Eg(e,t,r,n,o){r=r.render;var i=t.ref;return Ti(t,o),n=Nh(e,t,r,n,i,o),r=Fh(),e!==null&&!Ht?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,wn(e,t,o)):(Ae&&r&&wh(t),t.flags|=1,At(e,t,n,o),t.child)}function Bg(e,t,r,n,o){if(e===null){var i=r.type;return typeof i=="function"&&!Hh(i)&&i.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=i,Ay(e,t,i,n,o)):(e=oc(r.type,null,n,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&o)){var a=i.memoizedProps;if(r=r.compare,r=r!==null?r:ga,r(a,n)&&e.ref===t.ref)return wn(e,t,o)}return t.flags|=1,e=Kn(i,n),e.ref=t.ref,e.return=t,t.child=e}function Ay(e,t,r,n,o){if(e!==null){var i=e.memoizedProps;if(ga(i,n)&&e.ref===t.ref)if(Ht=!1,t.pendingProps=n=i,(e.lanes&o)!==0)e.flags&131072&&(Ht=!0);else return t.lanes=e.lanes,wn(e,t,o)}return op(e,t,r,n,o)}function Iy(e,t,r){var n=t.pendingProps,o=n.children,i=e!==null?e.memoizedState:null;if(n.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Be(Si,tr),tr|=r;else{if(!(r&1073741824))return e=i!==null?i.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Be(Si,tr),tr|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},n=i!==null?i.baseLanes:r,Be(Si,tr),tr|=n}else i!==null?(n=i.baseLanes|r,t.memoizedState=null):n=r,Be(Si,tr),tr|=n;return At(e,t,o,r),t.child}function Oy(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function op(e,t,r,n,o){var i=Vt(r)?Io:Pt.current;return i=Ri(t,i),Ti(t,o),r=Nh(e,t,r,n,i,o),n=Fh(),e!==null&&!Ht?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,wn(e,t,o)):(Ae&&n&&wh(t),t.flags|=1,At(e,t,r,o),t.child)}function Tg(e,t,r,n,o){if(Vt(r)){var i=!0;Ec(t)}else i=!1;if(Ti(t,o),t.stateNode===null)tc(e,t),Ny(t,r,n),rp(t,r,n,o),n=!0;else if(e===null){var a=t.stateNode,l=t.memoizedProps;a.props=l;var c=a.context,d=r.contextType;typeof d=="object"&&d!==null?d=yr(d):(d=Vt(r)?Io:Pt.current,d=Ri(t,d));var f=r.getDerivedStateFromProps,p=typeof f=="function"||typeof a.getSnapshotBeforeUpdate=="function";p||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==n||c!==d)&&$g(t,a,n,d),Fn=!1;var h=t.memoizedState;a.state=h,Fc(t,n,a,o),c=t.memoizedState,l!==n||h!==c||Ut.current||Fn?(typeof f=="function"&&(tp(t,r,f,n),c=t.memoizedState),(l=Fn||jg(t,r,l,n,h,c,d))?(p||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=c),a.props=n,a.state=c,a.context=d,n=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{a=t.stateNode,fy(e,t),l=t.memoizedProps,d=t.type===t.elementType?l:Br(t.type,l),a.props=d,p=t.pendingProps,h=a.context,c=r.contextType,typeof c=="object"&&c!==null?c=yr(c):(c=Vt(r)?Io:Pt.current,c=Ri(t,c));var y=r.getDerivedStateFromProps;(f=typeof y=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==p||h!==c)&&$g(t,a,n,c),Fn=!1,h=t.memoizedState,a.state=h,Fc(t,n,a,o);var m=t.memoizedState;l!==p||h!==m||Ut.current||Fn?(typeof y=="function"&&(tp(t,r,y,n),m=t.memoizedState),(d=Fn||jg(t,r,d,n,h,m,c)||!1)?(f||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(n,m,c),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(n,m,c)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=m),a.props=n,a.state=m,a.context=c,n=d):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),n=!1)}return ip(e,t,r,n,i,o)}function ip(e,t,r,n,o,i){Oy(e,t);var a=(t.flags&128)!==0;if(!n&&!a)return o&&gg(t,r,!1),wn(e,t,i);n=t.stateNode,$2.current=t;var l=a&&typeof r.getDerivedStateFromError!="function"?null:n.render();return t.flags|=1,e!==null&&a?(t.child=Ii(t,e.child,null,i),t.child=Ii(t,null,l,i)):At(e,t,l,i),t.memoizedState=n.state,o&&gg(t,r,!0),t.child}function qy(e){var t=e.stateNode;t.pendingContext?mg(e,t.pendingContext,t.pendingContext!==t.context):t.context&&mg(e,t.context,!1),Eh(e,t.containerInfo)}function Pg(e,t,r,n,o){return Ai(),Sh(o),t.flags|=256,At(e,t,r,n),t.child}var sp={dehydrated:null,treeContext:null,retryLane:0};function ap(e){return{baseLanes:e,cachePool:null,transitions:null}}function My(e,t,r){var n=t.pendingProps,o=Me.current,i=!1,a=(t.flags&128)!==0,l;if((l=a)||(l=e!==null&&e.memoizedState===null?!1:(o&2)!==0),l?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),Be(Me,o&1),e===null)return Zf(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=n.children,e=n.fallback,i?(n=t.mode,i=t.child,a={mode:"hidden",children:a},!(n&1)&&i!==null?(i.childLanes=0,i.pendingProps=a):i=bd(a,n,0,null),e=No(e,n,r,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=ap(r),t.memoizedState=sp,e):Ih(t,a));if(o=e.memoizedState,o!==null&&(l=o.dehydrated,l!==null))return C2(e,t,a,n,l,o,r);if(i){i=n.fallback,a=t.mode,o=e.child,l=o.sibling;var c={mode:"hidden",children:n.children};return!(a&1)&&t.child!==o?(n=t.child,n.childLanes=0,n.pendingProps=c,t.deletions=null):(n=Kn(o,c),n.subtreeFlags=o.subtreeFlags&14680064),l!==null?i=Kn(l,i):(i=No(i,a,r,null),i.flags|=2),i.return=t,n.return=t,n.sibling=i,t.child=n,n=i,i=t.child,a=e.child.memoizedState,a=a===null?ap(r):{baseLanes:a.baseLanes|r,cachePool:null,transitions:a.transitions},i.memoizedState=a,i.childLanes=e.childLanes&~r,t.memoizedState=sp,n}return i=e.child,e=i.sibling,n=Kn(i,{mode:"visible",children:n.children}),!(t.mode&1)&&(n.lanes=r),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n}function Ih(e,t){return t=bd({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function ml(e,t,r,n){return n!==null&&Sh(n),Ii(t,e.child,null,r),e=Ih(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function C2(e,t,r,n,o,i,a){if(r)return t.flags&256?(t.flags&=-257,n=Su(Error(K(422))),ml(e,t,a,n)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=n.fallback,o=t.mode,n=bd({mode:"visible",children:n.children},o,0,null),i=No(i,o,a,null),i.flags|=2,n.return=t,i.return=t,n.sibling=i,t.child=n,t.mode&1&&Ii(t,e.child,null,a),t.child.memoizedState=ap(a),t.memoizedState=sp,i);if(!(t.mode&1))return ml(e,t,a,null);if(o.data==="$!"){if(n=o.nextSibling&&o.nextSibling.dataset,n)var l=n.dgst;return n=l,i=Error(K(419)),n=Su(i,n,void 0),ml(e,t,a,n)}if(l=(a&e.childLanes)!==0,Ht||l){if(n=ht,n!==null){switch(a&-a){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(n.suspendedLanes|a)?0:o,o!==0&&o!==i.retryLane&&(i.retryLane=o,yn(e,o),Ir(n,e,o,-1))}return Wh(),n=Su(Error(K(421))),ml(e,t,a,n)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=q2.bind(null,e),o._reactRetry=t,null):(e=i.treeContext,rr=Hn(o.nextSibling),ir=t,Ae=!0,Fr=null,e!==null&&(mr[gr++]=pn,mr[gr++]=hn,mr[gr++]=Oo,pn=e.id,hn=e.overflow,Oo=t),t=Ih(t,n.children),t.flags|=4096,t)}function Ng(e,t,r){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),ep(e.return,t,r)}function ju(e,t,r,n,o){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:r,tailMode:o}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=n,i.tail=r,i.tailMode=o)}function Ly(e,t,r){var n=t.pendingProps,o=n.revealOrder,i=n.tail;if(At(e,t,n.children,r),n=Me.current,n&2)n=n&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ng(e,r,t);else if(e.tag===19)Ng(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}n&=1}if(Be(Me,n),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(r=t.child,o=null;r!==null;)e=r.alternate,e!==null&&Rc(e)===null&&(o=r),r=r.sibling;r=o,r===null?(o=t.child,t.child=null):(o=r.sibling,r.sibling=null),ju(t,!1,o,r,i);break;case"backwards":for(r=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&Rc(e)===null){t.child=o;break}e=o.sibling,o.sibling=r,r=o,o=e}ju(t,!0,r,null,i);break;case"together":ju(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function tc(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function wn(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Mo|=t.lanes,!(r&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(K(153));if(t.child!==null){for(e=t.child,r=Kn(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=Kn(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function _2(e,t,r){switch(t.tag){case 3:qy(t),Ai();break;case 5:py(t);break;case 1:Vt(t.type)&&Ec(t);break;case 4:Eh(t,t.stateNode.containerInfo);break;case 10:var n=t.type._context,o=t.memoizedProps.value;Be(Pc,n._currentValue),n._currentValue=o;break;case 13:if(n=t.memoizedState,n!==null)return n.dehydrated!==null?(Be(Me,Me.current&1),t.flags|=128,null):r&t.child.childLanes?My(e,t,r):(Be(Me,Me.current&1),e=wn(e,t,r),e!==null?e.sibling:null);Be(Me,Me.current&1);break;case 19:if(n=(r&t.childLanes)!==0,e.flags&128){if(n)return Ly(e,t,r);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),Be(Me,Me.current),n)break;return null;case 22:case 23:return t.lanes=0,Iy(e,t,r)}return wn(e,t,r)}var Dy,lp,Wy,Hy;Dy=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};lp=function(){};Wy=function(e,t,r,n){var o=e.memoizedProps;if(o!==n){e=t.stateNode,Eo(Zr.current);var i=null;switch(r){case"input":o=Bf(e,o),n=Bf(e,n),i=[];break;case"select":o=He({},o,{value:void 0}),n=He({},n,{value:void 0}),i=[];break;case"textarea":o=Nf(e,o),n=Nf(e,n),i=[];break;default:typeof o.onClick!="function"&&typeof n.onClick=="function"&&(e.onclick=_c)}Rf(r,n);var a;r=null;for(d in o)if(!n.hasOwnProperty(d)&&o.hasOwnProperty(d)&&o[d]!=null)if(d==="style"){var l=o[d];for(a in l)l.hasOwnProperty(a)&&(r||(r={}),r[a]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(ca.hasOwnProperty(d)?i||(i=[]):(i=i||[]).push(d,null));for(d in n){var c=n[d];if(l=o!=null?o[d]:void 0,n.hasOwnProperty(d)&&c!==l&&(c!=null||l!=null))if(d==="style")if(l){for(a in l)!l.hasOwnProperty(a)||c&&c.hasOwnProperty(a)||(r||(r={}),r[a]="");for(a in c)c.hasOwnProperty(a)&&l[a]!==c[a]&&(r||(r={}),r[a]=c[a])}else r||(i||(i=[]),i.push(d,r)),r=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(i=i||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(i=i||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(ca.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&Pe("scroll",e),i||l===c||(i=[])):(i=i||[]).push(d,c))}r&&(i=i||[]).push("style",r);var d=i;(t.updateQueue=d)&&(t.flags|=4)}};Hy=function(e,t,r,n){r!==n&&(t.flags|=4)};function bs(e,t){if(!Ae)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var n=null;r!==null;)r.alternate!==null&&(n=r),r=r.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function $t(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,n=0;if(t)for(var o=e.child;o!==null;)r|=o.lanes|o.childLanes,n|=o.subtreeFlags&14680064,n|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)r|=o.lanes|o.childLanes,n|=o.subtreeFlags,n|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=n,e.childLanes=r,t}function z2(e,t,r){var n=t.pendingProps;switch(kh(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return $t(t),null;case 1:return Vt(t.type)&&zc(),$t(t),null;case 3:return n=t.stateNode,Oi(),Fe(Ut),Fe(Pt),Th(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(pl(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Fr!==null&&(gp(Fr),Fr=null))),lp(e,t),$t(t),null;case 5:Bh(t);var o=Eo(wa.current);if(r=t.type,e!==null&&t.stateNode!=null)Wy(e,t,r,n,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!n){if(t.stateNode===null)throw Error(K(166));return $t(t),null}if(e=Eo(Zr.current),pl(t)){n=t.stateNode,r=t.type;var i=t.memoizedProps;switch(n[Xr]=t,n[xa]=i,e=(t.mode&1)!==0,r){case"dialog":Pe("cancel",n),Pe("close",n);break;case"iframe":case"object":case"embed":Pe("load",n);break;case"video":case"audio":for(o=0;o<Ds.length;o++)Pe(Ds[o],n);break;case"source":Pe("error",n);break;case"img":case"image":case"link":Pe("error",n),Pe("load",n);break;case"details":Pe("toggle",n);break;case"input":Dm(n,i),Pe("invalid",n);break;case"select":n._wrapperState={wasMultiple:!!i.multiple},Pe("invalid",n);break;case"textarea":Hm(n,i),Pe("invalid",n)}Rf(r,i),o=null;for(var a in i)if(i.hasOwnProperty(a)){var l=i[a];a==="children"?typeof l=="string"?n.textContent!==l&&(i.suppressHydrationWarning!==!0&&fl(n.textContent,l,e),o=["children",l]):typeof l=="number"&&n.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&fl(n.textContent,l,e),o=["children",""+l]):ca.hasOwnProperty(a)&&l!=null&&a==="onScroll"&&Pe("scroll",n)}switch(r){case"input":ol(n),Wm(n,i,!0);break;case"textarea":ol(n),Um(n);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(n.onclick=_c)}n=o,t.updateQueue=n,n!==null&&(t.flags|=4)}else{a=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=bx(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof n.is=="string"?e=a.createElement(r,{is:n.is}):(e=a.createElement(r),r==="select"&&(a=e,n.multiple?a.multiple=!0:n.size&&(a.size=n.size))):e=a.createElementNS(e,r),e[Xr]=t,e[xa]=n,Dy(e,t,!1,!1),t.stateNode=e;e:{switch(a=Af(r,n),r){case"dialog":Pe("cancel",e),Pe("close",e),o=n;break;case"iframe":case"object":case"embed":Pe("load",e),o=n;break;case"video":case"audio":for(o=0;o<Ds.length;o++)Pe(Ds[o],e);o=n;break;case"source":Pe("error",e),o=n;break;case"img":case"image":case"link":Pe("error",e),Pe("load",e),o=n;break;case"details":Pe("toggle",e),o=n;break;case"input":Dm(e,n),o=Bf(e,n),Pe("invalid",e);break;case"option":o=n;break;case"select":e._wrapperState={wasMultiple:!!n.multiple},o=He({},n,{value:void 0}),Pe("invalid",e);break;case"textarea":Hm(e,n),o=Nf(e,n),Pe("invalid",e);break;default:o=n}Rf(r,o),l=o;for(i in l)if(l.hasOwnProperty(i)){var c=l[i];i==="style"?wx(e,c):i==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&xx(e,c)):i==="children"?typeof c=="string"?(r!=="textarea"||c!=="")&&da(e,c):typeof c=="number"&&da(e,""+c):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(ca.hasOwnProperty(i)?c!=null&&i==="onScroll"&&Pe("scroll",e):c!=null&&ah(e,i,c,a))}switch(r){case"input":ol(e),Wm(e,n,!1);break;case"textarea":ol(e),Um(e);break;case"option":n.value!=null&&e.setAttribute("value",""+Jn(n.value));break;case"select":e.multiple=!!n.multiple,i=n.value,i!=null?_i(e,!!n.multiple,i,!1):n.defaultValue!=null&&_i(e,!!n.multiple,n.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=_c)}switch(r){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}}n&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return $t(t),null;case 6:if(e&&t.stateNode!=null)Hy(e,t,e.memoizedProps,n);else{if(typeof n!="string"&&t.stateNode===null)throw Error(K(166));if(r=Eo(wa.current),Eo(Zr.current),pl(t)){if(n=t.stateNode,r=t.memoizedProps,n[Xr]=t,(i=n.nodeValue!==r)&&(e=ir,e!==null))switch(e.tag){case 3:fl(n.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&fl(n.nodeValue,r,(e.mode&1)!==0)}i&&(t.flags|=4)}else n=(r.nodeType===9?r:r.ownerDocument).createTextNode(n),n[Xr]=t,t.stateNode=n}return $t(t),null;case 13:if(Fe(Me),n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Ae&&rr!==null&&t.mode&1&&!(t.flags&128))ly(),Ai(),t.flags|=98560,i=!1;else if(i=pl(t),n!==null&&n.dehydrated!==null){if(e===null){if(!i)throw Error(K(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(K(317));i[Xr]=t}else Ai(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;$t(t),i=!1}else Fr!==null&&(gp(Fr),Fr=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=r,t):(n=n!==null,n!==(e!==null&&e.memoizedState!==null)&&n&&(t.child.flags|=8192,t.mode&1&&(e===null||Me.current&1?ut===0&&(ut=3):Wh())),t.updateQueue!==null&&(t.flags|=4),$t(t),null);case 4:return Oi(),lp(e,t),e===null&&va(t.stateNode.containerInfo),$t(t),null;case 10:return Ch(t.type._context),$t(t),null;case 17:return Vt(t.type)&&zc(),$t(t),null;case 19:if(Fe(Me),i=t.memoizedState,i===null)return $t(t),null;if(n=(t.flags&128)!==0,a=i.rendering,a===null)if(n)bs(i,!1);else{if(ut!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=Rc(e),a!==null){for(t.flags|=128,bs(i,!1),n=a.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),t.subtreeFlags=0,n=r,r=t.child;r!==null;)i=r,e=n,i.flags&=14680066,a=i.alternate,a===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=a.childLanes,i.lanes=a.lanes,i.child=a.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=a.memoizedProps,i.memoizedState=a.memoizedState,i.updateQueue=a.updateQueue,i.type=a.type,e=a.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return Be(Me,Me.current&1|2),t.child}e=e.sibling}i.tail!==null&&et()>Mi&&(t.flags|=128,n=!0,bs(i,!1),t.lanes=4194304)}else{if(!n)if(e=Rc(a),e!==null){if(t.flags|=128,n=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),bs(i,!0),i.tail===null&&i.tailMode==="hidden"&&!a.alternate&&!Ae)return $t(t),null}else 2*et()-i.renderingStartTime>Mi&&r!==1073741824&&(t.flags|=128,n=!0,bs(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(r=i.last,r!==null?r.sibling=a:t.child=a,i.last=a)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=et(),t.sibling=null,r=Me.current,Be(Me,n?r&1|2:r&1),t):($t(t),null);case 22:case 23:return Dh(),n=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==n&&(t.flags|=8192),n&&t.mode&1?tr&1073741824&&($t(t),t.subtreeFlags&6&&(t.flags|=8192)):$t(t),null;case 24:return null;case 25:return null}throw Error(K(156,t.tag))}function E2(e,t){switch(kh(t),t.tag){case 1:return Vt(t.type)&&zc(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Oi(),Fe(Ut),Fe(Pt),Th(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Bh(t),null;case 13:if(Fe(Me),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(K(340));Ai()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Fe(Me),null;case 4:return Oi(),null;case 10:return Ch(t.type._context),null;case 22:case 23:return Dh(),null;case 24:return null;default:return null}}var gl=!1,Et=!1,B2=typeof WeakSet=="function"?WeakSet:Set,oe=null;function ki(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(n){Qe(e,t,n)}else r.current=null}function cp(e,t,r){try{r()}catch(n){Qe(e,t,n)}}var Fg=!1;function T2(e,t){if(Vf=jc,e=Yx(),yh(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var n=r.getSelection&&r.getSelection();if(n&&n.rangeCount!==0){r=n.anchorNode;var o=n.anchorOffset,i=n.focusNode;n=n.focusOffset;try{r.nodeType,i.nodeType}catch{r=null;break e}var a=0,l=-1,c=-1,d=0,f=0,p=e,h=null;t:for(;;){for(var y;p!==r||o!==0&&p.nodeType!==3||(l=a+o),p!==i||n!==0&&p.nodeType!==3||(c=a+n),p.nodeType===3&&(a+=p.nodeValue.length),(y=p.firstChild)!==null;)h=p,p=y;for(;;){if(p===e)break t;if(h===r&&++d===o&&(l=a),h===i&&++f===n&&(c=a),(y=p.nextSibling)!==null)break;p=h,h=p.parentNode}p=y}r=l===-1||c===-1?null:{start:l,end:c}}else r=null}r=r||{start:0,end:0}}else r=null;for(Gf={focusedElem:e,selectionRange:r},jc=!1,oe=t;oe!==null;)if(t=oe,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,oe=e;else for(;oe!==null;){t=oe;try{var m=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(m!==null){var v=m.memoizedProps,$=m.memoizedState,S=t.stateNode,j=S.getSnapshotBeforeUpdate(t.elementType===t.type?v:Br(t.type,v),$);S.__reactInternalSnapshotBeforeUpdate=j}break;case 3:var k=t.stateNode.containerInfo;k.nodeType===1?k.textContent="":k.nodeType===9&&k.documentElement&&k.removeChild(k.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(K(163))}}catch(w){Qe(t,t.return,w)}if(e=t.sibling,e!==null){e.return=t.return,oe=e;break}oe=t.return}return m=Fg,Fg=!1,m}function Js(e,t,r){var n=t.updateQueue;if(n=n!==null?n.lastEffect:null,n!==null){var o=n=n.next;do{if((o.tag&e)===e){var i=o.destroy;o.destroy=void 0,i!==void 0&&cp(t,r,i)}o=o.next}while(o!==n)}}function gd(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var n=r.create;r.destroy=n()}r=r.next}while(r!==t)}}function dp(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function Uy(e){var t=e.alternate;t!==null&&(e.alternate=null,Uy(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Xr],delete t[xa],delete t[Xf],delete t[p2],delete t[h2])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Vy(e){return e.tag===5||e.tag===3||e.tag===4}function Rg(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Vy(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function up(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=_c));else if(n!==4&&(e=e.child,e!==null))for(up(e,t,r),e=e.sibling;e!==null;)up(e,t,r),e=e.sibling}function fp(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(n!==4&&(e=e.child,e!==null))for(fp(e,t,r),e=e.sibling;e!==null;)fp(e,t,r),e=e.sibling}var bt=null,Pr=!1;function Cn(e,t,r){for(r=r.child;r!==null;)Gy(e,t,r),r=r.sibling}function Gy(e,t,r){if(Jr&&typeof Jr.onCommitFiberUnmount=="function")try{Jr.onCommitFiberUnmount(ld,r)}catch{}switch(r.tag){case 5:Et||ki(r,t);case 6:var n=bt,o=Pr;bt=null,Cn(e,t,r),bt=n,Pr=o,bt!==null&&(Pr?(e=bt,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):bt.removeChild(r.stateNode));break;case 18:bt!==null&&(Pr?(e=bt,r=r.stateNode,e.nodeType===8?vu(e.parentNode,r):e.nodeType===1&&vu(e,r),ha(e)):vu(bt,r.stateNode));break;case 4:n=bt,o=Pr,bt=r.stateNode.containerInfo,Pr=!0,Cn(e,t,r),bt=n,Pr=o;break;case 0:case 11:case 14:case 15:if(!Et&&(n=r.updateQueue,n!==null&&(n=n.lastEffect,n!==null))){o=n=n.next;do{var i=o,a=i.destroy;i=i.tag,a!==void 0&&(i&2||i&4)&&cp(r,t,a),o=o.next}while(o!==n)}Cn(e,t,r);break;case 1:if(!Et&&(ki(r,t),n=r.stateNode,typeof n.componentWillUnmount=="function"))try{n.props=r.memoizedProps,n.state=r.memoizedState,n.componentWillUnmount()}catch(l){Qe(r,t,l)}Cn(e,t,r);break;case 21:Cn(e,t,r);break;case 22:r.mode&1?(Et=(n=Et)||r.memoizedState!==null,Cn(e,t,r),Et=n):Cn(e,t,r);break;default:Cn(e,t,r)}}function Ag(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new B2),t.forEach(function(n){var o=M2.bind(null,e,n);r.has(n)||(r.add(n),n.then(o,o))})}}function zr(e,t){var r=t.deletions;if(r!==null)for(var n=0;n<r.length;n++){var o=r[n];try{var i=e,a=t,l=a;e:for(;l!==null;){switch(l.tag){case 5:bt=l.stateNode,Pr=!1;break e;case 3:bt=l.stateNode.containerInfo,Pr=!0;break e;case 4:bt=l.stateNode.containerInfo,Pr=!0;break e}l=l.return}if(bt===null)throw Error(K(160));Gy(i,a,o),bt=null,Pr=!1;var c=o.alternate;c!==null&&(c.return=null),o.return=null}catch(d){Qe(o,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Ky(t,e),t=t.sibling}function Ky(e,t){var r=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(zr(t,e),Ur(e),n&4){try{Js(3,e,e.return),gd(3,e)}catch(v){Qe(e,e.return,v)}try{Js(5,e,e.return)}catch(v){Qe(e,e.return,v)}}break;case 1:zr(t,e),Ur(e),n&512&&r!==null&&ki(r,r.return);break;case 5:if(zr(t,e),Ur(e),n&512&&r!==null&&ki(r,r.return),e.flags&32){var o=e.stateNode;try{da(o,"")}catch(v){Qe(e,e.return,v)}}if(n&4&&(o=e.stateNode,o!=null)){var i=e.memoizedProps,a=r!==null?r.memoizedProps:i,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&gx(o,i),Af(l,a);var d=Af(l,i);for(a=0;a<c.length;a+=2){var f=c[a],p=c[a+1];f==="style"?wx(o,p):f==="dangerouslySetInnerHTML"?xx(o,p):f==="children"?da(o,p):ah(o,f,p,d)}switch(l){case"input":Tf(o,i);break;case"textarea":vx(o,i);break;case"select":var h=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!i.multiple;var y=i.value;y!=null?_i(o,!!i.multiple,y,!1):h!==!!i.multiple&&(i.defaultValue!=null?_i(o,!!i.multiple,i.defaultValue,!0):_i(o,!!i.multiple,i.multiple?[]:"",!1))}o[xa]=i}catch(v){Qe(e,e.return,v)}}break;case 6:if(zr(t,e),Ur(e),n&4){if(e.stateNode===null)throw Error(K(162));o=e.stateNode,i=e.memoizedProps;try{o.nodeValue=i}catch(v){Qe(e,e.return,v)}}break;case 3:if(zr(t,e),Ur(e),n&4&&r!==null&&r.memoizedState.isDehydrated)try{ha(t.containerInfo)}catch(v){Qe(e,e.return,v)}break;case 4:zr(t,e),Ur(e);break;case 13:zr(t,e),Ur(e),o=e.child,o.flags&8192&&(i=o.memoizedState!==null,o.stateNode.isHidden=i,!i||o.alternate!==null&&o.alternate.memoizedState!==null||(Mh=et())),n&4&&Ag(e);break;case 22:if(f=r!==null&&r.memoizedState!==null,e.mode&1?(Et=(d=Et)||f,zr(t,e),Et=d):zr(t,e),Ur(e),n&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!f&&e.mode&1)for(oe=e,f=e.child;f!==null;){for(p=oe=f;oe!==null;){switch(h=oe,y=h.child,h.tag){case 0:case 11:case 14:case 15:Js(4,h,h.return);break;case 1:ki(h,h.return);var m=h.stateNode;if(typeof m.componentWillUnmount=="function"){n=h,r=h.return;try{t=n,m.props=t.memoizedProps,m.state=t.memoizedState,m.componentWillUnmount()}catch(v){Qe(n,r,v)}}break;case 5:ki(h,h.return);break;case 22:if(h.memoizedState!==null){Og(p);continue}}y!==null?(y.return=h,oe=y):Og(p)}f=f.sibling}e:for(f=null,p=e;;){if(p.tag===5){if(f===null){f=p;try{o=p.stateNode,d?(i=o.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=p.stateNode,c=p.memoizedProps.style,a=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=yx("display",a))}catch(v){Qe(e,e.return,v)}}}else if(p.tag===6){if(f===null)try{p.stateNode.nodeValue=d?"":p.memoizedProps}catch(v){Qe(e,e.return,v)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===e)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===e)break e;for(;p.sibling===null;){if(p.return===null||p.return===e)break e;f===p&&(f=null),p=p.return}f===p&&(f=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:zr(t,e),Ur(e),n&4&&Ag(e);break;case 21:break;default:zr(t,e),Ur(e)}}function Ur(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(Vy(r)){var n=r;break e}r=r.return}throw Error(K(160))}switch(n.tag){case 5:var o=n.stateNode;n.flags&32&&(da(o,""),n.flags&=-33);var i=Rg(e);fp(e,i,o);break;case 3:case 4:var a=n.stateNode.containerInfo,l=Rg(e);up(e,l,a);break;default:throw Error(K(161))}}catch(c){Qe(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function P2(e,t,r){oe=e,Yy(e)}function Yy(e,t,r){for(var n=(e.mode&1)!==0;oe!==null;){var o=oe,i=o.child;if(o.tag===22&&n){var a=o.memoizedState!==null||gl;if(!a){var l=o.alternate,c=l!==null&&l.memoizedState!==null||Et;l=gl;var d=Et;if(gl=a,(Et=c)&&!d)for(oe=o;oe!==null;)a=oe,c=a.child,a.tag===22&&a.memoizedState!==null?qg(o):c!==null?(c.return=a,oe=c):qg(o);for(;i!==null;)oe=i,Yy(i),i=i.sibling;oe=o,gl=l,Et=d}Ig(e)}else o.subtreeFlags&8772&&i!==null?(i.return=o,oe=i):Ig(e)}}function Ig(e){for(;oe!==null;){var t=oe;if(t.flags&8772){var r=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Et||gd(5,t);break;case 1:var n=t.stateNode;if(t.flags&4&&!Et)if(r===null)n.componentDidMount();else{var o=t.elementType===t.type?r.memoizedProps:Br(t.type,r.memoizedProps);n.componentDidUpdate(o,r.memoizedState,n.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&wg(t,i,n);break;case 3:var a=t.updateQueue;if(a!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}wg(t,a,r)}break;case 5:var l=t.stateNode;if(r===null&&t.flags&4){r=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&r.focus();break;case"img":c.src&&(r.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var f=d.memoizedState;if(f!==null){var p=f.dehydrated;p!==null&&ha(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(K(163))}Et||t.flags&512&&dp(t)}catch(h){Qe(t,t.return,h)}}if(t===e){oe=null;break}if(r=t.sibling,r!==null){r.return=t.return,oe=r;break}oe=t.return}}function Og(e){for(;oe!==null;){var t=oe;if(t===e){oe=null;break}var r=t.sibling;if(r!==null){r.return=t.return,oe=r;break}oe=t.return}}function qg(e){for(;oe!==null;){var t=oe;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{gd(4,t)}catch(c){Qe(t,r,c)}break;case 1:var n=t.stateNode;if(typeof n.componentDidMount=="function"){var o=t.return;try{n.componentDidMount()}catch(c){Qe(t,o,c)}}var i=t.return;try{dp(t)}catch(c){Qe(t,i,c)}break;case 5:var a=t.return;try{dp(t)}catch(c){Qe(t,a,c)}}}catch(c){Qe(t,t.return,c)}if(t===e){oe=null;break}var l=t.sibling;if(l!==null){l.return=t.return,oe=l;break}oe=t.return}}var N2=Math.ceil,Oc=Sn.ReactCurrentDispatcher,Oh=Sn.ReactCurrentOwner,br=Sn.ReactCurrentBatchConfig,we=0,ht=null,it=null,xt=0,tr=0,Si=io(0),ut=0,$a=null,Mo=0,vd=0,qh=0,Zs=null,Wt=null,Mh=0,Mi=1/0,ln=null,qc=!1,pp=null,Vn=null,vl=!1,On=null,Mc=0,ea=0,hp=null,rc=-1,nc=0;function It(){return we&6?et():rc!==-1?rc:rc=et()}function Gn(e){return e.mode&1?we&2&&xt!==0?xt&-xt:g2.transition!==null?(nc===0&&(nc=Nx()),nc):(e=Ce,e!==0||(e=window.event,e=e===void 0?16:Mx(e.type)),e):1}function Ir(e,t,r,n){if(50<ea)throw ea=0,hp=null,Error(K(185));Aa(e,r,n),(!(we&2)||e!==ht)&&(e===ht&&(!(we&2)&&(vd|=r),ut===4&&An(e,xt)),Gt(e,n),r===1&&we===0&&!(t.mode&1)&&(Mi=et()+500,pd&&so()))}function Gt(e,t){var r=e.callbackNode;gj(e,t);var n=Sc(e,e===ht?xt:0);if(n===0)r!==null&&Km(r),e.callbackNode=null,e.callbackPriority=0;else if(t=n&-n,e.callbackPriority!==t){if(r!=null&&Km(r),t===1)e.tag===0?m2(Mg.bind(null,e)):iy(Mg.bind(null,e)),u2(function(){!(we&6)&&so()}),r=null;else{switch(Fx(n)){case 1:r=fh;break;case 4:r=Tx;break;case 16:r=kc;break;case 536870912:r=Px;break;default:r=kc}r=n1(r,Xy.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function Xy(e,t){if(rc=-1,nc=0,we&6)throw Error(K(327));var r=e.callbackNode;if(Pi()&&e.callbackNode!==r)return null;var n=Sc(e,e===ht?xt:0);if(n===0)return null;if(n&30||n&e.expiredLanes||t)t=Lc(e,n);else{t=n;var o=we;we|=2;var i=Jy();(ht!==e||xt!==t)&&(ln=null,Mi=et()+500,Po(e,t));do try{A2();break}catch(l){Qy(e,l)}while(!0);$h(),Oc.current=i,we=o,it!==null?t=0:(ht=null,xt=0,t=ut)}if(t!==0){if(t===2&&(o=Lf(e),o!==0&&(n=o,t=mp(e,o))),t===1)throw r=$a,Po(e,0),An(e,n),Gt(e,et()),r;if(t===6)An(e,n);else{if(o=e.current.alternate,!(n&30)&&!F2(o)&&(t=Lc(e,n),t===2&&(i=Lf(e),i!==0&&(n=i,t=mp(e,i))),t===1))throw r=$a,Po(e,0),An(e,n),Gt(e,et()),r;switch(e.finishedWork=o,e.finishedLanes=n,t){case 0:case 1:throw Error(K(345));case 2:jo(e,Wt,ln);break;case 3:if(An(e,n),(n&130023424)===n&&(t=Mh+500-et(),10<t)){if(Sc(e,0)!==0)break;if(o=e.suspendedLanes,(o&n)!==n){It(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Yf(jo.bind(null,e,Wt,ln),t);break}jo(e,Wt,ln);break;case 4:if(An(e,n),(n&4194240)===n)break;for(t=e.eventTimes,o=-1;0<n;){var a=31-Ar(n);i=1<<a,a=t[a],a>o&&(o=a),n&=~i}if(n=o,n=et()-n,n=(120>n?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*N2(n/1960))-n,10<n){e.timeoutHandle=Yf(jo.bind(null,e,Wt,ln),n);break}jo(e,Wt,ln);break;case 5:jo(e,Wt,ln);break;default:throw Error(K(329))}}}return Gt(e,et()),e.callbackNode===r?Xy.bind(null,e):null}function mp(e,t){var r=Zs;return e.current.memoizedState.isDehydrated&&(Po(e,t).flags|=256),e=Lc(e,t),e!==2&&(t=Wt,Wt=r,t!==null&&gp(t)),e}function gp(e){Wt===null?Wt=e:Wt.push.apply(Wt,e)}function F2(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var n=0;n<r.length;n++){var o=r[n],i=o.getSnapshot;o=o.value;try{if(!qr(i(),o))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function An(e,t){for(t&=~qh,t&=~vd,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-Ar(t),n=1<<r;e[r]=-1,t&=~n}}function Mg(e){if(we&6)throw Error(K(327));Pi();var t=Sc(e,0);if(!(t&1))return Gt(e,et()),null;var r=Lc(e,t);if(e.tag!==0&&r===2){var n=Lf(e);n!==0&&(t=n,r=mp(e,n))}if(r===1)throw r=$a,Po(e,0),An(e,t),Gt(e,et()),r;if(r===6)throw Error(K(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,jo(e,Wt,ln),Gt(e,et()),null}function Lh(e,t){var r=we;we|=1;try{return e(t)}finally{we=r,we===0&&(Mi=et()+500,pd&&so())}}function Lo(e){On!==null&&On.tag===0&&!(we&6)&&Pi();var t=we;we|=1;var r=br.transition,n=Ce;try{if(br.transition=null,Ce=1,e)return e()}finally{Ce=n,br.transition=r,we=t,!(we&6)&&so()}}function Dh(){tr=Si.current,Fe(Si)}function Po(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,d2(r)),it!==null)for(r=it.return;r!==null;){var n=r;switch(kh(n),n.tag){case 1:n=n.type.childContextTypes,n!=null&&zc();break;case 3:Oi(),Fe(Ut),Fe(Pt),Th();break;case 5:Bh(n);break;case 4:Oi();break;case 13:Fe(Me);break;case 19:Fe(Me);break;case 10:Ch(n.type._context);break;case 22:case 23:Dh()}r=r.return}if(ht=e,it=e=Kn(e.current,null),xt=tr=t,ut=0,$a=null,qh=vd=Mo=0,Wt=Zs=null,zo!==null){for(t=0;t<zo.length;t++)if(r=zo[t],n=r.interleaved,n!==null){r.interleaved=null;var o=n.next,i=r.pending;if(i!==null){var a=i.next;i.next=o,n.next=a}r.pending=n}zo=null}return e}function Qy(e,t){do{var r=it;try{if($h(),Zl.current=Ic,Ac){for(var n=De.memoizedState;n!==null;){var o=n.queue;o!==null&&(o.pending=null),n=n.next}Ac=!1}if(qo=0,ft=ct=De=null,Qs=!1,ka=0,Oh.current=null,r===null||r.return===null){ut=1,$a=t,it=null;break}e:{var i=e,a=r.return,l=r,c=t;if(t=xt,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,f=l,p=f.tag;if(!(f.mode&1)&&(p===0||p===11||p===15)){var h=f.alternate;h?(f.updateQueue=h.updateQueue,f.memoizedState=h.memoizedState,f.lanes=h.lanes):(f.updateQueue=null,f.memoizedState=null)}var y=_g(a);if(y!==null){y.flags&=-257,zg(y,a,l,i,t),y.mode&1&&Cg(i,d,t),t=y,c=d;var m=t.updateQueue;if(m===null){var v=new Set;v.add(c),t.updateQueue=v}else m.add(c);break e}else{if(!(t&1)){Cg(i,d,t),Wh();break e}c=Error(K(426))}}else if(Ae&&l.mode&1){var $=_g(a);if($!==null){!($.flags&65536)&&($.flags|=256),zg($,a,l,i,t),Sh(qi(c,l));break e}}i=c=qi(c,l),ut!==4&&(ut=2),Zs===null?Zs=[i]:Zs.push(i),i=a;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var S=Fy(i,c,t);yg(i,S);break e;case 1:l=c;var j=i.type,k=i.stateNode;if(!(i.flags&128)&&(typeof j.getDerivedStateFromError=="function"||k!==null&&typeof k.componentDidCatch=="function"&&(Vn===null||!Vn.has(k)))){i.flags|=65536,t&=-t,i.lanes|=t;var w=Ry(i,l,t);yg(i,w);break e}}i=i.return}while(i!==null)}e1(r)}catch(_){t=_,it===r&&r!==null&&(it=r=r.return);continue}break}while(!0)}function Jy(){var e=Oc.current;return Oc.current=Ic,e===null?Ic:e}function Wh(){(ut===0||ut===3||ut===2)&&(ut=4),ht===null||!(Mo&268435455)&&!(vd&268435455)||An(ht,xt)}function Lc(e,t){var r=we;we|=2;var n=Jy();(ht!==e||xt!==t)&&(ln=null,Po(e,t));do try{R2();break}catch(o){Qy(e,o)}while(!0);if($h(),we=r,Oc.current=n,it!==null)throw Error(K(261));return ht=null,xt=0,ut}function R2(){for(;it!==null;)Zy(it)}function A2(){for(;it!==null&&!aj();)Zy(it)}function Zy(e){var t=r1(e.alternate,e,tr);e.memoizedProps=e.pendingProps,t===null?e1(e):it=t,Oh.current=null}function e1(e){var t=e;do{var r=t.alternate;if(e=t.return,t.flags&32768){if(r=E2(r,t),r!==null){r.flags&=32767,it=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ut=6,it=null;return}}else if(r=z2(r,t,tr),r!==null){it=r;return}if(t=t.sibling,t!==null){it=t;return}it=t=e}while(t!==null);ut===0&&(ut=5)}function jo(e,t,r){var n=Ce,o=br.transition;try{br.transition=null,Ce=1,I2(e,t,r,n)}finally{br.transition=o,Ce=n}return null}function I2(e,t,r,n){do Pi();while(On!==null);if(we&6)throw Error(K(327));r=e.finishedWork;var o=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(K(177));e.callbackNode=null,e.callbackPriority=0;var i=r.lanes|r.childLanes;if(vj(e,i),e===ht&&(it=ht=null,xt=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||vl||(vl=!0,n1(kc,function(){return Pi(),null})),i=(r.flags&15990)!==0,r.subtreeFlags&15990||i){i=br.transition,br.transition=null;var a=Ce;Ce=1;var l=we;we|=4,Oh.current=null,T2(e,r),Ky(r,e),n2(Gf),jc=!!Vf,Gf=Vf=null,e.current=r,P2(r),lj(),we=l,Ce=a,br.transition=i}else e.current=r;if(vl&&(vl=!1,On=e,Mc=o),i=e.pendingLanes,i===0&&(Vn=null),uj(r.stateNode),Gt(e,et()),t!==null)for(n=e.onRecoverableError,r=0;r<t.length;r++)o=t[r],n(o.value,{componentStack:o.stack,digest:o.digest});if(qc)throw qc=!1,e=pp,pp=null,e;return Mc&1&&e.tag!==0&&Pi(),i=e.pendingLanes,i&1?e===hp?ea++:(ea=0,hp=e):ea=0,so(),null}function Pi(){if(On!==null){var e=Fx(Mc),t=br.transition,r=Ce;try{if(br.transition=null,Ce=16>e?16:e,On===null)var n=!1;else{if(e=On,On=null,Mc=0,we&6)throw Error(K(331));var o=we;for(we|=4,oe=e.current;oe!==null;){var i=oe,a=i.child;if(oe.flags&16){var l=i.deletions;if(l!==null){for(var c=0;c<l.length;c++){var d=l[c];for(oe=d;oe!==null;){var f=oe;switch(f.tag){case 0:case 11:case 15:Js(8,f,i)}var p=f.child;if(p!==null)p.return=f,oe=p;else for(;oe!==null;){f=oe;var h=f.sibling,y=f.return;if(Uy(f),f===d){oe=null;break}if(h!==null){h.return=y,oe=h;break}oe=y}}}var m=i.alternate;if(m!==null){var v=m.child;if(v!==null){m.child=null;do{var $=v.sibling;v.sibling=null,v=$}while(v!==null)}}oe=i}}if(i.subtreeFlags&2064&&a!==null)a.return=i,oe=a;else e:for(;oe!==null;){if(i=oe,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Js(9,i,i.return)}var S=i.sibling;if(S!==null){S.return=i.return,oe=S;break e}oe=i.return}}var j=e.current;for(oe=j;oe!==null;){a=oe;var k=a.child;if(a.subtreeFlags&2064&&k!==null)k.return=a,oe=k;else e:for(a=j;oe!==null;){if(l=oe,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:gd(9,l)}}catch(_){Qe(l,l.return,_)}if(l===a){oe=null;break e}var w=l.sibling;if(w!==null){w.return=l.return,oe=w;break e}oe=l.return}}if(we=o,so(),Jr&&typeof Jr.onPostCommitFiberRoot=="function")try{Jr.onPostCommitFiberRoot(ld,e)}catch{}n=!0}return n}finally{Ce=r,br.transition=t}}return!1}function Lg(e,t,r){t=qi(r,t),t=Fy(e,t,1),e=Un(e,t,1),t=It(),e!==null&&(Aa(e,1,t),Gt(e,t))}function Qe(e,t,r){if(e.tag===3)Lg(e,e,r);else for(;t!==null;){if(t.tag===3){Lg(t,e,r);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(Vn===null||!Vn.has(n))){e=qi(r,e),e=Ry(t,e,1),t=Un(t,e,1),e=It(),t!==null&&(Aa(t,1,e),Gt(t,e));break}}t=t.return}}function O2(e,t,r){var n=e.pingCache;n!==null&&n.delete(t),t=It(),e.pingedLanes|=e.suspendedLanes&r,ht===e&&(xt&r)===r&&(ut===4||ut===3&&(xt&130023424)===xt&&500>et()-Mh?Po(e,0):qh|=r),Gt(e,t)}function t1(e,t){t===0&&(e.mode&1?(t=al,al<<=1,!(al&130023424)&&(al=4194304)):t=1);var r=It();e=yn(e,t),e!==null&&(Aa(e,t,r),Gt(e,r))}function q2(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),t1(e,r)}function M2(e,t){var r=0;switch(e.tag){case 13:var n=e.stateNode,o=e.memoizedState;o!==null&&(r=o.retryLane);break;case 19:n=e.stateNode;break;default:throw Error(K(314))}n!==null&&n.delete(t),t1(e,r)}var r1;r1=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||Ut.current)Ht=!0;else{if(!(e.lanes&r)&&!(t.flags&128))return Ht=!1,_2(e,t,r);Ht=!!(e.flags&131072)}else Ht=!1,Ae&&t.flags&1048576&&sy(t,Tc,t.index);switch(t.lanes=0,t.tag){case 2:var n=t.type;tc(e,t),e=t.pendingProps;var o=Ri(t,Pt.current);Ti(t,r),o=Nh(null,t,n,e,o,r);var i=Fh();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Vt(n)?(i=!0,Ec(t)):i=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,zh(t),o.updater=md,t.stateNode=o,o._reactInternals=t,rp(t,n,e,r),t=ip(null,t,n,!0,i,r)):(t.tag=0,Ae&&i&&wh(t),At(null,t,o,r),t=t.child),t;case 16:n=t.elementType;e:{switch(tc(e,t),e=t.pendingProps,o=n._init,n=o(n._payload),t.type=n,o=t.tag=D2(n),e=Br(n,e),o){case 0:t=op(null,t,n,e,r);break e;case 1:t=Tg(null,t,n,e,r);break e;case 11:t=Eg(null,t,n,e,r);break e;case 14:t=Bg(null,t,n,Br(n.type,e),r);break e}throw Error(K(306,n,""))}return t;case 0:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:Br(n,o),op(e,t,n,o,r);case 1:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:Br(n,o),Tg(e,t,n,o,r);case 3:e:{if(qy(t),e===null)throw Error(K(387));n=t.pendingProps,i=t.memoizedState,o=i.element,fy(e,t),Fc(t,n,null,r);var a=t.memoizedState;if(n=a.element,i.isDehydrated)if(i={element:n,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){o=qi(Error(K(423)),t),t=Pg(e,t,n,r,o);break e}else if(n!==o){o=qi(Error(K(424)),t),t=Pg(e,t,n,r,o);break e}else for(rr=Hn(t.stateNode.containerInfo.firstChild),ir=t,Ae=!0,Fr=null,r=dy(t,null,n,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(Ai(),n===o){t=wn(e,t,r);break e}At(e,t,n,r)}t=t.child}return t;case 5:return py(t),e===null&&Zf(t),n=t.type,o=t.pendingProps,i=e!==null?e.memoizedProps:null,a=o.children,Kf(n,o)?a=null:i!==null&&Kf(n,i)&&(t.flags|=32),Oy(e,t),At(e,t,a,r),t.child;case 6:return e===null&&Zf(t),null;case 13:return My(e,t,r);case 4:return Eh(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=Ii(t,null,n,r):At(e,t,n,r),t.child;case 11:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:Br(n,o),Eg(e,t,n,o,r);case 7:return At(e,t,t.pendingProps,r),t.child;case 8:return At(e,t,t.pendingProps.children,r),t.child;case 12:return At(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(n=t.type._context,o=t.pendingProps,i=t.memoizedProps,a=o.value,Be(Pc,n._currentValue),n._currentValue=a,i!==null)if(qr(i.value,a)){if(i.children===o.children&&!Ut.current){t=wn(e,t,r);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var l=i.dependencies;if(l!==null){a=i.child;for(var c=l.firstContext;c!==null;){if(c.context===n){if(i.tag===1){c=mn(-1,r&-r),c.tag=2;var d=i.updateQueue;if(d!==null){d=d.shared;var f=d.pending;f===null?c.next=c:(c.next=f.next,f.next=c),d.pending=c}}i.lanes|=r,c=i.alternate,c!==null&&(c.lanes|=r),ep(i.return,r,t),l.lanes|=r;break}c=c.next}}else if(i.tag===10)a=i.type===t.type?null:i.child;else if(i.tag===18){if(a=i.return,a===null)throw Error(K(341));a.lanes|=r,l=a.alternate,l!==null&&(l.lanes|=r),ep(a,r,t),a=i.sibling}else a=i.child;if(a!==null)a.return=i;else for(a=i;a!==null;){if(a===t){a=null;break}if(i=a.sibling,i!==null){i.return=a.return,a=i;break}a=a.return}i=a}At(e,t,o.children,r),t=t.child}return t;case 9:return o=t.type,n=t.pendingProps.children,Ti(t,r),o=yr(o),n=n(o),t.flags|=1,At(e,t,n,r),t.child;case 14:return n=t.type,o=Br(n,t.pendingProps),o=Br(n.type,o),Bg(e,t,n,o,r);case 15:return Ay(e,t,t.type,t.pendingProps,r);case 17:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:Br(n,o),tc(e,t),t.tag=1,Vt(n)?(e=!0,Ec(t)):e=!1,Ti(t,r),Ny(t,n,o),rp(t,n,o,r),ip(null,t,n,!0,e,r);case 19:return Ly(e,t,r);case 22:return Iy(e,t,r)}throw Error(K(156,t.tag))};function n1(e,t){return Bx(e,t)}function L2(e,t,r,n){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function vr(e,t,r,n){return new L2(e,t,r,n)}function Hh(e){return e=e.prototype,!(!e||!e.isReactComponent)}function D2(e){if(typeof e=="function")return Hh(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ch)return 11;if(e===dh)return 14}return 2}function Kn(e,t){var r=e.alternate;return r===null?(r=vr(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function oc(e,t,r,n,o,i){var a=2;if(n=e,typeof e=="function")Hh(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case pi:return No(r.children,o,i,t);case lh:a=8,o|=8;break;case Cf:return e=vr(12,r,t,o|2),e.elementType=Cf,e.lanes=i,e;case _f:return e=vr(13,r,t,o),e.elementType=_f,e.lanes=i,e;case zf:return e=vr(19,r,t,o),e.elementType=zf,e.lanes=i,e;case px:return bd(r,o,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ux:a=10;break e;case fx:a=9;break e;case ch:a=11;break e;case dh:a=14;break e;case Nn:a=16,n=null;break e}throw Error(K(130,e==null?e:typeof e,""))}return t=vr(a,r,t,o),t.elementType=e,t.type=n,t.lanes=i,t}function No(e,t,r,n){return e=vr(7,e,n,t),e.lanes=r,e}function bd(e,t,r,n){return e=vr(22,e,n,t),e.elementType=px,e.lanes=r,e.stateNode={isHidden:!1},e}function $u(e,t,r){return e=vr(6,e,null,t),e.lanes=r,e}function Cu(e,t,r){return t=vr(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function W2(e,t,r,n,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=su(0),this.expirationTimes=su(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=su(0),this.identifierPrefix=n,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function Uh(e,t,r,n,o,i,a,l,c){return e=new W2(e,t,r,l,c),t===1?(t=1,i===!0&&(t|=8)):t=0,i=vr(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:n,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},zh(i),e}function H2(e,t,r){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:fi,key:n==null?null:""+n,children:e,containerInfo:t,implementation:r}}function o1(e){if(!e)return Zn;e=e._reactInternals;e:{if(Vo(e)!==e||e.tag!==1)throw Error(K(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Vt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(K(171))}if(e.tag===1){var r=e.type;if(Vt(r))return oy(e,r,t)}return t}function i1(e,t,r,n,o,i,a,l,c){return e=Uh(r,n,!0,e,o,i,a,l,c),e.context=o1(null),r=e.current,n=It(),o=Gn(r),i=mn(n,o),i.callback=t??null,Un(r,i,o),e.current.lanes=o,Aa(e,o,n),Gt(e,n),e}function xd(e,t,r,n){var o=t.current,i=It(),a=Gn(o);return r=o1(r),t.context===null?t.context=r:t.pendingContext=r,t=mn(i,a),t.payload={element:e},n=n===void 0?null:n,n!==null&&(t.callback=n),e=Un(o,t,a),e!==null&&(Ir(e,o,a,i),Jl(e,o,a)),a}function Dc(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Dg(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Vh(e,t){Dg(e,t),(e=e.alternate)&&Dg(e,t)}function U2(){return null}var s1=typeof reportError=="function"?reportError:function(e){console.error(e)};function Gh(e){this._internalRoot=e}yd.prototype.render=Gh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(K(409));xd(e,t,null,null)};yd.prototype.unmount=Gh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Lo(function(){xd(null,e,null,null)}),t[xn]=null}};function yd(e){this._internalRoot=e}yd.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ix();e={blockedOn:null,target:e,priority:t};for(var r=0;r<Rn.length&&t!==0&&t<Rn[r].priority;r++);Rn.splice(r,0,e),r===0&&qx(e)}};function Kh(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function wd(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Wg(){}function V2(e,t,r,n,o){if(o){if(typeof n=="function"){var i=n;n=function(){var d=Dc(a);i.call(d)}}var a=i1(t,n,e,0,null,!1,!1,"",Wg);return e._reactRootContainer=a,e[xn]=a.current,va(e.nodeType===8?e.parentNode:e),Lo(),a}for(;o=e.lastChild;)e.removeChild(o);if(typeof n=="function"){var l=n;n=function(){var d=Dc(c);l.call(d)}}var c=Uh(e,0,!1,null,null,!1,!1,"",Wg);return e._reactRootContainer=c,e[xn]=c.current,va(e.nodeType===8?e.parentNode:e),Lo(function(){xd(t,c,r,n)}),c}function kd(e,t,r,n,o){var i=r._reactRootContainer;if(i){var a=i;if(typeof o=="function"){var l=o;o=function(){var c=Dc(a);l.call(c)}}xd(t,a,e,o)}else a=V2(r,t,e,o,n);return Dc(a)}Rx=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=Ls(t.pendingLanes);r!==0&&(ph(t,r|1),Gt(t,et()),!(we&6)&&(Mi=et()+500,so()))}break;case 13:Lo(function(){var n=yn(e,1);if(n!==null){var o=It();Ir(n,e,1,o)}}),Vh(e,1)}};hh=function(e){if(e.tag===13){var t=yn(e,134217728);if(t!==null){var r=It();Ir(t,e,134217728,r)}Vh(e,134217728)}};Ax=function(e){if(e.tag===13){var t=Gn(e),r=yn(e,t);if(r!==null){var n=It();Ir(r,e,t,n)}Vh(e,t)}};Ix=function(){return Ce};Ox=function(e,t){var r=Ce;try{return Ce=e,t()}finally{Ce=r}};Of=function(e,t,r){switch(t){case"input":if(Tf(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var n=r[t];if(n!==e&&n.form===e.form){var o=fd(n);if(!o)throw Error(K(90));mx(n),Tf(n,o)}}}break;case"textarea":vx(e,r);break;case"select":t=r.value,t!=null&&_i(e,!!r.multiple,t,!1)}};jx=Lh;$x=Lo;var G2={usingClientEntryPoint:!1,Events:[Oa,vi,fd,kx,Sx,Lh]},xs={findFiberByHostInstance:_o,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},K2={bundleType:xs.bundleType,version:xs.version,rendererPackageName:xs.rendererPackageName,rendererConfig:xs.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Sn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=zx(e),e===null?null:e.stateNode},findFiberByHostInstance:xs.findFiberByHostInstance||U2,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var bl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!bl.isDisabled&&bl.supportsFiber)try{ld=bl.inject(K2),Jr=bl}catch{}}lr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=G2;lr.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Kh(t))throw Error(K(200));return H2(e,t,null,r)};lr.createRoot=function(e,t){if(!Kh(e))throw Error(K(299));var r=!1,n="",o=s1;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=Uh(e,1,!1,null,null,r,!1,n,o),e[xn]=t.current,va(e.nodeType===8?e.parentNode:e),new Gh(t)};lr.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(K(188)):(e=Object.keys(e).join(","),Error(K(268,e)));return e=zx(t),e=e===null?null:e.stateNode,e};lr.flushSync=function(e){return Lo(e)};lr.hydrate=function(e,t,r){if(!wd(t))throw Error(K(200));return kd(null,e,t,!0,r)};lr.hydrateRoot=function(e,t,r){if(!Kh(e))throw Error(K(405));var n=r!=null&&r.hydratedSources||null,o=!1,i="",a=s1;if(r!=null&&(r.unstable_strictMode===!0&&(o=!0),r.identifierPrefix!==void 0&&(i=r.identifierPrefix),r.onRecoverableError!==void 0&&(a=r.onRecoverableError)),t=i1(t,null,e,1,r??null,o,!1,i,a),e[xn]=t.current,va(e),n)for(e=0;e<n.length;e++)r=n[e],o=r._getVersion,o=o(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,o]:t.mutableSourceEagerHydrationData.push(r,o);return new yd(t)};lr.render=function(e,t,r){if(!wd(t))throw Error(K(200));return kd(null,e,t,!1,r)};lr.unmountComponentAtNode=function(e){if(!wd(e))throw Error(K(40));return e._reactRootContainer?(Lo(function(){kd(null,null,e,!1,function(){e._reactRootContainer=null,e[xn]=null})}),!0):!1};lr.unstable_batchedUpdates=Lh;lr.unstable_renderSubtreeIntoContainer=function(e,t,r,n){if(!wd(r))throw Error(K(200));if(e==null||e._reactInternals===void 0)throw Error(K(38));return kd(e,t,r,!1,n)};lr.version="18.3.1-next-f1338f8080-20240426";function a1(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a1)}catch(e){console.error(e)}}a1(),ax.exports=lr;var l1=ax.exports,Hg=l1;jf.createRoot=Hg.createRoot,jf.hydrateRoot=Hg.hydrateRoot;var c1={exports:{}},d1={};/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ma=x;function Y2(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var X2=typeof Object.is=="function"?Object.is:Y2,Q2=Ma.useSyncExternalStore,J2=Ma.useRef,Z2=Ma.useEffect,e$=Ma.useMemo,t$=Ma.useDebugValue;d1.useSyncExternalStoreWithSelector=function(e,t,r,n,o){var i=J2(null);if(i.current===null){var a={hasValue:!1,value:null};i.current=a}else a=i.current;i=e$(function(){function c(y){if(!d){if(d=!0,f=y,y=n(y),o!==void 0&&a.hasValue){var m=a.value;if(o(m,y))return p=m}return p=y}if(m=p,X2(f,y))return m;var v=n(y);return o!==void 0&&o(m,v)?(f=y,m):(f=y,p=v)}var d=!1,f,p,h=r===void 0?null:r;return[function(){return c(t())},h===null?void 0:function(){return c(h())}]},[t,r,n,o]);var l=Q2(e,i[0],i[1]);return Z2(function(){a.hasValue=!0,a.value=l},[l]),t$(l),l};c1.exports=d1;var r$=c1.exports;function n$(e){e()}function o$(){let e=null,t=null;return{clear(){e=null,t=null},notify(){n$(()=>{let r=e;for(;r;)r.callback(),r=r.next})},get(){const r=[];let n=e;for(;n;)r.push(n),n=n.next;return r},subscribe(r){let n=!0;const o=t={callback:r,next:null,prev:t};return o.prev?o.prev.next=o:e=o,function(){!n||e===null||(n=!1,o.next?o.next.prev=o.prev:t=o.prev,o.prev?o.prev.next=o.next:e=o.next)}}}}var Ug={notify(){},get:()=>[]};function i$(e,t){let r,n=Ug,o=0,i=!1;function a(v){f();const $=n.subscribe(v);let S=!1;return()=>{S||(S=!0,$(),p())}}function l(){n.notify()}function c(){m.onStateChange&&m.onStateChange()}function d(){return i}function f(){o++,r||(r=e.subscribe(c),n=o$())}function p(){o--,r&&o===0&&(r(),r=void 0,n.clear(),n=Ug)}function h(){i||(i=!0,f())}function y(){i&&(i=!1,p())}const m={addNestedSub:a,notifyNestedSubs:l,handleChangeWrapper:c,isSubscribed:d,trySubscribe:h,tryUnsubscribe:y,getListeners:()=>n};return m}var s$=()=>typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",a$=s$(),l$=()=>typeof navigator<"u"&&navigator.product==="ReactNative",c$=l$(),d$=()=>a$||c$?x.useLayoutEffect:x.useEffect,u$=d$(),_u=Symbol.for("react-redux-context"),zu=typeof globalThis<"u"?globalThis:{};function f$(){if(!x.createContext)return{};const e=zu[_u]??(zu[_u]=new Map);let t=e.get(x.createContext);return t||(t=x.createContext(null),e.set(x.createContext,t)),t}var eo=f$();function p$(e){const{children:t,context:r,serverState:n,store:o}=e,i=x.useMemo(()=>{const c=i$(o);return{store:o,subscription:c,getServerState:n?()=>n:void 0}},[o,n]),a=x.useMemo(()=>o.getState(),[o]);u$(()=>{const{subscription:c}=i;return c.onStateChange=c.notifyNestedSubs,c.trySubscribe(),a!==o.getState()&&c.notifyNestedSubs(),()=>{c.tryUnsubscribe(),c.onStateChange=void 0}},[i,a]);const l=r||eo;return x.createElement(l.Provider,{value:i},t)}var h$=p$;function Yh(e=eo){return function(){return x.useContext(e)}}var u1=Yh();function f1(e=eo){const t=e===eo?u1:Yh(e),r=()=>{const{store:n}=t();return n};return Object.assign(r,{withTypes:()=>r}),r}var m$=f1();function g$(e=eo){const t=e===eo?m$:f1(e),r=()=>t().dispatch;return Object.assign(r,{withTypes:()=>r}),r}var v$=g$(),b$=(e,t)=>e===t;function x$(e=eo){const t=e===eo?u1:Yh(e),r=(n,o={})=>{const{equalityFn:i=b$}=typeof o=="function"?{equalityFn:o}:o,a=t(),{store:l,subscription:c,getServerState:d}=a;x.useRef(!0);const f=x.useCallback({[n.name](h){return n(h)}}[n.name],[n]),p=r$.useSyncExternalStoreWithSelector(c.addNestedSub,l.getState,d||l.getState,f,i);return x.useDebugValue(p),p};return Object.assign(r,{withTypes:()=>r}),r}var y$=x$();const Eu=typeof window>"u"?global:window,Bu="@griffel/";function w$(e,t){return Eu[Symbol.for(Bu+e)]||(Eu[Symbol.for(Bu+e)]=t),Eu[Symbol.for(Bu+e)]}const vp=w$("DEFINITION_LOOKUP_TABLE",{}),ta="data-make-styles-bucket",k$="data-priority",bp=7,Xh="___",S$=Xh.length+bp,j$=0,$$=1;function C$(e){for(var t=0,r,n=0,o=e.length;o>=4;++n,o-=4)r=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(o){case 3:t^=(e.charCodeAt(n+2)&255)<<16;case 2:t^=(e.charCodeAt(n+1)&255)<<8;case 1:t^=e.charCodeAt(n)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}function _$(e){const t=e.length;if(t===bp)return e;for(let r=t;r<bp;r++)e+="0";return e}function p1(e,t,r=[]){return Xh+_$(C$(e+t))}function h1(e,t){let r="",n="";for(const o in e){const i=e[o];if(i===0){n+=o+" ";continue}const a=Array.isArray(i),l=t==="rtl"?(a?i[1]:i)+" ":(a?i[0]:i)+" ";r+=l,n+=l}return[r.slice(0,-1),n.slice(0,-1)]}function Vg(e,t){const r={};for(const n in e){const[o,i]=h1(e[n],t);if(i===""){r[n]="";continue}const a=p1(i,t),l=a+(o===""?"":" "+o);vp[a]=[e[n],t],r[n]=l}return r}const Gg={};function ve(){let e=null,t="",r="";const n=new Array(arguments.length);for(let p=0;p<arguments.length;p++){const h=arguments[p];if(typeof h=="string"&&h!==""){const y=h.indexOf(Xh);if(y===-1)t+=h+" ";else{const m=h.substr(y,S$);y>0&&(t+=h.slice(0,y)),r+=m,n[p]=m}}}if(r==="")return t.slice(0,-1);const o=Gg[r];if(o!==void 0)return t+o;const i=[];for(let p=0;p<arguments.length;p++){const h=n[p];if(h){const y=vp[h];y&&(i.push(y[j$]),e=y[$$])}}const a=Object.assign.apply(Object,[{}].concat(i)),[l,c]=h1(a,e),d=p1(c,e,n),f=d+" "+l;return Gg[r]=f,vp[d]=[a,e],t+f}function z$(e){return Array.isArray(e)?e:[e]}function E$(e,t,r,n){const o=[];if(n[ta]=t,n[k$]=String(r),e)for(const a in n)e.setAttribute(a,n[a]);function i(a){return e!=null&&e.sheet?e.sheet.insertRule(a,e.sheet.cssRules.length):o.push(a)}return{elementAttributes:n,insertRule:i,element:e,bucketName:t,cssRules(){return e!=null&&e.sheet?Array.from(e.sheet.cssRules).map(a=>a.cssText):o}}}const B$=["r","d","l","v","w","f","i","h","a","s","k","t","m","c"],Kg=B$.reduce((e,t,r)=>(e[t]=r,e),{});function T$(e,t,r){return(e==="m"?e+t:e)+r}function P$(e,t,r,n,o={}){var i,a;const l=e==="m",c=(i=o.m)!==null&&i!==void 0?i:"0",d=(a=o.p)!==null&&a!==void 0?a:0,f=T$(e,c,d);if(!n.stylesheets[f]){const p=t&&t.createElement("style"),h=E$(p,e,d,Object.assign({},n.styleElementAttributes,l&&{media:c}));n.stylesheets[f]=h,t!=null&&t.head&&p&&t.head.insertBefore(p,F$(t,r,e,n,o))}return n.stylesheets[f]}function N$(e,t,r){var n,o;const i=t+((n=r.m)!==null&&n!==void 0?n:""),a=e.getAttribute(ta)+((o=e.media)!==null&&o!==void 0?o:"");return i===a}function F$(e,t,r,n,o={}){var i,a;const l=Kg[r],c=(i=o.m)!==null&&i!==void 0?i:"",d=(a=o.p)!==null&&a!==void 0?a:0;let f=v=>l-Kg[v.getAttribute(ta)],p=e.head.querySelectorAll(`[${ta}]`);if(r==="m"){const v=e.head.querySelectorAll(`[${ta}="${r}"]`);v.length&&(p=v,f=$=>n.compareMediaQueries(c,$.media))}const h=v=>N$(v,r,o)?d-Number(v.getAttribute("data-priority")):f(v),y=p.length;let m=y-1;for(;m>=0;){const v=p.item(m);if(h(v)>0)return v.nextSibling;m--}return y>0?p.item(0):t?t.nextSibling:null}function Yg(e,t){try{e.insertRule(t)}catch{}}let R$=0;const A$=(e,t)=>e<t?-1:e>t?1:0;function I$(e=typeof document>"u"?void 0:document,t={}){const{classNameHashSalt:r,unstable_filterCSSRule:n,insertionPoint:o,styleElementAttributes:i,compareMediaQueries:a=A$}=t,l={classNameHashSalt:r,insertionCache:{},stylesheets:{},styleElementAttributes:Object.freeze(i),compareMediaQueries:a,id:`d${R$++}`,insertCSSRules(c){for(const d in c){const f=c[d];for(let p=0,h=f.length;p<h;p++){const[y,m]=z$(f[p]),v=P$(d,e,o||null,l,m);l.insertionCache[y]||(l.insertionCache[y]=d,n?n(y)&&Yg(v,y):Yg(v,y))}}}};return l}const m1=()=>{const e={};return function(r,n){e[r.id]===void 0&&(r.insertCSSRules(n),e[r.id]=!0)}};var Ne="-ms-",ra="-moz-",$e="-webkit-",g1="comm",Sd="rule",Qh="decl",O$="@import",q$="@namespace",v1="@keyframes",M$="@layer",b1=Math.abs,Jh=String.fromCharCode,xp=Object.assign;function L$(e,t){return dt(e,0)^45?(((t<<2^dt(e,0))<<2^dt(e,1))<<2^dt(e,2))<<2^dt(e,3):0}function x1(e){return e.trim()}function cn(e,t){return(e=t.exec(e))?e[0]:e}function he(e,t,r){return e.replace(t,r)}function ic(e,t,r){return e.indexOf(t,r)}function dt(e,t){return e.charCodeAt(t)|0}function Do(e,t,r){return e.slice(t,r)}function Nr(e){return e.length}function y1(e){return e.length}function Ws(e,t){return t.push(e),e}function D$(e,t){return e.map(t).join("")}function Xg(e,t){return e.filter(function(r){return!cn(r,t)})}var jd=1,Li=1,w1=0,kr=0,ot=0,Zi="";function $d(e,t,r,n,o,i,a,l){return{value:e,root:t,parent:r,type:n,props:o,children:i,line:jd,column:Li,length:a,return:"",siblings:l}}function Pn(e,t){return xp($d("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Qo(e){for(;e.root;)e=Pn(e.root,{children:[e]});Ws(e,e.siblings)}function W$(){return ot}function H$(){return ot=kr>0?dt(Zi,--kr):0,Li--,ot===10&&(Li=1,jd--),ot}function Or(){return ot=kr<w1?dt(Zi,kr++):0,Li++,ot===10&&(Li=1,jd++),ot}function qn(){return dt(Zi,kr)}function sc(){return kr}function Cd(e,t){return Do(Zi,e,t)}function Ca(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function U$(e){return jd=Li=1,w1=Nr(Zi=e),kr=0,[]}function V$(e){return Zi="",e}function Tu(e){return x1(Cd(kr-1,yp(e===91?e+2:e===40?e+1:e)))}function G$(e){for(;(ot=qn())&&ot<33;)Or();return Ca(e)>2||Ca(ot)>3?"":" "}function K$(e,t){for(;--t&&Or()&&!(ot<48||ot>102||ot>57&&ot<65||ot>70&&ot<97););return Cd(e,sc()+(t<6&&qn()==32&&Or()==32))}function yp(e){for(;Or();)switch(ot){case e:return kr;case 34:case 39:e!==34&&e!==39&&yp(ot);break;case 40:e===41&&yp(e);break;case 92:Or();break}return kr}function Y$(e,t){for(;Or()&&e+ot!==57;)if(e+ot===84&&qn()===47)break;return"/*"+Cd(t,kr-1)+"*"+Jh(e===47?e:Or())}function X$(e){for(;!Ca(qn());)Or();return Cd(e,kr)}function Q$(e){return V$(ac("",null,null,null,[""],e=U$(e),0,[0],e))}function ac(e,t,r,n,o,i,a,l,c){for(var d=0,f=0,p=a,h=0,y=0,m=0,v=1,$=1,S=1,j=0,k="",w=o,_=i,B=n,E=k;$;)switch(m=j,j=Or()){case 40:if(m!=108&&dt(E,p-1)==58){ic(E+=he(Tu(j),"&","&\f"),"&\f",b1(d?l[d-1]:0))!=-1&&(S=-1);break}case 34:case 39:case 91:E+=Tu(j);break;case 9:case 10:case 13:case 32:E+=G$(m);break;case 92:E+=K$(sc()-1,7);continue;case 47:switch(qn()){case 42:case 47:Ws(J$(Y$(Or(),sc()),t,r,c),c),(Ca(m||1)==5||Ca(qn()||1)==5)&&Nr(E)&&Do(E,-1,void 0)!==" "&&(E+=" ");break;default:E+="/"}break;case 123*v:l[d++]=Nr(E)*S;case 125*v:case 59:case 0:switch(j){case 0:case 125:$=0;case 59+f:S==-1&&(E=he(E,/\f/g,"")),y>0&&(Nr(E)-p||v===0&&m===47)&&Ws(y>32?Jg(E+";",n,r,p-1,c):Jg(he(E," ","")+";",n,r,p-2,c),c);break;case 59:E+=";";default:if(Ws(B=Qg(E,t,r,d,f,o,l,k,w=[],_=[],p,i),i),j===123)if(f===0)ac(E,t,B,B,w,i,p,l,_);else{switch(h){case 99:if(dt(E,3)===110)break;case 108:if(dt(E,2)===97)break;default:f=0;case 100:case 109:case 115:}f?ac(e,B,B,n&&Ws(Qg(e,B,B,0,0,o,l,k,o,w=[],p,_),_),o,_,p,l,n?w:_):ac(E,B,B,B,[""],_,0,l,_)}}d=f=y=0,v=S=1,k=E="",p=a;break;case 58:p=1+Nr(E),y=m;default:if(v<1){if(j==123)--v;else if(j==125&&v++==0&&H$()==125)continue}switch(E+=Jh(j),j*v){case 38:S=f>0?1:(E+="\f",-1);break;case 44:l[d++]=(Nr(E)-1)*S,S=1;break;case 64:qn()===45&&(E+=Tu(Or())),h=qn(),f=p=Nr(k=E+=X$(sc())),j++;break;case 45:m===45&&Nr(E)==2&&(v=0)}}return i}function Qg(e,t,r,n,o,i,a,l,c,d,f,p){for(var h=o-1,y=o===0?i:[""],m=y1(y),v=0,$=0,S=0;v<n;++v)for(var j=0,k=Do(e,h+1,h=b1($=a[v])),w=e;j<m;++j)(w=x1($>0?y[j]+" "+k:he(k,/&\f/g,y[j])))&&(c[S++]=w);return $d(e,t,r,o===0?Sd:l,c,d,f,p)}function J$(e,t,r,n){return $d(e,t,r,g1,Jh(W$()),Do(e,2,-2),0,n)}function Jg(e,t,r,n,o){return $d(e,t,r,Qh,Do(e,0,n),Do(e,n+1,-1),n,o)}function k1(e,t,r){switch(L$(e,t)){case 5103:return $e+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return $e+e+e;case 4855:return $e+e.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+e;case 4789:return ra+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return $e+e+ra+e+Ne+e+e;case 5936:switch(dt(e,t+11)){case 114:return $e+e+Ne+he(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return $e+e+Ne+he(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return $e+e+Ne+he(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return $e+e+Ne+e+e;case 6165:return $e+e+Ne+"flex-"+e+e;case 5187:return $e+e+he(e,/(\w+).+(:[^]+)/,$e+"box-$1$2"+Ne+"flex-$1$2")+e;case 5443:return $e+e+Ne+"flex-item-"+he(e,/flex-|-self/g,"")+(cn(e,/flex-|baseline/)?"":Ne+"grid-row-"+he(e,/flex-|-self/g,""))+e;case 4675:return $e+e+Ne+"flex-line-pack"+he(e,/align-content|flex-|-self/g,"")+e;case 5548:return $e+e+Ne+he(e,"shrink","negative")+e;case 5292:return $e+e+Ne+he(e,"basis","preferred-size")+e;case 6060:return $e+"box-"+he(e,"-grow","")+$e+e+Ne+he(e,"grow","positive")+e;case 4554:return $e+he(e,/([^-])(transform)/g,"$1"+$e+"$2")+e;case 6187:return he(he(he(e,/(zoom-|grab)/,$e+"$1"),/(image-set)/,$e+"$1"),e,"")+e;case 5495:case 3959:return he(e,/(image-set\([^]*)/,$e+"$1$`$1");case 4968:return he(he(e,/(.+:)(flex-)?(.*)/,$e+"box-pack:$3"+Ne+"flex-pack:$3"),/space-between/,"justify")+$e+e+e;case 4200:if(!cn(e,/flex-|baseline/))return Ne+"grid-column-align"+Do(e,t)+e;break;case 2592:case 3360:return Ne+he(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,o){return t=o,cn(n.props,/grid-\w+-end/)})?~ic(e+(r=r[t].value),"span",0)?e:Ne+he(e,"-start","")+e+Ne+"grid-row-span:"+(~ic(r,"span",0)?cn(r,/\d+/):+cn(r,/\d+/)-+cn(e,/\d+/))+";":Ne+he(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return cn(n.props,/grid-\w+-start/)})?e:Ne+he(he(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return he(e,/(.+)-inline(.+)/,$e+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Nr(e)-1-t>6)switch(dt(e,t+1)){case 109:if(dt(e,t+4)!==45)break;case 102:return he(e,/(.+:)(.+)-([^]+)/,"$1"+$e+"$2-$3$1"+ra+(dt(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~ic(e,"stretch",0)?k1(he(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return he(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,o,i,a,l,c,d){return Ne+o+":"+i+d+(a?Ne+o+"-span:"+(l?c:+c-+i)+d:"")+e});case 4949:if(dt(e,t+6)===121)return he(e,":",":"+$e)+e;break;case 6444:switch(dt(e,dt(e,14)===45?18:11)){case 120:return he(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+$e+(dt(e,14)===45?"inline-":"")+"box$3$1"+$e+"$2$3$1"+Ne+"$2box$3")+e;case 100:return he(e,":",":"+Ne)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return he(e,"scroll-","scroll-snap-")+e}return e}function Wc(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function Z$(e,t,r,n){switch(e.type){case M$:if(e.children.length)break;case O$:case q$:case Qh:return e.return=e.return||e.value;case g1:return"";case v1:return e.return=e.value+"{"+Wc(e.children,n)+"}";case Sd:if(!Nr(e.value=e.props.join(",")))return""}return Nr(r=Wc(e.children,n))?e.return=e.value+"{"+r+"}":""}function eC(e){var t=y1(e);return function(r,n,o,i){for(var a="",l=0;l<t;l++)a+=e[l](r,n,o,i)||"";return a}}function tC(e){return function(t){t.root||(t=t.return)&&e(t)}}function rC(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case Qh:e.return=k1(e.value,e.length,r);return;case v1:return Wc([Pn(e,{value:he(e.value,"@","@"+$e)})],n);case Sd:if(e.length)return D$(r=e.props,function(o){switch(cn(o,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Qo(Pn(e,{props:[he(o,/:(read-\w+)/,":"+ra+"$1")]})),Qo(Pn(e,{props:[o]})),xp(e,{props:Xg(r,n)});break;case"::placeholder":Qo(Pn(e,{props:[he(o,/:(plac\w+)/,":"+$e+"input-$1")]})),Qo(Pn(e,{props:[he(o,/:(plac\w+)/,":"+ra+"$1")]})),Qo(Pn(e,{props:[he(o,/:(plac\w+)/,Ne+"input-$1")]})),Qo(Pn(e,{props:[o]})),xp(e,{props:Xg(r,n)});break}return""})}}function S1(e,t,r=m1){const n=r();let o=null,i=null;function a(l){const{dir:c,renderer:d}=l,f=c==="ltr";return f?o===null&&(o=Vg(e,c)):i===null&&(i=Vg(e,c)),n(d,t),f?o:i}return a}function nC(e,t,r,n=m1){const o=n();function i(a){const{dir:l,renderer:c}=a,d=l==="ltr"?e:t||e;return o(c,Array.isArray(r)?{r}:r),d}return i}function oC(){return typeof window<"u"&&!!(window.document&&window.document.createElement)}const Zg=la.useInsertionEffect?la.useInsertionEffect:void 0,j1=()=>{const e={};return function(r,n){if(Zg&&oC()){Zg(()=>{r.insertCSSRules(n)},[r,n]);return}e[r.id]===void 0&&(r.insertCSSRules(n),e[r.id]=!0)}},iC=x.createContext(I$());function _d(){return x.useContext(iC)}const $1=x.createContext("ltr"),sC=({children:e,dir:t})=>x.createElement($1.Provider,{value:t},e);function C1(){return x.useContext($1)}function ke(e,t){const r=S1(e,t,j1);return function(){const o=C1(),i=_d();return r({dir:o,renderer:i})}}function Ue(e,t,r){const n=nC(e,t,r,j1);return function(){const i=C1(),a=_d();return n({dir:i,renderer:a})}}const aC={"<":"\\3C ",">":"\\3E "};function lC(e){return e.replace(/[<>]/g,t=>aC[t])}function cC(e,t){if(t){const r=Object.keys(t).reduce((n,o)=>`${n}--${o}: ${t[o]}; `,"");return`${e} { ${lC(r)} }`}return`${e} {}`}const Hc=Symbol.for("fui.slotRenderFunction"),Di=Symbol.for("fui.slotElementType"),_1=Symbol.for("fui.slotClassNameProp");function Le(e,t){const{defaultProps:r,elementType:n}=t,o=dC(e),i={...r,...o,[Di]:n,[_1]:(o==null?void 0:o.className)||(r==null?void 0:r.className)};return o&&typeof o.children=="function"&&(i[Hc]=o.children,i.children=r==null?void 0:r.children),i}function ar(e,t){if(!(e===null||e===void 0&&!t.renderByDefault))return Le(e,t)}function dC(e){return typeof e=="string"||typeof e=="number"||uC(e)||x.isValidElement(e)?{children:e}:e}const uC=e=>typeof e=="object"&&e!==null&&Symbol.iterator in e;function fC(e){return e!==null&&typeof e=="object"&&!Array.isArray(e)&&!x.isValidElement(e)}function e0(e){return!!(e!=null&&e.hasOwnProperty(Di))}const Te=(...e)=>{const t={};for(const r of e){const n=Array.isArray(r)?r:Object.keys(r);for(const o of n)t[o]=1}return t},pC=Te(["onAuxClick","onAnimationEnd","onAnimationStart","onCopy","onCut","onPaste","onCompositionEnd","onCompositionStart","onCompositionUpdate","onFocus","onFocusCapture","onBlur","onBlurCapture","onChange","onInput","onSubmit","onLoad","onError","onKeyDown","onKeyDownCapture","onKeyPress","onKeyUp","onAbort","onCanPlay","onCanPlayThrough","onDurationChange","onEmptied","onEncrypted","onEnded","onLoadedData","onLoadedMetadata","onLoadStart","onPause","onPlay","onPlaying","onProgress","onRateChange","onSeeked","onSeeking","onStalled","onSuspend","onTimeUpdate","onVolumeChange","onWaiting","onClick","onClickCapture","onContextMenu","onDoubleClick","onDrag","onDragEnd","onDragEnter","onDragExit","onDragLeave","onDragOver","onDragStart","onDrop","onMouseDown","onMouseDownCapture","onMouseEnter","onMouseLeave","onMouseMove","onMouseOut","onMouseOver","onMouseUp","onMouseUpCapture","onSelect","onTouchCancel","onTouchEnd","onTouchMove","onTouchStart","onScroll","onWheel","onPointerCancel","onPointerDown","onPointerEnter","onPointerLeave","onPointerMove","onPointerOut","onPointerOver","onPointerUp","onGotPointerCapture","onLostPointerCapture"]),hC=Te(["accessKey","children","className","contentEditable","dir","draggable","hidden","htmlFor","id","lang","popover","focusgroup","ref","role","style","tabIndex","title","translate","spellCheck","name"]),mC=Te(["itemID","itemProp","itemRef","itemScope","itemType"]),st=Te(hC,pC,mC),gC=Te(st,["form"]),z1=Te(st,["height","loop","muted","preload","src","width"]),vC=Te(z1,["poster"]),bC=Te(st,["start"]),xC=Te(st,["value"]),yC=Te(st,["download","href","hrefLang","media","referrerPolicy","rel","target","type"]),wC=Te(st,["dateTime"]),zd=Te(st,["autoFocus","disabled","form","formAction","formEncType","formMethod","formNoValidate","formTarget","popoverTarget","popoverTargetAction","type","value"]),kC=Te(zd,["accept","alt","autoCorrect","autoCapitalize","autoComplete","checked","dirname","form","height","inputMode","list","max","maxLength","min","minLength","multiple","pattern","placeholder","readOnly","required","src","step","size","type","value","width"]),SC=Te(zd,["autoCapitalize","cols","dirname","form","maxLength","placeholder","readOnly","required","rows","wrap"]),jC=Te(zd,["form","multiple","required"]),$C=Te(st,["selected","value"]),CC=Te(st,["cellPadding","cellSpacing"]),_C=st,zC=Te(st,["colSpan","rowSpan","scope"]),EC=Te(st,["colSpan","headers","rowSpan","scope"]),BC=Te(st,["span"]),TC=Te(st,["span"]),PC=Te(st,["disabled","form"]),NC=Te(st,["acceptCharset","action","encType","encType","method","noValidate","target"]),FC=Te(st,["allow","allowFullScreen","allowPaymentRequest","allowTransparency","csp","height","importance","referrerPolicy","sandbox","src","srcDoc","width"]),RC=Te(st,["alt","crossOrigin","height","src","srcSet","useMap","width"]),AC=Te(st,["open","onCancel","onClose"]);function IC(e,t,r){const n=Array.isArray(t),o={},i=Object.keys(e);for(const a of i)(!n&&t[a]||n&&t.indexOf(a)>=0||a.indexOf("data-")===0||a.indexOf("aria-")===0)&&(!r||(r==null?void 0:r.indexOf(a))===-1)&&(o[a]=e[a]);return o}const OC={label:gC,audio:z1,video:vC,ol:bC,li:xC,a:yC,button:zd,input:kC,textarea:SC,select:jC,option:$C,table:CC,tr:_C,th:zC,td:EC,colGroup:BC,col:TC,fieldset:PC,form:NC,iframe:FC,img:RC,time:wC,dialog:AC};function E1(e,t,r){const n=e&&OC[e]||st;return n.as=1,IC(t,n,r)}const Ed=({primarySlotTagName:e,props:t,excludedPropNames:r})=>({root:{style:t.style,className:t.className},primary:E1(e,t,[...r||[],"style","className"])}),tn=(e,t,r)=>{var n;return E1((n=t.as)!==null&&n!==void 0?n:e,t,r)};function qC(e,t){const r=x.useRef(void 0),n=x.useCallback((i,a)=>(r.current!==void 0&&t(r.current),r.current=e(i,a),r.current),[t,e]),o=x.useCallback(()=>{r.current!==void 0&&(t(r.current),r.current=void 0)},[t]);return x.useEffect(()=>o,[o]),[n,o]}const B1=x.createContext(void 0),MC=B1.Provider,T1=x.createContext(void 0),LC="",DC=T1.Provider;function WC(){var e;return(e=x.useContext(T1))!==null&&e!==void 0?e:LC}const HC=x.createContext(void 0),UC=HC.Provider,P1=x.createContext(void 0),VC={targetDocument:typeof document=="object"?document:void 0,dir:"ltr"},GC=P1.Provider;function $r(){var e;return(e=x.useContext(P1))!==null&&e!==void 0?e:VC}const N1=x.createContext(void 0),KC=N1.Provider;function Zh(){var e;return(e=x.useContext(N1))!==null&&e!==void 0?e:{}}const em=x.createContext(void 0),YC=()=>{},XC=em.Provider,Qt=e=>{var t,r;return(r=(t=x.useContext(em))===null||t===void 0?void 0:t[e])!==null&&r!==void 0?r:YC},F1=x.createContext(void 0);F1.Provider;function QC(){return x.useContext(F1)}function JC(e){return typeof e=="function"}const es=e=>{"use no memo";const[t,r]=x.useState(()=>e.defaultState===void 0?e.initialState:ZC(e.defaultState)?e.defaultState():e.defaultState),n=x.useRef(e.state);x.useEffect(()=>{n.current=e.state},[e.state]);const o=x.useCallback(i=>{JC(i)&&i(n.current)},[]);return e5(e.state)?[e.state,o]:[t,r]};function ZC(e){return typeof e=="function"}const e5=e=>{"use no memo";const[t]=x.useState(()=>e!==void 0);return t};function R1(){return typeof window<"u"&&!!(window.document&&window.document.createElement)}const t5={current:0},r5=x.createContext(void 0);function n5(){var e;return(e=x.useContext(r5))!==null&&e!==void 0?e:t5}const Sr=R1()?x.useLayoutEffect:x.useEffect,mt=e=>{const t=x.useRef(()=>{throw new Error("Cannot call an event handler while rendering")});return Sr(()=>{t.current=e},[e]),x.useCallback((...r)=>{const n=t.current;return n(...r)},[t])};function o5(){const e=x.useRef(!0);return x.useEffect(()=>{e.current&&(e.current=!1)},[]),e.current}function i5(){return x.useReducer(e=>e+1,0)[1]}const A1=x.createContext(void 0);A1.Provider;function s5(){return x.useContext(A1)||""}function ts(e="fui-",t){"use no memo";const r=n5(),n=s5(),o=la.useId;if(o){const i=o(),a=x.useMemo(()=>i.replace(/:/g,""),[i]);return t||`${n}${e}${a}`}return x.useMemo(()=>t||`${n}${e}${++r.current}`,[n,e,t,r])}function rs(...e){"use no memo";const t=x.useCallback(r=>{t.current=r;for(const n of e)typeof n=="function"?n(r):n&&(n.current=r)},[...e]);return t}const a5=e=>-1,l5=e=>{};function c5(){const{targetDocument:e}=$r(),t=e==null?void 0:e.defaultView,r=t?t.setTimeout:a5,n=t?t.clearTimeout:l5;return qC(r,n)}const t0=(e,t,r)=>Math.max(t,Math.min(r,e||0)),d5=parseInt(x.version,10)>=19;function I1(e){if(e)return d5?e.props.ref:e.ref}function r0(e,t){return(...r)=>{e==null||e(...r),t==null||t(...r)}}function wp(e,t){var r;const n=e;var o;return!!(!(n==null||(r=n.ownerDocument)===null||r===void 0)&&r.defaultView&&n instanceof n.ownerDocument.defaultView[(o=void 0)!==null&&o!==void 0?o:"HTMLElement"])}function O1(e){return!!e.type.isFluentTriggerComponent}function u5(e,t){return typeof e=="function"?e(t):e?q1(e,t):e||null}function q1(e,t){if(!x.isValidElement(e)||e.type===x.Fragment)throw new Error("A trigger element must be a single element for this component. Please ensure that you're not using React Fragments.");if(O1(e)){const r=q1(e.props.children,t);return x.cloneElement(e,void 0,r)}else return x.cloneElement(e,t)}function M1(e){return x.isValidElement(e)?O1(e)?M1(e.props.children):e:null}function f5(e){return e&&!!e._virtual}function p5(e){return f5(e)&&e._virtual.parent||null}function h5(e,t={}){if(!e)return null;if(!t.skipVirtual){const n=p5(e);if(n)return n}const r=e.parentNode;return r&&r.nodeType===11?r.host:r}function n0(e,t){e&&Object.assign(e,{_virtual:{parent:t}})}function m5(e,t){return{...t,[Di]:e}}function L1(e,t){return function(n,o,i,a,l){return e0(o)?t(m5(n,o),null,i,a,l):e0(n)?t(n,o,i,a,l):e(n,o,i,a,l)}}function D1(e){const{as:t,[_1]:r,[Di]:n,[Hc]:o,...i}=e,a=i,l=typeof n=="string"?t??n:n;return typeof l!="string"&&t&&(a.as=t),{elementType:l,props:a,renderFunction:o}}const Fo=HS,g5=(e,t,r)=>{const{elementType:n,renderFunction:o,props:i}=D1(e),a={...i,...t};return o?Fo.jsx(x.Fragment,{children:o(n,a)},r):Fo.jsx(n,a,r)},v5=(e,t,r)=>{const{elementType:n,renderFunction:o,props:i}=D1(e),a={...i,...t};return o?Fo.jsx(x.Fragment,{children:o(n,{...a,children:Fo.jsxs(x.Fragment,{children:a.children},void 0)})},r):Fo.jsxs(n,a,r)},de=L1(Fo.jsx,g5),Cr=L1(Fo.jsxs,v5),W1=x.createContext(void 0),b5={},x5=W1.Provider,y5=()=>{const e=x.useContext(W1);return e??b5},w5=(e,t)=>de(GC,{value:t.provider,children:de(MC,{value:t.theme,children:de(DC,{value:t.themeClassName,children:de(XC,{value:t.customStyleHooks_unstable,children:de(UC,{value:t.tooltip,children:de(sC,{dir:t.textDirection,children:de(x5,{value:t.iconDirection,children:de(KC,{value:t.overrides_unstable,children:Cr(e.root,{children:[R1()?null:de("style",{dangerouslySetInnerHTML:{__html:e.serverStyleProps.cssRule},...e.serverStyleProps.attributes}),e.root.children]})})})})})})})})});var k5=typeof WeakRef<"u",o0=class{constructor(e){k5&&typeof e=="object"?this._weakRef=new WeakRef(e):this._instance=e}deref(){var e,t;let r;return this._weakRef?(r=(e=this._weakRef)==null?void 0:e.deref(),r||delete this._weakRef):(r=this._instance,(t=r==null?void 0:r.isDisposed)!=null&&t.call(r)&&delete this._instance),r}},Mr="keyborg:focusin",_a="keyborg:focusout";function S5(e){const t=e.HTMLElement,r=t.prototype.focus;let n=!1;return t.prototype.focus=function(){n=!0},e.document.createElement("button").focus(),t.prototype.focus=r,n}var Pu=!1;function to(e){const t=e.focus;t.__keyborgNativeFocus?t.__keyborgNativeFocus.call(e):e.focus()}function j5(e){const t=e;Pu||(Pu=S5(t));const r=t.HTMLElement.prototype.focus;if(r.__keyborgNativeFocus)return;t.HTMLElement.prototype.focus=c;const n=new Set,o=f=>{const p=f.target;if(!p)return;const h=new CustomEvent(_a,{cancelable:!0,bubbles:!0,composed:!0,detail:{originalEvent:f}});p.dispatchEvent(h)},i=f=>{const p=f.target;if(!p)return;let h=f.composedPath()[0];const y=new Set;for(;h;)h.nodeType===Node.DOCUMENT_FRAGMENT_NODE?(y.add(h),h=h.host):h=h.parentNode;for(const m of n){const v=m.deref();(!v||!y.has(v))&&(n.delete(m),v&&(v.removeEventListener("focusin",i,!0),v.removeEventListener("focusout",o,!0)))}a(p,f.relatedTarget||void 0)},a=(f,p,h)=>{var y;const m=f.shadowRoot;if(m){for(const S of n)if(S.deref()===m)return;m.addEventListener("focusin",i,!0),m.addEventListener("focusout",o,!0),n.add(new o0(m));return}const v={relatedTarget:p,originalEvent:h},$=new CustomEvent(Mr,{cancelable:!0,bubbles:!0,composed:!0,detail:v});$.details=v,(Pu||l.lastFocusedProgrammatically)&&(v.isFocusedProgrammatically=f===((y=l.lastFocusedProgrammatically)==null?void 0:y.deref()),l.lastFocusedProgrammatically=void 0),f.dispatchEvent($)},l=t.__keyborgData={focusInHandler:i,focusOutHandler:o,shadowTargets:n};t.document.addEventListener("focusin",t.__keyborgData.focusInHandler,!0),t.document.addEventListener("focusout",t.__keyborgData.focusOutHandler,!0);function c(){const f=t.__keyborgData;return f&&(f.lastFocusedProgrammatically=new o0(this)),r.apply(this,arguments)}let d=t.document.activeElement;for(;d&&d.shadowRoot;)a(d),d=d.shadowRoot.activeElement;c.__keyborgNativeFocus=r}function $5(e){const t=e,r=t.HTMLElement.prototype,n=r.focus.__keyborgNativeFocus,o=t.__keyborgData;if(o){t.document.removeEventListener("focusin",o.focusInHandler,!0),t.document.removeEventListener("focusout",o.focusOutHandler,!0);for(const i of o.shadowTargets){const a=i.deref();a&&(a.removeEventListener("focusin",o.focusInHandler,!0),a.removeEventListener("focusout",o.focusOutHandler,!0))}o.shadowTargets.clear(),delete t.__keyborgData}n&&(r.focus=n)}var C5=500,H1=0,_5=class{constructor(e,t){this._isNavigatingWithKeyboard_DO_NOT_USE=!1,this._onFocusIn=n=>{if(this._isMouseOrTouchUsedTimer||this.isNavigatingWithKeyboard)return;const o=n.detail;o.relatedTarget&&(o.isFocusedProgrammatically||o.isFocusedProgrammatically===void 0||(this.isNavigatingWithKeyboard=!0))},this._onMouseDown=n=>{n.buttons===0||n.clientX===0&&n.clientY===0&&n.screenX===0&&n.screenY===0||this._onMouseOrTouch()},this._onMouseOrTouch=()=>{const n=this._win;n&&(this._isMouseOrTouchUsedTimer&&n.clearTimeout(this._isMouseOrTouchUsedTimer),this._isMouseOrTouchUsedTimer=n.setTimeout(()=>{delete this._isMouseOrTouchUsedTimer},1e3)),this.isNavigatingWithKeyboard=!1},this._onKeyDown=n=>{this.isNavigatingWithKeyboard?this._shouldDismissKeyboardNavigation(n)&&this._scheduleDismiss():this._shouldTriggerKeyboardNavigation(n)&&(this.isNavigatingWithKeyboard=!0)},this.id="c"+ ++H1,this._win=e;const r=e.document;if(t){const n=t.triggerKeys,o=t.dismissKeys;n!=null&&n.length&&(this._triggerKeys=new Set(n)),o!=null&&o.length&&(this._dismissKeys=new Set(o))}r.addEventListener(Mr,this._onFocusIn,!0),r.addEventListener("mousedown",this._onMouseDown,!0),e.addEventListener("keydown",this._onKeyDown,!0),r.addEventListener("touchstart",this._onMouseOrTouch,!0),r.addEventListener("touchend",this._onMouseOrTouch,!0),r.addEventListener("touchcancel",this._onMouseOrTouch,!0),j5(e)}get isNavigatingWithKeyboard(){return this._isNavigatingWithKeyboard_DO_NOT_USE}set isNavigatingWithKeyboard(e){this._isNavigatingWithKeyboard_DO_NOT_USE!==e&&(this._isNavigatingWithKeyboard_DO_NOT_USE=e,this.update())}dispose(){const e=this._win;if(e){this._isMouseOrTouchUsedTimer&&(e.clearTimeout(this._isMouseOrTouchUsedTimer),this._isMouseOrTouchUsedTimer=void 0),this._dismissTimer&&(e.clearTimeout(this._dismissTimer),this._dismissTimer=void 0),$5(e);const t=e.document;t.removeEventListener(Mr,this._onFocusIn,!0),t.removeEventListener("mousedown",this._onMouseDown,!0),e.removeEventListener("keydown",this._onKeyDown,!0),t.removeEventListener("touchstart",this._onMouseOrTouch,!0),t.removeEventListener("touchend",this._onMouseOrTouch,!0),t.removeEventListener("touchcancel",this._onMouseOrTouch,!0),delete this._win}}isDisposed(){return!!this._win}update(){var e,t;const r=(t=(e=this._win)==null?void 0:e.__keyborg)==null?void 0:t.refs;if(r)for(const n of Object.keys(r))tm.update(r[n],this.isNavigatingWithKeyboard)}_shouldTriggerKeyboardNavigation(e){var t;if(e.key==="Tab")return!0;const r=(t=this._win)==null?void 0:t.document.activeElement,n=!this._triggerKeys||this._triggerKeys.has(e.keyCode),o=r&&(r.tagName==="INPUT"||r.tagName==="TEXTAREA"||r.isContentEditable);return n&&!o}_shouldDismissKeyboardNavigation(e){var t;return(t=this._dismissKeys)==null?void 0:t.has(e.keyCode)}_scheduleDismiss(){const e=this._win;if(e){this._dismissTimer&&(e.clearTimeout(this._dismissTimer),this._dismissTimer=void 0);const t=e.document.activeElement;this._dismissTimer=e.setTimeout(()=>{this._dismissTimer=void 0;const r=e.document.activeElement;t&&r&&t===r&&(this.isNavigatingWithKeyboard=!1)},C5)}}},tm=class U1{constructor(t,r){this._cb=[],this._id="k"+ ++H1,this._win=t;const n=t.__keyborg;n?(this._core=n.core,n.refs[this._id]=this):(this._core=new _5(t,r),t.__keyborg={core:this._core,refs:{[this._id]:this}})}static create(t,r){return new U1(t,r)}static dispose(t){t.dispose()}static update(t,r){t._cb.forEach(n=>n(r))}dispose(){var t;const r=(t=this._win)==null?void 0:t.__keyborg;r!=null&&r.refs[this._id]&&(delete r.refs[this._id],Object.keys(r.refs).length===0&&(r.core.dispose(),delete this._win.__keyborg)),this._cb=[],delete this._core,delete this._win}isNavigatingWithKeyboard(){var t;return!!((t=this._core)!=null&&t.isNavigatingWithKeyboard)}subscribe(t){this._cb.push(t)}unsubscribe(t){const r=this._cb.indexOf(t);r>=0&&this._cb.splice(r,1)}setVal(t){this._core&&(this._core.isNavigatingWithKeyboard=t)}};function rm(e,t){return tm.create(e,t)}function nm(e){tm.dispose(e)}/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 *//*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */const Yn="data-tabster",z5="data-tabster-dummy",V1=`:is(${["a[href]","button","input","select","textarea","*[tabindex]","*[contenteditable]","details > summary","audio[controls]","video[controls]"].join(", ")}):not(:disabled)`,gn={EscapeGroupper:1,Restorer:2,Deloser:3},Wi={Source:0,Target:1},lc={Unlimited:0,Limited:1,LimitedTrapFocus:2},i0={Enter:1},E5={Outside:2};/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */function Kt(e,t){var r;return(r=e.storageEntry(t))===null||r===void 0?void 0:r.tabster}function G1(e,t,r){var n,o,i;const a=r||e._noop?void 0:t.getAttribute(Yn);let l=e.storageEntry(t),c;if(a)if(a!==((n=l==null?void 0:l.attr)===null||n===void 0?void 0:n.string))try{const h=JSON.parse(a);if(typeof h!="object")throw new Error(`Value is not a JSON object, got '${a}'.`);c={string:a,object:h}}catch{}else return;else if(!l)return;l||(l=e.storageEntry(t,!0)),l.tabster||(l.tabster={});const d=l.tabster||{},f=((o=l.attr)===null||o===void 0?void 0:o.object)||{},p=(c==null?void 0:c.object)||{};for(const h of Object.keys(f))if(!p[h]){if(h==="root"){const y=d[h];y&&e.root.onRoot(y,!0)}switch(h){case"deloser":case"root":case"groupper":case"modalizer":case"restorer":case"mover":const y=d[h];y&&(y.dispose(),delete d[h]);break;case"observed":delete d[h],e.observedElement&&e.observedElement.onObservedElementUpdate(t);break;case"focusable":case"outline":case"uncontrolled":case"sys":delete d[h];break}}for(const h of Object.keys(p)){const y=p.sys;switch(h){case"deloser":d.deloser?d.deloser.setProps(p.deloser):e.deloser&&(d.deloser=e.deloser.createDeloser(t,p.deloser));break;case"root":d.root?d.root.setProps(p.root):d.root=e.root.createRoot(t,p.root,y),e.root.onRoot(d.root);break;case"modalizer":{let m;const v=e.modalizer;if(d.modalizer){const $=p.modalizer,S=$.id;S&&((i=f==null?void 0:f.modalizer)===null||i===void 0?void 0:i.id)!==S?(d.modalizer.dispose(),m=$):d.modalizer.setProps($)}else v&&(m=p.modalizer);v&&m&&(d.modalizer=v.createModalizer(t,m,y))}break;case"restorer":d.restorer?d.restorer.setProps(p.restorer):e.restorer&&p.restorer&&(d.restorer=e.restorer.createRestorer(t,p.restorer));break;case"focusable":d.focusable=p.focusable;break;case"groupper":d.groupper?d.groupper.setProps(p.groupper):e.groupper&&(d.groupper=e.groupper.createGroupper(t,p.groupper,y));break;case"mover":d.mover?d.mover.setProps(p.mover):e.mover&&(d.mover=e.mover.createMover(t,p.mover,y));break;case"observed":e.observedElement&&(d.observed=p.observed,e.observedElement.onObservedElementUpdate(t));break;case"uncontrolled":d.uncontrolled=p.uncontrolled;break;case"outline":e.outline&&(d.outline=p.outline);break;case"sys":d.sys=p.sys;break;default:console.error(`Unknown key '${h}' in data-tabster attribute value.`)}}c?l.attr=c:(Object.keys(d).length===0&&(delete l.tabster,delete l.attr),e.storageEntry(t,!1))}/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */const B5="tabster:focusin",T5="tabster:focusout",P5="tabster:movefocus",N5="tabster:modalizer:active",F5="tabster:modalizer:inactive",s0="tabster:groupper:movefocus",kp="tabster:restorer:restore-focus",R5="tabster:root:focus",A5="tabster:root:blur",I5=typeof CustomEvent<"u"?CustomEvent:function(){};class ao extends I5{constructor(t,r){super(t,{bubbles:!0,cancelable:!0,composed:!0,detail:r}),this.details=r}}class O5 extends ao{constructor(t){super(B5,t)}}class q5 extends ao{constructor(t){super(T5,t)}}class Ro extends ao{constructor(t){super(P5,t)}}class M5 extends ao{constructor(t){super(N5,t)}}class L5 extends ao{constructor(t){super(F5,t)}}class a0 extends ao{constructor(){super(kp)}}class D5 extends ao{constructor(t){super(R5,t)}}class W5 extends ao{constructor(t){super(A5,t)}}/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */const H5=e=>new MutationObserver(e),U5=(e,t,r,n)=>e.createTreeWalker(t,r,n),V5=e=>e?e.parentNode:null,G5=e=>e?e.parentElement:null,K5=(e,t)=>!!(t&&(e!=null&&e.contains(t))),Y5=e=>e.activeElement,X5=(e,t)=>e.querySelector(t),Q5=(e,t)=>Array.prototype.slice.call(e.querySelectorAll(t),0),J5=(e,t)=>e.getElementById(t),Z5=e=>(e==null?void 0:e.firstChild)||null,e_=e=>(e==null?void 0:e.lastChild)||null,t_=e=>(e==null?void 0:e.nextSibling)||null,r_=e=>(e==null?void 0:e.previousSibling)||null,n_=e=>(e==null?void 0:e.firstElementChild)||null,o_=e=>(e==null?void 0:e.lastElementChild)||null,i_=e=>(e==null?void 0:e.nextElementSibling)||null,s_=e=>(e==null?void 0:e.previousElementSibling)||null,a_=(e,t)=>e.appendChild(t),l_=(e,t,r)=>e.insertBefore(t,r),c_=e=>{var t;return((t=e.ownerDocument)===null||t===void 0?void 0:t.getSelection())||null},d_=(e,t)=>e.ownerDocument.getElementsByName(t),Y={createMutationObserver:H5,createTreeWalker:U5,getParentNode:V5,getParentElement:G5,nodeContains:K5,getActiveElement:Y5,querySelector:X5,querySelectorAll:Q5,getElementById:J5,getFirstChild:Z5,getLastChild:e_,getNextSibling:t_,getPreviousSibling:r_,getFirstElementChild:n_,getLastElementChild:o_,getNextElementSibling:i_,getPreviousElementSibling:s_,appendChild:a_,insertBefore:l_,getSelection:c_,getElementsByName:d_};function u_(e){for(const t of Object.keys(e))Y[t]=e[t]}/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */let Sp,f_=0;try{document.createTreeWalker(document,NodeFilter.SHOW_ELEMENT),Sp=!1}catch{Sp=!0}const Nu=100;function Go(e){const t=e();let r=t.__tabsterInstanceContext;return r||(r={elementByUId:{},basics:{Promise:t.Promise||void 0,WeakRef:t.WeakRef||void 0},containerBoundingRectCache:{},lastContainerBoundingRectCacheId:0,fakeWeakRefs:[],fakeWeakRefsStarted:!1},t.__tabsterInstanceContext=r),r}function p_(e){const t=e.__tabsterInstanceContext;t&&(t.elementByUId={},delete t.WeakRef,t.containerBoundingRectCache={},t.containerBoundingRectCacheTimer&&e.clearTimeout(t.containerBoundingRectCacheTimer),t.fakeWeakRefsTimer&&e.clearTimeout(t.fakeWeakRefsTimer),t.fakeWeakRefs=[],delete e.__tabsterInstanceContext)}function h_(e){const t=e.__tabsterInstanceContext;return new((t==null?void 0:t.basics.WeakMap)||WeakMap)}function m_(e){return!!e.querySelector(V1)}class K1{constructor(t){this._target=t}deref(){return this._target}static cleanup(t,r){return t._target?r||!om(t._target.ownerDocument,t._target)?(delete t._target,!0):!1:!0}}class xr{constructor(t,r,n){const o=Go(t);let i;o.WeakRef?i=new o.WeakRef(r):(i=new K1(r),o.fakeWeakRefs.push(i)),this._ref=i,this._data=n}get(){const t=this._ref;let r;return t&&(r=t.deref(),r||delete this._ref),r}getData(){return this._data}}function Y1(e,t){const r=Go(e);r.fakeWeakRefs=r.fakeWeakRefs.filter(n=>!K1.cleanup(n,t))}function X1(e){const t=Go(e);t.fakeWeakRefsStarted||(t.fakeWeakRefsStarted=!0,t.WeakRef=w_(t)),t.fakeWeakRefsTimer||(t.fakeWeakRefsTimer=e().setTimeout(()=>{t.fakeWeakRefsTimer=void 0,Y1(e),X1(e)},2*60*1e3))}function g_(e){const t=Go(e);t.fakeWeakRefsStarted=!1,t.fakeWeakRefsTimer&&(e().clearTimeout(t.fakeWeakRefsTimer),t.fakeWeakRefsTimer=void 0,t.fakeWeakRefs=[])}function Q1(e,t,r){if(t.nodeType!==Node.ELEMENT_NODE)return;const n=Sp?r:{acceptNode:r};return Y.createTreeWalker(e,t,NodeFilter.SHOW_ELEMENT,n,!1)}function v_(e){e.__shouldIgnoreFocus=!0}function J1(e){return!!e.__shouldIgnoreFocus}function b_(e){const t=new Uint32Array(4);if(e.crypto&&e.crypto.getRandomValues)e.crypto.getRandomValues(t);else if(e.msCrypto&&e.msCrypto.getRandomValues)e.msCrypto.getRandomValues(t);else for(let n=0;n<t.length;n++)t[n]=4294967295*Math.random();const r=[];for(let n=0;n<t.length;n++)r.push(t[n].toString(36));return r.push("|"),r.push((++f_).toString(36)),r.push("|"),r.push(Date.now().toString(36)),r.join("")}function x_(e,t){const r=Go(e);let n=t.__tabsterElementUID;return n||(n=t.__tabsterElementUID=b_(e())),!r.elementByUId[n]&&om(t.ownerDocument,t)&&(r.elementByUId[n]=new xr(e,t)),n}function l0(e,t){const r=Go(e);for(const n of Object.keys(r.elementByUId)){const o=r.elementByUId[n],i=o&&o.get();i&&t&&!Y.nodeContains(t,i)||delete r.elementByUId[n]}}function om(e,t){return Y.nodeContains(e==null?void 0:e.body,t)}function y_(e,t){const r=e.matches||e.matchesSelector||e.msMatchesSelector||e.webkitMatchesSelector;return r&&r.call(e,t)}function w_(e){return e.basics.WeakRef}let k_=0;class Bd{constructor(t,r,n){const o=t.getWindow;this._tabster=t,this._element=new xr(o,r),this._props={...n},this.id="i"+ ++k_}getElement(){return this._element.get()}getProps(){return this._props}setProps(t){this._props={...t}}}class Uc{constructor(t,r,n,o,i){var a;this._focusIn=f=>{if(this._fixedTarget){const h=this._fixedTarget.get();h&&to(h);return}const p=this.input;if(this.onFocusIn&&p){const h=f.relatedTarget;this.onFocusIn(this,this._isBackward(!0,p,h),h)}},this._focusOut=f=>{if(this._fixedTarget)return;this.useDefaultAction=!1;const p=this.input;if(this.onFocusOut&&p){const h=f.relatedTarget;this.onFocusOut(this,this._isBackward(!1,p,h),h)}};const l=t(),c=l.document.createElement("i");c.tabIndex=0,c.setAttribute("role","none"),c.setAttribute(z5,""),c.setAttribute("aria-hidden","true");const d=c.style;d.position="fixed",d.width=d.height="1px",d.opacity="0.001",d.zIndex="-1",d.setProperty("content-visibility","hidden"),v_(c),this.input=c,this.isFirst=n.isFirst,this.isOutside=r,this._isPhantom=(a=n.isPhantom)!==null&&a!==void 0?a:!1,this._fixedTarget=i,c.addEventListener("focusin",this._focusIn),c.addEventListener("focusout",this._focusOut),c.__tabsterDummyContainer=o,this._isPhantom&&(this._disposeTimer=l.setTimeout(()=>{delete this._disposeTimer,this.dispose()},0),this._clearDisposeTimeout=()=>{this._disposeTimer&&(l.clearTimeout(this._disposeTimer),delete this._disposeTimer),delete this._clearDisposeTimeout})}dispose(){var t;this._clearDisposeTimeout&&this._clearDisposeTimeout();const r=this.input;r&&(delete this._fixedTarget,delete this.onFocusIn,delete this.onFocusOut,delete this.input,r.removeEventListener("focusin",this._focusIn),r.removeEventListener("focusout",this._focusOut),delete r.__tabsterDummyContainer,(t=Y.getParentNode(r))===null||t===void 0||t.removeChild(r))}setTopLeft(t,r){var n;const o=(n=this.input)===null||n===void 0?void 0:n.style;o&&(o.top=`${t}px`,o.left=`${r}px`)}_isBackward(t,r,n){return t&&!n?!this.isFirst:!!(n&&r.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_FOLLOWING)}}const im={Root:1,Modalizer:2,Groupper:4};class za{constructor(t,r,n,o,i,a){this._element=r,this._instance=new j_(t,r,this,n,o,i,a)}_setHandlers(t,r){this._onFocusIn=t,this._onFocusOut=r}moveOut(t){var r;(r=this._instance)===null||r===void 0||r.moveOut(t)}moveOutWithDefaultAction(t,r){var n;(n=this._instance)===null||n===void 0||n.moveOutWithDefaultAction(t,r)}getHandler(t){return t?this._onFocusIn:this._onFocusOut}setTabbable(t){var r;(r=this._instance)===null||r===void 0||r.setTabbable(this,t)}dispose(){this._instance&&(this._instance.dispose(this),delete this._instance),delete this._onFocusIn,delete this._onFocusOut}static moveWithPhantomDummy(t,r,n,o,i){const l=new Uc(t.getWindow,!0,{isPhantom:!0,isFirst:!0}).input;if(l){let c,d;if(r.tagName==="BODY")c=r,d=n&&o||!n&&!o?Y.getFirstElementChild(r):null;else{n&&(!o||o&&!t.focusable.isFocusable(r,!1,!0,!0))?(c=r,d=o?r.firstElementChild:null):(c=Y.getParentElement(r),d=n&&o||!n&&!o?r:Y.getNextElementSibling(r));let f,p;do f=n&&o||!n&&!o?Y.getPreviousElementSibling(d):d,p=Td(f),p===r?d=n&&o||!n&&!o?f:Y.getNextElementSibling(f):p=null;while(p)}c!=null&&c.dispatchEvent(new Ro({by:"root",owner:c,next:null,relatedEvent:i}))&&(Y.insertBefore(c,l,d),to(l))}}static addPhantomDummyWithTarget(t,r,n,o){const a=new Uc(t.getWindow,!0,{isPhantom:!0,isFirst:!0},void 0,new xr(t.getWindow,o)).input;if(a){let l,c;m_(r)&&!n?(l=r,c=Y.getFirstElementChild(r)):(l=Y.getParentElement(r),c=n?r:Y.getNextElementSibling(r)),l&&Y.insertBefore(l,a,c)}}}class S_{constructor(t){this._updateQueue=new Set,this._lastUpdateQueueTime=0,this._changedParents=new WeakSet,this._dummyElements=[],this._dummyCallbacks=new WeakMap,this._domChanged=r=>{var n;this._changedParents.has(r)||(this._changedParents.add(r),!this._updateDummyInputsTimer&&(this._updateDummyInputsTimer=(n=this._win)===null||n===void 0?void 0:n.call(this).setTimeout(()=>{delete this._updateDummyInputsTimer;for(const o of this._dummyElements){const i=o.get();if(i){const a=this._dummyCallbacks.get(i);if(a){const l=Y.getParentNode(i);(!l||this._changedParents.has(l))&&a()}}}this._changedParents=new WeakSet},Nu)))},this._win=t}add(t,r){!this._dummyCallbacks.has(t)&&this._win&&(this._dummyElements.push(new xr(this._win,t)),this._dummyCallbacks.set(t,r),this.domChanged=this._domChanged)}remove(t){this._dummyElements=this._dummyElements.filter(r=>{const n=r.get();return n&&n!==t}),this._dummyCallbacks.delete(t),this._dummyElements.length===0&&delete this.domChanged}dispose(){var t;const r=(t=this._win)===null||t===void 0?void 0:t.call(this);this._updateTimer&&(r==null||r.clearTimeout(this._updateTimer),delete this._updateTimer),this._updateDummyInputsTimer&&(r==null||r.clearTimeout(this._updateDummyInputsTimer),delete this._updateDummyInputsTimer),this._changedParents=new WeakSet,this._dummyCallbacks=new WeakMap,this._dummyElements=[],this._updateQueue.clear(),delete this.domChanged,delete this._win}updatePositions(t){this._win&&(this._updateQueue.add(t),this._lastUpdateQueueTime=Date.now(),this._scheduledUpdatePositions())}_scheduledUpdatePositions(){var t;this._updateTimer||(this._updateTimer=(t=this._win)===null||t===void 0?void 0:t.call(this).setTimeout(()=>{if(delete this._updateTimer,this._lastUpdateQueueTime+Nu<=Date.now()){const r=new Map,n=[];for(const o of this._updateQueue)n.push(o(r));this._updateQueue.clear();for(const o of n)o();r.clear()}else this._scheduledUpdatePositions()},Nu))}}class j_{constructor(t,r,n,o,i,a,l){this._wrappers=[],this._isOutside=!1,this._transformElements=new Set,this._onFocusIn=(y,m,v)=>{this._onFocus(!0,y,m,v)},this._onFocusOut=(y,m,v)=>{this._onFocus(!1,y,m,v)},this.moveOut=y=>{var m;const v=this._firstDummy,$=this._lastDummy;if(v&&$){this._ensurePosition();const S=v.input,j=$.input,k=(m=this._element)===null||m===void 0?void 0:m.get();if(S&&j&&k){let w;y?(S.tabIndex=0,w=S):(j.tabIndex=0,w=j),w&&to(w)}}},this.moveOutWithDefaultAction=(y,m)=>{var v;const $=this._firstDummy,S=this._lastDummy;if($&&S){this._ensurePosition();const j=$.input,k=S.input,w=(v=this._element)===null||v===void 0?void 0:v.get();if(j&&k&&w){let _;y?!$.isOutside&&this._tabster.focusable.isFocusable(w,!0,!0,!0)?_=w:($.useDefaultAction=!0,j.tabIndex=0,_=j):(S.useDefaultAction=!0,k.tabIndex=0,_=k),_&&w.dispatchEvent(new Ro({by:"root",owner:w,next:null,relatedEvent:m}))&&to(_)}}},this.setTabbable=(y,m)=>{var v,$;for(const j of this._wrappers)if(j.manager===y){j.tabbable=m;break}const S=this._getCurrent();if(S){const j=S.tabbable?0:-1;let k=(v=this._firstDummy)===null||v===void 0?void 0:v.input;k&&(k.tabIndex=j),k=($=this._lastDummy)===null||$===void 0?void 0:$.input,k&&(k.tabIndex=j)}},this._addDummyInputs=()=>{this._addTimer||(this._addTimer=this._getWindow().setTimeout(()=>{delete this._addTimer,this._ensurePosition(),this._addTransformOffsets()},0))},this._addTransformOffsets=()=>{this._tabster._dummyObserver.updatePositions(this._computeTransformOffsets)},this._computeTransformOffsets=y=>{var m,v;const $=((m=this._firstDummy)===null||m===void 0?void 0:m.input)||((v=this._lastDummy)===null||v===void 0?void 0:v.input),S=this._transformElements,j=new Set;let k=0,w=0;const _=this._getWindow();for(let B=$;B&&B.nodeType===Node.ELEMENT_NODE;B=Y.getParentElement(B)){let E=y.get(B);if(E===void 0){const N=_.getComputedStyle(B).transform;N&&N!=="none"&&(E={scrollTop:B.scrollTop,scrollLeft:B.scrollLeft}),y.set(B,E||null)}E&&(j.add(B),S.has(B)||B.addEventListener("scroll",this._addTransformOffsets),k+=E.scrollTop,w+=E.scrollLeft)}for(const B of S)j.has(B)||B.removeEventListener("scroll",this._addTransformOffsets);return this._transformElements=j,()=>{var B,E;(B=this._firstDummy)===null||B===void 0||B.setTopLeft(k,w),(E=this._lastDummy)===null||E===void 0||E.setTopLeft(k,w)}};const c=r.get();if(!c)throw new Error("No element");this._tabster=t,this._getWindow=t.getWindow,this._callForDefaultAction=l;const d=c.__tabsterDummy;if((d||this)._wrappers.push({manager:n,priority:o,tabbable:!0}),d)return d;c.__tabsterDummy=this;const f=i==null?void 0:i.dummyInputsPosition,p=c.tagName;this._isOutside=f?f===E5.Outside:(a||p==="UL"||p==="OL"||p==="TABLE")&&!(p==="LI"||p==="TD"||p==="TH"),this._firstDummy=new Uc(this._getWindow,this._isOutside,{isFirst:!0},r),this._lastDummy=new Uc(this._getWindow,this._isOutside,{isFirst:!1},r);const h=this._firstDummy.input;h&&t._dummyObserver.add(h,this._addDummyInputs),this._firstDummy.onFocusIn=this._onFocusIn,this._firstDummy.onFocusOut=this._onFocusOut,this._lastDummy.onFocusIn=this._onFocusIn,this._lastDummy.onFocusOut=this._onFocusOut,this._element=r,this._addDummyInputs()}dispose(t,r){var n,o,i,a;if((this._wrappers=this._wrappers.filter(c=>c.manager!==t&&!r)).length===0){delete((n=this._element)===null||n===void 0?void 0:n.get()).__tabsterDummy;for(const f of this._transformElements)f.removeEventListener("scroll",this._addTransformOffsets);this._transformElements.clear();const c=this._getWindow();this._addTimer&&(c.clearTimeout(this._addTimer),delete this._addTimer);const d=(o=this._firstDummy)===null||o===void 0?void 0:o.input;d&&this._tabster._dummyObserver.remove(d),(i=this._firstDummy)===null||i===void 0||i.dispose(),(a=this._lastDummy)===null||a===void 0||a.dispose()}}_onFocus(t,r,n,o){var i;const a=this._getCurrent();a&&(!r.useDefaultAction||this._callForDefaultAction)&&((i=a.manager.getHandler(t))===null||i===void 0||i(r,n,o))}_getCurrent(){return this._wrappers.sort((t,r)=>t.tabbable!==r.tabbable?t.tabbable?-1:1:t.priority-r.priority),this._wrappers[0]}_ensurePosition(){var t,r,n;const o=(t=this._element)===null||t===void 0?void 0:t.get(),i=(r=this._firstDummy)===null||r===void 0?void 0:r.input,a=(n=this._lastDummy)===null||n===void 0?void 0:n.input;if(!(!o||!i||!a))if(this._isOutside){const l=Y.getParentNode(o);if(l){const c=Y.getNextSibling(o);c!==a&&Y.insertBefore(l,a,c),Y.getPreviousElementSibling(o)!==i&&Y.insertBefore(l,i,o)}}else{Y.getLastElementChild(o)!==a&&Y.appendChild(o,a);const l=Y.getFirstElementChild(o);l&&l!==i&&l.parentNode&&Y.insertBefore(l.parentNode,i,l)}}}function Z1(e){let t=null;for(let r=Y.getLastElementChild(e);r;r=Y.getLastElementChild(r))t=r;return t||void 0}function $_(e,t){let r=e,n=null;for(;r&&!n;)n=t?Y.getPreviousElementSibling(r):Y.getNextElementSibling(r),r=Y.getParentElement(r);return n||void 0}function Fu(e,t,r,n){const o=e.storageEntry(t,!0);let i=!1;if(!o.aug){if(n===void 0)return i;o.aug={}}if(n===void 0){if(r in o.aug){const a=o.aug[r];delete o.aug[r],a===null?t.removeAttribute(r):t.setAttribute(r,a),i=!0}}else{let a;r in o.aug||(a=t.getAttribute(r)),a!==void 0&&a!==n&&(o.aug[r]=a,n===null?t.removeAttribute(r):t.setAttribute(r,n),i=!0)}return n===void 0&&Object.keys(o.aug).length===0&&(delete o.aug,e.storageEntry(t,!1)),i}function C_(e){var t,r;const n=e.ownerDocument,o=(t=n.defaultView)===null||t===void 0?void 0:t.getComputedStyle(e);return e.offsetParent===null&&n.body!==e&&(o==null?void 0:o.position)!=="fixed"||(o==null?void 0:o.visibility)==="hidden"||(o==null?void 0:o.position)==="fixed"&&(o.display==="none"||((r=e.parentElement)===null||r===void 0?void 0:r.offsetParent)===null&&n.body!==e.parentElement)}function jp(e){return e.tagName==="INPUT"&&!!e.name&&e.type==="radio"}function __(e){if(!jp(e))return;const t=e.name;let r=Array.from(Y.getElementsByName(e,t)),n;return r=r.filter(o=>jp(o)?(o.checked&&(n=o),!0):!1),{name:t,buttons:new Set(r),checked:n}}function Td(e){var t;return((t=e==null?void 0:e.__tabsterDummyContainer)===null||t===void 0?void 0:t.get())||null}/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */function ew(e,t){return JSON.stringify(e)}function z_(e,t){for(const r of Object.keys(t)){const n=t[r];n?e[r]=n:delete e[r]}}function E_(e,t,r){let n;{const o=e.getAttribute(Yn);if(o)try{n=JSON.parse(o)}catch{}}n||(n={}),z_(n,t),Object.keys(n).length>0?e.setAttribute(Yn,ew(n)):e.removeAttribute(Yn)}class c0 extends za{constructor(t,r,n,o){super(t,r,im.Root,o,void 0,!0),this._onDummyInputFocus=i=>{var a;if(i.useDefaultAction)this._setFocused(!1);else{this._tabster.keyboardNavigation.setNavigatingWithKeyboard(!0);const l=this._element.get();if(l){this._setFocused(!0);const c=this._tabster.focusedElement.getFirstOrLastTabbable(i.isFirst,{container:l,ignoreAccessibility:!0});if(c){to(c);return}}(a=i.input)===null||a===void 0||a.blur()}},this._setHandlers(this._onDummyInputFocus),this._tabster=t,this._setFocused=n}}class B_ extends Bd{constructor(t,r,n,o,i){super(t,r,o),this._isFocused=!1,this._setFocused=d=>{var f;if(this._setFocusedTimer&&(this._tabster.getWindow().clearTimeout(this._setFocusedTimer),delete this._setFocusedTimer),this._isFocused===d)return;const p=this._element.get();p&&(d?(this._isFocused=!0,(f=this._dummyManager)===null||f===void 0||f.setTabbable(!1),p.dispatchEvent(new D5({element:p}))):this._setFocusedTimer=this._tabster.getWindow().setTimeout(()=>{var h;delete this._setFocusedTimer,this._isFocused=!1,(h=this._dummyManager)===null||h===void 0||h.setTabbable(!0),p.dispatchEvent(new W5({element:p}))},0))},this._onFocusIn=d=>{const f=this._tabster.getParent,p=this._element.get();let h=d.composedPath()[0];do{if(h===p){this._setFocused(!0);return}h=h&&f(h)}while(h)},this._onFocusOut=()=>{this._setFocused(!1)},this._onDispose=n;const a=t.getWindow;this.uid=x_(a,r),this._sys=i,(t.controlTab||t.rootDummyInputs)&&this.addDummyInputs();const c=a().document;c.addEventListener(Mr,this._onFocusIn),c.addEventListener(_a,this._onFocusOut),this._add()}addDummyInputs(){this._dummyManager||(this._dummyManager=new c0(this._tabster,this._element,this._setFocused,this._sys))}dispose(){var t;this._onDispose(this);const r=this._tabster.getWindow(),n=r.document;n.removeEventListener(Mr,this._onFocusIn),n.removeEventListener(_a,this._onFocusOut),this._setFocusedTimer&&(r.clearTimeout(this._setFocusedTimer),delete this._setFocusedTimer),(t=this._dummyManager)===null||t===void 0||t.dispose(),this._remove()}moveOutWithDefaultAction(t,r){const n=this._dummyManager;if(n)n.moveOutWithDefaultAction(t,r);else{const o=this.getElement();o&&c0.moveWithPhantomDummy(this._tabster,o,!0,t,r)}}_add(){}_remove(){}}class Ee{constructor(t,r){this._autoRootWaiting=!1,this._roots={},this._forceDummy=!1,this.rootById={},this._autoRootCreate=()=>{var n;const o=this._win().document,i=o.body;if(i){this._autoRootUnwait(o);const a=this._autoRoot;if(a)return E_(i,{root:a}),G1(this._tabster,i),(n=Kt(this._tabster,i))===null||n===void 0?void 0:n.root}else this._autoRootWaiting||(this._autoRootWaiting=!0,o.addEventListener("readystatechange",this._autoRootCreate))},this._onRootDispose=n=>{delete this._roots[n.id]},this._tabster=t,this._win=t.getWindow,this._autoRoot=r,t.queueInit(()=>{this._autoRoot&&this._autoRootCreate()})}_autoRootUnwait(t){t.removeEventListener("readystatechange",this._autoRootCreate),this._autoRootWaiting=!1}dispose(){const t=this._win();this._autoRootUnwait(t.document),delete this._autoRoot,Object.keys(this._roots).forEach(r=>{this._roots[r]&&(this._roots[r].dispose(),delete this._roots[r])}),this.rootById={}}createRoot(t,r,n){const o=new B_(this._tabster,t,this._onRootDispose,r,n);return this._roots[o.id]=o,this._forceDummy&&o.addDummyInputs(),o}addDummyInputs(){this._forceDummy=!0;const t=this._roots;for(const r of Object.keys(t))t[r].addDummyInputs()}static getRootByUId(t,r){const n=t().__tabsterInstance;return n&&n.root.rootById[r]}static getTabsterContext(t,r,n={}){var o,i,a,l;if(!r.ownerDocument)return;const{checkRtl:c,referenceElement:d}=n,f=t.getParent;t.drainInitQueue();let p,h,y,m,v=!1,$,S,j,k,w=d||r;const _={};for(;w&&(!p||c);){const E=Kt(t,w);if(c&&j===void 0){const M=w.dir;M&&(j=M.toLowerCase()==="rtl")}if(!E){w=f(w);continue}const N=w.tagName;(E.uncontrolled||N==="IFRAME"||N==="WEBVIEW")&&t.focusable.isVisible(w)&&(k=w),!m&&(!((o=E.focusable)===null||o===void 0)&&o.excludeFromMover)&&!y&&(v=!0);const L=E.modalizer,V=E.groupper,R=E.mover;!h&&L&&(h=L),!y&&V&&(!h||L)&&(h?(!V.isActive()&&V.getProps().tabbability&&h.userId!==((i=t.modalizer)===null||i===void 0?void 0:i.activeId)&&(h=void 0,y=V),S=V):y=V),!m&&R&&(!h||L)&&(!V||w!==r)&&w.contains(r)&&(m=R,$=!!y&&y!==V),E.root&&(p=E.root),!((a=E.focusable)===null||a===void 0)&&a.ignoreKeydown&&Object.assign(_,E.focusable.ignoreKeydown),w=f(w)}if(!p){const E=t.root;E._autoRoot&&!((l=r.ownerDocument)===null||l===void 0)&&l.body&&(p=E._autoRootCreate())}return y&&!m&&($=!0),p?{root:p,modalizer:h,groupper:y,mover:m,groupperBeforeMover:$,modalizerInGroupper:S,rtl:c?!!j:void 0,uncontrolled:k,excludedFromMover:v,ignoreKeydown:E=>!!_[E.key]}:void 0}static getRoot(t,r){var n;const o=t.getParent;for(let i=r;i;i=o(i)){const a=(n=Kt(t,i))===null||n===void 0?void 0:n.root;if(a)return a}}onRoot(t,r){r?delete this.rootById[t.uid]:this.rootById[t.uid]=t}}/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */class tw{constructor(){this._callbacks=[]}dispose(){this._callbacks=[],delete this._val}subscribe(t){const r=this._callbacks;r.indexOf(t)<0&&r.push(t)}subscribeFirst(t){const r=this._callbacks,n=r.indexOf(t);n>=0&&r.splice(n,1),r.unshift(t)}unsubscribe(t){const r=this._callbacks.indexOf(t);r>=0&&this._callbacks.splice(r,1)}setVal(t,r){this._val!==t&&(this._val=t,this._callCallbacks(t,r))}getVal(){return this._val}trigger(t,r){this._callCallbacks(t,r)}_callCallbacks(t,r){this._callbacks.forEach(n=>n(t,r))}}/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */class T_{constructor(t){this._tabster=t}dispose(){}getProps(t){const r=Kt(this._tabster,t);return r&&r.focusable||{}}isFocusable(t,r,n,o){return y_(t,V1)&&(r||t.tabIndex!==-1)?(n||this.isVisible(t))&&(o||this.isAccessible(t)):!1}isVisible(t){if(!t.ownerDocument||t.nodeType!==Node.ELEMENT_NODE||C_(t))return!1;const r=t.ownerDocument.body.getBoundingClientRect();return!(r.width===0&&r.height===0)}isAccessible(t){var r;for(let n=t;n;n=Y.getParentElement(n)){const o=Kt(this._tabster,n);if(this._isHidden(n)||!((r=o==null?void 0:o.focusable)===null||r===void 0?void 0:r.ignoreAriaDisabled)&&this._isDisabled(n))return!1}return!0}_isDisabled(t){return t.hasAttribute("disabled")}_isHidden(t){var r;const n=t.getAttribute("aria-hidden");return!!(n&&n.toLowerCase()==="true"&&!(!((r=this._tabster.modalizer)===null||r===void 0)&&r.isAugmented(t)))}findFirst(t,r){return this.findElement({...t},r)}findLast(t,r){return this.findElement({isBackward:!0,...t},r)}findNext(t,r){return this.findElement({...t},r)}findPrev(t,r){return this.findElement({...t,isBackward:!0},r)}findDefault(t,r){return this.findElement({...t,acceptCondition:n=>this.isFocusable(n,t.includeProgrammaticallyFocusable)&&!!this.getProps(n).isDefault},r)||null}findAll(t){return this._findElements(!0,t)||[]}findElement(t,r){const n=this._findElements(!1,t,r);return n&&n[0]}_findElements(t,r,n){var o,i,a;const{container:l,currentElement:c=null,includeProgrammaticallyFocusable:d,useActiveModalizer:f,ignoreAccessibility:p,modalizerId:h,isBackward:y,onElement:m}=r;n||(n={});const v=[];let{acceptCondition:$}=r;const S=!!$;if(!l)return null;$||($=_=>this.isFocusable(_,d,!1,p));const j={container:l,modalizerUserId:h===void 0&&f?(o=this._tabster.modalizer)===null||o===void 0?void 0:o.activeId:h||((a=(i=Ee.getTabsterContext(this._tabster,l))===null||i===void 0?void 0:i.modalizer)===null||a===void 0?void 0:a.userId),from:c||l,isBackward:y,isFindAll:t,acceptCondition:$,hasCustomCondition:S,includeProgrammaticallyFocusable:d,ignoreAccessibility:p,cachedGrouppers:{},cachedRadioGroups:{}},k=Q1(l.ownerDocument,l,_=>this._acceptElement(_,j));if(!k)return null;const w=_=>{var B,E;const N=(B=j.foundElement)!==null&&B!==void 0?B:j.foundBackward;return N&&v.push(N),t?N&&(j.found=!1,delete j.foundElement,delete j.foundBackward,delete j.fromCtx,j.from=N,m&&!m(N))?!1:!!(N||_):(N&&n&&(n.uncontrolled=(E=Ee.getTabsterContext(this._tabster,N))===null||E===void 0?void 0:E.uncontrolled),!!(_&&!N))};if(c||(n.outOfDOMOrder=!0),c&&Y.nodeContains(l,c))k.currentNode=c;else if(y){const _=Z1(l);if(!_)return null;if(this._acceptElement(_,j)===NodeFilter.FILTER_ACCEPT&&!w(!0))return j.skippedFocusable&&(n.outOfDOMOrder=!0),v;k.currentNode=_}do y?k.previousNode():k.nextNode();while(w());return j.skippedFocusable&&(n.outOfDOMOrder=!0),v.length?v:null}_acceptElement(t,r){var n,o,i;if(r.found)return NodeFilter.FILTER_ACCEPT;const a=r.foundBackward;if(a&&(t===a||!Y.nodeContains(a,t)))return r.found=!0,r.foundElement=a,NodeFilter.FILTER_ACCEPT;const l=r.container;if(t===l)return NodeFilter.FILTER_SKIP;if(!Y.nodeContains(l,t)||Td(t)||Y.nodeContains(r.rejectElementsFrom,t))return NodeFilter.FILTER_REJECT;const c=r.currentCtx=Ee.getTabsterContext(this._tabster,t);if(!c)return NodeFilter.FILTER_SKIP;if(J1(t))return this.isFocusable(t,void 0,!0,!0)&&(r.skippedFocusable=!0),NodeFilter.FILTER_SKIP;if(!r.hasCustomCondition&&(t.tagName==="IFRAME"||t.tagName==="WEBVIEW"))return this.isVisible(t)&&((n=c.modalizer)===null||n===void 0?void 0:n.userId)===((o=this._tabster.modalizer)===null||o===void 0?void 0:o.activeId)?(r.found=!0,r.rejectElementsFrom=r.foundElement=t,NodeFilter.FILTER_ACCEPT):NodeFilter.FILTER_REJECT;if(!r.ignoreAccessibility&&!this.isAccessible(t))return this.isFocusable(t,!1,!0,!0)&&(r.skippedFocusable=!0),NodeFilter.FILTER_REJECT;let d,f=r.fromCtx;f||(f=r.fromCtx=Ee.getTabsterContext(this._tabster,r.from));const p=f==null?void 0:f.mover;let h=c.groupper,y=c.mover;if(d=(i=this._tabster.modalizer)===null||i===void 0?void 0:i.acceptElement(t,r),d!==void 0&&(r.skippedFocusable=!0),d===void 0&&(h||y||p)){const m=h==null?void 0:h.getElement(),v=p==null?void 0:p.getElement();let $=y==null?void 0:y.getElement();if($&&Y.nodeContains(v,$)&&Y.nodeContains(l,v)&&(!m||!y||Y.nodeContains(v,m))&&(y=p,$=v),m){if(m===l||!Y.nodeContains(l,m))h=void 0;else if(!Y.nodeContains(m,t))return NodeFilter.FILTER_REJECT}if($){if(!Y.nodeContains(l,$))y=void 0;else if(!Y.nodeContains($,t))return NodeFilter.FILTER_REJECT}h&&y&&($&&m&&!Y.nodeContains(m,$)?y=void 0:h=void 0),h&&(d=h.acceptElement(t,r)),y&&(d=y.acceptElement(t,r))}if(d===void 0&&(d=r.acceptCondition(t)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP,d===NodeFilter.FILTER_SKIP&&this.isFocusable(t,!1,!0,!0)&&(r.skippedFocusable=!0)),d===NodeFilter.FILTER_ACCEPT&&!r.found){if(!r.isFindAll&&jp(t)&&!t.checked){const m=t.name;let v=r.cachedRadioGroups[m];if(v||(v=__(t),v&&(r.cachedRadioGroups[m]=v)),v!=null&&v.checked&&v.checked!==t)return NodeFilter.FILTER_SKIP}r.isBackward?(r.foundBackward=t,d=NodeFilter.FILTER_SKIP):(r.found=!0,r.foundElement=t)}return d}}/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */const ji={Tab:"Tab",Enter:"Enter",Escape:"Escape"};/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */function P_(e,t){var r;const n=e.getParent;let o=t;do{const i=(r=Kt(e,o))===null||r===void 0?void 0:r.uncontrolled;if(i&&e.uncontrolled.isUncontrolledCompletely(o,!!i.completely))return o;o=n(o)}while(o)}const d0={[gn.Restorer]:0,[gn.Deloser]:1,[gn.EscapeGroupper]:2};class nt extends tw{constructor(t,r){super(),this._init=()=>{const n=this._win(),o=n.document;o.addEventListener(Mr,this._onFocusIn,!0),o.addEventListener(_a,this._onFocusOut,!0),n.addEventListener("keydown",this._onKeyDown,!0);const i=Y.getActiveElement(o);i&&i!==o.body&&this._setFocusedElement(i),this.subscribe(this._onChanged)},this._onFocusIn=n=>{const o=n.composedPath()[0];o&&this._setFocusedElement(o,n.detail.relatedTarget,n.detail.isFocusedProgrammatically)},this._onFocusOut=n=>{var o;this._setFocusedElement(void 0,(o=n.detail)===null||o===void 0?void 0:o.originalEvent.relatedTarget)},this._validateFocusedElement=n=>{},this._onKeyDown=n=>{if(n.key!==ji.Tab||n.ctrlKey)return;const o=this.getVal();if(!o||!o.ownerDocument||o.contentEditable==="true")return;const i=this._tabster,a=i.controlTab,l=Ee.getTabsterContext(i,o);if(!l||l.ignoreKeydown(n))return;const c=n.shiftKey,d=nt.findNextTabbable(i,l,void 0,o,void 0,c,!0),f=l.root.getElement();if(!f)return;const p=d==null?void 0:d.element,h=P_(i,o);if(p){const y=d.uncontrolled;if(l.uncontrolled||Y.nodeContains(y,o)){if(!d.outOfDOMOrder&&y===l.uncontrolled||h&&!Y.nodeContains(h,p))return;za.addPhantomDummyWithTarget(i,o,c,p);return}if(y&&i.focusable.isVisible(y)||p.tagName==="IFRAME"&&i.focusable.isVisible(p)){f.dispatchEvent(new Ro({by:"root",owner:f,next:p,relatedEvent:n}))&&za.moveWithPhantomDummy(i,y??p,!1,c,n);return}(a||d!=null&&d.outOfDOMOrder)&&f.dispatchEvent(new Ro({by:"root",owner:f,next:p,relatedEvent:n}))&&(n.preventDefault(),n.stopImmediatePropagation(),to(p))}else!h&&f.dispatchEvent(new Ro({by:"root",owner:f,next:null,relatedEvent:n}))&&l.root.moveOutWithDefaultAction(c,n)},this._onChanged=(n,o)=>{var i,a;if(n)n.dispatchEvent(new O5(o));else{const l=(i=this._lastVal)===null||i===void 0?void 0:i.get();if(l){const c={...o},d=Ee.getTabsterContext(this._tabster,l),f=(a=d==null?void 0:d.modalizer)===null||a===void 0?void 0:a.userId;f&&(c.modalizerId=f),l.dispatchEvent(new q5(c))}}},this._tabster=t,this._win=r,t.queueInit(this._init)}dispose(){super.dispose();const t=this._win(),r=t.document;r.removeEventListener(Mr,this._onFocusIn,!0),r.removeEventListener(_a,this._onFocusOut,!0),t.removeEventListener("keydown",this._onKeyDown,!0),this.unsubscribe(this._onChanged);const n=this._asyncFocus;n&&(t.clearTimeout(n.timeout),delete this._asyncFocus),delete nt._lastResetElement,delete this._nextVal,delete this._lastVal}static forgetMemorized(t,r){var n,o;let i=nt._lastResetElement,a=i&&i.get();a&&Y.nodeContains(r,a)&&delete nt._lastResetElement,a=(o=(n=t._nextVal)===null||n===void 0?void 0:n.element)===null||o===void 0?void 0:o.get(),a&&Y.nodeContains(r,a)&&delete t._nextVal,i=t._lastVal,a=i&&i.get(),a&&Y.nodeContains(r,a)&&delete t._lastVal}getFocusedElement(){return this.getVal()}getLastFocusedElement(){var t;let r=(t=this._lastVal)===null||t===void 0?void 0:t.get();return(!r||r&&!om(r.ownerDocument,r))&&(this._lastVal=r=void 0),r}focus(t,r,n,o){return this._tabster.focusable.isFocusable(t,r,!1,n)?(t.focus({preventScroll:o}),!0):!1}focusDefault(t){const r=this._tabster.focusable.findDefault({container:t});return r?(this._tabster.focusedElement.focus(r),!0):!1}getFirstOrLastTabbable(t,r){var n;const{container:o,ignoreAccessibility:i}=r;let a;if(o){const l=Ee.getTabsterContext(this._tabster,o);l&&(a=(n=nt.findNextTabbable(this._tabster,l,o,void 0,void 0,!t,i))===null||n===void 0?void 0:n.element)}return a&&!Y.nodeContains(o,a)&&(a=void 0),a||void 0}_focusFirstOrLast(t,r){const n=this.getFirstOrLastTabbable(t,r);return n?(this.focus(n,!1,!0),!0):!1}focusFirst(t){return this._focusFirstOrLast(!0,t)}focusLast(t){return this._focusFirstOrLast(!1,t)}resetFocus(t){if(!this._tabster.focusable.isVisible(t))return!1;if(this._tabster.focusable.isFocusable(t,!0,!0,!0))this.focus(t);else{const r=t.getAttribute("tabindex"),n=t.getAttribute("aria-hidden");t.tabIndex=-1,t.setAttribute("aria-hidden","true"),nt._lastResetElement=new xr(this._win,t),this.focus(t,!0,!0),this._setOrRemoveAttribute(t,"tabindex",r),this._setOrRemoveAttribute(t,"aria-hidden",n)}return!0}requestAsyncFocus(t,r,n){const o=this._tabster.getWindow(),i=this._asyncFocus;if(i){if(d0[t]>d0[i.source])return;o.clearTimeout(i.timeout)}this._asyncFocus={source:t,callback:r,timeout:o.setTimeout(()=>{this._asyncFocus=void 0,r()},n)}}cancelAsyncFocus(t){const r=this._asyncFocus;(r==null?void 0:r.source)===t&&(this._tabster.getWindow().clearTimeout(r.timeout),this._asyncFocus=void 0)}_setOrRemoveAttribute(t,r,n){n===null?t.removeAttribute(r):t.setAttribute(r,n)}_setFocusedElement(t,r,n){var o,i;if(this._tabster._noop)return;const a={relatedTarget:r};if(t){const c=(o=nt._lastResetElement)===null||o===void 0?void 0:o.get();if(nt._lastResetElement=void 0,c===t||J1(t))return;a.isFocusedProgrammatically=n;const d=Ee.getTabsterContext(this._tabster,t),f=(i=d==null?void 0:d.modalizer)===null||i===void 0?void 0:i.userId;f&&(a.modalizerId=f)}const l=this._nextVal={element:t?new xr(this._win,t):void 0,detail:a};t&&t!==this._val&&this._validateFocusedElement(t),this._nextVal===l&&this.setVal(t,a),this._nextVal=void 0}setVal(t,r){super.setVal(t,r),t&&(this._lastVal=new xr(this._win,t))}static findNextTabbable(t,r,n,o,i,a,l){const c=n||r.root.getElement();if(!c)return null;let d=null;const f=nt._isTabbingTimer,p=t.getWindow();f&&p.clearTimeout(f),nt.isTabbing=!0,nt._isTabbingTimer=p.setTimeout(()=>{delete nt._isTabbingTimer,nt.isTabbing=!1},0);const h=r.modalizer,y=r.groupper,m=r.mover,v=$=>{if(d=$.findNextTabbable(o,i,a,l),o&&!(d!=null&&d.element)){const S=$!==h&&Y.getParentElement($.getElement());if(S){const j=Ee.getTabsterContext(t,o,{referenceElement:S});if(j){const k=$.getElement(),w=a?k:k&&Z1(k)||k;w&&(d=nt.findNextTabbable(t,j,n,w,S,a,l),d&&(d.outOfDOMOrder=!0))}}}};if(y&&m)v(r.groupperBeforeMover?y:m);else if(y)v(y);else if(m)v(m);else if(h)v(h);else{const $={container:c,currentElement:o,referenceElement:i,ignoreAccessibility:l,useActiveModalizer:!0},S={};d={element:t.focusable[a?"findPrev":"findNext"]($,S),outOfDOMOrder:S.outOfDOMOrder,uncontrolled:S.uncontrolled}}return d}}nt.isTabbing=!1;/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */class N_ extends za{constructor(t,r,n,o){super(n,t,im.Groupper,o,!0),this._setHandlers((i,a,l)=>{var c,d;const f=t.get(),p=i.input;if(f&&p){const h=Ee.getTabsterContext(n,p);if(h){let y;y=(c=r.findNextTabbable(l||void 0,void 0,a,!0))===null||c===void 0?void 0:c.element,y||(y=(d=nt.findNextTabbable(n,h,void 0,i.isOutside?p:$_(f,!a),void 0,a,!0))===null||d===void 0?void 0:d.element),y&&to(y)}}})}}class F_ extends Bd{constructor(t,r,n,o,i){super(t,r,o),this._shouldTabInside=!1,this.makeTabbable(!1),this._onDispose=n,t.controlTab||(this.dummyManager=new N_(this._element,this,t,i))}dispose(){var t;this._onDispose(this),this._element.get(),(t=this.dummyManager)===null||t===void 0||t.dispose(),delete this.dummyManager,delete this._first}findNextTabbable(t,r,n,o){const i=this.getElement();if(!i)return null;const a=Td(t)===i;if(!this._shouldTabInside&&t&&Y.nodeContains(i,t)&&!a)return{element:void 0,outOfDOMOrder:!0};const l=this.getFirst(!0);if(!t||!Y.nodeContains(i,t)||a)return{element:l,outOfDOMOrder:!0};const c=this._tabster;let d=null,f=!1,p;if(this._shouldTabInside&&l){const h={container:i,currentElement:t,referenceElement:r,ignoreAccessibility:o,useActiveModalizer:!0},y={};d=c.focusable[n?"findPrev":"findNext"](h,y),f=!!y.outOfDOMOrder,!d&&this._props.tabbability===lc.LimitedTrapFocus&&(d=c.focusable[n?"findLast":"findFirst"]({container:i,ignoreAccessibility:o,useActiveModalizer:!0},y),f=!0),p=y.uncontrolled}return{element:d,uncontrolled:p,outOfDOMOrder:f}}makeTabbable(t){this._shouldTabInside=t||!this._props.tabbability}isActive(t){var r;const n=this.getElement()||null;let o=!0;for(let a=Y.getParentElement(n);a;a=Y.getParentElement(a)){const l=(r=Kt(this._tabster,a))===null||r===void 0?void 0:r.groupper;l&&(l._shouldTabInside||(o=!1))}let i=o?this._props.tabbability?this._shouldTabInside:!1:void 0;if(i&&t){const a=this._tabster.focusedElement.getFocusedElement();a&&(i=a!==this.getFirst(!0))}return i}getFirst(t){var r;const n=this.getElement();let o;if(n){if(t&&this._tabster.focusable.isFocusable(n))return n;o=(r=this._first)===null||r===void 0?void 0:r.get(),o||(o=this._tabster.focusable.findFirst({container:n,useActiveModalizer:!0})||void 0,o&&this.setFirst(o))}return o}setFirst(t){t?this._first=new xr(this._tabster.getWindow,t):delete this._first}acceptElement(t,r){const n=r.cachedGrouppers,o=Y.getParentElement(this.getElement()),i=o&&Ee.getTabsterContext(this._tabster,o),a=i==null?void 0:i.groupper,l=i!=null&&i.groupperBeforeMover?a:void 0;let c;const d=h=>{let y=n[h.id],m;return y?m=y.isActive:(m=this.isActive(!0),y=n[h.id]={isActive:m}),m};if(l&&(c=l.getElement(),!d(l)&&c&&r.container!==c&&Y.nodeContains(r.container,c)))return r.skippedFocusable=!0,NodeFilter.FILTER_REJECT;const f=d(this),p=this.getElement();if(p&&f!==!0){if(p===t&&a&&(c||(c=a.getElement()),c&&!d(a)&&Y.nodeContains(r.container,c)&&c!==r.container)||p!==t&&Y.nodeContains(p,t))return r.skippedFocusable=!0,NodeFilter.FILTER_REJECT;const h=n[this.id];let y;if("first"in h?y=h.first:y=h.first=this.getFirst(!0),y&&r.acceptCondition(y))return r.rejectElementsFrom=p,r.skippedFocusable=!0,y!==r.from?(r.found=!0,r.foundElement=y,NodeFilter.FILTER_ACCEPT):NodeFilter.FILTER_REJECT}}}class R_{constructor(t,r){this._current={},this._grouppers={},this._init=()=>{const n=this._win();this._tabster.focusedElement.subscribeFirst(this._onFocus);const o=n.document,i=Y.getActiveElement(o);i&&this._onFocus(i),o.addEventListener("mousedown",this._onMouseDown,!0),n.addEventListener("keydown",this._onKeyDown,!0),n.addEventListener(s0,this._onMoveFocus)},this._onGroupperDispose=n=>{delete this._grouppers[n.id]},this._onFocus=n=>{n&&this._updateCurrent(n)},this._onMouseDown=n=>{let o=n.target;for(;o&&!this._tabster.focusable.isFocusable(o);)o=this._tabster.getParent(o);o&&this._updateCurrent(o)},this._onKeyDown=n=>{if(n.key!==ji.Enter&&n.key!==ji.Escape||n.ctrlKey||n.altKey||n.shiftKey||n.metaKey)return;const o=this._tabster.focusedElement.getFocusedElement();o&&this.handleKeyPress(o,n)},this._onMoveFocus=n=>{var o;const i=n.composedPath()[0],a=(o=n.detail)===null||o===void 0?void 0:o.action;i&&a!==void 0&&!n.defaultPrevented&&(a===i0.Enter?this._enterGroupper(i):this._escapeGroupper(i),n.stopImmediatePropagation())},this._tabster=t,this._win=r,t.queueInit(this._init)}dispose(){const t=this._win();this._tabster.focusedElement.cancelAsyncFocus(gn.EscapeGroupper),this._current={},this._updateTimer&&(t.clearTimeout(this._updateTimer),delete this._updateTimer),this._tabster.focusedElement.unsubscribe(this._onFocus),t.document.removeEventListener("mousedown",this._onMouseDown,!0),t.removeEventListener("keydown",this._onKeyDown,!0),t.removeEventListener(s0,this._onMoveFocus),Object.keys(this._grouppers).forEach(r=>{this._grouppers[r]&&(this._grouppers[r].dispose(),delete this._grouppers[r])})}createGroupper(t,r,n){const o=this._tabster,i=new F_(o,t,this._onGroupperDispose,r,n);this._grouppers[i.id]=i;const a=o.focusedElement.getFocusedElement();return a&&Y.nodeContains(t,a)&&!this._updateTimer&&(this._updateTimer=this._win().setTimeout(()=>{delete this._updateTimer,a===o.focusedElement.getFocusedElement()&&this._updateCurrent(a)},0)),i}forgetCurrentGrouppers(){this._current={}}_updateCurrent(t){var r;this._updateTimer&&(this._win().clearTimeout(this._updateTimer),delete this._updateTimer);const n=this._tabster,o={};for(let i=n.getParent(t);i;i=n.getParent(i)){const a=(r=Kt(n,i))===null||r===void 0?void 0:r.groupper;if(a){o[a.id]=!0,this._current[a.id]=a;const l=a.isActive()||t!==i&&(!a.getProps().delegated||a.getFirst(!1)!==t);a.makeTabbable(l)}}for(const i of Object.keys(this._current)){const a=this._current[i];a.id in o||(a.makeTabbable(!1),a.setFirst(void 0),delete this._current[i])}}_enterGroupper(t,r){const n=this._tabster,o=Ee.getTabsterContext(n,t),i=(o==null?void 0:o.groupper)||(o==null?void 0:o.modalizerInGroupper),a=i==null?void 0:i.getElement();if(i&&a&&(t===a||i.getProps().delegated&&t===i.getFirst(!1))){const l=n.focusable.findNext({container:a,currentElement:t,useActiveModalizer:!0});if(l&&(!r||r&&a.dispatchEvent(new Ro({by:"groupper",owner:a,next:l,relatedEvent:r}))))return r&&(r.preventDefault(),r.stopImmediatePropagation()),l.focus(),l}return null}_escapeGroupper(t,r,n){const o=this._tabster,i=Ee.getTabsterContext(o,t);let a=(i==null?void 0:i.groupper)||(i==null?void 0:i.modalizerInGroupper);const l=a==null?void 0:a.getElement();if(a&&l&&Y.nodeContains(l,t)){let c;if(t!==l||n)c=a.getFirst(!0);else{const d=Y.getParentElement(l),f=d?Ee.getTabsterContext(o,d):void 0;a=f==null?void 0:f.groupper,c=a==null?void 0:a.getFirst(!0)}if(c&&(!r||r&&l.dispatchEvent(new Ro({by:"groupper",owner:l,next:c,relatedEvent:r}))))return a&&a.makeTabbable(!1),c.focus(),c}return null}moveFocus(t,r){return r===i0.Enter?this._enterGroupper(t):this._escapeGroupper(t)}handleKeyPress(t,r,n){const o=this._tabster,i=Ee.getTabsterContext(o,t);if(i&&(i!=null&&i.groupper||i!=null&&i.modalizerInGroupper)){if(o.focusedElement.cancelAsyncFocus(gn.EscapeGroupper),i.ignoreKeydown(r))return;if(r.key===ji.Enter)this._enterGroupper(t,r);else if(r.key===ji.Escape){const a=o.focusedElement.getFocusedElement();o.focusedElement.requestAsyncFocus(gn.EscapeGroupper,()=>{a!==o.focusedElement.getFocusedElement()&&(n&&!a||!n)||this._escapeGroupper(t,r,n)},0)}}}}/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */class A_ extends tw{constructor(t){super(),this._onChange=r=>{this.setVal(r,void 0)},this._keyborg=rm(t()),this._keyborg.subscribe(this._onChange)}dispose(){super.dispose(),this._keyborg&&(this._keyborg.unsubscribe(this._onChange),nm(this._keyborg),delete this._keyborg)}setNavigatingWithKeyboard(t){var r;(r=this._keyborg)===null||r===void 0||r.setVal(t)}isNavigatingWithKeyboard(){var t;return!!(!((t=this._keyborg)===null||t===void 0)&&t.isNavigatingWithKeyboard())}}/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */let I_=0;const Ru="aria-hidden";class O_ extends za{constructor(t,r,n){super(r,t,im.Modalizer,n),this._setHandlers((o,i)=>{var a,l;const c=t.get(),d=c&&((a=Ee.getRoot(r,c))===null||a===void 0?void 0:a.getElement()),f=o.input;let p;if(d&&f){const h=Td(f),y=Ee.getTabsterContext(r,h||f);y&&(p=(l=nt.findNextTabbable(r,y,d,f,void 0,i,!0))===null||l===void 0?void 0:l.element),p&&to(p)}})}}class q_ extends Bd{constructor(t,r,n,o,i,a){super(t,r,o),this._wasFocused=0,this.userId=o.id,this._onDispose=n,this._activeElements=a,t.controlTab||(this.dummyManager=new O_(this._element,t,i))}makeActive(t){if(this._isActive!==t){this._isActive=t;const r=this.getElement();if(r){const n=this._activeElements,o=n.map(i=>i.get()).indexOf(r);t?o<0&&n.push(new xr(this._tabster.getWindow,r)):o>=0&&n.splice(o,1)}this._dispatchEvent(t)}}focused(t){return t||(this._wasFocused=++I_),this._wasFocused}setProps(t){t.id&&(this.userId=t.id),this._props={...t}}dispose(){var t;this.makeActive(!1),this._onDispose(this),(t=this.dummyManager)===null||t===void 0||t.dispose(),delete this.dummyManager,this._activeElements=[],this._remove()}isActive(){return!!this._isActive}contains(t){return Y.nodeContains(this.getElement(),t)}findNextTabbable(t,r,n,o){var i,a;if(!this.getElement())return null;const c=this._tabster;let d=null,f=!1,p;const h=t&&((i=Ee.getRoot(c,t))===null||i===void 0?void 0:i.getElement());if(h){const y={container:h,currentElement:t,referenceElement:r,ignoreAccessibility:o,useActiveModalizer:!0},m={};d=c.focusable[n?"findPrev":"findNext"](y,m),!d&&this._props.isTrapped&&(!((a=c.modalizer)===null||a===void 0)&&a.activeId)?(d=c.focusable[n?"findLast":"findFirst"]({container:h,ignoreAccessibility:o,useActiveModalizer:!0},m),d===null&&(d=t),f=!0):f=!!m.outOfDOMOrder,p=m.uncontrolled}return{element:d,uncontrolled:p,outOfDOMOrder:f}}_dispatchEvent(t,r){const n=this.getElement();let o=!1;if(n){const i=r?this._activeElements.map(a=>a.get()):[n];for(const a of i)if(a){const l={id:this.userId,element:n},c=t?new M5(l):new L5(l);a.dispatchEvent(c),c.defaultPrevented&&(o=!0)}}return o}_remove(){}}class M_{constructor(t,r,n){this._onModalizerDispose=i=>{const a=i.id,l=i.userId,c=this._parts[l];if(delete this._modalizers[a],c&&(delete c[a],Object.keys(c).length===0)){delete this._parts[l];const d=this._activationHistory,f=[];let p;for(let h=d.length;h--;){const y=d[h];y!==l&&y!==p&&(p=y,(y||f.length>0)&&f.unshift(y))}if(this._activationHistory=f,this.activeId===l){const h=f[0],y=h?Object.values(this._parts[h])[0]:void 0;this.setActive(y)}}},this._onKeyDown=i=>{var a;if(i.key!==ji.Escape)return;const l=this._tabster,c=l.focusedElement.getFocusedElement();if(c){const d=Ee.getTabsterContext(l,c),f=d==null?void 0:d.modalizer;if(d&&!d.groupper&&(f!=null&&f.isActive())&&!d.ignoreKeydown(i)){const p=f.userId;if(p){const h=this._parts[p];if(h){const y=Object.keys(h).map(m=>{var v;const $=h[m],S=$.getElement();let j;return S&&(j=(v=Kt(l,S))===null||v===void 0?void 0:v.groupper),$&&S&&j?{el:S,focusedSince:$.focused(!0)}:{focusedSince:0}}).filter(m=>m.focusedSince>0).sort((m,v)=>m.focusedSince>v.focusedSince?-1:m.focusedSince<v.focusedSince?1:0);if(y.length){const m=y[0].el;m&&((a=l.groupper)===null||a===void 0||a.handleKeyPress(m,i,!0))}}}}}},this._onFocus=(i,a)=>{var l;const c=this._tabster,d=i&&Ee.getTabsterContext(c,i);if(!d||!i)return;const f=this._augMap;for(let m=i;m;m=Y.getParentElement(m))f.has(m)&&(f.delete(m),Fu(c,m,Ru));let p=d.modalizer;const h=Kt(c,i),y=h==null?void 0:h.modalizer;if(y&&(y.focused(),y.userId===this.activeId&&h.groupper)){const m=c.getParent(i),v=m&&((l=Ee.getTabsterContext(c,m))===null||l===void 0?void 0:l.modalizer);if(v)p=v;else{this.setActive(void 0);return}}if(p==null||p.focused(),(p==null?void 0:p.userId)===this.activeId){this.currentIsOthersAccessible=p==null?void 0:p.getProps().isOthersAccessible;return}if(a.isFocusedProgrammatically||this.currentIsOthersAccessible||p!=null&&p.getProps().isAlwaysAccessible)this.setActive(p);else{const m=this._win();m.clearTimeout(this._restoreModalizerFocusTimer),this._restoreModalizerFocusTimer=m.setTimeout(()=>this._restoreModalizerFocus(i),100)}},this._tabster=t,this._win=t.getWindow,this._modalizers={},this._parts={},this._augMap=new WeakMap,this._aug=[],this._alwaysAccessibleSelector=r,this._accessibleCheck=n,this._activationHistory=[],this.activeElements=[],t.controlTab||t.root.addDummyInputs(),this._win().addEventListener("keydown",this._onKeyDown,!0),t.queueInit(()=>{this._tabster.focusedElement.subscribe(this._onFocus)})}dispose(){const t=this._win();t.removeEventListener("keydown",this._onKeyDown,!0),Object.keys(this._modalizers).forEach(r=>{this._modalizers[r]&&(this._modalizers[r].dispose(),delete this._modalizers[r])}),t.clearTimeout(this._restoreModalizerFocusTimer),t.clearTimeout(this._hiddenUpdateTimer),this._parts={},delete this.activeId,this.activeElements=[],this._augMap=new WeakMap,this._aug=[],this._tabster.focusedElement.unsubscribe(this._onFocus)}createModalizer(t,r,n){var o;const i=new q_(this._tabster,t,this._onModalizerDispose,r,n,this.activeElements),a=i.id,l=r.id;this._modalizers[a]=i;let c=this._parts[l];c||(c=this._parts[l]={}),c[a]=i;const d=(o=this._tabster.focusedElement.getFocusedElement())!==null&&o!==void 0?o:null;return t!==d&&Y.nodeContains(t,d)&&(l!==this.activeId?this.setActive(i):i.makeActive(!0)),i}isAugmented(t){return this._augMap.has(t)}hiddenUpdate(){this._hiddenUpdateTimer||(this._hiddenUpdateTimer=this._win().setTimeout(()=>{delete this._hiddenUpdateTimer,this._hiddenUpdate()},250))}setActive(t){const r=t==null?void 0:t.userId,n=this.activeId;if(n===r)return;if(this.activeId=r,n){const i=this._parts[n];if(i)for(const a of Object.keys(i))i[a].makeActive(!1)}if(r){const i=this._parts[r];if(i)for(const a of Object.keys(i))i[a].makeActive(!0)}this.currentIsOthersAccessible=t==null?void 0:t.getProps().isOthersAccessible,this.hiddenUpdate();const o=this._activationHistory;o[0]!==r&&(r!==void 0||o.length>0)&&o.unshift(r)}focus(t,r,n){const o=this._tabster,i=Ee.getTabsterContext(o,t),a=i==null?void 0:i.modalizer;if(a){this.setActive(a);const l=a.getProps(),c=a.getElement();if(c){if(r===void 0&&(r=l.isNoFocusFirst),!r&&o.keyboardNavigation.isNavigatingWithKeyboard()&&o.focusedElement.focusFirst({container:c})||(n===void 0&&(n=l.isNoFocusDefault),!n&&o.focusedElement.focusDefault(c)))return!0;o.focusedElement.resetFocus(c)}}return!1}activate(t){var r;const n=t?(r=Ee.getTabsterContext(this._tabster,t))===null||r===void 0?void 0:r.modalizer:void 0;return!t||n?(this.setActive(n),!0):!1}acceptElement(t,r){var n;const o=r.modalizerUserId,i=(n=r.currentCtx)===null||n===void 0?void 0:n.modalizer;if(o)for(const l of this.activeElements){const c=l.get();if(c&&(Y.nodeContains(t,c)||c===t))return NodeFilter.FILTER_SKIP}const a=o===(i==null?void 0:i.userId)||!o&&(i!=null&&i.getProps().isAlwaysAccessible)?void 0:NodeFilter.FILTER_SKIP;return a!==void 0&&(r.skippedFocusable=!0),a}_hiddenUpdate(){var t;const r=this._tabster,n=r.getWindow().document.body,o=this.activeId,i=this._parts,a=[],l=[],c=this._alwaysAccessibleSelector,d=c?Array.from(Y.querySelectorAll(n,c)):[],f=[];for(const S of Object.keys(i)){const j=i[S];for(const k of Object.keys(j)){const w=j[k],_=w.getElement(),E=w.getProps().isAlwaysAccessible;_&&(S===o?(f.push(_),this.currentIsOthersAccessible||a.push(_)):E?d.push(_):l.push(_))}}const p=this._augMap,h=a.length>0?[...a,...d]:void 0,y=[],m=new WeakMap,v=(S,j)=>{var k;const w=S.tagName;if(w==="SCRIPT"||w==="STYLE")return;let _=!1;p.has(S)?j?_=!0:(p.delete(S),Fu(r,S,Ru)):j&&!(!((k=this._accessibleCheck)===null||k===void 0)&&k.call(this,S,f))&&Fu(r,S,Ru,"true")&&(p.set(S,!0),_=!0),_&&(y.push(new xr(r.getWindow,S)),m.set(S,!0))},$=S=>{var j;for(let k=Y.getFirstElementChild(S);k;k=Y.getNextElementSibling(k)){let w=!1,_=!1,B=!1;if(h){const E=r.getParent(k);for(const N of h){if(k===N){w=!0;break}if(Y.nodeContains(k,N)){_=!0;break}else Y.nodeContains(N,E)&&(B=!0)}_||!((j=k.__tabsterElementFlags)===null||j===void 0)&&j.noDirectAriaHidden?$(k):!w&&!B&&v(k,!0)}else v(k,!1)}};h||d.forEach(S=>v(S,!1)),l.forEach(S=>v(S,!0)),n&&$(n),(t=this._aug)===null||t===void 0||t.map(S=>S.get()).forEach(S=>{S&&!m.get(S)&&v(S,!1)}),this._aug=y,this._augMap=m}_restoreModalizerFocus(t){var r;const n=t==null?void 0:t.ownerDocument;if(!t||!n)return;const o=this._tabster.focusedElement.getFocusedElement(),i=o&&((r=Ee.getTabsterContext(this._tabster,o))===null||r===void 0?void 0:r.modalizer);if(!o||o&&(i==null?void 0:i.userId)===this.activeId)return;const a=this._tabster,l=Ee.getTabsterContext(a,t),c=l==null?void 0:l.modalizer,d=this.activeId;if(!c&&!d||c&&d===c.userId)return;const f=l==null?void 0:l.root.getElement();if(f){let p=a.focusable.findFirst({container:f,useActiveModalizer:!0});if(p){if(t.compareDocumentPosition(p)&document.DOCUMENT_POSITION_PRECEDING&&(p=a.focusable.findLast({container:f,useActiveModalizer:!0}),!p))throw new Error("Something went wrong.");a.focusedElement.focus(p);return}}t.blur()}}/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */function L_(e,t,r,n){if(typeof MutationObserver>"u")return()=>{};const o=t.getWindow;let i;const a=f=>{var p,h,y,m,v;const $=new Set;for(const S of f){const j=S.target,k=S.removedNodes,w=S.addedNodes;if(S.type==="attributes")S.attributeName===Yn&&($.has(j)||r(t,j));else{for(let _=0;_<k.length;_++){const B=k[_];$.add(B),l(B,!0),(h=(p=t._dummyObserver).domChanged)===null||h===void 0||h.call(p,j)}for(let _=0;_<w.length;_++)l(w[_]),(m=(y=t._dummyObserver).domChanged)===null||m===void 0||m.call(y,j)}}$.clear(),(v=t.modalizer)===null||v===void 0||v.hiddenUpdate()};function l(f,p){i||(i=Go(o).elementByUId),c(f,p);const h=Q1(e,f,y=>c(y,p));if(h)for(;h.nextNode(););}function c(f,p){var h;if(!f.getAttribute)return NodeFilter.FILTER_SKIP;const y=f.__tabsterElementUID;return y&&i&&(p?delete i[y]:(h=i[y])!==null&&h!==void 0||(i[y]=new xr(o,f))),(Kt(t,f)||f.hasAttribute(Yn))&&r(t,f,p),NodeFilter.FILTER_SKIP}const d=Y.createMutationObserver(a);return n&&l(o().document.body),d.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[Yn]}),()=>{d.disconnect()}}/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */class D_{constructor(t){this._isUncontrolledCompletely=t}isUncontrolledCompletely(t,r){var n;const o=(n=this._isUncontrolledCompletely)===null||n===void 0?void 0:n.call(this,t,r);return o===void 0?r:o}}/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */class W_ extends Bd{constructor(t,r,n){var o;if(super(t,r,n),this._hasFocus=!1,this._onFocusOut=i=>{var a;const l=(a=this._element)===null||a===void 0?void 0:a.get();l&&i.relatedTarget===null&&l.dispatchEvent(new a0),l&&!Y.nodeContains(l,i.relatedTarget)&&(this._hasFocus=!1)},this._onFocusIn=()=>{this._hasFocus=!0},this._props.type===Wi.Source){const i=(o=this._element)===null||o===void 0?void 0:o.get();i==null||i.addEventListener("focusout",this._onFocusOut),i==null||i.addEventListener("focusin",this._onFocusIn),this._hasFocus=Y.nodeContains(i,i&&Y.getActiveElement(i.ownerDocument))}}dispose(){var t;if(this._props.type===Wi.Source){const r=(t=this._element)===null||t===void 0?void 0:t.get();r==null||r.removeEventListener("focusout",this._onFocusOut),r==null||r.removeEventListener("focusin",this._onFocusIn),this._hasFocus&&this._tabster.getWindow().document.body.dispatchEvent(new a0)}}}class Pd{constructor(t){this._stack=[],this._getWindow=t}push(t){var r;((r=this._stack[this._stack.length-1])===null||r===void 0?void 0:r.get())!==t&&(this._stack.length>Pd.DEPTH&&this._stack.shift(),this._stack.push(new xr(this._getWindow,t)))}pop(t=()=>!0){var r;const n=this._getWindow().document;for(let o=this._stack.length-1;o>=0;o--){const i=(r=this._stack.pop())===null||r===void 0?void 0:r.get();if(i&&Y.nodeContains(n.body,Y.getParentElement(i))&&t(i))return i}}}Pd.DEPTH=10;class H_{constructor(t){this._onRestoreFocus=r=>{var n,o;this._focusedElementState.cancelAsyncFocus(gn.Restorer);const i=r.composedPath()[0];if(i){const a=(o=(n=Kt(this._tabster,i))===null||n===void 0?void 0:n.restorer)===null||o===void 0?void 0:o.getProps().id;this._focusedElementState.requestAsyncFocus(gn.Restorer,()=>this._restoreFocus(i,a),0)}},this._onFocusIn=r=>{var n;if(!r)return;const o=Kt(this._tabster,r);((n=o==null?void 0:o.restorer)===null||n===void 0?void 0:n.getProps().type)===Wi.Target&&this._history.push(r)},this._restoreFocus=(r,n)=>{var o;const i=this._getWindow().document;if(Y.getActiveElement(i)!==i.body||!this._keyboardNavState.isNavigatingWithKeyboard()&&Y.nodeContains(i.body,r))return;const a=l=>{var c,d;const f=(d=(c=Kt(this._tabster,l))===null||c===void 0?void 0:c.restorer)===null||d===void 0?void 0:d.getProps();return f?f.id:null};(o=this._history.pop(l=>n===a(l)))===null||o===void 0||o.focus()},this._tabster=t,this._getWindow=t.getWindow,this._getWindow().addEventListener(kp,this._onRestoreFocus),this._history=new Pd(this._getWindow),this._keyboardNavState=t.keyboardNavigation,this._focusedElementState=t.focusedElement,this._focusedElementState.subscribe(this._onFocusIn)}dispose(){const t=this._getWindow();this._focusedElementState.unsubscribe(this._onFocusIn),this._focusedElementState.cancelAsyncFocus(gn.Restorer),t.removeEventListener(kp,this._onRestoreFocus)}createRestorer(t,r){const n=new W_(this._tabster,t,r);return r.type===Wi.Target&&Y.getActiveElement(t.ownerDocument)===t&&this._history.push(t),n}}/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */class U_{constructor(t){this.keyboardNavigation=t.keyboardNavigation,this.focusedElement=t.focusedElement,this.focusable=t.focusable,this.root=t.root,this.uncontrolled=t.uncontrolled,this.core=t}}class V_{constructor(t,r){var n,o;this._forgetMemorizedElements=[],this._wrappers=new Set,this._initQueue=[],this._version="8.7.0",this._noop=!1,this.getWindow=()=>{if(!this._win)throw new Error("Using disposed Tabster.");return this._win},this._storage=h_(t),this._win=t;const i=this.getWindow;r!=null&&r.DOMAPI&&u_({...r.DOMAPI}),this.keyboardNavigation=new A_(i),this.focusedElement=new nt(this,i),this.focusable=new T_(this),this.root=new Ee(this,r==null?void 0:r.autoRoot),this.uncontrolled=new D_((r==null?void 0:r.checkUncontrolledCompletely)||(r==null?void 0:r.checkUncontrolledTrappingFocus)),this.controlTab=(n=r==null?void 0:r.controlTab)!==null&&n!==void 0?n:!0,this.rootDummyInputs=!!(r!=null&&r.rootDummyInputs),this._dummyObserver=new S_(i),this.getParent=(o=r==null?void 0:r.getParent)!==null&&o!==void 0?o:Y.getParentNode,this.internal={stopObserver:()=>{this._unobserve&&(this._unobserve(),delete this._unobserve)},resumeObserver:a=>{if(!this._unobserve){const l=i().document;this._unobserve=L_(l,this,G1,a)}}},X1(i),this.queueInit(()=>{this.internal.resumeObserver(!0)})}_mergeProps(t){var r;t&&(this.getParent=(r=t.getParent)!==null&&r!==void 0?r:this.getParent)}createTabster(t,r){const n=new U_(this);return t||this._wrappers.add(n),this._mergeProps(r),n}disposeTabster(t,r){r?this._wrappers.clear():this._wrappers.delete(t),this._wrappers.size===0&&this.dispose()}dispose(){var t,r,n,o,i,a,l,c;this.internal.stopObserver();const d=this._win;d==null||d.clearTimeout(this._initTimer),delete this._initTimer,this._initQueue=[],this._forgetMemorizedElements=[],d&&this._forgetMemorizedTimer&&(d.clearTimeout(this._forgetMemorizedTimer),delete this._forgetMemorizedTimer),(t=this.outline)===null||t===void 0||t.dispose(),(r=this.crossOrigin)===null||r===void 0||r.dispose(),(n=this.deloser)===null||n===void 0||n.dispose(),(o=this.groupper)===null||o===void 0||o.dispose(),(i=this.mover)===null||i===void 0||i.dispose(),(a=this.modalizer)===null||a===void 0||a.dispose(),(l=this.observedElement)===null||l===void 0||l.dispose(),(c=this.restorer)===null||c===void 0||c.dispose(),this.keyboardNavigation.dispose(),this.focusable.dispose(),this.focusedElement.dispose(),this.root.dispose(),this._dummyObserver.dispose(),g_(this.getWindow),l0(this.getWindow),this._storage=new WeakMap,this._wrappers.clear(),d&&(p_(d),delete d.__tabsterInstance,delete this._win)}storageEntry(t,r){const n=this._storage;let o=n.get(t);return o?r===!1&&Object.keys(o).length===0&&n.delete(t):r===!0&&(o={},n.set(t,o)),o}forceCleanup(){this._win&&(this._forgetMemorizedElements.push(this._win.document.body),!this._forgetMemorizedTimer&&(this._forgetMemorizedTimer=this._win.setTimeout(()=>{delete this._forgetMemorizedTimer;for(let t=this._forgetMemorizedElements.shift();t;t=this._forgetMemorizedElements.shift())l0(this.getWindow,t),nt.forgetMemorized(this.focusedElement,t)},0),Y1(this.getWindow,!0)))}queueInit(t){var r;this._win&&(this._initQueue.push(t),this._initTimer||(this._initTimer=(r=this._win)===null||r===void 0?void 0:r.setTimeout(()=>{delete this._initTimer,this.drainInitQueue()},0)))}drainInitQueue(){if(!this._win)return;const t=this._initQueue;this._initQueue=[],t.forEach(r=>r())}}function G_(e,t){let r=J_(e);return r?r.createTabster(!1,t):(r=new V_(e,t),e.__tabsterInstance=r,r.createTabster())}function K_(e){const t=e.core;return t.groupper||(t.groupper=new R_(t,t.getWindow)),t.groupper}function Y_(e,t,r){const n=e.core;return n.modalizer||(n.modalizer=new M_(n,t,r)),n.modalizer}function X_(e){const t=e.core;return t.restorer||(t.restorer=new H_(t)),t.restorer}function Q_(e,t){e.core.disposeTabster(e,t)}function J_(e){return e.__tabsterInstance}const Z_=e=>e;function ez(e){const t=(e==null?void 0:e.defaultView)||void 0,r=t==null?void 0:t.__tabsterShadowDOMAPI;if(t)return G_(t,{autoRoot:{},controlTab:!1,getParent:h5,checkUncontrolledCompletely:n=>{var o;return((o=n.firstElementChild)===null||o===void 0?void 0:o.hasAttribute("data-is-focus-trap-zone-bumper"))===!0||void 0},DOMAPI:r})}function Nd(e=Z_){const{targetDocument:t}=$r(),r=x.useRef(null);return Sr(()=>{const n=ez(t);if(n)return r.current=e(n),()=>{Q_(n),r.current=null}},[t,e]),r}const $p=e=>{Nd();const t=ew(e);return x.useMemo(()=>({[Yn]:t}),[t])},tz=e=>(Nd(K_),$p({groupper:{tabbability:rz(e==null?void 0:e.tabBehavior)},focusable:{ignoreKeydown:e==null?void 0:e.ignoreDefaultKeydown}})),rz=e=>{switch(e){case"unlimited":return lc.Unlimited;case"limited":return lc.Limited;case"limited-trap-focus":return lc.LimitedTrapFocus;default:return}},rw=()=>{const e=Nd(),{targetDocument:t}=$r(),r=x.useCallback((l,c)=>{var d;return l&&((d=e.current)===null||d===void 0?void 0:d.focusable.findAll({container:l,acceptCondition:c}))||[]},[e]),n=x.useCallback(l=>{var c;return l&&((c=e.current)===null||c===void 0?void 0:c.focusable.findFirst({container:l}))},[e]),o=x.useCallback(l=>{var c;return l&&((c=e.current)===null||c===void 0?void 0:c.focusable.findLast({container:l}))},[e]),i=x.useCallback((l,c={})=>{if(!e.current||!t||!l)return null;const{container:d=t.body}=c;return e.current.focusable.findNext({currentElement:l,container:d})},[e,t]),a=x.useCallback((l,c={})=>{if(!e.current||!t||!l)return null;const{container:d=t.body}=c;return e.current.focusable.findPrev({currentElement:l,container:d})},[e,t]);return{findAllFocusable:r,findFirstFocusable:n,findLastFocusable:o,findNextFocusable:i,findPrevFocusable:a}},u0="data-fui-focus-visible",nw="data-fui-focus-within";function nz(e,t){if(ow(e))return()=>{};const r={current:void 0},n=rm(t);function o(c){n.isNavigatingWithKeyboard()&&wp(c)&&(r.current=c,c.setAttribute(u0,""))}function i(){r.current&&(r.current.removeAttribute(u0),r.current=void 0)}n.subscribe(c=>{c?o(t.document.activeElement):i()});const a=c=>{i();const d=c.composedPath()[0];o(d)},l=c=>{(!c.relatedTarget||wp(c.relatedTarget)&&!e.contains(c.relatedTarget))&&i()};return e.addEventListener(Mr,a),e.addEventListener("focusout",l),e.focusVisible=!0,e.contains(t.document.activeElement)&&o(t.document.activeElement),()=>{i(),e.removeEventListener(Mr,a),e.removeEventListener("focusout",l),e.focusVisible=void 0,nm(n)}}function ow(e){return e?e.focusVisible?!0:ow(e==null?void 0:e.parentElement):!1}function iw(e={}){const t=$r(),r=x.useRef(null);var n;const o=(n=e.targetDocument)!==null&&n!==void 0?n:t.targetDocument;return x.useEffect(()=>{if(o!=null&&o.defaultView&&r.current)return nz(r.current,o.defaultView)},[r,o]),r}function oz(e,t){const r=rm(t);r.subscribe(i=>{i||f0(e)});const n=i=>{r.isNavigatingWithKeyboard()&&p0(i.target)&&iz(e)},o=i=>{(!i.relatedTarget||p0(i.relatedTarget)&&!e.contains(i.relatedTarget))&&f0(e)};return e.addEventListener(Mr,n),e.addEventListener("focusout",o),()=>{e.removeEventListener(Mr,n),e.removeEventListener("focusout",o),nm(r)}}function iz(e){e.setAttribute(nw,"")}function f0(e){e.removeAttribute(nw)}function p0(e){return e?!!(e&&typeof e=="object"&&"classList"in e&&"contains"in e):!1}function sm(){const{targetDocument:e}=$r(),t=x.useRef(null);return x.useEffect(()=>{if(e!=null&&e.defaultView&&t.current)return oz(t.current,e.defaultView)},[t,e]),t}const sz="data-tabster-never-hide",az=e=>e.hasAttribute(sz);function lz(e){Y_(e,void 0,az),X_(e)}const sw=(e={})=>{const{trapFocus:t,alwaysFocusable:r,legacyTrapFocus:n}=e;Nd(lz);const o=ts("modal-",e.id),i=$p({restorer:{type:Wi.Source},...t&&{modalizer:{id:o,isOthersAccessible:!t,isAlwaysAccessible:r,isTrapped:n&&t}}}),a=$p({restorer:{type:Wi.Target}});return{modalAttributes:i,triggerAttributes:a}},X={12:"#1f1f1f",14:"#242424",16:"#292929",20:"#333333",22:"#383838",24:"#3d3d3d",26:"#424242",30:"#4d4d4d",34:"#575757",38:"#616161",44:"#707070",70:"#b3b3b3",74:"#bdbdbd",78:"#c7c7c7",82:"#d1d1d1",84:"#d6d6d6",86:"#dbdbdb",88:"#e0e0e0",90:"#e6e6e6",92:"#ebebeb",94:"#f0f0f0",96:"#f5f5f5",98:"#fafafa",99:"#fcfcfc"},_n={10:"rgba(255, 255, 255, 0.1)",20:"rgba(255, 255, 255, 0.2)",40:"rgba(255, 255, 255, 0.4)",50:"rgba(255, 255, 255, 0.5)",70:"rgba(255, 255, 255, 0.7)",80:"rgba(255, 255, 255, 0.8)"},zn={5:"rgba(0, 0, 0, 0.05)",10:"rgba(0, 0, 0, 0.1)",20:"rgba(0, 0, 0, 0.2)",30:"rgba(0, 0, 0, 0.3)",40:"rgba(0, 0, 0, 0.4)",50:"rgba(0, 0, 0, 0.5)"},Ke="#ffffff",cz="#000000",dz={shade50:"#130204",shade40:"#230308",shade30:"#420610",shade20:"#590815",shade10:"#690a19",primary:"#750b1c",tint10:"#861b2c",tint20:"#962f3f",tint30:"#ac4f5e",tint40:"#d69ca5",tint50:"#e9c7cd",tint60:"#f9f0f2"},aw={shade50:"#200205",shade40:"#3b0509",shade30:"#6e0811",shade20:"#960b18",shade10:"#b10e1c",primary:"#c50f1f",tint10:"#cc2635",tint20:"#d33f4c",tint30:"#dc626d",tint40:"#eeacb2",tint50:"#f6d1d5",tint60:"#fdf3f4"},uz={shade50:"#210809",shade40:"#3f1011",shade30:"#751d1f",shade20:"#9f282b",shade10:"#bc2f32",primary:"#d13438",tint10:"#d7494c",tint20:"#dc5e62",tint30:"#e37d80",tint40:"#f1bbbc",tint50:"#f8dadb",tint60:"#fdf6f6"},fz={shade50:"#230900",shade40:"#411200",shade30:"#7a2101",shade20:"#a62d01",shade10:"#c43501",primary:"#da3b01",tint10:"#de501c",tint20:"#e36537",tint30:"#e9835e",tint40:"#f4bfab",tint50:"#f9dcd1",tint60:"#fdf6f3"},pz={shade50:"#200d03",shade40:"#3d1805",shade30:"#712d09",shade20:"#9a3d0c",shade10:"#b6480e",primary:"#ca5010",tint10:"#d06228",tint20:"#d77440",tint30:"#df8e64",tint40:"#efc4ad",tint50:"#f7dfd2",tint60:"#fdf7f4"},hz={shade50:"#271002",shade40:"#4a1e04",shade30:"#8a3707",shade20:"#bc4b09",shade10:"#de590b",primary:"#f7630c",tint10:"#f87528",tint20:"#f98845",tint30:"#faa06b",tint40:"#fdcfb4",tint50:"#fee5d7",tint60:"#fff9f5"},mz={shade50:"#291600",shade40:"#4d2a00",shade30:"#8f4e00",shade20:"#c26a00",shade10:"#e67e00",primary:"#ff8c00",tint10:"#ff9a1f",tint20:"#ffa83d",tint30:"#ffba66",tint40:"#ffddb3",tint50:"#ffedd6",tint60:"#fffaf5"},gz={shade50:"#251a00",shade40:"#463100",shade30:"#835b00",shade20:"#b27c00",shade10:"#d39300",primary:"#eaa300",tint10:"#edad1c",tint20:"#efb839",tint30:"#f2c661",tint40:"#f9e2ae",tint50:"#fcefd3",tint60:"#fefbf4"},vz={shade50:"#282400",shade40:"#4c4400",shade30:"#817400",shade20:"#c0ad00",shade10:"#e4cc00",primary:"#fde300",tint10:"#fde61e",tint20:"#fdea3d",tint30:"#feee66",tint40:"#fef7b2",tint50:"#fffad6",tint60:"#fffef5"},bz={shade50:"#1f1900",shade40:"#3a2f00",shade30:"#6c5700",shade20:"#937700",shade10:"#ae8c00",primary:"#c19c00",tint10:"#c8a718",tint20:"#d0b232",tint30:"#dac157",tint40:"#ecdfa5",tint50:"#f5eece",tint60:"#fdfbf2"},xz={shade50:"#181202",shade40:"#2e2103",shade30:"#553e06",shade20:"#745408",shade10:"#89640a",primary:"#986f0b",tint10:"#a47d1e",tint20:"#b18c34",tint30:"#c1a256",tint40:"#e0cea2",tint50:"#efe4cb",tint60:"#fbf8f2"},yz={shade50:"#170e07",shade40:"#2b1a0e",shade30:"#50301a",shade20:"#6c4123",shade10:"#804d29",primary:"#8e562e",tint10:"#9c663f",tint20:"#a97652",tint30:"#bb8f6f",tint40:"#ddc3b0",tint50:"#edded3",tint60:"#faf7f4"},wz={shade50:"#0c1501",shade40:"#162702",shade30:"#294903",shade20:"#376304",shade10:"#427505",primary:"#498205",tint10:"#599116",tint20:"#6ba02b",tint30:"#85b44c",tint40:"#bdd99b",tint50:"#dbebc7",tint60:"#f6faf0"},kz={shade50:"#002111",shade40:"#003d20",shade30:"#00723b",shade20:"#009b51",shade10:"#00b85f",primary:"#00cc6a",tint10:"#19d279",tint20:"#34d889",tint30:"#5ae0a0",tint40:"#a8f0cd",tint50:"#cff7e4",tint60:"#f3fdf8"},Sz={shade50:"#031a02",shade40:"#063004",shade30:"#0b5a08",shade20:"#0e7a0b",shade10:"#11910d",primary:"#13a10e",tint10:"#27ac22",tint20:"#3db838",tint30:"#5ec75a",tint40:"#a7e3a5",tint50:"#cef0cd",tint60:"#f2fbf2"},lw={shade50:"#031403",shade40:"#052505",shade30:"#094509",shade20:"#0c5e0c",shade10:"#0e700e",primary:"#107c10",tint10:"#218c21",tint20:"#359b35",tint30:"#54b054",tint40:"#9fd89f",tint50:"#c9eac9",tint60:"#f1faf1"},jz={shade50:"#021102",shade40:"#032003",shade30:"#063b06",shade20:"#085108",shade10:"#0a5f0a",primary:"#0b6a0b",tint10:"#1a7c1a",tint20:"#2d8e2d",tint30:"#4da64d",tint40:"#9ad29a",tint50:"#c6e7c6",tint60:"#f0f9f0"},$z={shade50:"#001d1f",shade40:"#00373a",shade30:"#00666d",shade20:"#008b94",shade10:"#00a5af",primary:"#00b7c3",tint10:"#18bfca",tint20:"#32c8d1",tint30:"#58d3db",tint40:"#a6e9ed",tint50:"#cef3f5",tint60:"#f2fcfd"},Cz={shade50:"#001516",shade40:"#012728",shade30:"#02494c",shade20:"#026467",shade10:"#037679",primary:"#038387",tint10:"#159195",tint20:"#2aa0a4",tint30:"#4cb4b7",tint40:"#9bd9db",tint50:"#c7ebec",tint60:"#f0fafa"},_z={shade50:"#000f12",shade40:"#001b22",shade30:"#00333f",shade20:"#004555",shade10:"#005265",primary:"#005b70",tint10:"#0f6c81",tint20:"#237d92",tint30:"#4496a9",tint40:"#94c8d4",tint50:"#c3e1e8",tint60:"#eff7f9"},zz={shade50:"#001322",shade40:"#002440",shade30:"#004377",shade20:"#005ba1",shade10:"#006cbf",primary:"#0078d4",tint10:"#1a86d9",tint20:"#3595de",tint30:"#5caae5",tint40:"#a9d3f2",tint50:"#d0e7f8",tint60:"#f3f9fd"},Ez={shade50:"#000c16",shade40:"#00172a",shade30:"#002c4e",shade20:"#003b6a",shade10:"#00467e",primary:"#004e8c",tint10:"#125e9a",tint20:"#286fa8",tint30:"#4a89ba",tint40:"#9abfdc",tint50:"#c7dced",tint60:"#f0f6fa"},Bz={shade50:"#0d1126",shade40:"#182047",shade30:"#2c3c85",shade20:"#3c51b4",shade10:"#4760d5",primary:"#4f6bed",tint10:"#637cef",tint20:"#778df1",tint30:"#93a4f4",tint40:"#c8d1fa",tint50:"#e1e6fc",tint60:"#f7f9fe"},Tz={shade50:"#00061d",shade40:"#000c36",shade30:"#001665",shade20:"#001e89",shade10:"#0023a2",primary:"#0027b4",tint10:"#173bbd",tint20:"#3050c6",tint30:"#546fd2",tint40:"#a3b2e8",tint50:"#ccd5f3",tint60:"#f2f4fc"},Pz={shade50:"#120f25",shade40:"#221d46",shade30:"#3f3682",shade20:"#5649b0",shade10:"#6656d1",primary:"#7160e8",tint10:"#8172eb",tint20:"#9184ee",tint30:"#a79cf1",tint40:"#d2ccf8",tint50:"#e7e4fb",tint60:"#f9f8fe"},Nz={shade50:"#0f0717",shade40:"#1c0e2b",shade30:"#341a51",shade20:"#46236e",shade10:"#532982",primary:"#5c2e91",tint10:"#6b3f9e",tint20:"#7c52ab",tint30:"#9470bd",tint40:"#c6b1de",tint50:"#e0d3ed",tint60:"#f7f4fb"},Fz={shade50:"#160418",shade40:"#29072e",shade30:"#4c0d55",shade20:"#671174",shade10:"#7a1589",primary:"#881798",tint10:"#952aa4",tint20:"#a33fb1",tint30:"#b55fc1",tint40:"#d9a7e0",tint50:"#eaceef",tint60:"#faf2fb"},Rz={shade50:"#1f091d",shade40:"#3a1136",shade30:"#6d2064",shade20:"#932b88",shade10:"#af33a1",primary:"#c239b3",tint10:"#c94cbc",tint20:"#d161c4",tint30:"#da7ed0",tint40:"#edbbe7",tint50:"#f5daf2",tint60:"#fdf5fc"},Az={shade50:"#1c0b1f",shade40:"#35153a",shade30:"#63276d",shade20:"#863593",shade10:"#9f3faf",primary:"#b146c2",tint10:"#ba58c9",tint20:"#c36bd1",tint30:"#cf87da",tint40:"#e6bfed",tint50:"#f2dcf5",tint60:"#fcf6fd"},Iz={shade50:"#24091b",shade40:"#441232",shade30:"#80215d",shade20:"#ad2d7e",shade10:"#cd3595",primary:"#e43ba6",tint10:"#e750b0",tint20:"#ea66ba",tint30:"#ef85c8",tint40:"#f7c0e3",tint50:"#fbddf0",tint60:"#fef6fb"},Oz={shade50:"#1f0013",shade40:"#390024",shade30:"#6b0043",shade20:"#91005a",shade10:"#ac006b",primary:"#bf0077",tint10:"#c71885",tint20:"#ce3293",tint30:"#d957a8",tint40:"#eca5d1",tint50:"#f5cee6",tint60:"#fcf2f9"},qz={shade50:"#13000c",shade40:"#240017",shade30:"#43002b",shade20:"#5a003b",shade10:"#6b0045",primary:"#77004d",tint10:"#87105d",tint20:"#98246f",tint30:"#ad4589",tint40:"#d696c0",tint50:"#e9c4dc",tint60:"#faf0f6"},Mz={shade50:"#141313",shade40:"#252323",shade30:"#444241",shade20:"#5d5958",shade10:"#6e6968",primary:"#7a7574",tint10:"#8a8584",tint20:"#9a9594",tint30:"#afabaa",tint40:"#d7d4d4",tint50:"#eae8e8",tint60:"#faf9f9"},Lz={shade50:"#0f0e0e",shade40:"#1c1b1a",shade30:"#343231",shade20:"#474443",shade10:"#54514f",primary:"#5d5a58",tint10:"#706d6b",tint20:"#84817e",tint30:"#9e9b99",tint40:"#cecccb",tint50:"#e5e4e3",tint60:"#f8f8f8"},Dz={shade50:"#111314",shade40:"#1f2426",shade30:"#3b4447",shade20:"#505c60",shade10:"#5f6d71",primary:"#69797e",tint10:"#79898d",tint20:"#89989d",tint30:"#a0adb2",tint40:"#cdd6d8",tint50:"#e4e9ea",tint60:"#f8f9fa"},Wz={shade50:"#090a0b",shade40:"#111315",shade30:"#202427",shade20:"#2b3135",shade10:"#333a3f",primary:"#394146",tint10:"#4d565c",tint20:"#626c72",tint30:"#808a90",tint40:"#bcc3c7",tint50:"#dbdfe1",tint60:"#f6f7f8"},er={red:uz,green:lw,darkOrange:fz,yellow:vz,berry:Rz,lightGreen:Sz,marigold:gz},Au={darkRed:dz,cranberry:aw,pumpkin:pz,peach:mz,gold:bz,brass:xz,brown:yz,forest:wz,seafoam:kz,darkGreen:jz,lightTeal:$z,teal:Cz,steel:_z,blue:zz,royalBlue:Ez,cornflower:Bz,navy:Tz,lavender:Pz,purple:Nz,grape:Fz,lilac:Az,pink:Iz,magenta:Oz,plum:qz,beige:Mz,mink:Lz,platinum:Dz,anchor:Wz},Rt={cranberry:aw,green:lw,orange:hz},Hz=["red","green","darkOrange","yellow","berry","lightGreen","marigold"],Uz=["darkRed","cranberry","pumpkin","peach","gold","brass","brown","forest","seafoam","darkGreen","lightTeal","teal","steel","blue","royalBlue","cornflower","navy","lavender","purple","grape","lilac","pink","magenta","plum","beige","mink","platinum","anchor"],ns={success:"green",warning:"orange",danger:"cranberry"},La=Hz.reduce((e,t)=>{const r=t.slice(0,1).toUpperCase()+t.slice(1),n={[`colorPalette${r}Background1`]:er[t].tint60,[`colorPalette${r}Background2`]:er[t].tint40,[`colorPalette${r}Background3`]:er[t].primary,[`colorPalette${r}Foreground1`]:er[t].shade10,[`colorPalette${r}Foreground2`]:er[t].shade30,[`colorPalette${r}Foreground3`]:er[t].primary,[`colorPalette${r}BorderActive`]:er[t].primary,[`colorPalette${r}Border1`]:er[t].tint40,[`colorPalette${r}Border2`]:er[t].primary};return Object.assign(e,n)},{});La.colorPaletteYellowForeground1=er.yellow.shade30;La.colorPaletteRedForegroundInverted=er.red.tint20;La.colorPaletteGreenForegroundInverted=er.green.tint20;La.colorPaletteYellowForegroundInverted=er.yellow.tint40;const Vz=Uz.reduce((e,t)=>{const r=t.slice(0,1).toUpperCase()+t.slice(1),n={[`colorPalette${r}Background2`]:Au[t].tint40,[`colorPalette${r}Foreground2`]:Au[t].shade30,[`colorPalette${r}BorderActive`]:Au[t].primary};return Object.assign(e,n)},{}),Gz={...La,...Vz},os=Object.entries(ns).reduce((e,[t,r])=>{const n=t.slice(0,1).toUpperCase()+t.slice(1),o={[`colorStatus${n}Background1`]:Rt[r].tint60,[`colorStatus${n}Background2`]:Rt[r].tint40,[`colorStatus${n}Background3`]:Rt[r].primary,[`colorStatus${n}Foreground1`]:Rt[r].shade10,[`colorStatus${n}Foreground2`]:Rt[r].shade30,[`colorStatus${n}Foreground3`]:Rt[r].primary,[`colorStatus${n}ForegroundInverted`]:Rt[r].tint30,[`colorStatus${n}BorderActive`]:Rt[r].primary,[`colorStatus${n}Border1`]:Rt[r].tint40,[`colorStatus${n}Border2`]:Rt[r].primary};return Object.assign(e,o)},{});os.colorStatusDangerBackground3Hover=Rt[ns.danger].shade10;os.colorStatusDangerBackground3Pressed=Rt[ns.danger].shade20;os.colorStatusWarningForeground1=Rt[ns.warning].shade20;os.colorStatusWarningForeground3=Rt[ns.warning].shade20;os.colorStatusWarningBorder2=Rt[ns.warning].shade20;const Kz=e=>({colorNeutralForeground1:X[14],colorNeutralForeground1Hover:X[14],colorNeutralForeground1Pressed:X[14],colorNeutralForeground1Selected:X[14],colorNeutralForeground2:X[26],colorNeutralForeground2Hover:X[14],colorNeutralForeground2Pressed:X[14],colorNeutralForeground2Selected:X[14],colorNeutralForeground2BrandHover:e[80],colorNeutralForeground2BrandPressed:e[70],colorNeutralForeground2BrandSelected:e[80],colorNeutralForeground3:X[38],colorNeutralForeground3Hover:X[26],colorNeutralForeground3Pressed:X[26],colorNeutralForeground3Selected:X[26],colorNeutralForeground3BrandHover:e[80],colorNeutralForeground3BrandPressed:e[70],colorNeutralForeground3BrandSelected:e[80],colorNeutralForeground4:X[44],colorNeutralForeground5:X[38],colorNeutralForeground5Hover:X[14],colorNeutralForeground5Pressed:X[14],colorNeutralForeground5Selected:X[14],colorNeutralForegroundDisabled:X[74],colorNeutralForegroundInvertedDisabled:_n[40],colorBrandForegroundLink:e[70],colorBrandForegroundLinkHover:e[60],colorBrandForegroundLinkPressed:e[40],colorBrandForegroundLinkSelected:e[70],colorNeutralForeground2Link:X[26],colorNeutralForeground2LinkHover:X[14],colorNeutralForeground2LinkPressed:X[14],colorNeutralForeground2LinkSelected:X[14],colorCompoundBrandForeground1:e[80],colorCompoundBrandForeground1Hover:e[70],colorCompoundBrandForeground1Pressed:e[60],colorBrandForeground1:e[80],colorBrandForeground2:e[70],colorBrandForeground2Hover:e[60],colorBrandForeground2Pressed:e[30],colorNeutralForeground1Static:X[14],colorNeutralForegroundStaticInverted:Ke,colorNeutralForegroundInverted:Ke,colorNeutralForegroundInvertedHover:Ke,colorNeutralForegroundInvertedPressed:Ke,colorNeutralForegroundInvertedSelected:Ke,colorNeutralForegroundInverted2:Ke,colorNeutralForegroundOnBrand:Ke,colorNeutralForegroundInvertedLink:Ke,colorNeutralForegroundInvertedLinkHover:Ke,colorNeutralForegroundInvertedLinkPressed:Ke,colorNeutralForegroundInvertedLinkSelected:Ke,colorBrandForegroundInverted:e[100],colorBrandForegroundInvertedHover:e[110],colorBrandForegroundInvertedPressed:e[100],colorBrandForegroundOnLight:e[80],colorBrandForegroundOnLightHover:e[70],colorBrandForegroundOnLightPressed:e[50],colorBrandForegroundOnLightSelected:e[60],colorNeutralBackground1:Ke,colorNeutralBackground1Hover:X[96],colorNeutralBackground1Pressed:X[88],colorNeutralBackground1Selected:X[92],colorNeutralBackground2:X[98],colorNeutralBackground2Hover:X[94],colorNeutralBackground2Pressed:X[86],colorNeutralBackground2Selected:X[90],colorNeutralBackground3:X[96],colorNeutralBackground3Hover:X[92],colorNeutralBackground3Pressed:X[84],colorNeutralBackground3Selected:X[88],colorNeutralBackground4:X[94],colorNeutralBackground4Hover:X[98],colorNeutralBackground4Pressed:X[96],colorNeutralBackground4Selected:Ke,colorNeutralBackground5:X[92],colorNeutralBackground5Hover:X[96],colorNeutralBackground5Pressed:X[94],colorNeutralBackground5Selected:X[98],colorNeutralBackground6:X[90],colorNeutralBackground7:"#00000000",colorNeutralBackground7Hover:X[92],colorNeutralBackground7Pressed:X[84],colorNeutralBackground7Selected:"#00000000",colorNeutralBackground8:X[99],colorNeutralBackgroundInverted:X[16],colorNeutralBackgroundInvertedHover:X[24],colorNeutralBackgroundInvertedPressed:X[12],colorNeutralBackgroundInvertedSelected:X[22],colorNeutralBackgroundStatic:X[20],colorNeutralBackgroundAlpha:_n[50],colorNeutralBackgroundAlpha2:_n[80],colorSubtleBackground:"transparent",colorSubtleBackgroundHover:X[96],colorSubtleBackgroundPressed:X[88],colorSubtleBackgroundSelected:X[92],colorSubtleBackgroundLightAlphaHover:_n[70],colorSubtleBackgroundLightAlphaPressed:_n[50],colorSubtleBackgroundLightAlphaSelected:"transparent",colorSubtleBackgroundInverted:"transparent",colorSubtleBackgroundInvertedHover:zn[10],colorSubtleBackgroundInvertedPressed:zn[30],colorSubtleBackgroundInvertedSelected:zn[20],colorTransparentBackground:"transparent",colorTransparentBackgroundHover:"transparent",colorTransparentBackgroundPressed:"transparent",colorTransparentBackgroundSelected:"transparent",colorNeutralBackgroundDisabled:X[94],colorNeutralBackgroundDisabled2:Ke,colorNeutralBackgroundInvertedDisabled:_n[10],colorNeutralStencil1:X[90],colorNeutralStencil2:X[98],colorNeutralStencil1Alpha:zn[10],colorNeutralStencil2Alpha:zn[5],colorBackgroundOverlay:zn[40],colorScrollbarOverlay:zn[50],colorBrandBackground:e[80],colorBrandBackgroundHover:e[70],colorBrandBackgroundPressed:e[40],colorBrandBackgroundSelected:e[60],colorCompoundBrandBackground:e[80],colorCompoundBrandBackgroundHover:e[70],colorCompoundBrandBackgroundPressed:e[60],colorBrandBackgroundStatic:e[80],colorBrandBackground2:e[160],colorBrandBackground2Hover:e[150],colorBrandBackground2Pressed:e[130],colorBrandBackground3Static:e[60],colorBrandBackground4Static:e[40],colorBrandBackgroundInverted:Ke,colorBrandBackgroundInvertedHover:e[160],colorBrandBackgroundInvertedPressed:e[140],colorBrandBackgroundInvertedSelected:e[150],colorNeutralCardBackground:X[98],colorNeutralCardBackgroundHover:Ke,colorNeutralCardBackgroundPressed:X[96],colorNeutralCardBackgroundSelected:X[92],colorNeutralCardBackgroundDisabled:X[94],colorNeutralStrokeAccessible:X[38],colorNeutralStrokeAccessibleHover:X[34],colorNeutralStrokeAccessiblePressed:X[30],colorNeutralStrokeAccessibleSelected:e[80],colorNeutralStroke1:X[82],colorNeutralStroke1Hover:X[78],colorNeutralStroke1Pressed:X[70],colorNeutralStroke1Selected:X[74],colorNeutralStroke2:X[88],colorNeutralStroke3:X[94],colorNeutralStroke4:X[92],colorNeutralStroke4Hover:X[88],colorNeutralStroke4Pressed:X[84],colorNeutralStroke4Selected:X[92],colorNeutralStrokeSubtle:X[88],colorNeutralStrokeOnBrand:Ke,colorNeutralStrokeOnBrand2:Ke,colorNeutralStrokeOnBrand2Hover:Ke,colorNeutralStrokeOnBrand2Pressed:Ke,colorNeutralStrokeOnBrand2Selected:Ke,colorBrandStroke1:e[80],colorBrandStroke2:e[140],colorBrandStroke2Hover:e[120],colorBrandStroke2Pressed:e[80],colorBrandStroke2Contrast:e[140],colorCompoundBrandStroke:e[80],colorCompoundBrandStrokeHover:e[70],colorCompoundBrandStrokePressed:e[60],colorNeutralStrokeDisabled:X[88],colorNeutralStrokeDisabled2:X[92],colorNeutralStrokeInvertedDisabled:_n[40],colorTransparentStroke:"transparent",colorTransparentStrokeInteractive:"transparent",colorTransparentStrokeDisabled:"transparent",colorNeutralStrokeAlpha:zn[5],colorNeutralStrokeAlpha2:_n[20],colorStrokeFocus1:Ke,colorStrokeFocus2:cz,colorNeutralShadowAmbient:"rgba(0,0,0,0.12)",colorNeutralShadowKey:"rgba(0,0,0,0.14)",colorNeutralShadowAmbientLighter:"rgba(0,0,0,0.06)",colorNeutralShadowKeyLighter:"rgba(0,0,0,0.07)",colorNeutralShadowAmbientDarker:"rgba(0,0,0,0.20)",colorNeutralShadowKeyDarker:"rgba(0,0,0,0.24)",colorBrandShadowAmbient:"rgba(0,0,0,0.30)",colorBrandShadowKey:"rgba(0,0,0,0.25)"}),Yz={borderRadiusNone:"0",borderRadiusSmall:"2px",borderRadiusMedium:"4px",borderRadiusLarge:"6px",borderRadiusXLarge:"8px",borderRadius2XLarge:"12px",borderRadius3XLarge:"16px",borderRadius4XLarge:"24px",borderRadius5XLarge:"32px",borderRadius6XLarge:"40px",borderRadiusCircular:"10000px"},Xz={curveAccelerateMax:"cubic-bezier(0.9,0.1,1,0.2)",curveAccelerateMid:"cubic-bezier(1,0,1,1)",curveAccelerateMin:"cubic-bezier(0.8,0,0.78,1)",curveDecelerateMax:"cubic-bezier(0.1,0.9,0.2,1)",curveDecelerateMid:"cubic-bezier(0,0,0,1)",curveDecelerateMin:"cubic-bezier(0.33,0,0.1,1)",curveEasyEaseMax:"cubic-bezier(0.8,0,0.2,1)",curveEasyEase:"cubic-bezier(0.33,0,0.67,1)",curveLinear:"cubic-bezier(0,0,1,1)"},Qz={durationUltraFast:"50ms",durationFaster:"100ms",durationFast:"150ms",durationNormal:"200ms",durationGentle:"250ms",durationSlow:"300ms",durationSlower:"400ms",durationUltraSlow:"500ms"},Jz={fontSizeBase100:"10px",fontSizeBase200:"12px",fontSizeBase300:"14px",fontSizeBase400:"16px",fontSizeBase500:"20px",fontSizeBase600:"24px",fontSizeHero700:"28px",fontSizeHero800:"32px",fontSizeHero900:"40px",fontSizeHero1000:"68px"},Zz={lineHeightBase100:"14px",lineHeightBase200:"16px",lineHeightBase300:"20px",lineHeightBase400:"22px",lineHeightBase500:"28px",lineHeightBase600:"32px",lineHeightHero700:"36px",lineHeightHero800:"40px",lineHeightHero900:"52px",lineHeightHero1000:"92px"},e3={fontWeightRegular:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},t3={fontFamilyBase:"'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif",fontFamilyMonospace:"Consolas, 'Courier New', Courier, monospace",fontFamilyNumeric:"Bahnschrift, 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif"},Xe={none:"0",xxs:"2px",xs:"4px",sNudge:"6px",s:"8px",mNudge:"10px",m:"12px",l:"16px",xl:"20px",xxl:"24px",xxxl:"32px"},r3={spacingHorizontalNone:Xe.none,spacingHorizontalXXS:Xe.xxs,spacingHorizontalXS:Xe.xs,spacingHorizontalSNudge:Xe.sNudge,spacingHorizontalS:Xe.s,spacingHorizontalMNudge:Xe.mNudge,spacingHorizontalM:Xe.m,spacingHorizontalL:Xe.l,spacingHorizontalXL:Xe.xl,spacingHorizontalXXL:Xe.xxl,spacingHorizontalXXXL:Xe.xxxl},n3={spacingVerticalNone:Xe.none,spacingVerticalXXS:Xe.xxs,spacingVerticalXS:Xe.xs,spacingVerticalSNudge:Xe.sNudge,spacingVerticalS:Xe.s,spacingVerticalMNudge:Xe.mNudge,spacingVerticalM:Xe.m,spacingVerticalL:Xe.l,spacingVerticalXL:Xe.xl,spacingVerticalXXL:Xe.xxl,spacingVerticalXXXL:Xe.xxxl},o3={strokeWidthThin:"1px",strokeWidthThick:"2px",strokeWidthThicker:"3px",strokeWidthThickest:"4px"};function h0(e,t,r=""){return{[`shadow2${r}`]:`0 0 2px ${e}, 0 1px 2px ${t}`,[`shadow4${r}`]:`0 0 2px ${e}, 0 2px 4px ${t}`,[`shadow8${r}`]:`0 0 2px ${e}, 0 4px 8px ${t}`,[`shadow16${r}`]:`0 0 2px ${e}, 0 8px 16px ${t}`,[`shadow28${r}`]:`0 0 8px ${e}, 0 14px 28px ${t}`,[`shadow64${r}`]:`0 0 8px ${e}, 0 32px 64px ${t}`}}const i3=e=>{const t=Kz(e);return{...Yz,...Jz,...Zz,...t3,...e3,...o3,...r3,...n3,...Qz,...Xz,...t,...Gz,...os,...h0(t.colorNeutralShadowAmbient,t.colorNeutralShadowKey),...h0(t.colorBrandShadowAmbient,t.colorBrandShadowKey,"Brand")}},s3={30:"#0a2e4a",40:"#0c3b5e",50:"#0e4775",60:"#0f548c",70:"#115ea3",80:"#0f6cbd",100:"#479ef5",110:"#62abf5",120:"#77b7f7",130:"#96c6fa",140:"#b4d6fa",150:"#cfe4fa",160:"#ebf3fc"},a3=i3(s3),cw={root:"fui-FluentProvider"},l3=S1({root:{sj55zd:"f19n0e5",De3pzq:"fxugw4r",fsow6f:["f1o700av","fes3tcz"],Bahqtrf:"fk6fouc",Be2twd7:"fkhj508",Bhrd7zp:"figsok6",Bg96gwp:"f1i3iumi"}},{d:[".f19n0e5{color:var(--colorNeutralForeground1);}",".fxugw4r{background-color:var(--colorNeutralBackground1);}",".f1o700av{text-align:left;}",".fes3tcz{text-align:right;}",".fk6fouc{font-family:var(--fontFamilyBase);}",".fkhj508{font-size:var(--fontSizeBase300);}",".figsok6{font-weight:var(--fontWeightRegular);}",".f1i3iumi{line-height:var(--lineHeightBase300);}"]}),c3=e=>{"use no memo";const t=_d(),r=l3({dir:e.dir,renderer:t});return e.root.className=ve(cw.root,e.themeClassName,r.root,e.root.className),e},d3=x.useInsertionEffect?x.useInsertionEffect:Sr,u3=(e,t)=>{if(!(e!=null&&e.head))return;const r=e.createElement("style");return Object.keys(t).forEach(n=>{r.setAttribute(n,t[n])}),e.head.appendChild(r),r},f3=(e,t)=>{const r=e.sheet;r&&(r.cssRules.length>0&&r.deleteRule(0),r.insertRule(t,0))},p3=e=>{"use no memo";const{targetDocument:t,theme:r,rendererAttributes:n}=e,o=x.useRef(void 0),i=ts(cw.root),a=n,l=x.useMemo(()=>cC(`.${i}`,r),[r,i]);return h3(t,i),d3(()=>{const c=t==null?void 0:t.getElementById(i);return c?o.current=c:(o.current=u3(t,{...a,id:i}),o.current&&f3(o.current,l)),()=>{var d;(d=o.current)===null||d===void 0||d.remove()}},[i,t,l,a]),{styleTagId:i,rule:l}};function h3(e,t){x.useState(()=>{if(!e)return;const r=e.getElementById(t);r&&e.head.append(r)})}const m3={},g3={},v3=(e,t)=>{"use no memo";const r=$r(),n=b3(),o=Zh(),i=x.useContext(em)||m3,{applyStylesToPortals:a=!0,customStyleHooks_unstable:l,dir:c=r.dir,targetDocument:d=r.targetDocument,theme:f,overrides_unstable:p={}}=e,h=Iu(n,f),y=Iu(o,p),m=Iu(i,l),v=_d();var $;const{styleTagId:S,rule:j}=p3({theme:h,targetDocument:d,rendererAttributes:($=v.styleElementAttributes)!==null&&$!==void 0?$:g3});return{applyStylesToPortals:a,customStyleHooks_unstable:m,dir:c,targetDocument:d,theme:h,overrides_unstable:y,themeClassName:S,components:{root:"div"},root:Le(tn("div",{...e,dir:c,ref:rs(t,iw({targetDocument:d}))}),{elementType:"div"}),serverStyleProps:{cssRule:j,attributes:{...v.styleElementAttributes,id:S}}}};function Iu(e,t){return e&&t?{...e,...t}:e||t}function b3(){return x.useContext(B1)}function x3(e){const{applyStylesToPortals:t,customStyleHooks_unstable:r,dir:n,root:o,targetDocument:i,theme:a,themeClassName:l,overrides_unstable:c}=e,d=x.useMemo(()=>({dir:n,targetDocument:i}),[n,i]),[f]=x.useState(()=>({})),p=x.useMemo(()=>({textDirection:n}),[n]);return{customStyleHooks_unstable:r,overrides_unstable:c,provider:d,textDirection:n,iconDirection:p,tooltip:f,theme:a,themeClassName:t?o.className:l}}const dw=x.forwardRef((e,t)=>{const r=v3(e,t);c3(r);const n=x3(r);return w5(r,n)});dw.displayName="FluentProvider";var uw={exports:{}},fw={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(T,z){var P=T.length;T.push(z);e:for(;0<P;){var A=P-1>>>1,D=T[A];if(0<o(D,z))T[A]=z,T[P]=D,P=A;else break e}}function r(T){return T.length===0?null:T[0]}function n(T){if(T.length===0)return null;var z=T[0],P=T.pop();if(P!==z){T[0]=P;e:for(var A=0,D=T.length,ae=D>>>1;A<ae;){var ee=2*(A+1)-1,fe=T[ee],me=ee+1,Se=T[me];if(0>o(fe,P))me<D&&0>o(Se,fe)?(T[A]=Se,T[me]=P,A=me):(T[A]=fe,T[ee]=P,A=ee);else if(me<D&&0>o(Se,P))T[A]=Se,T[me]=P,A=me;else break e}}return z}function o(T,z){var P=T.sortIndex-z.sortIndex;return P!==0?P:T.id-z.id}if(e.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var a=Date,l=a.now();e.unstable_now=function(){return a.now()-l}}var c=[],d=[],f=1,p=null,h=3,y=!1,m=!1,v=!1,$=!1,S=typeof setTimeout=="function"?setTimeout:null,j=typeof clearTimeout=="function"?clearTimeout:null,k=typeof setImmediate<"u"?setImmediate:null;function w(T){for(var z=r(d);z!==null;){if(z.callback===null)n(d);else if(z.startTime<=T)n(d),z.sortIndex=z.expirationTime,t(c,z);else break;z=r(d)}}function _(T){if(v=!1,w(T),!m)if(r(c)!==null)m=!0,B||(B=!0,M());else{var z=r(d);z!==null&&I(_,z.startTime-T)}}var B=!1,E=-1,N=5,L=-1;function V(){return $?!0:!(e.unstable_now()-L<N)}function R(){if($=!1,B){var T=e.unstable_now();L=T;var z=!0;try{e:{m=!1,v&&(v=!1,j(E),E=-1),y=!0;var P=h;try{t:{for(w(T),p=r(c);p!==null&&!(p.expirationTime>T&&V());){var A=p.callback;if(typeof A=="function"){p.callback=null,h=p.priorityLevel;var D=A(p.expirationTime<=T);if(T=e.unstable_now(),typeof D=="function"){p.callback=D,w(T),z=!0;break t}p===r(c)&&n(c),w(T)}else n(c);p=r(c)}if(p!==null)z=!0;else{var ae=r(d);ae!==null&&I(_,ae.startTime-T),z=!1}}break e}finally{p=null,h=P,y=!1}z=void 0}}finally{z?M():B=!1}}}var M;if(typeof k=="function")M=function(){k(R)};else if(typeof MessageChannel<"u"){var W=new MessageChannel,Z=W.port2;W.port1.onmessage=R,M=function(){Z.postMessage(null)}}else M=function(){S(R,0)};function I(T,z){E=S(function(){T(e.unstable_now())},z)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(T){T.callback=null},e.unstable_forceFrameRate=function(T){0>T||125<T?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):N=0<T?Math.floor(1e3/T):5},e.unstable_getCurrentPriorityLevel=function(){return h},e.unstable_next=function(T){switch(h){case 1:case 2:case 3:var z=3;break;default:z=h}var P=h;h=z;try{return T()}finally{h=P}},e.unstable_requestPaint=function(){$=!0},e.unstable_runWithPriority=function(T,z){switch(T){case 1:case 2:case 3:case 4:case 5:break;default:T=3}var P=h;h=T;try{return z()}finally{h=P}},e.unstable_scheduleCallback=function(T,z,P){var A=e.unstable_now();switch(typeof P=="object"&&P!==null?(P=P.delay,P=typeof P=="number"&&0<P?A+P:A):P=A,T){case 1:var D=-1;break;case 2:D=250;break;case 5:D=1073741823;break;case 4:D=1e4;break;default:D=5e3}return D=P+D,T={id:f++,callback:z,priorityLevel:T,startTime:P,expirationTime:D,sortIndex:-1},P>A?(T.sortIndex=P,t(d,T),r(c)===null&&T===r(d)&&(v?(j(E),E=-1):v=!0,I(_,P-A))):(T.sortIndex=D,t(c,T),m||y||(m=!0,B||(B=!0,M()))),T},e.unstable_shouldYield=V,e.unstable_wrapCallback=function(T){var z=h;return function(){var P=h;h=z;try{return T.apply(this,arguments)}finally{h=P}}}})(fw);uw.exports=fw;var m0=uw.exports;const y3=e=>r=>{const n=x.useRef(r.value),o=x.useRef(0),i=x.useRef(null);return i.current||(i.current={value:n,version:o,listeners:[]}),Sr(()=>{n.current=r.value,o.current+=1,m0.unstable_runWithPriority(m0.unstable_NormalPriority,()=>{i.current.listeners.forEach(a=>{a([o.current,r.value])})})},[r.value]),x.createElement(e,{value:i.current},r.children)},w3=e=>{const t=x.createContext({value:{current:e},version:{current:-1},listeners:[]});return t.Provider=y3(t.Provider),delete t.Consumer,t},k3=(e,t)=>{const r=x.useContext(e),{value:{current:n},version:{current:o},listeners:i}=r,a=t(n),[l,c]=x.useState([n,a]),d=p=>{c(h=>{if(!p)return[n,a];if(p[0]<=o)return Object.is(h[1],a)?h:[n,a];try{if(Object.is(h[0],p[1]))return h;const y=t(p[1]);return Object.is(h[1],y)?h:[p[1],y]}catch{}return[h[0],h[1]]})};Object.is(l[1],a)||d(void 0);const f=mt(d);return Sr(()=>(i.push(f),()=>{const p=i.indexOf(f);i.splice(p,1)}),[f,i]),l[1]};function S3(e){const t=x.useContext(e);return t.version?t.version.current!==-1:!1}const cc="Enter",xl=" ",j3="Escape";function pw(e,t){const{disabled:r,disabledFocusable:n=!1,["aria-disabled"]:o,onClick:i,onKeyDown:a,onKeyUp:l,...c}=t??{},d=typeof o=="string"?o==="true":o,f=r||n||d,p=mt(m=>{f?(m.preventDefault(),m.stopPropagation()):i==null||i(m)}),h=mt(m=>{if(a==null||a(m),m.isDefaultPrevented())return;const v=m.key;if(f&&(v===cc||v===xl)){m.preventDefault(),m.stopPropagation();return}if(v===xl){m.preventDefault();return}else v===cc&&(m.preventDefault(),m.currentTarget.click())}),y=mt(m=>{if(l==null||l(m),m.isDefaultPrevented())return;const v=m.key;if(f&&(v===cc||v===xl)){m.preventDefault(),m.stopPropagation();return}v===xl&&(m.preventDefault(),m.currentTarget.click())});if(e==="button"||e===void 0)return{...c,disabled:r&&!n,"aria-disabled":n?!0:d,onClick:n?void 0:p,onKeyUp:n?void 0:l,onKeyDown:n?void 0:a};{const m=!!c.href;let v=m?void 0:"button";!v&&f&&(v="link");const $={role:v,tabIndex:n||!m&&!r?0:void 0,...c,onClick:p,onKeyUp:y,onKeyDown:h,"aria-disabled":f};return e==="a"&&f&&($.href=void 0),$}}const $3=ke({root:{mc9l5x:"f1w7gpdv",Bg96gwp:"fez10in"},rtl:{Bz10aip:"f13rod7r"}},{d:[".f1w7gpdv{display:inline;}",".fez10in{line-height:0;}",".f13rod7r{transform:scaleX(-1);}"]}),C3=(e,t)=>{const{filled:r,title:n,primaryFill:o="currentColor",...i}=e,a={...i,fill:o},l=$3(),c=y5();return a.className=ve(l.root,(t==null?void 0:t.flipInRtl)&&(c==null?void 0:c.textDirection)==="rtl"&&l.rtl,a.className),n&&(a["aria-label"]=n),!a["aria-label"]&&!a["aria-labelledby"]?a["aria-hidden"]=!0:a.role="img",a},_3=ke({root:{B8gzw0y:"f1dd5bof"}},{m:[["@media (forced-colors: active){.f1dd5bof{forced-color-adjust:auto;}}",{m:"(forced-colors: active)"}]]}),z3="fui-Icon",Lt=(e,t,r,n)=>{const o=t==="1em"?"20":t,i=x.forwardRef((a,l)=>{const c=_3(),d=C3(a,{flipInRtl:n==null?void 0:n.flipInRtl}),f={...d,className:ve(z3,d.className,c.root),ref:l,width:t,height:t,viewBox:`0 0 ${o} ${o}`,xmlns:"http://www.w3.org/2000/svg"};return typeof r=="string"?x.createElement("svg",{...f,dangerouslySetInnerHTML:{__html:r}}):x.createElement("svg",f,...r.map(p=>x.createElement("path",{d:p,fill:f.fill})))});return i.displayName=e,i},E3=Lt("CircleFilled","1em",["M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z"]),B3=Lt("Search20Regular","20",["M13.73 14.44a6.5 6.5 0 1 1 .7-.7l3.42 3.4a.5.5 0 0 1-.63.77l-.07-.06-3.42-3.41Zm-.71-.71A5.54 5.54 0 0 0 15 9.5a5.5 5.5 0 1 0-1.98 4.23Z"]),hw=Lt("Settings24Filled","24",["M12.01 2.25c.74 0 1.47.1 2.18.25.32.07.55.33.59.65l.17 1.53a1.38 1.38 0 0 0 1.92 1.11l1.4-.61c.3-.13.64-.06.85.17a9.8 9.8 0 0 1 2.2 3.8c.1.3 0 .63-.26.82l-1.25.92a1.38 1.38 0 0 0 0 2.22l1.25.92c.26.19.36.52.27.82a9.8 9.8 0 0 1-2.2 3.8.75.75 0 0 1-.85.17l-1.4-.62a1.38 1.38 0 0 0-1.93 1.12l-.17 1.52a.75.75 0 0 1-.58.65 9.52 9.52 0 0 1-4.4 0 .75.75 0 0 1-.57-.65l-.17-1.52a1.38 1.38 0 0 0-1.93-1.11l-1.4.62a.75.75 0 0 1-.85-.18 9.8 9.8 0 0 1-2.2-3.8c-.1-.3 0-.63.26-.82l1.25-.92a1.38 1.38 0 0 0 0-2.22l-1.24-.92a.75.75 0 0 1-.28-.82 9.8 9.8 0 0 1 2.2-3.8c.23-.23.57-.3.86-.17l1.4.62c.4.17.86.15 1.25-.08.38-.22.63-.6.68-1.04l.17-1.53a.75.75 0 0 1 .58-.65c.72-.16 1.45-.24 2.2-.25ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"]),T3=Lt("PersonAdd24Filled","24",["M11 17.5c0-1.29.38-2.49 1.02-3.5H4.25C3.01 14 2 15 2 16.25v.92c0 .57.18 1.13.51 1.6C4.06 20.92 6.58 22 10 22c.93 0 1.8-.08 2.6-.24A6.48 6.48 0 0 1 11 17.5ZM15 7A5 5 0 1 0 5 7a5 5 0 0 0 10 0Zm8 10.5a5.5 5.5 0 1 0-11 0 5.5 5.5 0 0 0 11 0ZM17.41 14h.18c.2.05.37.2.4.41l.01.09V17h2.6c.2.05.36.2.4.41v.18a.5.5 0 0 1-.4.4l-.1.01H18v2.59a.5.5 0 0 1-.41.4l-.09.01h-.09a.5.5 0 0 1-.4-.41L17 20.5V18H14.4a.5.5 0 0 1-.4-.41v-.18a.5.5 0 0 1 .4-.4l.1-.01H17v-2.59a.5.5 0 0 1 .41-.4Z"]),Cp=Lt("Edit24Filled","24",["M15.9 3.05a3.58 3.58 0 1 1 5.05 5.06l-.89.9L15 3.93l.9-.9ZM13.93 5l-10 10c-.4.4-.7.92-.82 1.48l-1.1 4.6a.75.75 0 0 0 .9.9l4.6-1.1A3.1 3.1 0 0 0 9 20.07l10-10L13.94 5Z"]),P3=Lt("ArrowLeft24Filled","24",["M10.3 19.72a1 1 0 0 0 1.4-1.43L6.33 13H20a1 1 0 0 0 0-2H6.33l5.37-5.28a1 1 0 0 0-1.4-1.42l-6.93 6.82c-.5.5-.5 1.3 0 1.78l6.92 6.83Z"]),g0=Lt("Shield24Filled","24",["M3 5.75c0-.41.34-.75.75-.75 2.66 0 5.26-.94 7.8-2.85.27-.2.63-.2.9 0C14.99 4.05 17.59 5 20.25 5c.41 0 .75.34.75.75V11c0 5-2.96 8.68-8.73 10.95a.75.75 0 0 1-.54 0C5.96 19.68 3 16 3 11V5.75Z"]),N3=Lt("Checkmark12Filled","12",["M9.76 3.2c.3.29.32.76.04 1.06l-4.25 4.5a.75.75 0 0 1-1.08.02L2.22 6.53a.75.75 0 0 1 1.06-1.06l1.7 1.7L8.7 3.24a.75.75 0 0 1 1.06-.04Z"]),F3=Lt("Checkmark16Filled","16",["M14.05 3.49c.28.3.27.77-.04 1.06l-7.93 7.47A.85.85 0 0 1 4.9 12L2.22 9.28a.75.75 0 1 1 1.06-1.06l2.24 2.27 7.47-7.04a.75.75 0 0 1 1.06.04Z"]),R3=Lt("CheckmarkCircle24Filled","24",["M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm3.22 6.97-4.47 4.47-1.97-1.97a.75.75 0 0 0-1.06 1.06l2.5 2.5c.3.3.77.3 1.06 0l5-5a.75.75 0 1 0-1.06-1.06Z"]),A3=Lt("Square12Filled","12",["M2 4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z"]),I3=Lt("Square16Filled","16",["M2 4.5A2.5 2.5 0 0 1 4.5 2h7A2.5 2.5 0 0 1 14 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 11.5v-7Z"]),Vc=Lt("Delete24Filled","24",["M10 5h4a2 2 0 1 0-4 0ZM8.5 5a3.5 3.5 0 1 1 7 0h5.75a.75.75 0 0 1 0 1.5h-1.32l-1.17 12.11A3.75 3.75 0 0 1 15.03 22H8.97a3.75 3.75 0 0 1-3.73-3.39L4.07 6.5H2.75a.75.75 0 0 1 0-1.5H8.5Zm2 4.75a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0v-7.5ZM14.25 9a.75.75 0 0 0-.75.75v7.5a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75Z"]),O3=Lt("Dismiss16Regular","16",["m2.59 2.72.06-.07a.5.5 0 0 1 .63-.06l.07.06L8 7.29l4.65-4.64a.5.5 0 0 1 .7.7L8.71 8l4.64 4.65c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L8 8.71l-4.65 4.64a.5.5 0 0 1-.7-.7L7.29 8 2.65 3.35a.5.5 0 0 1-.06-.63l.06-.07-.06.07Z"]),q3=Lt("Dismiss20Regular","20",["m4.09 4.22.06-.07a.5.5 0 0 1 .63-.06l.07.06L10 9.29l5.15-5.14a.5.5 0 0 1 .63-.06l.07.06c.18.17.2.44.06.63l-.06.07L10.71 10l5.14 5.15c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L10 10.71l-5.15 5.14a.5.5 0 0 1-.63.06l-.07-.06a.5.5 0 0 1-.06-.63l.06-.07L9.29 10 4.15 4.85a.5.5 0 0 1-.06-.63l.06-.07-.06.07Z"]),M3={durationUltraFast:50,durationFaster:100,durationFast:150,durationNormal:200,durationGentle:250,durationSlow:300,durationSlower:400,durationUltraSlow:500},L3={curveAccelerateMax:"cubic-bezier(0.9,0.1,1,0.2)",curveAccelerateMid:"cubic-bezier(1,0,1,1)",curveAccelerateMin:"cubic-bezier(0.8,0,0.78,1)",curveDecelerateMax:"cubic-bezier(0.1,0.9,0.2,1)",curveDecelerateMid:"cubic-bezier(0,0,0,1)",curveDecelerateMin:"cubic-bezier(0.33,0,0.1,1)",curveEasyEaseMax:"cubic-bezier(0.8,0,0.2,1)",curveEasyEase:"cubic-bezier(0.33,0,0.67,1)",curveLinear:"cubic-bezier(0,0,1,1)"},pt={...M3,...L3};function D3(e){if(e.playState==="running"){var t;if(e.overallProgress!==void 0){var r;const l=(r=e.overallProgress)!==null&&r!==void 0?r:0;return l>0&&l<1}var n;const i=Number((n=e.currentTime)!==null&&n!==void 0?n:0);var o;const a=Number((o=(t=e.effect)===null||t===void 0?void 0:t.getTiming().duration)!==null&&o!==void 0?o:0);return i>0&&i<a}return!1}const W3={fill:"forwards"},H3={duration:1};function U3(e){return{set playbackRate(t){e.forEach(r=>{r.playbackRate=t})},setMotionEndCallbacks(t,r){const n=e.map(o=>new Promise((i,a)=>{o.onfinish=()=>i(),o.oncancel=()=>a()}));Promise.all(n).then(()=>{t()}).catch(()=>{r()})},isRunning(){return e.some(t=>D3(t))},dispose:()=>{e.length=0},cancel:()=>{e.forEach(t=>{t.cancel()})},pause:()=>{e.forEach(t=>{t.pause()})},play:()=>{e.forEach(t=>{t.play()})},finish:()=>{e.forEach(t=>{t.finish()})},reverse:()=>{e.forEach(t=>{t.reverse()})}}}function V3(){var e;const t=typeof window<"u"&&typeof((e=window.Animation)===null||e===void 0?void 0:e.prototype.persist)=="function";return x.useCallback((r,n,o)=>{const i=Array.isArray(n)?n:[n],{isReducedMotion:a}=o,l=i.map(c=>{const{keyframes:d,reducedMotion:f=H3,...p}=c,{keyframes:h=d,...y}=f,m=a?h:d,v={...W3,...p,...a&&y};try{const S=r.animate(m,v);if(t)S==null||S.persist();else{const j=m[m.length-1];var $;Object.assign(($=r.style)!==null&&$!==void 0?$:{},j)}return S}catch{return null}}).filter(c=>!!c);return U3(l)},[t])}function mw(){"use no memo";return V3()}function gw(e){const t=x.useRef(void 0);return x.useImperativeHandle(e,()=>({setPlayState:r=>{if(r==="running"){var n;(n=t.current)===null||n===void 0||n.play()}if(r==="paused"){var o;(o=t.current)===null||o===void 0||o.pause()}},setPlaybackRate:r=>{t.current&&(t.current.playbackRate=r)}})),t}const G3="screen and (prefers-reduced-motion: reduce)";function vw(){const{targetDocument:e}=$r();var t;const r=(t=e==null?void 0:e.defaultView)!==null&&t!==void 0?t:null,n=x.useRef(!1),o=x.useCallback(()=>n.current,[]);return Sr(()=>{if(r===null||typeof r.matchMedia!="function")return;const i=r.matchMedia(G3);i.matches&&(n.current=!0);const a=l=>{n.current=l.matches};return i.addEventListener("change",a),()=>{i.removeEventListener("change",a)}},[r]),o}const K3=["@fluentui/react-motion: Invalid child element.",`
`,"Motion factories require a single child element to be passed. ","That element element should support ref forwarding i.e. it should be either an intrinsic element (e.g. div) or a component that uses React.forwardRef()."].join("");function bw(e,t=!0){const r=x.useRef(null);x.useEffect(()=>{},[t]);try{const n=x.Children.only(e);if(x.isValidElement(n))return[x.cloneElement(n,{ref:rs(r,I1(n))}),r]}catch{}throw new Error(K3)}const xw=x.createContext(void 0);xw.Provider;const yw=()=>{var e;return(e=x.useContext(xw))!==null&&e!==void 0?e:"default"},Y3=Symbol("MOTION_DEFINITION");function v0(e){return Object.assign(r=>{"use no memo";const{children:n,imperativeRef:o,onMotionFinish:i,onMotionStart:a,onMotionCancel:l,...c}=r,d=c,[f,p]=bw(n),h=gw(o),y=yw()==="skip",m=x.useRef({skipMotions:y,params:d}),v=mw(),$=vw(),S=mt(()=>{a==null||a(null)}),j=mt(()=>{i==null||i(null)}),k=mt(()=>{l==null||l(null)});return Sr(()=>{m.current={skipMotions:y,params:d}}),Sr(()=>{const w=p.current;if(w){const _=typeof e=="function"?e({element:w,...m.current.params}):e;S();const B=v(w,_,{isReducedMotion:$()});return h.current=B,B.setMotionEndCallbacks(j,k),m.current.skipMotions&&B.finish(),()=>{B.cancel()}}},[v,p,h,$,j,S,k]),f},{[Y3]:typeof e=="function"?e:()=>e})}const ww=x.createContext(void 0);ww.Provider;function X3(e=!1,t=!1){const r=x.useRef(t?e:!0),n=i5(),o=x.useCallback(i=>{r.current!==i&&(r.current=i,n())},[n]);return x.useEffect(()=>{e&&(r.current=e)}),[e||r.current,o]}const kw=Symbol("PRESENCE_MOTION_DEFINITION"),Q3=Symbol.for("interruptablePresence");function am(e){return Object.assign(t=>{"use no memo";const n={...x.useContext(ww),...t},o=yw()==="skip",{appear:i,children:a,imperativeRef:l,onExit:c,onMotionFinish:d,onMotionStart:f,onMotionCancel:p,visible:h,unmountOnExit:y,...m}=n,v=m,[$,S]=X3(h,y),[j,k]=bw(a,$),w=gw(l),_=x.useRef({appear:i,params:v,skipMotions:o}),B=mw(),E=o5(),N=vw(),L=mt(M=>{f==null||f(null,{direction:M})}),V=mt(M=>{d==null||d(null,{direction:M}),M==="exit"&&y&&(S(!1),c==null||c())}),R=mt(M=>{p==null||p(null,{direction:M})});return Sr(()=>{_.current={appear:i,params:v,skipMotions:o}}),Sr(()=>{const M=k.current;if(!M)return;let W;function Z(){W&&(T&&W.isRunning()||(W.cancel(),w.current=void 0))}const I=typeof e=="function"?e({element:M,..._.current.params}):e,T=I[Q3];if(T&&(W=w.current,W&&W.isRunning()))return W.reverse(),Z;const z=h?I.enter:I.exit,P=h?"enter":"exit",A=!_.current.appear&&E,D=_.current.skipMotions;return A||L(P),W=B(M,z,{isReducedMotion:N()}),A?(W.finish(),Z):(w.current=W,W.setMotionEndCallbacks(()=>V(P),()=>R(P)),D&&W.finish(),Z)},[B,k,w,N,V,L,R,h]),x.useEffect(()=>{if(y&&!$){var M;(M=w.current)===null||M===void 0||M.dispose()}},[w,y,$]),$?j:null},{[kw]:typeof e=="function"?e:()=>e},{In:v0(typeof e=="function"?(...t)=>e(...t).enter:e.enter),Out:v0(typeof e=="function"?(...t)=>e(...t).exit:e.exit)})}function J3(e,t){return n=>e({...t,...n})}function Da(e,t){const r=e[kw],n=J3(r,t);return am(n)}function Sw(e,t){const{as:r,children:n,...o}=e??{};if(e===null){const a=!t.defaultProps.visible&&t.defaultProps.unmountOnExit,l=(c,d)=>a?null:x.createElement(x.Fragment,null,d.children);return{[Hc]:l,[Di]:t.elementType}}const i={...t.defaultProps,...o,[Di]:t.elementType};return typeof n=="function"&&(i[Hc]=n),i}const Gc=({direction:e,duration:t,easing:r=pt.curveLinear,delay:n=0,outOpacity:o=0,inOpacity:i=1})=>{const a=[{opacity:o},{opacity:i}];return e==="exit"&&a.reverse(),{keyframes:a,duration:t,easing:r,delay:n,fill:"both"}},Z3=({duration:e=pt.durationNormal,easing:t=pt.curveEasyEase,delay:r=0,exitDuration:n=e,exitEasing:o=t,exitDelay:i=r,outOpacity:a=0,inOpacity:l=1})=>({enter:Gc({direction:"enter",duration:e,easing:t,delay:r,outOpacity:a,inOpacity:l}),exit:Gc({direction:"exit",duration:n,easing:o,delay:i,outOpacity:a,inOpacity:l})}),jw=am(Z3);Da(jw,{duration:pt.durationFast});const e4=Da(jw,{duration:pt.durationGentle}),b0=({direction:e,duration:t,easing:r=pt.curveLinear,delay:n=0,outScale:o=.9,inScale:i=1})=>{const a=[{scale:o},{scale:i}];return e==="exit"&&a.reverse(),{keyframes:a,duration:t,easing:r,delay:n}},t4=({duration:e=pt.durationGentle,easing:t=pt.curveDecelerateMax,delay:r=0,exitDuration:n=pt.durationNormal,exitEasing:o=pt.curveAccelerateMax,exitDelay:i=r,outScale:a=.9,inScale:l=1,animateOpacity:c=!0})=>{const d=[b0({direction:"enter",duration:e,easing:t,delay:r,outScale:a,inScale:l})],f=[b0({direction:"exit",duration:n,easing:o,delay:i,outScale:a,inScale:l})];return c&&(d.push(Gc({direction:"enter",duration:e,easing:t,delay:r})),f.push(Gc({direction:"exit",duration:n,easing:o,delay:i}))),{enter:d,exit:f}},lm=am(t4);Da(lm,{duration:pt.durationNormal,exitDuration:pt.durationFast});Da(lm,{duration:pt.durationSlow,exitDuration:pt.durationGentle});const r4=(e,t)=>{const{shape:r="circular",size:n="medium",iconPosition:o="before",appearance:i="filled",color:a="brand"}=e;return{shape:r,size:n,iconPosition:o,appearance:i,color:a,components:{root:"div",icon:"span"},root:Le(tn("div",{ref:t,...e}),{elementType:"div"}),icon:ar(e.icon,{elementType:"span"})}},x0={root:"fui-Badge",icon:"fui-Badge__icon"},n4=Ue("r1iycov","r115jdol",[".r1iycov{display:inline-flex;box-sizing:border-box;align-items:center;justify-content:center;position:relative;font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase200);font-weight:var(--fontWeightSemibold);line-height:var(--lineHeightBase200);height:20px;min-width:20px;padding:0 calc(var(--spacingHorizontalXS) + var(--spacingHorizontalXXS));border-radius:var(--borderRadiusCircular);border-color:var(--colorTransparentStroke);}",'.r1iycov::after{content:"";position:absolute;top:0;left:0;bottom:0;right:0;border-style:solid;border-color:inherit;border-width:var(--strokeWidthThin);border-radius:inherit;}',".r115jdol{display:inline-flex;box-sizing:border-box;align-items:center;justify-content:center;position:relative;font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase200);font-weight:var(--fontWeightSemibold);line-height:var(--lineHeightBase200);height:20px;min-width:20px;padding:0 calc(var(--spacingHorizontalXS) + var(--spacingHorizontalXXS));border-radius:var(--borderRadiusCircular);border-color:var(--colorTransparentStroke);}",'.r115jdol::after{content:"";position:absolute;top:0;right:0;bottom:0;left:0;border-style:solid;border-color:inherit;border-width:var(--strokeWidthThin);border-radius:inherit;}']),o4=ke({fontSmallToTiny:{Bahqtrf:"fk6fouc",Be2twd7:"f13mqy1h",Bhrd7zp:"fl43uef",Bg96gwp:"fcpl73t"},tiny:{a9b677:"f16dn6v3",Bqenvij:"f3mu39s",Be2twd7:"f130uwy9",Bg96gwp:"fod1mrr",Bf4jedk:"f18p0k4z",Byoj8tv:0,uwmqm3:0,z189sj:0,z8tnut:0,B0ocmuz:"f19jm9xf"},"extra-small":{a9b677:"fpd43o0",Bqenvij:"f30q22z",Be2twd7:"f1tccstq",Bg96gwp:"f1y3arg5",Bf4jedk:"f18p0k4z",Byoj8tv:0,uwmqm3:0,z189sj:0,z8tnut:0,B0ocmuz:"f19jm9xf"},small:{Bf4jedk:"fq2vo04",Bqenvij:"fd461yt",Byoj8tv:0,uwmqm3:0,z189sj:0,z8tnut:0,B0ocmuz:"fupdldz"},medium:{},large:{Bf4jedk:"f17fgpbq",Bqenvij:"frvgh55",Byoj8tv:0,uwmqm3:0,z189sj:0,z8tnut:0,B0ocmuz:"f1996nqw"},"extra-large":{Bf4jedk:"fwbmr0d",Bqenvij:"f1d2rq10",Byoj8tv:0,uwmqm3:0,z189sj:0,z8tnut:0,B0ocmuz:"fty64o7"},square:{Beyfa6y:0,Bbmb7ep:0,Btl43ni:0,B7oj6ja:0,Dimara:"f1fabniw"},rounded:{Beyfa6y:0,Bbmb7ep:0,Btl43ni:0,B7oj6ja:0,Dimara:"ft85np5"},roundedSmallToTiny:{Beyfa6y:0,Bbmb7ep:0,Btl43ni:0,B7oj6ja:0,Dimara:"fq9zq91"},circular:{},borderGhost:{ap17g6:"f10ludwy"},filled:{},"filled-brand":{De3pzq:"ffp7eso",sj55zd:"f1phragk"},"filled-danger":{De3pzq:"fdl5y0r",sj55zd:"f1phragk"},"filled-important":{De3pzq:"f1c73kur",sj55zd:"fr0bkrk"},"filled-informative":{De3pzq:"f3vzo32",sj55zd:"f11d4kpn"},"filled-severe":{De3pzq:"f1s438gw",sj55zd:"f1phragk"},"filled-subtle":{De3pzq:"fxugw4r",sj55zd:"f19n0e5"},"filled-success":{De3pzq:"flxk52p",sj55zd:"f1phragk"},"filled-warning":{De3pzq:"ffq97bm",sj55zd:"ff5vbop"},ghost:{},"ghost-brand":{sj55zd:"f16muhyy"},"ghost-danger":{sj55zd:"f1whyuy6"},"ghost-important":{sj55zd:"f19n0e5"},"ghost-informative":{sj55zd:"f11d4kpn"},"ghost-severe":{sj55zd:"f1l8vj45"},"ghost-subtle":{sj55zd:"fonrgv7"},"ghost-success":{sj55zd:"f1m7fhi8"},"ghost-warning":{sj55zd:"fpti2h4"},outline:{g2u3we:"f23ftbb",h3c5rm:["f1gkuv52","f1p1bl80"],B9xav0g:"fioka3i",zhjwy3:["f1p1bl80","f1gkuv52"]},"outline-brand":{sj55zd:"f16muhyy"},"outline-danger":{sj55zd:"f1whyuy6",g2u3we:"fyqpifd",h3c5rm:["f3ukxca","f1k7dugc"],B9xav0g:"f1njxb2b",zhjwy3:["f1k7dugc","f3ukxca"]},"outline-important":{sj55zd:"f11d4kpn",g2u3we:"fq0vr37",h3c5rm:["f1byw159","f11cr0be"],B9xav0g:"f1c1zstj",zhjwy3:["f11cr0be","f1byw159"]},"outline-informative":{sj55zd:"f11d4kpn",g2u3we:"f68mrw8",h3c5rm:["f7pw515","fw35ms5"],B9xav0g:"frpde29",zhjwy3:["fw35ms5","f7pw515"]},"outline-severe":{sj55zd:"f1l8vj45"},"outline-subtle":{sj55zd:"fonrgv7"},"outline-success":{sj55zd:"f1m7fhi8",g2u3we:"f1mmhl11",h3c5rm:["f1tjpp2f","f1ocn5n7"],B9xav0g:"f1gjv25d",zhjwy3:["f1ocn5n7","f1tjpp2f"]},"outline-warning":{sj55zd:"fpti2h4"},tint:{},"tint-brand":{De3pzq:"f16xkysk",sj55zd:"faj9fo0",g2u3we:"f161y7kd",h3c5rm:["f1c8dzaj","f1sl6hi9"],B9xav0g:"f1619yhw",zhjwy3:["f1sl6hi9","f1c8dzaj"]},"tint-danger":{De3pzq:"ff0poqj",sj55zd:"f1hcrxcs",g2u3we:"f1oqjm8o",h3c5rm:["fkgrb8g","frb5wm0"],B9xav0g:"f1iai1ph",zhjwy3:["frb5wm0","fkgrb8g"]},"tint-important":{De3pzq:"f945g0u",sj55zd:"fr0bkrk",g2u3we:"fghlq4f",h3c5rm:["f1gn591s","fjscplz"],B9xav0g:"fb073pr",zhjwy3:["fjscplz","f1gn591s"]},"tint-informative":{De3pzq:"f1ctqxl6",sj55zd:"f11d4kpn",g2u3we:"f68mrw8",h3c5rm:["f7pw515","fw35ms5"],B9xav0g:"frpde29",zhjwy3:["fw35ms5","f7pw515"]},"tint-severe":{De3pzq:"f1xzsg4",sj55zd:"f1k5f75o",g2u3we:"fxy9dsj",h3c5rm:["f54u6j2","fcm23ze"],B9xav0g:"f4vf0uq",zhjwy3:["fcm23ze","f54u6j2"]},"tint-subtle":{De3pzq:"fxugw4r",sj55zd:"f11d4kpn",g2u3we:"f68mrw8",h3c5rm:["f7pw515","fw35ms5"],B9xav0g:"frpde29",zhjwy3:["fw35ms5","f7pw515"]},"tint-success":{De3pzq:"f2vsrz6",sj55zd:"ffmvakt",g2u3we:"fdmic9h",h3c5rm:["f196y6m","fetptd8"],B9xav0g:"f1pev5xq",zhjwy3:["fetptd8","f196y6m"]},"tint-warning":{De3pzq:"f10s6hli",sj55zd:"f42v8de",g2u3we:"fn9i3n",h3c5rm:["f1aw8cx4","f51if14"],B9xav0g:"fvq8iai",zhjwy3:["f51if14","f1aw8cx4"]}},{d:[".fk6fouc{font-family:var(--fontFamilyBase);}",".f13mqy1h{font-size:var(--fontSizeBase100);}",".fl43uef{font-weight:var(--fontWeightSemibold);}",".fcpl73t{line-height:var(--lineHeightBase100);}",".f16dn6v3{width:6px;}",".f3mu39s{height:6px;}",".f130uwy9{font-size:4px;}",".fod1mrr{line-height:4px;}",".f18p0k4z{min-width:unset;}",[".f19jm9xf{padding:unset;}",{p:-1}],".fpd43o0{width:10px;}",".f30q22z{height:10px;}",".f1tccstq{font-size:6px;}",".f1y3arg5{line-height:6px;}",[".f19jm9xf{padding:unset;}",{p:-1}],".fq2vo04{min-width:16px;}",".fd461yt{height:16px;}",[".fupdldz{padding:0 calc(var(--spacingHorizontalXXS) + var(--spacingHorizontalXXS));}",{p:-1}],".f17fgpbq{min-width:24px;}",".frvgh55{height:24px;}",[".f1996nqw{padding:0 calc(var(--spacingHorizontalXS) + var(--spacingHorizontalXXS));}",{p:-1}],".fwbmr0d{min-width:32px;}",".f1d2rq10{height:32px;}",[".fty64o7{padding:0 calc(var(--spacingHorizontalSNudge) + var(--spacingHorizontalXXS));}",{p:-1}],[".f1fabniw{border-radius:var(--borderRadiusNone);}",{p:-1}],[".ft85np5{border-radius:var(--borderRadiusMedium);}",{p:-1}],[".fq9zq91{border-radius:var(--borderRadiusSmall);}",{p:-1}],".f10ludwy::after{display:none;}",".ffp7eso{background-color:var(--colorBrandBackground);}",".f1phragk{color:var(--colorNeutralForegroundOnBrand);}",".fdl5y0r{background-color:var(--colorPaletteRedBackground3);}",".f1c73kur{background-color:var(--colorNeutralForeground1);}",".fr0bkrk{color:var(--colorNeutralBackground1);}",".f3vzo32{background-color:var(--colorNeutralBackground5);}",".f11d4kpn{color:var(--colorNeutralForeground3);}",".f1s438gw{background-color:var(--colorPaletteDarkOrangeBackground3);}",".fxugw4r{background-color:var(--colorNeutralBackground1);}",".f19n0e5{color:var(--colorNeutralForeground1);}",".flxk52p{background-color:var(--colorPaletteGreenBackground3);}",".ffq97bm{background-color:var(--colorPaletteYellowBackground3);}",".ff5vbop{color:var(--colorNeutralForeground1Static);}",".f16muhyy{color:var(--colorBrandForeground1);}",".f1whyuy6{color:var(--colorPaletteRedForeground3);}",".f1l8vj45{color:var(--colorPaletteDarkOrangeForeground3);}",".fonrgv7{color:var(--colorNeutralForegroundStaticInverted);}",".f1m7fhi8{color:var(--colorPaletteGreenForeground3);}",".fpti2h4{color:var(--colorPaletteYellowForeground2);}",".f23ftbb{border-top-color:currentColor;}",".f1gkuv52{border-right-color:currentColor;}",".f1p1bl80{border-left-color:currentColor;}",".fioka3i{border-bottom-color:currentColor;}",".fyqpifd{border-top-color:var(--colorPaletteRedBorder2);}",".f3ukxca{border-right-color:var(--colorPaletteRedBorder2);}",".f1k7dugc{border-left-color:var(--colorPaletteRedBorder2);}",".f1njxb2b{border-bottom-color:var(--colorPaletteRedBorder2);}",".fq0vr37{border-top-color:var(--colorNeutralStrokeAccessible);}",".f1byw159{border-right-color:var(--colorNeutralStrokeAccessible);}",".f11cr0be{border-left-color:var(--colorNeutralStrokeAccessible);}",".f1c1zstj{border-bottom-color:var(--colorNeutralStrokeAccessible);}",".f68mrw8{border-top-color:var(--colorNeutralStroke2);}",".f7pw515{border-right-color:var(--colorNeutralStroke2);}",".fw35ms5{border-left-color:var(--colorNeutralStroke2);}",".frpde29{border-bottom-color:var(--colorNeutralStroke2);}",".f1mmhl11{border-top-color:var(--colorPaletteGreenBorder2);}",".f1tjpp2f{border-right-color:var(--colorPaletteGreenBorder2);}",".f1ocn5n7{border-left-color:var(--colorPaletteGreenBorder2);}",".f1gjv25d{border-bottom-color:var(--colorPaletteGreenBorder2);}",".f16xkysk{background-color:var(--colorBrandBackground2);}",".faj9fo0{color:var(--colorBrandForeground2);}",".f161y7kd{border-top-color:var(--colorBrandStroke2);}",".f1c8dzaj{border-right-color:var(--colorBrandStroke2);}",".f1sl6hi9{border-left-color:var(--colorBrandStroke2);}",".f1619yhw{border-bottom-color:var(--colorBrandStroke2);}",".ff0poqj{background-color:var(--colorPaletteRedBackground1);}",".f1hcrxcs{color:var(--colorPaletteRedForeground1);}",".f1oqjm8o{border-top-color:var(--colorPaletteRedBorder1);}",".fkgrb8g{border-right-color:var(--colorPaletteRedBorder1);}",".frb5wm0{border-left-color:var(--colorPaletteRedBorder1);}",".f1iai1ph{border-bottom-color:var(--colorPaletteRedBorder1);}",".f945g0u{background-color:var(--colorNeutralForeground3);}",".fghlq4f{border-top-color:var(--colorTransparentStroke);}",".f1gn591s{border-right-color:var(--colorTransparentStroke);}",".fjscplz{border-left-color:var(--colorTransparentStroke);}",".fb073pr{border-bottom-color:var(--colorTransparentStroke);}",".f1ctqxl6{background-color:var(--colorNeutralBackground4);}",".f1xzsg4{background-color:var(--colorPaletteDarkOrangeBackground1);}",".f1k5f75o{color:var(--colorPaletteDarkOrangeForeground1);}",".fxy9dsj{border-top-color:var(--colorPaletteDarkOrangeBorder1);}",".f54u6j2{border-right-color:var(--colorPaletteDarkOrangeBorder1);}",".fcm23ze{border-left-color:var(--colorPaletteDarkOrangeBorder1);}",".f4vf0uq{border-bottom-color:var(--colorPaletteDarkOrangeBorder1);}",".f2vsrz6{background-color:var(--colorPaletteGreenBackground1);}",".ffmvakt{color:var(--colorPaletteGreenForeground1);}",".fdmic9h{border-top-color:var(--colorPaletteGreenBorder1);}",".f196y6m{border-right-color:var(--colorPaletteGreenBorder1);}",".fetptd8{border-left-color:var(--colorPaletteGreenBorder1);}",".f1pev5xq{border-bottom-color:var(--colorPaletteGreenBorder1);}",".f10s6hli{background-color:var(--colorPaletteYellowBackground1);}",".f42v8de{color:var(--colorPaletteYellowForeground1);}",".fn9i3n{border-top-color:var(--colorPaletteYellowBorder1);}",".f1aw8cx4{border-right-color:var(--colorPaletteYellowBorder1);}",".f51if14{border-left-color:var(--colorPaletteYellowBorder1);}",".fvq8iai{border-bottom-color:var(--colorPaletteYellowBorder1);}"]}),i4=Ue("rttl5z0",null,[".rttl5z0{display:flex;line-height:1;margin:0 calc(-1 * var(--spacingHorizontalXXS));font-size:12px;}"]),s4=ke({beforeText:{t21cq0:["f1t8l4o1","f11juvx6"]},afterText:{Frg6f3:["f11juvx6","f1t8l4o1"]},beforeTextXL:{t21cq0:["f1rs9grm","f1kwmkpi"]},afterTextXL:{Frg6f3:["f1kwmkpi","f1rs9grm"]},tiny:{Be2twd7:"f1tccstq"},"extra-small":{Be2twd7:"fnmn6fi"},small:{Be2twd7:"f1ugzwwg"},medium:{},large:{Be2twd7:"f4ybsrx"},"extra-large":{Be2twd7:"fe5j1ua"}},{d:[".f1t8l4o1{margin-right:calc(var(--spacingHorizontalXXS) + var(--spacingHorizontalXXS));}",".f11juvx6{margin-left:calc(var(--spacingHorizontalXXS) + var(--spacingHorizontalXXS));}",".f1rs9grm{margin-right:calc(var(--spacingHorizontalXS) + var(--spacingHorizontalXXS));}",".f1kwmkpi{margin-left:calc(var(--spacingHorizontalXS) + var(--spacingHorizontalXXS));}",".f1tccstq{font-size:6px;}",".fnmn6fi{font-size:10px;}",".f1ugzwwg{font-size:12px;}",".f4ybsrx{font-size:16px;}",".fe5j1ua{font-size:20px;}"]}),a4=e=>{"use no memo";const t=n4(),r=o4(),n=e.size==="small"||e.size==="extra-small"||e.size==="tiny";e.root.className=ve(x0.root,t,n&&r.fontSmallToTiny,r[e.size],r[e.shape],e.shape==="rounded"&&n&&r.roundedSmallToTiny,e.appearance==="ghost"&&r.borderGhost,r[e.appearance],r[`${e.appearance}-${e.color}`],e.root.className);const o=i4(),i=s4();if(e.icon){let a;x.Children.toArray(e.root.children).length>0&&(e.size==="extra-large"?a=e.iconPosition==="after"?i.afterTextXL:i.beforeTextXL:a=e.iconPosition==="after"?i.afterText:i.beforeText),e.icon.className=ve(x0.icon,o,a,i[e.size],e.icon.className)}return e},l4=e=>Cr(e.root,{children:[e.iconPosition==="before"&&e.icon&&de(e.icon,{}),e.root.children,e.iconPosition==="after"&&e.icon&&de(e.icon,{})]}),$w=x.forwardRef((e,t)=>{const r=r4(e,t);return a4(r),Qt("useBadgeStyles_unstable")(r),l4(r)});$w.displayName="Badge";function c4(e){return wp(e)?{element:e}:typeof e=="object"?e===null?{element:null}:e:{}}const d4=ke({root:{qhf8xq:"f1euv43f",Bhzewxz:"f15twtuk",oyh7mz:["f1vgc2s3","f1e31b4d"],j35jbq:["f1e31b4d","f1vgc2s3"],Bj3rh1h:"f494woh"}},{d:[".f1euv43f{position:absolute;}",".f15twtuk{top:0;}",".f1vgc2s3{left:0;}",".f1e31b4d{right:0;}",".f494woh{z-index:1000000;}"]}),Cw=la.useInsertionEffect,u4=e=>{"use no memo";const{className:t,dir:r,focusVisibleRef:n,targetNode:o}=e,i=x.useMemo(()=>{if(o===void 0||e.disabled)return null;const a=o.ownerDocument.createElement("div");return o.appendChild(a),a},[o,e.disabled]);return x.useMemo(()=>{i&&(i.className=t,i.setAttribute("dir",r),i.setAttribute("data-portal-node","true"),n.current=i)},[t,r,i,n]),x.useEffect(()=>()=>{i==null||i.remove()},[i]),i},f4=()=>{let e;function t(n,o){return e||(o&&(e=n.ownerDocument.createElement("div"),n.appendChild(e)),e)}function r(){e&&(e.remove(),e=void 0)}return{get:t,dispose:r}},p4=e=>{"use no memo";const{className:t,dir:r,focusVisibleRef:n,targetNode:o}=e,[i]=x.useState(f4),a=x.useMemo(()=>o===void 0||e.disabled?null:new Proxy({},{get(l,c){if(c==="nodeType")return 1;if(c==="remove"){const p=i.get(o,!1);return p&&p.childNodes.length===0&&i.dispose(),()=>{}}const d=i.get(o,!0),f=d?d[c]:void 0;return typeof f=="function"?f.bind(d):f},set(l,c,d){const f=c==="_virtual"||c==="focusVisible",p=f?i.get(o,!1):i.get(o,!0);return f&&!p?!0:p?(Object.assign(p,{[c]:d}),!0):!1}}),[i,o,e.disabled]);return Cw(()=>{if(!a)return;const l=t.split(" ").filter(Boolean);return a.classList.add(...l),a.setAttribute("dir",r),a.setAttribute("data-portal-node","true"),n.current=a,()=>{a.classList.remove(...l),a.removeAttribute("dir")}},[t,r,a,n]),x.useEffect(()=>()=>{a==null||a.remove()},[a]),a},h4=Cw?p4:u4,m4=e=>{"use no memo";const{targetDocument:t,dir:r}=$r(),n=QC(),o=iw(),i=d4(),a=WC(),l={dir:r,disabled:e.disabled,focusVisibleRef:o,className:ve(a,i.root,e.className),targetNode:n??(t==null?void 0:t.body)};return h4(l)},g4=e=>{const{element:t,className:r}=c4(e.mountNode),n=x.useRef(null),o=m4({disabled:!!t,className:r}),i=t??o,a={children:e.children,mountNode:i,virtualParentRootRef:n};return x.useEffect(()=>{if(!i)return;const l=n.current,c=i.contains(l);if(l&&!c)return n0(i,l),()=>{n0(i,void 0)}},[n,i]),a},v4=e=>x.createElement("span",{hidden:!0,ref:e.virtualParentRootRef},e.mountNode&&l1.createPortal(x.createElement(x.Fragment,null,e.children,x.createElement("span",{hidden:!0})),e.mountNode)),_w=e=>{const t=g4(e);return v4(t)};_w.displayName="Portal";const b4=e=>{const{iconOnly:t,iconPosition:r}=e;return Cr(e.root,{children:[r!=="after"&&e.icon&&de(e.icon,{}),!t&&e.root.children,r==="after"&&e.icon&&de(e.icon,{})]})},zw=x.createContext(void 0),x4={};zw.Provider;const y4=()=>{var e;return(e=x.useContext(zw))!==null&&e!==void 0?e:x4},w4=(e,t)=>{const{size:r}=y4(),{appearance:n="secondary",shape:o="rounded",size:i=r??"medium",...a}=e,l=k4(a,t);return{appearance:n,shape:o,size:i,...l}},k4=(e,t)=>{const{icon:r,iconPosition:n="before",...o}=e,i=ar(r,{elementType:"span"});var a,l;return{disabled:(a=e.disabled)!==null&&a!==void 0?a:!1,disabledFocusable:(l=e.disabledFocusable)!==null&&l!==void 0?l:!1,iconPosition:n,iconOnly:!!(i!=null&&i.children&&!e.children),components:{root:"button",icon:"span"},root:Le(pw(o.as,o),{elementType:"button",defaultProps:{ref:t,type:e.as!=="a"?"button":void 0}}),icon:i}},y0={root:"fui-Button",icon:"fui-Button__icon"},S4=Ue("r1f29ykk",null,{r:[".r1f29ykk{align-items:center;box-sizing:border-box;display:inline-flex;justify-content:center;text-decoration-line:none;vertical-align:middle;margin:0;overflow:hidden;background-color:var(--colorNeutralBackground1);color:var(--colorNeutralForeground1);border:var(--strokeWidthThin) solid var(--colorNeutralStroke1);font-family:var(--fontFamilyBase);outline-style:none;padding:5px var(--spacingHorizontalM);min-width:96px;border-radius:var(--borderRadiusMedium);font-size:var(--fontSizeBase300);font-weight:var(--fontWeightSemibold);line-height:var(--lineHeightBase300);transition-duration:var(--durationFaster);transition-property:background,border,color;transition-timing-function:var(--curveEasyEase);}",".r1f29ykk:hover{background-color:var(--colorNeutralBackground1Hover);border-color:var(--colorNeutralStroke1Hover);color:var(--colorNeutralForeground1Hover);cursor:pointer;}",".r1f29ykk:hover:active,.r1f29ykk:active:focus-visible{background-color:var(--colorNeutralBackground1Pressed);border-color:var(--colorNeutralStroke1Pressed);color:var(--colorNeutralForeground1Pressed);outline-style:none;}",".r1f29ykk[data-fui-focus-visible]{border-color:var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);border-width:1px;outline:var(--strokeWidthThick) solid var(--colorTransparentStroke);box-shadow:0 0 0 var(--strokeWidthThin) var(--colorStrokeFocus2) inset;z-index:1;}"],s:["@media screen and (prefers-reduced-motion: reduce){.r1f29ykk{transition-duration:0.01ms;}}","@media (forced-colors: active){.r1f29ykk:focus{border-color:ButtonText;}.r1f29ykk:hover{background-color:HighlightText;border-color:Highlight;color:Highlight;forced-color-adjust:none;}.r1f29ykk:hover:active,.r1f29ykk:active:focus-visible{background-color:HighlightText;border-color:Highlight;color:Highlight;forced-color-adjust:none;}}","@supports (-moz-appearance:button){.r1f29ykk[data-fui-focus-visible]{box-shadow:0 0 0 calc(var(--strokeWidthThin) + 0.25px) var(--colorStrokeFocus2) inset;}}"]}),j4=Ue("rywnvv2",null,[".rywnvv2{align-items:center;display:inline-flex;justify-content:center;font-size:20px;height:20px;width:20px;--fui-Button__icon--spacing:var(--spacingHorizontalSNudge);}"]),$4=ke({outline:{De3pzq:"f1c21dwh",Jwef8y:"fjxutwb",Bpjbzib:"fkoldzo"},primary:{De3pzq:"ffp7eso",g2u3we:"f1p3nwhy",h3c5rm:["f11589ue","f1pdflbu"],B9xav0g:"f1q5o8ev",zhjwy3:["f1pdflbu","f11589ue"],sj55zd:"f1phragk",Jwef8y:"f15wkkf3",Bgoe8wy:"f1s2uweq",Bwzppfd:["fr80ssc","fecsdlb"],oetu4i:"f1ukrpxl",gg5e9n:["fecsdlb","fr80ssc"],Bi91k9c:"f1rq72xc",Bpjbzib:"f1ksv2xa",im15vp:"fhvnf4x",Hjvxdg:["fb6swo4","f232fm2"],Gpfmf1:"f1klyf7k",ustxxc:["f232fm2","fb6swo4"],Brsut9c:"f1d6mv4x",By8wz76:"f1nz3ub2",Bcq6wej:"fag2qd2",Jcjdmf:["fmvhcg7","f14bpyus"],sc4o1m:"f1o3dhpw",Bosien3:["f14bpyus","fmvhcg7"],B7iucu3:"fqc85l4",B8gzw0y:"f1h3a8gf",Bbkh6qg:"fkiggi6",F230oe:"f8gmj8i",Bdw8ktp:["f1ap8nzx","fjag8bx"],Bj1xduy:"f1igan7k",Bhh2cfd:["fjag8bx","f1ap8nzx"],Bahaeuw:"f1v3eptx",Bv2bamp:"f1ysmecq",vxuvv6:"faulsx",Bli9q98:["f79t15f","f8qmx7k"],Bx2tt8t:"fbtzoaq",yad0b3:["f8qmx7k","f79t15f"],j2fop7:"fd4bjan"},secondary:{},subtle:{De3pzq:"fhovq9v",g2u3we:"f1p3nwhy",h3c5rm:["f11589ue","f1pdflbu"],B9xav0g:"f1q5o8ev",zhjwy3:["f1pdflbu","f11589ue"],sj55zd:"fkfq4zb",Jwef8y:"f1t94bn6",Bgoe8wy:"f1s2uweq",Bwzppfd:["fr80ssc","fecsdlb"],oetu4i:"f1ukrpxl",gg5e9n:["fecsdlb","fr80ssc"],Bi91k9c:"fnwyq0v",Bk3fhr4:"ft1hn21",Bmfj8id:"fuxngvv",Bbdnnc7:"fy5bs14",Bpjbzib:"f1q1yqic",im15vp:"fhvnf4x",Hjvxdg:["fb6swo4","f232fm2"],Gpfmf1:"f1klyf7k",ustxxc:["f232fm2","fb6swo4"],Brsut9c:"fwga7ee",Bqou3pl:"f1nhwcv0",Bsnehw8:"f1gm6xmp",wsxvnf:"f1xxsver",Bahaeuw:"f1v3eptx",Buhizc3:"fivsta0",j2fop7:"fd4bjan",Bqabnb4:"f3m6zum"},transparent:{De3pzq:"f1c21dwh",g2u3we:"f1p3nwhy",h3c5rm:["f11589ue","f1pdflbu"],B9xav0g:"f1q5o8ev",zhjwy3:["f1pdflbu","f11589ue"],sj55zd:"fkfq4zb",Jwef8y:"fjxutwb",Bgoe8wy:"f1s2uweq",Bwzppfd:["fr80ssc","fecsdlb"],oetu4i:"f1ukrpxl",gg5e9n:["fecsdlb","fr80ssc"],Bi91k9c:"f139oj5f",Bk3fhr4:"ft1hn21",Bmfj8id:"fuxngvv",Bpjbzib:"fkoldzo",im15vp:"fhvnf4x",Hjvxdg:["fb6swo4","f232fm2"],Gpfmf1:"f1klyf7k",ustxxc:["f232fm2","fb6swo4"],Brsut9c:"f1l983o9",Bqou3pl:"f1nhwcv0",Bsnehw8:"f1gm6xmp",Bbkh6qg:"fxoo9op",Bahaeuw:"f1v3eptx",Bv2bamp:"f1i0gk12",j2fop7:"fd4bjan"},circular:{Beyfa6y:0,Bbmb7ep:0,Btl43ni:0,B7oj6ja:0,Dimara:"f44lkw9"},rounded:{},square:{Beyfa6y:0,Bbmb7ep:0,Btl43ni:0,B7oj6ja:0,Dimara:"f1fabniw"},small:{Bf4jedk:"fh7ncta",Byoj8tv:0,uwmqm3:0,z189sj:0,z8tnut:0,B0ocmuz:"fneth5b",Beyfa6y:0,Bbmb7ep:0,Btl43ni:0,B7oj6ja:0,Dimara:"ft85np5",Be2twd7:"fy9rknc",Bhrd7zp:"figsok6",Bg96gwp:"fwrc4pm"},smallWithIcon:{Byoj8tv:"f1brlhvm",z8tnut:"f1sl3k7w"},medium:{},large:{Bf4jedk:"f14es27b",Byoj8tv:0,uwmqm3:0,z189sj:0,z8tnut:0,B0ocmuz:"f4db1ww",Beyfa6y:0,Bbmb7ep:0,Btl43ni:0,B7oj6ja:0,Dimara:"ft85np5",Be2twd7:"fod5ikn",Bhrd7zp:"fl43uef",Bg96gwp:"faaz57k"},largeWithIcon:{Byoj8tv:"fy7v416",z8tnut:"f1a1bwwz"}},{d:[".f1c21dwh{background-color:var(--colorTransparentBackground);}",".ffp7eso{background-color:var(--colorBrandBackground);}",".f1p3nwhy{border-top-color:transparent;}",".f11589ue{border-right-color:transparent;}",".f1pdflbu{border-left-color:transparent;}",".f1q5o8ev{border-bottom-color:transparent;}",".f1phragk{color:var(--colorNeutralForegroundOnBrand);}",".fhovq9v{background-color:var(--colorSubtleBackground);}",".fkfq4zb{color:var(--colorNeutralForeground2);}",[".f44lkw9{border-radius:var(--borderRadiusCircular);}",{p:-1}],[".f1fabniw{border-radius:var(--borderRadiusNone);}",{p:-1}],".fh7ncta{min-width:64px;}",[".fneth5b{padding:3px var(--spacingHorizontalS);}",{p:-1}],[".ft85np5{border-radius:var(--borderRadiusMedium);}",{p:-1}],".fy9rknc{font-size:var(--fontSizeBase200);}",".figsok6{font-weight:var(--fontWeightRegular);}",".fwrc4pm{line-height:var(--lineHeightBase200);}",".f1brlhvm{padding-bottom:1px;}",".f1sl3k7w{padding-top:1px;}",".f14es27b{min-width:96px;}",[".f4db1ww{padding:8px var(--spacingHorizontalL);}",{p:-1}],[".ft85np5{border-radius:var(--borderRadiusMedium);}",{p:-1}],".fod5ikn{font-size:var(--fontSizeBase400);}",".fl43uef{font-weight:var(--fontWeightSemibold);}",".faaz57k{line-height:var(--lineHeightBase400);}",".fy7v416{padding-bottom:7px;}",".f1a1bwwz{padding-top:7px;}"],h:[".fjxutwb:hover{background-color:var(--colorTransparentBackgroundHover);}",".fkoldzo:hover:active,.fkoldzo:active:focus-visible{background-color:var(--colorTransparentBackgroundPressed);}",".f15wkkf3:hover{background-color:var(--colorBrandBackgroundHover);}",".f1s2uweq:hover{border-top-color:transparent;}",".fr80ssc:hover{border-right-color:transparent;}",".fecsdlb:hover{border-left-color:transparent;}",".f1ukrpxl:hover{border-bottom-color:transparent;}",".f1rq72xc:hover{color:var(--colorNeutralForegroundOnBrand);}",".f1ksv2xa:hover:active,.f1ksv2xa:active:focus-visible{background-color:var(--colorBrandBackgroundPressed);}",".fhvnf4x:hover:active,.fhvnf4x:active:focus-visible{border-top-color:transparent;}",".fb6swo4:hover:active,.fb6swo4:active:focus-visible{border-right-color:transparent;}",".f232fm2:hover:active,.f232fm2:active:focus-visible{border-left-color:transparent;}",".f1klyf7k:hover:active,.f1klyf7k:active:focus-visible{border-bottom-color:transparent;}",".f1d6mv4x:hover:active,.f1d6mv4x:active:focus-visible{color:var(--colorNeutralForegroundOnBrand);}",".f1t94bn6:hover{background-color:var(--colorSubtleBackgroundHover);}",".fnwyq0v:hover{color:var(--colorNeutralForeground2Hover);}",".ft1hn21:hover .fui-Icon-filled{display:inline;}",".fuxngvv:hover .fui-Icon-regular{display:none;}",".fy5bs14:hover .fui-Button__icon{color:var(--colorNeutralForeground2BrandHover);}",".f1q1yqic:hover:active,.f1q1yqic:active:focus-visible{background-color:var(--colorSubtleBackgroundPressed);}",".fwga7ee:hover:active,.fwga7ee:active:focus-visible{color:var(--colorNeutralForeground2Pressed);}",".f1nhwcv0:hover:active .fui-Icon-filled,.f1nhwcv0:active:focus-visible .fui-Icon-filled{display:inline;}",".f1gm6xmp:hover:active .fui-Icon-regular,.f1gm6xmp:active:focus-visible .fui-Icon-regular{display:none;}",".f1xxsver:hover:active .fui-Button__icon,.f1xxsver:active:focus-visible .fui-Button__icon{color:var(--colorNeutralForeground2BrandPressed);}",".f139oj5f:hover{color:var(--colorNeutralForeground2BrandHover);}",".f1l983o9:hover:active,.f1l983o9:active:focus-visible{color:var(--colorNeutralForeground2BrandPressed);}"],m:[["@media (forced-colors: active){.f1nz3ub2{background-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fag2qd2{border-top-color:HighlightText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f14bpyus{border-left-color:HighlightText;}.fmvhcg7{border-right-color:HighlightText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1o3dhpw{border-bottom-color:HighlightText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fqc85l4{color:HighlightText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1h3a8gf{forced-color-adjust:none;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fkiggi6:hover{background-color:HighlightText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f8gmj8i:hover{border-top-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1ap8nzx:hover{border-right-color:Highlight;}.fjag8bx:hover{border-left-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1igan7k:hover{border-bottom-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1v3eptx:hover{color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1ysmecq:hover:active,.f1ysmecq:active:focus-visible{background-color:HighlightText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.faulsx:hover:active,.faulsx:active:focus-visible{border-top-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f79t15f:hover:active,.f79t15f:active:focus-visible{border-right-color:Highlight;}.f8qmx7k:hover:active,.f8qmx7k:active:focus-visible{border-left-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fbtzoaq:hover:active,.fbtzoaq:active:focus-visible{border-bottom-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fd4bjan:hover:active,.fd4bjan:active:focus-visible{color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fivsta0:hover .fui-Button__icon{color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f3m6zum:hover:active .fui-Button__icon,.f3m6zum:active:focus-visible .fui-Button__icon{color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fxoo9op:hover{background-color:var(--colorTransparentBackground);}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1i0gk12:hover:active,.f1i0gk12:active:focus-visible{background-color:var(--colorTransparentBackground);}}",{m:"(forced-colors: active)"}]]}),C4=ke({base:{De3pzq:"f1bg9a2p",g2u3we:"f1jj8ep1",h3c5rm:["f15xbau","fy0fskl"],B9xav0g:"f4ikngz",zhjwy3:["fy0fskl","f15xbau"],sj55zd:"f1s2aq7o",Bceei9c:"fdrzuqr",Bfinmwp:"f15x8b5r",Jwef8y:"f1falr9n",Bgoe8wy:"f12mpcsy",Bwzppfd:["f1gwvigk","f18rmfxp"],oetu4i:"f1jnshp0",gg5e9n:["f18rmfxp","f1gwvigk"],Bi91k9c:"fvgxktp",eoavqd:"fphbwmw",Bk3fhr4:"f19vpps7",Bmfj8id:"fv5swzo",Bbdnnc7:"f1al02dq",Bpjbzib:"f1jct5ie",im15vp:"f13txml0",Hjvxdg:["f1ncddno","f1axfvow"],Gpfmf1:"f1z04ada",ustxxc:["f1axfvow","f1ncddno"],Brsut9c:"f1uhomfy",Bses4qk:"fy9mucy",Bqou3pl:"f1g9va8i",Bsnehw8:"fwgvudy",wsxvnf:"fom6jww"},highContrast:{By8wz76:"f14ptb23",Bcq6wej:"f9dbb4x",Jcjdmf:["f3qs60o","f5u9ap2"],sc4o1m:"fwd1oij",Bosien3:["f5u9ap2","f3qs60o"],B7iucu3:"f1cyfu5x",Grqk0h:"f127ot8j",h3ptyc:"f19etb0b",Buw724y:["f4f984j","fw441p0"],Buk7464:"f3d22hf",Hwei09:["fw441p0","f4f984j"],Bbkh6qg:"fj8k9ua",F230oe:"fifrq0d",Bdw8ktp:["f196mwp7","fnekfq"],Bj1xduy:"f1l6uprw",Bhh2cfd:["fnekfq","f196mwp7"],Bahaeuw:"fa9u7a5",Buhizc3:"f1m71e0y",Bv2bamp:"fw24f3",vxuvv6:"f1nznrny",Bli9q98:["fq8nxuu","f1ao3jkc"],Bx2tt8t:"ftoixeo",yad0b3:["f1ao3jkc","fq8nxuu"],j2fop7:"fpmuzpx",Bqabnb4:"f168odog"},outline:{De3pzq:"f1c21dwh",Jwef8y:"f9ql6rf",Bpjbzib:"f9r0db0"},primary:{g2u3we:"f1p3nwhy",h3c5rm:["f11589ue","f1pdflbu"],B9xav0g:"f1q5o8ev",zhjwy3:["f1pdflbu","f11589ue"],Bgoe8wy:"f1s2uweq",Bwzppfd:["fr80ssc","fecsdlb"],oetu4i:"f1ukrpxl",gg5e9n:["fecsdlb","fr80ssc"],im15vp:"fhvnf4x",Hjvxdg:["fb6swo4","f232fm2"],Gpfmf1:"f1klyf7k",ustxxc:["f232fm2","fb6swo4"]},secondary:{},subtle:{De3pzq:"f1c21dwh",g2u3we:"f1p3nwhy",h3c5rm:["f11589ue","f1pdflbu"],B9xav0g:"f1q5o8ev",zhjwy3:["f1pdflbu","f11589ue"],Jwef8y:"f9ql6rf",Bgoe8wy:"f1s2uweq",Bwzppfd:["fr80ssc","fecsdlb"],oetu4i:"f1ukrpxl",gg5e9n:["fecsdlb","fr80ssc"],Bpjbzib:"f9r0db0",im15vp:"fhvnf4x",Hjvxdg:["fb6swo4","f232fm2"],Gpfmf1:"f1klyf7k",ustxxc:["f232fm2","fb6swo4"]},transparent:{De3pzq:"f1c21dwh",g2u3we:"f1p3nwhy",h3c5rm:["f11589ue","f1pdflbu"],B9xav0g:"f1q5o8ev",zhjwy3:["f1pdflbu","f11589ue"],Jwef8y:"f9ql6rf",Bgoe8wy:"f1s2uweq",Bwzppfd:["fr80ssc","fecsdlb"],oetu4i:"f1ukrpxl",gg5e9n:["fecsdlb","fr80ssc"],Bpjbzib:"f9r0db0",im15vp:"fhvnf4x",Hjvxdg:["fb6swo4","f232fm2"],Gpfmf1:"f1klyf7k",ustxxc:["f232fm2","fb6swo4"]}},{d:[".f1bg9a2p{background-color:var(--colorNeutralBackgroundDisabled);}",".f1jj8ep1{border-top-color:var(--colorNeutralStrokeDisabled);}",".f15xbau{border-right-color:var(--colorNeutralStrokeDisabled);}",".fy0fskl{border-left-color:var(--colorNeutralStrokeDisabled);}",".f4ikngz{border-bottom-color:var(--colorNeutralStrokeDisabled);}",".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}",".fdrzuqr{cursor:not-allowed;}",".f15x8b5r .fui-Button__icon{color:var(--colorNeutralForegroundDisabled);}",".f1c21dwh{background-color:var(--colorTransparentBackground);}",".f1p3nwhy{border-top-color:transparent;}",".f11589ue{border-right-color:transparent;}",".f1pdflbu{border-left-color:transparent;}",".f1q5o8ev{border-bottom-color:transparent;}"],h:[".f1falr9n:hover{background-color:var(--colorNeutralBackgroundDisabled);}",".f12mpcsy:hover{border-top-color:var(--colorNeutralStrokeDisabled);}",".f1gwvigk:hover{border-right-color:var(--colorNeutralStrokeDisabled);}",".f18rmfxp:hover{border-left-color:var(--colorNeutralStrokeDisabled);}",".f1jnshp0:hover{border-bottom-color:var(--colorNeutralStrokeDisabled);}",".fvgxktp:hover{color:var(--colorNeutralForegroundDisabled);}",".fphbwmw:hover{cursor:not-allowed;}",".f19vpps7:hover .fui-Icon-filled{display:none;}",".fv5swzo:hover .fui-Icon-regular{display:inline;}",".f1al02dq:hover .fui-Button__icon{color:var(--colorNeutralForegroundDisabled);}",".f1jct5ie:hover:active,.f1jct5ie:active:focus-visible{background-color:var(--colorNeutralBackgroundDisabled);}",".f13txml0:hover:active,.f13txml0:active:focus-visible{border-top-color:var(--colorNeutralStrokeDisabled);}",".f1ncddno:hover:active,.f1ncddno:active:focus-visible{border-right-color:var(--colorNeutralStrokeDisabled);}",".f1axfvow:hover:active,.f1axfvow:active:focus-visible{border-left-color:var(--colorNeutralStrokeDisabled);}",".f1z04ada:hover:active,.f1z04ada:active:focus-visible{border-bottom-color:var(--colorNeutralStrokeDisabled);}",".f1uhomfy:hover:active,.f1uhomfy:active:focus-visible{color:var(--colorNeutralForegroundDisabled);}",".fy9mucy:hover:active,.fy9mucy:active:focus-visible{cursor:not-allowed;}",".f1g9va8i:hover:active .fui-Icon-filled,.f1g9va8i:active:focus-visible .fui-Icon-filled{display:none;}",".fwgvudy:hover:active .fui-Icon-regular,.fwgvudy:active:focus-visible .fui-Icon-regular{display:inline;}",".fom6jww:hover:active .fui-Button__icon,.fom6jww:active:focus-visible .fui-Button__icon{color:var(--colorNeutralForegroundDisabled);}",".f9ql6rf:hover{background-color:var(--colorTransparentBackground);}",".f9r0db0:hover:active,.f9r0db0:active:focus-visible{background-color:var(--colorTransparentBackground);}",".f1s2uweq:hover{border-top-color:transparent;}",".fr80ssc:hover{border-right-color:transparent;}",".fecsdlb:hover{border-left-color:transparent;}",".f1ukrpxl:hover{border-bottom-color:transparent;}",".fhvnf4x:hover:active,.fhvnf4x:active:focus-visible{border-top-color:transparent;}",".fb6swo4:hover:active,.fb6swo4:active:focus-visible{border-right-color:transparent;}",".f232fm2:hover:active,.f232fm2:active:focus-visible{border-left-color:transparent;}",".f1klyf7k:hover:active,.f1klyf7k:active:focus-visible{border-bottom-color:transparent;}"],m:[["@media (forced-colors: active){.f14ptb23{background-color:ButtonFace;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f9dbb4x{border-top-color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f3qs60o{border-right-color:GrayText;}.f5u9ap2{border-left-color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fwd1oij{border-bottom-color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1cyfu5x{color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f127ot8j .fui-Button__icon{color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f19etb0b:focus{border-top-color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f4f984j:focus{border-right-color:GrayText;}.fw441p0:focus{border-left-color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f3d22hf:focus{border-bottom-color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fj8k9ua:hover{background-color:ButtonFace;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fifrq0d:hover{border-top-color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f196mwp7:hover{border-right-color:GrayText;}.fnekfq:hover{border-left-color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1l6uprw:hover{border-bottom-color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fa9u7a5:hover{color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1m71e0y:hover .fui-Button__icon{color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fw24f3:hover:active,.fw24f3:active:focus-visible{background-color:ButtonFace;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1nznrny:hover:active,.f1nznrny:active:focus-visible{border-top-color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1ao3jkc:hover:active,.f1ao3jkc:active:focus-visible{border-left-color:GrayText;}.fq8nxuu:hover:active,.fq8nxuu:active:focus-visible{border-right-color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.ftoixeo:hover:active,.ftoixeo:active:focus-visible{border-bottom-color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fpmuzpx:hover:active,.fpmuzpx:active:focus-visible{color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f168odog:hover:active .fui-Button__icon,.f168odog:active:focus-visible .fui-Button__icon{color:GrayText;}}",{m:"(forced-colors: active)"}]]}),_4=ke({circular:{Bw81rd7:0,kdpuga:0,dm238s:0,B6xbmo0:0,B3whbx2:"f1062rbf"},rounded:{},square:{Bw81rd7:0,kdpuga:0,dm238s:0,B6xbmo0:0,B3whbx2:"fj0ryk1"},primary:{B8q5s1w:"f17t0x8g",Bci5o5g:["f194v5ow","fk7jm04"],n8qw10:"f1qgg65p",Bdrgwmp:["fk7jm04","f194v5ow"],j6ew2k:["fhgccpy","fjo7pq6"],he4mth:"f32wu9k",Byr4aka:"fu5nqqq",lks7q5:["f13prjl2","f1nl83rv"],Bnan3qt:"f1czftr5",k1dn9:["f1nl83rv","f13prjl2"],Bqsb82s:["fixhny3","f18mfu3r"],jg1oma:"feygou5"},small:{Bw81rd7:0,kdpuga:0,dm238s:0,B6xbmo0:0,B3whbx2:"fazmxh"},medium:{},large:{Bw81rd7:0,kdpuga:0,dm238s:0,B6xbmo0:0,B3whbx2:"f1b6alqh"}},{d:[[".f1062rbf[data-fui-focus-visible]{border-radius:var(--borderRadiusCircular);}",{p:-1}],[".fj0ryk1[data-fui-focus-visible]{border-radius:var(--borderRadiusNone);}",{p:-1}],".f17t0x8g[data-fui-focus-visible]{border-top-color:var(--colorStrokeFocus2);}",".f194v5ow[data-fui-focus-visible]{border-right-color:var(--colorStrokeFocus2);}",".fk7jm04[data-fui-focus-visible]{border-left-color:var(--colorStrokeFocus2);}",".f1qgg65p[data-fui-focus-visible]{border-bottom-color:var(--colorStrokeFocus2);}",".fhgccpy[data-fui-focus-visible]{box-shadow:var(--shadow2),0 0 0 var(--strokeWidthThin) var(--colorStrokeFocus2) inset,0 0 0 var(--strokeWidthThick) var(--colorNeutralForegroundOnBrand) inset;}",".fjo7pq6[data-fui-focus-visible]{box-shadow:var(--shadow2),0 0 0 var(--strokeWidthThin) var(--colorStrokeFocus2) inset,0 0 0 var(--strokeWidthThick) var(--colorNeutralForegroundOnBrand) inset;}",".f32wu9k[data-fui-focus-visible]:hover{box-shadow:var(--shadow2),0 0 0 var(--strokeWidthThin) var(--colorStrokeFocus2) inset;}",".fu5nqqq[data-fui-focus-visible]:hover{border-top-color:var(--colorStrokeFocus2);}",".f13prjl2[data-fui-focus-visible]:hover{border-right-color:var(--colorStrokeFocus2);}",".f1nl83rv[data-fui-focus-visible]:hover{border-left-color:var(--colorStrokeFocus2);}",".f1czftr5[data-fui-focus-visible]:hover{border-bottom-color:var(--colorStrokeFocus2);}",[".fazmxh[data-fui-focus-visible]{border-radius:var(--borderRadiusSmall);}",{p:-1}],[".f1b6alqh[data-fui-focus-visible]{border-radius:var(--borderRadiusLarge);}",{p:-1}]],t:["@supports (-moz-appearance:button){.f18mfu3r[data-fui-focus-visible]{box-shadow:var(--shadow2),0 0 0 calc(var(--strokeWidthThin) + 0.25px) var(--colorStrokeFocus2) inset,0 0 0 var(--strokeWidthThick) var(--colorNeutralForegroundOnBrand) inset;}.fixhny3[data-fui-focus-visible]{box-shadow:var(--shadow2),0 0 0 calc(var(--strokeWidthThin) + 0.25px) var(--colorStrokeFocus2) inset,0 0 0 var(--strokeWidthThick) var(--colorNeutralForegroundOnBrand) inset;}}","@supports (-moz-appearance:button){.feygou5[data-fui-focus-visible]:hover{box-shadow:var(--shadow2),0 0 0 calc(var(--strokeWidthThin) + 0.25px) var(--colorStrokeFocus2) inset;}}"]}),z4=ke({small:{Byoj8tv:0,uwmqm3:0,z189sj:0,z8tnut:0,B0ocmuz:"fu97m5z",Bf4jedk:"f17fgpbq",B2u0y6b:"f1jt17bm"},medium:{Byoj8tv:0,uwmqm3:0,z189sj:0,z8tnut:0,B0ocmuz:"f18ktai2",Bf4jedk:"fwbmr0d",B2u0y6b:"f44c6la"},large:{Byoj8tv:0,uwmqm3:0,z189sj:0,z8tnut:0,B0ocmuz:"f1hbd1aw",Bf4jedk:"f12clzc2",B2u0y6b:"fjy1crr"}},{d:[[".fu97m5z{padding:1px;}",{p:-1}],".f17fgpbq{min-width:24px;}",".f1jt17bm{max-width:24px;}",[".f18ktai2{padding:5px;}",{p:-1}],".fwbmr0d{min-width:32px;}",".f44c6la{max-width:32px;}",[".f1hbd1aw{padding:7px;}",{p:-1}],".f12clzc2{min-width:40px;}",".fjy1crr{max-width:40px;}"]}),E4=ke({small:{Be2twd7:"fe5j1ua",Bqenvij:"fjamq6b",a9b677:"f64fuq3",Bqrlyyl:"fbaiahx"},medium:{},large:{Be2twd7:"f1rt2boy",Bqenvij:"frvgh55",a9b677:"fq4mcun",Bqrlyyl:"f1exjqw5"},before:{t21cq0:["f1nizpg2","f1a695kz"]},after:{Frg6f3:["f1a695kz","f1nizpg2"]}},{d:[".fe5j1ua{font-size:20px;}",".fjamq6b{height:20px;}",".f64fuq3{width:20px;}",".fbaiahx{--fui-Button__icon--spacing:var(--spacingHorizontalXS);}",".f1rt2boy{font-size:24px;}",".frvgh55{height:24px;}",".fq4mcun{width:24px;}",".f1exjqw5{--fui-Button__icon--spacing:var(--spacingHorizontalSNudge);}",".f1nizpg2{margin-right:var(--fui-Button__icon--spacing);}",".f1a695kz{margin-left:var(--fui-Button__icon--spacing);}"]}),B4=e=>{"use no memo";const t=S4(),r=j4(),n=$4(),o=C4(),i=_4(),a=z4(),l=E4(),{appearance:c,disabled:d,disabledFocusable:f,icon:p,iconOnly:h,iconPosition:y,shape:m,size:v}=e;return e.root.className=ve(y0.root,t,c&&n[c],n[v],p&&v==="small"&&n.smallWithIcon,p&&v==="large"&&n.largeWithIcon,n[m],(d||f)&&o.base,(d||f)&&o.highContrast,c&&(d||f)&&o[c],c==="primary"&&i.primary,i[v],i[m],h&&a[v],e.root.className),e.icon&&(e.icon.className=ve(y0.icon,r,!!e.root.children&&l[y],l[v],e.icon.className)),e},ne=x.forwardRef((e,t)=>{const r=w4(e,t);return B4(r),Qt("useButtonStyles_unstable")(r),b4(r)});ne.displayName="Button";const Ew=x.createContext(void 0);Ew.Provider;const T4=()=>x.useContext(Ew);function Fd(e,t){return P4(T4(),e,t)}function P4(e,t,r){if(!e)return t;t={...t};const{generatedControlId:n,hintId:o,labelFor:i,labelId:a,required:l,validationMessageId:c,validationState:d}=e;if(n){var f,p;(p=(f=t).id)!==null&&p!==void 0||(f.id=n)}if(a&&(!(r!=null&&r.supportsLabelFor)||i!==t.id)){var h,y,m;(m=(h=t)[y="aria-labelledby"])!==null&&m!==void 0||(h[y]=a)}if((c||o)&&(t["aria-describedby"]=[c,o,t==null?void 0:t["aria-describedby"]].filter(Boolean).join(" ")),d==="error"){var v,$,S;(S=(v=t)[$="aria-invalid"])!==null&&S!==void 0||(v[$]=!0)}if(l)if(r!=null&&r.supportsRequired){var j,k;(k=(j=t).required)!==null&&k!==void 0||(j.required=!0)}else{var w,_,B;(B=(w=t)[_="aria-required"])!==null&&B!==void 0||(w[_]=!0)}if(r!=null&&r.supportsSize){var E,N;(N=(E=t).size)!==null&&N!==void 0||(E.size=e.size)}return t}const N4=(e,t)=>{const{disabled:r=!1,required:n=!1,weight:o="regular",size:i="medium"}=e;return{disabled:r,required:ar(n===!0?"*":n||void 0,{defaultProps:{"aria-hidden":"true"},elementType:"span"}),weight:o,size:i,components:{root:"label",required:"span"},root:Le(tn("label",{ref:t,...e}),{elementType:"label"})}},F4=e=>Cr(e.root,{children:[e.root.children,e.required&&de(e.required,{})]}),w0={root:"fui-Label",required:"fui-Label__required"},R4=ke({root:{Bahqtrf:"fk6fouc",sj55zd:"f19n0e5"},disabled:{sj55zd:"f1s2aq7o",B7iucu3:"f1cyfu5x"},required:{sj55zd:"f1whyuy6",uwmqm3:["fruq291","f7x41pl"]},small:{Be2twd7:"fy9rknc",Bg96gwp:"fwrc4pm"},medium:{Be2twd7:"fkhj508",Bg96gwp:"f1i3iumi"},large:{Be2twd7:"fod5ikn",Bg96gwp:"faaz57k",Bhrd7zp:"fl43uef"},semibold:{Bhrd7zp:"fl43uef"}},{d:[".fk6fouc{font-family:var(--fontFamilyBase);}",".f19n0e5{color:var(--colorNeutralForeground1);}",".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}",".f1whyuy6{color:var(--colorPaletteRedForeground3);}",".fruq291{padding-left:var(--spacingHorizontalXS);}",".f7x41pl{padding-right:var(--spacingHorizontalXS);}",".fy9rknc{font-size:var(--fontSizeBase200);}",".fwrc4pm{line-height:var(--lineHeightBase200);}",".fkhj508{font-size:var(--fontSizeBase300);}",".f1i3iumi{line-height:var(--lineHeightBase300);}",".fod5ikn{font-size:var(--fontSizeBase400);}",".faaz57k{line-height:var(--lineHeightBase400);}",".fl43uef{font-weight:var(--fontWeightSemibold);}"],m:[["@media (forced-colors: active){.f1cyfu5x{color:GrayText;}}",{m:"(forced-colors: active)"}]]}),A4=e=>{"use no memo";const t=R4();return e.root.className=ve(w0.root,t.root,e.disabled&&t.disabled,t[e.size],e.weight==="semibold"&&t.semibold,e.root.className),e.required&&(e.required.className=ve(w0.required,t.required,e.disabled&&t.disabled,e.required.className)),e},Je=x.forwardRef((e,t)=>{const r=N4(e,t);return A4(r),Qt("useLabelStyles_unstable")(r),F4(r)});Je.displayName="Label";const I4=(e,t)=>{"use no memo";e=Fd(e,{supportsLabelFor:!0,supportsRequired:!0});const{disabled:r=!1,required:n,shape:o="square",size:i="medium",labelPosition:a="after",onChange:l}=e,[c,d]=es({defaultState:e.defaultChecked,state:e.checked,initialState:!1}),f=Ed({props:e,primarySlotTagName:"input",excludedPropNames:["checked","defaultChecked","size","onChange"]}),p=c==="mixed",h=ts("checkbox-",f.primary.id);let y;p?o==="circular"?y=x.createElement(E3,null):y=i==="large"?x.createElement(I3,null):x.createElement(A3,null):c&&(y=i==="large"?x.createElement(F3,null):x.createElement(N3,null));const m={shape:o,checked:c,disabled:r,size:i,labelPosition:a,components:{root:"span",input:"input",indicator:"div",label:Je},root:Le(e.root,{defaultProps:{ref:sm(),...f.root},elementType:"span"}),input:Le(e.input,{defaultProps:{type:"checkbox",id:h,ref:t,checked:c===!0,...f.primary},elementType:"input"}),label:ar(e.label,{defaultProps:{htmlFor:h,disabled:r,required:n,size:"medium"},elementType:Je}),indicator:ar(e.indicator,{renderByDefault:!0,defaultProps:{"aria-hidden":!0,children:y},elementType:"div"})};m.input.onChange=mt($=>{const S=$.currentTarget.indeterminate?"mixed":$.currentTarget.checked;l==null||l($,{checked:S}),d(S)});const v=rs(m.input.ref);return m.input.ref=v,Sr(()=>{v.current&&(v.current.indeterminate=p)},[v,p]),m},O4=e=>Cr(e.root,{children:[de(e.input,{}),e.labelPosition==="before"&&e.label&&de(e.label,{}),e.indicator&&de(e.indicator,{}),e.labelPosition==="after"&&e.label&&de(e.label,{})]}),yl={root:"fui-Checkbox",label:"fui-Checkbox__label",input:"fui-Checkbox__input",indicator:"fui-Checkbox__indicator"},q4=Ue("r1nzur1d","r128arqq",{r:[".r1nzur1d{position:relative;display:inline-flex;cursor:pointer;max-width:fit-content;vertical-align:middle;color:var(--colorNeutralForeground3);}",".r1nzur1d:focus{outline-style:none;}",".r1nzur1d:focus-visible{outline-style:none;}",".r1nzur1d[data-fui-focus-within]:focus-within{border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;}",'.r1nzur1d[data-fui-focus-within]:focus-within::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);right:calc(2px * -1);bottom:calc(2px * -1);left:calc(2px * -1);}',".r128arqq{position:relative;display:inline-flex;cursor:pointer;max-width:fit-content;vertical-align:middle;color:var(--colorNeutralForeground3);}",".r128arqq:focus{outline-style:none;}",".r128arqq:focus-visible{outline-style:none;}",".r128arqq[data-fui-focus-within]:focus-within{border-top-color:transparent;border-left-color:transparent;border-bottom-color:transparent;border-right-color:transparent;}",'.r128arqq[data-fui-focus-within]:focus-within::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);left:calc(2px * -1);bottom:calc(2px * -1);right:calc(2px * -1);}'],s:["@media (forced-colors: active){.r1nzur1d[data-fui-focus-within]:focus-within::after{border-top-color:Highlight;border-right-color:Highlight;border-bottom-color:Highlight;border-left-color:Highlight;}}","@media (forced-colors: active){.r128arqq[data-fui-focus-within]:focus-within::after{border-top-color:Highlight;border-left-color:Highlight;border-bottom-color:Highlight;border-right-color:Highlight;}}"]}),M4=ke({unchecked:{Bi91k9c:"f3p8bqa",pv5h1i:"fium13f",lj723h:"f1r2dosr",Hnthvo:"f1729es6"},checked:{sj55zd:"f19n0e5",wkncrt:"f35ds98",zxk7z7:"f12mnkne",Hmsnfy:"fei9a8h",e6czan:"fix56y3",pv5h1i:"f1bcv2js",qbydtz:"f7dr4go",Hnthvo:"f1r5cpua"},mixed:{sj55zd:"f19n0e5",Hmsnfy:"f1l27tf0",zxk7z7:"fcilktj",pv5h1i:"f1lphd54",Bunfa6h:"f1obkvq7",Hnthvo:"f2gmbuh",B15ykmv:"f1oy4fa1"},disabled:{Bceei9c:"f158kwzp",sj55zd:"f1s2aq7o",Hmsnfy:"f1w7mfl5",zxk7z7:"fcoafq6",B7iucu3:"f1cyfu5x",Bptavk6:"f1lwde8o"}},{h:[".f3p8bqa:hover{color:var(--colorNeutralForeground2);}",".fium13f:hover{--fui-Checkbox__indicator--borderColor:var(--colorNeutralStrokeAccessibleHover);}",".fix56y3:hover{--fui-Checkbox__indicator--backgroundColor:var(--colorCompoundBrandBackgroundHover);}",".f1bcv2js:hover{--fui-Checkbox__indicator--borderColor:var(--colorCompoundBrandBackgroundHover);}",".f1lphd54:hover{--fui-Checkbox__indicator--borderColor:var(--colorCompoundBrandStrokeHover);}",".f1obkvq7:hover{--fui-Checkbox__indicator--color:var(--colorCompoundBrandForeground1Hover);}"],a:[".f1r2dosr:active{color:var(--colorNeutralForeground1);}",".f1729es6:active{--fui-Checkbox__indicator--borderColor:var(--colorNeutralStrokeAccessiblePressed);}",".f7dr4go:active{--fui-Checkbox__indicator--backgroundColor:var(--colorCompoundBrandBackgroundPressed);}",".f1r5cpua:active{--fui-Checkbox__indicator--borderColor:var(--colorCompoundBrandBackgroundPressed);}",".f2gmbuh:active{--fui-Checkbox__indicator--borderColor:var(--colorCompoundBrandStrokePressed);}",".f1oy4fa1:active{--fui-Checkbox__indicator--color:var(--colorCompoundBrandForeground1Pressed);}"],d:[".f19n0e5{color:var(--colorNeutralForeground1);}",".f35ds98{--fui-Checkbox__indicator--backgroundColor:var(--colorCompoundBrandBackground);}",".f12mnkne{--fui-Checkbox__indicator--color:var(--colorNeutralForegroundInverted);}",".fei9a8h{--fui-Checkbox__indicator--borderColor:var(--colorCompoundBrandBackground);}",".f1l27tf0{--fui-Checkbox__indicator--borderColor:var(--colorCompoundBrandStroke);}",".fcilktj{--fui-Checkbox__indicator--color:var(--colorCompoundBrandForeground1);}",".f158kwzp{cursor:default;}",".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}",".f1w7mfl5{--fui-Checkbox__indicator--borderColor:var(--colorNeutralStrokeDisabled);}",".fcoafq6{--fui-Checkbox__indicator--color:var(--colorNeutralForegroundDisabled);}"],m:[["@media (forced-colors: active){.f1cyfu5x{color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1lwde8o{--fui-Checkbox__indicator--color:GrayText;}}",{m:"(forced-colors: active)"}]]}),L4=Ue("ruo9svu",null,[".ruo9svu{box-sizing:border-box;cursor:inherit;height:100%;margin:0;opacity:0;position:absolute;top:0;width:calc(16px + 2 * var(--spacingHorizontalS));}"]),D4=ke({before:{j35jbq:["f1e31b4d","f1vgc2s3"]},after:{oyh7mz:["f1vgc2s3","f1e31b4d"]},large:{a9b677:"f1mq5jt6"}},{d:[".f1e31b4d{right:0;}",".f1vgc2s3{left:0;}",".f1mq5jt6{width:calc(20px + 2 * var(--spacingHorizontalS));}"]}),W4=Ue("rl7ci6d",null,[".rl7ci6d{align-self:flex-start;box-sizing:border-box;flex-shrink:0;display:flex;align-items:center;justify-content:center;overflow:hidden;color:var(--fui-Checkbox__indicator--color);background-color:var(--fui-Checkbox__indicator--backgroundColor);border-color:var(--fui-Checkbox__indicator--borderColor, var(--colorNeutralStrokeAccessible));border-style:solid;border-width:var(--strokeWidthThin);border-radius:var(--borderRadiusSmall);margin:var(--spacingVerticalS) var(--spacingHorizontalS);fill:currentColor;pointer-events:none;font-size:12px;height:16px;width:16px;}"]),H4=ke({large:{Be2twd7:"f4ybsrx",Bqenvij:"fjamq6b",a9b677:"f64fuq3"},circular:{Beyfa6y:0,Bbmb7ep:0,Btl43ni:0,B7oj6ja:0,Dimara:"f44lkw9"}},{d:[".f4ybsrx{font-size:16px;}",".fjamq6b{height:20px;}",".f64fuq3{width:20px;}",[".f44lkw9{border-radius:var(--borderRadiusCircular);}",{p:-1}]]}),U4=ke({base:{qb2dma:"f7nlbp4",sj55zd:"f1ym3bx4",Bceei9c:"fpo1scq",Byoj8tv:0,uwmqm3:0,z189sj:0,z8tnut:0,B0ocmuz:"f1f5q0n8"},before:{z189sj:["f7x41pl","fruq291"]},after:{uwmqm3:["fruq291","f7x41pl"]},medium:{B6of3ja:"fjzwpt6",jrapky:"fh6j2fo"},large:{B6of3ja:"f1xlvstr",jrapky:"f49ad5g"}},{d:[".f7nlbp4{align-self:center;}",".f1ym3bx4{color:inherit;}",".fpo1scq{cursor:inherit;}",[".f1f5q0n8{padding:var(--spacingVerticalS) var(--spacingHorizontalS);}",{p:-1}],".f7x41pl{padding-right:var(--spacingHorizontalXS);}",".fruq291{padding-left:var(--spacingHorizontalXS);}",".fjzwpt6{margin-top:calc((16px - var(--lineHeightBase300)) / 2);}",".fh6j2fo{margin-bottom:calc((16px - var(--lineHeightBase300)) / 2);}",".f1xlvstr{margin-top:calc((20px - var(--lineHeightBase300)) / 2);}",".f49ad5g{margin-bottom:calc((20px - var(--lineHeightBase300)) / 2);}"]}),V4=e=>{"use no memo";const{checked:t,disabled:r,labelPosition:n,shape:o,size:i}=e,a=q4(),l=M4();e.root.className=ve(yl.root,a,r?l.disabled:t==="mixed"?l.mixed:t?l.checked:l.unchecked,e.root.className);const c=L4(),d=D4();e.input.className=ve(yl.input,c,i==="large"&&d.large,d[n],e.input.className);const f=W4(),p=H4();e.indicator&&(e.indicator.className=ve(yl.indicator,f,i==="large"&&p.large,o==="circular"&&p.circular,e.indicator.className));const h=U4();return e.label&&(e.label.className=ve(yl.label,h.base,h[i],h[n],e.label.className)),e},$i=x.forwardRef((e,t)=>{const r=I4(e,t);return V4(r),Qt("useCheckboxStyles_unstable")(r),O4(r)});$i.displayName="Checkbox";const G4=(e,t)=>{e=Fd(e,{supportsLabelFor:!0,supportsRequired:!0,supportsSize:!0});const r=Zh();var n;const{size:o="medium",appearance:i=(n=r.inputDefaultAppearance)!==null&&n!==void 0?n:"outline",onChange:a}=e,[l,c]=es({state:e.value,defaultState:e.defaultValue,initialState:""}),d=Ed({props:e,primarySlotTagName:"input",excludedPropNames:["size","onChange","value","defaultValue"]}),f={size:o,appearance:i,components:{root:"span",input:"input",contentBefore:"span",contentAfter:"span"},input:Le(e.input,{defaultProps:{type:"text",ref:t,...d.primary},elementType:"input"}),contentAfter:ar(e.contentAfter,{elementType:"span"}),contentBefore:ar(e.contentBefore,{elementType:"span"}),root:Le(e.root,{defaultProps:d.root,elementType:"span"})};return f.input.value=l,f.input.onChange=mt(p=>{const h=p.target.value;a==null||a(p,{value:h}),c(h)}),f},K4=e=>Cr(e.root,{children:[e.contentBefore&&de(e.contentBefore,{}),de(e.input,{}),e.contentAfter&&de(e.contentAfter,{})]}),wl={root:"fui-Input",input:"fui-Input__input",contentBefore:"fui-Input__contentBefore",contentAfter:"fui-Input__contentAfter"},Y4=Ue("r1oeeo9n","r9sxh5",{r:[".r1oeeo9n{display:inline-flex;align-items:center;flex-wrap:nowrap;gap:var(--spacingHorizontalXXS);border-radius:var(--borderRadiusMedium);position:relative;box-sizing:border-box;vertical-align:middle;min-height:32px;font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase300);font-weight:var(--fontWeightRegular);line-height:var(--lineHeightBase300);background-color:var(--colorNeutralBackground1);border:1px solid var(--colorNeutralStroke1);border-bottom-color:var(--colorNeutralStrokeAccessible);}",'.r1oeeo9n::after{box-sizing:border-box;content:"";position:absolute;left:-1px;bottom:-1px;right:-1px;height:max(2px, var(--borderRadiusMedium));border-bottom-left-radius:var(--borderRadiusMedium);border-bottom-right-radius:var(--borderRadiusMedium);border-bottom:2px solid var(--colorCompoundBrandStroke);clip-path:inset(calc(100% - 2px) 0 0 0);transform:scaleX(0);transition-property:transform;transition-duration:var(--durationUltraFast);transition-delay:var(--curveAccelerateMid);}',".r1oeeo9n:focus-within::after{transform:scaleX(1);transition-property:transform;transition-duration:var(--durationNormal);transition-delay:var(--curveDecelerateMid);}",".r1oeeo9n:focus-within:active::after{border-bottom-color:var(--colorCompoundBrandStrokePressed);}",".r1oeeo9n:focus-within{outline:2px solid transparent;}",".r9sxh5{display:inline-flex;align-items:center;flex-wrap:nowrap;gap:var(--spacingHorizontalXXS);border-radius:var(--borderRadiusMedium);position:relative;box-sizing:border-box;vertical-align:middle;min-height:32px;font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase300);font-weight:var(--fontWeightRegular);line-height:var(--lineHeightBase300);background-color:var(--colorNeutralBackground1);border:1px solid var(--colorNeutralStroke1);border-bottom-color:var(--colorNeutralStrokeAccessible);}",'.r9sxh5::after{box-sizing:border-box;content:"";position:absolute;right:-1px;bottom:-1px;left:-1px;height:max(2px, var(--borderRadiusMedium));border-bottom-right-radius:var(--borderRadiusMedium);border-bottom-left-radius:var(--borderRadiusMedium);border-bottom:2px solid var(--colorCompoundBrandStroke);clip-path:inset(calc(100% - 2px) 0 0 0);transform:scaleX(0);transition-property:transform;transition-duration:var(--durationUltraFast);transition-delay:var(--curveAccelerateMid);}',".r9sxh5:focus-within::after{transform:scaleX(1);transition-property:transform;transition-duration:var(--durationNormal);transition-delay:var(--curveDecelerateMid);}",".r9sxh5:focus-within:active::after{border-bottom-color:var(--colorCompoundBrandStrokePressed);}",".r9sxh5:focus-within{outline:2px solid transparent;}"],s:["@media screen and (prefers-reduced-motion: reduce){.r1oeeo9n::after{transition-duration:0.01ms;transition-delay:0.01ms;}}","@media screen and (prefers-reduced-motion: reduce){.r1oeeo9n:focus-within::after{transition-duration:0.01ms;transition-delay:0.01ms;}}","@media screen and (prefers-reduced-motion: reduce){.r9sxh5::after{transition-duration:0.01ms;transition-delay:0.01ms;}}","@media screen and (prefers-reduced-motion: reduce){.r9sxh5:focus-within::after{transition-duration:0.01ms;transition-delay:0.01ms;}}"]}),X4=ke({small:{sshi5w:"f1pha7fy",Bahqtrf:"fk6fouc",Be2twd7:"fy9rknc",Bhrd7zp:"figsok6",Bg96gwp:"fwrc4pm"},medium:{},large:{sshi5w:"f1w5jphr",Bahqtrf:"fk6fouc",Be2twd7:"fod5ikn",Bhrd7zp:"figsok6",Bg96gwp:"faaz57k",i8kkvl:0,Belr9w4:0,rmohyg:"f1eyhf9v"},outline:{},outlineInteractive:{Bgoe8wy:"fvcxoqz",Bwzppfd:["f1ub3y4t","f1m52nbi"],oetu4i:"f1l4zc64",gg5e9n:["f1m52nbi","f1ub3y4t"],Drbcw7:"f8vnjqi",udz0bu:["fz1etlk","f1hc16gm"],Be8ivqh:"f1klwx88",ofdepl:["f1hc16gm","fz1etlk"]},underline:{De3pzq:"f1c21dwh",Beyfa6y:0,Bbmb7ep:0,Btl43ni:0,B7oj6ja:0,Dimara:"fokr779",icvyot:"f1ern45e",vrafjx:["f1n71otn","f1deefiw"],wvpqe5:["f1deefiw","f1n71otn"],Eqx8gd:["f1n6gb5g","f15yvnhg"],B1piin3:["f15yvnhg","f1n6gb5g"]},underlineInteractive:{oetu4i:"f1l4zc64",Be8ivqh:"f1klwx88",d9w3h3:0,B3778ie:0,B4j8arr:0,Bl18szs:0,Blrzh8d:"f2ale1x"},filled:{g2u3we:"fghlq4f",h3c5rm:["f1gn591s","fjscplz"],B9xav0g:"fb073pr",zhjwy3:["fjscplz","f1gn591s"]},filledInteractive:{q7v0qe:"ftmjh5b",kmh5ft:["f17blpuu","fsrcdbj"],nagaa4:"f1tpwn32",B1yhkcb:["fsrcdbj","f17blpuu"]},invalid:{tvckwq:"fs4k3qj",gk2u95:["fcee079","fmyw78r"],hhx65j:"f1fgmyf4",Bxowmz0:["fmyw78r","fcee079"]},"filled-darker":{De3pzq:"f16xq7d1"},"filled-lighter":{De3pzq:"fxugw4r"},"filled-darker-shadow":{De3pzq:"f16xq7d1",E5pizo:"fyed02w"},"filled-lighter-shadow":{De3pzq:"fxugw4r",E5pizo:"fyed02w"},disabled:{Bceei9c:"fdrzuqr",De3pzq:"f1c21dwh",g2u3we:"f1jj8ep1",h3c5rm:["f15xbau","fy0fskl"],B9xav0g:"f4ikngz",zhjwy3:["fy0fskl","f15xbau"],Bcq6wej:"f9dbb4x",Jcjdmf:["f3qs60o","f5u9ap2"],sc4o1m:"fwd1oij",Bosien3:["f5u9ap2","f3qs60o"],Bsft5z2:"fhr9occ",Bduesf4:"f99w1ws"},smallWithContentBefore:{uwmqm3:["fk8j09s","fdw0yi8"]},smallWithContentAfter:{z189sj:["fdw0yi8","fk8j09s"]},mediumWithContentBefore:{uwmqm3:["f1ng84yb","f11gcy0p"]},mediumWithContentAfter:{z189sj:["f11gcy0p","f1ng84yb"]},largeWithContentBefore:{uwmqm3:["f1uw59to","fw5db7e"]},largeWithContentAfter:{z189sj:["fw5db7e","f1uw59to"]}},{d:[".f1pha7fy{min-height:24px;}",".fk6fouc{font-family:var(--fontFamilyBase);}",".fy9rknc{font-size:var(--fontSizeBase200);}",".figsok6{font-weight:var(--fontWeightRegular);}",".fwrc4pm{line-height:var(--lineHeightBase200);}",".f1w5jphr{min-height:40px;}",".fod5ikn{font-size:var(--fontSizeBase400);}",".faaz57k{line-height:var(--lineHeightBase400);}",[".f1eyhf9v{gap:var(--spacingHorizontalSNudge);}",{p:-1}],".f1c21dwh{background-color:var(--colorTransparentBackground);}",[".fokr779{border-radius:0;}",{p:-1}],".f1ern45e{border-top-style:none;}",".f1n71otn{border-right-style:none;}",".f1deefiw{border-left-style:none;}",".f1n6gb5g::after{left:0;}",".f15yvnhg::after{right:0;}",[".f2ale1x::after{border-radius:0;}",{p:-1}],".fghlq4f{border-top-color:var(--colorTransparentStroke);}",".f1gn591s{border-right-color:var(--colorTransparentStroke);}",".fjscplz{border-left-color:var(--colorTransparentStroke);}",".fb073pr{border-bottom-color:var(--colorTransparentStroke);}",".fs4k3qj:not(:focus-within),.fs4k3qj:hover:not(:focus-within){border-top-color:var(--colorPaletteRedBorder2);}",".fcee079:not(:focus-within),.fcee079:hover:not(:focus-within){border-right-color:var(--colorPaletteRedBorder2);}",".fmyw78r:not(:focus-within),.fmyw78r:hover:not(:focus-within){border-left-color:var(--colorPaletteRedBorder2);}",".f1fgmyf4:not(:focus-within),.f1fgmyf4:hover:not(:focus-within){border-bottom-color:var(--colorPaletteRedBorder2);}",".f16xq7d1{background-color:var(--colorNeutralBackground3);}",".fxugw4r{background-color:var(--colorNeutralBackground1);}",".fyed02w{box-shadow:var(--shadow2);}",".fdrzuqr{cursor:not-allowed;}",".f1jj8ep1{border-top-color:var(--colorNeutralStrokeDisabled);}",".f15xbau{border-right-color:var(--colorNeutralStrokeDisabled);}",".fy0fskl{border-left-color:var(--colorNeutralStrokeDisabled);}",".f4ikngz{border-bottom-color:var(--colorNeutralStrokeDisabled);}",".fhr9occ::after{content:unset;}",".fk8j09s{padding-left:var(--spacingHorizontalSNudge);}",".fdw0yi8{padding-right:var(--spacingHorizontalSNudge);}",".f1ng84yb{padding-left:var(--spacingHorizontalMNudge);}",".f11gcy0p{padding-right:var(--spacingHorizontalMNudge);}",".f1uw59to{padding-left:var(--spacingHorizontalM);}",".fw5db7e{padding-right:var(--spacingHorizontalM);}"],h:[".fvcxoqz:hover{border-top-color:var(--colorNeutralStroke1Hover);}",".f1ub3y4t:hover{border-right-color:var(--colorNeutralStroke1Hover);}",".f1m52nbi:hover{border-left-color:var(--colorNeutralStroke1Hover);}",".f1l4zc64:hover{border-bottom-color:var(--colorNeutralStrokeAccessibleHover);}",".ftmjh5b:hover,.ftmjh5b:focus-within{border-top-color:var(--colorTransparentStrokeInteractive);}",".f17blpuu:hover,.f17blpuu:focus-within{border-right-color:var(--colorTransparentStrokeInteractive);}",".fsrcdbj:hover,.fsrcdbj:focus-within{border-left-color:var(--colorTransparentStrokeInteractive);}",".f1tpwn32:hover,.f1tpwn32:focus-within{border-bottom-color:var(--colorTransparentStrokeInteractive);}"],a:[".f8vnjqi:active,.f8vnjqi:focus-within{border-top-color:var(--colorNeutralStroke1Pressed);}",".fz1etlk:active,.fz1etlk:focus-within{border-right-color:var(--colorNeutralStroke1Pressed);}",".f1hc16gm:active,.f1hc16gm:focus-within{border-left-color:var(--colorNeutralStroke1Pressed);}",".f1klwx88:active,.f1klwx88:focus-within{border-bottom-color:var(--colorNeutralStrokeAccessiblePressed);}"],m:[["@media (forced-colors: active){.f9dbb4x{border-top-color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f3qs60o{border-right-color:GrayText;}.f5u9ap2{border-left-color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fwd1oij{border-bottom-color:GrayText;}}",{m:"(forced-colors: active)"}]],w:[".f99w1ws:focus-within{outline-style:none;}"]}),Q4=Ue("r12stul0",null,[".r12stul0{align-self:stretch;box-sizing:border-box;flex-grow:1;min-width:0;border-style:none;padding:0 var(--spacingHorizontalM);color:var(--colorNeutralForeground1);background-color:transparent;outline-style:none;font-family:inherit;font-size:inherit;font-weight:inherit;line-height:inherit;}",".r12stul0::-webkit-input-placeholder{color:var(--colorNeutralForeground4);opacity:1;}",".r12stul0::-moz-placeholder{color:var(--colorNeutralForeground4);opacity:1;}",".r12stul0::placeholder{color:var(--colorNeutralForeground4);opacity:1;}"]),J4=ke({small:{uwmqm3:["f1f5gg8d","f1vdfbxk"],z189sj:["f1vdfbxk","f1f5gg8d"]},medium:{},large:{uwmqm3:["fnphzt9","flt1dlf"],z189sj:["flt1dlf","fnphzt9"]},smallWithContentBefore:{uwmqm3:["fgiv446","ffczdla"]},smallWithContentAfter:{z189sj:["ffczdla","fgiv446"]},mediumWithContentBefore:{uwmqm3:["fgiv446","ffczdla"]},mediumWithContentAfter:{z189sj:["ffczdla","fgiv446"]},largeWithContentBefore:{uwmqm3:["fk8j09s","fdw0yi8"]},largeWithContentAfter:{z189sj:["fdw0yi8","fk8j09s"]},disabled:{sj55zd:"f1s2aq7o",De3pzq:"f1c21dwh",Bceei9c:"fdrzuqr",yvdlaj:"fahhnxm"}},{d:[".f1f5gg8d{padding-left:var(--spacingHorizontalS);}",".f1vdfbxk{padding-right:var(--spacingHorizontalS);}",".fnphzt9{padding-left:calc(var(--spacingHorizontalM) + var(--spacingHorizontalSNudge));}",".flt1dlf{padding-right:calc(var(--spacingHorizontalM) + var(--spacingHorizontalSNudge));}",".fgiv446{padding-left:var(--spacingHorizontalXXS);}",".ffczdla{padding-right:var(--spacingHorizontalXXS);}",".fk8j09s{padding-left:var(--spacingHorizontalSNudge);}",".fdw0yi8{padding-right:var(--spacingHorizontalSNudge);}",".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}",".f1c21dwh{background-color:var(--colorTransparentBackground);}",".fdrzuqr{cursor:not-allowed;}",".fahhnxm::-webkit-input-placeholder{color:var(--colorNeutralForegroundDisabled);}",".fahhnxm::-moz-placeholder{color:var(--colorNeutralForegroundDisabled);}"]}),Z4=Ue("r1572tok",null,[".r1572tok{box-sizing:border-box;color:var(--colorNeutralForeground3);display:flex;}",".r1572tok>svg{font-size:20px;}"]),eE=ke({disabled:{sj55zd:"f1s2aq7o"},small:{Duoase:"f3qv9w"},medium:{},large:{Duoase:"f16u2scb"}},{d:[".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}",".f3qv9w>svg{font-size:16px;}",".f16u2scb>svg{font-size:24px;}"]}),tE=e=>{"use no memo";const{size:t,appearance:r}=e,n=e.input.disabled,o=`${e.input["aria-invalid"]}`=="true",i=r.startsWith("filled"),a=X4(),l=J4(),c=eE();e.root.className=ve(wl.root,Y4(),a[t],e.contentBefore&&a[`${t}WithContentBefore`],e.contentAfter&&a[`${t}WithContentAfter`],a[r],!n&&r==="outline"&&a.outlineInteractive,!n&&r==="underline"&&a.underlineInteractive,!n&&i&&a.filledInteractive,i&&a.filled,!n&&o&&a.invalid,n&&a.disabled,e.root.className),e.input.className=ve(wl.input,Q4(),l[t],e.contentBefore&&l[`${t}WithContentBefore`],e.contentAfter&&l[`${t}WithContentAfter`],n&&l.disabled,e.input.className);const d=[Z4(),n&&c.disabled,c[t]];return e.contentBefore&&(e.contentBefore.className=ve(wl.contentBefore,...d,e.contentBefore.className)),e.contentAfter&&(e.contentAfter.className=ve(wl.contentAfter,...d,e.contentAfter.className)),e},nr=x.forwardRef((e,t)=>{const r=G4(e,t);return tE(r),Qt("useInputStyles_unstable")(r),K4(r)});nr.displayName="Input";const kl={root:"fui-Slider",rail:"fui-Slider__rail",thumb:"fui-Slider__thumb",input:"fui-Slider__input"},rE={sliderDirectionVar:"--fui-Slider--direction",sliderProgressVar:"--fui-Slider--progress",sliderStepsPercentVar:"--fui-Slider--steps-percent"},nE=ke({root:{qhf8xq:"f10pi13n",mc9l5x:"fwk3njj",lpbzjs:"f1sdsnyy",Bt984gj:"f122n59",B7hvi0a:"f1oiokrs"},small:{Bi64ftq:"f1agqo6f",Bslxy2k:"f1mmvox9",Ba19x4e:"f1i7ztpd",sshi5w:"f1pha7fy"},medium:{Bi64ftq:"f1a78h9h",Bslxy2k:"fh1udnr",Ba19x4e:"fuok0yf",sshi5w:"f1nxs5xn"},horizontal:{Bf4jedk:"fyvtabn",wkccdc:"fgfd48t",Budl1dq:"f4t5rw1"},vertical:{sshi5w:"f1pzv1zu",wkccdc:"fktlcaf",Budl1dq:"fiadc6h"},enabled:{B7wi8oa:"f4l8x3l",B250r6j:"f671q34",Bpmy4es:"fvfzmw5",Buw9y6v:"faw1t00",Bq939m0:"fxdgx5",gjzr1t:"fii04fa",tg7hqu:"f36hzz8",qhf704:"fdjsfay",Blfvze:"f1fen33d",genz7u:"f1c6b0w1",Brgvh4e:"f1rq9b4z",Bsjyjqp:"f4xxiul"},disabled:{Bpmy4es:"foojseg",B7wi8oa:"f1lgdqhv",B250r6j:"f1veetlj",qhf704:"fn4acdm",Blfvze:"f4s8dx0",genz7u:"f1wil5xy"},focusIndicatorHorizontal:{Brovlpu:"ftqa4ok",B486eqv:"f2hkw1w",Bssx7fj:"f1b1k54r",uh7if5:["f4ne723","fqqcjud"],clntm0:"fh7aioi",Dlk2r6:["fqqcjud","f4ne723"],h6p2u:"f1ufm4qn",I6qiy5:["f1qnwcb4","fgrk5zm"],yzno9d:"fi52z01",By0wis0:["fgrk5zm","f1qnwcb4"],B2j2mmj:"ffht0p2",wigs8:"f1p0ul1q",pbfy6t:"f1c901ms",B0v4ure:"f1alokd7",Byrf0fs:0,Bsiemmq:0,Bwckmig:0,skfxo0:0,Iidy0u:0,B98u21t:0,Bvwlmkc:0,jo1ztg:0,Ba1iezr:0,Blmvk6g:0,B24cy0v:0,Bil7v7r:0,Br3gin4:0,nr063g:0,ghq09:0,Bbgo44z:0,Bseh09z:"fmj8fco",az1dzo:0,Ba3ybja:0,B6352mv:0,vppk2z:0,Biaj6j7:"f1iwowo3",B2pnrqr:"f1pffoy2",B29w5g4:["f1dfga45","f63jj3o"],Bhhzhcn:"fs6b7xr",Bec0n69:["f63jj3o","f1dfga45"]},focusIndicatorVertical:{Brovlpu:"ftqa4ok",B486eqv:"f2hkw1w",Bssx7fj:"f1b1k54r",uh7if5:["f4ne723","fqqcjud"],clntm0:"fh7aioi",Dlk2r6:["fqqcjud","f4ne723"],h6p2u:"f1ufm4qn",I6qiy5:["f1qnwcb4","fgrk5zm"],yzno9d:"fi52z01",By0wis0:["fgrk5zm","f1qnwcb4"],B2j2mmj:"ffht0p2",wigs8:"f1p0ul1q",pbfy6t:"f1c901ms",B0v4ure:"f1alokd7",Byrf0fs:0,Bsiemmq:0,Bwckmig:0,skfxo0:0,Iidy0u:0,B98u21t:0,Bvwlmkc:0,jo1ztg:0,Ba1iezr:0,Blmvk6g:0,B24cy0v:0,Bil7v7r:0,Br3gin4:0,nr063g:0,ghq09:0,Bbgo44z:0,Bseh09z:"fmj8fco",az1dzo:0,Ba3ybja:0,B6352mv:0,vppk2z:0,Biaj6j7:"f1iwowo3",B2pnrqr:"f1pffoy2",B29w5g4:["fm5xmfm","femsgmt"],Bhhzhcn:"fs6b7xr",Bec0n69:["femsgmt","fm5xmfm"]}},{d:[".f10pi13n{position:relative;}",".fwk3njj{display:inline-grid;}",".f1sdsnyy{touch-action:none;}",".f122n59{align-items:center;}",".f1oiokrs{justify-items:center;}",".f1agqo6f{--fui-Slider__thumb--size:16px;}",".f1mmvox9{--fui-Slider__inner-thumb--radius:5px;}",".f1i7ztpd{--fui-Slider__rail--size:2px;}",".f1pha7fy{min-height:24px;}",".f1a78h9h{--fui-Slider__thumb--size:20px;}",".fh1udnr{--fui-Slider__inner-thumb--radius:6px;}",".fuok0yf{--fui-Slider__rail--size:4px;}",".f1nxs5xn{min-height:32px;}",".fyvtabn{min-width:120px;}",".fgfd48t{grid-template-rows:1fr var(--fui-Slider__thumb--size) 1fr;}",".f4t5rw1{grid-template-columns:1fr calc(100% - var(--fui-Slider__thumb--size)) 1fr;}",".f1pzv1zu{min-height:120px;}",".fktlcaf{grid-template-rows:1fr calc(100% - var(--fui-Slider__thumb--size)) 1fr;}",".fiadc6h{grid-template-columns:1fr var(--fui-Slider__thumb--size) 1fr;}",".f4l8x3l{--fui-Slider__rail--color:var(--colorNeutralStrokeAccessible);}",".f671q34{--fui-Slider__progress--color:var(--colorCompoundBrandBackground);}",".fvfzmw5{--fui-Slider__thumb--color:var(--colorCompoundBrandBackground);}",".foojseg{--fui-Slider__thumb--color:var(--colorNeutralForegroundDisabled);}",".f1lgdqhv{--fui-Slider__rail--color:var(--colorNeutralBackgroundDisabled);}",".f1veetlj{--fui-Slider__progress--color:var(--colorNeutralForegroundDisabled);}",".f1b1k54r[data-fui-focus-within]:focus-within{border-top-color:transparent;}",".f4ne723[data-fui-focus-within]:focus-within{border-right-color:transparent;}",".fqqcjud[data-fui-focus-within]:focus-within{border-left-color:transparent;}",".fh7aioi[data-fui-focus-within]:focus-within{border-bottom-color:transparent;}",'.ffht0p2[data-fui-focus-within]:focus-within::after{content:"";}',".f1p0ul1q[data-fui-focus-within]:focus-within::after{position:absolute;}",".f1c901ms[data-fui-focus-within]:focus-within::after{pointer-events:none;}",".f1alokd7[data-fui-focus-within]:focus-within::after{z-index:1;}",[".fmj8fco[data-fui-focus-within]:focus-within::after{border:2px solid var(--colorStrokeFocus2);}",{p:-2}],[".f1iwowo3[data-fui-focus-within]:focus-within::after{border-radius:var(--borderRadiusMedium);}",{p:-1}],".f1pffoy2[data-fui-focus-within]:focus-within::after{top:calc(0px - 2px - -2px);}",".f1dfga45[data-fui-focus-within]:focus-within::after{right:calc(0px - 2px - -4px);}",".f63jj3o[data-fui-focus-within]:focus-within::after{left:calc(0px - 2px - -4px);}",".fs6b7xr[data-fui-focus-within]:focus-within::after{bottom:calc(0px - 2px - -2px);}",[".fmj8fco[data-fui-focus-within]:focus-within::after{border:2px solid var(--colorStrokeFocus2);}",{p:-2}],[".f1iwowo3[data-fui-focus-within]:focus-within::after{border-radius:var(--borderRadiusMedium);}",{p:-1}],".fm5xmfm[data-fui-focus-within]:focus-within::after{right:calc(0px - 2px - 4px);}",".femsgmt[data-fui-focus-within]:focus-within::after{left:calc(0px - 2px - 4px);}"],h:[".faw1t00:hover{--fui-Slider__thumb--color:var(--colorCompoundBrandBackgroundHover);}",".fxdgx5:hover{--fui-Slider__progress--color:var(--colorCompoundBrandBackgroundHover);}"],a:[".fii04fa:active{--fui-Slider__thumb--color:var(--colorCompoundBrandBackgroundPressed);}",".f36hzz8:active{--fui-Slider__progress--color:var(--colorCompoundBrandBackgroundPressed);}"],m:[["@media (forced-colors: active){.fdjsfay{--fui-Slider__rail--color:CanvasText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1fen33d{--fui-Slider__thumb--color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1c6b0w1{--fui-Slider__progress--color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1rq9b4z:hover{--fui-Slider__thumb--color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f4xxiul:hover{--fui-Slider__progress--color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fn4acdm{--fui-Slider__rail--color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f4s8dx0{--fui-Slider__thumb--color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1wil5xy{--fui-Slider__progress--color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1ufm4qn[data-fui-focus-within]:focus-within::after{border-top-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1qnwcb4[data-fui-focus-within]:focus-within::after{border-right-color:Highlight;}.fgrk5zm[data-fui-focus-within]:focus-within::after{border-left-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fi52z01[data-fui-focus-within]:focus-within::after{border-bottom-color:Highlight;}}",{m:"(forced-colors: active)"}]],f:[".ftqa4ok:focus{outline-style:none;}"],i:[".f2hkw1w:focus-visible{outline-style:none;}"]}),oE=ke({rail:{Beyfa6y:0,Bbmb7ep:0,Btl43ni:0,B7oj6ja:0,Dimara:"f1kijzfu",Bkecrkj:"f1aehjj5",Ijaq50:"faunodf",nk6f5a:"f88nxoq",Br312pm:"fd46tj4",Bw0ie65:"f1e2fz10",qhf8xq:"f10pi13n",Bvjb7m6:"fdgv6k0",Bcmaq0h:"fizngqt",Bpd4iqm:"fpvhumw",oeaueh:"f1yog68k",Bw0xxkn:"f13sgyd8",Ftih45:"fzhtfnv",Brfgrao:"f1j7ml58",Bbn5juq:"fx36ao7",Bses4cn:"fddlh2i"},horizontal:{a9b677:"fly5x3f",Bqenvij:"f1cy86ho",Fbdkly:["f1heqfse","fkh49vu"],mdwyqc:["fkh49vu","f1heqfse"],Baz25je:"f16tdq4e"},vertical:{a9b677:"fqxfnkd",Bqenvij:"f1l02sjl",Ccq8qp:"f1rik0od",Bciustq:"f14xwovp",lawp4y:"fdehrcx"}},{d:[[".f1kijzfu{border-radius:var(--borderRadiusXLarge);}",{p:-1}],".f1aehjj5{pointer-events:none;}",".faunodf{grid-row-start:2;}",".f88nxoq{grid-row-end:2;}",".fd46tj4{grid-column-start:2;}",".f1e2fz10{grid-column-end:2;}",".f10pi13n{position:relative;}",".fdgv6k0{forced-color-adjust:none;}",`.fizngqt{background-image:linear-gradient(
      var(--fui-Slider--direction),
      var(--fui-Slider__progress--color) 0%,
      var(--fui-Slider__progress--color) var(--fui-Slider--progress),
      var(--fui-Slider__rail--color) var(--fui-Slider--progress)
    );}`,".fpvhumw{outline-width:1px;}",".f1yog68k{outline-style:solid;}",".f13sgyd8{outline-color:var(--colorTransparentStroke);}",".fzhtfnv::before{content:'';}",".f1j7ml58::before{position:absolute;}",`.fx36ao7::before{background-image:repeating-linear-gradient(
        var(--fui-Slider--direction),
        #0000 0%,
        #0000 calc(var(--fui-Slider--steps-percent) - 1px),
        var(--colorNeutralBackground1) calc(var(--fui-Slider--steps-percent) - 1px),
        var(--colorNeutralBackground1) var(--fui-Slider--steps-percent)
      );}`,".fly5x3f{width:100%;}",".f1cy86ho{height:var(--fui-Slider__rail--size);}",".f1heqfse::before{left:-1px;}",".fkh49vu::before{right:-1px;}",".f16tdq4e::before{height:var(--fui-Slider__rail--size);}",".fqxfnkd{width:var(--fui-Slider__rail--size);}",".f1l02sjl{height:100%;}",".f1rik0od::before{width:var(--fui-Slider__rail--size);}",".f14xwovp::before{top:-1px;}",".fdehrcx::before{bottom:-1px;}"],m:[[`@media (forced-colors: active){.fddlh2i::before{background-image:repeating-linear-gradient(
          var(--fui-Slider--direction),
          #0000 0%,
          #0000 calc(var(--fui-Slider--steps-percent) - 1px),
          HighlightText calc(var(--fui-Slider--steps-percent) - 1px),
          HighlightText var(--fui-Slider--steps-percent)
        );}}`,{m:"(forced-colors: active)"}]]}),iE=ke({thumb:{B2lzsem:"ftx3jue",Ijaq50:"faunodf",nk6f5a:"f88nxoq",Br312pm:"fd46tj4",Bw0ie65:"f1e2fz10",qhf8xq:"f1euv43f",a9b677:"f174ca62",Bqenvij:"f1yfdkfd",Bkecrkj:"f1aehjj5",oeaueh:"f1s6fcnf",Bvjb7m6:"fdgv6k0",Beyfa6y:0,Bbmb7ep:0,Btl43ni:0,B7oj6ja:0,Dimara:"f44lkw9",E5pizo:"fof7hq0",De3pzq:"foksa45",Brfgrao:"f1j7ml58",Bciustq:"f14u7mkt",Fbdkly:["f5zrw40","f1ks5ppg"],lawp4y:"fto0uou",mdwyqc:["f1ks5ppg","f5zrw40"],r59vdv:0,Budzafs:0,ck0cow:0,n07z76:0,Gng75u:"fielpny",Bcvre1j:"fyl8oag",Ftih45:"fzhtfnv",Bcgcnre:0,Bqjgrrk:0,qa3bma:0,y0oebl:0,Biqmznv:0,Bm6vgfq:0,Bbv0w2i:0,uvfttm:0,eqrjj:0,Bk5zm6e:0,m598lv:0,B4f6apu:0,ydt019:0,Bq4z7u6:0,Bdkvgpv:0,B0qfbqy:0,kj8mxx:"f1fsco4d"},disabled:{Bcgcnre:0,Bqjgrrk:0,qa3bma:0,y0oebl:0,Biqmznv:0,Bm6vgfq:0,Bbv0w2i:0,uvfttm:0,eqrjj:0,Bk5zm6e:0,m598lv:0,B4f6apu:0,ydt019:0,Bq4z7u6:0,Bdkvgpv:0,B0qfbqy:0,kj8mxx:"f1pv9hn4"},horizontal:{Bz10aip:["f13gfj74","f1nfknbn"],oyh7mz:["foa2ioz","fjmilum"]},vertical:{Bz10aip:"f5cv5a3",B5kzvoi:"f1k2fpdo"}},{d:[".ftx3jue{--fui-Slider__thumb--position:clamp(var(--fui-Slider__inner-thumb--radius), var(--fui-Slider--progress), calc(100% - var(--fui-Slider__inner-thumb--radius)));}",".faunodf{grid-row-start:2;}",".f88nxoq{grid-row-end:2;}",".fd46tj4{grid-column-start:2;}",".f1e2fz10{grid-column-end:2;}",".f1euv43f{position:absolute;}",".f174ca62{width:var(--fui-Slider__thumb--size);}",".f1yfdkfd{height:var(--fui-Slider__thumb--size);}",".f1aehjj5{pointer-events:none;}",".f1s6fcnf{outline-style:none;}",".fdgv6k0{forced-color-adjust:none;}",[".f44lkw9{border-radius:var(--borderRadiusCircular);}",{p:-1}],".fof7hq0{box-shadow:0 0 0 calc(var(--fui-Slider__thumb--size) * .2) var(--colorNeutralBackground1) inset;}",".foksa45{background-color:var(--fui-Slider__thumb--color);}",".f1j7ml58::before{position:absolute;}",".f14u7mkt::before{top:0px;}",".f5zrw40::before{left:0px;}",".f1ks5ppg::before{right:0px;}",".fto0uou::before{bottom:0px;}",[".fielpny::before{border-radius:var(--borderRadiusCircular);}",{p:-1}],".fyl8oag::before{box-sizing:border-box;}",".fzhtfnv::before{content:'';}",[".f1fsco4d::before{border:calc(var(--fui-Slider__thumb--size) * .05) solid var(--colorNeutralStroke1);}",{p:-2}],[".f1pv9hn4::before{border:calc(var(--fui-Slider__thumb--size) * .05) solid var(--colorNeutralForegroundDisabled);}",{p:-2}],".f13gfj74{transform:translateX(-50%);}",".f1nfknbn{transform:translateX(50%);}",".foa2ioz{left:var(--fui-Slider__thumb--position);}",".fjmilum{right:var(--fui-Slider__thumb--position);}",".f5cv5a3{transform:translateY(50%);}",".f1k2fpdo{bottom:var(--fui-Slider__thumb--position);}"]}),sE=ke({input:{Bceei9c:"f1k6fduh",abs64n:"fk73vx1",Ijaq50:"f16hsg94",nk6f5a:"f1nzqi2z",Br312pm:"fwpfdsa",Bw0ie65:"fuur7zz",Byoj8tv:0,uwmqm3:0,z189sj:0,z8tnut:0,B0ocmuz:"f1mk8lai",jrapky:0,Frg6f3:0,t21cq0:0,B6of3ja:0,B74szlk:"f1s184ao"},disabled:{Bceei9c:"f158kwzp"},horizontal:{Bqenvij:"f1yfdkfd",a9b677:"fly5x3f"},vertical:{Bqenvij:"f1l02sjl",a9b677:"f174ca62",wtfg9d:"f135tqni",By3ymbm:["f114o3fk","f1o9w1zd"],B1e78rk:"f1jr0wcp"}},{d:[".f1k6fduh{cursor:pointer;}",".fk73vx1{opacity:0;}",".f16hsg94{grid-row-start:1;}",".f1nzqi2z{grid-row-end:-1;}",".fwpfdsa{grid-column-start:1;}",".fuur7zz{grid-column-end:-1;}",[".f1mk8lai{padding:0;}",{p:-1}],[".f1s184ao{margin:0;}",{p:-1}],".f158kwzp{cursor:default;}",".f1yfdkfd{height:var(--fui-Slider__thumb--size);}",".fly5x3f{width:100%;}",".f1l02sjl{height:100%;}",".f174ca62{width:var(--fui-Slider__thumb--size);}"],t:["@supports (writing-mode: sideways-lr){.f135tqni{writing-mode:vertical-lr;}}","@supports (writing-mode: sideways-lr){.f114o3fk{direction:rtl;}.f1o9w1zd{direction:ltr;}}","@supports not (writing-mode: sideways-lr){.f1jr0wcp{-webkit-appearance:slider-vertical;}}"]}),aE=e=>{"use no memo";const t=nE(),r=oE(),n=iE(),o=sE(),i=e.vertical;return e.root.className=ve(kl.root,t.root,i?t.focusIndicatorVertical:t.focusIndicatorHorizontal,t[e.size],i?t.vertical:t.horizontal,e.disabled?t.disabled:t.enabled,e.root.className),e.rail.className=ve(kl.rail,r.rail,i?r.vertical:r.horizontal,e.rail.className),e.thumb.className=ve(kl.thumb,n.thumb,i?n.vertical:n.horizontal,e.disabled&&n.disabled,e.thumb.className),e.input.className=ve(kl.input,o.input,i?o.vertical:o.horizontal,e.disabled&&o.disabled,e.input.className),e},{sliderStepsPercentVar:lE,sliderProgressVar:cE,sliderDirectionVar:dE}=rE,uE=(e,t,r)=>r===t?0:(e-t)/(r-t)*100,fE=(e,t)=>{"use no memo";const{min:r=0,max:n=100,step:o}=t,{dir:i}=$r(),[a,l]=es({state:t.value,defaultState:t.defaultValue,initialState:0}),c=t0(a,r,n),d=uE(c,r,n),f=e.input.onChange,p=t.onChange,h=mt(v=>{const $=Number(v.target.value);l(t0($,r,n)),f&&f!==p?f(v):p&&p(v,{value:$})}),y=o&&o>0?`${o*100/(n-r)}%`:void 0,m={[dE]:e.vertical?"0deg":i==="ltr"?"90deg":"270deg",[cE]:`${d}%`,...y!==void 0&&{[lE]:y}};return e.root.style={...m,...e.root.style},e.input.value=c,e.input.onChange=h,e},pE=(e,t)=>{e=Fd(e,{supportsLabelFor:!0});const r=Ed({props:e,primarySlotTagName:"input",excludedPropNames:["onChange","size"]}),{disabled:n,vertical:o,size:i="medium",root:a,input:l,rail:c,thumb:d}=e,f={disabled:n,size:i,vertical:o,components:{input:"input",rail:"div",root:"div",thumb:"div"},root:Le(a,{defaultProps:r.root,elementType:"div"}),input:Le(l,{defaultProps:{id:ts("slider-",e.id),ref:t,...r.primary,type:"range",orient:o?"vertical":void 0},elementType:"input"}),rail:Le(c,{elementType:"div"}),thumb:Le(d,{elementType:"div"})};return f.root.ref=rs(f.root.ref,sm()),fE(f,e),f},hE=e=>Cr(e.root,{children:[de(e.input,{}),de(e.rail,{}),de(e.thumb,{})]}),Bw=x.forwardRef((e,t)=>{const r=pE(e,t);return aE(r),Qt("useSliderStyles_unstable")(r),hE(r)});Bw.displayName="Slider";const Tw=x.createContext(void 0),mE={};Tw.Provider;const gE=()=>{var e;return(e=x.useContext(Tw))!==null&&e!==void 0?e:mE},vE=(e,t)=>{const{size:r}=gE(),{appearance:n="primary",labelPosition:o="after",size:i=r??"medium",delay:a=0}=e,l=ts("spinner"),{role:c="progressbar",...d}=e,f=Le(tn("div",{ref:t,role:c,...d},["size"]),{elementType:"div"}),[p,h]=x.useState(!1),[y,m]=c5();x.useEffect(()=>{if(!(a<=0))return y(()=>{h(!0)},a),()=>{m()}},[y,m,a]);const v=ar(e.label,{defaultProps:{id:l},renderByDefault:!1,elementType:Je}),$=ar(e.spinner,{renderByDefault:!0,elementType:"span"});return v&&f&&!f["aria-labelledby"]&&(f["aria-labelledby"]=v.id),{appearance:n,delay:a,labelPosition:o,size:i,shouldRenderSpinner:!a||p,components:{root:"div",spinner:"span",spinnerTail:"span",label:Je},root:f,spinner:$,spinnerTail:Le(e.spinnerTail,{elementType:"span"}),label:v}},bE=e=>{const{labelPosition:t,shouldRenderSpinner:r}=e;return Cr(e.root,{children:[e.label&&r&&(t==="above"||t==="before")&&de(e.label,{}),e.spinner&&r&&de(e.spinner,{children:e.spinnerTail&&de(e.spinnerTail,{})}),e.label&&r&&(t==="below"||t==="after")&&de(e.label,{})]})},Sl={root:"fui-Spinner",spinner:"fui-Spinner__spinner",spinnerTail:"fui-Spinner__spinnerTail",label:"fui-Spinner__label"},xE=Ue("rpp59a7",null,[".rpp59a7{display:flex;align-items:center;justify-content:center;line-height:0;gap:8px;overflow:hidden;min-width:min-content;}"]),yE=ke({vertical:{Beiy3e4:"f1vx9l62"}},{d:[".f1vx9l62{flex-direction:column;}"]}),wE=Ue("rvgcg50","r15nd2jo",{r:[".rvgcg50{position:relative;flex-shrink:0;-webkit-mask-image:radial-gradient(closest-side, transparent calc(100% - var(--fui-Spinner--strokeWidth) - 1px), white calc(100% - var(--fui-Spinner--strokeWidth)) calc(100% - 1px), transparent 100%);mask-image:radial-gradient(closest-side, transparent calc(100% - var(--fui-Spinner--strokeWidth) - 1px), white calc(100% - var(--fui-Spinner--strokeWidth)) calc(100% - 1px), transparent 100%);background-color:var(--colorBrandStroke2Contrast);color:var(--colorBrandStroke1);animation-duration:1.5s;animation-iteration-count:infinite;animation-timing-function:linear;animation-name:rb7n1on;}","@keyframes rb7n1on{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}",".r15nd2jo{position:relative;flex-shrink:0;-webkit-mask-image:radial-gradient(closest-side, transparent calc(100% - var(--fui-Spinner--strokeWidth) - 1px), white calc(100% - var(--fui-Spinner--strokeWidth)) calc(100% - 1px), transparent 100%);mask-image:radial-gradient(closest-side, transparent calc(100% - var(--fui-Spinner--strokeWidth) - 1px), white calc(100% - var(--fui-Spinner--strokeWidth)) calc(100% - 1px), transparent 100%);background-color:var(--colorBrandStroke2Contrast);color:var(--colorBrandStroke1);animation-duration:1.5s;animation-iteration-count:infinite;animation-timing-function:linear;animation-name:r1gx3jof;}","@keyframes r1gx3jof{0%{transform:rotate(0deg);}100%{transform:rotate(-360deg);}}"],s:["@media screen and (forced-colors: active){.rvgcg50{background-color:HighlightText;color:Highlight;forced-color-adjust:none;}}","@media screen and (prefers-reduced-motion: reduce){.rvgcg50{animation-duration:1.8s;}}","@media screen and (forced-colors: active){.r15nd2jo{background-color:HighlightText;color:Highlight;forced-color-adjust:none;}}","@media screen and (prefers-reduced-motion: reduce){.r15nd2jo{animation-duration:1.8s;}}"]}),kE=Ue("rxov3xa","r1o544mv",{r:[".rxov3xa{position:absolute;display:block;width:100%;height:100%;-webkit-mask-image:conic-gradient(transparent 105deg, white 105deg);mask-image:conic-gradient(transparent 105deg, white 105deg);animation-duration:1.5s;animation-iteration-count:infinite;animation-timing-function:var(--curveEasyEase);animation-name:r15mim6k;}",'.rxov3xa::before,.rxov3xa::after{content:"";position:absolute;display:block;width:100%;height:100%;animation:inherit;background-image:conic-gradient(currentcolor 135deg, transparent 135deg);}',"@keyframes r15mim6k{0%{transform:rotate(-135deg);}50%{transform:rotate(0deg);}100%{transform:rotate(225deg);}}",".rxov3xa::before{animation-name:r18vhmn8;}","@keyframes r18vhmn8{0%{transform:rotate(0deg);}50%{transform:rotate(105deg);}100%{transform:rotate(0deg);}}",".rxov3xa::after{animation-name:rkgrvoi;}","@keyframes rkgrvoi{0%{transform:rotate(0deg);}50%{transform:rotate(225deg);}100%{transform:rotate(0deg);}}",".r1o544mv{position:absolute;display:block;width:100%;height:100%;-webkit-mask-image:conic-gradient(transparent 105deg, white 105deg);mask-image:conic-gradient(transparent 105deg, white 105deg);animation-duration:1.5s;animation-iteration-count:infinite;animation-timing-function:var(--curveEasyEase);animation-name:r109gmi5;}",'.r1o544mv::before,.r1o544mv::after{content:"";position:absolute;display:block;width:100%;height:100%;animation:inherit;background-image:conic-gradient(currentcolor 135deg, transparent 135deg);}',"@keyframes r109gmi5{0%{transform:rotate(135deg);}50%{transform:rotate(0deg);}100%{transform:rotate(-225deg);}}",".r1o544mv::before{animation-name:r17whflh;}","@keyframes r17whflh{0%{transform:rotate(0deg);}50%{transform:rotate(-105deg);}100%{transform:rotate(0deg);}}",".r1o544mv::after{animation-name:re4odhl;}","@keyframes re4odhl{0%{transform:rotate(0deg);}50%{transform:rotate(-225deg);}100%{transform:rotate(0deg);}}"],s:["@media screen and (prefers-reduced-motion: reduce){.rxov3xa{animation-iteration-count:0;background-image:conic-gradient(transparent 120deg, currentcolor 360deg);}.rxov3xa::before,.rxov3xa::after{content:none;}}","@media screen and (prefers-reduced-motion: reduce){.r1o544mv{animation-iteration-count:0;background-image:conic-gradient(transparent 120deg, currentcolor 360deg);}.r1o544mv::before,.r1o544mv::after{content:none;}}"]}),SE=ke({inverted:{De3pzq:"fr407j0",sj55zd:"f1f7voed"},rtlTail:{btxmck:"f179dep3",gb5jj2:"fbz9ihp",Bdya8wy:"f1pme1qz"},"extra-tiny":{Bqenvij:"fd461yt",a9b677:"fjw5fx7",qmp6fs:"f1v3ph3m"},tiny:{Bqenvij:"fjamq6b",a9b677:"f64fuq3",qmp6fs:"f1v3ph3m"},"extra-small":{Bqenvij:"frvgh55",a9b677:"fq4mcun",qmp6fs:"f1v3ph3m"},small:{Bqenvij:"fxldao9",a9b677:"f1w9dchk",qmp6fs:"f1v3ph3m"},medium:{Bqenvij:"f1d2rq10",a9b677:"f1szoe96",qmp6fs:"fb52u90"},large:{Bqenvij:"f8ljn23",a9b677:"fpdz1er",qmp6fs:"fb52u90"},"extra-large":{Bqenvij:"fbhnoac",a9b677:"feqmc2u",qmp6fs:"fb52u90"},huge:{Bqenvij:"f1ft4266",a9b677:"fksc0bp",qmp6fs:"fa3u9ii"}},{d:[".fr407j0{background-color:var(--colorNeutralStrokeAlpha2);}",".f1f7voed{color:var(--colorNeutralStrokeOnBrand2);}",".f179dep3{-webkit-mask-image:conic-gradient(white 255deg, transparent 255deg);mask-image:conic-gradient(white 255deg, transparent 255deg);}",".fbz9ihp::before,.fbz9ihp::after{background-image:conic-gradient(transparent 225deg, currentcolor 225deg);}",".fd461yt{height:16px;}",".fjw5fx7{width:16px;}",".f1v3ph3m{--fui-Spinner--strokeWidth:var(--strokeWidthThick);}",".fjamq6b{height:20px;}",".f64fuq3{width:20px;}",".frvgh55{height:24px;}",".fq4mcun{width:24px;}",".fxldao9{height:28px;}",".f1w9dchk{width:28px;}",".f1d2rq10{height:32px;}",".f1szoe96{width:32px;}",".fb52u90{--fui-Spinner--strokeWidth:var(--strokeWidthThicker);}",".f8ljn23{height:36px;}",".fpdz1er{width:36px;}",".fbhnoac{height:40px;}",".feqmc2u{width:40px;}",".f1ft4266{height:44px;}",".fksc0bp{width:44px;}",".fa3u9ii{--fui-Spinner--strokeWidth:var(--strokeWidthThickest);}"],m:[["@media screen and (prefers-reduced-motion: reduce){.f1pme1qz{background-image:conic-gradient(currentcolor 0deg, transparent 240deg);}}",{m:"screen and (prefers-reduced-motion: reduce)"}]]}),jE=ke({inverted:{sj55zd:"fonrgv7"},"extra-tiny":{Bahqtrf:"fk6fouc",Be2twd7:"fkhj508",Bhrd7zp:"figsok6",Bg96gwp:"f1i3iumi"},tiny:{Bahqtrf:"fk6fouc",Be2twd7:"fkhj508",Bhrd7zp:"figsok6",Bg96gwp:"f1i3iumi"},"extra-small":{Bahqtrf:"fk6fouc",Be2twd7:"fkhj508",Bhrd7zp:"figsok6",Bg96gwp:"f1i3iumi"},small:{Bahqtrf:"fk6fouc",Be2twd7:"fkhj508",Bhrd7zp:"figsok6",Bg96gwp:"f1i3iumi"},medium:{Bahqtrf:"fk6fouc",Be2twd7:"fod5ikn",Bhrd7zp:"fl43uef",Bg96gwp:"faaz57k"},large:{Bahqtrf:"fk6fouc",Be2twd7:"fod5ikn",Bhrd7zp:"fl43uef",Bg96gwp:"faaz57k"},"extra-large":{Bahqtrf:"fk6fouc",Be2twd7:"fod5ikn",Bhrd7zp:"fl43uef",Bg96gwp:"faaz57k"},huge:{Bahqtrf:"fk6fouc",Be2twd7:"f1pp30po",Bhrd7zp:"fl43uef",Bg96gwp:"f106mvju"}},{d:[".fonrgv7{color:var(--colorNeutralForegroundStaticInverted);}",".fk6fouc{font-family:var(--fontFamilyBase);}",".fkhj508{font-size:var(--fontSizeBase300);}",".figsok6{font-weight:var(--fontWeightRegular);}",".f1i3iumi{line-height:var(--lineHeightBase300);}",".fod5ikn{font-size:var(--fontSizeBase400);}",".fl43uef{font-weight:var(--fontWeightSemibold);}",".faaz57k{line-height:var(--lineHeightBase400);}",".f1pp30po{font-size:var(--fontSizeBase500);}",".f106mvju{line-height:var(--lineHeightBase500);}"]}),$E=e=>{"use no memo";const{labelPosition:t,size:r,appearance:n}=e,{dir:o}=$r(),i=xE(),a=yE(),l=wE(),c=SE(),d=kE(),f=jE();return e.root.className=ve(Sl.root,i,(t==="above"||t==="below")&&a.vertical,e.root.className),e.spinner&&(e.spinner.className=ve(Sl.spinner,l,c[r],n==="inverted"&&c.inverted,e.spinner.className)),e.spinnerTail&&(e.spinnerTail.className=ve(Sl.spinnerTail,d,o==="rtl"&&c.rtlTail,e.spinnerTail.className)),e.label&&(e.label.className=ve(Sl.label,f[r],n==="inverted"&&f.inverted,e.label.className)),e},Qr=x.forwardRef((e,t)=>{const r=vE(e,t);return $E(r),Qt("useSpinnerStyles_unstable")(r),bE(r)});Qr.displayName="Spinner";const CE=(e,t)=>{const{wrap:r,truncate:n,block:o,italic:i,underline:a,strikethrough:l,size:c,font:d,weight:f,align:p}=e;return{align:p??"start",block:o??!1,font:d??"base",italic:i??!1,size:c??300,strikethrough:l??!1,truncate:n??!1,underline:a??!1,weight:f??"regular",wrap:r??!0,components:{root:"span"},root:Le(tn("span",{ref:t,...e}),{elementType:"span"})}},_E=e=>de(e.root,{}),zE={root:"fui-Text"},EE=ke({root:{Bahqtrf:"fk6fouc",Be2twd7:"fkhj508",Bg96gwp:"f1i3iumi",Bhrd7zp:"figsok6",fsow6f:"fpgzoln",mc9l5x:"f1w7gpdv",Huce71:"f6juhto",B68tc82:0,Bmxbyg5:0,Bpg54ce:"f1gl81tg",ygn44y:"f2jf649"},nowrap:{Huce71:"fz5stix",B68tc82:0,Bmxbyg5:0,Bpg54ce:"f1a3p1vp"},truncate:{ygn44y:"f1cmbuwj"},block:{mc9l5x:"ftgm304"},italic:{B80ckks:"f1j4dglz"},underline:{w71qe1:"f13mvf36"},strikethrough:{w71qe1:"fv5q2k7"},strikethroughUnderline:{w71qe1:"f1drk4o6"},base100:{Be2twd7:"f13mqy1h",Bg96gwp:"fcpl73t"},base200:{Be2twd7:"fy9rknc",Bg96gwp:"fwrc4pm"},base400:{Be2twd7:"fod5ikn",Bg96gwp:"faaz57k"},base500:{Be2twd7:"f1pp30po",Bg96gwp:"f106mvju"},base600:{Be2twd7:"f1x0m3f5",Bg96gwp:"fb86gi6"},hero700:{Be2twd7:"fojgt09",Bg96gwp:"fcen8rp"},hero800:{Be2twd7:"fccw675",Bg96gwp:"f1ebx5kk"},hero900:{Be2twd7:"f15afnhw",Bg96gwp:"fr3w3wp"},hero1000:{Be2twd7:"fpyltcb",Bg96gwp:"f1ivgwrt"},monospace:{Bahqtrf:"f1fedwem"},numeric:{Bahqtrf:"f1uq0ln5"},weightMedium:{Bhrd7zp:"fdj6btp"},weightSemibold:{Bhrd7zp:"fl43uef"},weightBold:{Bhrd7zp:"flh3ekv"},alignCenter:{fsow6f:"f17mccla"},alignEnd:{fsow6f:"f12ymhq5"},alignJustify:{fsow6f:"f1j59e10"}},{d:[".fk6fouc{font-family:var(--fontFamilyBase);}",".fkhj508{font-size:var(--fontSizeBase300);}",".f1i3iumi{line-height:var(--lineHeightBase300);}",".figsok6{font-weight:var(--fontWeightRegular);}",".fpgzoln{text-align:start;}",".f1w7gpdv{display:inline;}",".f6juhto{white-space:normal;}",[".f1gl81tg{overflow:visible;}",{p:-1}],".f2jf649{text-overflow:clip;}",".fz5stix{white-space:nowrap;}",[".f1a3p1vp{overflow:hidden;}",{p:-1}],".f1cmbuwj{text-overflow:ellipsis;}",".ftgm304{display:block;}",".f1j4dglz{font-style:italic;}",".f13mvf36{text-decoration-line:underline;}",".fv5q2k7{text-decoration-line:line-through;}",".f1drk4o6{text-decoration-line:line-through underline;}",".f13mqy1h{font-size:var(--fontSizeBase100);}",".fcpl73t{line-height:var(--lineHeightBase100);}",".fy9rknc{font-size:var(--fontSizeBase200);}",".fwrc4pm{line-height:var(--lineHeightBase200);}",".fod5ikn{font-size:var(--fontSizeBase400);}",".faaz57k{line-height:var(--lineHeightBase400);}",".f1pp30po{font-size:var(--fontSizeBase500);}",".f106mvju{line-height:var(--lineHeightBase500);}",".f1x0m3f5{font-size:var(--fontSizeBase600);}",".fb86gi6{line-height:var(--lineHeightBase600);}",".fojgt09{font-size:var(--fontSizeHero700);}",".fcen8rp{line-height:var(--lineHeightHero700);}",".fccw675{font-size:var(--fontSizeHero800);}",".f1ebx5kk{line-height:var(--lineHeightHero800);}",".f15afnhw{font-size:var(--fontSizeHero900);}",".fr3w3wp{line-height:var(--lineHeightHero900);}",".fpyltcb{font-size:var(--fontSizeHero1000);}",".f1ivgwrt{line-height:var(--lineHeightHero1000);}",".f1fedwem{font-family:var(--fontFamilyMonospace);}",".f1uq0ln5{font-family:var(--fontFamilyNumeric);}",".fdj6btp{font-weight:var(--fontWeightMedium);}",".fl43uef{font-weight:var(--fontWeightSemibold);}",".flh3ekv{font-weight:var(--fontWeightBold);}",".f17mccla{text-align:center;}",".f12ymhq5{text-align:end;}",".f1j59e10{text-align:justify;}"]}),BE=e=>{"use no memo";const t=EE();return e.root.className=ve(zE.root,t.root,e.wrap===!1&&t.nowrap,e.truncate&&t.truncate,e.block&&t.block,e.italic&&t.italic,e.underline&&t.underline,e.strikethrough&&t.strikethrough,e.underline&&e.strikethrough&&t.strikethroughUnderline,e.size===100&&t.base100,e.size===200&&t.base200,e.size===400&&t.base400,e.size===500&&t.base500,e.size===600&&t.base600,e.size===700&&t.hero700,e.size===800&&t.hero800,e.size===900&&t.hero900,e.size===1e3&&t.hero1000,e.font==="monospace"&&t.monospace,e.font==="numeric"&&t.numeric,e.weight==="medium"&&t.weightMedium,e.weight==="semibold"&&t.weightSemibold,e.weight==="bold"&&t.weightBold,e.align==="center"&&t.alignCenter,e.align==="end"&&t.alignEnd,e.align==="justify"&&t.alignJustify,e.root.className),e},cm=x.forwardRef((e,t)=>{const r=CE(e,t);return BE(r),Qt("useTextStyles_unstable")(r),_E(r)});cm.displayName="Text";const TE=e=>de(e.root,{children:de(e.textarea,{})}),PE=(e,t)=>{e=Fd(e,{supportsLabelFor:!0,supportsRequired:!0,supportsSize:!0});const r=Zh();var n;const{size:o="medium",appearance:i=(n=r.inputDefaultAppearance)!==null&&n!==void 0?n:"outline",resize:a="none",onChange:l}=e,[c,d]=es({state:e.value,defaultState:e.defaultValue,initialState:void 0}),f=Ed({props:e,primarySlotTagName:"textarea",excludedPropNames:["onChange","value","defaultValue"]}),p={size:o,appearance:i,resize:a,components:{root:"span",textarea:"textarea"},textarea:Le(e.textarea,{defaultProps:{ref:t,...f.primary},elementType:"textarea"}),root:Le(e.root,{defaultProps:f.root,elementType:"span"})};return p.textarea.value=c,p.textarea.onChange=mt(h=>{const y=h.target.value;l==null||l(h,{value:y}),d(y)}),p},k0={root:"fui-Textarea",textarea:"fui-Textarea__textarea"},NE=ke({base:{mc9l5x:"ftuwxu6",B7ck84d:"f1ewtqcl",qhf8xq:"f10pi13n",Byoj8tv:0,uwmqm3:0,z189sj:0,z8tnut:0,B0ocmuz:"f1yiegib",jrapky:0,Frg6f3:0,t21cq0:0,B6of3ja:0,B74szlk:"f1s184ao",Beyfa6y:0,Bbmb7ep:0,Btl43ni:0,B7oj6ja:0,Dimara:"ft85np5",ha4doy:"f12kltsn"},disabled:{De3pzq:"f1c21dwh",Bgfg5da:0,B9xav0g:0,oivjwe:0,Bn0qgzm:0,B4g9neb:0,zhjwy3:0,wvpqe5:0,ibv6hh:0,u1mtju:0,h3c5rm:0,vrafjx:0,Bekrc4i:0,i8vvqc:0,g2u3we:0,icvyot:0,B4j52fo:0,irswps:"ff3nzm7",Bcq6wej:"f9dbb4x",Jcjdmf:["f3qs60o","f5u9ap2"],sc4o1m:"fwd1oij",Bosien3:["f5u9ap2","f3qs60o"]},interactive:{li1rpt:"f1gw3sf2",Bsft5z2:"f13zj6fq",E3zdtr:"f1mdlcz9",Eqx8gd:["f1a7op3","f1cjjd47"],By385i5:"f1gboi2j",B1piin3:["f1cjjd47","f1a7op3"],Dlnsje:"ffyw7fx",d9w3h3:["f1kp91vd","f1ibwz09"],B3778ie:["f1ibwz09","f1kp91vd"],B1q35kw:0,Bw17bha:0,Bcgy8vk:0,Bjuhk93:"f1mnjydx",Gjdm7m:"fj2g8qd",b1kco5:"f1yk9hq",Ba2ppi3:"fhwpy7i",F2fol1:"f14ee0xe",lck23g:"f1xhbsuh",wi16st:"fsrmcvb",ywj3b2:"f1t3k7v9",umuwi5:"fjw5xc1",Blcqepd:"f1xdyd5c",nplu4u:"fatpbeo",Bioka5o:"fb7uyps",Bnupc0a:"fx04xgm",bing71:"f1c7in40",Bercvud:"f1ibeo51",Bbr2w1p:"f1vnc8sk",Bduesf4:"f3e99gv",Bpq79vn:"fhljsf7"},filled:{Bgfg5da:0,B9xav0g:0,oivjwe:0,Bn0qgzm:0,B4g9neb:0,zhjwy3:0,wvpqe5:0,ibv6hh:0,u1mtju:0,h3c5rm:0,vrafjx:0,Bekrc4i:0,i8vvqc:0,g2u3we:0,icvyot:0,B4j52fo:0,irswps:"f88035w",q7v0qe:"ftmjh5b",kmh5ft:["f17blpuu","fsrcdbj"],nagaa4:"f1tpwn32",B1yhkcb:["fsrcdbj","f17blpuu"]},"filled-darker":{De3pzq:"f16xq7d1"},"filled-lighter":{De3pzq:"fxugw4r"},"filled-darker-shadow":{De3pzq:"f16xq7d1",Bgfg5da:0,B9xav0g:0,oivjwe:0,Bn0qgzm:0,B4g9neb:0,zhjwy3:0,wvpqe5:0,ibv6hh:0,u1mtju:0,h3c5rm:0,vrafjx:0,Bekrc4i:0,i8vvqc:0,g2u3we:0,icvyot:0,B4j52fo:0,irswps:"f1gmd7mu",E5pizo:"fyed02w"},"filled-lighter-shadow":{De3pzq:"fxugw4r",Bgfg5da:0,B9xav0g:0,oivjwe:0,Bn0qgzm:0,B4g9neb:0,zhjwy3:0,wvpqe5:0,ibv6hh:0,u1mtju:0,h3c5rm:0,vrafjx:0,Bekrc4i:0,i8vvqc:0,g2u3we:0,icvyot:0,B4j52fo:0,irswps:"f1gmd7mu",E5pizo:"fyed02w"},outline:{De3pzq:"fxugw4r",Bgfg5da:0,B9xav0g:"f1c1zstj",oivjwe:0,Bn0qgzm:0,B4g9neb:0,zhjwy3:0,wvpqe5:0,ibv6hh:0,u1mtju:0,h3c5rm:0,vrafjx:0,Bekrc4i:0,i8vvqc:0,g2u3we:0,icvyot:0,B4j52fo:0,irswps:"fhz96rm"},outlineInteractive:{kzujx5:0,oetu4i:"f1l4zc64",gvrnp0:0,xv9156:0,jek2p4:0,gg5e9n:0,Beu9t3s:0,dt87k2:0,Bt1vbvt:0,Bwzppfd:0,Bop6t4b:0,B2zwrfe:0,Bwp2tzp:0,Bgoe8wy:0,Bf40cpq:0,ckks6v:0,Baalond:"f9mts5e",v2iqwr:0,wmxk5l:"f1z0osm6",Bj33j0h:0,Bs0cc2w:0,qwjtx1:0,B50zh58:0,f7epvg:0,e1hlit:0,B7mkhst:0,ak43y8:0,Bbcopvn:0,Bvecx4l:0,lwioe0:0,B6oc9vd:0,e2sjt0:0,uqwnxt:0,asj8p9:"f1acnei2",Br8fjdy:0,zoxjo1:"f1so894s",Bt3ojkv:0,B7pmvfx:0,Bfht2n1:0,an54nd:0,t1ykpo:0,Belqbek:0,bbt1vd:0,Brahy3i:0,r7b1zc:0,rexu52:0,ovtnii:0,Bvq3b66:0,Bawrxx6:0,Bbs6y8j:0,B2qpgjt:"f19ezbcq"},invalid:{tvckwq:"fs4k3qj",gk2u95:["fcee079","fmyw78r"],hhx65j:"f1fgmyf4",Bxowmz0:["fmyw78r","fcee079"]}},{d:[".ftuwxu6{display:inline-flex;}",".f1ewtqcl{box-sizing:border-box;}",".f10pi13n{position:relative;}",[".f1yiegib{padding:0 0 var(--strokeWidthThick) 0;}",{p:-1}],[".f1s184ao{margin:0;}",{p:-1}],[".ft85np5{border-radius:var(--borderRadiusMedium);}",{p:-1}],".f12kltsn{vertical-align:top;}",".f1c21dwh{background-color:var(--colorTransparentBackground);}",[".ff3nzm7{border:var(--strokeWidthThin) solid var(--colorNeutralStrokeDisabled);}",{p:-2}],".f1gw3sf2::after{box-sizing:border-box;}",'.f13zj6fq::after{content:"";}',".f1mdlcz9::after{position:absolute;}",".f1a7op3::after{left:-1px;}",".f1cjjd47::after{right:-1px;}",".f1gboi2j::after{bottom:-1px;}",".ffyw7fx::after{height:max(var(--strokeWidthThick), var(--borderRadiusMedium));}",".f1kp91vd::after{border-bottom-left-radius:var(--borderRadiusMedium);}",".f1ibwz09::after{border-bottom-right-radius:var(--borderRadiusMedium);}",[".f1mnjydx::after{border-bottom:var(--strokeWidthThick) solid var(--colorCompoundBrandStroke);}",{p:-1}],".fj2g8qd::after{clip-path:inset(calc(100% - var(--strokeWidthThick)) 0 0 0);}",".f1yk9hq::after{transform:scaleX(0);}",".fhwpy7i::after{transition-property:transform;}",".f14ee0xe::after{transition-duration:var(--durationUltraFast);}",".f1xhbsuh::after{transition-delay:var(--curveAccelerateMid);}",[".f88035w{border:var(--strokeWidthThin) solid var(--colorTransparentStroke);}",{p:-2}],".f16xq7d1{background-color:var(--colorNeutralBackground3);}",".fxugw4r{background-color:var(--colorNeutralBackground1);}",[".f1gmd7mu{border:var(--strokeWidthThin) solid var(--colorTransparentStrokeInteractive);}",{p:-2}],".fyed02w{box-shadow:var(--shadow2);}",[".f1gmd7mu{border:var(--strokeWidthThin) solid var(--colorTransparentStrokeInteractive);}",{p:-2}],[".fhz96rm{border:var(--strokeWidthThin) solid var(--colorNeutralStroke1);}",{p:-2}],".f1c1zstj{border-bottom-color:var(--colorNeutralStrokeAccessible);}",".fs4k3qj:not(:focus-within),.fs4k3qj:hover:not(:focus-within){border-top-color:var(--colorPaletteRedBorder2);}",".fcee079:not(:focus-within),.fcee079:hover:not(:focus-within){border-right-color:var(--colorPaletteRedBorder2);}",".fmyw78r:not(:focus-within),.fmyw78r:hover:not(:focus-within){border-left-color:var(--colorPaletteRedBorder2);}",".f1fgmyf4:not(:focus-within),.f1fgmyf4:hover:not(:focus-within){border-bottom-color:var(--colorPaletteRedBorder2);}"],m:[["@media (forced-colors: active){.f9dbb4x{border-top-color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f3qs60o{border-right-color:GrayText;}.f5u9ap2{border-left-color:GrayText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fwd1oij{border-bottom-color:GrayText;}}",{m:"(forced-colors: active)"}],["@media screen and (prefers-reduced-motion: reduce){.fsrmcvb::after{transition-duration:0.01ms;}}",{m:"screen and (prefers-reduced-motion: reduce)"}],["@media screen and (prefers-reduced-motion: reduce){.f1t3k7v9::after{transition-delay:0.01ms;}}",{m:"screen and (prefers-reduced-motion: reduce)"}],["@media screen and (prefers-reduced-motion: reduce){.fx04xgm:focus-within::after{transition-duration:0.01ms;}}",{m:"screen and (prefers-reduced-motion: reduce)"}],["@media screen and (prefers-reduced-motion: reduce){.f1c7in40:focus-within::after{transition-delay:0.01ms;}}",{m:"screen and (prefers-reduced-motion: reduce)"}]],w:[".fjw5xc1:focus-within::after{transform:scaleX(1);}",".f1xdyd5c:focus-within::after{transition-property:transform;}",".fatpbeo:focus-within::after{transition-duration:var(--durationNormal);}",".fb7uyps:focus-within::after{transition-delay:var(--curveDecelerateMid);}",".f1ibeo51:focus-within:active::after{border-bottom-color:var(--colorCompoundBrandStrokePressed);}",".f1vnc8sk:focus-within{outline-width:var(--strokeWidthThick);}",".f3e99gv:focus-within{outline-style:solid;}",".fhljsf7:focus-within{outline-color:transparent;}",[".f19ezbcq:focus-within{border:var(--strokeWidthThin) solid var(--colorNeutralStroke1Pressed);}",{p:-2}],".f1so894s:focus-within{border-bottom-color:var(--colorCompoundBrandStroke);}"],h:[".ftmjh5b:hover,.ftmjh5b:focus-within{border-top-color:var(--colorTransparentStrokeInteractive);}",".f17blpuu:hover,.f17blpuu:focus-within{border-right-color:var(--colorTransparentStrokeInteractive);}",".fsrcdbj:hover,.fsrcdbj:focus-within{border-left-color:var(--colorTransparentStrokeInteractive);}",".f1tpwn32:hover,.f1tpwn32:focus-within{border-bottom-color:var(--colorTransparentStrokeInteractive);}",[".f9mts5e:hover{border:var(--strokeWidthThin) solid var(--colorNeutralStroke1Hover);}",{p:-2}],".f1l4zc64:hover{border-bottom-color:var(--colorNeutralStrokeAccessibleHover);}"],a:[[".f1acnei2:active{border:var(--strokeWidthThin) solid var(--colorNeutralStroke1Pressed);}",{p:-2}],".f1z0osm6:active{border-bottom-color:var(--colorNeutralStrokeAccessiblePressed);}"]}),FE=ke({base:{icvyot:"f1ern45e",vrafjx:["f1n71otn","f1deefiw"],oivjwe:"f1h8hb77",wvpqe5:["f1deefiw","f1n71otn"],jrapky:0,Frg6f3:0,t21cq0:0,B6of3ja:0,B74szlk:"f1s184ao",De3pzq:"f3rmtva",B7ck84d:"f1ewtqcl",sj55zd:"f19n0e5",Bh6795r:"fqerorx",Bahqtrf:"fk6fouc",Bqenvij:"f1l02sjl",yvdlaj:"fwyc1cq",B3o7kgh:"f13ta7ih",oeaueh:"f1s6fcnf"},disabled:{sj55zd:"f1s2aq7o",Bceei9c:"fdrzuqr",yvdlaj:"fahhnxm"},small:{sshi5w:"f1w5jphr",Byoj8tv:0,uwmqm3:0,z189sj:0,z8tnut:0,B0ocmuz:"f1pnffij",Bxyxcbc:"f192z54u",Bahqtrf:"fk6fouc",Be2twd7:"fy9rknc",Bhrd7zp:"figsok6",Bg96gwp:"fwrc4pm"},medium:{sshi5w:"fvmd9f",Byoj8tv:0,uwmqm3:0,z189sj:0,z8tnut:0,B0ocmuz:"f1ww82xo",Bxyxcbc:"f1if7ixc",Bahqtrf:"fk6fouc",Be2twd7:"fkhj508",Bhrd7zp:"figsok6",Bg96gwp:"f1i3iumi"},large:{sshi5w:"f1kfson",Byoj8tv:0,uwmqm3:0,z189sj:0,z8tnut:0,B0ocmuz:"f15hvtkj",Bxyxcbc:"f3kip1f",Bahqtrf:"fk6fouc",Be2twd7:"fod5ikn",Bhrd7zp:"figsok6",Bg96gwp:"faaz57k"}},{d:[".f1ern45e{border-top-style:none;}",".f1n71otn{border-right-style:none;}",".f1deefiw{border-left-style:none;}",".f1h8hb77{border-bottom-style:none;}",[".f1s184ao{margin:0;}",{p:-1}],".f3rmtva{background-color:transparent;}",".f1ewtqcl{box-sizing:border-box;}",".f19n0e5{color:var(--colorNeutralForeground1);}",".fqerorx{flex-grow:1;}",".fk6fouc{font-family:var(--fontFamilyBase);}",".f1l02sjl{height:100%;}",".fwyc1cq::-webkit-input-placeholder{color:var(--colorNeutralForeground4);}",".fwyc1cq::-moz-placeholder{color:var(--colorNeutralForeground4);}",".f13ta7ih::-webkit-input-placeholder{opacity:1;}",".f13ta7ih::-moz-placeholder{opacity:1;}",".f1s6fcnf{outline-style:none;}",".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}",".fdrzuqr{cursor:not-allowed;}",".fahhnxm::-webkit-input-placeholder{color:var(--colorNeutralForegroundDisabled);}",".fahhnxm::-moz-placeholder{color:var(--colorNeutralForegroundDisabled);}",".f1w5jphr{min-height:40px;}",[".f1pnffij{padding:var(--spacingVerticalXS) calc(var(--spacingHorizontalSNudge) + var(--spacingHorizontalXXS));}",{p:-1}],".f192z54u{max-height:200px;}",".fy9rknc{font-size:var(--fontSizeBase200);}",".figsok6{font-weight:var(--fontWeightRegular);}",".fwrc4pm{line-height:var(--lineHeightBase200);}",".fvmd9f{min-height:52px;}",[".f1ww82xo{padding:var(--spacingVerticalSNudge) calc(var(--spacingHorizontalMNudge) + var(--spacingHorizontalXXS));}",{p:-1}],".f1if7ixc{max-height:260px;}",".fkhj508{font-size:var(--fontSizeBase300);}",".f1i3iumi{line-height:var(--lineHeightBase300);}",".f1kfson{min-height:64px;}",[".f15hvtkj{padding:var(--spacingVerticalS) calc(var(--spacingHorizontalM) + var(--spacingHorizontalXXS));}",{p:-1}],".f3kip1f{max-height:320px;}",".fod5ikn{font-size:var(--fontSizeBase400);}",".faaz57k{line-height:var(--lineHeightBase400);}"]}),RE=ke({none:{B3rzk8w:"f1o1s39h"},both:{B3rzk8w:"f1pxm0xe"},horizontal:{B3rzk8w:"fq6nmtn"},vertical:{B3rzk8w:"f1f5ktr4"}},{d:[".f1o1s39h{resize:none;}",".f1pxm0xe{resize:both;}",".fq6nmtn{resize:horizontal;}",".f1f5ktr4{resize:vertical;}"]}),AE=e=>{"use no memo";const{size:t,appearance:r,resize:n}=e,o=e.textarea.disabled,i=`${e.textarea["aria-invalid"]}`=="true",a=r.startsWith("filled"),l=NE();e.root.className=ve(k0.root,l.base,o&&l.disabled,!o&&a&&l.filled,!o&&l[r],!o&&l.interactive,!o&&r==="outline"&&l.outlineInteractive,!o&&i&&l.invalid,e.root.className);const c=FE(),d=RE();return e.textarea.className=ve(k0.textarea,c.base,c[t],d[n],o&&c.disabled,e.textarea.className),e},dm=x.forwardRef((e,t)=>{const r=PE(e,t);return AE(r),Qt("useTextareaStyles_unstable")(r),TE(r)});dm.displayName="Textarea";const IE=Ue("r6pzz3z",null,[".r6pzz3z{overflow-y:hidden;overflow-y:clip;scrollbar-gutter:stable;}"]),OE=Ue("r144vlu9",null,[".r144vlu9{overflow-y:hidden;}"]);function qE(){const e=IE(),t=OE(),{targetDocument:r}=$r(),n=x.useCallback(()=>{var i;if(!r)return;var a;Math.floor(r.body.getBoundingClientRect().height)>((a=(i=r.defaultView)===null||i===void 0?void 0:i.innerHeight)!==null&&a!==void 0?a:0)&&(r.documentElement.classList.add(e),r.body.classList.add(t))},[r,e,t]),o=x.useCallback(()=>{r&&(r.documentElement.classList.remove(e),r.body.classList.remove(t))},[r,e,t]);return{disableBodyScroll:n,enableBodyScroll:o}}function ME(e,t){const{findFirstFocusable:r}=rw(),{targetDocument:n}=$r(),o=x.useRef(null);return x.useEffect(()=>{if(!e)return;const i=o.current&&r(o.current);if(i)i.focus();else{var a;(a=o.current)===null||a===void 0||a.focus()}},[r,e,t,n]),o}const LE={open:!1,inertTrapFocus:!1,modalType:"modal",isNestedDialog:!1,unmountOnClose:!0,dialogRef:{current:null},requestOpenChange(){}},um=w3(void 0),DE=um.Provider,Tr=e=>k3(um,(t=LE)=>e(t)),WE=!1,Pw=x.createContext(void 0),Nw=Pw.Provider,HE=()=>{var e;return(e=x.useContext(Pw))!==null&&e!==void 0?e:WE},Fw=x.createContext(void 0);Fw.Provider;const UE=()=>x.useContext(Fw),S0=Da(lm,{outScale:.85,easing:pt.curveDecelerateMid,duration:pt.durationGentle,exitEasing:pt.curveAccelerateMin,exitDuration:pt.durationGentle}),VE=e=>{const{children:t,modalType:r="modal",onOpenChange:n,inertTrapFocus:o=!1,unmountOnClose:i=!0}=e,a=ts("dialog-title-"),[l,c]=GE(t),[d,f]=es({state:e.open,defaultState:e.defaultOpen,initialState:!1}),p=mt($=>{n==null||n($.event,$),$.event.isDefaultPrevented()||f($.open)}),h=ME(d,r),{modalAttributes:y,triggerAttributes:m}=sw({trapFocus:r!=="non-modal",legacyTrapFocus:!o}),v=S3(um);return{components:{surfaceMotion:S0},inertTrapFocus:o,open:d,modalType:r,content:c,trigger:l,requestOpenChange:p,dialogTitleId:a,isNestedDialog:v,unmountOnClose:i,dialogRef:h,modalAttributes:y,triggerAttributes:m,surfaceMotion:Sw(e.surfaceMotion,{elementType:S0,defaultProps:{visible:d,appear:i,unmountOnExit:i}})}};function GE(e){const t=x.Children.toArray(e);switch(t.length){case 2:return t;case 1:return[void 0,t[0]];default:return[void 0,void 0]}}const Rw=x.createContext(void 0);function KE(){return x.useContext(Rw)}const YE=x.forwardRef((e,t)=>x.createElement(Rw.Provider,{value:t},e.children)),XE=(e,t)=>de(DE,{value:t.dialog,children:Cr(Nw,{value:t.dialogSurface,children:[e.trigger,e.content&&de(e.surfaceMotion,{children:de(YE,{children:e.content})})]})});function QE(e){const{modalType:t,open:r,dialogRef:n,dialogTitleId:o,isNestedDialog:i,inertTrapFocus:a,requestOpenChange:l,modalAttributes:c,triggerAttributes:d,unmountOnClose:f}=e;return{dialog:{open:r,modalType:t,dialogRef:n,dialogTitleId:o,isNestedDialog:i,inertTrapFocus:a,modalAttributes:c,triggerAttributes:d,unmountOnClose:f,requestOpenChange:l},dialogSurface:!1}}const Aw=x.memo(e=>{const t=VE(e),r=QE(t);return XE(t,r)});Aw.displayName="Dialog";const JE=e=>{const t=HE(),{children:r,disableButtonEnhancement:n=!1,action:o=t?"close":"open"}=e,i=M1(r),a=Tr(p=>p.requestOpenChange),{triggerAttributes:l}=sw(),c=mt(p=>{var h,y;i==null||(h=(y=i.props).onClick)===null||h===void 0||h.call(y,p),p.isDefaultPrevented()||a({event:p,type:"triggerClick",open:o==="open"})}),d={...i==null?void 0:i.props,ref:I1(i),onClick:c,...l},f=pw((i==null?void 0:i.type)==="button"||(i==null?void 0:i.type)==="a"?i.type:"div",{...d,type:"button"});return{children:u5(r,n?d:f)}},ZE=e=>e.children,fm=e=>{const t=JE(e);return ZE(t)};fm.displayName="DialogTrigger";fm.isFluentTriggerComponent=!0;const eB=(e,t)=>{const{position:r="end",fluid:n=!1}=e;return{components:{root:"div"},root:Le(tn("div",{ref:t,...e}),{elementType:"div"}),position:r,fluid:n}},tB=e=>de(e.root,{}),rB={root:"fui-DialogActions"},nB=Ue("rhfpeu0",null,{r:[".rhfpeu0{gap:8px;height:fit-content;box-sizing:border-box;display:flex;grid-row-start:3;grid-row-end:3;}"],s:["@media screen and (max-width: 480px){.rhfpeu0{flex-direction:column;justify-self:stretch;}}"]}),oB=ke({gridPositionEnd:{Bdqf98w:"f1a7i8kp",Br312pm:"fd46tj4",Bw0ie65:"fsyjsko",Btsd7tp:"f1n00o3b",ufxxby:"f1mvsp37",Bq5p579:"flbz1vp"},gridPositionStart:{Bdqf98w:"fsxvdwy",Br312pm:"fwpfdsa",Bw0ie65:"f1e2fz10",Ew0qkd:"f119phc2",ufxxby:"f1j719yo",Bq5p579:"flbz1vp"},fluidStart:{Bw0ie65:"fsyjsko"},fluidEnd:{Br312pm:"fwpfdsa"}},{d:[".f1a7i8kp{justify-self:end;}",".fd46tj4{grid-column-start:2;}",".fsyjsko{grid-column-end:4;}",".fsxvdwy{justify-self:start;}",".fwpfdsa{grid-column-start:1;}",".f1e2fz10{grid-column-end:2;}"],m:[["@media screen and (max-width: 480px){.f1n00o3b{grid-column-start:1;}}",{m:"screen and (max-width: 480px)"}],["@media screen and (max-width: 480px){.f1mvsp37{grid-row-start:4;}}",{m:"screen and (max-width: 480px)"}],["@media screen and (max-width: 480px){.flbz1vp{grid-row-end:auto;}}",{m:"screen and (max-width: 480px)"}],["@media screen and (max-width: 480px){.f119phc2{grid-column-end:4;}}",{m:"screen and (max-width: 480px)"}],["@media screen and (max-width: 480px){.f1j719yo{grid-row-start:3;}}",{m:"screen and (max-width: 480px)"}]]}),iB=e=>{"use no memo";const t=nB(),r=oB();return e.root.className=ve(rB.root,t,e.position==="start"&&r.gridPositionStart,e.position==="end"&&r.gridPositionEnd,e.fluid&&e.position==="start"&&r.fluidStart,e.fluid&&e.position==="end"&&r.fluidEnd,e.root.className),e},Iw=x.forwardRef((e,t)=>{const r=eB(e,t);return iB(r),Qt("useDialogActionsStyles_unstable")(r),tB(r)});Iw.displayName="DialogActions";const sB=(e,t)=>{var r;return{components:{root:"div"},root:Le(tn((r=e.as)!==null&&r!==void 0?r:"div",{ref:t,...e}),{elementType:"div"})}},aB=e=>de(e.root,{}),lB={root:"fui-DialogBody"},cB=Ue("rhwx3p8",null,{r:[".rhwx3p8{overflow:unset;gap:8px;display:grid;max-height:calc(100vh - 2 * 24px);max-height:calc(100dvh - 2 * 24px);box-sizing:border-box;grid-template-rows:auto 1fr;grid-template-columns:1fr 1fr auto;}"],s:["@media screen and (max-width: 480px){.rhwx3p8{max-width:100vw;grid-template-rows:auto 1fr auto;}}","@media screen and (max-height: 359px){.rhwx3p8{max-height:unset;}}"]}),dB=e=>{"use no memo";const t=cB();return e.root.className=ve(lB.root,t,e.root.className),e},Ow=x.forwardRef((e,t)=>{const r=sB(e,t);return dB(r),Qt("useDialogBodyStyles_unstable")(r),aB(r)});Ow.displayName="DialogBody";const j0={root:"fui-DialogTitle",action:"fui-DialogTitle__action"},uB=Ue("rxjm636",null,[".rxjm636{font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase500);font-weight:var(--fontWeightSemibold);line-height:var(--lineHeightBase500);margin:0;grid-row-start:1;grid-row-end:1;grid-column-start:1;grid-column-end:3;}"]),fB=ke({rootWithoutAction:{Bw0ie65:"fsyjsko"}},{d:[".fsyjsko{grid-column-end:4;}"]}),pB=Ue("r13kcrze",null,[".r13kcrze{grid-row-start:1;grid-row-end:1;grid-column-start:3;justify-self:end;align-self:start;}"]),hB=Ue("r2avt6e","roj2bbc",{r:[".r2avt6e{overflow:visible;padding:0;border-style:none;position:relative;box-sizing:content-box;background-color:inherit;color:inherit;font-family:inherit;font-size:inherit;cursor:pointer;line-height:0;-webkit-appearance:button;text-align:unset;}",".r2avt6e:focus{outline-style:none;}",".r2avt6e:focus-visible{outline-style:none;}",".r2avt6e[data-fui-focus-visible]{border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;}",'.r2avt6e[data-fui-focus-visible]::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);right:calc(2px * -1);bottom:calc(2px * -1);left:calc(2px * -1);}',".roj2bbc{overflow:visible;padding:0;border-style:none;position:relative;box-sizing:content-box;background-color:inherit;color:inherit;font-family:inherit;font-size:inherit;cursor:pointer;line-height:0;-webkit-appearance:button;text-align:unset;}",".roj2bbc:focus{outline-style:none;}",".roj2bbc:focus-visible{outline-style:none;}",".roj2bbc[data-fui-focus-visible]{border-top-color:transparent;border-left-color:transparent;border-bottom-color:transparent;border-right-color:transparent;}",'.roj2bbc[data-fui-focus-visible]::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);left:calc(2px * -1);bottom:calc(2px * -1);right:calc(2px * -1);}'],s:["@media (forced-colors: active){.r2avt6e[data-fui-focus-visible]::after{border-top-color:Highlight;border-right-color:Highlight;border-bottom-color:Highlight;border-left-color:Highlight;}}","@media (forced-colors: active){.roj2bbc[data-fui-focus-visible]::after{border-top-color:Highlight;border-left-color:Highlight;border-bottom-color:Highlight;border-right-color:Highlight;}}"]}),mB=e=>{"use no memo";const t=uB(),r=pB(),n=fB();return e.root.className=ve(j0.root,t,!e.action&&n.rootWithoutAction,e.root.className),e.action&&(e.action.className=ve(j0.action,r,e.action.className)),e},gB=(e,t)=>{const{action:r}=e,n=Tr(i=>i.modalType),o=hB();return{components:{root:"h2",action:"div"},root:Le(tn("h2",{ref:t,id:Tr(i=>i.dialogTitleId),...e}),{elementType:"h2"}),action:ar(r,{renderByDefault:n==="non-modal",defaultProps:{children:x.createElement(fm,{disableButtonEnhancement:!0,action:"close"},x.createElement("button",{type:"button",className:o,"aria-label":"close"},x.createElement(q3,null)))},elementType:"div"})}},vB=e=>Cr(x.Fragment,{children:[de(e.root,{children:e.root.children}),e.action&&de(e.action,{})]}),qw=x.forwardRef((e,t)=>{const r=gB(e,t);return mB(r),Qt("useDialogTitleStyles_unstable")(r),vB(r)});qw.displayName="DialogTitle";const $0=e4,bB=(e,t)=>{const r=KE(),n=Tr(k=>k.modalType),o=Tr(k=>k.isNestedDialog),i=UE(),a=i??o,l=Tr(k=>k.modalAttributes),c=Tr(k=>k.dialogRef),d=Tr(k=>k.requestOpenChange),f=Tr(k=>k.dialogTitleId),p=Tr(k=>k.open),h=Tr(k=>k.unmountOnClose),y=mt(k=>{if(fC(e.backdrop)){var w,_;(w=(_=e.backdrop).onClick)===null||w===void 0||w.call(_,k)}n==="modal"&&!k.isDefaultPrevented()&&d({event:k,open:!1,type:"backdropClick"})}),m=mt(k=>{var w;(w=e.onKeyDown)===null||w===void 0||w.call(e,k),k.key===j3&&!k.isDefaultPrevented()&&(d({event:k,open:!1,type:"escapeKeyDown"}),k.preventDefault())}),v=ar(e.backdrop,{renderByDefault:n!=="non-modal",defaultProps:{"aria-hidden":"true"},elementType:"div"}),$=v==null?void 0:v.appearance;v&&(v.onClick=y,delete v.appearance);const{disableBodyScroll:S,enableBodyScroll:j}=qE();return Sr(()=>{if(!p){j();return}if(!(o||n==="non-modal"))return S(),()=>j()},[p,n,o,S,j]),{components:{backdrop:"div",root:"div",backdropMotion:$0},open:p,backdrop:v,isNestedDialog:o,treatBackdropAsNested:a,backdropAppearance:$,unmountOnClose:h,mountNode:e.mountNode,root:Le(tn("div",{tabIndex:-1,role:n==="alert"?"alertdialog":"dialog","aria-modal":n!=="non-modal","aria-labelledby":e["aria-label"]?void 0:f,"aria-hidden":!h&&!p?!0:void 0,...e,...l,onKeyDown:m,ref:rs(t,r,c)}),{elementType:"div"}),backdropMotion:Sw(e.backdropMotion,{elementType:$0,defaultProps:{appear:h,visible:p}}),transitionStatus:void 0}},xB=(e,t)=>Cr(_w,{mountNode:e.mountNode,children:[e.backdrop&&e.backdropMotion&&de(e.backdropMotion,{children:de(e.backdrop,{})}),de(Nw,{value:t.dialogSurface,children:de(e.root,{})})]}),C0={root:"fui-DialogSurface",backdrop:"fui-DialogSurface__backdrop"},yB=Ue("r1u3t6p6","r5coedp",{r:[".r1u3t6p6{inset:0;padding:24px;margin:auto;border-style:none;overflow:unset;border:1px solid var(--colorTransparentStroke);border-radius:var(--borderRadiusXLarge);display:block;-webkit-user-select:unset;-moz-user-select:unset;user-select:unset;visibility:unset;position:fixed;height:fit-content;max-width:600px;max-height:100vh;max-height:100dvh;box-sizing:border-box;background-color:var(--colorNeutralBackground1);color:var(--colorNeutralForeground1);box-shadow:var(--shadow64);}",".r1u3t6p6:focus{outline-style:none;}",".r1u3t6p6:focus-visible{outline-style:none;}",".r1u3t6p6[data-fui-focus-visible]{border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;}",'.r1u3t6p6[data-fui-focus-visible]::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);right:calc(2px * -1);bottom:calc(2px * -1);left:calc(2px * -1);}',".r5coedp{inset:0;padding:24px;margin:auto;border-style:none;overflow:unset;border:1px solid var(--colorTransparentStroke);border-radius:var(--borderRadiusXLarge);display:block;-webkit-user-select:unset;-moz-user-select:unset;user-select:unset;visibility:unset;position:fixed;height:fit-content;max-width:600px;max-height:100vh;max-height:100dvh;box-sizing:border-box;background-color:var(--colorNeutralBackground1);color:var(--colorNeutralForeground1);box-shadow:var(--shadow64);}",".r5coedp:focus{outline-style:none;}",".r5coedp:focus-visible{outline-style:none;}",".r5coedp[data-fui-focus-visible]{border-top-color:transparent;border-left-color:transparent;border-bottom-color:transparent;border-right-color:transparent;}",'.r5coedp[data-fui-focus-visible]::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);left:calc(2px * -1);bottom:calc(2px * -1);right:calc(2px * -1);}'],s:["@media (forced-colors: active){.r1u3t6p6[data-fui-focus-visible]::after{border-top-color:Highlight;border-right-color:Highlight;border-bottom-color:Highlight;border-left-color:Highlight;}}","@media screen and (max-width: 480px){.r1u3t6p6{max-width:100vw;}}","@media screen and (max-height: 359px){.r1u3t6p6{overflow-y:auto;padding-right:calc(24px - 4px);border-right-width:4px;border-top-width:4px;border-bottom-width:4px;}}","@media (forced-colors: active){.r5coedp[data-fui-focus-visible]::after{border-top-color:Highlight;border-left-color:Highlight;border-bottom-color:Highlight;border-right-color:Highlight;}}","@media screen and (max-width: 480px){.r5coedp{max-width:100vw;}}","@media screen and (max-height: 359px){.r5coedp{overflow-y:auto;padding-left:calc(24px - 4px);border-left-width:4px;border-top-width:4px;border-bottom-width:4px;}}"]}),wB=Ue("r1e18s3l",null,[".r1e18s3l{inset:0px;background-color:var(--colorBackgroundOverlay);position:fixed;}"]),kB=ke({nestedDialogBackdrop:{De3pzq:"f1c21dwh"},dialogHidden:{Bkecrkj:"f1aehjj5"}},{d:[".f1c21dwh{background-color:var(--colorTransparentBackground);}",".f1aehjj5{pointer-events:none;}"]}),SB=e=>{"use no memo";const{root:t,backdrop:r,open:n,unmountOnClose:o,treatBackdropAsNested:i,backdropAppearance:a}=e,l=yB(),c=wB(),d=kB(),f=a?a==="transparent":i,p=!o&&!n;return t.className=ve(C0.root,l,p&&d.dialogHidden,t.className),r&&(r.className=ve(C0.backdrop,c,p&&d.dialogHidden,f&&d.nestedDialogBackdrop,r.className)),e};function jB(e){return{dialogSurface:!0}}const Mw=x.forwardRef((e,t)=>{const r=bB(e,t),n=jB();return SB(r),Qt("useDialogSurfaceStyles_unstable")(r),xB(r,n)});Mw.displayName="DialogSurface";const $B=(e,{referenceLabel:t,referenceId:r},n)=>{const{checkbox:o={},onSelectionChange:i,floatingAction:a,onClick:l,onKeyDown:c,disabled:d}=e,{findAllFocusable:f}=rw(),p=x.useRef(null),[h,y]=es({state:e.selected,defaultState:e.defaultSelected,initialState:!1}),m=[e.selected,e.defaultSelected,i].some(E=>typeof E<"u"),[v,$]=x.useState(!1),S=x.useCallback(E=>{if(!n.current)return!1;const N=f(n.current),L=E.target,V=N.some(M=>M.contains(L)),R=(p==null?void 0:p.current)===L;return V&&!R},[n,f]),j=x.useCallback(E=>{if(d||S(E))return;const N=!h;y(N),i&&i(E,{selected:N})},[d,i,h,y,S]),k=x.useCallback(E=>{[cc].includes(E.key)&&(E.preventDefault(),j(E))},[j]),w=x.useMemo(()=>{if(!m||a)return;const E={};return r?E["aria-labelledby"]=r:t&&(E["aria-label"]=t),ar(o,{defaultProps:{ref:p,type:"checkbox",checked:h,disabled:d,onChange:N=>j(N),onFocus:()=>$(!0),onBlur:()=>$(!1),...E},elementType:"input"})},[o,d,a,h,m,j,r,t]),_=x.useMemo(()=>{if(a)return ar(a,{defaultProps:{ref:p},elementType:"div"})},[a]),B=x.useMemo(()=>m?{onClick:r0(l,j),onKeyDown:r0(c,k)}:null,[m,j,l,c,k]);return{selected:h,selectable:m,selectFocused:v,selectableCardProps:B,checkboxSlot:w,floatingActionSlot:_}},CB=x.createContext(void 0),_0={selectableA11yProps:{referenceId:void 0}},_B=CB.Provider,zB={off:void 0,"no-tab":"limited-trap-focus","tab-exit":"limited","tab-only":"unlimited"},EB=({focusMode:e,disabled:t=!1,...r})=>{const n=["onClick","onDoubleClick","onMouseUp","onMouseDown","onPointerUp","onPointerDown","onTouchStart","onTouchEnd","onDragStart","onDragEnd"].some(a=>r[a]),o=e??(n?"no-tab":"off"),i=tz({tabBehavior:zB[o]});return t?{interactive:!1,focusAttributes:null}:o==="off"?{interactive:n,focusAttributes:null}:{interactive:n,focusAttributes:{...i,tabIndex:0}}},BB=(e,t)=>{const{appearance:r="filled",orientation:n="vertical",size:o="medium",disabled:i=!1,...a}=e,[l,c]=x.useState(_0.selectableA11yProps.referenceId),[d,f]=x.useState(_0.selectableA11yProps.referenceId),p=sm(),{selectable:h,selected:y,selectableCardProps:m,selectFocused:v,checkboxSlot:$,floatingActionSlot:S}=$B(e,{referenceId:l,referenceLabel:d},p),j=rs(p,t),{interactive:k,focusAttributes:w}=EB(e);let _={...h?null:w,...a,...m};return i&&(_={...a,"aria-disabled":!0,onClick:void 0}),{appearance:r,orientation:n,size:o,interactive:k,selectable:h,selectFocused:v,selected:y,disabled:i,selectableA11yProps:{setReferenceId:c,referenceId:l,referenceLabel:d,setReferenceLabel:f},components:{root:"div",floatingAction:"div",checkbox:"input"},root:Le(tn("div",{ref:j,role:"group",..._}),{elementType:"div"}),floatingAction:S,checkbox:$}},TB=(e,t)=>de(e.root,{children:Cr(_B,{value:t,children:[e.checkbox?de(e.checkbox,{}):null,e.floatingAction?de(e.floatingAction,{}):null,e.root.children]})}),Ou={root:"fui-Card",floatingAction:"fui-Card__floatingAction",checkbox:"fui-Card__checkbox"},PB=Ue("rfxo2k2","rgle7w9",[".rfxo2k2{overflow:hidden;border-radius:var(--fui-Card--border-radius);padding:var(--fui-Card--size);gap:var(--fui-Card--size);display:flex;position:relative;box-sizing:border-box;color:var(--colorNeutralForeground1);}",'.rfxo2k2::after{position:absolute;top:0;left:0;right:0;bottom:0;content:"";pointer-events:none;border-top-style:solid;border-right-style:solid;border-bottom-style:solid;border-left-style:solid;border-top-width:var(--strokeWidthThin);border-right-width:var(--strokeWidthThin);border-bottom-width:var(--strokeWidthThin);border-left-width:var(--strokeWidthThin);border-radius:var(--fui-Card--border-radius);}',".rfxo2k2>.fui-CardHeader,.rfxo2k2>.fui-CardFooter{flex-shrink:0;}",".rgle7w9{overflow:hidden;border-radius:var(--fui-Card--border-radius);padding:var(--fui-Card--size);gap:var(--fui-Card--size);display:flex;position:relative;box-sizing:border-box;color:var(--colorNeutralForeground1);}",'.rgle7w9::after{position:absolute;top:0;right:0;left:0;bottom:0;content:"";pointer-events:none;border-top-style:solid;border-left-style:solid;border-bottom-style:solid;border-right-style:solid;border-top-width:var(--strokeWidthThin);border-left-width:var(--strokeWidthThin);border-bottom-width:var(--strokeWidthThin);border-right-width:var(--strokeWidthThin);border-radius:var(--fui-Card--border-radius);}',".rgle7w9>.fui-CardHeader,.rgle7w9>.fui-CardFooter{flex-shrink:0;}"]),NB=ke({focused:{Brovlpu:"ftqa4ok",B486eqv:"f2hkw1w",B8q5s1w:"f8hki3x",Bci5o5g:["f1d2448m","ffh67wi"],n8qw10:"f1bjia2o",Bdrgwmp:["ffh67wi","f1d2448m"],Bqhya38:"f1j6vpng",Bwxa6fj:["f1pniga2","f1ffjurs"],Bdhvstf:"f987i1v",B7zbvrb:["f1ffjurs","f1pniga2"],Bm4h7ae:"f15bsgw9",B7ys5i9:"f14e48fq",Busjfv9:"f18yb2kv",Bhk32uz:"fd6o370",f6g5ot:0,Boxcth7:0,Bhdgwq3:0,hgwjuy:0,Bshpdp8:0,Bsom6fd:0,Blkhhs4:0,Bonggc9:0,Ddfuxk:0,i03rao:0,kclons:0,clg4pj:0,Bpqj9nj:0,B6dhp37:0,Bf4ptjt:0,Bqtpl0w:0,i4rwgc:"fpqizxz",Dah5zi:0,B1tsrr9:0,qqdqy8:0,Bkh64rk:0,e3fwne:"fnd8nzh",J0r882:"f15fr7a0",Bule8hv:["fwsq40z","fy0y4wt"],Bjwuhne:"f34ld9f",Ghsupd:["fy0y4wt","fwsq40z"]},selectableFocused:{Brovlpu:"ftqa4ok",B486eqv:"f2hkw1w",Bssx7fj:"f1b1k54r",uh7if5:["f4ne723","fqqcjud"],clntm0:"fh7aioi",Dlk2r6:["fqqcjud","f4ne723"],h6p2u:"f1ufm4qn",I6qiy5:["f1qnwcb4","fgrk5zm"],yzno9d:"fi52z01",By0wis0:["fgrk5zm","f1qnwcb4"],B2j2mmj:"ffht0p2",wigs8:"f1p0ul1q",pbfy6t:"f1c901ms",B0v4ure:"f1alokd7",Byrf0fs:0,Bsiemmq:0,Bwckmig:0,skfxo0:0,Iidy0u:0,B98u21t:0,Bvwlmkc:0,jo1ztg:0,Ba1iezr:0,Blmvk6g:0,B24cy0v:0,Bil7v7r:0,Br3gin4:0,nr063g:0,ghq09:0,Bbgo44z:0,Bseh09z:"f1i978nd",az1dzo:0,Ba3ybja:0,B6352mv:0,vppk2z:0,Biaj6j7:"f1nh8hsq",B2pnrqr:"f1amxum7",B29w5g4:["f1cec8w7","f554mv0"],Bhhzhcn:"f1sj6kbr",Bec0n69:["f554mv0","f1cec8w7"]},orientationHorizontal:{Beiy3e4:"f1063pyq",Bt984gj:"f122n59",Binpb3b:"ftrw7vg",qrt8p2:"f18opajm",k6ws3r:["f13002it","fqo182t"],Btcwela:["f18yna97","f1kd6wh7"],Fer9m8:"f4i4759"},orientationVertical:{Beiy3e4:"f1vx9l62",B5nvv7i:["f14k419y","f1fgo9fz"],Baxg94k:["f1fgo9fz","f14k419y"],tn21ii:"fvqmfsm",B0ud6bj:"f3am6yf",Bgdo4j:"f1r5wgso"},sizeSmall:{B7balbw:"f1pi9uxy",B1h88n7:"f1h1zgly"},sizeMedium:{B7balbw:"frsmuga",B1h88n7:"fuldkky"},sizeLarge:{B7balbw:"f1qua4xo",B1h88n7:"fimkt6v"},interactive:{rhjd8f:"f1epqm3e"},filled:{De3pzq:"fxugw4r",E5pizo:"f1whvlc6",B0n5ga8:"f16gxe2i",s924m2:["fpgykix","fzybk4o"],B1q35kw:"f1osi826",Gp14am:["fzybk4o","fpgykix"]},filledInteractive:{Bceei9c:"f1k6fduh",De3pzq:"fxugw4r",E5pizo:"f1whvlc6",B0n5ga8:"f16gxe2i",s924m2:["fpgykix","fzybk4o"],B1q35kw:"f1osi826",Gp14am:["fzybk4o","fpgykix"],Bi91k9c:"feu1g3u",Jwef8y:"f1knas48",Bvxd0ez:"f1m145df",ecr2s2:"fb40n2d"},filledInteractiveSelected:{De3pzq:"f1nfm20t",B0n5ga8:"f16eln5f",s924m2:["fa2okxs","fg4zq3l"],B1q35kw:"ff6932p",Gp14am:["fg4zq3l","fa2okxs"],Bi91k9c:"fx9teim",Jwef8y:"f1kz6goq"},filledAlternative:{De3pzq:"f1dmdbja",E5pizo:"f1whvlc6",B0n5ga8:"f16gxe2i",s924m2:["fpgykix","fzybk4o"],B1q35kw:"f1osi826",Gp14am:["fzybk4o","fpgykix"]},filledAlternativeInteractive:{Bceei9c:"f1k6fduh",De3pzq:"f1dmdbja",E5pizo:"f1whvlc6",B0n5ga8:"f16gxe2i",s924m2:["fpgykix","fzybk4o"],B1q35kw:"f1osi826",Gp14am:["fzybk4o","fpgykix"],Bi91k9c:"fnwyq0v",Jwef8y:"f1uvynv3",Bvxd0ez:"f1m145df",ecr2s2:"f1yhgkbh"},filledAlternativeInteractiveSelected:{De3pzq:"fjxa0vh",B0n5ga8:"f16eln5f",s924m2:["fa2okxs","fg4zq3l"],B1q35kw:"ff6932p",Gp14am:["fg4zq3l","fa2okxs"],Bi91k9c:"f1luvkty",Jwef8y:"fehi0vp"},outline:{De3pzq:"f1c21dwh",E5pizo:"f1couhl3",B0n5ga8:"ft83z1f",s924m2:["f1g4150c","f192dr6e"],B1q35kw:"f1qnawh6",Gp14am:["f192dr6e","f1g4150c"]},outlineInteractive:{Bceei9c:"f1k6fduh",De3pzq:"f1c21dwh",E5pizo:"f1couhl3",B0n5ga8:"ft83z1f",s924m2:["f1g4150c","f192dr6e"],B1q35kw:"f1qnawh6",Gp14am:["f192dr6e","f1g4150c"],Bi91k9c:"feu1g3u",Jwef8y:"fjxutwb",Be0v6ae:"f1llr77y",B5kxglz:["fzk0khw","fjj8tog"],B3pwyw6:"fb1u8ub",Bymgtzf:["fjj8tog","fzk0khw"],ecr2s2:"fophhak",dmfk:"f1uohb70",B4ofi8:["f1jm7v1n","f1bus3rq"],jgq6uv:"f1fbu7rr",Baxewws:["f1bus3rq","f1jm7v1n"]},outlineInteractiveSelected:{De3pzq:"f1q9pm1r",B0n5ga8:"f16eln5f",s924m2:["fa2okxs","fg4zq3l"],B1q35kw:"ff6932p",Gp14am:["fg4zq3l","fa2okxs"],Bi91k9c:"fx9teim",Jwef8y:"fg59vm4"},outlineDisabled:{De3pzq:"f1c21dwh",E5pizo:"f1couhl3",g2u3we:"f1jj8ep1",h3c5rm:["f15xbau","fy0fskl"],B9xav0g:"f4ikngz",zhjwy3:["fy0fskl","f15xbau"],ezxybo:"f1ls5moo",wc7uws:"f1qiza15",B0n5ga8:"f13dj02",s924m2:["f9wngki","f17v59j0"],B1q35kw:"f1vxzwsp",Gp14am:["f17v59j0","f9wngki"]},subtle:{De3pzq:"fhovq9v",E5pizo:"f1couhl3",B0n5ga8:"f16gxe2i",s924m2:["fpgykix","fzybk4o"],B1q35kw:"f1osi826",Gp14am:["fzybk4o","fpgykix"]},subtleInteractive:{Bceei9c:"f1k6fduh",De3pzq:"fhovq9v",E5pizo:"f1couhl3",B0n5ga8:"f16gxe2i",s924m2:["fpgykix","fzybk4o"],B1q35kw:"f1osi826",Gp14am:["fzybk4o","fpgykix"],Bi91k9c:"feu1g3u",Jwef8y:"f1t94bn6",ecr2s2:"f1wfn5kd"},subtleInteractiveSelected:{De3pzq:"fq5gl1p",B0n5ga8:"f16eln5f",s924m2:["fa2okxs","fg4zq3l"],B1q35kw:"ff6932p",Gp14am:["fg4zq3l","fa2okxs"],Bi91k9c:"fx9teim",Jwef8y:"f1uqaxdt"},highContrastSelected:{B8gzw0y:"f1h3a8gf",By8wz76:"f1nz3ub2",B7iucu3:"fqc85l4",Boo9lyk:"f1ucc5z8",sga51p:"fyj59f4",qj1yg9:["f19v95gn","f1n69f6i"],B8acmzm:"f16q7dot",Gezqo6:["f1n69f6i","f19v95gn"]},highContrastInteractive:{waf3gn:"f1quqgnd",B96h8j5:"f193utb4",Bpd3jnq:"f1io67iv",uhbujs:"f3n01jk",sga51p:"fyj59f4",qj1yg9:["f19v95gn","f1n69f6i"],B8acmzm:"f16q7dot",Gezqo6:["f1n69f6i","f19v95gn"]},select:{qhf8xq:"f1euv43f",Bhzewxz:"fqclxi7",j35jbq:["fiv86kb","f36uhnt"],Bj3rh1h:"fom9my7"},hiddenCheckbox:{B68tc82:0,Bmxbyg5:0,Bpg54ce:"f1a3p1vp",a9b677:"frkrog8",Bqenvij:"f1mpe4l3",qhf8xq:"f1euv43f",Bh84pgu:"fmf1zke",Bgl5zvf:"f1wch0ki",Huce71:"fz5stix"},disabled:{Bceei9c:"fdrzuqr",famaaq:"f1xqy1su",sj55zd:"f1s2aq7o",De3pzq:"f1bg9a2p",E5pizo:"fyed02w",g2u3we:"f1jj8ep1",h3c5rm:["f15xbau","fy0fskl"],B9xav0g:"f4ikngz",zhjwy3:["fy0fskl","f15xbau"],Ftih45:"f1wl9k8s",Brfgrao:"f1j7ml58",lawp4y:0,Fbdkly:0,mdwyqc:0,Bciustq:0,gc50h5:"f13vvzas",Ehzi8l:"f198lalb",B0n5ga8:"f13dj02",s924m2:["f9wngki","f17v59j0"],B1q35kw:"f1vxzwsp",Gp14am:["f17v59j0","f9wngki"],Bikrtoi:"f11og98d",G8qf51:"f1rg3h4v",Brxh4y7:"fbm2y3b",ezxybo:"f4yodeu",wc7uws:"fcwfbwp",gp3uxg:"f1repx37",Fohawp:["f1ybi8ct","f1h4eg6q"],Bxulg6k:"f18mejnb",vcjq4m:["f1h4eg6q","f1ybi8ct"],Bsqkqe9:"f1nift3m",fskg1g:"f1wu3i8x",iwiei9:0,Effecx:0,Bkt1b9m:0,jfmxvr:0,orauir:"f6v4vfa",B2yd9ot:"folrdqs",Fn9tzk:"f168z5yf",Bv0wker:["fpor7gj","fzextn6"],Bp2dl5b:"f1yaw79v",pzn0iz:["fzextn6","fpor7gj"]}},{f:[".ftqa4ok:focus{outline-style:none;}"],i:[".f2hkw1w:focus-visible{outline-style:none;}"],d:[".f8hki3x[data-fui-focus-visible]{border-top-color:transparent;}",".f1d2448m[data-fui-focus-visible]{border-right-color:transparent;}",".ffh67wi[data-fui-focus-visible]{border-left-color:transparent;}",".f1bjia2o[data-fui-focus-visible]{border-bottom-color:transparent;}",'.f15bsgw9[data-fui-focus-visible]::after{content:"";}',".f14e48fq[data-fui-focus-visible]::after{position:absolute;}",".f18yb2kv[data-fui-focus-visible]::after{pointer-events:none;}",".fd6o370[data-fui-focus-visible]::after{z-index:1;}",[".fpqizxz[data-fui-focus-visible]::after{border:var(--strokeWidthThick) solid var(--colorStrokeFocus2);}",{p:-2}],[".fnd8nzh[data-fui-focus-visible]::after{border-radius:var(--fui-Card--border-radius);}",{p:-1}],".f15fr7a0[data-fui-focus-visible]::after{top:calc(0px - var(--strokeWidthThick) - -2px);}",".fwsq40z[data-fui-focus-visible]::after{right:calc(0px - var(--strokeWidthThick) - -2px);}",".fy0y4wt[data-fui-focus-visible]::after{left:calc(0px - var(--strokeWidthThick) - -2px);}",".f34ld9f[data-fui-focus-visible]::after{bottom:calc(0px - var(--strokeWidthThick) - -2px);}",".f1b1k54r[data-fui-focus-within]:focus-within{border-top-color:transparent;}",".f4ne723[data-fui-focus-within]:focus-within{border-right-color:transparent;}",".fqqcjud[data-fui-focus-within]:focus-within{border-left-color:transparent;}",".fh7aioi[data-fui-focus-within]:focus-within{border-bottom-color:transparent;}",'.ffht0p2[data-fui-focus-within]:focus-within::after{content:"";}',".f1p0ul1q[data-fui-focus-within]:focus-within::after{position:absolute;}",".f1c901ms[data-fui-focus-within]:focus-within::after{pointer-events:none;}",".f1alokd7[data-fui-focus-within]:focus-within::after{z-index:1;}",[".f1i978nd[data-fui-focus-within]:focus-within::after{border:var(--strokeWidthThick) solid var(--colorStrokeFocus2);}",{p:-2}],[".f1nh8hsq[data-fui-focus-within]:focus-within::after{border-radius:var(--fui-Card--border-radius);}",{p:-1}],".f1amxum7[data-fui-focus-within]:focus-within::after{top:calc(0px - var(--strokeWidthThick) - -2px);}",".f1cec8w7[data-fui-focus-within]:focus-within::after{right:calc(0px - var(--strokeWidthThick) - -2px);}",".f554mv0[data-fui-focus-within]:focus-within::after{left:calc(0px - var(--strokeWidthThick) - -2px);}",".f1sj6kbr[data-fui-focus-within]:focus-within::after{bottom:calc(0px - var(--strokeWidthThick) - -2px);}",".f1063pyq{flex-direction:row;}",".f122n59{align-items:center;}",".ftrw7vg>.fui-CardPreview{margin-top:calc(var(--fui-Card--size) * -1);}",".f18opajm>.fui-CardPreview{margin-bottom:calc(var(--fui-Card--size) * -1);}",'.f13002it>:not([aria-hidden="true"]).fui-CardPreview:first-of-type{margin-left:calc(var(--fui-Card--size) * -1);}','.fqo182t>:not([aria-hidden="true"]).fui-CardPreview:first-of-type{margin-right:calc(var(--fui-Card--size) * -1);}','.f18yna97>:not([aria-hidden="true"]).fui-CardPreview:last-of-type{margin-right:calc(var(--fui-Card--size) * -1);}','.f1kd6wh7>:not([aria-hidden="true"]).fui-CardPreview:last-of-type{margin-left:calc(var(--fui-Card--size) * -1);}',".f4i4759>.fui-CardHeader:last-of-type,.f4i4759>.fui-CardFooter:last-of-type{flex-grow:1;}",".f1vx9l62{flex-direction:column;}",".f14k419y>.fui-CardPreview{margin-left:calc(var(--fui-Card--size) * -1);}",".f1fgo9fz>.fui-CardPreview{margin-right:calc(var(--fui-Card--size) * -1);}",'.fvqmfsm>:not([aria-hidden="true"]).fui-CardPreview:first-of-type{margin-top:calc(var(--fui-Card--size) * -1);}',".f3am6yf>.fui-Card__floatingAction+.fui-CardPreview{margin-top:calc(var(--fui-Card--size) * -1);}",'.f1r5wgso>:not([aria-hidden="true"]).fui-CardPreview:last-of-type{margin-bottom:calc(var(--fui-Card--size) * -1);}',".f1pi9uxy{--fui-Card--size:8px;}",".f1h1zgly{--fui-Card--border-radius:var(--borderRadiusSmall);}",".frsmuga{--fui-Card--size:12px;}",".fuldkky{--fui-Card--border-radius:var(--borderRadiusMedium);}",".f1qua4xo{--fui-Card--size:16px;}",".fimkt6v{--fui-Card--border-radius:var(--borderRadiusLarge);}",".f1epqm3e .fui-Text{color:currentColor;}",".fxugw4r{background-color:var(--colorNeutralBackground1);}",".f1whvlc6{box-shadow:var(--shadow4);}",".f16gxe2i::after{border-top-color:var(--colorTransparentStroke);}",".fpgykix::after{border-right-color:var(--colorTransparentStroke);}",".fzybk4o::after{border-left-color:var(--colorTransparentStroke);}",".f1osi826::after{border-bottom-color:var(--colorTransparentStroke);}",".f1k6fduh{cursor:pointer;}",".f1nfm20t{background-color:var(--colorNeutralBackground1Selected);}",".f16eln5f::after{border-top-color:var(--colorNeutralStroke1Selected);}",".fa2okxs::after{border-right-color:var(--colorNeutralStroke1Selected);}",".fg4zq3l::after{border-left-color:var(--colorNeutralStroke1Selected);}",".ff6932p::after{border-bottom-color:var(--colorNeutralStroke1Selected);}",".f1dmdbja{background-color:var(--colorNeutralBackground2);}",".fjxa0vh{background-color:var(--colorNeutralBackground2Selected);}",".f1c21dwh{background-color:var(--colorTransparentBackground);}",".f1couhl3{box-shadow:none;}",".ft83z1f::after{border-top-color:var(--colorNeutralStroke1);}",".f1g4150c::after{border-right-color:var(--colorNeutralStroke1);}",".f192dr6e::after{border-left-color:var(--colorNeutralStroke1);}",".f1qnawh6::after{border-bottom-color:var(--colorNeutralStroke1);}",".f1q9pm1r{background-color:var(--colorTransparentBackgroundSelected);}",".f1jj8ep1{border-top-color:var(--colorNeutralStrokeDisabled);}",".f15xbau{border-right-color:var(--colorNeutralStrokeDisabled);}",".fy0fskl{border-left-color:var(--colorNeutralStrokeDisabled);}",".f4ikngz{border-bottom-color:var(--colorNeutralStrokeDisabled);}",".f13dj02::after{border-top-color:var(--colorNeutralStrokeDisabled);}",".f9wngki::after{border-right-color:var(--colorNeutralStrokeDisabled);}",".f17v59j0::after{border-left-color:var(--colorNeutralStrokeDisabled);}",".f1vxzwsp::after{border-bottom-color:var(--colorNeutralStrokeDisabled);}",".fhovq9v{background-color:var(--colorSubtleBackground);}",".fq5gl1p{background-color:var(--colorSubtleBackgroundSelected);}",".f1euv43f{position:absolute;}",".fqclxi7{top:4px;}",".fiv86kb{right:4px;}",".f36uhnt{left:4px;}",".fom9my7{z-index:var(--zIndexContent, 1);}",[".f1a3p1vp{overflow:hidden;}",{p:-1}],".frkrog8{width:1px;}",".f1mpe4l3{height:1px;}",".fmf1zke{clip:rect(0 0 0 0);}",".f1wch0ki{clip-path:inset(50%);}",".fz5stix{white-space:nowrap;}",".fdrzuqr{cursor:not-allowed;}",".f1xqy1su{-webkit-user-select:none;-moz-user-select:none;user-select:none;}",".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}",".f1bg9a2p{background-color:var(--colorNeutralBackgroundDisabled);}",".fyed02w{box-shadow:var(--shadow2);}",'.f1wl9k8s::before{content:"";}',".f1j7ml58::before{position:absolute;}",[".f13vvzas::before{inset:0;}",{p:-1}],".f198lalb::before{z-index:calc(var(--zIndexContent, 1) + 1);}"],m:[["@media (forced-colors: active){.f1j6vpng[data-fui-focus-visible]::after{border-top-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1ffjurs[data-fui-focus-visible]::after{border-left-color:Highlight;}.f1pniga2[data-fui-focus-visible]::after{border-right-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f987i1v[data-fui-focus-visible]::after{border-bottom-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1ufm4qn[data-fui-focus-within]:focus-within::after{border-top-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1qnwcb4[data-fui-focus-within]:focus-within::after{border-right-color:Highlight;}.fgrk5zm[data-fui-focus-within]:focus-within::after{border-left-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fi52z01[data-fui-focus-within]:focus-within::after{border-bottom-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1h3a8gf{forced-color-adjust:none;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1nz3ub2{background-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fqc85l4{color:HighlightText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1ucc5z8 .fui-CardPreview,.f1ucc5z8 .fui-CardFooter{forced-color-adjust:auto;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.fyj59f4::after{border-top-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f19v95gn::after{border-right-color:Highlight;}.f1n69f6i::after{border-left-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f16q7dot::after{border-bottom-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1quqgnd:hover,.f1quqgnd :active{forced-color-adjust:none;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f193utb4:hover,.f193utb4 :active{background-color:Highlight;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f1io67iv:hover,.f1io67iv :active{color:HighlightText;}}",{m:"(forced-colors: active)"}],["@media (forced-colors: active){.f3n01jk:hover .fui-CardPreview,.f3n01jk :active .fui-CardPreview,.f3n01jk:hover .fui-CardFooter,.f3n01jk :active .fui-CardFooter{forced-color-adjust:auto;}}",{m:"(forced-colors: active)"}]],h:[".feu1g3u:hover{color:var(--colorNeutralForeground1Hover);}",".f1knas48:hover{background-color:var(--colorNeutralBackground1Hover);}",".f1m145df:hover{box-shadow:var(--shadow8);}",".fx9teim:hover{color:var(--colorNeutralForeground1Selected);}",".f1kz6goq:hover{background-color:var(--colorNeutralBackground1Selected);}",".fnwyq0v:hover{color:var(--colorNeutralForeground2Hover);}",".f1uvynv3:hover{background-color:var(--colorNeutralBackground2Hover);}",".f1luvkty:hover{color:var(--colorNeutralForeground2Selected);}",".fehi0vp:hover{background-color:var(--colorNeutralBackground2Selected);}",".fjxutwb:hover{background-color:var(--colorTransparentBackgroundHover);}",".f1llr77y:hover::after{border-top-color:var(--colorNeutralStroke1Hover);}",".fzk0khw:hover::after{border-right-color:var(--colorNeutralStroke1Hover);}",".fjj8tog:hover::after{border-left-color:var(--colorNeutralStroke1Hover);}",".fb1u8ub:hover::after{border-bottom-color:var(--colorNeutralStroke1Hover);}",".fg59vm4:hover{background-color:var(--colorTransparentBackgroundSelected);}",".f1ls5moo:hover,.f1ls5moo:active{background-color:var(--colorTransparentBackground);}",".f1qiza15:hover,.f1qiza15:active{box-shadow:none;}",".f1t94bn6:hover{background-color:var(--colorSubtleBackgroundHover);}",".f1uqaxdt:hover{background-color:var(--colorSubtleBackgroundSelected);}",".f11og98d:hover,.f11og98d:active{cursor:not-allowed;}",".f1rg3h4v:hover,.f1rg3h4v:active{-webkit-user-select:none;-moz-user-select:none;user-select:none;}",".fbm2y3b:hover,.fbm2y3b:active{color:var(--colorNeutralForegroundDisabled);}",".f4yodeu:hover,.f4yodeu:active{background-color:var(--colorNeutralBackgroundDisabled);}",".fcwfbwp:hover,.fcwfbwp:active{box-shadow:var(--shadow2);}",".f1repx37:hover,.f1repx37:active{border-top-color:var(--colorNeutralStrokeDisabled);}",".f1ybi8ct:hover,.f1ybi8ct:active{border-right-color:var(--colorNeutralStrokeDisabled);}",".f1h4eg6q:hover,.f1h4eg6q:active{border-left-color:var(--colorNeutralStrokeDisabled);}",".f18mejnb:hover,.f18mejnb:active{border-bottom-color:var(--colorNeutralStrokeDisabled);}",'.f1nift3m:hover::before,.f1nift3m:active::before{content:"";}',".f1wu3i8x:hover::before,.f1wu3i8x:active::before{position:absolute;}",[".f6v4vfa:hover::before,.f6v4vfa:active::before{inset:0;}",{p:-1}],".folrdqs:hover::before,.folrdqs:active::before{z-index:calc(var(--zIndexContent, 1) + 1);}",".f168z5yf:hover::after,.f168z5yf:active::after{border-top-color:var(--colorNeutralStrokeDisabled);}",".fpor7gj:hover::after,.fpor7gj:active::after{border-right-color:var(--colorNeutralStrokeDisabled);}",".fzextn6:hover::after,.fzextn6:active::after{border-left-color:var(--colorNeutralStrokeDisabled);}",".f1yaw79v:hover::after,.f1yaw79v:active::after{border-bottom-color:var(--colorNeutralStrokeDisabled);}"],a:[".fb40n2d:active{background-color:var(--colorNeutralBackground1Pressed);}",".f1yhgkbh:active{background-color:var(--colorNeutralBackground2Pressed);}",".fophhak:active{background-color:var(--colorTransparentBackgroundPressed);}",".f1uohb70:active::after{border-top-color:var(--colorNeutralStroke1Pressed);}",".f1jm7v1n:active::after{border-right-color:var(--colorNeutralStroke1Pressed);}",".f1bus3rq:active::after{border-left-color:var(--colorNeutralStroke1Pressed);}",".f1fbu7rr:active::after{border-bottom-color:var(--colorNeutralStroke1Pressed);}",".f1wfn5kd:active{background-color:var(--colorSubtleBackgroundPressed);}"]}),FB=e=>{"use no memo";const t=PB(),r=NB(),n={horizontal:r.orientationHorizontal,vertical:r.orientationVertical},o={small:r.sizeSmall,medium:r.sizeMedium,large:r.sizeLarge},i={filled:r.filled,"filled-alternative":r.filledAlternative,outline:r.outline,subtle:r.subtle},a={filled:r.filledInteractiveSelected,"filled-alternative":r.filledAlternativeInteractiveSelected,outline:r.outlineInteractiveSelected,subtle:r.subtleInteractiveSelected},l={filled:r.filledInteractive,"filled-alternative":r.filledAlternativeInteractive,outline:r.outlineInteractive,subtle:r.subtleInteractive},c=!e.disabled&&(e.interactive||e.selectable),d=x.useMemo(()=>e.disabled?"":e.selectable?e.selectFocused?r.selectableFocused:"":r.focused,[e.disabled,e.selectFocused,e.selectable,r.focused,r.selectableFocused]);return e.root.className=ve(Ou.root,t,n[e.orientation],o[e.size],i[e.appearance],c&&r.interactive,c&&l[e.appearance],e.selected&&a[e.appearance],d,c&&r.highContrastInteractive,e.selected&&r.highContrastSelected,e.disabled&&r.disabled,e.disabled&&e.appearance==="outline"&&r.outlineDisabled,e.root.className),e.floatingAction&&(e.floatingAction.className=ve(Ou.floatingAction,r.select,e.floatingAction.className)),e.checkbox&&(e.checkbox.className=ve(Ou.checkbox,r.hiddenCheckbox,e.checkbox.className)),e};function RB({selectableA11yProps:e}){return{selectableA11yProps:e}}const Lw=x.forwardRef((e,t)=>{const r=BB(e,t),n=RB(r);return FB(r),Qt("useCardStyles_unstable")(r),TB(r,n)});Lw.displayName="Card";function vt(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var AB=typeof Symbol=="function"&&Symbol.observable||"@@observable",z0=AB,qu=()=>Math.random().toString(36).substring(7).split("").join("."),IB={INIT:`@@redux/INIT${qu()}`,REPLACE:`@@redux/REPLACE${qu()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${qu()}`},Kc=IB;function pm(e){if(typeof e!="object"||e===null)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function Dw(e,t,r){if(typeof e!="function")throw new Error(vt(2));if(typeof t=="function"&&typeof r=="function"||typeof r=="function"&&typeof arguments[3]=="function")throw new Error(vt(0));if(typeof t=="function"&&typeof r>"u"&&(r=t,t=void 0),typeof r<"u"){if(typeof r!="function")throw new Error(vt(1));return r(Dw)(e,t)}let n=e,o=t,i=new Map,a=i,l=0,c=!1;function d(){a===i&&(a=new Map,i.forEach(($,S)=>{a.set(S,$)}))}function f(){if(c)throw new Error(vt(3));return o}function p($){if(typeof $!="function")throw new Error(vt(4));if(c)throw new Error(vt(5));let S=!0;d();const j=l++;return a.set(j,$),function(){if(S){if(c)throw new Error(vt(6));S=!1,d(),a.delete(j),i=null}}}function h($){if(!pm($))throw new Error(vt(7));if(typeof $.type>"u")throw new Error(vt(8));if(typeof $.type!="string")throw new Error(vt(17));if(c)throw new Error(vt(9));try{c=!0,o=n(o,$)}finally{c=!1}return(i=a).forEach(j=>{j()}),$}function y($){if(typeof $!="function")throw new Error(vt(10));n=$,h({type:Kc.REPLACE})}function m(){const $=p;return{subscribe(S){if(typeof S!="object"||S===null)throw new Error(vt(11));function j(){const w=S;w.next&&w.next(f())}return j(),{unsubscribe:$(j)}},[z0](){return this}}}return h({type:Kc.INIT}),{dispatch:h,subscribe:p,getState:f,replaceReducer:y,[z0]:m}}function OB(e){Object.keys(e).forEach(t=>{const r=e[t];if(typeof r(void 0,{type:Kc.INIT})>"u")throw new Error(vt(12));if(typeof r(void 0,{type:Kc.PROBE_UNKNOWN_ACTION()})>"u")throw new Error(vt(13))})}function qB(e){const t=Object.keys(e),r={};for(let i=0;i<t.length;i++){const a=t[i];typeof e[a]=="function"&&(r[a]=e[a])}const n=Object.keys(r);let o;try{OB(r)}catch(i){o=i}return function(a={},l){if(o)throw o;let c=!1;const d={};for(let f=0;f<n.length;f++){const p=n[f],h=r[p],y=a[p],m=h(y,l);if(typeof m>"u")throw l&&l.type,new Error(vt(14));d[p]=m,c=c||m!==y}return c=c||n.length!==Object.keys(a).length,c?d:a}}function Yc(...e){return e.length===0?t=>t:e.length===1?e[0]:e.reduce((t,r)=>(...n)=>t(r(...n)))}function MB(...e){return t=>(r,n)=>{const o=t(r,n);let i=()=>{throw new Error(vt(15))};const a={getState:o.getState,dispatch:(c,...d)=>i(c,...d)},l=e.map(c=>c(a));return i=Yc(...l)(o.dispatch),{...o,dispatch:i}}}function LB(e){return pm(e)&&"type"in e&&typeof e.type=="string"}var Ww=Symbol.for("immer-nothing"),E0=Symbol.for("immer-draftable"),Ot=Symbol.for("immer-state");function Rr(e,...t){throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var or=Object,Hi=or.getPrototypeOf,Xc="constructor",Rd="prototype",_p="configurable",Qc="enumerable",dc="writable",Ea="value",kn=e=>!!e&&!!e[Ot];function Lr(e){var t;return e?Hw(e)||Id(e)||!!e[E0]||!!((t=e[Xc])!=null&&t[E0])||Od(e)||qd(e):!1}var DB=or[Rd][Xc].toString(),B0=new WeakMap;function Hw(e){if(!e||!hm(e))return!1;const t=Hi(e);if(t===null||t===or[Rd])return!0;const r=or.hasOwnProperty.call(t,Xc)&&t[Xc];if(r===Object)return!0;if(!ui(r))return!1;let n=B0.get(r);return n===void 0&&(n=Function.toString.call(r),B0.set(r,n)),n===DB}function Ad(e,t,r=!0){Wa(e)===0?(r?Reflect.ownKeys(e):or.keys(e)).forEach(o=>{t(o,e[o],e)}):e.forEach((n,o)=>t(o,n,e))}function Wa(e){const t=e[Ot];return t?t.type_:Id(e)?1:Od(e)?2:qd(e)?3:0}var T0=(e,t,r=Wa(e))=>r===2?e.has(t):or[Rd].hasOwnProperty.call(e,t),zp=(e,t,r=Wa(e))=>r===2?e.get(t):e[t],Jc=(e,t,r,n=Wa(e))=>{n===2?e.set(t,r):n===3?e.add(r):e[t]=r};function WB(e,t){return e===t?e!==0||1/e===1/t:e!==e&&t!==t}var Id=Array.isArray,Od=e=>e instanceof Map,qd=e=>e instanceof Set,hm=e=>typeof e=="object",ui=e=>typeof e=="function",Mu=e=>typeof e=="boolean";function HB(e){const t=+e;return Number.isInteger(t)&&String(t)===e}var fn=e=>e.copy_||e.base_,mm=e=>e.modified_?e.copy_:e.base_;function Ep(e,t){if(Od(e))return new Map(e);if(qd(e))return new Set(e);if(Id(e))return Array[Rd].slice.call(e);const r=Hw(e);if(t===!0||t==="class_only"&&!r){const n=or.getOwnPropertyDescriptors(e);delete n[Ot];let o=Reflect.ownKeys(n);for(let i=0;i<o.length;i++){const a=o[i],l=n[a];l[dc]===!1&&(l[dc]=!0,l[_p]=!0),(l.get||l.set)&&(n[a]={[_p]:!0,[dc]:!0,[Qc]:l[Qc],[Ea]:e[a]})}return or.create(Hi(e),n)}else{const n=Hi(e);if(n!==null&&r)return{...e};const o=or.create(n);return or.assign(o,e)}}function gm(e,t=!1){return Md(e)||kn(e)||!Lr(e)||(Wa(e)>1&&or.defineProperties(e,{set:jl,add:jl,clear:jl,delete:jl}),or.freeze(e),t&&Ad(e,(r,n)=>{gm(n,!0)},!1)),e}function UB(){Rr(2)}var jl={[Ea]:UB};function Md(e){return e===null||!hm(e)?!0:or.isFrozen(e)}var Zc="MapSet",Bp="Patches",P0="ArrayMethods",Uw={};function Wo(e){const t=Uw[e];return t||Rr(0,e),t}var N0=e=>!!Uw[e],Ba,Vw=()=>Ba,VB=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:N0(Zc)?Wo(Zc):void 0,arrayMethodsPlugin_:N0(P0)?Wo(P0):void 0});function F0(e,t){t&&(e.patchPlugin_=Wo(Bp),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function Tp(e){Pp(e),e.drafts_.forEach(GB),e.drafts_=null}function Pp(e){e===Ba&&(Ba=e.parent_)}var R0=e=>Ba=VB(Ba,e);function GB(e){const t=e[Ot];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function A0(e,t){t.unfinalizedDrafts_=t.drafts_.length;const r=t.drafts_[0];if(e!==void 0&&e!==r){r[Ot].modified_&&(Tp(t),Rr(4)),Lr(e)&&(e=I0(t,e));const{patchPlugin_:o}=t;o&&o.generateReplacementPatches_(r[Ot].base_,e,t)}else e=I0(t,r);return KB(t,e,!0),Tp(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==Ww?e:void 0}function I0(e,t){if(Md(t))return t;const r=t[Ot];if(!r)return ed(t,e.handledSet_,e);if(!Ld(r,e))return t;if(!r.modified_)return r.base_;if(!r.finalized_){const{callbacks_:n}=r;if(n)for(;n.length>0;)n.pop()(e);Yw(r,e)}return r.copy_}function KB(e,t,r=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&gm(t,r)}function Gw(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var Ld=(e,t)=>e.scope_===t,YB=[];function Kw(e,t,r,n){const o=fn(e),i=e.type_;if(n!==void 0&&zp(o,n,i)===t){Jc(o,n,r,i);return}if(!e.draftLocations_){const l=e.draftLocations_=new Map;Ad(o,(c,d)=>{if(kn(d)){const f=l.get(d)||[];f.push(c),l.set(d,f)}})}const a=e.draftLocations_.get(t)??YB;for(const l of a)Jc(o,l,r,i)}function XB(e,t,r){e.callbacks_.push(function(o){var l;const i=t;if(!i||!Ld(i,o))return;(l=o.mapSetPlugin_)==null||l.fixSetContents(i);const a=mm(i);Kw(e,i.draft_??i,a,r),Yw(i,o)})}function Yw(e,t){var n;if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(((n=e.assigned_)==null?void 0:n.size)??0)>0)){const{patchPlugin_:o}=t;if(o){const i=o.getPath(e);i&&o.generatePatches_(e,i,t)}Gw(e)}}function QB(e,t,r){const{scope_:n}=e;if(kn(r)){const o=r[Ot];Ld(o,n)&&o.callbacks_.push(function(){uc(e);const a=mm(o);Kw(e,r,a,t)})}else Lr(r)&&e.callbacks_.push(function(){const i=fn(e);e.type_===3?i.has(r)&&ed(r,n.handledSet_,n):zp(i,t,e.type_)===r&&n.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&ed(zp(e.copy_,t,e.type_),n.handledSet_,n)})}function ed(e,t,r){return!r.immer_.autoFreeze_&&r.unfinalizedDrafts_<1||kn(e)||t.has(e)||!Lr(e)||Md(e)||(t.add(e),Ad(e,(n,o)=>{if(kn(o)){const i=o[Ot];if(Ld(i,r)){const a=mm(i);Jc(e,n,a,e.type_),Gw(i)}}else Lr(o)&&ed(o,t,r)})),e}function JB(e,t){const r=Id(e),n={type_:r?1:0,scope_:t?t.scope_:Vw(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0};let o=n,i=td;r&&(o=[n],i=Ta);const{revoke:a,proxy:l}=Proxy.revocable(o,i);return n.draft_=l,n.revoke_=a,[l,n]}var td={get(e,t){if(t===Ot)return e;let r=e.scope_.arrayMethodsPlugin_;const n=e.type_===1&&typeof t=="string";if(n&&r!=null&&r.isArrayOperationMethod(t))return r.createMethodInterceptor(e,t);const o=fn(e);if(!T0(o,t,e.type_))return ZB(e,o,t);const i=o[t];if(e.finalized_||!Lr(i)||n&&e.operationMethod&&(r!=null&&r.isMutatingArrayMethod(e.operationMethod))&&HB(t))return i;if(i===Lu(e.base_,t)){uc(e);const a=e.type_===1?+t:t,l=Fp(e.scope_,i,e,a);return e.copy_[a]=l}return i},has(e,t){return t in fn(e)},ownKeys(e){return Reflect.ownKeys(fn(e))},set(e,t,r){const n=Xw(fn(e),t);if(n!=null&&n.set)return n.set.call(e.draft_,r),!0;if(!e.modified_){const o=Lu(fn(e),t),i=o==null?void 0:o[Ot];if(i&&i.base_===r)return e.copy_[t]=r,e.assigned_.set(t,!1),!0;if(WB(r,o)&&(r!==void 0||T0(e.base_,t,e.type_)))return!0;uc(e),Np(e)}return e.copy_[t]===r&&(r!==void 0||t in e.copy_)||Number.isNaN(r)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=r,e.assigned_.set(t,!0),QB(e,t,r)),!0},deleteProperty(e,t){return uc(e),Lu(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),Np(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){const r=fn(e),n=Reflect.getOwnPropertyDescriptor(r,t);return n&&{[dc]:!0,[_p]:e.type_!==1||t!=="length",[Qc]:n[Qc],[Ea]:r[t]}},defineProperty(){Rr(11)},getPrototypeOf(e){return Hi(e.base_)},setPrototypeOf(){Rr(12)}},Ta={};for(let e in td){let t=td[e];Ta[e]=function(){const r=arguments;return r[0]=r[0][0],t.apply(this,r)}}Ta.deleteProperty=function(e,t){return Ta.set.call(this,e,t,void 0)};Ta.set=function(e,t,r){return td.set.call(this,e[0],t,r,e[0])};function Lu(e,t){const r=e[Ot];return(r?fn(r):e)[t]}function ZB(e,t,r){var o;const n=Xw(t,r);return n?Ea in n?n[Ea]:(o=n.get)==null?void 0:o.call(e.draft_):void 0}function Xw(e,t){if(!(t in e))return;let r=Hi(e);for(;r;){const n=Object.getOwnPropertyDescriptor(r,t);if(n)return n;r=Hi(r)}}function Np(e){e.modified_||(e.modified_=!0,e.parent_&&Np(e.parent_))}function uc(e){e.copy_||(e.assigned_=new Map,e.copy_=Ep(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var e6=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(t,r,n)=>{if(ui(t)&&!ui(r)){const i=r;r=t;const a=this;return function(c=i,...d){return a.produce(c,f=>r.call(this,f,...d))}}ui(r)||Rr(6),n!==void 0&&!ui(n)&&Rr(7);let o;if(Lr(t)){const i=R0(this),a=Fp(i,t,void 0);let l=!0;try{o=r(a),l=!1}finally{l?Tp(i):Pp(i)}return F0(i,n),A0(o,i)}else if(!t||!hm(t)){if(o=r(t),o===void 0&&(o=t),o===Ww&&(o=void 0),this.autoFreeze_&&gm(o,!0),n){const i=[],a=[];Wo(Bp).generateReplacementPatches_(t,o,{patches_:i,inversePatches_:a}),n(i,a)}return o}else Rr(1,t)},this.produceWithPatches=(t,r)=>{if(ui(t))return(a,...l)=>this.produceWithPatches(a,c=>t(c,...l));let n,o;return[this.produce(t,r,(a,l)=>{n=a,o=l}),n,o]},Mu(e==null?void 0:e.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),Mu(e==null?void 0:e.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),Mu(e==null?void 0:e.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){Lr(e)||Rr(8),kn(e)&&(e=t6(e));const t=R0(this),r=Fp(t,e,void 0);return r[Ot].isManual_=!0,Pp(t),r}finishDraft(e,t){const r=e&&e[Ot];(!r||!r.isManual_)&&Rr(9);const{scope_:n}=r;return F0(n,t),A0(void 0,n)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let r;for(r=t.length-1;r>=0;r--){const o=t[r];if(o.path.length===0&&o.op==="replace"){e=o.value;break}}r>-1&&(t=t.slice(r+1));const n=Wo(Bp).applyPatches_;return kn(e)?n(e,t):this.produce(e,o=>n(o,t))}};function Fp(e,t,r,n){const[o,i]=Od(t)?Wo(Zc).proxyMap_(t,r):qd(t)?Wo(Zc).proxySet_(t,r):JB(t,r);return((r==null?void 0:r.scope_)??Vw()).drafts_.push(o),i.callbacks_=(r==null?void 0:r.callbacks_)??[],i.key_=n,r&&n!==void 0?XB(r,i,n):i.callbacks_.push(function(c){var f;(f=c.mapSetPlugin_)==null||f.fixSetContents(i);const{patchPlugin_:d}=c;i.modified_&&d&&d.generatePatches_(i,[],c)}),o}function t6(e){return kn(e)||Rr(10,e),Qw(e)}function Qw(e){if(!Lr(e)||Md(e))return e;const t=e[Ot];let r,n=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,r=Ep(e,t.scope_.immer_.useStrictShallowCopy_),n=t.scope_.immer_.shouldUseStrictIteration()}else r=Ep(e,!0);return Ad(r,(o,i)=>{Jc(r,o,Qw(i))},n),t&&(t.finalized_=!1),r}var r6=new e6,Jw=r6.produce;function Zw(e){return({dispatch:r,getState:n})=>o=>i=>typeof i=="function"?i(r,n,e):o(i)}var n6=Zw(),o6=Zw,i6=typeof window<"u"&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]=="object"?Yc:Yc.apply(null,arguments)},s6=e=>e&&typeof e.match=="function";function na(e,t){function r(...n){if(t){let o=t(...n);if(!o)throw new Error(vn(0));return{type:e,payload:o.payload,..."meta"in o&&{meta:o.meta},..."error"in o&&{error:o.error}}}return{type:e,payload:n[0]}}return r.toString=()=>`${e}`,r.type=e,r.match=n=>LB(n)&&n.type===e,r}var ek=class Hs extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,Hs.prototype)}static get[Symbol.species](){return Hs}concat(...t){return super.concat.apply(this,t)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new Hs(...t[0].concat(this)):new Hs(...t.concat(this))}};function O0(e){return Lr(e)?Jw(e,()=>{}):e}function $l(e,t,r){return e.has(t)?e.get(t):e.set(t,r(t)).get(t)}function a6(e){return typeof e=="boolean"}var l6=()=>function(t){const{thunk:r=!0,immutableCheck:n=!0,serializableCheck:o=!0,actionCreatorCheck:i=!0}=t??{};let a=new ek;return r&&(a6(r)?a.push(n6):a.push(o6(r.extraArgument))),a},c6="RTK_autoBatch",q0=e=>t=>{setTimeout(t,e)},d6=(e={type:"raf"})=>t=>(...r)=>{const n=t(...r);let o=!0,i=!1,a=!1;const l=new Set,c=e.type==="tick"?queueMicrotask:e.type==="raf"?typeof window<"u"&&window.requestAnimationFrame?window.requestAnimationFrame:q0(10):e.type==="callback"?e.queueNotification:q0(e.timeout),d=()=>{a=!1,i&&(i=!1,l.forEach(f=>f()))};return Object.assign({},n,{subscribe(f){const p=()=>o&&f(),h=n.subscribe(p);return l.add(f),()=>{h(),l.delete(f)}},dispatch(f){var p;try{return o=!((p=f==null?void 0:f.meta)!=null&&p[c6]),i=!o,i&&(a||(a=!0,c(d))),n.dispatch(f)}finally{o=!0}}})},u6=e=>function(r){const{autoBatch:n=!0}=r??{};let o=new ek(e);return n&&o.push(d6(typeof n=="object"?n:void 0)),o};function f6(e){const t=l6(),{reducer:r=void 0,middleware:n,devTools:o=!0,preloadedState:i=void 0,enhancers:a=void 0}=e||{};let l;if(typeof r=="function")l=r;else if(pm(r))l=qB(r);else throw new Error(vn(1));let c;typeof n=="function"?c=n(t):c=t();let d=Yc;o&&(d=i6({trace:!1,...typeof o=="object"&&o}));const f=MB(...c),p=u6(f);let h=typeof a=="function"?a(p):p();const y=d(...h);return Dw(l,i,y)}function tk(e){const t={},r=[];let n;const o={addCase(i,a){const l=typeof i=="string"?i:i.type;if(!l)throw new Error(vn(28));if(l in t)throw new Error(vn(29));return t[l]=a,o},addAsyncThunk(i,a){return a.pending&&(t[i.pending.type]=a.pending),a.rejected&&(t[i.rejected.type]=a.rejected),a.fulfilled&&(t[i.fulfilled.type]=a.fulfilled),a.settled&&r.push({matcher:i.settled,reducer:a.settled}),o},addMatcher(i,a){return r.push({matcher:i,reducer:a}),o},addDefaultCase(i){return n=i,o}};return e(o),[t,r,n]}function p6(e){return typeof e=="function"}function h6(e,t){let[r,n,o]=tk(t),i;if(p6(e))i=()=>O0(e());else{const l=O0(e);i=()=>l}function a(l=i(),c){let d=[r[c.type],...n.filter(({matcher:f})=>f(c)).map(({reducer:f})=>f)];return d.filter(f=>!!f).length===0&&(d=[o]),d.reduce((f,p)=>{if(p)if(kn(f)){const y=p(f,c);return y===void 0?f:y}else{if(Lr(f))return Jw(f,h=>p(h,c));{const h=p(f,c);if(h===void 0){if(f===null)return f;throw Error("A case reducer on a non-draftable value must not return undefined")}return h}}return f},l)}return a.getInitialState=i,a}var m6=(e,t)=>s6(e)?e.match(t):e(t);function g6(...e){return t=>e.some(r=>m6(r,t))}var v6="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",b6=(e=21)=>{let t="",r=e;for(;r--;)t+=v6[Math.random()*64|0];return t},x6=["name","message","stack","code"],Du=class{constructor(e,t){$n(this,"_type");this.payload=e,this.meta=t}},M0=class{constructor(e,t){$n(this,"_type");this.payload=e,this.meta=t}},y6=e=>{if(typeof e=="object"&&e!==null){const t={};for(const r of x6)typeof e[r]=="string"&&(t[r]=e[r]);return t}return{message:String(e)}},L0="External signal was aborted",Dr=(()=>{function e(t,r,n){const o=na(t+"/fulfilled",(c,d,f,p)=>({payload:c,meta:{...p||{},arg:f,requestId:d,requestStatus:"fulfilled"}})),i=na(t+"/pending",(c,d,f)=>({payload:void 0,meta:{...f||{},arg:d,requestId:c,requestStatus:"pending"}})),a=na(t+"/rejected",(c,d,f,p,h)=>({payload:p,error:(n&&n.serializeError||y6)(c||"Rejected"),meta:{...h||{},arg:f,requestId:d,rejectedWithValue:!!p,requestStatus:"rejected",aborted:(c==null?void 0:c.name)==="AbortError",condition:(c==null?void 0:c.name)==="ConditionError"}}));function l(c,{signal:d}={}){return(f,p,h)=>{const y=n!=null&&n.idGenerator?n.idGenerator(c):b6(),m=new AbortController;let v,$;function S(k){$=k,m.abort()}d&&(d.aborted?S(L0):d.addEventListener("abort",()=>S(L0),{once:!0}));const j=async function(){var _,B;let k;try{let E=(_=n==null?void 0:n.condition)==null?void 0:_.call(n,c,{getState:p,extra:h});if(k6(E)&&(E=await E),E===!1||m.signal.aborted)throw{name:"ConditionError",message:"Aborted due to condition callback returning false."};const N=new Promise((L,V)=>{v=()=>{V({name:"AbortError",message:$||"Aborted"})},m.signal.addEventListener("abort",v,{once:!0})});f(i(y,c,(B=n==null?void 0:n.getPendingMeta)==null?void 0:B.call(n,{requestId:y,arg:c},{getState:p,extra:h}))),k=await Promise.race([N,Promise.resolve(r(c,{dispatch:f,getState:p,extra:h,requestId:y,signal:m.signal,abort:S,rejectWithValue:(L,V)=>new Du(L,V),fulfillWithValue:(L,V)=>new M0(L,V)})).then(L=>{if(L instanceof Du)throw L;return L instanceof M0?o(L.payload,y,c,L.meta):o(L,y,c)})])}catch(E){k=E instanceof Du?a(null,y,c,E.payload,E.meta):a(E,y,c)}finally{v&&m.signal.removeEventListener("abort",v)}return n&&!n.dispatchConditionRejection&&a.match(k)&&k.meta.condition||f(k),k}();return Object.assign(j,{abort:S,requestId:y,arg:c,unwrap(){return j.then(w6)}})}}return Object.assign(l,{pending:i,rejected:a,fulfilled:o,settled:g6(a,o),typePrefix:t})}return e.withTypes=()=>e,e})();function w6(e){if(e.meta&&e.meta.rejectedWithValue)throw e.payload;if(e.error)throw e.error;return e.payload}function k6(e){return e!==null&&typeof e=="object"&&typeof e.then=="function"}var S6=Symbol.for("rtk-slice-createasyncthunk");function j6(e,t){return`${e}/${t}`}function $6({creators:e}={}){var r;const t=(r=e==null?void 0:e.asyncThunk)==null?void 0:r[S6];return function(o){const{name:i,reducerPath:a=i}=o;if(!i)throw new Error(vn(11));const l=(typeof o.reducers=="function"?o.reducers(_6()):o.reducers)||{},c=Object.keys(l),d={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},f={addCase(w,_){const B=typeof w=="string"?w:w.type;if(!B)throw new Error(vn(12));if(B in d.sliceCaseReducersByType)throw new Error(vn(13));return d.sliceCaseReducersByType[B]=_,f},addMatcher(w,_){return d.sliceMatchers.push({matcher:w,reducer:_}),f},exposeAction(w,_){return d.actionCreators[w]=_,f},exposeCaseReducer(w,_){return d.sliceCaseReducersByName[w]=_,f}};c.forEach(w=>{const _=l[w],B={reducerName:w,type:j6(i,w),createNotation:typeof o.reducers=="function"};E6(_)?T6(B,_,f,t):z6(B,_,f)});function p(){const[w={},_=[],B=void 0]=typeof o.extraReducers=="function"?tk(o.extraReducers):[o.extraReducers],E={...w,...d.sliceCaseReducersByType};return h6(o.initialState,N=>{for(let L in E)N.addCase(L,E[L]);for(let L of d.sliceMatchers)N.addMatcher(L.matcher,L.reducer);for(let L of _)N.addMatcher(L.matcher,L.reducer);B&&N.addDefaultCase(B)})}const h=w=>w,y=new Map,m=new WeakMap;let v;function $(w,_){return v||(v=p()),v(w,_)}function S(){return v||(v=p()),v.getInitialState()}function j(w,_=!1){function B(N){let L=N[w];return typeof L>"u"&&_&&(L=$l(m,B,S)),L}function E(N=h){const L=$l(y,_,()=>new WeakMap);return $l(L,N,()=>{const V={};for(const[R,M]of Object.entries(o.selectors??{}))V[R]=C6(M,N,()=>$l(m,N,S),_);return V})}return{reducerPath:w,getSelectors:E,get selectors(){return E(B)},selectSlice:B}}const k={name:i,reducer:$,actions:d.actionCreators,caseReducers:d.sliceCaseReducersByName,getInitialState:S,...j(a),injectInto(w,{reducerPath:_,...B}={}){const E=_??a;return w.inject({reducerPath:E,reducer:$},B),{...k,...j(E,!0)}}};return k}}function C6(e,t,r,n){function o(i,...a){let l=t(i);return typeof l>"u"&&n&&(l=r()),e(l,...a)}return o.unwrapped=e,o}var Ha=$6();function _6(){function e(t,r){return{_reducerDefinitionType:"asyncThunk",payloadCreator:t,...r}}return e.withTypes=()=>e,{reducer(t){return Object.assign({[t.name](...r){return t(...r)}}[t.name],{_reducerDefinitionType:"reducer"})},preparedReducer(t,r){return{_reducerDefinitionType:"reducerWithPrepare",prepare:t,reducer:r}},asyncThunk:e}}function z6({type:e,reducerName:t,createNotation:r},n,o){let i,a;if("reducer"in n){if(r&&!B6(n))throw new Error(vn(17));i=n.reducer,a=n.prepare}else i=n;o.addCase(e,i).exposeCaseReducer(t,i).exposeAction(t,a?na(e,a):na(e))}function E6(e){return e._reducerDefinitionType==="asyncThunk"}function B6(e){return e._reducerDefinitionType==="reducerWithPrepare"}function T6({type:e,reducerName:t},r,n,o){if(!o)throw new Error(vn(18));const{payloadCreator:i,fulfilled:a,pending:l,rejected:c,settled:d,options:f}=r,p=o(e,i,f);n.exposeAction(t,p),a&&n.addCase(p.fulfilled,a),l&&n.addCase(p.pending,l),c&&n.addCase(p.rejected,c),d&&n.addMatcher(p.settled,d),n.exposeCaseReducer(t,{fulfilled:a||Cl,pending:l||Cl,rejected:c||Cl,settled:d||Cl})}function Cl(){}function vn(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}function rk(e,t){return function(){return e.apply(t,arguments)}}const{toString:P6}=Object.prototype,{getPrototypeOf:vm}=Object,{iterator:Dd,toStringTag:nk}=Symbol,Wd=(e=>t=>{const r=P6.call(t);return e[r]||(e[r]=r.slice(8,-1).toLowerCase())})(Object.create(null)),Wr=e=>(e=e.toLowerCase(),t=>Wd(t)===e),Hd=e=>t=>typeof t===e,{isArray:is}=Array,Ui=Hd("undefined");function Ua(e){return e!==null&&!Ui(e)&&e.constructor!==null&&!Ui(e.constructor)&&Yt(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const ok=Wr("ArrayBuffer");function N6(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&ok(e.buffer),t}const F6=Hd("string"),Yt=Hd("function"),ik=Hd("number"),Va=e=>e!==null&&typeof e=="object",R6=e=>e===!0||e===!1,fc=e=>{if(Wd(e)!=="object")return!1;const t=vm(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(nk in e)&&!(Dd in e)},A6=e=>{if(!Va(e)||Ua(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},I6=Wr("Date"),O6=Wr("File"),q6=Wr("Blob"),M6=Wr("FileList"),L6=e=>Va(e)&&Yt(e.pipe),D6=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||Yt(e.append)&&((t=Wd(e))==="formdata"||t==="object"&&Yt(e.toString)&&e.toString()==="[object FormData]"))},W6=Wr("URLSearchParams"),[H6,U6,V6,G6]=["ReadableStream","Request","Response","Headers"].map(Wr),K6=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Ga(e,t,{allOwnKeys:r=!1}={}){if(e===null||typeof e>"u")return;let n,o;if(typeof e!="object"&&(e=[e]),is(e))for(n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else{if(Ua(e))return;const i=r?Object.getOwnPropertyNames(e):Object.keys(e),a=i.length;let l;for(n=0;n<a;n++)l=i[n],t.call(null,e[l],l,e)}}function sk(e,t){if(Ua(e))return null;t=t.toLowerCase();const r=Object.keys(e);let n=r.length,o;for(;n-- >0;)if(o=r[n],t===o.toLowerCase())return o;return null}const Bo=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,ak=e=>!Ui(e)&&e!==Bo;function Rp(){const{caseless:e,skipUndefined:t}=ak(this)&&this||{},r={},n=(o,i)=>{if(i==="__proto__"||i==="constructor"||i==="prototype")return;const a=e&&sk(r,i)||i;fc(r[a])&&fc(o)?r[a]=Rp(r[a],o):fc(o)?r[a]=Rp({},o):is(o)?r[a]=o.slice():(!t||!Ui(o))&&(r[a]=o)};for(let o=0,i=arguments.length;o<i;o++)arguments[o]&&Ga(arguments[o],n);return r}const Y6=(e,t,r,{allOwnKeys:n}={})=>(Ga(t,(o,i)=>{r&&Yt(o)?Object.defineProperty(e,i,{value:rk(o,r),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,i,{value:o,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:n}),e),X6=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Q6=(e,t,r,n)=>{e.prototype=Object.create(t.prototype,n),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),r&&Object.assign(e.prototype,r)},J6=(e,t,r,n)=>{let o,i,a;const l={};if(t=t||{},e==null)return t;do{for(o=Object.getOwnPropertyNames(e),i=o.length;i-- >0;)a=o[i],(!n||n(a,e,t))&&!l[a]&&(t[a]=e[a],l[a]=!0);e=r!==!1&&vm(e)}while(e&&(!r||r(e,t))&&e!==Object.prototype);return t},Z6=(e,t,r)=>{e=String(e),(r===void 0||r>e.length)&&(r=e.length),r-=t.length;const n=e.indexOf(t,r);return n!==-1&&n===r},eT=e=>{if(!e)return null;if(is(e))return e;let t=e.length;if(!ik(t))return null;const r=new Array(t);for(;t-- >0;)r[t]=e[t];return r},tT=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&vm(Uint8Array)),rT=(e,t)=>{const n=(e&&e[Dd]).call(e);let o;for(;(o=n.next())&&!o.done;){const i=o.value;t.call(e,i[0],i[1])}},nT=(e,t)=>{let r;const n=[];for(;(r=e.exec(t))!==null;)n.push(r);return n},oT=Wr("HTMLFormElement"),iT=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(r,n,o){return n.toUpperCase()+o}),D0=(({hasOwnProperty:e})=>(t,r)=>e.call(t,r))(Object.prototype),sT=Wr("RegExp"),lk=(e,t)=>{const r=Object.getOwnPropertyDescriptors(e),n={};Ga(r,(o,i)=>{let a;(a=t(o,i,e))!==!1&&(n[i]=a||o)}),Object.defineProperties(e,n)},aT=e=>{lk(e,(t,r)=>{if(Yt(e)&&["arguments","caller","callee"].indexOf(r)!==-1)return!1;const n=e[r];if(Yt(n)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+r+"'")})}})},lT=(e,t)=>{const r={},n=o=>{o.forEach(i=>{r[i]=!0})};return is(e)?n(e):n(String(e).split(t)),r},cT=()=>{},dT=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function uT(e){return!!(e&&Yt(e.append)&&e[nk]==="FormData"&&e[Dd])}const fT=e=>{const t=new Array(10),r=(n,o)=>{if(Va(n)){if(t.indexOf(n)>=0)return;if(Ua(n))return n;if(!("toJSON"in n)){t[o]=n;const i=is(n)?[]:{};return Ga(n,(a,l)=>{const c=r(a,o+1);!Ui(c)&&(i[l]=c)}),t[o]=void 0,i}}return n};return r(e,0)},pT=Wr("AsyncFunction"),hT=e=>e&&(Va(e)||Yt(e))&&Yt(e.then)&&Yt(e.catch),ck=((e,t)=>e?setImmediate:t?((r,n)=>(Bo.addEventListener("message",({source:o,data:i})=>{o===Bo&&i===r&&n.length&&n.shift()()},!1),o=>{n.push(o),Bo.postMessage(r,"*")}))(`axios@${Math.random()}`,[]):r=>setTimeout(r))(typeof setImmediate=="function",Yt(Bo.postMessage)),mT=typeof queueMicrotask<"u"?queueMicrotask.bind(Bo):typeof process<"u"&&process.nextTick||ck,gT=e=>e!=null&&Yt(e[Dd]),q={isArray:is,isArrayBuffer:ok,isBuffer:Ua,isFormData:D6,isArrayBufferView:N6,isString:F6,isNumber:ik,isBoolean:R6,isObject:Va,isPlainObject:fc,isEmptyObject:A6,isReadableStream:H6,isRequest:U6,isResponse:V6,isHeaders:G6,isUndefined:Ui,isDate:I6,isFile:O6,isBlob:q6,isRegExp:sT,isFunction:Yt,isStream:L6,isURLSearchParams:W6,isTypedArray:tT,isFileList:M6,forEach:Ga,merge:Rp,extend:Y6,trim:K6,stripBOM:X6,inherits:Q6,toFlatObject:J6,kindOf:Wd,kindOfTest:Wr,endsWith:Z6,toArray:eT,forEachEntry:rT,matchAll:nT,isHTMLForm:oT,hasOwnProperty:D0,hasOwnProp:D0,reduceDescriptors:lk,freezeMethods:aT,toObjectSet:lT,toCamelCase:iT,noop:cT,toFiniteNumber:dT,findKey:sk,global:Bo,isContextDefined:ak,isSpecCompliantForm:uT,toJSONObject:fT,isAsyncFn:pT,isThenable:hT,setImmediate:ck,asap:mT,isIterable:gT};let ce=class dk extends Error{static from(t,r,n,o,i,a){const l=new dk(t.message,r||t.code,n,o,i);return l.cause=t,l.name=t.name,a&&Object.assign(l,a),l}constructor(t,r,n,o,i){super(t),this.name="AxiosError",this.isAxiosError=!0,r&&(this.code=r),n&&(this.config=n),o&&(this.request=o),i&&(this.response=i,this.status=i.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:q.toJSONObject(this.config),code:this.code,status:this.status}}};ce.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";ce.ERR_BAD_OPTION="ERR_BAD_OPTION";ce.ECONNABORTED="ECONNABORTED";ce.ETIMEDOUT="ETIMEDOUT";ce.ERR_NETWORK="ERR_NETWORK";ce.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";ce.ERR_DEPRECATED="ERR_DEPRECATED";ce.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";ce.ERR_BAD_REQUEST="ERR_BAD_REQUEST";ce.ERR_CANCELED="ERR_CANCELED";ce.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";ce.ERR_INVALID_URL="ERR_INVALID_URL";const vT=null;function Ap(e){return q.isPlainObject(e)||q.isArray(e)}function uk(e){return q.endsWith(e,"[]")?e.slice(0,-2):e}function W0(e,t,r){return e?e.concat(t).map(function(o,i){return o=uk(o),!r&&i?"["+o+"]":o}).join(r?".":""):t}function bT(e){return q.isArray(e)&&!e.some(Ap)}const xT=q.toFlatObject(q,{},null,function(t){return/^is[A-Z]/.test(t)});function Ud(e,t,r){if(!q.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,r=q.toFlatObject(r,{metaTokens:!0,dots:!1,indexes:!1},!1,function(v,$){return!q.isUndefined($[v])});const n=r.metaTokens,o=r.visitor||f,i=r.dots,a=r.indexes,c=(r.Blob||typeof Blob<"u"&&Blob)&&q.isSpecCompliantForm(t);if(!q.isFunction(o))throw new TypeError("visitor must be a function");function d(m){if(m===null)return"";if(q.isDate(m))return m.toISOString();if(q.isBoolean(m))return m.toString();if(!c&&q.isBlob(m))throw new ce("Blob is not supported. Use a Buffer instead.");return q.isArrayBuffer(m)||q.isTypedArray(m)?c&&typeof Blob=="function"?new Blob([m]):Buffer.from(m):m}function f(m,v,$){let S=m;if(m&&!$&&typeof m=="object"){if(q.endsWith(v,"{}"))v=n?v:v.slice(0,-2),m=JSON.stringify(m);else if(q.isArray(m)&&bT(m)||(q.isFileList(m)||q.endsWith(v,"[]"))&&(S=q.toArray(m)))return v=uk(v),S.forEach(function(k,w){!(q.isUndefined(k)||k===null)&&t.append(a===!0?W0([v],w,i):a===null?v:v+"[]",d(k))}),!1}return Ap(m)?!0:(t.append(W0($,v,i),d(m)),!1)}const p=[],h=Object.assign(xT,{defaultVisitor:f,convertValue:d,isVisitable:Ap});function y(m,v){if(!q.isUndefined(m)){if(p.indexOf(m)!==-1)throw Error("Circular reference detected in "+v.join("."));p.push(m),q.forEach(m,function(S,j){(!(q.isUndefined(S)||S===null)&&o.call(t,S,q.isString(j)?j.trim():j,v,h))===!0&&y(S,v?v.concat(j):[j])}),p.pop()}}if(!q.isObject(e))throw new TypeError("data must be an object");return y(e),t}function H0(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(n){return t[n]})}function bm(e,t){this._pairs=[],e&&Ud(e,this,t)}const fk=bm.prototype;fk.append=function(t,r){this._pairs.push([t,r])};fk.toString=function(t){const r=t?function(n){return t.call(this,n,H0)}:H0;return this._pairs.map(function(o){return r(o[0])+"="+r(o[1])},"").join("&")};function yT(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function pk(e,t,r){if(!t)return e;const n=r&&r.encode||yT,o=q.isFunction(r)?{serialize:r}:r,i=o&&o.serialize;let a;if(i?a=i(t,o):a=q.isURLSearchParams(t)?t.toString():new bm(t,o).toString(n),a){const l=e.indexOf("#");l!==-1&&(e=e.slice(0,l)),e+=(e.indexOf("?")===-1?"?":"&")+a}return e}class U0{constructor(){this.handlers=[]}use(t,r,n){return this.handlers.push({fulfilled:t,rejected:r,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){q.forEach(this.handlers,function(n){n!==null&&t(n)})}}const xm={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},wT=typeof URLSearchParams<"u"?URLSearchParams:bm,kT=typeof FormData<"u"?FormData:null,ST=typeof Blob<"u"?Blob:null,jT={isBrowser:!0,classes:{URLSearchParams:wT,FormData:kT,Blob:ST},protocols:["http","https","file","blob","url","data"]},ym=typeof window<"u"&&typeof document<"u",Ip=typeof navigator=="object"&&navigator||void 0,$T=ym&&(!Ip||["ReactNative","NativeScript","NS"].indexOf(Ip.product)<0),CT=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",_T=ym&&window.location.href||"http://localhost",zT=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:ym,hasStandardBrowserEnv:$T,hasStandardBrowserWebWorkerEnv:CT,navigator:Ip,origin:_T},Symbol.toStringTag,{value:"Module"})),Bt={...zT,...jT};function ET(e,t){return Ud(e,new Bt.classes.URLSearchParams,{visitor:function(r,n,o,i){return Bt.isNode&&q.isBuffer(r)?(this.append(n,r.toString("base64")),!1):i.defaultVisitor.apply(this,arguments)},...t})}function BT(e){return q.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function TT(e){const t={},r=Object.keys(e);let n;const o=r.length;let i;for(n=0;n<o;n++)i=r[n],t[i]=e[i];return t}function hk(e){function t(r,n,o,i){let a=r[i++];if(a==="__proto__")return!0;const l=Number.isFinite(+a),c=i>=r.length;return a=!a&&q.isArray(o)?o.length:a,c?(q.hasOwnProp(o,a)?o[a]=[o[a],n]:o[a]=n,!l):((!o[a]||!q.isObject(o[a]))&&(o[a]=[]),t(r,n,o[a],i)&&q.isArray(o[a])&&(o[a]=TT(o[a])),!l)}if(q.isFormData(e)&&q.isFunction(e.entries)){const r={};return q.forEachEntry(e,(n,o)=>{t(BT(n),o,r,0)}),r}return null}function PT(e,t,r){if(q.isString(e))try{return(t||JSON.parse)(e),q.trim(e)}catch(n){if(n.name!=="SyntaxError")throw n}return(r||JSON.stringify)(e)}const Ka={transitional:xm,adapter:["xhr","http","fetch"],transformRequest:[function(t,r){const n=r.getContentType()||"",o=n.indexOf("application/json")>-1,i=q.isObject(t);if(i&&q.isHTMLForm(t)&&(t=new FormData(t)),q.isFormData(t))return o?JSON.stringify(hk(t)):t;if(q.isArrayBuffer(t)||q.isBuffer(t)||q.isStream(t)||q.isFile(t)||q.isBlob(t)||q.isReadableStream(t))return t;if(q.isArrayBufferView(t))return t.buffer;if(q.isURLSearchParams(t))return r.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let l;if(i){if(n.indexOf("application/x-www-form-urlencoded")>-1)return ET(t,this.formSerializer).toString();if((l=q.isFileList(t))||n.indexOf("multipart/form-data")>-1){const c=this.env&&this.env.FormData;return Ud(l?{"files[]":t}:t,c&&new c,this.formSerializer)}}return i||o?(r.setContentType("application/json",!1),PT(t)):t}],transformResponse:[function(t){const r=this.transitional||Ka.transitional,n=r&&r.forcedJSONParsing,o=this.responseType==="json";if(q.isResponse(t)||q.isReadableStream(t))return t;if(t&&q.isString(t)&&(n&&!this.responseType||o)){const a=!(r&&r.silentJSONParsing)&&o;try{return JSON.parse(t,this.parseReviver)}catch(l){if(a)throw l.name==="SyntaxError"?ce.from(l,ce.ERR_BAD_RESPONSE,this,null,this.response):l}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Bt.classes.FormData,Blob:Bt.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};q.forEach(["delete","get","head","post","put","patch"],e=>{Ka.headers[e]={}});const NT=q.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),FT=e=>{const t={};let r,n,o;return e&&e.split(`
`).forEach(function(a){o=a.indexOf(":"),r=a.substring(0,o).trim().toLowerCase(),n=a.substring(o+1).trim(),!(!r||t[r]&&NT[r])&&(r==="set-cookie"?t[r]?t[r].push(n):t[r]=[n]:t[r]=t[r]?t[r]+", "+n:n)}),t},V0=Symbol("internals");function ys(e){return e&&String(e).trim().toLowerCase()}function pc(e){return e===!1||e==null?e:q.isArray(e)?e.map(pc):String(e)}function RT(e){const t=Object.create(null),r=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let n;for(;n=r.exec(e);)t[n[1]]=n[2];return t}const AT=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Wu(e,t,r,n,o){if(q.isFunction(n))return n.call(this,t,r);if(o&&(t=r),!!q.isString(t)){if(q.isString(n))return t.indexOf(n)!==-1;if(q.isRegExp(n))return n.test(t)}}function IT(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,r,n)=>r.toUpperCase()+n)}function OT(e,t){const r=q.toCamelCase(" "+t);["get","set","has"].forEach(n=>{Object.defineProperty(e,n+r,{value:function(o,i,a){return this[n].call(this,t,o,i,a)},configurable:!0})})}let Xt=class{constructor(t){t&&this.set(t)}set(t,r,n){const o=this;function i(l,c,d){const f=ys(c);if(!f)throw new Error("header name must be a non-empty string");const p=q.findKey(o,f);(!p||o[p]===void 0||d===!0||d===void 0&&o[p]!==!1)&&(o[p||c]=pc(l))}const a=(l,c)=>q.forEach(l,(d,f)=>i(d,f,c));if(q.isPlainObject(t)||t instanceof this.constructor)a(t,r);else if(q.isString(t)&&(t=t.trim())&&!AT(t))a(FT(t),r);else if(q.isObject(t)&&q.isIterable(t)){let l={},c,d;for(const f of t){if(!q.isArray(f))throw TypeError("Object iterator must return a key-value pair");l[d=f[0]]=(c=l[d])?q.isArray(c)?[...c,f[1]]:[c,f[1]]:f[1]}a(l,r)}else t!=null&&i(r,t,n);return this}get(t,r){if(t=ys(t),t){const n=q.findKey(this,t);if(n){const o=this[n];if(!r)return o;if(r===!0)return RT(o);if(q.isFunction(r))return r.call(this,o,n);if(q.isRegExp(r))return r.exec(o);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,r){if(t=ys(t),t){const n=q.findKey(this,t);return!!(n&&this[n]!==void 0&&(!r||Wu(this,this[n],n,r)))}return!1}delete(t,r){const n=this;let o=!1;function i(a){if(a=ys(a),a){const l=q.findKey(n,a);l&&(!r||Wu(n,n[l],l,r))&&(delete n[l],o=!0)}}return q.isArray(t)?t.forEach(i):i(t),o}clear(t){const r=Object.keys(this);let n=r.length,o=!1;for(;n--;){const i=r[n];(!t||Wu(this,this[i],i,t,!0))&&(delete this[i],o=!0)}return o}normalize(t){const r=this,n={};return q.forEach(this,(o,i)=>{const a=q.findKey(n,i);if(a){r[a]=pc(o),delete r[i];return}const l=t?IT(i):String(i).trim();l!==i&&delete r[i],r[l]=pc(o),n[l]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const r=Object.create(null);return q.forEach(this,(n,o)=>{n!=null&&n!==!1&&(r[o]=t&&q.isArray(n)?n.join(", "):n)}),r}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,r])=>t+": "+r).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...r){const n=new this(t);return r.forEach(o=>n.set(o)),n}static accessor(t){const n=(this[V0]=this[V0]={accessors:{}}).accessors,o=this.prototype;function i(a){const l=ys(a);n[l]||(OT(o,a),n[l]=!0)}return q.isArray(t)?t.forEach(i):i(t),this}};Xt.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);q.reduceDescriptors(Xt.prototype,({value:e},t)=>{let r=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(n){this[r]=n}}});q.freezeMethods(Xt);function Hu(e,t){const r=this||Ka,n=t||r,o=Xt.from(n.headers);let i=n.data;return q.forEach(e,function(l){i=l.call(r,i,o.normalize(),t?t.status:void 0)}),o.normalize(),i}function mk(e){return!!(e&&e.__CANCEL__)}let Ya=class extends ce{constructor(t,r,n){super(t??"canceled",ce.ERR_CANCELED,r,n),this.name="CanceledError",this.__CANCEL__=!0}};function gk(e,t,r){const n=r.config.validateStatus;!r.status||!n||n(r.status)?e(r):t(new ce("Request failed with status code "+r.status,[ce.ERR_BAD_REQUEST,ce.ERR_BAD_RESPONSE][Math.floor(r.status/100)-4],r.config,r.request,r))}function qT(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function MT(e,t){e=e||10;const r=new Array(e),n=new Array(e);let o=0,i=0,a;return t=t!==void 0?t:1e3,function(c){const d=Date.now(),f=n[i];a||(a=d),r[o]=c,n[o]=d;let p=i,h=0;for(;p!==o;)h+=r[p++],p=p%e;if(o=(o+1)%e,o===i&&(i=(i+1)%e),d-a<t)return;const y=f&&d-f;return y?Math.round(h*1e3/y):void 0}}function LT(e,t){let r=0,n=1e3/t,o,i;const a=(d,f=Date.now())=>{r=f,o=null,i&&(clearTimeout(i),i=null),e(...d)};return[(...d)=>{const f=Date.now(),p=f-r;p>=n?a(d,f):(o=d,i||(i=setTimeout(()=>{i=null,a(o)},n-p)))},()=>o&&a(o)]}const rd=(e,t,r=3)=>{let n=0;const o=MT(50,250);return LT(i=>{const a=i.loaded,l=i.lengthComputable?i.total:void 0,c=a-n,d=o(c),f=a<=l;n=a;const p={loaded:a,total:l,progress:l?a/l:void 0,bytes:c,rate:d||void 0,estimated:d&&l&&f?(l-a)/d:void 0,event:i,lengthComputable:l!=null,[t?"download":"upload"]:!0};e(p)},r)},G0=(e,t)=>{const r=e!=null;return[n=>t[0]({lengthComputable:r,total:e,loaded:n}),t[1]]},K0=e=>(...t)=>q.asap(()=>e(...t)),DT=Bt.hasStandardBrowserEnv?((e,t)=>r=>(r=new URL(r,Bt.origin),e.protocol===r.protocol&&e.host===r.host&&(t||e.port===r.port)))(new URL(Bt.origin),Bt.navigator&&/(msie|trident)/i.test(Bt.navigator.userAgent)):()=>!0,WT=Bt.hasStandardBrowserEnv?{write(e,t,r,n,o,i,a){if(typeof document>"u")return;const l=[`${e}=${encodeURIComponent(t)}`];q.isNumber(r)&&l.push(`expires=${new Date(r).toUTCString()}`),q.isString(n)&&l.push(`path=${n}`),q.isString(o)&&l.push(`domain=${o}`),i===!0&&l.push("secure"),q.isString(a)&&l.push(`SameSite=${a}`),document.cookie=l.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function HT(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function UT(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function vk(e,t,r){let n=!HT(t);return e&&(n||r==!1)?UT(e,t):t}const Y0=e=>e instanceof Xt?{...e}:e;function Ho(e,t){t=t||{};const r={};function n(d,f,p,h){return q.isPlainObject(d)&&q.isPlainObject(f)?q.merge.call({caseless:h},d,f):q.isPlainObject(f)?q.merge({},f):q.isArray(f)?f.slice():f}function o(d,f,p,h){if(q.isUndefined(f)){if(!q.isUndefined(d))return n(void 0,d,p,h)}else return n(d,f,p,h)}function i(d,f){if(!q.isUndefined(f))return n(void 0,f)}function a(d,f){if(q.isUndefined(f)){if(!q.isUndefined(d))return n(void 0,d)}else return n(void 0,f)}function l(d,f,p){if(p in t)return n(d,f);if(p in e)return n(void 0,d)}const c={url:i,method:i,data:i,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,withXSRFToken:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,beforeRedirect:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,responseEncoding:a,validateStatus:l,headers:(d,f,p)=>o(Y0(d),Y0(f),p,!0)};return q.forEach(Object.keys({...e,...t}),function(f){if(f==="__proto__"||f==="constructor"||f==="prototype")return;const p=q.hasOwnProp(c,f)?c[f]:o,h=p(e[f],t[f],f);q.isUndefined(h)&&p!==l||(r[f]=h)}),r}const bk=e=>{const t=Ho({},e);let{data:r,withXSRFToken:n,xsrfHeaderName:o,xsrfCookieName:i,headers:a,auth:l}=t;if(t.headers=a=Xt.from(a),t.url=pk(vk(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),l&&a.set("Authorization","Basic "+btoa((l.username||"")+":"+(l.password?unescape(encodeURIComponent(l.password)):""))),q.isFormData(r)){if(Bt.hasStandardBrowserEnv||Bt.hasStandardBrowserWebWorkerEnv)a.setContentType(void 0);else if(q.isFunction(r.getHeaders)){const c=r.getHeaders(),d=["content-type","content-length"];Object.entries(c).forEach(([f,p])=>{d.includes(f.toLowerCase())&&a.set(f,p)})}}if(Bt.hasStandardBrowserEnv&&(n&&q.isFunction(n)&&(n=n(t)),n||n!==!1&&DT(t.url))){const c=o&&i&&WT.read(i);c&&a.set(o,c)}return t},VT=typeof XMLHttpRequest<"u",GT=VT&&function(e){return new Promise(function(r,n){const o=bk(e);let i=o.data;const a=Xt.from(o.headers).normalize();let{responseType:l,onUploadProgress:c,onDownloadProgress:d}=o,f,p,h,y,m;function v(){y&&y(),m&&m(),o.cancelToken&&o.cancelToken.unsubscribe(f),o.signal&&o.signal.removeEventListener("abort",f)}let $=new XMLHttpRequest;$.open(o.method.toUpperCase(),o.url,!0),$.timeout=o.timeout;function S(){if(!$)return;const k=Xt.from("getAllResponseHeaders"in $&&$.getAllResponseHeaders()),_={data:!l||l==="text"||l==="json"?$.responseText:$.response,status:$.status,statusText:$.statusText,headers:k,config:e,request:$};gk(function(E){r(E),v()},function(E){n(E),v()},_),$=null}"onloadend"in $?$.onloadend=S:$.onreadystatechange=function(){!$||$.readyState!==4||$.status===0&&!($.responseURL&&$.responseURL.indexOf("file:")===0)||setTimeout(S)},$.onabort=function(){$&&(n(new ce("Request aborted",ce.ECONNABORTED,e,$)),$=null)},$.onerror=function(w){const _=w&&w.message?w.message:"Network Error",B=new ce(_,ce.ERR_NETWORK,e,$);B.event=w||null,n(B),$=null},$.ontimeout=function(){let w=o.timeout?"timeout of "+o.timeout+"ms exceeded":"timeout exceeded";const _=o.transitional||xm;o.timeoutErrorMessage&&(w=o.timeoutErrorMessage),n(new ce(w,_.clarifyTimeoutError?ce.ETIMEDOUT:ce.ECONNABORTED,e,$)),$=null},i===void 0&&a.setContentType(null),"setRequestHeader"in $&&q.forEach(a.toJSON(),function(w,_){$.setRequestHeader(_,w)}),q.isUndefined(o.withCredentials)||($.withCredentials=!!o.withCredentials),l&&l!=="json"&&($.responseType=o.responseType),d&&([h,m]=rd(d,!0),$.addEventListener("progress",h)),c&&$.upload&&([p,y]=rd(c),$.upload.addEventListener("progress",p),$.upload.addEventListener("loadend",y)),(o.cancelToken||o.signal)&&(f=k=>{$&&(n(!k||k.type?new Ya(null,e,$):k),$.abort(),$=null)},o.cancelToken&&o.cancelToken.subscribe(f),o.signal&&(o.signal.aborted?f():o.signal.addEventListener("abort",f)));const j=qT(o.url);if(j&&Bt.protocols.indexOf(j)===-1){n(new ce("Unsupported protocol "+j+":",ce.ERR_BAD_REQUEST,e));return}$.send(i||null)})},KT=(e,t)=>{const{length:r}=e=e?e.filter(Boolean):[];if(t||r){let n=new AbortController,o;const i=function(d){if(!o){o=!0,l();const f=d instanceof Error?d:this.reason;n.abort(f instanceof ce?f:new Ya(f instanceof Error?f.message:f))}};let a=t&&setTimeout(()=>{a=null,i(new ce(`timeout of ${t}ms exceeded`,ce.ETIMEDOUT))},t);const l=()=>{e&&(a&&clearTimeout(a),a=null,e.forEach(d=>{d.unsubscribe?d.unsubscribe(i):d.removeEventListener("abort",i)}),e=null)};e.forEach(d=>d.addEventListener("abort",i));const{signal:c}=n;return c.unsubscribe=()=>q.asap(l),c}},YT=function*(e,t){let r=e.byteLength;if(r<t){yield e;return}let n=0,o;for(;n<r;)o=n+t,yield e.slice(n,o),n=o},XT=async function*(e,t){for await(const r of QT(e))yield*YT(r,t)},QT=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:r,value:n}=await t.read();if(r)break;yield n}}finally{await t.cancel()}},X0=(e,t,r,n)=>{const o=XT(e,t);let i=0,a,l=c=>{a||(a=!0,n&&n(c))};return new ReadableStream({async pull(c){try{const{done:d,value:f}=await o.next();if(d){l(),c.close();return}let p=f.byteLength;if(r){let h=i+=p;r(h)}c.enqueue(new Uint8Array(f))}catch(d){throw l(d),d}},cancel(c){return l(c),o.return()}},{highWaterMark:2})},Q0=64*1024,{isFunction:_l}=q,JT=(({Request:e,Response:t})=>({Request:e,Response:t}))(q.global),{ReadableStream:J0,TextEncoder:Z0}=q.global,ev=(e,...t)=>{try{return!!e(...t)}catch{return!1}},ZT=e=>{e=q.merge.call({skipUndefined:!0},JT,e);const{fetch:t,Request:r,Response:n}=e,o=t?_l(t):typeof fetch=="function",i=_l(r),a=_l(n);if(!o)return!1;const l=o&&_l(J0),c=o&&(typeof Z0=="function"?(m=>v=>m.encode(v))(new Z0):async m=>new Uint8Array(await new r(m).arrayBuffer())),d=i&&l&&ev(()=>{let m=!1;const v=new r(Bt.origin,{body:new J0,method:"POST",get duplex(){return m=!0,"half"}}).headers.has("Content-Type");return m&&!v}),f=a&&l&&ev(()=>q.isReadableStream(new n("").body)),p={stream:f&&(m=>m.body)};o&&["text","arrayBuffer","blob","formData","stream"].forEach(m=>{!p[m]&&(p[m]=(v,$)=>{let S=v&&v[m];if(S)return S.call(v);throw new ce(`Response type '${m}' is not supported`,ce.ERR_NOT_SUPPORT,$)})});const h=async m=>{if(m==null)return 0;if(q.isBlob(m))return m.size;if(q.isSpecCompliantForm(m))return(await new r(Bt.origin,{method:"POST",body:m}).arrayBuffer()).byteLength;if(q.isArrayBufferView(m)||q.isArrayBuffer(m))return m.byteLength;if(q.isURLSearchParams(m)&&(m=m+""),q.isString(m))return(await c(m)).byteLength},y=async(m,v)=>{const $=q.toFiniteNumber(m.getContentLength());return $??h(v)};return async m=>{let{url:v,method:$,data:S,signal:j,cancelToken:k,timeout:w,onDownloadProgress:_,onUploadProgress:B,responseType:E,headers:N,withCredentials:L="same-origin",fetchOptions:V}=bk(m),R=t||fetch;E=E?(E+"").toLowerCase():"text";let M=KT([j,k&&k.toAbortSignal()],w),W=null;const Z=M&&M.unsubscribe&&(()=>{M.unsubscribe()});let I;try{if(B&&d&&$!=="get"&&$!=="head"&&(I=await y(N,S))!==0){let ae=new r(v,{method:"POST",body:S,duplex:"half"}),ee;if(q.isFormData(S)&&(ee=ae.headers.get("content-type"))&&N.setContentType(ee),ae.body){const[fe,me]=G0(I,rd(K0(B)));S=X0(ae.body,Q0,fe,me)}}q.isString(L)||(L=L?"include":"omit");const T=i&&"credentials"in r.prototype,z={...V,signal:M,method:$.toUpperCase(),headers:N.normalize().toJSON(),body:S,duplex:"half",credentials:T?L:void 0};W=i&&new r(v,z);let P=await(i?R(W,V):R(v,z));const A=f&&(E==="stream"||E==="response");if(f&&(_||A&&Z)){const ae={};["status","statusText","headers"].forEach(Se=>{ae[Se]=P[Se]});const ee=q.toFiniteNumber(P.headers.get("content-length")),[fe,me]=_&&G0(ee,rd(K0(_),!0))||[];P=new n(X0(P.body,Q0,fe,()=>{me&&me(),Z&&Z()}),ae)}E=E||"text";let D=await p[q.findKey(p,E)||"text"](P,m);return!A&&Z&&Z(),await new Promise((ae,ee)=>{gk(ae,ee,{data:D,headers:Xt.from(P.headers),status:P.status,statusText:P.statusText,config:m,request:W})})}catch(T){throw Z&&Z(),T&&T.name==="TypeError"&&/Load failed|fetch/i.test(T.message)?Object.assign(new ce("Network Error",ce.ERR_NETWORK,m,W,T&&T.response),{cause:T.cause||T}):ce.from(T,T&&T.code,m,W,T&&T.response)}}},eP=new Map,xk=e=>{let t=e&&e.env||{};const{fetch:r,Request:n,Response:o}=t,i=[n,o,r];let a=i.length,l=a,c,d,f=eP;for(;l--;)c=i[l],d=f.get(c),d===void 0&&f.set(c,d=l?new Map:ZT(t)),f=d;return d};xk();const wm={http:vT,xhr:GT,fetch:{get:xk}};q.forEach(wm,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const tv=e=>`- ${e}`,tP=e=>q.isFunction(e)||e===null||e===!1;function rP(e,t){e=q.isArray(e)?e:[e];const{length:r}=e;let n,o;const i={};for(let a=0;a<r;a++){n=e[a];let l;if(o=n,!tP(n)&&(o=wm[(l=String(n)).toLowerCase()],o===void 0))throw new ce(`Unknown adapter '${l}'`);if(o&&(q.isFunction(o)||(o=o.get(t))))break;i[l||"#"+a]=o}if(!o){const a=Object.entries(i).map(([c,d])=>`adapter ${c} `+(d===!1?"is not supported by the environment":"is not available in the build"));let l=r?a.length>1?`since :
`+a.map(tv).join(`
`):" "+tv(a[0]):"as no adapter specified";throw new ce("There is no suitable adapter to dispatch the request "+l,"ERR_NOT_SUPPORT")}return o}const yk={getAdapter:rP,adapters:wm};function Uu(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Ya(null,e)}function rv(e){return Uu(e),e.headers=Xt.from(e.headers),e.data=Hu.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),yk.getAdapter(e.adapter||Ka.adapter,e)(e).then(function(n){return Uu(e),n.data=Hu.call(e,e.transformResponse,n),n.headers=Xt.from(n.headers),n},function(n){return mk(n)||(Uu(e),n&&n.response&&(n.response.data=Hu.call(e,e.transformResponse,n.response),n.response.headers=Xt.from(n.response.headers))),Promise.reject(n)})}const wk="1.13.5",Vd={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{Vd[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}});const nv={};Vd.transitional=function(t,r,n){function o(i,a){return"[Axios v"+wk+"] Transitional option '"+i+"'"+a+(n?". "+n:"")}return(i,a,l)=>{if(t===!1)throw new ce(o(a," has been removed"+(r?" in "+r:"")),ce.ERR_DEPRECATED);return r&&!nv[a]&&(nv[a]=!0,console.warn(o(a," has been deprecated since v"+r+" and will be removed in the near future"))),t?t(i,a,l):!0}};Vd.spelling=function(t){return(r,n)=>(console.warn(`${n} is likely a misspelling of ${t}`),!0)};function nP(e,t,r){if(typeof e!="object")throw new ce("options must be an object",ce.ERR_BAD_OPTION_VALUE);const n=Object.keys(e);let o=n.length;for(;o-- >0;){const i=n[o],a=t[i];if(a){const l=e[i],c=l===void 0||a(l,i,e);if(c!==!0)throw new ce("option "+i+" must be "+c,ce.ERR_BAD_OPTION_VALUE);continue}if(r!==!0)throw new ce("Unknown option "+i,ce.ERR_BAD_OPTION)}}const hc={assertOptions:nP,validators:Vd},fr=hc.validators;let Ao=class{constructor(t){this.defaults=t||{},this.interceptors={request:new U0,response:new U0}}async request(t,r){try{return await this._request(t,r)}catch(n){if(n instanceof Error){let o={};Error.captureStackTrace?Error.captureStackTrace(o):o=new Error;const i=o.stack?o.stack.replace(/^.+\n/,""):"";try{n.stack?i&&!String(n.stack).endsWith(i.replace(/^.+\n.+\n/,""))&&(n.stack+=`
`+i):n.stack=i}catch{}}throw n}}_request(t,r){typeof t=="string"?(r=r||{},r.url=t):r=t||{},r=Ho(this.defaults,r);const{transitional:n,paramsSerializer:o,headers:i}=r;n!==void 0&&hc.assertOptions(n,{silentJSONParsing:fr.transitional(fr.boolean),forcedJSONParsing:fr.transitional(fr.boolean),clarifyTimeoutError:fr.transitional(fr.boolean),legacyInterceptorReqResOrdering:fr.transitional(fr.boolean)},!1),o!=null&&(q.isFunction(o)?r.paramsSerializer={serialize:o}:hc.assertOptions(o,{encode:fr.function,serialize:fr.function},!0)),r.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?r.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:r.allowAbsoluteUrls=!0),hc.assertOptions(r,{baseUrl:fr.spelling("baseURL"),withXsrfToken:fr.spelling("withXSRFToken")},!0),r.method=(r.method||this.defaults.method||"get").toLowerCase();let a=i&&q.merge(i.common,i[r.method]);i&&q.forEach(["delete","get","head","post","put","patch","common"],m=>{delete i[m]}),r.headers=Xt.concat(a,i);const l=[];let c=!0;this.interceptors.request.forEach(function(v){if(typeof v.runWhen=="function"&&v.runWhen(r)===!1)return;c=c&&v.synchronous;const $=r.transitional||xm;$&&$.legacyInterceptorReqResOrdering?l.unshift(v.fulfilled,v.rejected):l.push(v.fulfilled,v.rejected)});const d=[];this.interceptors.response.forEach(function(v){d.push(v.fulfilled,v.rejected)});let f,p=0,h;if(!c){const m=[rv.bind(this),void 0];for(m.unshift(...l),m.push(...d),h=m.length,f=Promise.resolve(r);p<h;)f=f.then(m[p++],m[p++]);return f}h=l.length;let y=r;for(;p<h;){const m=l[p++],v=l[p++];try{y=m(y)}catch($){v.call(this,$);break}}try{f=rv.call(this,y)}catch(m){return Promise.reject(m)}for(p=0,h=d.length;p<h;)f=f.then(d[p++],d[p++]);return f}getUri(t){t=Ho(this.defaults,t);const r=vk(t.baseURL,t.url,t.allowAbsoluteUrls);return pk(r,t.params,t.paramsSerializer)}};q.forEach(["delete","get","head","options"],function(t){Ao.prototype[t]=function(r,n){return this.request(Ho(n||{},{method:t,url:r,data:(n||{}).data}))}});q.forEach(["post","put","patch"],function(t){function r(n){return function(i,a,l){return this.request(Ho(l||{},{method:t,headers:n?{"Content-Type":"multipart/form-data"}:{},url:i,data:a}))}}Ao.prototype[t]=r(),Ao.prototype[t+"Form"]=r(!0)});let oP=class kk{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let r;this.promise=new Promise(function(i){r=i});const n=this;this.promise.then(o=>{if(!n._listeners)return;let i=n._listeners.length;for(;i-- >0;)n._listeners[i](o);n._listeners=null}),this.promise.then=o=>{let i;const a=new Promise(l=>{n.subscribe(l),i=l}).then(o);return a.cancel=function(){n.unsubscribe(i)},a},t(function(i,a,l){n.reason||(n.reason=new Ya(i,a,l),r(n.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const r=this._listeners.indexOf(t);r!==-1&&this._listeners.splice(r,1)}toAbortSignal(){const t=new AbortController,r=n=>{t.abort(n)};return this.subscribe(r),t.signal.unsubscribe=()=>this.unsubscribe(r),t.signal}static source(){let t;return{token:new kk(function(o){t=o}),cancel:t}}};function iP(e){return function(r){return e.apply(null,r)}}function sP(e){return q.isObject(e)&&e.isAxiosError===!0}const Op={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Op).forEach(([e,t])=>{Op[t]=e});function Sk(e){const t=new Ao(e),r=rk(Ao.prototype.request,t);return q.extend(r,Ao.prototype,t,{allOwnKeys:!0}),q.extend(r,t,null,{allOwnKeys:!0}),r.create=function(o){return Sk(Ho(e,o))},r}const We=Sk(Ka);We.Axios=Ao;We.CanceledError=Ya;We.CancelToken=oP;We.isCancel=mk;We.VERSION=wk;We.toFormData=Ud;We.AxiosError=ce;We.Cancel=We.CanceledError;We.all=function(t){return Promise.all(t)};We.spread=iP;We.isAxiosError=sP;We.mergeConfig=Ho;We.AxiosHeaders=Xt;We.formToJSON=e=>hk(q.isHTMLForm(e)?new FormData(e):e);We.getAdapter=yk.getAdapter;We.HttpStatusCode=Op;We.default=We;const{Axios:NO,AxiosError:FO,CanceledError:RO,isCancel:AO,CancelToken:IO,VERSION:OO,all:qO,Cancel:MO,isAxiosError:LO,spread:DO,toFormData:WO,AxiosHeaders:HO,HttpStatusCode:UO,formToJSON:VO,getAdapter:GO,mergeConfig:KO}=We;class jk{constructor(t){$n(this,"client");$n(this,"DEFAULT_TIMEOUT",1e4);$n(this,"MAX_RETRIES",3);$n(this,"RETRY_DELAY",1e3);this.client=We.create({baseURL:t,timeout:this.DEFAULT_TIMEOUT,headers:{"Content-Type":"application/json"}}),this.client.interceptors.response.use(r=>r,r=>this.handleError(r))}async get(t,r=this.MAX_RETRIES){try{return(await this.client.get(t)).data}catch(n){if(r>0&&this.isRetryable(n))return await this.delay(this.RETRY_DELAY),this.get(t,r-1);throw this.transformError(n)}}async post(t,r){try{return(await this.client.post(t,r)).data}catch(n){throw this.transformError(n)}}async put(t,r){try{return(await this.client.put(t,r)).data}catch(n){throw this.transformError(n)}}async patch(t,r){try{return(await this.client.patch(t,r)).data}catch(n){throw this.transformError(n)}}async delete(t){try{return(await this.client.delete(t)).data}catch(r){throw this.transformError(r)}}isRetryable(t){var n;if(!We.isAxiosError(t))return!1;const r=(n=t.response)==null?void 0:n.status;return!t.response||r&&r>=500||t.code==="ECONNABORTED"}transformError(t){var r,n;if(We.isAxiosError(t)){const o=t;return{message:o.message||"An error occurred",code:o.code,status:(r=o.response)==null?void 0:r.status,details:(n=o.response)==null?void 0:n.data}}return{message:(t==null?void 0:t.message)||"An unexpected error occurred"}}handleError(t){var n;return((n=t==null?void 0:t.response)==null?void 0:n.status)!==401&&console.error("[API Error]",t),Promise.reject(t)}delay(t){return new Promise(r=>setTimeout(r,t))}setAuthToken(t){this.client.defaults.headers.common.Authorization=`Bearer ${t}`}clearAuthToken(){delete this.client.defaults.headers.common.Authorization}hasToken(){var t;return!!((t=this.client.defaults.headers.common)!=null&&t.Authorization)}}const $k="/api",jr=new jk($k),ue=new jk($k),ov={items:[],filtered:[],loading:!1,error:null,retrying:!1,filters:{category:null,maxPrice:null,minRating:0,search:"",material:null,finish:null,size:null,color:null,custom:{}}},oa=Dr("products/fetch",async(e,{rejectWithValue:t})=>{try{const r=await jr.get("/products?limit=100"),n=r.products||r;return Array.isArray(n)?n.map(o=>{var i;return{id:String(o.id||o._id),_id:String(o._id||o.id),title:o.title,price:o.price,category:o.category,description:o.description,image:o.image||o.thumbnail||((i=o.images)==null?void 0:i[0]),images:o.images,mrp:o.mrp,retailPrice:o.retailPrice,discount:o.discount,showPriceInListing:o.showPriceInListing,rating:o.rating||0,reviewCount:o.reviewCount||0,reviews:o.reviews||[],material:o.material||"",finish:o.finish||"",sizes:o.sizes||[],color:o.color||"",specifications:o.specifications||{},customFilters:o.customFilters||{},stock:o.stock,quantity:o.quantity}}):[]}catch(r){return t(r.message||"Failed to fetch products")}}),Vr=e=>{let t=[...e.items];const r=e.filters;if(r.category&&(t=t.filter(n=>(n.category||"").toLowerCase()===String(r.category).toLowerCase())),r.maxPrice!==null&&(t=t.filter(n=>n.price<=r.maxPrice)),r.minRating>0&&(t=t.filter(n=>n.rating>=r.minRating)),r.search){const n=r.search.toLowerCase();t=t.filter(o=>o.title.toLowerCase().includes(n)||o.description.toLowerCase().includes(n)||o.category.toLowerCase().includes(n))}r.material&&(t=t.filter(n=>n.material===r.material)),r.finish&&(t=t.filter(n=>n.finish===r.finish)),r.size&&(t=t.filter(n=>{var o;return(o=n.sizes)==null?void 0:o.includes(r.size)})),r.color&&(t=t.filter(n=>{var o;return((o=n.color)==null?void 0:o.toLowerCase())===r.color.toLowerCase()})),Object.entries(r.custom).forEach(([n,o])=>{o&&(t=t.filter(i=>{var l;const a=(l=i.customFilters)==null?void 0:l[n];return Array.isArray(a)?a.includes(o):String(a||"").toLowerCase()===o.toLowerCase()}))}),e.filtered=t},Ck=Ha({name:"products",initialState:ov,reducers:{filterByCategory:(e,t)=>{e.filters.category=t.payload||null,Vr(e)},filterByPrice:(e,t)=>{e.filters.maxPrice=t.payload,Vr(e)},filterByRating:(e,t)=>{e.filters.minRating=t.payload,Vr(e)},searchProducts:(e,t)=>{e.filters.search=t.payload,Vr(e)},filterByMaterial:(e,t)=>{e.filters.material=t.payload||null,Vr(e)},filterByFinish:(e,t)=>{e.filters.finish=t.payload||null,Vr(e)},filterBySize:(e,t)=>{e.filters.size=t.payload||null,Vr(e)},filterByColor:(e,t)=>{e.filters.color=t.payload||null,Vr(e)},filterByCustom:(e,t)=>{const{key:r,value:n}=t.payload;e.filters.custom[r]=n||null,Vr(e)},resetFilters:e=>{e.filters={...ov.filters,custom:{}},e.filtered=e.items},clearError:e=>{e.error=null},setRetrying:(e,t)=>{e.retrying=t.payload},updateProductReviews:(e,t)=>{const{productId:r,reviews:n,rating:o,reviewCount:i}=t.payload,a=l=>{String(l.id)===String(r)&&(l.reviews=n,l.rating=o,l.reviewCount=i)};e.items.forEach(a),e.filtered.forEach(a)}},extraReducers:e=>{e.addCase(oa.pending,t=>{t.loading=!0,t.error=null}),e.addCase(oa.fulfilled,(t,r)=>{t.loading=!1,t.items=r.payload,Vr(t),t.error=null}),e.addCase(oa.rejected,(t,r)=>{t.loading=!1,t.error=r.payload||"Failed to fetch products",t.retrying=!1})}}),{filterByCategory:Us,filterByPrice:aP,filterByRating:lP,searchProducts:cP,filterByMaterial:dP,filterByFinish:uP,filterBySize:fP,filterByColor:pP,filterByCustom:hP,resetFilters:qp,clearError:mP,setRetrying:YO,updateProductReviews:_k}=Ck.actions,gP=Ck.reducer,be={getAddresses:async()=>await ue.get("/user/addresses"),addAddress:async e=>await ue.post("/user/addresses",e),updateAddress:async(e,t)=>await ue.put(`/user/addresses/${e}`,t),deleteAddress:async e=>await ue.delete(`/user/addresses/${e}`),getCart:async()=>await ue.get("/user/cart"),addToCart:async e=>await ue.post("/user/cart",e),updateCartItem:async(e,t)=>await ue.put(`/user/cart/${e}`,{quantity:t}),removeFromCart:async e=>await ue.delete(`/user/cart/${e}`),getWishlist:async()=>await ue.get("/user/wishlist"),addToWishlist:async e=>await ue.post("/user/wishlist",e),removeFromWishlist:async e=>await ue.delete(`/user/wishlist/${e}`),getProfile:async()=>await ue.get("/user/profile"),updateProfile:async e=>await ue.put("/user/profile",e),changePassword:async e=>await ue.post("/user/change-password",e),createAdminProduct:async e=>await ue.post("/products/admin/create",e),getAdminProducts:async()=>(await ue.get("/products/admin/all")).products||[],updateAdminProduct:async(e,t)=>await ue.put(`/products/admin/${e}`,t),deleteAdminProduct:async e=>await ue.delete(`/products/admin/${e}`),publishAdminProduct:async e=>await ue.patch(`/products/admin/${e}/publish`,{}),unpublishAdminProduct:async e=>await ue.patch(`/products/admin/${e}/unpublish`,{}),bulkPublishProducts:async e=>await ue.post("/products/admin/bulk-publish",{ids:e}),bulkUnpublishProducts:async e=>await ue.post("/products/admin/bulk-unpublish",{ids:e}),bulkDeleteProducts:async e=>await ue.post("/products/admin/bulk-delete",{ids:e}),bulkImportProducts:async e=>await ue.post("/products/admin/bulk-import",{products:e}),getAllUsers:async()=>(await ue.get("/auth/users")).users||[],promotUserToAdmin:async e=>await ue.post("/auth/promote-to-admin",{email:e}),getSiteSettings:async()=>(await jr.get("/settings")).data||{},updateSiteSettings:async e=>await ue.put("/settings",e),submitContactForm:async e=>await jr.post("/inquiries/contact",e)},vP={items:[],loading:!1,error:null},Ni=Dr("cart/loadCartAPI",async(e,{rejectWithValue:t})=>{var r,n;try{return await be.getCart()}catch(o){return t(((n=(r=o.response)==null?void 0:r.data)==null?void 0:n.message)||"Failed to load cart")}}),Vu=Dr("cart/addToCartAPI",async(e,{rejectWithValue:t})=>{var r,n;try{return await be.addToCart({productId:e.id,productName:e.title,price:e.price,quantity:1,image:e.image})}catch(o){return t(((n=(r=o.response)==null?void 0:r.data)==null?void 0:n.message)||"Failed to add to cart")}}),Gu=Dr("cart/removeFromCartAPI",async(e,{rejectWithValue:t})=>{var r,n;try{return await be.removeFromCart(e)}catch(o){return t(((n=(r=o.response)==null?void 0:r.data)==null?void 0:n.message)||"Failed to remove from cart")}}),Ku=Dr("cart/updateCartAPI",async({itemId:e,quantity:t},{rejectWithValue:r})=>{var n,o;try{return await be.updateCartItem(e,t)}catch(i){return r(((o=(n=i.response)==null?void 0:n.data)==null?void 0:o.message)||"Failed to update cart")}}),zk=Ha({name:"cart",initialState:vP,reducers:{addToCartLocal:(e,t)=>{const r=e.items.find(n=>String(n.id)===String(t.payload.id));r?r.quantity++:e.items.push({...t.payload,quantity:1})},removeFromCartLocal:(e,t)=>{e.items=e.items.filter(r=>String(r.id)!==String(t.payload))},updateCartQuantityLocal:(e,t)=>{const r=e.items.find(n=>String(n.id)===String(t.payload.id));r&&(r.quantity=Math.max(1,t.payload.quantity))},clearCart:e=>{e.items=[]},setCart:(e,t)=>{e.items=t.payload}},extraReducers:e=>{e.addCase(Ni.pending,t=>{t.loading=!0,t.error=null}).addCase(Ni.fulfilled,(t,r)=>{t.loading=!1,t.items=r.payload.cart||[]}).addCase(Ni.rejected,(t,r)=>{t.loading=!1,t.error=r.payload}),e.addCase(Vu.pending,t=>{t.loading=!0,t.error=null}).addCase(Vu.fulfilled,(t,r)=>{t.loading=!1,t.items=r.payload.cart||t.items}).addCase(Vu.rejected,(t,r)=>{t.loading=!1,t.error=r.payload}),e.addCase(Gu.pending,t=>{t.loading=!0,t.error=null}).addCase(Gu.fulfilled,(t,r)=>{t.loading=!1,t.items=r.payload.cart||t.items}).addCase(Gu.rejected,(t,r)=>{t.loading=!1,t.error=r.payload}),e.addCase(Ku.pending,t=>{t.loading=!0,t.error=null}).addCase(Ku.fulfilled,(t,r)=>{t.loading=!1,t.items=r.payload.cart||t.items}).addCase(Ku.rejected,(t,r)=>{t.loading=!1,t.error=r.payload})}}),{addToCartLocal:XO,removeFromCartLocal:QO,updateCartQuantityLocal:JO,clearCart:ZO,setCart:eq}=zk.actions,bP=zk.reducer,xP={user:localStorage.getItem("user")?{...JSON.parse(localStorage.getItem("user")),addresses:[],orders:[]}:null,isAuthenticated:!!localStorage.getItem("token"),token:localStorage.getItem("token"),loading:!1,error:null,addresses:[],orders:[]},mc=Dr("auth/signup",async({name:e,email:t,password:r},{rejectWithValue:n})=>{var o;try{const i=await ue.post("/auth/signup",{name:e,email:t,password:r});return localStorage.setItem("token",i.token),localStorage.setItem("user",JSON.stringify(i.user)),i}catch(i){return n(((o=i.details)==null?void 0:o.message)||i.message||"Signup failed")}}),ia=Dr("auth/login",async({email:e,password:t},{rejectWithValue:r})=>{var n;try{const o=await ue.post("/auth/login",{email:e,password:t});return localStorage.setItem("token",o.token),localStorage.setItem("user",JSON.stringify(o.user)),o}catch(o){return r(((n=o.details)==null?void 0:n.message)||o.message||"Login failed")}}),gc=Dr("auth/getUser",async(e,{rejectWithValue:t})=>{var r;try{return await ue.get("/auth/me")}catch(n){return t(((r=n.details)==null?void 0:r.message)||n.message||"Failed to fetch user")}}),Ek=Ha({name:"auth",initialState:xP,reducers:{logout:e=>{e.user=null,e.isAuthenticated=!1,e.token=null,e.error=null,e.addresses=[],e.orders=[],localStorage.removeItem("token"),localStorage.removeItem("user")},clearError:e=>{e.error=null},addAddress:(e,t)=>{const r={...t.payload,id:`addr_${Date.now()}`};e.addresses.push(r)},removeAddress:(e,t)=>{e.addresses=e.addresses.filter(r=>r.id!==t.payload)},setDefaultAddress:(e,t)=>{e.addresses=e.addresses.map(r=>({...r,isDefault:r.id===t.payload}))},addOrder:(e,t)=>{const r={...t.payload,id:`order_${Date.now()}`};e.orders.push(r)}},extraReducers:e=>{e.addCase(mc.pending,t=>{t.loading=!0,t.error=null}).addCase(mc.fulfilled,(t,r)=>{t.loading=!1,t.user=r.payload.user,t.token=r.payload.token,t.isAuthenticated=!0,t.error=null}).addCase(mc.rejected,(t,r)=>{t.loading=!1,t.error=r.payload}).addCase(ia.pending,t=>{t.loading=!0,t.error=null}).addCase(ia.fulfilled,(t,r)=>{t.loading=!1,t.user=r.payload.user,t.token=r.payload.token,t.isAuthenticated=!0,t.error=null}).addCase(ia.rejected,(t,r)=>{t.loading=!1,t.error=r.payload}).addCase(gc.pending,t=>{t.loading=!0}).addCase(gc.fulfilled,(t,r)=>{t.loading=!1,t.isAuthenticated=!0,t.user=r.payload.user}).addCase(gc.rejected,t=>{t.loading=!1,t.isAuthenticated=!1,t.token=null,t.user=null,localStorage.removeItem("token"),localStorage.removeItem("user")})}}),{logout:Bk,clearError:tq,addAddress:rq,removeAddress:nq,setDefaultAddress:oq,addOrder:iq}=Ek.actions,yP=Ek.reducer,wP={reviews:{}},Tk=Ha({name:"reviews",initialState:wP,reducers:{addReview:(e,t)=>{const{productId:r,review:n}=t.payload;e.reviews[r]||(e.reviews[r]=[]);const o={...n,id:`review_${Date.now()}_${Math.random()}`};e.reviews[r].unshift(o)},deleteReview:(e,t)=>{const{productId:r,reviewId:n}=t.payload;e.reviews[r]&&(e.reviews[r]=e.reviews[r].filter(o=>o.id!==n))},updateHelpful:(e,t)=>{const{productId:r,reviewId:n}=t.payload;if(e.reviews[r]){const o=e.reviews[r].find(i=>i.id===n);o&&(o.helpful+=1)}},initializeProductReviews:(e,t)=>{const{productId:r,reviews:n}=t.payload;e.reviews[r]=n}}}),{addReview:sq,deleteReview:aq,updateHelpful:lq,initializeProductReviews:cq}=Tk.actions,kP=Tk.reducer,SP={items:[],loading:!1,error:null},sa=Dr("wishlist/loadWishlistAPI",async(e,{rejectWithValue:t})=>{var r,n;try{return await be.getWishlist()}catch(o){return t(((n=(r=o.response)==null?void 0:r.data)==null?void 0:n.message)||"Failed to load wishlist")}}),Yu=Dr("wishlist/addToWishlistAPI",async(e,{rejectWithValue:t})=>{var r,n;try{return await be.addToWishlist({productId:e.id,productName:e.title,price:e.price,image:e.image})}catch(o){return t(((n=(r=o.response)==null?void 0:r.data)==null?void 0:n.message)||"Failed to add to wishlist")}}),Xu=Dr("wishlist/removeFromWishlistAPI",async(e,{rejectWithValue:t})=>{var r,n;try{return await be.removeFromWishlist(e)}catch(o){return t(((n=(r=o.response)==null?void 0:r.data)==null?void 0:n.message)||"Failed to remove from wishlist")}}),Pk=Ha({name:"wishlist",initialState:SP,reducers:{addToWishlistLocal:(e,t)=>{e.items.find(n=>String(n.id)===String(t.payload.id))||e.items.push(t.payload)},removeFromWishlistLocal:(e,t)=>{e.items=e.items.filter(r=>String(r.id)!==String(t.payload))},clearWishlist:e=>{e.items=[]},setWishlist:(e,t)=>{e.items=t.payload}},extraReducers:e=>{e.addCase(sa.pending,t=>{t.loading=!0,t.error=null}).addCase(sa.fulfilled,(t,r)=>{t.loading=!1,t.items=r.payload.wishlist||[]}).addCase(sa.rejected,(t,r)=>{t.loading=!1,t.error=r.payload}),e.addCase(Yu.pending,t=>{t.loading=!0,t.error=null}).addCase(Yu.fulfilled,(t,r)=>{t.loading=!1,t.items=r.payload.wishlist||t.items}).addCase(Yu.rejected,(t,r)=>{t.loading=!1,t.error=r.payload}),e.addCase(Xu.pending,t=>{t.loading=!0,t.error=null}).addCase(Xu.fulfilled,(t,r)=>{t.loading=!1,t.items=r.payload.wishlist||t.items}).addCase(Xu.rejected,(t,r)=>{t.loading=!1,t.error=r.payload})}}),{addToWishlistLocal:dq,removeFromWishlistLocal:uq,clearWishlist:fq,setWishlist:pq}=Pk.actions,jP=Pk.reducer,$P=f6({reducer:{products:gP,cart:bP,auth:yP,reviews:kP,wishlist:jP}});var Tt=function(){return Tt=Object.assign||function(t){for(var r,n=1,o=arguments.length;n<o;n++){r=arguments[n];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t},Tt.apply(this,arguments)};function Vi(e,t,r){if(r||arguments.length===2)for(var n=0,o=t.length,i;n<o;n++)(i||!(n in t))&&(i||(i=Array.prototype.slice.call(t,0,n)),i[n]=t[n]);return e.concat(i||Array.prototype.slice.call(t))}var CP={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Zt={},Gi=typeof process<"u"&&Zt!==void 0&&(Zt.REACT_APP_SC_ATTR||Zt.SC_ATTR)||"data-styled",Nk="active",Fk="data-styled-version",Gd="6.3.9",km=`/*!sc*/
`,aa=typeof window<"u"&&typeof document<"u",en=Ie.createContext===void 0,_P=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&Zt!==void 0&&Zt.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&Zt.REACT_APP_SC_DISABLE_SPEEDY!==""?Zt.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&Zt.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&Zt!==void 0&&Zt.SC_DISABLE_SPEEDY!==void 0&&Zt.SC_DISABLE_SPEEDY!==""&&Zt.SC_DISABLE_SPEEDY!=="false"&&Zt.SC_DISABLE_SPEEDY),zP={},Sm=Object.freeze([]),Ki=Object.freeze({});function Rk(e,t,r){return r===void 0&&(r=Ki),e.theme!==r.theme&&e.theme||t||r.theme}var Ak=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]),EP=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,BP=/(^-|-$)/g;function iv(e){return e.replace(EP,"-").replace(BP,"")}var TP=/(a)(d)/gi,sv=function(e){return String.fromCharCode(e+(e>25?39:97))};function Mp(e){var t,r="";for(t=Math.abs(e);t>52;t=t/52|0)r=sv(t%52)+r;return(sv(t%52)+r).replace(TP,"$1-$2")}var Qu,$o=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},Ik=function(e){return $o(5381,e)};function jm(e){return Mp(Ik(e)>>>0)}function PP(e){return e.displayName||e.name||"Component"}function Ju(e){return typeof e=="string"&&!0}var Ok=typeof Symbol=="function"&&Symbol.for,qk=Ok?Symbol.for("react.memo"):60115,NP=Ok?Symbol.for("react.forward_ref"):60112,FP={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},RP={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Mk={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},AP=((Qu={})[NP]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Qu[qk]=Mk,Qu);function av(e){return("type"in(t=e)&&t.type.$$typeof)===qk?Mk:"$$typeof"in e?AP[e.$$typeof]:FP;var t}var IP=Object.defineProperty,OP=Object.getOwnPropertyNames,lv=Object.getOwnPropertySymbols,qP=Object.getOwnPropertyDescriptor,MP=Object.getPrototypeOf,cv=Object.prototype;function Lk(e,t,r){if(typeof t!="string"){if(cv){var n=MP(t);n&&n!==cv&&Lk(e,n,r)}var o=OP(t);lv&&(o=o.concat(lv(t)));for(var i=av(e),a=av(t),l=0;l<o.length;++l){var c=o[l];if(!(c in RP||r&&r[c]||a&&c in a||i&&c in i)){var d=qP(t,c);try{IP(e,c,d)}catch{}}}}return e}function Yi(e){return typeof e=="function"}function $m(e){return typeof e=="object"&&"styledComponentId"in e}function To(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function nd(e,t){return e.join("")}function Pa(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Lp(e,t,r){if(r===void 0&&(r=!1),!r&&!Pa(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=Lp(e[n],t[n]);else if(Pa(t))for(var n in t)e[n]=Lp(e[n],t[n]);return e}function Cm(e,t){Object.defineProperty(e,"toString",{value:t})}function Xa(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var LP=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t,this._cGroup=0,this._cIndex=0}return e.prototype.indexOfGroup=function(t){if(t===this._cGroup)return this._cIndex;var r=this._cIndex;if(t>this._cGroup)for(var n=this._cGroup;n<t;n++)r+=this.groupSizes[n];else for(n=this._cGroup-1;n>=t;n--)r-=this.groupSizes[n];return this._cGroup=t,this._cIndex=r,r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,i=o;t>=i;)if((i<<=1)<0)throw Xa(16,"".concat(t));this.groupSizes=new Uint32Array(i),this.groupSizes.set(n),this.length=i;for(var a=o;a<i;a++)this.groupSizes[a]=0}for(var l=this.indexOfGroup(t+1),c=0,d=(a=0,r.length);a<d;a++)this.tag.insertRule(l,r[a])&&(this.groupSizes[t]++,l++,c++);c>0&&this._cGroup>t&&(this._cIndex+=c)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),o=n+r;this.groupSizes[t]=0;for(var i=n;i<o;i++)this.tag.deleteRule(n);r>0&&this._cGroup>t&&(this._cIndex-=r)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],o=this.indexOfGroup(t),i=o+n,a=o;a<i;a++)r+=this.tag.getRule(a)+km;return r},e}(),vc=new Map,od=new Map,bc=1,Ci=function(e){if(vc.has(e))return vc.get(e);for(;od.has(bc);)bc++;var t=bc++;return vc.set(e,t),od.set(t,e),t},DP=function(e,t){bc=t+1,vc.set(e,t),od.set(t,e)},WP="style[".concat(Gi,"][").concat(Fk,'="').concat(Gd,'"]'),HP=new RegExp("^".concat(Gi,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),dv=function(e){return typeof ShadowRoot<"u"&&e instanceof ShadowRoot||"host"in e&&e.nodeType===11},Dp=function(e){if(!e)return document;if(dv(e))return e;if("getRootNode"in e){var t=e.getRootNode();if(dv(t))return t}return document},UP=function(e,t,r){for(var n,o=r.split(","),i=0,a=o.length;i<a;i++)(n=o[i])&&e.registerName(t,n)},VP=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(km),o=[],i=0,a=n.length;i<a;i++){var l=n[i].trim();if(l){var c=l.match(HP);if(c){var d=0|parseInt(c[1],10),f=c[2];d!==0&&(DP(f,d),UP(e,f,c[3]),e.getTag().insertRules(d,o)),o.length=0}else o.push(l)}}},Zu=function(e){for(var t=Dp(e.options.target).querySelectorAll(WP),r=0,n=t.length;r<n;r++){var o=t[r];o&&o.getAttribute(Gi)!==Nk&&(VP(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function GP(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var Dk=function(e){var t=document.head,r=e||t,n=document.createElement("style"),o=function(l){var c=Array.from(l.querySelectorAll("style[".concat(Gi,"]")));return c[c.length-1]}(r),i=o!==void 0?o.nextSibling:null;n.setAttribute(Gi,Nk),n.setAttribute(Fk,Gd);var a=GP();return a&&n.setAttribute("nonce",a),r.insertBefore(n,i),n},KP=function(){function e(t){this.element=Dk(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){var n;if(r.sheet)return r.sheet;for(var o=(n=r.getRootNode().styleSheets)!==null&&n!==void 0?n:document.styleSheets,i=0,a=o.length;i<a;i++){var l=o[i];if(l.ownerNode===r)return l}throw Xa(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),YP=function(){function e(t){this.element=Dk(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),XP=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(t===this.length?this.rules.push(r):this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),uv=aa,QP={isServer:!aa,useCSSOMInjection:!_P},id=function(){function e(t,r,n){t===void 0&&(t=Ki),r===void 0&&(r={});var o=this;this.options=Tt(Tt({},QP),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&aa&&uv&&(uv=!1,Zu(this)),Cm(this,function(){return function(i){for(var a=i.getTag(),l=a.length,c="",d=function(p){var h=function(S){return od.get(S)}(p);if(h===void 0)return"continue";var y=i.names.get(h);if(y===void 0||!y.size)return"continue";var m=a.getGroup(p);if(m.length===0)return"continue";var v=Gi+".g"+p+'[id="'+h+'"]',$="";y.forEach(function(S){S.length>0&&($+=S+",")}),c+=m+v+'{content:"'+$+'"}'+km},f=0;f<l;f++)d(f);return c}(o)})}return e.registerId=function(t){return Ci(t)},e.prototype.rehydrate=function(){!this.server&&aa&&Zu(this)},e.prototype.reconstructWithOptions=function(t,r){r===void 0&&(r=!0);var n=new e(Tt(Tt({},this.options),t),this.gs,r&&this.names||void 0);return!this.server&&aa&&t.target!==this.options.target&&Dp(this.options.target)!==Dp(t.target)&&Zu(n),n},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var n=r.useCSSOMInjection,o=r.target;return r.isServer?new XP(o):n?new KP(o):new YP(o)}(this.options),new LP(t)));var t},e.prototype.hasNameForId=function(t,r){var n,o;return(o=(n=this.names.get(t))===null||n===void 0?void 0:n.has(r))!==null&&o!==void 0&&o},e.prototype.registerName=function(t,r){Ci(t);var n=this.names.get(t);n?n.add(r):this.names.set(t,new Set([r]))},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(Ci(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(Ci(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),JP=/&/g,dn=47,Co=42;function fv(e){if(e.indexOf("}")===-1)return!1;for(var t=e.length,r=0,n=0,o=!1,i=0;i<t;i++){var a=e.charCodeAt(i);if(n!==0||o||a!==dn||e.charCodeAt(i+1)!==Co)if(o)a===Co&&e.charCodeAt(i+1)===dn&&(o=!1,i++);else if(a!==34&&a!==39||i!==0&&e.charCodeAt(i-1)===92){if(n===0){if(a===123)r++;else if(a===125&&--r<0)return!0}}else n===0?n=a:n===a&&(n=0);else o=!0,i++}return r!==0||n!==0}function Wk(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=Wk(r.children,t)),r})}function ZP(e){var t,r,n,o=Ki,i=o.options,a=i===void 0?Ki:i,l=o.plugins,c=l===void 0?Sm:l,d=function(m,v,$){return $.startsWith(r)&&$.endsWith(r)&&$.replaceAll(r,"").length>0?".".concat(t):m},f=c.slice();f.push(function(m){m.type===Sd&&m.value.includes("&")&&(n||(n=new RegExp("\\".concat(r,"\\b"),"g")),m.props[0]=m.props[0].replace(JP,r).replace(n,d))}),a.prefix&&f.push(rC),f.push(Z$);var p=[],h=eC(f.concat(tC(function(m){return p.push(m)}))),y=function(m,v,$,S){v===void 0&&(v=""),$===void 0&&($=""),S===void 0&&(S="&"),t=S,r=v,n=void 0;var j=function(w){if(!fv(w))return w;for(var _=w.length,B="",E=0,N=0,L=0,V=!1,R=0;R<_;R++){var M=w.charCodeAt(R);if(L!==0||V||M!==dn||w.charCodeAt(R+1)!==Co)if(V)M===Co&&w.charCodeAt(R+1)===dn&&(V=!1,R++);else if(M!==34&&M!==39||R!==0&&w.charCodeAt(R-1)===92){if(L===0)if(M===123)N++;else if(M===125){if(--N<0){for(var W=R+1;W<_;){var Z=w.charCodeAt(W);if(Z===59||Z===10)break;W++}W<_&&w.charCodeAt(W)===59&&W++,N=0,R=W-1,E=W;continue}N===0&&(B+=w.substring(E,R+1),E=R+1)}else M===59&&N===0&&(B+=w.substring(E,R+1),E=R+1)}else L===0?L=M:L===M&&(L=0);else V=!0,R++}if(E<_){var I=w.substring(E);fv(I)||(B+=I)}return B}(function(w){if(w.indexOf("//")===-1)return w;for(var _=w.length,B=[],E=0,N=0,L=0,V=0;N<_;){var R=w.charCodeAt(N);if(R!==34&&R!==39||N!==0&&w.charCodeAt(N-1)===92)if(L===0)if(R===dn&&N+1<_&&w.charCodeAt(N+1)===Co){for(N+=2;N+1<_&&(w.charCodeAt(N)!==Co||w.charCodeAt(N+1)!==dn);)N++;N+=2}else if(R===40&&N>=3&&(32|w.charCodeAt(N-1))==108&&(32|w.charCodeAt(N-2))==114&&(32|w.charCodeAt(N-3))==117)V=1,N++;else if(V>0)R===41?V--:R===40&&V++,N++;else if(R===Co&&N+1<_&&w.charCodeAt(N+1)===dn)N>E&&B.push(w.substring(E,N)),E=N+=2;else if(R===dn&&N+1<_&&w.charCodeAt(N+1)===dn){for(N>E&&B.push(w.substring(E,N));N<_&&w.charCodeAt(N)!==10;)N++;E=N}else N++;else N++;else L===0?L=R:L===R&&(L=0),N++}return E===0?w:(E<_&&B.push(w.substring(E)),B.join(""))}(m)),k=Q$($||v?"".concat($," ").concat(v," { ").concat(j," }"):j);return a.namespace&&(k=Wk(k,a.namespace)),p=[],Wc(k,h),p};return y.hash=c.length?c.reduce(function(m,v){return v.name||Xa(15),$o(m,v.name)},5381).toString():"",y}var eN=new id,Wp=ZP(),Hp={shouldForwardProp:void 0,styleSheet:eN,stylis:Wp},Hk=en?{Provider:function(e){return e.children},Consumer:function(e){return(0,e.children)(Hp)}}:Ie.createContext(Hp);Hk.Consumer;en||Ie.createContext(void 0);function Up(){return en?Hp:Ie.useContext(Hk)}var Uk=function(){function e(t,r){var n=this;this.inject=function(o,i){i===void 0&&(i=Wp);var a=n.name+i.hash;o.hasNameForId(n.id,a)||o.insertRules(n.id,a,i(n.rules,a,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,Cm(this,function(){throw Xa(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=Wp),this.name+t.hash},e}();function tN(e,t){return t==null||typeof t=="boolean"||t===""?"":typeof t!="number"||t===0||e in CP||e.startsWith("--")?String(t).trim():"".concat(t,"px")}var rN=function(e){return e>="A"&&e<="Z"};function pv(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;rN(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var Vk=function(e){return e==null||e===!1||e===""},Gk=function(e){var t=[];for(var r in e){var n=e[r];e.hasOwnProperty(r)&&!Vk(n)&&(Array.isArray(n)&&n.isCss||Yi(n)?t.push("".concat(pv(r),":"),n,";"):Pa(n)?t.push.apply(t,Vi(Vi(["".concat(r," {")],Gk(n),!1),["}"],!1)):t.push("".concat(pv(r),": ").concat(tN(r,n),";")))}return t};function Xn(e,t,r,n,o){if(o===void 0&&(o=[]),typeof e=="string")return e&&o.push(e),o;if(Vk(e))return o;if($m(e))return o.push(".".concat(e.styledComponentId)),o;if(Yi(e)){if(!Yi(a=e)||a.prototype&&a.prototype.isReactComponent||!t)return o.push(e),o;var i=e(t);return Xn(i,t,r,n,o)}var a;if(e instanceof Uk)return r?(e.inject(r,n),o.push(e.getName(n))):o.push(e),o;if(Pa(e)){for(var l=Gk(e),c=0;c<l.length;c++)o.push(l[c]);return o}if(!Array.isArray(e))return o.push(e.toString()),o;for(c=0;c<e.length;c++)Xn(e[c],t,r,n,o);return o}function Kk(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(Yi(r)&&!$m(r))return!1}return!0}var nN=Ik(Gd),oN=function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&Kk(t),this.componentId=r,this.baseHash=$o(nN,r),this.baseStyle=n,id.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n).className:"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))o=To(o,this.staticRulesId);else{var i=nd(Xn(this.rules,t,r,n)),a=Mp($o(this.baseHash,i)>>>0);if(!r.hasNameForId(this.componentId,a)){var l=n(i,".".concat(a),void 0,this.componentId);r.insertRules(this.componentId,a,l)}o=To(o,a),this.staticRulesId=a}else{for(var c=$o(this.baseHash,n.hash),d="",f=0;f<this.rules.length;f++){var p=this.rules[f];if(typeof p=="string")d+=p;else if(p){var h=nd(Xn(p,t,r,n));c=$o($o(c,String(f)),h),d+=h}}if(d){var y=Mp(c>>>0);if(!r.hasNameForId(this.componentId,y)){var m=n(d,".".concat(y),void 0,this.componentId);r.insertRules(this.componentId,y,m)}o=To(o,y)}}return{className:o,css:typeof window>"u"?r.getTag().getGroup(Ci(this.componentId)):""}},e}(),_m=en?{Provider:function(e){return e.children},Consumer:function(e){return(0,e.children)(void 0)}}:Ie.createContext(void 0);_m.Consumer;var ef={};function iN(e,t,r){var n=$m(e),o=e,i=!Ju(e),a=t.attrs,l=a===void 0?Sm:a,c=t.componentId,d=c===void 0?function(w,_){var B=typeof w!="string"?"sc":iv(w);ef[B]=(ef[B]||0)+1;var E="".concat(B,"-").concat(jm(Gd+B+ef[B]));return _?"".concat(_,"-").concat(E):E}(t.displayName,t.parentComponentId):c,f=t.displayName,p=f===void 0?function(w){return Ju(w)?"styled.".concat(w):"Styled(".concat(PP(w),")")}(e):f,h=t.displayName&&t.componentId?"".concat(iv(t.displayName),"-").concat(t.componentId):t.componentId||d,y=n&&o.attrs?o.attrs.concat(l).filter(Boolean):l,m=t.shouldForwardProp;if(n&&o.shouldForwardProp){var v=o.shouldForwardProp;if(t.shouldForwardProp){var $=t.shouldForwardProp;m=function(w,_){return v(w,_)&&$(w,_)}}else m=v}var S=new oN(r,h,n?o.componentStyle:void 0);function j(w,_){return function(B,E,N){var L=B.attrs,V=B.componentStyle,R=B.defaultProps,M=B.foldedComponentIds,W=B.styledComponentId,Z=B.target,I=en?void 0:Ie.useContext(_m),T=Up(),z=B.shouldForwardProp||T.shouldForwardProp,P=Rk(E,I,R)||(en?void 0:Ki),A=function(Nt,Oe,kt){for(var gt,at=Tt(Tt({},Oe),{className:void 0,theme:kt}),Hr=0;Hr<Nt.length;Hr+=1){var Jt=Yi(gt=Nt[Hr])?gt(at):gt;for(var Re in Jt)Re==="className"?at.className=To(at.className,Jt[Re]):Re==="style"?at.style=Tt(Tt({},at.style),Jt[Re]):at[Re]=Jt[Re]}return"className"in Oe&&typeof Oe.className=="string"&&(at.className=To(at.className,Oe.className)),at}(L,E,P),D=A.as||Z,ae={};for(var ee in A)A[ee]===void 0||ee[0]==="$"||ee==="as"||ee==="theme"&&A.theme===P||(ee==="forwardedAs"?ae.as=A.forwardedAs:z&&!z(ee,D)||(ae[ee]=A[ee]));var fe=function(Nt,Oe){var kt=Up(),gt=Nt.generateAndInjectStyles(Oe,kt.styleSheet,kt.stylis);return gt}(V,A),me=fe.className,Se=fe.css,_e=To(M,W);me&&(_e+=" "+me),A.className&&(_e+=" "+A.className),ae[Ju(D)&&!Ak.has(D)?"class":"className"]=_e,N&&(ae.ref=N);var rt=x.createElement(D,ae);return en&&Se?Ie.createElement(Ie.Fragment,null,Ie.createElement("style",{precedence:"styled-components",href:"sc-".concat(W,"-").concat(me),children:Se}),rt):rt}(k,w,_)}j.displayName=p;var k=Ie.forwardRef(j);return k.attrs=y,k.componentStyle=S,k.displayName=p,k.shouldForwardProp=m,k.foldedComponentIds=n?To(o.foldedComponentIds,o.styledComponentId):"",k.styledComponentId=h,k.target=n?o.target:e,Object.defineProperty(k,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(w){this._foldedDefaultProps=n?function(_){for(var B=[],E=1;E<arguments.length;E++)B[E-1]=arguments[E];for(var N=0,L=B;N<L.length;N++)Lp(_,L[N],!0);return _}({},o.defaultProps,w):w}}),Cm(k,function(){return".".concat(k.styledComponentId)}),i&&Lk(k,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),k}function hv(e,t){for(var r=[e[0]],n=0,o=t.length;n<o;n+=1)r.push(t[n],e[n+1]);return r}var mv=function(e){return Object.assign(e,{isCss:!0})};function zm(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(Yi(e)||Pa(e))return mv(Xn(hv(Sm,Vi([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?Xn(n):mv(Xn(hv(n,t)))}function Vp(e,t,r){if(r===void 0&&(r=Ki),!t)throw Xa(1,t);var n=function(o){for(var i=[],a=1;a<arguments.length;a++)i[a-1]=arguments[a];return e(t,r,zm.apply(void 0,Vi([o],i,!1)))};return n.attrs=function(o){return Vp(e,t,Tt(Tt({},r),{attrs:Array.prototype.concat(r.attrs,o).filter(Boolean)}))},n.withConfig=function(o){return Vp(e,t,Tt(Tt({},r),o))},n}var Yk=function(e){return Vp(iN,e)},g=Yk;Ak.forEach(function(e){g[e]=Yk(e)});var sN=function(){function e(t,r){this.rules=t,this.componentId=r,this.isStatic=Kk(t),id.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,r,n,o){var i=o(nd(Xn(this.rules,r,n,o)),""),a=this.componentId+t;n.insertRules(a,a,i)},e.prototype.removeStyles=function(t,r){r.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,r,n,o){t>2&&id.registerId(this.componentId+t);var i=this.componentId+t;this.isStatic?n.hasNameForId(i,i)||this.createStyles(t,r,n,o):(this.removeStyles(t,n),this.createStyles(t,r,n,o))},e}();function aN(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=zm.apply(void 0,Vi([e],t,!1)),o="sc-global-".concat(jm(JSON.stringify(n))),i=new sN(n,o),a=new WeakMap,l=function(d){var f=Up(),p=en?void 0:Ie.useContext(_m),h=a.get(f.styleSheet);if(h===void 0&&(h=f.styleSheet.allocateGSInstance(o),a.set(f.styleSheet,h)),(typeof window>"u"||!f.styleSheet.server)&&c(h,d,f.styleSheet,p,f.stylis),en||Ie.useLayoutEffect(function(){return f.styleSheet.server||c(h,d,f.styleSheet,p,f.stylis),function(){var v;i.removeStyles(h,f.styleSheet),v=f.styleSheet.options.target,typeof document<"u"&&(v??document).querySelectorAll('style[data-styled-global="'.concat(o,'"]')).forEach(function($){return $.remove()})}},[h,d,f.styleSheet,p,f.stylis]),en){var y=o+h,m=typeof window>"u"?f.styleSheet.getTag().getGroup(Ci(y)):"";if(m)return Ie.createElement("style",{key:"".concat(o,"-").concat(h),"data-styled-global":o,children:m})}return null};function c(d,f,p,h,y){if(i.isStatic)i.renderStyles(d,zP,p,y);else{var m=Tt(Tt({},f),{theme:Rk(f,h,l.defaultProps)});i.renderStyles(d,m,p,y)}}return Ie.memo(l)}function Xk(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=nd(zm.apply(void 0,Vi([e],t,!1))),o=jm(n);return new Uk(o,n)}const b={primary:{main:"#0066ff",light:"#3385ff",lighter:"#e6f0ff",dark:"#0052cc"},secondary:{main:"#ff6b35"},success:"#10b981",error:"#ef4444",neutral:{0:"#ffffff",50:"#f9fafb",100:"#f3f4f6",200:"#e5e7eb",300:"#d1d5db",400:"#9ca3af",500:"#6b7280",600:"#4b5563",700:"#374151",800:"#1f2937",900:"#111827"},gradients:{primary:"linear-gradient(135deg, #0066ff 0%, #0099ff 100%)"}},C={fontFamily:{base:"'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', sans-serif",mono:"'Menlo', 'Monaco', 'Courier New', 'monospace'"},fontSize:{xs:"12px",sm:"13px",base:"14px",md:"15px",lg:"16px",xl:"18px","2xl":"20px","3xl":"24px","4xl":"28px","5xl":"32px","6xl":"36px"},fontWeight:{normal:400,medium:500,semibold:600,bold:700,extrabold:800},lineHeight:{tight:"1.2",normal:"1.5"}},u={1:"4px",2:"8px",3:"12px",4:"16px",5:"20px",6:"24px",8:"32px",9:"36px",12:"48px",16:"64px"},J={sm:"4px",base:"6px",md:"8px",lg:"12px",xl:"16px",full:"9999px"},ze={xs:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",sm:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",md:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",lg:"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",xl:"0 25px 50px -12px rgba(0, 0, 0, 0.15)"},ye={fast:"150ms cubic-bezier(0.4, 0, 0.2, 1)",base:"250ms cubic-bezier(0.4, 0, 0.2, 1)"},gv={mobile:"480px",tablet:"768px"},O={mobile:`@media (max-width: ${gv.mobile})`,tablet:`@media (min-width: ${gv.tablet})`,touch:"@media (hover: none) and (pointer: coarse)",reducedMotion:"@media (prefers-reduced-motion: reduce)"},lN=aN`
  /* ========================================================================
     RESET & BASE STYLES
     ======================================================================== */

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *::after,
  *::before {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  /* ========================================================================
     BODY & TYPOGRAPHY
     ======================================================================== */

  body {
    font-family: ${C.fontFamily.base};
    font-size: ${C.fontSize.base};
    line-height: ${C.lineHeight.normal};
    color: var(--color-text-primary, ${b.neutral[900]});
    background-color: var(--color-bg-primary, ${b.neutral[50]});
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    transition: background-color 0.3s ease, color 0.3s ease;
    margin: 0;
    padding: 0;
  }

  /* ========================================================================
     DARK MODE
     ======================================================================== */
  body.dark {
    background-color: var(--color-bg-primary, #181a20);
    color: var(--color-text-primary, #f3f4f6);
  }
  body.dark h1, body.dark h2, body.dark h3, body.dark h4, body.dark h5, body.dark h6 {
    color: var(--color-text-primary, #f3f4f6);
  }
  body.dark a {
    color: #90cdf4;
  }
  body.dark .card, body.dark .panel, body.dark .modal {
    background: #23272f;
    color: #f3f4f6;
    border-color: #23272f;
  }
  body.dark input, body.dark textarea, body.dark select {
    background: #23272f;
    color: #f3f4f6;
    border-color: #374151;
  }
  body.dark .fluentui-root, body.dark .fluentui-panel {
    background: #23272f !important;
    color: #f3f4f6 !important;
  }
  body.dark .fluentui-button {
    background: #374151 !important;
    color: #f3f4f6 !important;
  }

  /* ========================================================================
     HEADINGS
     ======================================================================== */

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${C.fontWeight.bold};
    line-height: ${C.lineHeight.tight};
    margin: 0;
    color: var(--color-text-primary, ${b.neutral[900]});
  }

  h1 {
    font-size: ${C.fontSize["6xl"]};
    font-weight: ${C.fontWeight.extrabold};
    
    ${O.mobile} {
      font-size: ${C.fontSize["4xl"]};
    }
  }

  h2 {
    font-size: ${C.fontSize["5xl"]};
    
    ${O.mobile} {
      font-size: ${C.fontSize["3xl"]};
    }
  }

  h3 {
    font-size: ${C.fontSize["3xl"]};
    
    ${O.mobile} {
      font-size: ${C.fontSize["2xl"]};
    }
  }

  h4 {
    font-size: ${C.fontSize["2xl"]};
  }

  h5 {
    font-size: ${C.fontSize.xl};
  }

  h6 {
    font-size: ${C.fontSize.lg};
  }

  /* ========================================================================
     LINKS & INTERACTIVE ELEMENTS
     ======================================================================== */

  a {
    color: var(--color-primary, ${b.primary.main});
    text-decoration: none;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      color: var(--color-primary-dark, ${b.primary.dark});
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary, ${b.primary.main});
      outline-offset: 2px;
      border-radius: ${J.base};
    }
  }

  /* ========================================================================
     BUTTONS
     ======================================================================== */

  button {
    font-family: ${C.fontFamily.base};
    font-size: inherit;
    border: none;
    cursor: pointer;
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:focus-visible {
      outline: 2px solid ${b.primary.main};
      outline-offset: 2px;
    }
  }

  /* ========================================================================
     FORM ELEMENTS
     ======================================================================== */

  input, textarea, select {
    font-family: ${C.fontFamily.base};
    font-size: inherit;
    border: 1px solid var(--color-neutral-300, ${b.neutral[300]});
    border-radius: ${J.md};
    padding: ${u[3]} ${u[4]};
    background: var(--color-neutral-0, ${b.neutral[0]});
    color: var(--color-text-primary, ${b.neutral[900]});
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

    &::placeholder {
      color: var(--color-text-secondary, ${b.neutral[400]});
    }

    &:hover:not(:disabled) {
      border-color: var(--color-neutral-200, ${b.neutral[400]});
    }

    &:focus {
      outline: none;
      border-color: var(--color-primary, ${b.primary.main});
      box-shadow: 0 0 0 3px var(--color-primary-lighter, ${b.primary.lighter});
    }

    &:disabled {
      background: ${b.neutral[100]};
      color: ${b.neutral[400]};
      cursor: not-allowed;
    }
  }

  textarea {
    font-family: ${C.fontFamily.mono};
    resize: vertical;
  }

  /* ========================================================================
     LISTS
     ======================================================================== */

  ul, ol {
    margin: ${u[4]} 0;
    padding-left: ${u[6]};
  }

  li {
    margin: ${u[2]} 0;
  }

  /* ========================================================================
     SCROLLBAR STYLING (Webkit browsers)
     ======================================================================== */

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${b.neutral[100]};
    border-radius: ${J.full};
  }

  ::-webkit-scrollbar-thumb {
    background: ${b.neutral[400]};
    border-radius: ${J.full};
    border: 3px solid ${b.neutral[100]};
    transition: background 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${b.neutral[500]};
  }

  /* ========================================================================
     CODE BLOCKS
     ======================================================================== */

  code {
    font-family: ${C.fontFamily.mono};
    font-size: ${C.fontSize.sm};
    background: ${b.neutral[100]};
    padding: ${u[1]} ${u[2]};
    border-radius: ${J.sm};
    color: ${b.error};
  }

  pre {
    background: ${b.neutral[900]};
    color: ${b.neutral[0]};
    padding: ${u[4]};
    border-radius: ${J.md};
    overflow-x: auto;
    font-size: ${C.fontSize.sm};

    code {
      background: none;
      color: inherit;
      padding: 0;
    }
  }

  /* ========================================================================
     MAIN CONTENT AREA
     ======================================================================== */

  main {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
  }

  /* ========================================================================
     IMPORTANT FOR LAYOUT PAGES
     ======================================================================== */

  .layout-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .content-wrapper {
    flex: 1;
  }

  /* ========================================================================
     SCROLLBAR STYLES - Hide scrollbars while keeping scroll functionality
     ======================================================================== */

  /* Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: transparent;
  }

  /* Firefox */
  * {
    scrollbar-width: none;
  }

  /* Internet Explorer and Edge */
  * {
    -ms-overflow-style: none;
  }

  /* ========================================================================
     ACCESSIBILITY: Reduced Motion
     ======================================================================== */

  ${O.reducedMotion} {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* ========================================================================
     RESPONSIVE UTILITIES
     ======================================================================== */

  /* Mobile-first responsive classes */
  ${O.mobile} {
    body {
      font-size: ${C.fontSize.base};
    }
  }

  /* Touch device adjustments */
  ${O.touch} {
    button, a, input {
      min-height: 44px;
      min-width: 44px;
    }
  }

  /* ========================================================================
     PRINT STYLES
     ======================================================================== */

  @media print {
    body {
      background: white;
      color: black;
    }

    a {
      text-decoration: underline;
    }

    button,
    .no-print {
      display: none !important;
    }
  }
`;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Na(){return Na=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Na.apply(this,arguments)}var Mn;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Mn||(Mn={}));const vv="popstate";function cN(e){e===void 0&&(e={});function t(n,o){let{pathname:i,search:a,hash:l}=n.location;return Gp("",{pathname:i,search:a,hash:l},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function r(n,o){return typeof o=="string"?o:sd(o)}return uN(t,r,null,e)}function tt(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Em(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function dN(){return Math.random().toString(36).substr(2,8)}function bv(e,t){return{usr:e.state,key:e.key,idx:t}}function Gp(e,t,r,n){return r===void 0&&(r=null),Na({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?ss(t):t,{state:r,key:t&&t.key||n||dN()})}function sd(e){let{pathname:t="/",search:r="",hash:n=""}=e;return r&&r!=="?"&&(t+=r.charAt(0)==="?"?r:"?"+r),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function ss(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substr(r),e=e.substr(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substr(n),e=e.substr(0,n)),e&&(t.pathname=e)}return t}function uN(e,t,r,n){n===void 0&&(n={});let{window:o=document.defaultView,v5Compat:i=!1}=n,a=o.history,l=Mn.Pop,c=null,d=f();d==null&&(d=0,a.replaceState(Na({},a.state,{idx:d}),""));function f(){return(a.state||{idx:null}).idx}function p(){l=Mn.Pop;let $=f(),S=$==null?null:$-d;d=$,c&&c({action:l,location:v.location,delta:S})}function h($,S){l=Mn.Push;let j=Gp(v.location,$,S);d=f()+1;let k=bv(j,d),w=v.createHref(j);try{a.pushState(k,"",w)}catch(_){if(_ instanceof DOMException&&_.name==="DataCloneError")throw _;o.location.assign(w)}i&&c&&c({action:l,location:v.location,delta:1})}function y($,S){l=Mn.Replace;let j=Gp(v.location,$,S);d=f();let k=bv(j,d),w=v.createHref(j);a.replaceState(k,"",w),i&&c&&c({action:l,location:v.location,delta:0})}function m($){let S=o.location.origin!=="null"?o.location.origin:o.location.href,j=typeof $=="string"?$:sd($);return j=j.replace(/ $/,"%20"),tt(S,"No window.location.(origin|href) available to create URL for href: "+j),new URL(j,S)}let v={get action(){return l},get location(){return e(o,a)},listen($){if(c)throw new Error("A history only accepts one active listener");return o.addEventListener(vv,p),c=$,()=>{o.removeEventListener(vv,p),c=null}},createHref($){return t(o,$)},createURL:m,encodeLocation($){let S=m($);return{pathname:S.pathname,search:S.search,hash:S.hash}},push:h,replace:y,go($){return a.go($)}};return v}var xv;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(xv||(xv={}));function fN(e,t,r){return r===void 0&&(r="/"),pN(e,t,r)}function pN(e,t,r,n){let o=typeof t=="string"?ss(t):t,i=Bm(o.pathname||"/",r);if(i==null)return null;let a=Qk(e);hN(a);let l=null;for(let c=0;l==null&&c<a.length;++c){let d=CN(i);l=SN(a[c],d)}return l}function Qk(e,t,r,n){t===void 0&&(t=[]),r===void 0&&(r=[]),n===void 0&&(n="");let o=(i,a,l)=>{let c={relativePath:l===void 0?i.path||"":l,caseSensitive:i.caseSensitive===!0,childrenIndex:a,route:i};c.relativePath.startsWith("/")&&(tt(c.relativePath.startsWith(n),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+n+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(n.length));let d=Qn([n,c.relativePath]),f=r.concat(c);i.children&&i.children.length>0&&(tt(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+d+'".')),Qk(i.children,t,f,d)),!(i.path==null&&!i.index)&&t.push({path:d,score:wN(d,i.index),routesMeta:f})};return e.forEach((i,a)=>{var l;if(i.path===""||!((l=i.path)!=null&&l.includes("?")))o(i,a);else for(let c of Jk(i.path))o(i,a,c)}),t}function Jk(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,o=r.endsWith("?"),i=r.replace(/\?$/,"");if(n.length===0)return o?[i,""]:[i];let a=Jk(n.join("/")),l=[];return l.push(...a.map(c=>c===""?i:[i,c].join("/"))),o&&l.push(...a),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function hN(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:kN(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}const mN=/^:[\w-]+$/,gN=3,vN=2,bN=1,xN=10,yN=-2,yv=e=>e==="*";function wN(e,t){let r=e.split("/"),n=r.length;return r.some(yv)&&(n+=yN),t&&(n+=vN),r.filter(o=>!yv(o)).reduce((o,i)=>o+(mN.test(i)?gN:i===""?bN:xN),n)}function kN(e,t){return e.length===t.length&&e.slice(0,-1).every((n,o)=>n===t[o])?e[e.length-1]-t[t.length-1]:0}function SN(e,t,r){let{routesMeta:n}=e,o={},i="/",a=[];for(let l=0;l<n.length;++l){let c=n[l],d=l===n.length-1,f=i==="/"?t:t.slice(i.length)||"/",p=jN({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},f),h=c.route;if(!p)return null;Object.assign(o,p.params),a.push({params:o,pathname:Qn([i,p.pathname]),pathnameBase:TN(Qn([i,p.pathnameBase])),route:h}),p.pathnameBase!=="/"&&(i=Qn([i,p.pathnameBase]))}return a}function jN(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=$N(e.path,e.caseSensitive,e.end),o=t.match(r);if(!o)return null;let i=o[0],a=i.replace(/(.)\/+$/,"$1"),l=o.slice(1);return{params:n.reduce((d,f,p)=>{let{paramName:h,isOptional:y}=f;if(h==="*"){let v=l[p]||"";a=i.slice(0,i.length-v.length).replace(/(.)\/+$/,"$1")}const m=l[p];return y&&!m?d[h]=void 0:d[h]=(m||"").replace(/%2F/g,"/"),d},{}),pathname:i,pathnameBase:a,pattern:e}}function $N(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!0),Em(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let n=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,l,c)=>(n.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),n]}function CN(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Em(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function Bm(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}const _N=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,zN=e=>_N.test(e);function EN(e,t){t===void 0&&(t="/");let{pathname:r,search:n="",hash:o=""}=typeof e=="string"?ss(e):e,i;if(r)if(zN(r))i=r;else{if(r.includes("//")){let a=r;r=r.replace(/\/\/+/g,"/"),Em(!1,"Pathnames cannot have embedded double slashes - normalizing "+(a+" -> "+r))}r.startsWith("/")?i=wv(r.substring(1),"/"):i=wv(r,t)}else i=t;return{pathname:i,search:PN(n),hash:NN(o)}}function wv(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?r.length>1&&r.pop():o!=="."&&r.push(o)}),r.length>1?r.join("/"):"/"}function tf(e,t,r,n){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(n)+"].  Please separate it out to the ")+("`to."+r+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function BN(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function Tm(e,t){let r=BN(e);return t?r.map((n,o)=>o===r.length-1?n.pathname:n.pathnameBase):r.map(n=>n.pathnameBase)}function Pm(e,t,r,n){n===void 0&&(n=!1);let o;typeof e=="string"?o=ss(e):(o=Na({},e),tt(!o.pathname||!o.pathname.includes("?"),tf("?","pathname","search",o)),tt(!o.pathname||!o.pathname.includes("#"),tf("#","pathname","hash",o)),tt(!o.search||!o.search.includes("#"),tf("#","search","hash",o)));let i=e===""||o.pathname==="",a=i?"/":o.pathname,l;if(a==null)l=r;else{let p=t.length-1;if(!n&&a.startsWith("..")){let h=a.split("/");for(;h[0]==="..";)h.shift(),p-=1;o.pathname=h.join("/")}l=p>=0?t[p]:"/"}let c=EN(o,l),d=a&&a!=="/"&&a.endsWith("/"),f=(i||a===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(d||f)&&(c.pathname+="/"),c}const Qn=e=>e.join("/").replace(/\/\/+/g,"/"),TN=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),PN=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,NN=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function FN(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Zk=["post","put","patch","delete"];new Set(Zk);const RN=["get",...Zk];new Set(RN);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Fa(){return Fa=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Fa.apply(this,arguments)}const Nm=x.createContext(null),AN=x.createContext(null),lo=x.createContext(null),Kd=x.createContext(null),jn=x.createContext({outlet:null,matches:[],isDataRoute:!1}),eS=x.createContext(null);function IN(e,t){let{relative:r}=t===void 0?{}:t;as()||tt(!1);let{basename:n,navigator:o}=x.useContext(lo),{hash:i,pathname:a,search:l}=rS(e,{relative:r}),c=a;return n!=="/"&&(c=a==="/"?n:Qn([n,a])),o.createHref({pathname:c,search:l,hash:i})}function as(){return x.useContext(Kd)!=null}function Ko(){return as()||tt(!1),x.useContext(Kd).location}function tS(e){x.useContext(lo).static||x.useLayoutEffect(e)}function dr(){let{isDataRoute:e}=x.useContext(jn);return e?QN():ON()}function ON(){as()||tt(!1);let e=x.useContext(Nm),{basename:t,future:r,navigator:n}=x.useContext(lo),{matches:o}=x.useContext(jn),{pathname:i}=Ko(),a=JSON.stringify(Tm(o,r.v7_relativeSplatPath)),l=x.useRef(!1);return tS(()=>{l.current=!0}),x.useCallback(function(d,f){if(f===void 0&&(f={}),!l.current)return;if(typeof d=="number"){n.go(d);return}let p=Pm(d,JSON.parse(a),i,f.relative==="path");e==null&&t!=="/"&&(p.pathname=p.pathname==="/"?t:Qn([t,p.pathname])),(f.replace?n.replace:n.push)(p,f.state,f)},[t,n,a,i,e])}function qN(){let{matches:e}=x.useContext(jn),t=e[e.length-1];return t?t.params:{}}function rS(e,t){let{relative:r}=t===void 0?{}:t,{future:n}=x.useContext(lo),{matches:o}=x.useContext(jn),{pathname:i}=Ko(),a=JSON.stringify(Tm(o,n.v7_relativeSplatPath));return x.useMemo(()=>Pm(e,JSON.parse(a),i,r==="path"),[e,a,i,r])}function MN(e,t){return LN(e,t)}function LN(e,t,r,n){as()||tt(!1);let{navigator:o}=x.useContext(lo),{matches:i}=x.useContext(jn),a=i[i.length-1],l=a?a.params:{};a&&a.pathname;let c=a?a.pathnameBase:"/";a&&a.route;let d=Ko(),f;if(t){var p;let $=typeof t=="string"?ss(t):t;c==="/"||(p=$.pathname)!=null&&p.startsWith(c)||tt(!1),f=$}else f=d;let h=f.pathname||"/",y=h;if(c!=="/"){let $=c.replace(/^\//,"").split("/");y="/"+h.replace(/^\//,"").split("/").slice($.length).join("/")}let m=fN(e,{pathname:y}),v=VN(m&&m.map($=>Object.assign({},$,{params:Object.assign({},l,$.params),pathname:Qn([c,o.encodeLocation?o.encodeLocation($.pathname).pathname:$.pathname]),pathnameBase:$.pathnameBase==="/"?c:Qn([c,o.encodeLocation?o.encodeLocation($.pathnameBase).pathname:$.pathnameBase])})),i,r,n);return t&&v?x.createElement(Kd.Provider,{value:{location:Fa({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:Mn.Pop}},v):v}function DN(){let e=XN(),t=FN(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,o={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return x.createElement(x.Fragment,null,x.createElement("h2",null,"Unexpected Application Error!"),x.createElement("h3",{style:{fontStyle:"italic"}},t),r?x.createElement("pre",{style:o},r):null,null)}const WN=x.createElement(DN,null);class HN extends x.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,r){return r.location!==t.location||r.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:r.error,location:r.location,revalidation:t.revalidation||r.revalidation}}componentDidCatch(t,r){console.error("React Router caught the following error during render",t,r)}render(){return this.state.error!==void 0?x.createElement(jn.Provider,{value:this.props.routeContext},x.createElement(eS.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function UN(e){let{routeContext:t,match:r,children:n}=e,o=x.useContext(Nm);return o&&o.static&&o.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=r.route.id),x.createElement(jn.Provider,{value:t},n)}function VN(e,t,r,n){var o;if(t===void 0&&(t=[]),r===void 0&&(r=null),n===void 0&&(n=null),e==null){var i;if(!r)return null;if(r.errors)e=r.matches;else if((i=n)!=null&&i.v7_partialHydration&&t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let a=e,l=(o=r)==null?void 0:o.errors;if(l!=null){let f=a.findIndex(p=>p.route.id&&(l==null?void 0:l[p.route.id])!==void 0);f>=0||tt(!1),a=a.slice(0,Math.min(a.length,f+1))}let c=!1,d=-1;if(r&&n&&n.v7_partialHydration)for(let f=0;f<a.length;f++){let p=a[f];if((p.route.HydrateFallback||p.route.hydrateFallbackElement)&&(d=f),p.route.id){let{loaderData:h,errors:y}=r,m=p.route.loader&&h[p.route.id]===void 0&&(!y||y[p.route.id]===void 0);if(p.route.lazy||m){c=!0,d>=0?a=a.slice(0,d+1):a=[a[0]];break}}}return a.reduceRight((f,p,h)=>{let y,m=!1,v=null,$=null;r&&(y=l&&p.route.id?l[p.route.id]:void 0,v=p.route.errorElement||WN,c&&(d<0&&h===0?(JN("route-fallback"),m=!0,$=null):d===h&&(m=!0,$=p.route.hydrateFallbackElement||null)));let S=t.concat(a.slice(0,h+1)),j=()=>{let k;return y?k=v:m?k=$:p.route.Component?k=x.createElement(p.route.Component,null):p.route.element?k=p.route.element:k=f,x.createElement(UN,{match:p,routeContext:{outlet:f,matches:S,isDataRoute:r!=null},children:k})};return r&&(p.route.ErrorBoundary||p.route.errorElement||h===0)?x.createElement(HN,{location:r.location,revalidation:r.revalidation,component:v,error:y,children:j(),routeContext:{outlet:null,matches:S,isDataRoute:!0}}):j()},null)}var nS=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(nS||{}),oS=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(oS||{});function GN(e){let t=x.useContext(Nm);return t||tt(!1),t}function KN(e){let t=x.useContext(AN);return t||tt(!1),t}function YN(e){let t=x.useContext(jn);return t||tt(!1),t}function iS(e){let t=YN(),r=t.matches[t.matches.length-1];return r.route.id||tt(!1),r.route.id}function XN(){var e;let t=x.useContext(eS),r=KN(),n=iS();return t!==void 0?t:(e=r.errors)==null?void 0:e[n]}function QN(){let{router:e}=GN(nS.UseNavigateStable),t=iS(oS.UseNavigateStable),r=x.useRef(!1);return tS(()=>{r.current=!0}),x.useCallback(function(o,i){i===void 0&&(i={}),r.current&&(typeof o=="number"?e.navigate(o):e.navigate(o,Fa({fromRouteId:t},i)))},[e,t])}const kv={};function JN(e,t,r){kv[e]||(kv[e]=!0)}function ZN(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function Kp(e){let{to:t,replace:r,state:n,relative:o}=e;as()||tt(!1);let{future:i,static:a}=x.useContext(lo),{matches:l}=x.useContext(jn),{pathname:c}=Ko(),d=dr(),f=Pm(t,Tm(l,i.v7_relativeSplatPath),c,o==="path"),p=JSON.stringify(f);return x.useEffect(()=>d(JSON.parse(p),{replace:r,state:n,relative:o}),[d,p,o,r,n]),null}function hr(e){tt(!1)}function eF(e){let{basename:t="/",children:r=null,location:n,navigationType:o=Mn.Pop,navigator:i,static:a=!1,future:l}=e;as()&&tt(!1);let c=t.replace(/^\/*/,"/"),d=x.useMemo(()=>({basename:c,navigator:i,static:a,future:Fa({v7_relativeSplatPath:!1},l)}),[c,l,i,a]);typeof n=="string"&&(n=ss(n));let{pathname:f="/",search:p="",hash:h="",state:y=null,key:m="default"}=n,v=x.useMemo(()=>{let $=Bm(f,c);return $==null?null:{location:{pathname:$,search:p,hash:h,state:y,key:m},navigationType:o}},[c,f,p,h,y,m,o]);return v==null?null:x.createElement(lo.Provider,{value:d},x.createElement(Kd.Provider,{children:r,value:v}))}function tF(e){let{children:t,location:r}=e;return MN(Yp(t),r)}new Promise(()=>{});function Yp(e,t){t===void 0&&(t=[]);let r=[];return x.Children.forEach(e,(n,o)=>{if(!x.isValidElement(n))return;let i=[...t,o];if(n.type===x.Fragment){r.push.apply(r,Yp(n.props.children,i));return}n.type!==hr&&tt(!1),!n.props.index||!n.props.children||tt(!1);let a={id:n.props.id||i.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(a.children=Yp(n.props.children,i)),r.push(a)}),r}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Xp(){return Xp=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Xp.apply(this,arguments)}function rF(e,t){if(e==null)return{};var r={},n=Object.keys(e),o,i;for(i=0;i<n.length;i++)o=n[i],!(t.indexOf(o)>=0)&&(r[o]=e[o]);return r}function nF(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function oF(e,t){return e.button===0&&(!t||t==="_self")&&!nF(e)}function Qp(e){return e===void 0&&(e=""),new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,r)=>{let n=e[r];return t.concat(Array.isArray(n)?n.map(o=>[r,o]):[[r,n]])},[]))}function iF(e,t){let r=Qp(e);return t&&t.forEach((n,o)=>{r.has(o)||t.getAll(o).forEach(i=>{r.append(o,i)})}),r}const sF=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],aF="6";try{window.__reactRouterVersion=aF}catch{}const lF="startTransition",Sv=la[lF];function cF(e){let{basename:t,children:r,future:n,window:o}=e,i=x.useRef();i.current==null&&(i.current=cN({window:o,v5Compat:!0}));let a=i.current,[l,c]=x.useState({action:a.action,location:a.location}),{v7_startTransition:d}=n||{},f=x.useCallback(p=>{d&&Sv?Sv(()=>c(p)):c(p)},[c,d]);return x.useLayoutEffect(()=>a.listen(f),[a,f]),x.useEffect(()=>ZN(n),[n]),x.createElement(eF,{basename:t,children:r,location:l.location,navigationType:l.action,navigator:a,future:n})}const dF=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",uF=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,ro=x.forwardRef(function(t,r){let{onClick:n,relative:o,reloadDocument:i,replace:a,state:l,target:c,to:d,preventScrollReset:f,viewTransition:p}=t,h=rF(t,sF),{basename:y}=x.useContext(lo),m,v=!1;if(typeof d=="string"&&uF.test(d)&&(m=d,dF))try{let k=new URL(window.location.href),w=d.startsWith("//")?new URL(k.protocol+d):new URL(d),_=Bm(w.pathname,y);w.origin===k.origin&&_!=null?d=_+w.search+w.hash:v=!0}catch{}let $=IN(d,{relative:o}),S=fF(d,{replace:a,state:l,target:c,preventScrollReset:f,relative:o,viewTransition:p});function j(k){n&&n(k),k.defaultPrevented||S(k)}return x.createElement("a",Xp({},h,{href:m||$,onClick:v||i?n:j,ref:r,target:c}))});var jv;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(jv||(jv={}));var $v;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})($v||($v={}));function fF(e,t){let{target:r,replace:n,state:o,preventScrollReset:i,relative:a,viewTransition:l}=t===void 0?{}:t,c=dr(),d=Ko(),f=rS(e,{relative:a});return x.useCallback(p=>{if(oF(p,r)){p.preventDefault();let h=n!==void 0?n:sd(d)===sd(f);c(e,{replace:h,state:o,preventScrollReset:i,relative:a,viewTransition:l})}},[d,c,f,n,o,r,e,i,a,l])}function pF(e){let t=x.useRef(Qp(e)),r=x.useRef(!1),n=Ko(),o=x.useMemo(()=>iF(n.search,r.current?null:t.current),[n.search]),i=dr(),a=x.useCallback((l,c)=>{const d=Qp(typeof l=="function"?l(o):l);r.current=!0,i("?"+d,c)},[i,o]);return[o,a]}const _r=()=>v$(),wt=y$,sS=g.div`
  position: relative;
  display: flex;
  align-items: center;
`,aS=g.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${C.fontSize.xl};
  color: ${b.neutral[700]};
  padding: ${u[2]};
  transition: all ${ye.fast};
  border-radius: ${J.md};
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;

  &:hover {
    background: ${b.neutral[100]};
    color: ${b.primary.main};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  ${O.mobile} {
    font-size: ${C.fontSize.lg};
    min-width: 40px;
    min-height: 40px;
  }
`,lS=g.div`
  position: absolute;
  top: calc(100% + ${u[2]});
  right: 0;
  background: ${b.neutral[0]};
  border: 1px solid ${b.neutral[200]};
  border-radius: ${J.md};
  box-shadow: ${ze.lg};
  min-width: 240px;
  z-index: 1000;
  animation: slideDown ${ye.base};
  display: ${e=>e.$isOpen?"block":"none"};

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${O.mobile} {
    right: -${u[3]};
    min-width: 200px;
  }
`,Jp=g(ro)`
  display: flex;
  align-items: center;
  gap: ${u[2]};
  padding: ${u[3]} ${u[4]};
  color: ${b.neutral[700]};
  text-decoration: none;
  border-bottom: 1px solid ${b.neutral[100]};
  transition: all ${ye.fast};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${b.neutral[50]};
    color: ${b.primary.main};
  }

  ${O.mobile} {
    padding: ${u[2]} ${u[3]};
    font-size: ${C.fontSize.sm};
  }
`,hF=g.button`
  display: flex;
  align-items: center;
  gap: ${u[2]};
  width: 100%;
  padding: ${u[3]} ${u[4]};
  background: none;
  border: none;
  color: ${b.neutral[700]};
  font-family: ${C.fontFamily.base};
  font-size: ${C.fontSize.base};
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid ${b.neutral[100]};
  transition: all ${ye.fast};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${b.neutral[50]};
    color: ${b.primary.main};
  }

  ${O.mobile} {
    padding: ${u[2]} ${u[3]};
    font-size: ${C.fontSize.sm};
  }
`,mF=g.div`
  height: 1px;
  background: ${b.neutral[100]};
  margin: ${u[2]} 0;
`,gF=g.div`
  padding: ${u[3]} ${u[4]};
  font-weight: ${C.fontWeight.semibold};
  color: ${b.neutral[900]};
  border-bottom: 1px solid ${b.neutral[100]};
  font-size: ${C.fontSize.sm};
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${O.mobile} {
    padding: ${u[2]} ${u[3]};
    flex-direction: column;
    align-items: flex-start;
    gap: ${u[2]};
  }
`;g.span`
  background: ${b.primary.main};
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: ${C.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
`;const vF=({userName:e})=>{const[t,r]=x.useState(!1),n=x.useRef(null),o=dr(),i=_r(),{user:a}=wt(l=>l.auth);return x.useEffect(()=>{const l=c=>{n.current&&!n.current.contains(c.target)&&r(!1)};return document.addEventListener("mousedown",l),()=>document.removeEventListener("mousedown",l)},[]),s.jsxs(sS,{ref:n,children:[s.jsx(aS,{onClick:()=>r(!t),title:"Settings",children:s.jsx(hw,{})}),s.jsxs(lS,{$isOpen:t,children:[e&&s.jsxs(s.Fragment,{children:[s.jsx(gF,{children:s.jsxs("span",{children:["Hi, ",e,(a==null?void 0:a.role)==="admin"&&" (admin)"]})}),s.jsx(mF,{})]}),s.jsx(Jp,{as:ro,to:"/account",children:"👤 Account"}),(a==null?void 0:a.role)==="admin"&&s.jsx(Jp,{as:ro,to:"/admin/dashboard",children:"🔧 Admin Dashboard"}),s.jsx(hF,{onClick:()=>{i(Bk()),r(!1),o("/")},children:"🚪 Logout"})]})]})},bF=()=>{const[e,t]=x.useState(!1),r=x.useRef(null);return x.useEffect(()=>{const n=o=>{r.current&&!r.current.contains(o.target)&&t(!1)};return document.addEventListener("mousedown",n),()=>document.removeEventListener("mousedown",n)},[]),s.jsxs(sS,{ref:r,children:[s.jsx(aS,{onClick:()=>t(!e),title:"Settings",children:s.jsx(hw,{})}),s.jsx(lS,{$isOpen:e,children:s.jsx(Jp,{as:ro,to:"/login",children:"🔐 Login"})})]})},cS=Ie.createContext(null),dS=()=>x.useContext(cS),xF=g.header`
  background: var(--color-bg-primary, ${b.neutral[0]});
  backdrop-filter: blur(12px);
  padding: ${u[3]} ${u[6]};
  display: flex;
  align-items: center;
  gap: ${u[4]};
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid var(--color-neutral-200, ${b.neutral[200]});
  box-shadow: ${ze.sm};
  flex-wrap: nowrap;
  color: var(--color-text-primary, ${b.neutral[900]});
  transition: all 0.3s ease;

  ${O.tablet} {
    padding: ${u[2]} ${u[4]};
    gap: ${u[3]};
  }

  ${O.mobile} {
    padding: ${u[2]} ${u[3]};
    gap: ${u[2]};
    flex-wrap: wrap;
    justify-content: space-between;
  }
`,yF=g.div`
  display: flex;
  align-items: center;
  gap: ${u[3]};
  flex-shrink: 0;

  ${O.mobile} {
    gap: ${u[1]};
  }
`;g.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;

  ${O.mobile} {
    order: 10;
    flex-basis: 100%;
  }
`;const wF=g.nav`
  display: flex;
  align-items: center;
  gap: ${u[3]};
  flex-shrink: 0;

  ${O.tablet} {
    gap: ${u[2]};
  }

  ${O.mobile} {
    gap: ${u[1]};
  }
`,zl=g(ro)`
  text-decoration: none;
  color: ${e=>e.$isActive?b.primary.main:b.neutral[700]};
  font-weight: ${e=>e.$isActive?"600":"500"};
  font-size: ${C.fontSize.sm};
  padding: ${u[2]} ${u[3]};
  border-radius: ${J.md};
  transition: all ${ye.fast};
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  height: 36px;

  &:hover {
    background: var(--color-neutral-100, ${b.neutral[100]});
    color: var(--color-primary, ${b.primary.main});
  }

  ${O.tablet} {
    padding: ${u[1]} ${u[2]};
    font-size: ${C.fontSize.xs};
    height: 32px;
  }

  ${O.mobile} {
    padding: ${u[1]};
    font-size: 0.75rem;
    height: 28px;
  }
`,kF=g.div`
  display: flex;
  align-items: center;
  gap: ${u[2]};
  flex-shrink: 0;

  ${O.mobile} {
    gap: ${u[2]};
  }
`,SF=g(ro)`
  text-decoration: none;
  font-weight: ${C.fontWeight.extrabold};
  font-size: ${C.fontSize.xl};
  color: var(--color-text-primary, ${b.neutral[900]});
  display: flex;
  align-items: center;
  gap: ${u[1]};
  transition: all ${ye.fast};
  white-space: nowrap;

  &:hover {
    transform: scale(1.05);
    color: var(--color-primary, ${b.primary.main});
  }

  ${O.mobile} {
    font-size: ${C.fontSize.lg};
  }
`,jF=g.span`
  display: inline-flex;
  align-items: center;
  background: var(--color-primary, ${b.primary.main});
  color: white;
  font-size: ${C.fontSize.xs};
  font-weight: ${C.fontWeight.bold};
  padding: 2px 8px;
  border-radius: ${J.full};
  margin-left: ${u[2]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  vertical-align: middle;
  line-height: 1.4;

  ${O.mobile} {
    font-size: 9px;
    padding: 1px 6px;
    margin-left: ${u[1]};
  }
`,$F=g.button`
  background: ${e=>e.$active?`var(--color-primary, ${b.primary.main})`:"none"};
  border: none;
  cursor: pointer;
  font-size: ${C.fontSize["2xl"]};
  color: ${e=>e.$active?`var(--color-neutral-0, ${b.neutral[0]})`:`var(--color-text-primary, ${b.neutral[700]})`};
  padding: ${u[2]};
  transition: all ${ye.fast};
  border-radius: ${J.md};
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;

  &:hover {
    background: ${e=>e.$active?`var(--color-primary-dark, ${b.primary.dark})`:`var(--color-neutral-100, ${b.neutral[100]})`};
    color: ${e=>e.$active?`var(--color-neutral-0, ${b.neutral[0]})`:`var(--color-primary, ${b.primary.main})`};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`,CF=g.div`
  width: 1px;
  height: 20px;
  background: var(--color-neutral-300, ${b.neutral[300]});
  margin: 0 ${u[1]};
  align-self: center;

  ${O.mobile} {
    display: none;
  }
`,_F=()=>{var c;const e=Ko(),t=wt(d=>d.auth.user),r=dS(),[n,o]=x.useState("Store");x.useEffect(()=>{be.getSiteSettings().then(d=>{d!=null&&d.businessName&&o(d.businessName)}).catch(()=>{})},[]);const i=e.pathname==="/",a=e.pathname==="/catalog",l=e.pathname.startsWith("/admin");return s.jsx(s.Fragment,{children:s.jsxs(xF,{children:[s.jsxs(yF,{children:[a&&!l&&s.jsx($F,{onClick:()=>r==null?void 0:r.toggleFilters(),title:r!=null&&r.showFilters?"Close filters":"Open filters",$active:r==null?void 0:r.showFilters,children:"☰"}),s.jsxs(SF,{to:"/",children:["🛍 ",n,l?s.jsx(jF,{children:"ADMIN"}):""]})]}),s.jsx("div",{style:{flex:1}}),s.jsxs(kF,{children:[!l&&s.jsxs(s.Fragment,{children:[s.jsxs(wF,{children:[s.jsx(zl,{to:"/",$isActive:i,children:"Home"}),s.jsx(zl,{to:"/catalog",$isActive:a,children:"Catalog"}),s.jsx(zl,{to:"/about",$isActive:e.pathname==="/about",children:"About"}),s.jsx(zl,{to:"/contact",$isActive:e.pathname==="/contact",children:"Contact"})]}),s.jsx(CF,{})]}),t?s.jsx(vF,{userName:t.name||((c=t.email)==null?void 0:c.split("@")[0])}):s.jsx(bF,{})]})]})})},zF=g.div`
  padding: 2rem;
  margin: 1rem;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  text-align: center;
`,EF=g.h2`
  color: #d32f2f;
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
`,BF=g.p`
  color: #c62828;
  margin: 0.5rem 0;
  font-size: 0.95rem;
`,TF=g.pre`
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.85rem;
  color: #d32f2f;
  text-align: left;
  margin: 1rem 0;
`,PF=g.button`
  background-color: #1976d2;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1565c0;
  }

  &:active {
    background-color: #0d47a1;
  }
`;class pr extends Ie.Component{constructor(r){super(r);$n(this,"retry",()=>{this.setState({hasError:!1,error:null})});this.state={hasError:!1,error:null}}static getDerivedStateFromError(r){return{hasError:!0,error:r}}componentDidCatch(r,n){var o,i;console.error("Error caught by boundary:",r,n),(i=(o=this.props).onError)==null||i.call(o,r,n)}render(){return this.state.hasError&&this.state.error?this.props.fallback?this.props.fallback(this.state.error,this.retry):s.jsxs(zF,{children:[s.jsx(EF,{children:"Something went wrong"}),s.jsx(BF,{children:"We encountered an error. Please try again later or refresh the page."}),s.jsx(TF,{children:this.state.error.toString()}),s.jsx(PF,{onClick:this.retry,children:"Retry"})]}):this.props.children}}const uS=x.createContext(void 0),NF=({children:e})=>{const[t,r]=x.useState("light"),[n,o]=x.useState("blue");x.useEffect(()=>{const l=localStorage.getItem("app-theme-mode"),c=localStorage.getItem("app-accent-color");l&&r(l),c&&o(c),be.getSiteSettings().then(d=>{const f=d.themeMode||"light",p=d.accentColor||"blue";r(f),o(p),localStorage.setItem("app-theme-mode",f),localStorage.setItem("app-accent-color",p)}).catch(()=>{})},[]),x.useEffect(()=>{t==="dark"?document.body.classList.add("dark"):document.body.classList.remove("dark")},[t]);const i=l=>{r(l),localStorage.setItem("app-theme-mode",l)},a=l=>{o(l),localStorage.setItem("app-accent-color",l)};return s.jsx(uS.Provider,{value:{mode:t,accentColor:n,setMode:i,setAccentColor:a},children:e})},fS=()=>{const e=x.useContext(uS);if(!e)throw new Error("useTheme must be used within ThemeProvider");return e},FF={blue:{main:"#0066ff",light:"#3385ff",lighter:"#e6f0ff",dark:"#0052cc",darker:"#003d99"},orange:{main:"#ff6b35",light:"#ff8c5f",lighter:"#fff4ee",dark:"#e65100",darker:"#b83d00"},purple:{main:"#8b5cf6",light:"#a78bfa",lighter:"#ede9fe",dark:"#7c3aed",darker:"#6d28d9"},green:{main:"#10b981",light:"#34d399",lighter:"#ecfdf5",dark:"#059669",darker:"#047857"},red:{main:"#ef4444",light:"#f87171",lighter:"#fee2e2",dark:"#dc2626",darker:"#b91c1c"}},RF={0:"#ffffff",50:"#f9fafb",100:"#f3f4f6",200:"#e5e7eb",300:"#d1d5db",400:"#9ca3af",500:"#6b7280",600:"#4b5563",700:"#374151",800:"#1f2937",900:"#111827"},AF={0:"#0f0f0f",50:"#1a1a1a",100:"#262626",200:"#404040",300:"#525252",400:"#737373",500:"#a3a3a3",600:"#d4d4d8",700:"#e4e4e7",800:"#f4f4f5",900:"#fafafa"},Ft=(e,t)=>{const r=FF[t],n=e==="light"?RF:AF;return{primary:r,secondary:{main:"#ff6b35",light:"#ff8c5f",lighter:e==="light"?"#fff4ee":"#3d2415",dark:"#e65100"},success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#06b6d4",neutral:n,background:{primary:e==="light"?n[0]:n[50],secondary:e==="light"?n[50]:n[100],tertiary:e==="light"?n[100]:n[200]},text:{primary:e==="light"?n[900]:n[50],secondary:e==="light"?n[700]:n[200],tertiary:e==="light"?n[500]:n[400]}}},IF=g.div`
  /* CSS Variables for Theme */
  --color-primary: ${e=>Ft(e.$mode,e.$accentColor).primary.main};
  --color-primary-light: ${e=>Ft(e.$mode,e.$accentColor).primary.light};
  --color-primary-lighter: ${e=>Ft(e.$mode,e.$accentColor).primary.lighter};
  --color-primary-dark: ${e=>Ft(e.$mode,e.$accentColor).primary.dark};

  --color-bg-primary: ${e=>Ft(e.$mode,e.$accentColor).background.primary};
  --color-bg-secondary: ${e=>Ft(e.$mode,e.$accentColor).background.secondary};
  --color-bg-tertiary: ${e=>Ft(e.$mode,e.$accentColor).background.tertiary};

  --color-text-primary: ${e=>Ft(e.$mode,e.$accentColor).text.primary};
  --color-text-secondary: ${e=>Ft(e.$mode,e.$accentColor).text.secondary};
  --color-text-tertiary: ${e=>Ft(e.$mode,e.$accentColor).text.tertiary};

  --color-neutral-0: ${e=>Ft(e.$mode,e.$accentColor).neutral[0]};
  --color-neutral-50: ${e=>Ft(e.$mode,e.$accentColor).neutral[50]};
  --color-neutral-100: ${e=>Ft(e.$mode,e.$accentColor).neutral[100]};
  --color-neutral-200: ${e=>Ft(e.$mode,e.$accentColor).neutral[200]};
  --color-neutral-300: ${e=>Ft(e.$mode,e.$accentColor).neutral[300]};

  transition: background-color 0.3s ease, color 0.3s ease;
`,OF=({children:e})=>{const{mode:t,accentColor:r}=fS();return s.jsx(IF,{$mode:t,$accentColor:r,children:e})},qF=({children:e,requiredRole:t="user"})=>{const{token:r,user:n}=wt(o=>o.auth);return r?t==="admin"&&(n==null?void 0:n.role)!=="admin"?s.jsx(Kp,{to:"/",replace:!0}):s.jsx(s.Fragment,{children:e}):s.jsx(Kp,{to:"/login",replace:!0})},MF=g.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 16px 24px;
  border-radius: 8px;
  background: ${e=>{switch(e.type){case"success":return"#10b981";case"error":return"#ef4444";case"info":return"#3b82f6";default:return"#333"}}};
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 14px;
  z-index: 1000;
  animation: slideIn 0.3s ease-in-out;

  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (max-width: 640px) {
    bottom: 16px;
    right: 16px;
    left: 16px;
  }
`,pS=({message:e,type:t,duration:r=3e3})=>{const[n,o]=x.useState(!0);return x.useEffect(()=>{const i=setTimeout(()=>{o(!1)},r);return()=>clearTimeout(i)},[r]),n?s.jsx(MF,{type:t,children:e}):null},hS=g.div`
  display: flex;
  gap: 4px;
  align-items: center;
`,mS=g.span`
  color: ${e=>e.filled?"#ffc107":"#e0e0e0"};
  font-size: ${e=>e.$size||"16px"};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`,gS=g.span`
  font-size: 14px;
  color: #666;
  margin-left: 8px;
`,Fm=({rating:e=0,count:t,size:r="16px",showText:n=!0})=>{const o=Array.from({length:5},(a,l)=>l+1),i=e||0;return s.jsxs(hS,{children:[o.map(a=>s.jsx(mS,{filled:a<=Math.round(i),$size:r,children:"★"},a)),n&&s.jsxs(gS,{children:[i.toFixed(1)," ",t&&`(${t})`]})]})},vS=({value:e,onChange:t,size:r="24px"})=>{const n=Array.from({length:5},(o,i)=>i+1);return s.jsxs(hS,{children:[n.map(o=>s.jsx(mS,{filled:o<=e,$size:r,onClick:()=>t(o),style:{cursor:"pointer"},children:"★"},o)),s.jsxs(gS,{children:[e,"/5"]})]})},no=e=>{if(!e||typeof e!="string")return"";if(e=e.trim(),!e.includes("drive.google.com")&&!e.includes("googleusercontent.com")||e.includes("lh3.googleusercontent.com/d/"))return e;let t="";const r=e.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);if(r&&(t=r[1]),!t){const n=e.match(/[?&]id=([a-zA-Z0-9_-]+)/);n&&(t=n[1])}if(!t){const n=e.match(/uc\?.*id=([a-zA-Z0-9_-]+)/);n&&(t=n[1])}return t?`https://lh3.googleusercontent.com/d/${t}`:(console.warn("⚠️ Could not extract Google Drive file ID from URL:",e),e)},bS=g(Lw)`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  transition: all ${ye.base};
  cursor: pointer;
  height: 100%;
  border: 1px solid var(--color-neutral-200, #f0f0f0);
  overflow: hidden;
  border-radius: 6px;
  background: var(--color-neutral-0, ${b.neutral[0]});
  color: var(--color-text-primary, ${b.neutral[900]});

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
    border-color: var(--color-neutral-200, ${b.neutral[200]});
  }

  &:active {
    box-shadow: ${ze.md};
  }
  /* allow the card to shrink inside grid/flex containers on small screens */
  min-width: 0;
  box-sizing: border-box;
`,LF=g.div`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-secondary, #fafafa);
  overflow: hidden;
  position: relative;
  transition: background-color 0.3s ease;
`,DF=g.div`
  position: absolute;
  top: ${u[2]};
  right: ${u[2]};
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border-radius: ${J.md};
  padding: ${u[1]} ${u[2]};
  font-size: ${C.fontSize.xs};
  font-weight: ${C.fontWeight.semibold};
  z-index: 10;
`,Cv=g.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  padding: ${u[3]};
  transition: transform ${ye.base};

  ${bS}:hover & {
    transform: scale(1.08);
  }
  box-sizing: border-box;

  ${O.mobile} {
    padding: ${u[1]};
  }
`,WF=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[2]};
  flex: 1;
  padding: ${u[4]} ${u[3]};
  box-sizing: border-box;

  ${O.mobile} {
    padding: ${u[2]} ${u[2]};
  }
`,HF=g.h3`
  cursor: pointer;
  transition: color ${ye.fast};
  color: ${b.neutral[900]};
  font-weight: ${C.fontWeight.medium};
  line-height: ${C.lineHeight.tight};
  font-size: ${C.fontSize.sm};
  margin: 0;

  &:hover {
    color: ${b.primary.main};
  }

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${O.mobile} {
    font-size: ${C.fontSize.xs};
  }
`,UF=g.div`
  font-size: ${C.fontSize.xs};
  color: ${b.neutral[500]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: ${C.fontWeight.semibold};
  margin-bottom: ${u[1]};
`,VF=g.p`
  font-size: ${C.fontSize.xs};
  color: ${b.neutral[500]};
  margin: ${u[2]} 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,GF=g.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: ${u[1]};
`,El=g.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 3px;
  background: ${b.neutral[100]};
  color: ${b.neutral[600]};
  font-weight: ${C.fontWeight.medium};
  white-space: nowrap;
`,KF=g.div`
  font-weight: ${C.fontWeight.semibold};
  font-size: ${C.fontSize.sm};
  color: ${b.primary.main};
`,YF=g.div`
  display: flex;
  align-items: center;
  gap: ${u[3]};
`,XF=g.div`
  display: flex;
  align-items: baseline;
  gap: ${u[2]};
`,QF=g.div`
  font-weight: ${C.fontWeight.bold};
  font-size: ${C.fontSize.xl};
  color: ${b.secondary.main};
`,JF=g.span`
  font-weight: ${C.fontWeight.normal};
  color: ${b.neutral[500]};
  text-decoration: line-through;
  font-size: ${C.fontSize.sm};
`,ZF=g(ne)`
  width: 100%;
  padding: ${u[2]} ${u[3]} !important;
  background: ${b.secondary.main} !important;
  color: ${b.neutral[900]} !important;
  border: none !important;
  border-radius: ${J.md} !important;
  font-weight: ${C.fontWeight.semibold} !important;
  font-size: ${C.fontSize.sm} !important;
  transition: all ${ye.fast} !important;
  cursor: pointer;
  margin-top: auto;

  &:hover {
    background: #ff9500 !important;
    box-shadow: ${ze.md};
  }

  &:active {
    background: #e68900 !important;
    transform: scale(0.98);
  }

  ${O.mobile} {
    padding: ${u[2]} ${u[2]} !important;
    font-size: ${C.fontSize.xs} !important;
  }
`,e8=g(ne)`
  width: 100%;
  padding: ${u[2]} ${u[3]} !important;
  background: ${b.neutral[300]} !important;
  color: ${b.neutral[600]} !important;
  border: none !important;
  border-radius: ${J.md} !important;
  font-weight: ${C.fontWeight.semibold} !important;
  font-size: ${C.fontSize.sm} !important;
  cursor: not-allowed;
  margin-top: auto;

  ${O.mobile} {
    padding: ${u[2]} ${u[2]} !important;
    font-size: ${C.fontSize.xs} !important;
  }
`,Rm=({product:e})=>{const t=dr(),[r,n]=x.useState(!1),[o,i]=x.useState(""),[a,l]=x.useState(!1),c=e.stock!=null&&e.stock<=0||e.quantity!=null&&e.quantity<=0,d=()=>{t(`/product/${e.id}`)},f=()=>{l(!0)},p=y=>{y.stopPropagation(),t(`/product/${e.id}`)},h=e.price*1.2;return Math.round((h-e.price)/h*100),s.jsxs(s.Fragment,{children:[s.jsxs(bS,{onClick:d,children:[s.jsxs(LF,{children:[c&&s.jsx(DF,{children:"Out of Stock"}),!a&&e.image?s.jsx(Cv,{src:no(e.image),alt:e.title,onError:f}):s.jsx(Cv,{src:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23f0f0f0' width='200' height='200'/%3E%3Ctext x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%23999' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E",alt:"No image available"})]}),s.jsxs(WF,{children:[s.jsx(UF,{children:e.category}),s.jsx(HF,{title:e.title,children:e.title}),(e.material||e.finish||e.sizes&&e.sizes.length>0)&&s.jsxs(GF,{children:[e.material&&s.jsx(El,{children:e.material}),e.finish&&s.jsx(El,{children:e.finish}),e.sizes&&e.sizes.length>0&&s.jsxs(El,{children:[e.sizes.slice(0,2).join(", "),e.sizes.length>2?` +${e.sizes.length-2}`:""]}),e.color&&s.jsx(El,{children:e.color})]}),s.jsxs(YF,{children:[s.jsx(XF,{children:e.showPriceInListing===!1||!e.price?s.jsx(KF,{children:"Contact for Price"}):s.jsxs(s.Fragment,{children:[s.jsxs(QF,{children:["₹",e.price.toFixed(0)]}),h>e.price&&s.jsxs(JF,{children:["₹",h.toFixed(0)]})]})}),s.jsx(Fm,{rating:e.rating,count:e.reviewCount,size:"12px"})]}),s.jsx(VF,{children:e.description}),c?s.jsx(e8,{appearance:"secondary",disabled:!0,children:"Out of Stock"}):s.jsx(ZF,{appearance:"primary",onClick:p,children:"Enquire Now"})]})]}),r&&s.jsx(pS,{message:o,type:"success",duration:2e3})]})},_v="/api",t8=g.div`
  width: 100%;
  margin-bottom: ${u[12]};
`,r8=g.div`
  position: relative;
  width: 100%;
  border-radius: 24px;
  overflow: hidden;
  background: ${b.neutral[100]};
  aspect-ratio: 16 / 5;
  max-width: 100%;
  min-height: 420px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.10);

  @media (max-width: 1024px) {
    aspect-ratio: 16 / 7;
    min-height: 260px;
  }
  @media (max-width: 768px) {
    aspect-ratio: 4 / 3;
    min-height: 180px;
  }
  @media (max-width: 480px) {
    aspect-ratio: 1 / 1;
    min-height: 120px;
  }
`,n8=g.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-color: ${b.neutral[200]};
  opacity: ${e=>e.$isActive?1:0};
  transition: opacity 0.5s ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(0.95);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`,o8=g.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${e=>e.$hasContent?"rgba(0, 0, 0, 0.3)":"transparent"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${u[8]};
  text-align: center;
`,i8=g.h2`
  font-size: ${C.fontSize["3xl"]};
  font-weight: ${C.fontWeight.extrabold};
  color: white;
  margin-bottom: ${u[2]};
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: ${C.fontSize["2xl"]};
  }

  @media (max-width: 480px) {
    font-size: ${C.fontSize.lg};
  }
`,s8=g.p`
  font-size: ${C.fontSize.lg};
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: ${C.fontSize.base};
  }

  @media (max-width: 480px) {
    font-size: ${C.fontSize.sm};
  }
`,a8=g.div`
  position: absolute;
  bottom: ${u[6]};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${u[2]};
  z-index: 10;

  ${O.mobile} {
    gap: ${u[1]};
    bottom: ${u[4]};
    /* ensure limited width on mobile */
    padding: 0 ${u[2]};
    max-width: 240px;
    overflow: hidden;
  }
`,rf=g.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${e=>e.$isActive?"white":"rgba(255, 255, 255, 0.5)"};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: white;
    transform: scale(1.2);
  }

  ${O.mobile} {
    width: 12px;
    height: 12px;
  }
`,zv=g.button`
  position: absolute;
  top: 50%;
  ${e=>e.$direction==="left"?"left":"right"}: ${u[4]};
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: ${C.fontSize.xl};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: ${C.fontSize.lg};
  }
`,l8=({type:e="promotional",limit:t=5,autoRotate:r=!0,rotationInterval:n=5e3})=>{const[o,i]=x.useState([]),[a,l]=x.useState(0),[c,d]=x.useState(!0),[f,p]=x.useState(!1),h=dr();if(x.useEffect(()=>{(async()=>{try{const k=e&&e!=="all"?`${_v}/banners?type=${e}&limit=${t}`:`${_v}/banners?limit=${t}`,w=await fetch(k);if(!w.ok)throw new Error("Failed to fetch banners");const _=await w.json();i(_.banners||[])}catch(k){console.error("Failed to fetch banners:",k)}finally{d(!1)}})()},[e,t]),x.useEffect(()=>{if(!r||o.length===0)return;const j=setInterval(()=>{l(k=>(k+1)%o.length)},n);return()=>clearInterval(j)},[r,o.length,n]),x.useEffect(()=>{const j=()=>p(typeof window<"u"&&window.innerWidth<=480);return j(),window.addEventListener("resize",j),()=>window.removeEventListener("resize",j)},[]),c||o.length===0)return null;const y=o[a],m=!!(y.title&&y.description),v=()=>{y.link?window.location.href=y.link:y.category&&h(`/catalog?category=${encodeURIComponent(y.category.toLowerCase())}`)},$=()=>{l(j=>(j-1+o.length)%o.length)},S=()=>{l(j=>(j+1)%o.length)};return s.jsx(t8,{children:s.jsxs(r8,{onClick:v,children:[o.map((j,k)=>s.jsx(n8,{$isActive:k===a,style:{backgroundImage:`url('${no(j.imageUrl)}')`},children:s.jsx(o8,{$hasContent:m,children:m&&s.jsxs(s.Fragment,{children:[s.jsx(i8,{children:j.title}),s.jsx(s8,{children:j.description})]})})},j._id)),o.length>1&&s.jsxs(s.Fragment,{children:[s.jsx(zv,{$direction:"left",onClick:$,title:"Previous banner",children:"←"}),s.jsx(zv,{$direction:"right",onClick:S,title:"Next banner",children:"→"}),s.jsx(a8,{children:(()=>{if(!f)return o.map((w,_)=>s.jsx(rf,{$isActive:_===a,onClick:B=>{B.stopPropagation(),l(_)},title:`Banner ${_+1}`},_));const j=5;if(o.length<=j)return o.map((w,_)=>s.jsx(rf,{$isActive:_===a,onClick:B=>{B.stopPropagation(),l(_)},title:`Banner ${_+1}`},_));let k=a-Math.floor(j/2);return k<0&&(k=0),k+j>o.length&&(k=o.length-j),o.slice(k,k+j).map((w,_)=>{const B=k+_;return s.jsx(rf,{$isActive:B===a,onClick:E=>{E.stopPropagation(),l(B)},title:`Banner ${B+1}`},B)})})()})]})]})})},c8=g.div`
  width: 100%;
  background: var(--color-bg-primary, white);
`,d8=g.section`
  width: 100%;
  min-height: 500px;
  background: linear-gradient(135deg, var(--color-primary, #667eea) 0%, var(--color-primary-dark, #764ba2) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  padding: ${u[8]};

  ${O.tablet} {
    min-height: 350px;
  }

  ${O.mobile} {
    min-height: 250px;
    padding: ${u[4]};
  }
`,u8=g.div`
  max-width: 800px;
`,f8=g.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: ${u[4]};

  ${O.tablet} {
    font-size: 2.5rem;
  }

  ${O.mobile} {
    font-size: 1.75rem;
  }
`,p8=g.p`
  font-size: 1.25rem;
  margin-bottom: ${u[6]};
  opacity: 0.95;

  ${O.mobile} {
    font-size: 1rem;
  }
`,h8=g.div`
  display: flex;
  gap: ${u[4]};
  justify-content: center;
  flex-wrap: wrap;
`,Jo=g.section`
  padding: ${u[12]} ${u[6]};
  max-width: 1400px;
  margin: 0 auto;

  ${O.tablet} {
    padding: ${u[8]} ${u[4]};
  }

  ${O.mobile} {
    padding: ${u[6]} ${u[3]};
  }
`,Bl=g.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: ${u[8]};
  text-align: center;
  color: var(--color-text-primary, ${b.neutral[900]});

  ${O.mobile} {
    font-size: 1.75rem;
    margin-bottom: ${u[6]};
  }
`,m8=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${u[6]};

  ${O.tablet} {
    grid-template-columns: repeat(3, 1fr);
    gap: ${u[4]};
  }

  ${O.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${u[3]};
  }
`,g8=g.div`
  background: var(--color-bg-primary, white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`,v8=g.div`
  width: 100%;
  height: 150px;
  background: ${e=>e.$gradient||"linear-gradient(135deg, var(--color-primary, #667eea) 0%, var(--color-primary-dark, #764ba2) 100%)"};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  position: relative;
  overflow: hidden;
`,b8=g.div`
  padding: ${u[4]};
  text-align: center;
`,x8=g.h3`
  font-size: ${C.fontSize.base};
  font-weight: 600;
  margin: 0;
  color: var(--color-text-primary, ${b.neutral[900]});
`,y8=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${u[6]};

  ${O.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: ${u[4]};
  }

  ${O.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${u[3]};
  }
`,w8=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${u[6]};
`,k8=g.div`
  background: var(--color-bg-primary, white);
  padding: ${u[6]};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid var(--color-primary, #667eea);
`,S8=g.p`
  font-size: ${C.fontSize.base};
  color: var(--color-text-secondary, ${b.neutral[600]});
  margin-bottom: ${u[4]};
  font-style: italic;
`,j8=g.p`
  font-weight: 600;
  color: var(--color-text-primary, ${b.neutral[900]});
  margin: 0;
`,$8=g.div`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  ${O.tablet} {
    height: 300px;
  }

  ${O.mobile} {
    height: 250px;
  }
`,C8=g.a`
  position: fixed;
  bottom: ${u[6]};
  right: ${u[6]};
  width: 60px;
  height: 60px;
  background: #25d366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 100;
  text-decoration: none;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  ${O.mobile} {
    bottom: ${u[4]};
    right: ${u[4]};
  }
`,_8=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${u[6]};
  text-align: center;
`,Tl=g.div`
  padding: ${u[6]};
`,Pl=g.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-primary, #667eea);
  margin-bottom: ${u[2]};
`,Nl=g.div`
  font-size: ${C.fontSize.base};
  color: var(--color-text-secondary, ${b.neutral[600]});
`,z8=g.div`
  display: flex;
  justify-content: center;
  margin-top: ${u[8]};
`,E8=[],B8=[{text:"Amazing product quality and super fast delivery. This has become my go-to store!",author:"Sarah Johnson — Repeat Customer"},{text:"The variety is incredible. I found exactly what I needed at a great price.",author:"Michael Chen — Verified Buyer"},{text:"Outstanding customer service. They went above and beyond to help me choose the right product.",author:"Priya Sharma — Interior Designer"}],T8=()=>{const e=dr(),t=_r(),{items:r,loading:n}=wt(w=>w.products),o=r.slice(0,6),[i,a]=x.useState(""),[l,c]=x.useState("Discover Premium Products for Every Lifestyle"),[d,f]=x.useState("Shop curated collections of electronics, fashion, home essentials, and more — all in one place"),[p,h]=x.useState(E8),[y,m]=x.useState({products:"500+",years:"15+",clients:"5000+",brands:"50+"}),[v,$]=x.useState(B8),[S,j]=x.useState("919876543210");x.useEffect(()=>{r.length===0&&t(oa()),jr.get("/categories/home").then(w=>{w.categories&&w.categories.length>0&&h(w.categories.map(_=>({id:_.slug||_.name.toLowerCase().replace(/\s+/g,"-"),name:_.name,icon:_.icon||"📦",image:_.image||"",gradient:_.gradient||""})))}).catch(()=>{}),be.getSiteSettings().then(w=>{if(w.mapEmbedUrl){const _=w.mapEmbedUrl.trim(),B=_.match(/src=["']([^"']+)["']/i);a(B?B[1]:_)}else if(w.mapLatitude!=null&&w.mapLongitude!=null){const _=w.mapZoom||15;a(`https://maps.google.com/maps?width=100%25&height=400&hl=en&q=${w.mapLatitude},${w.mapLongitude}&t=&z=${_}&ie=UTF8&iwloc=B&output=embed`)}w.heroTitle&&c(w.heroTitle),w.heroSubtitle&&f(w.heroSubtitle),m({products:w.statsProducts||"500+",years:w.statsYears||"15+",clients:w.statsClients||"5000+",brands:w.statsBrands||"50+"}),Array.isArray(w.testimonials)&&w.testimonials.length>0&&$(w.testimonials),w.whatsappNumber&&j(w.whatsappNumber)}).catch(()=>{})},[]);const k=w=>{e(`/catalog?category=${encodeURIComponent(w.toLowerCase())}`)};return s.jsxs(c8,{children:[s.jsx(Jo,{children:s.jsx(l8,{type:"all",limit:5,autoRotate:!0,rotationInterval:5e3})}),s.jsx(d8,{children:s.jsxs(u8,{children:[s.jsx(f8,{children:l}),s.jsx(p8,{children:d}),s.jsxs(h8,{children:[s.jsx(ne,{appearance:"primary",onClick:()=>e("/catalog"),children:"Explore Products"}),s.jsx(ne,{appearance:"outline",onClick:()=>e("/contact"),children:"Contact Us"})]})]})}),p.length>0&&s.jsxs(Jo,{children:[s.jsx(Bl,{children:"Our Categories"}),s.jsx(m8,{children:p.map(w=>s.jsxs(g8,{onClick:()=>k(w.name),children:[s.jsx(v8,{$hasImage:!!w.image,$gradient:w.gradient||void 0,style:w.image?{backgroundImage:`url('${no(w.image)}')`}:void 0,children:!w.image&&w.icon}),s.jsx(b8,{children:s.jsx(x8,{children:w.name})})]},w.id))})]}),s.jsxs(Jo,{style:{backgroundColor:"var(--color-bg-secondary, #f9f9f9)"},children:[s.jsx(Bl,{children:"Featured Products"}),n?s.jsx("div",{style:{textAlign:"center",padding:"40px"},children:"Loading products..."}):o.length>0?s.jsxs(s.Fragment,{children:[s.jsx(y8,{children:o.map(w=>s.jsx(Rm,{product:w},w.id))}),s.jsx(z8,{children:s.jsx(ne,{appearance:"primary",onClick:()=>e("/catalog"),children:"View All Products"})})]}):s.jsx("div",{style:{textAlign:"center",padding:"40px",color:"#666"},children:"No products available yet"})]}),s.jsx(Jo,{children:s.jsxs(_8,{children:[s.jsxs(Tl,{children:[s.jsx(Pl,{children:y.products}),s.jsx(Nl,{children:"Premium Products"})]}),s.jsxs(Tl,{children:[s.jsx(Pl,{children:y.years}),s.jsx(Nl,{children:"Years Experience"})]}),s.jsxs(Tl,{children:[s.jsx(Pl,{children:y.clients}),s.jsx(Nl,{children:"Happy Customers"})]}),s.jsxs(Tl,{children:[s.jsx(Pl,{children:y.brands}),s.jsx(Nl,{children:"Brands Available"})]})]})}),s.jsxs(Jo,{style:{backgroundColor:"var(--color-bg-secondary, #f9f9f9)"},children:[s.jsx(Bl,{children:"What Our Customers Say"}),s.jsx(w8,{children:v.map((w,_)=>s.jsxs(k8,{children:[s.jsxs(S8,{children:['"',w.text,'"']}),s.jsx(j8,{children:w.author})]},_))})]}),i&&s.jsxs(Jo,{children:[s.jsx(Bl,{children:"Visit Our Showroom"}),s.jsx($8,{children:s.jsx("iframe",{width:"100%",height:"100%",style:{border:0},loading:"lazy",allowFullScreen:!0,referrerPolicy:"no-referrer-when-downgrade",src:i})})]}),s.jsx(C8,{href:`https://wa.me/${S}?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products`,target:"_blank",rel:"noopener noreferrer",title:"Chat on WhatsApp",children:"💬"})]})},P8=g.div`
  width: 100%;
  padding: ${u[5]};
  background: ${b.neutral[0]};
  border-right: 1px solid ${b.neutral[200]};
  height: 100%;
  box-shadow: none;
  position: sticky;
  top: 0;
  transition: all ${ye.base};
  overflow-y: auto;

  ${O.tablet} {
    width: 100%;
    position: static;
    top: auto;
    box-shadow: none;
    border-right: none;
    border-bottom: 1px solid ${b.neutral[200]};
    padding: ${u[4]};
  }

  ${O.mobile} {
    padding: ${u[3]};
    border: none;
  }
`,En=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[2]};
  margin-bottom: ${u[5]};
  padding-bottom: ${u[5]};
  border-bottom: 1px solid ${b.neutral[200]};

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`,Bn=g.h3`
  margin: 0 0 ${u[1]} 0;
  font-size: ${C.fontSize.sm};
  font-weight: ${C.fontWeight.bold};
  color: ${b.neutral[900]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: ${u[2]};
  cursor: pointer;
  user-select: none;
`,Fl=g.div`
  display: flex;
  align-items: center;
  gap: ${u[2]};
  padding: ${u[1]} 0;
  cursor: pointer;

  label {
    cursor: pointer;
    color: ${b.neutral[700]};
    font-size: ${C.fontSize.sm};
    user-select: none;
    &:hover { color: ${b.secondary.main}; }
  }
`,N8=g.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${u[2]} 0;
  font-size: ${C.fontSize.sm};
  font-weight: ${C.fontWeight.semibold};
  color: ${b.neutral[900]};
  span {
    color: ${b.secondary.main};
    font-weight: ${C.fontWeight.bold};
    font-size: ${C.fontSize.base};
  }
`,F8=g(ne)`
  width: 100%;
  font-weight: ${C.fontWeight.semibold};
  padding: ${u[2]} ${u[3]} !important;
  background: ${b.secondary.main} !important;
  color: ${b.neutral[900]} !important;
  border: none !important;
  border-radius: ${J.md} !important;
  transition: all ${ye.fast} !important;
  font-size: ${C.fontSize.sm} !important;
  &:hover { background: #ff9500 !important; box-shadow: ${ze.md} !important; }
  &:active { background: #e68900 !important; transform: scale(0.98); }
`,ws=g.span`
  background: ${b.secondary.main};
  color: ${b.neutral[0]};
  font-size: ${C.fontSize.xs};
  font-weight: ${C.fontWeight.bold};
  padding: ${u[1]} ${u[2]};
  border-radius: ${J.full};
  margin-left: auto;
`,R8=g.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2.5px solid ${e=>e.$active?b.primary.main:b.neutral[300]};
  background: ${e=>e.$color};
  cursor: pointer;
  transition: all 0.15s ease;
  outline: ${e=>e.$active?`2px solid ${b.primary.lighter}`:"none"};
  outline-offset: 2px;
  &:hover { border-color: ${b.primary.main}; transform: scale(1.1); }
`,A8=g.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${u[2]};
  padding: ${u[1]} 0;
`,I8=g.button`
  padding: 3px 10px;
  border-radius: 14px;
  border: 1.5px solid ${e=>e.$active?b.primary.main:b.neutral[300]};
  background: ${e=>e.$active?b.primary.main:"white"};
  color: ${e=>e.$active?"white":b.neutral[700]};
  font-size: ${C.fontSize.xs};
  font-weight: ${C.fontWeight.medium};
  cursor: pointer;
  transition: all 0.15s ease;
  &:hover { border-color: ${b.primary.main}; }
`,O8=g.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,q8={White:"#ffffff",Beige:"#f5f0e1",Cream:"#fffdd0",Ivory:"#fffff0",Grey:"#9e9e9e",Black:"#333333",Brown:"#795548",Blue:"#2196f3",Green:"#4caf50",Red:"#f44336",Yellow:"#fdd835",Pink:"#e91e63",Orange:"#ff9800",Gold:"#ffd700",Silver:"#c0c0c0",Maroon:"#800000"},M8=[{key:"category",label:"Categories",icon:"📂",enabled:!0,displayOrder:0},{key:"material",label:"Material",icon:"🧱",enabled:!0,displayOrder:1},{key:"finish",label:"Finish",icon:"✨",enabled:!0,displayOrder:2},{key:"size",label:"Size",icon:"📐",enabled:!0,displayOrder:3},{key:"color",label:"Color",icon:"🎨",enabled:!0,displayOrder:4},{key:"price",label:"Price Range",icon:"💰",enabled:!0,displayOrder:5},{key:"rating",label:"Min. Rating",icon:"⭐",enabled:!0,displayOrder:6}],L8=()=>{const e=_r(),t=wt(R=>R.products.items),r=wt(R=>R.products.filters),[n,o]=x.useState(r.maxPrice||1e5),[i,a]=x.useState([]),[l,c]=x.useState(M8);x.useEffect(()=>{jr.get("/filters").then(R=>{a((R.filters||[]).filter(M=>M.isActive&&M.showInSidebar))}).catch(()=>{}),be.getSiteSettings().then(R=>{R.catalogFilterConfig&&R.catalogFilterConfig.length>0&&c(R.catalogFilterConfig)}).catch(()=>{})},[]);const d=[...new Set(t.map(R=>R.category))].filter(Boolean).sort(),f=[...new Set(t.map(R=>R.material).filter(R=>!!R))].sort(),p=[...new Set(t.map(R=>R.finish).filter(R=>!!R))].sort(),h=[...new Set(t.flatMap(R=>R.sizes||[]))].sort((R,M)=>{const W=parseInt(R),Z=parseInt(M);return isNaN(W)||isNaN(Z)?R.localeCompare(M):W-Z}),y=[...new Set(t.map(R=>R.color).filter(R=>!!R))].sort(),m=Math.max(...t.map(R=>R.price),1e3),v=(R,M)=>{e(Us(M?R:null))},$=(R,M)=>{e(dP(M?R:null))},S=(R,M)=>{e(uP(M?R:null))},j=R=>{e(fP(r.size===R?null:R))},k=R=>{e(pP(r.color===R?null:R))},w=(R,M)=>{const W=(M==null?void 0:M.value)||n;o(W),e(aP(W))},_=R=>{e(lP(R))},B=(R,M,W)=>{e(hP({key:R,value:W?M:null}))},E=()=>{o(m),e(qp())},N=(r.category?1:0)+(r.material?1:0)+(r.finish?1:0)+(r.size?1:0)+(r.color?1:0)+(r.minRating>0?1:0)+(r.maxPrice!==null&&r.maxPrice<m?1:0)+Object.values(r.custom||{}).filter(Boolean).length,L=l.filter(R=>R.enabled).sort((R,M)=>R.displayOrder-M.displayOrder),V=R=>{switch(R.key){case"category":return d.length===0?null:s.jsxs(En,{children:[s.jsxs(Bn,{children:[R.icon," ",R.label]}),d.map(M=>s.jsx(Fl,{children:s.jsx($i,{checked:r.category===M,onChange:(W,Z)=>v(M,Z.checked),label:M.charAt(0).toUpperCase()+M.slice(1)})},M))]},R.key);case"material":return f.length===0?null:s.jsxs(En,{children:[s.jsxs(Bn,{children:[R.icon," ",R.label]}),f.map(M=>s.jsx(Fl,{children:s.jsx($i,{checked:r.material===M,onChange:(W,Z)=>$(M,Z.checked),label:M})},M))]},R.key);case"finish":return p.length===0?null:s.jsxs(En,{children:[s.jsxs(Bn,{children:[R.icon," ",R.label]}),p.map(M=>s.jsx(Fl,{children:s.jsx($i,{checked:r.finish===M,onChange:(W,Z)=>S(M,Z.checked),label:M})},M))]},R.key);case"size":return h.length===0?null:s.jsxs(En,{children:[s.jsxs(Bn,{children:[R.icon," ",R.label,r.size&&s.jsx(ws,{children:r.size})]}),s.jsx(O8,{children:h.map(M=>s.jsx(I8,{$active:r.size===M,onClick:()=>j(M),children:M},M))})]},R.key);case"color":return y.length===0?null:s.jsxs(En,{children:[s.jsxs(Bn,{children:[R.icon," ",R.label,r.color&&s.jsx(ws,{children:r.color})]}),s.jsx(A8,{children:y.map(M=>s.jsx(R8,{$color:q8[M]||M,$active:r.color===M,onClick:()=>k(M),title:M},M))})]},R.key);case"price":return s.jsxs(En,{children:[s.jsxs(Bn,{children:[R.icon," ",R.label,r.maxPrice!==null&&r.maxPrice<m&&s.jsxs(ws,{children:["₹",r.maxPrice]})]}),s.jsxs(N8,{children:[s.jsx("span",{children:"₹0"}),s.jsxs("span",{children:["₹",n.toLocaleString()]})]}),s.jsx(Bw,{value:n,onChange:w,min:0,max:m,step:Math.max(10,Math.floor(m/100))})]},R.key);case"rating":return s.jsxs(En,{children:[s.jsxs(Bn,{children:[R.icon," ",R.label,r.minRating>0&&s.jsxs(ws,{children:["⭐",r.minRating.toFixed(1)]})]}),s.jsx(vS,{value:r.minRating,onChange:_})]},R.key);default:return null}};return s.jsxs(P8,{children:[L.map(R=>V(R)),i.map(R=>{var I;const M=((I=r.custom)==null?void 0:I[R.slug])||null,W=[...new Set(t.map(T=>{var z;return(z=T.customFilters)==null?void 0:z[R.slug]}).filter(Boolean).map(T=>String(T)))].sort(),Z=R.options.length>0?R.options.filter(T=>W.includes(T.value)):W.map(T=>({label:T.charAt(0).toUpperCase()+T.slice(1).replace(/-/g," "),value:T}));return Z.length===0?null:s.jsxs(En,{children:[s.jsxs(Bn,{children:[R.icon||"🏷️"," ",R.name,M&&s.jsx(ws,{children:M})]}),Z.map(T=>s.jsx(Fl,{children:s.jsx($i,{checked:M===T.value,onChange:(z,P)=>B(R.slug,T.value,P.checked),label:T.label})},T.value))]},R._id)}),N>0&&s.jsxs(F8,{appearance:"secondary",onClick:E,children:["✕ Reset All (",N,")"]})]})},D8=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  padding: 1rem;
`,W8=g.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
  height: 300px;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;g.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: 200px;
`;g.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1976d2;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;const H8=g.div`
  padding: 2rem;
  text-align: center;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  margin: 1rem;
`,U8=g.h3`
  color: #d32f2f;
  margin: 0 0 0.5rem 0;
`,V8=g.p`
  color: #c62828;
  margin: 0;
`,G8=({count:e=12})=>s.jsx(D8,{children:Array.from({length:e}).map((t,r)=>s.jsx(W8,{},r))});class hq extends Ie.Component{constructor(t){super(t),this.state={hasError:!1,error:null}}static getDerivedStateFromError(t){return{hasError:!0,error:t}}componentDidCatch(t){var r,n;(n=(r=this.props).onError)==null||n.call(r,t)}render(){return this.state.hasError?s.jsxs(H8,{children:[s.jsx(U8,{children:"Failed to load content"}),s.jsx(V8,{children:"Please refresh the page and try again."})]}):this.props.children}}const K8=g.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 24px 0 0 0;

  ${O.mobile} {
    /* Use fixed so it sticks to viewport bottom reliably */
    position: fixed;
    bottom: env(safe-area-inset-bottom, 0);
    left: 0;
    right: 0;
    padding: ${u[2]};
    gap: ${u[2]};
    margin: 0;
    background: var(--color-neutral-0, ${b.neutral[0]});
    box-shadow: 0 -6px 18px rgba(0,0,0,0.06);
    z-index: 160;
    justify-content: center;
    /* ensure wrapper doesn't exceed viewport width */
    width: 100%;
  }
`,nf=g(ne)`
  background: ${({active:e})=>e?"#e0e0e0":"#fff"};
  font-weight: ${({active:e})=>e?700:400};

  ${O.mobile} {
    padding: ${u[1]} ${u[2]} !important;
    min-width: 36px;
    font-size: ${C.fontSize.xs} !important;
  }
`,Y8=({currentPage:e,totalPages:t,onPageChange:r})=>{if(t<=1)return null;const n=[];for(let o=1;o<=t;o++)n.push(o);return s.jsxs(K8,{children:[s.jsx(nf,{disabled:e===1,onClick:()=>r(e-1),children:"Prev"}),n.map(o=>s.jsx(nf,{active:o===e,onClick:()=>r(o),children:o},o)),s.jsx(nf,{disabled:e===t,onClick:()=>r(e+1),children:"Next"})]})},X8=g.div`
  position: relative;
  width: 100%;
  max-width: 500px;

  ${O.mobile} {
    max-width: 100%;
  }
`,Zp=g.div`
  position: absolute;
  left: ${u[3]};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: ${b.neutral[400]};
  pointer-events: none;
  transition: color ${ye.fast};
`,Q8=g.button`
  position: absolute;
  right: ${u[2]};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: ${b.neutral[200]};
  color: ${b.neutral[500]};
  cursor: pointer;
  padding: 0;
  transition: all ${ye.fast};

  &:hover {
    background: ${b.neutral[300]};
    color: ${b.neutral[700]};
  }
`,J8=g.input`
  width: 100%;
  background: ${b.neutral[100]};
  border: 1px solid transparent;
  border-radius: ${J.full};
  padding: ${u[2]} ${u[8]} ${u[2]} ${u[9]};
  font-size: ${C.fontSize.sm};
  color: ${b.neutral[800]};
  height: 36px;
  transition: all ${ye.fast};
  outline: none;
  font-family: inherit;

  &::placeholder {
    color: ${b.neutral[400]};
  }

  &:hover {
    background: ${b.neutral[200]};
    border-color: ${b.neutral[200]};
  }

  &:focus {
    background: white;
    border-color: ${b.primary.main};
    box-shadow: 0 0 0 2px ${b.primary.lighter};
  }

  &:focus ~ ${Zp}, &:focus + ${Zp} {
    color: ${b.primary.main};
  }
`,Z8=350,e9=()=>{const[e,t]=x.useState(""),r=_r(),n=x.useRef(null),o=x.useRef(!1),i=x.useCallback(l=>{l.trim()?r(cP(l.trim())):r(qp())},[r]);x.useEffect(()=>{if(!o.current){o.current=!0;return}return n.current&&clearTimeout(n.current),n.current=setTimeout(()=>{i(e)},Z8),()=>{n.current&&clearTimeout(n.current)}},[e,i]);const a=()=>{t(""),r(qp())};return s.jsxs(X8,{children:[s.jsx(Zp,{children:s.jsx(B3,{})}),s.jsx(J8,{type:"text",placeholder:"Search products...",value:e,onChange:l=>t(l.target.value)}),e&&s.jsx(Q8,{onClick:a,title:"Clear search",children:s.jsx(O3,{})})]})},t9=g.div`
  background: var(--color-bg-primary, ${b.neutral[50]});
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;
  overflow-x: hidden;
  /* ensure children padding doesn't increase layout width */
  &, & * {
    box-sizing: border-box;
    max-width: 100%;
  }
`,r9=g.div`
  background: var(--color-neutral-0, ${b.neutral[0]});
  border-bottom: 1px solid var(--color-neutral-200, ${b.neutral[200]});
  padding: ${u[6]} ${u[8]};
  justify-content: space-between;
  align-items: center;
  text-align: center;

  ${O.tablet} {
    padding: ${u[4]} ${u[6]};
    flex-direction: column;
    gap: ${u[4]};
    text-align: center;
  }

  ${O.mobile} {
    padding: ${u[4]};
  }
`,n9=g.h1`
  margin: 0;
  font-size: ${C.fontSize["3xl"]};
  font-weight: ${C.fontWeight.extrabold};
  color: var(--color-text-primary, ${b.neutral[900]});

  ${O.mobile} {
    font-size: ${C.fontSize["2xl"]};
  }
`,o9=g.div`
  display: flex;
  gap: ${u[3]};
  align-items: center;

  ${O.mobile} {
    width: 100%;
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`,i9=g.div`
  display: flex;
  flex: 1;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
`,s9=g.div`
  display: ${e=>e.isOpen?"block":"none"};
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 98;
  transition: opacity ${ye.base};
  opacity: ${e=>e.isOpen?1:0};
`,a9=g.div`
  position: fixed;
  left: 0;
  top: 72px;
  bottom: 0;
  width: 20%;
  max-width: 320px;
  min-width: 240px;
  background: var(--color-neutral-0, ${b.neutral[0]});
  border-right: 1px solid var(--color-neutral-200, ${b.neutral[200]});
  box-shadow: ${e=>e.isOpen?ze.lg:"none"};
  z-index: 100;
  overflow-y: auto;
  transform: translateX(${e=>e.isOpen?"0":"-100%"});
  transition: transform ${ye.base};
  padding: ${u[3]};

  > div {
    border-radius: 0;
    border: none;
    box-shadow: none;
    position: static;
    top: auto;
    background: var(--color-neutral-0, ${b.neutral[0]});
  }

  ${O.tablet} {
    width: 60%;
    max-width: 360px;
    min-width: 0;
  }

  ${O.mobile} {
    width: 100%;
    max-width: none;
    min-width: 0;
    /* On mobile, when sidebar is not open hide it completely to avoid layout shift */
    display: ${e=>e.isOpen?"block":"none"};
  }
`,l9=g.div`
  padding: ${u[6]};
  display: flex;
  flex-direction: column;
  gap: ${u[6]};
  flex: 1;

  ${O.tablet} {
    padding: ${u[4]};
    gap: ${u[4]};
  }

  ${O.mobile} {
    /* Reduce horizontal padding on very small screens to avoid overflow */
    padding: ${u[2]};
    gap: ${u[3]};
    overflow: visible;
  }

  /* Add bottom padding to ensure fixed pagination doesn't overlap content */
  @media (max-width: 480px) {
    padding-bottom: 72px; /* enough room for pagination */
  }
`,c9=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[4]};
`,d9=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${u[5]};

  ${O.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: ${u[4]};
  }

  ${O.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${u[3]};
  }
  /* On narrow viewports show one product per row in the content area */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${u[4]};
  }
  /* Ensure grid children can shrink and don't cause horizontal overflow */
  & > * {
    min-width: 0;
    width: 100%;
  }
`,u9=g.div`
  text-align: center;
  padding: ${u[12]} ${u[6]};
  background: var(--color-neutral-50, ${b.neutral[50]});
  border-radius: ${J.lg};
  color: var(--color-text-secondary, ${b.neutral[600]});

  h3 {
    margin: 0 0 ${u[2]} 0;
    font-size: ${C.fontSize["2xl"]};
    font-weight: ${C.fontWeight.bold};
    color: var(--color-text-primary, ${b.neutral[900]});
  }

  p {
    margin: 0 0 ${u[4]} 0;
  }
`,f9=g.div`
  font-size: ${C.fontSize.sm};
  color: var(--color-text-secondary, ${b.neutral[600]});
  font-weight: ${C.fontWeight.medium};
`,p9=()=>{const{items:e,filtered:t,loading:r,error:n}=wt(S=>S.products),o=wt(S=>S.products.filters),i=_r(),a=dr(),[l]=pF(),c=dS(),d=(c==null?void 0:c.showFilters)??!1,[f,p]=x.useState(1),h=50,y=Math.ceil(t.length/h);x.useEffect(()=>{p(1)},[t]);const m=x.useMemo(()=>{const S=(f-1)*h;return t.slice(S,S+h)},[t,f]),v=l.get("category"),$=x.useRef(!1);return x.useEffect(()=>{v&&!$.current?(i(Us(v)),$.current=!0):!v&&$.current&&(i(Us(null)),$.current=!1)},[v]),x.useEffect(()=>{e.length===0&&i(oa())},[]),s.jsxs(t9,{children:[s.jsxs(r9,{children:[s.jsxs("div",{children:[s.jsx(n9,{children:v||o.category?`${String(v||o.category).charAt(0).toUpperCase()+String(v||o.category).slice(1)} Products`:"All Products"}),s.jsx(f9,{children:`Showing ${t.length} products`})]}),s.jsx(o9,{children:(v||o.category)&&s.jsx(ne,{appearance:"secondary",onClick:()=>{i(Us(null)),$.current=!1,a("/catalog")},children:"Clear Filter"})})]}),s.jsxs(i9,{children:[s.jsx(s9,{isOpen:d,onClick:()=>c==null?void 0:c.closeFilters()}),s.jsx(a9,{isOpen:d,children:s.jsx(L8,{})}),s.jsxs(l9,{children:[s.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:u[5]},children:s.jsx("div",{style:{width:"100%",maxWidth:900},children:s.jsx(e9,{})})}),s.jsxs(c9,{children:[n&&s.jsxs("div",{style:{padding:u[4],margin:`0 0 ${u[4]} 0`,background:"#fee",color:"#c33",borderRadius:J.md,fontSize:C.fontSize.sm},children:[s.jsx("strong",{children:"Error:"})," ",n,s.jsx(ne,{appearance:"subtle",size:"small",onClick:()=>i(mP()),style:{marginLeft:u[2]},children:"Dismiss"})]}),r&&s.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))",gap:u[5]},children:[...Array(8)].map((S,j)=>s.jsx(G8,{},j))}),!r&&t.length===0?s.jsxs(u9,{children:[s.jsx("h3",{children:"No Products Found"}),s.jsx("p",{children:"We couldn't find any products matching your criteria."}),s.jsx(ne,{appearance:"primary",onClick:()=>{i(Us(null)),$.current=!1,a("/catalog")},children:"View All Products"})]}):s.jsxs(s.Fragment,{children:[s.jsx(d9,{children:m.map(S=>s.jsx(Rm,{product:S},S.id))}),s.jsx(Y8,{currentPage:f,totalPages:y,onPageChange:p})]})]})]})]})]})},h9={logo:"🛍 Modern Store",currency:"₹",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Info",home:"Home",cart:"Cart",account:"Account",login:"Login",logout:"Logout",back:"Back",submit:"Submit",cancel:"Cancel",save:"Save",delete:"Delete",edit:"Edit",clear:"Clear",search:"Search",filter:"Filter",sort:"Sort",close:"Close",view:"View",add:"Add",remove:"Remove",yes:"Yes",no:"No",confirm:"Confirm"},m9={catalog:"Product Catalog",catalogSubtitle:"Discover our amazing collection of products",productNotFound:"Product not found",productNotFoundDesc:"The product you're looking for doesn't exist.",loading:"Loading products...",noProducts:"No products found",noProductsDesc:"Try adjusting your search or filters",viewProduct:"View",addToCart:"Add",addedToCart:"✓ Added to cart!",relatedProducts:"Related Products",availability:"Availability",inStock:"✓ In Stock",outOfStock:"Out of Stock",price:"Price",category:"Category",description:"Description",details:"Details",specifications:"Specifications",quantity:"Quantity",addToCartFull:"Add to Cart",continueShopping:"Continue Shopping",backToProducts:"Back to Products",cartNotification:"✓ Added to cart! Cart: {quantity} items",showing:"Showing",products:"products",product:"product"},g9={title:"Shopping Cart",empty:"Your cart is empty",emptyDesc:"Add some products to your cart to get started",image:"Image",product:"Product",quantity:"Quantity",price:"Price",action:"Action",subtotal:"Subtotal",tax:"Tax (10%)",total:"Total",proceedCheckout:"Proceed to Checkout",continueShopping:"Continue Shopping",noItems:"No items in cart",itemRemoved:"Item removed from cart"},v9={categories:"Categories",priceRange:"Price Range",minimumRating:"Minimum Rating",reset:"Reset Filters",from:"From",to:"To",startPrice:"₹0",currency:"₹"},b9={title:"Customer Reviews",noReviews:"No reviews yet. Be the first to review this product!",sortBy:"Sort by:",mostRecent:"Most Recent",mostHelpful:"Most Helpful",highestRating:"Highest Rating",helpful:"👍 Helpful ({count})",delete:"🗑 Delete",deleteConfirm:"Are you sure you want to delete this review?",addReview:"Add Your Review",shareExperience:"Share Your Experience",rating:"Rating",selectRating:"Please select a rating",reviewTitle:"Review Title",titlePlaceholder:"Summarize your experience...",enterTitle:"Please enter a review title",comment:"Your Review",commentPlaceholder:"Share your detailed thoughts about this product...",enterComment:"Please enter a review comment",charLimit100:"/100",charLimit500:"/500",submitReview:"Submit Review",submitting:"Submitting...",reviewAdded:"✓ Review added successfully!",loginToReview:"Please {link} to add a review.",loginLink:"log in",clearForm:"Clear"},x9={loginTitle:"Welcome Back",signupTitle:"Create Account",email:"Email",password:"Password",confirmPassword:"Confirm Password",fullName:"Full Name",name:"Name",login:"Login",signup:"Sign Up",signupTab:"Sign Up",loginTab:"Login",fillAllFields:"Please fill in all fields",invalidEmail:"Please enter a valid email",passwordMismatch:"Passwords do not match",passwordMinLength:"Password must be at least 6 characters",loginSuccess:"Login successful!",signupSuccess:"Account created successfully!",redirecting:"Redirecting...",processing:"Processing..."},y9={title:"My Account",welcome:"Welcome, {name}",profile:"Profile Information",profileName:"Name:",profileEmail:"Email:",profileId:"User ID:",addresses:"Saved Addresses",noAddresses:"No addresses saved yet",addNewAddress:"Add New Address",default:"Default",setDefault:"Set as Default",orderHistory:"Order History",noOrders:"No orders yet. Start shopping!",logout:"Logout"},w9={title:"Shipping Address",saved:"✓ Address saved successfully! Redirecting...",fullName:"Full Name *",fullNamePlaceholder:"Enter your full name",address:"Address *",addressPlaceholder:"Enter your address",city:"City *",cityPlaceholder:"Enter your city",state:"State",statePlaceholder:"Enter state",zipCode:"ZIP Code *",zipCodePlaceholder:"Enter ZIP code",email:"Email",emailPlaceholder:"Enter email",phone:"Phone Number *",phonePlaceholder:"Enter phone number",requiredFields:"All fields are required",backToCart:"Back to Cart",completeOrder:"Complete Order",addAddress:"Add Address",saveAddress:"Save Address",selectAddress:"Select address to continue",readyToOrder:"✓ Ready to place order",cancel:"Cancel"},k9={title:"Place Order",empty:"Your cart is empty",emptyDesc:"Add items to your cart before placing an order",items:"Order Items ({count})",deliveryAddress:"Delivery Address",noAddresses:"No addresses found. Please add an address in your account.",paymentMethod:"Payment Method",card:"Credit/Debit Card",upi:"UPI",netBanking:"Net Banking",wallet:"Digital Wallet",summary:"Order Summary",subtotal:"Subtotal",tax:"Tax (10%)",shipping:"Shipping",freeShipping:"FREE",total:"Total",freeShippingBadge:"✓ Free Shipping!",placeOrder:"Place Order",processing:"Processing...",quantity:"Qty:",backToCart:"Back to Cart"},S9={home:"Home",cart:"Cart",account:"Account",login:"Login"},j9={success:"Operation completed successfully!",error:"An error occurred. Please try again.",loading:"Loading...",noData:"No data available"},$9={required:"This field is required",email:"Please enter a valid email",minLength:"Minimum {length} characters required",maxLength:"Maximum {length} characters allowed",passwordMatch:"Passwords do not match"},C9={common:h9,products:m9,cart:g9,filters:v9,reviews:b9,auth:x9,account:y9,address:w9,order:k9,header:S9,messages:j9,validation:$9};function _9(e,t){const r=C9,n=e.split(".");let o=r;for(const i of n)if(o=o[i],o===void 0)return console.warn(`String key not found: ${e}`),e;if(typeof o=="string"&&t){let i=o;return Object.entries(t).forEach(([a,l])=>{i=i.replace(`{${a}}`,String(l))}),i}return o}function xS(){return{t:_9}}const Ev=g.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 24px;
  margin: 20px 0;
  border: 1px solid #e0e0e0;
`,Bv=g.h3`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
`,of=g.div`
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #555;
    font-size: 14px;
  }
`,z9=g.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #2196f3;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`,E9=g.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #2196f3;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`,B9=g.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`,Tv=g.button`
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${e=>e.primary?`
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }
      `:`
        background: #f0f0f0;
        color: #333;
        &:hover {
          background: #e0e0e0;
        }
      `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,Rl=g.p`
  color: #d32f2f;
  font-size: 12px;
  margin-top: 4px;
`,T9=g.p`
  color: #388e3c;
  font-size: 12px;
  margin-top: 4px;
`,P9=({productId:e,onReviewAdded:t})=>{const r=_r(),{t:n}=xS(),o=wt(j=>j.auth.user),[i,a]=x.useState(0),[l,c]=x.useState(""),[d,f]=x.useState(""),[p,h]=x.useState(!1),[y,m]=x.useState(""),[v,$]=x.useState("");if(!o)return s.jsxs(Ev,{children:[s.jsx(Bv,{children:n("reviews.addReview")}),s.jsxs("p",{style:{color:"#666",marginBottom:0},children:[n("reviews.loginToReview",{link:""}),s.jsx("a",{href:"/login",style:{color:"#667eea",textDecoration:"none"},children:n("reviews.loginLink")})]})]});const S=async j=>{var k;if(j.preventDefault(),m(""),$(""),i===0){m(n("reviews.selectRating"));return}if(!l.trim()){m(n("reviews.enterTitle"));return}if(!d.trim()){m(n("reviews.enterComment"));return}h(!0);try{if((await ue.post(`/products/${e}/reviews`,{rating:i,title:l.trim(),comment:d.trim()})).success){const _=await ue.get(`/products/${e}`);if(_){const B=_.product||_;r(_k({productId:e,reviews:B.reviews||[],rating:B.rating||0,reviewCount:B.reviewCount||0}))}$(n("reviews.reviewAdded")),a(0),c(""),f(""),t&&setTimeout(t,1500)}}catch(w){const _=((k=w==null?void 0:w.details)==null?void 0:k.message)||(w==null?void 0:w.message)||"Failed to add review";m(_)}finally{h(!1)}};return s.jsxs(Ev,{children:[s.jsx(Bv,{children:n("reviews.shareExperience")}),s.jsxs("form",{onSubmit:S,children:[s.jsxs(of,{children:[s.jsx("label",{children:n("reviews.rating")}),s.jsx(vS,{value:i,onChange:a,size:"32px"}),y&&y.includes("rating")&&s.jsx(Rl,{children:y})]}),s.jsxs(of,{children:[s.jsx("label",{htmlFor:"title",children:n("reviews.title")}),s.jsx(z9,{id:"title",type:"text",placeholder:n("reviews.titlePlaceholder"),value:l,onChange:j=>c(j.target.value),maxLength:100}),s.jsxs("span",{style:{fontSize:"12px",color:"#999"},children:[l.length,n("reviews.charLimit100")]}),y&&y.includes("title")&&s.jsx(Rl,{children:y})]}),s.jsxs(of,{children:[s.jsx("label",{htmlFor:"comment",children:n("reviews.comment")}),s.jsx(E9,{id:"comment",placeholder:n("reviews.commentPlaceholder"),value:d,onChange:j=>f(j.target.value),maxLength:500}),s.jsxs("span",{style:{fontSize:"12px",color:"#999"},children:[d.length,n("reviews.charLimit500")]}),y&&y.includes("comment")&&s.jsx(Rl,{children:y})]}),v&&s.jsx(T9,{children:v}),y&&!v&&s.jsx(Rl,{children:y}),s.jsxs(B9,{children:[s.jsx(Tv,{type:"submit",primary:!0,disabled:p,children:n(p?"reviews.submitting":"reviews.submitReview")}),s.jsx(Tv,{type:"button",onClick:()=>{a(0),c(""),f(""),m("")},children:n("reviews.clearForm")})]})]})]})},Pv=g.div`
  margin: 20px 0;
`,Nv=g.h3`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
`,N9=g.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,F9=g.div`
  background: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }
`,R9=g.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 8px;
  }
`,A9=g.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,I9=g.span`
  font-weight: 600;
  color: #333;
  font-size: 14px;
`,O9=g.span`
  font-size: 12px;
  color: #999;
`,q9=g.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`,M9=g.h4`
  margin: 0 0 8px 0;
  color: #333;
  font-size: 15px;
  font-weight: 600;
`,L9=g.p`
  margin: 0 0 12px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
`,D9=g.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #e0e0e0;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
`,W9=g.button`
  background: ${e=>e.helpful?"#e8f5e9":"transparent"};
  border: 1px solid ${e=>e.helpful?"#4caf50":"#ddd"};
  color: ${e=>e.helpful?"#4caf50":"#666"};
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #4caf50;
    color: #4caf50;
  }

  &:active {
    transform: scale(0.98);
  }
`,H9=g.button`
  background: #ffebee;
  border: 1px solid #ffcdd2;
  color: #d32f2f;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #ffcdd2;
  }

  &:active {
    transform: scale(0.98);
  }
`,U9=g.div`
  text-align: center;
  padding: 40px 20px;
  color: #999;

  p {
    margin: 0;
    font-size: 14px;
  }
`,V9=g.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`,sf=g.button`
  padding: 8px 12px;
  border: 1px solid ${e=>e.active?"#667eea":"#ddd"};
  border-radius: 4px;
  background: ${e=>e.active?"#f0f4ff":"white"};
  color: ${e=>e.active?"#667eea":"#666"};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #667eea;
  }
`,G9=({productId:e})=>{const t=_r(),{t:r}=xS(),n=wt(v=>v.auth.user),[o,i]=Ie.useState([]),[a,l]=Ie.useState("recent"),[c,d]=Ie.useState(new Set),f=Ie.useCallback(async()=>{try{const v=await jr.get(`/products/${e}`);if(v){const $=v.product||v;i($.reviews||[]),t(_k({productId:e,reviews:$.reviews||[],rating:$.rating||0,reviewCount:$.reviewCount||0}))}}catch(v){console.error("Failed to fetch reviews:",v)}},[e,t]);Ie.useEffect(()=>{f()},[f]);const p=[...o].sort((v,$)=>a==="recent"?new Date($.date).getTime()-new Date(v.date).getTime():a==="helpful"?$.helpful-v.helpful:a==="rating"?$.rating-v.rating:0),h=async()=>{await f()},y=async v=>{if(!c.has(v))try{await jr.patch(`/products/${e}/reviews/${v}/helpful`),d($=>new Set([...$,v])),await h()}catch($){console.error("Failed to update helpful:",$)}},m=async v=>{if(window.confirm(r("reviews.deleteConfirm")))try{await ue.delete(`/products/${e}/reviews/${v}`),await h()}catch($){console.error("Failed to delete review:",$)}};return o.length===0?s.jsxs(Pv,{children:[s.jsx(Nv,{children:r("reviews.title")}),s.jsx(U9,{children:s.jsx("p",{children:r("reviews.noReviews")})})]}):s.jsxs(Pv,{children:[s.jsxs(Nv,{children:[r("reviews.title")," (",o.length,")"]}),s.jsxs(V9,{children:[s.jsx("span",{style:{fontSize:"13px",color:"#666",display:"flex",alignItems:"center"},children:r("reviews.sortBy")}),s.jsx(sf,{active:a==="recent",onClick:()=>l("recent"),children:r("reviews.mostRecent")}),s.jsx(sf,{active:a==="helpful",onClick:()=>l("helpful"),children:r("reviews.mostHelpful")}),s.jsx(sf,{active:a==="rating",onClick:()=>l("rating"),children:r("reviews.highestRating")})]}),s.jsx(N9,{children:p.map(v=>s.jsxs(F9,{children:[s.jsxs(R9,{children:[s.jsxs(A9,{children:[s.jsx(I9,{children:v.userName}),s.jsx(O9,{children:v.date})]}),s.jsx(q9,{children:s.jsx(Fm,{rating:v.rating,showText:!1,size:"14px"})})]}),s.jsx(M9,{children:v.title}),s.jsx(L9,{children:v.comment}),s.jsxs(D9,{children:[s.jsx(W9,{helpful:c.has(v.id),onClick:()=>y(v.id),children:r("reviews.helpful",{count:v.helpful})}),n&&n.id===v.userId&&s.jsx(H9,{onClick:()=>m(v.id),children:r("reviews.delete")})]})]},v.id))})]})},K9=g.form`
  display: flex;
  flex-direction: column;
  gap: ${u[4]};
  padding: ${u[6]};
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`,Y9=g.h3`
  margin: 0 0 ${u[4]} 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${b.neutral[900]};
`,af=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[2]};
`,lf=g.label`
  font-weight: 600;
  color: ${b.neutral[900]};
  font-size: 0.95rem;
`,Fv=g(nr)`
  padding: ${u[2]} ${u[3]};
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
`,X9=g(dm)`
  padding: ${u[2]} ${u[3]} !important;
  border-radius: 4px !important;
  border: 1px solid #ddd !important;
  font-size: 1rem !important;
  resize: vertical !important;
`,Q9=g.div`
  display: flex;
  gap: ${u[3]};
  flex-wrap: wrap;
  margin-top: ${u[4]};
`,J9=g(ne)`
  flex: 1;
  min-width: 150px;
  padding: ${u[3]} ${u[6]} !important;
`,Z9=g.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${u[2]};
  padding: ${u[3]} ${u[6]};
  background: #25d366;
  color: white !important;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 150px;

  &:hover {
    background: #1faa51;
    transform: translateY(-2px);
  }
`,eR=g.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${u[2]};
  padding: ${u[3]} ${u[6]};
  background: #ff6b00;
  color: white !important;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 150px;

  &:hover {
    background: #e55a00;
    transform: translateY(-2px);
  }
`,tR=g.div`
  padding: ${u[4]};
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
  text-align: center;
  font-weight: 600;
`,rR=g.div`
  padding: ${u[4]};
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  color: #721c24;
  text-align: center;
  font-weight: 600;
`,nR=g.button`
  background: none;
  border: none;
  color: #4338ca;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-top: ${u[1]};
  display: inline-flex;
  align-items: center;
  gap: ${u[1]};
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: #3730a3;
  }
`,oR=g.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: ${u[4]};
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`,iR=g.div`
  background: #fff;
  border-radius: 12px;
  max-width: 520px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.25s ease;

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`,sR=g.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${u[5]} ${u[6]};
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #eef2ff 0%, #e8f0fe 100%);
  border-radius: 12px 12px 0 0;

  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: #4338ca;
    display: flex;
    align-items: center;
    gap: ${u[2]};
  }
`,aR=g.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${b.neutral[500]};
  padding: ${u[1]};
  line-height: 1;
  border-radius: 4px;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: ${b.neutral[900]};
  }
`,lR=g.div`
  padding: ${u[6]};
  color: ${b.neutral[800]};
  font-size: 0.9rem;
  line-height: 1.7;

  ul {
    margin: ${u[2]} 0;
    padding-left: ${u[5]};
  }

  li {
    margin-bottom: ${u[1]};
  }

  strong {
    color: ${b.neutral[900]};
  }

  code {
    background: rgba(99, 102, 241, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.85em;
    color: #4338ca;
  }

  .step {
    margin-bottom: ${u[4]};
    padding-bottom: ${u[4]};
    border-bottom: 1px dashed #e5e7eb;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }

  .step-label {
    display: inline-block;
    background: #4338ca;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 4px;
    margin-bottom: ${u[2]};
  }
`,cR=[{fieldName:"name",label:"Your Name",type:"text",required:!0,enabled:!0,placeholder:"Full name",options:[],displayOrder:0},{fieldName:"email",label:"Email Address",type:"email",required:!0,enabled:!0,placeholder:"your@email.com",options:[],displayOrder:1},{fieldName:"phone",label:"Phone Number",type:"tel",required:!0,enabled:!0,placeholder:"+91 98765 43210",options:[],displayOrder:2},{fieldName:"quantity",label:"Quantity Required",type:"number",required:!0,enabled:!0,placeholder:"e.g., 100",options:[],displayOrder:3},{fieldName:"quantityUnit",label:"Unit",type:"select",required:!1,enabled:!0,placeholder:"",options:["Units","Pieces","Sets","Kg","Boxes"],displayOrder:4},{fieldName:"message",label:"Additional Message / Requirements",type:"textarea",required:!1,enabled:!0,placeholder:"Tell us more about your needs...",options:[],displayOrder:5}],dR=({productId:e,productName:t})=>{const[r,n]=x.useState(cR),[o,i]=x.useState("Request Quote / Inquiry"),[a,l]=x.useState(!0),[c,d]=x.useState(!0),[f,p]=x.useState(!1),[h,y]=x.useState(""),[m,v]=x.useState(""),[$,S]=x.useState({}),[j,k]=x.useState(!1),[w,_]=x.useState(null),[B,E]=x.useState(!1),[N,L]=x.useState(!1),[V,R]=x.useState(!1);x.useEffect(()=>{(async()=>{try{const D=await be.getSiteSettings();if(D.inquiryFormFields&&D.inquiryFormFields.length>0){const ae=D.inquiryFormFields.filter(ee=>ee.enabled).sort((ee,fe)=>ee.displayOrder-fe.displayOrder);n(ae)}D.inquiryFormTitle&&i(D.inquiryFormTitle),l(D.showWhatsAppButton!==!1),d(D.showCallButton!==!1),p(D.showSqftCalculator!==!1),D.whatsappNumber&&y(D.whatsappNumber),D.phone&&v(D.phone)}catch(D){console.error("Failed to load inquiry form config:",D)}finally{R(!0)}})()},[]);const M=A=>{const{name:D,value:ae}=A.target;S(ee=>({...ee,[D]:ae}))},W=async A=>{A.preventDefault(),_(null),E(!0);try{(await jr.post("/inquiries",{...$,productId:e,productName:t})).success&&(k(!0),S({}),setTimeout(()=>k(!1),5e3))}catch(D){_(D.message||"Failed to submit inquiry. Please try again.")}finally{E(!1)}},Z=r.some(A=>A.type==="select"&&A.options.some(D=>D.toLowerCase()==="sq.ft")&&($[A.fieldName]||"").toLowerCase()==="sq.ft"),I=A=>{const D=A.replace(/[^0-9+]/g,"");return D.startsWith("+")?D:`+${D}`},T=h?`https://wa.me/${h.replace(/[^0-9]/g,"")}?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(t)}`:"",z=m?`tel:${I(m)}`:"";if(j)return s.jsx(tR,{children:"✓ Thank you! We've received your inquiry and will contact you soon."});if(!V)return null;const P=A=>{switch(A.type){case"textarea":return s.jsxs(af,{children:[s.jsxs(lf,{htmlFor:A.fieldName,children:[A.label,A.required?" *":""]}),s.jsx(X9,{id:A.fieldName,name:A.fieldName,value:$[A.fieldName]||"",onChange:M,placeholder:A.placeholder,required:A.required,rows:4})]},A.fieldName);case"select":return s.jsxs(af,{children:[s.jsxs(lf,{htmlFor:A.fieldName,children:[A.label,A.required?" *":""]}),s.jsx(Fv,{as:"select",id:A.fieldName,name:A.fieldName,value:$[A.fieldName]||A.options[0]||"",onChange:M,required:A.required,children:A.options.map(D=>s.jsx("option",{value:D.toLowerCase().replace(/\./g,""),children:D},D))})]},A.fieldName);default:return s.jsxs(af,{children:[s.jsxs(lf,{htmlFor:A.fieldName,children:[A.label,A.required?" *":""]}),s.jsx(Fv,{id:A.fieldName,name:A.fieldName,type:A.type,value:$[A.fieldName]||"",onChange:M,placeholder:A.placeholder,required:A.required})]},A.fieldName)}};return s.jsxs(s.Fragment,{children:[w&&s.jsxs(rR,{children:["❌ ",w]}),s.jsxs(K9,{onSubmit:W,children:[s.jsx(Y9,{children:o}),r.map(P),f&&Z&&s.jsx(nR,{type:"button",onClick:()=>L(!0),children:"📐 How to calculate area & quantity?"}),s.jsxs(Q9,{children:[s.jsx(J9,{appearance:"primary",type:"submit",disabled:B,children:B?"⏳ Submitting...":"📤 Send Inquiry"}),a&&T&&s.jsx(Z9,{href:T,target:"_blank",rel:"noopener noreferrer",onClick:A=>A.stopPropagation(),children:"💬 WhatsApp"}),c&&z&&s.jsx(eR,{href:z,onClick:A=>A.stopPropagation(),children:"📞 Call Now"})]})]}),N&&s.jsx(oR,{onClick:()=>L(!1),children:s.jsxs(iR,{onClick:A=>A.stopPropagation(),children:[s.jsxs(sR,{children:[s.jsx("h3",{children:"📐 Area & Quantity Guide"}),s.jsx(aR,{onClick:()=>L(!1),children:"×"})]}),s.jsxs(lR,{children:[s.jsxs("div",{className:"step",children:[s.jsx("span",{className:"step-label",children:"Step 1"}),s.jsx("br",{}),s.jsx("strong",{children:"Determine what you need"}),s.jsxs("ul",{children:[s.jsxs("li",{children:["Identify the ",s.jsx("strong",{children:"product"})," and the ",s.jsx("strong",{children:"unit of measurement"})," (pieces, sq.ft, kg, etc.)."]}),s.jsxs("li",{children:["For area-based products: ",s.jsx("code",{children:"Area = Length × Width"})]}),s.jsxs("li",{children:["Example: 12 ft × 10 ft = ",s.jsx("strong",{children:"120 sq.ft"})]})]})]}),s.jsxs("div",{className:"step",children:[s.jsx("span",{className:"step-label",children:"Step 2"}),s.jsx("br",{}),s.jsx("strong",{children:"Account for extras"}),s.jsxs("ul",{children:[s.jsxs("li",{children:["Add ",s.jsx("strong",{children:"5–10% extra"})," for waste, cutting, or spares."]}),s.jsx("li",{children:s.jsx("code",{children:"Total = Required Amount × 1.10"})}),s.jsxs("li",{children:["Example: 120 × 1.10 = ",s.jsx("strong",{children:"≈ 132 units"})]})]})]}),s.jsxs("div",{className:"step",children:[s.jsx("span",{className:"step-label",children:"Step 3"}),s.jsx("br",{}),s.jsx("strong",{children:"Submit your inquiry"}),s.jsxs("ul",{children:[s.jsx("li",{children:"Enter the total quantity and select the correct unit."}),s.jsx("li",{children:"Our team will confirm pricing and availability."})]})]})]})]})})]})},cf=g.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${u[6]};
  width: 100%;

  ${O.tablet} {
    padding: ${u[4]};
  }

  ${O.mobile} {
    padding: ${u[3]};
  }
`,uR=g(ro)`
  display: inline-flex;
  align-items: center;
  gap: ${u[2]};
  color: var(--color-primary, ${b.primary.main});
  text-decoration: none;
  margin-bottom: ${u[6]};
  font-weight: ${C.fontWeight.semibold};
  transition: all ${ye.fast};
  padding: ${u[2]} ${u[3]};

  &:hover {
    color: var(--color-primary-dark, ${b.primary.dark});
    gap: ${u[3]};
  }
`,fR=g.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${u[6]};
  margin-bottom: ${u[6]};
  align-items: start;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: ${u[8]};
  }
`,pR=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[3]};

  @media (min-width: 768px) {
    position: sticky;
    top: 90px;
  }
`,hR=g.div`
  position: relative;
  background: var(--color-neutral-0, ${b.neutral[0]});
  border-radius: ${J.lg};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;

  @media (min-width: 768px) {
    min-height: 420px;
  }

  img {
    width: 100%;
    height: 100%;
    min-height: 320px;
    object-fit: cover;

    @media (min-width: 768px) {
      min-height: 420px;
    }
  }

  video {
    width: 100%;
    max-height: 500px;
    object-fit: contain;
  }
`,Rv=g.button`
  position: absolute;
  top: 50%;
  ${e=>e.$dir==="left"?"left: 8px;":"right: 8px;"}
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.85);
  box-shadow: ${ze.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${b.neutral[700]};
  z-index: 2;
  transition: all ${ye.fast};

  &:hover {
    background: white;
    box-shadow: ${ze.lg};
  }
`,mR=g.div`
  display: flex;
  gap: ${u[2]};
  overflow-x: auto;
  padding: ${u[1]} 0;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${b.neutral[300]};
    border-radius: 2px;
  }
`,gR=g.button`
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: ${J.md};
  border: 2px solid ${e=>e.$active?b.primary.main:b.neutral[200]};
  background: ${b.neutral[50]};
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  position: relative;
  transition: border-color ${ye.fast};

  &:hover {
    border-color: ${b.primary.main};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${e=>e.$isVideo&&`
    &::after {
      content: '▶';
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.3);
      color: white;
      font-size: 20px;
    }
  `}
`,vR=g.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  video {
    max-width: 100%;
    max-height: 480px;
  }

  iframe {
    width: 100%;
    height: 380px;
    border: none;

    @media (min-width: 768px) {
      height: 420px;
    }
  }
`,bR=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[5]};
`,xR=g($w)`
  width: fit-content;
  padding: ${u[1]} ${u[3]};
  font-weight: ${C.fontWeight.semibold};
`,yR=g.h1`
  margin: 0;
  font-size: ${C.fontSize["3xl"]};
  font-weight: ${C.fontWeight.extrabold};
  color: var(--color-text-primary, ${b.neutral[900]});
  line-height: ${C.lineHeight.tight};

  @media (min-width: 768px) {
    font-size: ${C.fontSize["4xl"]};
  }
`,wR=g.div`
  display: flex;
  align-items: baseline;
  gap: ${u[3]};
  flex-wrap: wrap;
`,kR=g.span`
  font-size: ${C.fontSize["3xl"]};
  font-weight: ${C.fontWeight.extrabold};
  color: var(--color-primary, ${b.primary.main});

  @media (min-width: 768px) {
    font-size: ${C.fontSize["4xl"]};
  }
`,SR=g.span`
  font-size: ${C.fontSize.lg};
  color: ${b.neutral[500]};
  text-decoration: line-through;
`,jR=g.span`
  padding: ${u[1]} ${u[2]};
  background: #dcfce7;
  color: #16a34a;
  font-size: ${C.fontSize.sm};
  font-weight: ${C.fontWeight.bold};
  border-radius: ${J.sm};
`,$R=g.p`
  color: var(--color-text-secondary, ${b.neutral[600]});
  line-height: ${C.lineHeight.normal};
  margin: 0;
  font-size: ${C.fontSize.md};
  padding: ${u[4]};
  background: var(--color-neutral-50, ${b.neutral[50]});
  border-radius: ${J.md};
  border-left: 4px solid var(--color-primary, ${b.primary.main});
`,CR=g.div`
  display: inline-flex;
  align-items: center;
  gap: ${u[2]};
  padding: ${u[2]} ${u[3]};
  background: ${e=>e.$outOfStock?"#fef2f2":"#f0fdf4"};
  border-radius: ${J.md};
  border: 1px solid ${e=>e.$outOfStock?"#fecaca":"#bbf7d0"};
  font-size: ${C.fontSize.sm};
  font-weight: ${C.fontWeight.semibold};
  color: ${e=>e.$outOfStock?"#dc2626":"#16a34a"};
`,_R=g.button`
  width: 100%;
  padding: ${u[4]};
  background: var(--color-primary, ${b.primary.main});
  color: white;
  border: none;
  border-radius: ${J.md};
  font-size: ${C.fontSize.lg};
  font-weight: ${C.fontWeight.bold};
  cursor: pointer;
  transition: all ${ye.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${u[2]};

  &:hover {
    background: var(--color-primary-dark, ${b.primary.dark});
    transform: translateY(-1px);
    box-shadow: ${ze.md};
  }

  &:active {
    transform: translateY(0);
  }
`,zR=g.div`
  max-height: ${e=>e.$open?"1000px":"0"};
  overflow: hidden;
  transition: max-height 0.4s ease, opacity 0.3s ease;
  opacity: ${e=>e.$open?1:0};
`,ER=g.div`
  background: var(--color-neutral-0, ${b.neutral[0]});
  border-radius: ${J.lg};
  border: 1px solid var(--color-neutral-200, ${b.neutral[200]});
  box-shadow: ${ze.sm};
  overflow: hidden;
  margin-bottom: ${u[6]};
`,BR=g.h3`
  margin: 0;
  padding: ${u[5]} ${u[6]};
  font-size: ${C.fontSize.xl};
  font-weight: ${C.fontWeight.bold};
  color: var(--color-text-primary, ${b.neutral[900]});
  display: flex;
  align-items: center;
  gap: ${u[2]};
  border-bottom: 2px solid var(--color-neutral-200, ${b.neutral[200]});
  background: var(--color-neutral-50, ${b.neutral[50]});
`,TR=g.div`
  display: table;
  width: 100%;
  border-collapse: collapse;
`,PR=g.div`
  display: table-row;
  background: ${e=>e.$even?"var(--color-neutral-50, "+b.neutral[50]+")":"var(--color-neutral-0, "+b.neutral[0]+")"};

  &:hover {
    background: var(--color-primary-50, ${b.primary.light}12);
  }

  ${O.mobile} {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--color-neutral-200, ${b.neutral[200]});
    padding: ${u[3]} ${u[4]};
  }
`,NR=g.div`
  display: table-cell;
  width: 35%;
  padding: ${u[3]} ${u[5]};
  font-size: ${C.fontSize.sm};
  font-weight: ${C.fontWeight.semibold};
  color: var(--color-text-secondary, ${b.neutral[600]});
  border-bottom: 1px solid var(--color-neutral-100, ${b.neutral[100]});
  border-right: 1px solid var(--color-neutral-100, ${b.neutral[100]});
  vertical-align: middle;

  ${O.mobile} {
    display: block;
    width: 100%;
    padding: 0 0 ${u[1]} 0;
    font-size: ${C.fontSize.xs};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: none;
  }
`,FR=g.div`
  display: table-cell;
  padding: ${u[3]} ${u[5]};
  font-size: ${C.fontSize.sm};
  font-weight: ${C.fontWeight.medium};
  color: var(--color-text-primary, ${b.neutral[900]});
  border-bottom: 1px solid var(--color-neutral-100, ${b.neutral[100]});
  vertical-align: middle;

  ${O.mobile} {
    display: block;
    padding: 0;
    border: none;
  }
`,Av=g.div`
  text-align: center;
  padding: ${u[16]} ${u[6]};
  background: var(--color-neutral-0, ${b.neutral[0]});
  border-radius: ${J.lg};

  h2 {
    font-size: ${C.fontSize["3xl"]};
    margin-bottom: ${u[3]};
    color: var(--color-text-primary, ${b.neutral[900]});
  }

  p {
    color: var(--color-text-secondary, ${b.neutral[600]});
    margin-bottom: ${u[6]};
    font-size: ${C.fontSize.lg};
  }

  ${O.mobile} {
    padding: ${u[8]} ${u[4]};

    h2 {
      font-size: ${C.fontSize["2xl"]};
    }
  }
`,Iv=g.div`
  margin-top: ${u[8]};

  ${O.mobile} {
    margin-top: ${u[6]};
  }
`,RR=g.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${u[2]};
`,AR=g.span`
  padding: ${u[1]} ${u[3]};
  border-radius: 20px;
  background: var(--color-primary-lighter, ${b.primary.lighter});
  color: var(--color-primary-dark, ${b.primary.dark});
  font-size: ${C.fontSize.xs};
  font-weight: ${C.fontWeight.semibold};
`,IR=g.h2`
  margin: 0 0 ${u[6]} 0;
  font-size: ${C.fontSize["3xl"]};
  font-weight: ${C.fontWeight.extrabold};
  color: var(--color-text-primary, ${b.neutral[900]});
  border-bottom: 3px solid var(--color-primary, ${b.primary.main});
  padding-bottom: ${u[3]};
  display: inline-block;

  ${O.tablet} {
    font-size: ${C.fontSize["2xl"]};
  }

  ${O.mobile} {
    font-size: ${C.fontSize["2xl"]};
    padding-bottom: ${u[2]};
  }
`,OR=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${u[4]};

  ${O.mobile} {
    gap: ${u[3]};
  }
`;g.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: ${u[8]};
  color: var(--color-text-tertiary, ${b.neutral[500]});
  font-size: ${C.fontSize.base};
`;const qR=()=>{var M,W,Z,I,T;const{id:e}=qN();dr();const[t,r]=x.useState(!1),[n,o]=x.useState(""),[i,a]=x.useState(null),[l,c]=x.useState(!0),[d,f]=x.useState(null),[p,h]=x.useState(0),[y,m]=x.useState(!1),[v,$]=x.useState(0),S=x.useRef(null);_r(),x.useEffect(()=>{if(S.current&&S.current.abort(),!e){f("Product ID is missing"),c(!1);return}return(async()=>{try{c(!0),f(null),S.current=new AbortController;const P=await jr.get(`/products/${e}`);P!=null&&P.product?a(P.product):f("Product not found")}catch(P){(P==null?void 0:P.name)!=="AbortError"&&(console.error("Error fetching product:",P),f("Product not found"))}finally{c(!1)}})(),()=>{S.current&&S.current.abort()}},[e]);const j=wt(z=>z.products.items),k=i?j.filter(z=>z.category===(i==null?void 0:i.category)&&z.id!==(i==null?void 0:i.id)).slice(0,4):[];if(l)return s.jsx(cf,{children:s.jsx(Av,{children:s.jsx("h2",{children:"Loading product..."})})});if(!i||d)return s.jsx(cf,{children:s.jsxs(Av,{children:[s.jsx("h2",{children:"Product not found"}),s.jsx("p",{children:"The product you're looking for doesn't exist."}),s.jsx(ro,{to:"/",children:s.jsx(ne,{appearance:"primary",children:"Back to Dashboard"})})]})});const w=[];((M=i==null?void 0:i.images)!=null&&M.length?i.images:i!=null&&i.image?[i.image]:[]).forEach(z=>w.push({type:"image",src:no(z)})),((i==null?void 0:i.videos)||[]).forEach(z=>w.push({type:"video",src:z}));const B=z=>{const P=z.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);return P?P[1]:null},E=z=>{const P=B(z);return P?`https://img.youtube.com/vi/${P}/mqdefault.jpg`:null},N=z=>{w.length<=1||$(P=>(P+z+w.length)%w.length)},L=[];i&&(i.material&&L.push({label:"Material",value:i.material}),i.finish&&L.push({label:"Finish",value:i.finish}),i.color&&L.push({label:"Color",value:i.color}),i.specifications&&Object.entries(i.specifications).forEach(([z,P])=>{P&&L.push({label:z.replace(/([A-Z])/g," $1").replace(/^./,A=>A.toUpperCase()),value:String(P)})}),i.customFilters&&Object.entries(i.customFilters).forEach(([z,P])=>{P&&L.push({label:z.replace(/-/g," ").replace(/\b\w/g,A=>A.toUpperCase()),value:String(P)})}),i.sizes&&i.sizes.length>0&&L.push({label:"Available Sizes",value:s.jsx(RR,{children:i.sizes.map(z=>s.jsx(AR,{children:z},z))})}));const V="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23f0f0f0' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E",R="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect fill='%23333' width='64' height='64'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23fff' font-size='24'%3E▶%3C/text%3E%3C/svg%3E";return s.jsxs(cf,{children:[s.jsxs(uR,{to:"/catalog",children:[s.jsx(P3,{})," Back to Products"]}),s.jsxs(fR,{children:[s.jsxs(pR,{children:[s.jsxs(hR,{children:[w.length>1&&s.jsx(Rv,{$dir:"left",onClick:()=>N(-1),children:"‹"}),w.length===0?s.jsx("img",{src:V,alt:"No image available"}):((W=w[v])==null?void 0:W.type)==="image"?s.jsx("img",{src:w[v].src,alt:`${i.title} - ${v+1}`,onError:z=>{z.target.src=V}}):s.jsx(vR,{children:B(w[v].src)?s.jsx("iframe",{src:`https://www.youtube.com/embed/${B(w[v].src)}`,title:"Product video",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0}):s.jsx("video",{controls:!0,src:w[v].src,children:"Your browser does not support video playback."})}),w.length>1&&s.jsx(Rv,{$dir:"right",onClick:()=>N(1),children:"›"})]}),w.length>1&&s.jsx(mR,{children:w.map((z,P)=>s.jsx(gR,{$active:P===v,$isVideo:z.type==="video",onClick:()=>$(P),children:z.type==="image"?s.jsx("img",{src:z.src,alt:`Thumb ${P+1}`,onError:A=>{A.target.style.display="none"}}):s.jsx("img",{src:E(z.src)||R,alt:"Video"})},P))})]}),s.jsxs(bR,{children:[s.jsx(xR,{color:"informative",appearance:"outline",children:(Z=i.category)==null?void 0:Z.toUpperCase()}),s.jsx(yR,{children:i.title}),i.showPriceInListing!==!1&&i.price>0&&s.jsxs(wR,{children:[s.jsxs(kR,{children:["₹ ",(I=i.price)==null?void 0:I.toLocaleString("en-IN",{minimumFractionDigits:2})]}),i.mrp&&i.mrp>i.price&&s.jsxs(SR,{children:["₹ ",i.mrp.toLocaleString("en-IN",{minimumFractionDigits:2})]}),((T=i.discount)==null?void 0:T.discountValue)>0&&s.jsx(jR,{children:i.discount.discountType==="percentage"?`${i.discount.discountValue}% OFF`:`₹${i.discount.discountValue} OFF`})]}),s.jsx(Fm,{rating:i.rating,count:i.reviewCount}),s.jsx($R,{children:i.description}),s.jsx(CR,{$outOfStock:i.stock!=null&&i.stock<=0,children:i.stock!=null&&i.stock<=0?"✕ Out of Stock":"✓ In Stock"}),s.jsx(_R,{onClick:()=>m(z=>!z),children:y?"✕ Close Inquiry":"📩 Enquire Now"}),s.jsx(zR,{$open:y,children:s.jsx(dR,{productId:String(i._id||i.id),productName:i.title})})]})]}),L.length>0&&s.jsxs(ER,{children:[s.jsx(BR,{children:"📋 Product Specifications"}),s.jsx(TR,{children:L.map((z,P)=>s.jsxs(PR,{$even:P%2===0,children:[s.jsx(NR,{children:z.label}),s.jsx(FR,{children:z.value})]},z.label))})]}),k.length>0&&s.jsxs(Iv,{children:[s.jsx(IR,{children:"Related Products"}),s.jsx(OR,{children:k.map(z=>s.jsx(Rm,{product:z},z.id))})]}),s.jsx(Iv,{children:s.jsx(G9,{productId:i.id},p)}),s.jsx(P9,{productId:i.id,onReviewAdded:()=>h(z=>z+1)}),t&&s.jsx(pS,{message:n,type:"success",duration:3e3})]})},MR=g.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${b.gradients.primary};
  padding: ${u[4]};

  ${O.mobile} {
    padding: ${u[3]};
  }
`,LR=g.div`
  background: var(--color-neutral-0, ${b.neutral[0]});
  border-radius: ${J.lg};
  box-shadow: ${ze.lg};
  width: 100%;
  max-width: 420px;
  padding: ${u[12]};

  ${O.tablet} {
    max-width: 100%;
    padding: ${u[8]};
  }

  ${O.mobile} {
    padding: ${u[6]};
  }
`,DR=g.div`
  display: flex;
  gap: ${u[3]};
  margin-bottom: ${u[8]};
  border-bottom: 2px solid var(--color-neutral-200, ${b.neutral[200]});
`,Ov=g.button`
  padding: ${u[3]} ${u[6]};
  border: none;
  background: none;
  cursor: pointer;
  font-size: ${C.fontSize.lg};
  font-weight: ${e=>e.isActive?C.fontWeight.semibold:C.fontWeight.medium};
  color: ${e=>e.isActive?`var(--color-primary, ${b.primary.main})`:`var(--color-text-tertiary, ${b.neutral[500]})`};
  border-bottom: ${e=>e.isActive?`3px solid var(--color-primary, ${b.primary.main})`:"none"};
  margin-bottom: -2px;
  transition: all ${ye.fast};
  min-height: 44px;

  &:hover {
    color: var(--color-primary, ${b.primary.main});
  }

  ${O.mobile} {
    padding: ${u[2]} ${u[4]};
    font-size: ${C.fontSize.md};
  }
`,qv=g.h2`
  margin: 0 0 ${u[6]} 0;
  font-size: ${C.fontSize["2xl"]};
  font-weight: ${C.fontWeight.extrabold};
  color: var(--color-text-primary, ${b.neutral[900]});

  ${O.mobile} {
    font-size: ${C.fontSize.xl};
  }
`,Zo=g.div`
  margin-bottom: ${u[5]};
  display: flex;
  flex-direction: column;
  gap: ${u[2]};

  ${O.mobile} {
    margin-bottom: ${u[4]};
  }
`,ei=g(nr)`
  width: 100%;
  min-height: 44px;
`,Mv=g.div`
  display: flex;
  gap: ${u[3]};
  margin-top: ${u[8]};

  ${O.mobile} {
    flex-direction: column;
    gap: ${u[2]};
    margin-top: ${u[6]};
  }
`,Lv=g(ne)`
  flex: 1;
  min-height: 44px;
  font-size: ${C.fontSize.lg};
  font-weight: ${C.fontWeight.semibold};
`,WR=g.div`
  padding: ${u[3]};
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: ${b.error};
  border-radius: ${J.md};
  margin-bottom: ${u[4]};
  font-size: ${C.fontSize.sm};
  border-left: 4px solid ${b.error};
  font-weight: ${C.fontWeight.medium};
`,HR=g.div`
  padding: ${u[3]};
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  color: ${b.success};
  border-radius: ${J.md};
  margin-bottom: ${u[4]};
  font-size: ${C.fontSize.sm};
  border-left: 4px solid ${b.success};
  font-weight: ${C.fontWeight.medium};
`,UR=()=>{const[e,t]=x.useState("login"),[r,n]=x.useState(""),[o,i]=x.useState(""),a=_r(),l=dr(),{isAuthenticated:c,loading:d,error:f}=wt(k=>k.auth),[p,h]=x.useState({email:"",password:""}),[y,m]=x.useState({name:"",email:"",password:"",confirmPassword:""});c&&l("/account");const v=(k,w)=>{h(_=>({..._,[k]:w})),n("")},$=(k,w)=>{m(_=>({..._,[k]:w})),n("")},S=async()=>{if(!p.email||!p.password){n("Please fill in all fields");return}if(!p.email.includes("@")){n("Please enter a valid email");return}try{const k=await a(ia({email:p.email,password:p.password})).unwrap();await Promise.all([a(Ni()).unwrap().catch(()=>{}),a(sa()).unwrap().catch(()=>{})]),i("Login successful!"),setTimeout(()=>l("/account"),1500)}catch(k){n(k||"Login failed")}},j=async()=>{if(!y.name||!y.email||!y.password||!y.confirmPassword){n("Please fill in all fields");return}if(!y.email.includes("@")){n("Please enter a valid email");return}if(y.password.length<6){n("Password must be at least 6 characters");return}if(y.password!==y.confirmPassword){n("Passwords do not match");return}try{const k=await a(mc({name:y.name,email:y.email,password:y.password})).unwrap();await Promise.all([a(Ni()).unwrap().catch(()=>{}),a(sa()).unwrap().catch(()=>{})]),i("Account created successfully!"),setTimeout(()=>l("/account"),1500)}catch(k){n(k||"Signup failed")}};return s.jsx(MR,{children:s.jsxs(LR,{children:[s.jsxs(DR,{children:[s.jsx(Ov,{isActive:e==="login",onClick:()=>t("login"),children:"Login"}),s.jsx(Ov,{isActive:e==="signup",onClick:()=>t("signup"),children:"Sign Up"})]}),r&&s.jsx(WR,{children:r}),o&&s.jsx(HR,{children:o}),e==="login"?s.jsxs(s.Fragment,{children:[s.jsx(qv,{children:"Welcome Back"}),s.jsxs(Zo,{children:[s.jsx(Je,{htmlFor:"login-email",weight:"semibold",children:"Email"}),s.jsx(ei,{id:"login-email",type:"email",placeholder:"Enter your email",value:p.email,onChange:(k,w)=>v("email",w.value)})]}),s.jsxs(Zo,{children:[s.jsx(Je,{htmlFor:"login-password",weight:"semibold",children:"Password"}),s.jsx(ei,{id:"login-password",type:"password",placeholder:"Enter your password",value:p.password,onChange:(k,w)=>v("password",w.value)})]}),s.jsx(Mv,{children:s.jsx(Lv,{appearance:"primary",onClick:S,disabled:d,children:d?"Logging in...":"Login"})})]}):s.jsxs(s.Fragment,{children:[s.jsx(qv,{children:"Create Account"}),s.jsxs(Zo,{children:[s.jsx(Je,{htmlFor:"signup-name",weight:"semibold",children:"Full Name"}),s.jsx(ei,{id:"signup-name",placeholder:"Enter your name",value:y.name,onChange:(k,w)=>$("name",w.value)})]}),s.jsxs(Zo,{children:[s.jsx(Je,{htmlFor:"signup-email",weight:"semibold",children:"Email"}),s.jsx(ei,{id:"signup-email",type:"email",placeholder:"Enter your email",value:y.email,onChange:(k,w)=>$("email",w.value)})]}),s.jsxs(Zo,{children:[s.jsx(Je,{htmlFor:"signup-password",weight:"semibold",children:"Password"}),s.jsx(ei,{id:"signup-password",type:"password",placeholder:"Enter password (min 6 characters)",value:y.password,onChange:(k,w)=>$("password",w.value)})]}),s.jsxs(Zo,{children:[s.jsx(Je,{htmlFor:"signup-confirm",weight:"semibold",children:"Confirm Password"}),s.jsx(ei,{id:"signup-confirm",type:"password",placeholder:"Confirm password",value:y.confirmPassword,onChange:(k,w)=>$("confirmPassword",w.value)})]}),s.jsx(Mv,{children:s.jsx(Lv,{appearance:"primary",onClick:j,disabled:d,children:d?"Creating Account...":"Sign Up"})})]})]})})},Dv=g.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, ${b.primary.main} 0%, ${b.primary.light} 100%);
  padding: ${u[8]};

  ${O.mobile} {
    padding: ${u[4]};
  }
`,Wv=g.div`
  background: white;
  border-radius: ${J.lg};
  box-shadow: ${ze.lg};
  width: 100%;
  max-width: 420px;
  padding: ${u[12]};

  ${O.tablet} {
    max-width: 100%;
    padding: ${u[8]};
  }

  ${O.mobile} {
    padding: ${u[4]};
  }
`,Hv=g.div`
  text-align: center;
  margin-bottom: ${u[12]};
`,Uv=g.h1`
  font-size: ${C.fontSize["5xl"]};
  color: ${b.primary.main};
  margin-bottom: ${u[2]};
`,Vv=g.p`
  font-size: ${C.fontSize.base};
  color: ${b.neutral[600]};
`,Gv=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[2]};
  margin-bottom: ${u[8]};
`,Kv=g.label`
  font-weight: ${C.fontWeight.semibold};
  color: ${b.neutral[900]};
  font-size: ${C.fontSize.sm};
`,Yv=g(nr)`
  width: 100%;
`,VR=g(ne)`
  width: 100%;
  padding: ${u[4]} ${u[8]};
  font-size: ${C.fontSize.base};
  font-weight: ${C.fontWeight.semibold};
`,Xv=g.div`
  color: ${b.error};
  background: rgba(239, 68, 68, 0.1);
  padding: ${u[4]};
  border-radius: ${J.base};
  margin-bottom: ${u[8]};
  font-size: ${C.fontSize.sm};
`,GR=g.div`
  color: ${b.success};
  background: rgba(16, 185, 129, 0.1);
  padding: ${u[4]};
  border-radius: ${J.base};
  margin-bottom: ${u[8]};
  font-size: ${C.fontSize.sm};
`,KR=g.div`
  background: ${b.primary.lighter};
  border-left: 4px solid ${b.primary.main};
  padding: ${u[4]};
  border-radius: ${J.base};
  margin-bottom: ${u[8]};
  font-size: ${C.fontSize.sm};
  
  strong {
    color: ${b.primary.main};
  }

  p {
    margin: ${u[2]} 0;
    color: ${b.neutral[700]};
  }
`,Qv=g(ne)`
  width: 100%;
  margin-top: ${u[8]};
`,YR=()=>{const[e,t]=x.useState(""),[r,n]=x.useState(""),[o,i]=x.useState(""),[a,l]=x.useState(""),[c,d]=x.useState(!1),f=dr(),p=_r(),{user:h,loading:y,token:m}=wt(S=>S.auth);if(m&&(h==null?void 0:h.role)==="admin"&&!y)return s.jsx(Kp,{to:"/admin/dashboard",replace:!0});if(y)return null;if(m){if(h&&h.role!=="admin")return s.jsx(Dv,{children:s.jsxs(Wv,{children:[s.jsxs(Hv,{children:[s.jsx(Uv,{children:"🚫 Access Denied"}),s.jsx(Vv,{children:"Admin Portal"})]}),s.jsx(Xv,{children:"❌ Your account doesn't have admin access. Contact the root administrator to grant you admin privileges."}),s.jsx(Qv,{appearance:"primary",onClick:()=>f("/"),children:"← Back to Store"})]})})}const v=S=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(S),$=async S=>{var j;if(S.preventDefault(),i(""),l(""),!e.trim()||!v(e)){i("Please enter a valid email address");return}if(r.length<6){i("Password must be at least 6 characters");return}d(!0);try{const k=await p(ia({email:e,password:r}));k.payload&&((j=k.payload.user)==null?void 0:j.role)==="admin"?(l("Login successful! Redirecting to admin dashboard..."),setTimeout(()=>{f("/admin/dashboard")},1e3)):i("❌ This account doesn't have admin access. Contact the root administrator to grant you admin privileges.")}catch(k){i(k.message||"Login failed")}finally{d(!1)}};return s.jsx(Dv,{children:s.jsxs(Wv,{children:[s.jsxs(Hv,{children:[s.jsx(Uv,{children:"🔐 Admin"}),s.jsx(Vv,{children:"Store Management Portal"})]}),s.jsxs(KR,{children:[s.jsx("strong",{children:"ℹ️  Admin Login"}),s.jsx("p",{children:"👉 Only administrators can access this portal."}),s.jsxs("p",{children:["👉 ",s.jsx("strong",{children:"Not an admin yet?"})," Regular users should signup from the main store page."]})]}),o&&s.jsx(Xv,{children:o}),a&&s.jsx(GR,{children:a}),s.jsxs("form",{onSubmit:$,children:[s.jsxs(Gv,{children:[s.jsx(Kv,{children:"Email Address"}),s.jsx(Yv,{type:"email",value:e,onChange:S=>t(S.target.value),placeholder:"your@email.com",disabled:c})]}),s.jsxs(Gv,{children:[s.jsx(Kv,{children:"Password"}),s.jsx(Yv,{type:"password",value:r,onChange:S=>n(S.target.value),placeholder:"Enter password",disabled:c})]}),s.jsx(VR,{appearance:"primary",type:"submit",disabled:c,children:c?"Logging in...":"Login to Admin"})]}),s.jsx(Qv,{appearance:"secondary",onClick:()=>f("/"),disabled:c,children:"← Back to Store"})]})})},XR=g.form`
  display: flex;
  flex-direction: column;
  gap: ${u[8]};
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 600px) {
    gap: ${u[5]};
  }
`,qe=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[2]};
  min-width: 0;
  max-width: 100%;

  & > * {
    min-width: 0;
  }
`,Ze=g.label`
  font-size: ${C.fontSize.base};
  font-weight: ${C.fontWeight.semibold};
  color: var(--color-text-primary, ${b.neutral[900]});

  @media (max-width: 600px) {
    font-size: ${C.fontSize.sm};
  }
`,Ct=g(nr)`
  width: 100%;
  max-width: 100%;
  min-width: 0;

  & > * {
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  input {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }
`,QR=g.textarea`
  width: 100%;
  max-width: 100%;
  padding: ${u[2]};
  border: 1px solid ${b.neutral[300]};
  border-radius: 4px;
  font-family: ${C.fontFamily.base};
  font-size: ${C.fontSize.sm};
  resize: vertical;
  min-height: 120px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${b.primary.main};
    box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);
  }

  @media (max-width: 600px) {
    min-height: 80px;
  }
`,JR=g.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${u[4]};
  padding: ${u[6]};
  background: ${b.neutral[50]};
  border-radius: 8px;
  border: 1px solid ${b.neutral[200]};
  box-sizing: border-box;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: ${u[3]};
  }
`;g.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${u[4]};
  min-width: 0;
  max-width: 100%;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;const Jv=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[4]};
  min-width: 0;
  max-width: 100%;
`,Zv=g.div`
  display: flex;
  gap: ${u[2]};
  max-width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;

    > input {
      width: 100%;
      flex: unset;
    }

    > button {
      width: 100%;
    }
  }
`,ZR=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: ${u[3]};
  margin-top: ${u[4]};
`,eA=g.div`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  background: ${b.neutral[200]};
  aspect-ratio: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,tA=g.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 2px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`,eb=g.input`
  padding: ${u[2]};
  border: 1px solid ${b.neutral[300]};
  border-radius: 4px;
  font-size: ${C.fontSize.sm};
  flex: 1;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${b.primary.main};
  }
`,tb=g.div`
  padding: ${u[3]};
  background: #f0f9ff;
  border-left: 4px solid #0284c7;
  border-radius: 4px;
  font-size: ${C.fontSize.sm};
  color: #0c4a6e;
  margin-bottom: ${u[3]};
  line-height: 1.5;
  overflow-wrap: break-word;
  word-break: break-word;

  @media (max-width: 600px) {
    font-size: ${C.fontSize.xs};
    padding: ${u[2]};
  }
`,rb=g.strong`
  display: block;
  margin-bottom: ${u[1]};
`,rA=g(ne)`
  align-self: flex-end;
  min-width: 120px;

  @media (max-width: 600px) {
    align-self: stretch;
    width: 100%;
  }
`,nA=g.div`
  color: ${b.error};
  font-size: ${C.fontSize.sm};
  padding: ${u[2]};
  background: rgba(239, 68, 68, 0.1);
  border-radius: 4px;
`,oA=g.div`
  color: ${b.success};
  font-size: ${C.fontSize.sm};
  padding: ${u[2]};
  background: rgba(16, 185, 129, 0.1);
  border-radius: 4px;
`,iA=g.div`
  display: flex;
  align-items: center;
  gap: ${u[2]};
`,nb=g.div`
  font-size: ${C.fontSize.sm};
  color: ${b.neutral[700]};
  padding: ${u[2]};
  background: white;
  border-radius: 4px;
  margin-top: ${u[2]};
`,sA=g.div`
  font-size: ${C.fontSize.sm};
  color: ${b.success};
  margin-top: ${u[1]};
`,df=g.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${u[4]};
  padding: ${u[6]};
  background: ${b.neutral[50]};
  border-radius: 8px;
  border: 1px solid ${b.neutral[200]};
  box-sizing: border-box;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: ${u[3]};
  }
`,ob=g.select`
  width: 100%;
  max-width: 100%;
  padding: ${u[2]};
  border: 1px solid ${b.neutral[300]};
  border-radius: 4px;
  font-size: ${C.fontSize.sm};
  box-sizing: border-box;
  background: white;

  &:focus {
    outline: none;
    border-color: ${b.primary.main};
  }
`,aA=g.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${u[3]} ${u[4]};
  background: ${b.neutral[50]};
  border: 1px solid ${b.neutral[200]};
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  transition: all 0.15s ease;

  &:hover {
    background: ${b.neutral[100]};
  }
`,lA=g.span`
  font-size: ${C.fontSize.base};
  font-weight: ${C.fontWeight.semibold};
  color: var(--color-text-primary, ${b.neutral[900]});
`,cA=g.div`
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: ${e=>e.$active?b.primary.main:b.neutral[300]};
  position: relative;
  transition: background 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${e=>e.$active?"22px":"2px"};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: left 0.2s ease;
  }
`,dA=g.div`
  max-height: ${e=>e.$open?"2000px":"0"};
  overflow: hidden;
  transition: max-height 0.3s ease;
`,uA=g.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: ${u[2]};
  align-items: center;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: ${u[1]};
  }
`,fA=g.button`
  padding: ${u[1]} ${u[2]};
  border: none;
  background: ${b.error};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: ${C.fontSize.sm};
  transition: background 0.15s ease;

  &:hover {
    background: #dc2626;
  }

  @media (max-width: 600px) {
    align-self: flex-end;
  }
`,pA=g.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: ${u[2]};
  align-items: end;
  padding-top: ${u[3]};
  border-top: 1px dashed ${b.neutral[300]};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: ${u[1]};
  }
`,hA=({onSubmit:e,initialData:t,isLoading:r=!1})=>{var tl,eu;const[n,o]=x.useState((t==null?void 0:t.title)||""),[i,a]=x.useState((t==null?void 0:t.description)||""),[l,c]=x.useState((t==null?void 0:t.price)||""),[d,f]=x.useState((t==null?void 0:t.mrp)||""),[p,h]=x.useState((t==null?void 0:t.retailPrice)||""),[y,m]=x.useState(((tl=t==null?void 0:t.discount)==null?void 0:tl.discountType)||"percentage"),[v,$]=x.useState(((eu=t==null?void 0:t.discount)==null?void 0:eu.discountValue)||""),[S,j]=x.useState((t==null?void 0:t.showPriceInListing)!==!1),[k,w]=x.useState(t?t.price>0||t.mrp>0||t.retailPrice>0:!1),[_,B]=x.useState((t==null?void 0:t.category)||""),[E,N]=x.useState((t==null?void 0:t.quantity)||""),[L,V]=x.useState((t==null?void 0:t.images)||[]),[R,M]=x.useState(""),[W,Z]=x.useState(!1),[I,T]=x.useState((t==null?void 0:t.videos)||[]),[z,P]=x.useState(""),[A,D]=x.useState(!1),[ae,ee]=x.useState(""),[fe,me]=x.useState(""),[Se,_e]=x.useState((t==null?void 0:t.material)||""),[rt,Nt]=x.useState((t==null?void 0:t.finish)||""),[Oe,kt]=x.useState((t==null?void 0:t.sizes)||[]),[gt,at]=x.useState((t==null?void 0:t.color)||""),[Hr,Jt]=x.useState(()=>t!=null&&t.specifications?Object.entries(t.specifications).filter(([G])=>G!==void 0).map(([G,F])=>({key:G,value:String(F||"")})).filter(G=>G.key&&G.value):[]),[Re,Ve]=x.useState(""),[co,uo]=x.useState(""),[Xd,Qa]=x.useState([]),[Qd,ls]=x.useState(""),[Ja,cs]=x.useState(!1),[Za,Jd]=x.useState([]),[ds,Yo]=x.useState((t==null?void 0:t.customFilters)||{}),fo=!!t;x.useEffect(()=>{jr.get("/categories").then(G=>{const F=(G.categories||[]).map(U=>U.name).filter(Boolean);Qa(F),t!=null&&t.category&&!F.includes(t.category)&&(cs(!0),ls(t.category))}).catch(()=>{}),jr.get("/filters").then(G=>{Jd(G.filters||[])}).catch(()=>{})},[]),x.useEffect(()=>{var G,F;o((t==null?void 0:t.title)||""),a((t==null?void 0:t.description)||""),c((t==null?void 0:t.price)||""),f((t==null?void 0:t.mrp)||""),h((t==null?void 0:t.retailPrice)||""),m(((G=t==null?void 0:t.discount)==null?void 0:G.discountType)||"percentage"),$(((F=t==null?void 0:t.discount)==null?void 0:F.discountValue)||""),j((t==null?void 0:t.showPriceInListing)!==!1),w(t?t.price>0||t.mrp>0||t.retailPrice>0:!1),B((t==null?void 0:t.category)||""),N((t==null?void 0:t.quantity)||""),V((t==null?void 0:t.images)||[]),M(""),T((t==null?void 0:t.videos)||[]),P(""),ee(""),me(""),_e((t==null?void 0:t.material)||""),Nt((t==null?void 0:t.finish)||""),kt((t==null?void 0:t.sizes)||[]),at((t==null?void 0:t.color)||""),Jt(t!=null&&t.specifications?Object.entries(t.specifications).filter(([U])=>U!==void 0).map(([U,re])=>({key:U,value:String(re||"")})).filter(U=>U.key&&U.value):[]),Ve(""),uo(""),Yo((t==null?void 0:t.customFilters)||{})},[t]);const us=()=>{let G=parseFloat(p||l);return!v||!G?G:y==="percentage"?G-G*parseFloat(v)/100:G-parseFloat(v)},rn=()=>{if(!R.trim()){ee("Please enter an image URL");return}if(L.includes(R)){ee("This image URL already exists");return}V([...L,R]),M(""),ee("")},Zd=G=>{V(L.filter((F,U)=>U!==G))},el=async G=>{if(G.preventDefault(),ee(""),me(""),!n.trim()||!i.trim()||!_.trim()||!E){ee("Please fill in all required fields");return}const F={};Hr.forEach(U=>{U.key.trim()&&U.value.trim()&&(F[U.key.trim()]=U.value.trim())});try{await e({title:n,description:i,price:k&&l?parseFloat(l):0,mrp:k&&d?parseFloat(d):null,retailPrice:k&&p?parseFloat(p):null,discount:k&&v?{discountType:y,discountValue:parseFloat(v)}:{},showPriceInListing:k?S:!1,category:_,quantity:parseInt(E),images:L,videos:I,material:Se,finish:rt,sizes:Oe,color:gt,specifications:F,customFilters:ds}),me(fo?"Product updated successfully!":"Product added successfully!"),fo||(o(""),a(""),c(""),f(""),h(""),m("percentage"),$(""),j(!0),B(""),N(""),V([]),T([]),_e(""),Nt(""),kt([]),at(""),Jt([]),Ve(""),uo(""),Yo({})),setTimeout(()=>me(""),3e3)}catch(U){ee(U.message||(fo?"Failed to update product":"Failed to add product"))}};return s.jsxs(XR,{onSubmit:el,children:[ae&&s.jsx(nA,{children:ae}),fe&&s.jsx(oA,{children:fe}),s.jsxs(qe,{children:[s.jsx(Ze,{children:"Product Title *"}),s.jsx(Ct,{value:n,onChange:G=>o(G.target.value),placeholder:"Enter product title",disabled:r})]}),s.jsxs(qe,{children:[s.jsx(Ze,{children:"Description *"}),s.jsx(QR,{value:i,onChange:G=>a(G.target.value),placeholder:"Enter product description",disabled:r})]}),s.jsxs(qe,{children:[s.jsx(Ze,{children:"Category *"}),s.jsxs(ob,{value:Ja?"__custom__":_,onChange:G=>{G.target.value==="__custom__"?(cs(!0),B("")):(cs(!1),B(G.target.value),ls(""))},disabled:r,children:[s.jsx("option",{value:"",children:"Select a category"}),Xd.map(G=>s.jsx("option",{value:G,children:G},G)),s.jsx("option",{value:"__custom__",children:"+ Custom category..."})]}),Ja&&s.jsx(Ct,{value:Qd,onChange:G=>{ls(G.target.value),B(G.target.value)},placeholder:"Enter custom category name",disabled:r,style:{marginTop:"8px"}})]}),s.jsxs(qe,{children:[s.jsx(Ze,{children:"Quantity in Stock *"}),s.jsx(Ct,{type:"number",value:E,onChange:G=>N(G.target.value),placeholder:"Enter quantity",disabled:r,inputMode:"numeric"})]}),s.jsxs(qe,{children:[s.jsx(Ze,{children:"🏷️ Product Attributes"}),s.jsxs(df,{children:[s.jsxs(qe,{children:[s.jsx(Ze,{children:"Material"}),s.jsx(Ct,{value:Se,onChange:G=>_e(G.target.value),placeholder:"e.g., Stainless Steel, Cotton, Leather",disabled:r})]}),s.jsxs(qe,{children:[s.jsx(Ze,{children:"Finish"}),s.jsx(Ct,{value:rt,onChange:G=>Nt(G.target.value),placeholder:"e.g., Matte, Glossy, Brushed",disabled:r})]}),s.jsxs(qe,{children:[s.jsx(Ze,{children:"Color"}),s.jsx(Ct,{value:gt,onChange:G=>at(G.target.value),placeholder:"e.g., White, Black, Red",disabled:r})]})]})]}),s.jsxs(qe,{children:[s.jsx(Ze,{children:"📐 Available Sizes"}),s.jsx(Ct,{value:Oe.join(", "),onChange:G=>{const F=G.target.value.split(",").map(U=>U.trim()).filter(Boolean);kt(F)},placeholder:"Enter sizes (comma separated), e.g., S, M, L, XL",disabled:r})]}),Za.length>0&&s.jsxs(qe,{children:[s.jsx(Ze,{children:"🔍 Custom Filter Values"}),s.jsx(df,{children:Za.map(G=>s.jsxs(qe,{children:[s.jsxs(Ze,{children:[G.icon," ",G.name]}),G.type==="select"||G.type==="checkbox"?s.jsxs(ob,{value:ds[G.slug]||"",onChange:F=>Yo(U=>({...U,[G.slug]:F.target.value||void 0})),disabled:r,children:[s.jsx("option",{value:"",children:"— None —"}),G.options.map(F=>s.jsx("option",{value:F.value,children:F.label},F.value))]}):G.type==="range"?s.jsx(Ct,{type:"number",value:ds[G.slug]||"",onChange:F=>Yo(U=>({...U,[G.slug]:F.target.value?Number(F.target.value):void 0})),placeholder:`${G.rangeMin??0} – ${G.rangeMax??100}${G.rangeUnit?` ${G.rangeUnit}`:""}`,disabled:r}):null]},G._id))})]}),s.jsxs(qe,{children:[s.jsx(Ze,{children:"📋 Product Specifications"}),s.jsxs(df,{children:[Hr.map((G,F)=>s.jsxs(uA,{children:[s.jsx(Ct,{value:G.key,onChange:U=>{const re=[...Hr];re[F]={...re[F],key:U.target.value},Jt(re)},placeholder:"Specification name",disabled:r}),s.jsx(Ct,{value:G.value,onChange:U=>{const re=[...Hr];re[F]={...re[F],value:U.target.value},Jt(re)},placeholder:"Value",disabled:r}),s.jsx(fA,{type:"button",onClick:()=>Jt(U=>U.filter((re,je)=>je!==F)),disabled:r,children:"✕"})]},F)),s.jsxs(pA,{children:[s.jsxs(qe,{style:{marginBottom:0},children:[s.jsx(Ze,{style:{fontSize:C.fontSize.xs},children:"Name"}),s.jsx(Ct,{value:Re,onChange:G=>Ve(G.target.value),placeholder:"e.g., Coverage Area",disabled:r})]}),s.jsxs(qe,{style:{marginBottom:0},children:[s.jsx(Ze,{style:{fontSize:C.fontSize.xs},children:"Value"}),s.jsx(Ct,{value:co,onChange:G=>uo(G.target.value),placeholder:"e.g., 15 sqft/box",disabled:r})]}),s.jsx("button",{type:"button",onClick:()=>{Re.trim()&&co.trim()&&(Jt(G=>[...G,{key:Re.trim(),value:co.trim()}]),Ve(""),uo(""))},disabled:r||!Re.trim()||!co.trim(),style:{padding:`${u[2]} ${u[4]}`,background:b.primary.main,color:"white",border:"none",borderRadius:"6px",cursor:"pointer",fontWeight:C.fontWeight.semibold,fontSize:C.fontSize.sm,whiteSpace:"nowrap",opacity:!Re.trim()||!co.trim()?.5:1,alignSelf:"end",marginBottom:"2px"},children:"+ Add"})]})]})]}),s.jsxs(qe,{children:[s.jsxs(aA,{onClick:()=>w(!k),children:[s.jsx(lA,{children:"💰 Pricing"}),s.jsx(cA,{$active:k})]}),s.jsx(dA,{$open:k,children:s.jsxs(JR,{style:{marginTop:u[3]},children:[s.jsxs(qe,{children:[s.jsx(Ze,{children:"Base Price ($)"}),s.jsx(Ct,{type:"number",value:l,onChange:G=>c(G.target.value),placeholder:"0.00",disabled:r,inputMode:"numeric",step:"0.01"})]}),s.jsxs(qe,{children:[s.jsx(Ze,{children:"MRP (Optional)"}),s.jsx(Ct,{type:"number",value:d,onChange:G=>f(G.target.value),placeholder:"Maximum retail price",disabled:r,inputMode:"numeric",step:"0.01"})]}),s.jsxs(qe,{children:[s.jsx(Ze,{children:"Retail Price (Optional)"}),s.jsx(Ct,{type:"number",value:p,onChange:G=>h(G.target.value),placeholder:"Your selling price",disabled:r,inputMode:"numeric",step:"0.01"})]}),s.jsxs(qe,{children:[s.jsx(Ze,{children:"Discount Type"}),s.jsxs("select",{value:y,onChange:G=>m(G.target.value),style:{width:"100%",maxWidth:"100%",padding:u[2],border:`1px solid ${b.neutral[300]}`,borderRadius:"4px",fontSize:C.fontSize.sm,boxSizing:"border-box"},children:[s.jsx("option",{value:"percentage",children:"Percentage (%)"}),s.jsx("option",{value:"fixed",children:"Fixed Amount ($)"})]})]}),s.jsxs(qe,{children:[s.jsx(Ze,{children:"Discount Value"}),s.jsx(Ct,{type:"number",value:v,onChange:G=>$(G.target.value),placeholder:y==="percentage"?"0":"0.00",disabled:r,inputMode:"numeric",step:"0.01"})]}),s.jsx(qe,{children:s.jsx(iA,{children:s.jsx($i,{checked:S,onChange:G=>j(G.target.checked),label:"Show price in product listing"})})}),v&&us()!==parseFloat(p||l)&&s.jsxs(sA,{children:["💚 Final Price: $",us().toFixed(2)]})]})})]}),s.jsxs(qe,{children:[s.jsx(Ze,{children:"📸 Product Images (Google Drive links)"}),s.jsxs(tb,{children:[s.jsx(rb,{children:"💡 How to get a Google Drive image link:"}),"1. Upload image to Google Drive",s.jsx("br",{}),'2. Right-click → Share → Change to "Anyone with the link"',s.jsx("br",{}),"3. Copy the link (e.g. drive.google.com/file/d/FILE_ID/view?usp=sharing)",s.jsx("br",{}),"4. Paste below - we'll convert it automatically ✨"]}),s.jsxs(Jv,{children:[W?s.jsxs(Zv,{children:[s.jsx(eb,{type:"url",value:R,onChange:G=>M(G.target.value),placeholder:"Paste Google Drive image URL",disabled:r}),s.jsx(ne,{appearance:"primary",onClick:rn,disabled:r||!R,children:"Add"}),s.jsx(ne,{onClick:()=>{Z(!1),M("")},disabled:r,children:"Done"})]}):s.jsx(ne,{appearance:"primary",onClick:()=>Z(!0),disabled:r,children:"+ Add Images"}),L.length>0&&s.jsxs(s.Fragment,{children:[s.jsxs(nb,{children:["✅ ",L.length," image(s) added"]}),s.jsx(ZR,{children:L.map((G,F)=>s.jsxs(eA,{children:[s.jsx("img",{src:no(G),alt:`Product ${F+1}`,onError:U=>{U.target.style.display="none"}}),s.jsx(tA,{onClick:()=>Zd(F),children:"✕"})]},F))})]})]})]}),s.jsxs(qe,{children:[s.jsx(Ze,{children:"🎬 Product Videos (YouTube / direct links)"}),s.jsxs(tb,{children:[s.jsx(rb,{children:"💡 Supported video links:"}),"YouTube links (e.g. youtube.com/watch?v=...)",s.jsx("br",{}),"Direct video URLs (.mp4, .webm)",s.jsx("br",{}),"Google Drive video links"]}),s.jsxs(Jv,{children:[A?s.jsxs(Zv,{children:[s.jsx(eb,{type:"url",value:z,onChange:G=>P(G.target.value),placeholder:"Paste video URL (YouTube, .mp4, etc.)",disabled:r}),s.jsx(ne,{appearance:"primary",onClick:()=>{z.trim()&&(T([...I,z.trim()]),P(""))},disabled:r||!z,children:"Add"}),s.jsx(ne,{onClick:()=>{D(!1),P("")},disabled:r,children:"Done"})]}):s.jsx(ne,{appearance:"primary",onClick:()=>D(!0),disabled:r,children:"+ Add Video"}),I.length>0&&s.jsxs(nb,{children:["🎬 ",I.length," video(s) added",I.map((G,F)=>s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"4px",fontSize:"12px"},children:[s.jsx("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"300px"},children:G}),s.jsx("button",{type:"button",onClick:()=>T(I.filter((U,re)=>re!==F)),style:{color:"#dc2626",border:"none",background:"none",cursor:"pointer",fontWeight:"bold"},children:"✕"})]},F))]})]})]}),s.jsx(rA,{appearance:"primary",type:"submit",disabled:r,children:r?fo?"Updating...":"Adding...":fo?"Update Product":"Add Product"})]})},uf=g.div`
  width: 100%;
`,ib=g.h2`
  margin-bottom: ${u[8]};
  color: var(--color-text-primary, ${b.neutral[900]});
  display: none;
`,mA=g.div`
  display: flex;
  align-items: center;
  gap: ${u[3]};
  margin-bottom: ${u[4]};
  flex-wrap: wrap;
`,gA=g.input`
  flex: 1;
  min-width: 180px;
  padding: ${u[2]} ${u[3]};
  border: 1px solid ${b.neutral[300]};
  border-radius: 6px;
  font-size: ${C.fontSize.sm};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${b.primary.main};
    box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);
  }

  &::placeholder {
    color: ${b.neutral[400]};
  }
`,vA=g.div`
  display: flex;
  align-items: center;
  gap: ${u[2]};
  padding: ${u[2]} ${u[3]};
  background: ${b.primary.lighter};
  border-radius: 8px;
  margin-bottom: ${u[4]};
  flex-wrap: wrap;
`,bA=g.span`
  font-size: ${C.fontSize.sm};
  font-weight: ${C.fontWeight.semibold};
  color: ${b.neutral[800]};
  white-space: nowrap;
  margin-right: ${u[1]};
`,Al=g(ne)`
  font-size: 12px !important;
  padding: 4px 10px !important;
  min-width: auto !important;
  white-space: nowrap !important;
  min-height: 28px !important;
  height: 28px !important;
`,xA=g.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${e=>e.$size==="sm"?"18px":"20px"};
  height: ${e=>e.$size==="sm"?"18px":"20px"};
  flex-shrink: 0;
  cursor: pointer;
  position: relative;

  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
`,yA=g.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${e=>e.$size==="sm"?"16px":"18px"};
  height: ${e=>e.$size==="sm"?"16px":"18px"};
  border-radius: 4px;
  border: 1.5px solid ${e=>e.$checked?b.primary.main:b.neutral[400]};
  background: ${e=>e.$checked?b.primary.main:"white"};
  transition: all 0.15s ease;
  flex-shrink: 0;

  &::after {
    content: '';
    display: ${e=>e.$checked?"block":"none"};
    width: ${e=>e.$size==="sm"?"4px":"5px"};
    height: ${e=>e.$size==="sm"?"7px":"8px"};
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg) translateY(-1px);
  }
`,Il=({checked:e,onChange:t,size:r="sm"})=>s.jsxs(xA,{$size:r,onClick:n=>n.stopPropagation(),children:[s.jsx("input",{type:"checkbox",checked:e,onChange:t}),s.jsx(yA,{$checked:e,$size:r})]}),wA=g.div`
  display: none;
  flex-direction: column;
  gap: ${u[3]};

  @media (max-width: 768px) {
    display: flex;
  }
`,kA=g.div`
  display: flex;
  gap: ${u[2]};
  padding: ${u[3]};
  background: ${e=>e.$selected?"rgba(0, 102, 255, 0.04)":"white"};
  border: 1.5px solid ${e=>e.$selected?b.primary.main:b.neutral[200]};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s ease;
  align-items: flex-start;
`,SA=g.div`
  padding-top: 3px;
  flex-shrink: 0;
`,jA=g.div`
  flex: 1;
  min-width: 0;
`,$A=g.div`
  font-weight: ${C.fontWeight.semibold};
  font-size: ${C.fontSize.sm};
  color: ${b.neutral[900]};
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,CA=g.div`
  display: flex;
  align-items: center;
  gap: ${u[2]};
  flex-wrap: wrap;
  margin-top: ${u[1]};
`,ks=g.span`
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 8px;
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 0.2px;
  background: ${e=>{switch(e.$variant){case"success":return"rgba(16, 185, 129, 0.12)";case"warning":return"rgba(59, 130, 246, 0.12)";case"error":return"rgba(107, 114, 128, 0.12)";default:return b.neutral[100]}}};
  color: ${e=>{switch(e.$variant){case"success":return b.success;case"warning":return"#3b82f6";case"error":return"#6b7280";default:return b.neutral[600]}}};
`,_A=g.div`
  display: flex;
  gap: 2px;
  flex-shrink: 0;
  align-self: center;
`,zA=g.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,EA=g.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`,Tn=g.th`
  padding: ${u[4]};
  text-align: left;
  background: ${b.primary.lighter};
  font-weight: ${C.fontWeight.semibold};
  border-bottom: 2px solid ${b.neutral[200]};
  white-space: nowrap;
  font-size: ${C.fontSize.sm};
`,nn=g.td`
  padding: ${u[4]};
  border-bottom: 1px solid ${b.neutral[200]};
  color: var(--color-text-primary, ${b.neutral[900]});
  font-size: ${C.fontSize.sm};
`,sb=g.tr`
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${b.neutral[50]};
  }
`,BA=g.div`
  display: flex;
  gap: ${u[2]};
`,ab=g.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: ${C.fontSize.sm};
  background: ${e=>e.$active?"rgba(16, 185, 129, 0.15)":"rgba(239, 68, 68, 0.15)"};
  color: ${e=>e.$active?b.success:b.error};
`,lb=g.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: ${C.fontSize.sm};
  background: ${e=>e.$published?"rgba(59, 130, 246, 0.15)":"rgba(107, 114, 128, 0.15)"};
  color: ${e=>e.$published?"#3b82f6":"#6b7280"};
  font-weight: ${C.fontWeight.semibold};
  white-space: nowrap;
`,cb=g.div`
  text-align: center;
  padding: ${u[8]};
  color: ${b.neutral[600]};
`,TA=g.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${u[8]};
`,PA=g.div`
  display: ${e=>e.$isOpen?"flex":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,NA=g.div`
  background: white;
  border-radius: 8px;
  padding: ${u[8]};
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    padding: ${u[4]};
    width: 95%;
    max-height: 90vh;
  }
`,FA=g.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${u[8]};
  border-bottom: 1px solid ${b.neutral[200]};
  padding-bottom: ${u[4]};
`,RA=g.h2`
  font-size: ${C.fontSize["2xl"]};
  color: var(--color-text-primary, ${b.neutral[900]});
  margin: 0;
`,AA=g.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${b.neutral[600]};
  
  &:hover {
    color: ${b.neutral[900]};
  }
`,IA=g.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${u[6]};
  margin-bottom: ${u[8]};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: ${u[4]};
    margin-bottom: ${u[4]};
  }
`,ti=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[2]};
`,ri=g.label`
  font-weight: ${C.fontWeight.semibold};
  color: ${b.neutral[600]};
  font-size: ${C.fontSize.sm};
`,ni=g.div`
  font-size: ${C.fontSize.base};
  color: var(--color-text-primary, ${b.neutral[900]});
  padding: ${u[2]};
  background: ${b.neutral[50]};
  border-radius: 4px;
`,OA=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: ${u[4]};
  margin-bottom: ${u[8]};
`,qA=g.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
`,MA=g.div`
  padding: ${u[4]};
  background: ${b.neutral[50]};
  border-radius: 4px;
  margin-bottom: ${u[8]};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${u[4]};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    margin-bottom: ${u[4]};
  }
`,Ss=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[1]};
`,js=g.span`
  font-size: ${C.fontSize.sm};
  color: ${b.neutral[600]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,$s=g.span`
  font-size: ${C.fontSize.lg};
  font-weight: ${C.fontWeight.bold};
  color: ${b.primary.main};
`,LA=g.div`
  display: flex;
  gap: ${u[4]};
  justify-content: flex-end;
  padding-top: ${u[4]};
  border-top: 1px solid ${b.neutral[200]};

  @media (max-width: 600px) {
    flex-wrap: wrap;
    gap: ${u[2]};

    button {
      flex: 1;
      min-width: 0;
    }
  }
`,DA=({onEdit:e,onDelete:t,refreshTrigger:r=0})=>{var Z;const[n,o]=x.useState([]),[i,a]=x.useState(!1),[l,c]=x.useState(null),[d,f]=x.useState(null),[p,h]=x.useState(""),[y,m]=x.useState(new Set),[v,$]=x.useState(!1),{token:S}=wt(I=>I.auth),j=async()=>{if(!S){console.warn("No token available, skipping fetch");return}a(!0);try{const I=await be.getAdminProducts();o(I)}catch(I){console.error("Failed to fetch products:",I)}finally{a(!1)}};x.useEffect(()=>{j()},[r,S]);const k=async(I,T)=>{if(T.stopPropagation(),window.confirm("Are you sure you want to delete this product?"))try{await be.deleteAdminProduct(I),o(n.filter(z=>z._id!==I)),t&&t(I)}catch(z){console.error("Failed to delete product:",z),alert("Failed to delete product")}},w=async I=>{f(I);try{const T=await be.publishAdminProduct(I);o(n.map(z=>z._id===I?{...z,published:!0}:z)),(l==null?void 0:l._id)===I&&c({...l,published:!0})}catch(T){console.error("Failed to publish product:",T),alert("Failed to publish product")}finally{f(null)}},_=async I=>{f(I);try{const T=await be.unpublishAdminProduct(I);o(n.map(z=>z._id===I?{...z,published:!1}:z)),(l==null?void 0:l._id)===I&&c({...l,published:!1})}catch(T){console.error("Failed to unpublish product:",T),alert("Failed to unpublish product")}finally{f(null)}},B=I=>{var z;if(!((z=I.discount)!=null&&z.discountValue))return I.price;const T=I.retailPrice||I.price;return I.discount.discountType==="percentage"?T-T*I.discount.discountValue/100:T-I.discount.discountValue},E=x.useMemo(()=>{if(!p.trim())return n;const I=p.toLowerCase();return n.filter(T=>{var z,P,A;return((z=T.title)==null?void 0:z.toLowerCase().includes(I))||((P=T.description)==null?void 0:P.toLowerCase().includes(I))||((A=T.category)==null?void 0:A.toLowerCase().includes(I))})},[n,p]),N=I=>{m(T=>{const z=new Set(T);return z.has(I)?z.delete(I):z.add(I),z})},L=()=>{y.size===E.length?m(new Set):m(new Set(E.map(I=>I._id)))},V=()=>m(new Set),R=async()=>{if(y.size!==0){$(!0);try{await be.bulkPublishProducts(Array.from(y)),o(n.map(I=>y.has(I._id)?{...I,published:!0}:I)),V()}catch(I){console.error("Bulk publish failed:",I),alert("Failed to bulk publish products")}finally{$(!1)}}},M=async()=>{if(y.size!==0){$(!0);try{await be.bulkUnpublishProducts(Array.from(y)),o(n.map(I=>y.has(I._id)?{...I,published:!1}:I)),V()}catch(I){console.error("Bulk unpublish failed:",I),alert("Failed to bulk unpublish products")}finally{$(!1)}}},W=async()=>{if(y.size!==0&&window.confirm(`Are you sure you want to delete ${y.size} product(s)? This cannot be undone.`)){$(!0);try{await be.bulkDeleteProducts(Array.from(y)),o(n.filter(I=>!y.has(I._id))),V()}catch(I){console.error("Bulk delete failed:",I),alert("Failed to bulk delete products")}finally{$(!1)}}};return i?s.jsx(uf,{children:s.jsx(TA,{children:s.jsx(Qr,{label:"Loading products..."})})}):n.length===0?s.jsxs(uf,{children:[s.jsx(ib,{children:"Your Products"}),s.jsx(cb,{children:"No products added yet. Create your first product above!"})]}):s.jsxs(s.Fragment,{children:[s.jsxs(uf,{children:[s.jsxs(ib,{children:["Your Products (",n.length,")"]}),s.jsxs(mA,{children:[s.jsx(gA,{type:"text",placeholder:"🔍 Search products by name, category...",value:p,onChange:I=>h(I.target.value)}),s.jsxs("span",{style:{fontSize:C.fontSize.sm,color:b.neutral[500],whiteSpace:"nowrap"},children:[E.length," of ",n.length]})]}),y.size>0&&s.jsxs(vA,{children:[s.jsxs(bA,{children:[y.size," selected"]}),s.jsx(Al,{appearance:"primary",onClick:R,disabled:v,children:"🌐 Publish"}),s.jsx(Al,{appearance:"secondary",onClick:M,disabled:v,children:"🔒 Unpublish"}),s.jsx(Al,{appearance:"secondary",onClick:W,disabled:v,style:{color:b.error},children:"🗑️ Delete"}),s.jsx(Al,{appearance:"subtle",onClick:V,disabled:v,children:"✕ Clear"})]}),s.jsx(EA,{children:s.jsxs(zA,{children:[s.jsx("thead",{children:s.jsxs(sb,{children:[s.jsx(Tn,{style:{width:"40px"},children:s.jsx(Il,{checked:E.length>0&&y.size===E.length,onChange:L,size:"md"})}),s.jsx(Tn,{style:{width:"25%"},children:"Product Name"}),s.jsx(Tn,{style:{width:"13%"},children:"Category"}),s.jsx(Tn,{style:{width:"12%"},children:"Price"}),s.jsx(Tn,{style:{width:"8%"},children:"Stock"}),s.jsx(Tn,{style:{width:"10%"},children:"Active"}),s.jsx(Tn,{style:{width:"12%"},children:"Published"}),s.jsx(Tn,{style:{width:"15%"},children:"Actions"})]})}),s.jsxs("tbody",{children:[E.map(I=>s.jsxs(sb,{onClick:()=>c(I),children:[s.jsx(nn,{onClick:T=>T.stopPropagation(),children:s.jsx(Il,{checked:y.has(I._id),onChange:()=>N(I._id)})}),s.jsxs(nn,{children:[s.jsx("strong",{children:I.title}),s.jsxs("p",{style:{fontSize:C.fontSize.sm,color:b.neutral[600],marginTop:4},children:[I.description.substring(0,50),"..."]})]}),s.jsx(nn,{children:I.category}),s.jsx(nn,{children:s.jsxs("div",{children:[s.jsxs("strong",{children:["$",B(I).toFixed(2)]}),I.mrp&&s.jsxs("p",{style:{fontSize:C.fontSize.sm,color:b.neutral[600]},children:["MRP: $",I.mrp.toFixed(2)]})]})}),s.jsx(nn,{children:I.quantity}),s.jsx(nn,{children:s.jsx(ab,{$active:I.isActive!==!1,children:I.isActive!==!1?"Active":"Inactive"})}),s.jsx(nn,{children:s.jsx(lb,{$published:I.published,children:I.published?"🌐 Published":"🔒 Draft"})}),s.jsx(nn,{children:s.jsxs(BA,{children:[s.jsx(ne,{appearance:"subtle",icon:s.jsx(Cp,{}),onClick:T=>{T.stopPropagation(),e==null||e(I)},title:"Edit product"}),s.jsx(ne,{appearance:"subtle",icon:s.jsx(Vc,{}),onClick:T=>k(I._id,T),title:"Delete product"})]})})]},I._id)),E.length===0&&s.jsx("tr",{children:s.jsxs(nn,{colSpan:8,style:{textAlign:"center",padding:u[8],color:b.neutral[500]},children:['No products match "',p,'"']})})]})]})}),s.jsxs(wA,{children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:u[2],marginBottom:u[2],paddingLeft:u[1]},children:[s.jsx(Il,{checked:E.length>0&&y.size===E.length,onChange:L}),s.jsx("span",{style:{fontSize:C.fontSize.sm,color:b.neutral[500]},children:"Select all"})]}),E.map(I=>s.jsxs(kA,{$selected:y.has(I._id),onClick:()=>c(I),children:[s.jsx(SA,{onClick:T=>T.stopPropagation(),children:s.jsx(Il,{checked:y.has(I._id),onChange:()=>N(I._id)})}),s.jsxs(jA,{children:[s.jsx($A,{children:I.title}),s.jsxs("p",{style:{fontSize:"12px",color:b.neutral[500],margin:0},children:[I.description.substring(0,60),"..."]}),s.jsxs(CA,{children:[s.jsx(ks,{children:I.category}),s.jsxs(ks,{children:["$",B(I).toFixed(2)]}),s.jsx(ks,{$variant:I.published?"warning":"error",children:I.published?"🌐 Live":"🔒 Draft"}),s.jsx(ks,{$variant:I.isActive!==!1?"success":"error",children:I.isActive!==!1?"Active":"Inactive"}),s.jsxs(ks,{children:["Stock: ",I.quantity]})]})]}),s.jsxs(_A,{onClick:T=>T.stopPropagation(),children:[s.jsx(ne,{appearance:"subtle",size:"small",icon:s.jsx(Cp,{}),onClick:()=>e==null?void 0:e(I)}),s.jsx(ne,{appearance:"subtle",size:"small",icon:s.jsx(Vc,{}),onClick:T=>k(I._id,T)})]})]},I._id)),E.length===0&&s.jsxs(cb,{children:['No products match "',p,'"']})]})]}),s.jsx(PA,{$isOpen:!!l,onClick:()=>c(null),children:s.jsx(NA,{onClick:I=>I.stopPropagation(),children:l&&s.jsxs(s.Fragment,{children:[s.jsxs(FA,{children:[s.jsx(RA,{children:l.title}),s.jsx(AA,{onClick:()=>c(null),children:"✕"})]}),l.images.length>0&&s.jsx(OA,{children:l.images.map((I,T)=>s.jsx(qA,{src:no(I),alt:`Product ${T+1}`,onError:z=>{z.target.style.display="none"}},T))}),s.jsxs(ti,{children:[s.jsx(ri,{children:"Description"}),s.jsx(ni,{children:l.description})]}),s.jsxs(MA,{children:[s.jsxs(Ss,{children:[s.jsx(js,{children:"Base Price"}),s.jsxs($s,{children:["$",l.price.toFixed(2)]})]}),l.mrp&&s.jsxs(Ss,{children:[s.jsx(js,{children:"MRP"}),s.jsxs($s,{children:["$",l.mrp.toFixed(2)]})]}),l.retailPrice&&s.jsxs(Ss,{children:[s.jsx(js,{children:"Retail Price"}),s.jsxs($s,{children:["$",l.retailPrice.toFixed(2)]})]}),((Z=l.discount)==null?void 0:Z.discountValue)&&s.jsxs(s.Fragment,{children:[s.jsxs(Ss,{children:[s.jsx(js,{children:"Discount"}),s.jsx($s,{children:l.discount.discountType==="percentage"?`${l.discount.discountValue}%`:`$${l.discount.discountValue}`})]}),s.jsxs(Ss,{children:[s.jsx(js,{children:"Final Price"}),s.jsxs($s,{style:{color:b.success},children:["$",B(l).toFixed(2)]})]})]})]}),s.jsxs(IA,{children:[s.jsxs(ti,{children:[s.jsx(ri,{children:"Category"}),s.jsx(ni,{children:l.category})]}),s.jsxs(ti,{children:[s.jsx(ri,{children:"Stock"}),s.jsx(ni,{children:l.quantity})]}),s.jsxs(ti,{children:[s.jsx(ri,{children:"Status"}),s.jsx(ni,{children:s.jsx(ab,{$active:l.isActive!==!1,children:l.isActive!==!1?"Active":"Inactive"})})]}),s.jsxs(ti,{children:[s.jsx(ri,{children:"Published"}),s.jsx(ni,{children:s.jsx(lb,{$published:l.published,children:l.published?"🌐 Published":"🔒 Draft"})})]}),s.jsxs(ti,{children:[s.jsx(ri,{children:"Show Price in Listing"}),s.jsx(ni,{children:l.showPriceInListing?"✅ Yes":"❌ No"})]})]}),s.jsxs(LA,{children:[s.jsx(ne,{onClick:()=>c(null),children:"Close"}),l.published?s.jsx(ne,{appearance:"primary",onClick:()=>_(l._id),disabled:d===l._id,children:d===l._id?"⏳ Unpublishing...":"🔒 Unpublish"}):s.jsx(ne,{appearance:"primary",onClick:()=>w(l._id),disabled:d===l._id,children:d===l._id?"⏳ Publishing...":"🌐 Publish"}),s.jsx(ne,{appearance:"secondary",onClick:()=>{e==null||e(l),c(null)},children:"Edit"})]})]})})})]})},Ol="/api",db=g.div`
  width: 100%;
`,WA=g.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: ${u[8]};
  min-width: 650px;
`,HA=g.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 8px;
  margin-bottom: ${u[8]};
`,ho=g.th`
  padding: ${u[4]};
  text-align: left;
  background: ${b.primary.lighter};
  font-weight: ${C.fontWeight.semibold};
  border-bottom: 2px solid ${b.neutral[200]};
  white-space: nowrap;
  font-size: ${C.fontSize.sm};
`,mo=g.td`
  padding: ${u[4]};
  border-bottom: 1px solid ${b.neutral[200]};
  color: var(--color-text-primary, ${b.neutral[900]});
  font-size: ${C.fontSize.sm};
`,ub=g.tr`
  transition: all 0.2s ease;
  
  &:hover {
    background: ${b.neutral[50]};
  }
`,UA=g.div`
  display: flex;
  gap: ${u[2]};
`,VA=g.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: ${C.fontSize.sm};
  background: ${e=>e.active?"rgba(16, 185, 129, 0.15)":"rgba(239, 68, 68, 0.15)"};
  color: ${e=>e.active?b.success:b.error};
  font-weight: ${C.fontWeight.semibold};
`,GA=g.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: ${C.fontSize.sm};
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
  font-weight: ${C.fontWeight.semibold};
`,KA=g.img`
  max-width: 60px;
  max-height: 60px;
  border-radius: 4px;
  object-fit: cover;
`,YA=g.div`
  text-align: center;
  padding: ${u[8]};
  color: ${b.neutral[600]};
`,XA=g.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${u[8]};
`,QA=g.div`
  display: ${e=>e.$isOpen?"flex":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: auto;
`,JA=g.div`
  background: white;
  border-radius: 8px;
  padding: ${u[8]};
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    padding: ${u[4]};
    width: 95%;
  }
`,ZA=g.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${u[6]};
  border-bottom: 1px solid ${b.neutral[200]};
  padding-bottom: ${u[4]};
`,e7=g.h2`
  margin: 0;
  font-size: ${C.fontSize["2xl"]};
  color: var(--color-text-primary, ${b.neutral[900]});
`,t7=g.button`
  background: none;
  border: none;
  font-size: ${C.fontSize.xl};
  cursor: pointer;
  color: ${b.neutral[600]};
  
  &:hover {
    color: ${b.neutral[900]};
  }
`,go=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[2]};
  margin-bottom: ${u[6]};
`,vo=g.label`
  font-weight: ${C.fontWeight.semibold};
  color: var(--color-text-primary, ${b.neutral[900]});
  font-size: ${C.fontSize.sm};
`,ff=g(nr)`
  width: 100%;
`,r7=g.input`
  width: 100%;
  padding: ${u[2]};
  border: 1px solid ${b.neutral[300]};
  border-radius: 4px;
  font-family: ${C.fontFamily.base};
  font-size: ${C.fontSize.sm};

  &:focus {
    outline: none;
    border-color: ${b.primary.main};
    box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);
  }
`,n7=g.textarea`
  width: 100%;
  padding: ${u[2]};
  border: 1px solid ${b.neutral[300]};
  border-radius: 4px;
  font-family: ${C.fontFamily.base};
  font-size: ${C.fontSize.sm};
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: ${b.primary.main};
    box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);
  }
`,o7=g.select`
  width: 100%;
  padding: ${u[2]};
  border: 1px solid ${b.neutral[300]};
  border-radius: 4px;
  font-size: ${C.fontSize.sm};

  &:focus {
    outline: none;
    border-color: ${b.primary.main};
    box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);
  }
`,i7=g.div`
  display: flex;
  gap: ${u[4]};
  justify-content: flex-end;
  padding-top: ${u[4]};
  border-top: 1px solid ${b.neutral[200]};

  @media (max-width: 600px) {
    flex-wrap: wrap;
    gap: ${u[2]};

    button {
      flex: 1;
      min-width: 0;
    }
  }
`,s7=g.img`
  width: 100%;
  max-height: 200px;
  border-radius: 4px;
  object-fit: cover;
  margin-bottom: ${u[4]};
  border: 1px solid ${b.neutral[200]};
`,a7=({refreshTrigger:e=0})=>{const[t,r]=x.useState([]),[n,o]=x.useState(!1),[i,a]=x.useState(null),[l,c]=x.useState(!1),[d,f]=x.useState({}),[p,h]=x.useState(""),[y,m]=x.useState(""),v=async()=>{o(!0);try{const w=localStorage.getItem("token"),_=await fetch(`${Ol}/banners/admin/list`,{headers:{Authorization:`Bearer ${w}`}});if(!_.ok)throw new Error("Failed to fetch banners");const B=await _.json();r(B.banners||[])}catch(w){console.error("Failed to fetch banners:",w),h("Failed to load banners")}finally{o(!1)}};x.useEffect(()=>{v()},[e]);const $=async(w,_)=>{if(_.stopPropagation(),window.confirm("Are you sure you want to delete this banner?"))try{const B=localStorage.getItem("token");if(!(await fetch(`${Ol}/banners/admin/${w}`,{method:"DELETE",headers:{Authorization:`Bearer ${B}`}})).ok)throw new Error("Failed to delete banner");r(t.filter(N=>N._id!==w)),m("Banner deleted successfully"),setTimeout(()=>m(""),3e3)}catch(B){console.error("Failed to delete banner:",B),h("Failed to delete banner")}},S=async()=>{if(h(""),m(""),!d.title||!d.imageUrl){h("Title and image URL are required");return}try{const w=localStorage.getItem("token"),_=l?"PATCH":"POST",B=l?`${Ol}/banners/admin/${i==null?void 0:i._id}`:`${Ol}/banners/admin/create`,E=await fetch(B,{method:_,headers:{"Content-Type":"application/json",Authorization:`Bearer ${w}`},body:JSON.stringify(d)});if(!E.ok)throw new Error("Failed to save banner");const N=await E.json();l?(r(t.map(L=>L._id===N.banner._id?N.banner:L)),m("Banner updated successfully")):(r([...t,N.banner]),m("Banner created successfully")),a(null),f({}),c(!1),setTimeout(()=>m(""),3e3)}catch(w){console.error("Failed to save banner:",w),h("Failed to save banner")}},j=w=>{a(w),f({...w}),c(!0)},k=()=>{a(null),f({title:"",description:"",imageUrl:"",link:"",position:0,type:"promotional",isActive:!0}),c(!1)};return n?s.jsx(db,{children:s.jsx(XA,{children:s.jsx(Qr,{label:"Loading banners..."})})}):s.jsxs(s.Fragment,{children:[s.jsxs(db,{children:[p&&s.jsx("div",{style:{color:b.error,marginBottom:u[4],padding:u[3],background:"rgba(239, 68, 68, 0.1)",borderRadius:"4px"},children:p}),y&&s.jsx("div",{style:{color:b.success,marginBottom:u[4],padding:u[3],background:"rgba(16, 185, 129, 0.1)",borderRadius:"4px"},children:y}),s.jsx(ne,{appearance:"primary",onClick:k,style:{marginBottom:u[6]},children:"+ Add New Banner"}),t.length===0?s.jsx(YA,{children:'No banners created yet. Click "Add New Banner" above to get started!'}):s.jsx(HA,{children:s.jsxs(WA,{children:[s.jsx("thead",{children:s.jsxs(ub,{children:[s.jsx(ho,{style:{width:"15%"},children:"Image"}),s.jsx(ho,{style:{width:"20%"},children:"Title"}),s.jsx(ho,{style:{width:"12%"},children:"Type"}),s.jsx(ho,{style:{width:"8%"},children:"Position"}),s.jsx(ho,{style:{width:"10%"},children:"Status"}),s.jsx(ho,{style:{width:"20%"},children:"Link"}),s.jsx(ho,{style:{width:"15%"},children:"Actions"})]})}),s.jsx("tbody",{children:t.sort((w,_)=>w.position-_.position).map(w=>s.jsxs(ub,{children:[s.jsx(mo,{children:s.jsx(KA,{src:no(w.imageUrl),alt:w.title,onError:_=>{_.target.style.display="none"}})}),s.jsxs(mo,{children:[s.jsx("strong",{children:w.title}),w.description&&s.jsxs("p",{style:{fontSize:C.fontSize.sm,color:b.neutral[600],margin:"4px 0 0 0"},children:[w.description.substring(0,50),"..."]})]}),s.jsx(mo,{children:s.jsx(GA,{children:w.type})}),s.jsx(mo,{children:w.position}),s.jsx(mo,{children:s.jsx(VA,{active:w.isActive,children:w.isActive?"Active":"Inactive"})}),s.jsx(mo,{children:w.link?s.jsx("a",{href:w.link,target:"_blank",rel:"noopener noreferrer",style:{color:b.primary.main},children:"View"}):s.jsx("span",{style:{color:b.neutral[400]},children:"—"})}),s.jsx(mo,{children:s.jsxs(UA,{children:[s.jsx(ne,{appearance:"subtle",icon:s.jsx(Cp,{}),onClick:()=>j(w),title:"Edit banner"}),s.jsx(ne,{appearance:"subtle",icon:s.jsx(Vc,{}),onClick:_=>$(w._id,_),title:"Delete banner"})]})})]},w._id))})]})})]}),s.jsx(QA,{$isOpen:i!==null||Object.keys(d).length>0&&!l,onClick:()=>a(null),children:s.jsxs(JA,{onClick:w=>w.stopPropagation(),children:[s.jsxs(ZA,{children:[s.jsx(e7,{children:l?"Edit Banner":"Add New Banner"}),s.jsx(t7,{onClick:()=>{a(null),f({}),c(!1)},children:"✕"})]}),d.imageUrl&&s.jsx(s7,{src:no(d.imageUrl),alt:"Banner preview",onError:w=>{w.target.style.display="none"}}),s.jsxs(go,{children:[s.jsx(vo,{children:"Title *"}),s.jsx(ff,{value:d.title||"",onChange:w=>f({...d,title:w.target.value}),placeholder:"Enter banner title"})]}),s.jsxs(go,{children:[s.jsx(vo,{children:"Description"}),s.jsx(n7,{value:d.description||"",onChange:w=>f({...d,description:w.target.value}),placeholder:"Enter banner description"})]}),s.jsxs(go,{children:[s.jsx(vo,{children:"Image URL (Google Drive) *"}),s.jsx(ff,{value:d.imageUrl||"",onChange:w=>f({...d,imageUrl:w.target.value}),placeholder:"Paste Google Drive image URL"})]}),s.jsxs(go,{children:[s.jsx(vo,{children:"Link (Optional)"}),s.jsx(ff,{value:d.link||"",onChange:w=>f({...d,link:w.target.value}),placeholder:"Enter link for banner (e.g., /products)"})]}),s.jsxs(go,{children:[s.jsx(vo,{children:"Position"}),s.jsx(r7,{type:"number",value:d.position||0,onChange:w=>f({...d,position:parseInt(w.target.value)||0}),placeholder:"0"})]}),s.jsxs(go,{children:[s.jsx(vo,{children:"Type"}),s.jsxs(o7,{value:d.type||"promotional",onChange:w=>f({...d,type:w.target.value}),children:[s.jsx("option",{value:"promotional",children:"Promotional"}),s.jsx("option",{value:"hero",children:"Hero"}),s.jsx("option",{value:"featured",children:"Featured"}),s.jsx("option",{value:"category",children:"Category"})]})]}),s.jsx(go,{children:s.jsxs(vo,{children:[s.jsx("input",{type:"checkbox",checked:d.isActive!==!1,onChange:w=>f({...d,isActive:w.target.checked}),style:{marginRight:u[2]}}),"Active"]})}),s.jsxs(i7,{children:[s.jsx(ne,{onClick:()=>{a(null),f({}),c(!1)},children:"Cancel"}),s.jsx(ne,{appearance:"primary",onClick:S,children:l?"Update Banner":"Create Banner"})]})]})})]})},fb=g.div`
  width: 100%;
`,l7=g.h2`
  margin-bottom: ${u[8]};
  color: var(--color-text-primary, ${b.neutral[900]});
  display: flex;
  align-items: center;
  gap: ${u[2]};
  display: none;
`,pb=g.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  min-width: 500px;
`,hb=g.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 8px;
`,on=g.th`
  padding: ${u[4]};
  text-align: left;
  background: ${b.primary.lighter};
  font-weight: ${C.fontWeight.semibold};
  border-bottom: 2px solid ${b.neutral[200]};
  color: ${b.primary.main};
  white-space: nowrap;
  font-size: ${C.fontSize.sm};
`,sn=g.td`
  padding: ${u[4]};
  border-bottom: 1px solid ${b.neutral[200]};
  color: var(--color-text-primary, ${b.neutral[900]});
  font-size: ${C.fontSize.sm};
`,ql=g.tr`
  &:hover {
    background: ${b.neutral[50]};
  }
`,mb=g.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: ${C.fontSize.sm};
  display: inline-flex;
  align-items: center;
  gap: ${u[1]};
  background: ${e=>e.$isAdmin?b.primary.lighter:b.neutral[100]};
  color: ${e=>e.$isAdmin?b.primary.main:b.neutral[600]};
  font-weight: ${C.fontWeight.semibold};
`,c7=g(ne)`
  white-space: nowrap;
`,d7=g.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${u[12]};
`,u7=g.div`
  color: ${b.success};
  background: rgba(16, 185, 129, 0.1);
  padding: ${u[3]};
  border-radius: 4px;
  margin-bottom: ${u[4]};
  font-size: ${C.fontSize.sm};
`,f7=g.div`
  color: ${b.error};
  background: rgba(239, 68, 68, 0.1);
  padding: ${u[3]};
  border-radius: 4px;
  margin-bottom: ${u[4]};
  font-size: ${C.fontSize.sm};
`,p7=()=>{const[e,t]=x.useState([]),[r,n]=x.useState(!1),[o,i]=x.useState(null),[a,l]=x.useState({type:"",text:""}),{user:c,token:d}=wt(v=>v.auth);x.useEffect(()=>{d&&f()},[d]);const f=async()=>{n(!0);try{const v=await be.getAllUsers();t(v)}catch(v){console.error("Failed to fetch users:",v),l({type:"error",text:"Failed to fetch users"})}finally{n(!1)}},p=async v=>{i(v);try{await be.promotUserToAdmin(v),l({type:"success",text:`✅ ${v} has been promoted to admin!`}),f(),setTimeout(()=>l({type:"",text:""}),3e3)}catch($){l({type:"error",text:$.message||"Failed to promote user"})}finally{i(null)}},h=v=>new Date(v).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),y=e.filter(v=>v.role!=="admin"),m=e.filter(v=>v.role==="admin");return r?s.jsx(fb,{children:s.jsx(d7,{children:s.jsx(Qr,{label:"Loading users..."})})}):s.jsxs(fb,{children:[s.jsxs(l7,{children:[s.jsx(g0,{})," Admin Management"]}),a.text&&(a.type==="success"?s.jsx(u7,{children:a.text}):s.jsx(f7,{children:a.text})),s.jsxs("h3",{style:{marginTop:u[8],marginBottom:u[4],color:b.primary.main},children:["Current Admins (",m.length,")"]}),s.jsx(hb,{children:s.jsxs(pb,{children:[s.jsx("thead",{children:s.jsxs(ql,{children:[s.jsx(on,{children:"Name"}),s.jsx(on,{children:"Email"}),s.jsx(on,{children:"Role"}),s.jsx(on,{children:"Joined"})]})}),s.jsx("tbody",{children:m.map(v=>s.jsxs(ql,{children:[s.jsxs(sn,{children:[s.jsx("strong",{children:v.name}),v._id===(c==null?void 0:c.id)&&s.jsx("span",{style:{marginLeft:u[2],fontSize:C.fontSize.sm,color:b.neutral[600]},children:"(You)"})]}),s.jsx(sn,{children:v.email}),s.jsx(sn,{children:s.jsxs(mb,{$isAdmin:!0,children:[s.jsx(g0,{})," Admin"]})}),s.jsx(sn,{children:h(v.createdAt)})]},v._id))})]})}),s.jsxs("h3",{style:{marginTop:u[12],marginBottom:u[4],color:b.neutral[700]},children:["Users to Promote (",y.length,")"]}),y.length===0?s.jsx("p",{style:{color:b.neutral[600],textAlign:"center",padding:u[4]},children:"All users are already admins!"}):s.jsx(hb,{children:s.jsxs(pb,{children:[s.jsx("thead",{children:s.jsxs(ql,{children:[s.jsx(on,{children:"Name"}),s.jsx(on,{children:"Email"}),s.jsx(on,{children:"Role"}),s.jsx(on,{children:"Joined"}),s.jsx(on,{children:"Action"})]})}),s.jsx("tbody",{children:y.map(v=>s.jsxs(ql,{children:[s.jsx(sn,{children:s.jsx("strong",{children:v.name})}),s.jsx(sn,{children:v.email}),s.jsx(sn,{children:s.jsx(mb,{$isAdmin:!1,children:"User"})}),s.jsx(sn,{children:h(v.createdAt)}),s.jsx(sn,{children:s.jsx(c7,{appearance:"primary",icon:s.jsx(T3,{}),onClick:()=>{window.confirm(`Make ${v.name} (${v.email}) an admin?`)&&p(v.email)},disabled:o===v.email,children:o===v.email?"Promoting...":"Make Admin"})})]},v._id))})]})})]})},h7=g.div`
  width: 100%;
  max-width: 900px;
`,Gr=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[5]};
`,_t=g.h3`
  font-size: ${C.fontSize.lg};
  font-weight: ${C.fontWeight.semibold};
  color: ${b.neutral[800]};
  margin: ${u[2]} 0 ${u[1]};
  padding-bottom: ${u[2]};
  border-bottom: 1px solid ${b.neutral[200]};
`,se=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[2]};
`,te=g.label`
  font-size: ${C.fontSize.sm};
  font-weight: ${C.fontWeight.semibold};
  color: ${b.neutral[700]};
`,Ye=g.span`
  font-size: ${C.fontSize.xs};
  color: ${b.neutral[500]};
  margin-top: 2px;
`,pe=g(nr)`
  width: 100%;
  input { width: 100%; min-height: 40px; }
`,Er=g.textarea`
  width: 100%;
  min-height: 80px;
  padding: ${u[3]};
  border: 1px solid ${b.neutral[300]};
  border-radius: 6px;
  font-family: inherit;
  font-size: ${C.fontSize.sm};
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
  &:focus {
    border-color: ${b.primary.main};
    box-shadow: 0 0 0 2px ${b.primary.lighter};
  }
`,m7=g.div`
  width: 100%;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${b.neutral[200]};
  background: ${b.neutral[100]};
  iframe { width: 100%; height: 100%; border: 0; }
  @media (max-width: 600px) { height: 200px; }
`,an=g.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${u[4]};
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`,pf=g.div`
  padding: ${u[3]} ${u[4]};
  background: rgba(16, 185, 129, 0.1);
  color: ${b.success};
  border-radius: 6px;
  font-weight: ${C.fontWeight.semibold};
  font-size: ${C.fontSize.sm};
`,hf=g.div`
  padding: ${u[3]} ${u[4]};
  background: rgba(239, 68, 68, 0.1);
  color: ${b.error};
  border-radius: 6px;
  font-weight: ${C.fontWeight.semibold};
  font-size: ${C.fontSize.sm};
`,g7=g.div`
  display: flex;
  gap: ${u[3]};
  padding-top: ${u[4]};
  @media (max-width: 600px) { button { width: 100%; } }
`,v7=g.div`
  display: flex;
  gap: ${u[3]};
  flex-wrap: wrap;
`,b7=g.button`
  width: 48px;
  height: 48px;
  border-radius: ${J.md};
  background: ${e=>e.$color};
  border: 3px solid ${e=>e.$active?b.neutral[900]:"transparent"};
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  box-shadow: ${e=>e.$active?ze.md:ze.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { transform: scale(1.1); }
`,x7=g.span`
  font-size: ${C.fontSize.xs};
  text-transform: capitalize;
  text-align: center;
  color: ${b.neutral[600]};
`,y7=g.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${u[1]};
`,w7=g.div`
  display: flex;
  gap: ${u[3]};
`,gb=g.button`
  flex: 1;
  padding: ${u[4]};
  border-radius: ${J.md};
  border: 2px solid ${e=>e.$active?b.primary.main:b.neutral[200]};
  background: ${e=>e.$active?b.primary.lighter:"transparent"};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${u[2]};
  transition: all 0.2s;
  font-size: ${C.fontSize.sm};
  font-weight: ${e=>e.$active?C.fontWeight.semibold:C.fontWeight.normal};
  color: ${e=>e.$active?b.primary.main:b.neutral[600]};
  &:hover { border-color: ${b.primary.light}; }
`,k7=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[2]};
  padding: ${u[3]};
  border: 1px solid ${b.neutral[200]};
  border-radius: ${J.md};
  background: ${b.neutral[50]};
`,vb=g.button`
  background: none;
  border: none;
  color: ${b.error};
  cursor: pointer;
  font-size: ${C.fontSize.xs};
  align-self: flex-end;
  padding: ${u[1]} ${u[2]};
  border-radius: ${J.sm};
  &:hover { background: rgba(239, 68, 68, 0.1); }
`,bb=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${u[4]};
`,xb=g.div`
  border: 1px solid ${b.neutral[200]};
  border-radius: ${J.md};
  padding: ${u[4]};
  background: ${e=>e.$inactive?b.neutral[100]:"white"};
  opacity: ${e=>e.$inactive?.65:1};
  display: flex;
  flex-direction: column;
  gap: ${u[3]};
  position: relative;
  transition: box-shadow 0.2s;
  &:hover { box-shadow: ${ze.md}; }
`,yb=g.div`
  width: 100%;
  height: 100px;
  border-radius: ${J.sm};
  background: ${e=>e.$bg||`linear-gradient(135deg, ${b.primary.main}, ${b.primary.dark})`};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  overflow: hidden;
`,bo=g.span`
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
  ${e=>{switch(e.$type){case"predefined":return`background: ${b.primary.lighter}; color: ${b.primary.main};`;case"hidden":return`background: ${b.neutral[200]}; color: ${b.neutral[600]};`;default:return"background: #e8f5e9; color: #388e3c;"}}}
`,oi=g.div`
  display: flex;
  gap: ${u[2]};
  flex-wrap: wrap;
`,zt=g.button`
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid ${b.neutral[300]};
  background: white;
  transition: all 0.15s;
  ${e=>e.$variant==="danger"&&`
    color: ${b.error};
    border-color: ${b.error};
    &:hover { background: rgba(239,68,68,0.1); }
  `}
  ${e=>e.$variant==="toggle"&&`
    color: ${b.primary.main};
    border-color: ${b.primary.main};
    &:hover { background: ${b.primary.lighter}; }
  `}
  &:hover { opacity: 0.85; }
`,Ml=g.div`
  border: 2px dashed ${b.neutral[300]};
  border-radius: ${J.md};
  padding: ${u[4]};
  display: flex;
  flex-direction: column;
  gap: ${u[3]};
  background: ${b.neutral[50]};
`,ii=g.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${u[3]};
  @media (max-width: 400px) { grid-template-columns: 1fr; }
`,wb=[{label:"Purple Blue",value:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"},{label:"Ocean",value:"linear-gradient(135deg, #2196f3 0%, #00bcd4 100%)"},{label:"Sunset",value:"linear-gradient(135deg, #ff6b35 0%, #f7c948 100%)"},{label:"Forest",value:"linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"},{label:"Rose",value:"linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)"},{label:"Slate",value:"linear-gradient(135deg, #636e72 0%, #b2bec3 100%)"},{label:"Gold",value:"linear-gradient(135deg, #f7971e 0%, #ffd200 100%)"},{label:"Night",value:"linear-gradient(135deg, #232526 0%, #414345 100%)"}],kb=g.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`,Ll=g.button`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: ${e=>e.$bg};
  border: 2px solid ${e=>e.$active?b.neutral[900]:"transparent"};
  cursor: pointer;
  transition: all 0.15s;
  &:hover { transform: scale(1.15); }
`,mf={businessName:"",phone:"",whatsappNumber:"",email:"",address:"",themeMode:"light",accentColor:"blue",heroTitle:"",heroSubtitle:"",heroCategories:"",heroCategoryIcons:"",heroCategoryImages:"",statsProducts:"500+",statsYears:"15+",statsClients:"5000+",statsBrands:"50+",testimonials:[],aboutTitle:"About Us",aboutSubtitle:"",aboutStory:"",aboutOfferings:"",aboutCategories:"",aboutBrands:"",aboutShowroom:"",aboutWhyChooseUs:"",aboutShowroomImages:"",mapEmbedUrl:"",mapLatitude:"",mapLongitude:"",mapZoom:"15",smtpEmail:"",smtpAppPassword:"",inquiryFormFields:[{fieldName:"name",label:"Your Name",type:"text",required:!0,enabled:!0,placeholder:"Full name",options:[],displayOrder:0},{fieldName:"email",label:"Email Address",type:"email",required:!0,enabled:!0,placeholder:"your@email.com",options:[],displayOrder:1},{fieldName:"phone",label:"Phone Number",type:"tel",required:!0,enabled:!0,placeholder:"+91 98765 43210",options:[],displayOrder:2},{fieldName:"quantity",label:"Quantity Required",type:"number",required:!0,enabled:!0,placeholder:"e.g., 100",options:[],displayOrder:3},{fieldName:"quantityUnit",label:"Unit",type:"select",required:!1,enabled:!0,placeholder:"",options:["Units","Pieces","Sets","Kg","Boxes"],displayOrder:4},{fieldName:"message",label:"Additional Message / Requirements",type:"textarea",required:!1,enabled:!0,placeholder:"Tell us more about your needs...",options:[],displayOrder:5}],inquiryFormTitle:"Request Quote / Inquiry",showWhatsAppButton:!0,showCallButton:!0,showSqftCalculator:!1,catalogFilterConfig:[{key:"category",label:"Categories",icon:"📂",enabled:!0,displayOrder:0},{key:"material",label:"Material",icon:"🏷️",enabled:!0,displayOrder:1},{key:"finish",label:"Finish",icon:"✨",enabled:!0,displayOrder:2},{key:"size",label:"Size",icon:"📐",enabled:!0,displayOrder:3},{key:"color",label:"Color",icon:"🎨",enabled:!0,displayOrder:4},{key:"price",label:"Price Range",icon:"💰",enabled:!0,displayOrder:5},{key:"rating",label:"Min. Rating",icon:"⭐",enabled:!0,displayOrder:6}]},S7=[{key:"blue",color:"#0066ff"},{key:"orange",color:"#ff6b35"},{key:"purple",color:"#8b5cf6"},{key:"green",color:"#10b981"},{key:"red",color:"#ef4444"}];function eh(e){const t=e.trim(),r=t.match(/src=["']([^"']+)["']/i);return r?r[1]:t}function j7(e){const t=eh(e.mapEmbedUrl);if(t)return t;const r=parseFloat(e.mapLatitude),n=parseFloat(e.mapLongitude),o=parseInt(e.mapZoom)||15;return!isNaN(r)&&!isNaN(n)?`https://maps.google.com/maps?width=100%25&height=400&hl=en&q=${r},${n}&t=&z=${o}&ie=UTF8&iwloc=B&output=embed`:""}function si(e){return Array.isArray(e)?e.join(", "):e||""}const $7=({activeTab:e="general"})=>{const[t,r]=x.useState(mf),[n,o]=x.useState(!0),[i,a]=x.useState(!1),[l,c]=x.useState(null),[d,f]=x.useState([]),[p,h]=x.useState(!1),[y,m]=x.useState(null),[v,$]=x.useState(null),[S,j]=x.useState({}),[k,w]=x.useState({name:"",icon:"📦",image:"",gradient:"",showOnHome:!0}),[_,B]=x.useState(!1),[E,N]=x.useState([]),[L,V]=x.useState(!1),[R,M]=x.useState(null),[W,Z]=x.useState(null),[I,T]=x.useState({}),[z,P]=x.useState({name:"",type:"checkbox",options:[],icon:"🏷️",isActive:!0,showInSidebar:!0}),[A,D]=x.useState(!1),[ae,ee]=x.useState(""),[fe,me]=x.useState(""),[Se,_e]=x.useState({fieldName:"",label:"",type:"text",required:!1,enabled:!0,placeholder:"",options:[],displayOrder:999}),[rt,Nt]=x.useState(!1),[Oe,kt]=x.useState(""),gt=x.useCallback(async()=>{try{h(!0);const F=await jr.get("/categories?all=true");f(F.categories||[])}catch(F){console.error("Failed to load categories:",F)}finally{h(!1)}},[]),at=x.useCallback(async()=>{try{V(!0);const F=await ue.get("/filters");N(F.filters||[])}catch(F){console.error("Failed to load filters:",F)}finally{V(!1)}},[]);x.useEffect(()=>{Hr(),gt(),at()},[]);const Hr=async()=>{try{o(!0);const F=await be.getSiteSettings();r({businessName:F.businessName||"",phone:F.phone||"",whatsappNumber:F.whatsappNumber||"",email:F.email||"",address:F.address||"",themeMode:F.themeMode||"light",accentColor:F.accentColor||"blue",heroTitle:F.heroTitle||"",heroSubtitle:F.heroSubtitle||"",heroCategories:si(F.heroCategories),heroCategoryIcons:si(F.heroCategoryIcons),heroCategoryImages:si(F.heroCategoryImages),statsProducts:F.statsProducts||"500+",statsYears:F.statsYears||"15+",statsClients:F.statsClients||"5000+",statsBrands:F.statsBrands||"50+",testimonials:Array.isArray(F.testimonials)&&F.testimonials.length>0?F.testimonials:[],aboutTitle:F.aboutTitle||"About Us",aboutSubtitle:F.aboutSubtitle||"",aboutStory:F.aboutStory||"",aboutOfferings:F.aboutOfferings||"",aboutCategories:si(F.aboutCategories),aboutBrands:si(F.aboutBrands),aboutShowroom:F.aboutShowroom||"",aboutWhyChooseUs:F.aboutWhyChooseUs||"",aboutShowroomImages:si(F.aboutShowroomImages),mapEmbedUrl:F.mapEmbedUrl||"",mapLatitude:F.mapLatitude!=null?String(F.mapLatitude):"",mapLongitude:F.mapLongitude!=null?String(F.mapLongitude):"",mapZoom:F.mapZoom!=null?String(F.mapZoom):"15",smtpEmail:F.smtpEmail||"",smtpAppPassword:F.smtpAppPassword||"",inquiryFormFields:Array.isArray(F.inquiryFormFields)&&F.inquiryFormFields.length>0?F.inquiryFormFields:mf.inquiryFormFields,inquiryFormTitle:F.inquiryFormTitle||"Request Quote / Inquiry",showWhatsAppButton:F.showWhatsAppButton!==!1,showCallButton:F.showCallButton!==!1,showSqftCalculator:F.showSqftCalculator!==!1,catalogFilterConfig:Array.isArray(F.catalogFilterConfig)&&F.catalogFilterConfig.length>0?F.catalogFilterConfig:mf.catalogFilterConfig})}catch(F){console.error("Failed to load settings:",F)}finally{o(!1)}},Jt=async F=>{F.preventDefault(),a(!0),c(null);try{const U={businessName:t.businessName,phone:t.phone,whatsappNumber:t.whatsappNumber,email:t.email,address:t.address,themeMode:t.themeMode,accentColor:t.accentColor,heroTitle:t.heroTitle,heroSubtitle:t.heroSubtitle,statsProducts:t.statsProducts,statsYears:t.statsYears,statsClients:t.statsClients,statsBrands:t.statsBrands,testimonials:t.testimonials.filter(re=>re.text||re.author),aboutTitle:t.aboutTitle,aboutSubtitle:t.aboutSubtitle,aboutStory:t.aboutStory,aboutOfferings:t.aboutOfferings,aboutCategories:t.aboutCategories.split(",").map(re=>re.trim()).filter(Boolean),aboutBrands:t.aboutBrands.split(",").map(re=>re.trim()).filter(Boolean),aboutShowroom:t.aboutShowroom,aboutWhyChooseUs:t.aboutWhyChooseUs,aboutShowroomImages:t.aboutShowroomImages.split(",").map(re=>re.trim()).filter(Boolean),mapEmbedUrl:eh(t.mapEmbedUrl),mapZoom:parseInt(t.mapZoom)||15,smtpEmail:t.smtpEmail,smtpAppPassword:t.smtpAppPassword,inquiryFormFields:t.inquiryFormFields,inquiryFormTitle:t.inquiryFormTitle,showWhatsAppButton:t.showWhatsAppButton,showCallButton:t.showCallButton,showSqftCalculator:t.showSqftCalculator,catalogFilterConfig:t.catalogFilterConfig};t.mapLatitude&&(U.mapLatitude=parseFloat(t.mapLatitude)),t.mapLongitude&&(U.mapLongitude=parseFloat(t.mapLongitude)),await be.updateSiteSettings(U),c({type:"success",text:"✓ Settings saved successfully!"}),setTimeout(()=>c(null),3e3)}catch{c({type:"error",text:"Failed to save settings. Please try again."})}finally{a(!1)}},Re=F=>U=>{let re=U.target.value;F==="mapEmbedUrl"&&re.includes("<iframe")&&(re=eh(re)),r(je=>({...je,[F]:re}))},Ve=F=>U=>Re(F)({target:{value:U.target.value}}),co=()=>{r(F=>({...F,testimonials:[...F.testimonials,{text:"",author:""}]}))},uo=(F,U,re)=>{r(je=>({...je,testimonials:je.testimonials.map((ur,po)=>po===F?{...ur,[U]:re}:ur)}))},Xd=F=>{r(U=>({...U,testimonials:U.testimonials.filter((re,je)=>je!==F)}))},Qa=j7(t);if(n)return s.jsx(Qr,{label:"Loading settings..."});const Qd=()=>s.jsxs(Gr,{children:[s.jsx(_t,{children:"🏢 Business Information"}),s.jsxs(se,{children:[s.jsx(te,{children:"Business Name"}),s.jsx(pe,{placeholder:"Your Business Name",value:t.businessName,onChange:Ve("businessName")})]}),s.jsxs(an,{children:[s.jsxs(se,{children:[s.jsx(te,{children:"Phone"}),s.jsx(pe,{placeholder:"+91 98765 43210",value:t.phone,onChange:Ve("phone")})]}),s.jsxs(se,{children:[s.jsx(te,{children:"WhatsApp Number"}),s.jsx(Ye,{children:"Include country code, e.g. 919876543210"}),s.jsx(pe,{placeholder:"919876543210",value:t.whatsappNumber,onChange:Ve("whatsappNumber")})]})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Email"}),s.jsx(pe,{type:"email",placeholder:"contact@yourbusiness.com",value:t.email,onChange:Ve("email")})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Address"}),s.jsx(Er,{placeholder:"Full business address",value:t.address,onChange:Re("address")})]})]}),ls=()=>s.jsxs(Gr,{children:[s.jsx(_t,{children:"🎨 Site Appearance"}),s.jsx(Ye,{children:"These settings apply to all pages for all visitors."}),s.jsxs(se,{children:[s.jsx(te,{children:"Theme Mode"}),s.jsxs(w7,{children:[s.jsxs(gb,{$active:t.themeMode==="light",onClick:()=>r(F=>({...F,themeMode:"light"})),children:[s.jsx("span",{style:{fontSize:"1.5rem"},children:"☀️"}),"Light"]}),s.jsxs(gb,{$active:t.themeMode==="dark",onClick:()=>r(F=>({...F,themeMode:"dark"})),children:[s.jsx("span",{style:{fontSize:"1.5rem"},children:"🌙"}),"Dark"]})]})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Accent Color"}),s.jsx(Ye,{children:"Primary brand color used across the site."}),s.jsx(v7,{children:S7.map(({key:F,color:U})=>s.jsxs(y7,{children:[s.jsx(b7,{$color:U,$active:t.accentColor===F,onClick:()=>r(re=>({...re,accentColor:F})),children:t.accentColor===F&&s.jsx("span",{style:{color:"white",fontWeight:"bold",textShadow:"0 1px 2px rgba(0,0,0,0.5)"},children:"✓"})}),s.jsx(x7,{children:F})]},F))})]})]}),Ja=()=>s.jsxs(Gr,{children:[s.jsx(_t,{children:"🏠 Hero Section"}),s.jsxs(se,{children:[s.jsx(te,{children:"Hero Title"}),s.jsx(pe,{placeholder:"Discover Premium Products for Every Lifestyle",value:t.heroTitle,onChange:Ve("heroTitle")})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Hero Subtitle"}),s.jsx(Er,{placeholder:"Shop curated collections of electronics, fashion, home essentials, and more",value:t.heroSubtitle,onChange:Re("heroSubtitle")})]})]}),cs=()=>{const F=async()=>{var ie;if(k.name.trim())try{m(null),await ue.post("/categories",k),m({type:"success",text:`Category "${k.name}" added!`}),w({name:"",icon:"📦",image:"",gradient:"",showOnHome:!0}),B(!1),await gt(),setTimeout(()=>m(null),3e3)}catch(ge){m({type:"error",text:((ie=ge==null?void 0:ge.details)==null?void 0:ie.message)||(ge==null?void 0:ge.message)||"Failed to add category"})}},U=async ie=>{var ge;try{m(null),await ue.put(`/categories/${ie}`,S),m({type:"success",text:"Category updated!"}),$(null),j({}),await gt(),setTimeout(()=>m(null),3e3)}catch(H){m({type:"error",text:((ge=H==null?void 0:H.details)==null?void 0:ge.message)||(H==null?void 0:H.message)||"Failed to update"})}},re=async ie=>{var ge;if(window.confirm(`Delete category "${ie.name}"? Products with this category won't be affected.`))try{m(null),await ue.delete(`/categories/${ie._id}`),m({type:"success",text:`Category "${ie.name}" deleted.`}),await gt(),setTimeout(()=>m(null),3e3)}catch(H){m({type:"error",text:((ge=H==null?void 0:H.details)==null?void 0:ge.message)||(H==null?void 0:H.message)||"Failed to delete"})}},je=async(ie,ge)=>{try{await ue.put(`/categories/${ie._id}`,{[ge]:!ie[ge]}),await gt()}catch(H){console.error("Toggle failed:",H)}},ur=ie=>{$(ie._id),j({name:ie.name,icon:ie.icon,image:ie.image,gradient:ie.gradient})},po=ie=>ie.image?`url('${ie.image}')`:ie.gradient?ie.gradient:`linear-gradient(135deg, ${b.primary.main}, ${b.primary.dark})`;return s.jsxs(Gr,{children:[s.jsx(_t,{children:"📂 Category Management"}),s.jsx(Ye,{children:"Manage categories that appear on the home page and in product filters. Each category can have a background image, icon, or gradient."}),y&&(y.type==="success"?s.jsx(pf,{children:y.text}):s.jsx(hf,{children:y.text})),p?s.jsx(Qr,{label:"Loading categories..."}):s.jsxs(bb,{children:[d.map(ie=>s.jsxs(xb,{$inactive:!ie.isActive,children:[s.jsx(yb,{$bg:po(ie),style:ie.image?{backgroundImage:`url('${ie.image}')`}:ie.gradient?{background:ie.gradient}:void 0,children:!ie.image&&s.jsx("span",{children:ie.icon})}),v===ie._id?s.jsxs(s.Fragment,{children:[s.jsxs(se,{children:[s.jsx(te,{children:"Name"}),s.jsx(pe,{value:S.name||"",onChange:ge=>j(H=>({...H,name:ge.target.value}))})]}),s.jsxs(ii,{children:[s.jsxs(se,{children:[s.jsx(te,{children:"Icon (emoji)"}),s.jsx(pe,{value:S.icon||"",onChange:ge=>j(H=>({...H,icon:ge.target.value}))})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Image URL"}),s.jsx(pe,{value:S.image||"",onChange:ge=>j(H=>({...H,image:ge.target.value})),placeholder:"https://..."})]})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Gradient (or leave empty for default)"}),s.jsxs(kb,{children:[s.jsx(Ll,{$bg:"transparent",$active:!S.gradient,onClick:()=>j(ge=>({...ge,gradient:""})),style:{border:"2px dashed #ccc",fontSize:"10px",display:"flex",alignItems:"center",justifyContent:"center"},children:"✕"}),wb.map(ge=>s.jsx(Ll,{$bg:ge.value,$active:S.gradient===ge.value,onClick:()=>j(H=>({...H,gradient:ge.value})),title:ge.label},ge.label))]})]}),s.jsxs(oi,{children:[s.jsx(zt,{$variant:"toggle",onClick:()=>U(ie._id),children:"Save"}),s.jsx(zt,{onClick:()=>{$(null),j({})},children:"Cancel"})]})]}):s.jsxs(s.Fragment,{children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:u[2],flexWrap:"wrap"},children:[s.jsx("strong",{style:{fontSize:C.fontSize.base},children:ie.name}),ie.isPredefined&&s.jsx(bo,{$type:"predefined",children:"Predefined"}),!ie.isPredefined&&s.jsx(bo,{$type:"custom",children:"Custom"}),!ie.isActive&&s.jsx(bo,{$type:"hidden",children:"Inactive"}),!ie.showOnHome&&ie.isActive&&s.jsx(bo,{$type:"hidden",children:"Hidden from Home"})]}),s.jsxs(oi,{children:[s.jsx(zt,{onClick:()=>ur(ie),children:"✏️ Edit"}),s.jsx(zt,{$variant:"toggle",onClick:()=>je(ie,"isActive"),children:ie.isActive?"👁 Active":"👁‍🗨 Inactive"}),s.jsx(zt,{$variant:"toggle",onClick:()=>je(ie,"showOnHome"),children:ie.showOnHome?"🏠 On Home":"🏠 Off Home"}),s.jsx(zt,{$variant:"danger",onClick:()=>re(ie),children:"🗑"})]})]})]},ie._id)),_?s.jsxs(Ml,{children:[s.jsx(_t,{style:{fontSize:C.fontSize.base,margin:0,border:"none",paddingBottom:0},children:"➕ New Category"}),s.jsxs(se,{children:[s.jsx(te,{children:"Name *"}),s.jsx(pe,{value:k.name,onChange:ie=>w(ge=>({...ge,name:ie.target.value})),placeholder:"e.g., Electronics"})]}),s.jsxs(ii,{children:[s.jsxs(se,{children:[s.jsx(te,{children:"Icon (emoji)"}),s.jsx(pe,{value:k.icon,onChange:ie=>w(ge=>({...ge,icon:ie.target.value}))})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Image URL"}),s.jsx(pe,{value:k.image,onChange:ie=>w(ge=>({...ge,image:ie.target.value})),placeholder:"https://..."})]})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Gradient"}),s.jsxs(kb,{children:[s.jsx(Ll,{$bg:"transparent",$active:!k.gradient,onClick:()=>w(ie=>({...ie,gradient:""})),style:{border:"2px dashed #ccc",fontSize:"10px",display:"flex",alignItems:"center",justifyContent:"center"},children:"✕"}),wb.map(ie=>s.jsx(Ll,{$bg:ie.value,$active:k.gradient===ie.value,onClick:()=>w(ge=>({...ge,gradient:ie.value})),title:ie.label},ie.label))]})]}),s.jsxs(oi,{children:[s.jsx(zt,{$variant:"toggle",onClick:F,children:"Add Category"}),s.jsx(zt,{onClick:()=>B(!1),children:"Cancel"})]})]}):s.jsxs(Ml,{style:{alignItems:"center",justifyContent:"center",minHeight:150,cursor:"pointer"},onClick:()=>B(!0),children:[s.jsx("span",{style:{fontSize:"2rem"},children:"➕"}),s.jsx("span",{style:{color:b.neutral[500],fontWeight:600},children:"Add Category"})]})]})]})},Za=()=>{const F=async()=>{var H,Q;if((H=z.name)!=null&&H.trim())try{M(null),await ue.post("/filters",{...z,options:z.options||[]}),M({type:"success",text:`Filter "${z.name}" created!`}),P({name:"",type:"checkbox",options:[],icon:"🏷️",isActive:!0,showInSidebar:!0}),D(!1),ee(""),await at(),setTimeout(()=>M(null),3e3)}catch(le){M({type:"error",text:((Q=le==null?void 0:le.details)==null?void 0:Q.message)||(le==null?void 0:le.message)||"Failed to create filter"})}},U=async H=>{var Q;try{M(null),await ue.put(`/filters/${H}`,I),M({type:"success",text:"Filter updated!"}),Z(null),T({}),me(""),await at(),setTimeout(()=>M(null),3e3)}catch(le){M({type:"error",text:((Q=le==null?void 0:le.details)==null?void 0:Q.message)||(le==null?void 0:le.message)||"Failed to update"})}},re=async H=>{var Q;if(window.confirm(`Delete filter "${H.name}"? Product filter values will remain but won't be shown.`))try{M(null),await ue.delete(`/filters/${H._id}`),M({type:"success",text:`Filter "${H.name}" deleted.`}),await at(),setTimeout(()=>M(null),3e3)}catch(le){M({type:"error",text:((Q=le==null?void 0:le.details)==null?void 0:Q.message)||(le==null?void 0:le.message)||"Failed to delete"})}},je=async(H,Q)=>{try{await ue.put(`/filters/${H._id}`,{[Q]:!H[Q]}),await at()}catch(le){console.error("Toggle failed:",le)}},ur=()=>{if(!ae.trim())return;const H=ae.trim().toLowerCase().replace(/\s+/g,"-");P(Q=>({...Q,options:[...Q.options||[],{label:ae.trim(),value:H}]})),ee("")},po=H=>{P(Q=>({...Q,options:(Q.options||[]).filter((le,Ge)=>Ge!==H)}))},ie=()=>{if(!fe.trim())return;const H=fe.trim().toLowerCase().replace(/\s+/g,"-");T(Q=>({...Q,options:[...Q.options||[],{label:fe.trim(),value:H}]})),me("")},ge=H=>{T(Q=>({...Q,options:(Q.options||[]).filter((le,Ge)=>Ge!==H)}))};return s.jsxs(Gr,{children:[s.jsx(_t,{children:"⚙️ Built-in Filters"}),s.jsx(Ye,{children:"Enable, disable, rename, or reorder the built-in product filters that appear in the catalog sidebar. Changes are saved with the Save button below."}),t.catalogFilterConfig.sort((H,Q)=>H.displayOrder-Q.displayOrder).map((H,Q)=>s.jsxs("div",{style:{border:`1px solid ${H.enabled?b.neutral[200]:b.neutral[300]}`,borderRadius:"8px",padding:u[3],background:H.enabled?"white":b.neutral[100],opacity:H.enabled?1:.6,display:"flex",alignItems:"center",gap:u[3],flexWrap:"wrap"},children:[s.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[s.jsx("button",{type:"button",disabled:Q===0,onClick:()=>{r(le=>{const Ge=[...le.catalogFilterConfig].sort((St,lt)=>St.displayOrder-lt.displayOrder);return Q===0?le:([Ge[Q],Ge[Q-1]]=[Ge[Q-1],Ge[Q]],{...le,catalogFilterConfig:Ge.map((St,lt)=>({...St,displayOrder:lt}))})})},style:{background:"none",border:"1px solid #ddd",borderRadius:"3px",padding:"2px 6px",cursor:Q===0?"not-allowed":"pointer",opacity:Q===0?.3:1,fontSize:"10px"},children:"↑"}),s.jsx("button",{type:"button",disabled:Q===t.catalogFilterConfig.length-1,onClick:()=>{r(le=>{const Ge=[...le.catalogFilterConfig].sort((St,lt)=>St.displayOrder-lt.displayOrder);return Q===Ge.length-1?le:([Ge[Q],Ge[Q+1]]=[Ge[Q+1],Ge[Q]],{...le,catalogFilterConfig:Ge.map((St,lt)=>({...St,displayOrder:lt}))})})},style:{background:"none",border:"1px solid #ddd",borderRadius:"3px",padding:"2px 6px",cursor:Q===t.catalogFilterConfig.length-1?"not-allowed":"pointer",opacity:Q===t.catalogFilterConfig.length-1?.3:1,fontSize:"10px"},children:"↓"})]}),s.jsx("input",{type:"text",value:H.icon,onChange:le=>{const Ge=le.target.value;r(St=>({...St,catalogFilterConfig:St.catalogFilterConfig.map(lt=>lt.key===H.key?{...lt,icon:Ge}:lt)}))},style:{width:"40px",textAlign:"center",border:"1px solid #ddd",borderRadius:"4px",padding:"4px",fontSize:"1.2rem"}}),s.jsx("input",{type:"text",value:H.label,onChange:le=>{const Ge=le.target.value;r(St=>({...St,catalogFilterConfig:St.catalogFilterConfig.map(lt=>lt.key===H.key?{...lt,label:Ge}:lt)}))},style:{flex:1,minWidth:"120px",border:"1px solid #ddd",borderRadius:"4px",padding:"6px 10px",fontSize:C.fontSize.sm,fontWeight:600}}),s.jsx("span",{style:{fontSize:C.fontSize.xs,background:b.primary.lighter,color:b.primary.main,padding:"2px 8px",borderRadius:"10px",fontWeight:600},children:H.key}),s.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:C.fontSize.sm,fontWeight:600,color:H.enabled?b.success:b.neutral[500]},children:[s.jsx("input",{type:"checkbox",checked:H.enabled,onChange:le=>{const Ge=le.target.checked;r(St=>({...St,catalogFilterConfig:St.catalogFilterConfig.map(lt=>lt.key===H.key?{...lt,enabled:Ge}:lt)}))}}),H.enabled?"Visible":"Hidden"]})]},H.key)),s.jsx("div",{style:{borderTop:`2px solid ${b.neutral[200]}`,marginTop:u[4],paddingTop:u[4]}}),s.jsx(_t,{children:"🔍 Custom Filters"}),s.jsx(Ye,{children:"Create custom filters that appear in the catalog sidebar. Products can have values for these filters set in the product form."}),R&&(R.type==="success"?s.jsx(pf,{children:R.text}):s.jsx(hf,{children:R.text})),L?s.jsx(Qr,{label:"Loading filters..."}):s.jsxs(bb,{children:[E.map(H=>s.jsxs(xb,{$inactive:!H.isActive,children:[s.jsx(yb,{$bg:`linear-gradient(135deg, ${b.primary.lighter}, ${b.primary.main})`,children:s.jsx("span",{children:H.icon||"🔍"})}),W===H._id?s.jsxs(s.Fragment,{children:[s.jsxs(se,{children:[s.jsx(te,{children:"Name"}),s.jsx(pe,{value:I.name||"",onChange:Q=>T(le=>({...le,name:Q.target.value}))})]}),s.jsxs(ii,{children:[s.jsxs(se,{children:[s.jsx(te,{children:"Icon (emoji)"}),s.jsx(pe,{value:I.icon||"",onChange:Q=>T(le=>({...le,icon:Q.target.value}))})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Type"}),s.jsxs("select",{value:I.type||"checkbox",onChange:Q=>T(le=>({...le,type:Q.target.value})),style:{width:"100%",padding:u[2],border:`1px solid ${b.neutral[300]}`,borderRadius:"4px",fontSize:C.fontSize.sm},children:[s.jsx("option",{value:"checkbox",children:"Checkbox (multi-select)"}),s.jsx("option",{value:"select",children:"Dropdown (single-select)"}),s.jsx("option",{value:"range",children:"Range (min-max)"})]})]})]}),I.type!=="range"&&s.jsxs(se,{children:[s.jsx(te,{children:"Options"}),s.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"4px",marginBottom:u[2]},children:(I.options||[]).map((Q,le)=>s.jsxs("span",{style:{padding:"2px 8px",background:b.neutral[100],borderRadius:"12px",fontSize:C.fontSize.xs,display:"flex",alignItems:"center",gap:"4px"},children:[Q.label,s.jsx("button",{type:"button",onClick:()=>ge(le),style:{border:"none",background:"none",cursor:"pointer",padding:0,fontSize:"10px",color:b.error},children:"✕"})]},le))}),s.jsxs("div",{style:{display:"flex",gap:u[2]},children:[s.jsx(pe,{placeholder:"Option label",value:fe,onChange:Q=>me(Q.target.value),onKeyDown:Q=>{Q.key==="Enter"&&(Q.preventDefault(),ie())}}),s.jsx(ne,{type:"button",appearance:"outline",onClick:ie,style:{flexShrink:0},children:"+ Add"})]})]}),I.type==="range"&&s.jsxs(ii,{children:[s.jsxs(se,{children:[s.jsx(te,{children:"Min"}),s.jsx("input",{type:"number",value:I.rangeMin??"",onChange:Q=>T(le=>({...le,rangeMin:Number(Q.target.value)})),style:{width:"100%",padding:u[2],border:`1px solid ${b.neutral[300]}`,borderRadius:"6px",fontSize:C.fontSize.sm}})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Max"}),s.jsx("input",{type:"number",value:I.rangeMax??"",onChange:Q=>T(le=>({...le,rangeMax:Number(Q.target.value)})),style:{width:"100%",padding:u[2],border:`1px solid ${b.neutral[300]}`,borderRadius:"6px",fontSize:C.fontSize.sm}})]})]}),s.jsxs(oi,{children:[s.jsx(zt,{$variant:"toggle",onClick:()=>U(H._id),children:"Save"}),s.jsx(zt,{onClick:()=>{Z(null),T({}),me("")},children:"Cancel"})]})]}):s.jsxs(s.Fragment,{children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:u[2],flexWrap:"wrap"},children:[s.jsx("strong",{style:{fontSize:C.fontSize.base},children:H.name}),s.jsx(bo,{$type:"custom",children:H.type}),!H.isActive&&s.jsx(bo,{$type:"hidden",children:"Inactive"}),!H.showInSidebar&&H.isActive&&s.jsx(bo,{$type:"hidden",children:"Hidden"})]}),H.type!=="range"&&H.options.length>0&&s.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"4px",marginTop:u[1]},children:H.options.map((Q,le)=>s.jsx("span",{style:{padding:"1px 6px",background:b.neutral[100],borderRadius:"10px",fontSize:C.fontSize.xs,color:b.neutral[600]},children:Q.label},le))}),H.type==="range"&&s.jsxs("div",{style:{fontSize:C.fontSize.sm,color:b.neutral[600],marginTop:u[1]},children:["Range: ",H.rangeMin??0," – ",H.rangeMax??100," ",H.rangeUnit||""]}),s.jsxs(oi,{children:[s.jsx(zt,{onClick:()=>{Z(H._id),T({name:H.name,type:H.type,options:[...H.options],icon:H.icon,rangeMin:H.rangeMin,rangeMax:H.rangeMax,rangeUnit:H.rangeUnit})},children:"✏️ Edit"}),s.jsx(zt,{$variant:"toggle",onClick:()=>je(H,"isActive"),children:H.isActive?"👁 Active":"👁‍🗨 Inactive"}),s.jsx(zt,{$variant:"toggle",onClick:()=>je(H,"showInSidebar"),children:H.showInSidebar?"📌 In Sidebar":"📌 Hidden"}),s.jsx(zt,{$variant:"danger",onClick:()=>re(H),children:"🗑"})]})]})]},H._id)),A?s.jsxs(Ml,{children:[s.jsx(_t,{style:{fontSize:C.fontSize.base,margin:0,border:"none",paddingBottom:0},children:"➕ New Filter"}),s.jsxs(se,{children:[s.jsx(te,{children:"Filter Name *"}),s.jsx(pe,{value:z.name||"",onChange:H=>P(Q=>({...Q,name:H.target.value})),placeholder:"e.g., Brand, Warranty, Application"})]}),s.jsxs(ii,{children:[s.jsxs(se,{children:[s.jsx(te,{children:"Icon (emoji)"}),s.jsx(pe,{value:z.icon||"",onChange:H=>P(Q=>({...Q,icon:H.target.value}))})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Type"}),s.jsxs("select",{value:z.type||"checkbox",onChange:H=>P(Q=>({...Q,type:H.target.value})),style:{width:"100%",padding:u[2],border:`1px solid ${b.neutral[300]}`,borderRadius:"4px",fontSize:C.fontSize.sm},children:[s.jsx("option",{value:"checkbox",children:"Checkbox (multi-select)"}),s.jsx("option",{value:"select",children:"Dropdown (single-select)"}),s.jsx("option",{value:"range",children:"Range (min-max)"})]})]})]}),z.type!=="range"&&s.jsxs(se,{children:[s.jsx(te,{children:"Options"}),s.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"4px",marginBottom:u[2]},children:(z.options||[]).map((H,Q)=>s.jsxs("span",{style:{padding:"2px 8px",background:b.neutral[100],borderRadius:"12px",fontSize:C.fontSize.xs,display:"flex",alignItems:"center",gap:"4px"},children:[H.label,s.jsx("button",{type:"button",onClick:()=>po(Q),style:{border:"none",background:"none",cursor:"pointer",padding:0,fontSize:"10px",color:b.error},children:"✕"})]},Q))}),s.jsxs("div",{style:{display:"flex",gap:u[2]},children:[s.jsx(pe,{placeholder:"Option label",value:ae,onChange:H=>ee(H.target.value),onKeyDown:H=>{H.key==="Enter"&&(H.preventDefault(),ur())}}),s.jsx(ne,{type:"button",appearance:"outline",onClick:ur,style:{flexShrink:0},children:"+ Add"})]})]}),z.type==="range"&&s.jsxs(ii,{children:[s.jsxs(se,{children:[s.jsx(te,{children:"Min"}),s.jsx("input",{type:"number",value:z.rangeMin??"",onChange:H=>P(Q=>({...Q,rangeMin:Number(H.target.value)})),style:{width:"100%",padding:u[2],border:`1px solid ${b.neutral[300]}`,borderRadius:"6px",fontSize:C.fontSize.sm}})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Max"}),s.jsx("input",{type:"number",value:z.rangeMax??"",onChange:H=>P(Q=>({...Q,rangeMax:Number(H.target.value)})),style:{width:"100%",padding:u[2],border:`1px solid ${b.neutral[300]}`,borderRadius:"6px",fontSize:C.fontSize.sm}})]})]}),s.jsxs(oi,{children:[s.jsx(zt,{$variant:"toggle",onClick:F,children:"Create Filter"}),s.jsx(zt,{onClick:()=>{D(!1),ee("")},children:"Cancel"})]})]}):s.jsxs(Ml,{style:{alignItems:"center",justifyContent:"center",minHeight:150,cursor:"pointer"},onClick:()=>D(!0),children:[s.jsx("span",{style:{fontSize:"2rem"},children:"➕"}),s.jsx("span",{style:{color:b.neutral[500],fontWeight:600},children:"Add Filter"})]})]})]})},Jd=()=>s.jsxs(Gr,{children:[s.jsx(_t,{children:"📊 Stats Section"}),s.jsxs(an,{children:[s.jsxs(se,{children:[s.jsx(te,{children:"Products Count"}),s.jsx(pe,{placeholder:"500+",value:t.statsProducts,onChange:Ve("statsProducts")})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Years in Business"}),s.jsx(pe,{placeholder:"15+",value:t.statsYears,onChange:Ve("statsYears")})]})]}),s.jsxs(an,{children:[s.jsxs(se,{children:[s.jsx(te,{children:"Happy Clients"}),s.jsx(pe,{placeholder:"5000+",value:t.statsClients,onChange:Ve("statsClients")})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Brands Available"}),s.jsx(pe,{placeholder:"50+",value:t.statsBrands,onChange:Ve("statsBrands")})]})]})]}),ds=()=>s.jsxs(Gr,{children:[s.jsx(_t,{children:"💬 Testimonials"}),s.jsx(Ye,{children:"Add customer testimonials shown on the home page."}),t.testimonials.map((F,U)=>s.jsxs(k7,{children:[s.jsx(vb,{onClick:()=>Xd(U),children:"✕ Remove"}),s.jsxs(se,{children:[s.jsx(te,{children:"Quote"}),s.jsx(Er,{placeholder:"What the customer said...",value:F.text,onChange:re=>uo(U,"text",re.target.value)})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Author"}),s.jsx(pe,{placeholder:"Name - Role/Company",value:F.author,onChange:re=>uo(U,"author",re.target.value)})]})]},U)),s.jsx(ne,{appearance:"outline",onClick:co,style:{alignSelf:"flex-start"},children:"+ Add Testimonial"})]}),Yo=()=>s.jsxs(Gr,{children:[s.jsx(_t,{children:"📄 About Page Content"}),s.jsxs(se,{children:[s.jsx(te,{children:"Page Title"}),s.jsx(pe,{placeholder:"About Us",value:t.aboutTitle,onChange:Ve("aboutTitle")})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Subtitle"}),s.jsx(pe,{placeholder:"Your trusted destination for premium, curated products",value:t.aboutSubtitle,onChange:Ve("aboutSubtitle")})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Our Story"}),s.jsx(Ye,{children:"Use separate paragraphs with a blank line between them."}),s.jsx(Er,{placeholder:"Tell your company story here...",value:t.aboutStory,onChange:Re("aboutStory"),style:{minHeight:"140px"}})]}),s.jsxs(se,{children:[s.jsx(te,{children:"What We Offer"}),s.jsx(Ye,{children:"Each line becomes a bullet point."}),s.jsx(Er,{placeholder:`500+ premium products from leading brands
Expert design consultation
Competitive wholesale and retail pricing`,value:t.aboutOfferings,onChange:Re("aboutOfferings"),style:{minHeight:"120px"}})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Product Categories"}),s.jsx(Ye,{children:"Comma-separated list"}),s.jsx(Er,{placeholder:"Electronics, Fashion, Home & Living, Sports & Outdoors",value:t.aboutCategories,onChange:Re("aboutCategories")})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Featured Brands"}),s.jsx(Ye,{children:"Comma-separated list of brand names"}),s.jsx(Er,{placeholder:"Brand A, Brand B, Brand C",value:t.aboutBrands,onChange:Re("aboutBrands")})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Showroom Description"}),s.jsx(Er,{placeholder:"Visit our modern showroom to experience our collection...",value:t.aboutShowroom,onChange:Re("aboutShowroom")})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Showroom Image URLs"}),s.jsx(Ye,{children:"Comma-separated Google Drive or image URLs"}),s.jsx(Er,{placeholder:"https://drive.google.com/..., https://drive.google.com/...",value:t.aboutShowroomImages,onChange:Re("aboutShowroomImages")})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Why Choose Us"}),s.jsx(Ye,{children:"Each line becomes a highlight. Format: Title - Description"}),s.jsx(Er,{placeholder:`15+ Years Experience - We've been in the industry long enough to know quality
Certified Products - All our products meet international standards`,value:t.aboutWhyChooseUs,onChange:Re("aboutWhyChooseUs"),style:{minHeight:"140px"}})]})]}),fo=()=>s.jsxs(Gr,{children:[s.jsx(_t,{children:"📍 Map Location"}),s.jsxs(se,{children:[s.jsx(te,{children:"Google Maps Embed URL"}),s.jsxs(Ye,{children:["Paste the embed URL or full ","<iframe>"," tag from Google Maps."]}),s.jsx(Er,{placeholder:"https://www.google.com/maps/embed?pb=...",value:t.mapEmbedUrl,onChange:Re("mapEmbedUrl")})]}),s.jsx(Ye,{style:{textAlign:"center",fontStyle:"italic"},children:"— OR use coordinates —"}),s.jsxs(an,{children:[s.jsxs(se,{children:[s.jsx(te,{children:"Latitude"}),s.jsx(pe,{type:"number",placeholder:"e.g. 23.025122",value:t.mapLatitude,onChange:Ve("mapLatitude")})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Longitude"}),s.jsx(pe,{type:"number",placeholder:"e.g. 72.58316",value:t.mapLongitude,onChange:Ve("mapLongitude")})]})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Zoom Level (1-21)"}),s.jsx(pe,{type:"number",placeholder:"15",value:t.mapZoom,onChange:Ve("mapZoom")})]}),Qa&&s.jsxs(se,{children:[s.jsx(te,{children:"Map Preview"}),s.jsx(m7,{children:s.jsx("iframe",{src:Qa,loading:"lazy",allowFullScreen:!0,referrerPolicy:"no-referrer-when-downgrade",title:"Map Preview"})})]}),s.jsx(_t,{children:"📧 Email Notifications (Gmail)"}),s.jsxs(se,{children:[s.jsx(te,{children:"Gmail Address"}),s.jsx(Ye,{children:"The Gmail address used to send contact form notifications."}),s.jsx(pe,{type:"email",placeholder:"yourbusiness@gmail.com",value:t.smtpEmail,onChange:Ve("smtpEmail")})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Gmail App Password"}),s.jsx(Ye,{children:"Generate one at: Google Account → Security → 2-Step Verification → App passwords."}),s.jsx(pe,{type:"password",placeholder:"xxxx xxxx xxxx xxxx",value:t.smtpAppPassword,onChange:Ve("smtpAppPassword")})]}),s.jsx(Ye,{style:{fontStyle:"italic"},children:"Contact form submissions will be emailed to the Business Email (set in General tab). If SMTP is not configured, submissions are still saved in the database."})]}),us=[{value:"text",label:"Text"},{value:"email",label:"Email"},{value:"tel",label:"Phone"},{value:"number",label:"Number"},{value:"textarea",label:"Text Area"},{value:"select",label:"Dropdown"}],rn=(F,U)=>{r(re=>{const je=[...re.inquiryFormFields];return je[F]={...je[F],...U},{...re,inquiryFormFields:je}})},Zd=F=>{r(U=>({...U,inquiryFormFields:U.inquiryFormFields.filter((re,je)=>je!==F)}))},el=(F,U)=>{r(re=>{const je=[...re.inquiryFormFields],ur=F+U;return ur<0||ur>=je.length?re:([je[F],je[ur]]=[je[ur],je[F]],{...re,inquiryFormFields:je.map((po,ie)=>({...po,displayOrder:ie}))})})},tl=()=>{if(!Se.fieldName||!Se.label)return;const F=Se.fieldName.toLowerCase().replace(/[^a-z0-9]/g,"_");r(U=>({...U,inquiryFormFields:[...U.inquiryFormFields,{...Se,fieldName:F,displayOrder:U.inquiryFormFields.length}]})),_e({fieldName:"",label:"",type:"text",required:!1,enabled:!0,placeholder:"",options:[],displayOrder:999}),Nt(!1),kt("")},G={general:Qd,appearance:ls,hero:Ja,categories:cs,filters:Za,stats:Jd,testimonials:ds,about:Yo,contact:fo,inquiry:()=>s.jsxs(Gr,{children:[s.jsx(_t,{children:"📝 Inquiry Form Configuration"}),s.jsx(Ye,{children:"Customize the inquiry form that appears on product detail pages. Drag fields to reorder, toggle visibility, or add new custom fields."}),s.jsxs(se,{children:[s.jsx(te,{children:"Form Title"}),s.jsx(pe,{value:t.inquiryFormTitle,onChange:Ve("inquiryFormTitle"),placeholder:"Request Quote / Inquiry"})]}),s.jsxs(an,{children:[s.jsxs(se,{children:[s.jsxs(te,{style:{display:"flex",alignItems:"center",gap:"8px"},children:[s.jsx("input",{type:"checkbox",checked:t.showWhatsAppButton,onChange:F=>r(U=>({...U,showWhatsAppButton:F.target.checked}))}),"Show WhatsApp Button"]}),s.jsx(Ye,{children:"Uses WhatsApp number from General tab"})]}),s.jsxs(se,{children:[s.jsxs(te,{style:{display:"flex",alignItems:"center",gap:"8px"},children:[s.jsx("input",{type:"checkbox",checked:t.showCallButton,onChange:F=>r(U=>({...U,showCallButton:F.target.checked}))}),"Show Call Button"]}),s.jsx(Ye,{children:"Uses Phone number from General tab"})]})]}),s.jsxs(se,{children:[s.jsxs(te,{style:{display:"flex",alignItems:"center",gap:"8px"},children:[s.jsx("input",{type:"checkbox",checked:t.showSqftCalculator,onChange:F=>r(U=>({...U,showSqftCalculator:F.target.checked}))}),"Show Area Calculator Guide"]}),s.jsx(Ye,{children:"Shows a helper link when quantity unit is set to a measurable unit"})]}),s.jsx(_t,{children:"📋 Form Fields"}),t.inquiryFormFields.map((F,U)=>s.jsxs("div",{style:{border:`1px solid ${F.enabled?b.neutral[200]:b.neutral[300]}`,borderRadius:"8px",padding:u[4],background:F.enabled?"white":b.neutral[100],opacity:F.enabled?1:.7,display:"flex",flexDirection:"column",gap:u[3]},children:[s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:u[2]},children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:u[2]},children:[s.jsx("span",{style:{fontWeight:600,fontSize:"1rem"},children:F.label}),s.jsx("span",{style:{fontSize:"0.75rem",background:b.primary.lighter,color:b.primary.main,padding:"2px 8px",borderRadius:"10px"},children:F.type}),F.required&&s.jsx("span",{style:{fontSize:"0.75rem",background:"rgba(239,68,68,0.1)",color:b.error,padding:"2px 8px",borderRadius:"10px"},children:"Required"})]}),s.jsxs("div",{style:{display:"flex",gap:u[1]},children:[s.jsx("button",{type:"button",onClick:()=>el(U,-1),disabled:U===0,style:{background:"none",border:"1px solid #ddd",borderRadius:"4px",padding:"4px 8px",cursor:U===0?"not-allowed":"pointer",opacity:U===0?.4:1},children:"↑"}),s.jsx("button",{type:"button",onClick:()=>el(U,1),disabled:U===t.inquiryFormFields.length-1,style:{background:"none",border:"1px solid #ddd",borderRadius:"4px",padding:"4px 8px",cursor:U===t.inquiryFormFields.length-1?"not-allowed":"pointer",opacity:U===t.inquiryFormFields.length-1?.4:1},children:"↓"})]})]}),s.jsxs(an,{children:[s.jsxs(se,{children:[s.jsx(te,{children:"Label"}),s.jsx(pe,{value:F.label,onChange:re=>rn(U,{label:re.target.value})})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Field Name (ID)"}),s.jsx(pe,{value:F.fieldName,onChange:re=>rn(U,{fieldName:re.target.value.toLowerCase().replace(/[^a-z0-9_]/g,"")})})]})]}),s.jsxs(an,{children:[s.jsxs(se,{children:[s.jsx(te,{children:"Type"}),s.jsx(pe,{as:"select",value:F.type,onChange:re=>rn(U,{type:re.target.value}),children:us.map(re=>s.jsx("option",{value:re.value,children:re.label},re.value))})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Placeholder"}),s.jsx(pe,{value:F.placeholder,onChange:re=>rn(U,{placeholder:re.target.value})})]})]}),F.type==="select"&&s.jsxs(se,{children:[s.jsx(te,{children:"Options (comma-separated)"}),s.jsx(pe,{value:F.options.join(", "),onChange:re=>rn(U,{options:re.target.value.split(",").map(je=>je.trim()).filter(Boolean)}),placeholder:"Option A, Option B, Option C"})]}),s.jsxs("div",{style:{display:"flex",gap:u[4],alignItems:"center",flexWrap:"wrap"},children:[s.jsxs(te,{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer"},children:[s.jsx("input",{type:"checkbox",checked:F.required,onChange:re=>rn(U,{required:re.target.checked})}),"Required"]}),s.jsxs(te,{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer"},children:[s.jsx("input",{type:"checkbox",checked:F.enabled,onChange:re=>rn(U,{enabled:re.target.checked})}),"Enabled"]}),s.jsx(vb,{type:"button",onClick:()=>Zd(U),children:"🗑 Remove"})]})]},U)),rt?s.jsxs("div",{style:{border:`2px dashed ${b.primary.main}`,borderRadius:"8px",padding:u[4],background:b.primary.lighter,display:"flex",flexDirection:"column",gap:u[3]},children:[s.jsx(_t,{style:{margin:0,borderBottom:"none"},children:"➕ New Field"}),s.jsxs(an,{children:[s.jsxs(se,{children:[s.jsx(te,{children:"Label *"}),s.jsx(pe,{value:Se.label,onChange:F=>_e(U=>({...U,label:F.target.value,fieldName:F.target.value.toLowerCase().replace(/[^a-z0-9]/g,"_")})),placeholder:"e.g., Company Name"})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Field Name (auto-generated)"}),s.jsx(pe,{value:Se.fieldName,onChange:F=>_e(U=>({...U,fieldName:F.target.value}))})]})]}),s.jsxs(an,{children:[s.jsxs(se,{children:[s.jsx(te,{children:"Type"}),s.jsx(pe,{as:"select",value:Se.type,onChange:F=>_e(U=>({...U,type:F.target.value})),children:us.map(F=>s.jsx("option",{value:F.value,children:F.label},F.value))})]}),s.jsxs(se,{children:[s.jsx(te,{children:"Placeholder"}),s.jsx(pe,{value:Se.placeholder,onChange:F=>_e(U=>({...U,placeholder:F.target.value})),placeholder:"Hint text shown in the field"})]})]}),Se.type==="select"&&s.jsxs(se,{children:[s.jsx(te,{children:"Options (comma-separated)"}),s.jsx(pe,{value:Oe,onChange:F=>{const U=F.target.value;kt(U),_e(re=>({...re,options:U.split(",").map(je=>je.trim()).filter(Boolean)}))},placeholder:"Option A, Option B, Option C"})]}),s.jsx("div",{style:{display:"flex",gap:u[4],alignItems:"center"},children:s.jsxs(te,{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer"},children:[s.jsx("input",{type:"checkbox",checked:Se.required,onChange:F=>_e(U=>({...U,required:F.target.checked}))}),"Required"]})}),s.jsxs("div",{style:{display:"flex",gap:u[2]},children:[s.jsx(ne,{appearance:"primary",type:"button",onClick:tl,disabled:!Se.label||!Se.fieldName,children:"Add Field"}),s.jsx(ne,{appearance:"outline",type:"button",onClick:()=>{Nt(!1),kt("")},children:"Cancel"})]})]}):s.jsx(ne,{appearance:"outline",type:"button",onClick:()=>Nt(!0),style:{alignSelf:"flex-start"},children:"+ Add New Field"})]})};return s.jsx(h7,{children:s.jsxs("form",{onSubmit:Jt,children:[l&&(l.type==="success"?s.jsx(pf,{children:l.text}):s.jsx(hf,{children:l.text})),G[e](),s.jsx(g7,{children:s.jsx(ne,{appearance:"primary",type:"submit",disabled:i,style:{background:b.primary.main,minWidth:120},children:i?s.jsx(Qr,{size:"tiny"}):"💾 Save Settings"})})]})})},gf=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[6]};
`,C7=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${u[4]};

  ${O.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${u[3]};
  }

  @media (max-width: 360px) {
    grid-template-columns: 1fr;
  }
`,ai=g.div`
  background: ${e=>e.$bg};
  border-radius: ${J.xl};
  padding: ${u[5]};
  display: flex;
  flex-direction: column;
  gap: ${u[1]};
  position: relative;
  overflow: hidden;
  border: 1px solid ${e=>e.$color}20;
  transition: all ${ye.base};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${ze.md};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
    background: ${e=>e.$color}15;
    border-radius: 0 0 0 100%;
  }

  ${O.mobile} {
    padding: ${u[4]};
  }
`,li=g.span`
  font-size: 24px;
  line-height: 1;
`,ci=g.div`
  font-size: ${C.fontSize["3xl"]};
  font-weight: ${C.fontWeight.extrabold};
  color: var(--color-text-primary, ${b.neutral[900]});
  line-height: 1;

  ${O.mobile} {
    font-size: ${C.fontSize["2xl"]};
  }
`,di=g.div`
  font-size: ${C.fontSize.xs};
  color: var(--color-text-secondary, ${b.neutral[600]});
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: ${C.fontWeight.semibold};
`,Cs=g.div`
  background: var(--color-neutral-0, white);
  border-radius: ${J.xl};
  border: 1px solid var(--color-neutral-200, ${b.neutral[200]});
  overflow: hidden;
`,_s=g.div`
  padding: ${u[5]} ${u[6]};
  border-bottom: 1px solid var(--color-neutral-200, ${b.neutral[200]});
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${u[3]};

  ${O.mobile} {
    padding: ${u[4]};
  }
`,zs=g.h3`
  font-size: ${C.fontSize.lg};
  font-weight: ${C.fontWeight.bold};
  color: var(--color-text-primary, ${b.neutral[900]});
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${u[2]};
`,Es=g.div`
  padding: ${u[6]};

  ${O.mobile} {
    padding: ${u[4]};
  }
`,_7=g.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${u[6]};

  ${O.tablet} {
    grid-template-columns: 1fr;
  }
`,Sb=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[3]};
`,jb=g.div`
  display: flex;
  align-items: center;
  gap: ${u[3]};
`,$b=g.div`
  width: 100px;
  font-size: ${C.fontSize.sm};
  color: var(--color-text-secondary, ${b.neutral[700]});
  text-align: right;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${O.mobile} {
    width: 70px;
    font-size: ${C.fontSize.xs};
  }
`,Cb=g.div`
  flex: 1;
  height: 28px;
  background: var(--color-neutral-100, ${b.neutral[100]});
  border-radius: ${J.full};
  overflow: hidden;
  position: relative;
`,_b=g.div`
  height: 100%;
  width: ${e=>e.$width}%;
  background: linear-gradient(90deg, ${e=>e.$color}, ${e=>e.$color}cc);
  border-radius: ${J.full};
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: ${u[2]};
  min-width: ${e=>e.$width>0?"32px":"0"};
`,zb=g.span`
  font-size: ${C.fontSize.xs};
  font-weight: ${C.fontWeight.bold};
  color: white;
  white-space: nowrap;
`,z7=g.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${u[4]};
`,E7=g.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: conic-gradient(${e=>e.$segments});
  position: relative;
  transition: transform ${ye.base};

  &:hover {
    transform: scale(1.05);
  }

  &::after {
    content: '';
    position: absolute;
    top: 30%;
    left: 30%;
    width: 40%;
    height: 40%;
    background: var(--color-neutral-0, white);
    border-radius: 50%;
  }

  ${O.mobile} {
    width: 150px;
    height: 150px;
  }
`,B7=g.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${u[3]};
  justify-content: center;
`,T7=g.div`
  display: flex;
  align-items: center;
  gap: ${u[1]};
  font-size: ${C.fontSize.sm};
  color: var(--color-text-secondary, ${b.neutral[700]});
`,P7=g.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${e=>e.$color};
  flex-shrink: 0;
`,N7=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[2]};
  max-height: 300px;
  overflow-y: auto;
`,Eb=g.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${u[3]} ${u[4]};
  border-radius: ${J.lg};
  background: ${e=>e.$severity==="critical"?"#fef2f2":e.$severity==="warning"?"#fffbeb":"#f0fdf4"};
  border-left: 3px solid ${e=>e.$severity==="critical"?"#ef4444":e.$severity==="warning"?"#f59e0b":"#22c55e"};
  font-size: ${C.fontSize.sm};
  gap: ${u[2]};
  flex-wrap: wrap;

  ${O.mobile} {
    padding: ${u[2]} ${u[3]};
    font-size: ${C.fontSize.xs};
  }
`,Bb=g.span`
  font-weight: ${C.fontWeight.semibold};
  color: var(--color-text-primary, ${b.neutral[900]});
  min-width: 0;
  word-break: break-word;
`,Tb=g.span`
  font-size: ${C.fontSize.xs};
  font-weight: ${C.fontWeight.bold};
  padding: 2px 8px;
  border-radius: ${J.full};
  background: ${e=>e.$severity==="critical"?"#ef4444":e.$severity==="warning"?"#f59e0b":"#22c55e"};
  color: white;
`,Pb=g.div`
  display: flex;
  gap: ${u[3]};
  flex-wrap: wrap;
  align-items: center;

  ${O.mobile} {
    flex-direction: column;
    align-items: stretch;

    button {
      width: 100%;
      justify-content: center;
    }
  }
`,Nb=g.input`
  display: none;
`,F7=g.div`
  background: var(--color-neutral-50, ${b.neutral[50]});
  border: 1px solid var(--color-neutral-200, ${b.neutral[200]});
  border-radius: ${J.lg};
  padding: ${u[4]};
  margin-top: ${u[4]};
`,R7=g.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${u[3]};
  gap: ${u[3]};
  flex-wrap: wrap;

  ${O.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`,A7=g.div`
  overflow-x: auto;
  
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: ${C.fontSize.xs};
    
    th {
      background: var(--color-neutral-100, ${b.neutral[100]});
      padding: ${u[2]} ${u[3]};
      text-align: left;
      font-weight: ${C.fontWeight.semibold};
      border-bottom: 1px solid var(--color-neutral-200, ${b.neutral[200]});
      white-space: nowrap;
    }
    
    td {
      padding: ${u[2]} ${u[3]};
      border-bottom: 1px solid var(--color-neutral-100, ${b.neutral[100]});
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`,I7=g.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: ${J.full};
  font-size: ${C.fontSize.xs};
  font-weight: ${C.fontWeight.semibold};
  background: ${e=>e.$type==="success"?"#dcfce7":e.$type==="warning"?"#fef3c7":"#fee2e2"};
  color: ${e=>e.$type==="success"?"#166534":e.$type==="warning"?"#92400e":"#991b1b"};
`,Fb=g.div`
  text-align: center;
  padding: ${u[8]};
  color: var(--color-text-secondary, ${b.neutral[500]});
  
  p {
    margin: ${u[2]} 0;
    font-size: ${C.fontSize.sm};
  }
`,O7=g.div`
  padding: ${u[3]} ${u[4]};
  background: #dcfce7;
  color: #166534;
  border-radius: ${J.lg};
  font-size: ${C.fontSize.sm};
  font-weight: ${C.fontWeight.semibold};
  display: flex;
  align-items: center;
  gap: ${u[2]};
`,q7=g.div`
  padding: ${u[3]} ${u[4]};
  background: #fee2e2;
  color: #991b1b;
  border-radius: ${J.lg};
  font-size: ${C.fontSize.sm};
  font-weight: ${C.fontWeight.semibold};
`,Dl=["#3b82f6","#8b5cf6","#ec4899","#f59e0b","#10b981","#06b6d4","#f97316","#84cc16","#6366f1","#14b8a6","#e11d48","#a855f7"],Rb=e=>{const t=[];let r="",n=!1;for(let o=0;o<e.length;o++){const i=e[o];i==='"'?n&&e[o+1]==='"'?(r+='"',o++):n=!n:i===","&&!n?(t.push(r.trim()),r=""):r+=i}return t.push(r.trim()),t},M7=({refreshTrigger:e})=>{const[t,r]=x.useState([]),[n,o]=x.useState(!0),[i,a]=x.useState(null),[l,c]=x.useState(!1),[d,f]=x.useState(null),p=x.useRef(null);x.useEffect(()=>{h()},[e]);const h=async()=>{o(!0);try{const z=await be.getAdminProducts();r(z)}catch(z){console.error("Failed to load products:",z)}finally{o(!1)}},y=t.length,m=t.filter(z=>z.published).length,v=t.filter(z=>!z.published).length,$=t.filter(z=>z.isActive).length,S=t.filter(z=>z.quantity===0).length,j=t.filter(z=>z.quantity>0&&z.quantity<=10).length,k={};t.forEach(z=>{const P=z.category||"Uncategorized";k[P]=(k[P]||0)+1});const w=Object.entries(k).sort((z,P)=>P[1]-z[1]),_=Math.max(...w.map(z=>z[1]),1),B={};t.forEach(z=>{const P=z.material||"Other";B[P]=(B[P]||0)+1});const E=[{label:"Healthy (>50)",count:t.filter(z=>z.quantity>50).length,color:"#22c55e"},{label:"Medium (11-50)",count:t.filter(z=>z.quantity>=11&&z.quantity<=50).length,color:"#f59e0b"},{label:"Low (1-10)",count:j,color:"#f97316"},{label:"Out of Stock",count:S,color:"#ef4444"}].filter(z=>z.count>0),N=E.reduce((z,P)=>z+P.count,0)||1;let L=0;const V=E.map(z=>{const P=L;return L+=z.count/N*360,`${z.color} ${P}deg ${L}deg`}).join(", ")||"#e5e7eb 0deg 360deg",R=t.filter(z=>z.quantity===0&&z.isActive).slice(0,10),M=t.filter(z=>z.quantity>0&&z.quantity<=10).slice(0,10),W=()=>{const z=["Title","Description","Category","Price","MRP","Quantity","Material","Finish","Sizes","Color","Active","Published"],P=t.map(fe=>[`"${(fe.title||"").replace(/"/g,'""')}"`,`"${(fe.description||"").replace(/"/g,'""')}"`,`"${fe.category||""}"`,fe.price||0,fe.mrp||"",fe.quantity||0,fe.material||"",fe.finish||"",`"${(fe.sizes||[]).join(", ")}"`,`"${fe.color||""}"`,fe.isActive?"Yes":"No",fe.published?"Yes":"No"]),A=[z.join(","),...P.map(fe=>fe.join(","))].join(`
`),D=new Blob(["\uFEFF"+A],{type:"text/csv;charset=utf-8;"}),ae=URL.createObjectURL(D),ee=document.createElement("a");ee.href=ae,ee.download=`inventory_${new Date().toISOString().split("T")[0]}.csv`,ee.click(),URL.revokeObjectURL(ae)},Z=()=>{const A="Title,Description,Category,Price,MRP,Quantity,Material,Finish,Sizes,Color"+`
`+'"Sample Tile","A beautiful tile for your home","Tiles",1500,2000,100,"Tiles","Glossy","2x2, 4x2","White"',D=new Blob(["\uFEFF"+A],{type:"text/csv;charset=utf-8;"}),ae=URL.createObjectURL(D),ee=document.createElement("a");ee.href=ae,ee.download="import_template.csv",ee.click(),URL.revokeObjectURL(ae)},I=z=>{var D;const P=(D=z.target.files)==null?void 0:D[0];if(!P)return;f(null);const A=new FileReader;A.onload=ae=>{var ee;try{const me=((ee=ae.target)==null?void 0:ee.result).split(`
`).filter(rt=>rt.trim());if(me.length<2){f({type:"error",text:"CSV file must have a header row and at least one data row."});return}const Se=Rb(me[0]).map(rt=>rt.toLowerCase().replace(/[^a-z]/g,"")),_e=[];for(let rt=1;rt<me.length;rt++){const Nt=Rb(me[rt]);if(Nt.length<3)continue;const Oe=kt=>{const gt=Se.indexOf(kt);return gt>=0?Nt[gt]:""};_e.push({title:Oe("title"),description:Oe("description"),category:Oe("category")||"Uncategorized",price:parseFloat(Oe("price"))||0,mrp:parseFloat(Oe("mrp"))||null,quantity:parseInt(Oe("quantity"))||0,material:Oe("material")||"Tiles",finish:Oe("finish")||"Glossy",sizes:Oe("sizes")?Oe("sizes").split(",").map(kt=>kt.trim()).filter(Boolean):[],color:Oe("color")||""})}if(_e.length===0){f({type:"error",text:"No valid product rows found in the CSV file."});return}a(_e)}catch{f({type:"error",text:"Failed to parse CSV file. Please check the format."})}},A.readAsText(P),p.current&&(p.current.value="")},T=async()=>{if(!(!i||i.length===0)){c(!0),f(null);try{const z=await be.bulkImportProducts(i);f({type:"success",text:`Successfully imported ${z.created||i.length} products!`}),a(null),h()}catch(z){f({type:"error",text:(z==null?void 0:z.message)||"Failed to import products. Please check data and try again."})}finally{c(!1)}}};return n?s.jsx(gf,{children:s.jsx("div",{style:{display:"flex",justifyContent:"center",padding:u[8]},children:s.jsx(Qr,{size:"large",label:"Loading inventory data..."})})}):t.length===0?s.jsx(gf,{children:s.jsxs(Fb,{children:[s.jsx("div",{style:{fontSize:"48px",marginBottom:u[3]},children:"📦"}),s.jsx("h3",{children:"No Products Yet"}),s.jsx("p",{children:"Start by adding products, or import them from a CSV file."}),s.jsxs(Pb,{style:{justifyContent:"center",marginTop:u[4]},children:[s.jsx(ne,{appearance:"primary",onClick:Z,children:"📄 Download CSV Template"}),s.jsx(ne,{appearance:"outline",onClick:()=>{var z;return(z=p.current)==null?void 0:z.click()},children:"📥 Import CSV"})]}),s.jsx(Nb,{ref:p,type:"file",accept:".csv,.txt",onChange:I})]})}):s.jsxs(gf,{children:[s.jsxs(C7,{children:[s.jsxs(ai,{$color:"#3b82f6",$bg:"#eff6ff",children:[s.jsx(li,{children:"📦"}),s.jsx(ci,{children:y}),s.jsx(di,{children:"Total Products"})]}),s.jsxs(ai,{$color:"#22c55e",$bg:"#f0fdf4",children:[s.jsx(li,{children:"🟢"}),s.jsx(ci,{children:m}),s.jsx(di,{children:"Published"})]}),s.jsxs(ai,{$color:"#f59e0b",$bg:"#fffbeb",children:[s.jsx(li,{children:"📝"}),s.jsx(ci,{children:v}),s.jsx(di,{children:"Drafts"})]}),s.jsxs(ai,{$color:"#ef4444",$bg:"#fef2f2",children:[s.jsx(li,{children:"🚫"}),s.jsx(ci,{children:S}),s.jsx(di,{children:"Out of Stock"})]}),s.jsxs(ai,{$color:"#f97316",$bg:"#fff7ed",children:[s.jsx(li,{children:"⚠️"}),s.jsx(ci,{children:j}),s.jsx(di,{children:"Low Stock"})]}),s.jsxs(ai,{$color:"#8b5cf6",$bg:"#f5f3ff",children:[s.jsx(li,{children:"✅"}),s.jsx(ci,{children:$}),s.jsx(di,{children:"Active"})]})]}),s.jsxs(_7,{children:[s.jsxs(Cs,{children:[s.jsx(_s,{children:s.jsx(zs,{children:"📂 Products by Category"})}),s.jsx(Es,{children:s.jsxs(Sb,{children:[w.map(([z,P],A)=>s.jsxs(jb,{children:[s.jsx($b,{title:z,children:z}),s.jsx(Cb,{children:s.jsx(_b,{$width:P/_*100,$color:Dl[A%Dl.length],children:s.jsx(zb,{children:P})})})]},z)),w.length===0&&s.jsx(Fb,{children:s.jsx("p",{children:"No categories yet"})})]})})]}),s.jsxs(Cs,{children:[s.jsx(_s,{children:s.jsx(zs,{children:"📊 Stock Distribution"})}),s.jsx(Es,{children:s.jsxs(z7,{children:[s.jsx(E7,{$segments:V}),s.jsx(B7,{children:E.map(z=>s.jsxs(T7,{children:[s.jsx(P7,{$color:z.color}),z.label,": ",z.count]},z.label))})]})})]})]}),Object.keys(B).length>1&&s.jsxs(Cs,{children:[s.jsx(_s,{children:s.jsx(zs,{children:"🧱 Products by Material"})}),s.jsx(Es,{children:s.jsx(Sb,{children:Object.entries(B).sort((z,P)=>P[1]-z[1]).map(([z,P],A)=>s.jsxs(jb,{children:[s.jsx($b,{title:z,children:z}),s.jsx(Cb,{children:s.jsx(_b,{$width:P/Math.max(...Object.values(B))*100,$color:Dl[(A+4)%Dl.length],children:s.jsx(zb,{children:P})})})]},z))})})]}),(R.length>0||M.length>0)&&s.jsxs(Cs,{children:[s.jsxs(_s,{children:[s.jsx(zs,{children:"🔔 Stock Alerts"}),s.jsxs(I7,{$type:R.length>0?"error":"warning",children:[R.length+M.length," items need attention"]})]}),s.jsx(Es,{children:s.jsxs(N7,{children:[R.map(z=>s.jsxs(Eb,{$severity:"critical",children:[s.jsx(Bb,{children:z.title}),s.jsx(Tb,{$severity:"critical",children:"Out of Stock"})]},z._id)),M.map(z=>s.jsxs(Eb,{$severity:"warning",children:[s.jsxs(Bb,{children:[z.title," — ",z.quantity," left"]}),s.jsx(Tb,{$severity:"warning",children:"Low Stock"})]},z._id))]})})]}),s.jsxs(Cs,{children:[s.jsx(_s,{children:s.jsx(zs,{children:"📤 Import & Export"})}),s.jsxs(Es,{children:[s.jsxs(Pb,{children:[s.jsx(ne,{appearance:"primary",onClick:W,children:"📥 Export All Products (CSV)"}),s.jsx(ne,{appearance:"outline",onClick:()=>{var z;return(z=p.current)==null?void 0:z.click()},children:"📤 Import from CSV"}),s.jsx(ne,{appearance:"subtle",onClick:Z,children:"📄 Download Template"})]}),s.jsx(Nb,{ref:p,type:"file",accept:".csv,.txt",onChange:I}),d&&s.jsx("div",{style:{marginTop:u[4]},children:d.type==="success"?s.jsxs(O7,{children:["✅ ",d.text]}):s.jsxs(q7,{children:["❌ ",d.text]})}),i&&s.jsxs(F7,{children:[s.jsxs(R7,{children:[s.jsxs("div",{children:[s.jsx("strong",{children:"Preview:"})," ",i.length," products ready to import"]}),s.jsxs("div",{style:{display:"flex",gap:u[2]},children:[s.jsx(ne,{appearance:"primary",size:"small",onClick:T,disabled:l,children:l?s.jsx(Qr,{size:"tiny"}):"✅ Confirm Import"}),s.jsx(ne,{appearance:"subtle",size:"small",onClick:()=>a(null),children:"Cancel"})]})]}),s.jsx(A7,{children:s.jsxs("table",{children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"#"}),s.jsx("th",{children:"Title"}),s.jsx("th",{children:"Category"}),s.jsx("th",{children:"Price"}),s.jsx("th",{children:"Qty"}),s.jsx("th",{children:"Material"})]})}),s.jsxs("tbody",{children:[i.slice(0,10).map((z,P)=>s.jsxs("tr",{children:[s.jsx("td",{children:P+1}),s.jsx("td",{children:z.title}),s.jsx("td",{children:z.category}),s.jsxs("td",{children:["₹",z.price]}),s.jsx("td",{children:z.quantity}),s.jsx("td",{children:z.material})]},P)),i.length>10&&s.jsx("tr",{children:s.jsxs("td",{colSpan:6,style:{textAlign:"center",color:b.neutral[500]},children:["...and ",i.length-10," more products"]})})]})]})})]})]})]})]})},vf=[{id:"inventory",label:"Inventory",icon:"📦",items:[{key:"products",label:"Products",icon:"🏷️",description:"Add, edit, and manage your product catalog"},{key:"analytics",label:"Analytics & Export",icon:"📊",description:"Stock insights, charts, CSV import/export"}]},{id:"storefront",label:"Storefront",icon:"🏪",items:[{key:"general",label:"Business Info",icon:"🏢",description:"Store name, phone, email, and address shown across your site"},{key:"appearance",label:"Theme & Colors",icon:"🎨",description:"Switch between light/dark mode and choose your brand accent color"},{key:"hero",label:"Hero Section",icon:"🖼️",description:"Set the headline and subtitle on your homepage banner"},{key:"banners",label:"Banner Slides",icon:"🎯",description:"Manage promotional image slides on the homepage carousel"},{key:"categories",label:"Categories",icon:"📂",description:"Create product categories with images and icons for the homepage"}]},{id:"content",label:"Content",icon:"📝",items:[{key:"about",label:"About Page",icon:"📖",description:"Your company story, brands, showroom info for the About page"},{key:"testimonials",label:"Testimonials",icon:"💬",description:"Customer reviews/quotes displayed on the homepage"},{key:"stats",label:"Key Numbers",icon:"🔢",description:"Homepage statistics like products count, years in business, etc."}]},{id:"configuration",label:"Configuration",icon:"⚙️",items:[{key:"filters",label:"Catalog Filters",icon:"🔍",description:"Enable, reorder, or rename the filters in your product catalog sidebar"},{key:"inquiry",label:"Inquiry Form",icon:"📋",description:"Customize the inquiry form fields customers fill out for products"},{key:"contact",label:"Contact & Maps",icon:"📍",description:"Google Maps embed, Gmail SMTP for email notifications"}]},{id:"system",label:"System",icon:"🔐",items:[{key:"users",label:"User Management",icon:"👥",description:"View registered users and promote accounts to admin"}]}],L7=["general","appearance","hero","categories","filters","stats","testimonials","about","contact","inquiry"],D7=[{text:"Add products in Inventory → Products, then publish them to make visible on your store.",icon:"📦"},{text:"Import bulk products using CSV under Inventory → Analytics & Export.",icon:"📥"},{text:"Change your store name and contact info in Storefront → Business Info.",icon:"🏢"},{text:"Each section auto-saves when you click Save — no data is lost between tabs.",icon:"💾"}],W7={products:{title:"Manage your entire product catalog from here.",tips:['Click "+ Add New Product" to create a product with images, pricing, and specifications.',"Use the checkboxes to bulk publish, unpublish, or delete multiple products at once.","Products must be published to appear on your store's public catalog.","Update stock quantities by editing individual products."]},analytics:{title:"Inventory insights at a glance with export/import tools.",tips:["Export your full product list as CSV for Excel — great for bookkeeping.","Import products from a CSV file — download the template first to see the format.","The stock alerts section highlights products that need restocking.","Since there are no orders, manually update quantities after each sale."]},banners:{title:"Control the image carousel on your homepage.",tips:["Upload banner images with Google Drive links (right-click → Share → Copy link).","Banners appear in the order listed — drag to reorder if supported.","Use high-resolution landscape images (1920×600px recommended)."]},general:{title:"Core business details visible across your entire site.",tips:["Business Name: appears in the site header, footer, and browser tab title.","Phone/WhatsApp: shown in the contact section and inquiry form.","Email/Address: used for the contact page and email notifications."]},appearance:{title:"Customize the visual look and feel of your store.",tips:["Light/Dark Mode: toggles the overall theme for all visitors.","Accent Color: changes buttons, links, and highlights across the entire site.","Preview changes in real-time before saving."]},hero:{title:"The large banner section at the top of your homepage.",tips:['Title: the main headline visitors see first (e.g., "Discover Premium Products").','Subtitle: supporting text below the title (e.g., "Shop curated collections").']},categories:{title:"Organize products into browsable categories.",tips:["Categories appear on the homepage and in the catalog filter sidebar.","Add an image or gradient background for each category card.",'Toggle "Show on Home" to control which categories appear on the homepage.']},filters:{title:"Configure which filters appear in the catalog sidebar.",tips:["Drag to reorder filters — top ones appear first in the sidebar.","Rename labels to match your business terminology.","Disable filters you don't need to keep the catalog clean.","Custom filters can be created for unique product attributes."]},stats:{title:"The statistics counter section on your homepage.",tips:['These numbers are shown as animated counters (e.g., "500+ Products").',"Update these periodically to reflect your growing business."]},testimonials:{title:"Customer quotes displayed on your homepage for social proof.",tips:["Add real customer feedback with their name and quote.","Short, specific testimonials work best (2-3 sentences).","First 3-4 testimonials are shown on the homepage."]},about:{title:"Content for your About page — tell your brand story.",tips:["Company Story: a paragraph about your business history and values.","Offerings: list your main product types or services.","Brands: mention partner or supplier brands you carry.",'"Why Choose Us": key differentiators (e.g., free delivery, expert advice).']},contact:{title:"Map location and email notification settings.",tips:["Google Maps: paste an embed URL or enter latitude/longitude coordinates.","Gmail SMTP: configure to receive email notifications when customers submit forms.","Test the email configuration after saving to ensure it works."]},inquiry:{title:"Customize the form customers fill out when inquiring about products.",tips:["Add, remove, or reorder form fields (name, email, phone, message, etc.).","Toggle WhatsApp/Call buttons to appear alongside the inquiry form.","Enable the area calculator for product quantity calculations."]},users:{title:"View all registered users and manage admin access.",tips:["Promote trusted users to Admin to let them manage products and settings.","Admin users can access this dashboard and all management features."]}},H7=Xk`
  from { opacity: 0; transform: translateX(-8px); }
  to { opacity: 1; transform: translateX(0); }
`,Yd=Xk`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`,U7=g.div`
  display: flex;
  min-height: calc(100vh - 72px);
  background: var(--color-bg-primary, ${b.neutral[50]});
`,V7=g.aside`
  width: 272px;
  background: var(--color-neutral-0, white);
  border-right: 1px solid var(--color-neutral-200, ${b.neutral[200]});
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  transition: width ${ye.base}, transform ${ye.base};
  flex-shrink: 0;
  position: sticky;
  top: 72px;
  height: calc(100vh - 72px);

  scrollbar-width: thin;
  scrollbar-color: ${b.neutral[300]} transparent;
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: ${b.neutral[300]}; border-radius: 4px; }

  @media (max-width: 1023px) {
    position: fixed;
    top: 72px;
    left: 0;
    bottom: 0;
    z-index: 200;
    width: 272px;
    transform: translateX(${e=>e.$collapsed?"-100%":"0"});
    box-shadow: ${e=>e.$collapsed?"none":ze.xl};
  }

  ${O.mobile} {
    width: 85vw;
    max-width: 300px;
  }
`,G7=g.button`
  display: none;
  position: fixed;
  bottom: 20px;
  left: 16px;
  z-index: 250;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-primary, ${b.primary.main});
  color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
  box-shadow: ${ze.lg};
  align-items: center;
  justify-content: center;
  transition: all ${ye.fast};

  &:hover {
    transform: scale(1.1);
    box-shadow: ${ze.xl};
  }

  @media (max-width: 1023px) {
    display: flex;
  }
`,K7=g.div`
  display: none;
  position: fixed;
  inset: 0;
  top: 72px;
  background: rgba(0, 0, 0, 0.3);
  z-index: 199;

  @media (max-width: 1023px) {
    display: ${e=>e.$show?"block":"none"};
  }
`,Y7=g.div`
  padding: ${u[5]} ${u[4]};
  border-bottom: 1px solid var(--color-neutral-200, ${b.neutral[200]});
  display: flex;
  align-items: center;
  gap: ${u[2]};
  flex-shrink: 0;
`,X7=g.div`
  font-size: ${C.fontSize.sm};
  font-weight: ${C.fontWeight.extrabold};
  color: var(--color-primary, ${b.primary.main});
  text-transform: uppercase;
  letter-spacing: 1px;
`,Q7=g.div`
  padding: ${u[2]} 0;
`,J7=g.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${u[2]};
  padding: ${u[2]} ${u[4]};
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary, ${b.neutral[500]});
  font-size: ${C.fontSize.xs};
  font-weight: ${C.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  transition: color ${ye.fast};

  &:hover {
    color: var(--color-primary, ${b.primary.main});
  }
`,Z7=g.span`
  font-size: 10px;
  transition: transform ${ye.fast};
  transform: rotate(${e=>e.$expanded?"90deg":"0deg"});
  margin-left: auto;
`,eI=g.div`
  display: ${e=>e.$expanded?"block":"none"};
  animation: ${H7} 0.2s ease;
`,tI=g.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${u[3]};
  padding: ${u[2]} ${u[4]} ${u[2]} ${u[6]};
  background: ${e=>e.$active?`var(--color-primary, ${b.primary.main})10`:"transparent"};
  border: none;
  border-left: 3px solid ${e=>e.$active?`var(--color-primary, ${b.primary.main})`:"transparent"};
  cursor: pointer;
  transition: all ${ye.fast};
  text-align: left;

  &:hover {
    background: ${e=>e.$active?`var(--color-primary, ${b.primary.main})15`:"var(--color-neutral-50, "+b.neutral[50]+")"};
  }
`,rI=g.span`
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0;
`,nI=g.span`
  font-size: ${C.fontSize.sm};
  font-weight: ${e=>e.$active?C.fontWeight.semibold:C.fontWeight.medium};
  color: ${e=>e.$active?`var(--color-primary, ${b.primary.main})`:`var(--color-text-primary, ${b.neutral[700]})`};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,oI=g.main`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`,iI=g.div`
  flex: 1;
  padding: ${u[6]} ${u[8]};
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  animation: ${Yd} 0.3s ease;
  box-sizing: border-box;

  @media (max-width: 1023px) {
    padding: ${u[5]} ${u[4]};
  }

  ${O.mobile} {
    padding: ${u[3]} ${u[3]};
  }
`,sI=g.div`
  background: linear-gradient(135deg, var(--color-primary, ${b.primary.main}), var(--color-primary-dark, ${b.primary.dark}));
  border-radius: ${J.xl};
  padding: ${u[6]} ${u[8]};
  color: white;
  margin-bottom: ${u[6]};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    right: 10%;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
  }

  ${O.mobile} {
    padding: ${u[5]} ${u[4]};
  }
`,aI=g.h1`
  font-size: ${C.fontSize["3xl"]};
  font-weight: ${C.fontWeight.extrabold};
  margin: 0 0 ${u[2]} 0;
  position: relative;
  z-index: 1;

  ${O.mobile} {
    font-size: ${C.fontSize["2xl"]};
  }
`,lI=g.p`
  font-size: ${C.fontSize.base};
  opacity: 0.9;
  margin: 0 0 ${u[4]} 0;
  max-width: 600px;
  line-height: 1.5;
  position: relative;
  z-index: 1;

  ${O.mobile} {
    font-size: ${C.fontSize.sm};
  }
`,cI=g.button`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: ${u[2]} ${u[4]};
  border-radius: ${J.full};
  cursor: pointer;
  font-size: ${C.fontSize.sm};
  font-weight: ${C.fontWeight.semibold};
  transition: all ${ye.fast};
  position: relative;
  z-index: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`,dI=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${u[3]};
  margin-top: ${u[4]};
  position: relative;
  z-index: 1;
  animation: ${Yd} 0.3s ease;

  ${O.mobile} {
    grid-template-columns: 1fr;
  }
`,uI=g.div`
  background: rgba(255, 255, 255, 0.12);
  border-radius: ${J.lg};
  padding: ${u[3]} ${u[4]};
  font-size: ${C.fontSize.sm};
  display: flex;
  align-items: flex-start;
  gap: ${u[2]};
  line-height: 1.4;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`,fI=g.div`
  background: var(--color-neutral-0, white);
  border: 1px solid var(--color-neutral-200, ${b.neutral[200]});
  border-radius: ${J.xl};
  padding: ${u[5]} ${u[6]};
  margin-bottom: ${u[5]};

  ${O.mobile} {
    padding: ${u[4]};
  }
`,pI=g.div`
  display: flex;
  align-items: center;
  gap: ${u[3]};
  margin-bottom: ${u[3]};
`,hI=g.span`
  font-size: 28px;
`,mI=g.div`
  display: flex;
  flex-direction: column;
`,gI=g.h2`
  font-size: ${C.fontSize.xl};
  font-weight: ${C.fontWeight.bold};
  color: var(--color-text-primary, ${b.neutral[900]});
  margin: 0;
`,vI=g.p`
  font-size: ${C.fontSize.sm};
  color: var(--color-text-secondary, ${b.neutral[600]});
  margin: 0;
`,bI=g.div`
  display: ${e=>e.$show?"block":"none"};
  background: var(--color-neutral-50, ${b.neutral[50]});
  border-radius: ${J.lg};
  padding: ${u[4]};
  animation: ${Yd} 0.2s ease;
`,xI=g.ul`
  margin: 0;
  padding: 0 0 0 ${u[5]};
  display: flex;
  flex-direction: column;
  gap: ${u[2]};

  li {
    font-size: ${C.fontSize.sm};
    color: var(--color-text-secondary, ${b.neutral[700]});
    line-height: 1.5;
    
    &::marker {
      color: var(--color-primary, ${b.primary.main});
    }
  }
`,yI=g.button`
  background: none;
  border: none;
  color: var(--color-primary, ${b.primary.main});
  cursor: pointer;
  font-size: ${C.fontSize.sm};
  font-weight: ${C.fontWeight.semibold};
  padding: 0;
  margin-top: ${u[1]};

  &:hover {
    text-decoration: underline;
  }
`,Wl=g.div`
  background: var(--color-neutral-0, white);
  border: 1px solid var(--color-neutral-200, ${b.neutral[200]});
  border-radius: ${J.xl};
  padding: ${u[6]};
  overflow: hidden;

  ${O.mobile} {
    padding: ${u[4]};
    border-radius: ${J.lg};
  }
`,wI=g.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${u[4]};
  box-sizing: border-box;
  backdrop-filter: blur(4px);
`,kI=g.div`
  background: white;
  border-radius: ${J.xl};
  padding: ${u[8]};
  width: 100%;
  max-width: 640px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${ze.xl};
  position: relative;
  animation: ${Yd} 0.2s ease;

  ${O.mobile} {
    padding: ${u[4]};
    max-width: 100%;
    max-height: 95vh;
  }
`,SI=g.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${u[6]};
  padding-bottom: ${u[4]};
  border-bottom: 1px solid ${b.neutral[200]};
`,jI=g.h2`
  font-size: ${C.fontSize.xl};
  font-weight: ${C.fontWeight.bold};
  color: ${b.neutral[900]};
  margin: 0;
`,$I=g.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${b.neutral[500]};
  padding: ${u[1]};
  line-height: 1;
  border-radius: ${J.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${b.neutral[100]};
    color: ${b.neutral[800]};
  }
`,CI=g(ne)`
  margin-bottom: ${u[5]};
  padding: ${u[3]} ${u[6]};
  font-weight: ${C.fontWeight.semibold};
  font-size: ${C.fontSize.base};

  ${O.mobile} {
    width: 100%;
  }
`,_I=({onLogout:e})=>{const[t,r]=x.useState("products"),[n,o]=x.useState(!1),[i,a]=x.useState(new Set(vf.map(W=>W.id))),[l,c]=x.useState(!1),[d,f]=x.useState(!0),[p,h]=x.useState("Admin"),[y,m]=x.useState(0),[v,$]=x.useState(!1),[S,j]=x.useState(!1),[k,w]=x.useState(null);x.useEffect(()=>{be.getSiteSettings().then(W=>{W!=null&&W.businessName&&h(W.businessName)}).catch(()=>{})},[]),x.useEffect(()=>{const W=()=>{window.innerWidth<=1023?o(!0):o(!1)};return W(),window.addEventListener("resize",W),()=>window.removeEventListener("resize",W)},[]);const _=W=>{a(Z=>{const I=new Set(Z);return I.has(W)?I.delete(W):I.add(W),I})},B=W=>{r(W),f(!0),window.innerWidth<=1023&&o(!0)},E=async W=>{$(!0);try{k?await be.updateAdminProduct(k._id,W):await be.createAdminProduct(W),j(!1),w(null),m(Z=>Z+1)}finally{$(!1)}},N=W=>{w(W),j(!0)},L=()=>{j(!1),w(null)},V=vf.flatMap(W=>W.items).find(W=>W.key===t),R=W7[t],M=()=>t==="products"?s.jsxs(s.Fragment,{children:[s.jsx(CI,{appearance:"primary",onClick:()=>{w(null),j(!0)},children:"➕ Add New Product"}),s.jsx(Wl,{children:s.jsx(DA,{refreshTrigger:y,onEdit:N})})]}):t==="analytics"?s.jsx(M7,{refreshTrigger:y}):t==="banners"?s.jsx(Wl,{children:s.jsx(a7,{refreshTrigger:y})}):t==="users"?s.jsx(Wl,{children:s.jsx(p7,{})}):L7.includes(t)?s.jsx(Wl,{children:s.jsx($7,{activeTab:t})}):null;return s.jsxs(U7,{children:[s.jsx(K7,{$show:!n,onClick:()=>o(!0)}),s.jsxs(V7,{$collapsed:n,children:[s.jsx(Y7,{children:s.jsx(X7,{children:"⚡ Command Center"})}),vf.map(W=>s.jsxs(Q7,{children:[s.jsxs(J7,{onClick:()=>_(W.id),children:[s.jsx("span",{children:W.icon}),s.jsx("span",{children:W.label}),s.jsx(Z7,{$expanded:i.has(W.id),children:"▶"})]}),s.jsx(eI,{$expanded:i.has(W.id),children:W.items.map(Z=>s.jsxs(tI,{$active:t===Z.key,onClick:()=>B(Z.key),title:Z.description,children:[s.jsx(rI,{children:Z.icon}),s.jsx(nI,{$active:t===Z.key,children:Z.label})]},Z.key))})]},W.id))]}),s.jsx(G7,{onClick:()=>o(!n),children:n?"☰":"✕"}),s.jsx(oI,{children:s.jsxs(iI,{children:[t==="products"&&s.jsxs(sI,{children:[s.jsxs(aI,{children:["Welcome back, ",p," 👋"]}),s.jsx(lI,{children:"This is your store command center. Use the sidebar to navigate between sections. Every change you make here updates your live store in real-time."}),s.jsx(cI,{onClick:()=>c(!l),children:l?"✕ Hide Tips":"💡 Quick Start Tips"}),l&&s.jsx(dI,{children:D7.map((W,Z)=>s.jsxs(uI,{children:[s.jsx("span",{children:W.icon}),s.jsx("span",{children:W.text})]},Z))})]}),V&&R&&s.jsxs(fI,{children:[s.jsxs(pI,{children:[s.jsx(hI,{children:V.icon}),s.jsxs(mI,{children:[s.jsx(gI,{children:V.label}),s.jsx(vI,{children:R.title})]})]}),s.jsx(yI,{onClick:()=>f(!d),children:d?"▾ Hide guide":"▸ Show guide"}),s.jsx(bI,{$show:d,children:s.jsx(xI,{children:R.tips.map((W,Z)=>s.jsx("li",{children:W},Z))})})]}),M()]},t)}),S&&s.jsx(wI,{onClick:L,children:s.jsxs(kI,{onClick:W=>W.stopPropagation(),children:[s.jsxs(SI,{children:[s.jsx(jI,{children:k?"✏️ Edit Product":"➕ Add New Product"}),s.jsx($I,{onClick:L,children:"✕"})]}),s.jsx(hA,{onSubmit:E,initialData:k,isLoading:v},(k==null?void 0:k._id)||"new")]})})]})},zI=g.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${u[8]};
  width: 100%;

  ${O.tablet} {
    padding: ${u[6]};
  }

  ${O.mobile} {
    padding: ${u[4]};
  }
`,EI=g.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${u[8]};
  padding-bottom: ${u[6]};
  border-bottom: 2px solid var(--color-neutral-200, ${b.neutral[200]});
  flex-wrap: wrap;
  gap: ${u[4]};

  ${O.mobile} {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: ${u[6]};
  }
`,BI=g.h1`
  margin: 0;
  font-size: ${C.fontSize["3xl"]};
  font-weight: ${C.fontWeight.extrabold};
  color: var(--color-text-primary, ${b.neutral[900]});

  ${O.mobile} {
    font-size: ${C.fontSize["2xl"]};
  }
`,TI=g(ne)`
  min-height: 44px;
  min-width: 120px;
`,Bs=g.div`
  margin-bottom: ${u[8]};

  ${O.mobile} {
    margin-bottom: ${u[6]};
  }
`,bf=g.h2`
  margin: 0 0 ${u[5]} 0;
  font-size: ${C.fontSize["2xl"]};
  font-weight: ${C.fontWeight.semibold};
  color: var(--color-text-primary, ${b.neutral[900]});
  border-bottom: 2px solid var(--color-primary, ${b.primary.main});
  padding-bottom: ${u[3]};
  display: inline-block;

  ${O.mobile} {
    font-size: ${C.fontSize.xl};
  }
`,PI=g.div`
  background: var(--color-neutral-0, ${b.neutral[0]});
  border: 1px solid var(--color-neutral-200, ${b.neutral[200]});
  padding: ${u[4]};
  border-radius: ${J.md};
  margin-bottom: ${u[4]};
  box-shadow: ${ze.sm};
  max-width: 70%;

  ${O.tablet} {
    max-width: 100%;
  }

  ${O.mobile} {
    max-width: 100%;
  }
`,Ab=g.div`
  background: var(--color-neutral-0, ${b.neutral[0]});
  border: 1px solid var(--color-neutral-200, ${b.neutral[200]});
  padding: ${u[6]};
  border-radius: ${J.md};
  margin-bottom: ${u[6]};
  box-shadow: ${ze.sm};
  max-width: 70%;

  ${O.tablet} {
    max-width: 100%;
  }

  ${O.mobile} {
    max-width: 100%;
    padding: ${u[4]};
  }
`,Ib=g.h3`
  margin: 0 0 ${u[4]} 0;
  font-size: ${C.fontSize.lg};
  font-weight: ${C.fontWeight.semibold};
  color: var(--color-text-primary, ${b.neutral[900]});
`,Dt=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[2]};
  margin-bottom: ${u[4]};

  label {
    font-weight: ${C.fontWeight.semibold};
    color: var(--color-text-secondary, ${b.neutral[600]});
    font-size: ${C.fontSize.sm};
  }

  input,
  select {
    padding: ${u[2]} ${u[3]};
    border: 1px solid var(--color-neutral-200, ${b.neutral[200]});
    border-radius: ${J.md};
    font-size: ${C.fontSize.base};
    transition: border-color ${ye.fast};

    &:focus {
      outline: none;
      border-color: var(--color-primary, ${b.primary.main});
      box-shadow: 0 0 0 3px rgba(79, 112, 245, 0.1);
    }
  }
`,Ob=g.div`
  display: flex;
  gap: ${u[3]};
  margin-top: ${u[5]};
  flex-wrap: wrap;

  ${O.mobile} {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`,Ts=g.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${u[2]} 0;
  border-bottom: 1px solid var(--color-neutral-200, ${b.neutral[200]});

  &:last-child {
    border-bottom: none;
  }

  ${O.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${u[1]};
  }
`,Ps=g.span`
  font-weight: ${C.fontWeight.semibold};
  color: var(--color-text-secondary, ${b.neutral[600]});
  min-width: 120px;
`,Ns=g.span`
  color: var(--color-text-primary, ${b.neutral[900]});
`,NI=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: ${u[4]};
  margin-bottom: ${u[5]};

  ${O.mobile} {
    grid-template-columns: 1fr;
    gap: ${u[3]};
  }
`,FI=g.div`
  border: 1px solid ${e=>e.isDefault?`var(--color-primary, ${b.primary.main})`:`var(--color-neutral-200, ${b.neutral[200]})`};
  box-shadow: ${e=>e.isDefault?ze.md:ze.sm};
  border-radius: ${J.md};
  padding: ${u[3]};
  background: ${e=>e.isDefault?`linear-gradient(135deg, var(--color-primary-lighter, ${b.primary.lighter}) 0%, var(--color-neutral-50, ${b.neutral[50]}) 100%)`:`var(--color-neutral-0, ${b.neutral[0]})`};
  position: relative;
`,RI=g.div`
  position: absolute;
  top: ${u[2]};
  right: ${u[2]};
  display: flex;
  align-items: center;
  gap: ${u[1]};
  background: var(--color-primary, ${b.primary.main});
  color: white;
  padding: ${u[1]} ${u[3]};
  border-radius: ${J.full};
  font-size: ${C.fontSize.xs};
  font-weight: ${C.fontWeight.semibold};
`,AI=g.div`
  margin-bottom: ${u[3]};
  padding-right: ${u[8]};
`,II=g.div`
  font-weight: ${C.fontWeight.semibold};
  color: var(--color-text-primary, ${b.neutral[900]});
  margin-bottom: ${u[2]};
`,xf=g.div`
  font-size: ${C.fontSize.sm};
  color: var(--color-text-secondary, ${b.neutral[600]});
  line-height: ${C.lineHeight.normal};
`,OI=g.div`
  display: flex;
  gap: ${u[2]};
  margin-top: ${u[3]};
  flex-wrap: wrap;

  ${O.mobile} {
    flex-direction: column;

    button {
      width: 100%;
      min-height: 44px;
    }
  }
`,qb=g(ne)`
  min-height: 44px;
`,qI=g.div`
  display: grid;
  gap: ${u[4]};

  ${O.mobile} {
    gap: ${u[3]};
  }
`,MI=g.div`
  border: 1px solid var(--color-neutral-200, ${b.neutral[200]});
  border-radius: ${J.md};
  padding: ${u[4]};
  background: var(--color-neutral-0, ${b.neutral[0]});
  transition: box-shadow ${ye.fast};
  box-shadow: ${ze.sm};

  &:hover {
    box-shadow: ${ze.md};
  }

  ${O.mobile} {
    padding: ${u[3]};
  }
`,LI=g.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f5f5f5;
`,DI=g.span`
  font-weight: 600;
  color: #333;
`,WI=g.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"delivered":return"#dcfce7";case"shipped":return"#bfdbfe";case"processing":return"#fef08a";case"pending":return"#fee2e2";default:return"#e0e0e0"}}};
  color: ${e=>{switch(e.status){case"delivered":return"#16a34a";case"shipped":return"#1e40af";case"processing":return"#c77d11";case"pending":return"#dc2626";default:return"#666"}}};
`,HI=g.div`
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
`,UI=g.div`
  background: #f5f5f5;
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 8px;
  max-height: 200px;
  overflow-y: auto;
`,VI=g.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;

  &:last-child {
    margin-bottom: 0;
  }
`,GI=g.div`
  display: flex;
  justify-content: flex-end;
  font-weight: 600;
  color: #333;
  font-size: 14px;
`,Mb=g.div`
  text-align: center;
  padding: 40px 20px;
  background: #f5f5f5;
  border-radius: 8px;
  color: #666;
`,xo=g(nr)`
  width: 100%;
`,KI=()=>{var Z,I;const e=wt(T=>T.auth.user),t=_r(),r=dr(),[n,o]=x.useState(!1),[i,a]=x.useState([]),[l,c]=x.useState(!1),[d,f]=x.useState(!1),[p,h]=x.useState(!1),[y,m]=x.useState(""),[v,$]=x.useState("success"),[S,j]=x.useState({name:(e==null?void 0:e.name)||"",email:(e==null?void 0:e.email)||"",phone:(e==null?void 0:e.phone)||"",gender:(e==null?void 0:e.gender)||""}),[k,w]=x.useState({currentPassword:"",newPassword:"",confirmPassword:""}),[_,B]=x.useState({name:"",email:"",phone:"",address:"",city:"",state:"",zip:"",isDefault:!1});if(!e)return r("/login"),null;x.useEffect(()=>{E()},[]);const E=async()=>{try{const T=await be.getAddresses();T.success&&a(T.addresses)}catch(T){console.error("Failed to load addresses",T)}},N=()=>{t(Bk()),r("/")},L=async()=>{if(!_.name||!_.address||!_.city||!_.zip){alert("Please fill in all required fields");return}try{const T=await be.addAddress(_);T.success&&(a(T.addresses),B({name:"",email:"",phone:"",address:"",city:"",state:"",zip:"",isDefault:!1}),o(!1))}catch{alert("Failed to add address")}},V=async()=>{var T,z;if(!S.name.trim()){m("Name cannot be empty"),$("error");return}h(!0);try{const P=await be.updateProfile(S);P.success&&(m("Profile updated successfully"),$("success"),c(!1),t({type:"auth/loginSuccess",payload:P.user}),setTimeout(()=>m(""),3e3))}catch(P){m(((z=(T=P.response)==null?void 0:T.data)==null?void 0:z.message)||"Failed to update profile"),$("error")}finally{h(!1)}},R=async()=>{var T,z;if(!k.currentPassword||!k.newPassword||!k.confirmPassword){m("All fields are required"),$("error");return}if(k.newPassword!==k.confirmPassword){m("New passwords do not match"),$("error");return}if(k.newPassword.length<6){m("Password must be at least 6 characters"),$("error");return}h(!0);try{(await be.changePassword({currentPassword:k.currentPassword,newPassword:k.newPassword,confirmPassword:k.confirmPassword})).success&&(m("Password changed successfully"),$("success"),f(!1),w({currentPassword:"",newPassword:"",confirmPassword:""}),setTimeout(()=>m(""),3e3))}catch(P){m(((z=(T=P.response)==null?void 0:T.data)==null?void 0:z.message)||"Failed to change password"),$("error")}finally{h(!1)}},M=async T=>{if(confirm("Are you sure you want to delete this address?"))try{const z=await be.deleteAddress(T);z.success&&a(z.addresses)}catch(z){console.error("Failed to delete address",z)}},W=async T=>{try{const z=await be.updateAddress(T,{isDefault:!0});z.success&&a(z.addresses)}catch(z){console.error("Failed to set default address",z)}};return s.jsxs(zI,{children:[s.jsxs(EI,{children:[s.jsxs("div",{children:[s.jsx(BI,{children:"My Account"}),s.jsxs(cm,{style:{color:"#666"},children:["Welcome, ",e.name]})]}),s.jsx(TI,{appearance:"secondary",onClick:N,children:"Logout"})]}),s.jsxs(Bs,{children:[s.jsx(bf,{children:"Profile Information"}),s.jsxs(PI,{children:[s.jsxs(Ts,{children:[s.jsx(Ps,{children:"Name:"}),s.jsx(Ns,{children:e.name})]}),s.jsxs(Ts,{children:[s.jsx(Ps,{children:"Email:"}),s.jsx(Ns,{children:e.email})]}),s.jsxs(Ts,{children:[s.jsx(Ps,{children:"Phone:"}),s.jsx(Ns,{children:e.phone||"Not set"})]}),s.jsxs(Ts,{children:[s.jsx(Ps,{children:"Gender:"}),s.jsx(Ns,{children:e.gender?e.gender.charAt(0).toUpperCase()+e.gender.slice(1):"Not set"})]}),s.jsxs(Ts,{children:[s.jsx(Ps,{children:"User ID:"}),s.jsx(Ns,{children:e.id})]})]}),s.jsxs("div",{style:{display:"flex",gap:u[3],flexWrap:"wrap"},children:[s.jsx(ne,{appearance:"primary",onClick:()=>c(!0),children:"Edit Profile"}),s.jsx(ne,{appearance:"secondary",onClick:()=>f(!0),children:"Change Password"})]})]}),l&&s.jsx(Bs,{children:s.jsxs(Ab,{children:[s.jsx(Ib,{children:"Edit Profile Information"}),y&&s.jsx("div",{style:{padding:`${u[3]}`,marginBottom:`${u[4]}`,borderRadius:J.md,backgroundColor:v==="error"?"#fee":"#efe",color:v==="error"?"#c33":"#3c3",fontSize:C.fontSize.sm},children:y}),s.jsxs(Dt,{children:[s.jsx("label",{children:"Name"}),s.jsx("input",{type:"text",value:S.name,onChange:T=>j({...S,name:T.target.value}),placeholder:"Your name"})]}),s.jsxs(Dt,{children:[s.jsx("label",{children:"Email"}),s.jsx("input",{type:"email",value:S.email,onChange:T=>j({...S,email:T.target.value}),placeholder:"Your email"})]}),s.jsxs(Dt,{children:[s.jsx("label",{children:"Phone"}),s.jsx("input",{type:"tel",value:S.phone,onChange:T=>j({...S,phone:T.target.value}),placeholder:"Your phone number"})]}),s.jsxs(Dt,{children:[s.jsx("label",{children:"Gender"}),s.jsxs("select",{value:S.gender,onChange:T=>j({...S,gender:T.target.value}),children:[s.jsx("option",{value:"",children:"Not specified"}),s.jsx("option",{value:"male",children:"Male"}),s.jsx("option",{value:"female",children:"Female"}),s.jsx("option",{value:"other",children:"Other"})]})]}),s.jsxs(Ob,{children:[s.jsx(ne,{appearance:"primary",onClick:V,disabled:p,children:p?"Saving...":"Save Changes"}),s.jsx(ne,{appearance:"secondary",onClick:()=>c(!1),disabled:p,children:"Cancel"})]})]})}),d&&s.jsx(Bs,{children:s.jsxs(Ab,{children:[s.jsx(Ib,{children:"Change Password"}),y&&s.jsx("div",{style:{padding:`${u[3]}`,marginBottom:`${u[4]}`,borderRadius:J.md,backgroundColor:v==="error"?"#fee":"#efe",color:v==="error"?"#c33":"#3c3",fontSize:C.fontSize.sm},children:y}),s.jsxs(Dt,{children:[s.jsx("label",{children:"Current Password"}),s.jsx("input",{type:"password",value:k.currentPassword,onChange:T=>w({...k,currentPassword:T.target.value}),placeholder:"Enter your current password"})]}),s.jsxs(Dt,{children:[s.jsx("label",{children:"New Password"}),s.jsx("input",{type:"password",value:k.newPassword,onChange:T=>w({...k,newPassword:T.target.value}),placeholder:"Enter your new password"})]}),s.jsxs(Dt,{children:[s.jsx("label",{children:"Confirm New Password"}),s.jsx("input",{type:"password",value:k.confirmPassword,onChange:T=>w({...k,confirmPassword:T.target.value}),placeholder:"Confirm your new password"})]}),s.jsxs(Ob,{children:[s.jsx(ne,{appearance:"primary",onClick:R,disabled:p,children:p?"Updating...":"Change Password"}),s.jsx(ne,{appearance:"secondary",onClick:()=>f(!1),disabled:p,children:"Cancel"})]})]})}),s.jsxs(Bs,{children:[s.jsx(bf,{children:"Saved Addresses"}),i.length>0?s.jsx(NI,{children:i.map(T=>s.jsxs(FI,{isDefault:T.isDefault,children:[T.isDefault&&s.jsxs(RI,{children:[s.jsx(R3,{})," Default"]}),s.jsxs(AI,{children:[s.jsx(II,{children:T.name}),s.jsx(xf,{children:T.address}),s.jsxs(xf,{children:[T.city,", ",T.state," ",T.zip]}),s.jsx(xf,{children:T.phone})]}),s.jsxs(OI,{children:[!T.isDefault&&s.jsx(qb,{appearance:"subtle",size:"small",onClick:()=>W(T._id||T.id),children:"Set as Default"}),s.jsx(qb,{appearance:"subtle",size:"small",icon:s.jsx(Vc,{}),onClick:()=>M(T._id||T.id)})]})]},T._id||T.id))}):s.jsx(Mb,{children:"No addresses saved yet"}),s.jsx(ne,{appearance:"primary",onClick:()=>o(!0),style:{marginTop:"16px"},children:"Add New Address"})]}),s.jsxs(Bs,{children:[s.jsx(bf,{children:"Order History"}),(((Z=e==null?void 0:e.orders)==null?void 0:Z.length)||0)>0?s.jsx(qI,{children:(I=e==null?void 0:e.orders)==null?void 0:I.map(T=>s.jsxs(MI,{children:[s.jsxs(LI,{children:[s.jsxs(DI,{children:["Order ",T.id]}),s.jsx(WI,{status:T.status,children:T.status.charAt(0).toUpperCase()+T.status.slice(1)})]}),s.jsx(HI,{children:s.jsxs("div",{children:["Order Date: ",new Date(T.date).toLocaleDateString()]})}),s.jsx(UI,{children:T.items.map((z,P)=>s.jsxs(VI,{children:[s.jsxs("span",{children:[z.title," x ",z.quantity]}),s.jsxs("span",{children:["₹ ",(z.price*z.quantity).toFixed(2)]})]},P))}),s.jsxs(GI,{children:["Total: ₹ ",T.total.toFixed(2)]})]},T.id))}):s.jsx(Mb,{children:"No orders yet. Start shopping!"})]}),s.jsx(Aw,{open:n,onOpenChange:()=>o(!1),children:s.jsx(Mw,{children:s.jsxs(Ow,{children:[s.jsx(qw,{children:"Add New Address"}),s.jsxs("div",{style:{padding:"16px 0"},children:[s.jsxs(Dt,{children:[s.jsx(Je,{htmlFor:"addr-name",weight:"semibold",children:"Full Name *"}),s.jsx(xo,{id:"addr-name",placeholder:"Enter full name",value:_.name,onChange:(T,z)=>B(P=>({...P,name:z.value}))})]}),s.jsxs(Dt,{children:[s.jsx(Je,{htmlFor:"addr-email",weight:"semibold",children:"Email"}),s.jsx(xo,{id:"addr-email",type:"email",placeholder:"Enter email",value:_.email,onChange:(T,z)=>B(P=>({...P,email:z.value}))})]}),s.jsxs(Dt,{children:[s.jsx(Je,{htmlFor:"addr-phone",weight:"semibold",children:"Phone Number *"}),s.jsx(xo,{id:"addr-phone",placeholder:"Enter phone number",value:_.phone,onChange:(T,z)=>B(P=>({...P,phone:z.value}))})]}),s.jsxs(Dt,{children:[s.jsx(Je,{htmlFor:"addr-address",weight:"semibold",children:"Address *"}),s.jsx(xo,{id:"addr-address",placeholder:"Enter address",value:_.address,onChange:(T,z)=>B(P=>({...P,address:z.value}))})]}),s.jsxs(Dt,{children:[s.jsx(Je,{htmlFor:"addr-city",weight:"semibold",children:"City *"}),s.jsx(xo,{id:"addr-city",placeholder:"Enter city",value:_.city,onChange:(T,z)=>B(P=>({...P,city:z.value}))})]}),s.jsxs(Dt,{children:[s.jsx(Je,{htmlFor:"addr-state",weight:"semibold",children:"State"}),s.jsx(xo,{id:"addr-state",placeholder:"Enter state",value:_.state,onChange:(T,z)=>B(P=>({...P,state:z.value}))})]}),s.jsxs(Dt,{children:[s.jsx(Je,{htmlFor:"addr-zip",weight:"semibold",children:"ZIP Code *"}),s.jsx(xo,{id:"addr-zip",placeholder:"Enter ZIP code",value:_.zip,onChange:(T,z)=>B(P=>({...P,zip:z.value}))})]})]}),s.jsxs(Iw,{children:[s.jsx(ne,{appearance:"secondary",onClick:()=>o(!1),children:"Cancel"}),s.jsx(ne,{appearance:"primary",onClick:L,children:"Save Address"})]})]})})})]})},YI=g.div`
  max-width: 600px;
  margin: 0 auto;
  padding: ${u[6]};
  background: var(--color-neutral-0, ${b.neutral[0]});
  min-height: 100vh;

  ${O.tablet} {
    padding: ${u[4]};
  }

  ${O.mobile} {
    padding: ${u[3]};
  }
`,XI=g.h1`
  font-size: ${C.fontSize["4xl"]};
  font-weight: ${C.fontWeight.extrabold};
  margin-bottom: ${u[6]};
  color: var(--color-text-primary, ${b.neutral[900]});

  ${O.mobile} {
    font-size: ${C.fontSize["2xl"]};
    margin-bottom: ${u[4]};
  }
`,yf=g.div`
  margin-bottom: ${u[8]};
  padding: ${u[6]};
  background: var(--color-neutral-50, ${b.neutral[50]});
  border-radius: ${J.lg};
  border: 1px solid var(--color-neutral-200, ${b.neutral[200]});

  ${O.mobile} {
    padding: ${u[4]};
    margin-bottom: ${u[4]};
  }
`,wf=g.h2`
  font-size: ${C.fontSize["2xl"]};
  font-weight: ${C.fontWeight.bold};
  margin-bottom: ${u[4]};
  color: var(--color-text-primary, ${b.neutral[800]});

  ${O.mobile} {
    font-size: ${C.fontSize.lg};
  }
`,kf=g.p`
  font-size: ${C.fontSize.base};
  color: var(--color-text-secondary, ${b.neutral[600]});
  margin-bottom: ${u[4]};
`,Lb=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${u[3]};

  ${O.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${u[2]};
  }
`,Sf=g.button`
  padding: ${u[4]};
  border: 2px solid ${e=>e.isActive?"var(--color-primary, "+b.primary.main+")":"var(--color-neutral-300, "+b.neutral[300]+")"};
  background: ${e=>e.isActive?"var(--color-primary-lighter, "+b.primary.lighter+")":"var(--color-neutral-0, "+b.neutral[0]+")"};
  border-radius: ${J.md};
  cursor: pointer;
  transition: all ${ye.fast};
  font-weight: ${C.fontWeight.semibold};
  color: ${e=>e.isActive?"var(--color-primary-dark, "+b.primary.dark+")":"var(--color-text-primary, "+b.neutral[700]+")"};
  font-size: ${C.fontSize.sm};

  &:hover {
    border-color: var(--color-primary, ${b.primary.main});
    background: var(--color-primary-lighter, ${b.primary.lighter});
  }

  &:active {
    transform: scale(0.95);
  }

  ${O.mobile} {
    padding: ${u[3]};
    font-size: ${C.fontSize.xs};
  }
`,QI=g.div`
  width: 24px;
  height: 24px;
  border-radius: ${J.full};
  background: ${e=>e.color};
  margin-right: ${u[2]};
  display: inline-block;
  border: 2px solid var(--color-neutral-300, ${b.neutral[300]});
`,JI=g.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`,Db=g.div`
  padding: ${u[3]} ${u[4]};
  background: var(--color-primary-lighter, #ecfdf5);
  border: 1px solid #d1fae5;
  border-radius: ${J.md};
  color: var(--color-primary-dark, #065f46);
  text-align: center;
  margin-top: ${u[4]};
  font-weight: ${C.fontWeight.medium};
`,Wb={blue:"#0066ff",orange:"#ff6b35",purple:"#8b5cf6",green:"#10b981",red:"#ef4444"},ZI=()=>{const{mode:e,accentColor:t,setMode:r,setAccentColor:n}=fS(),o=a=>{r(a)},i=a=>{n(a)};return s.jsxs(YI,{children:[s.jsx(XI,{children:"⚙️ Settings"}),s.jsxs(yf,{children:[s.jsx(wf,{children:"Theme"}),s.jsx(kf,{children:"Choose your preferred theme"}),s.jsxs(Lb,{children:[s.jsx(Sf,{isActive:e==="light",onClick:()=>o("light"),children:"☀️ Light"}),s.jsx(Sf,{isActive:e==="dark",onClick:()=>o("dark"),children:"🌙 Dark"})]}),s.jsx(Db,{children:"✅ Theme saved automatically"})]}),s.jsxs(yf,{children:[s.jsx(wf,{children:"Accent Color"}),s.jsx(kf,{children:"Customize the primary accent color"}),s.jsx(Lb,{children:Object.keys(Wb).map(a=>s.jsx(Sf,{isActive:t===a,onClick:()=>i(a),children:s.jsxs(JI,{children:[s.jsx(QI,{color:Wb[a]}),s.jsx("span",{style:{textTransform:"capitalize",marginTop:u[2]},children:a})]})},a))}),s.jsx(Db,{children:"✅ Color saved automatically"})]}),s.jsxs(yf,{children:[s.jsx(wf,{children:"About"}),s.jsx(kf,{children:"Your preferences are saved automatically to your browser's local storage. Settings will persist across sessions."})]})]})},eO=g.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${u[12]} ${u[6]};

  ${O.tablet} {
    padding: ${u[8]} ${u[4]};
  }

  ${O.mobile} {
    padding: ${u[6]} ${u[3]};
  }
`,tO=g.section`
  text-align: center;
  margin-bottom: ${u[12]};
`,rO=g.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: ${u[4]};
  color: ${b.neutral[900]};

  ${O.mobile} {
    font-size: 2rem;
  }
`,nO=g.p`
  font-size: 1.25rem;
  color: ${b.neutral[600]};
  max-width: 600px;
  margin: 0 auto ${u[6]};
`,yo=g.section`
  margin-bottom: ${u[12]};
`,wo=g.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: ${u[6]};
  color: ${b.neutral[900]};
  ${O.mobile} {
    text-align: center;
  }
`,ko=g.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${b.neutral[700]};
  margin-bottom: ${u[4]};
`,Hb=g.div`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  padding: ${u[6]};
  border-radius: 8px;
  border-left: 4px solid #667eea;
  margin: ${u[6]} 0;
`,Ub=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${u[4]};
  margin-top: ${u[6]};
`,Vb=g.div`
  text-align: center;
  padding: ${u[4]};
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,oO=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${u[6]};
  margin-top: ${u[6]};
`,Hl=g.div`
  height: 200px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,iO=g.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${b.neutral[700]};
  margin-bottom: ${u[2]};
`,sO=g.div`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  margin-top: ${u[6]};

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }

  ${O.mobile} {
    height: 280px;
  }
`,aO=g.div`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
  border: 2px dashed ${b.neutral[300]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${u[3]};
  margin-top: ${u[6]};
  color: ${b.neutral[500]};
  font-size: 1.1rem;

  ${O.mobile} {
    height: 280px;
  }
`,Kr={aboutTitle:"About Us",aboutSubtitle:"Your trusted destination for premium, curated products across lifestyle, tech, and home",aboutStory:`We started with a simple vision: bring together the best products from around the world into one beautifully curated store. What began as a small online shop has grown into a trusted marketplace serving thousands of happy customers.

Our team personally tests and selects every product to ensure it meets our high standards of quality, design, and value. We believe shopping should be joyful — and every purchase you make should bring lasting satisfaction.`,aboutOfferings:`Curated collection of premium products across 8+ categories
Expert product recommendations and guides
Competitive pricing with regular deals and offers
Fast, reliable shipping with tracking
Hassle-free returns and exchanges
Dedicated customer support`,aboutCategories:["Electronics","Fashion","Home & Living","Sports & Outdoors","Beauty & Health","Kitchen & Dining"],aboutBrands:["Brand A","Brand B","Brand C","Brand D","Brand E","Brand F"],aboutShowroom:"Browse our complete catalog online, with detailed photos, specifications, and customer reviews for every product.",aboutWhyChooseUs:`Curated Quality — Every product is hand-selected for quality and value
Fast Shipping — Most orders ship within 24 hours
Easy Returns — 30-day hassle-free return policy
Expert Support — Our team is here to help you choose
Secure Checkout — Your data is always protected
Sustainable — We prioritize eco-friendly products and packaging`,aboutShowroomImages:[]},lO=()=>{const[e,t]=x.useState(Kr),[r,n]=x.useState("");x.useEffect(()=>{be.getSiteSettings().then(l=>{if(l){if(t({aboutTitle:l.aboutTitle||Kr.aboutTitle,aboutSubtitle:l.aboutSubtitle||Kr.aboutSubtitle,aboutStory:l.aboutStory||Kr.aboutStory,aboutOfferings:l.aboutOfferings||Kr.aboutOfferings,aboutCategories:l.aboutCategories&&l.aboutCategories.length>0?l.aboutCategories:Kr.aboutCategories,aboutBrands:l.aboutBrands&&l.aboutBrands.length>0?l.aboutBrands:Kr.aboutBrands,aboutShowroom:l.aboutShowroom||Kr.aboutShowroom,aboutWhyChooseUs:l.aboutWhyChooseUs||Kr.aboutWhyChooseUs,aboutShowroomImages:l.aboutShowroomImages&&l.aboutShowroomImages.length>0?l.aboutShowroomImages:Kr.aboutShowroomImages}),l.mapEmbedUrl){const c=l.mapEmbedUrl.trim(),d=c.match(/src=["']([^"']+)["']/i);n(d?d[1]:c)}else if(l.mapLatitude&&l.mapLongitude){const c=l.mapZoom||15;n(`https://maps.google.com/maps?width=100%25&height=400&hl=en&q=${l.mapLatitude},${l.mapLongitude}&t=&z=${c}&ie=UTF8&iwloc=B&output=embed`)}}}).catch(()=>{})},[]);const o=e.aboutStory.split(/\n\s*\n/).filter(Boolean),i=e.aboutOfferings.split(`
`).filter(Boolean),a=e.aboutWhyChooseUs.split(`
`).filter(Boolean);return s.jsxs(eO,{children:[s.jsxs(tO,{children:[s.jsx(rO,{children:e.aboutTitle}),s.jsx(nO,{children:e.aboutSubtitle})]}),s.jsxs(yo,{children:[s.jsx(wo,{children:"Our Story"}),o.map((l,c)=>s.jsx(ko,{children:l.trim()},c))]}),s.jsxs(yo,{children:[s.jsx(wo,{children:"What We Offer"}),s.jsx(Hb,{children:i.map((l,c)=>s.jsxs(iO,{children:["✓ ",l.trim()]},c))})]}),s.jsxs(yo,{children:[s.jsx(wo,{children:"Our Categories"}),s.jsx(ko,{children:"We specialize in a wide range of premium materials including:"}),s.jsx(Ub,{children:e.aboutCategories.map((l,c)=>s.jsx(Vb,{children:l},c))})]}),s.jsxs(yo,{children:[s.jsx(wo,{children:"Featured Brands"}),s.jsx(ko,{children:"We are authorized dealers for prestigious brands including:"}),s.jsx(Ub,{children:e.aboutBrands.map((l,c)=>s.jsx(Vb,{children:l},c))})]}),s.jsxs(yo,{children:[s.jsx(wo,{children:"Our Showroom"}),s.jsx(ko,{children:e.aboutShowroom}),s.jsx(oO,{children:e.aboutShowroomImages.length>0?e.aboutShowroomImages.map((l,c)=>s.jsx(Hl,{children:s.jsx("img",{src:l,alt:`Showroom ${c+1}`})},c)):s.jsxs(s.Fragment,{children:[s.jsx(Hl,{children:"📸"}),s.jsx(Hl,{children:"🏢"}),s.jsx(Hl,{children:"🎨"})]})})]}),s.jsxs(yo,{children:[s.jsx(wo,{children:"Why Choose Us?"}),s.jsx(Hb,{children:a.map((l,c)=>{const d=l.indexOf(" - ");return d>-1?s.jsxs(ko,{children:[s.jsx("strong",{children:l.substring(0,d).trim()})," - ",l.substring(d+3).trim()]},c):s.jsx(ko,{children:l.trim()},c)})})]}),s.jsxs(yo,{children:[s.jsx(wo,{children:"Find Us"}),s.jsx(ko,{children:"Visit our showroom to see our collection in person."}),r?s.jsx(sO,{children:s.jsx("iframe",{src:r,allowFullScreen:!0,loading:"lazy",referrerPolicy:"no-referrer-when-downgrade",title:"Our Location"})}):s.jsxs(aO,{children:[s.jsx("span",{style:{fontSize:"3rem"},children:"📍"}),s.jsx("span",{children:"Map location not configured yet"})]})]})]})},cO=g.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${u[12]} ${u[6]};

  ${O.tablet} {
    padding: ${u[8]} ${u[4]};
  }

  ${O.mobile} {
    padding: ${u[6]} ${u[3]};
  }
`,dO=g.h1`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: ${u[4]};
  color: ${b.neutral[900]};

  ${O.mobile} {
    font-size: 2rem;
  }
`,uO=g.p`
  font-size: 1.25rem;
  color: ${b.neutral[600]};
  text-align: center;
  max-width: 600px;
  margin: 0 auto ${u[12]};

  ${O.mobile} {
    font-size: 1rem;
    margin-bottom: ${u[6]};
  }
`,fO=g.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${u[8]};
  margin-bottom: ${u[12]};

  ${O.tablet} {
    grid-template-columns: 1fr 1fr;
    gap: ${u[12]};
  }

  @media (max-width: 480px) {
    margin-bottom: ${u[6]};
  }
`,pO=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[8]};
`,Fs=g.div`
  padding: ${u[6]};
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #667eea;

  @media (max-width: 480px) {
    padding: ${u[4]};
  }
`,Rs=g.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 ${u[2]} 0;
  color: ${b.neutral[900]};

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`,As=g.p`
  margin: 0;
  color: ${b.neutral[700]};
  font-size: 1rem;
`,Gb=g.a`
  color: #667eea;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`,hO=g.form`
  display: flex;
  flex-direction: column;
  gap: ${u[4]};
  padding: ${u[6]};
  background: #f9f9f9;
  border-radius: 8px;

  @media (max-width: 480px) {
    padding: ${u[4]};
  }
`,Is=g.div`
  display: flex;
  flex-direction: column;
  gap: ${u[2]};
`,Os=g.label`
  font-weight: 600;
  color: ${b.neutral[900]};
`,Ul=g(nr)`
  padding: ${u[2]} ${u[3]};
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
`,mO=g(dm)`
  padding: ${u[2]} ${u[3]} !important;
  border-radius: 4px !important;
  border: 1px solid #ddd !important;
  font-size: 1rem !important;
  resize: vertical !important;
`,gO=g(ne)`
  padding: ${u[3]} ${u[6]} !important;
  margin-top: ${u[4]} !important;

  @media (max-width: 480px) {
    width: 100%;
  }
`,vO=g.div`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  ${O.tablet} {
    height: 300px;
  }

  ${O.mobile} {
    height: 250px;
  }
`,bO=g.a`
  display: inline-flex;
  align-items: center;
  gap: ${u[2]};
  padding: ${u[3]} ${u[6]};
  background: #25d366;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #1faa51;
    transform: translateY(-2px);
  }
`,xO=()=>{const[e,t]=x.useState({name:"",email:"",phone:"",subject:"",message:""}),[r,n]=x.useState(!1),[o,i]=x.useState(!1),[a,l]=x.useState(""),[c,d]=x.useState(""),[f,p]=x.useState({phone:"",email:"",whatsappNumber:"",address:"",businessName:""});x.useEffect(()=>{be.getSiteSettings().then(m=>{if(m){if(p({phone:m.phone||"",email:m.email||"",whatsappNumber:m.whatsappNumber||"",address:m.address||"",businessName:m.businessName||""}),m.mapEmbedUrl){const v=m.mapEmbedUrl.trim(),$=v.match(/src=["']([^"']+)["']/i);d($?$[1]:v)}else if(m.mapLatitude!=null&&m.mapLongitude!=null){const v=m.mapZoom||15;d(`https://maps.google.com/maps?width=100%25&height=400&hl=en&q=${m.mapLatitude},${m.mapLongitude}&t=&z=${v}&ie=UTF8&iwloc=B&output=embed`)}}}).catch(()=>{})},[]);const h=m=>{const{name:v,value:$}=m.target;t(S=>({...S,[v]:$})),l("")},y=async m=>{var v;m.preventDefault(),i(!0),l("");try{await be.submitContactForm(e),n(!0),t({name:"",email:"",phone:"",subject:"",message:""}),setTimeout(()=>n(!1),5e3)}catch($){l(((v=$==null?void 0:$.details)==null?void 0:v.message)||($==null?void 0:$.message)||"Failed to send message. Please try again.")}finally{i(!1)}};return s.jsxs(cO,{children:[s.jsx(dO,{children:"Contact Us"}),s.jsx(uO,{children:"Get in touch with us. We're here to help and would love to hear from you."}),s.jsxs(fO,{children:[s.jsxs(pO,{children:[f.address&&s.jsxs(Fs,{children:[s.jsx(Rs,{children:"📍 Address"}),s.jsx(As,{children:f.address.split(`
`).map((m,v)=>s.jsxs("span",{children:[m,s.jsx("br",{})]},v))})]}),f.phone&&s.jsxs(Fs,{children:[s.jsx(Rs,{children:"📞 Phone"}),s.jsx(As,{children:s.jsx(Gb,{href:`tel:${f.phone}`,children:f.phone})})]}),f.email&&s.jsxs(Fs,{children:[s.jsx(Rs,{children:"📧 Email"}),s.jsx(As,{children:s.jsx(Gb,{href:`mailto:${f.email}`,children:f.email})})]}),f.whatsappNumber&&s.jsxs(Fs,{children:[s.jsx(Rs,{children:"💬 WhatsApp"}),s.jsx(As,{children:s.jsx(bO,{href:`https://wa.me/${f.whatsappNumber}`,target:"_blank",rel:"noopener noreferrer",children:"💬 Chat on WhatsApp"})})]}),s.jsxs(Fs,{children:[s.jsx(Rs,{children:"🕐 Business Hours"}),s.jsxs(As,{children:["Monday - Saturday: 10:00 AM - 7:00 PM",s.jsx("br",{}),"Sunday: Closed"]})]})]}),s.jsxs(hO,{onSubmit:y,children:[s.jsx("h2",{style:{marginTop:0,marginBottom:u[4],color:b.neutral[900]},children:"Send us a Message"}),s.jsxs(Is,{children:[s.jsx(Os,{htmlFor:"name",children:"Name *"}),s.jsx(Ul,{id:"name",name:"name",value:e.name,onChange:h,placeholder:"Your name",required:!0})]}),s.jsxs(Is,{children:[s.jsx(Os,{htmlFor:"email",children:"Email *"}),s.jsx(Ul,{id:"email",name:"email",type:"email",value:e.email,onChange:h,placeholder:"your@email.com",required:!0})]}),s.jsxs(Is,{children:[s.jsx(Os,{htmlFor:"phone",children:"Phone *"}),s.jsx(Ul,{id:"phone",name:"phone",value:e.phone,onChange:h,placeholder:"+91 98765 43210",required:!0})]}),s.jsxs(Is,{children:[s.jsx(Os,{htmlFor:"subject",children:"Subject *"}),s.jsx(Ul,{id:"subject",name:"subject",value:e.subject,onChange:h,placeholder:"How can we help?",required:!0})]}),s.jsxs(Is,{children:[s.jsx(Os,{htmlFor:"message",children:"Message *"}),s.jsx(mO,{id:"message",name:"message",value:e.message,onChange:h,placeholder:"Your message...",rows:5,required:!0})]}),s.jsx(gO,{appearance:"primary",type:"submit",disabled:o,children:o?"Sending...":r?"✓ Message Sent!":"Send Message"}),a&&s.jsx("div",{style:{color:b.error,fontSize:"0.9rem",marginTop:u[2]},children:a}),r&&s.jsx("div",{style:{color:b.success,fontSize:"0.9rem",marginTop:u[2]},children:"✓ Your message has been sent. We'll get back to you soon!"})]})]}),c&&s.jsxs("div",{children:[s.jsx("h2",{style:{marginBottom:u[6],color:b.neutral[900]},children:"📍 Visit Our Showroom"}),s.jsx(vO,{children:s.jsx("iframe",{width:"100%",height:"100%",style:{border:0},loading:"lazy",allowFullScreen:!0,referrerPolicy:"no-referrer-when-downgrade",src:c})})]})]})},yO=g.div`
  max-width: 600px;
  margin: ${u[8]} auto;
  padding: ${u[8]};
  background: ${b.neutral[0]};
  border-radius: ${J.lg};
  box-shadow: ${ze.md};
  width: 100%;

  ${O.tablet} {
    margin: ${u[4]} auto;
    padding: ${u[6]};
  }

  ${O.mobile} {
    margin: ${u[4]};
    padding: ${u[6]};
  }
`,wO=g.h1`
  margin: 0 0 ${u[6]} 0;
  font-size: ${C.fontSize["2xl"]};
  font-weight: ${C.fontWeight.extrabold};
  color: ${b.neutral[900]};

  ${O.mobile} {
    font-size: ${C.fontSize.xl};
  }
`,Vl=g.div`
  margin-bottom: ${u[5]};
  display: flex;
  flex-direction: column;
  gap: ${u[2]};

  input {
    min-height: 44px;
  }

  ${O.mobile} {
    margin-bottom: ${u[4]};
  }
`,kO=g.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${u[4]};

  ${O.mobile} {
    grid-template-columns: 1fr;
  }
`,SO=g.div`
  display: flex;
  gap: ${u[3]};
  margin-top: ${u[8]};
  justify-content: flex-end;

  ${O.mobile} {
    flex-direction: column-reverse;
    gap: ${u[2]};

    button {
      width: 100%;
      min-height: 44px;
    }
  }
`,jO=g.div`
  padding: ${u[3]} ${u[4]};
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  color: ${b.success};
  border-radius: ${J.md};
  margin-bottom: ${u[4]};
  border-left: 4px solid ${b.success};
  font-weight: ${C.fontWeight.medium};
  font-size: ${C.fontSize.sm};
`,$O=()=>{const[e,t]=x.useState({name:"",address:"",city:"",zip:""}),[r,n]=x.useState(!1),o=dr(),i=(l,c)=>{t({...e,[l]:c})},a=()=>{e.name&&e.address&&e.city&&e.zip&&(n(!0),setTimeout(()=>{o("/")},2e3))};return s.jsxs(yO,{children:[s.jsx(wO,{children:"Shipping Address"}),r&&s.jsx(jO,{children:"✓ Address saved successfully! Redirecting..."}),s.jsxs(Vl,{children:[s.jsx(Je,{htmlFor:"name",weight:"semibold",children:"Full Name *"}),s.jsx(nr,{id:"name",placeholder:"Enter your full name",value:e.name,onChange:(l,c)=>i("name",c.value),disabled:r})]}),s.jsxs(Vl,{children:[s.jsx(Je,{htmlFor:"address",weight:"semibold",children:"Address *"}),s.jsx(nr,{id:"address",placeholder:"Enter your address",value:e.address,onChange:(l,c)=>i("address",c.value),disabled:r})]}),s.jsxs(kO,{children:[s.jsxs(Vl,{children:[s.jsx(Je,{htmlFor:"city",weight:"semibold",children:"City *"}),s.jsx(nr,{id:"city",placeholder:"Enter your city",value:e.city,onChange:(l,c)=>i("city",c.value),disabled:r})]}),s.jsxs(Vl,{children:[s.jsx(Je,{htmlFor:"zip",weight:"semibold",children:"ZIP Code *"}),s.jsx(nr,{id:"zip",placeholder:"Enter ZIP code",value:e.zip,onChange:(l,c)=>i("zip",c.value),disabled:r})]})]}),s.jsx(cm,{size:200,style:{color:"#666",marginTop:"12px"},children:"All fields are required"}),s.jsxs(SO,{children:[s.jsx(ne,{appearance:"secondary",onClick:()=>o("/cart"),disabled:r,children:"Back to Cart"}),s.jsx(ne,{appearance:"primary",onClick:a,disabled:r||!e.name||!e.address||!e.city||!e.zip,children:r?"Processing...":"Complete Order"})]})]})},CO=g.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fafafa;
`,_O=g.main`
  flex: 1;
`;function zO(){const[e,t]=x.useState(!1),{token:r}=wt(a=>a.auth),n=_r();x.useEffect(()=>{r?(ue.setAuthToken(r),n(gc()),n(Ni()).catch(()=>{})):ue.clearAuthToken()},[r,n]);const o=()=>{t(a=>!a)},i=()=>{t(!1)};return s.jsx(NF,{children:s.jsx(OF,{children:s.jsx(pr,{children:s.jsx(cF,{children:s.jsx(CO,{children:s.jsxs(cS.Provider,{value:{showFilters:e,toggleFilters:o,closeFilters:i},children:[s.jsx(_F,{}),s.jsx(_O,{children:s.jsxs(tF,{children:[s.jsx(hr,{path:"/",element:s.jsx(pr,{children:s.jsx(T8,{})})}),s.jsx(hr,{path:"/catalog",element:s.jsx(pr,{children:s.jsx(p9,{})})}),s.jsx(hr,{path:"/product/:id",element:s.jsx(pr,{children:s.jsx(qR,{})})}),s.jsx(hr,{path:"/about",element:s.jsx(pr,{children:s.jsx(lO,{})})}),s.jsx(hr,{path:"/contact",element:s.jsx(pr,{children:s.jsx(xO,{})})}),s.jsx(hr,{path:"/login",element:s.jsx(pr,{children:s.jsx(UR,{})})}),s.jsx(hr,{path:"/account",element:s.jsx(pr,{children:s.jsx(KI,{})})}),s.jsx(hr,{path:"/settings",element:s.jsx(pr,{children:s.jsx(ZI,{})})}),s.jsx(hr,{path:"/checkout",element:s.jsx(pr,{children:s.jsx($O,{})})}),s.jsx(hr,{path:"/admin",element:s.jsx(pr,{children:s.jsx(YR,{})})}),s.jsx(hr,{path:"/admin/dashboard",element:s.jsx(pr,{children:s.jsx(qF,{requiredRole:"admin",children:s.jsx(_I,{})})})})]})})]})})})})})})}jf.createRoot(document.getElementById("root")).render(s.jsx(Ie.StrictMode,{children:s.jsx(h$,{store:$P,children:s.jsxs(dw,{theme:a3,children:[s.jsx(lN,{}),s.jsx(zO,{})]})})}));
