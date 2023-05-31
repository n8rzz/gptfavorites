function renderQuestionsList(questionsList) {
  const questionsElement = document.getElementsByClassName('questions')[0];

  questionsList.forEach((question) => {
    const element = document.createElement('li');

    element.classList.add('questions-item')
    element.textContent = question.text;
    element.setAttribute('data-offsetHeight', `${element.offsetTop}`);

    questionsElement.appendChild(element);
  });
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {type: "questionsList"}, function(questionsList) {
      if (typeof questionsList == "undefined") {
        if (chrome.runtime.lastError) {
          console.error('There was an issue', chrome.runtime.lastError);
        }

        return;
      }

    console.log('$$$ questionsList', questionsList);

      renderQuestionsList(questionsList);
  });
});
