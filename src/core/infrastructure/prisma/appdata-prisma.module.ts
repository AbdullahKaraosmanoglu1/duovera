import { Global, Module } from '@nestjs/common';
import { AppdataPrismaService } from './appdata-prisma.service';

@Global()
@Module({
    providers: [AppdataPrismaService],
    exports: [AppdataPrismaService],
})
export class AppdataPrismaModule { }
