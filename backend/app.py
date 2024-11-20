from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'  # Database file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Suppress a warning

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from models.employee import Employee
from models.timesheet import Timesheet
from models.manager import Manager

if __name__ == '__main__':
    app.run(debug=True)
