# Create our image based on Python 3.8
FROM python:3.8

# Expose ports
EXPOSE 5000

# Install requirements using pip
ADD requirements.txt .
RUN python -m pip install -r requirements.txt

# Set working directory and addour Flask API files
WORKDIR /app
ADD . /app

CMD ["flask", "run", "--host", "0.0.0.0"]
#ENTRYPOINT [ "python" ]
#CMD [ "app.py" ]

