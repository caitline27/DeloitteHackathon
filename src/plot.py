import os
import pandas as pd
import matplotlib.pyplot as plt
from src import TimeSeriesCleaning as tsc


def _plot(_df, colname1_ax1, colname2_ax2, colname3_ax3=None, colname4_ax4=None):
    """inputs names of variables (column names) and graphs upto 2 subplots, each having
     upto to 2 scales (y1 and y2 axis). The x-axis is always reserved for Date.
     User must include first 2 names. He also has the option to add a 3rd and a 4th name. """

    fig = plt.figure()  # fig, ax1 = plt.subplots()

    if colname3_ax3 is None and colname4_ax4 is None:

        ax1 = fig.add_subplot(111)
        _df.plot('Date', colname1_ax1, ax=ax1, color='orange',
                 label=colname1_ax1, rot=45)

        ax2 = ax1.twinx()
        _df.plot('Date', colname2_ax2, ax=ax2, label=colname2_ax2, rot=45)

        lines, labels = ax1.get_legend_handles_labels()
        lines2, labels2 = ax2.get_legend_handles_labels()

        ax1.get_legend().remove()
        ax2.legend(lines + lines2, labels + labels2, loc='upper right')

        # legend = ins1 + ins2
        # labs = [leg.get_label() for leg in legend]
        # ax1.legend(legend, labs, loc=0)

    else:
        ax1 = fig.add_subplot(121)
        _df.plot('Date', colname1_ax1, ax=ax1, color='orange',
                 label=colname1_ax1, rot=45)

        ax2 = ax1.twinx()
        _df.plot('Date', colname2_ax2, ax=ax2, label=colname2_ax2, rot=45)

        lines, labels = ax1.get_legend_handles_labels()
        lines2, labels2 = ax2.get_legend_handles_labels()

        ax1.get_legend().remove()
        ax2.legend(lines + lines2, labels + labels2, loc='upper right')

        ax3 = fig.add_subplot(122)

        ##
        _df.plot('Date', colname3_ax3, ax=ax3, color='orange',
                 label=colname3_ax3, rot=45)

        ax4 = ax3.twinx()
        _df.plot('Date', colname4_ax4, ax=ax4, label=colname4_ax4, rot=45)

        lines3, labels3 = ax3.get_legend_handles_labels()
        lines4, labels4 = ax4.get_legend_handles_labels()

        ax3.get_legend().remove()
        ax4.legend(lines3 + lines4, labels3 + labels4, loc='upper right')
    plt.show()


if __name__ == '__main__':
    df = tsc.get_df()
    print(df.columns)
    _plot(df, 'Close_bergenTemperatureDaily', 'Close_ConsumptionBergenNO5')
    print('')
