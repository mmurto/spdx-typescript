import { toJson } from 'xml2json';
import { readFile, writeFile } from 'fs';
import { SpdxXmlFile } from './spdx.types';
import { parseSpdx } from './parser';

readFile('./examples/spdx.rdf', (err, data) => {
  const json: SpdxXmlFile = toJson(data.toString(), {
    object: true,
  }) as SpdxXmlFile;
  writeFile('./examples/spdx.json', JSON.stringify(json, null, 2), () => true);

  const packageData = parseSpdx(json);
  writeFile(
    './examples/spdx_output.json',
    JSON.stringify(packageData, null, 2),
    () => true
  );
});
