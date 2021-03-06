export interface Creator {
  person: string;
  organization: string;
  tool: string;
}

export interface DocumentCreationInformation {
  SPDXVersion: string;
  dataLicense: string;
  SPDXIdentifier: string;
  documentName: string;
  SPDXDocumentNamespace: string;
  externalDocumentReferences?: string[];
  licenseListVersion?: string;
  creator: Creator;
  created: string;
  creatorComment?: string;
  documentComment?: string;
}

export interface FileChecksum {
  SHA1: string;
  SHA256?: string;
  MD5?: string;
}

export enum FileType {
  SOURCE,
  BINARY,
  ARCHIVE,
  APPLICATION,
  AUDIO,
  IMAGE,
  TEXT,
  VIDEO,
  DOCUMENTATION,
  SPDX,
  OTHER,
}

export interface SnippetRange {
  startPointer: number;
  endPointer: number;
}

export interface SnippetInformation {
  snippetSPDXIdentifier: string;
  snippetFromFileSPDXIdentifier: string;
  snippetByteRange: SnippetRange;
  snippetLineRange?: SnippetRange;
  snippetConcludedLicense: string;
  licenseInformationInSnippet?: string[];
  snippetCommentsOnLicense?: string;
  snippetCopyrightText: string;
  snippetComment?: string;
  snippetName?: string;
}

export interface FileInformation {
  fileName: string;
  fileSPDXIdentifier: string;
  fileType?: FileType[];
  fileChecksum: FileChecksum;
  concludedLicense: string[];
  licenseInformationInFile: string[];
  commentsOnLicense?: string;
  copyrightText: string;
  fileComment?: string;
  fileNotice?: string;
  fileContributor?: string;
}

export interface OtherLicensingInformationDetected {
  licenseIdentifier?: string;
  extractedText?: string;
  licenseName?: string;
  licenseCrossReference?: string[];
  licenseComment?: string;
}

export interface PackageChecksum {
  SHA1?: string;
  SHA256?: string;
  MD5?: string;
}

export interface PackageInformation {
  packageName: string;
  packageSPDXIdentifier: string;
  packageVersion?: string;
  packangeFileName?: string;
  packageSupplier?: string;
  packageOriginator?: string;
  packageDownloadLocation: string;
  filesAnalyzed?: boolean;
  packageVerificationCode: string;
  packageChecksum?: PackageChecksum;
  packageHomePage?: string;
  sourceInformation?: string;
  concludedLicense: string[];
  allLicensesInformationFromFiles: string;
  declaredLicense: string;
  commentsOnLicense?: string;
  copyrightText: string;
  packageSummaryDescription?: string;
  packageDetailedDescription?: string;
  packageComment?: string;
  externalReference?: string[];
  externalReferenceComment?: string;
}

export interface SPDX {
  documentCreationInformation: DocumentCreationInformation;
  packageInformation: PackageInformation;
  fileInformation?: FileInformation[];
  snippetInformation?: SnippetInformation[];
  otherLicensingInformation?: OtherLicensingInformationDetected[];
}
