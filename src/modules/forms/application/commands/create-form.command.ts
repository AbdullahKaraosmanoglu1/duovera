export class CreateFormCommand {
    constructor(
        public readonly organizationId: string,
        public readonly name: string,
    ) { }
}
