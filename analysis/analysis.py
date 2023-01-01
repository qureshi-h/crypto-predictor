import sys

sys.path.insert(1, "../data")
sys.path.insert(1, "../analysis")

from gather_data import gather_data

coin = sys.argv[1]

granularity = int(sys.argv[2])
start_time = round(int(sys.argv[3]) / 1000) # gather data requires unix in seconds
end_time = round(int(sys.argv[4]) / 1000)

data = gather_data(coin, "USD", granularity, start_time, end_time)

print(data.head())
