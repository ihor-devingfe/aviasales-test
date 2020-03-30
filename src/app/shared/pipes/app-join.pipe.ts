import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'appJoin'
})
export class AppJoinPipe implements PipeTransform {
  transform(array: string[]): string {
    return array.join(', ');
  }
}
