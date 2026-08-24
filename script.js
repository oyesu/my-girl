const scenes = document.querySelectorAll(".scene");

const envelope = document.querySelector("#envelope");
const openLetterButton = document.querySelector("#openLetter");

const typingText = document.querySelector("#typingText");
const continueToGame = document.querySelector("#continueToGame");

const gameHeart = document.querySelector("#gameHeart");
const gameArea = document.querySelector("#gameArea");

const scoreElement = document.querySelector("#score");
const gameProgress = document.querySelector("#gameProgress");

const dateInput = document.querySelector("#dateInput");
const confirmDate = document.querySelector("#confirmDate");

const ticketDate = document.querySelector("#ticketDate");

const restartButton = document.querySelector("#restartButton");

const floatingElements = document.querySelector("#floatingElements");
const confettiContainer = document.querySelector("#confettiContainer");


/* =========================
   SCENE SWITCHING
========================= */

function showScene(sceneId) {

    scenes.forEach((scene) => {
        scene.classList.remove("active");
    });

    const nextScene = document.querySelector(`#${sceneId}`);

    nextScene.classList.add("active");
}


/* =========================
   ENVELOPE
========================= */

openLetterButton.addEventListener("click", () => {

    envelope.classList.add("open");

    openLetterButton.style.pointerEvents = "none";

    setTimeout(() => {

        showScene("sceneLetter");

        startTyping();

        openLetterButton.style.pointerEvents = "auto";

    }, 1400);

});


/* =========================
   LETTER TEXT
========================= */

const message = `Hey.

It's only been two days...

Which honestly isn't that long.

But somehow the apartment already feels
a little too quiet without you.

I miss waking up next to you.

I miss hearing your voice.

I even miss all those little things
that I probably don't notice enough
when you're actually here.

It's funny how quickly you get used
to having someone by your side.

And then they're gone for just a few days...

and suddenly you realise
how much they actually mean to you.

So while you're away in Moscow,
there's one very important question
I need an answer to...

When exactly are you coming back?

Because apparently,
two days without you
is already more than enough ❤️`;


let typingIndex = 0;
let typingTimeout = null;


/* =========================
   START TYPING
========================= */

function startTyping() {

    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }

    typingIndex = 0;

    typingText.textContent = "";

    continueToGame.classList.remove("show");

    typeText();
}


/* =========================
   TYPE TEXT
========================= */

function typeText() {

    if (typingIndex >= message.length) {

        continueToGame.classList.add("show");

        return;
    }

    const character = message.charAt(typingIndex);

    typingText.textContent += character;

    typingIndex++;

    let speed = 28;

    if (
        character === "." ||
        character === "!" ||
        character === "?"
    ) {
        speed = 220;
    }

    if (character === "\n") {
        speed = 100;
    }

    typingTimeout = setTimeout(typeText, speed);
}


/* =========================
   GO TO GAME
========================= */

continueToGame.addEventListener("click", () => {

    showScene("sceneGame");

    score = 0;

    scoreElement.textContent = "0";

    gameProgress.style.width = "0%";

    gameHeart.style.pointerEvents = "auto";

    setTimeout(() => {
        moveHeart();
    }, 100);

});


/* =========================
   MINI GAME
========================= */

let score = 0;

const maxScore = 7;


function moveHeart() {

    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;

    const heartWidth = gameHeart.offsetWidth;
    const heartHeight = gameHeart.offsetHeight;

    const maxX = Math.max(0, areaWidth - heartWidth);
    const maxY = Math.max(0, areaHeight - heartHeight);

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    gameHeart.style.left = `${randomX}px`;
    gameHeart.style.top = `${randomY}px`;
}


gameHeart.addEventListener("click", () => {

    score++;

    scoreElement.textContent = score;

    const progress = (score / maxScore) * 100;

    gameProgress.style.width = `${progress}%`;


    if (score >= maxScore) {

        gameHeart.style.pointerEvents = "none";

        setTimeout(() => {
            showScene("sceneDate");
        }, 600);

        return;
    }


    moveHeart();


    const speed = Math.max(
        0.45,
        1.4 - score * 0.12
    );

    gameHeart.style.animationDuration = `${speed}s`;

});


/* =========================
   DATE SETTINGS
========================= */

function setMinimumDate() {

    const today = new Date();

    const localDate = new Date(
        today.getTime() -
        today.getTimezoneOffset() * 60000
    )
        .toISOString()
        .split("T")[0];

    dateInput.min = localDate;
}


setMinimumDate();


/* =========================
   CONFIRM RETURN DATE
========================= */

confirmDate.addEventListener("click", () => {

    if (!dateInput.value) {

        dateInput.focus();

        dateInput.style.transform = "scale(1.02)";

        setTimeout(() => {
            dateInput.style.transform = "scale(1)";
        }, 200);

        return;
    }


    const selectedDate = new Date(
        `${dateInput.value}T12:00:00`
    );


    const formattedDate =
    selectedDate.toLocaleDateString(
        "en-US",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );


    ticketDate.textContent = formattedDate;

    showScene("sceneTicket");

    createConfetti();

});


/* =========================
   CONFETTI
========================= */

function createConfetti() {

    const symbols = [
        "❤️",
        "💗",
        "💕",
        "✨",
        "🌸"
    ];


    for (let i = 0; i < 70; i++) {

        const item =
            document.createElement("div");


        item.classList.add("confetti");


        item.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];


        item.style.left =
            `${Math.random() * 100}%`;


        item.style.fontSize =
            `${15 + Math.random() * 20}px`;


        item.style.animationDuration =
            `${3 + Math.random() * 3}s`;


        confettiContainer.appendChild(item);


        setTimeout(() => {
            item.remove();
        }, 6500);

    }

}


/* =========================
   FLOATING HEARTS
========================= */

function createFloatingHeart() {

    const heart =
        document.createElement("div");


    heart.classList.add("floating-heart");


    const elements = [
        "♡",
        "♥",
        "✦",
        "·"
    ];


    heart.textContent =
        elements[
            Math.floor(
                Math.random() * elements.length
            )
        ];


    heart.style.left =
        `${Math.random() * 100}%`;


    heart.style.fontSize =
        `${15 + Math.random() * 30}px`;


    heart.style.animationDuration =
        `${8 + Math.random() * 8}s`;


    floatingElements.appendChild(heart);


    setTimeout(() => {
        heart.remove();
    }, 16000);

}


setInterval(createFloatingHeart, 900);


/* =========================
   RESTART
========================= */

restartButton.addEventListener("click", () => {

    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }

    typingIndex = 0;

    typingText.textContent = "";

    continueToGame.classList.remove("show");


    score = 0;

    scoreElement.textContent = "0";

    gameProgress.style.width = "0%";

    gameHeart.style.pointerEvents = "auto";

    gameHeart.style.animationDuration = "1.4s";

    gameHeart.style.left = "0px";
    gameHeart.style.top = "0px";


    dateInput.value = "";


    envelope.classList.remove("open");

    showScene("sceneIntro");

});