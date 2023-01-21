const body = document.querySelector("body");
const target = document.querySelector("#enemy");
const enemyCoordinates = () => target.getBoundingClientRect();
const count = document.getElementById("count");
const ballSize = 30;

if (body) {
  body.addEventListener("mouseup", (e) => {
    if (!checkIfClickedOnTarget(e)) {
      const { clientX, clientY } = e;
      const ball = createBall();
      if (ball) {
        initBallThrow({ ball, clientX, clientY });
      }
    }
  });
}

const initBallThrow = (params) => {
  const { ball, clientX, clientY } = params;
  ball.style.cssText = createBallInitialStyle({ clientX, clientY });
  listenBallMove(ball);
  body.appendChild(ball);
  setTimeout(() => {
    ball.classList.toggle("animation");
  });
  setTimeout(() => {
    ball?.remove();
  }, 2000);
};

const checkIfClickedOnTarget = (e) =>
  e?.target?.id === "enemy" || e?.target?.id === "count";

const createBall = () => {
  const ball = document.createElement("div");
  return ball;
};
const createBallInitialStyle = (params) => {
  const { clientX, clientY } = params;
  return `
            position: absolute;
            left: ${clientX - 10}px;
            top: ${clientY - 10}px;
            width: ${ballSize}px;
            height: ${ballSize}px;
            border-radius: 50%;
            background-color: orangered;
            transition: all 0.9s ease-in-out;
            z-index: 1;
        `;
};

const getElementPosition = (element) => {
  return element.getBoundingClientRect();
};

const listenBallMove = (element) => {
  if (element) {
    const interval = setInterval(() => {
      const { bottom, left, top } = getElementPosition(element);
      const targetCoordinates = enemyCoordinates();
      if (
        bottom <= targetCoordinates.bottom + window.pageYOffset &&
        left >= targetCoordinates.left + window.pageXOffset - ballSize / 2 &&
        left <= targetCoordinates.left + targetCoordinates.width - ballSize / 2 &&
        top >= targetCoordinates.top
      ) {
        target.style.boxShadow =  '0px 0px 50px 5px red';
        count.style.color = "red";
        setTimeout(() => {
          target.style.boxShadow =  'none';
          count.style.color = "white";
        }, 500)
        element.remove();
        count.textContent = Number(count.textContent) + 1;
        clearInterval(interval);
      }
    }, 10);

    // Clear after 1 second, one shoot takes 1 second, no sense listen event.
    setTimeout(() => {
      clearInterval(interval);
    }, 1000);
  }
};

const setRandomPositionForTarget = () => {
  setInterval(() => {
    const { clientWidth, clientHeight } = document.body;
    const height = Math.floor(Math.random() * (clientHeight - 100));
    const width = Math.floor(Math.random()  * (clientWidth - 100));
    target.style.top = `${height}px`;
    target.style.left = `${width}px`;
  }, 1500);
};

setRandomPositionForTarget();
