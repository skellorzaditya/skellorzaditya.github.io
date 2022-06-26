const quizData = [{
        question: "What is actually electricity?",
        a: "A flow of water",
        b: "A flow of air",
        c: "A flow of electrons",
        d: "A flow of atoms",
        correct: "c",
    },
    {
        question: "What is the speed of sound?",
        a: "120 km/h",
        b: "1,200 km/h",
        c: "400 km/h",
        d: "700 km/h",
        correct: "b",
    },
    {
        question: "In which country is Transylvania?",
        a: "Bulgaria",
        b: "Romania",
        c: "Croatia",
        d: "Serbia",
        correct: "b",
    },
    {
        question: "Which was the first film by Disney to be produced in color?",
        a: "Toy Story",
        b: "Sleeping Beauty",
        c: "Snow White and the Seven Dwarfs",
        d: "Cinderella",
        correct: "c",
    }, {
        question: "How many time zones are there in total in the world?",
        a: "8",
        b: "16",
        c: "24",
        d: "32",
        correct: "c",
    },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function getSelected() {
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

submitBtn.addEventListener("click", () => {
    // check to see the answer
    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
                <h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
                
                <button onclick="location.reload()">Reload</button>
            `;
        }
    }
});