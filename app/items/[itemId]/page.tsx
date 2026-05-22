import ItemDetail from '@/app/_components/item-detail';

interface ItemPageProps {
  params: Promise<{
    itemId: string;
  }>;
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { itemId } = await params;

  return <ItemDetail itemId={Number(itemId)} />;
}
