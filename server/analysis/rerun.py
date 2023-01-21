import sys
import json
import uuid


sys.path.insert(1, "./data")
sys.path.insert(1, "./analysis")

from support_resistance_finder import find_support_resistance
import pandas as pd

id = sys.argv[1]

threshold_x = float(sys.argv[2])
threshold_y = float(sys.argv[3])

DIRECTORY = f"./plots/{id}-"

data = pd.read_csv(f"{DIRECTORY}.csv", header=0)

new_id = str(uuid.uuid4())
new_directory = f"./plots/{new_id}-"

find_support_resistance(data["close"], threshold_x, threshold_y, f'{new_directory}')

output =  [[f'{new_directory[2:]}historical.png', 
                                f'{new_directory[2:]}levels.png', 
                                f'{new_directory[2:]}trendline.png', 
                                f'{new_directory[2:]}both.png', 
                                f'{new_directory[2:]}optimised-historical.png', 
                                f'{new_directory[2:]}optimised-levels.png', 
                                f'{new_directory[2:]}optimised-trendline.png',
                                f'{new_directory[2:]}optimised-both.png']]

print(json.dumps(output))
