"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity
from flask_jwt_extended import current_user, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that , came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/sign_up', methods =['POST'])
def create_user():
    email  = request.json.get("email", None)
    name = request.json.get("name", None)
    password = request.json.get("password", None)

    user = User(email=email, name=name, is_active=True)
    
   
    user.set_password(password)

    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity=str(user.id))
    return jsonify(access_token=access_token), 201

@api.route('/sign_in', methods=['POST'])
def generte_token():
    
    email  = request.json.get("email", None)
    password = request.json.get("password", None)
    print ("email", email, password)

    user = User.query.filter_by(email=email).one_or_none()

    if not user or not user.check_password(password):
        return jsonify({"msg": "Wrong username o password"}), 401
    
    print(f"User mail: {user.id}, Type: {type(user.id)}")
    access_token = create_access_token(identity=str(user.id))
    return jsonify(access_token=access_token), 201


@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()  
    user = User.query.get(user_id)  
    print("desde profile", user)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify(user.serialize()), 200


@api.route('/logout', methods=["GET"])
def logout():
     
    response = jsonify({"msg": "Logout exitoso"})
    response.status_code = 200
    response.headers["Cache-Control"] = "no-store"
    response.headers["Pragma"] = "no-cache"
    return response