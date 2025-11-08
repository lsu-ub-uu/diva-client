import { useTranslation } from 'react-i18next';
import { Form } from 'react-router';
import type { Option } from '..';
import { Button } from '../Button/Button';
import styles from './ValidationTypePicker.module.css';

interface ValidationTypePickerProps {
  validationTypes: Option[];
}

export const ValidationTypePicker = ({
  validationTypes,
}: ValidationTypePickerProps) => {
  const { t } = useTranslation();
  return (
    <Form method='GET'>
      <ul className={styles['validation-type-picker']}>
        {validationTypes.map((type) => (
          <li key={type.value}>
            <Button
              type='submit'
              fullWidth
              name='validationType'
              value={type.value}
              size='large'
            >
              {t(type.label)}
            </Button>
          </li>
        ))}
      </ul>
    </Form>
  );
};
