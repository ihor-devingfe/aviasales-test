import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'appDuration'
})
export class AppDurationPipe implements PipeTransform {

  transform(minutes: number): string {
    if (minutes >= 60) {
      const hours = Math.trunc(minutes / 60);
      const min = minutes - hours * 60;

      if (min) {
        return `${hours}ч ${min}мин`;
      }

      return `${hours}ч`;
    }

    if (minutes) {
      return `${minutes}мин`;
    }
  }

}
