from flask import Blueprint, request, jsonify
from repository.event_repository import EventRepository
from services.event_service import EventService
from validations.event_validation import EventValidation

event_bp = Blueprint("event", __name__)

@event_bp.route("/", methods=["GET"])
def get_all_events():
    events = EventRepository.load_events()
    return jsonify(events), 200

@event_bp.route("/<event_id>", methods=["GET"])
def get_event_by_id(event_id):
    event = EventService.get_event_by_id(event_id)
    if event:
        return jsonify(event), 200
    else:
        return jsonify({"error": {"Event not found": event_id}}), 404