from __future__ import print_function
from sib_api_v3_sdk.rest import ApiException
from pprint import pprint
import smtplib, ssl
import time
import sib_api_v3_sdk
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart




sendinblueapikey="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"
configuration = sib_api_v3_sdk.Configuration()
configuration.api_key['api-key'] = sendinblueapikey

sender_email = "christiancomia051801@gmail.com"
receiver_email = "MAIZELife777@gmail.com"
password = "ml0510x22"




class emailservice():
    def send_email(self, first_name,last_name,email,message_content):
        html='''<html>
                <body>
                    <p> We Receive a message from  
            
            <br/>
            Name: ''' +  first_name + ' ' + last_name + '''
            <br/>
            Email: ''' +  email + '''
            <br/>
            <br/>
            Message: ''' + message_content + '''
            <br/>
            <br/>
            Good Day,
            <br/> 
            Maize
            
            </p>
                </body>
            </html>'''


        api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))
        send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(to=[{"email": receiver_email,"name":"Maize Life Admin"}],html_content=html, sender={"name":"MAIZE Life","email":sender_email}, subject="Notification from Maize life website") # SendSmtpEmail | Values to send a transactional email

        try:
            # Send a transactional email
            api_response = api_instance.send_transac_email(send_smtp_email)
            pprint(api_response)
        except ApiException as e:
            print("Exception when calling SMTPApi->send_transac_email: %s\n" % e)

