# TechMeetup – Event Management Platform  

TechMeetup is a **web app for managing and discovering tech events**, where users can **create, update, and track events effortlessly**.  

---

## Features  
- Browse and discover upcoming tech meetups.  
- Create and manage events.  
- Interactive event dashboard with **real-time updates**.  

---

## Tech Stack  
- **Backend**: Flask  
- **Frontend**: HTML, CSS, JavaScript  
- **Database**: JSON files  
- **Authentication**: Flask Sessions

---

## New Feature  
**"Interactive reservation system for users to reserve ."**  

---

## Prerequisites  
Ensure you have the following installed:  
- Python (>=3.x)  
- Flask (`pip install flask`)  

---

## Project Checklist  
- Hosted on **GitHub**  
- Uses the **Flask** web framework  
- Implements **user authentication** using Flask Blueprints  
- Utilizes **JavaScript** for interactive UI components  
- Stores and manages event data using **JSON files**  
- Provides **real-time event updates** on the dashboard  

## Modules used:
- os ⁠ For interacting with the operating system (e.g., file paths, environment variables).  
- ⁠ functools ⁠ – Provides utilities like ⁠ wraps ⁠ for decorators.  
- ⁠ re ⁠ – Handles regular expressions for pattern matching.  
- ⁠ datetime ⁠ – Manages time-related functions (e.g., ⁠ timedelta ⁠).  
- ⁠ json ⁠ – Works with JSON data.  

It contains *conditional statements*.
    if not event:
            return {"error": {"Event not found": event_id}}
    else:
        updated_event = updated_data
        updated_events= EventRepository.update_event(event_id, updated_event)
        eturn updated_events if not updated_events['error'] else {"error": {"Failed to update the event": event_id}}, 500

It contains *loops*.
    return [event for event in events if event["company_id"] == company_id]

It lets the user enter a value in a *text box*, which is processed by the backend Python code.  
•⁠  It handles *incorrect user input gracefully* without generating error messages.  
•⁠   It is styled using *custom CSS*.  
•⁠   The code follows *best practices*:  
  - Well-commented  
  - No unused or experimental code  
  - Uses *proper logging* instead of ⁠ print() ⁠ or ⁠ console.log() ⁠ for debugging  
•⁠ All exercises have been *completed* as per the requirements and *pushed* to the respective GitHub repository.
## Project Structure  
TechMeetup/
├── static/
│   ├── css/
│   │   ├── styles.css
│   ├── js/
│   │   ├── dashboard.js
│   │   ├── home.js
│   │   ├── analytics.js
├── templates/
│   ├── index.html
│   ├── dashboard.html
│   ├── login.html
│   ├── register.html
├── data/
│   ├── events.json    # Stores event data
│   ├── users.json     # Stores user authentication data
├── auth/
│   ├── __init__.py
│   ├── routes.py      # Handles authentication routes
├── utils/
│   ├── helpers.py     # Utility functions (e.g., validation, date formatting)
├── app.py             # Main application file
├── config.py          # Configuration settings
├── requirements.txt   # Dependencies
├── README.md          # Project documentation



