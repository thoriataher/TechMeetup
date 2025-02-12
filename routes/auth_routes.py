from flask import Blueprint, request, jsonify, session 
from auth.auth_service import AuthService
from utils.security import SecurityUtils

auth_bp = Blueprint("auth", __name__, url_prefix="/")

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    required_fields = ["name", "email", "logo_url", "password"]
    
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"{field} is required"}), 400
    
    response, status = AuthService.register_company(
        name=data["name"],
        email=data["email"],
        password=data["password"],
        logo_url=data["logo_url"],
    )
    return jsonify(response), status

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    response, status = AuthService.login_company(email, password)
    return jsonify(response), status

@auth_bp.route("/logout", methods=["POST"])
def logout():
    SecurityUtils.logout_user()
    return {"message": "User logout successfully"}, 200