export abstract class HashAbstract {
  async hash(s: string): Promise<string> {
    throw new Error("method not implemented");
  }

  hashSync(s: string): string {
    throw new Error("method not implemented");
  }

  compareSync(s1: string, s2: string): boolean {
    throw new Error("method not implemented");
  }

  async compare(s1: string, s2: string): Promise<boolean> {
    throw new Error("method not implemented");
  }
}
