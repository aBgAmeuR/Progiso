import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateProjectForm } from '@/features/projects/components';

export default function CreateProjectPage() {
  return (
    <div className="my-12">
      <div className="container flex justify-center">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>New Project</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateProjectForm />
          </CardContent>
        </Card>
        {/**<div>
         * <CreateProjectCardResult />
         * </div>*/}
      </div>
    </div>
  );
}
