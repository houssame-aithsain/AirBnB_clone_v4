from flask import Flask, render_template
from uuid import uuid4

app = Flask(__name__)


@app.route('/0-hbnb/')
def hbnb():
    cache_id = uuid4()
    return render_template('0-hbnb.html', cache_id=cache_id)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
