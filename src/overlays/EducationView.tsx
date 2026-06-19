import { education } from '../data/education';

export function EducationView() {
  return (
    <section aria-label="Education">
      <h1 className="overlay-title">Education</h1>
      <div className="edu-list">
        {education.map((ed) => (
          <article key={`${ed.institution}-${ed.period}`} className="edu-item">
            <div className="edu-header">
              <div>
                <h2 className="edu-institution">{ed.institution}</h2>
                <p className="edu-degree">
                  {ed.degree} — {ed.field}
                </p>
              </div>
              <span className="edu-period">{ed.period}</span>
            </div>
            <ul className="edu-highlights" aria-label="Highlights">
              {ed.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
