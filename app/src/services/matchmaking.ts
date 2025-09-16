import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function connectMatchmaking(baseUrl = 'http://localhost:4000') {
  if (!socket) socket = io(baseUrl, { transports: ['websocket'] });
  return socket!;
}

export function joinQueue({ playerId, stake }: { playerId: string; stake: number }) {
  socket?.emit('queue:join', { playerId, stake });
}

export function onMatchStart(cb: (p: { matchId: string; seed: number; t0: number }) => void) {
  socket?.on('match:start', cb);
}

export function finishMatch({ matchId, score }: { matchId: string; score: number }) {
  socket?.emit('match:finish', { matchId, score });
}

export function onMatchResult(cb: (p: any) => void) {
  socket?.on('match:result', cb);
}

export function offMatchStart(cb: (...args: any[]) => void) {
  socket?.off('match:start', cb);
}

export function offMatchResult(cb: (...args: any[]) => void) {
  socket?.off('match:result', cb);
}




