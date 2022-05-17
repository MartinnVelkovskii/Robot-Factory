const form = document.querySelector("#create-form");
form.addEventListener("submit", createRobot);

let sendBtn = document.querySelector("#send-message");

let robots = [];
let activeIndex = 0;
let messages = [];

function showCreatedRobotsSection() {
  if (robots.length > 0) {
    let innerHTML = `
    <div class="robots-found-style">${robots.length} robots found</div>  
  <table class="styled-table">
  <thead>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Color</th>
    <th>Options</th>
  </tr>
  </thead>
`;
    robots.forEach((robot, index) => {
      innerHTML += createTableRow(robot, index);
    });
    innerHTML += "</table>";
    document.querySelector("#e-section").innerHTML = innerHTML;
  } else {
    document.querySelector("#e-section").innerHTML = `No robots created yet`;
  }
}

function createTableRow(robot, index) {
  const colorBlock = `<div class="table-color" style="background-color:${robot.color};"></div>`;
  console.log(index);
  return `
<tbody> <tr> <td> <a href="#" onclick="onLinkClicked(${index})"> ${
    robot.name !== "" ? robot.name : ""
  } </a> </td>
<td>${robot.type !== "" ? robot.type : ""}</td>
<td>${robot.color !== "" ? colorBlock : ""}</td>
<td>${optionCheck(robot)}</td> </tr> </tbody>`;
}

function onLinkClicked(index) {
  activeIndex = index;
  createNewRobotSection(robots[activeIndex]);
}

function optionCheck(robot) {
  let checkedOptions = [];
  robot.options.option1 === true ? checkedOptions.push("can jump") : "";
  robot.options.option2 === true ? checkedOptions.push("can talk") : "";
  robot.options.option3 === true ? checkedOptions.push("can blink") : "";

  return checkedOptions.join(",");
}

function createNewRobotSection(robot) {
  document.querySelector("#robot-slide").innerHTML = ` 
    <section id="slide-1" class="factory-section">
      <div class="robot-title-box">
        <div class="robot-title-heading">
          <h2>${robot.type} Robot</h2>
        </div>
        <div class="triangle">
          <div class="triangle-empty"></div>
        </div>
      </div>
      <div class="content-wrapper">
        <div class="left-side">   
            <div class="robot">
              <div class="robot-head">
              <div class="${
                canTalk(robot.options.option2, robot.phrase)
                  ? "speech bubble bubble-position"
                  : "d-none"
              }">
              ${robot.phrase} </div>
                <div class="left-eye"></div>
                <div class="right-eye ${
                  robot.options.option3 === true ? "blink" : ""
                }"></div>
                <div class="mouth ${
                  canTalk(robot.options.option2, robot.phrase) ? "talk" : ""
                }"></div>
              </div>
              <div class="md-parts">
                <div class="arms arm1"></div>
                <div style="color:${robot.color}" class="${
    robot.type === "Male" ? "male-robot-body" : "female-robot-body"
  }"></div>
                <div class="arms arm2"></div>
              </div>
              <div class="down-parts">
                <div class="legs leg1 ${
                  robot.options.option1 === true ? "jump" : ""
                }"></div>
                <div class="legs leg2 ${
                  robot.options.option1 === true ? "jump" : ""
                }"></div>
              </div>
            </div>
            <div class="robot-name">${robot.name}</div>
          </div>
        <div class="right-side">
        <div class="message-label"> <label for="message">Send message:</label>
        <input class="message-input-style" type="text" id="message"> </div>
        <div class="message-send-button-container"><button id="send-message" onclick="onSendMessageClicked()" class="message-send-button">Send</button></div>
        <div class="last-message-text-style"> <div class="hr-style"> <hr> </div><div class="last-messages-style">Last Messages </div> <div class="hr-style"><hr> </div> </div>
        <div class="message-section" id="messagesSection">
        ${getMessagesHtml(messages, robot)}
        </div>
        </div>
      </div>
    </section>
    `;
}

function getMessagesHtml(messages, robot) {
  let finalHtml = "";
  filteredMessages = messages
    .filter((m) => m.date > robot.createdDate)
    .sort((a, b) => b.date - a.date)
    .forEach((message) => (finalHtml += generateMessageHtml(message)));

  return finalHtml;
}

function generateMessageHtml(message) {
  if(message.text != ""){return `<div><span class="message-name-style" style="color:${message.robotColor}">${message.robotName}</span> ${message.time}</div>
  <div class="message-text-style">${message.text}</div>`}
  else{
    return ""
  };
}

function onSendMessageClicked() {
  const robot = robots[activeIndex];
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  let messageSent = document.querySelector("#message").value;
  let newMessage = {
    text: messageSent,
    time: time,
    date: Date.now(),
    robotName: robot.name,
    robotColor: robot.color,
  };
  messages.push(newMessage);
  addNewMessage(newMessage);
  inputReseted();
}

function inputReseted(){
  document.querySelector("#message").value = ""
  }

function addNewMessage(message) {
  let messageHtml = generateMessageHtml(message);
  let messagesSection = document.querySelector("#messagesSection");
  let currentMessagesHtml = messagesSection.innerHTML;
  messagesSection.innerHTML = messageHtml + currentMessagesHtml;
}

function canTalk(talkOptionClicked, isPhraseEmpty) {
  return talkOptionClicked === true && isPhraseEmpty !== "";
}

function onCanTalkCheckboxChange() {
  const checkbox = form.querySelector("#robot-select-option-2");
  const textArea = form.querySelector("#robot-comments-textarea");
  textArea.disabled = !checkbox.checked;
}

function createRobot(event) {
  const textArea = form.querySelector("#robot-comments-textarea");
  let error = false;
  const name = form.querySelector("#robot-name-input");
  const selectType = form.querySelector("#robot-select-type");
  const selectColor = form.querySelector("#robot-select-color");
  const phrase = form.querySelector("#robot-comments-textarea");
  let option1 = form.querySelector("#robot-select-option-1").checked;
  let option2 = form.querySelector("#robot-select-option-2").checked;
  let option3 = form.querySelector("#robot-select-option-3").checked;

  if (!name.value || name.value == "") {
    form.querySelector("#robot-name-validation").textContent =
      "*This field is required!";
    error = true;
  } else {
    form.querySelector("#robot-name-validation").textContent = "";
  }

  if (!selectType.value || selectType.value == "") {
    form.querySelector("#robot-type-validation").textContent =
      "*This field is required!";
    error = true;
  } else {
    form.querySelector("#robot-type-validation").textContent = "";
  }

  if (!selectColor.value || selectColor.value == "") {
    form.querySelector("#robot-color-validation").textContent =
      "*This field is required!";
    error = true;
  } else {
    form.querySelector("#robot-color-validation").textContent = "";
  }

  if (option2 == true & textArea.value == "") {
    form.querySelector("#robot-phrase-validation").textContent =
      "*This field is required!";
    error = true;
  } else {
    form.querySelector("#robot-type-validation").textContent = "";
  }

  if (!error) {
    let robot = {
      name: name.value,
      color: selectColor.value,
      type: selectType.value,
      phrase: phrase.value,
      options: {
        option1,
        option2,
        option3,
      },
      createdDate: Date.now(),
    };
    robots.push(robot);
    activeIndex = robots.length - 1;
    createNewRobotSection(robot);
    activeIndex == 0 ? createButtons() : enableButtons();
    console.log(robots);
  }

  event.preventDefault();
  form.reset();
}

function createButtons() {
  document.querySelector(
    "#robot-section"
  ).innerHTML += `<div class = "buttons-holder"> <button id="previous-button" class="" onclick="onPreviousClicked()" disabled> < Previous</button>
  <button id="next-button" class="" onclick="onNextClicked()" disabled>Next ></button> </div>`;
}

function onPreviousClicked() {
  if (activeIndex - 1 < 0) {
    activeIndex = robots.length;
  }
  activeIndex--;
  createNewRobotSection(robots[activeIndex]);
}

function onNextClicked() {
  if (activeIndex + 1 > robots.length - 1) {
    activeIndex = -1;
  }
  activeIndex++;
  createNewRobotSection(robots[activeIndex]);
}

function enableButtons() {
  document.querySelector("#previous-button").disabled = false;
  document.querySelector("#next-button").disabled = false;
}