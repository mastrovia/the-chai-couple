import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(100, {
    message: "Name must be less than 100 characters.",
  }),
  age: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num > 0 && num < 150;
  }, {
    message: "Please enter a valid age between 1 and 149.",
  }),
  quantity: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num > 0;
  }, {
    message: "Please enter a valid quantity greater than 0.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function TokenForm() {
  const [tokenNumber, setTokenNumber] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      quantity: "",
    },
  });

  const generateTokenNumber = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `TK-${timestamp}-${random}`;
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const token = generateTokenNumber();
    setTokenNumber(token);
    setIsSubmitting(false);
  };

  const handleNewSubmission = () => {
    setTokenNumber(null);
    form.reset();
  };

  if (tokenNumber) {
    return (
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
              <h2 className="text-2xl font-bold tracking-tight">Success!</h2>
              <p className="text-muted-foreground">
                Your submission has been processed
              </p>
            </div>

            <div className="w-full bg-muted/50 rounded-xl p-6 space-y-2 border border-border/30">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Your Token Number
              </p>
              <p className="text-2xl font-bold font-mono tracking-tight text-foreground">
                {tokenNumber}
              </p>
            </div>

            <Button
              onClick={handleNewSubmission}
              className="w-full"
              size="lg"
            >
              Submit Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-2xl shadow-soft p-8 border border-border/50 backdrop-blur-sm animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Request Token</h1>
          <p className="text-muted-foreground">
            Fill out the form below to receive your unique token number
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      className="h-12 bg-background/50 border-border/50 focus:border-primary transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your age"
                      className="h-12 bg-background/50 border-border/50 focus:border-primary transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter quantity"
                      className="h-12 bg-background/50 border-border/50 focus:border-primary transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></span>
                  Processing...
                </span>
              ) : (
                "Submit Request"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
