import { readFile, writeFile } from 'fs';
import { parseJsonOrt } from '../src/ort/ortParser';

readFile('./test_project/ort/ort_objection.json', (err, data) => {
  parseJsonOrt(data.toString());
});
