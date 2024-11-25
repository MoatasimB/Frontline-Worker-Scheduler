from daos.managerDao import ManagerDao
from flask import request


class Manager:
    def __init__(self):
        self.managerDao = ManagerDao()

    # def add_manager(self):
    #     response = {"code": 0, "message": "", "status": "fail"}
