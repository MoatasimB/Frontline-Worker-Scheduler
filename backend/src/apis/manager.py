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

    def delete_manager(self):
        response = {"code": 0, "message": "", "status": "fail", "is_deleted": False}
        data = request.get_json()
        if 'name' in data:
            user_is_deleted = self.managerDao.delete_manager(data['name'])
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