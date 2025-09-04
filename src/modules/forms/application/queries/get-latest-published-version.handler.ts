import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { GetLatestPublishedVersionQuery } from './get-latest-published-version.query';
import { AppdataPrismaService } from '../../../../core/infrastructure/prisma/appdata-prisma.service';

@QueryHandler(GetLatestPublishedVersionQuery)
export class GetLatestPublishedVersionHandler implements IQueryHandler<GetLatestPublishedVersionQuery> {
    constructor(private readonly db: AppdataPrismaService) { }

    async execute(q: GetLatestPublishedVersionQuery) {
        const v = await this.db.formVersion.findFirst({
            where: { formId: q.formId, status: 'published' as any },
            orderBy: { version: 'desc' },
        });
        if (!v) throw new NotFoundException('No published version');
        return v;
    }
}
