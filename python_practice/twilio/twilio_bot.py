from twilio.rest import Client 
 
account_sid = 'AC3b152a1273ea95dc1225dd1dc760c53b' 
auth_token = 'eb69262e5e6850da3d9510dcca42b210' 
client = Client(account_sid, auth_token) 
 
message = client.messages.create( 
    from_='+12058597243',        
    to='+16467121684',
    body="Milly rok" 
)
 
print(message.sid)