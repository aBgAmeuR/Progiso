import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { getTasksDiagramData } from '../services';
import { TasksDiagram } from './tasks-diagram';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const TasksCardDiagram = async () => {
  const data = await getTasksDiagramData();
  if (!data) return null;

  return (
    <Card>
      <CardHeader className="bg-muted/20 p-4">
        <h2 className="text-lg font-semibold">Distribution of tasks</h2>
      </CardHeader>
      <Separator />
      <CardContent className="h-64 w-full">
        <TasksDiagram data={data} />
      </CardContent>
      <Separator />
      <CardFooter className="group flex justify-center divide-y p-4">
        <Link href="/tasks" className="flex items-center gap-2">
          <p className="text-primary font-semibold">View Kanban</p>
          <ArrowRight
            size={20}
            className="text-primary transition-transform delay-75 group-hover:translate-x-1"
          />
        </Link>
      </CardFooter>
    </Card>
  );
};
