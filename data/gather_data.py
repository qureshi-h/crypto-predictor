import pandas as pd
from fetch_data import fetch_data


RECORDS_LIMIT = 300
GRANULARITY = 86400
CURRENCY = "BTC/USD"

# Minimum Amount of Data Required
DAYS = 365 * 2
HOURS = 0

num_seconds = (DAYS * 24 + HOURS) * 3600 # oldest data required in seconds
iterations_required = int(((num_seconds / GRANULARITY) / RECORDS_LIMIT))

data = fetch_data(CURRENCY, GRANULARITY)
for i in range(iterations_required):
    end = data.iloc[-1, 0] - GRANULARITY
    start = end - RECORDS_LIMIT * GRANULARITY

    df2 = fetch_data(CURRENCY, GRANULARITY, start, end)
    data = pd.concat([data, df2], ignore_index=True)

data.to_csv(f'last_{DAYS}_days.csv')
