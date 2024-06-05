export function getMonthDiff(date1: Date, date2: Date): number {
    const year1 = date1.getFullYear();
    const month1 = date1.getMonth();
    const year2 = date2.getFullYear();
    const month2 = date2.getMonth();
  
    const yearDiff = year2 - year1;
    const monthDiff = month2 - month1;
  
    return yearDiff * 12 + monthDiff;
  }