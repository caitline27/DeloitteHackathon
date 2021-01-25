import pandas as pd
from numpy import loadtxt
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error, mean_absolute_percentage_error

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
    model = XGBRegressor(n_estimators=1000, max_depth=12, learning_rate=0.1, min_child_weight=6)
    # model = XGBRegressor()
    model.fit(X_train, y_train)

    print(X_cols)

    # make predictions for test data
    y_pred = model.predict(X_test)

    actuals = pd.DataFrame().append(y_test).transpose().to_numpy()
    results_df = pd.DataFrame()
    results_df['prediction'] = y_pred
    results_df['actuals'] = actuals
    results_df['diff'] = results_df['prediction'] - results_df['actuals']
    results_df['percent'] = results_df['diff']/results_df['actuals']
    print( f"mean is {abs(results_df['percent']).mean()}" )
    print( f"max is {max(results_df['percent'])}" )
    print( f"min is {min(results_df['percent'])}" )

    # evaluate predictions
    error = mean_squared_error(y_test, y_pred)
    print("Error: ", error**.5)

    print(f"mean abs error {mean_absolute_error(y_test, y_pred)}")

    print(f"mean abs percent error {mean_absolute_percentage_error(y_test, y_pred)}")

    r2 = r2_score(y_test, y_pred)
    print("r2: ", r2)
    print(sorted(list(zip(X_cols, model.feature_importances_)),
                 key = lambda x: x[1],
                 reverse = True)[:])

if __name__ == '__main__':
    main()