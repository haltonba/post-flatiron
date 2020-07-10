import requests
from bs4 import BeautifulSoup
import pprint

response = requests.get(("https://news.ycombinator.com/news"))
response2 = requests.get(("https://news.ycombinator.com/news?p=2"))
soup = BeautifulSoup(response.text, "html.parser")
soup2 = BeautifulSoup(response2.text, "html.parser")
links = soup.select(".storylink") + soup2.select(".storylink")
subtext = soup.select(".subtext") + soup2.select(".subtext")

def sort_stories_by_votes(stories_list):
    return sorted(stories_list, key= lambda key: key["votes"], reverse= True)

def create_custom_hn(links, votes):
    hn = []
    for i, item in enumerate(links):
        title = item.getText()
        href = item.get("href", None)
        vote = subtext[i].select(".score")
        if len(vote):
            points = int(votes[i].getText().split(" ")[0])
            if points > 99:
                hn.append({"title": title, "link": href, "votes": points})
    return sort_stories_by_votes(hn)

pprint.pprint(create_custom_hn(links, subtext))

