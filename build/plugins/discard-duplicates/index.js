"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const postcss=require("postcss");class Controller{constructor(e){this.name=e}isPropExist(e,s){return e.some(e=>e.prop===s)}reducer(e,s){return this.isPropExist(e,s.prop)||e.push(s),e}discard(e){return e.nodes=e.nodes.reduceRight((e,s)=>this.reducer(e,s),[]),e}clean(e){e.walkRules(e=>this.discard(e))}export(){return postcss.plugin(this.name,()=>e=>this.clean(e))}}module.exports=new Controller("discard-duplicates").export();