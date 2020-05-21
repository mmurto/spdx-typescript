import { parseRdfSPDX } from './rdfParser';
import { readFileSync } from 'fs';
import {
  SPDX,
  FileInformation,
  OtherLicensingInformationDetected,
} from '../spdx/spdx.types';

const testProjectFile = readFileSync(
  'test_project/SPDX2_test_project_spdx.rdf'
);
const testProjectSpdx = parseRdfSPDX(testProjectFile);

const testProjectFile1 = testProjectSpdx.fileInformation![0];
const testProjectFile2 = testProjectSpdx.fileInformation![2];
const testProjectFile3 = testProjectSpdx.fileInformation![3];
const testProjectExtractedLicensingInfo = testProjectSpdx.otherLicensingInformation![0];

const realWorldFile = readFileSync('test_project/SPDX2_rapidjson_spdx.rdf');
const realWorldSpdx = parseRdfSPDX(realWorldFile);

const realWorldFile1 = realWorldSpdx.fileInformation![2];
const realWorldFile2 = realWorldSpdx.fileInformation![1];
const realWorldFile3 = realWorldSpdx.fileInformation![2];
const realWorldExtractedLicensingInfo = realWorldSpdx.otherLicensingInformation![0];

describe('rdfParser', () => {
  it('parses the file', () => {
    expect(typeof testProjectSpdx).toBe('object');
  });

  describe('parses correct', () => {
    describe('document creation information', () => {
      it('spdx version', () => {
        expect(testProjectSpdx.documentCreationInformation.SPDXVersion).toEqual(
          'SPDX-2.1'
        );
        expect(realWorldSpdx.documentCreationInformation.SPDXVersion).toEqual(
          'SPDX-2.1'
        );
      });

      it('data licenses', () => {
        expect(testProjectSpdx.documentCreationInformation.dataLicense).toEqual(
          'CC0-1.0'
        );
        expect(realWorldSpdx.documentCreationInformation.dataLicense).toEqual(
          'CC0-1.0'
        );
      });

      it('spdx identifier', () => {
        expect(
          testProjectSpdx.documentCreationInformation.SPDXIdentifier
        ).toEqual('SPDXRef-DOCUMENT');
        expect(
          realWorldSpdx.documentCreationInformation.SPDXIdentifier
        ).toEqual('SPDXRef-DOCUMENT');
      });

      it('document name', () => {
        expect(
          testProjectSpdx.documentCreationInformation.documentName
        ).toEqual('/srv/fossology/repository/report');
        expect(realWorldSpdx.documentCreationInformation.documentName).toEqual(
          '/srv/fossology/repository/report'
        );
      });

      it('spdx document namespace', () => {
        expect(
          testProjectSpdx.documentCreationInformation.SPDXDocumentNamespace
        ).toEqual(
          'http://679b29ee9838/repo/SPDX2_test_project.tar.gz_1589956299-spdx.rdf'
        );
        expect(
          realWorldSpdx.documentCreationInformation.SPDXDocumentNamespace
        ).toEqual(
          'http://679b29ee9838/repo/SPDX2_rapidjson_1589967094-spdx.rdf'
        );
      });

      it('external document references', () => {
        expect(
          testProjectSpdx.documentCreationInformation.externalDocumentReferences
        ).toEqual(undefined);
        expect(
          realWorldSpdx.documentCreationInformation.externalDocumentReferences
        ).toEqual(undefined);
      });

      it('license list version', () => {
        expect(
          testProjectSpdx.documentCreationInformation.licenseListVersion
        ).toEqual('2.6');
        expect(
          realWorldSpdx.documentCreationInformation.licenseListVersion
        ).toEqual('2.6');
      });

      it('creator', () => {
        expect(
          testProjectSpdx.documentCreationInformation.creator.organization
        ).toEqual('');
        expect(
          testProjectSpdx.documentCreationInformation.creator.person
        ).toEqual('fossy (y)');
        expect(
          testProjectSpdx.documentCreationInformation.creator.tool
        ).toEqual('spdx2');
        expect(
          realWorldSpdx.documentCreationInformation.creator.organization
        ).toEqual('');
        expect(
          realWorldSpdx.documentCreationInformation.creator.person
        ).toEqual('fossy (y)');
        expect(realWorldSpdx.documentCreationInformation.creator.tool).toEqual(
          'spdx2'
        );
      });

      it('created', () => {
        expect(testProjectSpdx.documentCreationInformation.created).toEqual(
          '2020-05-20T06:31:39Z'
        );
        expect(realWorldSpdx.documentCreationInformation.created).toEqual(
          '2020-05-20T09:31:35Z'
        );
      });

      it('creator comment', () => {
        expect(
          testProjectSpdx.documentCreationInformation.creatorComment
        ).toEqual(undefined);
        expect(
          realWorldSpdx.documentCreationInformation.creatorComment
        ).toEqual(undefined);
      });

      it('document comment', () => {
        expect(
          testProjectSpdx.documentCreationInformation.documentComment
        ).toEqual(
          'This document was created using license information and a generator from Fossology.'
        );
        expect(
          realWorldSpdx.documentCreationInformation.documentComment
        ).toEqual(
          'This document was created using license information and a generator from Fossology.'
        );
      });
    });

    describe('package information', () => {
      it('package name', () => {
        expect(testProjectSpdx.packageInformation.packageName).toEqual(
          'test_project.tar.gz'
        );
        expect(realWorldSpdx.packageInformation.packageName).toEqual(
          'rapidjson'
        );
      });

      it('package spdx identifier', () => {
        expect(
          testProjectSpdx.packageInformation.packageSPDXIdentifier
        ).toEqual('SPDXRef-upload2');
      });
      expect(realWorldSpdx.packageInformation.packageSPDXIdentifier).toEqual(
        'SPDXRef-upload3'
      );

      it('package version', () => {
        expect(testProjectSpdx.packageInformation.packageVersion).toEqual(
          undefined
        );
        expect(realWorldSpdx.packageInformation.packageVersion).toEqual(
          undefined
        );
      });

      it('package file name', () => {
        expect(testProjectSpdx.packageInformation.packangeFileName).toEqual(
          'test_project.tar.gz'
        );
        expect(realWorldSpdx.packageInformation.packangeFileName).toEqual(
          'rapidjson'
        );
      });

      it('package supplier', () => {
        expect(testProjectSpdx.packageInformation.packageSupplier).toEqual(
          undefined
        );
        expect(realWorldSpdx.packageInformation.packageSupplier).toEqual(
          undefined
        );
      });

      it('package originator', () => {
        expect(testProjectSpdx.packageInformation.packageOriginator).toEqual(
          undefined
        );
        expect(realWorldSpdx.packageInformation.packageOriginator).toEqual(
          undefined
        );
      });

      it('package download location', () => {
        expect(
          testProjectSpdx.packageInformation.packageDownloadLocation
        ).toEqual('noassertion');
        expect(
          realWorldSpdx.packageInformation.packageDownloadLocation
        ).toEqual('noassertion');
      });

      it('files analyzed', () => {
        expect(testProjectSpdx.packageInformation.filesAnalyzed).toEqual(
          undefined
        );
        expect(realWorldSpdx.packageInformation.filesAnalyzed).toEqual(
          undefined
        );
      });

      it('package verification code', () => {
        expect(
          testProjectSpdx.packageInformation.packageVerificationCode
        ).toEqual('e54d18616e14d113f5be537ac3a89d3121da6aa1');
        expect(
          realWorldSpdx.packageInformation.packageVerificationCode
        ).toEqual('3dec3f199716e1ce913bd6d33d409ab49b088b90');
      });

      it('package checksum', () => {
        expect(
          testProjectSpdx.packageInformation.packageChecksum?.SHA1
        ).toEqual('c5b251d8f2376690e57c11af037d245c8d1781ef');
        expect(
          testProjectSpdx.packageInformation.packageChecksum?.SHA256
        ).toEqual(
          'b829726270f1673d23eefd8053095dee3c7b732539daf05d4e83d13d9872d144'
        );
        expect(testProjectSpdx.packageInformation.packageChecksum?.MD5).toEqual(
          '2d8a3a307de72ce886a77fc2cdaac50b'
        );
        expect(realWorldSpdx.packageInformation.packageChecksum?.SHA1).toEqual(
          'a7e8f249860aa7639c09c1bf31ce5552fbbde78d'
        );
        expect(
          realWorldSpdx.packageInformation.packageChecksum?.SHA256
        ).toEqual(
          '484d260f71fe00c31f0d8da9a6131d934bd4c8eef40d35f345f6be08c62f56c7'
        );
        expect(realWorldSpdx.packageInformation.packageChecksum?.MD5).toEqual(
          '53c4ad957761867e4b76957861b6cd2e'
        );
      });

      it('package home page', () => {
        expect(testProjectSpdx.packageInformation.packageHomePage).toEqual(
          undefined
        );
        expect(realWorldSpdx.packageInformation.packageHomePage).toEqual(
          undefined
        );
      });

      it('source information', () => {
        expect(testProjectSpdx.packageInformation.sourceInformation).toEqual(
          undefined
        );
        expect(realWorldSpdx.packageInformation.sourceInformation).toEqual(
          undefined
        );
      });

      it('concluded license', () => {
        expect(testProjectSpdx.packageInformation.concludedLicense).toEqual([
          'noassertion',
        ]);
        expect(realWorldSpdx.packageInformation.concludedLicense).toEqual([
          'MIT',
        ]);
      });

      it('all licenses information from files', () => {
        expect(
          testProjectSpdx.packageInformation.allLicensesInformationFromFiles
        ).toEqual('noassertion');
        expect(
          realWorldSpdx.packageInformation.allLicensesInformationFromFiles
        ).toEqual('noassertion');
      });

      it('declared license', () => {
        expect(testProjectSpdx.packageInformation.declaredLicense).toEqual(
          'noassertion'
        );
        expect(realWorldSpdx.packageInformation.declaredLicense).toEqual(
          'noassertion'
        );
      });

      it('comments on license', () => {
        expect(testProjectSpdx.packageInformation.commentsOnLicense).toContain(
          'licenseInfoInFile determined by Scanners:'
        );
        expect(testProjectSpdx.packageInformation.commentsOnLicense).toContain(
          '- nomos ("3.8.0-33-g513964327".513964)'
        );
        expect(testProjectSpdx.packageInformation.commentsOnLicense).toContain(
          '- monk ("3.8.0-33-g513964327".513964)'
        );
        expect(testProjectSpdx.packageInformation.commentsOnLicense).toContain(
          '- ojo ("3.8.0-33-g513964327".513964)'
        );
        expect(realWorldSpdx.packageInformation.commentsOnLicense).toContain(
          'licenseInfoInFile determined by Scanners:'
        );
        expect(realWorldSpdx.packageInformation.commentsOnLicense).toContain(
          '- nomos ("3.8.0-33-g513964327".513964)'
        );
        expect(realWorldSpdx.packageInformation.commentsOnLicense).toContain(
          '- monk ("3.8.0-33-g513964327".513964)'
        );
        expect(realWorldSpdx.packageInformation.commentsOnLicense).toContain(
          '- ojo ("3.8.0-33-g513964327".513964)'
        );
      });

      it('copyright text', () => {
        expect(testProjectSpdx.packageInformation.copyrightText).toEqual(
          'noassertion'
        );
        expect(realWorldSpdx.packageInformation.copyrightText).toEqual(
          'noassertion'
        );
      });

      it('package summary description', () => {
        expect(
          testProjectSpdx.packageInformation.packageSummaryDescription
        ).toEqual(undefined);
        expect(
          realWorldSpdx.packageInformation.packageSummaryDescription
        ).toEqual(undefined);
      });

      it('package detailed description', () => {
        expect(
          testProjectSpdx.packageInformation.packageDetailedDescription
        ).toEqual(undefined);
        expect(
          realWorldSpdx.packageInformation.packageDetailedDescription
        ).toEqual(undefined);
      });

      it('package comment', () => {
        expect(testProjectSpdx.packageInformation.packageComment).toEqual(
          undefined
        );
        expect(realWorldSpdx.packageInformation.packageComment).toEqual(
          undefined
        );
      });

      it('external references', () => {
        expect(testProjectSpdx.packageInformation.externalReference).toEqual(
          undefined
        );
        expect(realWorldSpdx.packageInformation.externalReference).toEqual(
          undefined
        );
      });

      it('external reference comment', () => {
        expect(
          testProjectSpdx.packageInformation.externalReferenceComment
        ).toEqual(undefined);
        expect(
          realWorldSpdx.packageInformation.externalReferenceComment
        ).toEqual(undefined);
      });
    });

    describe('file information', () => {
      it('file name', () => {
        expect(testProjectFile1.fileName).toEqual('test_project/README.md');
        expect(realWorldFile1.fileName).toEqual('license.txt');
      });

      it('file spdx identifier', () => {
        expect(testProjectFile1.fileSPDXIdentifier).toEqual('SPDXRef-item10');
        expect(realWorldFile1.fileSPDXIdentifier).toEqual('SPDXRef-item311');
      });

      it('file type', () => {
        expect(testProjectFile1.fileType).toEqual(undefined);
        expect(realWorldFile1.fileType).toEqual(undefined);
      });

      it('file checksum', () => {
        expect(testProjectFile1.fileChecksum.SHA1).toEqual(
          'b8e902bece30cfc21302df7673b27d728dd8d815'
        );
        expect(testProjectFile1.fileChecksum.SHA256).toEqual(
          '5383ca41d92e4d7961173d10cc55fb35d99566c76a2128cc4d847b62e981fbb1'
        );
        expect(testProjectFile1.fileChecksum.MD5).toEqual(
          'dc6996ca048ea1f1744b622f5cd78e09'
        );
        expect(realWorldFile1.fileChecksum.SHA1).toEqual(
          '47ab05791f28173ad2b82f25c2b5c7fc06252b4d'
        );
        expect(realWorldFile1.fileChecksum.SHA256).toEqual(
          'a140e5d46fe734a1c78f1a3c3ef207871dd75648be71fdda8e309b23ab8b1f32'
        );
        expect(realWorldFile1.fileChecksum.MD5).toEqual(
          'ba04aa8f65de1396a7e59d1d746c2125'
        );
      });

      it('concluded license', () => {
        expect(testProjectFile1.concludedLicense).toEqual(['MIT']);
        expect(testProjectFile3.concludedLicense).toEqual([]);
        expect(realWorldFile1.concludedLicense.sort()).toEqual(
          ['BSD-3-Clause', 'JSON', 'MIT'].sort()
        );
        expect(realWorldFile2.concludedLicense.sort()).toEqual(['ISC'].sort());
      });

      it('license information in file', () => {
        expect(testProjectFile1.licenseInformationInFile).toEqual([
          'NOASSERTION',
        ]);
        expect(testProjectFile2.licenseInformationInFile).toEqual(['ISC']);
        expect(realWorldFile1.licenseInformationInFile.sort()).toEqual(
          ['BSD-3-Clause', 'JSON', 'MIT'].sort()
        );
        expect(realWorldFile2.licenseInformationInFile).toEqual(['ISC']);
      });

      it('comments on license', () => {
        expect(testProjectFile1.commentsOnLicense).toEqual(
          'Comment on MIT in README'
        );
        expect(realWorldFile1.commentsOnLicense).toEqual(
          'A comment on BSD-3-Clause AND A comment on JSON AND NOASSERTION'
        );
      });

      it('copyright text', () => {
        expect(testProjectFile2.copyrightText).toEqual(
          'CopyrightText: 2019 Mikko Murto <mikko.murto@gmail.com>'
        );
        expect(realWorldFile1.copyrightText).toContain(
          'Copyright (c) 2006-2013 Alexander Chemeris All rights reserved.'
        );
        expect(realWorldFile1.copyrightText).toContain(
          'Copyright (c) 2002 JSON.org All Rights Reserved.'
        );
        expect(realWorldFile1.copyrightText).toContain(
          'Copyright (C) 2015 THL A29 Limited, a Tencent company, and Milo Yip. All rights reserved.'
        );
      });

      it('file comment', () => {
        expect(testProjectFile1.fileComment).toEqual(undefined);
        expect(realWorldFile1.fileComment).toEqual(undefined);
      });
      it('file notice', () => {
        expect(testProjectFile1.fileNotice).toEqual(undefined);
        expect(realWorldFile1.fileNotice).toEqual(undefined);
      });
      it('file contributor', () => {
        expect(testProjectFile1.fileContributor).toEqual(undefined);
        expect(realWorldFile1.fileContributor).toEqual(undefined);
      });
    });

    describe('other licensing information detected', () => {
      it('license identifier', () => {
        expect(testProjectExtractedLicensingInfo.licenseIdentifier).toEqual(
          'LicenseRef-No_license_found'
        );
        expect(realWorldExtractedLicensingInfo.licenseIdentifier).toEqual(
          'LicenseRef-See-doc.OTHER'
        );
      });

      it('extracted text', () => {
        expect(testProjectExtractedLicensingInfo.extractedText).toEqual(
          'Not find any license in the scanned file'
        );
        expect(realWorldExtractedLicensingInfo.extractedText).toEqual(
          'License by Nomos.'
        );
      });

      it('license name', () => {
        expect(testProjectExtractedLicensingInfo.licenseName).toEqual(
          'No_license_found'
        );
        expect(realWorldExtractedLicensingInfo.licenseName).toEqual(
          'See-doc.OTHER'
        );
      });

      it('license cross reference', () => {
        expect(testProjectExtractedLicensingInfo.licenseCrossReference).toEqual(
          undefined
        );
        expect(realWorldExtractedLicensingInfo.licenseCrossReference).toEqual(
          undefined
        );
      });

      it('license comment', () => {
        expect(testProjectExtractedLicensingInfo.licenseComment).toEqual(
          undefined
        );
        expect(realWorldExtractedLicensingInfo.licenseComment).toEqual(
          undefined
        );
      });
    });
  });

  /*
      describe('snippet information', () => {
        it('snippet spdx identifier', () => {
  
        })
      })
      */
});
