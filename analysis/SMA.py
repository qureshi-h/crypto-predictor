import helper_functions
import pandas as pd
import numpy as np

data = pd.read_csv("last_365_days.csv", header=0, index_col=0)

window_sizes = [20, 50, 200]
    
y_pred = dict()
for window_size in window_sizes:
    trainX , trainY, testX, testY = helper_functions.split_data(data, 1, window_size)
    y_pred[str(window_size)] = np.array([np.mean(trainX[i]) for i in range(trainX.shape[0])])

    print(helper_functions.evaluate_performance(y_pred[str(window_size)], trainY))
    helper_functions.plot_results(y_pred[str(window_size)], trainY)
