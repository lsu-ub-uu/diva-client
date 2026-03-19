import type { CoraData, DataGroup } from '@/cora/cora-data/types.server';

interface Node {
  name: string;
  index: number;
  attributes: Record<string, any>;
  children: Node[];
  childLookup: Map<string, Node>;
  value?: any;
}

export const transformFormDataToCora = (formData: FormData): DataGroup => {
  const root = createNode('__root__', 0);

  for (const [path, rawValue] of Array.from(formData.entries())) {
    const value = String(rawValue);
    const segments = path.split('.');
    let currentNode = root;

    segments.forEach((segment, index) => {
      const isLastSegment = index === segments.length - 1;

      if (segment.startsWith('_')) {
        currentNode.attributes[segment.slice(1)] = value;
        return;
      }

      if (isLastSegment && !value) {
        return;
      }

      currentNode = getOrCreateChild(currentNode, segment);

      if (isLastSegment) {
        currentNode.value = value;
      }
    });
  }

  return finalizeNode(root.children[0]) as DataGroup;
};

const createNode = (name: string, index: number): Node => ({
  name,
  index,
  attributes: {},
  children: [],
  childLookup: new Map(),
});

const getOrCreateChild = (parent: Node, segment: string) => {
  const { name, index } = parseSegment(segment);
  const childKey = `${name}[${index}]`;
  const existingChild = parent.childLookup.get(childKey);

  if (existingChild) {
    return existingChild;
  }

  const child = createNode(name, index);
  parent.childLookup.set(childKey, child);
  parent.children.push(child);
  parent.children.sort((left, right) => left.index - right.index);
  return child;
};

const parseSegment = (segment: string) => {
  const match = segment.match(/^(?<name>[^[]+)(?:\[(?<index>\d+)\])?$/);

  if (!match?.groups?.name) {
    throw new Error(`Invalid form data path segment: ${segment}`);
  }

  return {
    name: match.groups.name,
    index: Number(match.groups.index ?? 0),
  };
};

const finalizeNode = (node: Node): CoraData | undefined => {
  const attributes =
    Object.keys(node.attributes).length > 0 ? node.attributes : undefined;

  if (Object.hasOwn(node, 'value')) {
    if (!node.value) {
      return undefined;
    }
    return {
      name: node.name,
      attributes,
      value: node.value,
    };
  }

  const children = node.children
    .map(finalizeNode)
    .filter((child): child is CoraData => child !== undefined);

  if (children.length === 0) {
    return undefined;
  }

  return {
    name: node.name,
    attributes,
    children,
  } as CoraData;
};
