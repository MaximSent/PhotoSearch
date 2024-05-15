from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from multimodal_search import MultimodalSearch
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)

search_system = MultimodalSearch()

@app.route('/add_photo', methods=['POST'])
def add_photo():
    photo = request.files['photo']
    if photo:
        train_dir = 'train'
        if not os.path.exists(train_dir):
            os.makedirs(train_dir)

        filename = photo.filename
        photo_path = os.path.join(train_dir, filename)
        photo.save(photo_path)
        try:
            search_system.add_photo(filename)
            return jsonify({"message": "Photo added successfully", "photo_url": photo_path}), 201
        except Exception as exc:
            return jsonify({"error": str(exc)}), 500
    return jsonify({"message": "No photo provided"}), 400

@app.route('/search_by_photo', methods=['POST'])
def search_by_photo():
    photo = request.files['photo']
    if photo:
        directory = '/temp'  
        if not os.path.exists(directory):
            os.makedirs(directory) 
        photo_path = f'{directory}/{photo.filename}'
        photo.save(photo_path)
        try:
            results = search_system.search_by_image(photo_path, top_k=10)
            os.remove(photo_path)
            return jsonify([{"score": result.score, "image_url": result.content} for result in results]), 200
        except Exception as exc:
            return jsonify({"error": str(exc)}), 500
    return jsonify({"message": "No photo provided"}), 400

@app.route('/images/<path:filename>')
def get_image(filename):
    return send_from_directory('train', filename)

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '')
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))
    offset = (page - 1) * per_page

    if query:
        results, total_results = search_system.search(query, top_k=offset + per_page)
        results = results[offset:offset + per_page]
        has_more = offset + per_page < total_results

        results_data = [{
            "score": round(result.score * 100, 2),
            "image_url": result.content
        } for result in results]

        return jsonify({
            "items": results_data,
            "has_more": has_more
        })
    else:
        return jsonify({"message": "Query is required"}), 400

if __name__ == '__main__':
    app.run(debug=True)
