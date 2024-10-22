import prismadb from '@/lib/prismadb';
import { DescriptionsForm } from './components/description-form';

const DescriptionsPage = async ({
  params,
}: {
  params: { descriptionId: string };
}) => {
  const size = await prismadb.description.findUnique({
    where: {
      id: params.descriptionId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DescriptionsForm initialData={size} />
      </div>
    </div>
  );
};
export default DescriptionsPage;
