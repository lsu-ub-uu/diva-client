export const isDefined = (
  object: unknown,
): object is NonNullable<typeof object> => object != null;
