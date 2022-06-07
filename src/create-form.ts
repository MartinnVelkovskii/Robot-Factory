import Robot from "./Robot";
import Message from "./Message";
import ChatManager from "./ChatManager";

//#region global variables
const form = document.querySelector<HTMLFormElement>("#create-form");
form.addEventListener("submit", createRobot);

const canTalkCheckbox = document.querySelector("#robot-select-option-2");
canTalkCheckbox.addEventListener("change", onCanTalkCheckboxChange);

const showCreatedButton = document.querySelector("#s-button");
showCreatedButton.addEventListener("click", showCreatedRobotsSection);

const clearRobotsButton = document.querySelector("#t-button");
clearRobotsButton.addEventListener("click", clearStorage);

enum RobotType {
  male = "Male",
  female = "Female",
}

const jsonRobots: any = JSON.parse(localStorage.getItem("robots"));
let robots: Robot[] = <Robot[]>jsonRobots || [];

let activeIndex: number = 0;

let chatManager: ChatManager = new ChatManager(
  ChatManager.getLocalStorageMessages()
);
//#endregion

//#region Robot Section
if (robots.length) {
  robots.forEach((robot) => createNewRobotSection(robot));
  createButtons();
  robots.length != 1 && enableButtons();
}

function showCreatedRobotsSection(): void {
  if (robots.length > 0) {
    let innerHTML: string = `
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
    robots.forEach((robot, index) => {
      const linkClick = document.querySelector(`#link${index}`);
      linkClick.addEventListener("click", () => onLinkClicked(index));
    });
  } else {
    document.querySelector("#e-section").innerHTML = `No robots created yet`;
  }
}

function createTableRow(robot: Robot, index: number): string {
  const colorBlock: string = `<div class="table-color" style="background-color:${robot.color};"></div>`;
  return `
<tbody> <tr> <td> <a id="link${index}" href="#" "> ${
    robot.name !== "" ? robot.name : ""
  } </a> </td>
<td>${robot.type}</td>
<td>${robot.color !== "" ? colorBlock : ""}</td>
<td>${optionCheck(robot)}</td> </tr> </tbody>`;
}

function createNewRobotSection(robot: Robot): void {
  console.log(robot);
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
        <div class="message-send-button-container"><button id="send-message" class="message-send-button">Send</button></div>
        <div class="message-send-button-container"><button id="reverse-message" class="message-send-button">Reverse</button></div>
        <div class="last-message-text-style"> <div class="hr-style"> <hr> </div><div class="last-messages-style">Last Messages </div> <div class="hr-style"><hr> </div> </div>
        <div class="message-section" id="messagesSection">
        ${chatManager.getMessagesHtml(robot)}
        </div>
        </div>
      </div>
    </section>
    `;
  const sendMessage = document.querySelector("#send-message");
  sendMessage.addEventListener("click", () => onSendMessageClicked());
  const reverseMessages = document.querySelector("#reverse-message");
  reverseMessages.addEventListener("click", () =>
    chatManager.reverseMessages(robot)
  );
}

function createRobot(event: FormDataEvent): void {
  const textArea = form.querySelector<HTMLInputElement>(
    "#robot-comments-textarea"
  );
  let error = false;
  const name = form.querySelector<HTMLInputElement>("#robot-name-input");
  const selectType = form.querySelector<HTMLInputElement>("#robot-select-type");
  const selectColor = form.querySelector<HTMLInputElement>(
    "#robot-select-color"
  );
  const phrase: any = form.querySelector<HTMLInputElement>(
    "#robot-comments-textarea"
  );
  let option1: boolean = form.querySelector<HTMLInputElement>(
    "#robot-select-option-1"
  ).checked;
  let option2: boolean = form.querySelector<HTMLInputElement>(
    "#robot-select-option-2"
  ).checked;
  let option3: boolean = form.querySelector<HTMLInputElement>(
    "#robot-select-option-3"
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
    let robot: Robot = new Robot(
      name.value,
      selectColor.value,
      getType(selectType.value),
      phrase.value,
      { option1, option2, option3 },
      Date.now()
    );
    robots.push(robot);
    const robotJSON = robots.map((robot) => robot.toJsonString());
    localStorage.setItem("robots", "[" + robotJSON.toString() + "]");
    activeIndex = robots.length - 1;
    createNewRobotSection(robot);
    activeIndex == 0 ? createButtons() : enableButtons();
  }

  event.preventDefault();
  form.reset();
}

//helper functions

function onLinkClicked(index: number): void {
  activeIndex = index;
  createNewRobotSection(robots[activeIndex]);
}

function optionCheck(robot: Robot): string {
  let checkedOptions = [];
  robot.options.option1 === true ? checkedOptions.push("can jump") : "";
  robot.options.option2 === true ? checkedOptions.push("can talk") : "";
  robot.options.option3 === true ? checkedOptions.push("can blink") : "";

  return checkedOptions.join(",");
}

function getType(robotType: string): RobotType {
  if (robotType === "Male") {
    return RobotType.male;
  } else {
    return RobotType.female;
  }
}

//#endregion

//#region Messeges

function onSendMessageClicked(): void {
  const robot: Robot = robots[activeIndex];
  const now: Date = new Date();
  const time: string = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  let messageSent: string =
    document.querySelector<HTMLInputElement>("#message").value;
  let newMessage = new Message(
    messageSent,
    time,
    Date.now(),
    robot.name,
    robot.color
  );

  chatManager.addNewHTMLMessage(
    newMessage,
    document.querySelector("#messagesSection")
  );
  chatManager.addNewMessage(newMessage);
  chatManager.saveToLocalStorage(newMessage);
  inputReseted();
}

function inputReseted(): void {
  document.querySelector<HTMLInputElement>("#message").value = "";
}

//#endregion

//#region Talk
function canTalk(talkOptionClicked: boolean, isPhraseEmpty: string): boolean {
  return talkOptionClicked === true && isPhraseEmpty !== "";
}

function onCanTalkCheckboxChange(): void {
  const checkbox = form.querySelector<HTMLInputElement>(
    "#robot-select-option-2"
  );
  const textArea = form.querySelector<HTMLInputElement>(
    "#robot-comments-textarea"
  );
  textArea.disabled = !checkbox.checked;
}

//#endregion

//#region Buttons
function createButtons(): void {
  document.querySelector(
    "#robot-section"
  ).innerHTML += `<div class = "buttons-holder"> <button id="previous-button" class="" disabled> < Previous</button>
  <button id="next-button" disabled>Next ></button> </div>`;
  const previousButton = document.querySelector("#previous-button");
  previousButton.addEventListener("click", onPreviousClicked);
  const nextButton = document.querySelector("#next-button");
  nextButton.addEventListener("click", onNextClicked);
}

function onPreviousClicked(): void {
  if (activeIndex - 1 < 0) {
    activeIndex = robots.length;
  }
  activeIndex--;
  createNewRobotSection(robots[activeIndex]);
}

function onNextClicked(): void {
  if (activeIndex + 1 > robots.length - 1) {
    activeIndex = -1;
  }
  activeIndex++;
  createNewRobotSection(robots[activeIndex]);
}

function enableButtons(): void {
  const prevButton: HTMLButtonElement =
    document.querySelector("#previous-button");
  const nextButton: HTMLButtonElement = document.querySelector("#next-button");
  prevButton.disabled = false;
  nextButton.disabled = false;
}

//#endregion

function clearStorage(): void {
  localStorage.clear();
}
