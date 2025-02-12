from repository.company_repository import CompanyRepository
from validations.comapny_validation import CompanyValidation

class CompanyService:
    
    @staticmethod
    def get_company(company_id):
        company = CompanyRepository.find_by_id(company_id)
        if not company:
            return {"error": "Company not found"}, 404
        return company, 200
    
    @staticmethod
    def update_company(company_id, data):
        validations_error = CompanyValidation.validate_update_data(data)
        if validations_error:
            return {"error": validations_error}, 400
        
        updated_company = CompanyRepository.update_company(company_id, data)
        if updated_company:
            return {"message": "Company updated Successfully" ,"company": updated_company}, 200
        return {"error": "Failed to update company"}, 500
    
    @staticmethod
    def is_authorized(company_id, session_company_id):
        return company_id == session_company_id
    