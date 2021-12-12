from flask import Flask
from flask_cors import CORS
import firebase_admin
import tweepy
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import storage
from flask import request
import requests
import os

app = Flask(__name__)
CORS(app)
auth = tweepy.OAuthHandler("", "")
auth.request_token = { 'oauth_token' : "",
                         'oauth_token_secret' : "" }


auth.set_access_token("","")
api = tweepy.API(auth)



cred = credentials.Certificate('./config.json')
firebase_admin.initialize_app(
    cred,
    {
        "databaseURL": "",
        'storageBucket': ''
    },
)
ref = db.reference('/botSettings')


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
@app.route('/tweet')
def tweet():
    imageURL= request.args.get('imageURL',type=str)
    imgRequest = requests.get(imageURL,stream=True)
    tweetData = ref.get()
    if imgRequest.status_code == 200:
        with open('image.jpg','wb') as image:
            for chunk in imgRequest:
                image.write(chunk)    
        api.update_status_with_media(filename='image.jpg', status=tweetData['text'].format(tweetData['dayCount']))
        os.remove('image.jpg')
    return 'sa'