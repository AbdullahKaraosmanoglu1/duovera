export class PublishVersionCommand {
    constructor(
        public readonly formId: string,
        public readonly version: number,
    ) { }
}
