import { toJson } from 'xml2json';
import { IRootObject } from './spdx_types';
import { SPDX } from './spdx';
import { IRootObject2 } from './spdx_types_2';

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

export const parseRdfSPDX = (input: any): SPDX => {
  const data: IRootObject2 = (toJson(input.toString(), {
    object: true,
    arrayNotation: ['spdx:licenseInfoInFile', 'spdx:creator', 'spdx:member'],
  }) as unknown) as IRootObject2;

  const SPDXDocumentNamespace = data['rdf:RDF']['spdx:SpdxDocument'][
    'rdf:about'
  ].replace('#SPDXRef-DOCUMENT', '');

  const removeNamespace = (item: string): string => {
    return item.replace(`${SPDXDocumentNamespace}#`, '');
  };

  const removeLicenseUri = (item: string): string => {
    return item.replace('http://spdx.org/licenses/', '');
  };

  const removeSPDXTermUri = (item: string): string => {
    return item.replace('http://spdx.org/rdf/terms#', '');
  };

  const spdxPackage =
    data['rdf:RDF']['spdx:SpdxDocument']['spdx:relationship'][
      'spdx:Relationship'
    ]['spdx:relatedSpdxElement']['spdx:Package'];

  const spdx: SPDX = {
    documentCreationInformation: {
      SPDXVersion: data['rdf:RDF']['spdx:SpdxDocument']['spdx:specVersion'],
      dataLicense: removeLicenseUri(
        data['rdf:RDF']['spdx:SpdxDocument']['spdx:dataLicense']['rdf:resource']
      ),
      SPDXIdentifier: removeNamespace(
        data['rdf:RDF']['spdx:SpdxDocument']['rdf:about']
      ),
      documentName: data['rdf:RDF']['spdx:SpdxDocument']['spdx:name'],
      SPDXDocumentNamespace: SPDXDocumentNamespace,
      licenseListVersion:
        data['rdf:RDF']['spdx:SpdxDocument']['spdx:creationInfo'][
          'spdx:CreationInfo'
        ]['spdx:licenseListVersion'],
      creator: {
        person:
          data['rdf:RDF']['spdx:SpdxDocument']['spdx:creationInfo'][
            'spdx:CreationInfo'
          ]['spdx:creator']
            .find((e) => e.includes('Person: '))
            ?.replace('Person: ', '') || '',
        organization:
          data['rdf:RDF']['spdx:SpdxDocument']['spdx:creationInfo'][
            'spdx:CreationInfo'
          ]['spdx:creator']
            .find((e) => e.includes('Organization: '))
            ?.replace('Organization: ', '') || '',
        tool:
          data['rdf:RDF']['spdx:SpdxDocument']['spdx:creationInfo'][
            'spdx:CreationInfo'
          ]['spdx:creator']
            .find((e) => e.includes('Tool: '))
            ?.replace('Tool: ', '') || '',
      },
      created:
        data['rdf:RDF']['spdx:SpdxDocument']['spdx:creationInfo'][
          'spdx:CreationInfo'
        ]['spdx:created'],
      documentComment: data['rdf:RDF']['spdx:SpdxDocument']['rdfs:comment'],
    },
    packageInformation: {
      packageName: spdxPackage['spdx:name'],
      packageSPDXIdentifier: removeNamespace(spdxPackage['rdf:about']),
      // packageVersion
      packangeFileName: spdxPackage['spdx:packageFileName'],
      // packageSupplier
      // packageOriginator
      packageDownloadLocation: removeSPDXTermUri(
        spdxPackage['spdx:downloadLocation']['rdf:resource']
      ),
      // filesAnalyzed
      packageVerificationCode:
        spdxPackage['spdx:packageVerificationCode'][
          'spdx:PackageVerificationCode'
        ]['spdx:packageVerificationCodeValue'],
      packageChecksum: {
        SHA1: spdxPackage['spdx:checksum'].find(
          (e) =>
            e['spdx:Checksum']['spdx:algorithm']['rdf:resource'].replace(
              SPDX_ALGORITHM_URI,
              ''
            ) === 'sha1'
        )?.['spdx:Checksum']['spdx:checksumValue'],
        SHA256: spdxPackage['spdx:checksum'].find(
          (e) =>
            e['spdx:Checksum']['spdx:algorithm']['rdf:resource'].replace(
              SPDX_ALGORITHM_URI,
              ''
            ) === 'sha256'
        )?.['spdx:Checksum']['spdx:checksumValue'],
        MD5: spdxPackage['spdx:checksum'].find(
          (e) =>
            e['spdx:Checksum']['spdx:algorithm']['rdf:resource'].replace(
              SPDX_ALGORITHM_URI,
              ''
            ) === 'md5'
        )?.['spdx:Checksum']['spdx:checksumValue'],
      },
      // packageHomePage
      // sourceInformation
      concludedLicense: spdxPackage['spdx:licenseConcluded']
        .map((e) => {
          return removeLicenseUri(removeSPDXTermUri(e['rdf:resource'] || ''));
        })
        .filter((e) => e),
      allLicensesInformationFromFiles: removeSPDXTermUri(
        spdxPackage['spdx:licenseInfoFromFiles']['rdf:resource']
      ),
      declaredLicense: removeSPDXTermUri(
        spdxPackage['spdx:licenseDeclared']['rdf:resource']
      ),
      commentsOnLicense: spdxPackage['spdx:licenseComments'],
      copyrightText: removeSPDXTermUri(
        spdxPackage['spdx:copyrightText']['rdf:resource']
      ),
      // packageSummaryDescription
      // packageDetailedDescription
      // packageComment
      // externalReference
      // externalReferenceComment
    },
    fileInformation: spdxPackage['spdx:hasFile'].map((file) => {
      return {
        fileName: file['spdx:File']['spdx:fileName'],
        fileSPDXIdentifier: removeNamespace(file['spdx:File']['rdf:about']),
        // fileType
        fileChecksum: {
          SHA1:
            file['spdx:File']['spdx:checksum'].find(
              (e) =>
                e['spdx:Checksum']['spdx:algorithm']['rdf:resource'].replace(
                  SPDX_ALGORITHM_URI,
                  ''
                ) === 'sha1'
            )?.['spdx:Checksum']['spdx:checksumValue'] || 'SHA1 NOT FOUND',
          SHA256: file['spdx:File']['spdx:checksum'].find(
            (e) =>
              e['spdx:Checksum']['spdx:algorithm']['rdf:resource'].replace(
                SPDX_ALGORITHM_URI,
                ''
              ) === 'sha256'
          )?.['spdx:Checksum']['spdx:checksumValue'],
          MD5: file['spdx:File']['spdx:checksum'].find(
            (e) =>
              e['spdx:Checksum']['spdx:algorithm']['rdf:resource'].replace(
                SPDX_ALGORITHM_URI,
                ''
              ) === 'md5'
          )?.['spdx:Checksum']['spdx:checksumValue'],
        },
        concludedLicense: file['spdx:File']['spdx:licenseConcluded'][
          'spdx:DisjunctiveLicenseSet'
        ]
          ? file['spdx:File']['spdx:licenseConcluded'][
              'spdx:DisjunctiveLicenseSet'
            ]['spdx:member'].map((e) => {
              return removeNamespace(removeLicenseUri(e['rdf:resource']));
            })
          : [],
        licenseInformationInFile: file['spdx:File'][
          'spdx:licenseInfoInFile'
        ].map((e) => {
          return removeLicenseUri(removeNamespace(e['rdf:resource']));
        }),
        // commentsOnLicense
        copyrightText: file['spdx:File']['spdx:copyrightText'],
        // fileComment
        // fileNotice
        // fileContributor
      };
    }),
    // snippetInformation
    otherLicensingInformation: data['rdf:RDF']['spdx:SpdxDocument'][
      'spdx:hasExtractedLicensingInfo'
    ].map((e) => {
      return {
        licenseIdentifier: e['spdx:ExtractedLicensingInfo']['spdx:licenseId'],
        extractedText: e['spdx:ExtractedLicensingInfo']['spdx:extractedText'],
        licenseName: e['spdx:ExtractedLicensingInfo']['spdx:name'],
        // licenseCrossReference
        // licenseComment
      };
    }),
  };

  return spdx;
};

export const parseSpdx = (input: any): Package => {
  const data: IRootObject = (toJson(input.toString(), {
    object: true,
    arrayNotation: ['spdx:member', 'spdx:licenseInfoInFile'],
  }) as unknown) as IRootObject;

  const REPLACE_URI = data['rdf:RDF']['spdx:SpdxDocument']['rdf:about'].replace(
    'SPDXRef-DOCUMENT',
    ''
  );

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
            licenseInfoInFile['rdf:resource']
              .replace(SPDX_LICENSE_URI, '')
              .replace(REPLACE_URI, '')
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
          member['rdf:resource']
            .replace(SPDX_LICENSE_URI, '')
            .replace(REPLACE_URI, '')
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
