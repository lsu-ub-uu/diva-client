import type { RelatedItemProjectGroup } from '@/generatedTypes/divaTypes';
import { getFullTitleForProject } from '@/utils/getRecordTitle';
import { useId } from 'react';
import { href, Link } from 'react-router';
import { DataText } from './DataText';
import { Term } from './Term';
import { TitleInfo } from './TitleInfo';

interface ProjectProps {
  project: RelatedItemProjectGroup | undefined;
}

export const Project = ({ project }: ProjectProps) => {
  const id = useId();
  if (!project) return null;

  return (
    <section aria-labelledby={id}>
      <h2 id={id}>
        <DataText data={project} />
      </h2>
      <dl>
        {project.project && (
          <Term
            label={project.project}
            value={
              <Link
                to={href('/:recordType/:recordId', {
                  recordType:
                    project.project?.linkedRecord?.project?.recordInfo.type
                      .value,
                  recordId: project.project?.value,
                })}
              >
                {getFullTitleForProject(project.project?.linkedRecord)}
              </Link>
            }
          />
        )}
        <TitleInfo titleInfo={project.titleInfo} />
        <Term
          label={project.identifier_type_project}
          value={project.identifier_type_project?.value}
        />
      </dl>
    </section>
  );
};
