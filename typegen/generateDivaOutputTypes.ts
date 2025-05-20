import path from 'path';
import fs from 'fs';
import { getDependencies, loadDependencies } from 'server/depencencies';
import type {
  BFFMetadata,
  BFFMetadataGroup,
} from '@/cora/transform/bffTypes.server';

const generateDivaOutputTypes = async () => {
  const { recordTypePool, validationTypePool, metadataPool } =
    await getDependencies();

  const divaRecordType = recordTypePool.get('diva-output');
  const validationType = validationTypePool.get('diva-output');
  const metadataGroup = metadataPool.get(validationType.metadataGroupId);
  console.log('divaRecordType', divaRecordType);
  console.log('validationType', validationType);
  console.log('metadataGroup', metadataGroup);

  const types = `
/**
 * Auto-generated types
 * Date: ${new Date().toISOString()}
 */

export interface DivaOutput {
  id: string;
}

`;

  const outputPath = new URL('./generated-types.ts', import.meta.url);
  // Write types to file
  fs.writeFileSync(outputPath, types.trim() + '\n', 'utf8');

  console.log('Types generated at:', outputPath);
};

generateDivaOutputTypes();
