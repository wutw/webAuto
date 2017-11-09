
const mixProperties = function(newClass,oldClass){
	for(let key of Reflect.ownKeys(oldClass)){
		if(key != 'prototype' && key !='name' && key !="constructor"){
			let value = Reflect.getOwnPropertyDescriptor(oldClass,key);
			Reflect.defineProperty(newClass,key,value);
		}

	}
};


export default function mix(...mixins){
			class Mix{}
			for(let i of mixins){
				mixProperties(Mix,i);
				mixProperties(Mix.prototype,i.prototype);
			}
			return Mix;
		};

