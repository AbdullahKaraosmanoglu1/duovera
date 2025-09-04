import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListRecordsQuery } from './list-records.query';
import { AppdataPrismaService } from '../../../../core/infrastructure/prisma/appdata-prisma.service';

@QueryHandler(ListRecordsQuery)
export class ListRecordsHandler implements IQueryHandler<ListRecordsQuery> {
    constructor(private readonly db: AppdataPrismaService) { }

    async execute(q: ListRecordsQuery) {
        return this.db.record.findMany({
            where: {
                formId: q.formId,
                ...(q.formVersion ? { formVersion: q.formVersion } : {}),
                ...(q.state ? { state: q.state } : {}),
                ...(q.organizationId ? { organizationId: q.organizationId } : {}),
            },
            orderBy: { createdAt: 'desc' },
            take: 100,
        });
    }
}
