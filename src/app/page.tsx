// import { HeroForm } from '@/components/form';
import { Footer } from '@/components/footer';
import { Icons } from '@/components/icons';
import { SignInButton } from '@/components/navbar/sign-in-button';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div>
      <section className="container mt-10 flex flex-col items-center gap-3 text-center md:absolute md:left-1/2 md:top-1/2 md:mt-0 md:-translate-x-1/2 md:-translate-y-1/2">
        <h1 className="mb-1 font-mono text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Project management platform
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Progiso is a project management platform designed to streamline
          project management for small to medium-sized teams.
        </p>
        {/* <div className="mt-1">
          <HeroForm />
        </div> */}
        <div className="mt-2 flex gap-4">
          <Button asChild>
            <SignInButton text="Get Started" />
          </Button>
          <Button variant="outline" asChild>
            <a href="https://github.com/aBgAmeuR/Progiso" target="_blank">
              <Icons.github className="mr-2 size-4" /> Github
            </a>
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
