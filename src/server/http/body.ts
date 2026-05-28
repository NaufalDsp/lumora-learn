export async function readJsonBody<T extends Record<string, unknown>>(request: Request) {
  try {
    return (await request.json()) as Partial<T>;
  } catch {
    return {} as Partial<T>;
  }
}
