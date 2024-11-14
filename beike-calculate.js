/**
 * @title 贝壳找房计算相应面积及得房率
 */
(() => {
  const logger = (color = "#EE82EE") => {
    /**
     *
     * @param {String} content
     * @param  {...any} others
     */
    return (content, ...others) => {
      if (typeof content === "string") {
        console.log(
          "%c" + content,
          `padding: 10px;background: #000; color: ${color};font-size: 18px;font-weight: 900;`,
          ...others
        );
      } else {
        console.log(content, ...others);
      }
    };
  };
  // 设置log
  log = logger();

  /**
   *
   * @returns [阳台面积,  套内面积, 总面积, 销售面积]
   */
  function getArea() {
    const itemList = [...document.querySelector("#infoList").children];

    if (itemList) {
      const balcony = [];
      const totalArea = [];
      itemList.map((i) => {
        const content = i.innerText;
        const area = Number(content.match(/[\d|\.]+/)) * 1000;
        if (content.includes("阳台")) {
          balcony.push(area);
        } else {
          totalArea.push(area);
        }
      });
      const showArea =
        (document
          .querySelector(".houseInfo .area .mainInfo")
          ?.innerText?.match(/[\d|\.]+/) || 0) * 1000;
      const clacBalcony = balcony.reduce((a, b) => a + b, 0);
      const clacTotalArea = totalArea.reduce((a, b) => a + b, 0);
      return [
        clacBalcony,
        clacTotalArea,
        clacBalcony + clacTotalArea,
        showArea,
      ];
    }
    return [0, 0, 0];
  }

  window.onload = () => {
    console.log("<--页面加载完成-->\n[当前]贝壳自动计算房屋套内面积");

    const [balcony, unBalcony, total, sale] = getArea();

    if (unBalcony) log("== 阳台面积 ==", balcony / 1000);
    log("== 套内面积 ==", unBalcony / 1000);
    log("== 总面积 ==", total / 1000);

    log("== 得房率（不含阳台）==", (unBalcony / sale).toFixed(2));
    log("== 得房率（含阳台）==", (total / sale).toFixed(2));

    // 直接生成一个元素展示数据到页面
    if (unBalcony && total && sale) {
      const messageDiv = document.createElement("div");

      messageDiv.style =
        "padding: 12px;position: fixed;bottom:20px;left:0;background: #000;color: #EE82EE;opacity: 0.6;";
      messageDiv.innerText = `
        [套内面积] ${unBalcony / 1000}m²
        [阳台面积] ${balcony / 1000}m²
        [总面积] ${total / 1000}m²
        [销售面积] ${sale / 1000}m²
        [得房率（不含阳台）] ${(unBalcony / sale).toFixed(2)}%
        [得房率（含阳台）] ${(total / sale).toFixed(2)}%
        `;
      document.body.append(messageDiv);
    }
  };
})();
