var form = document.querySelector("#create-form");
form.addEventListener("submit", createRobot);
var canTalkCheckbox = document.querySelector("#robot-select-option-2");
canTalkCheckbox.addEventListener("change", onCanTalkCheckboxChange);
var showCreatedButton = document.querySelector("#s-button");
showCreatedButton.addEventListener("click", showCreatedRobotsSection);
var clearRobotsButton = document.querySelector("#t-button");
clearRobotsButton.addEventListener("click", clearStorage);
var jsonRobots = JSON.parse(localStorage.getItem("robots"));
var robots = jsonRobots || [];
var activeIndex = 0;
var jsonMessages = JSON.parse(localStorage.getItem("messages"));
var messages = jsonMessages || [];
if (robots.length) {
    robots.forEach(function (robot) { return createNewRobotSection(robot); });
    createButtons();
    robots.length != 1 && enableButtons();
}
function showCreatedRobotsSection() {
    if (robots.length > 0) {
        var innerHTML_1 = "\n    <div class=\"robots-found-style\">".concat(robots.length, " robots found</div>  \n  <table class=\"styled-table\">\n  <thead>\n  <tr>\n    <th>Name</th>\n    <th>Type</th>\n    <th>Color</th>\n    <th>Options</th>\n  </tr>\n  </thead>\n");
        robots.forEach(function (robot, index) {
            innerHTML_1 += createTableRow(robot, index);
        });
        innerHTML_1 += "</table>";
        document.querySelector("#e-section").innerHTML = innerHTML_1;
    }
    else {
        document.querySelector("#e-section").innerHTML = "No robots created yet";
    }
}
function createTableRow(robot, index) {
    var colorBlock = "<div class=\"table-color\" style=\"background-color:".concat(robot.color, ";\"></div>");
    return "\n<tbody> <tr> <td> <a href=\"#\" onclick=\"onLinkClicked(".concat(index, ")\"> ").concat(robot.name !== "" ? robot.name : "", " </a> </td>\n<td>").concat(robot.type !== "" ? robot.type : "", "</td>\n<td>").concat(robot.color !== "" ? colorBlock : "", "</td>\n<td>").concat(optionCheck(robot), "</td> </tr> </tbody>");
}
function onLinkClicked(index) {
    activeIndex = index;
    createNewRobotSection(robots[activeIndex]);
}
function optionCheck(robot) {
    var checkedOptions = [];
    robot.options.option1 === true ? checkedOptions.push("can jump") : "";
    robot.options.option2 === true ? checkedOptions.push("can talk") : "";
    robot.options.option3 === true ? checkedOptions.push("can blink") : "";
    return checkedOptions.join(",");
}
function createNewRobotSection(robot) {
    document.querySelector("#robot-slide").innerHTML = " \n    <section id=\"slide-1\" class=\"factory-section\">\n      <div class=\"robot-title-box\">\n        <div class=\"robot-title-heading\">\n          <h2>".concat(robot.type, " Robot</h2>\n        </div>\n        <div class=\"triangle\">\n          <div class=\"triangle-empty\"></div>\n        </div>\n      </div>\n      <div class=\"content-wrapper\">\n        <div class=\"left-side\">   \n            <div class=\"robot\">\n              <div class=\"robot-head\">\n              <div class=\"").concat(canTalk(robot.options.option2, robot.phrase)
        ? "speech bubble bubble-position"
        : "d-none", "\">\n              ").concat(robot.phrase, " </div>\n                <div class=\"left-eye\"></div>\n                <div class=\"right-eye ").concat(robot.options.option3 === true ? "blink" : "", "\"></div>\n                <div class=\"mouth ").concat(canTalk(robot.options.option2, robot.phrase) ? "talk" : "", "\"></div>\n              </div>\n              <div class=\"md-parts\">\n                <div class=\"arms arm1\"></div>\n                <div style=\"color:").concat(robot.color, "\" class=\"").concat(robot.type === "Male" ? "male-robot-body" : "female-robot-body", "\"></div>\n                <div class=\"arms arm2\"></div>\n              </div>\n              <div class=\"down-parts\">\n                <div class=\"legs leg1 ").concat(robot.options.option1 === true ? "jump" : "", "\"></div>\n                <div class=\"legs leg2 ").concat(robot.options.option1 === true ? "jump" : "", "\"></div>\n              </div>\n            </div>\n            <div class=\"robot-name\">").concat(robot.name, "</div>\n          </div>\n        <div class=\"right-side\">\n        <div class=\"message-label\"> <label for=\"message\">Send message:</label>\n        <input class=\"message-input-style\" type=\"text\" id=\"message\"> </div>\n        <div class=\"message-send-button-container\"><button id=\"send-message\" onclick=\"onSendMessageClicked()\" class=\"message-send-button\">Send</button></div>\n        <div class=\"last-message-text-style\"> <div class=\"hr-style\"> <hr> </div><div class=\"last-messages-style\">Last Messages </div> <div class=\"hr-style\"><hr> </div> </div>\n        <div class=\"message-section\" id=\"messagesSection\">\n        ").concat(getMessagesHtml(messages, robot), "\n        </div>\n        </div>\n      </div>\n    </section>\n    ");
}
function getMessagesHtml(messages, robot) {
    var finalHtml = "";
    messages
        .filter(function (m) { return m.date > robot.createdDate; })
        .sort(function (a, b) { return b.date - a.date; })
        .forEach(function (message) { return (finalHtml += generateMessageHtml(message)); });
    return finalHtml;
}
function generateMessageHtml(message) {
    if (message.text != "") {
        return "<div><span class=\"message-name-style\" style=\"color:".concat(message.robotColor, "\">").concat(message.robotName, "</span> ").concat(message.time, "</div>\n  <div class=\"message-text-style\">").concat(message.text, "</div>");
    }
    else {
        return "";
    }
}
function onSendMessageClicked() {
    var robot = robots[activeIndex];
    var now = new Date();
    var time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    var messageSent = document.querySelector("#message")
        .value;
    var newMessage = {
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
    document.querySelector("#message").value = "";
}
function addNewMessage(message) {
    var messageHtml = generateMessageHtml(message);
    var messagesSection = document.querySelector("#messagesSection");
    var currentMessagesHtml = messagesSection.innerHTML;
    messagesSection.innerHTML = messageHtml + currentMessagesHtml;
}
function canTalk(talkOptionClicked, isPhraseEmpty) {
    return talkOptionClicked === true && isPhraseEmpty !== "";
}
function onCanTalkCheckboxChange() {
    var checkbox = form.querySelector("#robot-select-option-2");
    var textArea = form.querySelector("#robot-comments-textarea");
    textArea.disabled = !checkbox.checked;
}
function createRobot(event) {
    var textArea = form.querySelector("#robot-comments-textarea");
    var error = false;
    var name = form.querySelector("#robot-name-input");
    var selectType = form.querySelector("#robot-select-type");
    var selectColor = form.querySelector("#robot-select-color");
    var phrase = form.querySelector("#robot-comments-textarea");
    var option1 = form.querySelector("#robot-select-option-1").checked;
    var option2 = form.querySelector("#robot-select-option-2").checked;
    var option3 = form.querySelector("#robot-select-option-3").checked;
    if (!name.value || name.value == "") {
        form.querySelector("#robot-name-validation").textContent =
            "*This field is required!";
        error = true;
    }
    else {
        form.querySelector("#robot-name-validation").textContent = "";
    }
    if (!selectType.value || selectType.value == "") {
        form.querySelector("#robot-type-validation").textContent =
            "*This field is required!";
        error = true;
    }
    else {
        form.querySelector("#robot-type-validation").textContent = "";
    }
    if (!selectColor.value || selectColor.value == "") {
        form.querySelector("#robot-color-validation").textContent =
            "*This field is required!";
        error = true;
    }
    else {
        form.querySelector("#robot-color-validation").textContent = "";
    }
    if (option2 == true && textArea.value == "") {
        form.querySelector("#robot-phrase-validation").textContent =
            "*This field is required!";
        error = true;
    }
    else {
        form.querySelector("#robot-type-validation").textContent = "";
    }
    if (!error) {
        var robot = {
            name: name.value,
            color: selectColor.value,
            type: selectType.value,
            phrase: phrase.value,
            options: {
                option1: option1,
                option2: option2,
                option3: option3,
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
    document.querySelector("#robot-section").innerHTML += "<div class = \"buttons-holder\"> <button id=\"previous-button\" class=\"\" onclick=\"onPreviousClicked()\" disabled> < Previous</button>\n  <button id=\"next-button\" class=\"\" onclick=\"onNextClicked()\" disabled>Next ></button> </div>";
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
    var prevButton = document.querySelector("#previous-button");
    var nextButton = document.querySelector("#next-button");
    prevButton.disabled = false;
    nextButton.disabled = false;
}
function clearStorage() {
    localStorage.clear();
}
