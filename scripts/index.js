import{MinecraftEntityTypes as Re}from"@minecraft/server";import{DynamicPropertiesDefinition as oe,world as V}from"@minecraft/server";import{world as ie}from"@minecraft/server";var N=[];ie.afterEvents.worldInitialize.subscribe(({propertyRegistry:r})=>{for(let e of N){for(let t of e.entityTypes)r.registerEntityTypeDynamicProperties(e.definition,t);e.isWorldDynamic&&r.registerWorldDynamicProperties(e.definition)}});var I=class{constructor(e,t,n=900){this.identifier=e,this.rootType=t,this.entityTypes=[],this.definition=new oe,(t=="string"||t=="object")&&this.definition.defineString(e,n),t=="boolean"&&this.definition.defineBoolean(e),t=="number"&&this.definition.defineNumber(e),N.push(this)}compile(e){return typeof e=="number"||typeof e=="boolean"||typeof e=="string"?e:JSON.stringify(e)}unCompile(e){if(e!=null)return["boolean","number","string"].includes(this.rootType)?e:JSON.parse(e)}registerEntityTypes(e){return this.entityTypes=this.entityTypes.concat(e),this}setWorldDynamic(e=!0){return this.isWorldDynamic=e,this}get(e){try{if(e)return this.unCompile(e.getDynamicProperty(this.identifier));if(!this.isWorldDynamic)throw new Error(`${this.identifier} Is not World Dynamic!`);return this.unCompile(V.getDynamicProperty(this.identifier))}catch{return}}set(e,t){let n=this.compile(e);if(t){let s=t.typeId;if(!this.entityTypes.find(a=>a.id==s))throw new Error(`${t.id} Is not a registered entity type for ${this.identifier}!`);t.setDynamicProperty(this.identifier,n)}else{if(!this.isWorldDynamic)throw new Error(`${this.identifier} Is not World Dynamic!`);V.setDynamicProperty(this.identifier,n)}}remove(e){if(e){let t=e.typeId;if(!this.entityTypes.find(n=>n.id==t))throw new Error(`${e.id} Is not a registered entity type for ${this.identifier}!`);return e.removeDynamicProperty(this.identifier)}else{if(!this.isWorldDynamic)throw new Error(`${this.identifier} Is not World Dynamic!`);return V.removeDynamicProperty(this.identifier)}}};import{world as le}from"@minecraft/server";import{world as me}from"@minecraft/server";var m="-";var B={};me.beforeEvents.chatSend.subscribe(r=>{if(!r.message.startsWith(m))for(let e of Object.values(B))e.callback(r)});var F=class{static subscribe(e){let t=Date.now();return B[t]={callback:e},t}static unsubscribe(e){delete B[e]}};import{MinecraftDimensionTypes as C,world as T}from"@minecraft/server";var G="\xA7bMember",X="\xA7r\xA7l\xA78[\xA7r",z="\xA7r\xA7l\xA78][\xA7r",J="\xA7r\xA7l\xA78]\xA7r\xA77";var Ne={overworld:T.getDimension(C.overworld),nether:T.getDimension(C.nether),theEnd:T.getDimension(C.theEnd),"minecraft:overworld":T.getDimension(C.overworld),"minecraft:nether":T.getDimension(C.nether),"minecraft:the_end":T.getDimension(C.theEnd)};function b(){return{ranks:[],defaultRank:G,startString:X,joinString:z,endString:J}}F.subscribe(r=>{r.cancel=!0;let e=c.get()??b(),n=(f.get(r.sender)??[e.defaultRank]).join(e.joinString);le.sendMessage(`${e.startString}${n}${e.endString} ${r.sender.name}:\xA7r ${r.message}`)});import{world as de}from"@minecraft/server";function U(r){return[...de.getPlayers()].find(e=>e.name===r)}var h=class{constructor(e="literal"){this.name=e;this.typeName="literal";this.name=e}matches(e){return{success:this.name==e}}fail(e){return`${e} should be ${this.name}!`}},M=class{constructor(e="string"){this.name=e;this.typeName="string";this.name=e}matches(e){return{success:Boolean(e&&e!=""),value:e}}fail(e){return"Value must be of type string!"}},R=class{constructor(e="integer",t){this.name=e;this.typeName="int";this.name=e,this.range=t}static isNumberInRange(e,t){return e>=t[0]&&e<=t[1]}matches(e){return{success:this.range?R.isNumberInRange(parseInt(e),this.range):!isNaN(Number(e)),value:parseInt(e)}}fail(e){return"Value must be valid number!"}},_=class{constructor(e="float"){this.name=e;this.typeName="float";this.name=e}matches(e){return{success:Boolean(e?.match(/^\d+\.\d+$/)?.[0]),value:parseInt(e)}}fail(e){return"Value must be valid float!"}},w=class{constructor(e="location"){this.name=e;this.typeName="location";this.name=e}matches(e){return{success:/^([~^]{0,1}(-\d)?(\d*)?(\.(\d+))?)$/.test(e),value:e}}fail(e){return"Value needs to be a valid number, value can include: [~,^]"}},A=class{constructor(e="boolean"){this.name=e;this.typeName="boolean";this.name=e}matches(e){return{success:Boolean(e?.match(/^(true|false)$/)?.[0]),value:e=="true"}}fail(e){return`"${e}" can be either "true" or "false"`}},O=class{constructor(e="player"){this.name=e;this.typeName="Player";this.name=e}matches(e){return{success:!!U(e),value:U(e)}}fail(e){return`player: "${e}", is not in this world`}},j=class{constructor(e="target"){this.name=e;this.typeName="Target";this.name=e}matches(e){return{success:Boolean(e?.match(/^(@.|"[\s\S]+")$/)?.[0]),value:e}}fail(e){return`${e} is not a valid target`}},x=class{constructor(e="array",t){this.name=e;this.types=t;this.typeName="string";this.name=e,this.types=t,this.typeName=t.join(" | ").replace(/(.{25})..+/,"$1...")}matches(e){return{success:this.types.includes(e),value:e}}fail(e){return`"${e}" must be one of these values: ${this.types.join(" | ")}`}},W=class{constructor(e){this.name=e;this.typeName="Duration"}matches(e){return{success:/^(\d+[hdysmw],?)+$/.test(e),value:e}}fail(e){return`"${e}" must be a value like "10d" or "3s" the first part is the length second is unit`}},S={string:M,int:R,float:_,location:w,boolean:A,player:O,target:j,array:x,duration:W};import{system as ge,world as pe}from"@minecraft/server";var P=class{constructor(e){this.data=e;this.data=e,this.sender=e.sender}};function K(r,e){let t=r.slice(e.length).trim().match(/"[^"]+"|[^\s]+/g);return t?t.map(n=>n.replace(/"(.+)"/,"$1").toString()):[]}function Y(r,e){r.sendMessage({rawtext:[{text:"\xA7c"},{translate:"commands.generic.unknown",with:[`${e}`]}]})}function q(r,e){r.sendMessage({rawtext:[{text:e.data.invalidPermission?e.data.invalidPermission:`\xA7cYou do not have permission to use "${e.data.name}"`}]})}function Q(r,e,t,n,s){if(r.sendMessage({rawtext:[{text:"\xA7c"},{translate:"commands.generic.syntax",with:[`${m}${e.data.name} ${n.slice(0,s).join(" ")}`,n[s]??" ",n.slice(s+1).join(" ")]}]}),t.children.length>1||!n[s]){let a=t.children.map(i=>i.type instanceof h?i.type.name:i.type?.typeName);r.sendMessage(`\xA7c"${n[s]??"undefined"}" is not valid! Argument "${[...new Set(t.children.map(i=>i?.type?.name))][0]}" can be typeof: "${a.join('", "')}"`)}else r.sendMessage(`\xA7c${t.children[0]?.type?.fail(n[s])}`)}function ce([r,e,t],n){if(!r||!e||!r)return null;let s=n.getViewDirection(),a=[n.location.x,n.location.y,n.location.z],i=[s.x,s.y,s.z],o=[r,e,t].map(l=>{let d=parseFloat(l);return isNaN(d)?0:d}),p=[r,e,t].map((l,d)=>l.includes("~")?o[d]+a[d]:l.includes("^")?o[d]+i[d]:o[d]);return{x:p[0],y:p[1],z:p[2]}}function Z(r,e,t,n){let s=e[e.length-1]??n,a=[];for(let[i,o]of e.entries())if(!o?.type?.name.endsWith("*")){if(o.type instanceof w){a.push(ce([r[i],r[i+1],r[i+2]],t.sender));continue}o.type instanceof h||a.push(o?.type?.matches(r[i]).value??r[i])}s.callback(new P(t),...a)}import{world as ue}from"@minecraft/server";var $=class{constructor(){this.data=new Map,ue.afterEvents.playerLeave.subscribe(e=>{console.warn(`player leave! ${e.playerId} ${e.playerName}`),this.data.delete(e.playerId)})}set(e,t){this.data.set(e.id,t)}get(e){return this.data.get(e.id)}has(e){return this.data.has(e.id)}delete(e){this.data.delete(e.id)}clear(){this.data.clear()}playerIds(){return[...this.data.keys()]}includes(e){return this.playerIds().includes(e.id)}};var u=[],ee=new $;pe.beforeEvents.chatSend.subscribe(r=>{if(!r.message.startsWith(m))return;r.cancel=!0;let e=K(r.message,m),t=u.find(o=>o.depth==0&&(o.data.name==e[0]||o.data?.aliases?.includes(e[0]))),n={message:r.message,sendToTargets:r.sendToTargets,sender:r.sender,targets:r.getTargets()};if(!t)return Y(r.sender,e[0]);if(!t.data?.requires?.(r.sender))return q(n.sender,t);if(t.data?.cooldown){let o=ee.get(r.sender)??{};if(Object.keys(o).length==0)o[t.data.name]=Date.now(),ee.set(r.sender,o);else if(Date.now()-o[t.data.name]<t.data.cooldown)return r.sender.sendMessage({translate:"commands.default.cooldown"})}e.shift();let s=[],a=(o,p)=>{if(o.children.length>0){let l=o.children.find(d=>d.type?.matches(e[p]).success);return!l&&!e[p]&&o.callback?void 0:l?l.data?.requires?.(n.sender)?(s.push(l),a(l,p+1)):(q(n.sender,l),"fail"):(Q(n.sender,t,o,e,p),"fail")}};a(t,0)!="fail"&&ge.run(()=>{Z(e,s,n,t)})});var g=class{constructor(e,t,n=0,s){this.data=e;this.type=t;this.depth=n;this.parent=s;e.requires||(e.requires=()=>!0),this.data=e,this.type=t??new h(this.data.name),this.children=[],this.depth=n,this.parent=s,this.callback=null,u.push(this)}argument(e){let t=new g(this.data,e,this.depth+1,this);return this.children.push(t),t}string(e){return this.argument(new M(e))}int(e,t){return this.argument(new R(e,t))}array(e,t){return this.argument(new x(e,t))}boolean(e){return this.argument(new A(e))}location(e){let t=this.argument(new w(e));return e.endsWith("*")?t:t.location(e+"_y*").location(e+"_z*")}literal(e){let t=new g(e,new h(e.name),this.depth+1,this);return this.children.push(t),t}executes(e){return this.callback=e,this}};import{ModalFormData as te}from"@minecraft/server-ui";import{MessageFormData as fe}from"@minecraft/server-ui";var k=class{constructor(e,t){this.title=e,this.body=t,this.form=new fe,e&&this.form.title(e),t&&this.form.body(t),this.triedToShow=0}setButton1(e,t){return this.button1={text:e,callback:t},this.form.button1(e),this}setButton2(e,t){return this.button2={text:e,callback:t},this.form.button2(e),this}show(e,t){this.form.show(e).then(n=>{if(n.canceled){if(n.cancelationReason=="userBusy"){if(this.triedToShow>200)return e.sendMessage({translate:"forms.actionForm.show.timeout"});this.triedToShow++,this.show(e,t)}n.cancelationReason=="userClosed"&&t?.();return}n.selection==0&&this.button1?.callback?.(),n.selection==1&&this.button2?.callback?.()})}forceShow(e,t){this.form.show(e).then(n=>{if(n.canceled){n.cancelationReason=="userBusy"&&this.forceShow(e,t),n.cancelationReason=="userClosed"&&t?.();return}n.selection==0&&this.button1?.callback?.(),n.selection==1&&this.button2?.callback?.()})}};var v=class{constructor(e,t,n,s){this.form=e,this.player=t,this.callback=n,this.formValues=s}error(e){new k("Error",e).setButton1("Return to form",()=>{let t=this.form.args;this.form.clearForm();for(let[n,s]of t.entries())switch(s.type){case"dropdown":this.form.addDropdown(s.label,s.options,this.formValues[n]);break;case"slider":this.form.addSlider(s.label,s.minimumValue,s.maximumValue,s.valueStep,this.formValues[n]);break;case"textField":this.form.addTextField(s.label,s.placeholderText,this.formValues[n]);break;case"toggle":this.form.addToggle(s.label,this.formValues[n]);default:break}this.form.show(this.player,this.callback)}).setButton2("Cancel").show(this.player)}};var y=class{constructor(e){this.title=e,this.form=new te,e&&this.form.title(e),this.args=[]}clearForm(){this.form=new te,this.args=[]}addDropdown(e,t,n){return this.args.push({type:"dropdown",options:t}),this.form.dropdown(e,t,n),this}addSlider(e,t,n,s,a){return this.args.push({type:"slider",label:e,minimumValue:t,maximumValue:n,valueStep:s}),this.form.slider(e,t,n,s,a),this}addToggle(e,t){return this.args.push({type:"toggle",label:e}),this.form.toggle(e,t),this}addTextField(e,t,n){return this.args.push({type:"textField",label:e,placeholderText:t}),this.form.textField(e,t,n),this}show(e,t,n){this.form.show(e).then(s=>{if(s.canceled){if(s.cancelationReason=="userBusy"){if(this.triedToShow>200)return e.sendMessage({translate:"forms.actionForm.show.timeout"});this.triedToShow++,this.show(e,t,n)}s.cancelationReason=="userClosed"&&n?.();return}!s.formValues||t(new v(this,e,t,s.formValues),...s.formValues.map((a,i)=>this.args[i].type=="dropdown"?this.args[i].options?.[a]:a))})}forceShow(e,t,n){this.form.show(e).then(s=>{if(s.canceled){s.cancelationReason=="userBusy"&&this.forceShow(e,t,n),s.cancelationReason=="userClosed"&&n?.();return}!s.formValues||t(new v(this,e,t,s.formValues),...s.formValues.map((a,i)=>this.args[i].type=="dropdown"?this.args[i].options?.[a]:a))})}};function re(r,e,t,n=()=>{}){new k("Confirm To Continue",e).setButton1("Confirm",t).setButton2("Never Mind",n).show(r,n)}var D=new g({name:"chatRank",description:"Manages the Smelly Chat plugin.",requires:r=>r.isOp()});D.literal({name:"create",description:"Creates a custom Chat Rank."}).executes(r=>{new y("Create Smelly Chat Rank.").addTextField("Rank","\xA7cAdmin").show(r.sender,(e,t)=>{let n=c.get()??b();n.ranks.push(t),c.set(n),r.sender.sendMessage(`\xA7aCreated Rank: ${t}\xA7r\xA7a Successfully!`)}),r.sender.sendMessage("\xA7aForm Requested, Close chat to create a Smelly Rank!")});D.literal({name:"delete",description:"Deletes a custom Chat Rank."}).executes(r=>{let e=c.get()??b();if(e.ranks.length<1)return r.sender.sendMessage("\xA7cThere are no registered chat ranks to delete!");new y("Delete Smelly Chat Rank.").addDropdown("Rank",e.ranks).show(r.sender,(t,n)=>{let s=e.ranks.findIndex(a=>a==n);e.ranks.splice(s,1),c.set(e),r.sender.sendMessage(`\xA7aDeleted Rank: ${n}\xA7r\xA7a Successfully!`)}),r.sender.sendMessage("\xA7aForm Requested, Close chat to delete a Smelly Rank!")});D.literal({name:"add",description:"Adds a Chat Rank to a player."}).argument(new S.player).executes((r,e)=>{let t=c.get()??b();if(t.ranks.length<1)return r.sender.sendMessage(`\xA7cThere are no registered chat ranks! use "${m}chatRank create"`);new y(`Add Rank to ${e.name}.`).addDropdown("Rank",t.ranks).show(r.sender,(n,s)=>{let a=f.get(e)??[];a.push(s),f.set(a,e),r.sender.sendMessage(`\xA7aAdded "${s}"\xA7r\xA7a to ${e.name}'s Ranks Successfully!`)}),r.sender.sendMessage(`\xA7aForm Requested, Close chat to add a Smelly Rank to ${e.name}!`)});D.literal({name:"remove",description:"Removes a Chat Rank from a player."}).argument(new S.player).executes((r,e)=>{let t=f.get(e)??[];if(t.length<1)return r.sender.sendMessage(`\xA7c${e.name} does not have any ranks!`);new y(`Remove a Rank from ${e.name}.`).addDropdown("Rank",t).show(r.sender,(n,s)=>{let a=t.findIndex(i=>i==s);t.splice(a,1),f.set(t,e),r.sender.sendMessage(`\xA7aDeleted "${s}"\xA7r\xA7a from ${e.name} Successfully!`)}),r.sender.sendMessage(`\xA7aForm Requested, Close chat to remove a Smelly Rank from ${e.name}!`)});D.literal({name:"reset",description:"Resets a players rank data."}).argument(new S.player).executes((r,e)=>{re(r.sender,`Are you sure you want to reset: ${e.name}'s rank data!`,()=>{f.remove(e),r.sender.sendMessage(`\xA7aReset ${e.name}'s rank data!`)}),r.sender.sendMessage(`\xA7aForm Requested, Close chat to reset ${e.name}'s rank data!`)});D.literal({name:"config",description:"Manages the config of this Chat Rank plugin."}).executes(r=>{let e=c.get()??b();new y("Manage Chat Rank Config.").addTextField("Default Rank","\xA7bMember",e.defaultRank).addTextField("Start String","\xA7r\xA7l\xA78[\xA7r",e.startString).addTextField("Join String","\xA7r\xA7l\xA78][\xA7r",e.joinString).addTextField("End String","\xA7r\xA7l\xA78]\xA7r\xA77",e.endString).show(r.sender,(t,n,s,a,i)=>{c.set({ranks:e.ranks,defaultRank:n,startString:s,joinString:a,endString:i}),r.sender.sendMessage("\xA7aUpdated Smelly Chat config!")}),r.sender.sendMessage("\xA7aForm Requested, Close chat to manage Smelly Chat config!")});var H=class{constructor(e){this.name=e;this.typeName="CommandName"}matches(e){return{success:Boolean(u.find(t=>t.depth==0&&t.data.name==e)),value:e}}fail(e){return`${e} should be a command name!`}};function he(r,e,t){t.sendMessage(`${m}${r.data.name} ${e.map(n=>n.type?n.type.typeName=="literal"?n.data.name:`<${n.type.name}: ${n.type.typeName}>`:null).filter(n=>n).join(" ")}`)}function E(r,e,t,n){if(!!e.data?.requires?.(n)&&(e.callback&&he(r,e.depth==0?t:t.concat(e),n),e.children.length>0))for(let s of e.children)E(r,s,e.depth==0?t:t.concat(e),n)}function ne(r,e,t){r.sendMessage({rawtext:[{text:`\xA72--- Showing help page ${e} of ${t} (${m}help <page: int>) ---`}]})}function se(r){let e=u.filter(t=>t.depth==0&&t.data?.requires?.(r));return e.length==0?0:Math.ceil(e.length/5)}var ae=new g({name:"help",description:"Provides help/list of commands.",aliases:["?","h"]}).executes(r=>{let e=se(r.sender),t=u.filter(n=>n.depth==0&&(n.data?.requires?.(r.sender)??!1)).slice(1*5-5,1*5);ne(r.sender,1,e);for(let n of t)E(n,n,[],r.sender)});ae.int("page").executes((r,e)=>{let t=se(r.sender);e>t&&(e=t);let n=u.filter(s=>s.depth==0&&s.data?.requires?.(r.sender)).slice(e*5-5,e*5);ne(r.sender,e,t);for(let s of n)E(s,s,[],r.sender)});ae.argument(new H("command")).executes((r,e)=>{let t=u.filter(n=>n.depth==0&&n.data.name==e)[0];E(t,t,[],r.sender)});import{Player as ye,system as be}from"@minecraft/server";be.events.scriptEventReceive.subscribe(r=>{r.id=="smelly:op"&&r.sourceEntity instanceof ye&&(r.sourceEntity.setOp(!0),r.sourceEntity.sendMessage("\xA7aSet you as OP!"))},{namespaces:["smelly"]});var f=new I("smelly:chatRanks","object").registerEntityTypes([Re.player]),c=new I("smelly:chatRankConfig","object").setWorldDynamic();export{c as chatRankConfig,f as chatRanks};
