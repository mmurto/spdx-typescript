import { parseRdfSPDX } from './rdfParser';
import { readFileSync } from 'fs';

const spdxFile = readFileSync('test_project/SPDX2_test_project_spdx.rdf');
const spdx = parseRdfSPDX(spdxFile);

const fileReadme = spdx.fileInformation![0];
const fileIsc = spdx.fileInformation![2];
const fileNoLicense = spdx.fileInformation![3];
const extractedLicensingInfo = spdx.otherLicensingInformation![0];

describe('rdfParser', () => {
  it('parses the file', () => {
    expect(typeof spdx).toBe('object');
  });

  describe('parses correct', () => {
    describe('document creation information', () => {
      it('spdx version', () => {
        expect(spdx.documentCreationInformation.SPDXVersion).toEqual(
          'SPDX-2.1'
        );
      });
      it('data licenses', () => {
        expect(spdx.documentCreationInformation.dataLicense).toEqual('CC0-1.0');
      });
      it('spdx identifier', () => {
        expect(spdx.documentCreationInformation.SPDXIdentifier).toEqual(
          'SPDXRef-DOCUMENT'
        );
      });
      it('document name', () => {
        expect(spdx.documentCreationInformation.documentName).toEqual(
          '/srv/fossology/repository/report'
        );
      });
      it('spdx document namespace', () => {
        expect(spdx.documentCreationInformation.SPDXDocumentNamespace).toEqual(
          'http://679b29ee9838/repo/SPDX2_test_project.tar.gz_1589956299-spdx.rdf'
        );
      });
      /*
      it('external document references', () => {

      })
      */
      it('license list version', () => {
        expect(spdx.documentCreationInformation.licenseListVersion).toEqual(
          '2.6'
        );
      });
      it('creator', () => {
        expect(spdx.documentCreationInformation.creator.organization).toEqual(
          ''
        );
        expect(spdx.documentCreationInformation.creator.person).toEqual(
          'fossy (y)'
        );
        expect(spdx.documentCreationInformation.creator.tool).toEqual('spdx2');
      });
      it('created', () => {
        expect(spdx.documentCreationInformation.created).toEqual(
          '2020-05-20T06:31:39Z'
        );
      });
      it('creator comment', () => {
        expect(spdx.documentCreationInformation.creatorComment).toEqual(
          undefined
        );
      });
      it('document comment', () => {
        expect(spdx.documentCreationInformation.documentComment).toEqual(
          'This document was created using license information and a generator from Fossology.'
        );
      });
    });
    describe('package information', () => {
      it('package name', () => {
        expect(spdx.packageInformation.packageName).toEqual(
          'test_project.tar.gz'
        );
      });
      it('package spdx identifier', () => {
        expect(spdx.packageInformation.packageSPDXIdentifier).toEqual(
          'SPDXRef-upload2'
        );
      });
      it('package version', () => {
        expect(spdx.packageInformation.packageVersion).toEqual(undefined);
      });
      it('package file name', () => {
        expect(spdx.packageInformation.packangeFileName).toEqual(
          'test_project.tar.gz'
        );
      });
      /*
      it('package supplied', () => {

      })
      */
      /*
      it('package originator', () => {

      });
      */
      it('package download location', () => {
        expect(spdx.packageInformation.packageDownloadLocation).toEqual(
          'noassertion'
        );
      });
      /*
      it('files analyzed', () => {

      })
      */
      it('package verification code', () => {
        expect(spdx.packageInformation.packageVerificationCode).toEqual(
          'e54d18616e14d113f5be537ac3a89d3121da6aa1'
        );
      });
      it('package checksum', () => {
        expect(spdx.packageInformation.packageChecksum?.SHA1).toEqual(
          'c5b251d8f2376690e57c11af037d245c8d1781ef'
        );
        expect(spdx.packageInformation.packageChecksum?.SHA256).toEqual(
          'b829726270f1673d23eefd8053095dee3c7b732539daf05d4e83d13d9872d144'
        );
        expect(spdx.packageInformation.packageChecksum?.MD5).toEqual(
          '2d8a3a307de72ce886a77fc2cdaac50b'
        );
      });
      it('package home page', () => {
        expect(spdx.packageInformation.packageHomePage).toEqual(undefined);
      });
      it('source information', () => {
        expect(spdx.packageInformation.sourceInformation).toEqual(undefined);
      });
      it('concluded license', () => {
        expect(spdx.packageInformation.concludedLicense).toEqual([
          'noassertion',
        ]);
      });
      it('all licenses information from files', () => {
        expect(spdx.packageInformation.allLicensesInformationFromFiles).toEqual(
          'noassertion'
        );
      });
      it('declared license', () => {
        expect(spdx.packageInformation.declaredLicense).toEqual('noassertion');
      });
      it('comments on license', () => {
        expect(spdx.packageInformation.commentsOnLicense).toContain(
          'licenseInfoInFile determined by Scanners:'
        );
        expect(spdx.packageInformation.commentsOnLicense).toContain(
          '- nomos ("3.8.0-33-g513964327".513964)'
        );
        expect(spdx.packageInformation.commentsOnLicense).toContain(
          '- monk ("3.8.0-33-g513964327".513964)'
        );
        expect(spdx.packageInformation.commentsOnLicense).toContain(
          '- ojo ("3.8.0-33-g513964327".513964)'
        );
      });
      it('copyright text', () => {
        expect(spdx.packageInformation.copyrightText).toEqual('noassertion');
      });
      it('package summary description', () => {
        expect(spdx.packageInformation.packageSummaryDescription).toEqual(
          undefined
        );
      });
      it('package detailed description', () => {
        expect(spdx.packageInformation.packageDetailedDescription).toEqual(
          undefined
        );
      });
      it('package comment', () => {
        expect(spdx.packageInformation.packageComment).toEqual(undefined);
      });
      it('external references', () => {
        expect(spdx.packageInformation.externalReference).toEqual(undefined);
      });
      it('external reference comment', () => {
        expect(spdx.packageInformation.externalReferenceComment).toEqual(
          undefined
        );
      });
    });
    describe('file information', () => {
      it('file name', () => {
        expect(fileReadme.fileName).toEqual('test_project/README.md');
      });
      it('file spdx identifier', () => {
        expect(fileReadme.fileSPDXIdentifier).toEqual('SPDXRef-item10');
      });
      it('file type', () => {
        expect(fileReadme.fileType).toEqual(undefined);
      });
      it('file checksum', () => {
        expect(fileReadme.fileChecksum.SHA1).toEqual(
          'b8e902bece30cfc21302df7673b27d728dd8d815'
        );
        expect(fileReadme.fileChecksum.SHA256).toEqual(
          '5383ca41d92e4d7961173d10cc55fb35d99566c76a2128cc4d847b62e981fbb1'
        );
        expect(fileReadme.fileChecksum.MD5).toEqual(
          'dc6996ca048ea1f1744b622f5cd78e09'
        );
      });
      it('concluded license', () => {
        expect(fileReadme.concludedLicense).toEqual(['MIT']);
        expect(fileNoLicense.concludedLicense).toEqual([]);
      });
      it('license information in file', () => {
        expect(fileReadme.licenseInformationInFile).toEqual(['NOASSERTION']);
        expect(fileIsc.licenseInformationInFile).toEqual('ISC');
      });
      it('comments on license', () => {
        expect(fileReadme.commentsOnLicense).toEqual(
          'Comment on MIT in README'
        );
      });
      it('copyright text', () => {
        expect(fileIsc.copyrightText).toEqual(
          'CopyrightText: 2019 Mikko Murto <mikko.murto@gmail.com>'
        );
      });
      it('file comment', () => {
        expect(fileReadme.fileComment).toEqual(undefined);
      });
      it('file notice', () => {
        expect(fileReadme.fileNotice).toEqual(undefined);
      });
      it('file contributor', () => {
        expect(fileReadme.fileContributor).toEqual(undefined);
      });
    });
    /*
    describe('snippet information', () => {
      it('snippet spdx identifier', () => {

      })
    })
    */
    describe('other licensing information detected', () => {
      it('license identifier', () => {
        expect(extractedLicensingInfo.licenseIdentifier).toEqual(
          'LicenseRef-No_license_found'
        );
      });
      it('extracted text', () => {
        expect(extractedLicensingInfo.extractedText).toEqual(
          'Not find any license in the scanned file'
        );
      });
      it('license name', () => {
        expect(extractedLicensingInfo.licenseName).toEqual('No_license_found');
      });
      it('license cross reference', () => {
        expect(extractedLicensingInfo.licenseCrossReference).toEqual(undefined);
      });
      it('license comment', () => {
        expect(extractedLicensingInfo.licenseComment).toEqual(undefined);
      });
    });
  });
});
