import type { Folder, Node, Root } from 'fumadocs-core/page-tree';
import {
  docVersions,
  isDocProductId,
  latestVersion,
  parseDocsSlug,
} from '@/lib/docs';

function isFolder(node: Node): node is Folder {
  return node.type === 'folder';
}

function folderSegment(folder: Folder): string {
  const path = folder.$ref?.folder ?? '';
  return path.slice(path.lastIndexOf('/') + 1);
}

/**
 * Replace product → version folders with the active version's pages so the
 * sidebar doesn't repeat the VersionSelect (e.g. a nested "v1" folder).
 */
export function flattenVersionedPageTree(
  tree: Root,
  slug?: string[],
): Root {
  const parsed = parseDocsSlug(slug);

  return {
    ...tree,
    children: tree.children.map((node) => {
      if (!isFolder(node) || !node.root) {
        return node;
      }

      const productId = folderSegment(node);
      if (!isDocProductId(productId)) {
        return node;
      }

      const versions = docVersions[productId];
      const versionFolders = node.children.filter(
        (child): child is Folder =>
          isFolder(child) && versions.includes(folderSegment(child)),
      );

      if (versionFolders.length === 0) {
        return node;
      }

      const targetVersion =
        parsed?.product === productId
          ? parsed.version
          : latestVersion[productId];

      const active =
        versionFolders.find(
          (folder) => folderSegment(folder) === targetVersion,
        ) ?? versionFolders[0];

      if (!active) {
        return node;
      }

      const next: Folder = {
        ...node,
        children: active.children,
      };

      if (active.index) {
        next.index = active.index;
      } else {
        delete next.index;
      }

      return next;
    }),
  };
}
