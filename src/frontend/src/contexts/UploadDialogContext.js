// contexts/UploadDialogContext.js
import { createContext } from 'react';

export const UploadDialogContext = createContext({
  open: false,
  setOpen: () => {}
});
