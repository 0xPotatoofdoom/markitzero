A simple web3 enabled webapp for keeping score between multiple wallets.


Requirements:

  python3
  
  flask
  
  web3
  
  wheel
  
  gunicorn*


Steps to deploy locally.

git clone https://github.com/0xPotatoofdoom/markitzero.git

cd markitzero

python3 -m venv markitzeroenv

source markitzeroenv/bin/activate

pip install flask wheel web3

python3 app.py


open a broswer and navigate to http://127.0.0.1:5000
