document.addEventListener("DOMContentLoaded", () => {
    const chatWindow = document.querySelector("#chatWindow");
    const chatForm = document.querySelector("#chatForm");
    const userInput = document.querySelector("#userInput");
    const clearChatButton = document.querySelector("#clearChat");
    const promptButtons = document.querySelectorAll("[data-message]");

    const rules = [
        {
            patterns: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
            responses: [
                "Hello! I am Nexus, your rule-based AI chatbot. How can I help you today?",
                "Hi there! You can ask me about AI, programming, chatbots, time, date, or jokes."
            ]
        },
        {
            patterns: ["who are you", "your name", "what are you", "identity"],
            responses: [
                "I am a rule-based chatbot that replies using predefined rules and pattern matching.",
                "My name is Nexus. I am built to demonstrate basic artificial intelligence conversation flow."
            ]
        },
        {
            patterns: ["what is ai", "what is artificial intelligence", "define ai", "meaning of ai", "artificial intelligence"],
            responses: [
                "Artificial Intelligence is the field of making computer systems perform tasks that usually need human intelligence.",
                "AI helps machines understand patterns, make decisions, solve problems, and respond intelligently."
            ]
        },
        {
            patterns: ["what is chatbot", "what is a chatbot", "define chatbot", "chatbot"],
            responses: [
                "A chatbot is a software program that communicates with users through text or voice.",
                "A chatbot simulates conversation by understanding messages and giving useful responses."
            ]
        },
        {
            patterns: ["help", "what can you do", "features", "commands", "capabilities"],
            responses: [
                "I can answer greetings, explain AI and chatbots, give time and date, tell simple jokes, and respond to programming questions.",
                "Try asking: what is AI, tell me a joke, what time is it, what is chatbot, or who are you."
            ]
        },
        {
            patterns: ["python", "programming", "coding", "code", "developer"],
            responses: [
                "Python is a beginner-friendly language often used for AI, automation, websites, and data projects.",
                "Programming means writing instructions that tell a computer how to solve a problem."
            ]
        },
        {
            patterns: ["time", "current time", "what time"],
            responses: [
                "The current time is {time}.",
                "It is {time} right now."
            ]
        },
        {
            patterns: ["date", "today", "current date"],
            responses: [
                "Today's date is {date}.",
                "The current date is {date}."
            ]
        },
        {
            patterns: ["joke", "tell me a joke", "funny"],
            responses: [
                "Why did the computer get promoted? Because it had outstanding byte-sized results.",
                "Why do programmers prefer dark mode? Because light attracts bugs."
            ]
        },
        {
            patterns: ["math", "calculate", "plus", "minus"],
            responses: [
                "I can explain simple math ideas, but this version does not solve full calculations yet.",
                "Math support can be added as a future improvement using more rules or JavaScript functions."
            ]
        },
        {
            patterns: ["thanks", "thank you", "thx"],
            responses: [
                "You're welcome!",
                "Happy to help."
            ]
        },
        {
            patterns: ["bye", "goodbye", "exit", "quit", "see you"],
            responses: [
                "Goodbye! Keep learning and building.",
                "See you later. Great job exploring AI basics."
            ]
        }
    ];

    const fallbackResponses = [
        "I do not have a rule for that yet. Try asking about AI, chatbots, programming, time, date, or jokes.",
        "I did not understand that message. Type 'help' to see what I can answer.",
        "That question is not in my rule list yet, but it can be added in script.js."
    ];

    function normalize(text) {
        return text.toLowerCase().trim().replace(/[^\w\s?]/g, "");
    }

    function choose(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    function fillDynamicText(response) {
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const date = now.toLocaleDateString([], {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

        return response.replace("{time}", time).replace("{date}", date);
    }

    function getBotResponse(message) {
        const text = normalize(message);
        const matchedRule = rules.find((rule) =>
            rule.patterns.some((pattern) => text.includes(pattern))
        );
        const responses = matchedRule ? matchedRule.responses : fallbackResponses;

        return fillDynamicText(choose(responses));
    }

    function addMessage(text, sender) {
        const message = document.createElement("article");
        const paragraph = document.createElement("p");

        message.className = `message ${sender}-message`;
        paragraph.textContent = text;
        message.appendChild(paragraph);
        chatWindow.appendChild(message);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function sendMessage(text) {
        const message = text.trim();

        if (!message) {
            userInput.focus();
            return;
        }

        addMessage(message, "user");
        userInput.value = "";

        window.setTimeout(() => {
            addMessage(getBotResponse(message), "bot");
        }, 250);
    }

    function resetChat() {
        chatWindow.innerHTML = "";
        addMessage("Hello! I am Nexus, your professional rule-based AI chatbot. Ask me a question or choose a topic.", "bot");
        userInput.focus();
    }

    chatForm.addEventListener("submit", (event) => {
        event.preventDefault();
        sendMessage(userInput.value);
    });

    clearChatButton.addEventListener("click", resetChat);

    promptButtons.forEach((button) => {
        button.addEventListener("click", () => {
            sendMessage(button.dataset.message);
        });
    });

    resetChat();
});
