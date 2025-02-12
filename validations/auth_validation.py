import re
from email_validator import validate_email, EmailNotValidError

class AuthValidation:
    
    @staticmethod
    def validate_email(email):
        try:
            validate_email(email, check_deliverability=False)
            return {"valid": True}
        except EmailNotValidError as e:
            return {"valid": False, "error": "Invalid email format"}

        
    @staticmethod
    def validate_password(password):
        if len(password) < 8 or not re.search(r"\d", password) or not re.search(r"[A-Z]", password):
            return {"valid": False, "error": "Password must be at least 8 characters long and contain at least one uppercase letter and one digit."}
        return {"valid": True}
    