declare interface Writer {
    write: (documents: Document[]) => Promise<void>;
}
