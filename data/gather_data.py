import pandas as pd
from fetch_data import fetch_data
import time

RECORDS_LIMIT = 300

def gather_data(coin, currency, granularity, start_time, end_time):

    """
    coin is the cryptocoin code (3-4 characters)
    granularity must be 60, 300, 900, 3600, 21600 or 86400
    start_time and end_time are unix timestamps in SECONDS
    """
    
    "TODO: Implement error handling"

    print(coin, currency, granularity, start_time, end_time)

    code = f'{coin}/{currency}'

    end_time = min(end_time, round(time.time() * 1000000))
    current_start = end_time - RECORDS_LIMIT * granularity

    data = fetch_data(code, granularity, current_start, end_time)
    end = (data.iloc[-1, 0] - granularity)
    while (end >= start_time):
        current_start = end - RECORDS_LIMIT * granularity

        df2 = fetch_data(code, granularity, current_start, end)
        data = pd.concat([data, df2], ignore_index=True)

        end = data.iloc[-1, 0] - granularity

    data[(data["unix"] >= start_time) & (data["unix"] < end_time)].to_csv("test.csv")
    return data[(data["unix"] >= start_time) & (data["unix"] < end_time)]


if __name__ == '__main__':
    gather_data("BTC", "USD", 3600, 1640955600, 1642597200).to_csv("test.csv")
