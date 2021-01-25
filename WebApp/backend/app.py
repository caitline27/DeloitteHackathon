import json
from flask import Flask, request, jsonify
from flask_restplus import Api, Resource, fields
from flask_cors import CORS, cross_origin
from xgboost import XGBRegressor
import csv
import pandas as pd
import numpy

SAMPLE_NUMBER = 'SAMPLE_NUMBER'
SAMPLE_STRING = 'SAMPLE_STRING'

flask_app = Flask(__name__)
app = Api(app=flask_app,
          version="0.1",
          title="AP Prediction Service",
          description="Obtain prediction Chart of Accounts (COA) from inputs 1) Invoice Amount, 2) Ship to location code, 3) Supplier_site and 4) Supplier_Number.")

headsinthecloud_rest_name_space = app.namespace('HeadsInTheCloud', description='REST Gateway - Power Project')

restrequest = app.model('Model1 Request',
                        {
                            SAMPLE_NUMBER: fields.Float(required=True,
                                                        description="a number variable",
                                                        help="Cannot be blank."),
                            SAMPLE_STRING: fields.String(required=True,
                                                         description="a string variable",
                                                         help="Cannot be blank."),
                        })


@headsinthecloud_rest_name_space.route("/predict")
class MainClass(Resource):
    @app.doc(responses={200: 'OK', 400: 'Invalid Argument', 500: 'Mapping Key Error'})
    @app.expect(restrequest)
    def post(self):
        try:
            return {'response_key': 'hello world response value'}
        except Exception as e:
            headsinthecloud_rest_name_space.abort(500, e.__doc__, status='bummer got a 500 error')


@flask_app.route("/reserve", methods=['POST'])
@cross_origin()
def reserve():
    # TODO: get value of the reserving amount from the model
    if request.method == 'POST':
        query = request.form
        print(query)
        print(query['region'], query['date'])

        result = extractModel(query['region'], query['date'])


        opt = result[0].astype(numpy.float)
        print(result[1])

        factor_rating =[]
        for item in result[1]:
            factor_rating.append({item[0] : item[1].astype(numpy.float)})

        response = jsonify({"reserving_value": str(opt[0]), "factor_ratings" : factor_rating})
        return response

def extractModel(region, date):
    model = XGBRegressor()

    model1 = XGBRegressor()

    modelName = "./Models/"+region+".model"
    model.load_model(modelName)

    model1.load_model(modelName)

    fileName = "./CSV_Model_Inputs/"+region+".csv"

    dataset = pd.read_csv(fileName)
    target_row = dataset[(dataset.Date == date)]
    X_cols = target_row.columns.to_list()
    X_cols.remove('Unnamed: 0')
    X_cols.remove('Date')
    X_cols = list(X_cols)

    # split data into X and y
    X = target_row[X_cols]
    result = model.predict(X)

    factor_rating = sorted(list(zip(X_cols, model.feature_importances_)), key=lambda x: x[1], reverse=True)[:10]

    return result,factor_rating


# @flask_app.route("/trade", methods=['GET'])
# @cross_origin()
# def trade():
#     query = request.json
#     action = query['action']
#     city = query['city']
#     qty = query['qty']
#
#     if action == 'buy':
#         buy_price = 2
#         # TODO: get value of the buying price from the model
#         response = jsonify({"reserving_value": buy_price})
#
#     if action == 'sell':
#         selling_price = 1
#         # TODO: get value of the selling price from the model
#         response = jsonify({"reserving_value": selling_price})
#
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     return response

# data = [
        #     { "label": "Jan",  "y": 10  },
        #     { "label": "Feb", "y": 15  },
        #     { "label": "Mar", "y": 25  },
        #     { "label": "Apr",  "y": 30  },
        #     { "label": "May",  "y": 28  },
        #     { "label": "Jun",  "y": 10  },
        #     { "label": "Jul", "y": 15  },
        #     { "label": "Aug", "y": 25  },
        #     { "label": "Sep",  "y": 30  },
        #     { "label": "Oct",  "y": 28  },
        #     { "label": "Nov",  "y": 56  },
        #     { "label": "Dec",  "y": 28  }
        #     ]

if __name__ == "__main__":
    flask_app.run(host="0.0.0.0", debug=True)

