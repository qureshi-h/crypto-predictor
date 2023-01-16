import sys
import json
import uuid

sys.path.insert(1, "../data")
sys.path.insert(1, "../analysis")

from gather_data import gather_data
from EMA import EMA
from SMA import SMA
from support_resistance_finder import find_support_resistance


WINDOWS = [5, 10, 25, 50, 100, 200]
ID = str(uuid.uuid4())
DIRECTORY = f"./plots/{ID}-"

coin = sys.argv[1]
granularity = int(sys.argv[2])
start_time = round(int(sys.argv[3]) / 1000) # gather data requires unix in seconds
end_time = round(int(sys.argv[4]) / 1000)
threshold_x = float(sys.argv[5])
threshold_y = float(sys.argv[6])

output = dict()
output["id"] = ID

data = gather_data(coin, "USD", granularity, start_time, end_time)
data.to_csv(f"{DIRECTORY}.csv", index=False)

output["SMA"] = SMA(data["close"], WINDOWS)
output["EMA"] = EMA(data["close"], WINDOWS)

find_support_resistance(data["close"], threshold_x, threshold_y, f'{DIRECTORY}')
output["support_resistance"] = [f'{DIRECTORY[2:]}historical.png', 
                                f'{DIRECTORY[2:]}levels.png', 
                                f'{DIRECTORY[2:]}trendline.png', 
                                f'{DIRECTORY[2:]}both.png', 
                                f'{DIRECTORY[2:]}optimised-historical.png', 
                                f'{DIRECTORY[2:]}optimised-levels.png', 
                                f'{DIRECTORY[2:]}optimised-trendline.png',
                                f'{DIRECTORY[2:]}optimised-both.png']


print(json.dumps(output))
