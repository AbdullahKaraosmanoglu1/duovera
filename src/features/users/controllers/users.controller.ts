import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { QueryCacheable } from '../../../core/domain/_shared/decorators/query-cacheable.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly users: UsersService) { }
    @Get()
    @QueryCacheable('users:list')
    findAll() { return this.users.findAll(); }
}
