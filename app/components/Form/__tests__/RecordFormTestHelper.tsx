import { RecordForm } from '@/components/Form/RecordForm';
import { createDefaultValuesFromFormSchema } from '@/components/FormGenerator/defaultValues/defaultValues';
import type { RecordFormSchema } from '@/components/FormGenerator/types';
import type { BFFDataRecord } from '@/types/record';
import { createRoutesStub } from 'react-router';
import { vi } from 'vitest';

export const actionSpy = vi.fn();

export const RecordFormWithRoutesStub = ({
  formSchema,
  record,
}: {
  formSchema: RecordFormSchema;
  record?: BFFDataRecord;
}) => {
  const RoutesStub = createRoutesStub([
    {
      path: '/',
      Component: () => (
        <RecordForm
          formSchema={formSchema}
          defaultValues={createDefaultValuesFromFormSchema(
            formSchema,
            record?.data,
          )}
        />
      ),
      action: actionSpy,
    },
  ]);

  // eslint-disable-next-line react-hooks/static-components
  return <RoutesStub />;
};
