import type { ReactNode } from 'react';
import type { Folder, Node, Root } from 'fumadocs-core/page-tree';
import {
  folderSegment,
  getLatestVersion,
  getProductVersions,
  parseDocsSlug,
} from '@/lib/docs';

function isFolder(node: Node): node is Folder {
  return node.type === 'folder';
}

/**
 * Replace product → version folders with the active version's pages so the
 * sidebar doesn't repeat the VersionSelect (e.g. a nested "v1" folder).
 */
export function flattenVersionedPageTree(
  tree: Root,
  slug?: string[],
  locale?: string,
): Root {
  const parsed = parseDocsSlug(slug, locale);

  return {
    ...tree,
    children: tree.children.map((node) => {
      if (!isFolder(node) || !node.root) {
        return node;
      }

      const productId = folderSegment(node);
      const versions = getProductVersions(productId, locale);
      if (versions.length === 0) {
        // Fall back to whatever version folders exist in the tree
        const versionFolders = node.children.filter(isFolder);
        if (versionFolders.length === 0) {
          return node;
        }

        const active = versionFolders[0];
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
      }

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
          : (getLatestVersion(productId, locale) ?? versions[0]);

      if (!targetVersion) {
        return node;
      }

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

export function folderTitle(name: ReactNode): string {
  return typeof name === 'string' ? name : String(name ?? '');
}
