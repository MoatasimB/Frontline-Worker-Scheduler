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
                    weeks = item.get('weeks')
                    if month and weeks:
                        week_vals = {"1": None, "2": None, "3": None, "4": None}
                        curr =  {"Sun":"0", "Mon":"0", "Tues":"0", "Wed":"0", "Thurs":"0", "Fri":"0", "Sat":"0"}
                        for key,days in weeks.items():
                            for day in days:
                                curr[day] = "1"
                            curr_str = json.dumps(curr)
                            week_vals[key] = curr_str
                        added_timesheet, message = self.timesheetDao.add_timesheet(
                            year = year,
                            month=month,
                            week1=week_vals["1"],
                            week2=week_vals["2"],
                            week3=week_vals["3"],
                            week4=week_vals["4"],
                            employee_id=employee_id
                        )

                        if added_timesheet:
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


