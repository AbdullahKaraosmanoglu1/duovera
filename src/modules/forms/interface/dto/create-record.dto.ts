import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRecordDto {
    @IsString() @IsNotEmpty()
    organizationId!: string;

    @IsNumber()
    formVersion!: number;

    @IsNotEmpty()
    data!: Record<string, any>;

    @IsOptional() @IsString()
    state?: string;

    @IsOptional() @IsString()
    createdBy?: string;
}
