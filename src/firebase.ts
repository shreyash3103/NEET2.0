/** Firebase Google sign-in for the static GitHub Pages site. */

interface FirebaseUserLike {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface FirebaseAuthLike {
  onAuthStateChanged: (
    callback: (user: FirebaseUserLike | null) => void,
    onError?: (error: Error) => void
  ) => () => void;
  signInWithPopup: (provider: unknown) => Promise<unknown>;
  signOut: () => Promise<void>;
}

interface FirebaseCompatLike {
  apps: unknown[];
  initializeApp: (config: Record<string, string>) => unknown;
  auth: (() => FirebaseAuthLike) & { GoogleAuthProvider: new () => unknown };
}

declare global {
  interface Window {
    firebase?: FirebaseCompatLike;
  }
}

const firebaseConfig = {
  apiKey: 'AIzaSyDoRxpQ6zxoHWgwBa5_D2pjevLxdHKY10',
  authDomain: 'neet20-5c785.firebaseapp.com',
  projectId: 'neet20-5c785',
  storageBucket: 'neet20-5c785.firebasestorage.app',
  messagingSenderId: '514109047003',
  appId: '1:514109047003:web:9dc8564bae52fea026ccfe',
  measurementId: 'G-XSDKVV0Z2B',
};

let authInstance: FirebaseAuthLike | null = null;

export function getFirebaseAuth(): FirebaseAuthLike {
  if (authInstance) return authInstance;

  const firebase = window.firebase;
  if (!firebase) {
    throw new Error('Firebase could not load. Check your internet connection and reload the page.');
  }

  if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
  authInstance = firebase.auth();
  return authInstance;
}

export async function signInWithGoogle(): Promise<void> {
  const auth = getFirebaseAuth();
  const provider = new window.firebase!.auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider);
}

export type { FirebaseAuthLike, FirebaseUserLike };
