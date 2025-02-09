
/*
    Author: Arijit Paria 
    Subscribe @tutoriex on youtube to get more such scripts
    Note:
    This script is free to use, do not pay anyone anything.
    To modify or redistribute, kindly follow the license agreement strictly.
*/

chrome.devtools.network.onRequestFinished.addListener(function (request) {
  if (
    request.request.url ==
    "https://api-ng2.myperfectice.com/api/v1/learningTest/getQuestion"
  ) {
    request.getContent(function (content, encoding) {
      var myobj = JSON.parse(content);
      console.log(myobj.answers);
      //Finding the correct Answere
      let i = findCorrectAns(myobj.answers);
      if (i != -1) {
        console.log("Correct Answer is: " + i);
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            var activeTab = tabs[0];
            //Sending message to the active tab
            chrome.tabs.sendMessage(activeTab.id, {
              msg: "Sending Data",
              keys: i,
            });
          }
        );
      }
    });
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.msg == "startPanel") {
    console.log("now I will get started in the Panel!");
    chrome.devtools.network.onRequestFinished.addListener(function (request) {
      request.getContent(function (content, encoding) {
        if (isJsonString(content)) {
          var myobj = JSON.parse(content);
          console.log(myobj.question);
          if (myobj.question) {
            let i = findCorrectAns(myobj.question.answers);
            console.log("Correct Answer is: " + i);
            chrome.tabs.query(
              { active: true, currentWindow: true },
              function (tabs) {
                var activeTab = tabs[0];
                //Sending message to the active tab
                chrome.tabs.sendMessage(activeTab.id, {
                  msg: "Sending Data",
                  keys: i,
                });
              }
            );
          }
        }
      });
    });
  }
});

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
function sleep(milliSeconds){
    var startTime = new Date().getTime();                    // get the current time
    while (new Date().getTime() < startTime + milliSeconds); // hog cpu until time's up
}
function findCorrectAns(answers) {
  sleep(11000);
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].isCorrectAnswer) {
      return i;
    }
  }
  return -1;
}
