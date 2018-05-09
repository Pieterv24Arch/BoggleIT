export class StringHelper {
  public static pad(num: number, size: number, padChar: string = '0'): string {
    let s = num + '';
    while (s.length < size) {
      s = padChar + s;
    }
    return s;
  }
}
