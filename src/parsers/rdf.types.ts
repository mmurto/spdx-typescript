export interface SpdxRdf {
  'rdf:RDF': {
    'xmlns:rdf': string;
    'xmlns:spdx': string;
    'xmlns:rdfs': string;
    'spdx:SpdxDocument': {
      'rdf:about': string;
      'spdx:specVersion': string;
      'spdx:dataLicense': {
        'rdf:resource': string;
      };
      'spdx:creationInfo': {
        'spdx:CreationInfo': {
          'spdx:licenseListVersion': string;
          'spdx:creator': string[];
          'spdx:created': string;
        };
      };
      'spdx:name': string;
      'rdfs:comment': string;
      'spdx:hasExtractedLicensingInfo': ISpdxHasExtractedLicensingInfoItem[];
      'spdx:relationship': {
        'spdx:Relationship': {
          'spdx:relationshipType': {
            'rdf:resource': string;
          };
          'spdx:relatedSpdxElement': {
            'spdx:Package': {
              'rdf:about': string;
              'spdx:name': string;
              'spdx:packageFileName': string;
              'spdx:downloadLocation': {
                'rdf:resource': string;
              };
              'spdx:packageVerificationCode': {
                'spdx:PackageVerificationCode': {
                  'spdx:packageVerificationCodeValue': string;
                };
              };
              'spdx:checksum': ISpdxChecksumItem[];
              'spdx:licenseConcluded': ISpdxLicenseConcludedItem[];
              'spdx:licenseComments': string;
              'spdx:licenseDeclared': {
                'rdf:resource': string;
              };
              'spdx:licenseInfoFromFiles': {
                'rdf:resource': string;
              };
              'spdx:copyrightText': {
                'rdf:resource': string;
              };
              'spdx:hasFile': ISpdxHasFileItem[];
            };
          };
        };
      };
    };
  };
}
interface ISpdxHasExtractedLicensingInfoItem {
  'spdx:ExtractedLicensingInfo': {
    'rdf:about': string;
    'spdx:licenseId': string;
    'spdx:name': string;
    'spdx:extractedText': string;
  };
}
interface ISpdxChecksumItem {
  'spdx:Checksum': {
    'spdx:algorithm': {
      'rdf:resource': string;
    };
    'spdx:checksumValue': string;
  };
}
interface ISpdxLicenseConcludedItem {
  'spdx:DisjunctiveLicenseSet'?: string;
  'rdf:resource'?: string;
}
interface ISpdxHasFileItem {
  'spdx:File': {
    'rdf:about': string;
    'spdx:fileName': string;
    'spdx:checksum': ISpdxChecksumItem[];
    'spdx:licenseConcluded': {
      'spdx:DisjunctiveLicenseSet': {
        'spdx:member': ISpdxMemberItem[];
      };
    };
    'spdx:licenseInfoInFile': ISpdxLicenseInfoInFileItem[];
    'spdx:copyrightText': string;
    'spdx:licenseComments': string;
  };
}
interface ISpdxMemberItem {
  'rdf:resource': string;
}
interface ISpdxLicenseInfoInFileItem {
  'rdf:resource': string;
}
