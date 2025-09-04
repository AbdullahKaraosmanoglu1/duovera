import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListFormsQuery } from './list-forms.query';
import { AppdataPrismaService } from '../../../../core/infrastructure/prisma/appdata-prisma.service';

@QueryHandler(ListFormsQuery)
export class ListFormsHandler implements IQueryHandler<ListFormsQuery> {
    constructor(private readonly db: AppdataPrismaService) { }

    async execute(q: ListFormsQuery) {
        return this.db.form.findMany({
            where: { organizationId: q.organizationId },
            orderBy: { createdAt: 'desc' },
        });
    }
}
