import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
            <CardTitle className="text-2xl sm:text-3xl text-primary">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <p className="text-sm">Last updated: September 05, 2024</p>
            
            <p>This Privacy Policy describes how your information is handled when you use the Imposter Squad application (the "Service").</p>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">1. No Personal Information Collected</h2>
              <p>We do not collect, request, or store any personally identifiable information (PII) such as your name, email address, or location. The codenames generated are random and not linked to any personal data. All gameplay data is temporary and anonymous, used only to operate the game session.</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">2. Third-Party Advertising</h2>
              <p>Our Service displays advertisements from Google AdMob. To serve these ads, Google may use cookies or other technologies to collect non-personal information, such as your device's advertising ID, to provide ads that are more relevant to your interests. This data is handled according to Google's own privacy policies.</p>
              <p>For more information on how Google handles your data, you can visit their <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy & Terms page</a>.</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">3. Children's Privacy</h2>
              <p>Our Service does not knowingly collect personally identifiable information from children under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us. If we become aware that we have collected personal information from children without verification of parental consent, we will take steps to remove that information.</p>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">4. Changes to This Privacy Policy</h2>
              <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
            </div>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
