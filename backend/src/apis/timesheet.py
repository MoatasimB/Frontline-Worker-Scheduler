from warnings import catch_warnings

from daos.timesheetDao import TimesheetDao
from flask import request
import json

# {
#     id: "",
#     dates: [
#         {
#             month: "January",
#             weeks: {
#                 "1": [1, 2, 3, 4],
#                 "2"
#             }
#         },
#         {
#             month: "Feburary",
#             weeks: {
#                 "1": [1, 2, 3, 4],
#                 "2"
#             }
#         }
#     ]
#
# }
class Timesheet:
    def __init__(self):
        self.timesheetDao = TimesheetDao()

    def add_timesheet(self):
        response = {"code": 0, "message": "", "status": "fail"}
        data = request.get_json()

        if 'employee_id' in data and 'dates' in data:
            employee_id = data['employee_id']
            try:
                for item in data['dates']:
                    year = item.get('year')
                    month = item.get('month')
                    selected_days = item.get('selected_days')
                    if year and month and selected_days:
                        # week_vals = {"1": None, "2": None, "3": None, "4": None}
                        # curr =  {"Sun":"0", "Mon":"0", "Tues":"0", "Wed":"0", "Thurs":"0", "Fri":"0", "Sat":"0"}
                        # for key,days in weeks.items():
                        #     for day in days:
                        #         curr[day] = "1"
                        #     curr_str = json.dumps(curr)
                        #     week_vals[key] = curr_str
                        added_timesheet, message = self.timesheetDao.add_timesheet(
                            year = year,
                            month=month.title(),
                            selected_days = json.dumps(selected_days),
                            employee_id=employee_id
                        )

                        if added_timesheet:
                            response["code"] = 1
                            response["message"] = message
                            response["status"] = "success"
                        else:
                            response["code"] = 0
                            response["message"] = message
                            response["status"] = "fail"
            except Exception as e:
                response["message"] = f"failed to add user, {e}"

        else:
            response["message"] = "Invalid request body"

        return response

    def get_timesheet(self):
        response = {"code": 0, "message": "", "status": "fail", "ts": None}
        data = request.get_json()
        if 'employee_id' in data and 'month' in data and 'year' in data:
            try:
                ts = self.timesheetDao.get_timesheet(data['employee_id'], data['month'], data['year'])
                response = {"code": 1, "message": "Retrieved TimeSheet", "status": "success", "ts": ts}
            except Exception as e:
                response["message"] = f"failed to get timesheet, {e}"
        else:
            response["message"] = "Invalid request body"
        return response

    def update_timesheet(self):
        response = {"code": 0, "message": "", "status": "fail"}
        data = request.get_json()

        if 'employee_id' in data and 'dates' in data:
            employee_id = data['employee_id']
            try:
                for item in data['dates']:
                    year = item.get('year')
                    month = item.get('month')
                    selected_days = item.get('selected_days')
                    if year and month and selected_days:
                        # curr = {"Sun": "0", "Mon": "0", "Tues": "0", "Wed": "0", "Thurs": "0", "Fri": "0", "Sat": "0"}
                        # week_vals = {"1": json.dumps(curr), "2": json.dumps(curr), "3": json.dumps(curr), "4": json.dumps(curr)}
                        # for key, days in weeks.items():
                        #     for day in days:
                        #         curr[day] = "1"
                        #     curr_str = json.dumps(curr)
                        #     week_vals[key] = curr_str
                        updated_timesheet, message = self.timesheetDao.update_timesheet(
                            year=year,
                            month=month,
                            selected_days=json.dumps(selected_days),
                            employee_id=employee_id
                        )

                        if updated_timesheet:
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

    def delete_timesheet(self):
        response = {"code": 0, "message": "", "status": "fail"}
        data = request.get_json()
        if 'employee_id' in data and 'month' in data and 'year' in data:
            try:
                deleted_timesheet, message = self.timesheetDao.delete_timesheet(employee_id=data['employee_id'], month=data['month'], year=data['year'])

                if deleted_timesheet:
                    response["code"] = 1
                    response["message"] = message
                    response["status"] = "success"
                else:
                    response["code"] = 0
                    response["message"] = message
                    response["status"] = "fail"
            except Exception as e:
                response["message"] = f"failed to delete timesheet, {e}"
        else:
            response["message"] = "Invalid request body"

        return response
