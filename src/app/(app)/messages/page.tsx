import { Suspense } from 'react';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { ConversationHeader } from '@/features/messages/components/conversation-header';
import { ConversationList } from '@/features/messages/components/conversations-list';
import { CreateConversationDialog } from '@/features/messages/components/create-conversation-dialog';
import { MessagesContainer } from '@/features/messages/components/messages-container';

type PageProps = {
  searchParams: {
    id: string;
  };
};

export default async function MessagesPage(props: PageProps) {
  const { id } = props.searchParams;

  return (
    <main className="flex w-[calc(100vw-193px)]">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
          <div className="flex h-full flex-col items-start gap-4 p-4">
            <div className="flex w-full items-center justify-between gap-2">
              <h1 className="text-lg font-semibold md:text-2xl">Messages</h1>
              <CreateConversationDialog />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <ConversationList selectedConversationId={id} />
            </Suspense>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={15} minSize={10} maxSize={30}>
              <ConversationHeader id={id} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={85}>
              <div className="flex h-full p-4">
                <MessagesContainer conversationId={id} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
