const questions = [
    {
        question: "What is the capital of Telangana?",
        options: ["Karimnagar","Hyderabad","Waranagal","Huzurabad"],
        correctAnswer: 1 
    },
    {
        question: "What is the capital of India?",
        options: ["Telangana","Madhya Pradesh","Delhi","Goa"],
        correctAnswer:2
    },
    {
        question: "Which of the animal mostly found in arctic region?",
        options: ["Kangaroo","Penguin","White Tiger","Kiwi"],
        correctAnswer:1
    },
    {
        question: "What is the full form of IBM?",
        options:["Indian Business System","International Business System","Internally Built System","Integrated Business System"],
        correctAnswer:1
    },
    {
        question: "Which of the following natural disasters mostly occur in Nepal?",
        options: ["Tsunami","Earthquake","Floods","Volcanic erruption"],
        correctAnswer:1
    },
    {
        question: "Which country is more stronger in technical aspect as of 2022?",
        options: ["India","America","Japan","China"],
        correctAnswer:2
    },
    {
        question: "Which country has highest population as of 2021?",
        options:["India","China","America","Russia"],
        correctAnswer:1
    },
    {
        question: "Which of the company did Elon Musk recently bought?",
        options:["Twitter","Whatsapp","Facebook","Google"],
        correctAnswer:0
    },
    {
        question: "Sathya Nadella is the CEO of?",
        options:["Google","Microsoft","Amazon","Flipkart"],
        correctAnswer:1
    },
    {
        question: "What is the answer for (3*4)-3/(3*6)-(4+5)?",
        options:["2.2","1.1","2","1"],
        correctAnswer:3
    },
    // Add more questions here
];

let currentQuestion = 0;
let userAnswers = new Array(questions.length);

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const resultElement = document.getElementById("result");

function loadQuestion() {
    const currentQuestionData = questions[currentQuestion];
    questionElement.textContent = currentQuestionData.question;
    optionsElement.innerHTML = "";

    currentQuestionData.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "option";
        optionElement.innerHTML = `
            <input type="radio" id="option${index}" name="answer" value="${index}">
            <label for="option${index}">${option}</label>
        `;
        optionsElement.appendChild(optionElement);
    });

    // Set the user's previous answer as checked, if any
    if (userAnswers[currentQuestion] !== undefined) {
        document.getElementById(`option${userAnswers[currentQuestion]}`).checked = true;
    }

    // Hide/show appropriate buttons based on the current question
    if (currentQuestion === 0) {
        prevButton.style.display = "none";
    } else {
        prevButton.style.display = "inline-block";
    }

    if (currentQuestion === questions.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
    } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
    }
}

function selectAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestion] = parseInt(selectedOption.value);
    }
}

function nextQuestion() {
    selectAnswer();
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function previousQuestion() {
    selectAnswer();
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function evaluateQuiz() {
    selectAnswer();
    let correctAnswers = 0;

    questions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
            correctAnswers++;
        }
    });

    resultElement.textContent = `You answered ${correctAnswers} out of ${questions.length} questions correctly.`;
    resultElement.style.display = "block";
}

prevButton.addEventListener("click", previousQuestion);
nextButton.addEventListener("click", nextQuestion);
submitButton.addEventListener("click", evaluateQuiz);

window.onload = loadQuestion;
