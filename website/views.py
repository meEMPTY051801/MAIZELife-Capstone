
import base64
import imp
import json
from website.service.dieses_predictor import dieses_predictor
from website.service.emailservice import emailservice
from flask import Blueprint, render_template, request, jsonify


views = Blueprint('views',__name__)

@views.route('/',methods=['GET','POST'])
def home():
 
    return render_template("home.html",name = 'Home')


@views.route('/detect',methods=['GET','POST'])
def detect():
    predict = dieses_predictor()
    if request.method == 'POST':
        if 'corn_image' not in request.files:
            return "ERROR"
        else:
            f = request.files['corn_image']
            f.save(f.filename)      
            dieses = predict.predict_dieses(f.filename)
            return render_template("detect.html",name = "Detect", dieses = dieses)
    return render_template("detect.html", name = "Detect")



@views.route('/library',methods=['GET','POST'])
def library():

    return render_template("library.html")


@views.route('/detect_async',methods=['POST'])
def detect_async():
    predict = dieses_predictor()
    if request.method == 'POST':
        req = request.json
        if req['image'] is None:
            return "ERROR"
        else:
            base64_img_bytes = req['image'].encode('utf-8')
            with open(req['filename'], 'wb') as file_to_save:
                decoded_image_data = base64.decodebytes(base64_img_bytes)
                file_to_save.write(decoded_image_data)
            dieses = predict.predict_dieses( req['filename'])
        return  jsonify({'dieses' : dieses})


@views.route('/contact_us',methods=['GET','POST'])
def contact_us():
    if request.method == 'POST':
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        emailsender = emailservice()
        emailsender.send_email(last_name=last_name,first_name=first_name,email=email,message_content=message)
        return render_template("contact_us.html", name = "Contact Us" , showSuccess = True)
    return render_template("contact_us.html", name = "Contact Us", showSuccess = False)

@views.route('/planting_teq',methods=['GET'])
def panting_teq():
    return render_template("planting_teq.html", name = "Planting Techiniques")

@views.route('/diseases',methods=['GET'])
def corn_diseases():
    return render_template("diseases.html", name = "Corn Diseases")

@views.route('/pests',methods=['GET'])
def pests():
    return render_template("pests.html", name = "Pests of Corn")