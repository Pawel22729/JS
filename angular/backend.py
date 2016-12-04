#!/usr/bin/python

from flask import Flask, request, render_template, jsonify, abort, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

class Schop(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product = db.Column(db.String(100), unique=True)
    ammount = db.Column(db.Integer)
    
    def __init__(self, product, ammount):
	self.product = product
	self.ammount = ammount

def get_all_prod():
    produs = Schop.query.all()
    results = []
    for p in produs:
        results.append({
                "id": p.id,
                "product": p.product,
                "ammount": p.ammount
                })
    return results

@app.route('/')
def index():
    return "Main Page!"

@app.route('/products/', methods=['GET'])
@cross_origin()
def get_products():
    produs = get_all_prod()
    return jsonify({'products': produs})

@app.route('/products/', methods=['POST'])
def create_product():
    if not request.json or not 'product' in request.json:
	abort(404)
    produs = get_all_prod()
    product = Schop(request.json['product'], request.json['ammount'])
    db.session.add(product)
    db.session.commit()
    return jsonify({'Message': 'added'})

@app.route('/products/get/<int:task_id>', methods=['GET'])
def get_task(task_id):
    produs = Schop.query.all()
    p = [p for p in produs if p.id == task_id]
    if len(p) == 0:
	abort(404)
    return jsonify({
        "id": p[0].id,
        "product": p[0].product,
        "ammount": p[0].ammount
	})

@app.errorhandler(404)
def not_found(e):
    return make_response(jsonify({'Error': 'Not found'}), 404)

if __name__ == "__main__":
    app.run(debug=True)
