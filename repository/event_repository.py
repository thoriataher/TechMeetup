import os
import json
import uuid
from datetime import datetime
from models.event import Event
from config.config import Config

class EventRepository:
    FILE_PATH = Config.EVENTS_FILE
    @staticmethod
    def load_events():
        if not os.path.exists(Config.EVENTS_FILE):
            return []
        try:
            with open(EventRepository.FILE_PATH, 'r', encoding="utf-8") as file:
                data = json.load(file)
                if isinstance(data, list):
                    return data
                else:
                    return []
        except (json.JSONDecodeError, FileNotFoundError) as e:
            return []
        
    @staticmethod
    def save_events(events):
        try:
            with open(EventRepository.FILE_PATH, 'w', encoding="utf-8") as file:
                json.dump(events, file, indent=4)
            return True
        except Exception as e:
            return False
        
    @staticmethod
    def find_by_company_id(company_id):
        events = EventRepository.load_events()
        return [event for event in events if event["company_id"] == company_id]
    
    def find_event(event_id):
        events = EventRepository.load_events()
        for event in events:
            if event["id"] == event_id:
                return event  
        return None 
    
    @staticmethod
    def add_event(event_data):
        events = EventRepository.load_events()  
        events.append(event_data)
        try:
            if EventRepository.save_events(events):
                return event_data
        except Exception as e:
            print("Error saving event:", str(e))  
        return {"error": "An internal server error occurred"}
    
    
    @staticmethod
    def update_event(event_id, updated_event):
        events = EventRepository.load_events()

        for i, event in enumerate(events):
            if event["id"] == event_id:
                events[i]["logoUrl"] = updated_event["logoUrl"]
                events[i]["title"] = updated_event["title"]
                events[i]["description"] = updated_event["description"]
                events[i]["location"] = updated_event["location"]
                events[i]["date_time"] = updated_event["date_time"]
                events[i]["eventType"] = updated_event["eventType"]
                
                if EventRepository.save_events(events):
                    return events[i]
        return {"error": "Faild to update event"}


    
    @staticmethod
    def delete_event(event_id):
        events = EventRepository.load_events()
        event_exists = any(event["id"] == event_id for event in events)

        if not event_exists:
            return {"error": "Event not found"}, 404  

        new_events = [event for event in events if event["id"] != event_id]
        
        if EventRepository.save_events(new_events):
            return {"message": "Event deleted successfully"}, 200
        else:
            return {"error": "Failed to delete event"}, 500

    
    @staticmethod
    def event_exist(title, date_time):
        events = EventRepository.load_events()
        return any(event for event in events if event["title"] == title and event["date_time"] == date_time)