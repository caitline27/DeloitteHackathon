import os
import pandas as pd


def get_df(pathToRawDataDirectory="../data/Raw"):
    data = {}
    for file in os.listdir(pathToRawDataDirectory):
        raw_dir_file = pathToRawDataDirectory + "/" + file
        data[file[:file.index("_")]] = pd.read_csv(raw_dir_file).fillna(method="ffill")
    keys = list(data.keys())
    for idx in range(len(data)):
        if idx == 0:
            df = data[keys[0]][["Date", "Close"]]
            continue
        curr_name = keys[idx]
        prev_name = keys[idx - 1]
        df = pd.merge(df, data[keys[idx]][["Date", "Close"]],
                      on="Date", how="outer", suffixes=("_" + prev_name, "_" + curr_name))
    df.sort_values(by='Date', inplace=True)
    df.fillna(method="ffill", inplace=True)
    df.fillna(method="bfill", inplace=True)
    return df

if __name__ == '__main__':
    df = get_df()
    print('')
