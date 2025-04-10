type Subscription = {
    id: string;
    name: string;
    price: number;
    billingcycle: "monthly" | "yearly" | "weekly";
    startDate: Date;
    endDate: Date;
    status: "active" | "active_cancelled" | "inactive" | "cancelled";
    notes: string;
}