import type { FormSchema } from '@/components/FormGenerator/types';
import { OutputPresentation } from '@/components/OutputPresentation/OutputPresentation';
import { Component, type ReactNode } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

import type { DataGroup } from '@/cora/cora-data/types.server';
import { useState } from 'react';

const defaultFormSchema: FormSchema = {
  form: {
    name: 'root',
    label: 'Root',
    showLabel: true,
    type: 'group',
    presentationId: 'rootPGroup',
    components: [
      {
        type: 'textVariable',
        presentationId: 'field1TextPVar',
        name: 'field1',
        label: 'Field 1',
        showLabel: true,
        textStyle: 'bodyTextStyle',
      },
      {
        type: 'textVariable',
        presentationId: 'field2TextPVar',
        name: 'field2',
        label: 'Field 2',
        showLabel: true,
        textStyle: 'bodyTextStyle',
      },
    ],
  },
};

const defaultData: DataGroup = {
  name: 'root',
  children: [
    {
      name: 'field1',
      value: 'Value for field 1',
    },
    {
      name: 'field2',
      value: 'Value for field 2',
    },
  ],
};

export default function PresentationPlayground() {
  const [formSchema, setFormSchema] = useState<FormSchema | null>(
    defaultFormSchema,
  );
  const [data, setData] = useState<DataGroup | null>(defaultData);
  const [formSchemaJson, setFormSchemaJson] = useState(
    JSON.stringify(defaultFormSchema, null, 2),
  );
  const [dataJson, setDataJson] = useState(
    JSON.stringify(defaultData, null, 2),
  );
  const [formSchemaError, setFormSchemaError] = useState<string | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);
  return (
    <div className='grid main-content'>
      <div className='grid-col-12'>
        <h1>Presentation playground</h1>
      </div>
      <div
        className='grid-col-8'
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '800px' }}
        >
          Form schema
          <CodeMirror
            value={formSchemaJson}
            height='100%'
            extensions={[json()]}
            theme='light'
            onChange={(value) => {
              setFormSchemaJson(value);
              try {
                const parsed = JSON.parse(value);
                setFormSchema(parsed);
                setFormSchemaError(null);
              } catch (error) {
                setFormSchemaError('Invalid JSON for form schema');
                console.error('Invalid JSON for form schema', error);
              }
            }}
          />
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '800px' }}
        >
          Data
          <CodeMirror
            value={dataJson}
            height='100%'
            extensions={[json()]}
            theme='light'
            onChange={(value) => {
              setDataJson(value);
              try {
                const parsed = JSON.parse(value);
                setData(parsed);
                setDataError(null);
              } catch (error) {
                console.error('Invalid JSON for data', error);
                setDataError('Invalid JSON for data');
              }
            }}
          />
        </div>
      </div>
      <div className='grid-col-4 output-card'>
        <ErrorBoundary key={formSchemaJson + dataJson}>
          {formSchema && data && !formSchemaError && !dataError && (
            <OutputPresentation formSchema={formSchema} data={data} />
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
}

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    console.error('Error in OutputPresentation:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', padding: '1rem' }}>
          An error occurred while rendering the output.
        </div>
      );
    }
    return this.props.children;
  }
}
