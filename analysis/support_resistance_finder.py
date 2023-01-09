import pandas as pd
from matplotlib import pyplot as plt
from numpy.polynomial.polynomial import polyfit
from numpy import array, arange

import warnings
warnings.filterwarnings("ignore")


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
    the maxima object is a 4-tuple, consisting of the 
    resistance value, start, end, and maximum point in the resistance level
    '''
    curr_maxima = maximums[0]
    combined_maximas = [[0, 0, 0]]
    span = max(maximums, key=lambda x: x[0])[0] - min(maximums, key=lambda x: x[0])[0]
    for maxima in maximums:
        if abs(maxima[0] - curr_maxima[0]) > threshold * span:
            combined_maximas.append([curr_maxima[0], combined_maximas[-1][-1], maxima[1], curr_maxima[1]])
            curr_maxima = maxima
        elif maxima[0] > curr_maxima[0]:
            curr_maxima = maxima
    combined_maximas.append([curr_maxima[0], combined_maximas[-1][-1], curr_maxima[1], curr_maxima[1]])

    i = 1
    while i < len(combined_maximas) - 1:
        if abs(combined_maximas[i][0] - combined_maximas[i + 1][0]) < threshold * span:
            combined_maximas[i + 1] = [max(combined_maximas[i][0], combined_maximas[i + 1][0]), 
                                                            combined_maximas[i][1], 
                                                            combined_maximas[i + 1][2],
                                                            max(combined_maximas[i], combined_maximas[i + 1], key=lambda x: x[0])[3]]
            del combined_maximas[i]
        else:
            i+=1

    return combined_maximas[1:]


def combine_minimums(minimums, threshold=0.2):

    '''
    merges nearby minimas into one. 
    higher threshold leads to more distinct minimas
    the minima object is a 4-tuple, consisting of the 
    resistance value, start, end, and minimum point in the resistance level
    '''

    curr_minima = minimums[0]
    combined_minimas = [[0, 0, 0, 0]]
    span = max(minimums, key=lambda x: x[0])[0] - min(minimums, key=lambda x: x[0])[0]
    for minima in minimums:
        if abs(minima[0] - curr_minima[0]) > threshold * span / 2:
            combined_minimas.append([curr_minima[0], combined_minimas[-1][-1], minima[1], curr_minima[1]])
            curr_minima = minima
        elif minima[0] < curr_minima[0]:
            curr_minima = minima
    combined_minimas.append([curr_minima[0], combined_minimas[-1][-1], curr_minima[1], curr_minima[1]])

    i = 1
    while i < len(combined_minimas) - 1:
        if abs(combined_minimas[i][0] - combined_minimas[i + 1][0]) < threshold * span:
            combined_minimas[i + 1] = [min(combined_minimas[i][0], combined_minimas[i + 1][0]), 
                                                            combined_minimas[i][1], 
                                                            combined_minimas[i + 1][2],
                                                            min(combined_minimas[i], combined_minimas[i + 1], key=lambda x: x[0])[3]]
            del combined_minimas[i]
        else:
            i+=1
    return combined_minimas[1:]


def plot(data, minimums, maximums, directory, name_prefix=""):
    
    """
    plots and saves the data points, data points + r/s levels, 
    and data points + r/s levels + trendline
    """

    plot_colour = "#0a041e"
    axes_color = "#00ffff"
    axes_color = "white"
    
    figure, ax = plt.subplots(facecolor=plot_colour)
    figure2, ax2 = plt.subplots(facecolor=plot_colour)
    
    
    ax.set_facecolor(plot_colour)
    
    ax.spines['bottom'].set_color(axes_color)
    ax.spines['left'].set_color(axes_color)
    ax.tick_params(axis='x', colors=axes_color)
    ax.tick_params(axis='y', colors=axes_color)
    
    ax2.set_facecolor(plot_colour)
    
    ax2.spines['bottom'].set_color(axes_color)
    ax2.spines['left'].set_color(axes_color)
    ax2.tick_params(axis='x', colors=axes_color)
    ax2.tick_params(axis='y', colors=axes_color)
    
    ax.plot(arange(0, data.shape[0], 1), data, color="#00ffff")
    ax2.plot(arange(0, data.shape[0], 1), data, color="#00ffff")
    figure.savefig(f'{directory}{name_prefix}historical.png')

    plot_levels(data, minimums, maximums, ax)
    figure.savefig(f'{directory}{name_prefix}levels.png')

    plot_trendlines(maximums, ax)
    plot_trendlines(maximums, ax2)
    figure.savefig(f'{directory}{name_prefix}both.png')
    figure.savefig(f'{directory}{name_prefix}trendlines.png')

        
        
def plot_levels(df, minimums, maximums, ax):

    '''
    plots the resistance and support levels
    '''

    minimums[-1][2] = maximums[-1][2] = df.shape[0]

    for minima in minimums:
        ax.hlines(minima[0], minima[1], minima[2], colors="red")
    for maxima in maximums:
        ax.hlines(maxima[0], maxima[1], maxima[2], colors="green")
        

def plot_trendlines(maximums, ax):
    
    """
    find and plots the trendline
    """

    x = array([x[3] for x in maximums])
    y = array([y[0] for y in maximums])
    
    b, m = polyfit(x, y, 1)
        
    ax.plot(x, b + float(m) * x, linestyle='dashed', color="purple")
    


def find_support_resistance(data, threshold_x, threshold_y, directory):

    '''
    finds and plots the resistance and support levels
    '''

    minimums, maximums = find_poi(data)

    combined_maximums = combine_maximums(maximums, threshold_x)
    combined_minimums = combine_minimums(minimums, threshold_y)

    plot(data, combined_minimums, combined_maximums, directory)  # plot the unoptimised version

    min_len = min(len(combined_minimums), len(combined_maximums))
    while len(combined_maximums) > min_len:
        threshold_x = threshold_x + 0.001
        combined_maximums = combine_maximums(combined_maximums, threshold_x)
        if len(combined_maximums) < 2:
            combined_maximums = combine_maximums(combined_maximums, threshold_x)
            break

    min_len = min(len(combined_minimums), len(combined_maximums))

    while len(combined_minimums) > min_len:
        threshold_y += 0.01
        combined_minimums = combine_minimums(minimums, threshold_y)
        if len(combined_minimums) < 2:
            combined_minimums = combine_minimums(combined_minimums, threshold_y)
            break

    plot(data, combined_minimums, combined_maximums, directory, "optimised-")  # plot the optimised version
    
    # plt.show() #for testing only


if __name__ == "__main__":

    df = pd.read_csv("last_365_days.csv", header=0)

    df = df.sort_values(by="date").reset_index()
    df = df["close"]

    find_support_resistance(df, 0.17, 0.17, "./")
