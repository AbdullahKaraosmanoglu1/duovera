import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFormDto {
    @IsString() @IsNotEmpty()
    organizationId!: string;

    @IsString() @IsNotEmpty()
    name!: string;
}
