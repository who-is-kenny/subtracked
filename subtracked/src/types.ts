export type Subscription = {
    id: string;
    name: string;
    price: number;
    billingCycle: "Monthly" | "Yearly" | "Weekly";
    startDate: Date;
    endDate: Date;
    status: "Active" | "Active_cancelled" | "Inactive" | "Cancelled";
    category: string;
    notes: string;
}