import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient as AppdataPrismaClient } from '@prisma/appdata';

@Injectable()
export class AppdataPrismaService
    extends AppdataPrismaClient
    implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() { await this.$connect(); }
    async onModuleDestroy() { await this.$disconnect(); }
}
