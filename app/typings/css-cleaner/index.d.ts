export interface Writer {
    write: (documents: Document[]) => Promise<void>;
}

export interface Reader {
    read: (source: string) => Promise<Document[]>;
}

export interface Document {
    route: string;
    style: string;
}

export interface SortOptions {
    order?: string[];
    'properties-order'?: string[];
    'unspecified-properties-position'?: string;
}

export interface TimberOptions {
    sort: SortOptions;
}

export interface CssCleaner {
    clean: (source: string) => Promise<void>
}
