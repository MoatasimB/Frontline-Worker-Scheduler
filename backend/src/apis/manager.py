from daos.managerDao import ManagerDao
from flask import request


class Manager:
    def __init__(self):
        self.managerDao = ManagerDao()

    def add_manager(self):
        response = {"code": 0, "message": "", "status": "fail"}
        data = request.get_json()

        if 'name' in data  and 'email' in data and 'phone' in data and 'type' in data:
            name = data['name']
            email = data['email']
            phone = data['phone']
            type = data['type']  # Staff or Manager

            try:
                man_is_added, message = self.managerDao.add_manager(name, email, phone, type)
                if man_is_added:
                    response["code"] = 1
                    response["message"] = message
                    response["status"] = "success"
                else:
                    response["code"] = 1
                    response["message"] = message
                    response["status"] = "fail"
            except Exception as e:
                response["message"] = f"failed to add user, {e}"

        else:
            response["message"] = "Invalid request body"

        return response


    def get_all_managers(self):
        response = {"code": 0, "message": "", "status": "fail", "users": []}
        try:
            managers = self.managerDao.get_all_managers()
            response["code"] = 1
            response["managers"] = managers
            response["message"] = "successfully retrieved all users"
            response["status"] = "success"
        except Exception as e:
            response["message"] = f"failed to add user, {e}"
        return response