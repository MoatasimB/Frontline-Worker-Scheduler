from flask import Blueprint, jsonify, request
from src.apis.login import Login

routes = Blueprint('routes', __name__)

login = Login()

@routes.route('/add_user', methods=['POST'])
def add_user():
    """Route to add a new employee."""
    return jsonify(login.add_user())
