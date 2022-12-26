import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler, StandardScaler
from keras.models import Sequential, Model
from keras.models import Model
from keras.layers import Dense, Dropout, LSTM, Input, Activation, concatenate
from helper_functions import *

tf.random.set_seed(1)

import matplotlib.pyplot as plt
import pandas as pd
import datetime as dt
import urllib.request, json

data = pd.read_csv("last_2_years.csv", header=0, index_col=0)
data = data.sort_values('date')

#### Train-Test split for time-series ####
test_ratio = 0.2
training_ratio = 1 - test_ratio
window_sizes = [20, 50, 200]

layer_units, optimizer = 50, 'adam' 
cur_epochs = 15
cur_batch_size = 20

cur_LSTM_pars = {'units': layer_units, 
                    'optimizer': optimizer, 
                    'batch_size': cur_batch_size, 
                    'epochs': cur_epochs
                    }
    
# scale 
scaler = StandardScaler()
data['close'] = scaler.fit_transform(data[['close']])

X_train, y_train, X_test, y_Test = split_data(data, training_ratio, window_sizes[0])

### Build a LSTM model and log model summary to Neptune ###    
def Run_LSTM(X_train, layer_units=50):     
    inp = Input(shape=(X_train.shape[1], 1))
    
    x = LSTM(units=layer_units, return_sequences=True)(inp)
    x = LSTM(units=layer_units)(x)
    out = Dense(1, activation='linear')(x)
    model = Model(inp, out)
    
    # Compile the LSTM neural net
    model.compile(loss = 'mean_squared_error', optimizer = 'adam')

    return model

model = Run_LSTM(X_train, layer_units=layer_units)

history = model.fit(X_train, y_train, epochs=cur_epochs, batch_size=cur_batch_size, 
                    verbose=1, validation_split=0.1, shuffle=True)

# predict stock prices using past window_size stock prices
def preprocess_testdat(data=data, scaler=scaler, window_size=window_sizes[0], test=X_test):    
    raw = data.reshape(-1,1)
    raw = scaler.transform(raw)
    
    X_test = []
    for i in range(window_size, raw.shape[0]):
        X_test.append(raw[i-window_size:i, 0])
        
    X_test = np.array(X_test)
    
    X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))
    return X_test

X_test = preprocess_testdat(X_test)

predicted_price_ = model.predict(X_test)
predicted_price = scaler.inverse_transform(predicted_price_)

# Plot predicted price vs actual closing price 
# X_test = pd.DataFrame(X_test)
# X_test['Predictions_lstm'] = predicted_price   

# Evaluate performance
rmse_lstm = calculate_rmse(predicted_price, y_Test)
mape_lstm = calculate_mape(predicted_price, y_Test)


print(rmse_lstm, mape_lstm)
plot_results(y_Test, predicted_price)

### Plot prediction and true trends and log to Neptune         
# def plot_stock_trend_lstm(train, X_test, logNeptune=True):        
#     fig = plt.figure(figsize = (20,10))
#     plt.plot(train['date'], train['close'], label = 'Train Closing Price')
#     plt.plot(X_test['date'], X_test['close'], label = 'X_test Closing Price')
#     plt.plot(X_test['date'], X_test['Predictions_lstm'], label = 'Predicted Closing Price')
#     plt.title('LSTM Model')
#     plt.xlabel('date')
#     plt.ylabel('Stock Price ($)')
#     plt.legend(loc="upper left")
          

        
# plot_stock_trend_lstm(train, X_test)

