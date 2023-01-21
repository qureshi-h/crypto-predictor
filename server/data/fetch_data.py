
import pandas as pd
import requests
import json

def fetch_data(symbol, granularity, start=None, end=None):
    '''
    symbol must be in format XXX/XXX ie. BTC/EUR
    granularity must be 60, 300, 900, 3600, 21600 or 86400
    (optional) start and end are in unix time. By default end value is the current unix time. 
    '''

    pair_split = symbol.split('/')  
    symbol = pair_split[0] + '-' + pair_split[1]
    
    url = f'https://api.pro.coinbase.com/products/{symbol}/candles?granularity={granularity}'
    if start and end:
        url = f'https://api.pro.coinbase.com/products/{symbol}/candles?granularity={granularity}&start={start}&end={end}'

    response = requests.get(url)
    
    if response.status_code == 200:
        data = pd.DataFrame(json.loads(response.text), columns=['unix', 'low', 'high', 'open', 'close', 'volume'])
        data['date'] = pd.to_datetime(data['unix'], unit='s')  # convert to a readable date

        # if we failed to get any data, print an error...otherwise write the file
        if data is None:
            print("Did not return any data from Coinbase for this symbol")
        else:
            return data

    else:
        print("Did not receieve OK response from Coinbase API")
        print(response.text)

                                   