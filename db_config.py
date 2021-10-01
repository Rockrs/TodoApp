import ssl
from pymongo import MongoClient

CONN_STRING = 'mongodb://127.0.0.1:27017'

class MongoCollections:    
    @classmethod
    def get_db_object(cls):
        return MongoClient(CONN_STRING)['Todo-db']

    @classmethod
    def get_pending_task_collection(cls):
        return cls.get_db_object()['pending_collection']
        
PENDING_COLLECTION = MongoCollections.get_pending_task_collection()