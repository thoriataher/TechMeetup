class CompanyValidation:
    
    @staticmethod
    def validate_update_data(data):
        allowed_fields = {"name", "photo", "decorations", "website_link"}
        errors = {}
        
        for field in data:
            if field not in allowed_fields:
                errors[field] = "Invalid field"
            elif not isinstance(data[field], str) or not data[field].strip():
                errors[field] = "Field must be a non-empty string"
                
        return errors if errors else None