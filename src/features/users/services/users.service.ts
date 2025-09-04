import { Injectable } from '@nestjs/common';
import { PlatformPrismaService } from '../../../core/infrastructure/prisma/platform-prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly platformDb: PlatformPrismaService) { }

    async findAll() {
        return this.platformDb.user.findMany({
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
    }
}
