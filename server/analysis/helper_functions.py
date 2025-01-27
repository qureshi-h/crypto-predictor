import numpy as np
from matplotlib import pyplot as plt
import random as rand

def calculate_rmse(y_true, y_pred):
    """
    Calculate the Root Mean Squared Error (RMSE)
    """
    rmse = np.sqrt(np.mean((y_true-y_pred)**2))
    return rmse


def calculate_mape(y_true, y_pred):
    """
    Calculate the Mean Absolute Percentage Error (MAPE)
    """
    y_pred, y_true = np.array(y_pred), np.array(y_true)
    mape = np.mean(np.abs((y_true-y_pred) / y_true))*100
    return mape


def split_data(data, split, window_size, random=False):

    """
    assumes data is sorted by date in descending order. 
    If random is false, returns the oldest dates for training 
    recent ones for testing
    """
    trainX = []
    trainY = []
    testX = []
    testY = []

    if random:
        train_vals = rand.sample(range(window_size, data.shape[0]), int(split * data.shape[0]))
        for i in train_vals:
            trainX.append(data.iloc[i-window_size: i, 4])
            trainY.append(data.iloc[i, 4])
        for i in range(window_size, data.shape[0]):
            if i not in train_vals:
                testX.append(data.iloc[i-window_size: i, 4])
                testY.append(data.iloc[i, 4])

    else:
        for i in range(window_size, int(split * data.shape[0])):
            trainX.append(data.iloc[i-window_size: i, 4])
            trainY.append(data.iloc[i, 4])

        for i in range(int(split * data.shape[0]), data.shape[0]):
            testX.append(data.iloc[i-window_size: i, 4])
            testY.append(data.iloc[i, 4])

    return np.array(trainX), np.array(trainY), np.array(testX), np.array(testY)

def split_data_2(data, split, window_size, random=False):

    """
    assumes data is sorted by date in descending order. 
    If random is false, returns the oldest dates for training 
    recent ones for testing
    """
    trainX = []
    trainY = []
    testX = []
    testY = []

    if random:
        train_vals = rand.sample(range(window_size, data.shape[0]), int(split * data.shape[0]))
        for i in train_vals:
            trainX.append(data.iloc[i-window_size: i, 4])
            trainY.append(data.iloc[i, 4])
        for i in range(window_size, data.shape[0]):
            if i not in train_vals:
                testX.append(data.iloc[i-window_size: i, 4])
                testY.append(data.iloc[i, 4])

    else:
        for i in range(window_size, int(split * data.shape[0])):
            trainX.append(data.iloc[i-window_size: i, 4])
            trainY.append(data.iloc[i, 4] > data.iloc[i-window_size, 4])

        for i in range(int(split * data.shape[0]), data.shape[0]):
            testX.append(data.iloc[i-window_size: i, 4])
            testY.append(data.iloc[i, 4] > data.iloc[i-window_size, 4])

    return np.array(trainX), np.array(trainY), np.array(testX), np.array(testY)


def evaluate_performance(y_true, y_pred):

    return calculate_rmse(y_true, y_pred), calculate_mape(y_true, y_pred)


def plot_results(y_true, y_pred, title=""):

    plt.plot(y_true, color="orange")
    plt.plot(y_pred, color="blue")
    plt.show()
