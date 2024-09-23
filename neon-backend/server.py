from flask import Flask, jsonify
import sys
sys.path.append('./xnxx_api')
from xnxx_api.xnxx_api import Client

app = Flask(__name__)

client = Client()

@app.route('/video/<string:video_id>', methods=['GET'])
def  get_video_info(video_id):
    try:
        url = f"https://www.xnxx.com/video-{video_id}"
        video = client.get_video(url)
        

        
        # Ensure the video object was retrieved successfully
        if not video:
            raise Exception("Failed to retrieve video information.")

        video_data = {
            "title": video.title,
            "author": video.author,
            "length": video.length,
            "views": video.views,
            "likes": video.likes,
            "tags": video.tags,
            "thumbnail": video.thumbnail_url,
        }

        return jsonify(video_data)

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)


