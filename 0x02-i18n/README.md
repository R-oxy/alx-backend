```markdown
# 0x02. i18n

## Resources
Read or watch:
- [Flask-Babel](https://flask-babel.tkte.ch/)
- [Flask i18n tutorial](https://pythonhosted.org/Flask-Babel/)
- [pytz](https://pythonhosted.org/pytz/)

## Learning Objectives
- Learn how to parametrize Flask templates to display different languages
- Learn how to infer the correct locale based on URL parameters, user settings, or request headers
- Learn how to localize timestamps

## Requirements
- All your files will be interpreted/compiled on Ubuntu 18.04 LTS using python3 (version 3.7)
- All your files should end with a new line
- A `README.md` file, at the root of the folder of the project, is mandatory
- Your code should use the `pycodestyle` style (version 2.5)
- The first line of all your files should be exactly `#!/usr/bin/env python3`
- All your `*.py` files should be executable
- All your modules should have a documentation
- All your classes should have a documentation
- All your functions and methods should have a documentation
- A documentation is not a simple word, it’s a real sentence explaining what’s the purpose of the module, class, or method (the length of it will be verified)
- All your functions and coroutines must be type-annotated

## Tasks

### 0. Basic Flask app
First, you will setup a basic Flask app in `0-app.py`. Create a single `/` route and an `index.html` template that simply outputs "Welcome to Holberton" as page title (`<title>`) and "Hello world" as header (`<h1>`).

**File:**
- `0-app.py`
- `templates/0-index.html`

### 1. Basic Babel setup
Install the Babel Flask extension:
```sh
$ pip3 install flask_babel==2.0.0
```

Then instantiate the Babel object in your app. Store it in a module-level variable named `babel`.

Create a `Config` class that has a `LANGUAGES` class attribute equal to `["en", "fr"]`.

Use `Config` to set Babel’s default locale (`"en"`) and timezone (`"UTC"`). Use that class as config for your Flask app.

**File:**
- `1-app.py`
- `templates/1-index.html`

### 2. Get locale from request
Create a `get_locale` function with the `babel.localeselector` decorator. Use `request.accept_languages` to determine the best match with our supported languages.

**File:**
- `2-app.py`
- `templates/2-index.html`

### 3. Parametrize templates
Use the `_` or `gettext` function to parametrize your templates. Use the message IDs `home_title` and `home_header`.

Create a `babel.cfg` file containing:
```ini
[python: **.py]
[jinja2: **/templates/**.html]
extensions=jinja2.ext.autoescape,jinja2.ext.with_
```

Initialize your translations with:
```sh
$ pybabel extract -F babel.cfg -o messages.pot .
```

Create your dictionaries:
```sh
$ pybabel init -i messages.pot -d translations -l en
$ pybabel init -i messages.pot -d translations -l fr
```

Edit files `translations/[en|fr]/LC_MESSAGES/messages.po` to provide the correct value for each message ID for each language.

Compile your dictionaries:
```sh
$ pybabel compile -d translations
```

**File:**
- `3-app.py`
- `babel.cfg`
- `templates/3-index.html`
- `translations/en/LC_MESSAGES/messages.po`
- `translations/fr/LC_MESSAGES/messages.po`
- `translations/en/LC_MESSAGES/messages.mo`
- `translations/fr/LC_MESSAGES/messages.mo`

### 4. Force locale with URL parameter
Implement a way to force a particular locale by passing the `locale=fr` parameter to your app’s URLs.

**File:**
- `4-app.py`
- `templates/4-index.html`

### 5. Mock logging in
Mock a database user table and emulate a login system by passing `login_as` URL parameter containing the user ID to log in as.

Define a `get_user` function and a `before_request` function.

**File:**
- `5-app.py`
- `templates/5-index.html`

### 6. Use user locale
Change your `get_locale` function to use a user’s preferred locale if it is supported.

**File:**
- `6-app.py`
- `templates/6-index.html`

### 7. Infer appropriate time zone
Define a `get_timezone` function and use the `babel.timezoneselector` decorator. Validate the time zone using `pytz.timezone`.

**File:**
- `7-app.py`
- `templates/7-index.html`

### 8. Display the current time
Display the current time on the home page based on the inferred time zone.

**File:**
- `app.py`
- `templates/index.html`
- `translations/en/LC_MESSAGES/messages.po`
- `translations/fr/LC_MESSAGES/messages.po`
