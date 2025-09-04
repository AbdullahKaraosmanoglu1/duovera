import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { CreateFormVersionCommand } from './create-form-version.command';
import { AppdataPrismaService } from '../../../../core/infrastructure/prisma/appdata-prisma.service';

@CommandHandler(CreateFormVersionCommand)
export class CreateFormVersionHandler implements ICommandHandler<CreateFormVersionCommand> {
    constructor(private readonly db: AppdataPrismaService) { }

    async execute(cmd: CreateFormVersionCommand) {
        const { formId, schema, status } = cmd;
        if (!formId || !schema) throw new BadRequestException('formId and schema are required');

        const last = await this.db.formVersion.findFirst({
            where: { formId },
            orderBy: { version: 'desc' },
            select: { version: true },
        });
        const nextVersion = (last?.version ?? 0) + 1;

        return this.db.formVersion.create({
            data: {
                formId,
                version: nextVersion,
                status: (status ?? 'draft') as any,
                schema: schema as any,
            },
        });
    }
}
