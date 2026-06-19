import { create } from 'zustand';

export type ZoneId = 'experience' | 'education' | 'skills' | 'projects';

interface PortfolioStore {
  nearZone: ZoneId | null;
  activeZone: ZoneId | null;
  isOverlayOpen: boolean;
  setNearZone: (zone: ZoneId | null) => void;
  openZone: (zone: ZoneId) => void;
  closeOverlay: () => void;
}

export const useStore = create<PortfolioStore>((set) => ({
  nearZone: null,
  activeZone: null,
  isOverlayOpen: false,
  setNearZone: (zone) => set({ nearZone: zone }),
  openZone: (zone) => set({ activeZone: zone, isOverlayOpen: true }),
  closeOverlay: () => set({ isOverlayOpen: false, activeZone: null }),
}));
