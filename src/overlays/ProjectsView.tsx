import { projects } from "../data/projects";

export function ProjectsView() {
  return (
    <section aria-label="Projects">
      <h1 className="overlay-title">Recent Projects</h1>
      <div className="projects-grid">
        {projects.map((proj) => (
          <article key={proj.name} className="project-card">
            <h2 className="project-name">{proj.name}</h2>
            <p className="project-desc">{proj.description}</p>
            <ul className="tag-list" aria-label="Technologies">
              {proj.tech.map((t) => (
                <li key={t} className="tag tag--project">
                  {t}
                </li>
              ))}
            </ul>
            {(proj.url || proj.repo) && (
              <div className="project-links">
                {proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Live ↗
                  </a>
                )}
                {proj.repo && (
                  <a
                    href={proj.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Code ↗
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
