(()=>{var yp=Object.create;var Nl=Object.defineProperty;var wp=Object.getOwnPropertyDescriptor;var Mp=Object.getOwnPropertyNames;var Sp=Object.getPrototypeOf,Ep=Object.prototype.hasOwnProperty;var kl=(l,t)=>()=>(t||l((t={exports:{}}).exports,t),t.exports);var Cp=(l,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Mp(t))!Ep.call(l,r)&&r!==e&&Nl(l,r,{get:()=>t[r],enumerable:!(i=wp(t,r))||i.enumerable});return l};var Ol=(l,t,e)=>(e=l!=null?yp(Sp(l)):{},Cp(t||!l||!l.__esModule?Nl(e,"default",{value:l,enumerable:!0}):e,l));var yh=kl((Nr,xh)=>{(function(l,t){typeof Nr=="object"&&typeof xh<"u"?t(Nr):typeof define=="function"&&define.amd?define(["exports"],t):(l=typeof globalThis<"u"?globalThis:l||self,t(l.Tweakpane={}))})(Nr,function(l){"use strict";class t{constructor(n){let[s,c]=n.split("-"),b=s.split(".");this.major=parseInt(b[0],10),this.minor=parseInt(b[1],10),this.patch=parseInt(b[2],10),this.prerelease=c??null}toString(){let n=[this.major,this.minor,this.patch].join(".");return this.prerelease!==null?[n,this.prerelease].join("-"):n}}class e{constructor(n){this.controller_=n}get element(){return this.controller_.view.element}get disabled(){return this.controller_.viewProps.get("disabled")}set disabled(n){this.controller_.viewProps.set("disabled",n)}get hidden(){return this.controller_.viewProps.get("hidden")}set hidden(n){this.controller_.viewProps.set("hidden",n)}dispose(){this.controller_.viewProps.set("disposed",!0)}}class i{constructor(n){this.target=n}}class r extends i{constructor(n,s,c,b){super(n),this.value=s,this.presetKey=c,this.last=b??!0}}class a extends i{constructor(n,s,c){super(n),this.value=s,this.presetKey=c}}class u extends i{constructor(n,s){super(n),this.expanded=s}}class h extends i{constructor(n,s){super(n),this.index=s}}function f(o){return o}function d(o){return o==null}function p(o,n){if(o.length!==n.length)return!1;for(let s=0;s<o.length;s++)if(o[s]!==n[s])return!1;return!0}function g(o,n){let s=o;do{let c=Object.getOwnPropertyDescriptor(s,n);if(c&&(c.set!==void 0||c.writable===!0))return!0;s=Object.getPrototypeOf(s)}while(s!==null);return!1}let v={alreadydisposed:()=>"View has been already disposed",invalidparams:o=>`Invalid parameters for '${o.name}'`,nomatchingcontroller:o=>`No matching controller for '${o.key}'`,nomatchingview:o=>`No matching view for '${JSON.stringify(o.params)}'`,notbindable:()=>"Value is not bindable",propertynotfound:o=>`Property '${o.name}' not found`,shouldneverhappen:()=>"This error should never happen"};class _{static alreadyDisposed(){return new _({type:"alreadydisposed"})}static notBindable(){return new _({type:"notbindable"})}static propertyNotFound(n){return new _({type:"propertynotfound",context:{name:n}})}static shouldNeverHappen(){return new _({type:"shouldneverhappen"})}constructor(n){var s;this.message=(s=v[n.type](n.context))!==null&&s!==void 0?s:"Unexpected error",this.name=this.constructor.name,this.stack=new Error(this.message).stack,this.type=n.type}}class y{constructor(n,s,c){this.obj_=n,this.key_=s,this.presetKey_=c??s}static isBindable(n){return!(n===null||typeof n!="object"&&typeof n!="function")}get key(){return this.key_}get presetKey(){return this.presetKey_}read(){return this.obj_[this.key_]}write(n){this.obj_[this.key_]=n}writeProperty(n,s){let c=this.read();if(!y.isBindable(c))throw _.notBindable();if(!(n in c))throw _.propertyNotFound(n);c[n]=s}}class w extends e{get label(){return this.controller_.props.get("label")}set label(n){this.controller_.props.set("label",n)}get title(){var n;return(n=this.controller_.valueController.props.get("title"))!==null&&n!==void 0?n:""}set title(n){this.controller_.valueController.props.set("title",n)}on(n,s){let c=s.bind(this);return this.controller_.valueController.emitter.on(n,()=>{c(new i(this))}),this}}class x{constructor(){this.observers_={}}on(n,s){let c=this.observers_[n];return c||(c=this.observers_[n]=[]),c.push({handler:s}),this}off(n,s){let c=this.observers_[n];return c&&(this.observers_[n]=c.filter(b=>b.handler!==s)),this}emit(n,s){let c=this.observers_[n];c&&c.forEach(b=>{b.handler(s)})}}let m="tp";function I(o){return(s,c)=>[m,"-",o,"v",s?`_${s}`:"",c?`-${c}`:""].join("")}function T(o,n){return s=>n(o(s))}function L(o){return o.rawValue}function P(o,n){o.emitter.on("change",T(L,n)),n(o.rawValue)}function F(o,n,s){P(o.value(n),s)}function H(o,n,s){s?o.classList.add(n):o.classList.remove(n)}function W(o,n){return s=>{H(o,n,s)}}function E(o,n){P(o,s=>{n.textContent=s??""})}let D=I("btn");class nt{constructor(n,s){this.element=n.createElement("div"),this.element.classList.add(D()),s.viewProps.bindClassModifiers(this.element);let c=n.createElement("button");c.classList.add(D("b")),s.viewProps.bindDisabled(c),this.element.appendChild(c),this.buttonElement=c;let b=n.createElement("div");b.classList.add(D("t")),E(s.props.value("title"),b),this.buttonElement.appendChild(b)}}class at{constructor(n,s){this.emitter=new x,this.onClick_=this.onClick_.bind(this),this.props=s.props,this.viewProps=s.viewProps,this.view=new nt(n,{props:this.props,viewProps:this.viewProps}),this.view.buttonElement.addEventListener("click",this.onClick_)}onClick_(){this.emitter.emit("click",{sender:this})}}class G{constructor(n,s){var c;this.constraint_=s?.constraint,this.equals_=(c=s?.equals)!==null&&c!==void 0?c:(b,U)=>b===U,this.emitter=new x,this.rawValue_=n}get constraint(){return this.constraint_}get rawValue(){return this.rawValue_}set rawValue(n){this.setRawValue(n,{forceEmit:!1,last:!0})}setRawValue(n,s){let c=s??{forceEmit:!1,last:!0},b=this.constraint_?this.constraint_.constrain(n):n,U=this.rawValue_;this.equals_(U,b)&&!c.forceEmit||(this.emitter.emit("beforechange",{sender:this}),this.rawValue_=b,this.emitter.emit("change",{options:c,previousRawValue:U,rawValue:b,sender:this}))}}class Z{constructor(n){this.emitter=new x,this.value_=n}get rawValue(){return this.value_}set rawValue(n){this.setRawValue(n,{forceEmit:!1,last:!0})}setRawValue(n,s){let c=s??{forceEmit:!1,last:!0},b=this.value_;b===n&&!c.forceEmit||(this.emitter.emit("beforechange",{sender:this}),this.value_=n,this.emitter.emit("change",{options:c,previousRawValue:b,rawValue:this.value_,sender:this}))}}function X(o,n){let s=n?.constraint,c=n?.equals;return!s&&!c?new Z(o):new G(o,n)}class J{constructor(n){this.emitter=new x,this.valMap_=n;for(let s in this.valMap_)this.valMap_[s].emitter.on("change",()=>{this.emitter.emit("change",{key:s,sender:this})})}static createCore(n){return Object.keys(n).reduce((c,b)=>Object.assign(c,{[b]:X(n[b])}),{})}static fromObject(n){let s=this.createCore(n);return new J(s)}get(n){return this.valMap_[n].rawValue}set(n,s){this.valMap_[n].rawValue=s}value(n){return this.valMap_[n]}}function ct(o,n){let c=Object.keys(n).reduce((b,U)=>{if(b===void 0)return;let V=n[U],pt=V(o[U]);return pt.succeeded?Object.assign(Object.assign({},b),{[U]:pt.value}):void 0},{});return c}function st(o,n){return o.reduce((s,c)=>{if(s===void 0)return;let b=n(c);if(!(!b.succeeded||b.value===void 0))return[...s,b.value]},[])}function lt(o){return o===null?!1:typeof o=="object"}function ht(o){return n=>s=>{if(!n&&s===void 0)return{succeeded:!1,value:void 0};if(n&&s===void 0)return{succeeded:!0,value:void 0};let c=o(s);return c!==void 0?{succeeded:!0,value:c}:{succeeded:!1,value:void 0}}}function St(o){return{custom:n=>ht(n)(o),boolean:ht(n=>typeof n=="boolean"?n:void 0)(o),number:ht(n=>typeof n=="number"?n:void 0)(o),string:ht(n=>typeof n=="string"?n:void 0)(o),function:ht(n=>typeof n=="function"?n:void 0)(o),constant:n=>ht(s=>s===n?n:void 0)(o),raw:ht(n=>n)(o),object:n=>ht(s=>{if(lt(s))return ct(s,n)})(o),array:n=>ht(s=>{if(Array.isArray(s))return st(s,n)})(o)}}let ut={optional:St(!0),required:St(!1)};function j(o,n){let s=ut.required.object(n)(o);return s.succeeded?s.value:void 0}function rt(o){console.warn([`Missing '${o.key}' of ${o.target} in ${o.place}.`,"Please rebuild plugins with the latest core package."].join(" "))}function gt(o){return o&&o.parentElement&&o.parentElement.removeChild(o),null}class bt{constructor(n){this.value_=n}static create(n){return[new bt(n),(s,c)=>{n.setRawValue(s,c)}]}get emitter(){return this.value_.emitter}get rawValue(){return this.value_.rawValue}}let K=I("");function It(o,n){return W(o,K(void 0,n))}class Et extends J{constructor(n){var s;super(n),this.onDisabledChange_=this.onDisabledChange_.bind(this),this.onParentChange_=this.onParentChange_.bind(this),this.onParentGlobalDisabledChange_=this.onParentGlobalDisabledChange_.bind(this),[this.globalDisabled_,this.setGlobalDisabled_]=bt.create(X(this.getGlobalDisabled_())),this.value("disabled").emitter.on("change",this.onDisabledChange_),this.value("parent").emitter.on("change",this.onParentChange_),(s=this.get("parent"))===null||s===void 0||s.globalDisabled.emitter.on("change",this.onParentGlobalDisabledChange_)}static create(n){var s,c,b;let U=n??{};return new Et(J.createCore({disabled:(s=U.disabled)!==null&&s!==void 0?s:!1,disposed:!1,hidden:(c=U.hidden)!==null&&c!==void 0?c:!1,parent:(b=U.parent)!==null&&b!==void 0?b:null}))}get globalDisabled(){return this.globalDisabled_}bindClassModifiers(n){P(this.globalDisabled_,It(n,"disabled")),F(this,"hidden",It(n,"hidden"))}bindDisabled(n){P(this.globalDisabled_,s=>{n.disabled=s})}bindTabIndex(n){P(this.globalDisabled_,s=>{n.tabIndex=s?-1:0})}handleDispose(n){this.value("disposed").emitter.on("change",s=>{s&&n()})}getGlobalDisabled_(){let n=this.get("parent");return(n?n.globalDisabled.rawValue:!1)||this.get("disabled")}updateGlobalDisabled_(){this.setGlobalDisabled_(this.getGlobalDisabled_())}onDisabledChange_(){this.updateGlobalDisabled_()}onParentGlobalDisabledChange_(){this.updateGlobalDisabled_()}onParentChange_(n){var s;let c=n.previousRawValue;c?.globalDisabled.emitter.off("change",this.onParentGlobalDisabledChange_),(s=this.get("parent"))===null||s===void 0||s.globalDisabled.emitter.on("change",this.onParentGlobalDisabledChange_),this.updateGlobalDisabled_()}}function mt(){return["veryfirst","first","last","verylast"]}let Tt=I(""),Yt={veryfirst:"vfst",first:"fst",last:"lst",verylast:"vlst"};class Mt{constructor(n){this.parent_=null,this.blade=n.blade,this.view=n.view,this.viewProps=n.viewProps;let s=this.view.element;this.blade.value("positions").emitter.on("change",()=>{mt().forEach(c=>{s.classList.remove(Tt(void 0,Yt[c]))}),this.blade.get("positions").forEach(c=>{s.classList.add(Tt(void 0,Yt[c]))})}),this.viewProps.handleDispose(()=>{gt(s)})}get parent(){return this.parent_}set parent(n){if(this.parent_=n,!("parent"in this.viewProps.valMap_)){rt({key:"parent",target:Et.name,place:"BladeController.parent"});return}this.viewProps.set("parent",this.parent_?this.parent_.viewProps:null)}}let Lt="http://www.w3.org/2000/svg";function ee(o){o.offsetHeight}function ie(o,n){let s=o.style.transition;o.style.transition="none",n(),o.style.transition=s}function oe(o){return o.ontouchstart!==void 0}function ae(){return globalThis}function Wt(){return ae().document}function Jt(o){let n=o.ownerDocument.defaultView;return n&&"document"in n?o.getContext("2d",{willReadFrequently:!0}):null}let pe={check:'<path d="M2 8l4 4l8 -8"/>',dropdown:'<path d="M5 7h6l-3 3 z"/>',p2dpad:'<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'};function R(o,n){let s=o.createElementNS(Lt,"svg");return s.innerHTML=pe[n],s}function S(o,n,s){o.insertBefore(n,o.children[s])}function Q(o){o.parentElement&&o.parentElement.removeChild(o)}function k(o){for(;o.children.length>0;)o.removeChild(o.children[0])}function M(o){for(;o.childNodes.length>0;)o.removeChild(o.childNodes[0])}function N(o){return o.relatedTarget?o.relatedTarget:"explicitOriginalTarget"in o?o.explicitOriginalTarget:null}let C=I("lbl");function q(o,n){let s=o.createDocumentFragment();return n.split(`
`).map(b=>o.createTextNode(b)).forEach((b,U)=>{U>0&&s.appendChild(o.createElement("br")),s.appendChild(b)}),s}class z{constructor(n,s){this.element=n.createElement("div"),this.element.classList.add(C()),s.viewProps.bindClassModifiers(this.element);let c=n.createElement("div");c.classList.add(C("l")),F(s.props,"label",U=>{d(U)?this.element.classList.add(C(void 0,"nol")):(this.element.classList.remove(C(void 0,"nol")),M(c),c.appendChild(q(n,U)))}),this.element.appendChild(c),this.labelElement=c;let b=n.createElement("div");b.classList.add(C("v")),this.element.appendChild(b),this.valueElement=b}}class ot extends Mt{constructor(n,s){let c=s.valueController.viewProps;super(Object.assign(Object.assign({},s),{view:new z(n,{props:s.props,viewProps:c}),viewProps:c})),this.props=s.props,this.valueController=s.valueController,this.view.valueElement.appendChild(this.valueController.view.element)}}let ft={id:"button",type:"blade",accept(o){let n=ut,s=j(o,{title:n.required.string,view:n.required.constant("button"),label:n.optional.string});return s?{params:s}:null},controller(o){return new ot(o.document,{blade:o.blade,props:J.fromObject({label:o.params.label}),valueController:new at(o.document,{props:J.fromObject({title:o.params.title}),viewProps:o.viewProps})})},api(o){return!(o.controller instanceof ot)||!(o.controller.valueController instanceof at)?null:new w(o.controller)}};class xt extends Mt{constructor(n){super(n),this.value=n.value}}function _t(){return new J({positions:X([],{equals:p})})}class wt extends J{constructor(n){super(n)}static create(n){let s={completed:!0,expanded:n,expandedHeight:null,shouldFixHeight:!1,temporaryExpanded:null},c=J.createCore(s);return new wt(c)}get styleExpanded(){var n;return(n=this.get("temporaryExpanded"))!==null&&n!==void 0?n:this.get("expanded")}get styleHeight(){if(!this.styleExpanded)return"0";let n=this.get("expandedHeight");return this.get("shouldFixHeight")&&!d(n)?`${n}px`:"auto"}bindExpandedClass(n,s){let c=()=>{this.styleExpanded?n.classList.add(s):n.classList.remove(s)};F(this,"expanded",c),F(this,"temporaryExpanded",c)}cleanUpTransition(){this.set("shouldFixHeight",!1),this.set("expandedHeight",null),this.set("completed",!0)}}function Nt(o,n){let s=0;return ie(n,()=>{o.set("expandedHeight",null),o.set("temporaryExpanded",!0),ee(n),s=n.clientHeight,o.set("temporaryExpanded",null),ee(n)}),s}function Ot(o,n){n.style.height=o.styleHeight}function le(o,n){o.value("expanded").emitter.on("beforechange",()=>{if(o.set("completed",!1),d(o.get("expandedHeight"))){let s=Nt(o,n);s>0&&o.set("expandedHeight",s)}o.set("shouldFixHeight",!0),ee(n)}),o.emitter.on("change",()=>{Ot(o,n)}),Ot(o,n),n.addEventListener("transitionend",s=>{s.propertyName==="height"&&o.cleanUpTransition()})}class O extends e{constructor(n,s){super(n),this.rackApi_=s}}function et(o,n){return o.addBlade(Object.assign(Object.assign({},n),{view:"button"}))}function dt(o,n){return o.addBlade(Object.assign(Object.assign({},n),{view:"folder"}))}function yt(o,n){let s=n??{};return o.addBlade(Object.assign(Object.assign({},s),{view:"separator"}))}function Ct(o,n){return o.addBlade(Object.assign(Object.assign({},n),{view:"tab"}))}class ne{constructor(n){this.emitter=new x,this.items_=[],this.cache_=new Set,this.onSubListAdd_=this.onSubListAdd_.bind(this),this.onSubListRemove_=this.onSubListRemove_.bind(this),this.extract_=n}get items(){return this.items_}allItems(){return Array.from(this.cache_)}find(n){for(let s of this.allItems())if(n(s))return s;return null}includes(n){return this.cache_.has(n)}add(n,s){if(this.includes(n))throw _.shouldNeverHappen();let c=s!==void 0?s:this.items_.length;this.items_.splice(c,0,n),this.cache_.add(n);let b=this.extract_(n);b&&(b.emitter.on("add",this.onSubListAdd_),b.emitter.on("remove",this.onSubListRemove_),b.allItems().forEach(U=>{this.cache_.add(U)})),this.emitter.emit("add",{index:c,item:n,root:this,target:this})}remove(n){let s=this.items_.indexOf(n);if(s<0)return;this.items_.splice(s,1),this.cache_.delete(n);let c=this.extract_(n);c&&(c.emitter.off("add",this.onSubListAdd_),c.emitter.off("remove",this.onSubListRemove_)),this.emitter.emit("remove",{index:s,item:n,root:this,target:this})}onSubListAdd_(n){this.cache_.add(n.item),this.emitter.emit("add",{index:n.index,item:n.item,root:this,target:n.target})}onSubListRemove_(n){this.cache_.delete(n.item),this.emitter.emit("remove",{index:n.index,item:n.item,root:this,target:n.target})}}class se extends e{constructor(n){super(n),this.onBindingChange_=this.onBindingChange_.bind(this),this.emitter_=new x,this.controller_.binding.emitter.on("change",this.onBindingChange_)}get label(){return this.controller_.props.get("label")}set label(n){this.controller_.props.set("label",n)}on(n,s){let c=s.bind(this);return this.emitter_.on(n,b=>{c(b.event)}),this}refresh(){this.controller_.binding.read()}onBindingChange_(n){let s=n.sender.target.read();this.emitter_.emit("change",{event:new r(this,s,this.controller_.binding.target.presetKey,n.options.last)})}}class re extends ot{constructor(n,s){super(n,s),this.binding=s.binding}}class qe extends e{constructor(n){super(n),this.onBindingUpdate_=this.onBindingUpdate_.bind(this),this.emitter_=new x,this.controller_.binding.emitter.on("update",this.onBindingUpdate_)}get label(){return this.controller_.props.get("label")}set label(n){this.controller_.props.set("label",n)}on(n,s){let c=s.bind(this);return this.emitter_.on(n,b=>{c(b.event)}),this}refresh(){this.controller_.binding.read()}onBindingUpdate_(n){let s=n.sender.target.read();this.emitter_.emit("update",{event:new a(this,s,this.controller_.binding.target.presetKey)})}}class Qt extends ot{constructor(n,s){super(n,s),this.binding=s.binding,this.viewProps.bindDisabled(this.binding.ticker),this.viewProps.handleDispose(()=>{this.binding.dispose()})}}function Ne(o){return o instanceof Wn?o.apiSet_:o instanceof O?o.rackApi_.apiSet_:null}function Ee(o,n){let s=o.find(c=>c.controller_===n);if(!s)throw _.shouldNeverHappen();return s}function Gn(o,n,s){if(!y.isBindable(o))throw _.notBindable();return new y(o,n,s)}class Wn extends e{constructor(n,s){super(n),this.onRackAdd_=this.onRackAdd_.bind(this),this.onRackRemove_=this.onRackRemove_.bind(this),this.onRackInputChange_=this.onRackInputChange_.bind(this),this.onRackMonitorUpdate_=this.onRackMonitorUpdate_.bind(this),this.emitter_=new x,this.apiSet_=new ne(Ne),this.pool_=s;let c=this.controller_.rack;c.emitter.on("add",this.onRackAdd_),c.emitter.on("remove",this.onRackRemove_),c.emitter.on("inputchange",this.onRackInputChange_),c.emitter.on("monitorupdate",this.onRackMonitorUpdate_),c.children.forEach(b=>{this.setUpApi_(b)})}get children(){return this.controller_.rack.children.map(n=>Ee(this.apiSet_,n))}addInput(n,s,c){let b=c??{},U=this.controller_.view.element.ownerDocument,V=this.pool_.createInput(U,Gn(n,s,b.presetKey),b),pt=new se(V);return this.add(pt,b.index)}addMonitor(n,s,c){let b=c??{},U=this.controller_.view.element.ownerDocument,V=this.pool_.createMonitor(U,Gn(n,s),b),pt=new qe(V);return this.add(pt,b.index)}addFolder(n){return dt(this,n)}addButton(n){return et(this,n)}addSeparator(n){return yt(this,n)}addTab(n){return Ct(this,n)}add(n,s){this.controller_.rack.add(n.controller_,s);let c=this.apiSet_.find(b=>b.controller_===n.controller_);return c&&this.apiSet_.remove(c),this.apiSet_.add(n),n}remove(n){this.controller_.rack.remove(n.controller_)}addBlade(n){let s=this.controller_.view.element.ownerDocument,c=this.pool_.createBlade(s,n),b=this.pool_.createBladeApi(c);return this.add(b,n.index)}on(n,s){let c=s.bind(this);return this.emitter_.on(n,b=>{c(b.event)}),this}setUpApi_(n){this.apiSet_.find(c=>c.controller_===n)||this.apiSet_.add(this.pool_.createBladeApi(n))}onRackAdd_(n){this.setUpApi_(n.bladeController)}onRackRemove_(n){if(n.isRoot){let s=Ee(this.apiSet_,n.bladeController);this.apiSet_.remove(s)}}onRackInputChange_(n){let s=n.bladeController;if(s instanceof re){let c=Ee(this.apiSet_,s),b=s.binding;this.emitter_.emit("change",{event:new r(c,b.target.read(),b.target.presetKey,n.options.last)})}else if(s instanceof xt){let c=Ee(this.apiSet_,s);this.emitter_.emit("change",{event:new r(c,s.value.rawValue,void 0,n.options.last)})}}onRackMonitorUpdate_(n){if(!(n.bladeController instanceof Qt))throw _.shouldNeverHappen();let s=Ee(this.apiSet_,n.bladeController),c=n.bladeController.binding;this.emitter_.emit("update",{event:new a(s,c.target.read(),c.target.presetKey)})}}class Qi extends O{constructor(n,s){super(n,new Wn(n.rackController,s)),this.emitter_=new x,this.controller_.foldable.value("expanded").emitter.on("change",c=>{this.emitter_.emit("fold",{event:new u(this,c.sender.rawValue)})}),this.rackApi_.on("change",c=>{this.emitter_.emit("change",{event:c})}),this.rackApi_.on("update",c=>{this.emitter_.emit("update",{event:c})})}get expanded(){return this.controller_.foldable.get("expanded")}set expanded(n){this.controller_.foldable.set("expanded",n)}get title(){return this.controller_.props.get("title")}set title(n){this.controller_.props.set("title",n)}get children(){return this.rackApi_.children}addInput(n,s,c){return this.rackApi_.addInput(n,s,c)}addMonitor(n,s,c){return this.rackApi_.addMonitor(n,s,c)}addFolder(n){return this.rackApi_.addFolder(n)}addButton(n){return this.rackApi_.addButton(n)}addSeparator(n){return this.rackApi_.addSeparator(n)}addTab(n){return this.rackApi_.addTab(n)}add(n,s){return this.rackApi_.add(n,s)}remove(n){this.rackApi_.remove(n)}addBlade(n){return this.rackApi_.addBlade(n)}on(n,s){let c=s.bind(this);return this.emitter_.on(n,b=>{c(b.event)}),this}}class ts extends Mt{constructor(n){super({blade:n.blade,view:n.view,viewProps:n.rackController.viewProps}),this.rackController=n.rackController}}class Vr{constructor(n,s){let c=I(s.viewName);this.element=n.createElement("div"),this.element.classList.add(c()),s.viewProps.bindClassModifiers(this.element)}}function A(o,n){for(let s=0;s<o.length;s++){let c=o[s];if(c instanceof re&&c.binding===n)return c}return null}function $(o,n){for(let s=0;s<o.length;s++){let c=o[s];if(c instanceof Qt&&c.binding===n)return c}return null}function tt(o,n){for(let s=0;s<o.length;s++){let c=o[s];if(c instanceof xt&&c.value===n)return c}return null}function B(o){return o instanceof Rt?o.rack:o instanceof ts?o.rackController.rack:null}function it(o){let n=B(o);return n?n.bcSet_:null}class Pt{constructor(n){var s,c;this.onBladePositionsChange_=this.onBladePositionsChange_.bind(this),this.onSetAdd_=this.onSetAdd_.bind(this),this.onSetRemove_=this.onSetRemove_.bind(this),this.onChildDispose_=this.onChildDispose_.bind(this),this.onChildPositionsChange_=this.onChildPositionsChange_.bind(this),this.onChildInputChange_=this.onChildInputChange_.bind(this),this.onChildMonitorUpdate_=this.onChildMonitorUpdate_.bind(this),this.onChildValueChange_=this.onChildValueChange_.bind(this),this.onChildViewPropsChange_=this.onChildViewPropsChange_.bind(this),this.onDescendantLayout_=this.onDescendantLayout_.bind(this),this.onDescendantInputChange_=this.onDescendantInputChange_.bind(this),this.onDescendantMonitorUpdate_=this.onDescendantMonitorUpdate_.bind(this),this.emitter=new x,this.blade_=(s=n.blade)!==null&&s!==void 0?s:null,(c=this.blade_)===null||c===void 0||c.value("positions").emitter.on("change",this.onBladePositionsChange_),this.viewProps=n.viewProps,this.bcSet_=new ne(it),this.bcSet_.emitter.on("add",this.onSetAdd_),this.bcSet_.emitter.on("remove",this.onSetRemove_)}get children(){return this.bcSet_.items}add(n,s){var c;(c=n.parent)===null||c===void 0||c.remove(n),g(n,"parent")?n.parent=this:(n.parent_=this,rt({key:"parent",target:"BladeController",place:"BladeRack.add"})),this.bcSet_.add(n,s)}remove(n){g(n,"parent")?n.parent=null:(n.parent_=null,rt({key:"parent",target:"BladeController",place:"BladeRack.remove"})),this.bcSet_.remove(n)}find(n){return this.bcSet_.allItems().filter(s=>s instanceof n)}onSetAdd_(n){this.updatePositions_();let s=n.target===n.root;if(this.emitter.emit("add",{bladeController:n.item,index:n.index,isRoot:s,sender:this}),!s)return;let c=n.item;if(c.viewProps.emitter.on("change",this.onChildViewPropsChange_),c.blade.value("positions").emitter.on("change",this.onChildPositionsChange_),c.viewProps.handleDispose(this.onChildDispose_),c instanceof re)c.binding.emitter.on("change",this.onChildInputChange_);else if(c instanceof Qt)c.binding.emitter.on("update",this.onChildMonitorUpdate_);else if(c instanceof xt)c.value.emitter.on("change",this.onChildValueChange_);else{let b=B(c);if(b){let U=b.emitter;U.on("layout",this.onDescendantLayout_),U.on("inputchange",this.onDescendantInputChange_),U.on("monitorupdate",this.onDescendantMonitorUpdate_)}}}onSetRemove_(n){this.updatePositions_();let s=n.target===n.root;if(this.emitter.emit("remove",{bladeController:n.item,isRoot:s,sender:this}),!s)return;let c=n.item;if(c instanceof re)c.binding.emitter.off("change",this.onChildInputChange_);else if(c instanceof Qt)c.binding.emitter.off("update",this.onChildMonitorUpdate_);else if(c instanceof xt)c.value.emitter.off("change",this.onChildValueChange_);else{let b=B(c);if(b){let U=b.emitter;U.off("layout",this.onDescendantLayout_),U.off("inputchange",this.onDescendantInputChange_),U.off("monitorupdate",this.onDescendantMonitorUpdate_)}}}updatePositions_(){let n=this.bcSet_.items.filter(b=>!b.viewProps.get("hidden")),s=n[0],c=n[n.length-1];this.bcSet_.items.forEach(b=>{let U=[];b===s&&(U.push("first"),(!this.blade_||this.blade_.get("positions").includes("veryfirst"))&&U.push("veryfirst")),b===c&&(U.push("last"),(!this.blade_||this.blade_.get("positions").includes("verylast"))&&U.push("verylast")),b.blade.set("positions",U)})}onChildPositionsChange_(){this.updatePositions_(),this.emitter.emit("layout",{sender:this})}onChildViewPropsChange_(n){this.updatePositions_(),this.emitter.emit("layout",{sender:this})}onChildDispose_(){this.bcSet_.items.filter(s=>s.viewProps.get("disposed")).forEach(s=>{this.bcSet_.remove(s)})}onChildInputChange_(n){let s=A(this.find(re),n.sender);if(!s)throw _.alreadyDisposed();this.emitter.emit("inputchange",{bladeController:s,options:n.options,sender:this})}onChildMonitorUpdate_(n){let s=$(this.find(Qt),n.sender);if(!s)throw _.alreadyDisposed();this.emitter.emit("monitorupdate",{bladeController:s,sender:this})}onChildValueChange_(n){let s=tt(this.find(xt),n.sender);if(!s)throw _.alreadyDisposed();this.emitter.emit("inputchange",{bladeController:s,options:n.options,sender:this})}onDescendantLayout_(n){this.updatePositions_(),this.emitter.emit("layout",{sender:this})}onDescendantInputChange_(n){this.emitter.emit("inputchange",{bladeController:n.bladeController,options:n.options,sender:this})}onDescendantMonitorUpdate_(n){this.emitter.emit("monitorupdate",{bladeController:n.bladeController,sender:this})}onBladePositionsChange_(){this.updatePositions_()}}class Rt extends Mt{constructor(n,s){super(Object.assign(Object.assign({},s),{view:new Vr(n,{viewName:"brk",viewProps:s.viewProps})})),this.onRackAdd_=this.onRackAdd_.bind(this),this.onRackRemove_=this.onRackRemove_.bind(this);let c=new Pt({blade:s.root?void 0:s.blade,viewProps:s.viewProps});c.emitter.on("add",this.onRackAdd_),c.emitter.on("remove",this.onRackRemove_),this.rack=c,this.viewProps.handleDispose(()=>{for(let b=this.rack.children.length-1;b>=0;b--)this.rack.children[b].viewProps.set("disposed",!0)})}onRackAdd_(n){n.isRoot&&S(this.view.element,n.bladeController.view.element,n.index)}onRackRemove_(n){n.isRoot&&Q(n.bladeController.view.element)}}let Ut=I("cnt");class Ft{constructor(n,s){var c;this.className_=I((c=s.viewName)!==null&&c!==void 0?c:"fld"),this.element=n.createElement("div"),this.element.classList.add(this.className_(),Ut()),s.viewProps.bindClassModifiers(this.element),this.foldable_=s.foldable,this.foldable_.bindExpandedClass(this.element,this.className_(void 0,"expanded")),F(this.foldable_,"completed",W(this.element,this.className_(void 0,"cpl")));let b=n.createElement("button");b.classList.add(this.className_("b")),F(s.props,"title",Dt=>{d(Dt)?this.element.classList.add(this.className_(void 0,"not")):this.element.classList.remove(this.className_(void 0,"not"))}),s.viewProps.bindDisabled(b),this.element.appendChild(b),this.buttonElement=b;let U=n.createElement("div");U.classList.add(this.className_("i")),this.element.appendChild(U);let V=n.createElement("div");V.classList.add(this.className_("t")),E(s.props.value("title"),V),this.buttonElement.appendChild(V),this.titleElement=V;let pt=n.createElement("div");pt.classList.add(this.className_("m")),this.buttonElement.appendChild(pt);let At=s.containerElement;At.classList.add(this.className_("c")),this.element.appendChild(At),this.containerElement=At}}class Vt extends ts{constructor(n,s){var c;let b=wt.create((c=s.expanded)!==null&&c!==void 0?c:!0),U=new Rt(n,{blade:s.blade,root:s.root,viewProps:s.viewProps});super(Object.assign(Object.assign({},s),{rackController:U,view:new Ft(n,{containerElement:U.view.element,foldable:b,props:s.props,viewName:s.root?"rot":void 0,viewProps:s.viewProps})})),this.onTitleClick_=this.onTitleClick_.bind(this),this.props=s.props,this.foldable=b,le(this.foldable,this.view.containerElement),this.rackController.rack.emitter.on("add",()=>{this.foldable.cleanUpTransition()}),this.rackController.rack.emitter.on("remove",()=>{this.foldable.cleanUpTransition()}),this.view.buttonElement.addEventListener("click",this.onTitleClick_)}get document(){return this.view.element.ownerDocument}onTitleClick_(){this.foldable.set("expanded",!this.foldable.get("expanded"))}}let Bt={id:"folder",type:"blade",accept(o){let n=ut,s=j(o,{title:n.required.string,view:n.required.constant("folder"),expanded:n.optional.boolean});return s?{params:s}:null},controller(o){return new Vt(o.document,{blade:o.blade,expanded:o.params.expanded,props:J.fromObject({title:o.params.title}),viewProps:o.viewProps})},api(o){return o.controller instanceof Vt?new Qi(o.controller,o.pool):null}};class kt extends xt{constructor(n,s){let c=s.valueController.viewProps;super(Object.assign(Object.assign({},s),{value:s.valueController.value,view:new z(n,{props:s.props,viewProps:c}),viewProps:c})),this.props=s.props,this.valueController=s.valueController,this.view.valueElement.appendChild(this.valueController.view.element)}}class jt extends e{}let xe=I("spr");class Fe{constructor(n,s){this.element=n.createElement("div"),this.element.classList.add(xe()),s.viewProps.bindClassModifiers(this.element);let c=n.createElement("hr");c.classList.add(xe("r")),this.element.appendChild(c)}}class an extends Mt{constructor(n,s){super(Object.assign(Object.assign({},s),{view:new Fe(n,{viewProps:s.viewProps})}))}}let ue={id:"separator",type:"blade",accept(o){let s=j(o,{view:ut.required.constant("separator")});return s?{params:s}:null},controller(o){return new an(o.document,{blade:o.blade,viewProps:o.viewProps})},api(o){return o.controller instanceof an?new jt(o.controller):null}},zt=I("tbi");class es{constructor(n,s){this.element=n.createElement("div"),this.element.classList.add(zt()),s.viewProps.bindClassModifiers(this.element),F(s.props,"selected",U=>{U?this.element.classList.add(zt(void 0,"sel")):this.element.classList.remove(zt(void 0,"sel"))});let c=n.createElement("button");c.classList.add(zt("b")),s.viewProps.bindDisabled(c),this.element.appendChild(c),this.buttonElement=c;let b=n.createElement("div");b.classList.add(zt("t")),E(s.props.value("title"),b),this.buttonElement.appendChild(b),this.titleElement=b}}class fe{constructor(n,s){this.emitter=new x,this.onClick_=this.onClick_.bind(this),this.props=s.props,this.viewProps=s.viewProps,this.view=new es(n,{props:s.props,viewProps:s.viewProps}),this.view.buttonElement.addEventListener("click",this.onClick_)}onClick_(){this.emitter.emit("click",{sender:this})}}class ln{constructor(n,s){this.onItemClick_=this.onItemClick_.bind(this),this.ic_=new fe(n,{props:s.itemProps,viewProps:Et.create()}),this.ic_.emitter.on("click",this.onItemClick_),this.cc_=new Rt(n,{blade:_t(),viewProps:Et.create()}),this.props=s.props,F(this.props,"selected",c=>{this.itemController.props.set("selected",c),this.contentController.viewProps.set("hidden",!c)})}get itemController(){return this.ic_}get contentController(){return this.cc_}onItemClick_(){this.props.set("selected",!0)}}class ns{constructor(n,s){this.controller_=n,this.rackApi_=s}get title(){var n;return(n=this.controller_.itemController.props.get("title"))!==null&&n!==void 0?n:""}set title(n){this.controller_.itemController.props.set("title",n)}get selected(){return this.controller_.props.get("selected")}set selected(n){this.controller_.props.set("selected",n)}get children(){return this.rackApi_.children}addButton(n){return this.rackApi_.addButton(n)}addFolder(n){return this.rackApi_.addFolder(n)}addSeparator(n){return this.rackApi_.addSeparator(n)}addTab(n){return this.rackApi_.addTab(n)}add(n,s){this.rackApi_.add(n,s)}remove(n){this.rackApi_.remove(n)}addInput(n,s,c){return this.rackApi_.addInput(n,s,c)}addMonitor(n,s,c){return this.rackApi_.addMonitor(n,s,c)}addBlade(n){return this.rackApi_.addBlade(n)}}class Pn extends O{constructor(n,s){super(n,new Wn(n.rackController,s)),this.onPageAdd_=this.onPageAdd_.bind(this),this.onPageRemove_=this.onPageRemove_.bind(this),this.onSelect_=this.onSelect_.bind(this),this.emitter_=new x,this.pageApiMap_=new Map,this.rackApi_.on("change",c=>{this.emitter_.emit("change",{event:c})}),this.rackApi_.on("update",c=>{this.emitter_.emit("update",{event:c})}),this.controller_.tab.selectedIndex.emitter.on("change",this.onSelect_),this.controller_.pageSet.emitter.on("add",this.onPageAdd_),this.controller_.pageSet.emitter.on("remove",this.onPageRemove_),this.controller_.pageSet.items.forEach(c=>{this.setUpPageApi_(c)})}get pages(){return this.controller_.pageSet.items.map(n=>{let s=this.pageApiMap_.get(n);if(!s)throw _.shouldNeverHappen();return s})}addPage(n){let s=this.controller_.view.element.ownerDocument,c=new ln(s,{itemProps:J.fromObject({selected:!1,title:n.title}),props:J.fromObject({selected:!1})});this.controller_.add(c,n.index);let b=this.pageApiMap_.get(c);if(!b)throw _.shouldNeverHappen();return b}removePage(n){this.controller_.remove(n)}on(n,s){let c=s.bind(this);return this.emitter_.on(n,b=>{c(b.event)}),this}setUpPageApi_(n){let s=this.rackApi_.apiSet_.find(b=>b.controller_===n.contentController);if(!s)throw _.shouldNeverHappen();let c=new ns(n,s);this.pageApiMap_.set(n,c)}onPageAdd_(n){this.setUpPageApi_(n.item)}onPageRemove_(n){if(!this.pageApiMap_.get(n.item))throw _.shouldNeverHappen();this.pageApiMap_.delete(n.item)}onSelect_(n){this.emitter_.emit("select",{event:new h(this,n.rawValue)})}}let fi=-1;class we{constructor(){this.onItemSelectedChange_=this.onItemSelectedChange_.bind(this),this.empty=X(!0),this.selectedIndex=X(fi),this.items_=[]}add(n,s){let c=s??this.items_.length;this.items_.splice(c,0,n),n.emitter.on("change",this.onItemSelectedChange_),this.keepSelection_()}remove(n){let s=this.items_.indexOf(n);s<0||(this.items_.splice(s,1),n.emitter.off("change",this.onItemSelectedChange_),this.keepSelection_())}keepSelection_(){if(this.items_.length===0){this.selectedIndex.rawValue=fi,this.empty.rawValue=!0;return}let n=this.items_.findIndex(s=>s.rawValue);n<0?(this.items_.forEach((s,c)=>{s.rawValue=c===0}),this.selectedIndex.rawValue=0):(this.items_.forEach((s,c)=>{s.rawValue=c===n}),this.selectedIndex.rawValue=n),this.empty.rawValue=!1}onItemSelectedChange_(n){if(n.rawValue){let s=this.items_.findIndex(c=>c===n.sender);this.items_.forEach((c,b)=>{c.rawValue=b===s}),this.selectedIndex.rawValue=s}else this.keepSelection_()}}let Ve=I("tab");class is{constructor(n,s){this.element=n.createElement("div"),this.element.classList.add(Ve(),Ut()),s.viewProps.bindClassModifiers(this.element),P(s.empty,W(this.element,Ve(void 0,"nop")));let c=n.createElement("div");c.classList.add(Ve("t")),this.element.appendChild(c),this.itemsElement=c;let b=n.createElement("div");b.classList.add(Ve("i")),this.element.appendChild(b);let U=s.contentsElement;U.classList.add(Ve("c")),this.element.appendChild(U),this.contentsElement=U}}class Ce extends ts{constructor(n,s){let c=new Rt(n,{blade:s.blade,viewProps:s.viewProps}),b=new we;super({blade:s.blade,rackController:c,view:new is(n,{contentsElement:c.view.element,empty:b.empty,viewProps:s.viewProps})}),this.onPageAdd_=this.onPageAdd_.bind(this),this.onPageRemove_=this.onPageRemove_.bind(this),this.pageSet_=new ne(()=>null),this.pageSet_.emitter.on("add",this.onPageAdd_),this.pageSet_.emitter.on("remove",this.onPageRemove_),this.tab=b}get pageSet(){return this.pageSet_}add(n,s){this.pageSet_.add(n,s)}remove(n){this.pageSet_.remove(this.pageSet_.items[n])}onPageAdd_(n){let s=n.item;S(this.view.itemsElement,s.itemController.view.element,n.index),s.itemController.viewProps.set("parent",this.viewProps),this.rackController.rack.add(s.contentController,n.index),this.tab.add(s.props.value("selected"))}onPageRemove_(n){let s=n.item;Q(s.itemController.view.element),s.itemController.viewProps.set("parent",null),this.rackController.rack.remove(s.contentController),this.tab.remove(s.props.value("selected"))}}let mi={id:"tab",type:"blade",accept(o){let n=ut,s=j(o,{pages:n.required.array(n.required.object({title:n.required.string})),view:n.required.constant("tab")});return!s||s.pages.length===0?null:{params:s}},controller(o){let n=new Ce(o.document,{blade:o.blade,viewProps:o.viewProps});return o.params.pages.forEach(s=>{let c=new ln(o.document,{itemProps:J.fromObject({selected:!1,title:s.title}),props:J.fromObject({selected:!1})});n.add(c)}),n},api(o){return o.controller instanceof Ce?new Pn(o.controller,o.pool):null}};function zr(o,n){let s=o.accept(n.params);if(!s)return null;let c=ut.optional.boolean(n.params.disabled).value,b=ut.optional.boolean(n.params.hidden).value;return o.controller({blade:_t(),document:n.document,params:Object.assign(Object.assign({},s.params),{disabled:c,hidden:b}),viewProps:Et.create({disabled:c,hidden:b})})}class Us{constructor(){this.disabled=!1,this.emitter=new x}dispose(){}tick(){this.disabled||this.emitter.emit("tick",{sender:this})}}class Eh{constructor(n,s){this.disabled_=!1,this.timerId_=null,this.onTick_=this.onTick_.bind(this),this.doc_=n,this.emitter=new x,this.interval_=s,this.setTimer_()}get disabled(){return this.disabled_}set disabled(n){this.disabled_=n,this.disabled_?this.clearTimer_():this.setTimer_()}dispose(){this.clearTimer_()}clearTimer_(){if(this.timerId_===null)return;let n=this.doc_.defaultView;n&&n.clearInterval(this.timerId_),this.timerId_=null}setTimer_(){if(this.clearTimer_(),this.interval_<=0)return;let n=this.doc_.defaultView;n&&(this.timerId_=n.setInterval(this.onTick_,this.interval_))}onTick_(){this.disabled_||this.emitter.emit("tick",{sender:this})}}class Ch{constructor(n){this.onValueChange_=this.onValueChange_.bind(this),this.reader=n.reader,this.writer=n.writer,this.emitter=new x,this.value=n.value,this.value.emitter.on("change",this.onValueChange_),this.target=n.target,this.read()}read(){let n=this.target.read();n!==void 0&&(this.value.rawValue=this.reader(n))}write_(n){this.writer(this.target,n)}onValueChange_(n){this.write_(n.rawValue),this.emitter.emit("change",{options:n.options,rawValue:n.rawValue,sender:this})}}function Ra(o,n){for(;o.length<n;)o.push(void 0)}function Ah(o){let n=[];return Ra(n,o),X(n)}function Th(o){let n=o.indexOf(void 0);return n<0?o:o.slice(0,n)}function Ph(o,n){let s=[...Th(o),n];return s.length>o.length?s.splice(0,s.length-o.length):Ra(s,o.length),s}class Lh{constructor(n){this.onTick_=this.onTick_.bind(this),this.reader_=n.reader,this.target=n.target,this.emitter=new x,this.value=n.value,this.ticker=n.ticker,this.ticker.emitter.on("tick",this.onTick_),this.read()}dispose(){this.ticker.dispose()}read(){let n=this.target.read();if(n===void 0)return;let s=this.value.rawValue,c=this.reader_(n);this.value.rawValue=Ph(s,c),this.emitter.emit("update",{rawValue:c,sender:this})}onTick_(n){this.read()}}class ss{constructor(n){this.constraints=n}constrain(n){return this.constraints.reduce((s,c)=>c.constrain(s),n)}}function pn(o,n){if(o instanceof n)return o;if(o instanceof ss){let s=o.constraints.reduce((c,b)=>c||(b instanceof n?b:null),null);if(s)return s}return null}class gi{constructor(n){this.values=J.fromObject({max:n.max,min:n.min})}constrain(n){let s=this.values.get("max"),c=this.values.get("min");return Math.min(Math.max(n,c),s)}}class rs{constructor(n){this.values=J.fromObject({options:n})}get options(){return this.values.get("options")}constrain(n){let s=this.values.get("options");return s.length===0||s.filter(b=>b.value===n).length>0?n:s[0].value}}class Ia{constructor(n){this.values=J.fromObject({max:n.max,min:n.min})}get maxValue(){return this.values.get("max")}get minValue(){return this.values.get("min")}constrain(n){let s=this.values.get("max"),c=this.values.get("min"),b=n;return d(c)||(b=Math.max(b,c)),d(s)||(b=Math.min(b,s)),b}}class Ns{constructor(n,s=0){this.step=n,this.origin=s}constrain(n){let s=this.origin%this.step,c=Math.round((n-s)/this.step);return s+c*this.step}}let Br=I("lst");class Rh{constructor(n,s){this.onValueChange_=this.onValueChange_.bind(this),this.props_=s.props,this.element=n.createElement("div"),this.element.classList.add(Br()),s.viewProps.bindClassModifiers(this.element);let c=n.createElement("select");c.classList.add(Br("s")),F(this.props_,"options",U=>{k(c),U.forEach((V,pt)=>{let At=n.createElement("option");At.dataset.index=String(pt),At.textContent=V.text,At.value=String(V.value),c.appendChild(At)})}),s.viewProps.bindDisabled(c),this.element.appendChild(c),this.selectElement=c;let b=n.createElement("div");b.classList.add(Br("m")),b.appendChild(R(n,"dropdown")),this.element.appendChild(b),s.value.emitter.on("change",this.onValueChange_),this.value_=s.value,this.update_()}update_(){this.selectElement.value=String(this.value_.rawValue)}onValueChange_(){this.update_()}}class os{constructor(n,s){this.onSelectChange_=this.onSelectChange_.bind(this),this.props=s.props,this.value=s.value,this.viewProps=s.viewProps,this.view=new Rh(n,{props:this.props,value:this.value,viewProps:this.viewProps}),this.view.selectElement.addEventListener("change",this.onSelectChange_)}onSelectChange_(n){let c=n.currentTarget.selectedOptions.item(0);if(!c)return;let b=Number(c.dataset.index);this.value.rawValue=this.props.get("options")[b].value}}let Da=I("pop");class Ih{constructor(n,s){this.element=n.createElement("div"),this.element.classList.add(Da()),s.viewProps.bindClassModifiers(this.element),P(s.shows,W(this.element,Da(void 0,"v")))}}class Ua{constructor(n,s){this.shows=X(!1),this.viewProps=s.viewProps,this.view=new Ih(n,{shows:this.shows,viewProps:this.viewProps})}}let Na=I("txt");class Dh{constructor(n,s){this.onChange_=this.onChange_.bind(this),this.element=n.createElement("div"),this.element.classList.add(Na()),s.viewProps.bindClassModifiers(this.element),this.props_=s.props,this.props_.emitter.on("change",this.onChange_);let c=n.createElement("input");c.classList.add(Na("i")),c.type="text",s.viewProps.bindDisabled(c),this.element.appendChild(c),this.inputElement=c,s.value.emitter.on("change",this.onChange_),this.value_=s.value,this.refresh()}refresh(){let n=this.props_.get("formatter");this.inputElement.value=n(this.value_.rawValue)}onChange_(){this.refresh()}}class ks{constructor(n,s){this.onInputChange_=this.onInputChange_.bind(this),this.parser_=s.parser,this.props=s.props,this.value=s.value,this.viewProps=s.viewProps,this.view=new Dh(n,{props:s.props,value:this.value,viewProps:this.viewProps}),this.view.inputElement.addEventListener("change",this.onInputChange_)}onInputChange_(n){let c=n.currentTarget.value,b=this.parser_(c);d(b)||(this.value.rawValue=b),this.view.refresh()}}function Uh(o){return String(o)}function ka(o){return o==="false"?!1:!!o}function Oa(o){return Uh(o)}class Nh{constructor(n){this.text=n}evaluate(){return Number(this.text)}toString(){return this.text}}let kh={"**":(o,n)=>Math.pow(o,n),"*":(o,n)=>o*n,"/":(o,n)=>o/n,"%":(o,n)=>o%n,"+":(o,n)=>o+n,"-":(o,n)=>o-n,"<<":(o,n)=>o<<n,">>":(o,n)=>o>>n,">>>":(o,n)=>o>>>n,"&":(o,n)=>o&n,"^":(o,n)=>o^n,"|":(o,n)=>o|n};class Oh{constructor(n,s,c){this.left=s,this.operator=n,this.right=c}evaluate(){let n=kh[this.operator];if(!n)throw new Error(`unexpected binary operator: '${this.operator}`);return n(this.left.evaluate(),this.right.evaluate())}toString(){return["b(",this.left.toString(),this.operator,this.right.toString(),")"].join(" ")}}let Fh={"+":o=>o,"-":o=>-o,"~":o=>~o};class Vh{constructor(n,s){this.operator=n,this.expression=s}evaluate(){let n=Fh[this.operator];if(!n)throw new Error(`unexpected unary operator: '${this.operator}`);return n(this.expression.evaluate())}toString(){return["u(",this.operator,this.expression.toString(),")"].join(" ")}}function Hr(o){return(n,s)=>{for(let c=0;c<o.length;c++){let b=o[c](n,s);if(b!=="")return b}return""}}function as(o,n){var s;let c=o.substr(n).match(/^\s+/);return(s=c&&c[0])!==null&&s!==void 0?s:""}function zh(o,n){let s=o.substr(n,1);return s.match(/^[1-9]$/)?s:""}function ls(o,n){var s;let c=o.substr(n).match(/^[0-9]+/);return(s=c&&c[0])!==null&&s!==void 0?s:""}function Bh(o,n){let s=ls(o,n);if(s!=="")return s;let c=o.substr(n,1);if(n+=1,c!=="-"&&c!=="+")return"";let b=ls(o,n);return b===""?"":c+b}function Gr(o,n){let s=o.substr(n,1);if(n+=1,s.toLowerCase()!=="e")return"";let c=Bh(o,n);return c===""?"":s+c}function Fa(o,n){let s=o.substr(n,1);if(s==="0")return s;let c=zh(o,n);return n+=c.length,c===""?"":c+ls(o,n)}function Hh(o,n){let s=Fa(o,n);if(n+=s.length,s==="")return"";let c=o.substr(n,1);if(n+=c.length,c!==".")return"";let b=ls(o,n);return n+=b.length,s+c+b+Gr(o,n)}function Gh(o,n){let s=o.substr(n,1);if(n+=s.length,s!==".")return"";let c=ls(o,n);return n+=c.length,c===""?"":s+c+Gr(o,n)}function Wh(o,n){let s=Fa(o,n);return n+=s.length,s===""?"":s+Gr(o,n)}let qh=Hr([Hh,Gh,Wh]);function Xh(o,n){var s;let c=o.substr(n).match(/^[01]+/);return(s=c&&c[0])!==null&&s!==void 0?s:""}function Yh(o,n){let s=o.substr(n,2);if(n+=s.length,s.toLowerCase()!=="0b")return"";let c=Xh(o,n);return c===""?"":s+c}function $h(o,n){var s;let c=o.substr(n).match(/^[0-7]+/);return(s=c&&c[0])!==null&&s!==void 0?s:""}function jh(o,n){let s=o.substr(n,2);if(n+=s.length,s.toLowerCase()!=="0o")return"";let c=$h(o,n);return c===""?"":s+c}function Zh(o,n){var s;let c=o.substr(n).match(/^[0-9a-f]+/i);return(s=c&&c[0])!==null&&s!==void 0?s:""}function Kh(o,n){let s=o.substr(n,2);if(n+=s.length,s.toLowerCase()!=="0x")return"";let c=Zh(o,n);return c===""?"":s+c}let Jh=Hr([Yh,jh,Kh]),Qh=Hr([Jh,qh]);function tu(o,n){let s=Qh(o,n);return n+=s.length,s===""?null:{evaluable:new Nh(s),cursor:n}}function eu(o,n){let s=o.substr(n,1);if(n+=s.length,s!=="(")return null;let c=za(o,n);if(!c)return null;n=c.cursor,n+=as(o,n).length;let b=o.substr(n,1);return n+=b.length,b!==")"?null:{evaluable:c.evaluable,cursor:n}}function nu(o,n){var s;return(s=tu(o,n))!==null&&s!==void 0?s:eu(o,n)}function Va(o,n){let s=nu(o,n);if(s)return s;let c=o.substr(n,1);if(n+=c.length,c!=="+"&&c!=="-"&&c!=="~")return null;let b=Va(o,n);return b?(n=b.cursor,{cursor:n,evaluable:new Vh(c,b.evaluable)}):null}function iu(o,n,s){s+=as(n,s).length;let c=o.filter(b=>n.startsWith(b,s))[0];return c?(s+=c.length,s+=as(n,s).length,{cursor:s,operator:c}):null}function su(o,n){return(s,c)=>{let b=o(s,c);if(!b)return null;c=b.cursor;let U=b.evaluable;for(;;){let V=iu(n,s,c);if(!V)break;c=V.cursor;let pt=o(s,c);if(!pt)return null;c=pt.cursor,U=new Oh(V.operator,U,pt.evaluable)}return U?{cursor:c,evaluable:U}:null}}let ru=[["**"],["*","/","%"],["+","-"],["<<",">>>",">>"],["&"],["^"],["|"]].reduce((o,n)=>su(o,n),Va);function za(o,n){return n+=as(o,n).length,ru(o,n)}function ou(o){let n=za(o,0);return!n||n.cursor+as(o,n.cursor).length!==o.length?null:n.evaluable}function fn(o){var n;let s=ou(o);return(n=s?.evaluate())!==null&&n!==void 0?n:null}function Ba(o){if(typeof o=="number")return o;if(typeof o=="string"){let n=fn(o);if(!d(n))return n}return 0}function au(o){return String(o)}function Me(o){return n=>n.toFixed(Math.max(Math.min(o,20),0))}let lu=Me(0);function Os(o){return lu(o)+"%"}function Ha(o){return String(o)}function Wr(o){return o}function cs({primary:o,secondary:n,forward:s,backward:c}){let b=!1;function U(V){b||(b=!0,V(),b=!1)}o.emitter.on("change",V=>{U(()=>{n.setRawValue(s(o,n),V.options)})}),n.emitter.on("change",V=>{U(()=>{o.setRawValue(c(o,n),V.options)}),U(()=>{n.setRawValue(s(o,n),V.options)})}),U(()=>{n.setRawValue(s(o,n),{forceEmit:!1,last:!0})})}function ke(o,n){let s=o*(n.altKey?.1:1)*(n.shiftKey?10:1);return n.upKey?+s:n.downKey?-s:0}function hs(o){return{altKey:o.altKey,downKey:o.key==="ArrowDown",shiftKey:o.shiftKey,upKey:o.key==="ArrowUp"}}function mn(o){return{altKey:o.altKey,downKey:o.key==="ArrowLeft",shiftKey:o.shiftKey,upKey:o.key==="ArrowRight"}}function cu(o){return o==="ArrowUp"||o==="ArrowDown"}function Ga(o){return cu(o)||o==="ArrowLeft"||o==="ArrowRight"}function qr(o,n){var s,c;let b=n.ownerDocument.defaultView,U=n.getBoundingClientRect();return{x:o.pageX-(((s=b&&b.scrollX)!==null&&s!==void 0?s:0)+U.left),y:o.pageY-(((c=b&&b.scrollY)!==null&&c!==void 0?c:0)+U.top)}}class qn{constructor(n){this.lastTouch_=null,this.onDocumentMouseMove_=this.onDocumentMouseMove_.bind(this),this.onDocumentMouseUp_=this.onDocumentMouseUp_.bind(this),this.onMouseDown_=this.onMouseDown_.bind(this),this.onTouchEnd_=this.onTouchEnd_.bind(this),this.onTouchMove_=this.onTouchMove_.bind(this),this.onTouchStart_=this.onTouchStart_.bind(this),this.elem_=n,this.emitter=new x,n.addEventListener("touchstart",this.onTouchStart_,{passive:!1}),n.addEventListener("touchmove",this.onTouchMove_,{passive:!0}),n.addEventListener("touchend",this.onTouchEnd_),n.addEventListener("mousedown",this.onMouseDown_)}computePosition_(n){let s=this.elem_.getBoundingClientRect();return{bounds:{width:s.width,height:s.height},point:n?{x:n.x,y:n.y}:null}}onMouseDown_(n){var s;n.preventDefault(),(s=n.currentTarget)===null||s===void 0||s.focus();let c=this.elem_.ownerDocument;c.addEventListener("mousemove",this.onDocumentMouseMove_),c.addEventListener("mouseup",this.onDocumentMouseUp_),this.emitter.emit("down",{altKey:n.altKey,data:this.computePosition_(qr(n,this.elem_)),sender:this,shiftKey:n.shiftKey})}onDocumentMouseMove_(n){this.emitter.emit("move",{altKey:n.altKey,data:this.computePosition_(qr(n,this.elem_)),sender:this,shiftKey:n.shiftKey})}onDocumentMouseUp_(n){let s=this.elem_.ownerDocument;s.removeEventListener("mousemove",this.onDocumentMouseMove_),s.removeEventListener("mouseup",this.onDocumentMouseUp_),this.emitter.emit("up",{altKey:n.altKey,data:this.computePosition_(qr(n,this.elem_)),sender:this,shiftKey:n.shiftKey})}onTouchStart_(n){n.preventDefault();let s=n.targetTouches.item(0),c=this.elem_.getBoundingClientRect();this.emitter.emit("down",{altKey:n.altKey,data:this.computePosition_(s?{x:s.clientX-c.left,y:s.clientY-c.top}:void 0),sender:this,shiftKey:n.shiftKey}),this.lastTouch_=s}onTouchMove_(n){let s=n.targetTouches.item(0),c=this.elem_.getBoundingClientRect();this.emitter.emit("move",{altKey:n.altKey,data:this.computePosition_(s?{x:s.clientX-c.left,y:s.clientY-c.top}:void 0),sender:this,shiftKey:n.shiftKey}),this.lastTouch_=s}onTouchEnd_(n){var s;let c=(s=n.targetTouches.item(0))!==null&&s!==void 0?s:this.lastTouch_,b=this.elem_.getBoundingClientRect();this.emitter.emit("up",{altKey:n.altKey,data:this.computePosition_(c?{x:c.clientX-b.left,y:c.clientY-b.top}:void 0),sender:this,shiftKey:n.shiftKey})}}function he(o,n,s,c,b){let U=(o-n)/(s-n);return c+U*(b-c)}function Wa(o){return String(o.toFixed(10)).split(".")[1].replace(/0+$/,"").length}function ge(o,n,s){return Math.min(Math.max(o,n),s)}function qa(o,n){return(o%n+n)%n}let Xe=I("txt");class hu{constructor(n,s){this.onChange_=this.onChange_.bind(this),this.props_=s.props,this.props_.emitter.on("change",this.onChange_),this.element=n.createElement("div"),this.element.classList.add(Xe(),Xe(void 0,"num")),s.arrayPosition&&this.element.classList.add(Xe(void 0,s.arrayPosition)),s.viewProps.bindClassModifiers(this.element);let c=n.createElement("input");c.classList.add(Xe("i")),c.type="text",s.viewProps.bindDisabled(c),this.element.appendChild(c),this.inputElement=c,this.onDraggingChange_=this.onDraggingChange_.bind(this),this.dragging_=s.dragging,this.dragging_.emitter.on("change",this.onDraggingChange_),this.element.classList.add(Xe()),this.inputElement.classList.add(Xe("i"));let b=n.createElement("div");b.classList.add(Xe("k")),this.element.appendChild(b),this.knobElement=b;let U=n.createElementNS(Lt,"svg");U.classList.add(Xe("g")),this.knobElement.appendChild(U);let V=n.createElementNS(Lt,"path");V.classList.add(Xe("gb")),U.appendChild(V),this.guideBodyElem_=V;let pt=n.createElementNS(Lt,"path");pt.classList.add(Xe("gh")),U.appendChild(pt),this.guideHeadElem_=pt;let At=n.createElement("div");At.classList.add(I("tt")()),this.knobElement.appendChild(At),this.tooltipElem_=At,s.value.emitter.on("change",this.onChange_),this.value=s.value,this.refresh()}onDraggingChange_(n){if(n.rawValue===null){this.element.classList.remove(Xe(void 0,"drg"));return}this.element.classList.add(Xe(void 0,"drg"));let s=n.rawValue/this.props_.get("draggingScale"),c=s+(s>0?-1:s<0?1:0),b=ge(-c,-4,4);this.guideHeadElem_.setAttributeNS(null,"d",[`M ${c+b},0 L${c},4 L${c+b},8`,`M ${s},-1 L${s},9`].join(" ")),this.guideBodyElem_.setAttributeNS(null,"d",`M 0,4 L${s},4`);let U=this.props_.get("formatter");this.tooltipElem_.textContent=U(this.value.rawValue),this.tooltipElem_.style.left=`${s}px`}refresh(){let n=this.props_.get("formatter");this.inputElement.value=n(this.value.rawValue)}onChange_(){this.refresh()}}class us{constructor(n,s){var c;this.originRawValue_=0,this.onInputChange_=this.onInputChange_.bind(this),this.onInputKeyDown_=this.onInputKeyDown_.bind(this),this.onInputKeyUp_=this.onInputKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.baseStep_=s.baseStep,this.parser_=s.parser,this.props=s.props,this.sliderProps_=(c=s.sliderProps)!==null&&c!==void 0?c:null,this.value=s.value,this.viewProps=s.viewProps,this.dragging_=X(null),this.view=new hu(n,{arrayPosition:s.arrayPosition,dragging:this.dragging_,props:this.props,value:this.value,viewProps:this.viewProps}),this.view.inputElement.addEventListener("change",this.onInputChange_),this.view.inputElement.addEventListener("keydown",this.onInputKeyDown_),this.view.inputElement.addEventListener("keyup",this.onInputKeyUp_);let b=new qn(this.view.knobElement);b.emitter.on("down",this.onPointerDown_),b.emitter.on("move",this.onPointerMove_),b.emitter.on("up",this.onPointerUp_)}constrainValue_(n){var s,c;let b=(s=this.sliderProps_)===null||s===void 0?void 0:s.get("minValue"),U=(c=this.sliderProps_)===null||c===void 0?void 0:c.get("maxValue"),V=n;return b!==void 0&&(V=Math.max(V,b)),U!==void 0&&(V=Math.min(V,U)),V}onInputChange_(n){let c=n.currentTarget.value,b=this.parser_(c);d(b)||(this.value.rawValue=this.constrainValue_(b)),this.view.refresh()}onInputKeyDown_(n){let s=ke(this.baseStep_,hs(n));s!==0&&this.value.setRawValue(this.constrainValue_(this.value.rawValue+s),{forceEmit:!1,last:!1})}onInputKeyUp_(n){ke(this.baseStep_,hs(n))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}onPointerDown_(){this.originRawValue_=this.value.rawValue,this.dragging_.rawValue=0}computeDraggingValue_(n){if(!n.point)return null;let s=n.point.x-n.bounds.width/2;return this.constrainValue_(this.originRawValue_+s*this.props.get("draggingScale"))}onPointerMove_(n){let s=this.computeDraggingValue_(n.data);s!==null&&(this.value.setRawValue(s,{forceEmit:!1,last:!1}),this.dragging_.rawValue=this.value.rawValue-this.originRawValue_)}onPointerUp_(n){let s=this.computeDraggingValue_(n.data);s!==null&&(this.value.setRawValue(s,{forceEmit:!0,last:!0}),this.dragging_.rawValue=null)}}let Xr=I("sld");class uu{constructor(n,s){this.onChange_=this.onChange_.bind(this),this.props_=s.props,this.props_.emitter.on("change",this.onChange_),this.element=n.createElement("div"),this.element.classList.add(Xr()),s.viewProps.bindClassModifiers(this.element);let c=n.createElement("div");c.classList.add(Xr("t")),s.viewProps.bindTabIndex(c),this.element.appendChild(c),this.trackElement=c;let b=n.createElement("div");b.classList.add(Xr("k")),this.trackElement.appendChild(b),this.knobElement=b,s.value.emitter.on("change",this.onChange_),this.value=s.value,this.update_()}update_(){let n=ge(he(this.value.rawValue,this.props_.get("minValue"),this.props_.get("maxValue"),0,100),0,100);this.knobElement.style.width=`${n}%`}onChange_(){this.update_()}}class du{constructor(n,s){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDownOrMove_=this.onPointerDownOrMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.baseStep_=s.baseStep,this.value=s.value,this.viewProps=s.viewProps,this.props=s.props,this.view=new uu(n,{props:this.props,value:this.value,viewProps:this.viewProps}),this.ptHandler_=new qn(this.view.trackElement),this.ptHandler_.emitter.on("down",this.onPointerDownOrMove_),this.ptHandler_.emitter.on("move",this.onPointerDownOrMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.trackElement.addEventListener("keydown",this.onKeyDown_),this.view.trackElement.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(n,s){n.point&&this.value.setRawValue(he(ge(n.point.x,0,n.bounds.width),0,n.bounds.width,this.props.get("minValue"),this.props.get("maxValue")),s)}onPointerDownOrMove_(n){this.handlePointerEvent_(n.data,{forceEmit:!1,last:!1})}onPointerUp_(n){this.handlePointerEvent_(n.data,{forceEmit:!0,last:!0})}onKeyDown_(n){let s=ke(this.baseStep_,mn(n));s!==0&&this.value.setRawValue(this.value.rawValue+s,{forceEmit:!1,last:!1})}onKeyUp_(n){ke(this.baseStep_,mn(n))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}let Yr=I("sldtxt");class pu{constructor(n,s){this.element=n.createElement("div"),this.element.classList.add(Yr());let c=n.createElement("div");c.classList.add(Yr("s")),this.sliderView_=s.sliderView,c.appendChild(this.sliderView_.element),this.element.appendChild(c);let b=n.createElement("div");b.classList.add(Yr("t")),this.textView_=s.textView,b.appendChild(this.textView_.element),this.element.appendChild(b)}}class $r{constructor(n,s){this.value=s.value,this.viewProps=s.viewProps,this.sliderC_=new du(n,{baseStep:s.baseStep,props:s.sliderProps,value:s.value,viewProps:this.viewProps}),this.textC_=new us(n,{baseStep:s.baseStep,parser:s.parser,props:s.textProps,sliderProps:s.sliderProps,value:s.value,viewProps:s.viewProps}),this.view=new pu(n,{sliderView:this.sliderC_.view,textView:this.textC_.view})}get sliderController(){return this.sliderC_}get textController(){return this.textC_}}function ds(o,n){o.write(n)}function Fs(o){let n=ut;if(Array.isArray(o))return n.required.array(n.required.object({text:n.required.string,value:n.required.raw}))(o).value;if(typeof o=="object")return n.required.raw(o).value}function Xa(o){if(o==="inline"||o==="popup")return o}function Ln(o){let n=ut;return n.required.object({max:n.optional.number,min:n.optional.number,step:n.optional.number})(o).value}function Ya(o){if(Array.isArray(o))return o;let n=[];return Object.keys(o).forEach(s=>{n.push({text:s,value:o[s]})}),n}function jr(o){return d(o)?null:new rs(Ya(o))}function fu(o){let n=o?pn(o,Ns):null;return n?n.step:null}function Vs(o,n){let s=o&&pn(o,Ns);return s?Wa(s.step):Math.max(Wa(n),2)}function vi(o){let n=fu(o);return n??1}function _i(o,n){var s;let c=o&&pn(o,Ns),b=Math.abs((s=c?.step)!==null&&s!==void 0?s:n);return b===0?.1:Math.pow(10,Math.floor(Math.log10(b))-1)}let zs=I("ckb");class mu{constructor(n,s){this.onValueChange_=this.onValueChange_.bind(this),this.element=n.createElement("div"),this.element.classList.add(zs()),s.viewProps.bindClassModifiers(this.element);let c=n.createElement("label");c.classList.add(zs("l")),this.element.appendChild(c);let b=n.createElement("input");b.classList.add(zs("i")),b.type="checkbox",c.appendChild(b),this.inputElement=b,s.viewProps.bindDisabled(this.inputElement);let U=n.createElement("div");U.classList.add(zs("w")),c.appendChild(U);let V=R(n,"check");U.appendChild(V),s.value.emitter.on("change",this.onValueChange_),this.value=s.value,this.update_()}update_(){this.inputElement.checked=this.value.rawValue}onValueChange_(){this.update_()}}class gu{constructor(n,s){this.onInputChange_=this.onInputChange_.bind(this),this.value=s.value,this.viewProps=s.viewProps,this.view=new mu(n,{value:this.value,viewProps:this.viewProps}),this.view.inputElement.addEventListener("change",this.onInputChange_)}onInputChange_(n){let s=n.currentTarget;this.value.rawValue=s.checked}}function vu(o){let n=[],s=jr(o.options);return s&&n.push(s),new ss(n)}let _u={id:"input-bool",type:"input",accept:(o,n)=>{if(typeof o!="boolean")return null;let c=j(n,{options:ut.optional.custom(Fs)});return c?{initialValue:o,params:c}:null},binding:{reader:o=>ka,constraint:o=>vu(o.params),writer:o=>ds},controller:o=>{let n=o.document,s=o.value,c=o.constraint,b=c&&pn(c,rs);return b?new os(n,{props:new J({options:b.values.value("options")}),value:s,viewProps:o.viewProps}):new gu(n,{value:s,viewProps:o.viewProps})}},Xn=I("col");class bu{constructor(n,s){this.element=n.createElement("div"),this.element.classList.add(Xn()),s.foldable.bindExpandedClass(this.element,Xn(void 0,"expanded")),F(s.foldable,"completed",W(this.element,Xn(void 0,"cpl")));let c=n.createElement("div");c.classList.add(Xn("h")),this.element.appendChild(c);let b=n.createElement("div");b.classList.add(Xn("s")),c.appendChild(b),this.swatchElement=b;let U=n.createElement("div");if(U.classList.add(Xn("t")),c.appendChild(U),this.textElement=U,s.pickerLayout==="inline"){let V=n.createElement("div");V.classList.add(Xn("p")),this.element.appendChild(V),this.pickerElement=V}else this.pickerElement=null}}function xu(o,n,s){let c=ge(o/255,0,1),b=ge(n/255,0,1),U=ge(s/255,0,1),V=Math.max(c,b,U),pt=Math.min(c,b,U),At=V-pt,Dt=0,$t=0,Zt=(pt+V)/2;return At!==0&&($t=At/(1-Math.abs(V+pt-1)),c===V?Dt=(b-U)/At:b===V?Dt=2+(U-c)/At:Dt=4+(c-b)/At,Dt=Dt/6+(Dt<0?1:0)),[Dt*360,$t*100,Zt*100]}function yu(o,n,s){let c=(o%360+360)%360,b=ge(n/100,0,1),U=ge(s/100,0,1),V=(1-Math.abs(2*U-1))*b,pt=V*(1-Math.abs(c/60%2-1)),At=U-V/2,Dt,$t,Zt;return c>=0&&c<60?[Dt,$t,Zt]=[V,pt,0]:c>=60&&c<120?[Dt,$t,Zt]=[pt,V,0]:c>=120&&c<180?[Dt,$t,Zt]=[0,V,pt]:c>=180&&c<240?[Dt,$t,Zt]=[0,pt,V]:c>=240&&c<300?[Dt,$t,Zt]=[pt,0,V]:[Dt,$t,Zt]=[V,0,pt],[(Dt+At)*255,($t+At)*255,(Zt+At)*255]}function wu(o,n,s){let c=ge(o/255,0,1),b=ge(n/255,0,1),U=ge(s/255,0,1),V=Math.max(c,b,U),pt=Math.min(c,b,U),At=V-pt,Dt;At===0?Dt=0:V===c?Dt=60*(((b-U)/At%6+6)%6):V===b?Dt=60*((U-c)/At+2):Dt=60*((c-b)/At+4);let $t=V===0?0:At/V,Zt=V;return[Dt,$t*100,Zt*100]}function $a(o,n,s){let c=qa(o,360),b=ge(n/100,0,1),U=ge(s/100,0,1),V=U*b,pt=V*(1-Math.abs(c/60%2-1)),At=U-V,Dt,$t,Zt;return c>=0&&c<60?[Dt,$t,Zt]=[V,pt,0]:c>=60&&c<120?[Dt,$t,Zt]=[pt,V,0]:c>=120&&c<180?[Dt,$t,Zt]=[0,V,pt]:c>=180&&c<240?[Dt,$t,Zt]=[0,pt,V]:c>=240&&c<300?[Dt,$t,Zt]=[pt,0,V]:[Dt,$t,Zt]=[V,0,pt],[(Dt+At)*255,($t+At)*255,(Zt+At)*255]}function Mu(o,n,s){let c=s+n*(100-Math.abs(2*s-100))/200;return[o,c!==0?n*(100-Math.abs(2*s-100))/c:0,s+n*(100-Math.abs(2*s-100))/(2*100)]}function Su(o,n,s){let c=100-Math.abs(s*(200-n)/100-100);return[o,c!==0?n*s/c:0,s*(200-n)/(2*100)]}function Yn(o){return[o[0],o[1],o[2]]}function ja(o,n){return[o[0],o[1],o[2],n]}let Eu={hsl:{hsl:(o,n,s)=>[o,n,s],hsv:Mu,rgb:yu},hsv:{hsl:Su,hsv:(o,n,s)=>[o,n,s],rgb:$a},rgb:{hsl:xu,hsv:wu,rgb:(o,n,s)=>[o,n,s]}};function Bs(o,n){return[n==="float"?1:o==="rgb"?255:360,n==="float"?1:o==="rgb"?255:100,n==="float"?1:o==="rgb"?255:100]}function Cu(o,n){return o===n?n:qa(o,n)}function Au(o,n,s){var c;let b=Bs(n,s);return[n==="rgb"?ge(o[0],0,b[0]):Cu(o[0],b[0]),ge(o[1],0,b[1]),ge(o[2],0,b[2]),ge((c=o[3])!==null&&c!==void 0?c:1,0,1)]}function Za(o,n,s,c){let b=Bs(n,s),U=Bs(n,c);return o.map((V,pt)=>V/b[pt]*U[pt])}function Tu(o,n,s){let c=Za(o,n.mode,n.type,"int"),b=Eu[n.mode][s.mode](...c);return Za(b,s.mode,"int",s.type)}function Hs(o,n){return typeof o!="object"||d(o)?!1:n in o&&typeof o[n]=="number"}class qt{static black(n="int"){return new qt([0,0,0],"rgb",n)}static fromObject(n,s="int"){let c="a"in n?[n.r,n.g,n.b,n.a]:[n.r,n.g,n.b];return new qt(c,"rgb",s)}static toRgbaObject(n,s="int"){return n.toRgbaObject(s)}static isRgbColorObject(n){return Hs(n,"r")&&Hs(n,"g")&&Hs(n,"b")}static isRgbaColorObject(n){return this.isRgbColorObject(n)&&Hs(n,"a")}static isColorObject(n){return this.isRgbColorObject(n)}static equals(n,s){if(n.mode!==s.mode)return!1;let c=n.comps_,b=s.comps_;for(let U=0;U<c.length;U++)if(c[U]!==b[U])return!1;return!0}constructor(n,s,c="int"){this.mode=s,this.type=c,this.comps_=Au(n,s,c)}getComponents(n,s="int"){return ja(Tu(Yn(this.comps_),{mode:this.mode,type:this.type},{mode:n??this.mode,type:s}),this.comps_[3])}toRgbaObject(n="int"){let s=this.getComponents("rgb",n);return{r:s[0],g:s[1],b:s[2],a:s[3]}}}let Rn=I("colp");class Pu{constructor(n,s){this.alphaViews_=null,this.element=n.createElement("div"),this.element.classList.add(Rn()),s.viewProps.bindClassModifiers(this.element);let c=n.createElement("div");c.classList.add(Rn("hsv"));let b=n.createElement("div");b.classList.add(Rn("sv")),this.svPaletteView_=s.svPaletteView,b.appendChild(this.svPaletteView_.element),c.appendChild(b);let U=n.createElement("div");U.classList.add(Rn("h")),this.hPaletteView_=s.hPaletteView,U.appendChild(this.hPaletteView_.element),c.appendChild(U),this.element.appendChild(c);let V=n.createElement("div");if(V.classList.add(Rn("rgb")),this.textView_=s.textView,V.appendChild(this.textView_.element),this.element.appendChild(V),s.alphaViews){this.alphaViews_={palette:s.alphaViews.palette,text:s.alphaViews.text};let pt=n.createElement("div");pt.classList.add(Rn("a"));let At=n.createElement("div");At.classList.add(Rn("ap")),At.appendChild(this.alphaViews_.palette.element),pt.appendChild(At);let Dt=n.createElement("div");Dt.classList.add(Rn("at")),Dt.appendChild(this.alphaViews_.text.element),pt.appendChild(Dt),this.element.appendChild(pt)}}get allFocusableElements(){let n=[this.svPaletteView_.element,this.hPaletteView_.element,this.textView_.modeSelectElement,...this.textView_.textViews.map(s=>s.inputElement)];return this.alphaViews_&&n.push(this.alphaViews_.palette.element,this.alphaViews_.text.inputElement),n}}function Lu(o){return o==="int"?"int":o==="float"?"float":void 0}function Zr(o){let n=ut;return j(o,{alpha:n.optional.boolean,color:n.optional.object({alpha:n.optional.boolean,type:n.optional.custom(Lu)}),expanded:n.optional.boolean,picker:n.optional.custom(Xa)})}function $n(o){return o?.1:1}function jn(o){var n;return(n=o.color)===null||n===void 0?void 0:n.type}function Ru(o,n){return o.alpha===n.alpha&&o.mode===n.mode&&o.notation===n.notation&&o.type===n.type}function Ye(o,n){let s=o.match(/^(.+)%$/);return Math.min(s?parseFloat(s[1])*.01*n:parseFloat(o),n)}let Iu={deg:o=>o,grad:o=>o*360/400,rad:o=>o*360/(2*Math.PI),turn:o=>o*360};function Ka(o){let n=o.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);if(!n)return parseFloat(o);let s=parseFloat(n[1]),c=n[2];return Iu[c](s)}function Ja(o){let n=o.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!n)return null;let s=[Ye(n[1],255),Ye(n[2],255),Ye(n[3],255)];return isNaN(s[0])||isNaN(s[1])||isNaN(s[2])?null:s}function Qa(o){return n=>{let s=Ja(n);return s?new qt(s,"rgb",o):null}}function tl(o){let n=o.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!n)return null;let s=[Ye(n[1],255),Ye(n[2],255),Ye(n[3],255),Ye(n[4],1)];return isNaN(s[0])||isNaN(s[1])||isNaN(s[2])||isNaN(s[3])?null:s}function el(o){return n=>{let s=tl(n);return s?new qt(s,"rgb",o):null}}function nl(o){let n=o.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!n)return null;let s=[Ka(n[1]),Ye(n[2],100),Ye(n[3],100)];return isNaN(s[0])||isNaN(s[1])||isNaN(s[2])?null:s}function il(o){return n=>{let s=nl(n);return s?new qt(s,"hsl",o):null}}function sl(o){let n=o.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!n)return null;let s=[Ka(n[1]),Ye(n[2],100),Ye(n[3],100),Ye(n[4],1)];return isNaN(s[0])||isNaN(s[1])||isNaN(s[2])||isNaN(s[3])?null:s}function rl(o){return n=>{let s=sl(n);return s?new qt(s,"hsl",o):null}}function ol(o){let n=o.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);if(n)return[parseInt(n[1]+n[1],16),parseInt(n[2]+n[2],16),parseInt(n[3]+n[3],16)];let s=o.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);return s?[parseInt(s[1],16),parseInt(s[2],16),parseInt(s[3],16)]:null}function Du(o){let n=ol(o);return n?new qt(n,"rgb","int"):null}function al(o){let n=o.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);if(n)return[parseInt(n[1]+n[1],16),parseInt(n[2]+n[2],16),parseInt(n[3]+n[3],16),he(parseInt(n[4]+n[4],16),0,255,0,1)];let s=o.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);return s?[parseInt(s[1],16),parseInt(s[2],16),parseInt(s[3],16),he(parseInt(s[4],16),0,255,0,1)]:null}function Uu(o){let n=al(o);return n?new qt(n,"rgb","int"):null}function ll(o){let n=o.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);if(!n)return null;let s=[parseFloat(n[1]),parseFloat(n[2]),parseFloat(n[3])];return isNaN(s[0])||isNaN(s[1])||isNaN(s[2])?null:s}function cl(o){return n=>{let s=ll(n);return s?new qt(s,"rgb",o):null}}function hl(o){let n=o.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*a\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);if(!n)return null;let s=[parseFloat(n[1]),parseFloat(n[2]),parseFloat(n[3]),parseFloat(n[4])];return isNaN(s[0])||isNaN(s[1])||isNaN(s[2])||isNaN(s[3])?null:s}function ul(o){return n=>{let s=hl(n);return s?new qt(s,"rgb",o):null}}let Nu=[{parser:ol,result:{alpha:!1,mode:"rgb",notation:"hex"}},{parser:al,result:{alpha:!0,mode:"rgb",notation:"hex"}},{parser:Ja,result:{alpha:!1,mode:"rgb",notation:"func"}},{parser:tl,result:{alpha:!0,mode:"rgb",notation:"func"}},{parser:nl,result:{alpha:!1,mode:"hsl",notation:"func"}},{parser:sl,result:{alpha:!0,mode:"hsl",notation:"func"}},{parser:ll,result:{alpha:!1,mode:"rgb",notation:"object"}},{parser:hl,result:{alpha:!0,mode:"rgb",notation:"object"}}];function ku(o){return Nu.reduce((n,{parser:s,result:c})=>n||(s(o)?c:null),null)}function Kr(o,n="int"){let s=ku(o);return s?s.notation==="hex"&&n!=="float"?Object.assign(Object.assign({},s),{type:"int"}):s.notation==="func"?Object.assign(Object.assign({},s),{type:n}):null:null}let dl={int:[Du,Uu,Qa("int"),el("int"),il("int"),rl("int"),cl("int"),ul("int")],float:[Qa("float"),el("float"),il("float"),rl("float"),cl("float"),ul("float")]};function Ou(o){let n=dl[o];return s=>{if(typeof s!="string")return qt.black(o);let c=n.reduce((b,U)=>b||U(s),null);return c??qt.black(o)}}function Jr(o){let n=dl[o];return s=>n.reduce((c,b)=>c||b(s),null)}function pl(o){let n=ge(Math.floor(o),0,255).toString(16);return n.length===1?`0${n}`:n}function fl(o,n="#"){let s=Yn(o.getComponents("rgb")).map(pl).join("");return`${n}${s}`}function Qr(o,n="#"){let s=o.getComponents("rgb"),c=[s[0],s[1],s[2],s[3]*255].map(pl).join("");return`${n}${c}`}function ml(o,n){let s=Me(n==="float"?2:0);return`rgb(${Yn(o.getComponents("rgb",n)).map(b=>s(b)).join(", ")})`}function Fu(o){return n=>ml(n,o)}function Gs(o,n){let s=Me(2),c=Me(n==="float"?2:0);return`rgba(${o.getComponents("rgb",n).map((U,V)=>(V===3?s:c)(U)).join(", ")})`}function Vu(o){return n=>Gs(n,o)}function zu(o){let n=[Me(0),Os,Os];return`hsl(${Yn(o.getComponents("hsl")).map((c,b)=>n[b](c)).join(", ")})`}function Bu(o){let n=[Me(0),Os,Os,Me(2)];return`hsla(${o.getComponents("hsl").map((c,b)=>n[b](c)).join(", ")})`}function gl(o,n){let s=Me(n==="float"?2:0),c=["r","g","b"];return`{${Yn(o.getComponents("rgb",n)).map((U,V)=>`${c[V]}: ${s(U)}`).join(", ")}}`}function Hu(o){return n=>gl(n,o)}function vl(o,n){let s=Me(2),c=Me(n==="float"?2:0),b=["r","g","b","a"];return`{${o.getComponents("rgb",n).map((V,pt)=>{let At=pt===3?s:c;return`${b[pt]}: ${At(V)}`}).join(", ")}}`}function Gu(o){return n=>vl(n,o)}let Wu=[{format:{alpha:!1,mode:"rgb",notation:"hex",type:"int"},stringifier:fl},{format:{alpha:!0,mode:"rgb",notation:"hex",type:"int"},stringifier:Qr},{format:{alpha:!1,mode:"hsl",notation:"func",type:"int"},stringifier:zu},{format:{alpha:!0,mode:"hsl",notation:"func",type:"int"},stringifier:Bu},...["int","float"].reduce((o,n)=>[...o,{format:{alpha:!1,mode:"rgb",notation:"func",type:n},stringifier:Fu(n)},{format:{alpha:!0,mode:"rgb",notation:"func",type:n},stringifier:Vu(n)},{format:{alpha:!1,mode:"rgb",notation:"object",type:n},stringifier:Hu(n)},{format:{alpha:!0,mode:"rgb",notation:"object",type:n},stringifier:Gu(n)}],[])];function to(o){return Wu.reduce((n,s)=>n||(Ru(s.format,o)?s.stringifier:null),null)}let ps=I("apl");class qu{constructor(n,s){this.onValueChange_=this.onValueChange_.bind(this),this.value=s.value,this.value.emitter.on("change",this.onValueChange_),this.element=n.createElement("div"),this.element.classList.add(ps()),s.viewProps.bindClassModifiers(this.element),s.viewProps.bindTabIndex(this.element);let c=n.createElement("div");c.classList.add(ps("b")),this.element.appendChild(c);let b=n.createElement("div");b.classList.add(ps("c")),c.appendChild(b),this.colorElem_=b;let U=n.createElement("div");U.classList.add(ps("m")),this.element.appendChild(U),this.markerElem_=U;let V=n.createElement("div");V.classList.add(ps("p")),this.markerElem_.appendChild(V),this.previewElem_=V,this.update_()}update_(){let n=this.value.rawValue,s=n.getComponents("rgb"),c=new qt([s[0],s[1],s[2],0],"rgb"),b=new qt([s[0],s[1],s[2],255],"rgb"),U=["to right",Gs(c),Gs(b)];this.colorElem_.style.background=`linear-gradient(${U.join(",")})`,this.previewElem_.style.backgroundColor=Gs(n);let V=he(s[3],0,1,0,100);this.markerElem_.style.left=`${V}%`}onValueChange_(){this.update_()}}class Xu{constructor(n,s){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=s.value,this.viewProps=s.viewProps,this.view=new qu(n,{value:this.value,viewProps:this.viewProps}),this.ptHandler_=new qn(this.view.element),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.element.addEventListener("keydown",this.onKeyDown_),this.view.element.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(n,s){if(!n.point)return;let c=n.point.x/n.bounds.width,b=this.value.rawValue,[U,V,pt]=b.getComponents("hsv");this.value.setRawValue(new qt([U,V,pt,c],"hsv"),s)}onPointerDown_(n){this.handlePointerEvent_(n.data,{forceEmit:!1,last:!1})}onPointerMove_(n){this.handlePointerEvent_(n.data,{forceEmit:!1,last:!1})}onPointerUp_(n){this.handlePointerEvent_(n.data,{forceEmit:!0,last:!0})}onKeyDown_(n){let s=ke($n(!0),mn(n));if(s===0)return;let c=this.value.rawValue,[b,U,V,pt]=c.getComponents("hsv");this.value.setRawValue(new qt([b,U,V,pt+s],"hsv"),{forceEmit:!1,last:!1})}onKeyUp_(n){ke($n(!0),mn(n))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}let bi=I("coltxt");function Yu(o){let n=o.createElement("select"),s=[{text:"RGB",value:"rgb"},{text:"HSL",value:"hsl"},{text:"HSV",value:"hsv"}];return n.appendChild(s.reduce((c,b)=>{let U=o.createElement("option");return U.textContent=b.text,U.value=b.value,c.appendChild(U),c},o.createDocumentFragment())),n}class $u{constructor(n,s){this.element=n.createElement("div"),this.element.classList.add(bi()),s.viewProps.bindClassModifiers(this.element);let c=n.createElement("div");c.classList.add(bi("m")),this.modeElem_=Yu(n),this.modeElem_.classList.add(bi("ms")),c.appendChild(this.modeSelectElement),s.viewProps.bindDisabled(this.modeElem_);let b=n.createElement("div");b.classList.add(bi("mm")),b.appendChild(R(n,"dropdown")),c.appendChild(b),this.element.appendChild(c);let U=n.createElement("div");U.classList.add(bi("w")),this.element.appendChild(U),this.textsElem_=U,this.textViews_=s.textViews,this.applyTextViews_(),P(s.colorMode,V=>{this.modeElem_.value=V})}get modeSelectElement(){return this.modeElem_}get textViews(){return this.textViews_}set textViews(n){this.textViews_=n,this.applyTextViews_()}applyTextViews_(){k(this.textsElem_);let n=this.element.ownerDocument;this.textViews_.forEach(s=>{let c=n.createElement("div");c.classList.add(bi("c")),c.appendChild(s.element),this.textsElem_.appendChild(c)})}}function ju(o){return Me(o==="float"?2:0)}function Zu(o,n,s){let c=Bs(o,n)[s];return new gi({min:0,max:c})}function eo(o,n,s){return new us(o,{arrayPosition:s===0?"fst":s===3-1?"lst":"mid",baseStep:$n(!1),parser:n.parser,props:J.fromObject({draggingScale:n.colorType==="float"?.01:1,formatter:ju(n.colorType)}),value:X(0,{constraint:Zu(n.colorMode,n.colorType,s)}),viewProps:n.viewProps})}class Ku{constructor(n,s){this.onModeSelectChange_=this.onModeSelectChange_.bind(this),this.colorType_=s.colorType,this.parser_=s.parser,this.value=s.value,this.viewProps=s.viewProps,this.colorMode=X(this.value.rawValue.mode),this.ccs_=this.createComponentControllers_(n),this.view=new $u(n,{colorMode:this.colorMode,textViews:[this.ccs_[0].view,this.ccs_[1].view,this.ccs_[2].view],viewProps:this.viewProps}),this.view.modeSelectElement.addEventListener("change",this.onModeSelectChange_)}createComponentControllers_(n){let s={colorMode:this.colorMode.rawValue,colorType:this.colorType_,parser:this.parser_,viewProps:this.viewProps},c=[eo(n,s,0),eo(n,s,1),eo(n,s,2)];return c.forEach((b,U)=>{cs({primary:this.value,secondary:b.value,forward:V=>V.rawValue.getComponents(this.colorMode.rawValue,this.colorType_)[U],backward:(V,pt)=>{let At=this.colorMode.rawValue,Dt=V.rawValue.getComponents(At,this.colorType_);return Dt[U]=pt.rawValue,new qt(ja(Yn(Dt),Dt[3]),At,this.colorType_)}})}),c}onModeSelectChange_(n){let s=n.currentTarget;this.colorMode.rawValue=s.value,this.ccs_=this.createComponentControllers_(this.view.element.ownerDocument),this.view.textViews=[this.ccs_[0].view,this.ccs_[1].view,this.ccs_[2].view]}}let no=I("hpl");class Ju{constructor(n,s){this.onValueChange_=this.onValueChange_.bind(this),this.value=s.value,this.value.emitter.on("change",this.onValueChange_),this.element=n.createElement("div"),this.element.classList.add(no()),s.viewProps.bindClassModifiers(this.element),s.viewProps.bindTabIndex(this.element);let c=n.createElement("div");c.classList.add(no("c")),this.element.appendChild(c);let b=n.createElement("div");b.classList.add(no("m")),this.element.appendChild(b),this.markerElem_=b,this.update_()}update_(){let n=this.value.rawValue,[s]=n.getComponents("hsv");this.markerElem_.style.backgroundColor=ml(new qt([s,100,100],"hsv"));let c=he(s,0,360,0,100);this.markerElem_.style.left=`${c}%`}onValueChange_(){this.update_()}}class Qu{constructor(n,s){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=s.value,this.viewProps=s.viewProps,this.view=new Ju(n,{value:this.value,viewProps:this.viewProps}),this.ptHandler_=new qn(this.view.element),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.element.addEventListener("keydown",this.onKeyDown_),this.view.element.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(n,s){if(!n.point)return;let c=he(ge(n.point.x,0,n.bounds.width),0,n.bounds.width,0,360),b=this.value.rawValue,[,U,V,pt]=b.getComponents("hsv");this.value.setRawValue(new qt([c,U,V,pt],"hsv"),s)}onPointerDown_(n){this.handlePointerEvent_(n.data,{forceEmit:!1,last:!1})}onPointerMove_(n){this.handlePointerEvent_(n.data,{forceEmit:!1,last:!1})}onPointerUp_(n){this.handlePointerEvent_(n.data,{forceEmit:!0,last:!0})}onKeyDown_(n){let s=ke($n(!1),mn(n));if(s===0)return;let c=this.value.rawValue,[b,U,V,pt]=c.getComponents("hsv");this.value.setRawValue(new qt([b+s,U,V,pt],"hsv"),{forceEmit:!1,last:!1})}onKeyUp_(n){ke($n(!1),mn(n))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}let io=I("svp"),_l=64;class td{constructor(n,s){this.onValueChange_=this.onValueChange_.bind(this),this.value=s.value,this.value.emitter.on("change",this.onValueChange_),this.element=n.createElement("div"),this.element.classList.add(io()),s.viewProps.bindClassModifiers(this.element),s.viewProps.bindTabIndex(this.element);let c=n.createElement("canvas");c.height=_l,c.width=_l,c.classList.add(io("c")),this.element.appendChild(c),this.canvasElement=c;let b=n.createElement("div");b.classList.add(io("m")),this.element.appendChild(b),this.markerElem_=b,this.update_()}update_(){let n=Jt(this.canvasElement);if(!n)return;let c=this.value.rawValue.getComponents("hsv"),b=this.canvasElement.width,U=this.canvasElement.height,V=n.getImageData(0,0,b,U),pt=V.data;for(let $t=0;$t<U;$t++)for(let Zt=0;Zt<b;Zt++){let Zn=he(Zt,0,b,0,100),ms=he($t,0,U,100,0),gs=$a(c[0],Zn,ms),Ws=($t*b+Zt)*4;pt[Ws]=gs[0],pt[Ws+1]=gs[1],pt[Ws+2]=gs[2],pt[Ws+3]=255}n.putImageData(V,0,0);let At=he(c[1],0,100,0,100);this.markerElem_.style.left=`${At}%`;let Dt=he(c[2],0,100,100,0);this.markerElem_.style.top=`${Dt}%`}onValueChange_(){this.update_()}}class ed{constructor(n,s){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=s.value,this.viewProps=s.viewProps,this.view=new td(n,{value:this.value,viewProps:this.viewProps}),this.ptHandler_=new qn(this.view.element),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.element.addEventListener("keydown",this.onKeyDown_),this.view.element.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(n,s){if(!n.point)return;let c=he(n.point.x,0,n.bounds.width,0,100),b=he(n.point.y,0,n.bounds.height,100,0),[U,,,V]=this.value.rawValue.getComponents("hsv");this.value.setRawValue(new qt([U,c,b,V],"hsv"),s)}onPointerDown_(n){this.handlePointerEvent_(n.data,{forceEmit:!1,last:!1})}onPointerMove_(n){this.handlePointerEvent_(n.data,{forceEmit:!1,last:!1})}onPointerUp_(n){this.handlePointerEvent_(n.data,{forceEmit:!0,last:!0})}onKeyDown_(n){Ga(n.key)&&n.preventDefault();let[s,c,b,U]=this.value.rawValue.getComponents("hsv"),V=$n(!1),pt=ke(V,mn(n)),At=ke(V,hs(n));pt===0&&At===0||this.value.setRawValue(new qt([s,c+pt,b+At,U],"hsv"),{forceEmit:!1,last:!1})}onKeyUp_(n){let s=$n(!1),c=ke(s,mn(n)),b=ke(s,hs(n));c===0&&b===0||this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}class nd{constructor(n,s){this.value=s.value,this.viewProps=s.viewProps,this.hPaletteC_=new Qu(n,{value:this.value,viewProps:this.viewProps}),this.svPaletteC_=new ed(n,{value:this.value,viewProps:this.viewProps}),this.alphaIcs_=s.supportsAlpha?{palette:new Xu(n,{value:this.value,viewProps:this.viewProps}),text:new us(n,{parser:fn,baseStep:.1,props:J.fromObject({draggingScale:.01,formatter:Me(2)}),value:X(0,{constraint:new gi({min:0,max:1})}),viewProps:this.viewProps})}:null,this.alphaIcs_&&cs({primary:this.value,secondary:this.alphaIcs_.text.value,forward:c=>c.rawValue.getComponents()[3],backward:(c,b)=>{let U=c.rawValue.getComponents();return U[3]=b.rawValue,new qt(U,c.rawValue.mode)}}),this.textC_=new Ku(n,{colorType:s.colorType,parser:fn,value:this.value,viewProps:this.viewProps}),this.view=new Pu(n,{alphaViews:this.alphaIcs_?{palette:this.alphaIcs_.palette.view,text:this.alphaIcs_.text.view}:null,hPaletteView:this.hPaletteC_.view,supportsAlpha:s.supportsAlpha,svPaletteView:this.svPaletteC_.view,textView:this.textC_.view,viewProps:this.viewProps})}get textController(){return this.textC_}}let so=I("colsw");class id{constructor(n,s){this.onValueChange_=this.onValueChange_.bind(this),s.value.emitter.on("change",this.onValueChange_),this.value=s.value,this.element=n.createElement("div"),this.element.classList.add(so()),s.viewProps.bindClassModifiers(this.element);let c=n.createElement("div");c.classList.add(so("sw")),this.element.appendChild(c),this.swatchElem_=c;let b=n.createElement("button");b.classList.add(so("b")),s.viewProps.bindDisabled(b),this.element.appendChild(b),this.buttonElement=b,this.update_()}update_(){let n=this.value.rawValue;this.swatchElem_.style.backgroundColor=Qr(n)}onValueChange_(){this.update_()}}class sd{constructor(n,s){this.value=s.value,this.viewProps=s.viewProps,this.view=new id(n,{value:this.value,viewProps:this.viewProps})}}class ro{constructor(n,s){this.onButtonBlur_=this.onButtonBlur_.bind(this),this.onButtonClick_=this.onButtonClick_.bind(this),this.onPopupChildBlur_=this.onPopupChildBlur_.bind(this),this.onPopupChildKeydown_=this.onPopupChildKeydown_.bind(this),this.value=s.value,this.viewProps=s.viewProps,this.foldable_=wt.create(s.expanded),this.swatchC_=new sd(n,{value:this.value,viewProps:this.viewProps});let c=this.swatchC_.view.buttonElement;c.addEventListener("blur",this.onButtonBlur_),c.addEventListener("click",this.onButtonClick_),this.textC_=new ks(n,{parser:s.parser,props:J.fromObject({formatter:s.formatter}),value:this.value,viewProps:this.viewProps}),this.view=new bu(n,{foldable:this.foldable_,pickerLayout:s.pickerLayout}),this.view.swatchElement.appendChild(this.swatchC_.view.element),this.view.textElement.appendChild(this.textC_.view.element),this.popC_=s.pickerLayout==="popup"?new Ua(n,{viewProps:this.viewProps}):null;let b=new nd(n,{colorType:s.colorType,supportsAlpha:s.supportsAlpha,value:this.value,viewProps:this.viewProps});b.view.allFocusableElements.forEach(U=>{U.addEventListener("blur",this.onPopupChildBlur_),U.addEventListener("keydown",this.onPopupChildKeydown_)}),this.pickerC_=b,this.popC_?(this.view.element.appendChild(this.popC_.view.element),this.popC_.view.element.appendChild(b.view.element),cs({primary:this.foldable_.value("expanded"),secondary:this.popC_.shows,forward:U=>U.rawValue,backward:(U,V)=>V.rawValue})):this.view.pickerElement&&(this.view.pickerElement.appendChild(this.pickerC_.view.element),le(this.foldable_,this.view.pickerElement))}get textController(){return this.textC_}onButtonBlur_(n){if(!this.popC_)return;let s=this.view.element,c=n.relatedTarget;(!c||!s.contains(c))&&(this.popC_.shows.rawValue=!1)}onButtonClick_(){this.foldable_.set("expanded",!this.foldable_.get("expanded")),this.foldable_.get("expanded")&&this.pickerC_.view.allFocusableElements[0].focus()}onPopupChildBlur_(n){if(!this.popC_)return;let s=this.popC_.view.element,c=N(n);c&&s.contains(c)||c&&c===this.swatchC_.view.buttonElement&&!oe(s.ownerDocument)||(this.popC_.shows.rawValue=!1)}onPopupChildKeydown_(n){this.popC_?n.key==="Escape"&&(this.popC_.shows.rawValue=!1):this.view.pickerElement&&n.key==="Escape"&&this.swatchC_.view.buttonElement.focus()}}function rd(o,n){return qt.isColorObject(o)?qt.fromObject(o,n):qt.black(n)}function od(o){return Yn(o.getComponents("rgb")).reduce((n,s)=>n<<8|Math.floor(s)&255,0)}function ad(o){return o.getComponents("rgb").reduce((n,s,c)=>{let b=Math.floor(c===3?s*255:s)&255;return n<<8|b},0)>>>0}function ld(o){return new qt([o>>16&255,o>>8&255,o&255],"rgb")}function cd(o){return new qt([o>>24&255,o>>16&255,o>>8&255,he(o&255,0,255,0,1)],"rgb")}function hd(o){return typeof o!="number"?qt.black():ld(o)}function ud(o){return typeof o!="number"?qt.black():cd(o)}function dd(o){let n=to(o);return n?(s,c)=>{ds(s,n(c))}:null}function pd(o){let n=o?ad:od;return(s,c)=>{ds(s,n(c))}}function fd(o,n,s){let c=n.toRgbaObject(s);o.writeProperty("r",c.r),o.writeProperty("g",c.g),o.writeProperty("b",c.b),o.writeProperty("a",c.a)}function md(o,n,s){let c=n.toRgbaObject(s);o.writeProperty("r",c.r),o.writeProperty("g",c.g),o.writeProperty("b",c.b)}function gd(o,n){return(s,c)=>{o?fd(s,c,n):md(s,c,n)}}function oo(o){var n;return!!(o?.alpha||!((n=o?.color)===null||n===void 0)&&n.alpha)}function vd(o){return o?n=>Qr(n,"0x"):n=>fl(n,"0x")}function _d(o){return"color"in o||"view"in o&&o.view==="color"}let bd={id:"input-color-number",type:"input",accept:(o,n)=>{if(typeof o!="number"||!_d(n))return null;let s=Zr(n);return s?{initialValue:o,params:s}:null},binding:{reader:o=>oo(o.params)?ud:hd,equals:qt.equals,writer:o=>pd(oo(o.params))},controller:o=>{let n=oo(o.params),s="expanded"in o.params?o.params.expanded:void 0,c="picker"in o.params?o.params.picker:void 0;return new ro(o.document,{colorType:"int",expanded:s??!1,formatter:vd(n),parser:Jr("int"),pickerLayout:c??"popup",supportsAlpha:n,value:o.value,viewProps:o.viewProps})}};function xd(o){return qt.isRgbaColorObject(o)}function yd(o){return n=>rd(n,o)}function wd(o,n){return s=>o?vl(s,n):gl(s,n)}let Md={id:"input-color-object",type:"input",accept:(o,n)=>{if(!qt.isColorObject(o))return null;let s=Zr(n);return s?{initialValue:o,params:s}:null},binding:{reader:o=>yd(jn(o.params)),equals:qt.equals,writer:o=>gd(xd(o.initialValue),jn(o.params))},controller:o=>{var n;let s=qt.isRgbaColorObject(o.initialValue),c="expanded"in o.params?o.params.expanded:void 0,b="picker"in o.params?o.params.picker:void 0,U=(n=jn(o.params))!==null&&n!==void 0?n:"int";return new ro(o.document,{colorType:U,expanded:c??!1,formatter:wd(s,U),parser:Jr(U),pickerLayout:b??"popup",supportsAlpha:s,value:o.value,viewProps:o.viewProps})}},Sd={id:"input-color-string",type:"input",accept:(o,n)=>{if(typeof o!="string"||"view"in n&&n.view==="text")return null;let s=Kr(o,jn(n));if(!s||!to(s))return null;let b=Zr(n);return b?{initialValue:o,params:b}:null},binding:{reader:o=>{var n;return Ou((n=jn(o.params))!==null&&n!==void 0?n:"int")},equals:qt.equals,writer:o=>{let n=Kr(o.initialValue,jn(o.params));if(!n)throw _.shouldNeverHappen();let s=dd(n);if(!s)throw _.notBindable();return s}},controller:o=>{let n=Kr(o.initialValue,jn(o.params));if(!n)throw _.shouldNeverHappen();let s=to(n);if(!s)throw _.shouldNeverHappen();let c="expanded"in o.params?o.params.expanded:void 0,b="picker"in o.params?o.params.picker:void 0;return new ro(o.document,{colorType:n.type,expanded:c??!1,formatter:s,parser:Jr(n.type),pickerLayout:b??"popup",supportsAlpha:n.alpha,value:o.value,viewProps:o.viewProps})}};class In{constructor(n){this.components=n.components,this.asm_=n.assembly}constrain(n){let s=this.asm_.toComponents(n).map((c,b)=>{var U,V;return(V=(U=this.components[b])===null||U===void 0?void 0:U.constrain(c))!==null&&V!==void 0?V:c});return this.asm_.fromComponents(s)}}let bl=I("pndtxt");class Ed{constructor(n,s){this.textViews=s.textViews,this.element=n.createElement("div"),this.element.classList.add(bl()),this.textViews.forEach(c=>{let b=n.createElement("div");b.classList.add(bl("a")),b.appendChild(c.element),this.element.appendChild(b)})}}function Cd(o,n,s){return new us(o,{arrayPosition:s===0?"fst":s===n.axes.length-1?"lst":"mid",baseStep:n.axes[s].baseStep,parser:n.parser,props:n.axes[s].textProps,value:X(0,{constraint:n.axes[s].constraint}),viewProps:n.viewProps})}class ao{constructor(n,s){this.value=s.value,this.viewProps=s.viewProps,this.acs_=s.axes.map((c,b)=>Cd(n,s,b)),this.acs_.forEach((c,b)=>{cs({primary:this.value,secondary:c.value,forward:U=>s.assembly.toComponents(U.rawValue)[b],backward:(U,V)=>{let pt=s.assembly.toComponents(U.rawValue);return pt[b]=V.rawValue,s.assembly.fromComponents(pt)}})}),this.view=new Ed(n,{textViews:this.acs_.map(c=>c.view)})}}function xl(o,n){return"step"in o&&!d(o.step)?new Ns(o.step,n):null}function yl(o){return!d(o.max)&&!d(o.min)?new gi({max:o.max,min:o.min}):!d(o.max)||!d(o.min)?new Ia({max:o.max,min:o.min}):null}function Ad(o){let n=pn(o,gi);if(n)return[n.values.get("min"),n.values.get("max")];let s=pn(o,Ia);return s?[s.minValue,s.maxValue]:[void 0,void 0]}function Td(o,n){let s=[],c=xl(o,n);c&&s.push(c);let b=yl(o);b&&s.push(b);let U=jr(o.options);return U&&s.push(U),new ss(s)}let Pd={id:"input-number",type:"input",accept:(o,n)=>{if(typeof o!="number")return null;let s=ut,c=j(n,{format:s.optional.function,max:s.optional.number,min:s.optional.number,options:s.optional.custom(Fs),step:s.optional.number});return c?{initialValue:o,params:c}:null},binding:{reader:o=>Ba,constraint:o=>Td(o.params,o.initialValue),writer:o=>ds},controller:o=>{var n;let s=o.value,c=o.constraint,b=c&&pn(c,rs);if(b)return new os(o.document,{props:new J({options:b.values.value("options")}),value:s,viewProps:o.viewProps});let U=(n="format"in o.params?o.params.format:void 0)!==null&&n!==void 0?n:Me(Vs(c,s.rawValue)),V=c&&pn(c,gi);return V?new $r(o.document,{baseStep:vi(c),parser:fn,sliderProps:new J({maxValue:V.values.value("max"),minValue:V.values.value("min")}),textProps:J.fromObject({draggingScale:_i(c,s.rawValue),formatter:U}),value:s,viewProps:o.viewProps}):new us(o.document,{baseStep:vi(c),parser:fn,props:J.fromObject({draggingScale:_i(c,s.rawValue),formatter:U}),value:s,viewProps:o.viewProps})}};class Dn{constructor(n=0,s=0){this.x=n,this.y=s}getComponents(){return[this.x,this.y]}static isObject(n){if(d(n))return!1;let s=n.x,c=n.y;return!(typeof s!="number"||typeof c!="number")}static equals(n,s){return n.x===s.x&&n.y===s.y}toObject(){return{x:this.x,y:this.y}}}let wl={toComponents:o=>o.getComponents(),fromComponents:o=>new Dn(...o)},xi=I("p2d");class Ld{constructor(n,s){this.element=n.createElement("div"),this.element.classList.add(xi()),s.viewProps.bindClassModifiers(this.element),P(s.expanded,W(this.element,xi(void 0,"expanded")));let c=n.createElement("div");c.classList.add(xi("h")),this.element.appendChild(c);let b=n.createElement("button");b.classList.add(xi("b")),b.appendChild(R(n,"p2dpad")),s.viewProps.bindDisabled(b),c.appendChild(b),this.buttonElement=b;let U=n.createElement("div");if(U.classList.add(xi("t")),c.appendChild(U),this.textElement=U,s.pickerLayout==="inline"){let V=n.createElement("div");V.classList.add(xi("p")),this.element.appendChild(V),this.pickerElement=V}else this.pickerElement=null}}let Un=I("p2dp");class Rd{constructor(n,s){this.onFoldableChange_=this.onFoldableChange_.bind(this),this.onValueChange_=this.onValueChange_.bind(this),this.invertsY_=s.invertsY,this.maxValue_=s.maxValue,this.element=n.createElement("div"),this.element.classList.add(Un()),s.layout==="popup"&&this.element.classList.add(Un(void 0,"p")),s.viewProps.bindClassModifiers(this.element);let c=n.createElement("div");c.classList.add(Un("p")),s.viewProps.bindTabIndex(c),this.element.appendChild(c),this.padElement=c;let b=n.createElementNS(Lt,"svg");b.classList.add(Un("g")),this.padElement.appendChild(b),this.svgElem_=b;let U=n.createElementNS(Lt,"line");U.classList.add(Un("ax")),U.setAttributeNS(null,"x1","0"),U.setAttributeNS(null,"y1","50%"),U.setAttributeNS(null,"x2","100%"),U.setAttributeNS(null,"y2","50%"),this.svgElem_.appendChild(U);let V=n.createElementNS(Lt,"line");V.classList.add(Un("ax")),V.setAttributeNS(null,"x1","50%"),V.setAttributeNS(null,"y1","0"),V.setAttributeNS(null,"x2","50%"),V.setAttributeNS(null,"y2","100%"),this.svgElem_.appendChild(V);let pt=n.createElementNS(Lt,"line");pt.classList.add(Un("l")),pt.setAttributeNS(null,"x1","50%"),pt.setAttributeNS(null,"y1","50%"),this.svgElem_.appendChild(pt),this.lineElem_=pt;let At=n.createElement("div");At.classList.add(Un("m")),this.padElement.appendChild(At),this.markerElem_=At,s.value.emitter.on("change",this.onValueChange_),this.value=s.value,this.update_()}get allFocusableElements(){return[this.padElement]}update_(){let[n,s]=this.value.rawValue.getComponents(),c=this.maxValue_,b=he(n,-c,+c,0,100),U=he(s,-c,+c,0,100),V=this.invertsY_?100-U:U;this.lineElem_.setAttributeNS(null,"x2",`${b}%`),this.lineElem_.setAttributeNS(null,"y2",`${V}%`),this.markerElem_.style.left=`${b}%`,this.markerElem_.style.top=`${V}%`}onValueChange_(){this.update_()}onFoldableChange_(){this.update_()}}function Ml(o,n,s){return[ke(n[0],mn(o)),ke(n[1],hs(o))*(s?1:-1)]}class Id{constructor(n,s){this.onPadKeyDown_=this.onPadKeyDown_.bind(this),this.onPadKeyUp_=this.onPadKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=s.value,this.viewProps=s.viewProps,this.baseSteps_=s.baseSteps,this.maxValue_=s.maxValue,this.invertsY_=s.invertsY,this.view=new Rd(n,{invertsY:this.invertsY_,layout:s.layout,maxValue:this.maxValue_,value:this.value,viewProps:this.viewProps}),this.ptHandler_=new qn(this.view.padElement),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.padElement.addEventListener("keydown",this.onPadKeyDown_),this.view.padElement.addEventListener("keyup",this.onPadKeyUp_)}handlePointerEvent_(n,s){if(!n.point)return;let c=this.maxValue_,b=he(n.point.x,0,n.bounds.width,-c,+c),U=he(this.invertsY_?n.bounds.height-n.point.y:n.point.y,0,n.bounds.height,-c,+c);this.value.setRawValue(new Dn(b,U),s)}onPointerDown_(n){this.handlePointerEvent_(n.data,{forceEmit:!1,last:!1})}onPointerMove_(n){this.handlePointerEvent_(n.data,{forceEmit:!1,last:!1})}onPointerUp_(n){this.handlePointerEvent_(n.data,{forceEmit:!0,last:!0})}onPadKeyDown_(n){Ga(n.key)&&n.preventDefault();let[s,c]=Ml(n,this.baseSteps_,this.invertsY_);s===0&&c===0||this.value.setRawValue(new Dn(this.value.rawValue.x+s,this.value.rawValue.y+c),{forceEmit:!1,last:!1})}onPadKeyUp_(n){let[s,c]=Ml(n,this.baseSteps_,this.invertsY_);s===0&&c===0||this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}class Dd{constructor(n,s){var c,b;this.onPopupChildBlur_=this.onPopupChildBlur_.bind(this),this.onPopupChildKeydown_=this.onPopupChildKeydown_.bind(this),this.onPadButtonBlur_=this.onPadButtonBlur_.bind(this),this.onPadButtonClick_=this.onPadButtonClick_.bind(this),this.value=s.value,this.viewProps=s.viewProps,this.foldable_=wt.create(s.expanded),this.popC_=s.pickerLayout==="popup"?new Ua(n,{viewProps:this.viewProps}):null;let U=new Id(n,{baseSteps:[s.axes[0].baseStep,s.axes[1].baseStep],invertsY:s.invertsY,layout:s.pickerLayout,maxValue:s.maxValue,value:this.value,viewProps:this.viewProps});U.view.allFocusableElements.forEach(V=>{V.addEventListener("blur",this.onPopupChildBlur_),V.addEventListener("keydown",this.onPopupChildKeydown_)}),this.pickerC_=U,this.textC_=new ao(n,{assembly:wl,axes:s.axes,parser:s.parser,value:this.value,viewProps:this.viewProps}),this.view=new Ld(n,{expanded:this.foldable_.value("expanded"),pickerLayout:s.pickerLayout,viewProps:this.viewProps}),this.view.textElement.appendChild(this.textC_.view.element),(c=this.view.buttonElement)===null||c===void 0||c.addEventListener("blur",this.onPadButtonBlur_),(b=this.view.buttonElement)===null||b===void 0||b.addEventListener("click",this.onPadButtonClick_),this.popC_?(this.view.element.appendChild(this.popC_.view.element),this.popC_.view.element.appendChild(this.pickerC_.view.element),cs({primary:this.foldable_.value("expanded"),secondary:this.popC_.shows,forward:V=>V.rawValue,backward:(V,pt)=>pt.rawValue})):this.view.pickerElement&&(this.view.pickerElement.appendChild(this.pickerC_.view.element),le(this.foldable_,this.view.pickerElement))}onPadButtonBlur_(n){if(!this.popC_)return;let s=this.view.element,c=n.relatedTarget;(!c||!s.contains(c))&&(this.popC_.shows.rawValue=!1)}onPadButtonClick_(){this.foldable_.set("expanded",!this.foldable_.get("expanded")),this.foldable_.get("expanded")&&this.pickerC_.view.allFocusableElements[0].focus()}onPopupChildBlur_(n){if(!this.popC_)return;let s=this.popC_.view.element,c=N(n);c&&s.contains(c)||c&&c===this.view.buttonElement&&!oe(s.ownerDocument)||(this.popC_.shows.rawValue=!1)}onPopupChildKeydown_(n){this.popC_?n.key==="Escape"&&(this.popC_.shows.rawValue=!1):this.view.pickerElement&&n.key==="Escape"&&this.view.buttonElement.focus()}}class yi{constructor(n=0,s=0,c=0){this.x=n,this.y=s,this.z=c}getComponents(){return[this.x,this.y,this.z]}static isObject(n){if(d(n))return!1;let s=n.x,c=n.y,b=n.z;return!(typeof s!="number"||typeof c!="number"||typeof b!="number")}static equals(n,s){return n.x===s.x&&n.y===s.y&&n.z===s.z}toObject(){return{x:this.x,y:this.y,z:this.z}}}let Sl={toComponents:o=>o.getComponents(),fromComponents:o=>new yi(...o)};function Ud(o){return yi.isObject(o)?new yi(o.x,o.y,o.z):new yi}function Nd(o,n){o.writeProperty("x",n.x),o.writeProperty("y",n.y),o.writeProperty("z",n.z)}function kd(o,n){return new In({assembly:Sl,components:[gn("x"in o?o.x:void 0,n.x),gn("y"in o?o.y:void 0,n.y),gn("z"in o?o.z:void 0,n.z)]})}function lo(o,n){return{baseStep:vi(n),constraint:n,textProps:J.fromObject({draggingScale:_i(n,o),formatter:Me(Vs(n,o))})}}let Od={id:"input-point3d",type:"input",accept:(o,n)=>{if(!yi.isObject(o))return null;let s=ut,c=j(n,{x:s.optional.custom(Ln),y:s.optional.custom(Ln),z:s.optional.custom(Ln)});return c?{initialValue:o,params:c}:null},binding:{reader:o=>Ud,constraint:o=>kd(o.params,o.initialValue),equals:yi.equals,writer:o=>Nd},controller:o=>{let n=o.value,s=o.constraint;if(!(s instanceof In))throw _.shouldNeverHappen();return new ao(o.document,{assembly:Sl,axes:[lo(n.rawValue.x,s.components[0]),lo(n.rawValue.y,s.components[1]),lo(n.rawValue.z,s.components[2])],parser:fn,value:n,viewProps:o.viewProps})}};class wi{constructor(n=0,s=0,c=0,b=0){this.x=n,this.y=s,this.z=c,this.w=b}getComponents(){return[this.x,this.y,this.z,this.w]}static isObject(n){if(d(n))return!1;let s=n.x,c=n.y,b=n.z,U=n.w;return!(typeof s!="number"||typeof c!="number"||typeof b!="number"||typeof U!="number")}static equals(n,s){return n.x===s.x&&n.y===s.y&&n.z===s.z&&n.w===s.w}toObject(){return{x:this.x,y:this.y,z:this.z,w:this.w}}}let El={toComponents:o=>o.getComponents(),fromComponents:o=>new wi(...o)};function Fd(o){return wi.isObject(o)?new wi(o.x,o.y,o.z,o.w):new wi}function Vd(o,n){o.writeProperty("x",n.x),o.writeProperty("y",n.y),o.writeProperty("z",n.z),o.writeProperty("w",n.w)}function zd(o,n){return new In({assembly:El,components:[gn("x"in o?o.x:void 0,n.x),gn("y"in o?o.y:void 0,n.y),gn("z"in o?o.z:void 0,n.z),gn("w"in o?o.w:void 0,n.w)]})}function Bd(o,n){return{baseStep:vi(n),constraint:n,textProps:J.fromObject({draggingScale:_i(n,o),formatter:Me(Vs(n,o))})}}let Hd={id:"input-point4d",type:"input",accept:(o,n)=>{if(!wi.isObject(o))return null;let s=ut,c=j(n,{x:s.optional.custom(Ln),y:s.optional.custom(Ln),z:s.optional.custom(Ln),w:s.optional.custom(Ln)});return c?{initialValue:o,params:c}:null},binding:{reader:o=>Fd,constraint:o=>zd(o.params,o.initialValue),equals:wi.equals,writer:o=>Vd},controller:o=>{let n=o.value,s=o.constraint;if(!(s instanceof In))throw _.shouldNeverHappen();return new ao(o.document,{assembly:El,axes:n.rawValue.getComponents().map((c,b)=>Bd(c,s.components[b])),parser:fn,value:n,viewProps:o.viewProps})}};function Gd(o){let n=[],s=jr(o.options);return s&&n.push(s),new ss(n)}let Wd={id:"input-string",type:"input",accept:(o,n)=>{if(typeof o!="string")return null;let c=j(n,{options:ut.optional.custom(Fs)});return c?{initialValue:o,params:c}:null},binding:{reader:o=>Ha,constraint:o=>Gd(o.params),writer:o=>ds},controller:o=>{let n=o.document,s=o.value,c=o.constraint,b=c&&pn(c,rs);return b?new os(n,{props:new J({options:b.values.value("options")}),value:s,viewProps:o.viewProps}):new ks(n,{parser:U=>U,props:J.fromObject({formatter:Wr}),value:s,viewProps:o.viewProps})}},fs={monitor:{defaultInterval:200,defaultLineCount:3}},Cl=I("mll");class qd{constructor(n,s){this.onValueUpdate_=this.onValueUpdate_.bind(this),this.formatter_=s.formatter,this.element=n.createElement("div"),this.element.classList.add(Cl()),s.viewProps.bindClassModifiers(this.element);let c=n.createElement("textarea");c.classList.add(Cl("i")),c.style.height=`calc(var(--bld-us) * ${s.lineCount})`,c.readOnly=!0,s.viewProps.bindDisabled(c),this.element.appendChild(c),this.textareaElem_=c,s.value.emitter.on("change",this.onValueUpdate_),this.value=s.value,this.update_()}update_(){let n=this.textareaElem_,s=n.scrollTop===n.scrollHeight-n.clientHeight,c=[];this.value.rawValue.forEach(b=>{b!==void 0&&c.push(this.formatter_(b))}),n.textContent=c.join(`
`),s&&(n.scrollTop=n.scrollHeight)}onValueUpdate_(){this.update_()}}class co{constructor(n,s){this.value=s.value,this.viewProps=s.viewProps,this.view=new qd(n,{formatter:s.formatter,lineCount:s.lineCount,value:this.value,viewProps:this.viewProps})}}let Al=I("sgl");class Xd{constructor(n,s){this.onValueUpdate_=this.onValueUpdate_.bind(this),this.formatter_=s.formatter,this.element=n.createElement("div"),this.element.classList.add(Al()),s.viewProps.bindClassModifiers(this.element);let c=n.createElement("input");c.classList.add(Al("i")),c.readOnly=!0,c.type="text",s.viewProps.bindDisabled(c),this.element.appendChild(c),this.inputElement=c,s.value.emitter.on("change",this.onValueUpdate_),this.value=s.value,this.update_()}update_(){let n=this.value.rawValue,s=n[n.length-1];this.inputElement.value=s!==void 0?this.formatter_(s):""}onValueUpdate_(){this.update_()}}class ho{constructor(n,s){this.value=s.value,this.viewProps=s.viewProps,this.view=new Xd(n,{formatter:s.formatter,value:this.value,viewProps:this.viewProps})}}let Yd={id:"monitor-bool",type:"monitor",accept:(o,n)=>{if(typeof o!="boolean")return null;let c=j(n,{lineCount:ut.optional.number});return c?{initialValue:o,params:c}:null},binding:{reader:o=>ka},controller:o=>{var n;return o.value.rawValue.length===1?new ho(o.document,{formatter:Oa,value:o.value,viewProps:o.viewProps}):new co(o.document,{formatter:Oa,lineCount:(n=o.params.lineCount)!==null&&n!==void 0?n:fs.monitor.defaultLineCount,value:o.value,viewProps:o.viewProps})}},Nn=I("grl");class $d{constructor(n,s){this.onCursorChange_=this.onCursorChange_.bind(this),this.onValueUpdate_=this.onValueUpdate_.bind(this),this.element=n.createElement("div"),this.element.classList.add(Nn()),s.viewProps.bindClassModifiers(this.element),this.formatter_=s.formatter,this.props_=s.props,this.cursor_=s.cursor,this.cursor_.emitter.on("change",this.onCursorChange_);let c=n.createElementNS(Lt,"svg");c.classList.add(Nn("g")),c.style.height=`calc(var(--bld-us) * ${s.lineCount})`,this.element.appendChild(c),this.svgElem_=c;let b=n.createElementNS(Lt,"polyline");this.svgElem_.appendChild(b),this.lineElem_=b;let U=n.createElement("div");U.classList.add(Nn("t"),I("tt")()),this.element.appendChild(U),this.tooltipElem_=U,s.value.emitter.on("change",this.onValueUpdate_),this.value=s.value,this.update_()}get graphElement(){return this.svgElem_}update_(){let n=this.svgElem_.getBoundingClientRect(),s=this.value.rawValue.length-1,c=this.props_.get("minValue"),b=this.props_.get("maxValue"),U=[];this.value.rawValue.forEach(($t,Zt)=>{if($t===void 0)return;let Zn=he(Zt,0,s,0,n.width),ms=he($t,c,b,n.height,0);U.push([Zn,ms].join(","))}),this.lineElem_.setAttributeNS(null,"points",U.join(" "));let V=this.tooltipElem_,pt=this.value.rawValue[this.cursor_.rawValue];if(pt===void 0){V.classList.remove(Nn("t","a"));return}let At=he(this.cursor_.rawValue,0,s,0,n.width),Dt=he(pt,c,b,n.height,0);V.style.left=`${At}px`,V.style.top=`${Dt}px`,V.textContent=`${this.formatter_(pt)}`,V.classList.contains(Nn("t","a"))||(V.classList.add(Nn("t","a"),Nn("t","in")),ee(V),V.classList.remove(Nn("t","in")))}onValueUpdate_(){this.update_()}onCursorChange_(){this.update_()}}class jd{constructor(n,s){if(this.onGraphMouseMove_=this.onGraphMouseMove_.bind(this),this.onGraphMouseLeave_=this.onGraphMouseLeave_.bind(this),this.onGraphPointerDown_=this.onGraphPointerDown_.bind(this),this.onGraphPointerMove_=this.onGraphPointerMove_.bind(this),this.onGraphPointerUp_=this.onGraphPointerUp_.bind(this),this.props_=s.props,this.value=s.value,this.viewProps=s.viewProps,this.cursor_=X(-1),this.view=new $d(n,{cursor:this.cursor_,formatter:s.formatter,lineCount:s.lineCount,props:this.props_,value:this.value,viewProps:this.viewProps}),!oe(n))this.view.element.addEventListener("mousemove",this.onGraphMouseMove_),this.view.element.addEventListener("mouseleave",this.onGraphMouseLeave_);else{let c=new qn(this.view.element);c.emitter.on("down",this.onGraphPointerDown_),c.emitter.on("move",this.onGraphPointerMove_),c.emitter.on("up",this.onGraphPointerUp_)}}onGraphMouseLeave_(){this.cursor_.rawValue=-1}onGraphMouseMove_(n){let s=this.view.element.getBoundingClientRect();this.cursor_.rawValue=Math.floor(he(n.offsetX,0,s.width,0,this.value.rawValue.length))}onGraphPointerDown_(n){this.onGraphPointerMove_(n)}onGraphPointerMove_(n){if(!n.data.point){this.cursor_.rawValue=-1;return}this.cursor_.rawValue=Math.floor(he(n.data.point.x,0,n.data.bounds.width,0,this.value.rawValue.length))}onGraphPointerUp_(){this.cursor_.rawValue=-1}}function uo(o){return"format"in o&&!d(o.format)?o.format:Me(2)}function Zd(o){var n;return o.value.rawValue.length===1?new ho(o.document,{formatter:uo(o.params),value:o.value,viewProps:o.viewProps}):new co(o.document,{formatter:uo(o.params),lineCount:(n=o.params.lineCount)!==null&&n!==void 0?n:fs.monitor.defaultLineCount,value:o.value,viewProps:o.viewProps})}function Kd(o){var n,s,c;return new jd(o.document,{formatter:uo(o.params),lineCount:(n=o.params.lineCount)!==null&&n!==void 0?n:fs.monitor.defaultLineCount,props:J.fromObject({maxValue:(s="max"in o.params?o.params.max:null)!==null&&s!==void 0?s:100,minValue:(c="min"in o.params?o.params.min:null)!==null&&c!==void 0?c:0}),value:o.value,viewProps:o.viewProps})}function Tl(o){return"view"in o&&o.view==="graph"}let Jd={id:"monitor-number",type:"monitor",accept:(o,n)=>{if(typeof o!="number")return null;let s=ut,c=j(n,{format:s.optional.function,lineCount:s.optional.number,max:s.optional.number,min:s.optional.number,view:s.optional.string});return c?{initialValue:o,params:c}:null},binding:{defaultBufferSize:o=>Tl(o)?64:1,reader:o=>Ba},controller:o=>Tl(o.params)?Kd(o):Zd(o)},Qd={id:"monitor-string",type:"monitor",accept:(o,n)=>{if(typeof o!="string")return null;let s=ut,c=j(n,{lineCount:s.optional.number,multiline:s.optional.boolean});return c?{initialValue:o,params:c}:null},binding:{reader:o=>Ha},controller:o=>{var n;let s=o.value;return s.rawValue.length>1||"multiline"in o.params&&o.params.multiline?new co(o.document,{formatter:Wr,lineCount:(n=o.params.lineCount)!==null&&n!==void 0?n:fs.monitor.defaultLineCount,value:s,viewProps:o.viewProps}):new ho(o.document,{formatter:Wr,value:s,viewProps:o.viewProps})}};function tp(o,n){var s;let c=o.accept(n.target.read(),n.params);if(d(c))return null;let b=ut,U={target:n.target,initialValue:c.initialValue,params:c.params},V=o.binding.reader(U),pt=o.binding.constraint?o.binding.constraint(U):void 0,At=X(V(c.initialValue),{constraint:pt,equals:o.binding.equals}),Dt=new Ch({reader:V,target:n.target,value:At,writer:o.binding.writer(U)}),$t=b.optional.boolean(n.params.disabled).value,Zt=b.optional.boolean(n.params.hidden).value,Zn=o.controller({constraint:pt,document:n.document,initialValue:c.initialValue,params:c.params,value:Dt.value,viewProps:Et.create({disabled:$t,hidden:Zt})});return new re(n.document,{binding:Dt,blade:_t(),props:J.fromObject({label:"label"in n.params?(s=b.optional.string(n.params.label).value)!==null&&s!==void 0?s:null:n.target.key}),valueController:Zn})}function ep(o,n){return n===0?new Us:new Eh(o,n??fs.monitor.defaultInterval)}function np(o,n){var s,c,b;let U=ut,V=o.accept(n.target.read(),n.params);if(d(V))return null;let pt={target:n.target,initialValue:V.initialValue,params:V.params},At=o.binding.reader(pt),Dt=(c=(s=U.optional.number(n.params.bufferSize).value)!==null&&s!==void 0?s:o.binding.defaultBufferSize&&o.binding.defaultBufferSize(V.params))!==null&&c!==void 0?c:1,$t=U.optional.number(n.params.interval).value,Zt=new Lh({reader:At,target:n.target,ticker:ep(n.document,$t),value:Ah(Dt)}),Zn=U.optional.boolean(n.params.disabled).value,ms=U.optional.boolean(n.params.hidden).value,gs=o.controller({document:n.document,params:V.params,value:Zt.value,viewProps:Et.create({disabled:Zn,hidden:ms})});return new Qt(n.document,{binding:Zt,blade:_t(),props:J.fromObject({label:"label"in n.params?(b=U.optional.string(n.params.label).value)!==null&&b!==void 0?b:null:n.target.key}),valueController:gs})}class ip{constructor(){this.pluginsMap_={blades:[],inputs:[],monitors:[]}}getAll(){return[...this.pluginsMap_.blades,...this.pluginsMap_.inputs,...this.pluginsMap_.monitors]}register(n){n.type==="blade"?this.pluginsMap_.blades.unshift(n):n.type==="input"?this.pluginsMap_.inputs.unshift(n):n.type==="monitor"&&this.pluginsMap_.monitors.unshift(n)}createInput(n,s,c){let b=s.read();if(d(b))throw new _({context:{key:s.key},type:"nomatchingcontroller"});let U=this.pluginsMap_.inputs.reduce((V,pt)=>V??tp(pt,{document:n,target:s,params:c}),null);if(U)return U;throw new _({context:{key:s.key},type:"nomatchingcontroller"})}createMonitor(n,s,c){let b=this.pluginsMap_.monitors.reduce((U,V)=>U??np(V,{document:n,params:c,target:s}),null);if(b)return b;throw new _({context:{key:s.key},type:"nomatchingcontroller"})}createBlade(n,s){let c=this.pluginsMap_.blades.reduce((b,U)=>b??zr(U,{document:n,params:s}),null);if(!c)throw new _({type:"nomatchingview",context:{params:s}});return c}createBladeApi(n){if(n instanceof re)return new se(n);if(n instanceof Qt)return new qe(n);if(n instanceof Rt)return new Wn(n,this);let s=this.pluginsMap_.blades.reduce((c,b)=>c??b.api({controller:n,pool:this}),null);if(!s)throw _.shouldNeverHappen();return s}}function sp(){let o=new ip;return[hp,Od,Hd,Wd,Pd,Sd,Md,bd,_u,Yd,Qd,Jd,ft,Bt,ue,mi].forEach(n=>{o.register(n)}),o}function rp(o){return Dn.isObject(o)?new Dn(o.x,o.y):new Dn}function op(o,n){o.writeProperty("x",n.x),o.writeProperty("y",n.y)}function gn(o,n){if(!o)return;let s=[],c=xl(o,n);c&&s.push(c);let b=yl(o);return b&&s.push(b),new ss(s)}function ap(o,n){return new In({assembly:wl,components:[gn("x"in o?o.x:void 0,n.x),gn("y"in o?o.y:void 0,n.y)]})}function Pl(o,n){let[s,c]=o?Ad(o):[];if(!d(s)||!d(c))return Math.max(Math.abs(s??0),Math.abs(c??0));let b=vi(o);return Math.max(Math.abs(b)*10,Math.abs(n)*10)}function lp(o,n){let s=n instanceof In?n.components[0]:void 0,c=n instanceof In?n.components[1]:void 0,b=Pl(s,o.x),U=Pl(c,o.y);return Math.max(b,U)}function Ll(o,n){return{baseStep:vi(n),constraint:n,textProps:J.fromObject({draggingScale:_i(n,o),formatter:Me(Vs(n,o))})}}function cp(o){if(!("y"in o))return!1;let n=o.y;return n&&"inverted"in n?!!n.inverted:!1}let hp={id:"input-point2d",type:"input",accept:(o,n)=>{if(!Dn.isObject(o))return null;let s=ut,c=j(n,{expanded:s.optional.boolean,picker:s.optional.custom(Xa),x:s.optional.custom(Ln),y:s.optional.object({inverted:s.optional.boolean,max:s.optional.number,min:s.optional.number,step:s.optional.number})});return c?{initialValue:o,params:c}:null},binding:{reader:o=>rp,constraint:o=>ap(o.params,o.initialValue),equals:Dn.equals,writer:o=>op},controller:o=>{let n=o.document,s=o.value,c=o.constraint;if(!(c instanceof In))throw _.shouldNeverHappen();let b="expanded"in o.params?o.params.expanded:void 0,U="picker"in o.params?o.params.picker:void 0;return new Dd(n,{axes:[Ll(s.rawValue.x,c.components[0]),Ll(s.rawValue.y,c.components[1])],expanded:b??!1,invertsY:cp(o.params),maxValue:lp(s.rawValue,c),parser:fn,pickerLayout:U??"popup",value:s,viewProps:o.viewProps})}};class Rl extends e{constructor(n){super(n),this.emitter_=new x,this.controller_.valueController.value.emitter.on("change",s=>{this.emitter_.emit("change",{event:new r(this,s.rawValue)})})}get label(){return this.controller_.props.get("label")}set label(n){this.controller_.props.set("label",n)}get options(){return this.controller_.valueController.props.get("options")}set options(n){this.controller_.valueController.props.set("options",n)}get value(){return this.controller_.valueController.value.rawValue}set value(n){this.controller_.valueController.value.rawValue=n}on(n,s){let c=s.bind(this);return this.emitter_.on(n,b=>{c(b.event)}),this}}class Il extends e{constructor(n){super(n),this.emitter_=new x,this.controller_.valueController.value.emitter.on("change",s=>{this.emitter_.emit("change",{event:new r(this,s.rawValue)})})}get label(){return this.controller_.props.get("label")}set label(n){this.controller_.props.set("label",n)}get maxValue(){return this.controller_.valueController.sliderController.props.get("maxValue")}set maxValue(n){this.controller_.valueController.sliderController.props.set("maxValue",n)}get minValue(){return this.controller_.valueController.sliderController.props.get("minValue")}set minValue(n){this.controller_.valueController.sliderController.props.set("minValue",n)}get value(){return this.controller_.valueController.value.rawValue}set value(n){this.controller_.valueController.value.rawValue=n}on(n,s){let c=s.bind(this);return this.emitter_.on(n,b=>{c(b.event)}),this}}class Dl extends e{constructor(n){super(n),this.emitter_=new x,this.controller_.valueController.value.emitter.on("change",s=>{this.emitter_.emit("change",{event:new r(this,s.rawValue)})})}get label(){return this.controller_.props.get("label")}set label(n){this.controller_.props.set("label",n)}get formatter(){return this.controller_.valueController.props.get("formatter")}set formatter(n){this.controller_.valueController.props.set("formatter",n)}get value(){return this.controller_.valueController.value.rawValue}set value(n){this.controller_.valueController.value.rawValue=n}on(n,s){let c=s.bind(this);return this.emitter_.on(n,b=>{c(b.event)}),this}}let up=function(){return{id:"list",type:"blade",accept(o){let n=ut,s=j(o,{options:n.required.custom(Fs),value:n.required.raw,view:n.required.constant("list"),label:n.optional.string});return s?{params:s}:null},controller(o){let n=new rs(Ya(o.params.options)),s=X(o.params.value,{constraint:n}),c=new os(o.document,{props:new J({options:n.values.value("options")}),value:s,viewProps:o.viewProps});return new kt(o.document,{blade:o.blade,props:J.fromObject({label:o.params.label}),valueController:c})},api(o){return!(o.controller instanceof kt)||!(o.controller.valueController instanceof os)?null:new Rl(o.controller)}}}();function dp(o){return o.reduce((n,s)=>Object.assign(n,{[s.presetKey]:s.read()}),{})}function pp(o,n){o.forEach(s=>{let c=n[s.target.presetKey];c!==void 0&&s.writer(s.target,s.reader(c))})}class fp extends Qi{constructor(n,s){super(n,s)}get element(){return this.controller_.view.element}importPreset(n){let s=this.controller_.rackController.rack.find(re).map(c=>c.binding);pp(s,n),this.refresh()}exportPreset(){let n=this.controller_.rackController.rack.find(re).map(s=>s.binding.target);return dp(n)}refresh(){this.controller_.rackController.rack.find(re).forEach(n=>{n.binding.read()}),this.controller_.rackController.rack.find(Qt).forEach(n=>{n.binding.read()})}}class mp extends Vt{constructor(n,s){super(n,{expanded:s.expanded,blade:s.blade,props:s.props,root:!0,viewProps:s.viewProps})}}let gp={id:"slider",type:"blade",accept(o){let n=ut,s=j(o,{max:n.required.number,min:n.required.number,view:n.required.constant("slider"),format:n.optional.function,label:n.optional.string,value:n.optional.number});return s?{params:s}:null},controller(o){var n,s;let c=(n=o.params.value)!==null&&n!==void 0?n:0,b=new gi({max:o.params.max,min:o.params.min}),U=new $r(o.document,{baseStep:1,parser:fn,sliderProps:new J({maxValue:b.values.value("max"),minValue:b.values.value("min")}),textProps:J.fromObject({draggingScale:_i(void 0,c),formatter:(s=o.params.format)!==null&&s!==void 0?s:au}),value:X(c,{constraint:b}),viewProps:o.viewProps});return new kt(o.document,{blade:o.blade,props:J.fromObject({label:o.params.label}),valueController:U})},api(o){return!(o.controller instanceof kt)||!(o.controller.valueController instanceof $r)?null:new Il(o.controller)}},vp=function(){return{id:"text",type:"blade",accept(o){let n=ut,s=j(o,{parse:n.required.function,value:n.required.raw,view:n.required.constant("text"),format:n.optional.function,label:n.optional.string});return s?{params:s}:null},controller(o){var n;let s=new ks(o.document,{parser:o.params.parse,props:J.fromObject({formatter:(n=o.params.format)!==null&&n!==void 0?n:c=>String(c)}),value:X(o.params.value),viewProps:o.viewProps});return new kt(o.document,{blade:o.blade,props:J.fromObject({label:o.params.label}),valueController:s})},api(o){return!(o.controller instanceof kt)||!(o.controller.valueController instanceof ks)?null:new Dl(o.controller)}}}();function _p(o){let n=o.createElement("div");return n.classList.add(I("dfw")()),o.body&&o.body.appendChild(n),n}function Ul(o,n,s){if(o.querySelector(`style[data-tp-style=${n}]`))return;let c=o.createElement("style");c.dataset.tpStyle=n,c.textContent=s,o.head.appendChild(c)}class bp extends fp{constructor(n){var s,c;let b=n??{},U=(s=b.document)!==null&&s!==void 0?s:Wt(),V=sp(),pt=new mp(U,{expanded:b.expanded,blade:_t(),props:J.fromObject({title:b.title}),viewProps:Et.create()});super(pt,V),this.pool_=V,this.containerElem_=(c=b.container)!==null&&c!==void 0?c:_p(U),this.containerElem_.appendChild(this.element),this.doc_=U,this.usesDefaultWrapper_=!b.container,this.setUpDefaultPlugins_()}get document(){if(!this.doc_)throw _.alreadyDisposed();return this.doc_}dispose(){let n=this.containerElem_;if(!n)throw _.alreadyDisposed();if(this.usesDefaultWrapper_){let s=n.parentElement;s&&s.removeChild(n)}this.containerElem_=null,this.doc_=null,super.dispose()}registerPlugin(n){("plugin"in n?[n.plugin]:"plugins"in n?n.plugins:[]).forEach(c=>{this.pool_.register(c),this.embedPluginStyle_(c)})}embedPluginStyle_(n){n.css&&Ul(this.document,`plugin-${n.id}`,n.css)}setUpDefaultPlugins_(){Ul(this.document,"default",'.tp-tbiv_b,.tp-coltxtv_ms,.tp-ckbv_i,.tp-rotv_b,.tp-fldv_b,.tp-mllv_i,.tp-sglv_i,.tp-grlv_g,.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw,.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-p2dv_b:hover,.tp-btnv_b:hover,.tp-lstv_s:hover{background-color:var(--btn-bg-h)}.tp-p2dv_b:focus,.tp-btnv_b:focus,.tp-lstv_s:focus{background-color:var(--btn-bg-f)}.tp-p2dv_b:active,.tp-btnv_b:active,.tp-lstv_s:active{background-color:var(--btn-bg-a)}.tp-p2dv_b:disabled,.tp-btnv_b:disabled,.tp-lstv_s:disabled{opacity:.5}.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-txtv_i:hover,.tp-p2dpv_p:hover,.tp-colswv_sw:hover{background-color:var(--in-bg-h)}.tp-txtv_i:focus,.tp-p2dpv_p:focus,.tp-colswv_sw:focus{background-color:var(--in-bg-f)}.tp-txtv_i:active,.tp-p2dpv_p:active,.tp-colswv_sw:active{background-color:var(--in-bg-a)}.tp-txtv_i:disabled,.tp-p2dpv_p:disabled,.tp-colswv_sw:disabled{opacity:.5}.tp-mllv_i,.tp-sglv_i,.tp-grlv_g{background-color:var(--mo-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--mo-fg);height:var(--bld-us);scrollbar-color:currentColor rgba(0,0,0,0);scrollbar-width:thin;width:100%}.tp-mllv_i::-webkit-scrollbar,.tp-sglv_i::-webkit-scrollbar,.tp-grlv_g::-webkit-scrollbar{height:8px;width:8px}.tp-mllv_i::-webkit-scrollbar-corner,.tp-sglv_i::-webkit-scrollbar-corner,.tp-grlv_g::-webkit-scrollbar-corner{background-color:rgba(0,0,0,0)}.tp-mllv_i::-webkit-scrollbar-thumb,.tp-sglv_i::-webkit-scrollbar-thumb,.tp-grlv_g::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:currentColor;border:rgba(0,0,0,0) solid 2px;border-radius:4px}.tp-rotv{--font-family: var(--tp-font-family, Roboto Mono, Source Code Pro, Menlo, Courier, monospace);--bs-br: var(--tp-base-border-radius, 6px);--cnt-h-p: var(--tp-container-horizontal-padding, 4px);--cnt-v-p: var(--tp-container-vertical-padding, 4px);--elm-br: var(--tp-element-border-radius, 2px);--bld-s: var(--tp-blade-spacing, 4px);--bld-us: var(--tp-blade-unit-size, 20px);--bs-bg: var(--tp-base-background-color, hsl(230, 7%, 17%));--bs-sh: var(--tp-base-shadow-color, rgba(0, 0, 0, 0.2));--btn-bg: var(--tp-button-background-color, hsl(230, 7%, 70%));--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, hsl(230, 7%, 17%));--cnt-bg: var(--tp-container-background-color, rgba(187, 188, 196, 0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187, 188, 196, 0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187, 188, 196, 0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187, 188, 196, 0.15));--cnt-fg: var(--tp-container-foreground-color, hsl(230, 7%, 75%));--in-bg: var(--tp-input-background-color, rgba(187, 188, 196, 0.1));--in-bg-a: var(--tp-input-background-color-active, rgba(187, 188, 196, 0.25));--in-bg-f: var(--tp-input-background-color-focus, rgba(187, 188, 196, 0.2));--in-bg-h: var(--tp-input-background-color-hover, rgba(187, 188, 196, 0.15));--in-fg: var(--tp-input-foreground-color, hsl(230, 7%, 75%));--lbl-fg: var(--tp-label-foreground-color, rgba(187, 188, 196, 0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0, 0, 0, 0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187, 188, 196, 0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(187, 188, 196, 0.1))}.tp-rotv_c>.tp-cntv.tp-v-lst,.tp-tabv_c .tp-brkv>.tp-cntv.tp-v-lst,.tp-fldv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1*var(--cnt-v-p))}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-rotv_c>*:not(.tp-v-fst),.tp-tabv_c .tp-brkv>*:not(.tp-v-fst),.tp-fldv_c>*:not(.tp-v-fst){margin-top:var(--bld-s)}.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-v-p)}.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-cntv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-v-p)}.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-tabv_c .tp-brkv>.tp-cntv,.tp-fldv_c>.tp-cntv{margin-left:4px}.tp-tabv_c .tp-brkv>.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--elm-br);border-bottom-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-tabv_c .tp-brkv .tp-fldv>.tp-fldv_c,.tp-fldv_c .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv>.tp-cntv+.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-cntv+.tp-fldv>.tp-fldv_b{border-top-left-radius:0}.tp-tabv_c .tp-brkv>.tp-cntv+.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-cntv+.tp-tabv>.tp-tabv_t{border-top-left-radius:0}.tp-tabv_c .tp-brkv>.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-tabv>.tp-tabv_t{border-top-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv .tp-tabv>.tp-tabv_c,.tp-fldv_c .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--elm-br)}.tp-rotv_b,.tp-fldv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);overflow:hidden;padding-left:var(--cnt-h-p);padding-right:calc(4px + var(--bld-us) + var(--cnt-h-p));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-rotv_b:hover,.tp-fldv_b:hover{background-color:var(--cnt-bg-h)}.tp-rotv_b:focus,.tp-fldv_b:focus{background-color:var(--cnt-bg-f)}.tp-rotv_b:active,.tp-fldv_b:active{background-color:var(--cnt-bg-a)}.tp-rotv_b:disabled,.tp-fldv_b:disabled{opacity:.5}.tp-rotv_m,.tp-fldv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:"";display:block;height:6px;right:calc(var(--cnt-h-p) + (var(--bld-us) + 4px - 6px)/2 - 2px);margin:auto;opacity:.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-rotv.tp-rotv-expanded .tp-rotv_m,.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m{transform:none}.tp-rotv_c,.tp-fldv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c,.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c{display:none}.tp-rotv.tp-rotv-expanded .tp-rotv_c,.tp-fldv.tp-fldv-expanded>.tp-fldv_c{opacity:1;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-lstv,.tp-coltxtv_m{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m,.tp-coltxtv_mm{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-lstv_m svg,.tp-coltxtv_mm svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-lstv_m svg path,.tp-coltxtv_mm svg path{fill:currentColor}.tp-pndtxtv,.tp-coltxtv_w{display:flex}.tp-pndtxtv_a,.tp-coltxtv_c{width:100%}.tp-pndtxtv_a+.tp-pndtxtv_a,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-coltxtv_c{margin-left:2px}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--elm-br);cursor:pointer;display:block;height:var(--bld-us);position:relative;width:var(--bld-us)}.tp-ckbv_w svg{bottom:0;display:block;height:16px;left:0;margin:auto;opacity:0;position:absolute;right:0;top:0;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--bld-us)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-expanded.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--bld-s);opacity:1}.tp-colv .tp-popv{left:calc(-1*var(--cnt-h-p));right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--bld-s)}.tp-colpv_rgb{display:flex;margin-top:var(--bld-s);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-v-p);padding-top:calc(var(--cnt-v-p) + 2px);position:relative}.tp-colpv_a::before{background-color:var(--grv-fg);content:"";height:2px;left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:0}.tp-colpv.tp-v-disabled .tp-colpv_a::before{opacity:.5}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--elm-br);outline:none;overflow:hidden;position:relative}.tp-svpv.tp-v-disabled{opacity:.5}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--bld-us)*4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0, 0, 0, 0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative}.tp-hplv.tp-v-disabled{opacity:.5}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--elm-br);border:rgba(255,255,255,.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative;width:100%}.tp-aplv.tp-v-disabled{opacity:.5}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--elm-br);box-shadow:0 0 2px rgba(0,0,0,.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--elm-br);border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--elm-br);overflow:hidden}.tp-colswv.tp-v-disabled{opacity:.5}.tp-colswv_sw{border-radius:0}.tp-colswv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;cursor:pointer;display:block;height:var(--bld-us);left:0;margin:0;outline:none;padding:0;position:absolute;top:0;width:var(--bld-us)}.tp-colswv_b:focus::after{border:rgba(255,255,255,.75) solid 2px;border-radius:var(--elm-br);bottom:0;content:"";display:block;left:0;position:absolute;right:0;top:0}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--elm-br);color:var(--lbl-fg);cursor:pointer;height:var(--bld-us);line-height:var(--bld-us);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv.tp-v-disabled .tp-coltxtv_mm{opacity:.5}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv{position:relative}.tp-fldv.tp-fldv-not .tp-fldv_b{display:none}.tp-fldv_t{padding-left:4px}.tp-fldv_b:disabled .tp-fldv_m{display:none}.tp-fldv_c{padding-left:4px}.tp-fldv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--bld-us) + 4px);width:var(--bs-br)}.tp-fldv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-fldv_b:hover+.tp-fldv_i{color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_i{color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_i{color:var(--cnt-bg-a)}.tp-fldv.tp-v-disabled>.tp-fldv_i{opacity:.5}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--bld-us)*3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left .05s,top .05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-h-p);padding-right:var(--cnt-h-p)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:160px}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding:0 4px}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:.5}.tp-mllv_i{display:block;height:calc(var(--bld-us)*3);line-height:var(--bld-us);padding:0 4px;resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--bld-us);margin-right:4px;position:relative;width:var(--bld-us)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--bld-s);opacity:1}.tp-p2dv .tp-popv{left:calc(-1*var(--cnt-h-p));right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-p2dpv{padding-left:calc(var(--bld-us) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv.tp-v-disabled .tp-p2dpv_p{opacity:.5}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:6px;box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:168px;padding:var(--cnt-v-p) var(--cnt-h-p);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sprv.tp-v-disabled .tp-sprv_r{opacity:.5}.tp-sldv.tp-v-disabled{opacity:.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--bld-us);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin:auto;position:absolute;right:0;top:0}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin-bottom:auto;margin-top:auto;position:absolute;right:0;top:0}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--elm-br);bottom:0;content:"";display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv{position:relative}.tp-tabv_t{align-items:flex-end;color:var(--cnt-bg);display:flex;overflow:hidden;position:relative}.tp-tabv_t:hover{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus){color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active){color:var(--cnt-bg-a)}.tp-tabv_t::before{background-color:currentColor;bottom:0;content:"";height:2px;left:0;pointer-events:none;position:absolute;right:0}.tp-tabv.tp-v-disabled .tp-tabv_t::before{opacity:.5}.tp-tabv.tp-tabv-nop .tp-tabv_t{height:calc(var(--bld-us) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_t::before{background-color:var(--cnt-bg);bottom:0;content:"";height:2px;left:0;position:absolute;right:0}.tp-tabv_c{padding-bottom:var(--cnt-v-p);padding-left:4px;padding-top:var(--cnt-v-p)}.tp-tabv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--bld-us) + 4px);width:var(--bs-br)}.tp-tabv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-tabv_t:hover+.tp-tabv_i{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus)+.tp-tabv_i{color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active)+.tp-tabv_i{color:var(--cnt-bg-a)}.tp-tabv.tp-v-disabled>.tp-tabv_i{opacity:.5}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv.tp-v-disabled::before{opacity:.5}.tp-tbiv_b{display:block;padding-left:calc(var(--cnt-h-p) + 4px);padding-right:calc(var(--cnt-h-p) + 4px);position:relative;width:100%}.tp-tbiv_b:disabled{opacity:.5}.tp-tbiv_b::before{background-color:var(--cnt-bg);bottom:2px;content:"";left:0;pointer-events:none;position:absolute;right:0;top:0}.tp-tbiv_b:hover::before{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus::before{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active::before{background-color:var(--cnt-bg-a)}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);opacity:.5;overflow:hidden;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-txtv{position:relative}.tp-txtv_i{padding:0 4px}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:.3}.tp-txtv_k{cursor:pointer;height:100%;left:-3px;position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";height:calc(var(--bld-us) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:.1;position:absolute;top:0;transition:border-radius .1s,height .1s,transform .1s,width .1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--elm-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0);border-style:solid;border-width:2px;box-sizing:border-box;content:"";font-size:.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--font-family);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(4px + var(--bld-us) + var(--cnt-h-p));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0}.tp-rotv.tp-rotv-not .tp-rotv_b{display:none}.tp-rotv_b:disabled .tp-rotv_m{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1*var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1*var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_t{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}'),this.pool_.getAll().forEach(n=>{this.embedPluginStyle_(n)}),this.registerPlugin({plugins:[gp,up,mi,vp]})}}let xp=new t("3.1.9");l.BladeApi=e,l.ButtonApi=w,l.FolderApi=Qi,l.InputBindingApi=se,l.ListApi=Rl,l.MonitorBindingApi=qe,l.Pane=bp,l.SeparatorApi=jt,l.SliderApi=Il,l.TabApi=Pn,l.TabPageApi=ns,l.TextApi=Dl,l.TpChangeEvent=r,l.VERSION=xp,Object.defineProperty(l,"__esModule",{value:!0})})});var Mh=kl((kr,wh)=>{(function(l,t){typeof kr=="object"&&typeof wh<"u"?t(kr):typeof define=="function"&&define.amd?define(["exports"],t):(l=typeof globalThis<"u"?globalThis:l||self,t(l.TweakpaneInfodumpPlugin={}))})(kr,function(l){"use strict";class t{constructor(M){this.controller_=M}get element(){return this.controller_.view.element}get disabled(){return this.controller_.viewProps.get("disabled")}set disabled(M){this.controller_.viewProps.set("disabled",M)}get hidden(){return this.controller_.viewProps.get("hidden")}set hidden(M){this.controller_.viewProps.set("hidden",M)}dispose(){this.controller_.viewProps.set("disposed",!0)}}function e(k){return k}function i(k,M){if(k.length!==M.length)return!1;for(let N=0;N<k.length;N++)if(k[N]!==M[N])return!1;return!0}class r{constructor(){this.observers_={}}on(M,N){let C=this.observers_[M];return C||(C=this.observers_[M]=[]),C.push({handler:N}),this}off(M,N){let C=this.observers_[M];return C&&(this.observers_[M]=C.filter(q=>q.handler!==N)),this}emit(M,N){let C=this.observers_[M];C&&C.forEach(q=>{q.handler(N)})}}let a="tp";function u(k){return(N,C)=>[a,"-",k,"v",N?`_${N}`:"",C?`-${C}`:""].join("")}function h(k,M){return N=>M(k(N))}function f(k){return k.rawValue}function d(k,M){k.emitter.on("change",h(f,M)),M(k.rawValue)}function p(k,M,N){d(k.value(M),N)}function g(k,M,N){N?k.classList.add(M):k.classList.remove(M)}function v(k,M){return N=>{g(k,M,N)}}class _{constructor(M,N){var C;this.constraint_=N?.constraint,this.equals_=(C=N?.equals)!==null&&C!==void 0?C:(q,z)=>q===z,this.emitter=new r,this.rawValue_=M}get constraint(){return this.constraint_}get rawValue(){return this.rawValue_}set rawValue(M){this.setRawValue(M,{forceEmit:!1,last:!0})}setRawValue(M,N){let C=N??{forceEmit:!1,last:!0},q=this.constraint_?this.constraint_.constrain(M):M,z=this.rawValue_;this.equals_(z,q)&&!C.forceEmit||(this.emitter.emit("beforechange",{sender:this}),this.rawValue_=q,this.emitter.emit("change",{options:C,previousRawValue:z,rawValue:q,sender:this}))}}class y{constructor(M){this.emitter=new r,this.value_=M}get rawValue(){return this.value_}set rawValue(M){this.setRawValue(M,{forceEmit:!1,last:!0})}setRawValue(M,N){let C=N??{forceEmit:!1,last:!0},q=this.value_;q===M&&!C.forceEmit||(this.emitter.emit("beforechange",{sender:this}),this.value_=M,this.emitter.emit("change",{options:C,previousRawValue:q,rawValue:this.value_,sender:this}))}}function w(k,M){let N=M?.constraint,C=M?.equals;return!N&&!C?new y(k):new _(k,M)}class x{constructor(M){this.emitter=new r,this.valMap_=M;for(let N in this.valMap_)this.valMap_[N].emitter.on("change",()=>{this.emitter.emit("change",{key:N,sender:this})})}static createCore(M){return Object.keys(M).reduce((C,q)=>Object.assign(C,{[q]:w(M[q])}),{})}static fromObject(M){let N=this.createCore(M);return new x(N)}get(M){return this.valMap_[M].rawValue}set(M,N){this.valMap_[M].rawValue=N}value(M){return this.valMap_[M]}}function m(k,M){let C=Object.keys(M).reduce((q,z)=>{if(q===void 0)return;let ot=M[z],ft=ot(k[z]);return ft.succeeded?Object.assign(Object.assign({},q),{[z]:ft.value}):void 0},{});return C}function I(k,M){return k.reduce((N,C)=>{if(N===void 0)return;let q=M(C);if(!(!q.succeeded||q.value===void 0))return[...N,q.value]},[])}function T(k){return k===null?!1:typeof k=="object"}function L(k){return M=>N=>{if(!M&&N===void 0)return{succeeded:!1,value:void 0};if(M&&N===void 0)return{succeeded:!0,value:void 0};let C=k(N);return C!==void 0?{succeeded:!0,value:C}:{succeeded:!1,value:void 0}}}function P(k){return{custom:M=>L(M)(k),boolean:L(M=>typeof M=="boolean"?M:void 0)(k),number:L(M=>typeof M=="number"?M:void 0)(k),string:L(M=>typeof M=="string"?M:void 0)(k),function:L(M=>typeof M=="function"?M:void 0)(k),constant:M=>L(N=>N===M?M:void 0)(k),raw:L(M=>M)(k),object:M=>L(N=>{if(T(N))return m(N,M)})(k),array:M=>L(N=>{if(Array.isArray(N))return I(N,M)})(k)}}let F={optional:P(!0),required:P(!1)};function H(k,M){let N=F.required.object(M)(k);return N.succeeded?N.value:void 0}function W(k){console.warn([`Missing '${k.key}' of ${k.target} in ${k.place}.`,"Please rebuild plugins with the latest core package."].join(" "))}function E(k){return k&&k.parentElement&&k.parentElement.removeChild(k),null}class D{constructor(M){this.value_=M}static create(M){return[new D(M),(N,C)=>{M.setRawValue(N,C)}]}get emitter(){return this.value_.emitter}get rawValue(){return this.value_.rawValue}}let nt=u("");function at(k,M){return v(k,nt(void 0,M))}class G extends x{constructor(M){var N;super(M),this.onDisabledChange_=this.onDisabledChange_.bind(this),this.onParentChange_=this.onParentChange_.bind(this),this.onParentGlobalDisabledChange_=this.onParentGlobalDisabledChange_.bind(this),[this.globalDisabled_,this.setGlobalDisabled_]=D.create(w(this.getGlobalDisabled_())),this.value("disabled").emitter.on("change",this.onDisabledChange_),this.value("parent").emitter.on("change",this.onParentChange_),(N=this.get("parent"))===null||N===void 0||N.globalDisabled.emitter.on("change",this.onParentGlobalDisabledChange_)}static create(M){var N,C,q;let z=M??{};return new G(x.createCore({disabled:(N=z.disabled)!==null&&N!==void 0?N:!1,disposed:!1,hidden:(C=z.hidden)!==null&&C!==void 0?C:!1,parent:(q=z.parent)!==null&&q!==void 0?q:null}))}get globalDisabled(){return this.globalDisabled_}bindClassModifiers(M){d(this.globalDisabled_,at(M,"disabled")),p(this,"hidden",at(M,"hidden"))}bindDisabled(M){d(this.globalDisabled_,N=>{M.disabled=N})}bindTabIndex(M){d(this.globalDisabled_,N=>{M.tabIndex=N?-1:0})}handleDispose(M){this.value("disposed").emitter.on("change",N=>{N&&M()})}getGlobalDisabled_(){let M=this.get("parent");return(M?M.globalDisabled.rawValue:!1)||this.get("disabled")}updateGlobalDisabled_(){this.setGlobalDisabled_(this.getGlobalDisabled_())}onDisabledChange_(){this.updateGlobalDisabled_()}onParentGlobalDisabledChange_(){this.updateGlobalDisabled_()}onParentChange_(M){var N;let C=M.previousRawValue;C?.globalDisabled.emitter.off("change",this.onParentGlobalDisabledChange_),(N=this.get("parent"))===null||N===void 0||N.globalDisabled.emitter.on("change",this.onParentGlobalDisabledChange_),this.updateGlobalDisabled_()}}function Z(){return["veryfirst","first","last","verylast"]}let X=u(""),J={veryfirst:"vfst",first:"fst",last:"lst",verylast:"vlst"};class ct{constructor(M){this.parent_=null,this.blade=M.blade,this.view=M.view,this.viewProps=M.viewProps;let N=this.view.element;this.blade.value("positions").emitter.on("change",()=>{Z().forEach(C=>{N.classList.remove(X(void 0,J[C]))}),this.blade.get("positions").forEach(C=>{N.classList.add(X(void 0,J[C]))})}),this.viewProps.handleDispose(()=>{E(N)})}get parent(){return this.parent_}set parent(M){if(this.parent_=M,!("parent"in this.viewProps.valMap_)){W({key:"parent",target:G.name,place:"BladeController.parent"});return}this.viewProps.set("parent",this.parent_?this.parent_.viewProps:null)}}function st(){return new x({positions:w([],{equals:i})})}function lt(k){return M=>M.toFixed(Math.max(Math.min(k,20),0))}let ht=lt(0);function St(k){return ht(k)+"%"}function ut(k,M,N){return Math.min(Math.max(k,M),N)}function j(k){return[k[0],k[1],k[2]]}function rt(k){let M=ut(Math.floor(k),0,255).toString(16);return M.length===1?`0${M}`:M}function gt(k,M="#"){let N=j(k.getComponents("rgb")).map(rt).join("");return`${M}${N}`}function bt(k,M="#"){let N=k.getComponents("rgb"),C=[N[0],N[1],N[2],N[3]*255].map(rt).join("");return`${M}${C}`}function K(k,M){let N=lt(M==="float"?2:0);return`rgb(${j(k.getComponents("rgb",M)).map(q=>N(q)).join(", ")})`}function It(k){return M=>K(M,k)}function Et(k,M){let N=lt(2),C=lt(M==="float"?2:0);return`rgba(${k.getComponents("rgb",M).map((z,ot)=>(ot===3?N:C)(z)).join(", ")})`}function mt(k){return M=>Et(M,k)}function Tt(k){let M=[lt(0),St,St];return`hsl(${j(k.getComponents("hsl")).map((C,q)=>M[q](C)).join(", ")})`}function Yt(k){let M=[lt(0),St,St,lt(2)];return`hsla(${k.getComponents("hsl").map((C,q)=>M[q](C)).join(", ")})`}function Mt(k,M){let N=lt(M==="float"?2:0),C=["r","g","b"];return`{${j(k.getComponents("rgb",M)).map((z,ot)=>`${C[ot]}: ${N(z)}`).join(", ")}}`}function Lt(k){return M=>Mt(M,k)}function ee(k,M){let N=lt(2),C=lt(M==="float"?2:0),q=["r","g","b","a"];return`{${k.getComponents("rgb",M).map((ot,ft)=>{let xt=ft===3?N:C;return`${q[ft]}: ${xt(ot)}`}).join(", ")}}`}function ie(k){return M=>ee(M,k)}[...["int","float"].reduce((k,M)=>[...k,{format:{alpha:!1,mode:"rgb",notation:"func",type:M},stringifier:It(M)},{format:{alpha:!0,mode:"rgb",notation:"func",type:M},stringifier:mt(M)},{format:{alpha:!1,mode:"rgb",notation:"object",type:M},stringifier:Lt(M)},{format:{alpha:!0,mode:"rgb",notation:"object",type:M},stringifier:ie(M)}],[])];var oe=[[/\r\n/g,`
`],[/\n(#+)(.*)/g,function(k,M,N){N===void 0&&(N="");var C=M.length;return"<h"+C+">"+N.trim()+"</h"+C+">"}],[/!\[([^\[]+)\]\((?:javascript:)?([^\)]+)\)/g,'<img src="$2" alt="$1">'],[/\[([^\[]+)\]\((?:javascript:)?([^\)]+)\)/g,'<a href="$2">$1</a>'],[/(\*\*|__)(.*?)\1/g,"<strong>$2</strong>"],[/\\_/g,"&#95;"],[/(\*|_)(.*?)\1/g,"<em>$2</em>"],[/\~\~(.*?)\~\~/g,"<del>$1</del>"],[/\:\"(.*?)\"\:/g,"<q>$1</q>"],[/\n\s*```\n([^]*?)\n\s*```\s*\n/g,`
<pre>$1</pre>`],[/`(.*?)`/g,function(k,M){return"<code>"+function(N){N=N.replace(/\&/g,"&amp;");for(var C="'#<>`*-~_=:\"![]()nt",q=C.length,z=0;z<q;z++)N=N.replace(RegExp("\\"+C[z],"g"),function(ot){return"&#"+ot.charCodeAt(0)+";"});return N}(M)+"</code>"}],[/\n(\*|\-|\+)(.*)/g,function(k,M,N){return N===void 0&&(N=""),`<ul>
	<li>`+N.trim()+`</li>
</ul>`}],[/\n[0-9]+\.(.*)/g,function(k,M){return M===void 0&&(M=""),`<ol>
	<li>`+M.trim()+`</li>
</ol>`}],[/\n(&gt;|\>)(.*)/g,function(k,M,N){return N===void 0&&(N=""),`
<blockquote>`+N.trim()+"</blockquote>"}],[/\n-{5,}/g,`
<hr />`],[/( *\|[^\n]+\|\r?\n)((?: *\|:?[ -]+:?)+ *\|)(\n(?: *\|[^\n]+\|\r?\n?)*)?/g,function(k,M,N,C){var q=N.split("|").filter(function(ot,ft,xt){return ft>0&&ft<xt.length-1}).map(function(ot){return/:-+:/g.test(ot)?"center":/-+:/g.test(ot)?"right":/:-+/.test(ot)?"left":""}),z=function(ot){var ft=q[ot];return ft?' align="'+ft+'"':""};return`
<table><tbody><tr>`+M.split("|").map(function(ot){return ot.trim()}).filter(function(ot){return ot&&ot.length}).map(function(ot,ft){return"<th"+z(ft)+">"+ot+"</th>"}).join("")+"</tr>"+C.split(`
`).map(function(ot){return ot.trim()}).filter(function(ot){return ot&&ot.length}).map(function(ot){return"<tr>"+ot.split("|").filter(function(ft,xt,_t){return xt>0&&xt<_t.length-1}).map(function(ft,xt){return"<td"+z(xt)+">"+ft.trim()+"</td>"}).join("")+"</tr>"}).join("")+`</tbody></table>
`}],[/\n([^\n]+)\n/g,function(k,M){var N=M.trim();return/^<\/?(ul|ol|li|h|p|bl|table|tr|td)/i.test(N)?`
`+M+`
`:`
<p>
`+N+`
</p>
`}],[/\s?<\/ul>\s?<ul>/g,""],[/\s?<\/ol>\s?<ol>/g,""],[/<\/blockquote>\n<blockquote>/g,`<br>
`],[/https?:\/\/[^"']*/g,function(k){return k.replace(/<\/?em>/g,"_")}],[/&#95;/g,"_"]],ae=function(k,M,N){return M===void 0&&(M=!1),N===void 0&&(N=!1),k=`
`+k+`
`,oe.forEach(function(C){k=k.replace(C[0],C[1])}),M?N?k.trim().replace(/^<p>([\s\S]*)<\/p>$/,"$1").replace(/<a href="/,'<a target="_blank" href="'):k.trim().replace(/^<p>([\s\S]*)<\/p>$/,"$1"):N?k.trim().replace(/<a href="/,'<a target="_blank" href="'):k.trim()};let Wt=u("indu"),Jt=u("indub");class pe{constructor(M,N){this.element=M.createElement("div"),this.element.classList.add(Wt()),N.border&&this.element.classList.add(Jt()),N.viewProps.bindClassModifiers(this.element);let C=M.createElement("div");C.classList.add(Wt("t")),N.markdown?C.innerHTML=ae(N.content):C.textContent=N.content,this.element.appendChild(C)}}class R extends ct{constructor(M,N){super({blade:st(),view:new pe(M,N),viewProps:N.viewProps})}}let Q=[{id:"infodump",type:"blade",css:'.tp-induv{position:relative;align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-h-p);padding-right:var(--cnt-h-p)}.tp-induv.tp-v-disabled{opacity:.5}.tp-induv .tp-induv_t{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;hyphens:auto;padding:2px 4px 2px;width:1px}.tp-induv .tp-induv_t>*:first-child{margin-top:0}.tp-induv .tp-induv_t>*:last-child{margin-bottom:0}.tp-induv .tp-induv_t p,.tp-induv .tp-induv_t h1,.tp-induv .tp-induv_t h2,.tp-induv .tp-induv_t h3,.tp-induv .tp-induv_t ol,.tp-induv .tp-induv_t ul,.tp-induv .tp-induv_t blockquote,.tp-induv .tp-induv_t pre{margin:.5em 0}.tp-induv .tp-induv_t a{color:var(--btn-bg)}.tp-induv .tp-induv_t a:active{color:var(--btn-bg-a)}.tp-induv .tp-induv_t a:hover{color:var(--btn-bg-h)}.tp-induv .tp-induv_t h1{font-size:1.3em;font-weight:bold}.tp-induv .tp-induv_t h2{font-size:1em;font-weight:bold}.tp-induv .tp-induv_t h3{font-size:1em;font-weight:normal}.tp-induv .tp-induv_t ol,.tp-induv .tp-induv_t ul,.tp-induv .tp-induv_t blockquote{padding-left:28px}.tp-indubv::before{border:var(--mo-fg) dashed 1px;border-radius:var(--elm-br);bottom:0;content:"";left:var(--cnt-v-p);opacity:.3;position:absolute;right:var(--cnt-v-p);top:0}',accept(k){let M=F,N=H(k,{border:M.optional.boolean,content:M.required.string,markdown:M.optional.boolean,view:M.required.constant("infodump")});return N?{params:N}:null},controller(k){var M,N;return new R(k.document,{border:(M=k.params.border)!==null&&M!==void 0?M:!1,content:k.params.content,markdown:(N=k.params.markdown)!==null&&N!==void 0?N:!1,viewProps:k.viewProps})},api(k){return k.controller instanceof R?new t(k.controller):null}}];l.plugins=Q,Object.defineProperty(l,"__esModule",{value:!0})})});var Sa="151",di={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},pi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ap=0,Fl=1,Tp=2;var nh=1,Pp=2,ys=3,Hn=0,Oe=1,En=2;var Bn=0,Hi=1,Vl=2,zl=3,Bl=4,Lp=5,Vi=100,Rp=101,Ip=102,Hl=103,Gl=104,Dp=200,Up=201,Np=202,kp=203,ih=204,sh=205,Op=206,Fp=207,Vp=208,zp=209,Bp=210,Hp=0,Gp=1,Wp=2,Go=3,qp=4,Xp=5,Yp=6,$p=7,Ea=0,jp=1,Zp=2,Cn=0,Kp=1,Jp=2,Qp=3,tf=4,ef=5,rh=300,Xi=301,Yi=302,Wo=303,qo=304,Rr=306,Xo=1e3,nn=1001,Yo=1002,Re=1003,Wl=1004;var po=1005;var je=1006,nf=1007;var Ss=1008;var ri=1009,sf=1010,rf=1011,oh=1012,of=1013,ni=1014,ii=1015,Es=1016,af=1017,lf=1018,Gi=1020,cf=1021,sn=1023,hf=1024,uf=1025,si=1026,$i=1027,df=1028,pf=1029,ff=1030,mf=1031,gf=1033,fo=33776,mo=33777,go=33778,vo=33779,ql=35840,Xl=35841,Yl=35842,$l=35843,vf=36196,jl=37492,Zl=37496,Kl=37808,Jl=37809,Ql=37810,tc=37811,ec=37812,nc=37813,ic=37814,sc=37815,rc=37816,oc=37817,ac=37818,lc=37819,cc=37820,hc=37821,_o=36492,_f=36283,uc=36284,dc=36285,pc=36286;var pr=2300,fr=2301,bo=2302,fc=2400,mc=2401,gc=2402;var oi=3e3,ce=3001,bf=3200,xf=3201,ah=0,yf=1;var hn="srgb",Cs="srgb-linear",lh="display-p3";var xo=7680;var wf=519,vc=35044;var _c="300 es",$o=1035,dn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let r=this._listeners[t];if(r!==void 0){let a=r.indexOf(e);a!==-1&&r.splice(a,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let r=i.slice(0);for(let a=0,u=r.length;a<u;a++)r[a].call(this,t);t.target=null}}},Ae=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var yo=Math.PI/180,jo=180/Math.PI;function Ds(){let l=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ae[l&255]+Ae[l>>8&255]+Ae[l>>16&255]+Ae[l>>24&255]+"-"+Ae[t&255]+Ae[t>>8&255]+"-"+Ae[t>>16&15|64]+Ae[t>>24&255]+"-"+Ae[e&63|128]+Ae[e>>8&255]+"-"+Ae[e>>16&255]+Ae[e>>24&255]+Ae[i&255]+Ae[i>>8&255]+Ae[i>>16&255]+Ae[i>>24&255]).toLowerCase()}function Ie(l,t,e){return Math.max(t,Math.min(e,l))}function Mf(l,t){return(l%t+t)%t}function wo(l,t,e){return(1-e)*l+e*t}function bc(l){return(l&l-1)===0&&l!==0}function Sf(l){return Math.pow(2,Math.floor(Math.log(l)/Math.LN2))}function qs(l,t){switch(t.constructor){case Float32Array:return l;case Uint16Array:return l/65535;case Uint8Array:return l/255;case Int16Array:return Math.max(l/32767,-1);case Int8Array:return Math.max(l/127,-1);default:throw new Error("Invalid component type.")}}function ze(l,t){switch(t.constructor){case Float32Array:return l;case Uint16Array:return Math.round(l*65535);case Uint8Array:return Math.round(l*255);case Int16Array:return Math.round(l*32767);case Int8Array:return Math.round(l*127);default:throw new Error("Invalid component type.")}}var Gt=class{constructor(t=0,e=0){Gt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Ie(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),r=Math.sin(e),a=this.x-t.x,u=this.y-t.y;return this.x=a*i-u*r+t.x,this.y=a*r+u*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Xt=class{constructor(){Xt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(t,e,i,r,a,u,h,f,d){let p=this.elements;return p[0]=t,p[1]=r,p[2]=h,p[3]=e,p[4]=a,p[5]=f,p[6]=i,p[7]=u,p[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,r=e.elements,a=this.elements,u=i[0],h=i[3],f=i[6],d=i[1],p=i[4],g=i[7],v=i[2],_=i[5],y=i[8],w=r[0],x=r[3],m=r[6],I=r[1],T=r[4],L=r[7],P=r[2],F=r[5],H=r[8];return a[0]=u*w+h*I+f*P,a[3]=u*x+h*T+f*F,a[6]=u*m+h*L+f*H,a[1]=d*w+p*I+g*P,a[4]=d*x+p*T+g*F,a[7]=d*m+p*L+g*H,a[2]=v*w+_*I+y*P,a[5]=v*x+_*T+y*F,a[8]=v*m+_*L+y*H,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],r=t[2],a=t[3],u=t[4],h=t[5],f=t[6],d=t[7],p=t[8];return e*u*p-e*h*d-i*a*p+i*h*f+r*a*d-r*u*f}invert(){let t=this.elements,e=t[0],i=t[1],r=t[2],a=t[3],u=t[4],h=t[5],f=t[6],d=t[7],p=t[8],g=p*u-h*d,v=h*f-p*a,_=d*a-u*f,y=e*g+i*v+r*_;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);let w=1/y;return t[0]=g*w,t[1]=(r*d-p*i)*w,t[2]=(h*i-r*u)*w,t[3]=v*w,t[4]=(p*e-r*f)*w,t[5]=(r*a-h*e)*w,t[6]=_*w,t[7]=(i*f-d*e)*w,t[8]=(u*e-i*a)*w,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,a,u,h){let f=Math.cos(a),d=Math.sin(a);return this.set(i*f,i*d,-i*(f*u+d*h)+u+t,-r*d,r*f,-r*(-d*u+f*h)+h+e,0,0,1),this}scale(t,e){return this.premultiply(Mo.makeScale(t,e)),this}rotate(t){return this.premultiply(Mo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Mo.makeTranslation(t,e)),this}makeTranslation(t,e){return this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Mo=new Xt;function ch(l){for(let t=l.length-1;t>=0;--t)if(l[t]>=65535)return!0;return!1}function mr(l){return document.createElementNS("http://www.w3.org/1999/xhtml",l)}function Wi(l){return l<.04045?l*.0773993808:Math.pow(l*.9478672986+.0521327014,2.4)}function So(l){return l<.0031308?l*12.92:1.055*Math.pow(l,.41666)-.055}var Ef=new Xt().fromArray([.8224621,.0331941,.0170827,.177538,.9668058,.0723974,-1e-7,1e-7,.9105199]),Cf=new Xt().fromArray([1.2249401,-.0420569,-.0196376,-.2249404,1.0420571,-.0786361,1e-7,0,1.0982735]);function Af(l){return l.convertSRGBToLinear().applyMatrix3(Cf)}function Tf(l){return l.applyMatrix3(Ef).convertLinearToSRGB()}var Pf={[Cs]:l=>l,[hn]:l=>l.convertSRGBToLinear(),[lh]:Af},Lf={[Cs]:l=>l,[hn]:l=>l.convertLinearToSRGB(),[lh]:Tf},Be={enabled:!1,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(l){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!l},get workingColorSpace(){return Cs},set workingColorSpace(l){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(l,t,e){if(this.enabled===!1||t===e||!t||!e)return l;let i=Pf[t],r=Lf[e];if(i===void 0||r===void 0)throw new Error(`Unsupported color space conversion, "${t}" to "${e}".`);return r(i(l))},fromWorkingColorSpace:function(l,t){return this.convert(l,this.workingColorSpace,t)},toWorkingColorSpace:function(l,t){return this.convert(l,t,this.workingColorSpace)}},Mi,gr=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Mi===void 0&&(Mi=mr("canvas")),Mi.width=t.width,Mi.height=t.height;let i=Mi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Mi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=mr("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let r=i.getImageData(0,0,t.width,t.height),a=r.data;for(let u=0;u<a.length;u++)a[u]=Wi(a[u]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Wi(e[i]/255)*255):e[i]=Wi(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},vr=class{constructor(t=null){this.isSource=!0,this.uuid=Ds(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let u=0,h=r.length;u<h;u++)r[u].isDataTexture?a.push(Eo(r[u].image)):a.push(Eo(r[u]))}else a=Eo(r);i.url=a}return e||(t.images[this.uuid]=i),i}};function Eo(l){return typeof HTMLImageElement<"u"&&l instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&l instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&l instanceof ImageBitmap?gr.getDataURL(l):l.data?{data:Array.from(l.data),width:l.width,height:l.height,type:l.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Rf=0,Ue=class extends dn{constructor(t=Ue.DEFAULT_IMAGE,e=Ue.DEFAULT_MAPPING,i=nn,r=nn,a=je,u=Ss,h=sn,f=ri,d=Ue.DEFAULT_ANISOTROPY,p=oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=Ds(),this.name="",this.source=new vr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=u,this.anisotropy=d,this.format=h,this.internalFormat=null,this.type=f,this.offset=new Gt(0,0),this.repeat=new Gt(1,1),this.center=new Gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=p,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.encoding=t.encoding,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==rh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Xo:t.x=t.x-Math.floor(t.x);break;case nn:t.x=t.x<0?0:1;break;case Yo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Xo:t.y=t.y-Math.floor(t.y);break;case nn:t.y=t.y<0?0:1;break;case Yo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}};Ue.DEFAULT_IMAGE=null;Ue.DEFAULT_MAPPING=rh;Ue.DEFAULT_ANISOTROPY=1;var ve=class{constructor(t=0,e=0,i=0,r=1){ve.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,r=this.z,a=this.w,u=t.elements;return this.x=u[0]*e+u[4]*i+u[8]*r+u[12]*a,this.y=u[1]*e+u[5]*i+u[9]*r+u[13]*a,this.z=u[2]*e+u[6]*i+u[10]*r+u[14]*a,this.w=u[3]*e+u[7]*i+u[11]*r+u[15]*a,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,a,f=t.elements,d=f[0],p=f[4],g=f[8],v=f[1],_=f[5],y=f[9],w=f[2],x=f[6],m=f[10];if(Math.abs(p-v)<.01&&Math.abs(g-w)<.01&&Math.abs(y-x)<.01){if(Math.abs(p+v)<.1&&Math.abs(g+w)<.1&&Math.abs(y+x)<.1&&Math.abs(d+_+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let T=(d+1)/2,L=(_+1)/2,P=(m+1)/2,F=(p+v)/4,H=(g+w)/4,W=(y+x)/4;return T>L&&T>P?T<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(T),r=F/i,a=H/i):L>P?L<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(L),i=F/r,a=W/r):P<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(P),i=H/a,r=W/a),this.set(i,r,a,e),this}let I=Math.sqrt((x-y)*(x-y)+(g-w)*(g-w)+(v-p)*(v-p));return Math.abs(I)<.001&&(I=1),this.x=(x-y)/I,this.y=(g-w)/I,this.z=(v-p)/I,this.w=Math.acos((d+_+m-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},An=class extends dn{constructor(t=1,e=1,i={}){super(),this.isWebGLRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ve(0,0,t,e),this.scissorTest=!1,this.viewport=new ve(0,0,t,e);let r={width:t,height:e,depth:1};this.texture=new Ue(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.internalFormat=i.internalFormat!==void 0?i.internalFormat:null,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:je,this.depthBuffer=i.depthBuffer!==void 0?i.depthBuffer:!0,this.stencilBuffer=i.stencilBuffer!==void 0?i.stencilBuffer:!1,this.depthTexture=i.depthTexture!==void 0?i.depthTexture:null,this.samples=i.samples!==void 0?i.samples:0}setSize(t,e,i=1){(this.width!==t||this.height!==e||this.depth!==i)&&(this.width=t,this.height=e,this.depth=i,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new vr(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},_r=class extends Ue{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Re,this.minFilter=Re,this.wrapR=nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Zo=class extends Ue{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Re,this.minFilter=Re,this.wrapR=nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var rn=class{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,a,u,h){let f=i[r+0],d=i[r+1],p=i[r+2],g=i[r+3],v=a[u+0],_=a[u+1],y=a[u+2],w=a[u+3];if(h===0){t[e+0]=f,t[e+1]=d,t[e+2]=p,t[e+3]=g;return}if(h===1){t[e+0]=v,t[e+1]=_,t[e+2]=y,t[e+3]=w;return}if(g!==w||f!==v||d!==_||p!==y){let x=1-h,m=f*v+d*_+p*y+g*w,I=m>=0?1:-1,T=1-m*m;if(T>Number.EPSILON){let P=Math.sqrt(T),F=Math.atan2(P,m*I);x=Math.sin(x*F)/P,h=Math.sin(h*F)/P}let L=h*I;if(f=f*x+v*L,d=d*x+_*L,p=p*x+y*L,g=g*x+w*L,x===1-h){let P=1/Math.sqrt(f*f+d*d+p*p+g*g);f*=P,d*=P,p*=P,g*=P}}t[e]=f,t[e+1]=d,t[e+2]=p,t[e+3]=g}static multiplyQuaternionsFlat(t,e,i,r,a,u){let h=i[r],f=i[r+1],d=i[r+2],p=i[r+3],g=a[u],v=a[u+1],_=a[u+2],y=a[u+3];return t[e]=h*y+p*g+f*_-d*v,t[e+1]=f*y+p*v+d*g-h*_,t[e+2]=d*y+p*_+h*v-f*g,t[e+3]=p*y-h*g-f*v-d*_,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e){let i=t._x,r=t._y,a=t._z,u=t._order,h=Math.cos,f=Math.sin,d=h(i/2),p=h(r/2),g=h(a/2),v=f(i/2),_=f(r/2),y=f(a/2);switch(u){case"XYZ":this._x=v*p*g+d*_*y,this._y=d*_*g-v*p*y,this._z=d*p*y+v*_*g,this._w=d*p*g-v*_*y;break;case"YXZ":this._x=v*p*g+d*_*y,this._y=d*_*g-v*p*y,this._z=d*p*y-v*_*g,this._w=d*p*g+v*_*y;break;case"ZXY":this._x=v*p*g-d*_*y,this._y=d*_*g+v*p*y,this._z=d*p*y+v*_*g,this._w=d*p*g-v*_*y;break;case"ZYX":this._x=v*p*g-d*_*y,this._y=d*_*g+v*p*y,this._z=d*p*y-v*_*g,this._w=d*p*g+v*_*y;break;case"YZX":this._x=v*p*g+d*_*y,this._y=d*_*g+v*p*y,this._z=d*p*y-v*_*g,this._w=d*p*g-v*_*y;break;case"XZY":this._x=v*p*g-d*_*y,this._y=d*_*g-v*p*y,this._z=d*p*y+v*_*g,this._w=d*p*g+v*_*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+u)}return e!==!1&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],r=e[4],a=e[8],u=e[1],h=e[5],f=e[9],d=e[2],p=e[6],g=e[10],v=i+h+g;if(v>0){let _=.5/Math.sqrt(v+1);this._w=.25/_,this._x=(p-f)*_,this._y=(a-d)*_,this._z=(u-r)*_}else if(i>h&&i>g){let _=2*Math.sqrt(1+i-h-g);this._w=(p-f)/_,this._x=.25*_,this._y=(r+u)/_,this._z=(a+d)/_}else if(h>g){let _=2*Math.sqrt(1+h-i-g);this._w=(a-d)/_,this._x=(r+u)/_,this._y=.25*_,this._z=(f+p)/_}else{let _=2*Math.sqrt(1+g-i-h);this._w=(u-r)/_,this._x=(a+d)/_,this._y=(f+p)/_,this._z=.25*_}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ie(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,r=t._y,a=t._z,u=t._w,h=e._x,f=e._y,d=e._z,p=e._w;return this._x=i*p+u*h+r*d-a*f,this._y=r*p+u*f+a*h-i*d,this._z=a*p+u*d+i*f-r*h,this._w=u*p-i*h-r*f-a*d,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,r=this._y,a=this._z,u=this._w,h=u*t._w+i*t._x+r*t._y+a*t._z;if(h<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,h=-h):this.copy(t),h>=1)return this._w=u,this._x=i,this._y=r,this._z=a,this;let f=1-h*h;if(f<=Number.EPSILON){let _=1-e;return this._w=_*u+e*this._w,this._x=_*i+e*this._x,this._y=_*r+e*this._y,this._z=_*a+e*this._z,this.normalize(),this._onChangeCallback(),this}let d=Math.sqrt(f),p=Math.atan2(d,h),g=Math.sin((1-e)*p)/d,v=Math.sin(e*p)/d;return this._w=u*g+this._w*v,this._x=i*g+this._x*v,this._y=r*g+this._y*v,this._z=a*g+this._z*v,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=Math.random(),e=Math.sqrt(1-t),i=Math.sqrt(t),r=2*Math.PI*Math.random(),a=2*Math.PI*Math.random();return this.set(e*Math.cos(r),i*Math.sin(a),i*Math.cos(a),e*Math.sin(r))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Y=class{constructor(t=0,e=0,i=0){Y.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(xc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(xc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,r=this.z,a=t.elements;return this.x=a[0]*e+a[3]*i+a[6]*r,this.y=a[1]*e+a[4]*i+a[7]*r,this.z=a[2]*e+a[5]*i+a[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,r=this.z,a=t.elements,u=1/(a[3]*e+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*e+a[4]*i+a[8]*r+a[12])*u,this.y=(a[1]*e+a[5]*i+a[9]*r+a[13])*u,this.z=(a[2]*e+a[6]*i+a[10]*r+a[14])*u,this}applyQuaternion(t){let e=this.x,i=this.y,r=this.z,a=t.x,u=t.y,h=t.z,f=t.w,d=f*e+u*r-h*i,p=f*i+h*e-a*r,g=f*r+a*i-u*e,v=-a*e-u*i-h*r;return this.x=d*f+v*-a+p*-h-g*-u,this.y=p*f+v*-u+g*-a-d*-h,this.z=g*f+v*-h+d*-u-p*-a,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,r=this.z,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*r,this.y=a[1]*e+a[5]*i+a[9]*r,this.z=a[2]*e+a[6]*i+a[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,r=t.y,a=t.z,u=e.x,h=e.y,f=e.z;return this.x=r*f-a*h,this.y=a*u-i*f,this.z=i*h-r*u,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Co.copy(this).projectOnVector(t),this.sub(Co)}reflect(t){return this.sub(Co.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Ie(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,i=Math.sqrt(1-t**2);return this.x=i*Math.cos(e),this.y=i*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Co=new Y,xc=new rn,ai=class{constructor(t=new Y(1/0,1/0,1/0),e=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(_n.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(_n.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=_n.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){if(t.updateWorldMatrix(!1,!1),t.boundingBox!==void 0)t.boundingBox===null&&t.computeBoundingBox(),Si.copy(t.boundingBox),Si.applyMatrix4(t.matrixWorld),this.union(Si);else{let r=t.geometry;if(r!==void 0)if(e&&r.attributes!==void 0&&r.attributes.position!==void 0){let a=r.attributes.position;for(let u=0,h=a.count;u<h;u++)_n.fromBufferAttribute(a,u).applyMatrix4(t.matrixWorld),this.expandByPoint(_n)}else r.boundingBox===null&&r.computeBoundingBox(),Si.copy(r.boundingBox),Si.applyMatrix4(t.matrixWorld),this.union(Si)}let i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,_n),_n.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(vs),Xs.subVectors(this.max,vs),Ei.subVectors(t.a,vs),Ci.subVectors(t.b,vs),Ai.subVectors(t.c,vs),kn.subVectors(Ci,Ei),On.subVectors(Ai,Ci),Kn.subVectors(Ei,Ai);let e=[0,-kn.z,kn.y,0,-On.z,On.y,0,-Kn.z,Kn.y,kn.z,0,-kn.x,On.z,0,-On.x,Kn.z,0,-Kn.x,-kn.y,kn.x,0,-On.y,On.x,0,-Kn.y,Kn.x,0];return!Ao(e,Ei,Ci,Ai,Xs)||(e=[1,0,0,0,1,0,0,0,1],!Ao(e,Ei,Ci,Ai,Xs))?!1:(Ys.crossVectors(kn,On),e=[Ys.x,Ys.y,Ys.z],Ao(e,Ei,Ci,Ai,Xs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,_n).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(_n).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(vn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},vn=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],_n=new Y,Si=new ai,Ei=new Y,Ci=new Y,Ai=new Y,kn=new Y,On=new Y,Kn=new Y,vs=new Y,Xs=new Y,Ys=new Y,Jn=new Y;function Ao(l,t,e,i,r){for(let a=0,u=l.length-3;a<=u;a+=3){Jn.fromArray(l,a);let h=r.x*Math.abs(Jn.x)+r.y*Math.abs(Jn.y)+r.z*Math.abs(Jn.z),f=t.dot(Jn),d=e.dot(Jn),p=i.dot(Jn);if(Math.max(-Math.max(f,d,p),Math.min(f,d,p))>h)return!1}return!0}var If=new ai,_s=new Y,To=new Y,As=class{constructor(t=new Y,e=-1){this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):If.setFromPoints(t).getCenter(i);let r=0;for(let a=0,u=t.length;a<u;a++)r=Math.max(r,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;_s.subVectors(t,this.center);let e=_s.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(_s,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(To.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(_s.copy(t.center).add(To)),this.expandByPoint(_s.copy(t.center).sub(To))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},bn=new Y,Po=new Y,$s=new Y,Fn=new Y,Lo=new Y,js=new Y,Ro=new Y,Ko=class{constructor(t=new Y,e=new Y(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,bn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=bn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(bn.copy(this.origin).addScaledVector(this.direction,e),bn.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){Po.copy(t).add(e).multiplyScalar(.5),$s.copy(e).sub(t).normalize(),Fn.copy(this.origin).sub(Po);let a=t.distanceTo(e)*.5,u=-this.direction.dot($s),h=Fn.dot(this.direction),f=-Fn.dot($s),d=Fn.lengthSq(),p=Math.abs(1-u*u),g,v,_,y;if(p>0)if(g=u*f-h,v=u*h-f,y=a*p,g>=0)if(v>=-y)if(v<=y){let w=1/p;g*=w,v*=w,_=g*(g+u*v+2*h)+v*(u*g+v+2*f)+d}else v=a,g=Math.max(0,-(u*v+h)),_=-g*g+v*(v+2*f)+d;else v=-a,g=Math.max(0,-(u*v+h)),_=-g*g+v*(v+2*f)+d;else v<=-y?(g=Math.max(0,-(-u*a+h)),v=g>0?-a:Math.min(Math.max(-a,-f),a),_=-g*g+v*(v+2*f)+d):v<=y?(g=0,v=Math.min(Math.max(-a,-f),a),_=v*(v+2*f)+d):(g=Math.max(0,-(u*a+h)),v=g>0?a:Math.min(Math.max(-a,-f),a),_=-g*g+v*(v+2*f)+d);else v=u>0?-a:a,g=Math.max(0,-(u*v+h)),_=-g*g+v*(v+2*f)+d;return i&&i.copy(this.origin).addScaledVector(this.direction,g),r&&r.copy(Po).addScaledVector($s,v),_}intersectSphere(t,e){bn.subVectors(t.center,this.origin);let i=bn.dot(this.direction),r=bn.dot(bn)-i*i,a=t.radius*t.radius;if(r>a)return null;let u=Math.sqrt(a-r),h=i-u,f=i+u;return f<0?null:h<0?this.at(f,e):this.at(h,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,a,u,h,f,d=1/this.direction.x,p=1/this.direction.y,g=1/this.direction.z,v=this.origin;return d>=0?(i=(t.min.x-v.x)*d,r=(t.max.x-v.x)*d):(i=(t.max.x-v.x)*d,r=(t.min.x-v.x)*d),p>=0?(a=(t.min.y-v.y)*p,u=(t.max.y-v.y)*p):(a=(t.max.y-v.y)*p,u=(t.min.y-v.y)*p),i>u||a>r||((a>i||isNaN(i))&&(i=a),(u<r||isNaN(r))&&(r=u),g>=0?(h=(t.min.z-v.z)*g,f=(t.max.z-v.z)*g):(h=(t.max.z-v.z)*g,f=(t.min.z-v.z)*g),i>f||h>r)||((h>i||i!==i)&&(i=h),(f<r||r!==r)&&(r=f),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,bn)!==null}intersectTriangle(t,e,i,r,a){Lo.subVectors(e,t),js.subVectors(i,t),Ro.crossVectors(Lo,js);let u=this.direction.dot(Ro),h;if(u>0){if(r)return null;h=1}else if(u<0)h=-1,u=-u;else return null;Fn.subVectors(this.origin,t);let f=h*this.direction.dot(js.crossVectors(Fn,js));if(f<0)return null;let d=h*this.direction.dot(Lo.cross(Fn));if(d<0||f+d>u)return null;let p=-h*Fn.dot(Ro);return p<0?null:this.at(p/u,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},de=class{constructor(){de.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(t,e,i,r,a,u,h,f,d,p,g,v,_,y,w,x){let m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=r,m[1]=a,m[5]=u,m[9]=h,m[13]=f,m[2]=d,m[6]=p,m[10]=g,m[14]=v,m[3]=_,m[7]=y,m[11]=w,m[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new de().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,r=1/Ti.setFromMatrixColumn(t,0).length(),a=1/Ti.setFromMatrixColumn(t,1).length(),u=1/Ti.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*a,e[5]=i[5]*a,e[6]=i[6]*a,e[7]=0,e[8]=i[8]*u,e[9]=i[9]*u,e[10]=i[10]*u,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,r=t.y,a=t.z,u=Math.cos(i),h=Math.sin(i),f=Math.cos(r),d=Math.sin(r),p=Math.cos(a),g=Math.sin(a);if(t.order==="XYZ"){let v=u*p,_=u*g,y=h*p,w=h*g;e[0]=f*p,e[4]=-f*g,e[8]=d,e[1]=_+y*d,e[5]=v-w*d,e[9]=-h*f,e[2]=w-v*d,e[6]=y+_*d,e[10]=u*f}else if(t.order==="YXZ"){let v=f*p,_=f*g,y=d*p,w=d*g;e[0]=v+w*h,e[4]=y*h-_,e[8]=u*d,e[1]=u*g,e[5]=u*p,e[9]=-h,e[2]=_*h-y,e[6]=w+v*h,e[10]=u*f}else if(t.order==="ZXY"){let v=f*p,_=f*g,y=d*p,w=d*g;e[0]=v-w*h,e[4]=-u*g,e[8]=y+_*h,e[1]=_+y*h,e[5]=u*p,e[9]=w-v*h,e[2]=-u*d,e[6]=h,e[10]=u*f}else if(t.order==="ZYX"){let v=u*p,_=u*g,y=h*p,w=h*g;e[0]=f*p,e[4]=y*d-_,e[8]=v*d+w,e[1]=f*g,e[5]=w*d+v,e[9]=_*d-y,e[2]=-d,e[6]=h*f,e[10]=u*f}else if(t.order==="YZX"){let v=u*f,_=u*d,y=h*f,w=h*d;e[0]=f*p,e[4]=w-v*g,e[8]=y*g+_,e[1]=g,e[5]=u*p,e[9]=-h*p,e[2]=-d*p,e[6]=_*g+y,e[10]=v-w*g}else if(t.order==="XZY"){let v=u*f,_=u*d,y=h*f,w=h*d;e[0]=f*p,e[4]=-g,e[8]=d*p,e[1]=v*g+w,e[5]=u*p,e[9]=_*g-y,e[2]=y*g-_,e[6]=h*p,e[10]=w*g+v}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Df,t,Uf)}lookAt(t,e,i){let r=this.elements;return He.subVectors(t,e),He.lengthSq()===0&&(He.z=1),He.normalize(),Vn.crossVectors(i,He),Vn.lengthSq()===0&&(Math.abs(i.z)===1?He.x+=1e-4:He.z+=1e-4,He.normalize(),Vn.crossVectors(i,He)),Vn.normalize(),Zs.crossVectors(He,Vn),r[0]=Vn.x,r[4]=Zs.x,r[8]=He.x,r[1]=Vn.y,r[5]=Zs.y,r[9]=He.y,r[2]=Vn.z,r[6]=Zs.z,r[10]=He.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,r=e.elements,a=this.elements,u=i[0],h=i[4],f=i[8],d=i[12],p=i[1],g=i[5],v=i[9],_=i[13],y=i[2],w=i[6],x=i[10],m=i[14],I=i[3],T=i[7],L=i[11],P=i[15],F=r[0],H=r[4],W=r[8],E=r[12],D=r[1],nt=r[5],at=r[9],G=r[13],Z=r[2],X=r[6],J=r[10],ct=r[14],st=r[3],lt=r[7],ht=r[11],St=r[15];return a[0]=u*F+h*D+f*Z+d*st,a[4]=u*H+h*nt+f*X+d*lt,a[8]=u*W+h*at+f*J+d*ht,a[12]=u*E+h*G+f*ct+d*St,a[1]=p*F+g*D+v*Z+_*st,a[5]=p*H+g*nt+v*X+_*lt,a[9]=p*W+g*at+v*J+_*ht,a[13]=p*E+g*G+v*ct+_*St,a[2]=y*F+w*D+x*Z+m*st,a[6]=y*H+w*nt+x*X+m*lt,a[10]=y*W+w*at+x*J+m*ht,a[14]=y*E+w*G+x*ct+m*St,a[3]=I*F+T*D+L*Z+P*st,a[7]=I*H+T*nt+L*X+P*lt,a[11]=I*W+T*at+L*J+P*ht,a[15]=I*E+T*G+L*ct+P*St,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],r=t[8],a=t[12],u=t[1],h=t[5],f=t[9],d=t[13],p=t[2],g=t[6],v=t[10],_=t[14],y=t[3],w=t[7],x=t[11],m=t[15];return y*(+a*f*g-r*d*g-a*h*v+i*d*v+r*h*_-i*f*_)+w*(+e*f*_-e*d*v+a*u*v-r*u*_+r*d*p-a*f*p)+x*(+e*d*g-e*h*_-a*u*g+i*u*_+a*h*p-i*d*p)+m*(-r*h*p-e*f*g+e*h*v+r*u*g-i*u*v+i*f*p)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],r=t[2],a=t[3],u=t[4],h=t[5],f=t[6],d=t[7],p=t[8],g=t[9],v=t[10],_=t[11],y=t[12],w=t[13],x=t[14],m=t[15],I=g*x*d-w*v*d+w*f*_-h*x*_-g*f*m+h*v*m,T=y*v*d-p*x*d-y*f*_+u*x*_+p*f*m-u*v*m,L=p*w*d-y*g*d+y*h*_-u*w*_-p*h*m+u*g*m,P=y*g*f-p*w*f-y*h*v+u*w*v+p*h*x-u*g*x,F=e*I+i*T+r*L+a*P;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/F;return t[0]=I*H,t[1]=(w*v*a-g*x*a-w*r*_+i*x*_+g*r*m-i*v*m)*H,t[2]=(h*x*a-w*f*a+w*r*d-i*x*d-h*r*m+i*f*m)*H,t[3]=(g*f*a-h*v*a-g*r*d+i*v*d+h*r*_-i*f*_)*H,t[4]=T*H,t[5]=(p*x*a-y*v*a+y*r*_-e*x*_-p*r*m+e*v*m)*H,t[6]=(y*f*a-u*x*a-y*r*d+e*x*d+u*r*m-e*f*m)*H,t[7]=(u*v*a-p*f*a+p*r*d-e*v*d-u*r*_+e*f*_)*H,t[8]=L*H,t[9]=(y*g*a-p*w*a-y*i*_+e*w*_+p*i*m-e*g*m)*H,t[10]=(u*w*a-y*h*a+y*i*d-e*w*d-u*i*m+e*h*m)*H,t[11]=(p*h*a-u*g*a-p*i*d+e*g*d+u*i*_-e*h*_)*H,t[12]=P*H,t[13]=(p*w*r-y*g*r+y*i*v-e*w*v-p*i*x+e*g*x)*H,t[14]=(y*h*r-u*w*r-y*i*f+e*w*f+u*i*x-e*h*x)*H,t[15]=(u*g*r-p*h*r+p*i*f-e*g*f-u*i*v+e*h*v)*H,this}scale(t){let e=this.elements,i=t.x,r=t.y,a=t.z;return e[0]*=i,e[4]*=r,e[8]*=a,e[1]*=i,e[5]*=r,e[9]*=a,e[2]*=i,e[6]*=r,e[10]*=a,e[3]*=i,e[7]*=r,e[11]*=a,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),r=Math.sin(e),a=1-i,u=t.x,h=t.y,f=t.z,d=a*u,p=a*h;return this.set(d*u+i,d*h-r*f,d*f+r*h,0,d*h+r*f,p*h+i,p*f-r*u,0,d*f-r*h,p*f+r*u,a*f*f+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,a,u){return this.set(1,i,a,0,t,1,u,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){let r=this.elements,a=e._x,u=e._y,h=e._z,f=e._w,d=a+a,p=u+u,g=h+h,v=a*d,_=a*p,y=a*g,w=u*p,x=u*g,m=h*g,I=f*d,T=f*p,L=f*g,P=i.x,F=i.y,H=i.z;return r[0]=(1-(w+m))*P,r[1]=(_+L)*P,r[2]=(y-T)*P,r[3]=0,r[4]=(_-L)*F,r[5]=(1-(v+m))*F,r[6]=(x+I)*F,r[7]=0,r[8]=(y+T)*H,r[9]=(x-I)*H,r[10]=(1-(v+w))*H,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){let r=this.elements,a=Ti.set(r[0],r[1],r[2]).length(),u=Ti.set(r[4],r[5],r[6]).length(),h=Ti.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),t.x=r[12],t.y=r[13],t.z=r[14],Qe.copy(this);let d=1/a,p=1/u,g=1/h;return Qe.elements[0]*=d,Qe.elements[1]*=d,Qe.elements[2]*=d,Qe.elements[4]*=p,Qe.elements[5]*=p,Qe.elements[6]*=p,Qe.elements[8]*=g,Qe.elements[9]*=g,Qe.elements[10]*=g,e.setFromRotationMatrix(Qe),i.x=a,i.y=u,i.z=h,this}makePerspective(t,e,i,r,a,u){let h=this.elements,f=2*a/(e-t),d=2*a/(i-r),p=(e+t)/(e-t),g=(i+r)/(i-r),v=-(u+a)/(u-a),_=-2*u*a/(u-a);return h[0]=f,h[4]=0,h[8]=p,h[12]=0,h[1]=0,h[5]=d,h[9]=g,h[13]=0,h[2]=0,h[6]=0,h[10]=v,h[14]=_,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,e,i,r,a,u){let h=this.elements,f=1/(e-t),d=1/(i-r),p=1/(u-a),g=(e+t)*f,v=(i+r)*d,_=(u+a)*p;return h[0]=2*f,h[4]=0,h[8]=0,h[12]=-g,h[1]=0,h[5]=2*d,h[9]=0,h[13]=-v,h[2]=0,h[6]=0,h[10]=-2*p,h[14]=-_,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},Ti=new Y,Qe=new de,Df=new Y(0,0,0),Uf=new Y(1,1,1),Vn=new Y,Zs=new Y,He=new Y,yc=new de,wc=new rn,ji=class{constructor(t=0,e=0,i=0,r=ji.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let r=t.elements,a=r[0],u=r[4],h=r[8],f=r[1],d=r[5],p=r[9],g=r[2],v=r[6],_=r[10];switch(e){case"XYZ":this._y=Math.asin(Ie(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-p,_),this._z=Math.atan2(-u,a)):(this._x=Math.atan2(v,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Ie(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(h,_),this._z=Math.atan2(f,d)):(this._y=Math.atan2(-g,a),this._z=0);break;case"ZXY":this._x=Math.asin(Ie(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-g,_),this._z=Math.atan2(-u,d)):(this._y=0,this._z=Math.atan2(f,a));break;case"ZYX":this._y=Math.asin(-Ie(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(v,_),this._z=Math.atan2(f,a)):(this._x=0,this._z=Math.atan2(-u,d));break;case"YZX":this._z=Math.asin(Ie(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-p,d),this._y=Math.atan2(-g,a)):(this._x=0,this._y=Math.atan2(h,_));break;case"XZY":this._z=Math.asin(-Ie(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(v,d),this._y=Math.atan2(h,a)):(this._x=Math.atan2(-p,_),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return yc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(yc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return wc.setFromEuler(this),this.setFromQuaternion(wc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ji.DEFAULT_ORDER="XYZ";var br=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Nf=0,Mc=new Y,Pi=new rn,xn=new de,Ks=new Y,bs=new Y,kf=new Y,Of=new rn,Sc=new Y(1,0,0),Ec=new Y(0,1,0),Cc=new Y(0,0,1),Ff={type:"added"},Ac={type:"removed"},Se=class extends dn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=Ds(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Se.DEFAULT_UP.clone();let t=new Y,e=new ji,i=new rn,r=new Y(1,1,1);function a(){i.setFromEuler(e,!1)}function u(){e.setFromQuaternion(i,void 0,!1)}e._onChange(a),i._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new de},normalMatrix:{value:new Xt}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=Se.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new br,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Pi.setFromAxisAngle(t,e),this.quaternion.multiply(Pi),this}rotateOnWorldAxis(t,e){return Pi.setFromAxisAngle(t,e),this.quaternion.premultiply(Pi),this}rotateX(t){return this.rotateOnAxis(Sc,t)}rotateY(t){return this.rotateOnAxis(Ec,t)}rotateZ(t){return this.rotateOnAxis(Cc,t)}translateOnAxis(t,e){return Mc.copy(t).applyQuaternion(this.quaternion),this.position.add(Mc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Sc,t)}translateY(t){return this.translateOnAxis(Ec,t)}translateZ(t){return this.translateOnAxis(Cc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Ks.copy(t):Ks.set(t,e,i);let r=this.parent;this.updateWorldMatrix(!0,!1),bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(bs,Ks,this.up):xn.lookAt(Ks,bs,this.up),this.quaternion.setFromRotationMatrix(xn),r&&(xn.extractRotation(r.matrixWorld),Pi.setFromRotationMatrix(xn),this.quaternion.premultiply(Pi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Ff)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ac)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){for(let t=0;t<this.children.length;t++){let e=this.children[t];e.parent=null,e.dispatchEvent(Ac)}return this.children.length=0,this}attach(t){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(xn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){let u=this.children[i].getObjectByProperty(t,e);if(u!==void 0)return u}}getObjectsByProperty(t,e){let i=[];this[t]===e&&i.push(this);for(let r=0,a=this.children.length;r<a;r++){let u=this.children[r].getObjectsByProperty(t,e);u.length>0&&(i=i.concat(u))}return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,t,kf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,Of,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,r=e.length;i<r;i++){let a=e[i];(a.matrixWorldAutoUpdate===!0||t===!0)&&a.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let r=this.children;for(let a=0,u=r.length;a<u;a++){let h=r[a];h.matrixWorldAutoUpdate===!0&&h.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON()));function a(h,f){return h[f.uuid]===void 0&&(h[f.uuid]=f.toJSON(t)),f.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(t.geometries,this.geometry);let h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){let f=h.shapes;if(Array.isArray(f))for(let d=0,p=f.length;d<p;d++){let g=f[d];a(t.shapes,g)}else a(t.shapes,f)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let h=[];for(let f=0,d=this.material.length;f<d;f++)h.push(a(t.materials,this.material[f]));r.material=h}else r.material=a(t.materials,this.material);if(this.children.length>0){r.children=[];for(let h=0;h<this.children.length;h++)r.children.push(this.children[h].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let h=0;h<this.animations.length;h++){let f=this.animations[h];r.animations.push(a(t.animations,f))}}if(e){let h=u(t.geometries),f=u(t.materials),d=u(t.textures),p=u(t.images),g=u(t.shapes),v=u(t.skeletons),_=u(t.animations),y=u(t.nodes);h.length>0&&(i.geometries=h),f.length>0&&(i.materials=f),d.length>0&&(i.textures=d),p.length>0&&(i.images=p),g.length>0&&(i.shapes=g),v.length>0&&(i.skeletons=v),_.length>0&&(i.animations=_),y.length>0&&(i.nodes=y)}return i.object=r,i;function u(h){let f=[];for(let d in h){let p=h[d];delete p.metadata,f.push(p)}return f}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let r=t.children[i];this.add(r.clone())}return this}};Se.DEFAULT_UP=new Y(0,1,0);Se.DEFAULT_MATRIX_AUTO_UPDATE=!0;Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var tn=new Y,yn=new Y,Io=new Y,wn=new Y,Li=new Y,Ri=new Y,Tc=new Y,Do=new Y,Uo=new Y,No=new Y,Js=!1,We=class{constructor(t=new Y,e=new Y,i=new Y){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),tn.subVectors(t,e),r.cross(tn);let a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(t,e,i,r,a){tn.subVectors(r,e),yn.subVectors(i,e),Io.subVectors(t,e);let u=tn.dot(tn),h=tn.dot(yn),f=tn.dot(Io),d=yn.dot(yn),p=yn.dot(Io),g=u*d-h*h;if(g===0)return a.set(-2,-1,-1);let v=1/g,_=(d*f-h*p)*v,y=(u*p-h*f)*v;return a.set(1-_-y,y,_)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,wn),wn.x>=0&&wn.y>=0&&wn.x+wn.y<=1}static getUV(t,e,i,r,a,u,h,f){return Js===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Js=!0),this.getInterpolation(t,e,i,r,a,u,h,f)}static getInterpolation(t,e,i,r,a,u,h,f){return this.getBarycoord(t,e,i,r,wn),f.setScalar(0),f.addScaledVector(a,wn.x),f.addScaledVector(u,wn.y),f.addScaledVector(h,wn.z),f}static isFrontFacing(t,e,i,r){return tn.subVectors(i,e),yn.subVectors(t,e),tn.cross(yn).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return tn.subVectors(this.c,this.b),yn.subVectors(this.a,this.b),tn.cross(yn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return We.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return We.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,i,r,a){return Js===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Js=!0),We.getInterpolation(t,this.a,this.b,this.c,e,i,r,a)}getInterpolation(t,e,i,r,a){return We.getInterpolation(t,this.a,this.b,this.c,e,i,r,a)}containsPoint(t){return We.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return We.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,r=this.b,a=this.c,u,h;Li.subVectors(r,i),Ri.subVectors(a,i),Do.subVectors(t,i);let f=Li.dot(Do),d=Ri.dot(Do);if(f<=0&&d<=0)return e.copy(i);Uo.subVectors(t,r);let p=Li.dot(Uo),g=Ri.dot(Uo);if(p>=0&&g<=p)return e.copy(r);let v=f*g-p*d;if(v<=0&&f>=0&&p<=0)return u=f/(f-p),e.copy(i).addScaledVector(Li,u);No.subVectors(t,a);let _=Li.dot(No),y=Ri.dot(No);if(y>=0&&_<=y)return e.copy(a);let w=_*d-f*y;if(w<=0&&d>=0&&y<=0)return h=d/(d-y),e.copy(i).addScaledVector(Ri,h);let x=p*y-_*g;if(x<=0&&g-p>=0&&_-y>=0)return Tc.subVectors(a,r),h=(g-p)/(g-p+(_-y)),e.copy(r).addScaledVector(Tc,h);let m=1/(x+w+v);return u=w*m,h=v*m,e.copy(i).addScaledVector(Li,u).addScaledVector(Ri,h)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Vf=0,li=class extends dn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=Ds(),this.name="",this.type="Material",this.blending=Hi,this.side=Hn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=ih,this.blendDst=sh,this.blendEquation=Vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Go,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xo,this.stencilZFail=xo,this.stencilZPass=xo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Hi&&(i.blending=this.blending),this.side!==Hn&&(i.side=this.side),this.vertexColors&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=this.transparent),i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.stencilWrite=this.stencilWrite,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(i.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(i.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(i.wireframe=this.wireframe),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=this.flatShading),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){let u=[];for(let h in a){let f=a[h];delete f.metadata,u.push(f)}return u}if(e){let a=r(t.textures),u=r(t.images);a.length>0&&(i.textures=a),u.length>0&&(i.images=u)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let r=e.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=e[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},hh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},en={h:0,s:0,l:0},Qs={h:0,s:0,l:0};function ko(l,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?l+(t-l)*6*e:e<1/2?t:e<2/3?l+(t-l)*6*(2/3-e):l}var Kt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,e===void 0&&i===void 0?this.set(t):this.setRGB(t,e,i)}set(t){return t&&t.isColor?this.copy(t):typeof t=="number"?this.setHex(t):typeof t=="string"&&this.setStyle(t),this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=hn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Be.toWorkingColorSpace(this,e),this}setRGB(t,e,i,r=Be.workingColorSpace){return this.r=t,this.g=e,this.b=i,Be.toWorkingColorSpace(this,r),this}setHSL(t,e,i,r=Be.workingColorSpace){if(t=Mf(t,1),e=Ie(e,0,1),i=Ie(i,0,1),e===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+e):i+e-i*e,u=2*i-a;this.r=ko(u,a,t+1/3),this.g=ko(u,a,t),this.b=ko(u,a,t-1/3)}return Be.toWorkingColorSpace(this,r),this}setStyle(t,e=hn){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let a,u=r[1],h=r[2];switch(u){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return this.r=Math.min(255,parseInt(a[1],10))/255,this.g=Math.min(255,parseInt(a[2],10))/255,this.b=Math.min(255,parseInt(a[3],10))/255,Be.toWorkingColorSpace(this,e),i(a[4]),this;if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return this.r=Math.min(100,parseInt(a[1],10))/100,this.g=Math.min(100,parseInt(a[2],10))/100,this.b=Math.min(100,parseInt(a[3],10))/100,Be.toWorkingColorSpace(this,e),i(a[4]),this;break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h)){let f=parseFloat(a[1])/360,d=parseFloat(a[2])/100,p=parseFloat(a[3])/100;return i(a[4]),this.setHSL(f,d,p,e)}break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){let a=r[1],u=a.length;if(u===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,e);if(u===6)return this.setHex(parseInt(a,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=hn){let i=hh[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Wi(t.r),this.g=Wi(t.g),this.b=Wi(t.b),this}copyLinearToSRGB(t){return this.r=So(t.r),this.g=So(t.g),this.b=So(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=hn){return Be.fromWorkingColorSpace(Te.copy(this),t),Ie(Te.r*255,0,255)<<16^Ie(Te.g*255,0,255)<<8^Ie(Te.b*255,0,255)<<0}getHexString(t=hn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Be.workingColorSpace){Be.fromWorkingColorSpace(Te.copy(this),e);let i=Te.r,r=Te.g,a=Te.b,u=Math.max(i,r,a),h=Math.min(i,r,a),f,d,p=(h+u)/2;if(h===u)f=0,d=0;else{let g=u-h;switch(d=p<=.5?g/(u+h):g/(2-u-h),u){case i:f=(r-a)/g+(r<a?6:0);break;case r:f=(a-i)/g+2;break;case a:f=(i-r)/g+4;break}f/=6}return t.h=f,t.s=d,t.l=p,t}getRGB(t,e=Be.workingColorSpace){return Be.fromWorkingColorSpace(Te.copy(this),e),t.r=Te.r,t.g=Te.g,t.b=Te.b,t}getStyle(t=hn){Be.fromWorkingColorSpace(Te.copy(this),t);let e=Te.r,i=Te.g,r=Te.b;return t!==hn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${e*255|0},${i*255|0},${r*255|0})`}offsetHSL(t,e,i){return this.getHSL(en),en.h+=t,en.s+=e,en.l+=i,this.setHSL(en.h,en.s,en.l),this}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(en),t.getHSL(Qs);let i=wo(en.h,Qs.h,e),r=wo(en.s,Qs.s,e),a=wo(en.l,Qs.l,e);return this.setHSL(i,r,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,r=this.b,a=t.elements;return this.r=a[0]*e+a[3]*i+a[6]*r,this.g=a[1]*e+a[4]*i+a[7]*r,this.b=a[2]*e+a[5]*i+a[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Te=new Kt;Kt.NAMES=hh;var xr=class extends li{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ea,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var me=new Y,tr=new Gt,Pe=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=vc,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)tr.fromBufferAttribute(this,e),tr.applyMatrix3(t),this.setXY(e,tr.x,tr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.applyMatrix3(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.applyMatrix4(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.applyNormalMatrix(t),this.setXYZ(e,me.x,me.y,me.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.transformDirection(t),this.setXYZ(e,me.x,me.y,me.z);return this}set(t,e=0){return this.array.set(t,e),this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=qs(e,this.array)),e}setX(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=qs(e,this.array)),e}setY(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=qs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=qs(e,this.array)),e}setW(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),i=ze(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),i=ze(i,this.array),r=ze(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,a){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),i=ze(i,this.array),r=ze(r,this.array),a=ze(a,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==vc&&(t.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(t.updateRange=this.updateRange),t}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}};var yr=class extends Pe{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var wr=class extends Pe{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Ke=class extends Pe{constructor(t,e,i){super(new Float32Array(t),e,i)}};var zf=0,$e=new de,Oo=new Se,Ii=new Y,Ge=new ai,xs=new ai,ye=new Y,Je=class extends dn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zf++}),this.uuid=Ds(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ch(t)?wr:yr)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let a=new Xt().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return $e.makeRotationFromQuaternion(t),this.applyMatrix4($e),this}rotateX(t){return $e.makeRotationX(t),this.applyMatrix4($e),this}rotateY(t){return $e.makeRotationY(t),this.applyMatrix4($e),this}rotateZ(t){return $e.makeRotationZ(t),this.applyMatrix4($e),this}translate(t,e,i){return $e.makeTranslation(t,e,i),this.applyMatrix4($e),this}scale(t,e,i){return $e.makeScale(t,e,i),this.applyMatrix4($e),this}lookAt(t){return Oo.lookAt(t),Oo.updateMatrix(),this.applyMatrix4(Oo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ii).negate(),this.translate(Ii.x,Ii.y,Ii.z),this}setFromPoints(t){let e=[];for(let i=0,r=t.length;i<r;i++){let a=t[i];e.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new Ke(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ai);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){let a=e[i];Ge.setFromBufferAttribute(a),this.morphTargetsRelative?(ye.addVectors(this.boundingBox.min,Ge.min),this.boundingBox.expandByPoint(ye),ye.addVectors(this.boundingBox.max,Ge.max),this.boundingBox.expandByPoint(ye)):(this.boundingBox.expandByPoint(Ge.min),this.boundingBox.expandByPoint(Ge.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new As);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new Y,1/0);return}if(t){let i=this.boundingSphere.center;if(Ge.setFromBufferAttribute(t),e)for(let a=0,u=e.length;a<u;a++){let h=e[a];xs.setFromBufferAttribute(h),this.morphTargetsRelative?(ye.addVectors(Ge.min,xs.min),Ge.expandByPoint(ye),ye.addVectors(Ge.max,xs.max),Ge.expandByPoint(ye)):(Ge.expandByPoint(xs.min),Ge.expandByPoint(xs.max))}Ge.getCenter(i);let r=0;for(let a=0,u=t.count;a<u;a++)ye.fromBufferAttribute(t,a),r=Math.max(r,i.distanceToSquared(ye));if(e)for(let a=0,u=e.length;a<u;a++){let h=e[a],f=this.morphTargetsRelative;for(let d=0,p=h.count;d<p;d++)ye.fromBufferAttribute(h,d),f&&(Ii.fromBufferAttribute(t,d),ye.add(Ii)),r=Math.max(r,i.distanceToSquared(ye))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.array,r=e.position.array,a=e.normal.array,u=e.uv.array,h=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pe(new Float32Array(4*h),4));let f=this.getAttribute("tangent").array,d=[],p=[];for(let D=0;D<h;D++)d[D]=new Y,p[D]=new Y;let g=new Y,v=new Y,_=new Y,y=new Gt,w=new Gt,x=new Gt,m=new Y,I=new Y;function T(D,nt,at){g.fromArray(r,D*3),v.fromArray(r,nt*3),_.fromArray(r,at*3),y.fromArray(u,D*2),w.fromArray(u,nt*2),x.fromArray(u,at*2),v.sub(g),_.sub(g),w.sub(y),x.sub(y);let G=1/(w.x*x.y-x.x*w.y);isFinite(G)&&(m.copy(v).multiplyScalar(x.y).addScaledVector(_,-w.y).multiplyScalar(G),I.copy(_).multiplyScalar(w.x).addScaledVector(v,-x.x).multiplyScalar(G),d[D].add(m),d[nt].add(m),d[at].add(m),p[D].add(I),p[nt].add(I),p[at].add(I))}let L=this.groups;L.length===0&&(L=[{start:0,count:i.length}]);for(let D=0,nt=L.length;D<nt;++D){let at=L[D],G=at.start,Z=at.count;for(let X=G,J=G+Z;X<J;X+=3)T(i[X+0],i[X+1],i[X+2])}let P=new Y,F=new Y,H=new Y,W=new Y;function E(D){H.fromArray(a,D*3),W.copy(H);let nt=d[D];P.copy(nt),P.sub(H.multiplyScalar(H.dot(nt))).normalize(),F.crossVectors(W,nt);let G=F.dot(p[D])<0?-1:1;f[D*4]=P.x,f[D*4+1]=P.y,f[D*4+2]=P.z,f[D*4+3]=G}for(let D=0,nt=L.length;D<nt;++D){let at=L[D],G=at.start,Z=at.count;for(let X=G,J=G+Z;X<J;X+=3)E(i[X+0]),E(i[X+1]),E(i[X+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Pe(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let v=0,_=i.count;v<_;v++)i.setXYZ(v,0,0,0);let r=new Y,a=new Y,u=new Y,h=new Y,f=new Y,d=new Y,p=new Y,g=new Y;if(t)for(let v=0,_=t.count;v<_;v+=3){let y=t.getX(v+0),w=t.getX(v+1),x=t.getX(v+2);r.fromBufferAttribute(e,y),a.fromBufferAttribute(e,w),u.fromBufferAttribute(e,x),p.subVectors(u,a),g.subVectors(r,a),p.cross(g),h.fromBufferAttribute(i,y),f.fromBufferAttribute(i,w),d.fromBufferAttribute(i,x),h.add(p),f.add(p),d.add(p),i.setXYZ(y,h.x,h.y,h.z),i.setXYZ(w,f.x,f.y,f.z),i.setXYZ(x,d.x,d.y,d.z)}else for(let v=0,_=e.count;v<_;v+=3)r.fromBufferAttribute(e,v+0),a.fromBufferAttribute(e,v+1),u.fromBufferAttribute(e,v+2),p.subVectors(u,a),g.subVectors(r,a),p.cross(g),i.setXYZ(v+0,p.x,p.y,p.z),i.setXYZ(v+1,p.x,p.y,p.z),i.setXYZ(v+2,p.x,p.y,p.z);this.normalizeNormals(),i.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeGeometries() instead."),this}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)ye.fromBufferAttribute(t,e),ye.normalize(),t.setXYZ(e,ye.x,ye.y,ye.z)}toNonIndexed(){function t(h,f){let d=h.array,p=h.itemSize,g=h.normalized,v=new d.constructor(f.length*p),_=0,y=0;for(let w=0,x=f.length;w<x;w++){h.isInterleavedBufferAttribute?_=f[w]*h.data.stride+h.offset:_=f[w]*p;for(let m=0;m<p;m++)v[y++]=d[_++]}return new Pe(v,p,g)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new Je,i=this.index.array,r=this.attributes;for(let h in r){let f=r[h],d=t(f,i);e.setAttribute(h,d)}let a=this.morphAttributes;for(let h in a){let f=[],d=a[h];for(let p=0,g=d.length;p<g;p++){let v=d[p],_=t(v,i);f.push(_)}e.morphAttributes[h]=f}e.morphTargetsRelative=this.morphTargetsRelative;let u=this.groups;for(let h=0,f=u.length;h<f;h++){let d=u[h];e.addGroup(d.start,d.count,d.materialIndex)}return e}toJSON(){let t={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let f=this.parameters;for(let d in f)f[d]!==void 0&&(t[d]=f[d]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let f in i){let d=i[f];t.data.attributes[f]=d.toJSON(t.data)}let r={},a=!1;for(let f in this.morphAttributes){let d=this.morphAttributes[f],p=[];for(let g=0,v=d.length;g<v;g++){let _=d[g];p.push(_.toJSON(t.data))}p.length>0&&(r[f]=p,a=!0)}a&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);let u=this.groups;u.length>0&&(t.data.groups=JSON.parse(JSON.stringify(u)));let h=this.boundingSphere;return h!==null&&(t.data.boundingSphere={center:h.center.toArray(),radius:h.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let r=t.attributes;for(let d in r){let p=r[d];this.setAttribute(d,p.clone(e))}let a=t.morphAttributes;for(let d in a){let p=[],g=a[d];for(let v=0,_=g.length;v<_;v++)p.push(g[v].clone(e));this.morphAttributes[d]=p}this.morphTargetsRelative=t.morphTargetsRelative;let u=t.groups;for(let d=0,p=u.length;d<p;d++){let g=u[d];this.addGroup(g.start,g.count,g.materialIndex)}let h=t.boundingBox;h!==null&&(this.boundingBox=h.clone());let f=t.boundingSphere;return f!==null&&(this.boundingSphere=f.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Pc=new de,cn=new Ko,er=new As,Lc=new Y,Di=new Y,Ui=new Y,Ni=new Y,Fo=new Y,nr=new Y,ir=new Gt,sr=new Gt,rr=new Gt,Rc=new Y,Ic=new Y,Dc=new Y,or=new Y,ar=new Y,Ze=class extends Se{constructor(t=new Je,e=new xr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,u=r.length;a<u;a++){let h=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=a}}}}getVertexPosition(t,e){let i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,u=i.morphTargetsRelative;e.fromBufferAttribute(r,t);let h=this.morphTargetInfluences;if(a&&h){nr.set(0,0,0);for(let f=0,d=a.length;f<d;f++){let p=h[f],g=a[f];p!==0&&(Fo.fromBufferAttribute(g,t),u?nr.addScaledVector(Fo,p):nr.addScaledVector(Fo.sub(e),p))}e.add(nr)}return this.isSkinnedMesh&&this.applyBoneTransform(t,e),e}raycast(t,e){let i=this.geometry,r=this.material,a=this.matrixWorld;if(r===void 0||(i.boundingSphere===null&&i.computeBoundingSphere(),er.copy(i.boundingSphere),er.applyMatrix4(a),cn.copy(t.ray).recast(t.near),er.containsPoint(cn.origin)===!1&&(cn.intersectSphere(er,Lc)===null||cn.origin.distanceToSquared(Lc)>(t.far-t.near)**2))||(Pc.copy(a).invert(),cn.copy(t.ray).applyMatrix4(Pc),i.boundingBox!==null&&cn.intersectsBox(i.boundingBox)===!1))return;let u,h=i.index,f=i.attributes.position,d=i.attributes.uv,p=i.attributes.uv2,g=i.attributes.normal,v=i.groups,_=i.drawRange;if(h!==null)if(Array.isArray(r))for(let y=0,w=v.length;y<w;y++){let x=v[y],m=r[x.materialIndex],I=Math.max(x.start,_.start),T=Math.min(h.count,Math.min(x.start+x.count,_.start+_.count));for(let L=I,P=T;L<P;L+=3){let F=h.getX(L),H=h.getX(L+1),W=h.getX(L+2);u=lr(this,m,t,cn,d,p,g,F,H,W),u&&(u.faceIndex=Math.floor(L/3),u.face.materialIndex=x.materialIndex,e.push(u))}}else{let y=Math.max(0,_.start),w=Math.min(h.count,_.start+_.count);for(let x=y,m=w;x<m;x+=3){let I=h.getX(x),T=h.getX(x+1),L=h.getX(x+2);u=lr(this,r,t,cn,d,p,g,I,T,L),u&&(u.faceIndex=Math.floor(x/3),e.push(u))}}else if(f!==void 0)if(Array.isArray(r))for(let y=0,w=v.length;y<w;y++){let x=v[y],m=r[x.materialIndex],I=Math.max(x.start,_.start),T=Math.min(f.count,Math.min(x.start+x.count,_.start+_.count));for(let L=I,P=T;L<P;L+=3){let F=L,H=L+1,W=L+2;u=lr(this,m,t,cn,d,p,g,F,H,W),u&&(u.faceIndex=Math.floor(L/3),u.face.materialIndex=x.materialIndex,e.push(u))}}else{let y=Math.max(0,_.start),w=Math.min(f.count,_.start+_.count);for(let x=y,m=w;x<m;x+=3){let I=x,T=x+1,L=x+2;u=lr(this,r,t,cn,d,p,g,I,T,L),u&&(u.faceIndex=Math.floor(x/3),e.push(u))}}}};function Bf(l,t,e,i,r,a,u,h){let f;if(t.side===Oe?f=i.intersectTriangle(u,a,r,!0,h):f=i.intersectTriangle(r,a,u,t.side===Hn,h),f===null)return null;ar.copy(h),ar.applyMatrix4(l.matrixWorld);let d=e.ray.origin.distanceTo(ar);return d<e.near||d>e.far?null:{distance:d,point:ar.clone(),object:l}}function lr(l,t,e,i,r,a,u,h,f,d){l.getVertexPosition(h,Di),l.getVertexPosition(f,Ui),l.getVertexPosition(d,Ni);let p=Bf(l,t,e,i,Di,Ui,Ni,or);if(p){r&&(ir.fromBufferAttribute(r,h),sr.fromBufferAttribute(r,f),rr.fromBufferAttribute(r,d),p.uv=We.getInterpolation(or,Di,Ui,Ni,ir,sr,rr,new Gt)),a&&(ir.fromBufferAttribute(a,h),sr.fromBufferAttribute(a,f),rr.fromBufferAttribute(a,d),p.uv2=We.getInterpolation(or,Di,Ui,Ni,ir,sr,rr,new Gt)),u&&(Rc.fromBufferAttribute(u,h),Ic.fromBufferAttribute(u,f),Dc.fromBufferAttribute(u,d),p.normal=We.getInterpolation(or,Di,Ui,Ni,Rc,Ic,Dc,new Y),p.normal.dot(i.direction)>0&&p.normal.multiplyScalar(-1));let g={a:h,b:f,c:d,normal:new Y,materialIndex:0};We.getNormal(Di,Ui,Ni,g.normal),p.face=g}return p}var ci=class extends Je{constructor(t=1,e=1,i=1,r=1,a=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:a,depthSegments:u};let h=this;r=Math.floor(r),a=Math.floor(a),u=Math.floor(u);let f=[],d=[],p=[],g=[],v=0,_=0;y("z","y","x",-1,-1,i,e,t,u,a,0),y("z","y","x",1,-1,i,e,-t,u,a,1),y("x","z","y",1,1,t,i,e,r,u,2),y("x","z","y",1,-1,t,i,-e,r,u,3),y("x","y","z",1,-1,t,e,i,r,a,4),y("x","y","z",-1,-1,t,e,-i,r,a,5),this.setIndex(f),this.setAttribute("position",new Ke(d,3)),this.setAttribute("normal",new Ke(p,3)),this.setAttribute("uv",new Ke(g,2));function y(w,x,m,I,T,L,P,F,H,W,E){let D=L/H,nt=P/W,at=L/2,G=P/2,Z=F/2,X=H+1,J=W+1,ct=0,st=0,lt=new Y;for(let ht=0;ht<J;ht++){let St=ht*nt-G;for(let ut=0;ut<X;ut++){let j=ut*D-at;lt[w]=j*I,lt[x]=St*T,lt[m]=Z,d.push(lt.x,lt.y,lt.z),lt[w]=0,lt[x]=0,lt[m]=F>0?1:-1,p.push(lt.x,lt.y,lt.z),g.push(ut/H),g.push(1-ht/W),ct+=1}}for(let ht=0;ht<W;ht++)for(let St=0;St<H;St++){let ut=v+St+X*ht,j=v+St+X*(ht+1),rt=v+(St+1)+X*(ht+1),gt=v+(St+1)+X*ht;f.push(ut,j,gt),f.push(j,rt,gt),st+=6}h.addGroup(_,st,E),_+=st,v+=ct}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ci(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Zi(l){let t={};for(let e in l){t[e]={};for(let i in l[e]){let r=l[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function Le(l){let t={};for(let e=0;e<l.length;e++){let i=Zi(l[e]);for(let r in i)t[r]=i[r]}return t}function Hf(l){let t=[];for(let e=0;e<l.length;e++)t.push(l[e].clone());return t}function uh(l){return l.getRenderTarget()===null&&l.outputEncoding===ce?hn:Cs}var Gf={clone:Zi,merge:Le},Wf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Tn=class extends li{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wf,this.fragmentShader=qf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Zi(t.uniforms),this.uniformsGroups=Hf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let r in this.uniforms){let u=this.uniforms[r].value;u&&u.isTexture?e.uniforms[r]={type:"t",value:u.toJSON(t).uuid}:u&&u.isColor?e.uniforms[r]={type:"c",value:u.getHex()}:u&&u.isVector2?e.uniforms[r]={type:"v2",value:u.toArray()}:u&&u.isVector3?e.uniforms[r]={type:"v3",value:u.toArray()}:u&&u.isVector4?e.uniforms[r]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?e.uniforms[r]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?e.uniforms[r]={type:"m4",value:u.toArray()}:e.uniforms[r]={value:u}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},Mr=class extends Se{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(-e[8],-e[9],-e[10]).normalize()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},De=class extends Mr{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=jo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(yo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return jo*2*Math.atan(Math.tan(yo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,i,r,a,u){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(yo*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,a=-.5*r,u=this.view;if(this.view!==null&&this.view.enabled){let f=u.fullWidth,d=u.fullHeight;a+=u.offsetX*r/f,e-=u.offsetY*i/d,r*=u.width/f,i*=u.height/d}let h=this.filmOffset;h!==0&&(a+=t*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,e,e-i,t,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},ki=-90,Oi=1,Jo=class extends Se{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i;let r=new De(ki,Oi,t,e);r.layers=this.layers,r.up.set(0,1,0),r.lookAt(1,0,0),this.add(r);let a=new De(ki,Oi,t,e);a.layers=this.layers,a.up.set(0,1,0),a.lookAt(-1,0,0),this.add(a);let u=new De(ki,Oi,t,e);u.layers=this.layers,u.up.set(0,0,-1),u.lookAt(0,1,0),this.add(u);let h=new De(ki,Oi,t,e);h.layers=this.layers,h.up.set(0,0,1),h.lookAt(0,-1,0),this.add(h);let f=new De(ki,Oi,t,e);f.layers=this.layers,f.up.set(0,1,0),f.lookAt(0,0,1),this.add(f);let d=new De(ki,Oi,t,e);d.layers=this.layers,d.up.set(0,1,0),d.lookAt(0,0,-1),this.add(d)}update(t,e){this.parent===null&&this.updateMatrixWorld();let i=this.renderTarget,[r,a,u,h,f,d]=this.children,p=t.getRenderTarget(),g=t.toneMapping,v=t.xr.enabled;t.toneMapping=Cn,t.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0),t.render(e,r),t.setRenderTarget(i,1),t.render(e,a),t.setRenderTarget(i,2),t.render(e,u),t.setRenderTarget(i,3),t.render(e,h),t.setRenderTarget(i,4),t.render(e,f),i.texture.generateMipmaps=_,t.setRenderTarget(i,5),t.render(e,d),t.setRenderTarget(p),t.toneMapping=g,t.xr.enabled=v,i.texture.needsPMREMUpdate=!0}},Sr=class extends Ue{constructor(t,e,i,r,a,u,h,f,d,p){t=t!==void 0?t:[],e=e!==void 0?e:Xi,super(t,e,i,r,a,u,h,f,d,p),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Qo=class extends An{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Sr(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:je}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.encoding=e.encoding,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ci(5,5,5),a=new Tn({name:"CubemapFromEquirect",uniforms:Zi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Oe,blending:Bn});a.uniforms.tEquirect.value=e;let u=new Ze(r,a),h=e.minFilter;return e.minFilter===Ss&&(e.minFilter=je),new Jo(1,10,this).update(t,u),e.minFilter=h,u.geometry.dispose(),u.material.dispose(),this}clear(t,e,i,r){let a=t.getRenderTarget();for(let u=0;u<6;u++)t.setRenderTarget(this,u),t.clear(e,i,r);t.setRenderTarget(a)}},Vo=new Y,Xf=new Y,Yf=new Xt,Sn=class{constructor(t=new Y(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let r=Vo.subVectors(i,e).cross(Xf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(Vo),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Yf.getNormalMatrix(t),r=this.coplanarPoint(Vo).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Qn=new As,cr=new Y,Er=class{constructor(t=new Sn,e=new Sn,i=new Sn,r=new Sn,a=new Sn,u=new Sn){this.planes=[t,e,i,r,a,u]}set(t,e,i,r,a,u){let h=this.planes;return h[0].copy(t),h[1].copy(e),h[2].copy(i),h[3].copy(r),h[4].copy(a),h[5].copy(u),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t){let e=this.planes,i=t.elements,r=i[0],a=i[1],u=i[2],h=i[3],f=i[4],d=i[5],p=i[6],g=i[7],v=i[8],_=i[9],y=i[10],w=i[11],x=i[12],m=i[13],I=i[14],T=i[15];return e[0].setComponents(h-r,g-f,w-v,T-x).normalize(),e[1].setComponents(h+r,g+f,w+v,T+x).normalize(),e[2].setComponents(h+a,g+d,w+_,T+m).normalize(),e[3].setComponents(h-a,g-d,w-_,T-m).normalize(),e[4].setComponents(h-u,g-p,w-y,T-I).normalize(),e[5].setComponents(h+u,g+p,w+y,T+I).normalize(),this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Qn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Qn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Qn)}intersectsSprite(t){return Qn.center.set(0,0,0),Qn.radius=.7071067811865476,Qn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Qn)}intersectsSphere(t){let e=this.planes,i=t.center,r=-t.radius;for(let a=0;a<6;a++)if(e[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let r=e[i];if(cr.x=r.normal.x>0?t.max.x:t.min.x,cr.y=r.normal.y>0?t.max.y:t.min.y,cr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(cr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function dh(){let l=null,t=!1,e=null,i=null;function r(a,u){e(a,u),i=l.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=l.requestAnimationFrame(r),t=!0)},stop:function(){l.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){e=a},setContext:function(a){l=a}}}function $f(l,t){let e=t.isWebGL2,i=new WeakMap;function r(d,p){let g=d.array,v=d.usage,_=l.createBuffer();l.bindBuffer(p,_),l.bufferData(p,g,v),d.onUploadCallback();let y;if(g instanceof Float32Array)y=5126;else if(g instanceof Uint16Array)if(d.isFloat16BufferAttribute)if(e)y=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else y=5123;else if(g instanceof Int16Array)y=5122;else if(g instanceof Uint32Array)y=5125;else if(g instanceof Int32Array)y=5124;else if(g instanceof Int8Array)y=5120;else if(g instanceof Uint8Array)y=5121;else if(g instanceof Uint8ClampedArray)y=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+g);return{buffer:_,type:y,bytesPerElement:g.BYTES_PER_ELEMENT,version:d.version}}function a(d,p,g){let v=p.array,_=p.updateRange;l.bindBuffer(g,d),_.count===-1?l.bufferSubData(g,0,v):(e?l.bufferSubData(g,_.offset*v.BYTES_PER_ELEMENT,v,_.offset,_.count):l.bufferSubData(g,_.offset*v.BYTES_PER_ELEMENT,v.subarray(_.offset,_.offset+_.count)),_.count=-1),p.onUploadCallback()}function u(d){return d.isInterleavedBufferAttribute&&(d=d.data),i.get(d)}function h(d){d.isInterleavedBufferAttribute&&(d=d.data);let p=i.get(d);p&&(l.deleteBuffer(p.buffer),i.delete(d))}function f(d,p){if(d.isGLBufferAttribute){let v=i.get(d);(!v||v.version<d.version)&&i.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}d.isInterleavedBufferAttribute&&(d=d.data);let g=i.get(d);g===void 0?i.set(d,r(d,p)):g.version<d.version&&(a(g.buffer,d,p),g.version=d.version)}return{get:u,remove:h,update:f}}var Ts=class extends Je{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};let a=t/2,u=e/2,h=Math.floor(i),f=Math.floor(r),d=h+1,p=f+1,g=t/h,v=e/f,_=[],y=[],w=[],x=[];for(let m=0;m<p;m++){let I=m*v-u;for(let T=0;T<d;T++){let L=T*g-a;y.push(L,-I,0),w.push(0,0,1),x.push(T/h),x.push(1-m/f)}}for(let m=0;m<f;m++)for(let I=0;I<h;I++){let T=I+d*m,L=I+d*(m+1),P=I+1+d*(m+1),F=I+1+d*m;_.push(T,L,F),_.push(L,P,F)}this.setIndex(_),this.setAttribute("position",new Ke(y,3)),this.setAttribute("normal",new Ke(w,3)),this.setAttribute("uv",new Ke(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ts(t.width,t.height,t.widthSegments,t.heightSegments)}},jf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kf=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Jf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,tm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,em="vec3 transformed = vec3( position );",nm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,im=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,sm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,rm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,om=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,am=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,um=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,dm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,pm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,fm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,mm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,gm=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,vm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_m=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ym="gl_FragColor = linearToOutputTexel( gl_FragColor );",wm=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Mm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Sm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Em=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Cm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Am=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Tm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Pm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Lm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Rm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Im=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Dm=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Um=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Nm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,km=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Om=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Fm=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,Vm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Gm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif`,Wm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,qm=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Xm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ym=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,$m=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jm=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zm=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Km=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Jm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,eg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ng=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ig=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,sg=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,og=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,ag=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,lg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#ifdef USE_NORMALMAP_TANGENTSPACE
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal, vNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 geometryNormal = normal;`,cg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,hg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ug=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,pg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,fg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,mg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_g=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,xg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Mg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Eg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Cg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Ag=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Tg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Pg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Lg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,Ig=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Dg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ug=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ng=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Og=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Fg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,Vg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, vec2 fullSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		
		vec2 lodFudge = pow( 1.95, lod ) / fullSize;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec2 fullSize = vec2( textureSize( sampler, 0 ) );
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), fullSize, floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), fullSize, ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,zg=`#ifdef USE_UV
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bg=`#ifdef USE_UV
	varying vec2 vUv;
#endif
#ifdef USE_UV2
	attribute vec2 uv2;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hg=`#ifdef USE_UV
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Gg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Wg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Xg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,$g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Zg=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Kg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Jg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Qg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,tv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ev=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,nv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,iv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sv=`#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,rv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ov=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,av=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,cv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,uv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,dv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,mv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_v=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,bv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xv=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,wv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Ht={alphamap_fragment:jf,alphamap_pars_fragment:Zf,alphatest_fragment:Kf,alphatest_pars_fragment:Jf,aomap_fragment:Qf,aomap_pars_fragment:tm,begin_vertex:em,beginnormal_vertex:nm,bsdfs:im,iridescence_fragment:sm,bumpmap_pars_fragment:rm,clipping_planes_fragment:om,clipping_planes_pars_fragment:am,clipping_planes_pars_vertex:lm,clipping_planes_vertex:cm,color_fragment:hm,color_pars_fragment:um,color_pars_vertex:dm,color_vertex:pm,common:fm,cube_uv_reflection_fragment:mm,defaultnormal_vertex:gm,displacementmap_pars_vertex:vm,displacementmap_vertex:_m,emissivemap_fragment:bm,emissivemap_pars_fragment:xm,encodings_fragment:ym,encodings_pars_fragment:wm,envmap_fragment:Mm,envmap_common_pars_fragment:Sm,envmap_pars_fragment:Em,envmap_pars_vertex:Cm,envmap_physical_pars_fragment:Fm,envmap_vertex:Am,fog_vertex:Tm,fog_pars_vertex:Pm,fog_fragment:Lm,fog_pars_fragment:Rm,gradientmap_pars_fragment:Im,lightmap_fragment:Dm,lightmap_pars_fragment:Um,lights_lambert_fragment:Nm,lights_lambert_pars_fragment:km,lights_pars_begin:Om,lights_toon_fragment:Vm,lights_toon_pars_fragment:zm,lights_phong_fragment:Bm,lights_phong_pars_fragment:Hm,lights_physical_fragment:Gm,lights_physical_pars_fragment:Wm,lights_fragment_begin:qm,lights_fragment_maps:Xm,lights_fragment_end:Ym,logdepthbuf_fragment:$m,logdepthbuf_pars_fragment:jm,logdepthbuf_pars_vertex:Zm,logdepthbuf_vertex:Km,map_fragment:Jm,map_pars_fragment:Qm,map_particle_fragment:tg,map_particle_pars_fragment:eg,metalnessmap_fragment:ng,metalnessmap_pars_fragment:ig,morphcolor_vertex:sg,morphnormal_vertex:rg,morphtarget_pars_vertex:og,morphtarget_vertex:ag,normal_fragment_begin:lg,normal_fragment_maps:cg,normal_pars_fragment:hg,normal_pars_vertex:ug,normal_vertex:dg,normalmap_pars_fragment:pg,clearcoat_normal_fragment_begin:fg,clearcoat_normal_fragment_maps:mg,clearcoat_pars_fragment:gg,iridescence_pars_fragment:vg,output_fragment:_g,packing:bg,premultiplied_alpha_fragment:xg,project_vertex:yg,dithering_fragment:wg,dithering_pars_fragment:Mg,roughnessmap_fragment:Sg,roughnessmap_pars_fragment:Eg,shadowmap_pars_fragment:Cg,shadowmap_pars_vertex:Ag,shadowmap_vertex:Tg,shadowmask_pars_fragment:Pg,skinbase_vertex:Lg,skinning_pars_vertex:Rg,skinning_vertex:Ig,skinnormal_vertex:Dg,specularmap_fragment:Ug,specularmap_pars_fragment:Ng,tonemapping_fragment:kg,tonemapping_pars_fragment:Og,transmission_fragment:Fg,transmission_pars_fragment:Vg,uv_pars_fragment:zg,uv_pars_vertex:Bg,uv_vertex:Hg,worldpos_vertex:Gg,background_vert:Wg,background_frag:qg,backgroundCube_vert:Xg,backgroundCube_frag:Yg,cube_vert:$g,cube_frag:jg,depth_vert:Zg,depth_frag:Kg,distanceRGBA_vert:Jg,distanceRGBA_frag:Qg,equirect_vert:tv,equirect_frag:ev,linedashed_vert:nv,linedashed_frag:iv,meshbasic_vert:sv,meshbasic_frag:rv,meshlambert_vert:ov,meshlambert_frag:av,meshmatcap_vert:lv,meshmatcap_frag:cv,meshnormal_vert:hv,meshnormal_frag:uv,meshphong_vert:dv,meshphong_frag:pv,meshphysical_vert:fv,meshphysical_frag:mv,meshtoon_vert:gv,meshtoon_frag:vv,points_vert:_v,points_frag:bv,shadow_vert:xv,shadow_frag:yv,sprite_vert:wv,sprite_frag:Mv},vt={common:{diffuse:{value:new Kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new Gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new Kt(16777215)},opacity:{value:1},center:{value:new Gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaTest:{value:0}}},un={basic:{uniforms:Le([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:Le([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new Kt(0)}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:Le([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new Kt(0)},specular:{value:new Kt(1118481)},shininess:{value:30}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:Le([vt.common,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.roughnessmap,vt.metalnessmap,vt.fog,vt.lights,{emissive:{value:new Kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:Le([vt.common,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.gradientmap,vt.fog,vt.lights,{emissive:{value:new Kt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:Le([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:Le([vt.points,vt.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:Le([vt.common,vt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:Le([vt.common,vt.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:Le([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:Le([vt.sprite,vt.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distanceRGBA:{uniforms:Le([vt.common,vt.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distanceRGBA_vert,fragmentShader:Ht.distanceRGBA_frag},shadow:{uniforms:Le([vt.lights,vt.fog,{color:{value:new Kt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};un.physical={uniforms:Le([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new Gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new Kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new Gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new Kt(0)},specularColor:{value:new Kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};var hr={r:0,b:0,g:0};function Sv(l,t,e,i,r,a,u){let h=new Kt(0),f=a===!0?0:1,d,p,g=null,v=0,_=null;function y(x,m){let I=!1,T=m.isScene===!0?m.background:null;T&&T.isTexture&&(T=(m.backgroundBlurriness>0?e:t).get(T));let L=l.xr,P=L.getSession&&L.getSession();P&&P.environmentBlendMode==="additive"&&(T=null),T===null?w(h,f):T&&T.isColor&&(w(T,1),I=!0),(l.autoClear||I)&&l.clear(l.autoClearColor,l.autoClearDepth,l.autoClearStencil),T&&(T.isCubeTexture||T.mapping===Rr)?(p===void 0&&(p=new Ze(new ci(1,1,1),new Tn({name:"BackgroundCubeMaterial",uniforms:Zi(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:Oe,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(F,H,W){this.matrixWorld.copyPosition(W.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(p)),p.material.uniforms.envMap.value=T,p.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,p.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,p.material.toneMapped=T.encoding!==ce,(g!==T||v!==T.version||_!==l.toneMapping)&&(p.material.needsUpdate=!0,g=T,v=T.version,_=l.toneMapping),p.layers.enableAll(),x.unshift(p,p.geometry,p.material,0,0,null)):T&&T.isTexture&&(d===void 0&&(d=new Ze(new Ts(2,2),new Tn({name:"BackgroundMaterial",uniforms:Zi(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(d)),d.material.uniforms.t2D.value=T,d.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,d.material.toneMapped=T.encoding!==ce,T.matrixAutoUpdate===!0&&T.updateMatrix(),d.material.uniforms.uvTransform.value.copy(T.matrix),(g!==T||v!==T.version||_!==l.toneMapping)&&(d.material.needsUpdate=!0,g=T,v=T.version,_=l.toneMapping),d.layers.enableAll(),x.unshift(d,d.geometry,d.material,0,0,null))}function w(x,m){x.getRGB(hr,uh(l)),i.buffers.color.setClear(hr.r,hr.g,hr.b,m,u)}return{getClearColor:function(){return h},setClearColor:function(x,m=1){h.set(x),f=m,w(h,f)},getClearAlpha:function(){return f},setClearAlpha:function(x){f=x,w(h,f)},render:y}}function Ev(l,t,e,i){let r=l.getParameter(34921),a=i.isWebGL2?null:t.get("OES_vertex_array_object"),u=i.isWebGL2||a!==null,h={},f=x(null),d=f,p=!1;function g(Z,X,J,ct,st){let lt=!1;if(u){let ht=w(ct,J,X);d!==ht&&(d=ht,_(d.object)),lt=m(Z,ct,J,st),lt&&I(Z,ct,J,st)}else{let ht=X.wireframe===!0;(d.geometry!==ct.id||d.program!==J.id||d.wireframe!==ht)&&(d.geometry=ct.id,d.program=J.id,d.wireframe=ht,lt=!0)}st!==null&&e.update(st,34963),(lt||p)&&(p=!1,W(Z,X,J,ct),st!==null&&l.bindBuffer(34963,e.get(st).buffer))}function v(){return i.isWebGL2?l.createVertexArray():a.createVertexArrayOES()}function _(Z){return i.isWebGL2?l.bindVertexArray(Z):a.bindVertexArrayOES(Z)}function y(Z){return i.isWebGL2?l.deleteVertexArray(Z):a.deleteVertexArrayOES(Z)}function w(Z,X,J){let ct=J.wireframe===!0,st=h[Z.id];st===void 0&&(st={},h[Z.id]=st);let lt=st[X.id];lt===void 0&&(lt={},st[X.id]=lt);let ht=lt[ct];return ht===void 0&&(ht=x(v()),lt[ct]=ht),ht}function x(Z){let X=[],J=[],ct=[];for(let st=0;st<r;st++)X[st]=0,J[st]=0,ct[st]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:X,enabledAttributes:J,attributeDivisors:ct,object:Z,attributes:{},index:null}}function m(Z,X,J,ct){let st=d.attributes,lt=X.attributes,ht=0,St=J.getAttributes();for(let ut in St)if(St[ut].location>=0){let rt=st[ut],gt=lt[ut];if(gt===void 0&&(ut==="instanceMatrix"&&Z.instanceMatrix&&(gt=Z.instanceMatrix),ut==="instanceColor"&&Z.instanceColor&&(gt=Z.instanceColor)),rt===void 0||rt.attribute!==gt||gt&&rt.data!==gt.data)return!0;ht++}return d.attributesNum!==ht||d.index!==ct}function I(Z,X,J,ct){let st={},lt=X.attributes,ht=0,St=J.getAttributes();for(let ut in St)if(St[ut].location>=0){let rt=lt[ut];rt===void 0&&(ut==="instanceMatrix"&&Z.instanceMatrix&&(rt=Z.instanceMatrix),ut==="instanceColor"&&Z.instanceColor&&(rt=Z.instanceColor));let gt={};gt.attribute=rt,rt&&rt.data&&(gt.data=rt.data),st[ut]=gt,ht++}d.attributes=st,d.attributesNum=ht,d.index=ct}function T(){let Z=d.newAttributes;for(let X=0,J=Z.length;X<J;X++)Z[X]=0}function L(Z){P(Z,0)}function P(Z,X){let J=d.newAttributes,ct=d.enabledAttributes,st=d.attributeDivisors;J[Z]=1,ct[Z]===0&&(l.enableVertexAttribArray(Z),ct[Z]=1),st[Z]!==X&&((i.isWebGL2?l:t.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](Z,X),st[Z]=X)}function F(){let Z=d.newAttributes,X=d.enabledAttributes;for(let J=0,ct=X.length;J<ct;J++)X[J]!==Z[J]&&(l.disableVertexAttribArray(J),X[J]=0)}function H(Z,X,J,ct,st,lt){i.isWebGL2===!0&&(J===5124||J===5125)?l.vertexAttribIPointer(Z,X,J,st,lt):l.vertexAttribPointer(Z,X,J,ct,st,lt)}function W(Z,X,J,ct){if(i.isWebGL2===!1&&(Z.isInstancedMesh||ct.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;T();let st=ct.attributes,lt=J.getAttributes(),ht=X.defaultAttributeValues;for(let St in lt){let ut=lt[St];if(ut.location>=0){let j=st[St];if(j===void 0&&(St==="instanceMatrix"&&Z.instanceMatrix&&(j=Z.instanceMatrix),St==="instanceColor"&&Z.instanceColor&&(j=Z.instanceColor)),j!==void 0){let rt=j.normalized,gt=j.itemSize,bt=e.get(j);if(bt===void 0)continue;let K=bt.buffer,It=bt.type,Et=bt.bytesPerElement;if(j.isInterleavedBufferAttribute){let mt=j.data,Tt=mt.stride,Yt=j.offset;if(mt.isInstancedInterleavedBuffer){for(let Mt=0;Mt<ut.locationSize;Mt++)P(ut.location+Mt,mt.meshPerAttribute);Z.isInstancedMesh!==!0&&ct._maxInstanceCount===void 0&&(ct._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let Mt=0;Mt<ut.locationSize;Mt++)L(ut.location+Mt);l.bindBuffer(34962,K);for(let Mt=0;Mt<ut.locationSize;Mt++)H(ut.location+Mt,gt/ut.locationSize,It,rt,Tt*Et,(Yt+gt/ut.locationSize*Mt)*Et)}else{if(j.isInstancedBufferAttribute){for(let mt=0;mt<ut.locationSize;mt++)P(ut.location+mt,j.meshPerAttribute);Z.isInstancedMesh!==!0&&ct._maxInstanceCount===void 0&&(ct._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let mt=0;mt<ut.locationSize;mt++)L(ut.location+mt);l.bindBuffer(34962,K);for(let mt=0;mt<ut.locationSize;mt++)H(ut.location+mt,gt/ut.locationSize,It,rt,gt*Et,gt/ut.locationSize*mt*Et)}}else if(ht!==void 0){let rt=ht[St];if(rt!==void 0)switch(rt.length){case 2:l.vertexAttrib2fv(ut.location,rt);break;case 3:l.vertexAttrib3fv(ut.location,rt);break;case 4:l.vertexAttrib4fv(ut.location,rt);break;default:l.vertexAttrib1fv(ut.location,rt)}}}}F()}function E(){at();for(let Z in h){let X=h[Z];for(let J in X){let ct=X[J];for(let st in ct)y(ct[st].object),delete ct[st];delete X[J]}delete h[Z]}}function D(Z){if(h[Z.id]===void 0)return;let X=h[Z.id];for(let J in X){let ct=X[J];for(let st in ct)y(ct[st].object),delete ct[st];delete X[J]}delete h[Z.id]}function nt(Z){for(let X in h){let J=h[X];if(J[Z.id]===void 0)continue;let ct=J[Z.id];for(let st in ct)y(ct[st].object),delete ct[st];delete J[Z.id]}}function at(){G(),p=!0,d!==f&&(d=f,_(d.object))}function G(){f.geometry=null,f.program=null,f.wireframe=!1}return{setup:g,reset:at,resetDefaultState:G,dispose:E,releaseStatesOfGeometry:D,releaseStatesOfProgram:nt,initAttributes:T,enableAttribute:L,disableUnusedAttributes:F}}function Cv(l,t,e,i){let r=i.isWebGL2,a;function u(d){a=d}function h(d,p){l.drawArrays(a,d,p),e.update(p,a,1)}function f(d,p,g){if(g===0)return;let v,_;if(r)v=l,_="drawArraysInstanced";else if(v=t.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",v===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}v[_](a,d,p,g),e.update(p,a,g)}this.setMode=u,this.render=h,this.renderInstances=f}function Av(l,t,e){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let H=t.get("EXT_texture_filter_anisotropic");i=l.getParameter(H.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(H){if(H==="highp"){if(l.getShaderPrecisionFormat(35633,36338).precision>0&&l.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";H="mediump"}return H==="mediump"&&l.getShaderPrecisionFormat(35633,36337).precision>0&&l.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}let u=typeof WebGL2RenderingContext<"u"&&l.constructor.name==="WebGL2RenderingContext",h=e.precision!==void 0?e.precision:"highp",f=a(h);f!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",f,"instead."),h=f);let d=u||t.has("WEBGL_draw_buffers"),p=e.logarithmicDepthBuffer===!0,g=l.getParameter(34930),v=l.getParameter(35660),_=l.getParameter(3379),y=l.getParameter(34076),w=l.getParameter(34921),x=l.getParameter(36347),m=l.getParameter(36348),I=l.getParameter(36349),T=v>0,L=u||t.has("OES_texture_float"),P=T&&L,F=u?l.getParameter(36183):0;return{isWebGL2:u,drawBuffers:d,getMaxAnisotropy:r,getMaxPrecision:a,precision:h,logarithmicDepthBuffer:p,maxTextures:g,maxVertexTextures:v,maxTextureSize:_,maxCubemapSize:y,maxAttributes:w,maxVertexUniforms:x,maxVaryings:m,maxFragmentUniforms:I,vertexTextures:T,floatFragmentTextures:L,floatVertexTextures:P,maxSamples:F}}function Tv(l){let t=this,e=null,i=0,r=!1,a=!1,u=new Sn,h=new Xt,f={value:null,needsUpdate:!1};this.uniform=f,this.numPlanes=0,this.numIntersection=0,this.init=function(g,v){let _=g.length!==0||v||i!==0||r;return r=v,i=g.length,_},this.beginShadows=function(){a=!0,p(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(g,v){e=p(g,v,0)},this.setState=function(g,v,_){let y=g.clippingPlanes,w=g.clipIntersection,x=g.clipShadows,m=l.get(g);if(!r||y===null||y.length===0||a&&!x)a?p(null):d();else{let I=a?0:i,T=I*4,L=m.clippingState||null;f.value=L,L=p(y,v,T,_);for(let P=0;P!==T;++P)L[P]=e[P];m.clippingState=L,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=I}};function d(){f.value!==e&&(f.value=e,f.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function p(g,v,_,y){let w=g!==null?g.length:0,x=null;if(w!==0){if(x=f.value,y!==!0||x===null){let m=_+w*4,I=v.matrixWorldInverse;h.getNormalMatrix(I),(x===null||x.length<m)&&(x=new Float32Array(m));for(let T=0,L=_;T!==w;++T,L+=4)u.copy(g[T]).applyMatrix4(I,h),u.normal.toArray(x,L),x[L+3]=u.constant}f.value=x,f.needsUpdate=!0}return t.numPlanes=w,t.numIntersection=0,x}}function Pv(l){let t=new WeakMap;function e(u,h){return h===Wo?u.mapping=Xi:h===qo&&(u.mapping=Yi),u}function i(u){if(u&&u.isTexture&&u.isRenderTargetTexture===!1){let h=u.mapping;if(h===Wo||h===qo)if(t.has(u)){let f=t.get(u).texture;return e(f,u.mapping)}else{let f=u.image;if(f&&f.height>0){let d=new Qo(f.height/2);return d.fromEquirectangularTexture(l,u),t.set(u,d),u.addEventListener("dispose",r),e(d.texture,u.mapping)}else return null}}return u}function r(u){let h=u.target;h.removeEventListener("dispose",r);let f=t.get(h);f!==void 0&&(t.delete(h),f.dispose())}function a(){t=new WeakMap}return{get:i,dispose:a}}var ta=class extends Mr{constructor(t=-1,e=1,i=1,r=-1,a=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=a,this.far=u,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,a,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,a=i-t,u=i+t,h=r+e,f=r-e;if(this.view!==null&&this.view.enabled){let d=(this.right-this.left)/this.view.fullWidth/this.zoom,p=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=d*this.view.offsetX,u=a+d*this.view.width,h-=p*this.view.offsetY,f=h-p*this.view.height}this.projectionMatrix.makeOrthographic(a,u,h,f,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},zi=4,Uc=[.125,.215,.35,.446,.526,.582],ei=20,zo=new ta,Nc=new Kt,Bo=null,ti=(1+Math.sqrt(5))/2,Fi=1/ti,kc=[new Y(1,1,1),new Y(-1,1,1),new Y(1,1,-1),new Y(-1,1,-1),new Y(0,ti,Fi),new Y(0,ti,-Fi),new Y(Fi,0,ti),new Y(-Fi,0,ti),new Y(ti,Fi,0),new Y(-ti,Fi,0)],Cr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100){Bo=this._renderer.getRenderTarget(),this._setSize(256);let a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(t,i,r,a),e>0&&this._blur(a,0,0,e),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Bo),t.scissorTest=!1,ur(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Xi||t.mapping===Yi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Bo=this._renderer.getRenderTarget();let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:je,minFilter:je,generateMipmaps:!1,type:Es,format:sn,encoding:oi,depthBuffer:!1},r=Oc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Oc(t,e,i);let{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Lv(a)),this._blurMaterial=Rv(a,t,e)}return r}_compileMaterial(t){let e=new Ze(this._lodPlanes[0],t);this._renderer.compile(e,zo)}_sceneToCubeUV(t,e,i,r){let h=new De(90,1,e,i),f=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],p=this._renderer,g=p.autoClear,v=p.toneMapping;p.getClearColor(Nc),p.toneMapping=Cn,p.autoClear=!1;let _=new xr({name:"PMREM.Background",side:Oe,depthWrite:!1,depthTest:!1}),y=new Ze(new ci,_),w=!1,x=t.background;x?x.isColor&&(_.color.copy(x),t.background=null,w=!0):(_.color.copy(Nc),w=!0);for(let m=0;m<6;m++){let I=m%3;I===0?(h.up.set(0,f[m],0),h.lookAt(d[m],0,0)):I===1?(h.up.set(0,0,f[m]),h.lookAt(0,d[m],0)):(h.up.set(0,f[m],0),h.lookAt(0,0,d[m]));let T=this._cubeSize;ur(r,I*T,m>2?T:0,T,T),p.setRenderTarget(r),w&&p.render(y,h),p.render(t,h)}y.geometry.dispose(),y.material.dispose(),p.toneMapping=v,p.autoClear=g,t.background=x}_textureToCubeUV(t,e){let i=this._renderer,r=t.mapping===Xi||t.mapping===Yi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fc());let a=r?this._cubemapMaterial:this._equirectMaterial,u=new Ze(this._lodPlanes[0],a),h=a.uniforms;h.envMap.value=t;let f=this._cubeSize;ur(e,0,0,3*f,2*f),i.setRenderTarget(e),i.render(u,zo)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),u=kc[(r-1)%kc.length];this._blur(t,r-1,r,a,u)}e.autoClear=i}_blur(t,e,i,r,a){let u=this._pingPongRenderTarget;this._halfBlur(t,u,e,i,r,"latitudinal",a),this._halfBlur(u,t,i,i,r,"longitudinal",a)}_halfBlur(t,e,i,r,a,u,h){let f=this._renderer,d=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let p=3,g=new Ze(this._lodPlanes[r],d),v=d.uniforms,_=this._sizeLods[i]-1,y=isFinite(a)?Math.PI/(2*_):2*Math.PI/(2*ei-1),w=a/y,x=isFinite(a)?1+Math.floor(p*w):ei;x>ei&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${ei}`);let m=[],I=0;for(let H=0;H<ei;++H){let W=H/w,E=Math.exp(-W*W/2);m.push(E),H===0?I+=E:H<x&&(I+=2*E)}for(let H=0;H<m.length;H++)m[H]=m[H]/I;v.envMap.value=t.texture,v.samples.value=x,v.weights.value=m,v.latitudinal.value=u==="latitudinal",h&&(v.poleAxis.value=h);let{_lodMax:T}=this;v.dTheta.value=y,v.mipInt.value=T-i;let L=this._sizeLods[r],P=3*L*(r>T-zi?r-T+zi:0),F=4*(this._cubeSize-L);ur(e,P,F,3*L,2*L),f.setRenderTarget(e),f.render(g,zo)}};function Lv(l){let t=[],e=[],i=[],r=l,a=l-zi+1+Uc.length;for(let u=0;u<a;u++){let h=Math.pow(2,r);e.push(h);let f=1/h;u>l-zi?f=Uc[u-l+zi-1]:u===0&&(f=0),i.push(f);let d=1/(h-2),p=-d,g=1+d,v=[p,p,g,p,g,g,p,p,g,g,p,g],_=6,y=6,w=3,x=2,m=1,I=new Float32Array(w*y*_),T=new Float32Array(x*y*_),L=new Float32Array(m*y*_);for(let F=0;F<_;F++){let H=F%3*2/3-1,W=F>2?0:-1,E=[H,W,0,H+2/3,W,0,H+2/3,W+1,0,H,W,0,H+2/3,W+1,0,H,W+1,0];I.set(E,w*y*F),T.set(v,x*y*F);let D=[F,F,F,F,F,F];L.set(D,m*y*F)}let P=new Je;P.setAttribute("position",new Pe(I,w)),P.setAttribute("uv",new Pe(T,x)),P.setAttribute("faceIndex",new Pe(L,m)),t.push(P),r>zi&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Oc(l,t,e){let i=new An(l,t,e);return i.texture.mapping=Rr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ur(l,t,e,i,r){l.viewport.set(t,e,i,r),l.scissor.set(t,e,i,r)}function Rv(l,t,e){let i=new Float32Array(ei),r=new Y(0,1,0);return new Tn({name:"SphericalGaussianBlur",defines:{n:ei,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${l}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ca(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Fc(){return new Tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ca(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Vc(){return new Tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ca(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Ca(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Iv(l){let t=new WeakMap,e=null;function i(h){if(h&&h.isTexture){let f=h.mapping,d=f===Wo||f===qo,p=f===Xi||f===Yi;if(d||p)if(h.isRenderTargetTexture&&h.needsPMREMUpdate===!0){h.needsPMREMUpdate=!1;let g=t.get(h);return e===null&&(e=new Cr(l)),g=d?e.fromEquirectangular(h,g):e.fromCubemap(h,g),t.set(h,g),g.texture}else{if(t.has(h))return t.get(h).texture;{let g=h.image;if(d&&g&&g.height>0||p&&g&&r(g)){e===null&&(e=new Cr(l));let v=d?e.fromEquirectangular(h):e.fromCubemap(h);return t.set(h,v),h.addEventListener("dispose",a),v.texture}else return null}}}return h}function r(h){let f=0,d=6;for(let p=0;p<d;p++)h[p]!==void 0&&f++;return f===d}function a(h){let f=h.target;f.removeEventListener("dispose",a);let d=t.get(f);d!==void 0&&(t.delete(f),d.dispose())}function u(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:u}}function Dv(l){let t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=l.getExtension("WEBGL_depth_texture")||l.getExtension("MOZ_WEBGL_depth_texture")||l.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=l.getExtension("EXT_texture_filter_anisotropic")||l.getExtension("MOZ_EXT_texture_filter_anisotropic")||l.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=l.getExtension("WEBGL_compressed_texture_s3tc")||l.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||l.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=l.getExtension("WEBGL_compressed_texture_pvrtc")||l.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=l.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(i){i.isWebGL2?e("EXT_color_buffer_float"):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(i){let r=e(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Uv(l,t,e,i){let r={},a=new WeakMap;function u(g){let v=g.target;v.index!==null&&t.remove(v.index);for(let y in v.attributes)t.remove(v.attributes[y]);v.removeEventListener("dispose",u),delete r[v.id];let _=a.get(v);_&&(t.remove(_),a.delete(v)),i.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,e.memory.geometries--}function h(g,v){return r[v.id]===!0||(v.addEventListener("dispose",u),r[v.id]=!0,e.memory.geometries++),v}function f(g){let v=g.attributes;for(let y in v)t.update(v[y],34962);let _=g.morphAttributes;for(let y in _){let w=_[y];for(let x=0,m=w.length;x<m;x++)t.update(w[x],34962)}}function d(g){let v=[],_=g.index,y=g.attributes.position,w=0;if(_!==null){let I=_.array;w=_.version;for(let T=0,L=I.length;T<L;T+=3){let P=I[T+0],F=I[T+1],H=I[T+2];v.push(P,F,F,H,H,P)}}else{let I=y.array;w=y.version;for(let T=0,L=I.length/3-1;T<L;T+=3){let P=T+0,F=T+1,H=T+2;v.push(P,F,F,H,H,P)}}let x=new(ch(v)?wr:yr)(v,1);x.version=w;let m=a.get(g);m&&t.remove(m),a.set(g,x)}function p(g){let v=a.get(g);if(v){let _=g.index;_!==null&&v.version<_.version&&d(g)}else d(g);return a.get(g)}return{get:h,update:f,getWireframeAttribute:p}}function Nv(l,t,e,i){let r=i.isWebGL2,a;function u(v){a=v}let h,f;function d(v){h=v.type,f=v.bytesPerElement}function p(v,_){l.drawElements(a,_,h,v*f),e.update(_,a,1)}function g(v,_,y){if(y===0)return;let w,x;if(r)w=l,x="drawElementsInstanced";else if(w=t.get("ANGLE_instanced_arrays"),x="drawElementsInstancedANGLE",w===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}w[x](a,_,h,v*f,y),e.update(_,a,y)}this.setMode=u,this.setIndex=d,this.render=p,this.renderInstances=g}function kv(l){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,u,h){switch(e.calls++,u){case 4:e.triangles+=h*(a/3);break;case 1:e.lines+=h*(a/2);break;case 3:e.lines+=h*(a-1);break;case 2:e.lines+=h*a;break;case 0:e.points+=h*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",u);break}}function r(){e.frame++,e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function Ov(l,t){return l[0]-t[0]}function Fv(l,t){return Math.abs(t[1])-Math.abs(l[1])}function Vv(l,t,e){let i={},r=new Float32Array(8),a=new WeakMap,u=new ve,h=[];for(let d=0;d<8;d++)h[d]=[d,0];function f(d,p,g){let v=d.morphTargetInfluences;if(t.isWebGL2===!0){let _=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,y=_!==void 0?_.length:0,w=a.get(p);if(w===void 0||w.count!==y){let Z=function(){at.dispose(),a.delete(p),p.removeEventListener("dispose",Z)};w!==void 0&&w.texture.dispose();let I=p.morphAttributes.position!==void 0,T=p.morphAttributes.normal!==void 0,L=p.morphAttributes.color!==void 0,P=p.morphAttributes.position||[],F=p.morphAttributes.normal||[],H=p.morphAttributes.color||[],W=0;I===!0&&(W=1),T===!0&&(W=2),L===!0&&(W=3);let E=p.attributes.position.count*W,D=1;E>t.maxTextureSize&&(D=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);let nt=new Float32Array(E*D*4*y),at=new _r(nt,E,D,y);at.type=ii,at.needsUpdate=!0;let G=W*4;for(let X=0;X<y;X++){let J=P[X],ct=F[X],st=H[X],lt=E*D*4*X;for(let ht=0;ht<J.count;ht++){let St=ht*G;I===!0&&(u.fromBufferAttribute(J,ht),nt[lt+St+0]=u.x,nt[lt+St+1]=u.y,nt[lt+St+2]=u.z,nt[lt+St+3]=0),T===!0&&(u.fromBufferAttribute(ct,ht),nt[lt+St+4]=u.x,nt[lt+St+5]=u.y,nt[lt+St+6]=u.z,nt[lt+St+7]=0),L===!0&&(u.fromBufferAttribute(st,ht),nt[lt+St+8]=u.x,nt[lt+St+9]=u.y,nt[lt+St+10]=u.z,nt[lt+St+11]=st.itemSize===4?u.w:1)}}w={count:y,texture:at,size:new Gt(E,D)},a.set(p,w),p.addEventListener("dispose",Z)}let x=0;for(let I=0;I<v.length;I++)x+=v[I];let m=p.morphTargetsRelative?1:1-x;g.getUniforms().setValue(l,"morphTargetBaseInfluence",m),g.getUniforms().setValue(l,"morphTargetInfluences",v),g.getUniforms().setValue(l,"morphTargetsTexture",w.texture,e),g.getUniforms().setValue(l,"morphTargetsTextureSize",w.size)}else{let _=v===void 0?0:v.length,y=i[p.id];if(y===void 0||y.length!==_){y=[];for(let T=0;T<_;T++)y[T]=[T,0];i[p.id]=y}for(let T=0;T<_;T++){let L=y[T];L[0]=T,L[1]=v[T]}y.sort(Fv);for(let T=0;T<8;T++)T<_&&y[T][1]?(h[T][0]=y[T][0],h[T][1]=y[T][1]):(h[T][0]=Number.MAX_SAFE_INTEGER,h[T][1]=0);h.sort(Ov);let w=p.morphAttributes.position,x=p.morphAttributes.normal,m=0;for(let T=0;T<8;T++){let L=h[T],P=L[0],F=L[1];P!==Number.MAX_SAFE_INTEGER&&F?(w&&p.getAttribute("morphTarget"+T)!==w[P]&&p.setAttribute("morphTarget"+T,w[P]),x&&p.getAttribute("morphNormal"+T)!==x[P]&&p.setAttribute("morphNormal"+T,x[P]),r[T]=F,m+=F):(w&&p.hasAttribute("morphTarget"+T)===!0&&p.deleteAttribute("morphTarget"+T),x&&p.hasAttribute("morphNormal"+T)===!0&&p.deleteAttribute("morphNormal"+T),r[T]=0)}let I=p.morphTargetsRelative?1:1-m;g.getUniforms().setValue(l,"morphTargetBaseInfluence",I),g.getUniforms().setValue(l,"morphTargetInfluences",r)}}return{update:f}}function zv(l,t,e,i){let r=new WeakMap;function a(f){let d=i.render.frame,p=f.geometry,g=t.get(f,p);return r.get(g)!==d&&(t.update(g),r.set(g,d)),f.isInstancedMesh&&(f.hasEventListener("dispose",h)===!1&&f.addEventListener("dispose",h),e.update(f.instanceMatrix,34962),f.instanceColor!==null&&e.update(f.instanceColor,34962)),g}function u(){r=new WeakMap}function h(f){let d=f.target;d.removeEventListener("dispose",h),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:a,dispose:u}}var ph=new Ue,fh=new _r,mh=new Zo,gh=new Sr,zc=[],Bc=[],Hc=new Float32Array(16),Gc=new Float32Array(9),Wc=new Float32Array(4);function Ji(l,t,e){let i=l[0];if(i<=0||i>0)return l;let r=t*e,a=zc[r];if(a===void 0&&(a=new Float32Array(r),zc[r]=a),t!==0){i.toArray(a,0);for(let u=1,h=0;u!==t;++u)h+=e,l[u].toArray(a,h)}return a}function _e(l,t){if(l.length!==t.length)return!1;for(let e=0,i=l.length;e<i;e++)if(l[e]!==t[e])return!1;return!0}function be(l,t){for(let e=0,i=t.length;e<i;e++)l[e]=t[e]}function Ir(l,t){let e=Bc[t];e===void 0&&(e=new Int32Array(t),Bc[t]=e);for(let i=0;i!==t;++i)e[i]=l.allocateTextureUnit();return e}function Bv(l,t){let e=this.cache;e[0]!==t&&(l.uniform1f(this.addr,t),e[0]=t)}function Hv(l,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(l.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;l.uniform2fv(this.addr,t),be(e,t)}}function Gv(l,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(l.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(l.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(_e(e,t))return;l.uniform3fv(this.addr,t),be(e,t)}}function Wv(l,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(l.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;l.uniform4fv(this.addr,t),be(e,t)}}function qv(l,t){let e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;l.uniformMatrix2fv(this.addr,!1,t),be(e,t)}else{if(_e(e,i))return;Wc.set(i),l.uniformMatrix2fv(this.addr,!1,Wc),be(e,i)}}function Xv(l,t){let e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;l.uniformMatrix3fv(this.addr,!1,t),be(e,t)}else{if(_e(e,i))return;Gc.set(i),l.uniformMatrix3fv(this.addr,!1,Gc),be(e,i)}}function Yv(l,t){let e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;l.uniformMatrix4fv(this.addr,!1,t),be(e,t)}else{if(_e(e,i))return;Hc.set(i),l.uniformMatrix4fv(this.addr,!1,Hc),be(e,i)}}function $v(l,t){let e=this.cache;e[0]!==t&&(l.uniform1i(this.addr,t),e[0]=t)}function jv(l,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(l.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;l.uniform2iv(this.addr,t),be(e,t)}}function Zv(l,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(l.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;l.uniform3iv(this.addr,t),be(e,t)}}function Kv(l,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(l.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;l.uniform4iv(this.addr,t),be(e,t)}}function Jv(l,t){let e=this.cache;e[0]!==t&&(l.uniform1ui(this.addr,t),e[0]=t)}function Qv(l,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(l.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;l.uniform2uiv(this.addr,t),be(e,t)}}function t_(l,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(l.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;l.uniform3uiv(this.addr,t),be(e,t)}}function e_(l,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(l.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;l.uniform4uiv(this.addr,t),be(e,t)}}function n_(l,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(l.uniform1i(this.addr,r),i[0]=r),e.setTexture2D(t||ph,r)}function i_(l,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(l.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||mh,r)}function s_(l,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(l.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||gh,r)}function r_(l,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(l.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||fh,r)}function o_(l){switch(l){case 5126:return Bv;case 35664:return Hv;case 35665:return Gv;case 35666:return Wv;case 35674:return qv;case 35675:return Xv;case 35676:return Yv;case 5124:case 35670:return $v;case 35667:case 35671:return jv;case 35668:case 35672:return Zv;case 35669:case 35673:return Kv;case 5125:return Jv;case 36294:return Qv;case 36295:return t_;case 36296:return e_;case 35678:case 36198:case 36298:case 36306:case 35682:return n_;case 35679:case 36299:case 36307:return i_;case 35680:case 36300:case 36308:case 36293:return s_;case 36289:case 36303:case 36311:case 36292:return r_}}function a_(l,t){l.uniform1fv(this.addr,t)}function l_(l,t){let e=Ji(t,this.size,2);l.uniform2fv(this.addr,e)}function c_(l,t){let e=Ji(t,this.size,3);l.uniform3fv(this.addr,e)}function h_(l,t){let e=Ji(t,this.size,4);l.uniform4fv(this.addr,e)}function u_(l,t){let e=Ji(t,this.size,4);l.uniformMatrix2fv(this.addr,!1,e)}function d_(l,t){let e=Ji(t,this.size,9);l.uniformMatrix3fv(this.addr,!1,e)}function p_(l,t){let e=Ji(t,this.size,16);l.uniformMatrix4fv(this.addr,!1,e)}function f_(l,t){l.uniform1iv(this.addr,t)}function m_(l,t){l.uniform2iv(this.addr,t)}function g_(l,t){l.uniform3iv(this.addr,t)}function v_(l,t){l.uniform4iv(this.addr,t)}function __(l,t){l.uniform1uiv(this.addr,t)}function b_(l,t){l.uniform2uiv(this.addr,t)}function x_(l,t){l.uniform3uiv(this.addr,t)}function y_(l,t){l.uniform4uiv(this.addr,t)}function w_(l,t,e){let i=this.cache,r=t.length,a=Ir(e,r);_e(i,a)||(l.uniform1iv(this.addr,a),be(i,a));for(let u=0;u!==r;++u)e.setTexture2D(t[u]||ph,a[u])}function M_(l,t,e){let i=this.cache,r=t.length,a=Ir(e,r);_e(i,a)||(l.uniform1iv(this.addr,a),be(i,a));for(let u=0;u!==r;++u)e.setTexture3D(t[u]||mh,a[u])}function S_(l,t,e){let i=this.cache,r=t.length,a=Ir(e,r);_e(i,a)||(l.uniform1iv(this.addr,a),be(i,a));for(let u=0;u!==r;++u)e.setTextureCube(t[u]||gh,a[u])}function E_(l,t,e){let i=this.cache,r=t.length,a=Ir(e,r);_e(i,a)||(l.uniform1iv(this.addr,a),be(i,a));for(let u=0;u!==r;++u)e.setTexture2DArray(t[u]||fh,a[u])}function C_(l){switch(l){case 5126:return a_;case 35664:return l_;case 35665:return c_;case 35666:return h_;case 35674:return u_;case 35675:return d_;case 35676:return p_;case 5124:case 35670:return f_;case 35667:case 35671:return m_;case 35668:case 35672:return g_;case 35669:case 35673:return v_;case 5125:return __;case 36294:return b_;case 36295:return x_;case 36296:return y_;case 35678:case 36198:case 36298:case 36306:case 35682:return w_;case 35679:case 36299:case 36307:return M_;case 35680:case 36300:case 36308:case 36293:return S_;case 36289:case 36303:case 36311:case 36292:return E_}}var ea=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.setValue=o_(e.type)}},na=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.size=e.size,this.setValue=C_(e.type)}},ia=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let r=this.seq;for(let a=0,u=r.length;a!==u;++a){let h=r[a];h.setValue(t,e[h.id],i)}}},Ho=/(\w+)(\])?(\[|\.)?/g;function qc(l,t){l.seq.push(t),l.map[t.id]=t}function A_(l,t,e){let i=l.name,r=i.length;for(Ho.lastIndex=0;;){let a=Ho.exec(i),u=Ho.lastIndex,h=a[1],f=a[2]==="]",d=a[3];if(f&&(h=h|0),d===void 0||d==="["&&u+2===r){qc(e,d===void 0?new ea(h,l,t):new na(h,l,t));break}else{let g=e.map[h];g===void 0&&(g=new ia(h),qc(e,g)),e=g}}}var qi=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,35718);for(let r=0;r<i;++r){let a=t.getActiveUniform(e,r),u=t.getUniformLocation(e,a.name);A_(a,u,this)}}setValue(t,e,i,r){let a=this.map[e];a!==void 0&&a.setValue(t,i,r)}setOptional(t,e,i){let r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let a=0,u=e.length;a!==u;++a){let h=e[a],f=i[h.id];f.needsUpdate!==!1&&h.setValue(t,f.value,r)}}static seqWithValue(t,e){let i=[];for(let r=0,a=t.length;r!==a;++r){let u=t[r];u.id in e&&i.push(u)}return i}};function Xc(l,t,e){let i=l.createShader(t);return l.shaderSource(i,e),l.compileShader(i),i}var T_=0;function P_(l,t){let e=l.split(`
`),i=[],r=Math.max(t-6,0),a=Math.min(t+6,e.length);for(let u=r;u<a;u++){let h=u+1;i.push(`${h===t?">":" "} ${h}: ${e[u]}`)}return i.join(`
`)}function L_(l){switch(l){case oi:return["Linear","( value )"];case ce:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",l),["Linear","( value )"]}}function Yc(l,t,e){let i=l.getShaderParameter(t,35713),r=l.getShaderInfoLog(t).trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let u=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+P_(l.getShaderSource(t),u)}else return r}function R_(l,t){let e=L_(t);return"vec4 "+l+"( vec4 value ) { return LinearTo"+e[0]+e[1]+"; }"}function I_(l,t){let e;switch(t){case Kp:e="Linear";break;case Jp:e="Reinhard";break;case Qp:e="OptimizedCineon";break;case tf:e="ACESFilmic";break;case ef:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+l+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function D_(l){return[l.extensionDerivatives||l.envMapCubeUVHeight||l.bumpMap||l.normalMapTangentSpace||l.clearcoatNormalMap||l.flatShading||l.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(l.extensionFragDepth||l.logarithmicDepthBuffer)&&l.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",l.extensionDrawBuffers&&l.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(l.extensionShaderTextureLOD||l.envMap||l.transmission)&&l.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ws).join(`
`)}function U_(l){let t=[];for(let e in l){let i=l[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function N_(l,t){let e={},i=l.getProgramParameter(t,35721);for(let r=0;r<i;r++){let a=l.getActiveAttrib(t,r),u=a.name,h=1;a.type===35674&&(h=2),a.type===35675&&(h=3),a.type===35676&&(h=4),e[u]={type:a.type,location:l.getAttribLocation(t,u),locationSize:h}}return e}function ws(l){return l!==""}function $c(l,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return l.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function jc(l,t){return l.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var k_=/^[ \t]*#include +<([\w\d./]+)>/gm;function sa(l){return l.replace(k_,O_)}function O_(l,t){let e=Ht[t];if(e===void 0)throw new Error("Can not resolve #include <"+t+">");return sa(e)}var F_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zc(l){return l.replace(F_,V_)}function V_(l,t,e,i){let r="";for(let a=parseInt(t);a<parseInt(e);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Kc(l){let t="precision "+l.precision+` float;
precision `+l.precision+" int;";return l.precision==="highp"?t+=`
#define HIGH_PRECISION`:l.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:l.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function z_(l){let t="SHADOWMAP_TYPE_BASIC";return l.shadowMapType===nh?t="SHADOWMAP_TYPE_PCF":l.shadowMapType===Pp?t="SHADOWMAP_TYPE_PCF_SOFT":l.shadowMapType===ys&&(t="SHADOWMAP_TYPE_VSM"),t}function B_(l){let t="ENVMAP_TYPE_CUBE";if(l.envMap)switch(l.envMapMode){case Xi:case Yi:t="ENVMAP_TYPE_CUBE";break;case Rr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function H_(l){let t="ENVMAP_MODE_REFLECTION";if(l.envMap)switch(l.envMapMode){case Yi:t="ENVMAP_MODE_REFRACTION";break}return t}function G_(l){let t="ENVMAP_BLENDING_NONE";if(l.envMap)switch(l.combine){case Ea:t="ENVMAP_BLENDING_MULTIPLY";break;case jp:t="ENVMAP_BLENDING_MIX";break;case Zp:t="ENVMAP_BLENDING_ADD";break}return t}function W_(l){let t=l.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function q_(l,t,e,i){let r=l.getContext(),a=e.defines,u=e.vertexShader,h=e.fragmentShader,f=z_(e),d=B_(e),p=H_(e),g=G_(e),v=W_(e),_=e.isWebGL2?"":D_(e),y=U_(a),w=r.createProgram(),x,m,I=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(x=[y].filter(ws).join(`
`),x.length>0&&(x+=`
`),m=[_,y].filter(ws).join(`
`),m.length>0&&(m+=`
`)):(x=[Kc(e),"#define SHADER_NAME "+e.shaderName,y,e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+p:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs2?"#define USE_UV2":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+f:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ws).join(`
`),m=[_,Kc(e),"#define SHADER_NAME "+e.shaderName,y,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.envMap?"#define "+p:"",e.envMap?"#define "+g:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs2?"#define USE_UV2":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+f:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Cn?"#define TONE_MAPPING":"",e.toneMapping!==Cn?Ht.tonemapping_pars_fragment:"",e.toneMapping!==Cn?I_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.encodings_pars_fragment,R_("linearToOutputTexel",e.outputEncoding),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ws).join(`
`)),u=sa(u),u=$c(u,e),u=jc(u,e),h=sa(h),h=$c(h,e),h=jc(h,e),u=Zc(u),h=Zc(h),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,x=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",e.glslVersion===_c?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===_c?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let T=I+x+u,L=I+m+h,P=Xc(r,35633,T),F=Xc(r,35632,L);if(r.attachShader(w,P),r.attachShader(w,F),e.index0AttributeName!==void 0?r.bindAttribLocation(w,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(w,0,"position"),r.linkProgram(w),l.debug.checkShaderErrors){let E=r.getProgramInfoLog(w).trim(),D=r.getShaderInfoLog(P).trim(),nt=r.getShaderInfoLog(F).trim(),at=!0,G=!0;if(r.getProgramParameter(w,35714)===!1)if(at=!1,typeof l.debug.onShaderError=="function")l.debug.onShaderError(r,w,P,F);else{let Z=Yc(r,P,"vertex"),X=Yc(r,F,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(w,35715)+`

Program Info Log: `+E+`
`+Z+`
`+X)}else E!==""?console.warn("THREE.WebGLProgram: Program Info Log:",E):(D===""||nt==="")&&(G=!1);G&&(this.diagnostics={runnable:at,programLog:E,vertexShader:{log:D,prefix:x},fragmentShader:{log:nt,prefix:m}})}r.deleteShader(P),r.deleteShader(F);let H;this.getUniforms=function(){return H===void 0&&(H=new qi(r,w)),H};let W;return this.getAttributes=function(){return W===void 0&&(W=N_(r,w)),W},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(w),this.program=void 0},this.name=e.shaderName,this.id=T_++,this.cacheKey=t,this.usedTimes=1,this.program=w,this.vertexShader=P,this.fragmentShader=F,this}var X_=0,ra=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),a=this._getShaderStage(i),u=this._getShaderCacheForMaterial(t);return u.has(r)===!1&&(u.add(r),r.usedTimes++),u.has(a)===!1&&(u.add(a),a.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new oa(t),e.set(t,i)),i}},oa=class{constructor(t){this.id=X_++,this.code=t,this.usedTimes=0}};function Y_(l,t,e,i,r,a,u){let h=new br,f=new ra,d=[],p=r.isWebGL2,g=r.logarithmicDepthBuffer,v=r.vertexTextures,_=r.precision,y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(E){return E===1?"uv2":"uv"}function x(E,D,nt,at,G){let Z=at.fog,X=G.geometry,J=E.isMeshStandardMaterial?at.environment:null,ct=(E.isMeshStandardMaterial?e:t).get(E.envMap||J),st=ct&&ct.mapping===Rr?ct.image.height:null,lt=y[E.type];E.precision!==null&&(_=r.getMaxPrecision(E.precision),_!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",_,"instead."));let ht=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,St=ht!==void 0?ht.length:0,ut=0;X.morphAttributes.position!==void 0&&(ut=1),X.morphAttributes.normal!==void 0&&(ut=2),X.morphAttributes.color!==void 0&&(ut=3);let j,rt,gt,bt;if(lt){let yt=un[lt];j=yt.vertexShader,rt=yt.fragmentShader}else j=E.vertexShader,rt=E.fragmentShader,f.update(E),gt=f.getVertexShaderID(E),bt=f.getFragmentShaderID(E);let K=l.getRenderTarget(),It=G.isInstancedMesh===!0,Et=!!E.map,mt=!!E.matcap,Tt=!!ct,Yt=!!E.aoMap,Mt=!!E.lightMap,Lt=!!E.bumpMap,ee=!!E.normalMap,ie=!!E.displacementMap,oe=!!E.emissiveMap,ae=!!E.metalnessMap,Wt=!!E.roughnessMap,Jt=E.clearcoat>0,pe=E.iridescence>0,R=E.sheen>0,S=E.transmission>0,Q=Jt&&!!E.clearcoatMap,k=Jt&&!!E.clearcoatNormalMap,M=Jt&&!!E.clearcoatRoughnessMap,N=pe&&!!E.iridescenceMap,C=pe&&!!E.iridescenceThicknessMap,q=R&&!!E.sheenColorMap,z=R&&!!E.sheenRoughnessMap,ot=!!E.specularMap,ft=!!E.specularColorMap,xt=!!E.specularIntensityMap,_t=S&&!!E.transmissionMap,wt=S&&!!E.thicknessMap,Nt=!!E.gradientMap,Ot=!!E.alphaMap,le=E.alphaTest>0,O=!!E.extensions,et=!!X.attributes.uv2;return{isWebGL2:p,shaderID:lt,shaderName:E.type,vertexShader:j,fragmentShader:rt,defines:E.defines,customVertexShaderID:gt,customFragmentShaderID:bt,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:_,instancing:It,instancingColor:It&&G.instanceColor!==null,supportsVertexTextures:v,outputEncoding:K===null?l.outputEncoding:K.isXRRenderTarget===!0?K.texture.encoding:oi,map:Et,matcap:mt,envMap:Tt,envMapMode:Tt&&ct.mapping,envMapCubeUVHeight:st,aoMap:Yt,lightMap:Mt,bumpMap:Lt,normalMap:ee,displacementMap:v&&ie,emissiveMap:oe,normalMapObjectSpace:ee&&E.normalMapType===yf,normalMapTangentSpace:ee&&E.normalMapType===ah,decodeVideoTexture:Et&&E.map.isVideoTexture===!0&&E.map.encoding===ce,metalnessMap:ae,roughnessMap:Wt,clearcoat:Jt,clearcoatMap:Q,clearcoatNormalMap:k,clearcoatRoughnessMap:M,iridescence:pe,iridescenceMap:N,iridescenceThicknessMap:C,sheen:R,sheenColorMap:q,sheenRoughnessMap:z,specularMap:ot,specularColorMap:ft,specularIntensityMap:xt,transmission:S,transmissionMap:_t,thicknessMap:wt,gradientMap:Nt,opaque:E.transparent===!1&&E.blending===Hi,alphaMap:Ot,alphaTest:le,combine:E.combine,mapUv:Et&&w(E.map.channel),aoMapUv:Yt&&w(E.aoMap.channel),lightMapUv:Mt&&w(E.lightMap.channel),bumpMapUv:Lt&&w(E.bumpMap.channel),normalMapUv:ee&&w(E.normalMap.channel),displacementMapUv:ie&&w(E.displacementMap.channel),emissiveMapUv:oe&&w(E.emissiveMap.channel),metalnessMapUv:ae&&w(E.metalnessMap.channel),roughnessMapUv:Wt&&w(E.roughnessMap.channel),clearcoatMapUv:Q&&w(E.clearcoatMap.channel),clearcoatNormalMapUv:k&&w(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:M&&w(E.clearcoatRoughnessMap.channel),iridescenceMapUv:N&&w(E.iridescenceMap.channel),iridescenceThicknessMapUv:C&&w(E.iridescenceThicknessMap.channel),sheenColorMapUv:q&&w(E.sheenColorMap.channel),sheenRoughnessMapUv:z&&w(E.sheenRoughnessMap.channel),specularMapUv:ot&&w(E.specularMap.channel),specularColorMapUv:ft&&w(E.specularColorMap.channel),specularIntensityMapUv:xt&&w(E.specularIntensityMap.channel),transmissionMapUv:_t&&w(E.transmissionMap.channel),thicknessMapUv:wt&&w(E.thicknessMap.channel),alphaMapUv:Ot&&w(E.alphaMap.channel),vertexTangents:ee&&!!X.attributes.tangent,vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,vertexUvs2:et,pointsUvs:G.isPoints===!0&&!!X.attributes.uv&&(Et||Ot),fog:!!Z,useFog:E.fog===!0,fogExp2:Z&&Z.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:g,skinning:G.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:St,morphTextureStride:ut,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:E.dithering,shadowMapEnabled:l.shadowMap.enabled&&nt.length>0,shadowMapType:l.shadowMap.type,toneMapping:E.toneMapped?l.toneMapping:Cn,useLegacyLights:l.useLegacyLights,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===En,flipSided:E.side===Oe,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:O&&E.extensions.derivatives===!0,extensionFragDepth:O&&E.extensions.fragDepth===!0,extensionDrawBuffers:O&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:O&&E.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:p||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:p||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:p||i.has("EXT_shader_texture_lod"),customProgramCacheKey:E.customProgramCacheKey()}}function m(E){let D=[];if(E.shaderID?D.push(E.shaderID):(D.push(E.customVertexShaderID),D.push(E.customFragmentShaderID)),E.defines!==void 0)for(let nt in E.defines)D.push(nt),D.push(E.defines[nt]);return E.isRawShaderMaterial===!1&&(I(D,E),T(D,E),D.push(l.outputEncoding)),D.push(E.customProgramCacheKey),D.join()}function I(E,D){E.push(D.precision),E.push(D.outputEncoding),E.push(D.envMapMode),E.push(D.envMapCubeUVHeight),E.push(D.mapUv),E.push(D.alphaMapUv),E.push(D.lightMapUv),E.push(D.aoMapUv),E.push(D.bumpMapUv),E.push(D.normalMapUv),E.push(D.displacementMapUv),E.push(D.emissiveMapUv),E.push(D.metalnessMapUv),E.push(D.roughnessMapUv),E.push(D.clearcoatMapUv),E.push(D.clearcoatNormalMapUv),E.push(D.clearcoatRoughnessMapUv),E.push(D.iridescenceMapUv),E.push(D.iridescenceThicknessMapUv),E.push(D.sheenColorMapUv),E.push(D.sheenRoughnessMapUv),E.push(D.specularMapUv),E.push(D.specularColorMapUv),E.push(D.specularIntensityMapUv),E.push(D.transmissionMapUv),E.push(D.thicknessMapUv),E.push(D.combine),E.push(D.fogExp2),E.push(D.sizeAttenuation),E.push(D.morphTargetsCount),E.push(D.morphAttributeCount),E.push(D.numDirLights),E.push(D.numPointLights),E.push(D.numSpotLights),E.push(D.numSpotLightMaps),E.push(D.numHemiLights),E.push(D.numRectAreaLights),E.push(D.numDirLightShadows),E.push(D.numPointLightShadows),E.push(D.numSpotLightShadows),E.push(D.numSpotLightShadowsWithMaps),E.push(D.shadowMapType),E.push(D.toneMapping),E.push(D.numClippingPlanes),E.push(D.numClipIntersection),E.push(D.depthPacking)}function T(E,D){h.disableAll(),D.isWebGL2&&h.enable(0),D.supportsVertexTextures&&h.enable(1),D.instancing&&h.enable(2),D.instancingColor&&h.enable(3),D.matcap&&h.enable(4),D.envMap&&h.enable(5),D.normalMapObjectSpace&&h.enable(6),D.normalMapTangentSpace&&h.enable(7),D.clearcoat&&h.enable(8),D.iridescence&&h.enable(9),D.alphaTest&&h.enable(10),D.vertexColors&&h.enable(11),D.vertexAlphas&&h.enable(12),D.vertexUvs2&&h.enable(13),D.vertexTangents&&h.enable(14),E.push(h.mask),h.disableAll(),D.fog&&h.enable(0),D.useFog&&h.enable(1),D.flatShading&&h.enable(2),D.logarithmicDepthBuffer&&h.enable(3),D.skinning&&h.enable(4),D.morphTargets&&h.enable(5),D.morphNormals&&h.enable(6),D.morphColors&&h.enable(7),D.premultipliedAlpha&&h.enable(8),D.shadowMapEnabled&&h.enable(9),D.useLegacyLights&&h.enable(10),D.doubleSided&&h.enable(11),D.flipSided&&h.enable(12),D.useDepthPacking&&h.enable(13),D.dithering&&h.enable(14),D.transmission&&h.enable(15),D.sheen&&h.enable(16),D.decodeVideoTexture&&h.enable(17),D.opaque&&h.enable(18),D.pointsUvs&&h.enable(19),E.push(h.mask)}function L(E){let D=y[E.type],nt;if(D){let at=un[D];nt=Gf.clone(at.uniforms)}else nt=E.uniforms;return nt}function P(E,D){let nt;for(let at=0,G=d.length;at<G;at++){let Z=d[at];if(Z.cacheKey===D){nt=Z,++nt.usedTimes;break}}return nt===void 0&&(nt=new q_(l,D,E,a),d.push(nt)),nt}function F(E){if(--E.usedTimes===0){let D=d.indexOf(E);d[D]=d[d.length-1],d.pop(),E.destroy()}}function H(E){f.remove(E)}function W(){f.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:L,acquireProgram:P,releaseProgram:F,releaseShaderCache:H,programs:d,dispose:W}}function $_(){let l=new WeakMap;function t(a){let u=l.get(a);return u===void 0&&(u={},l.set(a,u)),u}function e(a){l.delete(a)}function i(a,u,h){l.get(a)[u]=h}function r(){l=new WeakMap}return{get:t,remove:e,update:i,dispose:r}}function j_(l,t){return l.groupOrder!==t.groupOrder?l.groupOrder-t.groupOrder:l.renderOrder!==t.renderOrder?l.renderOrder-t.renderOrder:l.material.id!==t.material.id?l.material.id-t.material.id:l.z!==t.z?l.z-t.z:l.id-t.id}function Jc(l,t){return l.groupOrder!==t.groupOrder?l.groupOrder-t.groupOrder:l.renderOrder!==t.renderOrder?l.renderOrder-t.renderOrder:l.z!==t.z?t.z-l.z:l.id-t.id}function Qc(){let l=[],t=0,e=[],i=[],r=[];function a(){t=0,e.length=0,i.length=0,r.length=0}function u(g,v,_,y,w,x){let m=l[t];return m===void 0?(m={id:g.id,object:g,geometry:v,material:_,groupOrder:y,renderOrder:g.renderOrder,z:w,group:x},l[t]=m):(m.id=g.id,m.object=g,m.geometry=v,m.material=_,m.groupOrder=y,m.renderOrder=g.renderOrder,m.z=w,m.group=x),t++,m}function h(g,v,_,y,w,x){let m=u(g,v,_,y,w,x);_.transmission>0?i.push(m):_.transparent===!0?r.push(m):e.push(m)}function f(g,v,_,y,w,x){let m=u(g,v,_,y,w,x);_.transmission>0?i.unshift(m):_.transparent===!0?r.unshift(m):e.unshift(m)}function d(g,v){e.length>1&&e.sort(g||j_),i.length>1&&i.sort(v||Jc),r.length>1&&r.sort(v||Jc)}function p(){for(let g=t,v=l.length;g<v;g++){let _=l[g];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:i,transparent:r,init:a,push:h,unshift:f,finish:p,sort:d}}function Z_(){let l=new WeakMap;function t(i,r){let a=l.get(i),u;return a===void 0?(u=new Qc,l.set(i,[u])):r>=a.length?(u=new Qc,a.push(u)):u=a[r],u}function e(){l=new WeakMap}return{get:t,dispose:e}}function K_(){let l={};return{get:function(t){if(l[t.id]!==void 0)return l[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new Y,color:new Kt};break;case"SpotLight":e={position:new Y,direction:new Y,color:new Kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new Y,color:new Kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new Y,skyColor:new Kt,groundColor:new Kt};break;case"RectAreaLight":e={color:new Kt,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return l[t.id]=e,e}}}function J_(){let l={};return{get:function(t){if(l[t.id]!==void 0)return l[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return l[t.id]=e,e}}}var Q_=0;function t0(l,t){return(t.castShadow?2:0)-(l.castShadow?2:0)+(t.map?1:0)-(l.map?1:0)}function e0(l,t){let e=new K_,i=J_(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let p=0;p<9;p++)r.probe.push(new Y);let a=new Y,u=new de,h=new de;function f(p,g){let v=0,_=0,y=0;for(let nt=0;nt<9;nt++)r.probe[nt].set(0,0,0);let w=0,x=0,m=0,I=0,T=0,L=0,P=0,F=0,H=0,W=0;p.sort(t0);let E=g===!0?Math.PI:1;for(let nt=0,at=p.length;nt<at;nt++){let G=p[nt],Z=G.color,X=G.intensity,J=G.distance,ct=G.shadow&&G.shadow.map?G.shadow.map.texture:null;if(G.isAmbientLight)v+=Z.r*X*E,_+=Z.g*X*E,y+=Z.b*X*E;else if(G.isLightProbe)for(let st=0;st<9;st++)r.probe[st].addScaledVector(G.sh.coefficients[st],X);else if(G.isDirectionalLight){let st=e.get(G);if(st.color.copy(G.color).multiplyScalar(G.intensity*E),G.castShadow){let lt=G.shadow,ht=i.get(G);ht.shadowBias=lt.bias,ht.shadowNormalBias=lt.normalBias,ht.shadowRadius=lt.radius,ht.shadowMapSize=lt.mapSize,r.directionalShadow[w]=ht,r.directionalShadowMap[w]=ct,r.directionalShadowMatrix[w]=G.shadow.matrix,L++}r.directional[w]=st,w++}else if(G.isSpotLight){let st=e.get(G);st.position.setFromMatrixPosition(G.matrixWorld),st.color.copy(Z).multiplyScalar(X*E),st.distance=J,st.coneCos=Math.cos(G.angle),st.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),st.decay=G.decay,r.spot[m]=st;let lt=G.shadow;if(G.map&&(r.spotLightMap[H]=G.map,H++,lt.updateMatrices(G),G.castShadow&&W++),r.spotLightMatrix[m]=lt.matrix,G.castShadow){let ht=i.get(G);ht.shadowBias=lt.bias,ht.shadowNormalBias=lt.normalBias,ht.shadowRadius=lt.radius,ht.shadowMapSize=lt.mapSize,r.spotShadow[m]=ht,r.spotShadowMap[m]=ct,F++}m++}else if(G.isRectAreaLight){let st=e.get(G);st.color.copy(Z).multiplyScalar(X),st.halfWidth.set(G.width*.5,0,0),st.halfHeight.set(0,G.height*.5,0),r.rectArea[I]=st,I++}else if(G.isPointLight){let st=e.get(G);if(st.color.copy(G.color).multiplyScalar(G.intensity*E),st.distance=G.distance,st.decay=G.decay,G.castShadow){let lt=G.shadow,ht=i.get(G);ht.shadowBias=lt.bias,ht.shadowNormalBias=lt.normalBias,ht.shadowRadius=lt.radius,ht.shadowMapSize=lt.mapSize,ht.shadowCameraNear=lt.camera.near,ht.shadowCameraFar=lt.camera.far,r.pointShadow[x]=ht,r.pointShadowMap[x]=ct,r.pointShadowMatrix[x]=G.shadow.matrix,P++}r.point[x]=st,x++}else if(G.isHemisphereLight){let st=e.get(G);st.skyColor.copy(G.color).multiplyScalar(X*E),st.groundColor.copy(G.groundColor).multiplyScalar(X*E),r.hemi[T]=st,T++}}I>0&&(t.isWebGL2||l.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=vt.LTC_FLOAT_1,r.rectAreaLTC2=vt.LTC_FLOAT_2):l.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=vt.LTC_HALF_1,r.rectAreaLTC2=vt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=v,r.ambient[1]=_,r.ambient[2]=y;let D=r.hash;(D.directionalLength!==w||D.pointLength!==x||D.spotLength!==m||D.rectAreaLength!==I||D.hemiLength!==T||D.numDirectionalShadows!==L||D.numPointShadows!==P||D.numSpotShadows!==F||D.numSpotMaps!==H)&&(r.directional.length=w,r.spot.length=m,r.rectArea.length=I,r.point.length=x,r.hemi.length=T,r.directionalShadow.length=L,r.directionalShadowMap.length=L,r.pointShadow.length=P,r.pointShadowMap.length=P,r.spotShadow.length=F,r.spotShadowMap.length=F,r.directionalShadowMatrix.length=L,r.pointShadowMatrix.length=P,r.spotLightMatrix.length=F+H-W,r.spotLightMap.length=H,r.numSpotLightShadowsWithMaps=W,D.directionalLength=w,D.pointLength=x,D.spotLength=m,D.rectAreaLength=I,D.hemiLength=T,D.numDirectionalShadows=L,D.numPointShadows=P,D.numSpotShadows=F,D.numSpotMaps=H,r.version=Q_++)}function d(p,g){let v=0,_=0,y=0,w=0,x=0,m=g.matrixWorldInverse;for(let I=0,T=p.length;I<T;I++){let L=p[I];if(L.isDirectionalLight){let P=r.directional[v];P.direction.setFromMatrixPosition(L.matrixWorld),a.setFromMatrixPosition(L.target.matrixWorld),P.direction.sub(a),P.direction.transformDirection(m),v++}else if(L.isSpotLight){let P=r.spot[y];P.position.setFromMatrixPosition(L.matrixWorld),P.position.applyMatrix4(m),P.direction.setFromMatrixPosition(L.matrixWorld),a.setFromMatrixPosition(L.target.matrixWorld),P.direction.sub(a),P.direction.transformDirection(m),y++}else if(L.isRectAreaLight){let P=r.rectArea[w];P.position.setFromMatrixPosition(L.matrixWorld),P.position.applyMatrix4(m),h.identity(),u.copy(L.matrixWorld),u.premultiply(m),h.extractRotation(u),P.halfWidth.set(L.width*.5,0,0),P.halfHeight.set(0,L.height*.5,0),P.halfWidth.applyMatrix4(h),P.halfHeight.applyMatrix4(h),w++}else if(L.isPointLight){let P=r.point[_];P.position.setFromMatrixPosition(L.matrixWorld),P.position.applyMatrix4(m),_++}else if(L.isHemisphereLight){let P=r.hemi[x];P.direction.setFromMatrixPosition(L.matrixWorld),P.direction.transformDirection(m),x++}}}return{setup:f,setupView:d,state:r}}function th(l,t){let e=new e0(l,t),i=[],r=[];function a(){i.length=0,r.length=0}function u(g){i.push(g)}function h(g){r.push(g)}function f(g){e.setup(i,g)}function d(g){e.setupView(i,g)}return{init:a,state:{lightsArray:i,shadowsArray:r,lights:e},setupLights:f,setupLightsView:d,pushLight:u,pushShadow:h}}function n0(l,t){let e=new WeakMap;function i(a,u=0){let h=e.get(a),f;return h===void 0?(f=new th(l,t),e.set(a,[f])):u>=h.length?(f=new th(l,t),h.push(f)):f=h[u],f}function r(){e=new WeakMap}return{get:i,dispose:r}}var aa=class extends li{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},la=class extends li{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},i0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,s0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function r0(l,t,e){let i=new Er,r=new Gt,a=new Gt,u=new ve,h=new aa({depthPacking:xf}),f=new la,d={},p=e.maxTextureSize,g={[Hn]:Oe,[Oe]:Hn,[En]:En},v=new Tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Gt},radius:{value:4}},vertexShader:i0,fragmentShader:s0}),_=v.clone();_.defines.HORIZONTAL_PASS=1;let y=new Je;y.setAttribute("position",new Pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let w=new Ze(y,v),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nh,this.render=function(L,P,F){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||L.length===0)return;let H=l.getRenderTarget(),W=l.getActiveCubeFace(),E=l.getActiveMipmapLevel(),D=l.state;D.setBlending(Bn),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);for(let nt=0,at=L.length;nt<at;nt++){let G=L[nt],Z=G.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;r.copy(Z.mapSize);let X=Z.getFrameExtents();if(r.multiply(X),a.copy(Z.mapSize),(r.x>p||r.y>p)&&(r.x>p&&(a.x=Math.floor(p/X.x),r.x=a.x*X.x,Z.mapSize.x=a.x),r.y>p&&(a.y=Math.floor(p/X.y),r.y=a.y*X.y,Z.mapSize.y=a.y)),Z.map===null){let ct=this.type!==ys?{minFilter:Re,magFilter:Re}:{};Z.map=new An(r.x,r.y,ct),Z.map.texture.name=G.name+".shadowMap",Z.camera.updateProjectionMatrix()}l.setRenderTarget(Z.map),l.clear();let J=Z.getViewportCount();for(let ct=0;ct<J;ct++){let st=Z.getViewport(ct);u.set(a.x*st.x,a.y*st.y,a.x*st.z,a.y*st.w),D.viewport(u),Z.updateMatrices(G,ct),i=Z.getFrustum(),T(P,F,Z.camera,G,this.type)}Z.isPointLightShadow!==!0&&this.type===ys&&m(Z,F),Z.needsUpdate=!1}x.needsUpdate=!1,l.setRenderTarget(H,W,E)};function m(L,P){let F=t.update(w);v.defines.VSM_SAMPLES!==L.blurSamples&&(v.defines.VSM_SAMPLES=L.blurSamples,_.defines.VSM_SAMPLES=L.blurSamples,v.needsUpdate=!0,_.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new An(r.x,r.y)),v.uniforms.shadow_pass.value=L.map.texture,v.uniforms.resolution.value=L.mapSize,v.uniforms.radius.value=L.radius,l.setRenderTarget(L.mapPass),l.clear(),l.renderBufferDirect(P,null,F,v,w,null),_.uniforms.shadow_pass.value=L.mapPass.texture,_.uniforms.resolution.value=L.mapSize,_.uniforms.radius.value=L.radius,l.setRenderTarget(L.map),l.clear(),l.renderBufferDirect(P,null,F,_,w,null)}function I(L,P,F,H){let W=null,E=F.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(E!==void 0)W=E;else if(W=F.isPointLight===!0?f:h,l.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){let D=W.uuid,nt=P.uuid,at=d[D];at===void 0&&(at={},d[D]=at);let G=at[nt];G===void 0&&(G=W.clone(),at[nt]=G),W=G}if(W.visible=P.visible,W.wireframe=P.wireframe,H===ys?W.side=P.shadowSide!==null?P.shadowSide:P.side:W.side=P.shadowSide!==null?P.shadowSide:g[P.side],W.alphaMap=P.alphaMap,W.alphaTest=P.alphaTest,W.map=P.map,W.clipShadows=P.clipShadows,W.clippingPlanes=P.clippingPlanes,W.clipIntersection=P.clipIntersection,W.displacementMap=P.displacementMap,W.displacementScale=P.displacementScale,W.displacementBias=P.displacementBias,W.wireframeLinewidth=P.wireframeLinewidth,W.linewidth=P.linewidth,F.isPointLight===!0&&W.isMeshDistanceMaterial===!0){let D=l.properties.get(W);D.light=F}return W}function T(L,P,F,H,W){if(L.visible===!1)return;if(L.layers.test(P.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&W===ys)&&(!L.frustumCulled||i.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,L.matrixWorld);let nt=t.update(L),at=L.material;if(Array.isArray(at)){let G=nt.groups;for(let Z=0,X=G.length;Z<X;Z++){let J=G[Z],ct=at[J.materialIndex];if(ct&&ct.visible){let st=I(L,ct,H,W);l.renderBufferDirect(F,null,nt,st,L,J)}}}else if(at.visible){let G=I(L,at,H,W);l.renderBufferDirect(F,null,nt,G,L,null)}}let D=L.children;for(let nt=0,at=D.length;nt<at;nt++)T(D[nt],P,F,H,W)}}function o0(l,t,e){let i=e.isWebGL2;function r(){let O=!1,et=new ve,dt=null,yt=new ve(0,0,0,0);return{setMask:function(Ct){dt!==Ct&&!O&&(l.colorMask(Ct,Ct,Ct,Ct),dt=Ct)},setLocked:function(Ct){O=Ct},setClear:function(Ct,ne,se,re,qe){qe===!0&&(Ct*=re,ne*=re,se*=re),et.set(Ct,ne,se,re),yt.equals(et)===!1&&(l.clearColor(Ct,ne,se,re),yt.copy(et))},reset:function(){O=!1,dt=null,yt.set(-1,0,0,0)}}}function a(){let O=!1,et=null,dt=null,yt=null;return{setTest:function(Ct){Ct?K(2929):It(2929)},setMask:function(Ct){et!==Ct&&!O&&(l.depthMask(Ct),et=Ct)},setFunc:function(Ct){if(dt!==Ct){switch(Ct){case Hp:l.depthFunc(512);break;case Gp:l.depthFunc(519);break;case Wp:l.depthFunc(513);break;case Go:l.depthFunc(515);break;case qp:l.depthFunc(514);break;case Xp:l.depthFunc(518);break;case Yp:l.depthFunc(516);break;case $p:l.depthFunc(517);break;default:l.depthFunc(515)}dt=Ct}},setLocked:function(Ct){O=Ct},setClear:function(Ct){yt!==Ct&&(l.clearDepth(Ct),yt=Ct)},reset:function(){O=!1,et=null,dt=null,yt=null}}}function u(){let O=!1,et=null,dt=null,yt=null,Ct=null,ne=null,se=null,re=null,qe=null;return{setTest:function(Qt){O||(Qt?K(2960):It(2960))},setMask:function(Qt){et!==Qt&&!O&&(l.stencilMask(Qt),et=Qt)},setFunc:function(Qt,Ne,Ee){(dt!==Qt||yt!==Ne||Ct!==Ee)&&(l.stencilFunc(Qt,Ne,Ee),dt=Qt,yt=Ne,Ct=Ee)},setOp:function(Qt,Ne,Ee){(ne!==Qt||se!==Ne||re!==Ee)&&(l.stencilOp(Qt,Ne,Ee),ne=Qt,se=Ne,re=Ee)},setLocked:function(Qt){O=Qt},setClear:function(Qt){qe!==Qt&&(l.clearStencil(Qt),qe=Qt)},reset:function(){O=!1,et=null,dt=null,yt=null,Ct=null,ne=null,se=null,re=null,qe=null}}}let h=new r,f=new a,d=new u,p=new WeakMap,g=new WeakMap,v={},_={},y=new WeakMap,w=[],x=null,m=!1,I=null,T=null,L=null,P=null,F=null,H=null,W=null,E=!1,D=null,nt=null,at=null,G=null,Z=null,X=l.getParameter(35661),J=!1,ct=0,st=l.getParameter(7938);st.indexOf("WebGL")!==-1?(ct=parseFloat(/^WebGL (\d)/.exec(st)[1]),J=ct>=1):st.indexOf("OpenGL ES")!==-1&&(ct=parseFloat(/^OpenGL ES (\d)/.exec(st)[1]),J=ct>=2);let lt=null,ht={},St=l.getParameter(3088),ut=l.getParameter(2978),j=new ve().fromArray(St),rt=new ve().fromArray(ut);function gt(O,et,dt){let yt=new Uint8Array(4),Ct=l.createTexture();l.bindTexture(O,Ct),l.texParameteri(O,10241,9728),l.texParameteri(O,10240,9728);for(let ne=0;ne<dt;ne++)l.texImage2D(et+ne,0,6408,1,1,0,6408,5121,yt);return Ct}let bt={};bt[3553]=gt(3553,3553,1),bt[34067]=gt(34067,34069,6),h.setClear(0,0,0,1),f.setClear(1),d.setClear(0),K(2929),f.setFunc(Go),ie(!1),oe(Fl),K(2884),Lt(Bn);function K(O){v[O]!==!0&&(l.enable(O),v[O]=!0)}function It(O){v[O]!==!1&&(l.disable(O),v[O]=!1)}function Et(O,et){return _[O]!==et?(l.bindFramebuffer(O,et),_[O]=et,i&&(O===36009&&(_[36160]=et),O===36160&&(_[36009]=et)),!0):!1}function mt(O,et){let dt=w,yt=!1;if(O)if(dt=y.get(et),dt===void 0&&(dt=[],y.set(et,dt)),O.isWebGLMultipleRenderTargets){let Ct=O.texture;if(dt.length!==Ct.length||dt[0]!==36064){for(let ne=0,se=Ct.length;ne<se;ne++)dt[ne]=36064+ne;dt.length=Ct.length,yt=!0}}else dt[0]!==36064&&(dt[0]=36064,yt=!0);else dt[0]!==1029&&(dt[0]=1029,yt=!0);yt&&(e.isWebGL2?l.drawBuffers(dt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(dt))}function Tt(O){return x!==O?(l.useProgram(O),x=O,!0):!1}let Yt={[Vi]:32774,[Rp]:32778,[Ip]:32779};if(i)Yt[Hl]=32775,Yt[Gl]=32776;else{let O=t.get("EXT_blend_minmax");O!==null&&(Yt[Hl]=O.MIN_EXT,Yt[Gl]=O.MAX_EXT)}let Mt={[Dp]:0,[Up]:1,[Np]:768,[ih]:770,[Bp]:776,[Vp]:774,[Op]:772,[kp]:769,[sh]:771,[zp]:775,[Fp]:773};function Lt(O,et,dt,yt,Ct,ne,se,re){if(O===Bn){m===!0&&(It(3042),m=!1);return}if(m===!1&&(K(3042),m=!0),O!==Lp){if(O!==I||re!==E){if((T!==Vi||F!==Vi)&&(l.blendEquation(32774),T=Vi,F=Vi),re)switch(O){case Hi:l.blendFuncSeparate(1,771,1,771);break;case Vl:l.blendFunc(1,1);break;case zl:l.blendFuncSeparate(0,769,0,1);break;case Bl:l.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Hi:l.blendFuncSeparate(770,771,1,771);break;case Vl:l.blendFunc(770,1);break;case zl:l.blendFuncSeparate(0,769,0,1);break;case Bl:l.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}L=null,P=null,H=null,W=null,I=O,E=re}return}Ct=Ct||et,ne=ne||dt,se=se||yt,(et!==T||Ct!==F)&&(l.blendEquationSeparate(Yt[et],Yt[Ct]),T=et,F=Ct),(dt!==L||yt!==P||ne!==H||se!==W)&&(l.blendFuncSeparate(Mt[dt],Mt[yt],Mt[ne],Mt[se]),L=dt,P=yt,H=ne,W=se),I=O,E=!1}function ee(O,et){O.side===En?It(2884):K(2884);let dt=O.side===Oe;et&&(dt=!dt),ie(dt),O.blending===Hi&&O.transparent===!1?Lt(Bn):Lt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.premultipliedAlpha),f.setFunc(O.depthFunc),f.setTest(O.depthTest),f.setMask(O.depthWrite),h.setMask(O.colorWrite);let yt=O.stencilWrite;d.setTest(yt),yt&&(d.setMask(O.stencilWriteMask),d.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),d.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Wt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?K(32926):It(32926)}function ie(O){D!==O&&(O?l.frontFace(2304):l.frontFace(2305),D=O)}function oe(O){O!==Ap?(K(2884),O!==nt&&(O===Fl?l.cullFace(1029):O===Tp?l.cullFace(1028):l.cullFace(1032))):It(2884),nt=O}function ae(O){O!==at&&(J&&l.lineWidth(O),at=O)}function Wt(O,et,dt){O?(K(32823),(G!==et||Z!==dt)&&(l.polygonOffset(et,dt),G=et,Z=dt)):It(32823)}function Jt(O){O?K(3089):It(3089)}function pe(O){O===void 0&&(O=33984+X-1),lt!==O&&(l.activeTexture(O),lt=O)}function R(O,et,dt){dt===void 0&&(lt===null?dt=33984+X-1:dt=lt);let yt=ht[dt];yt===void 0&&(yt={type:void 0,texture:void 0},ht[dt]=yt),(yt.type!==O||yt.texture!==et)&&(lt!==dt&&(l.activeTexture(dt),lt=dt),l.bindTexture(O,et||bt[O]),yt.type=O,yt.texture=et)}function S(){let O=ht[lt];O!==void 0&&O.type!==void 0&&(l.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Q(){try{l.compressedTexImage2D.apply(l,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function k(){try{l.compressedTexImage3D.apply(l,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function M(){try{l.texSubImage2D.apply(l,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function N(){try{l.texSubImage3D.apply(l,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function C(){try{l.compressedTexSubImage2D.apply(l,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function q(){try{l.compressedTexSubImage3D.apply(l,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function z(){try{l.texStorage2D.apply(l,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ot(){try{l.texStorage3D.apply(l,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ft(){try{l.texImage2D.apply(l,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function xt(){try{l.texImage3D.apply(l,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function _t(O){j.equals(O)===!1&&(l.scissor(O.x,O.y,O.z,O.w),j.copy(O))}function wt(O){rt.equals(O)===!1&&(l.viewport(O.x,O.y,O.z,O.w),rt.copy(O))}function Nt(O,et){let dt=g.get(et);dt===void 0&&(dt=new WeakMap,g.set(et,dt));let yt=dt.get(O);yt===void 0&&(yt=l.getUniformBlockIndex(et,O.name),dt.set(O,yt))}function Ot(O,et){let yt=g.get(et).get(O);p.get(et)!==yt&&(l.uniformBlockBinding(et,yt,O.__bindingPointIndex),p.set(et,yt))}function le(){l.disable(3042),l.disable(2884),l.disable(2929),l.disable(32823),l.disable(3089),l.disable(2960),l.disable(32926),l.blendEquation(32774),l.blendFunc(1,0),l.blendFuncSeparate(1,0,1,0),l.colorMask(!0,!0,!0,!0),l.clearColor(0,0,0,0),l.depthMask(!0),l.depthFunc(513),l.clearDepth(1),l.stencilMask(4294967295),l.stencilFunc(519,0,4294967295),l.stencilOp(7680,7680,7680),l.clearStencil(0),l.cullFace(1029),l.frontFace(2305),l.polygonOffset(0,0),l.activeTexture(33984),l.bindFramebuffer(36160,null),i===!0&&(l.bindFramebuffer(36009,null),l.bindFramebuffer(36008,null)),l.useProgram(null),l.lineWidth(1),l.scissor(0,0,l.canvas.width,l.canvas.height),l.viewport(0,0,l.canvas.width,l.canvas.height),v={},lt=null,ht={},_={},y=new WeakMap,w=[],x=null,m=!1,I=null,T=null,L=null,P=null,F=null,H=null,W=null,E=!1,D=null,nt=null,at=null,G=null,Z=null,j.set(0,0,l.canvas.width,l.canvas.height),rt.set(0,0,l.canvas.width,l.canvas.height),h.reset(),f.reset(),d.reset()}return{buffers:{color:h,depth:f,stencil:d},enable:K,disable:It,bindFramebuffer:Et,drawBuffers:mt,useProgram:Tt,setBlending:Lt,setMaterial:ee,setFlipSided:ie,setCullFace:oe,setLineWidth:ae,setPolygonOffset:Wt,setScissorTest:Jt,activeTexture:pe,bindTexture:R,unbindTexture:S,compressedTexImage2D:Q,compressedTexImage3D:k,texImage2D:ft,texImage3D:xt,updateUBOMapping:Nt,uniformBlockBinding:Ot,texStorage2D:z,texStorage3D:ot,texSubImage2D:M,texSubImage3D:N,compressedTexSubImage2D:C,compressedTexSubImage3D:q,scissor:_t,viewport:wt,reset:le}}function a0(l,t,e,i,r,a,u){let h=r.isWebGL2,f=r.maxTextures,d=r.maxCubemapSize,p=r.maxTextureSize,g=r.maxSamples,v=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,_=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),y=new WeakMap,w,x=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function I(R,S){return m?new OffscreenCanvas(R,S):mr("canvas")}function T(R,S,Q,k){let M=1;if((R.width>k||R.height>k)&&(M=k/Math.max(R.width,R.height)),M<1||S===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){let N=S?Sf:Math.floor,C=N(M*R.width),q=N(M*R.height);w===void 0&&(w=I(C,q));let z=Q?I(C,q):w;return z.width=C,z.height=q,z.getContext("2d").drawImage(R,0,0,C,q),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+C+"x"+q+")."),z}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function L(R){return bc(R.width)&&bc(R.height)}function P(R){return h?!1:R.wrapS!==nn||R.wrapT!==nn||R.minFilter!==Re&&R.minFilter!==je}function F(R,S){return R.generateMipmaps&&S&&R.minFilter!==Re&&R.minFilter!==je}function H(R){l.generateMipmap(R)}function W(R,S,Q,k,M=!1){if(h===!1)return S;if(R!==null){if(l[R]!==void 0)return l[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let N=S;return S===6403&&(Q===5126&&(N=33326),Q===5131&&(N=33325),Q===5121&&(N=33321)),S===33319&&(Q===5126&&(N=33328),Q===5131&&(N=33327),Q===5121&&(N=33323)),S===6408&&(Q===5126&&(N=34836),Q===5131&&(N=34842),Q===5121&&(N=k===ce&&M===!1?35907:32856),Q===32819&&(N=32854),Q===32820&&(N=32855)),(N===33325||N===33326||N===33327||N===33328||N===34842||N===34836)&&t.get("EXT_color_buffer_float"),N}function E(R,S,Q){return F(R,Q)===!0||R.isFramebufferTexture&&R.minFilter!==Re&&R.minFilter!==je?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function D(R){return R===Re||R===Wl||R===po?9728:9729}function nt(R){let S=R.target;S.removeEventListener("dispose",nt),G(S),S.isVideoTexture&&y.delete(S)}function at(R){let S=R.target;S.removeEventListener("dispose",at),X(S)}function G(R){let S=i.get(R);if(S.__webglInit===void 0)return;let Q=R.source,k=x.get(Q);if(k){let M=k[S.__cacheKey];M.usedTimes--,M.usedTimes===0&&Z(R),Object.keys(k).length===0&&x.delete(Q)}i.remove(R)}function Z(R){let S=i.get(R);l.deleteTexture(S.__webglTexture);let Q=R.source,k=x.get(Q);delete k[S.__cacheKey],u.memory.textures--}function X(R){let S=R.texture,Q=i.get(R),k=i.get(S);if(k.__webglTexture!==void 0&&(l.deleteTexture(k.__webglTexture),u.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let M=0;M<6;M++)l.deleteFramebuffer(Q.__webglFramebuffer[M]),Q.__webglDepthbuffer&&l.deleteRenderbuffer(Q.__webglDepthbuffer[M]);else{if(l.deleteFramebuffer(Q.__webglFramebuffer),Q.__webglDepthbuffer&&l.deleteRenderbuffer(Q.__webglDepthbuffer),Q.__webglMultisampledFramebuffer&&l.deleteFramebuffer(Q.__webglMultisampledFramebuffer),Q.__webglColorRenderbuffer)for(let M=0;M<Q.__webglColorRenderbuffer.length;M++)Q.__webglColorRenderbuffer[M]&&l.deleteRenderbuffer(Q.__webglColorRenderbuffer[M]);Q.__webglDepthRenderbuffer&&l.deleteRenderbuffer(Q.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let M=0,N=S.length;M<N;M++){let C=i.get(S[M]);C.__webglTexture&&(l.deleteTexture(C.__webglTexture),u.memory.textures--),i.remove(S[M])}i.remove(S),i.remove(R)}let J=0;function ct(){J=0}function st(){let R=J;return R>=f&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+f),J+=1,R}function lt(R){let S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.encoding),S.join()}function ht(R,S){let Q=i.get(R);if(R.isVideoTexture&&Jt(R),R.isRenderTargetTexture===!1&&R.version>0&&Q.__version!==R.version){let k=R.image;if(k===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{It(Q,R,S);return}}e.bindTexture(3553,Q.__webglTexture,33984+S)}function St(R,S){let Q=i.get(R);if(R.version>0&&Q.__version!==R.version){It(Q,R,S);return}e.bindTexture(35866,Q.__webglTexture,33984+S)}function ut(R,S){let Q=i.get(R);if(R.version>0&&Q.__version!==R.version){It(Q,R,S);return}e.bindTexture(32879,Q.__webglTexture,33984+S)}function j(R,S){let Q=i.get(R);if(R.version>0&&Q.__version!==R.version){Et(Q,R,S);return}e.bindTexture(34067,Q.__webglTexture,33984+S)}let rt={[Xo]:10497,[nn]:33071,[Yo]:33648},gt={[Re]:9728,[Wl]:9984,[po]:9986,[je]:9729,[nf]:9985,[Ss]:9987};function bt(R,S,Q){if(Q?(l.texParameteri(R,10242,rt[S.wrapS]),l.texParameteri(R,10243,rt[S.wrapT]),(R===32879||R===35866)&&l.texParameteri(R,32882,rt[S.wrapR]),l.texParameteri(R,10240,gt[S.magFilter]),l.texParameteri(R,10241,gt[S.minFilter])):(l.texParameteri(R,10242,33071),l.texParameteri(R,10243,33071),(R===32879||R===35866)&&l.texParameteri(R,32882,33071),(S.wrapS!==nn||S.wrapT!==nn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),l.texParameteri(R,10240,D(S.magFilter)),l.texParameteri(R,10241,D(S.minFilter)),S.minFilter!==Re&&S.minFilter!==je&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),t.has("EXT_texture_filter_anisotropic")===!0){let k=t.get("EXT_texture_filter_anisotropic");if(S.magFilter===Re||S.minFilter!==po&&S.minFilter!==Ss||S.type===ii&&t.has("OES_texture_float_linear")===!1||h===!1&&S.type===Es&&t.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||i.get(S).__currentAnisotropy)&&(l.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy)}}function K(R,S){let Q=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",nt));let k=S.source,M=x.get(k);M===void 0&&(M={},x.set(k,M));let N=lt(S);if(N!==R.__cacheKey){M[N]===void 0&&(M[N]={texture:l.createTexture(),usedTimes:0},u.memory.textures++,Q=!0),M[N].usedTimes++;let C=M[R.__cacheKey];C!==void 0&&(M[R.__cacheKey].usedTimes--,C.usedTimes===0&&Z(S)),R.__cacheKey=N,R.__webglTexture=M[N].texture}return Q}function It(R,S,Q){let k=3553;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(k=35866),S.isData3DTexture&&(k=32879);let M=K(R,S),N=S.source;e.bindTexture(k,R.__webglTexture,33984+Q);let C=i.get(N);if(N.version!==C.__version||M===!0){e.activeTexture(33984+Q),l.pixelStorei(37440,S.flipY),l.pixelStorei(37441,S.premultiplyAlpha),l.pixelStorei(3317,S.unpackAlignment),l.pixelStorei(37443,0);let q=P(S)&&L(S.image)===!1,z=T(S.image,q,!1,p);z=pe(S,z);let ot=L(z)||h,ft=a.convert(S.format,S.encoding),xt=a.convert(S.type),_t=W(S.internalFormat,ft,xt,S.encoding,S.isVideoTexture);bt(k,S,ot);let wt,Nt=S.mipmaps,Ot=h&&S.isVideoTexture!==!0,le=C.__version===void 0||M===!0,O=E(S,z,ot);if(S.isDepthTexture)_t=6402,h?S.type===ii?_t=36012:S.type===ni?_t=33190:S.type===Gi?_t=35056:_t=33189:S.type===ii&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===si&&_t===6402&&S.type!==oh&&S.type!==ni&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=ni,xt=a.convert(S.type)),S.format===$i&&_t===6402&&(_t=34041,S.type!==Gi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=Gi,xt=a.convert(S.type))),le&&(Ot?e.texStorage2D(3553,1,_t,z.width,z.height):e.texImage2D(3553,0,_t,z.width,z.height,0,ft,xt,null));else if(S.isDataTexture)if(Nt.length>0&&ot){Ot&&le&&e.texStorage2D(3553,O,_t,Nt[0].width,Nt[0].height);for(let et=0,dt=Nt.length;et<dt;et++)wt=Nt[et],Ot?e.texSubImage2D(3553,et,0,0,wt.width,wt.height,ft,xt,wt.data):e.texImage2D(3553,et,_t,wt.width,wt.height,0,ft,xt,wt.data);S.generateMipmaps=!1}else Ot?(le&&e.texStorage2D(3553,O,_t,z.width,z.height),e.texSubImage2D(3553,0,0,0,z.width,z.height,ft,xt,z.data)):e.texImage2D(3553,0,_t,z.width,z.height,0,ft,xt,z.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ot&&le&&e.texStorage3D(35866,O,_t,Nt[0].width,Nt[0].height,z.depth);for(let et=0,dt=Nt.length;et<dt;et++)wt=Nt[et],S.format!==sn?ft!==null?Ot?e.compressedTexSubImage3D(35866,et,0,0,0,wt.width,wt.height,z.depth,ft,wt.data,0,0):e.compressedTexImage3D(35866,et,_t,wt.width,wt.height,z.depth,0,wt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ot?e.texSubImage3D(35866,et,0,0,0,wt.width,wt.height,z.depth,ft,xt,wt.data):e.texImage3D(35866,et,_t,wt.width,wt.height,z.depth,0,ft,xt,wt.data)}else{Ot&&le&&e.texStorage2D(3553,O,_t,Nt[0].width,Nt[0].height);for(let et=0,dt=Nt.length;et<dt;et++)wt=Nt[et],S.format!==sn?ft!==null?Ot?e.compressedTexSubImage2D(3553,et,0,0,wt.width,wt.height,ft,wt.data):e.compressedTexImage2D(3553,et,_t,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ot?e.texSubImage2D(3553,et,0,0,wt.width,wt.height,ft,xt,wt.data):e.texImage2D(3553,et,_t,wt.width,wt.height,0,ft,xt,wt.data)}else if(S.isDataArrayTexture)Ot?(le&&e.texStorage3D(35866,O,_t,z.width,z.height,z.depth),e.texSubImage3D(35866,0,0,0,0,z.width,z.height,z.depth,ft,xt,z.data)):e.texImage3D(35866,0,_t,z.width,z.height,z.depth,0,ft,xt,z.data);else if(S.isData3DTexture)Ot?(le&&e.texStorage3D(32879,O,_t,z.width,z.height,z.depth),e.texSubImage3D(32879,0,0,0,0,z.width,z.height,z.depth,ft,xt,z.data)):e.texImage3D(32879,0,_t,z.width,z.height,z.depth,0,ft,xt,z.data);else if(S.isFramebufferTexture){if(le)if(Ot)e.texStorage2D(3553,O,_t,z.width,z.height);else{let et=z.width,dt=z.height;for(let yt=0;yt<O;yt++)e.texImage2D(3553,yt,_t,et,dt,0,ft,xt,null),et>>=1,dt>>=1}}else if(Nt.length>0&&ot){Ot&&le&&e.texStorage2D(3553,O,_t,Nt[0].width,Nt[0].height);for(let et=0,dt=Nt.length;et<dt;et++)wt=Nt[et],Ot?e.texSubImage2D(3553,et,0,0,ft,xt,wt):e.texImage2D(3553,et,_t,ft,xt,wt);S.generateMipmaps=!1}else Ot?(le&&e.texStorage2D(3553,O,_t,z.width,z.height),e.texSubImage2D(3553,0,0,0,ft,xt,z)):e.texImage2D(3553,0,_t,ft,xt,z);F(S,ot)&&H(k),C.__version=N.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function Et(R,S,Q){if(S.image.length!==6)return;let k=K(R,S),M=S.source;e.bindTexture(34067,R.__webglTexture,33984+Q);let N=i.get(M);if(M.version!==N.__version||k===!0){e.activeTexture(33984+Q),l.pixelStorei(37440,S.flipY),l.pixelStorei(37441,S.premultiplyAlpha),l.pixelStorei(3317,S.unpackAlignment),l.pixelStorei(37443,0);let C=S.isCompressedTexture||S.image[0].isCompressedTexture,q=S.image[0]&&S.image[0].isDataTexture,z=[];for(let et=0;et<6;et++)!C&&!q?z[et]=T(S.image[et],!1,!0,d):z[et]=q?S.image[et].image:S.image[et],z[et]=pe(S,z[et]);let ot=z[0],ft=L(ot)||h,xt=a.convert(S.format,S.encoding),_t=a.convert(S.type),wt=W(S.internalFormat,xt,_t,S.encoding),Nt=h&&S.isVideoTexture!==!0,Ot=N.__version===void 0||k===!0,le=E(S,ot,ft);bt(34067,S,ft);let O;if(C){Nt&&Ot&&e.texStorage2D(34067,le,wt,ot.width,ot.height);for(let et=0;et<6;et++){O=z[et].mipmaps;for(let dt=0;dt<O.length;dt++){let yt=O[dt];S.format!==sn?xt!==null?Nt?e.compressedTexSubImage2D(34069+et,dt,0,0,yt.width,yt.height,xt,yt.data):e.compressedTexImage2D(34069+et,dt,wt,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Nt?e.texSubImage2D(34069+et,dt,0,0,yt.width,yt.height,xt,_t,yt.data):e.texImage2D(34069+et,dt,wt,yt.width,yt.height,0,xt,_t,yt.data)}}}else{O=S.mipmaps,Nt&&Ot&&(O.length>0&&le++,e.texStorage2D(34067,le,wt,z[0].width,z[0].height));for(let et=0;et<6;et++)if(q){Nt?e.texSubImage2D(34069+et,0,0,0,z[et].width,z[et].height,xt,_t,z[et].data):e.texImage2D(34069+et,0,wt,z[et].width,z[et].height,0,xt,_t,z[et].data);for(let dt=0;dt<O.length;dt++){let Ct=O[dt].image[et].image;Nt?e.texSubImage2D(34069+et,dt+1,0,0,Ct.width,Ct.height,xt,_t,Ct.data):e.texImage2D(34069+et,dt+1,wt,Ct.width,Ct.height,0,xt,_t,Ct.data)}}else{Nt?e.texSubImage2D(34069+et,0,0,0,xt,_t,z[et]):e.texImage2D(34069+et,0,wt,xt,_t,z[et]);for(let dt=0;dt<O.length;dt++){let yt=O[dt];Nt?e.texSubImage2D(34069+et,dt+1,0,0,xt,_t,yt.image[et]):e.texImage2D(34069+et,dt+1,wt,xt,_t,yt.image[et])}}}F(S,ft)&&H(34067),N.__version=M.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function mt(R,S,Q,k,M){let N=a.convert(Q.format,Q.encoding),C=a.convert(Q.type),q=W(Q.internalFormat,N,C,Q.encoding);i.get(S).__hasExternalTextures||(M===32879||M===35866?e.texImage3D(M,0,q,S.width,S.height,S.depth,0,N,C,null):e.texImage2D(M,0,q,S.width,S.height,0,N,C,null)),e.bindFramebuffer(36160,R),Wt(S)?v.framebufferTexture2DMultisampleEXT(36160,k,M,i.get(Q).__webglTexture,0,ae(S)):(M===3553||M>=34069&&M<=34074)&&l.framebufferTexture2D(36160,k,M,i.get(Q).__webglTexture,0),e.bindFramebuffer(36160,null)}function Tt(R,S,Q){if(l.bindRenderbuffer(36161,R),S.depthBuffer&&!S.stencilBuffer){let k=33189;if(Q||Wt(S)){let M=S.depthTexture;M&&M.isDepthTexture&&(M.type===ii?k=36012:M.type===ni&&(k=33190));let N=ae(S);Wt(S)?v.renderbufferStorageMultisampleEXT(36161,N,k,S.width,S.height):l.renderbufferStorageMultisample(36161,N,k,S.width,S.height)}else l.renderbufferStorage(36161,k,S.width,S.height);l.framebufferRenderbuffer(36160,36096,36161,R)}else if(S.depthBuffer&&S.stencilBuffer){let k=ae(S);Q&&Wt(S)===!1?l.renderbufferStorageMultisample(36161,k,35056,S.width,S.height):Wt(S)?v.renderbufferStorageMultisampleEXT(36161,k,35056,S.width,S.height):l.renderbufferStorage(36161,34041,S.width,S.height),l.framebufferRenderbuffer(36160,33306,36161,R)}else{let k=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let M=0;M<k.length;M++){let N=k[M],C=a.convert(N.format,N.encoding),q=a.convert(N.type),z=W(N.internalFormat,C,q,N.encoding),ot=ae(S);Q&&Wt(S)===!1?l.renderbufferStorageMultisample(36161,ot,z,S.width,S.height):Wt(S)?v.renderbufferStorageMultisampleEXT(36161,ot,z,S.width,S.height):l.renderbufferStorage(36161,z,S.width,S.height)}}l.bindRenderbuffer(36161,null)}function Yt(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(36160,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),ht(S.depthTexture,0);let k=i.get(S.depthTexture).__webglTexture,M=ae(S);if(S.depthTexture.format===si)Wt(S)?v.framebufferTexture2DMultisampleEXT(36160,36096,3553,k,0,M):l.framebufferTexture2D(36160,36096,3553,k,0);else if(S.depthTexture.format===$i)Wt(S)?v.framebufferTexture2DMultisampleEXT(36160,33306,3553,k,0,M):l.framebufferTexture2D(36160,33306,3553,k,0);else throw new Error("Unknown depthTexture format")}function Mt(R){let S=i.get(R),Q=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(Q)throw new Error("target.depthTexture not supported in Cube render targets");Yt(S.__webglFramebuffer,R)}else if(Q){S.__webglDepthbuffer=[];for(let k=0;k<6;k++)e.bindFramebuffer(36160,S.__webglFramebuffer[k]),S.__webglDepthbuffer[k]=l.createRenderbuffer(),Tt(S.__webglDepthbuffer[k],R,!1)}else e.bindFramebuffer(36160,S.__webglFramebuffer),S.__webglDepthbuffer=l.createRenderbuffer(),Tt(S.__webglDepthbuffer,R,!1);e.bindFramebuffer(36160,null)}function Lt(R,S,Q){let k=i.get(R);S!==void 0&&mt(k.__webglFramebuffer,R,R.texture,36064,3553),Q!==void 0&&Mt(R)}function ee(R){let S=R.texture,Q=i.get(R),k=i.get(S);R.addEventListener("dispose",at),R.isWebGLMultipleRenderTargets!==!0&&(k.__webglTexture===void 0&&(k.__webglTexture=l.createTexture()),k.__version=S.version,u.memory.textures++);let M=R.isWebGLCubeRenderTarget===!0,N=R.isWebGLMultipleRenderTargets===!0,C=L(R)||h;if(M){Q.__webglFramebuffer=[];for(let q=0;q<6;q++)Q.__webglFramebuffer[q]=l.createFramebuffer()}else{if(Q.__webglFramebuffer=l.createFramebuffer(),N)if(r.drawBuffers){let q=R.texture;for(let z=0,ot=q.length;z<ot;z++){let ft=i.get(q[z]);ft.__webglTexture===void 0&&(ft.__webglTexture=l.createTexture(),u.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(h&&R.samples>0&&Wt(R)===!1){let q=N?S:[S];Q.__webglMultisampledFramebuffer=l.createFramebuffer(),Q.__webglColorRenderbuffer=[],e.bindFramebuffer(36160,Q.__webglMultisampledFramebuffer);for(let z=0;z<q.length;z++){let ot=q[z];Q.__webglColorRenderbuffer[z]=l.createRenderbuffer(),l.bindRenderbuffer(36161,Q.__webglColorRenderbuffer[z]);let ft=a.convert(ot.format,ot.encoding),xt=a.convert(ot.type),_t=W(ot.internalFormat,ft,xt,ot.encoding,R.isXRRenderTarget===!0),wt=ae(R);l.renderbufferStorageMultisample(36161,wt,_t,R.width,R.height),l.framebufferRenderbuffer(36160,36064+z,36161,Q.__webglColorRenderbuffer[z])}l.bindRenderbuffer(36161,null),R.depthBuffer&&(Q.__webglDepthRenderbuffer=l.createRenderbuffer(),Tt(Q.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(36160,null)}}if(M){e.bindTexture(34067,k.__webglTexture),bt(34067,S,C);for(let q=0;q<6;q++)mt(Q.__webglFramebuffer[q],R,S,36064,34069+q);F(S,C)&&H(34067),e.unbindTexture()}else if(N){let q=R.texture;for(let z=0,ot=q.length;z<ot;z++){let ft=q[z],xt=i.get(ft);e.bindTexture(3553,xt.__webglTexture),bt(3553,ft,C),mt(Q.__webglFramebuffer,R,ft,36064+z,3553),F(ft,C)&&H(3553)}e.unbindTexture()}else{let q=3553;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(h?q=R.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(q,k.__webglTexture),bt(q,S,C),mt(Q.__webglFramebuffer,R,S,36064,q),F(S,C)&&H(q),e.unbindTexture()}R.depthBuffer&&Mt(R)}function ie(R){let S=L(R)||h,Q=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let k=0,M=Q.length;k<M;k++){let N=Q[k];if(F(N,S)){let C=R.isWebGLCubeRenderTarget?34067:3553,q=i.get(N).__webglTexture;e.bindTexture(C,q),H(C),e.unbindTexture()}}}function oe(R){if(h&&R.samples>0&&Wt(R)===!1){let S=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],Q=R.width,k=R.height,M=16384,N=[],C=R.stencilBuffer?33306:36096,q=i.get(R),z=R.isWebGLMultipleRenderTargets===!0;if(z)for(let ot=0;ot<S.length;ot++)e.bindFramebuffer(36160,q.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(36160,36064+ot,36161,null),e.bindFramebuffer(36160,q.__webglFramebuffer),l.framebufferTexture2D(36009,36064+ot,3553,null,0);e.bindFramebuffer(36008,q.__webglMultisampledFramebuffer),e.bindFramebuffer(36009,q.__webglFramebuffer);for(let ot=0;ot<S.length;ot++){N.push(36064+ot),R.depthBuffer&&N.push(C);let ft=q.__ignoreDepthValues!==void 0?q.__ignoreDepthValues:!1;if(ft===!1&&(R.depthBuffer&&(M|=256),R.stencilBuffer&&(M|=1024)),z&&l.framebufferRenderbuffer(36008,36064,36161,q.__webglColorRenderbuffer[ot]),ft===!0&&(l.invalidateFramebuffer(36008,[C]),l.invalidateFramebuffer(36009,[C])),z){let xt=i.get(S[ot]).__webglTexture;l.framebufferTexture2D(36009,36064,3553,xt,0)}l.blitFramebuffer(0,0,Q,k,0,0,Q,k,M,9728),_&&l.invalidateFramebuffer(36008,N)}if(e.bindFramebuffer(36008,null),e.bindFramebuffer(36009,null),z)for(let ot=0;ot<S.length;ot++){e.bindFramebuffer(36160,q.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(36160,36064+ot,36161,q.__webglColorRenderbuffer[ot]);let ft=i.get(S[ot]).__webglTexture;e.bindFramebuffer(36160,q.__webglFramebuffer),l.framebufferTexture2D(36009,36064+ot,3553,ft,0)}e.bindFramebuffer(36009,q.__webglMultisampledFramebuffer)}}function ae(R){return Math.min(g,R.samples)}function Wt(R){let S=i.get(R);return h&&R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Jt(R){let S=u.render.frame;y.get(R)!==S&&(y.set(R,S),R.update())}function pe(R,S){let Q=R.encoding,k=R.format,M=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===$o||Q!==oi&&(Q===ce?h===!1?t.has("EXT_sRGB")===!0&&k===sn?(R.format=$o,R.minFilter=je,R.generateMipmaps=!1):S=gr.sRGBToLinear(S):(k!==sn||M!==ri)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",Q)),S}this.allocateTextureUnit=st,this.resetTextureUnits=ct,this.setTexture2D=ht,this.setTexture2DArray=St,this.setTexture3D=ut,this.setTextureCube=j,this.rebindTextures=Lt,this.setupRenderTarget=ee,this.updateRenderTargetMipmap=ie,this.updateMultisampleRenderTarget=oe,this.setupDepthRenderbuffer=Mt,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=Wt}function l0(l,t,e){let i=e.isWebGL2;function r(a,u=null){let h;if(a===ri)return 5121;if(a===af)return 32819;if(a===lf)return 32820;if(a===sf)return 5120;if(a===rf)return 5122;if(a===oh)return 5123;if(a===of)return 5124;if(a===ni)return 5125;if(a===ii)return 5126;if(a===Es)return i?5131:(h=t.get("OES_texture_half_float"),h!==null?h.HALF_FLOAT_OES:null);if(a===cf)return 6406;if(a===sn)return 6408;if(a===hf)return 6409;if(a===uf)return 6410;if(a===si)return 6402;if(a===$i)return 34041;if(a===$o)return h=t.get("EXT_sRGB"),h!==null?h.SRGB_ALPHA_EXT:null;if(a===df)return 6403;if(a===pf)return 36244;if(a===ff)return 33319;if(a===mf)return 33320;if(a===gf)return 36249;if(a===fo||a===mo||a===go||a===vo)if(u===ce)if(h=t.get("WEBGL_compressed_texture_s3tc_srgb"),h!==null){if(a===fo)return h.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===mo)return h.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===go)return h.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===vo)return h.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(h=t.get("WEBGL_compressed_texture_s3tc"),h!==null){if(a===fo)return h.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===mo)return h.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===go)return h.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===vo)return h.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===ql||a===Xl||a===Yl||a===$l)if(h=t.get("WEBGL_compressed_texture_pvrtc"),h!==null){if(a===ql)return h.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===Xl)return h.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Yl)return h.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===$l)return h.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===vf)return h=t.get("WEBGL_compressed_texture_etc1"),h!==null?h.COMPRESSED_RGB_ETC1_WEBGL:null;if(a===jl||a===Zl)if(h=t.get("WEBGL_compressed_texture_etc"),h!==null){if(a===jl)return u===ce?h.COMPRESSED_SRGB8_ETC2:h.COMPRESSED_RGB8_ETC2;if(a===Zl)return u===ce?h.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:h.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(a===Kl||a===Jl||a===Ql||a===tc||a===ec||a===nc||a===ic||a===sc||a===rc||a===oc||a===ac||a===lc||a===cc||a===hc)if(h=t.get("WEBGL_compressed_texture_astc"),h!==null){if(a===Kl)return u===ce?h.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:h.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===Jl)return u===ce?h.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:h.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===Ql)return u===ce?h.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:h.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===tc)return u===ce?h.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:h.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===ec)return u===ce?h.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:h.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===nc)return u===ce?h.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:h.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===ic)return u===ce?h.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:h.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===sc)return u===ce?h.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:h.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===rc)return u===ce?h.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:h.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===oc)return u===ce?h.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:h.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===ac)return u===ce?h.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:h.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===lc)return u===ce?h.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:h.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===cc)return u===ce?h.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:h.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===hc)return u===ce?h.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:h.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===_o)if(h=t.get("EXT_texture_compression_bptc"),h!==null){if(a===_o)return u===ce?h.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:h.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(a===_f||a===uc||a===dc||a===pc)if(h=t.get("EXT_texture_compression_rgtc"),h!==null){if(a===_o)return h.COMPRESSED_RED_RGTC1_EXT;if(a===uc)return h.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===dc)return h.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===pc)return h.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===Gi?i?34042:(h=t.get("WEBGL_depth_texture"),h!==null?h.UNSIGNED_INT_24_8_WEBGL:null):l[a]!==void 0?l[a]:null}return{convert:r}}var ca=class extends De{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Bi=class extends Se{constructor(){super(),this.isGroup=!0,this.type="Group"}},c0={type:"move"},Ms=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,a=null,u=null,h=this._targetRay,f=this._grip,d=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(d&&t.hand){u=!0;for(let w of t.hand.values()){let x=e.getJointPose(w,i),m=this._getHandJoint(d,w);x!==null&&(m.matrix.fromArray(x.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.jointRadius=x.radius),m.visible=x!==null}let p=d.joints["index-finger-tip"],g=d.joints["thumb-tip"],v=p.position.distanceTo(g.position),_=.02,y=.005;d.inputState.pinching&&v>_+y?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&v<=_-y&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else f!==null&&t.gripSpace&&(a=e.getPose(t.gripSpace,i),a!==null&&(f.matrix.fromArray(a.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),a.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(a.linearVelocity)):f.hasLinearVelocity=!1,a.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(a.angularVelocity)):f.hasAngularVelocity=!1));h!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(h.matrix.fromArray(r.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),r.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(r.linearVelocity)):h.hasLinearVelocity=!1,r.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(r.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(c0)))}return h!==null&&(h.visible=r!==null),f!==null&&(f.visible=a!==null),d!==null&&(d.visible=u!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Bi;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},ha=class extends Ue{constructor(t,e,i,r,a,u,h,f,d,p){if(p=p!==void 0?p:si,p!==si&&p!==$i)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&p===si&&(i=ni),i===void 0&&p===$i&&(i=Gi),super(null,r,a,u,h,f,p,i,d),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=h!==void 0?h:Re,this.minFilter=f!==void 0?f:Re,this.flipY=!1,this.generateMipmaps=!1}},ua=class extends dn{constructor(t,e){super();let i=this,r=null,a=1,u=null,h="local-floor",f=1,d=null,p=null,g=null,v=null,_=null,y=null,w=e.getContextAttributes(),x=null,m=null,I=[],T=[],L=new Set,P=new Map,F=new De;F.layers.enable(1),F.viewport=new ve;let H=new De;H.layers.enable(2),H.viewport=new ve;let W=[F,H],E=new ca;E.layers.enable(1),E.layers.enable(2);let D=null,nt=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let rt=I[j];return rt===void 0&&(rt=new Ms,I[j]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(j){let rt=I[j];return rt===void 0&&(rt=new Ms,I[j]=rt),rt.getGripSpace()},this.getHand=function(j){let rt=I[j];return rt===void 0&&(rt=new Ms,I[j]=rt),rt.getHandSpace()};function at(j){let rt=T.indexOf(j.inputSource);if(rt===-1)return;let gt=I[rt];gt!==void 0&&gt.dispatchEvent({type:j.type,data:j.inputSource})}function G(){r.removeEventListener("select",at),r.removeEventListener("selectstart",at),r.removeEventListener("selectend",at),r.removeEventListener("squeeze",at),r.removeEventListener("squeezestart",at),r.removeEventListener("squeezeend",at),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",Z);for(let j=0;j<I.length;j++){let rt=T[j];rt!==null&&(T[j]=null,I[j].disconnect(rt))}D=null,nt=null,t.setRenderTarget(x),_=null,v=null,g=null,r=null,m=null,ut.stop(),i.isPresenting=!1,i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){a=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){h=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||u},this.setReferenceSpace=function(j){d=j},this.getBaseLayer=function(){return v!==null?v:_},this.getBinding=function(){return g},this.getFrame=function(){return y},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(x=t.getRenderTarget(),r.addEventListener("select",at),r.addEventListener("selectstart",at),r.addEventListener("selectend",at),r.addEventListener("squeeze",at),r.addEventListener("squeezestart",at),r.addEventListener("squeezeend",at),r.addEventListener("end",G),r.addEventListener("inputsourceschange",Z),w.xrCompatible!==!0&&await e.makeXRCompatible(),r.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let rt={antialias:r.renderState.layers===void 0?w.antialias:!0,alpha:w.alpha,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:a};_=new XRWebGLLayer(r,e,rt),r.updateRenderState({baseLayer:_}),m=new An(_.framebufferWidth,_.framebufferHeight,{format:sn,type:ri,encoding:t.outputEncoding,stencilBuffer:w.stencil})}else{let rt=null,gt=null,bt=null;w.depth&&(bt=w.stencil?35056:33190,rt=w.stencil?$i:si,gt=w.stencil?Gi:ni);let K={colorFormat:32856,depthFormat:bt,scaleFactor:a};g=new XRWebGLBinding(r,e),v=g.createProjectionLayer(K),r.updateRenderState({layers:[v]}),m=new An(v.textureWidth,v.textureHeight,{format:sn,type:ri,depthTexture:new ha(v.textureWidth,v.textureHeight,gt,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:w.stencil,encoding:t.outputEncoding,samples:w.antialias?4:0});let It=t.properties.get(m);It.__ignoreDepthValues=v.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(f),d=null,u=await r.requestReferenceSpace(h),ut.setContext(r),ut.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}};function Z(j){for(let rt=0;rt<j.removed.length;rt++){let gt=j.removed[rt],bt=T.indexOf(gt);bt>=0&&(T[bt]=null,I[bt].disconnect(gt))}for(let rt=0;rt<j.added.length;rt++){let gt=j.added[rt],bt=T.indexOf(gt);if(bt===-1){for(let It=0;It<I.length;It++)if(It>=T.length){T.push(gt),bt=It;break}else if(T[It]===null){T[It]=gt,bt=It;break}if(bt===-1)break}let K=I[bt];K&&K.connect(gt)}}let X=new Y,J=new Y;function ct(j,rt,gt){X.setFromMatrixPosition(rt.matrixWorld),J.setFromMatrixPosition(gt.matrixWorld);let bt=X.distanceTo(J),K=rt.projectionMatrix.elements,It=gt.projectionMatrix.elements,Et=K[14]/(K[10]-1),mt=K[14]/(K[10]+1),Tt=(K[9]+1)/K[5],Yt=(K[9]-1)/K[5],Mt=(K[8]-1)/K[0],Lt=(It[8]+1)/It[0],ee=Et*Mt,ie=Et*Lt,oe=bt/(-Mt+Lt),ae=oe*-Mt;rt.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(ae),j.translateZ(oe),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert();let Wt=Et+oe,Jt=mt+oe,pe=ee-ae,R=ie+(bt-ae),S=Tt*mt/Jt*Wt,Q=Yt*mt/Jt*Wt;j.projectionMatrix.makePerspective(pe,R,S,Q,Wt,Jt),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}function st(j,rt){rt===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(rt.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;E.near=H.near=F.near=j.near,E.far=H.far=F.far=j.far,(D!==E.near||nt!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),D=E.near,nt=E.far);let rt=j.parent,gt=E.cameras;st(E,rt);for(let bt=0;bt<gt.length;bt++)st(gt[bt],rt);gt.length===2?ct(E,F,H):E.projectionMatrix.copy(F.projectionMatrix),lt(j,E,rt)};function lt(j,rt,gt){gt===null?j.matrix.copy(rt.matrixWorld):(j.matrix.copy(gt.matrixWorld),j.matrix.invert(),j.matrix.multiply(rt.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0);let bt=j.children;for(let K=0,It=bt.length;K<It;K++)bt[K].updateMatrixWorld(!0);j.projectionMatrix.copy(rt.projectionMatrix),j.projectionMatrixInverse.copy(rt.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=jo*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(v===null&&_===null))return f},this.setFoveation=function(j){f=j,v!==null&&(v.fixedFoveation=j),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=j)},this.getPlanes=function(){return L};let ht=null;function St(j,rt){if(p=rt.getViewerPose(d||u),y=rt,p!==null){let gt=p.views;_!==null&&(t.setRenderTargetFramebuffer(m,_.framebuffer),t.setRenderTarget(m));let bt=!1;gt.length!==E.cameras.length&&(E.cameras.length=0,bt=!0);for(let K=0;K<gt.length;K++){let It=gt[K],Et=null;if(_!==null)Et=_.getViewport(It);else{let Tt=g.getViewSubImage(v,It);Et=Tt.viewport,K===0&&(t.setRenderTargetTextures(m,Tt.colorTexture,v.ignoreDepthValues?void 0:Tt.depthStencilTexture),t.setRenderTarget(m))}let mt=W[K];mt===void 0&&(mt=new De,mt.layers.enable(K),mt.viewport=new ve,W[K]=mt),mt.matrix.fromArray(It.transform.matrix),mt.matrix.decompose(mt.position,mt.quaternion,mt.scale),mt.projectionMatrix.fromArray(It.projectionMatrix),mt.projectionMatrixInverse.copy(mt.projectionMatrix).invert(),mt.viewport.set(Et.x,Et.y,Et.width,Et.height),K===0&&(E.matrix.copy(mt.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),bt===!0&&E.cameras.push(mt)}}for(let gt=0;gt<I.length;gt++){let bt=T[gt],K=I[gt];bt!==null&&K!==void 0&&K.update(bt,rt,d||u)}if(ht&&ht(j,rt),rt.detectedPlanes){i.dispatchEvent({type:"planesdetected",data:rt.detectedPlanes});let gt=null;for(let bt of L)rt.detectedPlanes.has(bt)||(gt===null&&(gt=[]),gt.push(bt));if(gt!==null)for(let bt of gt)L.delete(bt),P.delete(bt),i.dispatchEvent({type:"planeremoved",data:bt});for(let bt of rt.detectedPlanes)if(!L.has(bt))L.add(bt),P.set(bt,rt.lastChangedTime),i.dispatchEvent({type:"planeadded",data:bt});else{let K=P.get(bt);bt.lastChangedTime>K&&(P.set(bt,bt.lastChangedTime),i.dispatchEvent({type:"planechanged",data:bt}))}}y=null}let ut=new dh;ut.setAnimationLoop(St),this.setAnimationLoop=function(j){ht=j},this.dispose=function(){}}};function h0(l,t){function e(x,m){x.matrixAutoUpdate===!0&&x.updateMatrix(),m.value.copy(x.matrix)}function i(x,m){m.color.getRGB(x.fogColor.value,uh(l)),m.isFog?(x.fogNear.value=m.near,x.fogFar.value=m.far):m.isFogExp2&&(x.fogDensity.value=m.density)}function r(x,m,I,T,L){m.isMeshBasicMaterial||m.isMeshLambertMaterial?a(x,m):m.isMeshToonMaterial?(a(x,m),g(x,m)):m.isMeshPhongMaterial?(a(x,m),p(x,m)):m.isMeshStandardMaterial?(a(x,m),v(x,m),m.isMeshPhysicalMaterial&&_(x,m,L)):m.isMeshMatcapMaterial?(a(x,m),y(x,m)):m.isMeshDepthMaterial?a(x,m):m.isMeshDistanceMaterial?(a(x,m),w(x,m)):m.isMeshNormalMaterial?a(x,m):m.isLineBasicMaterial?(u(x,m),m.isLineDashedMaterial&&h(x,m)):m.isPointsMaterial?f(x,m,I,T):m.isSpriteMaterial?d(x,m):m.isShadowMaterial?(x.color.value.copy(m.color),x.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function a(x,m){x.opacity.value=m.opacity,m.color&&x.diffuse.value.copy(m.color),m.emissive&&x.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(x.map.value=m.map,e(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,e(m.alphaMap,x.alphaMapTransform)),m.bumpMap&&(x.bumpMap.value=m.bumpMap,e(m.bumpMap,x.bumpMapTransform),x.bumpScale.value=m.bumpScale,m.side===Oe&&(x.bumpScale.value*=-1)),m.normalMap&&(x.normalMap.value=m.normalMap,e(m.normalMap,x.normalMapTransform),x.normalScale.value.copy(m.normalScale),m.side===Oe&&x.normalScale.value.negate()),m.displacementMap&&(x.displacementMap.value=m.displacementMap,e(m.displacementMap,x.displacementMapTransform),x.displacementScale.value=m.displacementScale,x.displacementBias.value=m.displacementBias),m.emissiveMap&&(x.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,x.emissiveMapTransform)),m.specularMap&&(x.specularMap.value=m.specularMap,e(m.specularMap,x.specularMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest);let I=t.get(m).envMap;if(I&&(x.envMap.value=I,x.flipEnvMap.value=I.isCubeTexture&&I.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=m.reflectivity,x.ior.value=m.ior,x.refractionRatio.value=m.refractionRatio),m.lightMap){x.lightMap.value=m.lightMap;let T=l.useLegacyLights===!0?Math.PI:1;x.lightMapIntensity.value=m.lightMapIntensity*T,e(m.lightMap,x.lightMapTransform)}m.aoMap&&(x.aoMap.value=m.aoMap,x.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,x.aoMapTransform))}function u(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,m.map&&(x.map.value=m.map,e(m.map,x.mapTransform))}function h(x,m){x.dashSize.value=m.dashSize,x.totalSize.value=m.dashSize+m.gapSize,x.scale.value=m.scale}function f(x,m,I,T){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.size.value=m.size*I,x.scale.value=T*.5,m.map&&(x.map.value=m.map,e(m.map,x.uvTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function d(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.rotation.value=m.rotation,m.map&&(x.map.value=m.map,e(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function p(x,m){x.specular.value.copy(m.specular),x.shininess.value=Math.max(m.shininess,1e-4)}function g(x,m){m.gradientMap&&(x.gradientMap.value=m.gradientMap)}function v(x,m){x.metalness.value=m.metalness,m.metalnessMap&&(x.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,x.metalnessMapTransform)),x.roughness.value=m.roughness,m.roughnessMap&&(x.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,x.roughnessMapTransform)),t.get(m).envMap&&(x.envMapIntensity.value=m.envMapIntensity)}function _(x,m,I){x.ior.value=m.ior,m.sheen>0&&(x.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),x.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(x.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,x.sheenColorMapTransform)),m.sheenRoughnessMap&&(x.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,x.sheenRoughnessMapTransform))),m.clearcoat>0&&(x.clearcoat.value=m.clearcoat,x.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(x.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,x.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(x.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Oe&&x.clearcoatNormalScale.value.negate())),m.iridescence>0&&(x.iridescence.value=m.iridescence,x.iridescenceIOR.value=m.iridescenceIOR,x.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(x.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,x.iridescenceMapTransform)),m.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),m.transmission>0&&(x.transmission.value=m.transmission,x.transmissionSamplerMap.value=I.texture,x.transmissionSamplerSize.value.set(I.width,I.height),m.transmissionMap&&(x.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,x.transmissionMapTransform)),x.thickness.value=m.thickness,m.thicknessMap&&(x.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=m.attenuationDistance,x.attenuationColor.value.copy(m.attenuationColor)),x.specularIntensity.value=m.specularIntensity,x.specularColor.value.copy(m.specularColor),m.specularColorMap&&(x.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,x.specularColorMapTransform)),m.specularIntensityMap&&(x.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,x.specularIntensityMapTransform))}function y(x,m){m.matcap&&(x.matcap.value=m.matcap)}function w(x,m){let I=t.get(m).light;x.referencePosition.value.setFromMatrixPosition(I.matrixWorld),x.nearDistance.value=I.shadow.camera.near,x.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function u0(l,t,e,i){let r={},a={},u=[],h=e.isWebGL2?l.getParameter(35375):0;function f(I,T){let L=T.program;i.uniformBlockBinding(I,L)}function d(I,T){let L=r[I.id];L===void 0&&(y(I),L=p(I),r[I.id]=L,I.addEventListener("dispose",x));let P=T.program;i.updateUBOMapping(I,P);let F=t.render.frame;a[I.id]!==F&&(v(I),a[I.id]=F)}function p(I){let T=g();I.__bindingPointIndex=T;let L=l.createBuffer(),P=I.__size,F=I.usage;return l.bindBuffer(35345,L),l.bufferData(35345,P,F),l.bindBuffer(35345,null),l.bindBufferBase(35345,T,L),L}function g(){for(let I=0;I<h;I++)if(u.indexOf(I)===-1)return u.push(I),I;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(I){let T=r[I.id],L=I.uniforms,P=I.__cache;l.bindBuffer(35345,T);for(let F=0,H=L.length;F<H;F++){let W=L[F];if(_(W,F,P)===!0){let E=W.__offset,D=Array.isArray(W.value)?W.value:[W.value],nt=0;for(let at=0;at<D.length;at++){let G=D[at],Z=w(G);typeof G=="number"?(W.__data[0]=G,l.bufferSubData(35345,E+nt,W.__data)):G.isMatrix3?(W.__data[0]=G.elements[0],W.__data[1]=G.elements[1],W.__data[2]=G.elements[2],W.__data[3]=G.elements[0],W.__data[4]=G.elements[3],W.__data[5]=G.elements[4],W.__data[6]=G.elements[5],W.__data[7]=G.elements[0],W.__data[8]=G.elements[6],W.__data[9]=G.elements[7],W.__data[10]=G.elements[8],W.__data[11]=G.elements[0]):(G.toArray(W.__data,nt),nt+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}l.bufferSubData(35345,E,W.__data)}}l.bindBuffer(35345,null)}function _(I,T,L){let P=I.value;if(L[T]===void 0){if(typeof P=="number")L[T]=P;else{let F=Array.isArray(P)?P:[P],H=[];for(let W=0;W<F.length;W++)H.push(F[W].clone());L[T]=H}return!0}else if(typeof P=="number"){if(L[T]!==P)return L[T]=P,!0}else{let F=Array.isArray(L[T])?L[T]:[L[T]],H=Array.isArray(P)?P:[P];for(let W=0;W<F.length;W++){let E=F[W];if(E.equals(H[W])===!1)return E.copy(H[W]),!0}}return!1}function y(I){let T=I.uniforms,L=0,P=16,F=0;for(let H=0,W=T.length;H<W;H++){let E=T[H],D={boundary:0,storage:0},nt=Array.isArray(E.value)?E.value:[E.value];for(let at=0,G=nt.length;at<G;at++){let Z=nt[at],X=w(Z);D.boundary+=X.boundary,D.storage+=X.storage}if(E.__data=new Float32Array(D.storage/Float32Array.BYTES_PER_ELEMENT),E.__offset=L,H>0){F=L%P;let at=P-F;F!==0&&at-D.boundary<0&&(L+=P-F,E.__offset=L)}L+=D.storage}return F=L%P,F>0&&(L+=P-F),I.__size=L,I.__cache={},this}function w(I){let T={boundary:0,storage:0};return typeof I=="number"?(T.boundary=4,T.storage=4):I.isVector2?(T.boundary=8,T.storage=8):I.isVector3||I.isColor?(T.boundary=16,T.storage=12):I.isVector4?(T.boundary=16,T.storage=16):I.isMatrix3?(T.boundary=48,T.storage=48):I.isMatrix4?(T.boundary=64,T.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),T}function x(I){let T=I.target;T.removeEventListener("dispose",x);let L=u.indexOf(T.__bindingPointIndex);u.splice(L,1),l.deleteBuffer(r[T.id]),delete r[T.id],delete a[T.id]}function m(){for(let I in r)l.deleteBuffer(r[I]);u=[],r={},a={}}return{bind:f,update:d,dispose:m}}function d0(){let l=mr("canvas");return l.style.display="block",l}var Ps=class{constructor(t={}){let{canvas:e=d0(),context:i=null,depth:r=!0,stencil:a=!0,alpha:u=!1,antialias:h=!1,premultipliedAlpha:f=!0,preserveDrawingBuffer:d=!1,powerPreference:p="default",failIfMajorPerformanceCaveat:g=!1}=t;this.isWebGLRenderer=!0;let v;i!==null?v=i.getContextAttributes().alpha:v=u;let _=null,y=null,w=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=oi,this.useLegacyLights=!0,this.toneMapping=Cn,this.toneMappingExposure=1;let m=this,I=!1,T=0,L=0,P=null,F=-1,H=null,W=new ve,E=new ve,D=null,nt=e.width,at=e.height,G=1,Z=null,X=null,J=new ve(0,0,nt,at),ct=new ve(0,0,nt,at),st=!1,lt=new Er,ht=!1,St=!1,ut=null,j=new de,rt=new Y,gt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function bt(){return P===null?G:1}let K=i;function It(A,$){for(let tt=0;tt<A.length;tt++){let B=A[tt],it=e.getContext(B,$);if(it!==null)return it}return null}try{let A={alpha:!0,depth:r,stencil:a,antialias:h,premultipliedAlpha:f,preserveDrawingBuffer:d,powerPreference:p,failIfMajorPerformanceCaveat:g};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Sa}`),e.addEventListener("webglcontextlost",wt,!1),e.addEventListener("webglcontextrestored",Nt,!1),e.addEventListener("webglcontextcreationerror",Ot,!1),K===null){let $=["webgl2","webgl","experimental-webgl"];if(m.isWebGL1Renderer===!0&&$.shift(),K=It($,A),K===null)throw It($)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}K.getShaderPrecisionFormat===void 0&&(K.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Et,mt,Tt,Yt,Mt,Lt,ee,ie,oe,ae,Wt,Jt,pe,R,S,Q,k,M,N,C,q,z,ot,ft;function xt(){Et=new Dv(K),mt=new Av(K,Et,t),Et.init(mt),z=new l0(K,Et,mt),Tt=new o0(K,Et,mt),Yt=new kv,Mt=new $_,Lt=new a0(K,Et,Tt,Mt,mt,z,Yt),ee=new Pv(m),ie=new Iv(m),oe=new $f(K,mt),ot=new Ev(K,Et,oe,mt),ae=new Uv(K,oe,Yt,ot),Wt=new zv(K,ae,oe,Yt),N=new Vv(K,mt,Lt),Q=new Tv(Mt),Jt=new Y_(m,ee,ie,Et,mt,ot,Q),pe=new h0(m,Mt),R=new Z_,S=new n0(Et,mt),M=new Sv(m,ee,ie,Tt,Wt,v,f),k=new r0(m,Wt,mt),ft=new u0(K,Yt,mt,Tt),C=new Cv(K,Et,Yt,mt),q=new Nv(K,Et,Yt,mt),Yt.programs=Jt.programs,m.capabilities=mt,m.extensions=Et,m.properties=Mt,m.renderLists=R,m.shadowMap=k,m.state=Tt,m.info=Yt}xt();let _t=new ua(m,K);this.xr=_t,this.getContext=function(){return K},this.getContextAttributes=function(){return K.getContextAttributes()},this.forceContextLoss=function(){let A=Et.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=Et.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(A){A!==void 0&&(G=A,this.setSize(nt,at,!1))},this.getSize=function(A){return A.set(nt,at)},this.setSize=function(A,$,tt=!0){if(_t.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}nt=A,at=$,e.width=Math.floor(A*G),e.height=Math.floor($*G),tt===!0&&(e.style.width=A+"px",e.style.height=$+"px"),this.setViewport(0,0,A,$)},this.getDrawingBufferSize=function(A){return A.set(nt*G,at*G).floor()},this.setDrawingBufferSize=function(A,$,tt){nt=A,at=$,G=tt,e.width=Math.floor(A*tt),e.height=Math.floor($*tt),this.setViewport(0,0,A,$)},this.getCurrentViewport=function(A){return A.copy(W)},this.getViewport=function(A){return A.copy(J)},this.setViewport=function(A,$,tt,B){A.isVector4?J.set(A.x,A.y,A.z,A.w):J.set(A,$,tt,B),Tt.viewport(W.copy(J).multiplyScalar(G).floor())},this.getScissor=function(A){return A.copy(ct)},this.setScissor=function(A,$,tt,B){A.isVector4?ct.set(A.x,A.y,A.z,A.w):ct.set(A,$,tt,B),Tt.scissor(E.copy(ct).multiplyScalar(G).floor())},this.getScissorTest=function(){return st},this.setScissorTest=function(A){Tt.setScissorTest(st=A)},this.setOpaqueSort=function(A){Z=A},this.setTransparentSort=function(A){X=A},this.getClearColor=function(A){return A.copy(M.getClearColor())},this.setClearColor=function(){M.setClearColor.apply(M,arguments)},this.getClearAlpha=function(){return M.getClearAlpha()},this.setClearAlpha=function(){M.setClearAlpha.apply(M,arguments)},this.clear=function(A=!0,$=!0,tt=!0){let B=0;A&&(B|=16384),$&&(B|=256),tt&&(B|=1024),K.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",wt,!1),e.removeEventListener("webglcontextrestored",Nt,!1),e.removeEventListener("webglcontextcreationerror",Ot,!1),R.dispose(),S.dispose(),Mt.dispose(),ee.dispose(),ie.dispose(),Wt.dispose(),ot.dispose(),ft.dispose(),Jt.dispose(),_t.dispose(),_t.removeEventListener("sessionstart",Ct),_t.removeEventListener("sessionend",ne),ut&&(ut.dispose(),ut=null),se.stop()};function wt(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function Nt(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;let A=Yt.autoReset,$=k.enabled,tt=k.autoUpdate,B=k.needsUpdate,it=k.type;xt(),Yt.autoReset=A,k.enabled=$,k.autoUpdate=tt,k.needsUpdate=B,k.type=it}function Ot(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function le(A){let $=A.target;$.removeEventListener("dispose",le),O($)}function O(A){et(A),Mt.remove(A)}function et(A){let $=Mt.get(A).programs;$!==void 0&&($.forEach(function(tt){Jt.releaseProgram(tt)}),A.isShaderMaterial&&Jt.releaseShaderCache(A))}this.renderBufferDirect=function(A,$,tt,B,it,Pt){$===null&&($=gt);let Rt=it.isMesh&&it.matrixWorld.determinant()<0,Ut=Qi(A,$,tt,B,it);Tt.setMaterial(B,Rt);let Ft=tt.index,Vt=1;B.wireframe===!0&&(Ft=ae.getWireframeAttribute(tt),Vt=2);let Bt=tt.drawRange,kt=tt.attributes.position,jt=Bt.start*Vt,xe=(Bt.start+Bt.count)*Vt;Pt!==null&&(jt=Math.max(jt,Pt.start*Vt),xe=Math.min(xe,(Pt.start+Pt.count)*Vt)),Ft!==null?(jt=Math.max(jt,0),xe=Math.min(xe,Ft.count)):kt!=null&&(jt=Math.max(jt,0),xe=Math.min(xe,kt.count));let Fe=xe-jt;if(Fe<0||Fe===1/0)return;ot.setup(it,B,Ut,tt,Ft);let an,ue=C;if(Ft!==null&&(an=oe.get(Ft),ue=q,ue.setIndex(an)),it.isMesh)B.wireframe===!0?(Tt.setLineWidth(B.wireframeLinewidth*bt()),ue.setMode(1)):ue.setMode(4);else if(it.isLine){let zt=B.linewidth;zt===void 0&&(zt=1),Tt.setLineWidth(zt*bt()),it.isLineSegments?ue.setMode(1):it.isLineLoop?ue.setMode(2):ue.setMode(3)}else it.isPoints?ue.setMode(0):it.isSprite&&ue.setMode(4);if(it.isInstancedMesh)ue.renderInstances(jt,Fe,it.count);else if(tt.isInstancedBufferGeometry){let zt=tt._maxInstanceCount!==void 0?tt._maxInstanceCount:1/0,es=Math.min(tt.instanceCount,zt);ue.renderInstances(jt,Fe,es)}else ue.render(jt,Fe)},this.compile=function(A,$){function tt(B,it,Pt){B.transparent===!0&&B.side===En&&B.forceSinglePass===!1?(B.side=Oe,B.needsUpdate=!0,Gn(B,it,Pt),B.side=Hn,B.needsUpdate=!0,Gn(B,it,Pt),B.side=En):Gn(B,it,Pt)}y=S.get(A),y.init(),x.push(y),A.traverseVisible(function(B){B.isLight&&B.layers.test($.layers)&&(y.pushLight(B),B.castShadow&&y.pushShadow(B))}),y.setupLights(m.useLegacyLights),A.traverse(function(B){let it=B.material;if(it)if(Array.isArray(it))for(let Pt=0;Pt<it.length;Pt++){let Rt=it[Pt];tt(Rt,A,B)}else tt(it,A,B)}),x.pop(),y=null};let dt=null;function yt(A){dt&&dt(A)}function Ct(){se.stop()}function ne(){se.start()}let se=new dh;se.setAnimationLoop(yt),typeof self<"u"&&se.setContext(self),this.setAnimationLoop=function(A){dt=A,_t.setAnimationLoop(A),A===null?se.stop():se.start()},_t.addEventListener("sessionstart",Ct),_t.addEventListener("sessionend",ne),this.render=function(A,$){if($!==void 0&&$.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),$.parent===null&&$.matrixWorldAutoUpdate===!0&&$.updateMatrixWorld(),_t.enabled===!0&&_t.isPresenting===!0&&(_t.cameraAutoUpdate===!0&&_t.updateCamera($),$=_t.getCamera()),A.isScene===!0&&A.onBeforeRender(m,A,$,P),y=S.get(A,x.length),y.init(),x.push(y),j.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),lt.setFromProjectionMatrix(j),St=this.localClippingEnabled,ht=Q.init(this.clippingPlanes,St),_=R.get(A,w.length),_.init(),w.push(_),re(A,$,0,m.sortObjects),_.finish(),m.sortObjects===!0&&_.sort(Z,X),ht===!0&&Q.beginShadows();let tt=y.state.shadowsArray;if(k.render(tt,A,$),ht===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset(),M.render(_,A),y.setupLights(m.useLegacyLights),$.isArrayCamera){let B=$.cameras;for(let it=0,Pt=B.length;it<Pt;it++){let Rt=B[it];qe(_,A,Rt,Rt.viewport)}}else qe(_,A,$);P!==null&&(Lt.updateMultisampleRenderTarget(P),Lt.updateRenderTargetMipmap(P)),A.isScene===!0&&A.onAfterRender(m,A,$),ot.resetDefaultState(),F=-1,H=null,x.pop(),x.length>0?y=x[x.length-1]:y=null,w.pop(),w.length>0?_=w[w.length-1]:_=null};function re(A,$,tt,B){if(A.visible===!1)return;if(A.layers.test($.layers)){if(A.isGroup)tt=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update($);else if(A.isLight)y.pushLight(A),A.castShadow&&y.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||lt.intersectsSprite(A)){B&&rt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(j);let Rt=Wt.update(A),Ut=A.material;Ut.visible&&_.push(A,Rt,Ut,tt,rt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(A.isSkinnedMesh&&A.skeleton.frame!==Yt.render.frame&&(A.skeleton.update(),A.skeleton.frame=Yt.render.frame),!A.frustumCulled||lt.intersectsObject(A))){B&&rt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(j);let Rt=Wt.update(A),Ut=A.material;if(Array.isArray(Ut)){let Ft=Rt.groups;for(let Vt=0,Bt=Ft.length;Vt<Bt;Vt++){let kt=Ft[Vt],jt=Ut[kt.materialIndex];jt&&jt.visible&&_.push(A,Rt,jt,tt,rt.z,kt)}}else Ut.visible&&_.push(A,Rt,Ut,tt,rt.z,null)}}let Pt=A.children;for(let Rt=0,Ut=Pt.length;Rt<Ut;Rt++)re(Pt[Rt],$,tt,B)}function qe(A,$,tt,B){let it=A.opaque,Pt=A.transmissive,Rt=A.transparent;y.setupLightsView(tt),ht===!0&&Q.setGlobalState(m.clippingPlanes,tt),Pt.length>0&&Qt(it,Pt,$,tt),B&&Tt.viewport(W.copy(B)),it.length>0&&Ne(it,$,tt),Pt.length>0&&Ne(Pt,$,tt),Rt.length>0&&Ne(Rt,$,tt),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function Qt(A,$,tt,B){if(ut===null){let Ut=mt.isWebGL2;ut=new An(1024,1024,{generateMipmaps:!0,type:Et.has("EXT_color_buffer_half_float")?Es:ri,minFilter:Ss,samples:Ut&&h===!0?4:0})}let it=m.getRenderTarget();m.setRenderTarget(ut),m.clear();let Pt=m.toneMapping;m.toneMapping=Cn,Ne(A,tt,B),Lt.updateMultisampleRenderTarget(ut),Lt.updateRenderTargetMipmap(ut);let Rt=!1;for(let Ut=0,Ft=$.length;Ut<Ft;Ut++){let Vt=$[Ut],Bt=Vt.object,kt=Vt.geometry,jt=Vt.material,xe=Vt.group;if(jt.side===En&&Bt.layers.test(B.layers)){let Fe=jt.side;jt.side=Oe,jt.needsUpdate=!0,Ee(Bt,tt,B,kt,jt,xe),jt.side=Fe,jt.needsUpdate=!0,Rt=!0}}Rt===!0&&(Lt.updateMultisampleRenderTarget(ut),Lt.updateRenderTargetMipmap(ut)),m.setRenderTarget(it),m.toneMapping=Pt}function Ne(A,$,tt){let B=$.isScene===!0?$.overrideMaterial:null;for(let it=0,Pt=A.length;it<Pt;it++){let Rt=A[it],Ut=Rt.object,Ft=Rt.geometry,Vt=B===null?Rt.material:B,Bt=Rt.group;Ut.layers.test(tt.layers)&&Ee(Ut,$,tt,Ft,Vt,Bt)}}function Ee(A,$,tt,B,it,Pt){A.onBeforeRender(m,$,tt,B,it,Pt),A.modelViewMatrix.multiplyMatrices(tt.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),it.onBeforeRender(m,$,tt,B,A,Pt),it.transparent===!0&&it.side===En&&it.forceSinglePass===!1?(it.side=Oe,it.needsUpdate=!0,m.renderBufferDirect(tt,$,B,it,A,Pt),it.side=Hn,it.needsUpdate=!0,m.renderBufferDirect(tt,$,B,it,A,Pt),it.side=En):m.renderBufferDirect(tt,$,B,it,A,Pt),A.onAfterRender(m,$,tt,B,it,Pt)}function Gn(A,$,tt){$.isScene!==!0&&($=gt);let B=Mt.get(A),it=y.state.lights,Pt=y.state.shadowsArray,Rt=it.state.version,Ut=Jt.getParameters(A,it.state,Pt,$,tt),Ft=Jt.getProgramCacheKey(Ut),Vt=B.programs;B.environment=A.isMeshStandardMaterial?$.environment:null,B.fog=$.fog,B.envMap=(A.isMeshStandardMaterial?ie:ee).get(A.envMap||B.environment),Vt===void 0&&(A.addEventListener("dispose",le),Vt=new Map,B.programs=Vt);let Bt=Vt.get(Ft);if(Bt!==void 0){if(B.currentProgram===Bt&&B.lightsStateVersion===Rt)return Wn(A,Ut),Bt}else Ut.uniforms=Jt.getUniforms(A),A.onBuild(tt,Ut,m),A.onBeforeCompile(Ut,m),Bt=Jt.acquireProgram(Ut,Ft),Vt.set(Ft,Bt),B.uniforms=Ut.uniforms;let kt=B.uniforms;(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(kt.clippingPlanes=Q.uniform),Wn(A,Ut),B.needsLights=Vr(A),B.lightsStateVersion=Rt,B.needsLights&&(kt.ambientLightColor.value=it.state.ambient,kt.lightProbe.value=it.state.probe,kt.directionalLights.value=it.state.directional,kt.directionalLightShadows.value=it.state.directionalShadow,kt.spotLights.value=it.state.spot,kt.spotLightShadows.value=it.state.spotShadow,kt.rectAreaLights.value=it.state.rectArea,kt.ltc_1.value=it.state.rectAreaLTC1,kt.ltc_2.value=it.state.rectAreaLTC2,kt.pointLights.value=it.state.point,kt.pointLightShadows.value=it.state.pointShadow,kt.hemisphereLights.value=it.state.hemi,kt.directionalShadowMap.value=it.state.directionalShadowMap,kt.directionalShadowMatrix.value=it.state.directionalShadowMatrix,kt.spotShadowMap.value=it.state.spotShadowMap,kt.spotLightMatrix.value=it.state.spotLightMatrix,kt.spotLightMap.value=it.state.spotLightMap,kt.pointShadowMap.value=it.state.pointShadowMap,kt.pointShadowMatrix.value=it.state.pointShadowMatrix);let jt=Bt.getUniforms(),xe=qi.seqWithValue(jt.seq,kt);return B.currentProgram=Bt,B.uniformsList=xe,Bt}function Wn(A,$){let tt=Mt.get(A);tt.outputEncoding=$.outputEncoding,tt.instancing=$.instancing,tt.skinning=$.skinning,tt.morphTargets=$.morphTargets,tt.morphNormals=$.morphNormals,tt.morphColors=$.morphColors,tt.morphTargetsCount=$.morphTargetsCount,tt.numClippingPlanes=$.numClippingPlanes,tt.numIntersection=$.numClipIntersection,tt.vertexAlphas=$.vertexAlphas,tt.vertexTangents=$.vertexTangents,tt.toneMapping=$.toneMapping}function Qi(A,$,tt,B,it){$.isScene!==!0&&($=gt),Lt.resetTextureUnits();let Pt=$.fog,Rt=B.isMeshStandardMaterial?$.environment:null,Ut=P===null?m.outputEncoding:P.isXRRenderTarget===!0?P.texture.encoding:oi,Ft=(B.isMeshStandardMaterial?ie:ee).get(B.envMap||Rt),Vt=B.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,Bt=!!B.normalMap&&!!tt.attributes.tangent,kt=!!tt.morphAttributes.position,jt=!!tt.morphAttributes.normal,xe=!!tt.morphAttributes.color,Fe=B.toneMapped?m.toneMapping:Cn,an=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,ue=an!==void 0?an.length:0,zt=Mt.get(B),es=y.state.lights;if(ht===!0&&(St===!0||A!==H)){let Ce=A===H&&B.id===F;Q.setState(B,A,Ce)}let fe=!1;B.version===zt.__version?(zt.needsLights&&zt.lightsStateVersion!==es.state.version||zt.outputEncoding!==Ut||it.isInstancedMesh&&zt.instancing===!1||!it.isInstancedMesh&&zt.instancing===!0||it.isSkinnedMesh&&zt.skinning===!1||!it.isSkinnedMesh&&zt.skinning===!0||zt.envMap!==Ft||B.fog===!0&&zt.fog!==Pt||zt.numClippingPlanes!==void 0&&(zt.numClippingPlanes!==Q.numPlanes||zt.numIntersection!==Q.numIntersection)||zt.vertexAlphas!==Vt||zt.vertexTangents!==Bt||zt.morphTargets!==kt||zt.morphNormals!==jt||zt.morphColors!==xe||zt.toneMapping!==Fe||mt.isWebGL2===!0&&zt.morphTargetsCount!==ue)&&(fe=!0):(fe=!0,zt.__version=B.version);let ln=zt.currentProgram;fe===!0&&(ln=Gn(B,$,it));let ns=!1,Pn=!1,fi=!1,we=ln.getUniforms(),Ve=zt.uniforms;if(Tt.useProgram(ln.program)&&(ns=!0,Pn=!0,fi=!0),B.id!==F&&(F=B.id,Pn=!0),ns||H!==A){if(we.setValue(K,"projectionMatrix",A.projectionMatrix),mt.logarithmicDepthBuffer&&we.setValue(K,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),H!==A&&(H=A,Pn=!0,fi=!0),B.isShaderMaterial||B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshStandardMaterial||B.envMap){let Ce=we.map.cameraPosition;Ce!==void 0&&Ce.setValue(K,rt.setFromMatrixPosition(A.matrixWorld))}(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&we.setValue(K,"isOrthographic",A.isOrthographicCamera===!0),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial||B.isShadowMaterial||it.isSkinnedMesh)&&we.setValue(K,"viewMatrix",A.matrixWorldInverse)}if(it.isSkinnedMesh){we.setOptional(K,it,"bindMatrix"),we.setOptional(K,it,"bindMatrixInverse");let Ce=it.skeleton;Ce&&(mt.floatVertexTextures?(Ce.boneTexture===null&&Ce.computeBoneTexture(),we.setValue(K,"boneTexture",Ce.boneTexture,Lt),we.setValue(K,"boneTextureSize",Ce.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}let is=tt.morphAttributes;if((is.position!==void 0||is.normal!==void 0||is.color!==void 0&&mt.isWebGL2===!0)&&N.update(it,tt,ln),(Pn||zt.receiveShadow!==it.receiveShadow)&&(zt.receiveShadow=it.receiveShadow,we.setValue(K,"receiveShadow",it.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Ve.envMap.value=Ft,Ve.flipEnvMap.value=Ft.isCubeTexture&&Ft.isRenderTargetTexture===!1?-1:1),Pn&&(we.setValue(K,"toneMappingExposure",m.toneMappingExposure),zt.needsLights&&ts(Ve,fi),Pt&&B.fog===!0&&pe.refreshFogUniforms(Ve,Pt),pe.refreshMaterialUniforms(Ve,B,G,at,ut),qi.upload(K,zt.uniformsList,Ve,Lt)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(qi.upload(K,zt.uniformsList,Ve,Lt),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&we.setValue(K,"center",it.center),we.setValue(K,"modelViewMatrix",it.modelViewMatrix),we.setValue(K,"normalMatrix",it.normalMatrix),we.setValue(K,"modelMatrix",it.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){let Ce=B.uniformsGroups;for(let mi=0,zr=Ce.length;mi<zr;mi++)if(mt.isWebGL2){let Us=Ce[mi];ft.update(Us,ln),ft.bind(Us,ln)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ln}function ts(A,$){A.ambientLightColor.needsUpdate=$,A.lightProbe.needsUpdate=$,A.directionalLights.needsUpdate=$,A.directionalLightShadows.needsUpdate=$,A.pointLights.needsUpdate=$,A.pointLightShadows.needsUpdate=$,A.spotLights.needsUpdate=$,A.spotLightShadows.needsUpdate=$,A.rectAreaLights.needsUpdate=$,A.hemisphereLights.needsUpdate=$}function Vr(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(A,$,tt){Mt.get(A.texture).__webglTexture=$,Mt.get(A.depthTexture).__webglTexture=tt;let B=Mt.get(A);B.__hasExternalTextures=!0,B.__hasExternalTextures&&(B.__autoAllocateDepthBuffer=tt===void 0,B.__autoAllocateDepthBuffer||Et.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,$){let tt=Mt.get(A);tt.__webglFramebuffer=$,tt.__useDefaultFramebuffer=$===void 0},this.setRenderTarget=function(A,$=0,tt=0){P=A,T=$,L=tt;let B=!0,it=null,Pt=!1,Rt=!1;if(A){let Ft=Mt.get(A);Ft.__useDefaultFramebuffer!==void 0?(Tt.bindFramebuffer(36160,null),B=!1):Ft.__webglFramebuffer===void 0?Lt.setupRenderTarget(A):Ft.__hasExternalTextures&&Lt.rebindTextures(A,Mt.get(A.texture).__webglTexture,Mt.get(A.depthTexture).__webglTexture);let Vt=A.texture;(Vt.isData3DTexture||Vt.isDataArrayTexture||Vt.isCompressedArrayTexture)&&(Rt=!0);let Bt=Mt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(it=Bt[$],Pt=!0):mt.isWebGL2&&A.samples>0&&Lt.useMultisampledRTT(A)===!1?it=Mt.get(A).__webglMultisampledFramebuffer:it=Bt,W.copy(A.viewport),E.copy(A.scissor),D=A.scissorTest}else W.copy(J).multiplyScalar(G).floor(),E.copy(ct).multiplyScalar(G).floor(),D=st;if(Tt.bindFramebuffer(36160,it)&&mt.drawBuffers&&B&&Tt.drawBuffers(A,it),Tt.viewport(W),Tt.scissor(E),Tt.setScissorTest(D),Pt){let Ft=Mt.get(A.texture);K.framebufferTexture2D(36160,36064,34069+$,Ft.__webglTexture,tt)}else if(Rt){let Ft=Mt.get(A.texture),Vt=$||0;K.framebufferTextureLayer(36160,36064,Ft.__webglTexture,tt||0,Vt)}F=-1},this.readRenderTargetPixels=function(A,$,tt,B,it,Pt,Rt){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ut=Mt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Rt!==void 0&&(Ut=Ut[Rt]),Ut){Tt.bindFramebuffer(36160,Ut);try{let Ft=A.texture,Vt=Ft.format,Bt=Ft.type;if(Vt!==sn&&z.convert(Vt)!==K.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let kt=Bt===Es&&(Et.has("EXT_color_buffer_half_float")||mt.isWebGL2&&Et.has("EXT_color_buffer_float"));if(Bt!==ri&&z.convert(Bt)!==K.getParameter(35738)&&!(Bt===ii&&(mt.isWebGL2||Et.has("OES_texture_float")||Et.has("WEBGL_color_buffer_float")))&&!kt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}$>=0&&$<=A.width-B&&tt>=0&&tt<=A.height-it&&K.readPixels($,tt,B,it,z.convert(Vt),z.convert(Bt),Pt)}finally{let Ft=P!==null?Mt.get(P).__webglFramebuffer:null;Tt.bindFramebuffer(36160,Ft)}}},this.copyFramebufferToTexture=function(A,$,tt=0){let B=Math.pow(2,-tt),it=Math.floor($.image.width*B),Pt=Math.floor($.image.height*B);Lt.setTexture2D($,0),K.copyTexSubImage2D(3553,tt,0,0,A.x,A.y,it,Pt),Tt.unbindTexture()},this.copyTextureToTexture=function(A,$,tt,B=0){let it=$.image.width,Pt=$.image.height,Rt=z.convert(tt.format),Ut=z.convert(tt.type);Lt.setTexture2D(tt,0),K.pixelStorei(37440,tt.flipY),K.pixelStorei(37441,tt.premultiplyAlpha),K.pixelStorei(3317,tt.unpackAlignment),$.isDataTexture?K.texSubImage2D(3553,B,A.x,A.y,it,Pt,Rt,Ut,$.image.data):$.isCompressedTexture?K.compressedTexSubImage2D(3553,B,A.x,A.y,$.mipmaps[0].width,$.mipmaps[0].height,Rt,$.mipmaps[0].data):K.texSubImage2D(3553,B,A.x,A.y,Rt,Ut,$.image),B===0&&tt.generateMipmaps&&K.generateMipmap(3553),Tt.unbindTexture()},this.copyTextureToTexture3D=function(A,$,tt,B,it=0){if(m.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Pt=A.max.x-A.min.x+1,Rt=A.max.y-A.min.y+1,Ut=A.max.z-A.min.z+1,Ft=z.convert(B.format),Vt=z.convert(B.type),Bt;if(B.isData3DTexture)Lt.setTexture3D(B,0),Bt=32879;else if(B.isDataArrayTexture)Lt.setTexture2DArray(B,0),Bt=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}K.pixelStorei(37440,B.flipY),K.pixelStorei(37441,B.premultiplyAlpha),K.pixelStorei(3317,B.unpackAlignment);let kt=K.getParameter(3314),jt=K.getParameter(32878),xe=K.getParameter(3316),Fe=K.getParameter(3315),an=K.getParameter(32877),ue=tt.isCompressedTexture?tt.mipmaps[0]:tt.image;K.pixelStorei(3314,ue.width),K.pixelStorei(32878,ue.height),K.pixelStorei(3316,A.min.x),K.pixelStorei(3315,A.min.y),K.pixelStorei(32877,A.min.z),tt.isDataTexture||tt.isData3DTexture?K.texSubImage3D(Bt,it,$.x,$.y,$.z,Pt,Rt,Ut,Ft,Vt,ue.data):tt.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),K.compressedTexSubImage3D(Bt,it,$.x,$.y,$.z,Pt,Rt,Ut,Ft,ue.data)):K.texSubImage3D(Bt,it,$.x,$.y,$.z,Pt,Rt,Ut,Ft,Vt,ue),K.pixelStorei(3314,kt),K.pixelStorei(32878,jt),K.pixelStorei(3316,xe),K.pixelStorei(3315,Fe),K.pixelStorei(32877,an),it===0&&B.generateMipmaps&&K.generateMipmap(Bt),Tt.unbindTexture()},this.initTexture=function(A){A.isCubeTexture?Lt.setTextureCube(A,0):A.isData3DTexture?Lt.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Lt.setTexture2DArray(A,0):Lt.setTexture2D(A,0),Tt.unbindTexture()},this.resetState=function(){T=0,L=0,P=null,Tt.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(t){console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!t}},da=class extends Ps{};da.prototype.isWebGL1Renderer=!0;var Ar=class extends Se{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(t){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=t}};var Tr=class extends li{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Kt(16777215),this.specular=new Kt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ah,this.normalScale=new Gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ea,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function zn(l,t,e){return vh(l)?new l.constructor(l.subarray(t,e!==void 0?e:l.length)):l.slice(t,e)}function dr(l,t,e){return!l||!e&&l.constructor===t?l:typeof t.BYTES_PER_ELEMENT=="number"?new t(l):Array.prototype.slice.call(l)}function vh(l){return ArrayBuffer.isView(l)&&!(l instanceof DataView)}var Ki=class{constructor(t,e,i,r){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,r=e[i],a=e[i-1];n:{t:{let u;e:{i:if(!(t<r)){for(let h=i+2;;){if(r===void 0){if(t<a)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===h)break;if(a=r,r=e[++i],t<r)break t}u=e.length;break e}if(!(t>=a)){let h=e[1];t<h&&(i=2,a=h);for(let f=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===f)break;if(r=a,a=e[--i-1],t>=a)break t}u=i,i=0;break e}break n}for(;i<u;){let h=i+u>>>1;t<e[h]?u=h:i=h+1}if(r=e[i],a=e[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,r)}return this.interpolate_(i,a,t,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,r=this.valueSize,a=t*r;for(let u=0;u!==r;++u)e[u]=i[a+u];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},pa=class extends Ki{constructor(t,e,i,r){super(t,e,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:fc,endingEnd:fc}}intervalChanged_(t,e,i){let r=this.parameterPositions,a=t-2,u=t+1,h=r[a],f=r[u];if(h===void 0)switch(this.getSettings_().endingStart){case mc:a=t,h=2*e-i;break;case gc:a=r.length-2,h=e+r[a]-r[a+1];break;default:a=t,h=i}if(f===void 0)switch(this.getSettings_().endingEnd){case mc:u=t,f=2*i-e;break;case gc:u=1,f=i+r[1]-r[0];break;default:u=t-1,f=e}let d=(i-e)*.5,p=this.valueSize;this._weightPrev=d/(e-h),this._weightNext=d/(f-i),this._offsetPrev=a*p,this._offsetNext=u*p}interpolate_(t,e,i,r){let a=this.resultBuffer,u=this.sampleValues,h=this.valueSize,f=t*h,d=f-h,p=this._offsetPrev,g=this._offsetNext,v=this._weightPrev,_=this._weightNext,y=(i-e)/(r-e),w=y*y,x=w*y,m=-v*x+2*v*w-v*y,I=(1+v)*x+(-1.5-2*v)*w+(-.5+v)*y+1,T=(-1-_)*x+(1.5+_)*w+.5*y,L=_*x-_*w;for(let P=0;P!==h;++P)a[P]=m*u[p+P]+I*u[d+P]+T*u[f+P]+L*u[g+P];return a}},fa=class extends Ki{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t,e,i,r){let a=this.resultBuffer,u=this.sampleValues,h=this.valueSize,f=t*h,d=f-h,p=(i-e)/(r-e),g=1-p;for(let v=0;v!==h;++v)a[v]=u[d+v]*g+u[f+v]*p;return a}},ma=class extends Ki{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t){return this.copySampleValue_(t-1)}},on=class{constructor(t,e,i,r){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=dr(e,this.TimeBufferType),this.values=dr(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:dr(t.times,Array),values:dr(t.values,Array)};let r=t.getInterpolation();r!==t.DefaultInterpolation&&(i.interpolation=r)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new ma(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new fa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new pa(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case pr:e=this.InterpolantFactoryMethodDiscrete;break;case fr:e=this.InterpolantFactoryMethodLinear;break;case bo:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return pr;case this.InterpolantFactoryMethodLinear:return fr;case this.InterpolantFactoryMethodSmooth:return bo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,r=e.length;i!==r;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,r=e.length;i!==r;++i)e[i]*=t}return this}trim(t,e){let i=this.times,r=i.length,a=0,u=r-1;for(;a!==r&&i[a]<t;)++a;for(;u!==-1&&i[u]>e;)--u;if(++u,a!==0||u!==r){a>=u&&(u=Math.max(u,1),a=u-1);let h=this.getValueSize();this.times=zn(i,a,u),this.values=zn(this.values,a*h,u*h)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,r=this.values,a=i.length;a===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let u=null;for(let h=0;h!==a;h++){let f=i[h];if(typeof f=="number"&&isNaN(f)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,h,f),t=!1;break}if(u!==null&&u>f){console.error("THREE.KeyframeTrack: Out of order keys.",this,h,f,u),t=!1;break}u=f}if(r!==void 0&&vh(r))for(let h=0,f=r.length;h!==f;++h){let d=r[h];if(isNaN(d)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,h,d),t=!1;break}}return t}optimize(){let t=zn(this.times),e=zn(this.values),i=this.getValueSize(),r=this.getInterpolation()===bo,a=t.length-1,u=1;for(let h=1;h<a;++h){let f=!1,d=t[h],p=t[h+1];if(d!==p&&(h!==1||d!==t[0]))if(r)f=!0;else{let g=h*i,v=g-i,_=g+i;for(let y=0;y!==i;++y){let w=e[g+y];if(w!==e[v+y]||w!==e[_+y]){f=!0;break}}}if(f){if(h!==u){t[u]=t[h];let g=h*i,v=u*i;for(let _=0;_!==i;++_)e[v+_]=e[g+_]}++u}}if(a>0){t[u]=t[a];for(let h=a*i,f=u*i,d=0;d!==i;++d)e[f+d]=e[h+d];++u}return u!==t.length?(this.times=zn(t,0,u),this.values=zn(e,0,u*i)):(this.times=t,this.values=e),this}clone(){let t=zn(this.times,0),e=zn(this.values,0),i=this.constructor,r=new i(this.name,t,e);return r.createInterpolant=this.createInterpolant,r}};on.prototype.TimeBufferType=Float32Array;on.prototype.ValueBufferType=Float32Array;on.prototype.DefaultInterpolation=fr;var hi=class extends on{};hi.prototype.ValueTypeName="bool";hi.prototype.ValueBufferType=Array;hi.prototype.DefaultInterpolation=pr;hi.prototype.InterpolantFactoryMethodLinear=void 0;hi.prototype.InterpolantFactoryMethodSmooth=void 0;var ga=class extends on{};ga.prototype.ValueTypeName="color";var va=class extends on{};va.prototype.ValueTypeName="number";var _a=class extends Ki{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t,e,i,r){let a=this.resultBuffer,u=this.sampleValues,h=this.valueSize,f=(i-e)/(r-e),d=t*h;for(let p=d+h;d!==p;d+=4)rn.slerpFlat(a,0,u,d-h,u,d,f);return a}},Ls=class extends on{InterpolantFactoryMethodLinear(t){return new _a(this.times,this.values,this.getValueSize(),t)}};Ls.prototype.ValueTypeName="quaternion";Ls.prototype.DefaultInterpolation=fr;Ls.prototype.InterpolantFactoryMethodSmooth=void 0;var ui=class extends on{};ui.prototype.ValueTypeName="string";ui.prototype.ValueBufferType=Array;ui.prototype.DefaultInterpolation=pr;ui.prototype.InterpolantFactoryMethodLinear=void 0;ui.prototype.InterpolantFactoryMethodSmooth=void 0;var ba=class extends on{};ba.prototype.ValueTypeName="vector";var eh={enabled:!1,files:{},add:function(l,t){this.enabled!==!1&&(this.files[l]=t)},get:function(l){if(this.enabled!==!1)return this.files[l]},remove:function(l){delete this.files[l]},clear:function(){this.files={}}},xa=class{constructor(t,e,i){let r=this,a=!1,u=0,h=0,f,d=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(p){h++,a===!1&&r.onStart!==void 0&&r.onStart(p,u,h),a=!0},this.itemEnd=function(p){u++,r.onProgress!==void 0&&r.onProgress(p,u,h),u===h&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(p){r.onError!==void 0&&r.onError(p)},this.resolveURL=function(p){return f?f(p):p},this.setURLModifier=function(p){return f=p,this},this.addHandler=function(p,g){return d.push(p,g),this},this.removeHandler=function(p){let g=d.indexOf(p);return g!==-1&&d.splice(g,2),this},this.getHandler=function(p){for(let g=0,v=d.length;g<v;g+=2){let _=d[g],y=d[g+1];if(_.global&&(_.lastIndex=0),_.test(p))return y}return null}}},p0=new xa,Rs=class{constructor(t){this.manager=t!==void 0?t:p0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(r,a){i.load(t,r,e,a)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}},Mn={},ya=class extends Error{constructor(t,e){super(t),this.response=e}},Pr=class extends Rs{constructor(t){super(t)}load(t,e,i,r){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let a=eh.get(t);if(a!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(a),this.manager.itemEnd(t)},0),a;if(Mn[t]!==void 0){Mn[t].push({onLoad:e,onProgress:i,onError:r});return}Mn[t]=[],Mn[t].push({onLoad:e,onProgress:i,onError:r});let u=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),h=this.mimeType,f=this.responseType;fetch(u).then(d=>{if(d.status===200||d.status===0){if(d.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||d.body===void 0||d.body.getReader===void 0)return d;let p=Mn[t],g=d.body.getReader(),v=d.headers.get("Content-Length")||d.headers.get("X-File-Size"),_=v?parseInt(v):0,y=_!==0,w=0,x=new ReadableStream({start(m){I();function I(){g.read().then(({done:T,value:L})=>{if(T)m.close();else{w+=L.byteLength;let P=new ProgressEvent("progress",{lengthComputable:y,loaded:w,total:_});for(let F=0,H=p.length;F<H;F++){let W=p[F];W.onProgress&&W.onProgress(P)}m.enqueue(L),I()}})}}});return new Response(x)}else throw new ya(`fetch for "${d.url}" responded with ${d.status}: ${d.statusText}`,d)}).then(d=>{switch(f){case"arraybuffer":return d.arrayBuffer();case"blob":return d.blob();case"document":return d.text().then(p=>new DOMParser().parseFromString(p,h));case"json":return d.json();default:if(h===void 0)return d.text();{let g=/charset="?([^;"\s]*)"?/i.exec(h),v=g&&g[1]?g[1].toLowerCase():void 0,_=new TextDecoder(v);return d.arrayBuffer().then(y=>_.decode(y))}}}).then(d=>{eh.add(t,d);let p=Mn[t];delete Mn[t];for(let g=0,v=p.length;g<v;g++){let _=p[g];_.onLoad&&_.onLoad(d)}}).catch(d=>{let p=Mn[t];if(p===void 0)throw this.manager.itemError(t),d;delete Mn[t];for(let g=0,v=p.length;g<v;g++){let _=p[g];_.onError&&_.onError(d)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}};var wa=class extends Se{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}},Lr=class extends wa{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}};var Aa="\\[\\]\\.:\\/",f0=new RegExp("["+Aa+"]","g"),Ta="[^"+Aa+"]",m0="[^"+Aa.replace("\\.","")+"]",g0=/((?:WC+[\/:])*)/.source.replace("WC",Ta),v0=/(WCOD+)?/.source.replace("WCOD",m0),_0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ta),b0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ta),x0=new RegExp("^"+g0+v0+_0+b0+"$"),y0=["material","materials","bones","map"],Ma=class{constructor(t,e,i){let r=i||te.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,r)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,a=i.length;r!==a;++r)i[r].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},te=class{constructor(t,e,i){this.path=e,this.parsedPath=i||te.parseTrackName(e),this.node=te.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new te.Composite(t,e,i):new te(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(f0,"")}static parseTrackName(t){let e=x0.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let a=i.nodeName.substring(r+1);y0.indexOf(a)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=a)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(a){for(let u=0;u<a.length;u++){let h=a[u];if(h.name===e||h.uuid===e)return h;let f=i(h.children);if(f)return f}return null},r=i(t.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)t[e++]=i[r]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,r=e.propertyName,a=e.propertyIndex;if(t||(t=te.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(i){let d=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let p=0;p<t.length;p++)if(t[p].name===d){d=p;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(d!==void 0){if(t[d]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[d]}}let u=t[r];if(u===void 0){let d=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+d+"."+r+" but it wasn't found.",t);return}let h=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?h=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(h=this.Versioning.MatrixWorldNeedsUpdate);let f=this.BindingType.Direct;if(a!==void 0){if(r==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}f=this.BindingType.ArrayElement,this.resolvedProperty=u,this.propertyIndex=a}else u.fromArray!==void 0&&u.toArray!==void 0?(f=this.BindingType.HasFromToArray,this.resolvedProperty=u):Array.isArray(u)?(f=this.BindingType.EntireArray,this.resolvedProperty=u):this.propertyName=r;this.getValue=this.GetterByBindingType[f],this.setValue=this.SetterByBindingTypeAndVersioning[f][h]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};te.Composite=Ma;te.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};te.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};te.prototype.GetterByBindingType=[te.prototype._getValue_direct,te.prototype._getValue_array,te.prototype._getValue_arrayElement,te.prototype._getValue_toArray];te.prototype.SetterByBindingTypeAndVersioning=[[te.prototype._setValue_direct,te.prototype._setValue_direct_setNeedsUpdate,te.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[te.prototype._setValue_array,te.prototype._setValue_array_setNeedsUpdate,te.prototype._setValue_array_setMatrixWorldNeedsUpdate],[te.prototype._setValue_arrayElement,te.prototype._setValue_arrayElement_setNeedsUpdate,te.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[te.prototype._setValue_fromArray,te.prototype._setValue_fromArray_setNeedsUpdate,te.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var E0=new Float32Array(1);var Is=class{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Ie(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Sa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Sa);var _h={type:"change"},Pa={type:"start"},bh={type:"end"},Dr=class extends dn{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new Y,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:di.ROTATE,MIDDLE:di.DOLLY,RIGHT:di.PAN},this.touches={ONE:pi.ROTATE,TWO:pi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return h.phi},this.getAzimuthalAngle=function(){return h.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(C){C.addEventListener("keydown",Jt),this._domElementKeyEvents=C},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Jt),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(_h),i.update(),a=r.NONE},this.update=function(){let C=new Y,q=new rn().setFromUnitVectors(t.up,new Y(0,1,0)),z=q.clone().invert(),ot=new Y,ft=new rn,xt=2*Math.PI;return function(){let wt=i.object.position;C.copy(wt).sub(i.target),C.applyQuaternion(q),h.setFromVector3(C),i.autoRotate&&a===r.NONE&&E(H()),i.enableDamping?(h.theta+=f.theta*i.dampingFactor,h.phi+=f.phi*i.dampingFactor):(h.theta+=f.theta,h.phi+=f.phi);let Nt=i.minAzimuthAngle,Ot=i.maxAzimuthAngle;return isFinite(Nt)&&isFinite(Ot)&&(Nt<-Math.PI?Nt+=xt:Nt>Math.PI&&(Nt-=xt),Ot<-Math.PI?Ot+=xt:Ot>Math.PI&&(Ot-=xt),Nt<=Ot?h.theta=Math.max(Nt,Math.min(Ot,h.theta)):h.theta=h.theta>(Nt+Ot)/2?Math.max(Nt,h.theta):Math.min(Ot,h.theta)),h.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,h.phi)),h.makeSafe(),h.radius*=d,h.radius=Math.max(i.minDistance,Math.min(i.maxDistance,h.radius)),i.enableDamping===!0?i.target.addScaledVector(p,i.dampingFactor):i.target.add(p),C.setFromSpherical(h),C.applyQuaternion(z),wt.copy(i.target).add(C),i.object.lookAt(i.target),i.enableDamping===!0?(f.theta*=1-i.dampingFactor,f.phi*=1-i.dampingFactor,p.multiplyScalar(1-i.dampingFactor)):(f.set(0,0,0),p.set(0,0,0)),d=1,g||ot.distanceToSquared(i.object.position)>u||8*(1-ft.dot(i.object.quaternion))>u?(i.dispatchEvent(_h),ot.copy(i.object.position),ft.copy(i.object.quaternion),g=!1,!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",S),i.domElement.removeEventListener("pointerdown",Lt),i.domElement.removeEventListener("pointercancel",ie),i.domElement.removeEventListener("wheel",Wt),i.domElement.removeEventListener("pointermove",ee),i.domElement.removeEventListener("pointerup",ie),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",Jt),i._domElementKeyEvents=null)};let i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},a=r.NONE,u=1e-6,h=new Is,f=new Is,d=1,p=new Y,g=!1,v=new Gt,_=new Gt,y=new Gt,w=new Gt,x=new Gt,m=new Gt,I=new Gt,T=new Gt,L=new Gt,P=[],F={};function H(){return 2*Math.PI/60/60*i.autoRotateSpeed}function W(){return Math.pow(.95,i.zoomSpeed)}function E(C){f.theta-=C}function D(C){f.phi-=C}let nt=function(){let C=new Y;return function(z,ot){C.setFromMatrixColumn(ot,0),C.multiplyScalar(-z),p.add(C)}}(),at=function(){let C=new Y;return function(z,ot){i.screenSpacePanning===!0?C.setFromMatrixColumn(ot,1):(C.setFromMatrixColumn(ot,0),C.crossVectors(i.object.up,C)),C.multiplyScalar(z),p.add(C)}}(),G=function(){let C=new Y;return function(z,ot){let ft=i.domElement;if(i.object.isPerspectiveCamera){let xt=i.object.position;C.copy(xt).sub(i.target);let _t=C.length();_t*=Math.tan(i.object.fov/2*Math.PI/180),nt(2*z*_t/ft.clientHeight,i.object.matrix),at(2*ot*_t/ft.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(nt(z*(i.object.right-i.object.left)/i.object.zoom/ft.clientWidth,i.object.matrix),at(ot*(i.object.top-i.object.bottom)/i.object.zoom/ft.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function Z(C){i.object.isPerspectiveCamera?d/=C:i.object.isOrthographicCamera?(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom*C)),i.object.updateProjectionMatrix(),g=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function X(C){i.object.isPerspectiveCamera?d*=C:i.object.isOrthographicCamera?(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/C)),i.object.updateProjectionMatrix(),g=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function J(C){v.set(C.clientX,C.clientY)}function ct(C){I.set(C.clientX,C.clientY)}function st(C){w.set(C.clientX,C.clientY)}function lt(C){_.set(C.clientX,C.clientY),y.subVectors(_,v).multiplyScalar(i.rotateSpeed);let q=i.domElement;E(2*Math.PI*y.x/q.clientHeight),D(2*Math.PI*y.y/q.clientHeight),v.copy(_),i.update()}function ht(C){T.set(C.clientX,C.clientY),L.subVectors(T,I),L.y>0?Z(W()):L.y<0&&X(W()),I.copy(T),i.update()}function St(C){x.set(C.clientX,C.clientY),m.subVectors(x,w).multiplyScalar(i.panSpeed),G(m.x,m.y),w.copy(x),i.update()}function ut(C){C.deltaY<0?X(W()):C.deltaY>0&&Z(W()),i.update()}function j(C){let q=!1;switch(C.code){case i.keys.UP:C.ctrlKey||C.metaKey||C.shiftKey?D(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):G(0,i.keyPanSpeed),q=!0;break;case i.keys.BOTTOM:C.ctrlKey||C.metaKey||C.shiftKey?D(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):G(0,-i.keyPanSpeed),q=!0;break;case i.keys.LEFT:C.ctrlKey||C.metaKey||C.shiftKey?E(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):G(i.keyPanSpeed,0),q=!0;break;case i.keys.RIGHT:C.ctrlKey||C.metaKey||C.shiftKey?E(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):G(-i.keyPanSpeed,0),q=!0;break}q&&(C.preventDefault(),i.update())}function rt(){if(P.length===1)v.set(P[0].pageX,P[0].pageY);else{let C=.5*(P[0].pageX+P[1].pageX),q=.5*(P[0].pageY+P[1].pageY);v.set(C,q)}}function gt(){if(P.length===1)w.set(P[0].pageX,P[0].pageY);else{let C=.5*(P[0].pageX+P[1].pageX),q=.5*(P[0].pageY+P[1].pageY);w.set(C,q)}}function bt(){let C=P[0].pageX-P[1].pageX,q=P[0].pageY-P[1].pageY,z=Math.sqrt(C*C+q*q);I.set(0,z)}function K(){i.enableZoom&&bt(),i.enablePan&&gt()}function It(){i.enableZoom&&bt(),i.enableRotate&&rt()}function Et(C){if(P.length==1)_.set(C.pageX,C.pageY);else{let z=N(C),ot=.5*(C.pageX+z.x),ft=.5*(C.pageY+z.y);_.set(ot,ft)}y.subVectors(_,v).multiplyScalar(i.rotateSpeed);let q=i.domElement;E(2*Math.PI*y.x/q.clientHeight),D(2*Math.PI*y.y/q.clientHeight),v.copy(_)}function mt(C){if(P.length===1)x.set(C.pageX,C.pageY);else{let q=N(C),z=.5*(C.pageX+q.x),ot=.5*(C.pageY+q.y);x.set(z,ot)}m.subVectors(x,w).multiplyScalar(i.panSpeed),G(m.x,m.y),w.copy(x)}function Tt(C){let q=N(C),z=C.pageX-q.x,ot=C.pageY-q.y,ft=Math.sqrt(z*z+ot*ot);T.set(0,ft),L.set(0,Math.pow(T.y/I.y,i.zoomSpeed)),Z(L.y),I.copy(T)}function Yt(C){i.enableZoom&&Tt(C),i.enablePan&&mt(C)}function Mt(C){i.enableZoom&&Tt(C),i.enableRotate&&Et(C)}function Lt(C){i.enabled!==!1&&(P.length===0&&(i.domElement.setPointerCapture(C.pointerId),i.domElement.addEventListener("pointermove",ee),i.domElement.addEventListener("pointerup",ie)),Q(C),C.pointerType==="touch"?pe(C):oe(C))}function ee(C){i.enabled!==!1&&(C.pointerType==="touch"?R(C):ae(C))}function ie(C){k(C),P.length===0&&(i.domElement.releasePointerCapture(C.pointerId),i.domElement.removeEventListener("pointermove",ee),i.domElement.removeEventListener("pointerup",ie)),i.dispatchEvent(bh),a=r.NONE}function oe(C){let q;switch(C.button){case 0:q=i.mouseButtons.LEFT;break;case 1:q=i.mouseButtons.MIDDLE;break;case 2:q=i.mouseButtons.RIGHT;break;default:q=-1}switch(q){case di.DOLLY:if(i.enableZoom===!1)return;ct(C),a=r.DOLLY;break;case di.ROTATE:if(C.ctrlKey||C.metaKey||C.shiftKey){if(i.enablePan===!1)return;st(C),a=r.PAN}else{if(i.enableRotate===!1)return;J(C),a=r.ROTATE}break;case di.PAN:if(C.ctrlKey||C.metaKey||C.shiftKey){if(i.enableRotate===!1)return;J(C),a=r.ROTATE}else{if(i.enablePan===!1)return;st(C),a=r.PAN}break;default:a=r.NONE}a!==r.NONE&&i.dispatchEvent(Pa)}function ae(C){switch(a){case r.ROTATE:if(i.enableRotate===!1)return;lt(C);break;case r.DOLLY:if(i.enableZoom===!1)return;ht(C);break;case r.PAN:if(i.enablePan===!1)return;St(C);break}}function Wt(C){i.enabled===!1||i.enableZoom===!1||a!==r.NONE||(C.preventDefault(),i.dispatchEvent(Pa),ut(C),i.dispatchEvent(bh))}function Jt(C){i.enabled===!1||i.enablePan===!1||j(C)}function pe(C){switch(M(C),P.length){case 1:switch(i.touches.ONE){case pi.ROTATE:if(i.enableRotate===!1)return;rt(),a=r.TOUCH_ROTATE;break;case pi.PAN:if(i.enablePan===!1)return;gt(),a=r.TOUCH_PAN;break;default:a=r.NONE}break;case 2:switch(i.touches.TWO){case pi.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;K(),a=r.TOUCH_DOLLY_PAN;break;case pi.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;It(),a=r.TOUCH_DOLLY_ROTATE;break;default:a=r.NONE}break;default:a=r.NONE}a!==r.NONE&&i.dispatchEvent(Pa)}function R(C){switch(M(C),a){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;Et(C),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;mt(C),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Yt(C),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Mt(C),i.update();break;default:a=r.NONE}}function S(C){i.enabled!==!1&&C.preventDefault()}function Q(C){P.push(C)}function k(C){delete F[C.pointerId];for(let q=0;q<P.length;q++)if(P[q].pointerId==C.pointerId){P.splice(q,1);return}}function M(C){let q=F[C.pointerId];q===void 0&&(q=new Gt,F[C.pointerId]=q),q.set(C.pageX,C.pageY)}function N(C){let q=C.pointerId===P[0].pointerId?P[1]:P[0];return F[q.pointerId]}i.domElement.addEventListener("contextmenu",S),i.domElement.addEventListener("pointerdown",Lt),i.domElement.addEventListener("pointercancel",ie),i.domElement.addEventListener("wheel",Wt,{passive:!1}),this.update()}};var Ur=class extends Rs{constructor(t){super(t)}load(t,e,i,r){let a=this,u=new Pr(this.manager);u.setPath(this.path),u.setResponseType("arraybuffer"),u.setRequestHeader(this.requestHeader),u.setWithCredentials(this.withCredentials),u.load(t,function(h){try{e(a.parse(h))}catch(f){r?r(f):console.error(f),a.manager.itemError(t)}},i,r)}parse(t){function e(d){let p=new DataView(d),g=32/8*3+32/8*3*3+16/8,v=p.getUint32(80,!0);if(80+32/8+v*g===p.byteLength)return!0;let y=[115,111,108,105,100];for(let w=0;w<5;w++)if(i(y,p,w))return!1;return!0}function i(d,p,g){for(let v=0,_=d.length;v<_;v++)if(d[v]!==p.getUint8(g+v))return!1;return!0}function r(d){let p=new DataView(d),g=p.getUint32(80,!0),v,_,y,w=!1,x,m,I,T,L;for(let D=0;D<80-10;D++)p.getUint32(D,!1)==1129270351&&p.getUint8(D+4)==82&&p.getUint8(D+5)==61&&(w=!0,x=new Float32Array(g*3*3),m=p.getUint8(D+6)/255,I=p.getUint8(D+7)/255,T=p.getUint8(D+8)/255,L=p.getUint8(D+9)/255);let P=84,F=12*4+2,H=new Je,W=new Float32Array(g*3*3),E=new Float32Array(g*3*3);for(let D=0;D<g;D++){let nt=P+D*F,at=p.getFloat32(nt,!0),G=p.getFloat32(nt+4,!0),Z=p.getFloat32(nt+8,!0);if(w){let X=p.getUint16(nt+48,!0);X&32768?(v=m,_=I,y=T):(v=(X&31)/31,_=(X>>5&31)/31,y=(X>>10&31)/31)}for(let X=1;X<=3;X++){let J=nt+X*12,ct=D*3*3+(X-1)*3;W[ct]=p.getFloat32(J,!0),W[ct+1]=p.getFloat32(J+4,!0),W[ct+2]=p.getFloat32(J+8,!0),E[ct]=at,E[ct+1]=G,E[ct+2]=Z,w&&(x[ct]=v,x[ct+1]=_,x[ct+2]=y)}}return H.setAttribute("position",new Pe(W,3)),H.setAttribute("normal",new Pe(E,3)),w&&(H.setAttribute("color",new Pe(x,3)),H.hasColors=!0,H.alpha=L),H}function a(d){let p=new Je,g=/solid([\s\S]*?)endsolid/g,v=/facet([\s\S]*?)endfacet/g,_=0,y=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,w=new RegExp("vertex"+y+y+y,"g"),x=new RegExp("normal"+y+y+y,"g"),m=[],I=[],T=new Y,L,P=0,F=0,H=0;for(;(L=g.exec(d))!==null;){F=H;let W=L[0];for(;(L=v.exec(W))!==null;){let nt=0,at=0,G=L[0];for(;(L=x.exec(G))!==null;)T.x=parseFloat(L[1]),T.y=parseFloat(L[2]),T.z=parseFloat(L[3]),at++;for(;(L=w.exec(G))!==null;)m.push(parseFloat(L[1]),parseFloat(L[2]),parseFloat(L[3])),I.push(T.x,T.y,T.z),nt++,H++;at!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+_),nt!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+_),_++}let E=F,D=H-F;p.addGroup(E,D,P),P++}return p.setAttribute("position",new Ke(m,3)),p.setAttribute("normal",new Ke(I,3)),p}function u(d){return typeof d!="string"?new TextDecoder().decode(d):d}function h(d){if(typeof d=="string"){let p=new Uint8Array(d.length);for(let g=0;g<d.length;g++)p[g]=d.charCodeAt(g)&255;return p.buffer||p}else return d}let f=h(t);return e(f)?r(f):a(u(t))}};var Sh=Ol(yh(),1),M0=Ol(Mh(),1),La=new Sh.Pane;La.registerPlugin(M0);La.addBlade({view:"infodump",content:"STL Talent Show. I built the pulley example here! Drag and drop your own creations...",border:!1,markdown:!1});var Or={file:"pulley.stl"};La.addInput(Or,"file",{options:{pulley:"pulley.stl",cassini:"cassini.stl",odyssey:"odyssey.stl",voyager:"voyager.stl",brain:"brain.stl",heartA:"heartA.stl",heartB:"heartB.stl",heartC:"heartC.stl",scalpula:"scalpula.stl",spine:"spine.stl"}}).on("change",l=>{console.log(l.value),Fr("./models/"+l.value,"app")});function Fr(l,t){var e=document.getElementById(t);document.body.style="margin: 0",e.style="width: 100%; height: 100vh",e.innerHTML="";var i=new De(70,e.clientWidth/e.clientHeight,1,1e3),r=new Ps({antialias:!0,alpha:!0});r.setSize(e.clientWidth,e.clientHeight),e.appendChild(r.domElement),window.addEventListener("resize",function(){r.setSize(e.clientWidth,e.clientHeight),i.aspect=e.clientWidth/e.clientHeight,i.updateProjectionMatrix()},!1);var a=new Dr(i,r.domElement);a.enableDamping=!0,a.rotateSpeed=.05,a.dampingFactor=.1,a.enableZoom=!0,a.autoRotate=!0,a.autoRotateSpeed=.75;var u=new Ar;u.add(new Lr(16777215,1.5)),new Ur().load(l,function(h){var f=new Tr({color:16733491,specular:100,shininess:100}),d=new Ze(h,f);u.add(d);var p=new Y;h.computeBoundingBox(),h.boundingBox.getCenter(p),d.geometry.applyMatrix4(new de().makeTranslation(-p.x,-p.y,-p.z));var g=Math.max(h.boundingBox.max.x,h.boundingBox.max.y,h.boundingBox.max.z);i.position.x=g*4;var v=function(){requestAnimationFrame(v),a.update(),r.render(u,i)};v()})}window.onload=function(){Fr("./models/"+Or.file,"app")};window.addEventListener("dragover",function(l){console.log("Files in dragover zone"),l.preventDefault()});window.addEventListener("drop",function(l){if(l.preventDefault(),l.dataTransfer.items){let t=l.dataTransfer.items[0];if(t.kind==="file"){let e=t.getAsFile();Or.file=e.name,Fr(URL.createObjectURL(e),"app")}}else Or.file=file.name,Fr(URL.createObjectURL(l.dataTransfer.files[0]),"app")});})();
/*! Bundled license information:

tweakpane/dist/tweakpane.js:
  (*! Tweakpane 3.1.9 (c) 2016 cocopon, licensed under the MIT license. *)

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2023 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
