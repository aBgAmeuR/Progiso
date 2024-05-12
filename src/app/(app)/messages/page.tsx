import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { CreateConversationDialog } from '@/features/messages/components/create-conversation-dialog';

export default async function MessagesPage() {
  return (
    <main className="flex w-[calc(100vw-193px)]">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
          <div className="flex h-full items-start p-4">
            <div className="flex w-full items-center justify-between gap-2">
              <h1 className="text-lg font-semibold md:text-2xl">Messages</h1>
              <CreateConversationDialog />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={15} minSize={10} maxSize={30}>
              <div className="flex h-full items-center justify-center p-4">
                <span className="font-semibold">Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={85}>
              <div className="flex h-full items-center justify-center p-4">
                <span className="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
