import {
  DocumentCreationInformation,
  PackageInformation,
  FileInformation,
  SnippetInformation,
  OtherLicensingInformationDetected,
  SPDX,
} from '../spdx.types';
import { SpdxBuilder } from './spdxBuilder';

export class Spdx {
  documentCreationInformation: DocumentCreationInformation;
  packageInformation: PackageInformation;
  fileInformation?: FileInformation[];
  snippetInformation?: SnippetInformation[];
  otherLicensingInformation?: OtherLicensingInformationDetected[];
  constructor(spdxBuilder: SpdxBuilder) {
    this.documentCreationInformation = spdxBuilder.documentCreationInformation;
    this.packageInformation = spdxBuilder.packageInformation;
    this.fileInformation = spdxBuilder.fileInformation;
    this.snippetInformation = spdxBuilder.snippetInformation;
    this.otherLicensingInformation = spdxBuilder.otherLicensingInformation;
  }

  /**
   * Get list of unique SPDX-identifier of all licenses
   * from license conclusions and scan results.
   */
  getUniqueLicenses() {
    if (this.fileInformation) {
      const licenses = this.fileInformation.reduce((prev: string[], cur) => {
        cur.concludedLicense.forEach((license) => {
          if (prev.indexOf(license) === -1) {
            prev.push(license);
          }
        });
        cur.licenseInformationInFile.forEach((license) => {
          if (prev.indexOf(license) === -1) {
            prev.push(license);
          }
        });
        return prev;
      }, []);
      return licenses;
    } else {
      return [];
    }
  }
}
