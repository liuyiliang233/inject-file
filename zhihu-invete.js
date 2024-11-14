/**
 * @title 知乎自动邀请
 * @description 刷新页面即可触发
 */
(() => {
  window.onload = () => {
    function log(info) {
      function colorLog(info, title) {
        console.log(
          `%c[${title}]: %c${info}`,
          "color: #2696FF;font-weight: 600",
          "color: #525E66"
        );
      }
      colorLog(info, "知乎问题自动邀请回答");
    }

    const clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("click", true, true);

    let tryNumbers = 0;
    const tryTimer = setInterval(() => {
      const showAllBtn = document.querySelector(".QuestionMainAction");
      tryNumbers += 1;
      log(`尝试第${tryNumbers}次`);
      if (showAllBtn || tryNumbers >= 5) {
        clearInterval(tryTimer);
        if (showAllBtn) showAllBtn.dispatchEvent(clickEvent);
        setTimeout(() => {
          // 延后0.6s，避免数据未加载完
          const allBtn = document.querySelectorAll(
            ".ContentItem-extra .Button--blue"
          );
          allBtn.forEach((i) => i.dispatchEvent(clickEvent));
        }, 600);
      }
    }, 1000);
  };
})();
