// To parse this data:
//
//   import { Convert, OrtJson } from "./file";
//
//   const ortJson = Convert.toOrtJson(json);

export interface OrtJson {
  repository: Repository;
  analyzer: null;
  scanner: OrtJsonScanner;
  evaluator: null;
}

export interface Repository {
  vcs: Vcs;
  vcs_processed: Vcs;
  config: ToolVersionsClass;
}

export interface ToolVersionsClass {}

export interface Vcs {
  type: string;
  url: string;
  revision: string;
  path: string;
}

export interface OrtJsonScanner {
  start_time: Date;
  end_time: Date;
  environment: Environment;
  config: ScannerConfig;
  results: Results;
}

export interface ScannerConfig {
  archive: null;
  file_based_storage: null;
  postgres_storage: null;
  options: null;
}

export interface Environment {
  ort_version: string;
  java_version: string;
  os: string;
  variables: Variables;
  tool_versions: ToolVersionsClass;
}

export interface Variables {
  SHELL: string;
  TERM: string;
}

export interface Results {
  scan_results: ScanResult[];
  storage_stats: StorageStats;
  has_issues: boolean;
}

export interface ScanResult {
  id: string;
  results: Result[];
}

export interface Result {
  provenance: Provenance;
  scanner: ResultScanner;
  summary: Summary;
  raw_result: RawResult;
}

export interface Provenance {
  download_time: Date;
}

export interface RawResult {
  headers: Header[];
  files: File[];
}

export interface File {
  path: string;
  type: string;
  name: string;
  base_name: string;
  extension: string;
  size: number;
  date: Date | null;
  sha1: null | string;
  md5: null | string;
  mime_type: null | string;
  file_type: null | string;
  programming_language: null | string;
  is_binary: boolean;
  is_text: boolean;
  is_archive: boolean;
  is_media: boolean;
  is_source: boolean;
  is_script: boolean;
  licenses: FileLicense[];
  license_expressions: string[];
  holders: HolderElement[];
  copyrights: HolderElement[];
  authors: any[];
  files_count: number;
  dirs_count: number;
  size_count: number;
  scan_errors: any[];
}

export interface HolderElement {
  value: string;
  start_line: number;
  end_line: number;
}

export interface FileLicense {
  key: string;
  score: number;
  name: string;
  short_name: string;
  category: string;
  is_exception: boolean;
  owner: string;
  homepage_url: string;
  text_url: string;
  reference_url: string;
  spdx_license_key: string;
  spdx_url: string;
  start_line: number;
  end_line: number;
  matched_rule: MatchedRule;
}

export interface MatchedRule {
  identifier: string;
  license_expression: string;
  licenses: string[];
  is_license_text: boolean;
  is_license_notice: boolean;
  is_license_reference: boolean;
  is_license_tag: boolean;
}

export interface Header {
  tool_name: string;
  tool_version: string;
  options: Options;
  notice: string;
  start_timestamp: string;
  end_timestamp: string;
  message: null;
  errors: any[];
  extra_data: ExtraData;
}

export interface ExtraData {
  files_count: number;
}

export interface Options {
  input: string;
  '--copyright': boolean;
  '--ignore': string[];
  '--info': boolean;
  '--json-pp': string;
  '--license': boolean;
  '--processes': string;
  '--strip-root': boolean;
  '--timeout': string;
}

export interface ResultScanner {
  name: string;
  version: string;
  configuration: string;
}

export interface Summary {
  start_time: Date;
  end_time: Date;
  file_count: number;
  package_verification_code: string;
  licenses: SummaryLicense[];
  copyrights: SummaryCopyright[];
}

export interface SummaryCopyright {
  statement: string;
  location: Location;
}

export interface Location {
  path: string;
  start_line: number;
  end_line: number;
}

export interface SummaryLicense {
  license: string;
  location: Location;
}

export interface StorageStats {
  num_reads: number;
  num_hits: number;
}

// Converts JSON strings to/from your types
