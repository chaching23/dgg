export type GameInfo = {
  id: string;
  title: string;
  previewVideo: string; // remote mp4 or streaming URL
  fallbackImage?: any; // require(...) optional
  unityTarget?: string; // optional identifier used by Unity
};

export const GAMES: GameInfo[] = [
  {
    id: 'runner',
    title: 'Neon Runner',
    previewVideo: 'https://cdn.coverr.co/videos/coverr-futuristic-tunnel-1865/1080p.mp4',
  },
  {
    id: 'puzzle',
    title: 'Gem Puzzle',
    previewVideo: 'https://cdn.coverr.co/videos/coverr-abstract-waves-2145/1080p.mp4',
  },
  {
    id: 'blaster',
    title: 'Star Blaster',
    previewVideo: 'https://cdn.coverr.co/videos/coverr-nebula-4056/1080p.mp4',
  },
  {
    id: 'hoops',
    title: 'Sky Hoops',
    previewVideo: 'https://cdn.coverr.co/videos/coverr-cloudscape-4938/1080p.mp4',
  },
];

export function getGameById(id?: string | null): GameInfo | undefined {
  if (!id) return undefined;
  return GAMES.find((g) => g.id === id);
}


