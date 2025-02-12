import uuid 
from datetime import datetime, timezone
import utcnow

class Company:
    
    def __init__(self, name, email, hashed_password, logo_url):
        self.id = str(uuid.uuid4())
        self.name = name
        self.email = email
        self.password = hashed_password
        self.logo_url = logo_url
        self.create_at = datetime.now(timezone.utc).isoformat()
        self.update_at = datetime.now(timezone.utc).isoformat()
        
        def __dict__(self):
            return {
                "name": self.name,
                "email": self.email,
                "password": self.password,
                "logo_url": self.logo_url
            }
