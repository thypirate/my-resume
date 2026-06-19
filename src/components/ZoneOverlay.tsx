import { useEffect } from 'react';
import { useStore } from '../store';
import { ExperienceView } from '../overlays/ExperienceView';
import { EducationView } from '../overlays/EducationView';
import { SkillsView } from '../overlays/SkillsView';
import { ProjectsView } from '../overlays/ProjectsView';

const ZONE_LABEL: Record<string, string> = {
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
};

const ZONE_COLOR: Record<string, string> = {
  experience: '#f59e0b',
  education: '#6366f1',
  skills: '#10b981',
  projects: '#ec4899',
};

export function ZoneOverlay() {
  const activeZone = useStore((s) => s.activeZone);
  const isOverlayOpen = useStore((s) => s.isOverlayOpen);
  const closeOverlay = useStore((s) => s.closeOverlay);

  useEffect(() => {
    if (!isOverlayOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeOverlay();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOverlayOpen, closeOverlay]);

  if (!isOverlayOpen || !activeZone) return null;

  return (
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${ZONE_LABEL[activeZone]} section`}
      onClick={closeOverlay}
    >
      <div
        className="overlay-card"
        onClick={(e) => e.stopPropagation()}
        style={{ '--zone-color': ZONE_COLOR[activeZone] } as React.CSSProperties}
      >
        <div className="overlay-header">
          <span className="overlay-zone-tag" style={{ color: ZONE_COLOR[activeZone] }}>
            {ZONE_LABEL[activeZone]}
          </span>
          <button
            className="overlay-close"
            onClick={closeOverlay}
            aria-label="Close overlay"
          >
            ✕
          </button>
        </div>

        {activeZone === 'experience' && <ExperienceView />}
        {activeZone === 'education' && <EducationView />}
        {activeZone === 'skills' && <SkillsView />}
        {activeZone === 'projects' && <ProjectsView />}

        <p className="overlay-esc-hint">Press ESC or click outside to close</p>
      </div>
    </div>
  );
}
