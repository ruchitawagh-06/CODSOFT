CHATBOT_RULES = [
    {
        "intent": "greeting",
        "patterns": [
            r"\bhello\b",
            r"\bhi\b",
            r"\bhey\b",
            r"\bgood morning\b",
            r"\bgood afternoon\b",
            r"\bgood evening\b",
        ],
        "responses": [
            "Hello! I am your rule-based AI chatbot. How can I help you today?",
            "Hi there! Ask me about AI, programming, time, or this project.",
        ],
    },
    {
        "intent": "identity",
        "patterns": [
            r"\bwho are you\b",
            r"\byour name\b",
            r"\bwhat are you\b",
        ],
        "responses": [
            "I am a simple AI chatbot built with predefined rules and pattern matching.",
            "I am a rule-based chatbot created to demonstrate basic natural language processing.",
        ],
    },
    {
        "intent": "ai_definition",
        "patterns": [
            r"\bwhat is ai\b",
            r"\bwhat is artificial intelligence\b",
            r"\bdefine ai\b",
            r"\bmeaning of ai\b",
        ],
        "responses": [
            "Artificial Intelligence is a field of computer science where machines are designed to perform tasks that normally require human intelligence.",
            "AI means creating computer systems that can reason, learn, understand language, recognize patterns, or make decisions.",
        ],
    },
    {
        "intent": "chatbot_definition",
        "patterns": [
            r"\bwhat is chatbot\b",
            r"\bwhat is a chatbot\b",
            r"\bdefine chatbot\b",
        ],
        "responses": [
            "A chatbot is a software program that communicates with users through text or voice.",
            "A chatbot is an application that responds to user messages and simulates conversation.",
        ],
    },
    {
        "intent": "project_help",
        "patterns": [
            r"\bhelp\b",
            r"\bwhat can you do\b",
            r"\bfeatures\b",
            r"\bcommands\b",
        ],
        "responses": [
            "You can greet me, ask what AI is, ask what a chatbot is, ask for the time or date, and say bye to exit.",
            "Try asking: 'what is AI', 'what is a chatbot', 'time', 'date', or 'who are you'.",
        ],
    },
    {
        "intent": "programming",
        "patterns": [
            r"\bpython\b",
            r"\bprogramming\b",
            r"\bcoding\b",
            r"\bcode\b",
        ],
        "responses": [
            "Python is a great language for beginner AI projects because it is simple, readable, and has many useful libraries.",
            "Programming is the process of giving instructions to a computer to solve problems.",
        ],
    },
    {
        "intent": "time",
        "patterns": [
            r"\btime\b",
            r"\bcurrent time\b",
            r"\bwhat time\b",
        ],
        "responses": [
            "The current time is {current_time}.",
            "It is {current_time} right now.",
        ],
    },
    {
        "intent": "date",
        "patterns": [
            r"\bdate\b",
            r"\btoday\b",
            r"\bcurrent date\b",
        ],
        "responses": [
            "Today's date is {current_date}.",
            "The current date is {current_date}.",
        ],
    },
    {
        "intent": "thanks",
        "patterns": [
            r"\bthanks\b",
            r"\bthank you\b",
            r"\bthx\b",
        ],
        "responses": [
            "You're welcome!",
            "Happy to help.",
        ],
    },
    {
        "intent": "goodbye",
        "patterns": [
            r"\bbye\b",
            r"\bgoodbye\b",
            r"\bexit\b",
            r"\bquit\b",
            r"\bsee you\b",
        ],
        "responses": [
            "Goodbye! Keep learning and building.",
            "See you later. Great job exploring AI basics!",
        ],
    },
]


FALLBACK_RESPONSES = [
    "I am not sure about that yet. Try asking about AI, chatbots, programming, time, or date.",
    "I do not have a rule for that message yet, but you can add one in chatbot/rules.py.",
    "Sorry, I did not understand. Type 'help' to see what I can answer.",
]
