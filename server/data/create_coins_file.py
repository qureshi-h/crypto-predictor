import json

allCoins = open("allCoins.json")

data = json.load(allCoins)["data"]
data = sorted(data, key=lambda x:x["name"])

data = {coin["name"]: coin["code"] for coin in data}

out = open("coins.json", "w")
json.dump(data, out)

allCoins.close()
out.close()