import Papa from 'papaparse';
import { CSVData, Issue, Separator, DiagnosticResult, CleaningResult } from '@/types';

// Detect separator from CSV content
export function detectSeparator(content: string): Separator {
  const firstLines = content.split('\n').slice(0, 5).join('\n');

  const semicolonCount = (firstLines.match(/;/g) || []).length;
  const commaCount = (firstLines.match(/,/g) || []).length;
  const tabCount = (firstLines.match(/\t/g) || []).length;

  if (tabCount > semicolonCount && tabCount > commaCount) return '\t';
  if (semicolonCount > commaCount) return ';';
  return ',';
}

// Parse CSV content
export function parseCSV(content: string, separator?: Separator): CSVData {
  const detectedSeparator = separator || detectSeparator(content);

  const result = Papa.parse<string[]>(content, {
    delimiter: detectedSeparator,
    skipEmptyLines: true,
  });

  const rows = result.data;
  const headers = rows.length > 0 ? rows[0] : [];
  const dataRows = rows.slice(1);

  return {
    headers,
    rows: dataRows,
    separator: detectedSeparator,
    rowCount: dataRows.length,
    columnCount: headers.length,
  };
}

// Check for encoding issues (mojibake patterns)
export function detectEncodingIssues(data: CSVData): { count: number; examples: string[] } {
  const mojibakePatterns = [
    /Ã©/g, /Ã¨/g, /Ã /g, /Ã¢/g, /Ã´/g, /Ã»/g, /Ã®/g, /Ã¯/g,
    /Ã§/g, /Ã¼/g, /Ã¶/g, /Ã¤/g, /Ã±/g, /Â°/g, /â€/g, /â€™/g,
    /Ã‰/g, /Ã€/g, /Ãœ/g, /Ã–/g, /Ã„/g,
  ];

  let count = 0;
  const examples: string[] = [];

  const allCells = [...data.headers, ...data.rows.flat()];

  for (const cell of allCells) {
    for (const pattern of mojibakePatterns) {
      const matches = cell.match(pattern);
      if (matches) {
        count += matches.length;
        if (examples.length < 3 && !examples.includes(cell)) {
          examples.push(cell);
        }
      }
    }
  }

  return { count, examples };
}

// Fix encoding issues
export function fixEncoding(text: string): string {
  const replacements: Record<string, string> = {
    'Ã©': 'é', 'Ã¨': 'è', 'Ã ': 'à', 'Ã¢': 'â', 'Ã´': 'ô',
    'Ã»': 'û', 'Ã®': 'î', 'Ã¯': 'ï', 'Ã§': 'ç', 'Ã¼': 'ü',
    'Ã¶': 'ö', 'Ã¤': 'ä', 'Ã±': 'ñ', 'Â°': '°', 'â€™': "'",
    'â€œ': '"', 'â€': '"', 'Ã‰': 'É', 'Ã€': 'À', 'Ãœ': 'Ü',
    'Ã–': 'Ö', 'Ã„': 'Ä', 'ÃŸ': 'ß', 'Ã³': 'ó',
    'Ã­': 'í', 'Ãº': 'ú', 'Ã¡': 'á',
  };

  let result = text;
  for (const [from, to] of Object.entries(replacements)) {
    result = result.split(from).join(to);
  }
  return result;
}

// Detect duplicate rows
export function detectDuplicates(data: CSVData): { count: number; indices: number[] } {
  const seen = new Map<string, number>();
  const duplicateIndices: number[] = [];

  data.rows.forEach((row, index) => {
    const key = row.join('|||');
    if (seen.has(key)) {
      duplicateIndices.push(index);
    } else {
      seen.set(key, index);
    }
  });

  return { count: duplicateIndices.length, indices: duplicateIndices };
}

// Detect whitespace issues
export function detectWhitespaceIssues(data: CSVData): { count: number } {
  let count = 0;
  const allCells = [...data.headers, ...data.rows.flat()];

  for (const cell of allCells) {
    if (cell !== cell.trim() || /\s{2,}/.test(cell)) {
      count++;
    }
  }

  return { count };
}

// Detect empty columns
export function detectEmptyColumns(data: CSVData): { columns: string[]; indices: number[] } {
  const emptyColumns: string[] = [];
  const emptyIndices: number[] = [];

  for (let i = 0; i < data.headers.length; i++) {
    const isColumnEmpty = data.rows.every(row => !row[i] || row[i].trim() === '');
    if (isColumnEmpty) {
      emptyColumns.push(data.headers[i] || `Column ${i + 1}`);
      emptyIndices.push(i);
    }
  }

  return { columns: emptyColumns, indices: emptyIndices };
}

// Detect inconsistent date formats
export function detectDateFormats(data: CSVData): { count: number; formats: string[] } {
  const datePatterns = [
    { pattern: /^\d{4}-\d{2}-\d{2}$/, format: 'YYYY-MM-DD' },
    { pattern: /^\d{2}\/\d{2}\/\d{4}$/, format: 'DD/MM/YYYY' },
    { pattern: /^\d{2}-\d{2}-\d{4}$/, format: 'DD-MM-YYYY' },
    { pattern: /^\d{2}\.\d{2}\.\d{4}$/, format: 'DD.MM.YYYY' },
  ];

  const foundFormats = new Set<string>();
  let count = 0;

  const allCells = data.rows.flat();

  for (const cell of allCells) {
    for (const { pattern, format } of datePatterns) {
      if (pattern.test(cell)) {
        foundFormats.add(format);
        count++;
        break;
      }
    }
  }

  return { count, formats: Array.from(foundFormats) };
}

// Run full diagnostic
export function diagnoseCSV(content: string): DiagnosticResult {
  const separator = detectSeparator(content);
  const data = parseCSV(content, separator);

  const issues: Issue[] = [];

  // Check encoding
  const encodingIssues = detectEncodingIssues(data);
  if (encodingIssues.count > 0) {
    issues.push({
      id: 'encoding',
      type: 'encoding',
      severity: 'critical',
      description: `Broken encoding detected (${encodingIssues.examples.slice(0, 2).join(', ')}...)`,
      count: encodingIssues.count,
      enabled: true,
    });
  }

  // Check duplicates
  const duplicates = detectDuplicates(data);
  if (duplicates.count > 0) {
    issues.push({
      id: 'duplicates',
      type: 'duplicates',
      severity: 'medium',
      description: 'Duplicate rows found',
      count: duplicates.count,
      enabled: true,
    });
  }

  // Check whitespace
  const whitespace = detectWhitespaceIssues(data);
  if (whitespace.count > 0) {
    issues.push({
      id: 'whitespace',
      type: 'whitespace',
      severity: 'minor',
      description: 'Extra whitespace in cells (leading, trailing, or multiple spaces)',
      count: whitespace.count,
      enabled: true,
    });
  }

  // Check empty columns
  const emptyColumns = detectEmptyColumns(data);
  if (emptyColumns.columns.length > 0) {
    issues.push({
      id: 'empty_columns',
      type: 'empty_columns',
      severity: 'minor',
      description: `Empty columns: ${emptyColumns.columns.join(', ')}`,
      count: emptyColumns.columns.length,
      enabled: false, // Not enabled by default
    });
  }

  // Check date formats
  const dates = detectDateFormats(data);
  if (dates.formats.length > 1) {
    issues.push({
      id: 'date_format',
      type: 'date_format',
      severity: 'minor',
      description: `Mixed date formats: ${dates.formats.join(', ')}`,
      count: dates.count,
      enabled: false, // Not enabled by default
    });
  }

  return {
    original: data,
    issues,
    detectedSeparator: separator,
  };
}

// Clean CSV based on selected options
export function cleanCSV(
  data: CSVData,
  issues: Issue[],
  outputSeparator: Separator
): CleaningResult {
  let headers = [...data.headers];
  let rows = data.rows.map(row => [...row]);

  const appliedFixes: string[] = [];
  let removedDuplicates = 0;
  let trimmedCells = 0;
  let encodingFixes = 0;
  const emptyColumnsRemoved: string[] = [];

  // Fix encoding if enabled
  const encodingIssue = issues.find(i => i.id === 'encoding' && i.enabled);
  if (encodingIssue) {
    headers = headers.map(h => {
      const fixed = fixEncoding(h);
      if (fixed !== h) encodingFixes++;
      return fixed;
    });
    rows = rows.map(row => row.map(cell => {
      const fixed = fixEncoding(cell);
      if (fixed !== cell) encodingFixes++;
      return fixed;
    }));
    appliedFixes.push(`Fixed ${encodingFixes} encoding issues`);
  }

  // Remove duplicates if enabled
  const duplicateIssue = issues.find(i => i.id === 'duplicates' && i.enabled);
  if (duplicateIssue) {
    const seen = new Set<string>();
    const uniqueRows: string[][] = [];

    for (const row of rows) {
      const key = row.join('|||');
      if (!seen.has(key)) {
        seen.add(key);
        uniqueRows.push(row);
      } else {
        removedDuplicates++;
      }
    }
    rows = uniqueRows;
    if (removedDuplicates > 0) {
      appliedFixes.push(`Removed ${removedDuplicates} duplicate rows`);
    }
  }

  // Fix whitespace if enabled
  const whitespaceIssue = issues.find(i => i.id === 'whitespace' && i.enabled);
  if (whitespaceIssue) {
    headers = headers.map(h => {
      const trimmed = h.trim().replace(/\s+/g, ' ');
      if (trimmed !== h) trimmedCells++;
      return trimmed;
    });
    rows = rows.map(row => row.map(cell => {
      const trimmed = cell.trim().replace(/\s+/g, ' ');
      if (trimmed !== cell) trimmedCells++;
      return trimmed;
    }));
    if (trimmedCells > 0) {
      appliedFixes.push(`Trimmed whitespace in ${trimmedCells} cells`);
    }
  }

  // Remove empty columns if enabled
  const emptyColumnsIssue = issues.find(i => i.id === 'empty_columns' && i.enabled);
  if (emptyColumnsIssue) {
    const emptyIndices = detectEmptyColumns({ ...data, headers, rows }).indices;

    // Remove from the end to preserve indices
    for (const idx of emptyIndices.sort((a, b) => b - a)) {
      emptyColumnsRemoved.unshift(headers[idx] || `Column ${idx + 1}`);
      headers.splice(idx, 1);
      rows = rows.map(row => {
        row.splice(idx, 1);
        return row;
      });
    }

    if (emptyColumnsRemoved.length > 0) {
      appliedFixes.push(`Removed ${emptyColumnsRemoved.length} empty columns`);
    }
  }

  return {
    cleaned: {
      headers,
      rows,
      separator: outputSeparator,
      rowCount: rows.length,
      columnCount: headers.length,
    },
    appliedFixes,
    removedDuplicates,
    trimmedCells,
    encodingFixes,
    emptyColumnsRemoved,
  };
}

// Convert CSV data to string
export function csvToString(data: CSVData): string {
  const allRows = [data.headers, ...data.rows];
  return Papa.unparse(allRows, {
    delimiter: data.separator,
  });
}

// Generate test file content
export function generateTestFile(): string {
  return `Name;FirstName;Email;Signup Date
Müller;José;jose@example.com;2024-01-15
Müller;José;jose@example.com;2024-01-15
Dupont ;Marie;marie@test.fr;15/01/2024
Martin;Léa;lea@example.com;2024-02-20
Bernard;  Pierre;pierre@test.fr;20-02-2024`;
}
