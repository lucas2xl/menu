export default function ProductPage({
  params,
}: {
  params: { slug: string; id: string };
}) {
  return (
    <div>
      <h1>
        Product {params.id} from store {params.slug}
      </h1>
    </div>
  );
}
