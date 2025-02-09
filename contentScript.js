/*
    Author: Arijit Paria 
    Subscribe @tutoriex on youtube to get more such scripts
    Note:
    This script is free to use, do not pay anyone anything.
    To modify or redistribute, kindly follow the license agreement strictly.
*/

//--------------------//

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.msg == "Sending Data") {
    let ansKey = message.keys;
    console.log(ansKey);
    //time out for 2 secoond
    setTimeout(function () {
      document
        .querySelector(
          `#page-wrapper > p-student > app-learning-test > div.adaptive-question > div > div > div.adaptive-question-box.bg-white.p-1.ng-star-inserted > div:nth-child(2) > mcq-question > div > div.question-answers.mb-0 > div:nth-child(${
            ansKey + 1
          }) > div > div > div > label > span`
        )
        .click();
      const pageWrapper = document.querySelector("#page-wrapper");

      const saveAndNextButton = pageWrapper.querySelector(
        "div.d-block.d-lg-none.fixed-bottom.ng-star-inserted a.btn-primary"
      );

      if (saveAndNextButton) {
        saveAndNextButton.click();
      }
    }, 2000);

    setTimeout(() => {
      const nextbtn = document.querySelector(
        "#page-wrapper > p-student > app-learning-test > div.adaptive-question > div > div > div.d-block.d-lg-none.fixed-bottom.ng-star-inserted>div.no-gutters> div:nth-child(2)> a.btn.btn-primary"
      );
      if (!nextbtn) {
        document
          .querySelector(
            "#page-wrapper > p-student > app-learning-test > div.adaptive-question > div > div > div.d-block.d-lg-none.fixed-bottom.ng-star-inserted>div.no-gutters> div:nth-child(1)> a.btn.btn-primary"
          )
          .click();
      } else {
        nextbtn.click();
      }
    }, 3000);
  }

  if (message.msg == "start") {
    chrome.runtime.sendMessage({ msg: "startPanel" });
  }
});
