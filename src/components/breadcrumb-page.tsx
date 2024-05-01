import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage as BreadcrumbPageComponent,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type TTaskPageProps = {
  pageName: string;
};

export const BreadcrumbPage = ({ pageName }: TTaskPageProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/board">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPageComponent>{pageName}</BreadcrumbPageComponent>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
