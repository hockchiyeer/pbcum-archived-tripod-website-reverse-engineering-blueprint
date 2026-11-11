import manifest from './archiveManifest.generated.json';
import { ARCHIVE_NOTES, FOLDER_NOTES } from './archiveNotes';
import type { FileNode } from './pbcumData';

export type ArchiveFileKind = 'page' | 'image' | 'script' | 'style' | 'document' | 'other';
export interface ArchiveFile { path: string; size: number; kind: ArchiveFileKind; title?: string }

export const ARCHIVE_FILES = manifest.files as ArchiveFile[];
export const ARCHIVE_FILE_COUNT = manifest.root.fileCount;
/** Every .htm page of the archive (112), at its original URL path. */
export const ARCHIVE_PAGES = ARCHIVE_FILES.filter((f) => f.kind === 'page');

const CATEGORY_BY_FOLDER: Record<string, FileNode['category']> = {
  image: 'image', structure: 'structure', philosophy: 'philosophy', activity: 'activity', bulletin: 'bulletin',
  wenxian: 'wenxian', unit: 'unit', bianlunzu: 'unit', poster: 'poster', former_exco: 'former_exco', Tripod_files: 'third_party',
};

function categoryOf(path: string, kind: ArchiveFileKind): FileNode['category'] {
  const top = path.split('/')[1];
  if (CATEGORY_BY_FOLDER[top] && path.split('/').length > 2) return CATEGORY_BY_FOLDER[top];
  if (path === '/Tripod.htm') return 'third_party';
  if (kind === 'style') return 'style';
  if (kind === 'script') return 'script';
  if (/^\/marquee_function\.htm$/.test(path)) return 'script';
  return 'root';
}

export function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function describeFile(f: ArchiveFile): { description: string; modernComponent?: string } {
  const note = ARCHIVE_NOTES[f.path];
  if (note) return note;
  const name = f.path.split('/').pop() ?? f.path;
  if (f.kind === 'page') return { description: `${f.title ?? name} — archived page ${f.path}` };
  if (f.kind === 'image') return { description: `Archived image ${name}` };
  return { description: `Archived ${f.kind} file ${name}` };
}

function build(): FileNode {
  const root: FileNode = {
    name: 'pbcum_website', type: 'folder', path: '/', category: 'root', count: ARCHIVE_FILE_COUNT,
    description: 'Root of the archived PBCUM (马大华文学会) website — every file below exists in the archive, nothing else',
    children: [],
  };
  const folderIndex = new Map<string, FileNode>([['/', root]]);

  const ensureFolder = (path: string): FileNode => {
    const hit = folderIndex.get(path);
    if (hit) return hit;
    const parentPath = path.slice(0, path.lastIndexOf('/')) || '/';
    const parent = ensureFolder(parentPath);
    const node: FileNode = {
      name: path.split('/').pop()!, type: 'folder', path,
      category: categoryOf(path + '/_', 'other'),
      count: (manifest.folders as Record<string, number>)[path],
      description: FOLDER_NOTES[path] ?? `Archive folder ${path}`,
      children: [],
    };
    parent.children!.push(node);
    folderIndex.set(path, node);
    return node;
  };

  for (const f of ARCHIVE_FILES) {
    const dir = f.path.slice(0, f.path.lastIndexOf('/')) || '/';
    const { description, modernComponent } = describeFile(f);
    ensureFolder(dir).children!.push({
      name: f.path.split('/').pop()!, type: 'file', path: f.path, size: formatSize(f.size),
      category: categoryOf(f.path, f.kind), description, ...(modernComponent ? { modernComponent } : {}),
    });
  }

  const sort = (n: FileNode) => {
    n.children?.sort((a, b) => (a.type !== b.type ? (a.type === 'folder' ? -1 : 1) : a.name.localeCompare(b.name, 'en')));
    n.children?.forEach(sort);
  };
  sort(root);
  return root;
}

/** Real folder/file tree of the archive (generated from the manifest, never hand-written). */
export const FILE_STRUCTURE_TREE: FileNode = build();
