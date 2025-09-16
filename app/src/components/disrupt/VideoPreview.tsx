import React, { useRef } from 'react';
import { Platform, View } from 'react-native';
import Video from 'react-native-video';

type Props = {
  source: string;
  style?: any;
  muted?: boolean;
  loop?: boolean;
};

export default function VideoPreview({ source, style, muted = true, loop = true }: Props) {
  const ref = useRef<Video | null>(null);
  return (
    <View style={style}>
      <Video
        ref={(r) => (ref.current = r)}
        source={{ uri: source }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
        repeat={loop}
        muted={muted}
        paused={false}
        playInBackground={false}
        playWhenInactive={false}
        ignoreSilentSwitch={Platform.OS === 'ios' ? 'obey' : undefined}
      />
    </View>
  );
}


