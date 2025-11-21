import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, RefreshCw, Clock, Users } from "lucide-react";

interface OrderStatusData {
    success: boolean;
    orderNumber: number;
    status: string;
    completedBefore: number;
    pendingAhead: number;
    message: string;
}

const OrderStatus = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    const [statusData, setStatusData] = useState<OrderStatusData | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchStatus = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_SUBMIT_URL}?orderNumber=${token}`);
            const data = await response.json();
            if (data.success) {
                setStatusData(data);
            }
        } catch (error) {
            console.error("Failed to fetch status:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
    }, [token]);

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
                        {/* <div className="relative">
                            <div className="absolute inset-0 bg-success/20 blur-2xl rounded-full animate-pulse"></div>
                            <div className="relative bg-success/10 p-4 rounded-full ring-4 ring-success/20">
                                <Check className="h-12 w-12 text-success" strokeWidth={2.5} />
                            </div>
                        </div> */}

                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight">Order Status</h2>
                            <p className="text-muted-foreground">
                                {statusData?.message || "Fetching your order status..."}
                            </p>
                        </div>

                        <div className="w-full bg-muted/50 rounded-xl p-6 space-y-4 border border-border/30">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                    Token Number
                                </p>
                                <p className="text-4xl font-bold font-mono tracking-tight text-primary">
                                    {token}
                                </p>
                            </div>

                            {statusData && (
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                                    <div className="bg-background/50 p-3 rounded-lg">
                                        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                                            <Users className="w-4 h-4" />
                                            <span className="text-xs font-medium uppercase">Ahead</span>
                                        </div>
                                        <p className="text-xl font-bold">{statusData.pendingAhead}</p>
                                    </div>
                                    <div className="bg-background/50 p-3 rounded-lg">
                                        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-xs font-medium uppercase">Completed</span>
                                        </div>
                                        <p className="text-xl font-bold">{statusData.completedBefore}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-3 w-full">
                            <Button
                                onClick={fetchStatus}
                                className="w-full"
                                size="lg"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                        Updating...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <RefreshCw className="w-4 h-4" />
                                        Refresh Status
                                    </span>
                                )}
                            </Button>

                            <Button
                                variant="ghost"
                                onClick={() => navigate("/")}
                                className="w-full text-muted-foreground hover:text-foreground"
                                size="sm"
                            >
                                Place New Order
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderStatus;
