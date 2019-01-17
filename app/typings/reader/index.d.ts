declare interface Reader {
    read: (source: string) => Promise<Document[]>;
}
