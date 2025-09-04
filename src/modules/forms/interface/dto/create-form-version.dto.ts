import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFormVersionDto {
    @IsNotEmpty()
    schema!: Record<string, any>;

    @IsOptional() @IsIn(['draft', 'published', 'archived'])
    status?: 'draft' | 'published' | 'archived';
}
