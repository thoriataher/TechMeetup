import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    SESSION_TYPE = "filesystem"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_FILE_DIR = os.getenv("SESSION_FILE_DIR", "sessions")
    COMPANIES_FILE = os.getenv("COMPANIES_FILE", "data/companies.json")
    EVENTS_FILE = os.getenv("EVENTS_FILES", "data/events.json")
    

class DevelopementConfig(Config):
    DEBUG = True
    
    
config = {
    "developement": DevelopementConfig
}