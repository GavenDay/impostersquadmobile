"use client";

import { Copy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SquadScreenProps {
  squadId: string;
  squadUsernames: string[];
  mainUsername: string;
  handleFindImposter: () => void;
}

export function SquadScreen({
  squadId,
  squadUsernames,
  mainUsername,
  handleFindImposter,
}: SquadScreenProps) {
  return (
    <Card className="w-full border-2 border-primary/20 bg-card/80 shadow-xl shadow-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xl text-primary">
          <span>Squad Ready</span>
          <div className="flex items-center gap-2">
            <span className="text-base font-mono p-2 rounded-md bg-muted text-muted-foreground">{squadId}</span>
            <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(squadId)}>
              <Copy className="h-5 w-5" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-medium text-primary">
              <Users className="h-5 w-5" />
              Your Squad ({squadUsernames.length}/4)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {squadUsernames.map((username, index) => (
                <div key={index} className="flex h-12 w-full items-center rounded-md border border-input bg-background px-3 text-lg font-semibold">
                  {username} {username === mainUsername && "(You)"}
                </div>
              ))}
              {Array.from({ length: 4 - squadUsernames.length }).map((_, index) => (
                <div key={`placeholder-${index}`} className="flex h-12 w-full items-center rounded-md border border-dashed border-input/50 bg-background/50 px-3 text-lg font-semibold text-muted-foreground/50">
                  Awaiting Drop...
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6 bg-border" />
          <div className="flex justify-center">
            <Button
              onClick={handleFindImposter}
              disabled={squadUsernames.length < 2}
              size="lg"
              className="w-full max-w-md py-8 text-xl font-bold uppercase tracking-widest transition-all duration-300 ease-in-out hover:scale-105 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:hover:scale-100"
            >
              Find the Imposter
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
