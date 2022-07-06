// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export interface TreeNode<T extends string | number> {
  id: T;
  name: string;
  parent?: TreeNode<T>;
  children?: TreeNode<T>[];
}

export const findNodeById = <T extends string | number>(
  id: T,
  nodes: TreeNode<T>[]
): TreeNode<T> | null => {
  for (const node of nodes) {
    if (node.id === id) return node;

    if (node.children && node.children.length) {
      const finded = findNodeById(id, node.children);
      if (finded) return finded;
    }
  }

  return null;
};

export const initExpanded = <T extends string | number>(
  selected: T[] = [],
  data: TreeNode<T>[] = []
) => {
  const nodes = selected
    .map((id) => findNodeById(id, data))
    .filter(Boolean) as TreeNode<T>[];

  const parents = nodes
    .map((node) => node.parent)
    .filter(Boolean) as TreeNode<T>[];

  return parents.map((node) => node.id);
};

export const recalculateIds = <T extends string | number>(
  idCollection: T[],
  id: T,
  include: boolean
) => {
  const set = new Set(idCollection);

  if (include) {
    set.add(id);
  } else {
    set.delete(id);
  }

  return Array.from(set.values());
};
