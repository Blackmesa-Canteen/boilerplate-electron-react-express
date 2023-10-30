import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { useEffect, useState } from 'react';

function Hello() {

  const [downloadedImagePath, setDownloadedImagePath] = useState<string>('');

  useEffect(() => {
    console.log('Setting up event listener for image-downloaded');
    // Use the extended electronHandler to listen for the image-downloaded event
    (window as any).electron.ipcRenderer.onAssetDownloaded((path: string) => {
      setDownloadedImagePath(path);
      console.log('Downloaded image path: ', path)
    });

    // Trigger the asset download (if needed)
    // (window as any).electron.ipcRenderer.downloadAsset("YOUR_URL_HERE");
  }, []);

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
      <div>
        {downloadedImagePath && <img width="200" alt="icon" src={`app://${downloadedImagePath}`} />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
