from flask import Blueprint, request, jsonify, session
from repository.company_repository import CompanyRepository
from repository.event_repository import EventRepository
from services.company_service import CompanyService
from services.event_service import EventService

company_bp = Blueprint("company", __name__)

@company_bp.route("/<company_id>/events", methods=["POST"])
def create_event(company_id):    
    data = request.get_json()
    required_fields = ["title", "description", "location", "date_time", "logoUrl", "eventType"]
    
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"{field} is required"}), 400
    
    if EventRepository.event_exist(data["title"], data["date_time"]):
        return jsonify({"error": {"Event already exists": f"{data['title']} at {data['date_time']}"}}), 409
    
    new_event = EventService.create_event(company_id, data)

    return jsonify(new_event), 201

@company_bp.route("/<company_id>/events", methods=["GET"])
def get_company_events(company_id):
    events = EventService.get_events_by_company_id(company_id)
    if events is not None:
        return jsonify(events), 200
    else:
        return jsonify({"error": "No events found for this company"}), 404
    

@company_bp.route("/<company_id>/events/<event_id>", methods=["PUT"])
def update_company_events(company_id, event_id):
    data = request.get_json()
    updated_event = EventService.update_event(event_id, data)
    
    if updated_event:
        return jsonify({"message": "Event updated successfully", "event": updated_event}), 200
    return jsonify({"error": "Failed to update event"}), 500

@company_bp.route("/<company_id>/events/<event_id>", methods=["DELETE"])
def delete_company_event(company_id, event_id):
    if EventService.delete_event(event_id):
        return jsonify({"message": "Event deleted successfully."}), 200
    return jsonify({"error": "Failed to delete the event"}), 500