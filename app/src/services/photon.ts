export const PHOTON_APP_ID = process.env.PHOTON_APP_ID || 'REPLACE_WITH_YOUR_APP_ID';
export const PHOTON_REGION = process.env.PHOTON_REGION || 'us';

export function buildPhotonRoomName(matchId?: string): string {
  return matchId ? `room_${matchId}` : `room_${Date.now()}`;
}

export function buildPhotonUserId(raw?: string): string {
  return raw && raw.length > 0 ? raw : `u_${Math.floor(Math.random() * 1e9)}`;
}



