import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(items: User[], searchText: string): any {
    if(searchText!=''){
      console.log(items.filter(user=>user.username == searchText));

      return  items.filter(user=>user.username == searchText);
    }
    else
      return items;
  }

}
