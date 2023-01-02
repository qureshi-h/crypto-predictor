import sys
import json
import uuid

sys.path.insert(1, "../data")
sys.path.insert(1, "../analysis")

from gather_data import gather_data
from EMA import EMA


WINDOWS = [5, 10, 25, 50, 100, 200]

coin = sys.argv[1]
granularity = int(sys.argv[2])
start_time = round(int(sys.argv[3]) / 1000) # gather data requires unix in seconds
end_time = round(int(sys.argv[4]) / 1000)

data = gather_data(coin, "USD", granularity, start_time, end_time)

output = dict()

output["EMA"] = EMA(data["close"], WINDOWS)

print(json.dumps(output))
