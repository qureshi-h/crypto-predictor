import pandas as pd
import numpy as np

import sys
sys.path.insert(1, "../analysis")

import helper_functions

def EMA(data, window_size):

    '''
    data is a 1d numpy array, with the stock/coin price at arbitary intervals. 
    window size is an integer value or an iterable of integers
    returns the Exponential Moving Average of the data points
    '''
    
    if type(window_size) == int:
        emas = data.ewm(span=window_size, adjust=False).mean()
        return [emas.iloc[-1], helper_functions.calculate_rmse(data, emas)]
    
    elif hasattr(window_size, '__iter__'):
        predictions = []
        for window in window_size:
            emas = data.ewm(span=int(window), adjust=False).mean()
            predictions.append({int(window): [emas.iloc[-1], helper_functions.calculate_rmse(data, emas)]})
        return predictions
    
    return TypeError("window size needs to be an integer value or an iterable of integers")


