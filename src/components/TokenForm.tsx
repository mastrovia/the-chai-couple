import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Check, Instagram, ExternalLink } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(100, {
    message: "Name must be less than 100 characters.",
  }),
  bunMaskaQuantity: z.string().optional().refine((val) => {
    if (!val) return true;
    const num = parseInt(val);
    return !isNaN(num) && num >= 0;
  }, {
    message: "Please enter a valid quantity.",
  }),
  teaQuantity: z.string().optional().refine((val) => {
    if (!val) return true;
    const num = parseInt(val);
    return !isNaN(num) && num >= 0;
  }, {
    message: "Please enter a valid quantity.",
  }),
  tiramisuQuantity: z.string().optional().refine((val) => {
    if (!val) return true;
    const num = parseInt(val);
    return !isNaN(num) && num >= 0;
  }, {
    message: "Please enter a valid quantity.",
  }),
}).refine((data) => {
  const bunMaska = parseInt(data.bunMaskaQuantity || "0");
  const tea = parseInt(data.teaQuantity || "0");
  const tiramisu = parseInt(data.tiramisuQuantity || "0");
  return bunMaska > 0 || tea > 0 || tiramisu > 0;
}, {
  message: "Please order at least one item.",
  path: ["root"], // This will attach the error to the form root
});

type FormValues = z.infer<typeof formSchema>;

export function TokenForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bunMaskaQuantity: "",
      teaQuantity: "",
      tiramisuQuantity: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("Name", values.name);
      formData.append("Bun Maska", values.bunMaskaQuantity || "0");
      formData.append("Tea", values.teaQuantity || "0");
      formData.append("Tiramisu", values.tiramisuQuantity || "0");

      const response = await fetch(import.meta.env.VITE_SUBMIT_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        navigate(`/order-status?token=${data.data.orderNumber}`);
      } else {
        console.error("Submission failed:", data.message);
        alert("Something went wrong: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="bg-card rounded-2xl shadow-soft p-8 border border-border/50 backdrop-blur-sm animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-8">
          {/* <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg border-4 border-card">
            <img
              src="/banner.png"
              alt="The Chai Couple Cafe Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-4">
              <h1 className="text-3xl font-bold text-white tracking-tight shadow-sm">
                The Chai Couple Cafe
              </h1>
            </div>
          </div> */}

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-primary">Order Here!!</h2>
            <p className="text-muted-foreground font-medium">
              Open From Tuesday - Sunday. 4pm - 6pm
            </p>
          </div>

          <div className="flex justify-center gap-4 text-sm">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors bg-secondary/50 px-4 py-2 rounded-full"
            >
              <Instagram className="w-4 h-4" />
              Follow us on Instagram
            </a>
            {/* <a
              href="#"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors bg-secondary/50 px-4 py-2 rounded-full"
            >
              <ExternalLink className="w-4 h-4" />
              Click here to see the queue
            </a> */}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Name</FormLabel>
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

            <div className="space-y-4 pt-4 border-t border-border/50">
              <h3 className="font-semibold text-lg text-primary">Menu</h3>

              <FormField
                control={form.control}
                name="bunMaskaQuantity"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center mb-2">
                      <FormLabel className="text-base font-medium">Bun Maska</FormLabel>
                      <span className="text-sm font-semibold text-primary">₹30</span>
                    </div>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Enter quantity needed"
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
                name="teaQuantity"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center mb-2">
                      <FormLabel className="text-base font-medium">Tea</FormLabel>
                      <span className="text-sm font-semibold text-primary">₹20</span>
                    </div>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Enter quantity needed"
                        className="h-12 bg-background/50 border-border/50 focus:border-primary transition-all duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-amber-600/80 font-medium">
                      *Tea might get sold out. Kindly confirm with us before ordering.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tiramisuQuantity"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center mb-2">
                      <FormLabel className="text-base font-medium">Tiramisu</FormLabel>
                      <span className="text-sm font-semibold text-primary">₹170</span>
                    </div>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Enter quantity needed"
                        className="h-12 bg-background/50 border-border/50 focus:border-primary transition-all duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-muted-foreground">
                      (55-60grams per cup)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {form.formState.errors.root && (
              <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-lg text-center">
                {form.formState.errors.root.message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium shadow-sm hover:shadow-md transition-all duration-200 mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></span>
                  Processing...
                </span>
              ) : (
                "Place Order"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
