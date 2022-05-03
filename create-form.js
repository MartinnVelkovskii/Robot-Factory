const form = document.querySelector("#create-form");
form.addEventListener("submit", createRobot);

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
          <div class="right-block first">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptatibus impedit quas numquam illum. Nam quia, porro
              cupiditate quisquam amet doloremque consectetur nisi temporibus,
              exercitationem quasi iste Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Deleniti cupiditate quaerat excepturi rerum
              nostrum sunt debitis alias illo perspiciatis ut. Perspiciatis ipsa
              excepturi distinctio nam omnis? Ipsum eaque vitae sed.
            </p>
          </div>
          <div class="right-block second">
            <p>
              <em>Lorem</em>, ipsum dolor sit amet consectetur adipisicing elit.
              Officia asperiores consequatur blanditiis exercitationem
              consequuntur quis quidem modi dolore provident
              necessitatibus,aliquid id obcaecati repudiandae?
            </p>
          </div>
          <div class="right-block third">
            <img
              class="good-luck-image"
              src="https://media.istockphoto.com/vectors/-vector-id505920740"
            />
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
              asperiores consequatur blanditiis
            </p>
          </div>
        </div>
      </div>
    </section>
    `;
}
function canTalk(talkOptionClicked, isPhraseEmpty) {
  return talkOptionClicked === true && isPhraseEmpty !== "";
}

function onCanTalkCheckboxChange() {
  const checkbox = form.querySelector("#robot-select-option-2");
  const textArea = form.querySelector("#robot-comments-textarea");
  textArea.disabled = !checkbox.checked;
}

let robots = [];
let activeIndex = 0;

function createRobot(event) {
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
    };
    robots.push(robot);
    activeIndex = robots.length - 1;
    createNewRobotSection(robot);
    activeIndex == 0 ? createButtons() : enableButtons();
    console.log(robots);
  }

  event.preventDefault();
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
