import type { RelatedItemProjectGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { useId } from 'react';
import { href, Link } from 'react-router';
import { Term } from './Term';
import { TitleInfo } from './TitleInfo';
import { createTitle } from '../utils/createTitle';

interface ProjectProps {
  project: RelatedItemProjectGroup | undefined;
}

export const Project = ({ project }: ProjectProps) => {
  const language = useLanguage();
  const id = useId();
  if (!project) return null;

  return (
    <section aria-labelledby={id}>
      <h2 id={id}>{project.__text[language]}</h2>
      <dl>
        {project.project && (
          <Term
            label={project.project?.__text[language]}
            value={
              <Link
                to={href('/:recordType/:recordId', {
                  recordType:
                    project.project?.linkedRecord?.project?.recordInfo.type
                      .value,
                  recordId: project.project?.value,
                })}
              >
                {createTitle(project.project?.linkedRecord?.project?.titleInfo)}
              </Link>
            }
          />
        )}
        <TitleInfo titleInfo={project.titleInfo} />
      </dl>
    </section>
  );
};
