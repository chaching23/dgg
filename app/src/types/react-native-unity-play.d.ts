declare module 'react-native-unity-play' {
  import type { ViewStyle } from 'react-native';

  export const UnityView: (props: { style?: ViewStyle }) => any;

  export const UnityModule: {
    addMessageHandler: (handler: (msg: any) => void, deps?: any[]) => { remove: () => void };
    postMessageToUnity: (message: string) => void;
  };
}



