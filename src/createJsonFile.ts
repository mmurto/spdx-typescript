import { toJson } from 'xml2json';
import { readFile, writeFile } from 'fs';
import { json2ts } from 'json-ts';

readFile('./examples/spdx.rdf', (err, data) => {
  const json = toJson(data.toString(), { arrayNotation: ['spdx:member'] });

  writeFile('./examples/spdx.json', JSON.stringify(json, null, 2), () => null);
  writeFile('./examples/spdx_types.ts', json2ts(json), () => null);
});
