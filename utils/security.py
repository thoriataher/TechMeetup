import bcrypt
from flask import session

class SecurityUtils:
    
    @staticmethod
    def hash_password(password):
        return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    
    @staticmethod
    def check_password(password, hash_password):
        return bcrypt.checkpw(password.encode("utf-8"), hash_password.encode("utf-8"))
         
        
    
    @staticmethod
    def login_user(company):
        session["company_id"] = company["id"]
        session["company_name"] = company["name"]
        
    @staticmethod
    def logout_user():
        session.clear()