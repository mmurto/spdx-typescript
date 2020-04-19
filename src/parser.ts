import { SpdxXmlFile, XmlSpdxDisjunctiveLicenseSet } from './spdx.types';

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
  licenseConclusions?: any;
}

interface Package {
  name: string;
  fileName: string;
  creationInfo: CreationInfo;
  checksums: Checksum[];
  files: File[];
}

export const parseSpdx = (json: SpdxXmlFile): Package => {
  const name =
    json['rdf:RDF']['spdx:SpdxDocument']['spdx:relationship'][
      'spdx:Relationship'
    ]['spdx:relatedSpdxElement']['spdx:Package']['spdx:name'];

  const fileName =
    json['rdf:RDF']['spdx:SpdxDocument']['spdx:relationship'][
      'spdx:Relationship'
    ]['spdx:relatedSpdxElement']['spdx:Package']['spdx:packageFileName'];

  const creationInfo: CreationInfo = {
    creator:
      json['rdf:RDF']['spdx:SpdxDocument']['spdx:creationInfo'][
        'spdx:CreationInfo'
      ]['spdx:creator'],
    date:
      json['rdf:RDF']['spdx:SpdxDocument']['spdx:creationInfo'][
        'spdx:CreationInfo'
      ]['spdx:created'],
  };

  const checksums: Checksum[] = json['rdf:RDF']['spdx:SpdxDocument'][
    'spdx:relationship'
  ]['spdx:Relationship']['spdx:relatedSpdxElement']['spdx:Package'][
    'spdx:checksum'
  ].map((item) => {
    return {
      algorithm: item['spdx:Checksum']['spdx:algorithm']['rdf:resource'],
      value: item['spdx:Checksum']['spdx:checksumValue'],
    };
  });

  const files: File[] = json['rdf:RDF']['spdx:SpdxDocument'][
    'spdx:relationship'
  ]['spdx:Relationship']['spdx:relatedSpdxElement']['spdx:Package'][
    'spdx:hasFile'
  ].map(
    (item): File => {
      return {
        name: item['spdx:File']['spdx:fileName'],

        checksums: item['spdx:File']['spdx:checksum'].map((checksum) => {
          return {
            algorithm:
              checksum['spdx:Checksum']['spdx:algorithm']['rdf:resource'],
            value: checksum['spdx:Checksum']['spdx:checksumValue'],
          };
        }),

        licenseConclusions:
          item['spdx:File']['spdx:licenseConcluded'][
            'spdx:DisjunctiveLicenseSet'
          ]?.['spdx:member'],
      };
    }
  );

  return {
    name,
    fileName,
    creationInfo,
    checksums,
    files,
  };
};
