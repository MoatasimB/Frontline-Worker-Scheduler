from flask import Blueprint, jsonify, request
from src.apis.login import Login

from src.apis.manager import Manager

from src.apis.timesheet import Timesheet

routes = Blueprint('routes', __name__)

login = Login()
manager = Manager()
timesheet = Timesheet()

@routes.route('/test', methods=['GET'])
def test_route():
    return jsonify({"message": "Test route works!"})

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


@routes.route('/add_manager', methods=['POST'])
def add_manager():
    """Route to add a new manager."""
    return jsonify(manager.add_manager())


@routes.route('/get_all_managers', methods=['GET'])
def get_all_managers():
    """Route to add a new employee."""
    return jsonify(manager.get_all_managers())

@routes.route('/delete_manager', methods=['DELETE'])
def delete_manager():
    return jsonify(manager.delete_manager())

@routes.route('/add_timesheet', methods=['POST'])
def add_timesheet():
    return jsonify(timesheet.add_timesheet())

@routes.route('/get_timesheet', methods=['GET'])
def get_timesheet():
    return jsonify(timesheet.get_timesheet())

@routes.route('/update_timesheet', methods=['POST'])
def update_timesheet():
    return jsonify(timesheet.update_timesheet())

@routes.route('/delete_timesheet', methods=['DELETE'])
def delete_timesheet():
    return jsonify(timesheet.delete_timesheet())