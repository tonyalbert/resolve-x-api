import { PartialType } from '@nestjs/mapped-types';
import { CreateOperatorDto } from './create-operator.dto';

export class UpdateOperatorDto extends PartialType(CreateOperatorDto) {
    name: string

    email: string

    password: string

    phone: string

    position: string

    type: string
}
