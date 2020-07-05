


document.addEventListener("DOMContentLoaded", (e) => {
  const removeEl = el => {
    el.innerHTML = '';
    el.partentNode.removeChild(el)
  };

  removeEl(document.getElementsByClassName('highcharts-credits')[0]);
  removeEl(document.getElementsByClassName('highcharts-a11y-proxy-button')[0]);
})


