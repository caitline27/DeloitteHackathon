from flask import Flask, request, jsonify
from flask_restplus import Api, Resource, fields, Namespace
from flask import Flask

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


@flask_app.route("/feature")
def hello():
    return "Hello World!"




if __name__ == "__main__":
    flask_app.run(debug=True)
