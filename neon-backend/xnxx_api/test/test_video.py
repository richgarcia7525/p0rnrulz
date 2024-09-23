import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))

from ..base_api.modules.download import FFMPEG
from ..base_api.modules.quality import Quality
from xnxx_api import Client, Video

url = "https://www.xnxx.com/video-1b9bufc9/die_zierliche_stieftochter_passt_kaum_in_den_mund_ihres_stiefvaters"
# This will be the URL for all tests

video = Video(url)


def test_video_title():
    """
    Test the title attribute of the video object.

    This test checks if the title attribute of the video object is a non-empty string.

    Assertions:
        - The title should be an instance of str.
        - The length of the title should be greater than 0.
    """
    title = video.title
    assert isinstance(title, str) and len(title) > 0


def test_author():
    author = video.author
    assert isinstance(author, str) and len(author) > 0


def test_length():
    length = video.length
    assert isinstance(length, str) and len(length) > 0


def test_highest_quality():
    highest_quality = video.highest_quality
    assert isinstance(highest_quality, str) and len(highest_quality) > 0


def test_views():
    views = video.views
    assert isinstance(views, str) and len(views) > 0


def test_comment_count():
    comment_count = video.comment_count
    assert isinstance(comment_count, str)


def test_likes():
    likes = video.likes
    assert isinstance(likes, str)


def test_dislikes():
    dislikes = video.dislikes
    assert isinstance(dislikes, str)


def test_pornstars():
    pornstars = video.pornstars
    assert isinstance(pornstars, list)  # Some videos don't contain pornstars, which is why we don't test it here


def test_description():
    description = video.description
    assert isinstance(description, str) and len(description) > 0


def test_keywords():
    tags = video.tags
    assert isinstance(tags, list) and len(tags) > 0


def test_thumbnail_url():
    thumbnail_url = video.thumbnail_url
    assert isinstance(thumbnail_url, list) and len(thumbnail_url) > 0


def test_publish_date():
    publish_date = video.publish_date
    assert isinstance(publish_date, str) and len(publish_date) > 0


def test_content_url():
    content_url = video.content_url
    assert isinstance(content_url, str) and len(content_url) > 0


def test_get_segments():
    segments = list(video.get_segments(quality=Quality.BEST))
    assert len(segments) > 10