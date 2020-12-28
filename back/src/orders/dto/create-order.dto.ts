export class CreateOrderDto {
    readonly id: String;
    readonly memberId: String;
    readonly marketId: String;
    readonly price: Number;
    readonly amount: Number;
    readonly type: String;
    readonly status: String;
    readonly time: Number;
}
