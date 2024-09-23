import unittest
from unittest.mock import patch, MagicMock
from xnxx_api import Video, Core, Callback

class TestVideoDownload(unittest.TestCase):

    @patch('xnxx_api.Core.download')
    def test_download_success(self, mock_download):
        # Arrange
        video_url = "https://www.xnxx.com/video-abc123"
        video = Video(video_url)
        quality = "720p"
        path = "/path/to/save/video.mp4"
        downloader = MagicMock()
        callback = Callback.text_progress_bar

        # Act
        video.download(quality, path, downloader, callback)

        # Assert
        mock_download.assert_called_once_with(video=video, quality=quality, path=path, callback=callback, downloader=downloader)

    @patch('xnxx_api.Core.download')
    def test_download_default_callback(self, mock_download):
        # Arrange
        video_url = "https://www.xnxx.com/video-abc123"
        video = Video(video_url)
        quality = "720p"
        path = "/path/to/save/video.mp4"
        downloader = MagicMock()

        # Act
        video.download(quality, path, downloader)

        # Assert
        mock_download.assert_called_once_with(video=video, quality=quality, path=path, callback=Callback.text_progress_bar, downloader=downloader)

    @patch('xnxx_api.Core.download')
    def test_download_invalid_quality(self, mock_download):
        # Arrange
        video_url = "https://www.xnxx.com/video-abc123"
        video = Video(video_url)
        quality = "9999p"  # Invalid quality
        path = "/path/to/save/video.mp4"
        downloader = MagicMock()

        # Act
        with self.assertRaises(Exception):
            video.download(quality, path, downloader)

        # Assert
        mock_download.assert_not_called()

if __name__ == '__main__':
    unittest.main()