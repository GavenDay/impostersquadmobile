import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
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
            <CardTitle className="text-2xl sm:text-3xl text-primary">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <p className="text-sm">Last updated: September 05, 2024</p>
            
            <p>Please read these terms of service ("Terms") carefully before using the Imposter Squad application (the "Service"). Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who wish to access or use the Service.</p>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">1. No Information Collected</h2>
              <p>The Service is designed to be anonymous. We do not collect, store, or share any personally identifiable information from our users. All game data, such as squad IDs and player codenames, is temporarily stored to facilitate gameplay and is not linked to any personal data.</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">2. Use of the Service</h2>
              <p>You agree not to use the Service to conduct any activity that would constitute a civil or criminal offense or violate any law. You agree not to disrupt the normal operation of the Service.</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">3. Disclaimer of Warranty</h2>
              <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the operation of the Service or the information, content, or materials included therein. We do not warrant that the service will be uninterrupted, secure, or error-free.</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">4. Limitation of Liability</h2>
              <p>In no event shall we be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">5. Changes to Terms</h2>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page.</p>
            </div>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
