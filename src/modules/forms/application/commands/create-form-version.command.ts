export type VersionStatus = 'draft' | 'published' | 'archived';

export class CreateFormVersionCommand {
    constructor(
        public readonly formId: string,
        public readonly schema: Record<string, any>,
        public readonly status?: VersionStatus,
    ) { }
}
