/* =========================================================
   CYPRIEN PIERRE MOÏSE QUIZ
   MOTEUR DU JEU + AGENT IA
========================================================= */


/* =========================================================
   QUESTIONS
========================================================= */

const questions = [

    {
        category: "BASE DE DONNÉES",

        question:
            "Qu'est-ce qu'une base de données ?",

        answers: [
            "Un système permettant de stocker et organiser des informations",
            "Un logiciel pour dessiner",
            "Un câble Internet",
            "Un système d'exploitation"
        ],

        correct: 0
    },


    {
        category: "INTELLIGENCE ARTIFICIELLE",

        question:
            "Que signifie l'abréviation IA ?",

        answers: [
            "Internet Automatique",
            "Intelligence Artificielle",
            "Information Algorithmique",
            "Interface Automatique"
        ],

        correct: 1
    },


    {
        category: "DÉVELOPPEMENT WEB",

        question:
            "Quel langage est principalement utilisé pour structurer une page web ?",

        answers: [
            "Python",
            "CSS",
            "HTML",
            "SQL"
        ],

        correct: 2
    },


    {
        category: "CSS",

        question:
            "À quoi sert principalement le CSS ?",

        answers: [
            "À créer une base de données",
            "À styliser et mettre en forme une page web",
            "À gérer les fichiers du Terminal",
            "À créer un système d'exploitation"
        ],

        correct: 1
    },


    {
        category: "JAVASCRIPT",

        question:
            "Quel langage permet d'ajouter des interactions à une page web ?",

        answers: [
            "JavaScript",
            "HTML",
            "SQL",
            "Git"
        ],

        correct: 0
    },


    {
        category: "TERMINAL",

        question:
            "Sous Windows, quelle commande permet d'afficher le contenu d'un dossier ?",

        answers: [
            "DELETE",
            "DIR",
            "SHOW",
            "OPEN"
        ],

        correct: 1
    },


    {
        category: "TERMINAL",

        question:
            "Quelle commande Windows permet de créer un nouveau dossier ?",

        answers: [
            "MKDIR",
            "CREATE",
            "NEWFOLDER",
            "MAKEDIR"
        ],

        correct: 0
    },


    {
        category: "GIT",

        question:
            "À quoi sert principalement Git ?",

        answers: [
            "À modifier des photos",
            "À gérer les versions d'un projet",
            "À créer une connexion Wi-Fi",
            "À regarder des vidéos"
        ],

        correct: 1
    },


    {
        category: "GITHUB",

        question:
            "Qu'est-ce qu'un dépôt (repository) GitHub ?",

        answers: [
            "Un espace où l'on peut stocker et gérer un projet",
            "Un navigateur Internet",
            "Un antivirus",
            "Un câble réseau"
        ],

        correct: 0
    },


    {
        category: "GITHUB PAGES",

        question:
            "Que permet GitHub Pages ?",

        answers: [
            "D'héberger des sites web statiques",
            "De fabriquer un ordinateur",
            "De remplacer Windows",
            "De créer une connexion Bluetooth"
        ],

        correct: 0
    }

];


/* =========================================================
   VARIABLES DU JEU
========================================================= */

let currentQuestion = 0;

let score = 0;

let selectedAnswer = null;

let answered = false;


/* =========================================================
   RÉFÉRENCES HTML
========================================================= */

const startScreen =
    document.getElementById("start-screen");

const quizScreen =
    document.getElementById("quiz-screen");

const resultScreen =
    document.getElementById("result-screen");

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const categoryElement =
    document.getElementById("category");

const questionNumberElement =
    document.getElementById("question-number");

const scoreElement =
    document.getElementById("score");

const progressBar =
    document.getElementById("progress-bar");

const nextButton =
    document.getElementById("next-button");

const robot =
    document.getElementById("robot");

const robotMessage =
    document.getElementById("robot-message");

const finalScore =
    document.getElementById("final-score");

const finalNote =
    document.getElementById("final-note");

const resultMessage =
    document.getElementById("result-message");

const giftMessage =
    document.getElementById("gift-message");


/* =========================================================
   FONCTION POUR MÉLANGER UN TABLEAU
========================================================= */

function shuffle(array) {

    return array.sort(() => Math.random() - 0.5);

}


/* =========================================================
   DÉMARRER LE QUIZ
========================================================= */

function startQuiz() {

    currentQuestion = 0;

    score = 0;

    selectedAnswer = null;

    answered = false;


    startScreen.classList.add("hidden");

    resultScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");


    /* Mélanger les questions */

    shuffle(questions);


    showQuestion();

}


/* =========================================================
   AFFICHER LA QUESTION
========================================================= */

function showQuestion() {

    selectedAnswer = null;

    answered = false;


    const current =
        questions[currentQuestion];


    /* Catégorie */

    categoryElement.textContent =
        current.category;


    /* Question */

    questionElement.textContent =
        current.question;


    /* Numéro */

    questionNumberElement.textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;


    /* Score */

    scoreElement.textContent =
        score;


    /* Progression */

    const progress =
        (currentQuestion / questions.length) * 100;

    progressBar.style.width =
        `${progress}%`;


    /* Robot */

    robot.textContent = "🤖";

    robotMessage.textContent =
        "Je t'observe... 👀";


    /* Nettoyer les anciennes réponses */

    answersElement.innerHTML = "";


    /* Créer les réponses */

    const answerObjects =
        current.answers.map((answer, index) => {

            return {
                text: answer,
                originalIndex: index
            };

        });


    shuffle(answerObjects);


    answerObjects.forEach((answerObject, index) => {

        const button =
            document.createElement("button");


        button.classList.add("answer");


        const letter =
            String.fromCharCode(65 + index);


        button.textContent =
            `${letter}. ${answerObject.text}`;


        button.addEventListener(
            "click",
            function () {

                selectAnswer(
                    button,
                    answerObject.originalIndex
                );

            }
        );


        answersElement.appendChild(button);

    });


    nextButton.disabled = false;

    nextButton.textContent =
        "VALIDER LA RÉPONSE →";

}


/* =========================================================
   SÉLECTIONNER UNE RÉPONSE
========================================================= */

function selectAnswer(button, answerIndex) {

    if (answered) {
        return;
    }


    document
        .querySelectorAll(".answer")
        .forEach(function (answerButton) {

            answerButton.classList.remove(
                "selected"
            );

        });


    button.classList.add("selected");


    selectedAnswer = answerIndex;


    robot.textContent = "🤖";

    robotMessage.textContent =
        "Hmm... intéressant choix... 🤔";

}


/* =========================================================
   VALIDER LA RÉPONSE
========================================================= */

nextButton.addEventListener(
    "click",
    function () {

        if (selectedAnswer === null) {

            robot.textContent = "🤨";

            robotMessage.textContent =
                "Tu dois choisir une réponse !";


            return;

        }


        if (answered) {

            nextQuestion();

            return;

        }


        checkAnswer();

    }
);


/* =========================================================
   VÉRIFIER LA RÉPONSE
========================================================= */

function checkAnswer() {

    answered = true;


    const current =
        questions[currentQuestion];


    const answerButtons =
        document.querySelectorAll(".answer");


    /* Bonne réponse */

    if (
        selectedAnswer ===
        current.correct
    ) {

        score++;

        scoreElement.textContent =
            score;


        answerButtons.forEach(
            function (button, index) {

                const text =
                    button.textContent.substring(3);


                if (
                    text ===
                    current.answers[current.correct]
                ) {

                    button.classList.add(
                        "correct"
                    );

                }

            }
        );


        /* RÉACTION DE L'AGENT IA */

        robot.textContent = "😄";

        robotMessage.textContent =
            "Excellent ! Tu commences à me faire peur ! 😂";


        nextButton.textContent =
            "QUESTION SUIVANTE →";


    }


    /* Mauvaise réponse */

    else {

        answerButtons.forEach(
            function (button) {

                const text =
                    button.textContent.substring(3);


                if (
                    text ===
                    current.answers[current.correct]
                ) {

                    button.classList.add(
                        "correct"
                    );

                }

            }
        );


        answerButtons.forEach(
            function (button) {

                if (
                    button.classList.contains(
                        "selected"
                    )
                ) {

                    button.classList.add(
                        "wrong"
                    );

                }

            }
        );


        /* RÉACTION DE L'AGENT IA */

        robot.textContent = "😂";

        robotMessage.textContent =
            "HAHAHA ! Mauvaise réponse ! Je souris quand même ! 😂";


        nextButton.textContent =
            "QUESTION SUIVANTE →";

    }

}


/* =========================================================
   QUESTION SUIVANTE
========================================================= */

function nextQuestion() {

    if (!answered) {

        checkAnswer();

        return;

    }


    currentQuestion++;


    if (
        currentQuestion <
        questions.length
    ) {

        showQuestion();

    }

    else {

        finishQuiz();

    }

}


/* =========================================================
   FIN DU QUIZ
========================================================= */

function finishQuiz() {

    quizScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");


    const total =
        questions.length;


    const percentage =
        Math.round(
            (score / total) * 100
        );


    finalScore.textContent =
        `${score} / ${total}`;


    finalNote.textContent =
        `Note : ${score} / 10`;


    /* =====================================================
       RÉACTION SELON LE SCORE
    ====================================================== */


    if (score === 10) {

        robot.textContent = "🤩";

        resultMessage.textContent =
            "INCROYABLE ! 10/10 ! Tu es officiellement le BOSS du groupe ! 👑";


        giftMessage.innerHTML =
            "🎁 CYPRIEN Pierre Moïse te doit un cadeau dans la formation de demain ! 😂";


    }

    else if (score >= 8) {

        resultMessage.textContent =
            "Excellent travail ! Tu maîtrises déjà beaucoup de choses. 🚀";


        giftMessage.innerHTML =
            "🎁 Très bon score ! CYPRIEN Pierre Moïse pourrait peut-être préparer ton cadeau... 😂";


    }

    else if (score >= 5) {

        resultMessage.textContent =
            "Pas mal ! Mais il reste encore quelques notions à réviser. 📚";


        giftMessage.innerHTML =
            "😅 Le cadeau de CYPRIEN Pierre Moïse est encore en négociation...";


    }

    else {

        resultMessage.textContent =
            "Oups ! Le robot pense qu'une petite révision serait utile. 😂";


        giftMessage.innerHTML =
            "😂 Pas de cadeau pour l'instant... Il faut revenir plus fort demain !";


    }


    /* =====================================================
       ANIMATION DE LA NOTE
    ====================================================== */

    animateScore(
        percentage
    );

}


/* =========================================================
   ANIMATION DU SCORE
========================================================= */

function animateScore(target) {

    let number = 0;


    const interval =
        setInterval(
            function () {

                number++;


                if (number >= target) {

                    number = target;

                    clearInterval(interval);

                }


                finalScore.textContent =
                    `${number}%`;


            },
            15
        );

}


/* =========================================================
   RECOMMENCER
========================================================= */

function restartQuiz() {

    resultScreen.classList.add("hidden");

    startScreen.classList.remove("hidden");


    robot.textContent = "🤖";

    robotMessage.textContent =
        "Prêt pour une nouvelle bataille ? 😎";

}


/* =========================================================
   EFFET ROBOT
========================================================= */

setInterval(
    function () {

        if (
            quizScreen &&
            !quizScreen.classList.contains(
                "hidden"
            )
        ) {

            if (!answered) {

                robot.textContent = "🤖";

            }

        }

    },
    5000
);
