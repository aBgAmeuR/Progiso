import {
  ChevronRightIcon,
  Github,
  ListTodo,
  MessagesSquareIcon,
} from 'lucide-react';

export const PageFeatures = () => {
  return (
    <>
      {/* Icon Blocks */}
      <div className="container py-24 lg:py-32">
        {/* Grid */}
        <div className="grid gap-12 md:grid-cols-2">
          <div className="lg:w-3/4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Experience Seamless Project Management
            </h2>
            <p className="text-muted-foreground mt-3">
              In Progiso, every feature is meticulously designed to elevate your
              project management experience. From the intuitive dashboard to the
              seamless GitHub integration, Progiso streamlines your workflow and
              fosters collaboration like never before.
            </p>
            <p className="mt-5">
              <a
                className="group inline-flex items-center gap-x-1 font-medium underline-offset-4 hover:underline "
                href="/projects"
              >
                Get Started
                <ChevronRightIcon className="size-4 shrink-0 transition ease-in-out group-hover:translate-x-1" />
              </a>
            </p>
          </div>
          {/* End Col */}
          <div className="space-y-6 lg:space-y-10">
            {/* Icon Block */}
            <div className="flex">
              {/* Icon */}
              <span className="bg-primary text-primary-foreground inline-flex size-[46px] shrink-0 items-center justify-center rounded-full border">
                <MessagesSquareIcon className="size-5 shrink-0" />
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base font-semibold sm:text-lg">
                  Seamless Messaging System
                </h3>
                <p className="text-muted-foreground mt-1">
                  Efficiently communicate with your team members through
                  Progiso&apos;s integrated messaging system. Share updates,
                  discuss tasks, and collaborate in real-time, all within the
                  platform.
                </p>
              </div>
            </div>
            {/* End Icon Block */}
            {/* Icon Block */}
            <div className="flex">
              {/* Icon */}
              <span className="bg-primary text-primary-foreground inline-flex size-[46px] shrink-0 items-center justify-center rounded-full  border">
                <ListTodo className="size-5 shrink-0" />
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base font-semibold sm:text-lg">
                  Customizable Task Boards
                </h3>
                <p className="text-muted-foreground mt-1">
                  Organize your workflow with customizable Kanban boards
                  tailored to your team&apos;s preferences. Easily track tasks
                  from conception to completion, ensuring nothing falls through
                  the cracks.
                </p>
              </div>
            </div>
            {/* End Icon Block */}
            {/* Icon Block */}
            <div className="flex">
              {/* Icon */}
              <span className="bg-primary text-primary-foreground inline-flex size-[46px] shrink-0 items-center justify-center rounded-full border">
                <Github className="size-5 shrink-0" />
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base font-semibold sm:text-lg">
                  GitHub Integration
                </h3>
                <p className="text-muted-foreground mt-1">
                  Link your GitHub repositories directly to your projects in
                  Progiso. Streamline development workflows, manage code
                  repositories, and seamlessly coordinate between project
                  management and version control.
                </p>
              </div>
            </div>
            {/* End Icon Block */}
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Icon Blocks */}
    </>
  );
};
