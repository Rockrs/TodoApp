import os, json
from flask import Flask, render_template, request, jsonify, make_response
from db_config import COMPLETED_COLLECTION, PENDING_COLLECTION

TEMPLATE_DIR = os.path.abspath('templates')
STATIC_DIR = os.path.abspath('static')

app = Flask(__name__, static_folder=STATIC_DIR, template_folder=TEMPLATE_DIR)

@app.route("/")
def todo_app():
    return render_template('index.html')

#Get All Pending Tasks
@app.route("/get_pending_task", methods = ['GET'])
def get_pending_task():
    data = []
    for doc in PENDING_COLLECTION.find({}):
        data.append(doc['TASK'])
    
    return make_response(jsonify({
        'data' : data
    }), 200)

#Get All Completed Tasks
@app.route("/get_completed_task", methods = ['GET'])
def get_completed_task():
    data = []
    for doc in COMPLETED_COLLECTION.find({}):
        data.append(doc['TASK'])
    
    return make_response(jsonify({
        'data' : data
    }), 200)

#Add task 
@app.route("/add_task", methods = ['POST'])
def add_task():
    req = request.get_json()
    PENDING_COLLECTION.insert_one({'TASK' : req})

    return make_response(jsonify({}), 204)

#Delete Task
@app.route("/delete_task", methods = ['POST'])
def delete_task():
    data = request.get_json()
    PENDING_COLLECTION.delete_one({'TASK': data})
    COMPLETED_COLLECTION.delete_one({'TASK': data})

    return make_response(jsonify({}), 204)

#Complete Task
@app.route("/complete_task", methods = ['POST'])
def complete_task():
    data = request.get_json()
    PENDING_COLLECTION.delete_one({'TASK' :data})
    COMPLETED_COLLECTION.insert_one({'TASK' :data})

    return make_response(jsonify({}), 204)

@app.route("/search_task", methods = ['POST'])
def  search_task():
    data = request.get_json()
    isPending = PENDING_COLLECTION.find_one({'TASK' : data})
    isCompleted = COMPLETED_COLLECTION.find_one({'TASK' : data})

    if isPending is not None or isCompleted is not None:
        return make_response(jsonify({
            "message" : "Task Already Present"
        }), 200)
    else:
        return make_response(jsonify({
            "message" : "Task Ready to be Added"
        }), 200)

if __name__ == "__main__":
    app.run(debug=True)