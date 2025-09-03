"use client";

import { useState, useEffect } from "react";
import { Mail, Menu, Skull, User, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { AdBanner } from "./AdBanner";

const adjectives = [
  'Crimson', 'Azure', 'Golden', 'Shadow', 'Steel', 'Void', 'Iron', 'Star', 'Death', 'Omega', 'Nova', 'Cyber', 'Bio', 'Mech', 'Liberty', 'Freedom'
];
const nouns = [
  'Reaper', 'Patriot', 'Warden', 'Eagle', 'Serpent', 'Skull', 'Blade', 'Viper', 'Ghost', 'Diver', 'Destroyer', 'Avenger', 'Punisher', 'Titan', 'Spike'
];

export function ImposterAppComponent() {
  const [mainUsername, setMainUsername] = useState("Generating...");
  const [squadUsernames, setSquadUsernames] = useState<string[]>(['', '', '']);
  const [imposter, setImposter] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const generateUsername = () => {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const number = Math.floor(Math.random() * 900) + 100;
      return `${adj}${noun}-${number}`;
    };
    setMainUsername(generateUsername());
  }, []);

  useEffect(() => {
    const allUsernames = [mainUsername, ...squadUsernames];
    if (mainUsername === "Generating...") {
      setIsButtonDisabled(true);
      return;
    }
    const filledUsernames = allUsernames.filter(name => name.trim() !== '');
    if (filledUsernames.length === 0) {
      setIsButtonDisabled(true);
      return;
    }
    const uniqueUsernames = new Set(filledUsernames.map(name => name.trim().toLowerCase()));
    setIsButtonDisabled(filledUsernames.length !== uniqueUsernames.size);
  }, [mainUsername, squadUsernames]);

  const handleSquadChange = (index: number, value: string) => {
    const newSquad = [...squadUsernames];
    newSquad[index] = value;
    setSquadUsernames(newSquad);
  };

  const handleFindImposter = () => {
    if (isButtonDisabled) return;
    
    const allUsernames = [mainUsername, ...squadUsernames];
    const uniqueUsernames = Array.from(new Set(allUsernames.filter(name => name.trim() !== '')));
    const randomIndex = Math.floor(Math.random() * uniqueUsernames.length);
    const selectedImposter = uniqueUsernames[randomIndex];
    
    setImposter(selectedImposter);
    setIsRevealed(true);
  };

  const isLocalUserImposter = imposter === mainUsername;

  return (
    <>
      <div className="container mx-auto flex max-w-4xl flex-col p-4 sm:p-6 md:p-8">
        <header className="mb-6 flex items-center justify-between">
        <h1 className="flex items-center gap-3 font-headline text-2xl font-bold tracking-tighter sm:text-3xl">
            <Skull className="h-8 w-8 text-primary" />
            <span>
              IMPOSTER <span className="text-primary">SQUAD</span>
            </span>
          </h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-primary">Rules of Engagement</SheetTitle>
                <SheetDescription asChild>
                  <div className="flex h-full flex-col">
                    <div className="space-y-4 pt-4 text-left text-base text-muted-foreground">
                      <div>1. Gather your squad of up to 4.</div>
                      <div>2. Enter all unique codenames.</div>
                      <div>3. Press 'FIND THE IMPOSTER'.</div>
                      <div>4. The traitor's identity will be revealed. Good luck, and fight for Democracy!</div>
                      <div>5. If no one exfils or just the imposter does, then the imposter wins.</div>
                      <div>6. If the imposter doesnt exfil, then everyone else wins.</div>
                    </div>
                    <Separator className="my-4" />
                    <div className="text-sm text-muted-foreground">
                      The creation of your own rules of engagement is not only sanctioned but encouraged. While on the field of battle rules change. Make sure to share these rules with the rest of the community. It might save someone while in the field.
                    </div>
                    <div className="mt-auto pt-6">
                      <Button variant="outline" className="w-full" onClick={() => setIsContactUsOpen(true)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Us
                      </Button>
                    </div>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </header>

        <Card className="w-full border-2 border-primary/20 bg-card/80 shadow-xl shadow-primary/5">
          <CardContent className="p-6">
            <div className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="main-username" className="text-lg font-medium text-primary">Your Generated Codename</Label>
                <div className="flex items-center gap-2">
                  <div id="main-username" className="flex h-12 w-full items-center rounded-md border border-input bg-background px-3 text-lg font-semibold">
                    {mainUsername}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-medium text-primary">
                  <UserPlus className="h-5 w-5" />
                  Assemble Your Squad (add up to 3)
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {squadUsernames.map((username, index) => (
                    <div key={index} className="space-y-2">
                       <Label htmlFor={`squad-mate-${index + 1}`}>Squad Mate {index + 1}</Label>
                      <Input
                        id={`squad-mate-${index + 1}`}
                        type="text"
                        placeholder="Enter teammate's codename..."
                        value={username}
                        onChange={(e) => handleSquadChange(index, e.target.value)}
                        className="h-12 text-base"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-6 bg-border" />
              
              <div className="flex justify-center">
                <Button 
                  onClick={handleFindImposter} 
                  disabled={isButtonDisabled}
                  size="lg"
                  className="w-full max-w-md py-8 text-xl font-bold uppercase tracking-widest transition-all duration-300 ease-in-out hover:scale-105 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:hover:scale-100"
                >
                  Find the Imposter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="fixed bottom-0 left-0 w-full flex justify-center items-center p-4">
        <AdBanner />
      </div>

      <AlertDialog open={isRevealed} onOpenChange={setIsRevealed}>
        <AlertDialogContent className="border-accent">
          {isLocalUserImposter ? (
             <AlertDialogHeader className="items-center">
                <User className="h-16 w-16 text-primary" />
                <AlertDialogTitle className="pt-4 text-center text-3xl font-bold uppercase tracking-wider text-primary">
                  You are the Imposter
                </AlertDialogTitle>
                <AlertDialogDescription className="pt-4 text-center text-lg">
                  Sabotage the mission. Destroy their way of life. Do not get caught.
                </AlertDialogDescription>
             </AlertDialogHeader>
          ) : (
            <AlertDialogHeader className="items-center">
              <Skull className="h-16 w-16 text-accent" />
              <AlertDialogTitle className="pt-4 text-center text-3xl font-bold uppercase tracking-wider text-primary">
                Warning!
              </AlertDialogTitle>
              <AlertDialogDescription className="pt-4 text-center text-lg">
                There is an imposter amongst your ranks. Eliminate them at all costs.
              </AlertDialogDescription>
            </AlertDialogHeader>
          )}
          <AlertDialogFooter>
            <AlertDialogAction className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setIsRevealed(false)}>
              {isLocalUserImposter ? 'Down With Humanity' : 'For Super Earth!'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <AlertDialog open={isContactUsOpen} onOpenChange={setIsContactUsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-primary">A Message from High Command</AlertDialogTitle>
            <AlertDialogDescription className="pt-4 text-base">
              This app was built by one guy in a couple of hours so he could play with some friends. If anything doesn't work, you're kind of SOL (Soldier Out of Luck).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsContactUsOpen(false)}>
              Understood
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
