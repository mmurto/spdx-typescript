import { OrtJson } from './types/ort.types';

export const parseJsonOrt = (input: string) => {
  const ortData = Convert.toOrtJson(input);

  const files =
    ortData.scanner.results.scan_results[0].results[0].raw_result.files;

  console.log(files);
};

export class Convert {
  public static toOrtJson(json: string): OrtJson {
    return JSON.parse(json);
  }

  public static ortJsonToJson(value: OrtJson): string {
    return JSON.stringify(value);
  }
}
