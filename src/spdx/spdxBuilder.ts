import {
  DocumentCreationInformation,
  PackageInformation,
  FileInformation,
  SnippetInformation,
  OtherLicensingInformationDetected,
} from './spdx.types';
import { parseRdfSPDX } from '../parsers/rdfParser';
import { Spdx } from './spdx';

export class SpdxBuilder {
  private _documentCreationInformation!: DocumentCreationInformation;
  private _packageInformation!: PackageInformation;
  private _fileInformation?: FileInformation[];
  private _snippetInformation?: SnippetInformation[];
  private _otherLicensingInformation?: OtherLicensingInformationDetected[];
  constructor() {}

  readSpdxReport(file: Buffer) {
    const parsedSpdx = parseRdfSPDX(file);
    this._documentCreationInformation = parsedSpdx.documentCreationInformation;
    this._packageInformation = parsedSpdx.packageInformation;
    this._fileInformation = parsedSpdx.fileInformation;
    this._snippetInformation = parsedSpdx.snippetInformation;
    this._otherLicensingInformation = parsedSpdx.otherLicensingInformation;
    return this;
  }

  get documentCreationInformation() {
    return this._documentCreationInformation;
  }

  get packageInformation() {
    return this._packageInformation;
  }

  get fileInformation() {
    return this._fileInformation;
  }

  get snippetInformation() {
    return this._snippetInformation;
  }

  get otherLicensingInformation() {
    return this._otherLicensingInformation;
  }

  build() {
    return new Spdx(this);
  }
}
