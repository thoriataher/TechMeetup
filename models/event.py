import  uuid
from datetime import datetime, timezone

class Event:
    
    def __init__(self, title, description, location, date_time, logoUrl, eventType, company_id):
        self.id = str(uuid.uuid4())
        self.title = title
        self.description = description
        self.location = location
        self.date_time = date_time
        self.logoUrl = logoUrl
        self.eventType = eventType # "online", "offline", "hybrid"
        self.company_id = company_id
        self.create_at = datetime.now(timezone.utc).isoformat() 
        self.update_at = datetime.now(timezone.utc).isoformat()
        
        def __dict__(self):
            return {
                "id": self.id,
                "title": self.title,
                "description": self.description,
                "location": self.location,
                "date_time": self.date_time,
                "logoUrl": self.logoUrl,
                "eventType": self.eventType,
                "company_id": self.company_id,
                "create_at": self.create_at,
                "update_at": self.update_at
            }