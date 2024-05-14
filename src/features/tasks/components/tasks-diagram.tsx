'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts';

import { getTasksDiagramData } from '../services';

type TTasksDiagramProps = {
  data: NonNullable<Awaited<ReturnType<typeof getTasksDiagramData>>>;
};

export const TasksDiagram = ({ data }: TTasksDiagramProps) => {
  console.log(data);

  return (
    <ResponsiveContainer width="100%" height="100%" className="mt-2">
      <BarChart width={150} height={40} data={data} barSize={80}>
        <Bar dataKey="taskCount" fill="#e11d48" />
        <XAxis dataKey="title" />
        {/* <YAxis /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};
