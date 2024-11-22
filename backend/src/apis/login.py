from daos.loginDao import LoginDao
from flask import request

class Login:
    def __init__(self):
        self.loginDao = LoginDao()
    def add_user(self):
        response = {"code": 0, "message": "", "status": "fail"}
        data = request.get_json()
        if 'name' in data and 'username' in data and 'email' in data and 'password' in data:
            name = data['name']
            email = data['email']
            username = data['username']
            password = data['password']
            try:
                user_is_added, message = self.loginDao.add_user(name, username, email, password)
                if user_is_added:
                    response["code"] = 1
                    response["message"] = message
                    response["status"] = "success"
                else:
                    response["code"] = 1
                    response["message"] = message
                    response["status"] = "success"
            except Exception as e:
                response["message"] = f"failed to add user, {e}"
        else:
            response["message"] = "Invalid request body"
        return response

    def get_all_users(self):
        response = {"code": 0, "message": "", "status": "fail", "users": []}
        try:
            users = self.loginDao.get_all_users()
            response["code"] = 1
            response["users"] = users
            response["message"] = "successfully retrieved all users"
            response["status"] = "success"
        except Exception as e:
            response["message"] = f"failed to add user, {e}"
        return response

    def validate_user(self):
        response = {"code": 0, "message": "", "status": "fail", "user": None, "is_valid": False}
        data = request.get_json()
        if 'username' in data and 'password' in data:
            try:
                user_is_valid = self.loginDao.validate_login(data['username'], data['password'])
                if user_is_valid:
                    response["code"] = 1
                    response["message"] = "successfully validated user"
                    response["status"] = "success"
                    response["user"] = user_is_valid
                    response["is_valid"] = True
                else:
                    response["code"] = 1
                    response["message"] = "username or password is invalid"
                    response["status"] = "success"
                    response["is_valid"] = False
            except Exception as e:
                response["message"] = f"failed to validate user, {e}"
        else:
            response["message"] = "Invalid request body"
        return response

    def delete_user(self):
        response = {"code": 0, "message": "", "status": "fail", "is_deleted": False}
        data = request.get_json()
        if 'username' in data:
            user_is_deleted = self.loginDao.delete_user(data['username'])
            if user_is_deleted:
                response["code"] = 1
                response["message"] = "successfully deleted user"
                response["status"] = "success"
                response["is_deleted"] = user_is_deleted
            else:
                response["code"] = 1
                response["message"] = "failed to delete user"
                response["status"] = "fail"
                response["is_deleted"] = user_is_deleted
        else:
            response["message"] = "Invalid request body"
        return response


