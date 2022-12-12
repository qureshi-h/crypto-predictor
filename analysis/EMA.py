import helper_functions
import pandas as pd
import numpy as np

data = pd.read_csv("last_365_days.csv", header=0, index_col=0)

window_sizes = [20, 50, 200]
    
y_pred = dict()
for window_size in window_sizes:
    y_pred[str(window_size)] = data.iloc[:, 3].ewm(span=window_size, adjust=False).mean()

    print(helper_functions.evaluate_performance(y_pred[str(window_size)][window_size:], data.iloc[window_size:, 3]))
    helper_functions.plot_results(y_pred[str(window_size)][window_size:], data.iloc[window_size:, 3])
