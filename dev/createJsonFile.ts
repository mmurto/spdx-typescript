import { toJson } from 'xml2json';
import { readFile, writeFile } from 'fs';
import { json2ts } from 'json-ts';

readFile('./test_project/SPDX2_test_project_spdx.rdf', (err, data) => {
  const json = toJson(data.toString(), {
    arrayNotation: ['spdx:licenseInfoInFile', 'spdx:creator', 'spdx:member'],
  });

  writeFile('./dev/spdx.json', JSON.stringify(json, null, 2), () => null);
  writeFile('./dev/spdx.types.ts', json2ts(json), () => null);
});
