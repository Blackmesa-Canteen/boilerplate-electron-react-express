// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example' | 'image-downloaded';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },

    downloadAsset(url: string) {
      ipcRenderer.send('download-asset', url);
    },

    onAssetDownloaded(func: (path: string) => void) {
      console.log('Setting up ipcRenderer listener for image-downloaded');
      const subscription = (_event: IpcRendererEvent, path: string) => {
        console.log('image-downloaded event received in ipcRenderer');
        func(path);
      };
      ipcRenderer.on('image-downloaded', subscription);

      return () => {
        ipcRenderer.removeListener('image-downloaded', subscription);
      };
    },

  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
