import pandas as pd
from numpy import loadtxt
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

from src import TimeSeriesCleaning as tsc

# load data
dataset = tsc.get_df()

CONSUMPTION = "Close_ConsumptionBergenNO5"
X_cols = set(dataset.columns.to_list())
X_cols.remove(CONSUMPTION)
X_cols.remove('Date')

X_cols = list(X_cols)

# split data into X and y
X = dataset[X_cols]
Y = dataset[CONSUMPTION]

def main():

# split data into train and test sets
    seed = 7
    test_size = 0.2
    X_train, X_test, y_train, y_test = train_test_split(X,
                                                        Y,
                                                        test_size=test_size,
                                                        random_state=seed)

    # fit model no training data
    model = XGBRegressor()
    model.fit(X_train, y_train)

    # make predictions for test data
    y_pred = model.predict(X_test)

    actuals = pd.DataFrame().append(y_test).transpose().to_numpy()
    results_df = pd.DataFrame()
    results_df['prediction'] = y_pred
    results_df['actuals'] = actuals
    results_df['diff'] = results_df['prediction'] - results_df['actuals']
    results_df['percent'] = results_df['diff']/results_df['actuals']
    print( f"mean is {abs(results_df['percent']).mean()}" )
    print(results_df['percent'].describe())

    # evaluate predictions
    error = mean_squared_error(y_test, y_pred)
    print("Error: ", error**.5)


    r2 = r2_score(y_test, y_pred)
    print("r2: ", r2)
    print(sorted(list(zip(X_cols, model.feature_importances_)),
                 key = lambda x: x[1],
                 reverse = True)[:10])
if __name__ == '__main__':
    main()