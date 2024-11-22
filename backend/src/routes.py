from flask import Blueprint, jsonify, request
from src.apis.login import Login

routes = Blueprint('routes', __name__)

login = Login()

@routes.route('/add_user', methods=['POST'])
def add_user():
    """Route to add a new employee."""
    return jsonify(login.add_user())

@routes.route('/get_all_users', methods=['GET'])
def get_all_users():
    """Route to add a new employee."""
    return jsonify(login.get_all_users())

@routes.route('/validate_user', methods=['POST'])
def validate_user():
    return jsonify(login.validate_user())

@routes.route('/delete_user', methods=['DELETE'])
def delete_user():
    return jsonify(login.delete_user())