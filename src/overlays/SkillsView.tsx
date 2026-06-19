import { skills } from '../data/skills';

export function SkillsView() {
  return (
    <section aria-label="Skills">
      <h1 className="overlay-title">Skills</h1>
      <div className="skills-grid">
        {skills.map((group) => (
          <article key={group.category} className="skill-group">
            <h2 className="skill-category">{group.category}</h2>
            <ul className="tag-list" aria-label={`${group.category} skills`}>
              {group.items.map((item) => (
                <li key={item} className="tag tag--skill">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
