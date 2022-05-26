const form = document.querySelector("#create-form") as HTMLFormElement;
form.addEventListener("submit", createRobot);

const canTalkCheckbox = document.querySelector("#robot-select-option-2");
canTalkCheckbox.addEventListener("change", onCanTalkCheckboxChange);

const showCreatedButton = document.querySelector("#s-button");
showCreatedButton.addEventListener("click", showCreatedRobotsSection);

const clearRobotsButton = document.querySelector("#t-button");
clearRobotsButton.addEventListener("click", clearStorage);

interface IRobot {
  name: string;
  color: string;
  type: string;
  phrase?: string;
  options: {
    option1: boolean;
    option2: boolean;
    option3: boolean;
  };
  createdDate: number;
}

interface IMessage {
  text: string;
  time: string;
  date: number;
  robotName: string;
  robotColor: string;
}

const jsonRobots = JSON.parse(localStorage.getItem("robots"));
let robots: IRobot[] = <IRobot[]>jsonRobots || [];

let activeIndex = 0;

const jsonMessages = JSON.parse(localStorage.getItem("messages"));
let messages: IMessage[] = <IMessage[]>jsonMessages || [];

if (robots.length) {
  robots.forEach((robot) => createNewRobotSection(robot));
  createButtons();
  robots.length != 1 && enableButtons();
}

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

function createTableRow(robot: IRobot, index: number) {
  const colorBlock = `<div class="table-color" style="background-color:${robot.color};"></div>`;
  return `
<tbody> <tr> <td> <a href="#" onclick="onLinkClicked(${index})"> ${
    robot.name !== "" ? robot.name : ""
  } </a> </td>
<td>${robot.type !== "" ? robot.type : ""}</td>
<td>${robot.color !== "" ? colorBlock : ""}</td>
<td>${optionCheck(robot)}</td> </tr> </tbody>`;
}

function onLinkClicked(index: number) {
  activeIndex = index;
  createNewRobotSection(robots[activeIndex]);
}

function optionCheck(robot: IRobot) {
  let checkedOptions = [];
  robot.options.option1 === true ? checkedOptions.push("can jump") : "";
  robot.options.option2 === true ? checkedOptions.push("can talk") : "";
  robot.options.option3 === true ? checkedOptions.push("can blink") : "";

  return checkedOptions.join(",");
}

function createNewRobotSection(robot: IRobot) {
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

function getMessagesHtml(messages: IMessage[], robot: IRobot) {
  let finalHtml = "";
  messages
    .filter((m) => m.date > robot.createdDate)
    .sort((a, b) => b.date - a.date)
    .forEach((message) => (finalHtml += generateMessageHtml(message)));

  return finalHtml;
}

function generateMessageHtml(message: IMessage) {
  if (message.text != "") {
    return `<div><span class="message-name-style" style="color:${message.robotColor}">${message.robotName}</span> ${message.time}</div>
  <div class="message-text-style">${message.text}</div>`;
  } else {
    return "";
  }
}

function onSendMessageClicked() {
  const robot = robots[activeIndex];
  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  let messageSent = (document.querySelector("#message") as HTMLInputElement)
    .value;
  let newMessage: IMessage = {
    text: messageSent,
    time: time,
    date: Date.now(),
    robotName: robot.name,
    robotColor: robot.color,
  };
  messages.push(newMessage);
  localStorage.setItem("messages", JSON.stringify(messages));
  addNewMessage(newMessage);
  inputReseted();
}

function inputReseted() {
  (document.querySelector("#message") as HTMLInputElement).value = "";
}

function addNewMessage(message: IMessage) {
  let messageHtml = generateMessageHtml(message);
  let messagesSection = document.querySelector("#messagesSection");
  let currentMessagesHtml = messagesSection.innerHTML;
  messagesSection.innerHTML = messageHtml + currentMessagesHtml;
}

function canTalk(talkOptionClicked: boolean, isPhraseEmpty: string) {
  return talkOptionClicked === true && isPhraseEmpty !== "";
}

function onCanTalkCheckboxChange() {
  const checkbox = form.querySelector(
    "#robot-select-option-2"
  ) as HTMLInputElement;
  const textArea = form.querySelector(
    "#robot-comments-textarea"
  ) as HTMLInputElement;
  textArea.disabled = !checkbox.checked;
}

function createRobot(event: FormDataEvent) {
  const textArea = form.querySelector(
    "#robot-comments-textarea"
  ) as HTMLInputElement;
  let error = false;
  const name = form.querySelector("#robot-name-input") as HTMLInputElement;
  const selectType = form.querySelector(
    "#robot-select-type"
  ) as HTMLInputElement;
  const selectColor = form.querySelector(
    "#robot-select-color"
  ) as HTMLInputElement;
  const phrase = form.querySelector(
    "#robot-comments-textarea"
  ) as HTMLInputElement;
  let option1 = (
    form.querySelector("#robot-select-option-1") as HTMLInputElement
  ).checked;
  let option2 = (
    form.querySelector("#robot-select-option-2") as HTMLInputElement
  ).checked;
  let option3 = (
    form.querySelector("#robot-select-option-3") as HTMLInputElement
  ).checked;

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

  if (option2 == true && textArea.value == "") {
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
    localStorage.setItem("robots", JSON.stringify(robots));
    activeIndex = robots.length - 1;
    createNewRobotSection(robot);
    activeIndex == 0 ? createButtons() : enableButtons();
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
  const prevButton: HTMLButtonElement =
    document.querySelector("#previous-button");
  const nextButton: HTMLButtonElement = document.querySelector("#next-button");
  prevButton.disabled = false;
  nextButton.disabled = false;
}

function clearStorage(){
    localStorage.clear();
}