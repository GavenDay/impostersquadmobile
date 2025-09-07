import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Gamepad2, ScrollText, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Link href="/" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-5 w-5" />
            Back to App
          </Link>
        </div>
        <Card className="w-full border-2 border-primary/20 bg-card/80 shadow-xl shadow-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl text-primary">About & Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 text-muted-foreground">
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">About the Creator</h2>
              <p>As a recent college grad, a lifelong gamer, and the founder of a new company, I wanted to build a fun tool to enhance my squad's gaming nights. This app was born out of that passion—a side project to bring a little more chaos and strategy to our favorite games. Hope you enjoy it!</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Update Log</h2>
              
              <div className="flex items-start gap-4">
                <div className="pt-1">
                  <Gamepad2 className="h-6 w-6 text-primary/80" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Initial Launch: Squad Lobbies</h3>
                  <p>The first version is live! Players can now create and join squad lobbies using a unique Squad ID. The core "Find the Imposter" functionality is in place to assign a secret imposter within the group.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="pt-1">
                  <ScrollText className="h-6 w-6 text-primary/80" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Legal Stuff: Terms of Service</h3>
                  <p>Added a straightforward Terms of Service page to outline the rules of engagement for using the app. This ensures everyone is on the same page about how the service should be used.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="pt-1">
                  <ShieldCheck className="h-6 w-6 text-primary/80" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Your Privacy: Privacy Policy</h3>
                  <p>A Privacy Policy has been added to be transparent about data. The policy clarifies that while the app uses ads, it does not collect or store any personally identifiable information.</p>
                </div>
              </div>

            </div>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}