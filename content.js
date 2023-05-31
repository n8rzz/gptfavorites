console.log('+++')

function init() {
  const m = document.getElementsByTagName('main')[0]
  const groups = m.getElementsByClassName('group')
  const questionTextList = Array.from(groups).filter((item, index) => index % 2 === 0).map((item) => {
    const questionElement = item.getElementsByClassName('break-words')[0];

    return {
      scrollTop: questionElement.offsetTop,
      text: questionElement.textContent
    };
  });

  chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
      switch (message.type) {
        case "questionsList":
          sendResponse(questionTextList);
          break;
        default:
          console.error("Unrecognised message: ", message);
      }
    }
  );
}

(() => {
  setInterval(init, 5000);
})()
