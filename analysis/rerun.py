import sys

sys.path.insert(1, "../data")
sys.path.insert(1, "../analysis")

from support_resistance_finder import find_support_resistance
import pandas as pd

id = sys.argv[1]

threshold_x = float(sys.argv[2])
threshold_y = float(sys.argv[3])

DIRECTORY = f"./plots/{id}-"

data = pd.read_csv(f"{DIRECTORY}.csv", header=0)

find_support_resistance(data["close"], threshold_x, threshold_y, f'{DIRECTORY}')
