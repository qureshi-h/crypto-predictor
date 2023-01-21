import sys
import helper_functions

def SMA(data, window_size):

    '''
    data is a 1d numpy array, with the stock/coin price at arbitary intervals. 
    window size is an integer value or an iterable of integers
    returns the Simple Moving Average of the data points
    '''
    
    if type(window_size) == int:
        smas = data.rolling(window_size).mean()[window:]
        return {window_size: [smas.iloc[-1], 
                              helper_functions.calculate_rmse(data[window_size:], smas)]}
    
    elif hasattr(window_size, '__iter__'):
        predictions = []
        for window in window_size:
            if data.shape[0] < window:
                predictions.append({int(window): ["NaN", "NaN", "NaN"]})
            else:
                smas = data.rolling(int(window)).mean().iloc[window:]
                predictions.append({int(window): [round(smas.iloc[-1], 2), 
                                                  round(helper_functions.calculate_rmse(data.iloc[window:], smas), 2), 
                                                  round(helper_functions.calculate_mape(data.iloc[window:], smas), 2)]})
        return predictions
    
    return TypeError("window size needs to be an integer value or an iterable of integers")


