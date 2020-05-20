import { parseRdfSPDX } from './rdfParser';
import { readFileSync } from 'fs';
import {
  SPDX,
  FileInformation,
  OtherLicensingInformationDetected,
} from '../spdx/spdx.types';

let spdx = {} as SPDX;

const testProjectFile = readFileSync(
  'test_project/SPDX2_test_project_spdx.rdf'
);
const testProjectSpdx = parseRdfSPDX(testProjectFile);

let file1 = {} as FileInformation;
let file2 = {} as FileInformation;
let file3 = {} as FileInformation;
let extractedLicensingInfo = {} as OtherLicensingInformationDetected;

const realWorldFile = readFileSync('test_project/SPDX2_rapidjson_spdx.rdf');
const realWorldSpdx = parseRdfSPDX(realWorldFile);

describe('rdfParser', () => {
  it('parses the file', () => {
    expect(typeof spdx).toBe('object');
  });
  describe('parses correct', () => {
    describe('test project', () => {
      beforeAll(() => {
        spdx = testProjectSpdx;
        file1 = testProjectSpdx.fileInformation![0];
        file2 = testProjectSpdx.fileInformation![2];
        file3 = testProjectSpdx.fileInformation![3];
        extractedLicensingInfo = testProjectSpdx.otherLicensingInformation![0];
      });
      afterAll(() => {
        spdx = {} as SPDX;
        file1 = {} as FileInformation;
        file2 = {} as FileInformation;
        file3 = {} as FileInformation;
        extractedLicensingInfo = {} as OtherLicensingInformationDetected;
      });
      describe('document creation information', () => {
        it('spdx version', () => {
          expect(spdx.documentCreationInformation.SPDXVersion).toEqual(
            'SPDX-2.1'
          );
        });
        it('data licenses', () => {
          expect(spdx.documentCreationInformation.dataLicense).toEqual(
            'CC0-1.0'
          );
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
          expect(
            spdx.documentCreationInformation.SPDXDocumentNamespace
          ).toEqual(
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
          expect(spdx.documentCreationInformation.creator.tool).toEqual(
            'spdx2'
          );
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
          expect(
            spdx.packageInformation.allLicensesInformationFromFiles
          ).toEqual('noassertion');
        });
        it('declared license', () => {
          expect(spdx.packageInformation.declaredLicense).toEqual(
            'noassertion'
          );
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
          expect(file1.fileName).toEqual('test_project/README.md');
        });
        it('file spdx identifier', () => {
          expect(file1.fileSPDXIdentifier).toEqual('SPDXRef-item10');
        });
        it('file type', () => {
          expect(file1.fileType).toEqual(undefined);
        });
        it('file checksum', () => {
          expect(file1.fileChecksum.SHA1).toEqual(
            'b8e902bece30cfc21302df7673b27d728dd8d815'
          );
          expect(file1.fileChecksum.SHA256).toEqual(
            '5383ca41d92e4d7961173d10cc55fb35d99566c76a2128cc4d847b62e981fbb1'
          );
          expect(file1.fileChecksum.MD5).toEqual(
            'dc6996ca048ea1f1744b622f5cd78e09'
          );
        });
        it('concluded license', () => {
          expect(file1.concludedLicense).toEqual(['MIT']);
          expect(file3.concludedLicense).toEqual([]);
        });
        it('license information in file', () => {
          expect(file1.licenseInformationInFile).toEqual(['NOASSERTION']);
          expect(file2.licenseInformationInFile).toEqual(['ISC']);
        });
        it('comments on license', () => {
          expect(file1.commentsOnLicense).toEqual('Comment on MIT in README');
        });
        it('copyright text', () => {
          expect(file2.copyrightText).toEqual(
            'CopyrightText: 2019 Mikko Murto <mikko.murto@gmail.com>'
          );
        });
        it('file comment', () => {
          expect(file1.fileComment).toEqual(undefined);
        });
        it('file notice', () => {
          expect(file1.fileNotice).toEqual(undefined);
        });
        it('file contributor', () => {
          expect(file1.fileContributor).toEqual(undefined);
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
          expect(extractedLicensingInfo.licenseName).toEqual(
            'No_license_found'
          );
        });
        it('license cross reference', () => {
          expect(extractedLicensingInfo.licenseCrossReference).toEqual(
            undefined
          );
        });
        it('license comment', () => {
          expect(extractedLicensingInfo.licenseComment).toEqual(undefined);
        });
      });
    });
    describe('real world', () => {
      beforeAll(() => {
        spdx = realWorldSpdx;
        file1 = spdx.fileInformation![2];
        file2 = spdx.fileInformation![1];
        file3 = spdx.fileInformation![2];
        extractedLicensingInfo = spdx.otherLicensingInformation![0];
      });
      describe('document creation information', () => {
        it('spdx version', () => {
          expect(spdx.documentCreationInformation.SPDXVersion).toEqual(
            'SPDX-2.1'
          );
        });
        it('data licenses', () => {
          expect(spdx.documentCreationInformation.dataLicense).toEqual(
            'CC0-1.0'
          );
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
          expect(
            spdx.documentCreationInformation.SPDXDocumentNamespace
          ).toEqual(
            'http://679b29ee9838/repo/SPDX2_rapidjson_1589967094-spdx.rdf'
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
          expect(spdx.documentCreationInformation.creator.tool).toEqual(
            'spdx2'
          );
        });
        it('created', () => {
          expect(spdx.documentCreationInformation.created).toEqual(
            '2020-05-20T09:31:35Z'
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
          expect(spdx.packageInformation.packageName).toEqual('rapidjson');
        });
        it('package spdx identifier', () => {
          expect(spdx.packageInformation.packageSPDXIdentifier).toEqual(
            'SPDXRef-upload3'
          );
        });
        it('package version', () => {
          expect(spdx.packageInformation.packageVersion).toEqual(undefined);
        });
        it('package file name', () => {
          expect(spdx.packageInformation.packangeFileName).toEqual('rapidjson');
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
            '3dec3f199716e1ce913bd6d33d409ab49b088b90'
          );
        });
        it('package checksum', () => {
          expect(spdx.packageInformation.packageChecksum?.SHA1).toEqual(
            'a7e8f249860aa7639c09c1bf31ce5552fbbde78d'
          );
          expect(spdx.packageInformation.packageChecksum?.SHA256).toEqual(
            '484d260f71fe00c31f0d8da9a6131d934bd4c8eef40d35f345f6be08c62f56c7'
          );
          expect(spdx.packageInformation.packageChecksum?.MD5).toEqual(
            '53c4ad957761867e4b76957861b6cd2e'
          );
        });
        it('package home page', () => {
          expect(spdx.packageInformation.packageHomePage).toEqual(undefined);
        });
        it('source information', () => {
          expect(spdx.packageInformation.sourceInformation).toEqual(undefined);
        });
        it('concluded license', () => {
          expect(spdx.packageInformation.concludedLicense).toEqual(['MIT']);
        });
        it('all licenses information from files', () => {
          expect(
            spdx.packageInformation.allLicensesInformationFromFiles
          ).toEqual('noassertion');
        });
        it('declared license', () => {
          expect(spdx.packageInformation.declaredLicense).toEqual(
            'noassertion'
          );
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
          expect(file1.fileName).toEqual('license.txt');
        });
        it('file spdx identifier', () => {
          expect(file1.fileSPDXIdentifier).toEqual('SPDXRef-item311');
        });
        it('file type', () => {
          expect(file1.fileType).toEqual(undefined);
        });
        it('file checksum', () => {
          expect(file1.fileChecksum.SHA1).toEqual(
            '47ab05791f28173ad2b82f25c2b5c7fc06252b4d'
          );
          expect(file1.fileChecksum.SHA256).toEqual(
            'a140e5d46fe734a1c78f1a3c3ef207871dd75648be71fdda8e309b23ab8b1f32'
          );
          expect(file1.fileChecksum.MD5).toEqual(
            'ba04aa8f65de1396a7e59d1d746c2125'
          );
        });
        it('concluded license', () => {
          expect(file1.concludedLicense.sort()).toEqual(
            ['BSD-3-Clause', 'JSON', 'MIT'].sort()
          );
          expect(file2.concludedLicense).toEqual(['ISC']);
        });
        it('license information in file', () => {
          expect(file1.licenseInformationInFile.sort()).toEqual(
            ['BSD-3-Clause', 'JSON', 'MIT'].sort()
          );
          expect(file2.licenseInformationInFile).toEqual(['ISC']);
        });
        it('comments on license', () => {
          expect(file1.commentsOnLicense).toEqual(
            'A comment on BSD-3-Clause AND A comment on JSON AND NOASSERTION'
          );
        });
        it('copyright text', () => {
          expect(file1.copyrightText).toContain(
            'Copyright (c) 2006-2013 Alexander Chemeris All rights reserved.'
          );
          expect(file1.copyrightText).toContain(
            'Copyright (c) 2002 JSON.org All Rights Reserved.'
          );
          expect(file1.copyrightText).toContain(
            'Copyright (C) 2015 THL A29 Limited, a Tencent company, and Milo Yip. All rights reserved.'
          );
        });
        it('file comment', () => {
          expect(file1.fileComment).toEqual(undefined);
        });
        it('file notice', () => {
          expect(file1.fileNotice).toEqual(undefined);
        });
        it('file contributor', () => {
          expect(file1.fileContributor).toEqual(undefined);
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
            'LicenseRef-See-doc.OTHER'
          );
        });
        it('extracted text', () => {
          expect(extractedLicensingInfo.extractedText).toEqual(
            'License by Nomos.'
          );
        });
        it('license name', () => {
          expect(extractedLicensingInfo.licenseName).toEqual('See-doc.OTHER');
        });
        it('license cross reference', () => {
          expect(extractedLicensingInfo.licenseCrossReference).toEqual(
            undefined
          );
        });
        it('license comment', () => {
          expect(extractedLicensingInfo.licenseComment).toEqual(undefined);
        });
      });
    });
  });
});
