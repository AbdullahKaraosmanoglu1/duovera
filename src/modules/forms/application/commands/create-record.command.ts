export class CreateRecordCommand {
    constructor(
        public readonly formId: string,
        public readonly organizationId: string,
        public readonly formVersion: number,
        public readonly data: Record<string, any>,
        public readonly state?: string,
        public readonly createdBy?: string,
    ) { }
}
