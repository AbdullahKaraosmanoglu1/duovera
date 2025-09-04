import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { CreateFormCommand } from './create-form.command';
import { AppdataPrismaService } from '../../../../core/infrastructure/prisma/appdata-prisma.service';

@CommandHandler(CreateFormCommand)
export class CreateFormHandler implements ICommandHandler<CreateFormCommand> {
    constructor(private readonly db: AppdataPrismaService) { }

    async execute(cmd: CreateFormCommand) {
        const { organizationId, name } = cmd;
        if (!organizationId || !name?.trim()) {
            throw new BadRequestException('organizationId and name are required');
        }
        return this.db.form.create({
            data: { organizationId, name: name.trim() },
        });
    }
}
