var PluginUnsplash=function(u,Yn,Q){"use strict";function Zn(e){return e}function Ur(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */var Ve=/; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g,Dr=/\\([\u000b\u0020-\u00ff])/g,kr=/^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/,Fr=Br;function Br(e){if(!e)throw new TypeError("argument string is required");var r=typeof e=="object"?$r(e):e;if(typeof r!="string")throw new TypeError("argument string is required to be a string");var t=r.indexOf(";"),n=t!==-1?r.substr(0,t).trim():r.trim();if(!kr.test(n))throw new TypeError("invalid media type");var a=new jr(n.toLowerCase());if(t!==-1){var s,o,i;for(Ve.lastIndex=t;o=Ve.exec(r);){if(o.index!==t)throw new TypeError("invalid parameter format");t+=o[0].length,s=o[1].toLowerCase(),i=o[2],i[0]==='"'&&(i=i.substr(1,i.length-2).replace(Dr,"$1")),a.parameters[s]=i}if(t!==r.length)throw new TypeError("invalid parameter format")}return a}function $r(e){var r;if(typeof e.getHeader=="function"?r=e.getHeader("content-type"):typeof e.headers=="object"&&(r=e.headers&&e.headers["content-type"]),typeof r!="string")throw new TypeError("content-type header is missing from object");return r}function jr(e){this.parameters=Object.create(null),this.type=e}function P(){return P=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},P.apply(this,arguments)}function x(e,r){if(e==null)return{};var t={},n=Object.keys(e),a,s;for(s=0;s<n.length;s++)a=n[s],!(r.indexOf(a)>=0)&&(t[a]=e[a]);return t}var Hr=ee(function(e){return typeof e=="string"?e:null}),D=function(r){return r!=null};function ee(e){return function(r){return D(e(r))}}var Vr=function(r){return r.length>0},I=function(r){return Object.keys(r).reduce(function(t,n){var a,s=r[n];return P({},t,D(s)?(a={},a[n]=s,a):{})},{})};function he(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];var n=r.length-1;return function(){for(var a=arguments.length,s=new Array(a),o=0;o<a;o++)s[o]=arguments[o];for(var i=r[0].apply(this,s),c=1;c<=n;c++)i=r[c].call(this,i);return i}}var Mr=ee(function(e){return D(e)&&typeof e=="object"&&!Array.isArray(e)?e:null}),zr=ee(function(e){return Array.isArray(e)&&e.every(Hr)&&Vr(e)?e:null}),Jr=ee(function(e){return Mr(e)&&"errors"in e&&zr(e.errors)?{errors:e.errors}:null}),Kr=function(r){return Jr(r)?{errors:r.errors,source:"api"}:{errors:["Responded with a status code outside the 2xx range, and the response body is not recognisable."],source:"decoding"}},Y=function(r){this.message=r},Wr="content-type",Xr="application/json",Gr=function(r){var t=r.headers.get(Wr);return D(t)&&Fr(t).type===Xr},Me=function(r){if(Gr(r))return r.json().catch(function(t){throw new Y("unable to parse JSON response.")});throw new Y("expected JSON response from server.")},Qr=function(r){return function(t){return(t.ok?r({response:t}).then(function(n){return{type:"success",status:t.status,response:n,originalResponse:t}}):Me(t).then(function(n){return P({type:"error",status:t.status},Kr(n),{originalResponse:t})})).catch(function(n){if(n instanceof Y)return{type:"error",source:"decoding",status:t.status,originalResponse:t,errors:[n.message]};throw n})}},O=function(){return function(r){var t=r.response;return Me(t)}},Yr=function(r){return function(t){Object.keys(r).forEach(function(n){return t.searchParams.set(n,r[n].toString())})}},Zr=function(r){return function(t){t.pathname==="/"?t.pathname=r:t.pathname+=r}},Lr=function(r){var t=r.pathname,n=r.query;return function(a){var s=new URL(a);return Zr(t)(s),Yr(n)(s),s.toString()}},et=function(r){var t={};return r.forEach(function(n,a){t[a]=n}),t},rt=function(r){var t=new URL(r),n=t.pathname,a=t.searchParams,s=et(a);return{query:s,pathname:n==="/"?void 0:n}},S=function(r){return function(t,n){n===void 0&&(n={});var a=r(t),s=a.headers,o=a.query,i=x(a,["headers","query"]);return P({},i,n,{query:o,headers:P({},s,n.headers)})}},E=function(r){return r},tt=function(r){var t=r.accessKey,n=r.apiVersion,a=n===void 0?"v1":n,s=r.apiUrl,o=s===void 0?"https://api.unsplash.com":s,i=r.headers,c=r.fetch,f=x(r,["accessKey","apiVersion","apiUrl","headers","fetch"]);return function(d){var p=d.handleResponse,h=d.handleRequest;return he(h,function(v){var L=v.pathname,_=v.query,q=v.method,k=q===void 0?"GET":q,F=v.headers,U=v.body,m=v.signal,l=Lr({pathname:L,query:_})(o),b=P({method:k,headers:P({},i,F,{"Accept-Version":a},D(t)?{Authorization:"Client-ID "+t}:{}),body:U,signal:m},f),y=c!=null?c:fetch;return y(l,b).then(Qr(p))})}},de="x-total",nt=function(r){var t=r.headers.get(de);if(D(t)){var n=parseInt(t);if(Number.isInteger(n))return n;throw new Y("expected "+de+" header to be valid integer.")}else throw new Y("expected "+de+" header to exist.")},$=function(){return function(r){var t=r.response;return O()({response:t}).then(function(n){return{results:n,total:nt(t)}})}},ze=function(r){return D(r)?{collections:r.join()}:{}},at=function(r){return D(r)?{topics:r.join()}:{}},T=function(r){var t=r.page,n=r.perPage,a=r.orderBy;return I({per_page:n,order_by:a,page:t})},re="/collections",st=function(){var e=function(t){var n=t.collectionId;return re+"/"+n+"/photos"};return E({getPathname:e,handleRequest:S(function(r){var t=r.collectionId,n=r.orientation,a=x(r,["collectionId","orientation"]);return{pathname:e({collectionId:t}),query:I(P({},T(a),{orientation:n}))}}),handleResponse:$()})}(),ot=function(){var e=function(t){var n=t.collectionId;return re+"/"+n};return E({getPathname:e,handleRequest:S(function(r){var t=r.collectionId;return{pathname:e({collectionId:t}),query:{}}}),handleResponse:O()})}(),it=function(){var e=function(){return re};return E({getPathname:e,handleRequest:S(function(r){return r===void 0&&(r={}),{pathname:e(),query:T(r)}}),handleResponse:$()})}(),ut=function(){var e=function(t){var n=t.collectionId;return re+"/"+n+"/related"};return E({getPathname:e,handleRequest:S(function(r){var t=r.collectionId;return{pathname:e({collectionId:t}),query:{}}}),handleResponse:O()})}(),Z="/photos",lt=function(){var e=function(){return Z};return E({getPathname:function(t){return e()},handleRequest:S(function(r){return r===void 0&&(r={}),{pathname:Z,query:I(T(r))}}),handleResponse:$()})}(),ct=function(){var e=function(t){var n=t.photoId;return Z+"/"+n};return E({getPathname:e,handleRequest:S(function(r){var t=r.photoId;return{pathname:e({photoId:t}),query:{}}}),handleResponse:O()})}(),ht=function(){var e=function(t){var n=t.photoId;return Z+"/"+n+"/statistics"};return E({getPathname:e,handleRequest:S(function(r){var t=r.photoId;return{pathname:e({photoId:t}),query:{}}}),handleResponse:O()})}(),dt=function(){var e=function(){return Z+"/random"};return E({getPathname:e,handleRequest:S(function(r){var t=r===void 0?{}:r,n=t.collectionIds,a=t.contentFilter,s=t.topicIds,o=x(t,["collectionIds","contentFilter","topicIds"]);return{pathname:e(),query:I(P({},o,{content_filter:a},ze(n),at(s))),headers:{"cache-control":"no-cache"}}}),handleResponse:O()})}(),ft={handleRequest:S(function(e){var r=e.downloadLocation,t=rt(r),n=t.pathname,a=t.query;if(!D(n))throw new Error("Could not parse pathname from url.");return{pathname:n,query:I(a)}}),handleResponse:O()},fe="/search",pt=function(){var e=function(){return fe+"/photos"};return E({getPathname:function(t){return e()},handleRequest:S(function(r){var t=r.query,n=r.page,a=r.perPage,s=r.orderBy,o=r.collectionIds,i=r.lang,c=r.contentFilter,f=x(r,["query","page","perPage","orderBy","collectionIds","lang","contentFilter"]);return{pathname:e(),query:I(P({query:t,content_filter:c,lang:i,order_by:s},T({page:n,perPage:a}),ze(o),f))}}),handleResponse:O()})}(),mt=function(){var e=function(){return fe+"/collections"};return E({getPathname:function(t){return e()},handleRequest:S(function(r){var t=r.query,n=x(r,["query"]);return{pathname:e(),query:P({query:t},T(n))}}),handleResponse:O()})}(),vt=function(){var e=function(){return fe+"/users"};return E({getPathname:function(t){return e()},handleRequest:S(function(r){var t=r.query,n=x(r,["query"]);return{pathname:e(),query:P({query:t},T(n))}}),handleResponse:O()})}(),te="/users",yt=function(){var e=function(t){var n=t.username;return te+"/"+n};return E({getPathname:e,handleRequest:S(function(r){var t=r.username;return{pathname:e({username:t}),query:{}}}),handleResponse:O()})}(),Et=function(){var e=function(t){var n=t.username;return te+"/"+n+"/photos"};return E({getPathname:e,handleRequest:S(function(r){var t=r.username,n=r.stats,a=r.orientation,s=x(r,["username","stats","orientation"]);return{pathname:e({username:t}),query:I(P({},T(s),{orientation:a,stats:n}))}}),handleResponse:$()})}(),Rt=function(){var e=function(t){var n=t.username;return te+"/"+n+"/likes"};return E({getPathname:e,handleRequest:S(function(r){var t=r.username,n=r.orientation,a=x(r,["username","orientation"]);return{pathname:e({username:t}),query:I(P({},T(a),{orientation:n}))}}),handleResponse:$()})}(),Pt=function(){var e=function(t){var n=t.username;return te+"/"+n+"/collections"};return E({getPathname:e,handleRequest:S(function(r){var t=r.username,n=x(r,["username"]);return{pathname:e({username:t}),query:T(n)}}),handleResponse:$()})}(),Je="/topics",ne=function(r){var t=r.topicIdOrSlug;return Je+"/"+t},wt=E({getPathname:ne,handleRequest:function(r){var t=r.page,n=r.perPage,a=r.orderBy,s=r.topicIdsOrSlugs;return{pathname:Je,query:I(P({},T({page:t,perPage:n}),{ids:s==null?void 0:s.join(","),order_by:a}))}},handleResponse:$()}),bt=E({getPathname:ne,handleRequest:function(r){var t=r.topicIdOrSlug;return{pathname:ne({topicIdOrSlug:t}),query:{}}},handleResponse:O()}),St=function(){var e=he(ne,function(r){return r+"/photos"});return E({getPathname:e,handleRequest:function(t){var n=t.topicIdOrSlug,a=t.orientation,s=x(t,["topicIdOrSlug","orientation"]);return{pathname:e({topicIdOrSlug:n}),query:I(P({},T(s),{orientation:a}))}},handleResponse:$()})}(),Ke;(function(e){e.Afrikaans="af",e.Amharic="am",e.Arabic="ar",e.Azerbaijani="az",e.Belarusian="be",e.Bulgarian="bg",e.Bengali="bn",e.Bosnian="bs",e.Catalan="ca",e.Cebuano="ceb",e.Corsican="co",e.Czech="cs",e.Welsh="cy",e.Danish="da",e.German="de",e.Greek="el",e.English="en",e.Esperanto="eo",e.Spanish="es",e.Estonian="et",e.Basque="eu",e.Persian="fa",e.Finnish="fi",e.French="fr",e.Frisian="fy",e.Irish="ga",e.ScotsGaelic="gd",e.Galician="gl",e.Gujarati="gu",e.Hausa="ha",e.Hawaiian="haw",e.Hindi="hi",e.Hmong="hmn",e.Croatian="hr",e.HaitianCreole="ht",e.Hungarian="hu",e.Armenian="hy",e.Indonesian="id",e.Igbo="ig",e.Icelandic="is",e.Italian="it",e.Hebrew="iw",e.Japanese="ja",e.Javanese="jw",e.Georgian="ka",e.Kazakh="kk",e.Khmer="km",e.Kannada="kn",e.Korean="ko",e.Kurdish="ku",e.Kyrgyz="ky",e.Latin="la",e.Luxembourgish="lb",e.Lao="lo",e.Lithuanian="lt",e.Latvian="lv",e.Malagasy="mg",e.Maori="mi",e.Macedonian="mk",e.Malayalam="ml",e.Mongolian="mn",e.Marathi="mr",e.Malay="ms",e.Maltese="mt",e.Myanmar="my",e.Nepali="ne",e.Dutch="nl",e.Norwegian="no",e.Nyanja="ny",e.Oriya="or",e.Punjabi="pa",e.Polish="pl",e.Pashto="ps",e.Portuguese="pt",e.Romanian="ro",e.Russian="ru",e.Kinyarwanda="rw",e.Sindhi="sd",e.Sinhala="si",e.Slovak="sk",e.Slovenian="sl",e.Samoan="sm",e.Shona="sn",e.Somali="so",e.Albanian="sq",e.Serbian="sr",e.Sesotho="st",e.Sundanese="su",e.Swedish="sv",e.Swahili="sw",e.Tamil="ta",e.Telugu="te",e.Tajik="tg",e.Thai="th",e.Turkmen="tk",e.Filipino="tl",e.Turkish="tr",e.Tatar="tt",e.Uighur="ug",e.Ukrainian="uk",e.Urdu="ur",e.Uzbek="uz",e.Vietnamese="vi",e.Xhosa="xh",e.Yiddish="yi",e.Yoruba="yo",e.ChineseSimplified="zh",e.ChineseTraditional="zh-TW",e.Zulu="zu"})(Ke||(Ke={}));var We;(function(e){e.LATEST="latest",e.POPULAR="popular",e.VIEWS="views",e.DOWNLOADS="downloads",e.OLDEST="oldest"})(We||(We={}));var pe=he(tt,function(e){return{photos:{get:e(ct),list:e(lt),getStats:e(ht),getRandom:e(dt),trackDownload:e(ft)},users:{getPhotos:e(Et),getCollections:e(Pt),getLikes:e(Rt),get:e(yt)},search:{getCollections:e(mt),getPhotos:e(pt),getUsers:e(vt)},collections:{getPhotos:e(st),get:e(ot),list:e(it),getRelated:e(ut)},topics:{list:e(wt),get:e(bt),getPhotos:e(St)}}}),Xe={exports:{}},me={exports:{}},Ge=function(r,t){return function(){for(var a=new Array(arguments.length),s=0;s<a.length;s++)a[s]=arguments[s];return r.apply(t,a)}},At=Ge,ve=Object.prototype.toString,ye=function(e){return function(r){var t=ve.call(r);return e[t]||(e[t]=t.slice(8,-1).toLowerCase())}}(Object.create(null));function H(e){return e=e.toLowerCase(),function(t){return ye(t)===e}}function Ee(e){return Array.isArray(e)}function ae(e){return typeof e>"u"}function Ct(e){return e!==null&&!ae(e)&&e.constructor!==null&&!ae(e.constructor)&&typeof e.constructor.isBuffer=="function"&&e.constructor.isBuffer(e)}var Qe=H("ArrayBuffer");function Ot(e){var r;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?r=ArrayBuffer.isView(e):r=e&&e.buffer&&Qe(e.buffer),r}function _t(e){return typeof e=="string"}function xt(e){return typeof e=="number"}function Ye(e){return e!==null&&typeof e=="object"}function se(e){if(ye(e)!=="object")return!1;var r=Object.getPrototypeOf(e);return r===null||r===Object.prototype}var Tt=H("Date"),gt=H("File"),qt=H("Blob"),Nt=H("FileList");function Re(e){return ve.call(e)==="[object Function]"}function It(e){return Ye(e)&&Re(e.pipe)}function Ut(e){var r="[object FormData]";return e&&(typeof FormData=="function"&&e instanceof FormData||ve.call(e)===r||Re(e.toString)&&e.toString()===r)}var Dt=H("URLSearchParams");function kt(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function Ft(){return typeof navigator<"u"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")?!1:typeof window<"u"&&typeof document<"u"}function Pe(e,r){if(!(e===null||typeof e>"u"))if(typeof e!="object"&&(e=[e]),Ee(e))for(var t=0,n=e.length;t<n;t++)r.call(null,e[t],t,e);else for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&r.call(null,e[a],a,e)}function we(){var e={};function r(a,s){se(e[s])&&se(a)?e[s]=we(e[s],a):se(a)?e[s]=we({},a):Ee(a)?e[s]=a.slice():e[s]=a}for(var t=0,n=arguments.length;t<n;t++)Pe(arguments[t],r);return e}function Bt(e,r,t){return Pe(r,function(a,s){t&&typeof a=="function"?e[s]=At(a,t):e[s]=a}),e}function $t(e){return e.charCodeAt(0)===65279&&(e=e.slice(1)),e}function jt(e,r,t,n){e.prototype=Object.create(r.prototype,n),e.prototype.constructor=e,t&&Object.assign(e.prototype,t)}function Ht(e,r,t){var n,a,s,o={};r=r||{};do{for(n=Object.getOwnPropertyNames(e),a=n.length;a-- >0;)s=n[a],o[s]||(r[s]=e[s],o[s]=!0);e=Object.getPrototypeOf(e)}while(e&&(!t||t(e,r))&&e!==Object.prototype);return r}function Vt(e,r,t){e=String(e),(t===void 0||t>e.length)&&(t=e.length),t-=r.length;var n=e.indexOf(r,t);return n!==-1&&n===t}function Mt(e){if(!e)return null;var r=e.length;if(ae(r))return null;for(var t=new Array(r);r-- >0;)t[r]=e[r];return t}var zt=function(e){return function(r){return e&&r instanceof e}}(typeof Uint8Array<"u"&&Object.getPrototypeOf(Uint8Array)),w={isArray:Ee,isArrayBuffer:Qe,isBuffer:Ct,isFormData:Ut,isArrayBufferView:Ot,isString:_t,isNumber:xt,isObject:Ye,isPlainObject:se,isUndefined:ae,isDate:Tt,isFile:gt,isBlob:qt,isFunction:Re,isStream:It,isURLSearchParams:Dt,isStandardBrowserEnv:Ft,forEach:Pe,merge:we,extend:Bt,trim:kt,stripBOM:$t,inherits:jt,toFlatObject:Ht,kindOf:ye,kindOfTest:H,endsWith:Vt,toArray:Mt,isTypedArray:zt,isFileList:Nt},z=w;function Ze(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var Le=function(r,t,n){if(!t)return r;var a;if(n)a=n(t);else if(z.isURLSearchParams(t))a=t.toString();else{var s=[];z.forEach(t,function(c,f){c===null||typeof c>"u"||(z.isArray(c)?f=f+"[]":c=[c],z.forEach(c,function(p){z.isDate(p)?p=p.toISOString():z.isObject(p)&&(p=JSON.stringify(p)),s.push(Ze(f)+"="+Ze(p))}))}),a=s.join("&")}if(a){var o=r.indexOf("#");o!==-1&&(r=r.slice(0,o)),r+=(r.indexOf("?")===-1?"?":"&")+a}return r},Jt=w;function oe(){this.handlers=[]}oe.prototype.use=function(r,t,n){return this.handlers.push({fulfilled:r,rejected:t,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1},oe.prototype.eject=function(r){this.handlers[r]&&(this.handlers[r]=null)},oe.prototype.forEach=function(r){Jt.forEach(this.handlers,function(n){n!==null&&r(n)})};var Kt=oe,Wt=w,Xt=function(r,t){Wt.forEach(r,function(a,s){s!==t&&s.toUpperCase()===t.toUpperCase()&&(r[t]=a,delete r[s])})},er=w;function J(e,r,t,n,a){Error.call(this),this.message=e,this.name="AxiosError",r&&(this.code=r),t&&(this.config=t),n&&(this.request=n),a&&(this.response=a)}er.inherits(J,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var rr=J.prototype,tr={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED"].forEach(function(e){tr[e]={value:e}}),Object.defineProperties(J,tr),Object.defineProperty(rr,"isAxiosError",{value:!0}),J.from=function(e,r,t,n,a,s){var o=Object.create(rr);return er.toFlatObject(e,o,function(c){return c!==Error.prototype}),J.call(o,e.message,r,t,n,a),o.name=e.name,s&&Object.assign(o,s),o};var K=J,nr={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},g=w;function Gt(e,r){r=r||new FormData;var t=[];function n(s){return s===null?"":g.isDate(s)?s.toISOString():g.isArrayBuffer(s)||g.isTypedArray(s)?typeof Blob=="function"?new Blob([s]):Buffer.from(s):s}function a(s,o){if(g.isPlainObject(s)||g.isArray(s)){if(t.indexOf(s)!==-1)throw Error("Circular reference detected in "+o);t.push(s),g.forEach(s,function(c,f){if(!g.isUndefined(c)){var d=o?o+"."+f:f,p;if(c&&!o&&typeof c=="object"){if(g.endsWith(f,"{}"))c=JSON.stringify(c);else if(g.endsWith(f,"[]")&&(p=g.toArray(c))){p.forEach(function(h){!g.isUndefined(h)&&r.append(d,n(h))});return}}a(c,d)}}),t.pop()}else r.append(o,n(s))}return a(e),r}var ar=Gt,be,sr;function Qt(){if(sr)return be;sr=1;var e=K;return be=function(t,n,a){var s=a.config.validateStatus;!a.status||!s||s(a.status)?t(a):n(new e("Request failed with status code "+a.status,[e.ERR_BAD_REQUEST,e.ERR_BAD_RESPONSE][Math.floor(a.status/100)-4],a.config,a.request,a))},be}var Se,or;function Yt(){if(or)return Se;or=1;var e=w;return Se=e.isStandardBrowserEnv()?function(){return{write:function(n,a,s,o,i,c){var f=[];f.push(n+"="+encodeURIComponent(a)),e.isNumber(s)&&f.push("expires="+new Date(s).toGMTString()),e.isString(o)&&f.push("path="+o),e.isString(i)&&f.push("domain="+i),c===!0&&f.push("secure"),document.cookie=f.join("; ")},read:function(n){var a=document.cookie.match(new RegExp("(^|;\\s*)("+n+")=([^;]*)"));return a?decodeURIComponent(a[3]):null},remove:function(n){this.write(n,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),Se}var Zt=function(r){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(r)},Lt=function(r,t){return t?r.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):r},en=Zt,rn=Lt,ir=function(r,t){return r&&!en(t)?rn(r,t):t},Ae,ur;function tn(){if(ur)return Ae;ur=1;var e=w,r=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];return Ae=function(n){var a={},s,o,i;return n&&e.forEach(n.split(`
`),function(f){if(i=f.indexOf(":"),s=e.trim(f.substr(0,i)).toLowerCase(),o=e.trim(f.substr(i+1)),s){if(a[s]&&r.indexOf(s)>=0)return;s==="set-cookie"?a[s]=(a[s]?a[s]:[]).concat([o]):a[s]=a[s]?a[s]+", "+o:o}}),a},Ae}var Ce,lr;function nn(){if(lr)return Ce;lr=1;var e=w;return Ce=e.isStandardBrowserEnv()?function(){var t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a"),a;function s(o){var i=o;return t&&(n.setAttribute("href",i),i=n.href),n.setAttribute("href",i),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return a=s(window.location.href),function(i){var c=e.isString(i)?s(i):i;return c.protocol===a.protocol&&c.host===a.host}}():function(){return function(){return!0}}(),Ce}var Oe,cr;function ie(){if(cr)return Oe;cr=1;var e=K,r=w;function t(n){e.call(this,n==null?"canceled":n,e.ERR_CANCELED),this.name="CanceledError"}return r.inherits(t,e,{__CANCEL__:!0}),Oe=t,Oe}var _e,hr;function an(){return hr||(hr=1,_e=function(r){var t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(r);return t&&t[1]||""}),_e}var xe,dr;function fr(){if(dr)return xe;dr=1;var e=w,r=Qt(),t=Yt(),n=Le,a=ir,s=tn(),o=nn(),i=nr,c=K,f=ie(),d=an();return xe=function(h){return new Promise(function(L,_){var q=h.data,k=h.headers,F=h.responseType,U;function m(){h.cancelToken&&h.cancelToken.unsubscribe(U),h.signal&&h.signal.removeEventListener("abort",U)}e.isFormData(q)&&e.isStandardBrowserEnv()&&delete k["Content-Type"];var l=new XMLHttpRequest;if(h.auth){var b=h.auth.username||"",y=h.auth.password?unescape(encodeURIComponent(h.auth.password)):"";k.Authorization="Basic "+btoa(b+":"+y)}var V=a(h.baseURL,h.url);l.open(h.method.toUpperCase(),n(V,h.params,h.paramsSerializer),!0),l.timeout=h.timeout;function B(){if(!!l){var N="getAllResponseHeaders"in l?s(l.getAllResponseHeaders()):null,G=!F||F==="text"||F==="json"?l.responseText:l.response,M={data:G,status:l.status,statusText:l.statusText,headers:N,config:h,request:l};r(function(He){L(He),m()},function(He){_(He),m()},M),l=null}}if("onloadend"in l?l.onloadend=B:l.onreadystatechange=function(){!l||l.readyState!==4||l.status===0&&!(l.responseURL&&l.responseURL.indexOf("file:")===0)||setTimeout(B)},l.onabort=function(){!l||(_(new c("Request aborted",c.ECONNABORTED,h,l)),l=null)},l.onerror=function(){_(new c("Network Error",c.ERR_NETWORK,h,l,l)),l=null},l.ontimeout=function(){var G=h.timeout?"timeout of "+h.timeout+"ms exceeded":"timeout exceeded",M=h.transitional||i;h.timeoutErrorMessage&&(G=h.timeoutErrorMessage),_(new c(G,M.clarifyTimeoutError?c.ETIMEDOUT:c.ECONNABORTED,h,l)),l=null},e.isStandardBrowserEnv()){var $e=(h.withCredentials||o(V))&&h.xsrfCookieName?t.read(h.xsrfCookieName):void 0;$e&&(k[h.xsrfHeaderName]=$e)}"setRequestHeader"in l&&e.forEach(k,function(G,M){typeof q>"u"&&M.toLowerCase()==="content-type"?delete k[M]:l.setRequestHeader(M,G)}),e.isUndefined(h.withCredentials)||(l.withCredentials=!!h.withCredentials),F&&F!=="json"&&(l.responseType=h.responseType),typeof h.onDownloadProgress=="function"&&l.addEventListener("progress",h.onDownloadProgress),typeof h.onUploadProgress=="function"&&l.upload&&l.upload.addEventListener("progress",h.onUploadProgress),(h.cancelToken||h.signal)&&(U=function(N){!l||(_(!N||N&&N.type?new f:N),l.abort(),l=null)},h.cancelToken&&h.cancelToken.subscribe(U),h.signal&&(h.signal.aborted?U():h.signal.addEventListener("abort",U))),q||(q=null);var je=d(V);if(je&&["http","https","file"].indexOf(je)===-1){_(new c("Unsupported protocol "+je+":",c.ERR_BAD_REQUEST,h));return}l.send(q)})},xe}var Te,pr;function sn(){return pr||(pr=1,Te=null),Te}var R=w,mr=Xt,vr=K,on=nr,un=ar,ln={"Content-Type":"application/x-www-form-urlencoded"};function yr(e,r){!R.isUndefined(e)&&R.isUndefined(e["Content-Type"])&&(e["Content-Type"]=r)}function cn(){var e;return(typeof XMLHttpRequest<"u"||typeof process<"u"&&Object.prototype.toString.call(process)==="[object process]")&&(e=fr()),e}function hn(e,r,t){if(R.isString(e))try{return(r||JSON.parse)(e),R.trim(e)}catch(n){if(n.name!=="SyntaxError")throw n}return(t||JSON.stringify)(e)}var ue={transitional:on,adapter:cn(),transformRequest:[function(r,t){if(mr(t,"Accept"),mr(t,"Content-Type"),R.isFormData(r)||R.isArrayBuffer(r)||R.isBuffer(r)||R.isStream(r)||R.isFile(r)||R.isBlob(r))return r;if(R.isArrayBufferView(r))return r.buffer;if(R.isURLSearchParams(r))return yr(t,"application/x-www-form-urlencoded;charset=utf-8"),r.toString();var n=R.isObject(r),a=t&&t["Content-Type"],s;if((s=R.isFileList(r))||n&&a==="multipart/form-data"){var o=this.env&&this.env.FormData;return un(s?{"files[]":r}:r,o&&new o)}else if(n||a==="application/json")return yr(t,"application/json"),hn(r);return r}],transformResponse:[function(r){var t=this.transitional||ue.transitional,n=t&&t.silentJSONParsing,a=t&&t.forcedJSONParsing,s=!n&&this.responseType==="json";if(s||a&&R.isString(r)&&r.length)try{return JSON.parse(r)}catch(o){if(s)throw o.name==="SyntaxError"?vr.from(o,vr.ERR_BAD_RESPONSE,this,null,this.response):o}return r}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:sn()},validateStatus:function(r){return r>=200&&r<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};R.forEach(["delete","get","head"],function(r){ue.headers[r]={}}),R.forEach(["post","put","patch"],function(r){ue.headers[r]=R.merge(ln)});var ge=ue,dn=w,fn=ge,pn=function(r,t,n){var a=this||fn;return dn.forEach(n,function(o){r=o.call(a,r,t)}),r},qe,Er;function Rr(){return Er||(Er=1,qe=function(r){return!!(r&&r.__CANCEL__)}),qe}var Pr=w,Ne=pn,mn=Rr(),vn=ge,yn=ie();function Ie(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new yn}var En=function(r){Ie(r),r.headers=r.headers||{},r.data=Ne.call(r,r.data,r.headers,r.transformRequest),r.headers=Pr.merge(r.headers.common||{},r.headers[r.method]||{},r.headers),Pr.forEach(["delete","get","head","post","put","patch","common"],function(a){delete r.headers[a]});var t=r.adapter||vn.adapter;return t(r).then(function(a){return Ie(r),a.data=Ne.call(r,a.data,a.headers,r.transformResponse),a},function(a){return mn(a)||(Ie(r),a&&a.response&&(a.response.data=Ne.call(r,a.response.data,a.response.headers,r.transformResponse))),Promise.reject(a)})},C=w,wr=function(r,t){t=t||{};var n={};function a(d,p){return C.isPlainObject(d)&&C.isPlainObject(p)?C.merge(d,p):C.isPlainObject(p)?C.merge({},p):C.isArray(p)?p.slice():p}function s(d){if(C.isUndefined(t[d])){if(!C.isUndefined(r[d]))return a(void 0,r[d])}else return a(r[d],t[d])}function o(d){if(!C.isUndefined(t[d]))return a(void 0,t[d])}function i(d){if(C.isUndefined(t[d])){if(!C.isUndefined(r[d]))return a(void 0,r[d])}else return a(void 0,t[d])}function c(d){if(d in t)return a(r[d],t[d]);if(d in r)return a(void 0,r[d])}var f={url:o,method:o,data:o,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:c};return C.forEach(Object.keys(r).concat(Object.keys(t)),function(p){var h=f[p]||s,v=h(p);C.isUndefined(v)&&h!==c||(n[p]=v)}),n},Ue,br;function Sr(){return br||(br=1,Ue={version:"0.27.2"}),Ue}var Rn=Sr().version,j=K,De={};["object","boolean","number","function","string","symbol"].forEach(function(e,r){De[e]=function(n){return typeof n===e||"a"+(r<1?"n ":" ")+e}});var Ar={};De.transitional=function(r,t,n){function a(s,o){return"[Axios v"+Rn+"] Transitional option '"+s+"'"+o+(n?". "+n:"")}return function(s,o,i){if(r===!1)throw new j(a(o," has been removed"+(t?" in "+t:"")),j.ERR_DEPRECATED);return t&&!Ar[o]&&(Ar[o]=!0,console.warn(a(o," has been deprecated since v"+t+" and will be removed in the near future"))),r?r(s,o,i):!0}};function Pn(e,r,t){if(typeof e!="object")throw new j("options must be an object",j.ERR_BAD_OPTION_VALUE);for(var n=Object.keys(e),a=n.length;a-- >0;){var s=n[a],o=r[s];if(o){var i=e[s],c=i===void 0||o(i,s,e);if(c!==!0)throw new j("option "+s+" must be "+c,j.ERR_BAD_OPTION_VALUE);continue}if(t!==!0)throw new j("Unknown option "+s,j.ERR_BAD_OPTION)}}var wn={assertOptions:Pn,validators:De},Cr=w,bn=Le,Or=Kt,_r=En,le=wr,Sn=ir,xr=wn,W=xr.validators;function X(e){this.defaults=e,this.interceptors={request:new Or,response:new Or}}X.prototype.request=function(r,t){typeof r=="string"?(t=t||{},t.url=r):t=r||{},t=le(this.defaults,t),t.method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var n=t.transitional;n!==void 0&&xr.assertOptions(n,{silentJSONParsing:W.transitional(W.boolean),forcedJSONParsing:W.transitional(W.boolean),clarifyTimeoutError:W.transitional(W.boolean)},!1);var a=[],s=!0;this.interceptors.request.forEach(function(v){typeof v.runWhen=="function"&&v.runWhen(t)===!1||(s=s&&v.synchronous,a.unshift(v.fulfilled,v.rejected))});var o=[];this.interceptors.response.forEach(function(v){o.push(v.fulfilled,v.rejected)});var i;if(!s){var c=[_r,void 0];for(Array.prototype.unshift.apply(c,a),c=c.concat(o),i=Promise.resolve(t);c.length;)i=i.then(c.shift(),c.shift());return i}for(var f=t;a.length;){var d=a.shift(),p=a.shift();try{f=d(f)}catch(h){p(h);break}}try{i=_r(f)}catch(h){return Promise.reject(h)}for(;o.length;)i=i.then(o.shift(),o.shift());return i},X.prototype.getUri=function(r){r=le(this.defaults,r);var t=Sn(r.baseURL,r.url);return bn(t,r.params,r.paramsSerializer)},Cr.forEach(["delete","get","head","options"],function(r){X.prototype[r]=function(t,n){return this.request(le(n||{},{method:r,url:t,data:(n||{}).data}))}}),Cr.forEach(["post","put","patch"],function(r){function t(n){return function(s,o,i){return this.request(le(i||{},{method:r,headers:n?{"Content-Type":"multipart/form-data"}:{},url:s,data:o}))}}X.prototype[r]=t(),X.prototype[r+"Form"]=t(!0)});var An=X,ke,Tr;function Cn(){if(Tr)return ke;Tr=1;var e=ie();function r(t){if(typeof t!="function")throw new TypeError("executor must be a function.");var n;this.promise=new Promise(function(o){n=o});var a=this;this.promise.then(function(s){if(!!a._listeners){var o,i=a._listeners.length;for(o=0;o<i;o++)a._listeners[o](s);a._listeners=null}}),this.promise.then=function(s){var o,i=new Promise(function(c){a.subscribe(c),o=c}).then(s);return i.cancel=function(){a.unsubscribe(o)},i},t(function(o){a.reason||(a.reason=new e(o),n(a.reason))})}return r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.prototype.subscribe=function(n){if(this.reason){n(this.reason);return}this._listeners?this._listeners.push(n):this._listeners=[n]},r.prototype.unsubscribe=function(n){if(!!this._listeners){var a=this._listeners.indexOf(n);a!==-1&&this._listeners.splice(a,1)}},r.source=function(){var n,a=new r(function(o){n=o});return{token:a,cancel:n}},ke=r,ke}var Fe,gr;function On(){return gr||(gr=1,Fe=function(r){return function(n){return r.apply(null,n)}}),Fe}var Be,qr;function _n(){if(qr)return Be;qr=1;var e=w;return Be=function(t){return e.isObject(t)&&t.isAxiosError===!0},Be}var Nr=w,xn=Ge,ce=An,Tn=wr,gn=ge;function Ir(e){var r=new ce(e),t=xn(ce.prototype.request,r);return Nr.extend(t,ce.prototype,r),Nr.extend(t,r),t.create=function(a){return Ir(Tn(e,a))},t}var A=Ir(gn);A.Axios=ce,A.CanceledError=ie(),A.CancelToken=Cn(),A.isCancel=Rr(),A.VERSION=Sr().version,A.toFormData=ar,A.AxiosError=K,A.Cancel=A.CanceledError,A.all=function(r){return Promise.all(r)},A.spread=On(),A.isAxiosError=_n(),me.exports=A,me.exports.default=A,function(e){e.exports=me.exports}(Xe);var qn=Ur(Xe.exports);const Nn=qn.create({baseURL:"http://localhost:8090",withCredentials:!0});var Ln="",In=(e,r)=>{const t=e.__vccOpts||e;for(const[n,a]of r)t[n]=a;return t};const Un={key:0,class:"unsplash-topics unsplash-mt-2 unsplash-flex unsplash-gap-y-3 unsplash-gap-x-2 unsplash-overflow-y-hidden unsplash-overflow-x-scroll unsplash-scroll-smooth unsplash-pb-1"},Dn=["onClick"],kn={class:"unsplash-flex unsplash-flex-1 unsplash-items-center unsplash-truncate"},Fn={class:"unsplash-truncate unsplash-text-sm"},Bn={class:"unsplash-mt-2 unsplash-grid unsplash-grid-cols-3 unsplash-gap-x-2 unsplash-gap-y-3 sm:unsplash-grid-cols-3 md:unsplash-grid-cols-6",role:"list"},$n={class:"unsplash-group unsplash-relative unsplash-bg-white"},jn={class:"unsplash-aspect-w-10 unsplash-aspect-h-8 unsplash-block unsplash-h-full unsplash-w-full unsplash-cursor-pointer unsplash-overflow-hidden unsplash-bg-gray-100"},Hn=["src"],Vn=["href"],Mn={class:"p-1 unsplash-flex unsplash-w-full unsplash-flex-row unsplash-items-center unsplash-gap-2"},zn={class:"flex unsplash-flex-1 unsplash-flex-col unsplash-truncate"},Jn=["href"],Kn={class:"unsplash-truncate unsplash-text-xs unsplash-text-white unsplash-opacity-80"},Wn={class:"unsplash-mt-4 unsplash-flex unsplash-items-center unsplash-justify-center"};var Xn=In(u.defineComponent({__name:"UnsplashSelectorProvider",props:{selected:{default:()=>[]}},emits:["update:selected"],async setup(e,{emit:r}){let t,n;const a=u.ref(""),s=u.ref(),o=u.ref(),i=u.ref([]),c=u.ref(1),f=u.ref(!1),d=u.ref(new Set),p=u.ref(""),h=async()=>{var m;try{const{data:l}=await Nn.get("/api/v1alpha1/configmaps/unsplash-settings");a.value=JSON.parse(((m=l.data)==null?void 0:m.basic)||"{ accessKey: '' }").accessKey}catch(l){alert("\u672A\u6B63\u786E\u914D\u7F6E Unsplash \u7684 Access Key"),console.error(l)}},v=async()=>{var b;const m=pe({accessKey:a.value}),{response:l}=await m.topics.list({page:1,perPage:100,orderBy:"featured"});s.value=l==null?void 0:l.results,(b=s.value)!=null&&b.length&&(o.value=s.value[0],_())},L=m=>{o.value=m,i.value=[],c.value=1,_()},_=async()=>{var b;f.value=!0;const m=pe({accessKey:a.value});if(!o.value)return;const{response:l}=await m.topics.getPhotos({topicIdOrSlug:(b=o.value)==null?void 0:b.id,page:c.value,perPage:48});l!=null&&l.results&&(i.value=[...i.value,...l.results]),f.value=!1},q=async m=>{if(p.value||(c.value=1,i.value=[]),m&&(p.value=m.keyword),!m.keyword){i.value=[],c.value=1,v();return}f.value=!0;const l=pe({accessKey:a.value}),{response:b}=await l.search.getPhotos({page:c.value,perPage:48,query:p.value});b!=null&&b.results&&(i.value=[...i.value,...b.results]),f.value=!1},k=()=>{if(c.value++,p.value){q();return}_()},F=async m=>{if(d.value.has(m)){d.value.delete(m);return}d.value.add(m)},U=m=>Array.from(d.value).map(l=>l.id).includes(m.id);return u.watchEffect(()=>{const m=Array.from(d.value).map(l=>({url:l.urls.raw,type:l.alt_description}));r("update:selected",m)}),[t,n]=u.withAsyncContext(()=>h()),await t,n(),[t,n]=u.withAsyncContext(()=>v()),await t,n(),(m,l)=>{const b=u.resolveComponent("FormKit");return u.openBlock(),u.createElementBlock(u.Fragment,null,[u.createElementVNode("div",null,[u.createVNode(b,{id:"search-form",type:"form",onSubmit:q},{default:u.withCtx(()=>[u.createVNode(b,{name:"keyword",type:"text",placeholder:"\u8F93\u5165\u5173\u952E\u5B57\u641C\u7D22",onKeyup:l[0]||(l[0]=u.withKeys(y=>m.$formkit.submit("search-form"),["enter"]))})]),_:1})]),p.value?u.createCommentVNode("",!0):(u.openBlock(),u.createElementBlock("div",Un,[(u.openBlock(!0),u.createElementBlock(u.Fragment,null,u.renderList(s.value,(y,V)=>{var B;return u.openBlock(),u.createElementBlock("div",{key:V,class:u.normalizeClass([{"!unsplash-bg-gray-200 !unsplash-text-gray-900":y.id===((B=o.value)==null?void 0:B.id)},"unsplash-rounded-base unsplash-flex unsplash-cursor-pointer unsplash-items-center unsplash-bg-gray-100 unsplash-p-2 unsplash-text-gray-500 unsplash-transition-all hover:unsplash-bg-gray-200 hover:unsplash-text-gray-900 hover:unsplash-shadow-sm"]),onClick:$e=>L(y)},[u.createElementVNode("div",kn,[u.createElementVNode("span",Fn,u.toDisplayString(y.title)+"("+u.toDisplayString(y.total_photos)+") ",1)])],10,Dn)}),128))])),u.createElementVNode("div",Bn,[(u.openBlock(!0),u.createElementBlock(u.Fragment,null,u.renderList(i.value,(y,V)=>(u.openBlock(),u.createBlock(u.unref(Q.VCard),{key:V,"body-class":["!unsplash-p-0"],class:u.normalizeClass([{"unsplash-ring-1 unsplash-ring-black":U(y)},"hover:unsplash-shadow"]),onClick:u.withModifiers(B=>F(y),["stop"])},{default:u.withCtx(()=>{var B;return[u.createElementVNode("div",$n,[u.createElementVNode("div",jn,[u.createElementVNode("img",{class:"unsplash-pointer-events-none unsplash-object-cover group-hover:unsplash-opacity-75",src:y.urls.small},null,8,Hn)]),u.createElementVNode("div",{class:u.normalizeClass([{"!unsplash-flex":d.value.has(y)},"unsplash-absolute unsplash-top-0 unsplash-left-0 unsplash-hidden unsplash-h-1/3 unsplash-w-full unsplash-justify-between unsplash-bg-gradient-to-b unsplash-from-gray-300 unsplash-to-transparent unsplash-ease-in-out group-hover:unsplash-flex"])},[u.createElementVNode("a",{href:y.links.html,target:"_blank",class:"unsplash-mt-1 unsplash-ml-1"},[u.createVNode(u.unref(Q.IconExternalLinkLine),{class:"unsplash-h-6 unsplash-w-6 unsplash-cursor-pointer unsplash-text-white unsplash-transition-all hover:unsplash-text-black"})],8,Vn),u.createVNode(u.unref(Q.IconCheckboxFill),{class:u.normalizeClass([{"!unsplash-text-black":d.value.has(y)},"unsplash-mt-1 unsplash-mr-1 unsplash-h-6 unsplash-w-6 unsplash-cursor-pointer unsplash-text-white unsplash-transition-all hover:unsplash-text-black"])},null,8,["class"])],2),u.createElementVNode("div",{class:u.normalizeClass([{"!unsplash-flex":d.value.has(y)},"unsplash-absolute unsplash-left-0 unsplash-bottom-0 unsplash-hidden unsplash-w-full unsplash-bg-gradient-to-t unsplash-from-gray-600 unsplash-to-transparent unsplash-ease-in-out group-hover:unsplash-flex"])},[u.createElementVNode("div",Mn,[(B=y.user.profile_image)!=null&&B.medium?(u.openBlock(),u.createBlock(u.unref(Q.VAvatar),{key:0,src:y.user.profile_image.medium,circle:"",size:"sm"},null,8,["src"])):u.createCommentVNode("",!0),u.createElementVNode("div",zn,[u.createElementVNode("a",{class:"unsplash-truncate unsplash-text-xs unsplash-font-medium unsplash-text-white hover:unsplash-underline",href:y.links.html,target:"_blank"},u.toDisplayString(y.user.name),9,Jn),u.createElementVNode("span",Kn,u.toDisplayString(y.user.bio),1)])])],2)])]}),_:2},1032,["class","onClick"]))),128))]),u.createElementVNode("div",Wn,[u.createVNode(u.unref(Q.VButton),{loading:f.value,type:"secondary",onClick:k},{default:u.withCtx(()=>[u.createTextVNode(u.toDisplayString(f.value?"\u52A0\u8F7D\u4E2D...":"\u52A0\u8F7D\u66F4\u591A"),1)]),_:1},8,["loading"])])],64)}}}),[["__scopeId","data-v-25def8b9"]]),ra="",Gn={name:"PluginUnsplash",components:[],routes:[],menus:[],extensionPoints:{ATTACHMENT_SELECTOR:e=>{e.value.providers.push({id:"unsplash",label:"Unsplash",component:u.markRaw(Xn)})}}};return Gn}(Vue,VueRouter,HaloComponents);
