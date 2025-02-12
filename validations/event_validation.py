from datetime import datetime
import re

class EventValidation:
    
    @staticmethod
    def validate_event(event_data):
        errors = {}
        
        if not event_data.get("title") or len(event_data["title"]) < 3:
            errors["title"] = "Title must be at least 3 characters long"
        
        if not event_data.get("description") or len(event_data["description"]) < 10:
            errors["description"] = "Description must be at least 10 characters long"
            
        if not event_data.get("location"):
            errors["location"] = "Location is required"
            
        if not event_data.get("company_id"):
            errors["company_id"] = "Company ID is required"
            
        if event_data.get("eventType") not in ["online", "offline", "hybrid"]:
            errors["eventType"] = "Event type must be 'online', 'offline', or 'hybrid'"
            
        if not event_data.get("logoUrl"):
            errors["logoUrl"] = "Company logo URL is required"
                
        return errors if errors else None