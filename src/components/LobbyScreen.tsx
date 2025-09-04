"use client";

import { UserPlus, Users, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

interface LobbyScreenProps {
  mainUsername: string;
  setMainUsername: (name: string) => void;
  squadIdInput: string;
  setSquadIdInput: (id: string) => void;
  handleCreateSquad: () => void;
  handleJoinSquad: () => void;
}

export function LobbyScreen({
  mainUsername,
  setMainUsername,
  squadIdInput,
  setSquadIdInput,
  handleCreateSquad,
  handleJoinSquad,
}: LobbyScreenProps) {
  return (
    <Card className="w-full border-2 border-primary/20 bg-card/80 shadow-xl shadow-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-primary">
          <UserPlus className="h-6 w-6" />
          Prepare for Deployment
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="main-username" className="text-lg font-medium">Your Generated Codename</Label>
          <div className="flex items-center gap-2">
            <Input
              id="main-username"
              className="h-12 text-lg font-semibold bg-background"
              value={mainUsername}
              onChange={(e) => setMainUsername(e.target.value)}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-medium">
            <Users className="h-5 w-5" />
            Create a New Squad
          </h3>
          <Button onClick={handleCreateSquad} disabled={!mainUsername} className="w-full h-12 text-lg">
            Create Squad
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-muted-foreground">OR</span>
          <Separator className="flex-1" />
        </div>

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-medium">
            <LogIn className="h-5 w-5" />
            Join an Existing Squad
          </h3>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter Squad ID..."
              value={squadIdInput}
              onChange={(e) => setSquadIdInput(e.target.value.toUpperCase())}
              className="h-12 text-base"
            />
            <Button onClick={handleJoinSquad} disabled={!mainUsername || !squadIdInput} className="h-12">
              Join
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
