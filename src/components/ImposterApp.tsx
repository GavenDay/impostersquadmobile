"use client";

import { useState, useEffect, useMemo } from "react";
import { Menu, Skull, UserPlus } from "lucide-react";
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

const adjectives = [
  'Crimson', 'Azure', 'Golden', 'Shadow', 'Steel', 'Void', 'Iron', 'Star', 'Death', 'Omega', 'Nova', 'Cyber', 'Bio', 'Mech', 'Liberty', 'Freedom'
];
const nouns = [
  'Reaper', 'Patriot', 'Warden', 'Eagle', 'Serpent', 'Skull', 'Blade', 'Viper', 'Ghost', 'Diver', 'Destroyer', 'Avenger', 'Punisher', 'Titan', 'Spike'
];

const generateUsername = () => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 900) + 100;
  return `${adj}${noun}-${number}`;
};

export function ImposterApp() {
  const [mainUsername, setMainUsername] = useState("Generating...");
  const [squadUsernames, setSquadUsernames] = useState<string[]>(['', '', '']);
  const [imposter, setImposter] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    setMainUsername(generateUsername());
  }, []);

  const handleSquadChange = (index: number, value: string) => {
    const newSquad = [...squadUsernames];
    newSquad[index] = value;
    setSquadUsernames(newSquad);
  };
  
  const allUsernames = useMemo(() => [mainUsername, ...squadUsernames], [mainUsername, squadUsernames]);

  const isButtonDisabled = useMemo(() => {
    if (mainUsername === "Generating...") return true;
    const filledUsernames = allUsernames.filter(name => name.trim() !== '');
    const uniqueUsernames = new Set(filledUsernames);
    return uniqueUsernames.size !== 4;
  }, [allUsernames, mainUsername]);

  const handleFindImposter = () => {
    if (isButtonDisabled) return;

    const uniqueUsernames = Array.from(new Set(allUsernames.filter(name => name.trim() !== '')));
    const randomIndex = Math.floor(Math.random() * uniqueUsernames.length);
    const selectedImposter = uniqueUsernames[randomIndex];
    
    setImposter(selectedImposter);
    setIsRevealed(true);
  };

  return (
    <>
      <div className="container mx-auto flex max-w-4xl flex-col p-4 sm:p-6 md:p-8">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl">
            HELLDIVERS <span className="text-primary">IMPOSTER</span>
          </h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Rules</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-primary">Rules of Engagement</SheetTitle>
                <SheetDescription className="space-y-4 pt-4 text-left text-base">
                  <div>1. Gather your squad of 4.</div>
                  <div>2. Enter all unique codenames.</div>
                  <div>3. Press 'FIND THE IMPOSTER'.</div>
                  <div>4. The traitor's identity will be revealed on screen. Good luck, and fight for Democracy!</div>
                  <div>5. If no one exfils or just the imposter does, then the imposter wins.</div>
                  <div>6. If the imposter doesnt exfil, then everyone else wins.</div>
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

      <AlertDialog open={isRevealed} onOpenChange={setIsRevealed}>
        <AlertDialogContent className="border-accent">
          <AlertDialogHeader className="items-center">
            <Skull className="h-16 w-16 text-accent" />
            <AlertDialogTitle className="pt-4 text-center text-3xl font-bold uppercase tracking-wider text-primary">
              Traitor Detected!
            </AlertDialogTitle>
            <AlertDialogDescription className="pt-4 text-center text-lg">
              The imposter among you is...
              <br />
              <span className="mt-2 block text-2xl font-bold text-accent">
                {imposter}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setIsRevealed(false)}>
              For Super Earth!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
