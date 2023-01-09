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
DIRECTORY = f"./plots/{uuid.uuid4()}-"

coin = sys.argv[1]
granularity = int(sys.argv[2])
start_time = round(int(sys.argv[3]) / 1000) # gather data requires unix in seconds
end_time = round(int(sys.argv[4]) / 1000)
threshold_x = float(sys.argv[4])
threshold_y = float(sys.argv[5])

data = gather_data(coin, "USD", granularity, start_time, end_time)

output = dict()

output["SMA"] = SMA(data["close"], WINDOWS)
output["EMA"] = EMA(data["close"], WINDOWS)

find_support_resistance(data["close"], threshold_x, threshold_y, DIRECTORY)
output["support_resistance"] = {"historical": f'{DIRECTORY}historical', 
                                "levels": f'{DIRECTORY}levels', 
                                "trendline": f'{DIRECTORY}trendline', 
                                "optimised_historical": f'{DIRECTORY}optimised-historical', 
                                "optimised_levels": f'{DIRECTORY}optimised-levels', 
                                "optimised_trendline": f'{DIRECTORY}optimised-trendline'}

print(json.dumps(output))
