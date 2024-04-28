const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
}

/**
 * get current time in format: YYYY-MM-DD-HH-mm-ss
 * @param timestamp - Timestamp
 * @param lang - Language
 * @param dateOptions - Date options
 * @returns - Date string
 */
export function timeTransformer(timestamp = new Date(), lang = 'zh-CN', dateOptions = options) {
  return new Date(timestamp).toLocaleString(lang, dateOptions).replaceAll(/(\/|\:|)/g, '').replace(/\s/, '-')
}
