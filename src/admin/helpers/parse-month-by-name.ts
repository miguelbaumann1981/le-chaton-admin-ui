export const parseMonthByName = (monthNumber: string): string => {
  switch (monthNumber) {
    case '01':
      return 'monthsAbbreviated.January';
    case '02':
      return 'monthsAbbreviated.February';
    case '03':
      return 'monthsAbbreviated.March';
    case '04':
      return 'monthsAbbreviated.April';
    case '05':
      return 'monthsAbbreviated.May';
    case '06':
      return 'monthsAbbreviated.June';
    case '07':
      return 'monthsAbbreviated.July';
    case '08':
      return 'monthsAbbreviated.August';
    case '09':
      return 'monthsAbbreviated.September';
    case '10':
      return 'monthsAbbreviated.October';
    case '11':
      return 'monthsAbbreviated.November';
    case '12':
      return 'monthsAbbreviated.December';
  }
  return '';
};
