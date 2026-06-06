# Rule-Based AI Chatbot

A simple artificial intelligence project that demonstrates basic natural language processing and conversation flow using predefined rules, keyword matching, and regular expressions.

## Overview

This chatbot responds to user messages by checking them against a set of rules. Each rule contains patterns for common user intents such as greetings, asking for help, learning about AI, checking the time, and ending the conversation.

The project is intentionally beginner-friendly while still being organized like a professional GitHub repository.

## Features

- Rule-based responses using pattern matching
- Clean project structure
- Easy-to-edit chatbot rules
- Conversation loop in the terminal
- Fallback response for unknown messages
- Unit tests for important chatbot behavior
- GitHub-ready documentation

## Project Structure

```text
rule-based-ai-chatbot/
├── chatbot/
│   ├── __init__.py
│   ├── bot.py
│   └── rules.py
├── tests/
│   └── test_chatbot.py
├── main.py
├── requirements.txt
├── .gitignore
├── LICENSE
└── README.md
```

## How It Works

1. The user enters a message.
2. The chatbot normalizes the message.
3. The message is compared with predefined rule patterns.
4. If a match is found, the chatbot returns the related response.
5. If no rule matches, the chatbot gives a helpful fallback response.

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/rule-based-ai-chatbot.git
cd rule-based-ai-chatbot
```

Create and activate a virtual environment:

```bash
python -m venv .venv
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

## Run the Chatbot

```bash
python main.py
```

Example conversation:

```text
You: hello
Bot: Hello! I am your rule-based AI chatbot. How can I help you today?

You: what is artificial intelligence
Bot: Artificial Intelligence is a field of computer science where machines are designed to perform tasks that normally require human intelligence.
```

## Run Tests

```bash
python -m unittest discover -s tests -p "test_*.py" -v
```

## Future Improvements

- Add a graphical user interface
- Store conversation history
- Add more intent categories
- Connect the chatbot to a website
- Upgrade from rule-based responses to machine learning

## License

This project is licensed under the MIT License.
