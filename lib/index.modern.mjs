import e,{Component as t}from"react";import r from"prop-types";import n from"react-fast-compare";import s from"invariant";import i from"shallowequal";function a(){return a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},a.apply(this,arguments)}function o(e,t){if(null==e)return{};var r,n,s={},i=Object.keys(e);for(n=0;n<i.length;n++)t.indexOf(r=i[n])>=0||(s[r]=e[r]);return s}const l="cssText",c="href",p="innerHTML",h="itemprop",u="rel",d="bodyAttributes",m="htmlAttributes",T={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title",FRAGMENT:"Symbol(react.fragment)"},y={rel:["amphtml","canonical","alternate"]},g={type:["application/ld+json"]},f={charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]},b=Object.keys(T).map(e=>T[e]),A={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},C=Object.keys(A).reduce((e,t)=>(e[A[t]]=t,e),{}),S="data-rh";class w{constructor(e,t){this.cacheName="meta-manager-cache",this.client=e?caches:null,this.authToken=t}getTTl(){return(new Date).getTime()+6048e5}shouldRefresh(e){return"number"!=typeof e||(new Date).getTime()>e}async get(e,t=!1){if(t||!this.client)return this.fetch(e);try{const t=await this.client.open(this.cacheName);if(t){const r=await t.match(e).catch(e=>console.error(e));if(r){const t=await r.json();return this.shouldRefresh(t.ttl)?this.fetch(e):t}return this.fetch(e)}}catch(e){}}async set(e,t){const r=await this.client.open(this.cacheName);return await r.put(e,new Response(M(a({},t,{ttl:this.getTTl()})),{headers:{"Cache-Control":"max-age=10"}})).then(t=>this.get(e))}async fetch(e){const[t,r]=(null!=e?e:" __mm__ ").split("__mm__");return R({url:`https://api.metamanager.io/website/v1/websites/${t}/pixel?url=${r}`,requestBody:{method:"GET",headers:{Authorization:"Bearer "+this.authToken}}}).then(e=>e.json()).then(t=>{const r=null==t?void 0:t.item;if(r)return this.client?this.set(e,r):r}).catch(e=>null).finally(e=>!1)}}const O=(e,t)=>{for(let r=e.length-1;r>=0;r-=1){const n=e[r];if(Object.prototype.hasOwnProperty.call(n,t))return n[t]}return null},E=e=>{let t=O(e,T.TITLE);const r=O(e,"titleTemplate");if(Array.isArray(t)&&(t=t.join("")),r&&t)return r.replace(/%s/g,()=>t);const n=O(e,"defaultTitle");return t||n||void 0},v=e=>O(e,"onChangeClientState")||(()=>{}),I=(e,t)=>t.filter(t=>void 0!==t[e]).map(t=>t[e]).reduce((e,t)=>a({},e,t),{}),x=(e,t)=>t.filter(e=>void 0!==e[T.BASE]).map(e=>e[T.BASE]).reverse().reduce((t,r)=>{if(!t.length){const n=Object.keys(r);for(let s=0;s<n.length;s+=1){const i=n[s].toLowerCase();if(-1!==e.indexOf(i)&&r[i])return t.concat(r)}}return t},[]),D=(e,t,r)=>{const n={};return r.filter(t=>{return!!Array.isArray(t[e])||(void 0!==t[e]&&(r=`Helmet: ${e} should be of type "Array". Instead found type "${typeof t[e]}"`,console&&"function"==typeof console.warn&&console.warn(r)),!1);var r}).map(t=>t[e]).reverse().reduce((e,r)=>{const s={};r.filter(e=>{let r;const i=Object.keys(e);for(let n=0;n<i.length;n+=1){const s=i[n],a=s.toLowerCase();-1===t.indexOf(a)||r===u&&"canonical"===e[r].toLowerCase()||a===u&&"stylesheet"===e[a].toLowerCase()||(r=a),-1===t.indexOf(s)||s!==p&&s!==l&&s!==h||(r=s)}if(!r||!e[r])return!1;const a=e[r].toLowerCase();return n[r]||(n[r]={}),s[r]||(s[r]={}),!n[r][a]&&(s[r][a]=!0,!0)}).reverse().forEach(t=>e.push(t));const i=Object.keys(s);for(let e=0;e<i.length;e+=1){const t=i[e],r=a({},n[t],s[t]);n[t]=r}return e},[]).reverse()},j=(e,t)=>{if(Array.isArray(e)&&e.length)for(let r=0;r<e.length;r+=1)if(e[r][t])return!0;return!1},P=e=>Array.isArray(e)?e.join(""):e,$=(e,t)=>Array.isArray(e)?e.reduce((e,r)=>(((e,t)=>{const r=Object.keys(e);for(let n=0;n<r.length;n+=1)if(t[r[n]]&&t[r[n]].includes(e[r[n]]))return!0;return!1})(r,t)?e.priority.push(r):e.default.push(r),e),{priority:[],default:[]}):{default:e},k=(e,t)=>a({},e,{[t]:void 0}),L=e=>{try{return JSON.parse(e)}catch(t){return e}},M=e=>{if("string"==typeof e)return e;try{return JSON.stringify(e)}catch(t){return e}},N=e=>{const t=null==e?void 0:e.schema;return t?[{innerHTML:M(L(t)),type:"application/ld+json"}]:[]},H=(e,t,r)=>{var n,s,i,a,o,l;switch(e){case"title":return null!=(n=null==(s=t.meta)||null==(i=s.tag)?void 0:i.title)?n:r;case"description":return null!=(a=null==(o=t.meta)||null==(l=o.tag)?void 0:l.description)?a:r;default:return r}},R=({url:e,requestBody:t})=>fetch(e,t),q=[T.NOSCRIPT,T.SCRIPT,T.STYLE],B=(e,t=!0)=>!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),_=e=>Object.keys(e).reduce((t,r)=>{const n=void 0!==e[r]?`${r}="${e[r]}"`:`${r}`;return t?`${t} ${n}`:n},""),U=(e,t={})=>Object.keys(e).reduce((t,r)=>(t[A[r]||r]=e[r],t),t),Y=(t,r)=>r.map((r,n)=>{const s={key:n,[S]:!0};return Object.keys(r).forEach(e=>{const t=A[e]||e;t===p||t===l?s.dangerouslySetInnerHTML={__html:r.innerHTML||r.cssText}:s[t]=r[e]}),e.createElement(t,s)}),z=(t,r,n)=>{switch(t){case T.TITLE:return{toComponent:()=>((t,r,n)=>{const s=U(n,{key:r,[S]:!0});return[e.createElement(T.TITLE,s,r)]})(0,r.title,r.titleAttributes),toString:()=>((e,t,r,n)=>{const s=_(r),i=P(t);return s?`<${e} ${S}="true" ${s}>${B(i,n)}</${e}>`:`<${e} ${S}="true">${B(i,n)}</${e}>`})(t,r.title,r.titleAttributes,n)};case d:case m:return{toComponent:()=>U(r),toString:()=>_(r)};default:return{toComponent:()=>Y(t,r),toString:()=>((e,t,r)=>t.reduce((t,n)=>{const s=Object.keys(n).filter(e=>!(e===p||e===l)).reduce((e,t)=>{const s=void 0===n[t]?t:`${t}="${B(n[t],r)}"`;return e?`${e} ${s}`:s},""),i=n.innerHTML||n.cssText||"",a=-1===q.indexOf(e);return`${t}<${e} ${S}="true" ${s}${a?"/>":`>${i}</${e}>`}`},""))(t,r,n)}}},K=e=>{const{baseTag:t,bodyAttributes:r,encode:n,htmlAttributes:s,noscriptTags:i,styleTags:a,title:o="",titleAttributes:l,prioritizeSeoTags:c}=e;let{linkTags:p,metaTags:h,scriptTags:u}=e,b={toComponent:()=>{},toString:()=>""};return c&&({priorityMethods:b,linkTags:p,metaTags:h,scriptTags:u}=(({metaTags:e,linkTags:t,scriptTags:r,encode:n})=>{const s=$(e,f),i=$(t,y),a=$(r,g);return{priorityMethods:{toComponent:()=>[...Y(T.META,s.priority),...Y(T.LINK,i.priority),...Y(T.SCRIPT,a.priority)],toString:()=>`${z(T.META,s.priority,n)} ${z(T.LINK,i.priority,n)} ${z(T.SCRIPT,a.priority,n)}`},metaTags:s.default,linkTags:i.default,scriptTags:a.default}})(e)),{priority:b,base:z(T.BASE,t,n),bodyAttributes:z(d,r,n),htmlAttributes:z(m,s,n),link:z(T.LINK,p,n),meta:z(T.META,h,n),noscript:z(T.NOSCRIPT,i,n),script:z(T.SCRIPT,u,n),style:z(T.STYLE,a,n),title:z(T.TITLE,{title:o,titleAttributes:l},n)}},F=[];class G{constructor(e,t="undefined"!=typeof document,r,n){this.instances=[],this.value={setApiData:e=>{this.context.apiData=e},setHelmet:e=>{this.context.helmet=e},helmetInstances:{get:()=>this.canUseDOM?F:this.instances,add:e=>{(this.canUseDOM?F:this.instances).push(e)},remove:e=>{const t=(this.canUseDOM?F:this.instances).indexOf(e);(this.canUseDOM?F:this.instances).splice(t,1)}}},this.context=e,this.webSiteId=r,this.authToken=n,this.canUseDOM=t,t||(e.helmet=K({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}}const J=e.createContext({}),Q=r.shape({setApiData:r.func,setHelmet:r.func,helmetInstances:r.shape({get:r.func,add:r.func,remove:r.func})}),V="undefined"!=typeof document;class W extends t{constructor(e){super(e),this.helmetData=new G(this.props.context,W.canUseDOM,this.props.webSiteId,this.props.authToken)}render(){/*#__PURE__*/return e.createElement(J.Provider,{value:a({},this.helmetData.value,{webSiteId:this.helmetData.webSiteId,authToken:this.helmetData.authToken})},this.props.children)}}W.canUseDOM=V,W.propTypes={apiData:r.any,context:r.shape({helmet:r.shape()}),webSiteId:r.number.isRequired,authToken:r.string.isRequired,children:r.node.isRequired},W.defaultProps={context:{}},W.displayName="HelmetProvider";const X=(e,t)=>{const r=document.head||document.querySelector(T.HEAD),n=r.querySelectorAll(`${e}[${S}]`),s=[].slice.call(n),i=[];let a;return t&&t.length&&t.forEach(t=>{const r=document.createElement(e);for(const e in t)Object.prototype.hasOwnProperty.call(t,e)&&(e===p?r.innerHTML=t.innerHTML:e===l?r.styleSheet?r.styleSheet.cssText=t.cssText:r.appendChild(document.createTextNode(t.cssText)):r.setAttribute(e,void 0===t[e]?"":t[e]));r.setAttribute(S,"true"),s.some((e,t)=>(a=t,r.isEqualNode(e)))?s.splice(a,1):i.push(r)}),s.forEach(e=>e.parentNode.removeChild(e)),i.forEach(e=>r.appendChild(e)),{oldTags:s,newTags:i}},Z=(e,t)=>{const r=document.getElementsByTagName(e)[0];if(!r)return;const n=r.getAttribute(S),s=n?n.split(","):[],i=[].concat(s),a=Object.keys(t);for(let e=0;e<a.length;e+=1){const n=a[e],o=t[n]||"";r.getAttribute(n)!==o&&r.setAttribute(n,o),-1===s.indexOf(n)&&s.push(n);const l=i.indexOf(n);-1!==l&&i.splice(l,1)}for(let e=i.length-1;e>=0;e-=1)r.removeAttribute(i[e]);s.length===i.length?r.removeAttribute(S):r.getAttribute(S)!==a.join(",")&&r.setAttribute(S,a.join(","))},ee=(e,t)=>{const{baseTag:r,bodyAttributes:n,htmlAttributes:s,linkTags:i,metaTags:a,noscriptTags:o,onChangeClientState:l,scriptTags:c,styleTags:p,title:h,titleAttributes:u}=e;Z(T.BODY,n),Z(T.HTML,s),((e,t)=>{void 0!==e&&document.title!==e&&(document.title=P(e)),Z(T.TITLE,t)})(h,u);const d={baseTag:X(T.BASE,r),linkTags:X(T.LINK,i),metaTags:X(T.META,a),noscriptTags:X(T.NOSCRIPT,o),scriptTags:X(T.SCRIPT,c),styleTags:X(T.STYLE,p)},m={},y={};Object.keys(d).forEach(e=>{const{newTags:t,oldTags:r}=d[e];t.length&&(m[e]=t),r.length&&(y[e]=d[e].oldTags)}),t&&t(),l(e,m,y)};let te=null;const re=[{name:"description",content:""}];class ne extends t{constructor(...e){super(...e),this.rendered=!1}shouldComponentUpdate(e){return!i(e,this.props)}componentDidUpdate(){this.emitChange()}componentDidMount(){this.emitChange()}syncMeta(e,t){var r,n;if(!t)return e;let s=e;return s.title=H("title",t,e.title),s.metaTags=null==(r=(null==(n=e.metaTags)?void 0:n.length)>0?e.metaTags:re)?void 0:r.map(e=>a({},e,{content:H(e.name,t,e.content)})),s.scriptTags=[...e.scriptTags,...N(t)],s}updateHelmet(e){let t=null;const{setHelmet:r}=this.props.context;var n;W.canUseDOM?(n=e,te&&cancelAnimationFrame(te),n.defer?te=requestAnimationFrame(()=>{ee(n,()=>{te=null})}):(ee(n),te=null)):K&&(t=K(e)),r(t)}emitChange(){const{helmetInstances:e,setApiData:t}=this.props.context,r=(n=e.get().map(e=>{const t=a({},e.props);return delete t.context,t}),{baseTag:x([c],n),bodyAttributes:I(d,n),defer:O(n,"defer"),encode:O(n,"encodeSpecialCharacters"),htmlAttributes:I(m,n),linkTags:D(T.LINK,[u,c],n),metaTags:D(T.META,["name","charset","http-equiv","property",h],n),noscriptTags:D(T.NOSCRIPT,[p],n),onChangeClientState:v(n),scriptTags:D(T.SCRIPT,["src",p],n),styleTags:D(T.STYLE,[l],n),title:E(n),titleAttributes:I("titleAttributes",n),prioritizeSeoTags:j(n,"prioritizeSeoTags")});var n;if(this.props.context.webSiteId&&!this.props.context.apiData)if(this.props.apiData){t(this.props.apiData);const e=this.syncMeta(r,this.props.apiData);this.updateHelmet(e)}else(async(e,t,r,n)=>new w(W.canUseDOM,this.props.context.authToken).get(e+"__mm__"+r))(this.props.context.webSiteId,0,this.props.path).then(e=>{if(!e)return void this.updateHelmet(r);t(e);const n=this.syncMeta(r,e);this.updateHelmet(n)}).catch(e=>console.error(e));else this.updateHelmet(r)}init(){if(this.rendered)return;this.rendered=!0;const{helmetInstances:e}=this.props.context;e.add(this),this.emitChange()}render(){return this.init(),null}}ne.propTypes={context:Q.isRequired},ne.displayName="HelmetDispatcher";const se=["children"],ie=["children"],ae=["props"];class oe extends t{constructor(){super(),this.state={}}shouldComponentUpdate(e){return!n(k(this.props,"helmetData"),k(e,"helmetData"))}mapNestedChildrenToProps(e,t){if(!t)return null;switch(e.type){case T.SCRIPT:case T.NOSCRIPT:return{innerHTML:t};case T.STYLE:return{cssText:t};default:throw new Error(`<${e.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren({child:e,arrayTypeChildren:t,newChildProps:r,nestedChildren:n}){return a({},t,{[e.type]:[...t[e.type]||[],a({},r,this.mapNestedChildrenToProps(e,n))]})}mapObjectTypeChildren({child:e,newProps:t,newChildProps:r,nestedChildren:n}){switch(e.type){case T.TITLE:return a({},t,{[e.type]:n,titleAttributes:a({},r)});case T.BODY:return a({},t,{bodyAttributes:a({},r)});case T.HTML:return a({},t,{htmlAttributes:a({},r)});default:return a({},t,{[e.type]:a({},r)})}}mapArrayTypeChildrenToProps(e,t){let r=a({},t);return Object.keys(e).forEach(t=>{r=a({},r,{[t]:e[t]})}),r}warnOnInvalidChildren(e,t){return s(b.some(t=>e.type===t),"function"==typeof e.type?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${b.join(", ")} are allowed. Helmet does not support rendering <${e.type}> elements. Refer to our API for more information.`),s(!t||"string"==typeof t||Array.isArray(t)&&!t.some(e=>"string"!=typeof e),`Helmet expects a string as a child of <${e.type}>. Did you forget to wrap your children in braces? ( <${e.type}>{\`\`}</${e.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(t,r){let n={};return e.Children.forEach(t,e=>{if(!e||!e.props)return;const t=e.props,{children:s}=t,i=o(t,se),a=Object.keys(i).reduce((e,t)=>(e[C[t]||t]=i[t],e),{});let{type:l}=e;switch("symbol"==typeof l?l=l.toString():this.warnOnInvalidChildren(e,s),l){case T.FRAGMENT:r=this.mapChildrenToProps(s,r);break;case T.LINK:case T.META:case T.NOSCRIPT:case T.SCRIPT:case T.STYLE:n=this.flattenArrayTypeChildren({child:e,arrayTypeChildren:n,newChildProps:a,nestedChildren:s});break;default:r=this.mapObjectTypeChildren({child:e,newProps:r,newChildProps:a,nestedChildren:s})}}),this.mapArrayTypeChildrenToProps(n,r)}mapDataToApi(e){var t,r;return a({},e,{title:null!=(t=null==(r=this.state.apiData)?void 0:r.meta.tag.title)?t:e.title})}render(){const t=this.props,{children:r}=t,n=o(t,ie);let s=a({},n),{helmetData:i}=n;return r&&(s=this.mapChildrenToProps(r,s)),!i||i instanceof G||(i=new G(i.context,i.instances)),i?/*#__PURE__*/e.createElement(ne,a({},s,{context:i.value,helmetData:void 0})):/*#__PURE__*/e.createElement(J.Consumer,null,t=>/*#__PURE__*/e.createElement(ne,a({},s,{context:t})))}}oe.propTypes={base:r.object,bodyAttributes:r.object,children:r.oneOfType([r.arrayOf(r.node),r.node]),defaultTitle:r.string,defer:r.bool,encodeSpecialCharacters:r.bool,htmlAttributes:r.object,link:r.arrayOf(r.object),meta:r.arrayOf(r.object),noscript:r.arrayOf(r.object),onChangeClientState:r.func,script:r.arrayOf(r.object),style:r.arrayOf(r.object),title:r.string,titleAttributes:r.object,titleTemplate:r.string,prioritizeSeoTags:r.bool,helmetData:r.object},oe.defaultProps={defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1},oe.displayName="Helmet";const le=t=>r=>/*#__PURE__*/e.createElement(e.Fragment,null,/*#__PURE__*/e.createElement(oe,{path:"/",apiData:r.apiData}),/*#__PURE__*/e.createElement(t,r)),ce=(e,t)=>async r=>{const n=await e(r),s=n||{},{props:i}=s,l=o(s,ae),{path:c}=i||{},{webSiteId:p,authToken:h}=t||{};return c&&p&&h?a({props:a({},i,{apiData:await R({url:`https://api.metamanager.io/website/v1/websites/${p}/urls?view=last-edited&status=pixel&page=1&pageSize=25000&url=${c}`,requestBody:{method:"GET",headers:{Authorization:"Bearer "+h}}}).then(e=>e.json()).then(e=>{const t=null==e?void 0:e.item;if(t)return t}).catch(e=>null).finally(e=>!1)||{}})},l):n},pe=ce,he=ce;export{oe as Helmet,G as HelmetData,W as HelmetProvider,le as withMetaManagerSEO,ce as withMetamanagerProps,pe as withMetamanagerServerProps,he as withMetamanagerStaticProps};
//# sourceMappingURL=index.modern.mjs.map
