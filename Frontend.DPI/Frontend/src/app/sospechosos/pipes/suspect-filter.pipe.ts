import { User } from '../../users/interfaces/user';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class SuspectFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    try {
      if (!array[0]){
        return;
    }
    if (query) {
        var data: any[] = [];
        var elemnts= [] = query.split(' ');
        var concatenar:any = "";
            array.forEach(i => {
                let valida:any = [];
                Object.keys(i).forEach(async function(k, v) {
                    concatenar += String(i[k]) + ' ';
                });
                elemnts.forEach(element => {
                    if(concatenar.toUpperCase().indexOf(element.toUpperCase()) > -1){
                      valida.push(true);
                    }
                });
                if(elemnts.length == valida.length){
                  data.push(i);
                }
                concatenar = "";
            });
         return data;
    }
    } catch (error) {

    }
    return array;
  }

}
