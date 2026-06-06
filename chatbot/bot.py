import random
import re
from datetime import datetime

from .rules import CHATBOT_RULES, FALLBACK_RESPONSES


class RuleBasedChatbot:
    """A small chatbot that selects replies from predefined matching rules."""

    def __init__(self) -> None:
        self.rules = CHATBOT_RULES

    def get_response(self, message: str) -> str:
        normalized_message = self._normalize(message)

        for rule in self.rules:
            if self._matches_any_pattern(normalized_message, rule["patterns"]):
                response = random.choice(rule["responses"])
                return self._add_dynamic_values(response)

        return random.choice(FALLBACK_RESPONSES)

    def is_exit_message(self, message: str) -> bool:
        normalized_message = self._normalize(message)
        return bool(re.search(r"\b(bye|goodbye|exit|quit|see you)\b", normalized_message))

    def _matches_any_pattern(self, message: str, patterns: list[str]) -> bool:
        return any(re.search(pattern, message) for pattern in patterns)

    def _normalize(self, message: str) -> str:
        return message.lower().strip()

    def _add_dynamic_values(self, response: str) -> str:
        now = datetime.now()
        return response.format(
            current_time=now.strftime("%I:%M %p"),
            current_date=now.strftime("%d %B %Y"),
        )
