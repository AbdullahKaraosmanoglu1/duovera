export class ListRecordsQuery {
    constructor(
        public readonly formId: string,
        public readonly organizationId?: string,
        public readonly formVersion?: number,
        public readonly state?: string,
    ) { }
}
