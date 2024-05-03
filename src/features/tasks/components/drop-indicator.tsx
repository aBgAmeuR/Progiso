type TDropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

export const DropIndicator = ({ beforeId, column }: TDropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || '-1'}
      data-column={column}
      className="bg-primary my-0.5 h-0.5 w-full opacity-0"
    />
  );
};
