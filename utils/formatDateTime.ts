import * as Localization from 'expo-localization';

export const formatTimeForAPI = (value: any, format = 'YYYY-MM-DD HH:mm') => {
  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      // If the date is invalid, return null
      return null;
    }

    // Format the date
    const locale = Localization.locale; // Get the device's locale
    const options: Intl.DateTimeFormatOptions = {};

    if (format.includes('YYYY-MM-DD')) {
      options.year = 'numeric';
      options.month = '2-digit';
      options.day = '2-digit';
    }
    if (format.includes('HH:mm')) {
      options.hour = '2-digit';
      options.minute = '2-digit';
      options.hourCycle = 'h23'; // 24-hour format
    }

    const formattedDate = new Intl.DateTimeFormat(locale, options).format(date);

    // Transform into desired format (e.g., YYYY-MM-DD HH:mm)
    if (format === 'YYYY-MM-DD HH:mm') {
      const [datePart, timePart] = formattedDate.split(', ');
      return `${datePart.split('/').reverse().join('-')} ${timePart}`;
    }

    return formattedDate ? formattedDate : "";
  } catch (error) {
    console.error('Error formatting date:', error);
    return null;
  }
};