import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { PublishVersionCommand } from './publish-version.command';
import { AppdataPrismaService } from '../../../../core/infrastructure/prisma/appdata-prisma.service';

@CommandHandler(PublishVersionCommand)
export class PublishVersionHandler implements ICommandHandler<PublishVersionCommand> {
    constructor(private readonly db: AppdataPrismaService) { }

    async execute(cmd: PublishVersionCommand) {
        const { formId, version } = cmd;

        const res = await this.db.formVersion.updateMany({
            where: { formId, version },
            data: { status: 'published' as any },
        });
        if (res.count === 0) throw new NotFoundException('Version not found');

        // (Opsiyonel) tek published kuralı için diğerlerini archived yap:
        // await this.db.formVersion.updateMany({
        //   where: { formId, version: { not: version } },
        //   data: { status: 'archived' as any },
        // });

        return { ok: true };
    }
}
