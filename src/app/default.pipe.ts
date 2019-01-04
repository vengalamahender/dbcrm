import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'default'
})
export class DefaultPipe implements PipeTransform {

  transform(value: any, fallback?: any): any {
  	let image="";
  	if(value){
  		image=value;
  	}else{
  		image=fallback;
  	}
    return image;
  }

}





