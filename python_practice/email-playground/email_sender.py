import smtplib
from email.message import EmailMessage
from string import Template
from pathlib import Path

html = Template(Path("index.html").read_text())
email = EmailMessage()

email["from"] = "Scott Bagley"
email["to"] = "hkaja42@gmail.com"
email["subject"] = "I love whooo??!"

email.set_content(html.substitute({"name": "TinTin"}), "html")

with smtplib.SMTP(host="smtp.gmail.com", port=587) as smtp:
    smtp.ehlo()
    smtp.starttls()
    smtp.login("haltonba94@gmail.com", "Dugan12345")
    smtp.send_message(email)
    print("Werkd")


