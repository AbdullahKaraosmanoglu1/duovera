import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FormsController } from './interface/forms.controller';
import { AppdataPrismaModule } from '../../core/infrastructure/prisma/appdata-prisma.module';

// Commands
import { CreateFormHandler } from './application/commands/create-form.handler';
import { CreateFormVersionHandler } from './application/commands/create-form-version.handler';
import { PublishVersionHandler } from './application/commands/publish-version.handler';
import { CreateRecordHandler } from './application/commands/create-record.handler';

// Queries
import { ListFormsHandler } from './application/queries/list-forms.handler';
import { GetLatestPublishedVersionHandler } from './application/queries/get-latest-published-version.handler';
import { ListRecordsHandler } from './application/queries/list-records.handler';
import { ListFormsQuery } from './application/queries/list-forms.query';

const CommandHandlers = [
    CreateFormHandler,
    CreateFormVersionHandler,
    PublishVersionHandler,
    CreateRecordHandler,
];

const QueryHandlers = [
    ListFormsHandler,
    GetLatestPublishedVersionHandler,
    ListRecordsHandler,
    ListFormsQuery,
];

@Module({
    imports: [CqrsModule, AppdataPrismaModule],
    controllers: [FormsController],
    providers: [...CommandHandlers, ...QueryHandlers],
})
export class FormsModule { }
