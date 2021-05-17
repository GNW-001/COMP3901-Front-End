import os
from flask import Flask

class Config(object):
    """Base Config Object"""
    DEBUG = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'Som3$ec5etK*y'
    SQLALCHEMY_DATABASE_URI = 'postgresql://comp3901:dbtest@localhost/comp3901test'
    SQLALCHEMY_TRACK_MODIFICATIONS = False # This is just here to suppress a warning from SQLAlchemy as it will soon be removed

    UPLOAD_FOLDER = './uploads'

    app = Flask(__name__)

    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.config.from_object(__name__)
    filefolder = app.config['UPLOAD_FOLDER']


class DevelopmentConfig(Config):
    """Development Config that extends the Base Config Object"""
    DEVELOPMENT = True
    DEBUG = True

class ProductionConfig(Config):
    """Production Config that extends the Base Config Object"""
    DEBUG = False