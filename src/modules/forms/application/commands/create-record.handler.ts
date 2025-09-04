import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { CreateRecordCommand } from './create-record.command';
import { AppdataPrismaService } from '../../../../core/infrastructure/prisma/appdata-prisma.service';

@CommandHandler(CreateRecordCommand)
export class CreateRecordHandler implements ICommandHandler<CreateRecordCommand> {
    constructor(private readonly db: AppdataPrismaService) { }

    async execute(cmd: CreateRecordCommand) {
        const { formId, organizationId, formVersion, data, state, createdBy } = cmd;

        const fv = await this.db.formVersion.findUnique({
            where: { formId_version: { formId, version: formVersion } }, // @@unique([formId, version])
            select: { id: true },
        });
        if (!fv) throw new BadRequestException('Invalid formId/formVersion');

        return this.db.record.create({
            data: {
                formId,
                organizationId,
                formVersion,
                data: data as any,
                state: state ?? 'open',
                createdBy: createdBy ?? null,
            },
        });
    }
}
