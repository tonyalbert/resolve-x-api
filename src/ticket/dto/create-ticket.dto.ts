export class CreateTicketDto {
    title: string
    description: string
    priority: string
    type: string

    companyId: string
    userId: string
    operatorId: string
}
