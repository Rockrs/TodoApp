import os, json
from flask import Flask, render_template, request, jsonify, make_response
from db_config import PENDING_COLLECTION

TEMPLATE_DIR = os.path.abspath('templates')
STATIC_DIR = os.path.abspath('static')

app = Flask(__name__, static_folder=STATIC_DIR, template_folder=TEMPLATE_DIR)

@app.route("/")
def todo_app():
    return render_template('index.html')

@app.route("/add_task", methods = ['POST'])
def add_tasks():
    req = request.get_json()
    isPending = PENDING_COLLECTION.find_one({'TASK' : req})

    if isPending is not None:
        print ("This Task is already Present in TODO list")
    else:
        PENDING_COLLECTION.insert_one({'TASK' : req})

    res = make_response(jsonify({
        "message": "Json received"
    }), 201)

    return res

@app.route("/get-pending-task", methods = ['GET'])
def getpending_tasks():
    data = []
    for doc in PENDING_COLLECTION.find({}):
        data.append(doc['TASK'])
    return jsonify({'data':data})

@app.route("/delete_task", methods = ['POST'])
def delete_tasks():
    data = request.get_json()
    for del_task in data:
        PENDING_COLLECTION.delete_one({'TASK': del_task})
    
    res = make_response(jsonify({
        "message": "Json received"
    }), 201)

    return res

if __name__ == "__main__":
    app.run(debug=True)