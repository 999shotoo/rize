import { Button } from "@/components/ui/button";

import {
  MusicIcon,
  HeadphonesIcon,
  UsersIcon,
  ZapIcon,
  AudioLines,
} from "lucide-react";
import Link from "next/link";
import ThemeToggle from "../theme/theme-toggle";

export default function NotAuthHome() {
  return (
    <div className="min-h-screen bg-card font-sans py-2 px-3">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center bg-background border-2 border-card rounded-3xl">
        <Link className="flex items-center justify-center gap-2" href="/">
          <AudioLines className="h-8 w-8 text-primary" />
          <span className="font-bold text-2xl">
            Rize<span className="font-light text-foreground/75">PLAY</span>
          </span>
        </Link>
        <div className="flex gap-2">
          <Link href="/sign-in">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="">Sign up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
          Free Music Streaming for Everyone
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-400 max-w-2xl mx-auto">
          Enjoy millions of songs without any cost. Support us to keep the music
          playing.
        </p>
        <div className="flex flex-col-2  justify-center items-center gap-2">
          <Link href="/sign-up">
            <Button size="lg" className="bg-primary rounded-md">
              Start Listening
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="bg-secondary rounded-md"
          >
            How It Works
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background container rounded-3xl mx-auto px-4 md:px-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary">
            Why Choose MusicStream?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<HeadphonesIcon className="h-8 w-8 text-primary" />}
              title="Unlimited Listening"
              description="Stream as much music as you want, whenever you want, for free."
            />
            <FeatureCard
              icon={<UsersIcon className="h-8 w-8 text-primary" />}
              title="Community Driven"
              description="Share playlists, discover new music, and connect with other music lovers."
            />
            <FeatureCard
              icon={<ZapIcon className="h-8 w-8 text-primary" />}
              title="Lightning Fast"
              description="Enjoy seamless streaming with our high-performance infrastructure."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
          Ready to dive in?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Start streaming your favorite music now. It's free, fast, and easy to
          get started.
        </p>
        <Link href="/sign-up">
          <Button
            size="lg"
            className="bg-primary hover:bg-secondary text-white px-8 py-2 rounded-md"
          >
            Create Free Account
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-background container mx-auto py-5 rounded-3xl">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Link className="flex items-center justify-center gap-2" href="/">
                <AudioLines className="h-8 w-8 text-primary" />
                <span className="font-bold text-2xl">
                  Rize
                  <span className="font-light text-foreground/75">PLAY</span>
                </span>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center space-x-6">
              © 2024 RizePlay. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card p-6 border-card border-2 rounded-lg text-center transition-transform hover:scale-105">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="">{description}</p>
    </div>
  );
}
