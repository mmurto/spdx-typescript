import { toJson } from 'xml2json';
import { readFile, writeFile } from 'fs';
import { IRootObject } from './spdx_types';

const SPDX_LICENSE_URI = 'http://spdx.org/licenses/';
const SPDX_ALGORITHM_URI = 'http://spdx.org/rdf/terms#checksumAlgorithm_';

interface CreationInfo {
  creator: string[];
  date: Date;
}

interface Checksum {
  algorithm: string;
  value: string;
}

interface File {
  name: string;
  checksums: Checksum[];
  licenseConclusions: string[];
  scannerHits: string[];
}

interface Package {
  name: string;
  fileName: string;
  creationInfo: CreationInfo;
  checksums: Checksum[];
  files: File[];
}

export const parseSpdx = (input: any): Package => {
  const data: IRootObject = (toJson(input.toString(), {
    object: true,
    arrayNotation: ['spdx:member', 'spdx:licenseInfoInFile'],
  }) as unknown) as IRootObject;

  const packageSpdx =
    data['rdf:RDF']['spdx:SpdxDocument']['spdx:relationship'][
      'spdx:Relationship'
    ]['spdx:relatedSpdxElement']['spdx:Package'];

  const name = packageSpdx['spdx:name'];
  const fileName = packageSpdx['spdx:packageFileName'];
  const creator =
    data['rdf:RDF']['spdx:SpdxDocument']['spdx:creationInfo'][
      'spdx:CreationInfo'
    ]['spdx:creator'];
  const creationDate =
    data['rdf:RDF']['spdx:SpdxDocument']['spdx:creationInfo'][
      'spdx:CreationInfo'
    ]['spdx:created'];

  const creationInfo: CreationInfo = { creator, date: new Date(creationDate) };

  const checksums: Checksum[] = packageSpdx['spdx:checksum'].map((checksum) => {
    return {
      algorithm: checksum['spdx:Checksum']['spdx:algorithm'][
        'rdf:resource'
      ].replace(SPDX_ALGORITHM_URI, ''),
      value: checksum['spdx:Checksum']['spdx:checksumValue'],
    };
  });

  const files: File[] = packageSpdx['spdx:hasFile'].map((hasFile) => {
    const licenseConclusions: string[] = [];

    const scannerHits: string[] = [];

    if (hasFile['spdx:File']['spdx:licenseInfoInFile']) {
      hasFile['spdx:File']['spdx:licenseInfoInFile'].forEach(
        (licenseInfoInFile) => {
          scannerHits.push(
            licenseInfoInFile['rdf:resource'].replace(SPDX_LICENSE_URI, '')
          );
        }
      );
    }

    if (
      hasFile['spdx:File']['spdx:licenseConcluded'][
        'spdx:DisjunctiveLicenseSet'
      ]
    ) {
      hasFile['spdx:File']['spdx:licenseConcluded'][
        'spdx:DisjunctiveLicenseSet'
      ]['spdx:member'].forEach((member) => {
        licenseConclusions.push(
          member['rdf:resource'].replace(SPDX_LICENSE_URI, '')
        );
      });
    }

    return {
      name: hasFile['spdx:File']['spdx:fileName'],

      checksums: hasFile['spdx:File']['spdx:checksum'].map(
        (checksum): Checksum => {
          return {
            algorithm: checksum['spdx:Checksum']['spdx:algorithm'][
              'rdf:resource'
            ].replace(SPDX_ALGORITHM_URI, ''),
            value: checksum['spdx:Checksum']['spdx:checksumValue'],
          };
        }
      ),

      licenseConclusions,

      scannerHits,
    };
  });

  return {
    name: name,
    fileName: fileName,
    creationInfo: creationInfo,
    checksums: checksums,
    files: files,
  };
};
