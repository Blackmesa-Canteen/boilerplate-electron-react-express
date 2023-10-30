import { app, BrowserWindow } from 'electron';
import fs from 'fs';
import electronDl from 'electron-dl';
import path from 'path';

/**
 * Checks if the asset already exists at the specified path.
 *
 * @param assetPath - The path to the asset.
 * @returns True if the asset exists, false otherwise.
 */
function assetExists(assetPath: string): boolean {
  return fs.existsSync(assetPath);
}

/**
 * Downloads an asset and saves it to the userData directory of the application.
 * If the asset already exists, it will not be redownloaded unless forceDownload is true.
 *
 * @param win - The BrowserWindow to download the asset from.
 * @param assetUrl - The URL of the asset to download.
 * @param filename - The filename to save the downloaded asset as.
 * @param forceDownload - If true, the asset will be downloaded even if it already exists.
 * @returns The path to the downloaded asset.
 */
export async function downloadAsset(win: BrowserWindow, assetUrl: string, filename: string, forceDownload: boolean = false): Promise<string> {

  if (!win) {
    throw new Error('No focused window found to initiate download');
  }

  // Determine the destination directory and path
  const destinationDir = app.getPath('userData');
  const destinationPath = path.join(destinationDir, filename);

  // Check if asset already exists
  if (!forceDownload && assetExists(destinationPath)) {
    return destinationPath;
  }

  await electronDl.download(win, assetUrl, {
    saveAs: false,
    directory: destinationDir,
    filename: filename,
  });

  return destinationPath;
}
