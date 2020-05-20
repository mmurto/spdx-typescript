import { parseRdfSPDX } from './parsers/rdfParser';
import { readFile, writeFile } from 'fs';
import { SpdxBuilder } from './spdx/spdxBuilder';

readFile('./files/spdx.rdf', (err, data) => {
  try {
    writeFile(
      './files/test1.json',
      JSON.stringify(parseRdfSPDX(data), null, 2),
      () => null
    );
  } catch (error) {
    console.log(`parseRdfSPDX: ${error.stack}`);
  }

  try {
    const spdxClass = new SpdxBuilder().readSpdxReport(data).build();
    console.log(spdxClass.getUniqueLicenses());
  } catch (error) {
    console.log(`spdxClass: ${error.stack}`);
  }
});
