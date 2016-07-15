import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'convertSeconds'})
export class ConvertSecondsPipe implements PipeTransform {

  transform(value: number): string {

      if (value >= 3600) {
         return moment().startOf('day')
                .seconds(value)
                .format('H:mm:ss');
      }
      else
          return moment().startOf('year').seconds(value).format('mm:ss');

  }
}