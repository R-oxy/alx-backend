#!/usr/bin/env python3
"""
Route module for the API - Infer appropriate time zone
"""

from flask import Flask, request, render_template, g
from flask_babel import Babel, format_datetime, gettext as _
from os import getenv
from pytz import timezone, exceptions
from datetime import datetime
from typing import Union, Optional

users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}

app = Flask(__name__)
babel = Babel(app)

class Config:
    """Babel configuration"""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'

app.config.from_object('app.Config')

@app.route('/')
def index():
    """Render the index page"""
    current_time = format_datetime(datetime.now(get_timezone()))
    return render_template('index.html', current_time=current_time)

@babel.localeselector
def get_locale():
    """Determine the best match with our supported languages"""
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale
    if g.user and g.user['locale'] in app.config['LANGUAGES']:
        return g.user['locale']
    return request.accept_languages.best_match(app.config['LANGUAGES'])

def get_user():
    """Retrieve a user dictionary by ID"""
    try:
        user_id = int(request.args.get('login_as'))
        return users.get(user_id)
    except (TypeError, ValueError):
        return None

@app.before_request
def before_request():
    """Executed before each request"""
    g.user = get_user()

@babel.timezoneselector
def get_timezone():
    """Determine the appropriate timezone"""
    tz_param = request.args.get('timezone')
    try:
        if tz_param:
            return timezone(tz_param)
        if g.user and g.user['timezone']:
            return timezone(g.user['timezone'])
    except exceptions.UnknownTimeZoneError:
        pass
    return timezone(app.config['BABEL_DEFAULT_TIMEZONE'])

if __name__ == "__main__":
    host = getenv("API_HOST", "0.0.0.0")
    port = getenv("API_PORT", "5000")
    app.run(host=host, port=port)
