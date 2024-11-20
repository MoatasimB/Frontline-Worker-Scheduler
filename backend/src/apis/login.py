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
                self.loginDao.add_user(name, username, email, password)
                response["code"] = 1
                response["message"] = "successfully added user"
                response["status"] = "success"
            except Exception as e:
                response["message"] = f"failed to add user, {e}"
        else:
            response["message"] = "Invalid request body"
        return response


