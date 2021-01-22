export class CreateOrderDto {
    readonly id: String;
    readonly memberId: String;
    readonly marketId: String;
    readonly price: Number;
    readonly qty: Number;
    readonly total_qty: Number;
    readonly type: String;
    readonly status: String;
    readonly time: Number;
}
