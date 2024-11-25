from models.employee import Employee
from models.login import Login
from extensions.db_extensions import db
from sqlalchemy.exc import IntegrityError


class EmployeeDao:
    def add_employee(self, login_id, name, email, phone, type, manager_id=None):
        """Add a new employee to the database."""
        try:
            new_employee = Employee(
                name=name,
                email=email,
                phone=phone,
                type=type,
                manager_id=manager_id,  # Optional manager
                login_id=login_id       # Foreign key to Login table
            )
            db.session.add(new_employee)
            db.session.commit()
            return True, f"Employee {name} added successfully!"
        except IntegrityError as e:
            db.session.rollback()
            if "uq_email" in str(e.orig):
                return False, "Error: Email must be unique."
            else:
                print(e)
                return False, "Error: An unknown integrity error occurred."

    def get_all_employees(self):
        """Retrieve all employees from the database."""
        employees = Employee.query.all()
        return [
            {
                "id": emp.id,
                "name": emp.name,
                "email": emp.email,
                "phone": emp.phone,
                "type": emp.type,
                "manager_id": emp.manager_id,
                "login_id": emp.login_id
            }
            for emp in employees
        ]

    def get_employee_by_login_id(self, login_id):
        """Retrieve an employee by their login ID."""
        employee = Employee.query.filter_by(login_id=login_id).first()
        if employee:
            return {
                "id": employee.id,
                "name": employee.name,
                "email": employee.email,
                "phone": employee.phone,
                "type": employee.type,
                "manager_id": employee.manager_id,
                "login_id": employee.login_id
            }
        return None

    def delete_employee(self, employee_id):
        """Delete an employee by their ID."""
        employee = Employee.query.get(employee_id)
        if employee:
            try:
                db.session.delete(employee)
                db.session.commit()
                return True, f"Employee {employee.name} deleted successfully!"
            except Exception as e:
                db.session.rollback()
                return False, f"Error deleting employee: {e}"
        else:
            return False, "Employee not found."