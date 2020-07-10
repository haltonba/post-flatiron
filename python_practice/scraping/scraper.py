import requests
from bs4 import BeautifulSoup
from twilio.rest import Client
from subprocess import call
import time
import os
from apscheduler.schedulers.background import BackgroundScheduler

def scrape():
    response = requests.get(("https://gotrax.com/collections/electric-scooters"))
    soup = BeautifulSoup(response.text, "html.parser")
    return len(soup.findAll("a", {"class": "btn-shop btn-sold-out"}))

def twilio_login():
    account_sid = 'AC3b152a1273ea95dc1225dd1dc760c53b' 
    auth_token = 'eb69262e5e6850da3d9510dcca42b210' 
    return Client(account_sid, auth_token)

def gotrax():    
    client = twilio_login()
    sold_out_count = scrape()

    if sold_out_count < 6:
        client.messages.create( 
        from_='+12058597243',        
        to='+16467121684',
        body="Order now!" 
    )
    else:
        client.messages.create( 
        from_='+12058597243',        
        to='+16467121684',
        body="Not yet!" 
    )

if __name__ == '__main__':
    scheduler = BackgroundScheduler()
    scheduler.add_job(gotrax, 'interval', seconds=3)
    scheduler.start()
    print('Press Ctrl+{0} to exit'.format('Break' if os.name == 'nt' else 'C'))

    try:
        # This is here to simulate application activity (which keeps the main thread alive).
        while True:
            time.sleep(5)
    except (KeyboardInterrupt, SystemExit):
        # Not strictly necessary if daemonic mode is enabled but should be done if possible
        scheduler.shutdown()