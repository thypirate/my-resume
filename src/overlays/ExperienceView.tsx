import { experience } from '../data/experience';

export function ExperienceView() {
  return (
    <section aria-label="Work experience">
      <h1 className="overlay-title">Work Experience</h1>
      <div className="timeline">
        {experience.map((job) => (
          <article key={`${job.company}-${job.period}`} className="timeline-item">
            <div className="timeline-meta">
              <span className="timeline-period">{job.period}</span>
            </div>
            <div className="timeline-content">
              <h2 className="timeline-role">{job.role}</h2>
              <h3 className="timeline-company">{job.company}</h3>
              <p className="timeline-desc">{job.description}</p>
              <ul className="tag-list" aria-label="Technologies used">
                {job.tech.map((t) => (
                  <li key={t} className="tag tag--experience">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
