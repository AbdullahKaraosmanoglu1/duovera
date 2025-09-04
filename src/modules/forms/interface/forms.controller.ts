import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateFormDto } from './dto/create-form.dto';
import { CreateFormVersionDto } from './dto/create-form-version.dto';
import { CreateRecordDto } from './dto/create-record.dto';
import { CreateFormCommand } from '../application/commands/create-form.command';
import { CreateFormVersionCommand } from '../application/commands/create-form-version.command';
import { PublishVersionCommand } from '../application/commands/publish-version.command';
import { CreateRecordCommand } from '../application/commands/create-record.command';
import { ListFormsQuery } from '../application/queries/list-forms.query';
import { GetLatestPublishedVersionQuery } from '../application/queries/get-latest-published-version.query';
import { ListRecordsQuery } from '../application/queries/list-records.query';

@Controller('forms')
export class FormsController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Get()
    list(@Query('organizationId') organizationId: string) {
        return this.queryBus.execute(new ListFormsQuery(organizationId));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() body: CreateFormDto) {
        return this.commandBus.execute(new CreateFormCommand(body.organizationId, body.name));
    }

    @Post(':formId/versions')
    @HttpCode(HttpStatus.CREATED)
    createVersion(@Param('formId') formId: string, @Body() body: CreateFormVersionDto) {
        return this.commandBus.execute(new CreateFormVersionCommand(formId, body.schema, body.status));
    }

    @Get(':formId/versions/latest-published')
    latestPublished(@Param('formId') formId: string) {
        return this.queryBus.execute(new GetLatestPublishedVersionQuery(formId));
    }

    @Post(':formId/versions/:version/publish')
    publish(@Param('formId') formId: string, @Param('version') version: string) {
        return this.commandBus.execute(new PublishVersionCommand(formId, Number(version)));
    }

    @Get(':formId/records')
    listRecords(
        @Param('formId') formId: string,
        @Query('organizationId') organizationId?: string,
        @Query('formVersion') formVersion?: string,
        @Query('state') state?: string,
    ) {
        return this.queryBus.execute(
            new ListRecordsQuery(formId, organizationId, formVersion ? Number(formVersion) : undefined, state),
        );
    }

    @Post(':formId/records')
    @HttpCode(HttpStatus.CREATED)
    createRecord(@Param('formId') formId: string, @Body() body: CreateRecordDto) {
        return this.commandBus.execute(
            new CreateRecordCommand(formId, body.organizationId, body.formVersion, body.data, body.state, body.createdBy),
        );
    }
}
