/**
 * 控制台打印增强
 * 
 */
const logger = (color = '#bada55') => {
  /**
   * 
   * @param {String} content 
   * @param  {...any} others 
   */
  return (content, ...others) => {
    if (typeof content === 'string') {
      console.log('%c' + content, `background: #222; color: ${color};`, ...others)
    }else {
      console.log(content, ...others)
    }
  }
}

export default logger;