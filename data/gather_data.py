import pandas as pd
from fetch_data import fetch_data


RECORDS_LIMIT = 300
GRANULARITY = 86400

COIN = "BTC"
CURRENCY = "USD"
CODE = f'{COIN}/{CURRENCY}'

# Minimum Amount of Data Required
DAYS = 90
HOURS = 0

num_seconds = (DAYS * 24 + HOURS) * 3600 # oldest data required in seconds
iterations_required = int(((num_seconds / GRANULARITY) / RECORDS_LIMIT))

data = fetch_data(CODE, GRANULARITY)
for i in range(iterations_required):
    end = data.iloc[-1, 0] - GRANULARITY
    start = end - RECORDS_LIMIT * GRANULARITY

    df2 = fetch_data(CODE, GRANULARITY, start, end)
    data = pd.concat([data, df2], ignore_index=True)

data.to_csv(f'{COIN}_last_{DAYS}_days.csv')
