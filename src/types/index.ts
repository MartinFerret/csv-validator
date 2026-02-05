export type AppState = 'initial' | 'diagnosed' | 'cleaning' | 'cleaned' | 'paid';

export type Separator = ',' | ';' | '\t';

export type IssueSeverity = 'critical' | 'medium' | 'minor';

export interface Issue {
  id: string;
  type: 'encoding' | 'duplicates' | 'whitespace' | 'empty_columns' | 'date_format';
  severity: IssueSeverity;
  description: string;
  count: number;
  enabled: boolean;
}

export interface CSVData {
  headers: string[];
  rows: string[][];
  separator: Separator;
  rowCount: number;
  columnCount: number;
}

export interface DiagnosticResult {
  original: CSVData;
  issues: Issue[];
  detectedSeparator: Separator;
}

export interface CleaningResult {
  cleaned: CSVData;
  appliedFixes: string[];
  removedDuplicates: number;
  trimmedCells: number;
  encodingFixes: number;
  emptyColumnsRemoved: string[];
}

export interface FileInfo {
  name: string;
  size: number;
  lastModified: number;
}
