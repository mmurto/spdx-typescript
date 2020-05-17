import { parseRdfSPDX, parseSpdx } from './rdfParser';
import { readFile, writeFile } from 'fs';
import { Spdx } from './spdx/spdx';
import { SpdxBuilder } from './spdx/spdxBuilder';

readFile('./examples/spdx.rdf', (err, data) => {
  try {
    writeFile(
      './examples/test1.json',
      JSON.stringify(parseRdfSPDX(data), null, 2),
      () => null
    );
  } catch (error) {
    console.log(`parseRdfSPDX: ${error.stack}`);
  }

  try {
    writeFile(
      './examples/test2.json',
      JSON.stringify(parseSpdx(data), null, 2),
      () => null
    );
  } catch (error) {
    console.log(`parseSPDX: ${error.stack}`);
  }

  try {
    const spdxClass = new SpdxBuilder().readSpdxReport(data).build();
    console.log(spdxClass.getUniqueLicenses());
  } catch (error) {
    console.log(`spdxClass: ${error.stack}`);
  }
});
