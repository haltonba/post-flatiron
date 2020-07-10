import tweepy
import time

auth = tweepy.OAuthHandler("ZIZxjnN7hHJ0IcTbH7dgbIWYd", "EDmwAtFcEoznThoDQ853Rp7EdsaqN3P182i6TAfRxjLYN5zPtn")
auth.set_access_token("1278782851614474240-fsCDVygn3wteonShU8GjmnEp0HY9jV", "htzP6PBFcLAV87jjioqnwklnWRLrKJFV0r9pifL2hHJO4")

api = tweepy.API(auth)
user = api.me()

def limit_handler(cursor):
    try:
        yield cursor.next()
    except tweepy.RateLimitError:
        time.sleep(1000)

search_string = "python"
number_of_tweets = 2

# Like logic

for tweet in tweepy.Cursor(api.search, search_string).items(number_of_tweets):
    try:
        tweet.favorite()
        print("I liked that tweet")
    except tweepy.TweepError as error:
        print(error.reason)
    except StopIteration:
        break

# Follow logic

# for follower in limit_handler(tweepy.Cursor(api.followers).items()):
#     if follower.name == "Jeff Bagwell":
#         follower.follow()
#         break