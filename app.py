import json

from flask import Flask, render_template, request, url_for, redirect, flash, session
from werkzeug.security import check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = 'change_me_for_prod'


@app.route('/')
def index():
    # replace with web3 call
    games = {}
    return render_template('home.html', games=games)


@app.get('/set_wallet/<wallet_address>')
def set_wallet_session(wallet_address):
    session['wallet_address'] = wallet_address
    return 'OK'


@app.post('/add_game/')
def add_game():
    result = 'OK'
    try:
        wallet_address = request.form.get('wallet_address')
        tx = request.form.get('tx')
        print(wallet_address, tx)
        # replace with web3 call
        #add_game = add_game_data(wallet_address, tx)
        if not add_game:
            result = 'FAIL'
    except Exception as ex:
        print('Exception while adding game ' + ex)
        result = 'FAIL'
    finally:
        return result


@app.get('/current/')
def current():
    # replace with web3 call
    games = {}
    return render_template('current.html', games=games)


@app.get('/history/')
def history():
    # replace with web3 call
    games = {}
    return render_template('history.html', games=games)


@app.get('/about/')
def about():
    # replace with web3 call
    return render_template('about.html')


if __name__ == '__main__':
    app.run(debug=True)
