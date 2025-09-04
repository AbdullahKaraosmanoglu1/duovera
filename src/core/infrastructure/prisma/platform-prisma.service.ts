import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient as PlatformPrismaClient } from '@prisma/platform';

@Injectable()
export class PlatformPrismaService
    extends PlatformPrismaClient
    implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() { await this.$connect(); }
    async onModuleDestroy() { await this.$disconnect(); }
}
