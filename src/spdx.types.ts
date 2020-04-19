export interface SpdxXmlFile {
  'rdf:RDF': XmlRdfRdf;
}

export interface XmlRdfRdf {
  'xmlns:rdf': string;
  'xmlns:spdx': string;
  'xmlns:rdfs': string;
  'spdx:SpdxDocument': XmlSpdxSpdxDocument;
}

export interface XmlSpdxSpdxDocument {
  'rdf:about': string;
  'spdx:specVersion': string;
  'spdx:dataLicense': XmlSpdxDataLicenseElement;
  'spdx:creationInfo': XmlSpdxCreationInfo;
  'spdx:name': string;
  'rdfs:comment': string;
  'spdx:hasExtractedLicensingInfo': XmlSpdxHasExtractedLicensingInfo[];
  'spdx:relationship': XmlSpdxRelationship;
}

export interface XmlSpdxCreationInfo {
  'spdx:CreationInfo': XmlSpdxCreationInfoClass;
}

export interface XmlSpdxCreationInfoClass {
  'spdx:licenseListVersion': string;
  'spdx:creator': string[];
  'spdx:created': Date;
}

export interface XmlSpdxDataLicenseElement {
  'rdf:resource': string;
}

export interface XmlSpdxHasExtractedLicensingInfo {
  'spdx:ExtractedLicensingInfo': XmlSpdxExtractedLicensingInfo;
}

export interface XmlSpdxExtractedLicensingInfo {
  'rdf:about': string;
  'spdx:licenseId': string;
  'spdx:name': string;
  'spdx:extractedText': string;
}

export interface XmlSpdxRelationship {
  'spdx:Relationship': XmlSpdxRelationshipClass;
}

export interface XmlSpdxRelationshipClass {
  'spdx:relationshipType': XmlSpdxDataLicenseElement;
  'spdx:relatedSpdxElement': XmlSpdxRelatedSpdxElement;
}

export interface XmlSpdxRelatedSpdxElement {
  'spdx:Package': XmlSpdxPackage;
}

export interface XmlSpdxPackage {
  'rdf:about': string;
  'spdx:name': string;
  'spdx:packageFileName': string;
  'spdx:downloadLocation': XmlSpdxDataLicenseElement;
  'spdx:packageVerificationCode': XmlSpdxPackageVerificationCode;
  'spdx:checksum': XmlSpdxChecksum[];
  'spdx:licenseConcluded': XmlSpdxLicenseConcludedElement[];
  'spdx:licenseComments': string;
  'spdx:licenseDeclared': XmlSpdxDataLicenseElement;
  'spdx:licenseInfoFromFiles': XmlSpdxDataLicenseElement;
  'spdx:copyrightText': XmlSpdxDataLicenseElement;
  'spdx:hasFile': XmlSpdxHasFile[];
}

export interface XmlSpdxChecksum {
  'spdx:Checksum': XmlSpdxChecksumClass;
}

export interface XmlSpdxChecksumClass {
  'spdx:algorithm': XmlSpdxDataLicenseElement;
  'spdx:checksumValue': string;
}

export interface XmlSpdxHasFile {
  'spdx:File': XmlSpdxFile;
}

export interface XmlSpdxFile {
  'rdf:about': string;
  'spdx:fileName': string;
  'spdx:checksum': XmlSpdxChecksum[];
  'spdx:licenseConcluded': XmlSpdxFileSpdxLicenseConcluded;
  'spdx:licenseInfoInFile':
    | XmlSpdxDataLicenseElement[]
    | XmlSpdxDataLicenseElement;
  'spdx:copyrightText': XmlSpdxDataLicenseElement | string;
}

export interface XmlSpdxFileSpdxLicenseConcluded {
  'spdx:DisjunctiveLicenseSet'?: XmlSpdxDisjunctiveLicenseSet;
  'rdf:resource'?: string;
}

export interface XmlSpdxDisjunctiveLicenseSet {
  'spdx:member': XmlSpdxDataLicenseElement[] | XmlSpdxDataLicenseElement;
}

export interface XmlSpdxLicenseConcludedElement {
  'spdx:DisjunctiveLicenseSet'?: string;
  'rdf:resource'?: string;
}

export interface XmlSpdxPackageVerificationCode {
  'spdx:PackageVerificationCode': XmlSpdxPackageVerificationCodeClass;
}

export interface XmlSpdxPackageVerificationCodeClass {
  'spdx:packageVerificationCodeValue': string;
}
