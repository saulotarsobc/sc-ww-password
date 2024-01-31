export interface wifiProfile {
  WLANProfile: Wlanprofile;
}

export interface Wlanprofile {
  xmlns: string;
  name: string;
  SSIDConfig: Ssidconfig;
  connectionType: string;
  connectionMode: string;
  MSM: Msm;
  MacRandomization: MacRandomization;
}

export interface Ssidconfig {
  SSID: Ssid;
}

export interface Ssid {
  hex: string;
  name: string;
}

export interface Msm {
  security: Security;
}

export interface Security {
  authEncryption: AuthEncryption;
  sharedKey: SharedKey;
}

export interface AuthEncryption {
  authentication: string;
  encryption: string;
  useOneX: string;
}

export interface SharedKey {
  keyType: string;
  protected: string;
  keyMaterial: string;
}

export interface MacRandomization {
  xmlns: string;
  enableRandomization: string;
  randomizationSeed: string;
}
