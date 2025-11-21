import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const OrderStatus = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-destructive">Invalid Order</h1>
                    <p className="text-muted-foreground">No order token found.</p>
                    <Button onClick={() => navigate("/")}>Return Home</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-card rounded-2xl shadow-soft p-8 border border-border/50 backdrop-blur-sm animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-success/20 blur-2xl rounded-full animate-pulse"></div>
                            <div className="relative bg-success/10 p-4 rounded-full ring-4 ring-success/20">
                                <Check className="h-12 w-12 text-success" strokeWidth={2.5} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight">Order Received!</h2>
                            <p className="text-muted-foreground">
                                Your order has been placed successfully.
                            </p>
                        </div>

                        <div className="w-full bg-muted/50 rounded-xl p-6 space-y-2 border border-border/30">
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                Your Token Number
                            </p>
                            <p className="text-2xl font-bold font-mono tracking-tight text-foreground">
                                {token}
                            </p>
                        </div>

                        <div className="space-y-4 w-full">
                            <p className="text-sm text-muted-foreground">
                                Please wait for your token number to be called.
                            </p>
                            <Button
                                onClick={() => navigate("/")}
                                className="w-full"
                                size="lg"
                            >
                                Back to Home
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderStatus;
