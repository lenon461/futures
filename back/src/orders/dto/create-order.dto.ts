export class CreateOrderDto {
    memberId: String;
    readonly marketId: String;
    readonly price: Number;
    readonly qty: Number;
    total_qty: Number;
    readonly type: String;
}
