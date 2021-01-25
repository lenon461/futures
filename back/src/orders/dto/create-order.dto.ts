export class CreateOrderDto {
    readonly memberId: String;
    readonly marketId: String;
    readonly price: Number;
    readonly qty: Number;
    total_qty: Number;
    readonly type: String;
}
