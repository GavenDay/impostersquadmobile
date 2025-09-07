"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Menu, Skull, User, Users, FileText, Shield, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { AdBanner } from "./AdBanner";
import { db } from "@/lib/firebase";
import { doc, setDoc, onSnapshot, updateDoc, getDoc, arrayRemove, deleteDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { LobbyScreen } from "./LobbyScreen";
import { SquadScreen } from "./SquadScreen";
import { ScrollArea } from "./ui/scroll-area";

const adjectives = [
  'Crimson', 'Azure', 'Golden', 'Shadow', 'Steel', 'Void', 'Iron', 'Star', 'Death', 'Omega', 'Nova', 'Cyber', 'Bio', 'Mech', 'Liberty', 'Freedom'
];
const nouns = [
  'Reaper', 'Patriot', 'Warden', 'Eagle', 'Serpent', 'Skull', 'Blade', 'Viper', 'Ghost', 'Diver', 'Destroyer', 'Avenger', 'Punisher', 'Titan', 'Spike'
];

type GameScreen = "lobby" | "squad";

export function ImposterAppComponent() {
  const [mainUsername, setMainUsername] = useState("");
  const [squadUsernames, setSquadUsernames] = useState<string[]>([]);
  const [imposter, setImposter] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);
  
  const [gameScreen, setGameScreen] = useState<GameScreen>("lobby");
  const [squadId, setSquadId] = useState("");
  const [squadIdInput, setSquadIdInput] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const generateUsername = () => {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const number = Math.floor(Math.random() * 900) + 100;
      return `${adj}${noun}-${number}`;
    };
    if (typeof window !== 'undefined' && !sessionStorage.getItem('mainUsername')) {
      const newUsername = generateUsername();
      setMainUsername(newUsername);
      sessionStorage.setItem('mainUsername', newUsername);
    } else if (typeof window !== 'undefined') {
      setMainUsername(sessionStorage.getItem('mainUsername') || '');
    }
  }, []);

  // Firestore real-time listener for squad updates
  useEffect(() => {
    if (!squadId) return;

    const squadRef = doc(db, "squads", squadId);
    const unsubscribe = onSnapshot(squadRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSquadUsernames(data.players || []);
        if (data.imposter) {
          setImposter(data.imposter);
          setIsRevealed(true);
        }
      } else {
        toast({
            variant: "destructive",
            title: "Squad Disbanded",
            description: "The squad you were in no longer exists.",
        });
        handleResetToLobby();
      }
    });

    return () => unsubscribe();
  }, [squadId, toast]);

  // Player removal and lobby cleanup logic
  useEffect(() => {
    return () => {
      if (gameScreen === 'squad' && squadId && mainUsername) {
        const squadRef = doc(db, 'squads', squadId);
        
        getDoc(squadRef).then(docSnap => {
          if (docSnap.exists()) {
            const players = docSnap.data().players || [];
            
            if (players.length <= 1) {
              // If this is the last player, delete the squad doc
              deleteDoc(squadRef);
            } else {
              // Otherwise, just remove this player
              updateDoc(squadRef, {
                players: arrayRemove(mainUsername)
              });
            }
          }
        });
      }
    };
  }, [gameScreen, squadId, mainUsername]);

  const handleCreateSquad = async () => {
    if (mainUsername.trim() === "") {
        return;
    }
    const newSquadId = "S" + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    try {
        const squadRef = doc(db, "squads", newSquadId);
        await setDoc(squadRef, {
            players: [mainUsername],
            imposter: null,
            gamePhase: 'lobby',
            createdAt: new Date(),
        });

        setSquadId(newSquadId);
        setGameScreen("squad");
    } catch (error) {
        console.error("Error creating squad: ", error);
        toast({
            variant: "destructive",
            title: "Error creating squad",
            description: "Could not create a new squad. Please try again.",
        });
    }
  };

  const handleJoinSquad = async () => {
    const squadIdToJoin = squadIdInput.trim().toUpperCase();
    if (mainUsername.trim() === "" || squadIdToJoin === "") {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please enter your codename and a Squad ID.",
        });
        return;
    }
    
    try {
        const squadRef = doc(db, "squads", squadIdToJoin);
        // Use a transaction to check if squad exists before joining
        const squadDoc = await getDoc(squadRef);
        if (!squadDoc.exists()) {
          throw new Error("Squad not found");
        }

        await updateDoc(squadRef, {
            players: arrayUnion(mainUsername)
        });
        setSquadId(squadIdToJoin);
        setGameScreen("squad");
    } catch (error) {
        console.error("Error joining squad: ", error);
        toast({
            variant: "destructive",
            title: "Error joining squad",
            description: "Squad ID not found or network error. Please check the ID and try again.",
        });
    }
  }
  
  const handleResetToLobby = () => {
    setGameScreen("lobby");
    setSquadId("");
    setSquadIdInput("");
    setSquadUsernames([]);
    setImposter(null);
    setIsRevealed(false);
  };

  const handleFindImposter = async () => {
    if (squadUsernames.length < 2) return;

    const randomIndex = Math.floor(Math.random() * squadUsernames.length);
    const selectedImposter = squadUsernames[randomIndex];
    
    try {
      const squadRef = doc(db, "squads", squadId);
      await updateDoc(squadRef, {
        imposter: selectedImposter,
        gamePhase: 'reveal',
      });
    } catch (error) {
        console.error("Error setting imposter: ", error);
        toast({
            variant: "destructive",
            title: "Network Error",
            description: "Could not start the game. Please try again.",
        });
    }
  };

  const isLocalUserImposter = imposter === mainUsername;

  return (
    <>
      <div className="container mx-auto flex max-w-4xl flex-col p-4 sm:p-6 md:p-8">
        <header className="mb-6 flex items-center justify-between">
          <button onClick={handleResetToLobby} className="flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md p-1 -m-1">
            <h1 className="flex items-center gap-3 font-headline text-2xl font-bold tracking-tighter sm:text-3xl">
              <Skull className="h-8 w-8 text-primary" />
              <span>
                IMPOSTER <span className="text-primary">SQUAD</span>
              </span>
            </h1>
          </button>
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
              </SheetHeader>
              <ScrollArea className="h-full pr-6">
                <SheetDescription asChild>
                    <div className="space-y-4 pt-4 text-left text-base text-muted-foreground">
                      <div>1. One player creates a squad and shares the Squad ID.</div>
                      <div>2. Other players join using the Squad ID.</div>
                      <div>3. Once all players are in, the creator presses 'FIND THE IMPOSTER'.</div>
                      <div>4. Each player's screen will reveal their role. Good luck, and fight for Democracy!</div>
                      <div>5. If no one exfils or just the imposter does, then the imposter wins.</div>
                      <div>6. If the imposter doesnt exfil, then everyone else wins.</div>
                    </div>
                </SheetDescription>
                <Separator className="my-4" />
                <div className="text-sm text-muted-foreground">
                  The creation of your own rules of engagement is not only sanctioned but encouraged. While on the field of battle rules change. Make sure to share these rules with the rest of the community. It might save someone while in the field.
                </div>
                <div className="pt-6 space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/about">
                      <Info className="mr-2 h-4 w-4" />
                      About & Updates
                    </Link>
                  </Button>
                   <Button variant="outline" className="w-full" asChild>
                    <Link href="/terms">
                      <FileText className="mr-2 h-4 w-4" />
                      Terms of Service
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/privacy">
                      <Shield className="mr-2 h-4 w-4" />
                      Privacy Policy
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setIsContactUsOpen(true)}>
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Us
                  </Button>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </header>

        {gameScreen === 'lobby' ? (
          <LobbyScreen 
            mainUsername={mainUsername}
            setMainUsername={setMainUsername}
            squadIdInput={squadIdInput}
            setSquadIdInput={setSquadIdInput}
            handleCreateSquad={handleCreateSquad}
            handleJoinSquad={handleJoinSquad}
          />
        ) : (
          <SquadScreen 
            squadId={squadId}
            squadUsernames={squadUsernames}
            mainUsername={mainUsername}
            handleFindImposter={handleFindImposter}
          />
        )}

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
