import json
import os
from config.config import Config

class CompanyRepository:
    FILE_PATH = Config.COMPANIES_FILE
    @staticmethod
    def load_companies():
        if not os.path.exists(CompanyRepository.FILE_PATH):
            return []
        try:
            with open(CompanyRepository.FILE_PATH, 'r', encoding='utf-8') as file:
                data = json.load(file)
                if isinstance(data, list):
                    return data
                else:
                    return []
        except (json.JSONDecodeError, FileNotFoundError) as e:
            return []
        
    @staticmethod 
    def save_companies(companies):
        try:
            with open(CompanyRepository.FILE_PATH, 'w', encoding='utf-8') as file:
                json.dump(companies, file, indent=4)
            return True
        except Exception as e:
            return False
        
    @staticmethod
    def find_by_email(email):
        companies = CompanyRepository.load_companies()
        try:
            return next((company for company in companies if company["email"].strip().lower() == email.strip().lower()), None)
        except:
            pass
    @staticmethod
    def save_company(company_data):
        companies = CompanyRepository.load_companies()
        for i, company in enumerate(companies):
            if company["id"] == company_data["id"]:
                companies[i] = company_data
                break
        else:
            companies.append(company_data)
        return CompanyRepository.save_companies(companies)
            
    