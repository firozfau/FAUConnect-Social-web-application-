# password_utils.py
from passlib.context import CryptContext

class PasswordLib:
    def __init__(self):
        # Use bcrypt for hashing passwords
        self.password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def get_password_hash(self, password: str) -> str:
        return self.password_context.hash(password)

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return self.password_context.verify(plain_password, hashed_password)
