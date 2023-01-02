import EMA
import pandas


df = pandas.read_csv("last_365_days.csv", header=0, index_col=0)

WINDOWS = [5, 10, 25, 50, 100, 200]


print()