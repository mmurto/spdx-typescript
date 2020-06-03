import { readFile, writeFile } from 'fs';
import { json2ts } from 'json-ts';

readFile('./test_project/ort/ort_objection.json', (err, data) => {
  const types = json2ts(data.toString());

  writeFile('./dev/ort.types.ts', types, () => null);
});
