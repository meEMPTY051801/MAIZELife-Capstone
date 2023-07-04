from unicodedata import name
from flask import Flask
from datetime import datetime

def create_app():


    app = Flask(__name__)

    from .views import views
    app.register_blueprint(views,url_prefix='/',name='Home')
    app.register_blueprint(views,url_prefix='/detect',name='Detect')

    return app
 