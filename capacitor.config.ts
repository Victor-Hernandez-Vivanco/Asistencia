// import { CapacitorConfig } from '@capacitor/cli';

// const config: CapacitorConfig = {
//   appId: 'io.ionic.starter',
//   appName: 'testqr',
//   webDir: 'www',
//   server: {
//     androidScheme: 'https'
//   }
  
// };

// export default config;

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'testqr',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    BarcodeScanner: {
      CAMERA_USAGE_DESCRIPTION: 'Se requiere acceso a la cámara para escanear códigos de barras.'
    }
  },
};

export default config;

