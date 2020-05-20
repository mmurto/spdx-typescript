import { toJson } from 'xml2json';
import { SPDX } from '../spdx/spdx.types';
import { SpdxRdf } from './rdf.types';

const SPDX_LICENSE_URI = 'http://spdx.org/licenses/';
const SPDX_ALGORITHM_URI = 'http://spdx.org/rdf/terms#checksumAlgorithm_';

export const parseRdfSPDX = (input: any): SPDX => {
  const data: SpdxRdf = (toJson(input.toString(), {
    object: true,
    arrayNotation: [
      'spdx:licenseInfoInFile',
      'spdx:creator',
      'spdx:member',
      'spdx:hasExtractedLicensingInfo',
    ],
  }) as unknown) as SpdxRdf;

  const SPDXDocumentNamespace = data['rdf:RDF']['spdx:SpdxDocument'][
    'rdf:about'
  ].replace('#SPDXRef-DOCUMENT', '');

  const removeNamespace = (item: string): string => {
    return decodeURIComponent(item.replace(`${SPDXDocumentNamespace}#`, ''));
  };

  const removeLicenseUri = (item: string): string => {
    return decodeURIComponent(item.replace('http://spdx.org/licenses/', ''));
  };

  const removeSPDXTermUri = (item: string): string => {
    return decodeURIComponent(item.replace('http://spdx.org/rdf/terms#', ''));
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
