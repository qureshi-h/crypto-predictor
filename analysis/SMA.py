import pandas as pd
import numpy as np


def SMA(data, window_size):

    '''
    data is a 1d numpy array, with the stock/coin price at arbitary intervals. 
    window size is an integer value
    returns the Exponential Moving Average of the data points
    '''
    
    return data.rolling(window_size).mean().iloc[-1]
