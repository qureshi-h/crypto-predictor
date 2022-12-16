import pandas as pd
import numpy as np


def EMA(data, window_size):

    '''
    data is a 1d numpy array, with the stock/coin price at arbitary intervals. 
    window size is an integer value
    returns the Exponential Moving Average of the data points
    '''
    
    return data.ewm(span=window_size, adjust=False).mean().iloc[-1]
