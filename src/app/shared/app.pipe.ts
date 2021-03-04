import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return `${value.substr(0, limit)}${ellipsis}`;
  }
}
@Pipe({
  name: 'phonePrefixPlus'
})
export class PhonePrefixPlusPipe implements PipeTransform {
  transform(value: string) {
    value = (value) ? value.trim() : value;
    return (value && value.charAt(0) === '+') ? `${value}` : '+' + `${value}`;
  }
}
