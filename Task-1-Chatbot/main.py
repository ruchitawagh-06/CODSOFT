from chatbot.bot import RuleBasedChatbot


def main() -> None:
    bot = RuleBasedChatbot()

    print("=" * 52)
    print(" Rule-Based AI Chatbot")
    print("=" * 52)
    print("Type your message below. Type 'bye' or 'exit' to stop.\n")

    while True:
        user_input = input("You: ").strip()

        if not user_input:
            print("Bot: Please type something so I can respond.")
            continue

        response = bot.get_response(user_input)
        print(f"Bot: {response}")

        if bot.is_exit_message(user_input):
            break


if __name__ == "__main__":
    main()
