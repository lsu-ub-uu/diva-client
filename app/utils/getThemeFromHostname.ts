import type { BFFTheme } from '@/cora/transform/bffTypes.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';

export const getThemeFromHostname = (
  request: Request,
  dependencies: Dependencies,
): BFFTheme | undefined => {
  const { hostname } = new URL(request.url);
  console.log(
    `getThemeFromHostname for host: ${hostname}`,
    dependencies.themePool.has(hostname),
  );
  return dependencies.themePool.has(hostname)
    ? dependencies.themePool.get(hostname)
    : undefined;
};
