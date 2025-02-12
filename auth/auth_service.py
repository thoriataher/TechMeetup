from repository.company_repository import CompanyRepository
from utils.security import SecurityUtils
from validations.auth_validation import AuthValidation
from models.company import Company

class AuthService:
    
    @staticmethod
    def register_company(name, email, password, logo_url):
        email_validation = AuthValidation.validate_email(email)
        if not email_validation["valid"]:
            return {"error": email_validation["error"]}, 400 
    
        if CompanyRepository.find_by_email(email):
            return {"error": "Email already exists"}, 409
        password_validation = AuthValidation.validate_password(password)
        if not password_validation["valid"]:
            return {"error": password_validation["error"]}, 400
        
        
        hashed_password = SecurityUtils.hash_password(password)
        
        new_company = Company(name, email, hashed_password, logo_url)
        companies = CompanyRepository.load_companies()
        companies.append(new_company.__dict__)
        CompanyRepository.save_companies(companies)
        
        return {"message": "Company created successfully"}, 201
    
    @staticmethod
    def login_company(email, password):
        try:
            company = CompanyRepository.find_by_email(email)
        except Exception as e:
            return {"error": "Internal server error: {str(e)}"}, 500
        if not company or not SecurityUtils.check_password(password, company["password"]):
            return {"error": "Invalid email or password"}, 401
        SecurityUtils.login_user(company)
        return {"message": "User login successfully", "company_id": company["id"]
}, 200