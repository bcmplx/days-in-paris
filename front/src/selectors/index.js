/* eslint-disable import/prefer-default-export */

// date converter from datetimepicker format to scheduler format
export function dateTimePickerConverter(dateToConvert) {
  // mettre en param slected start ou end

  // break down date
  const dd = dateToConvert.slice(8, 10);
  const letterMM = dateToConvert.slice(4, 7);
  let MM = '';
  const yyyy = dateToConvert.slice(11, 15);
  const hh = dateToConvert.slice(16, 18);
  const mm = dateToConvert.slice(19, 21);

  // convert all-letter month into number
  switch (letterMM) {
    case 'Jan':
      MM = '01';
      break;
    case 'Feb':
      MM = '02';
      break;
    case 'Mar':
      MM = '03';
      break;
    case 'Apr':
      MM = '04';
      break;
    case 'May':
      MM = '05';
      break;
    case 'Jun':
      MM = '06';
      break;
    case 'Jul':
      MM = '07';
      break;
    case 'Aug':
      MM = '08';
      break;
    case 'Sep':
      MM = '09';
      break;
    case 'Oct':
      MM = '10';
      break;
    case 'Nov':
      MM = '11';
      break;
    default:
      MM = '12';
  }

  // reorder
  const converted = `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
  return converted;
}
