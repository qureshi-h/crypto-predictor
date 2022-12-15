import pandas as pd
from matplotlib import pyplot as plt


def find_poi(data):

    ''' 
    data is a 1d array consisting of data points
    returns all the local maximas and minimas
    '''
    minimums = []
    maximums = []

    if data.shape[0] > 1:
        if data.iloc[0] < data.iloc[1]:
            minimums.append((data.iloc[0], 0))
        else:
            maximums.append((data.iloc[0], 0))

    for i in range(1, data.shape[0] - 1):
        value = data.iloc[i]
        if value > data.iloc[i-1] and value > data.iloc[i+1]:
            maximums.append((value, i))
        elif value < data.iloc[i-1] and value < data.iloc[i+1]:
            minimums.append((value, i))

    if data.shape[0] > 1:
        if data.iloc[-1] > data.iloc[-2]:
            maximums.append((data.iloc[-1], data.shape[0]))
        else:
            minimums.append((data.iloc[-1], data.shape[0]))
  
    return minimums, maximums


def combine_maximums(maximums, threshold=.2):
    '''
    merges nearby maximas into one. 
    higher threshold leads to more distinct maximas
    '''
    curr_maxima = maximums[0]
    combined_maximas = [[0, 0, 0]]
    span = max(maximums, key=lambda x: x[0])[0] - min(maximums, key=lambda x: x[0])[0]
    for maxima in maximums:
        if abs(maxima[0] - curr_maxima[0]) > threshold * span:
            combined_maximas.append([curr_maxima[0], combined_maximas[-1][-1], maxima[1]])
            curr_maxima = maxima
        elif maxima[0] > curr_maxima[0]:
            curr_maxima = maxima
    combined_maximas.append([curr_maxima[0], combined_maximas[-1][-1], curr_maxima[1]])

    i = 1
    while i < len(combined_maximas) - 1:
        if abs(combined_maximas[i][0] - combined_maximas[i + 1][0]) < thresold * span:
            combined_maximas[i + 1] = [max(combined_maximas[i][0], combined_maximas[i + 1][0]), 
                                                            combined_maximas[i][1], 
                                                            combined_maximas[i + 1][2]]
            del combined_maximas[i]
        else:
            i+=1

    return combined_maximas[1:]


def combine_minimums(minimums, threshold=0.2):

    '''
    merges nearby minimas into one. 
    higher threshold leads to more distinct minimas
    '''

    curr_minima = minimums[0]
    combined_minimas = [[0, 0, 0]]
    span = max(minimums, key=lambda x: x[0])[0] - min(minimums, key=lambda x: x[0])[0]
    for minima in minimums:
        if abs(minima[0] - curr_minima[0]) > threshold * span:
            combined_minimas.append([curr_minima[0], combined_minimas[-1][-1], minima[1]])
            curr_minima = minima
        elif minima[0] < curr_minima[0]:
            curr_minima = minima
    combined_minimas.append([curr_minima[0], combined_minimas[-1][-1], curr_minima[1]])

    i = 1
    while i < len(combined_minimas) - 1:
        if abs(combined_minimas[i][0] - combined_minimas[i + 1][0]) < thresold * span:
            combined_minimas[i + 1] = [min(combined_minimas[i][0], combined_minimas[i + 1][0]), 
                                                            combined_minimas[i][1], 
                                                            combined_minimas[i + 1][2]]
            del combined_minimas[i]
        else:
            i+=1
    return combined_minimas[1:]


def plot_points(df, minimums, maximums):

    '''
    plots the data points as well as the resistance and support levels
    '''

    minimums[-1][-1] = maximums[-1][-1] = df.shape[0]

    df.plot()
    for minima in minimums:
        plt.hlines(minima[0], minima[1], minima[2], colors="red")
    for maxima in maximums:
        plt.hlines(maxima[0], maxima[1], maxima[2], colors="green")
    plt.show()


def find_support_resistance(data):

    '''
    find the resistance and support levels'''
    minimums, maximums = find_poi(data)

    maximums = combine_maximums(maximums)
    minimums = combine_minimums(minimums)

    plot_points(data, minimums, maximums)


if __name__ == "main":

    df = pd.read_csv("last_2_years.csv", header=0)

    # df = df.sort_values(by="date").reset_index()
    df = df["close"]

    find_support_resistance(df)
