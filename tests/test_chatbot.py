import unittest

from chatbot.bot import RuleBasedChatbot


class RuleBasedChatbotTests(unittest.TestCase):
    def setUp(self) -> None:
        self.bot = RuleBasedChatbot()

    def test_greeting_response_mentions_chatbot_or_help(self) -> None:
        response = self.bot.get_response("hello")

        self.assertTrue("chatbot" in response.lower() or "ask me" in response.lower())

    def test_ai_definition_response(self) -> None:
        response = self.bot.get_response("what is artificial intelligence")

        self.assertTrue("intelligence" in response.lower() or "computer" in response.lower())

    def test_unknown_message_returns_fallback(self) -> None:
        response = self.bot.get_response("xylophone moon sandwich")

        self.assertTrue(response)

    def test_exit_message_detection(self) -> None:
        self.assertTrue(self.bot.is_exit_message("bye"))
        self.assertTrue(self.bot.is_exit_message("please exit"))
        self.assertFalse(self.bot.is_exit_message("hello"))


if __name__ == "__main__":
    unittest.main()
