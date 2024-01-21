import JsonViewer from "@/app/components/JsonViewer";
import { readOrder } from "@/lib/orders";

export default async function Order({
  params,
}: {
  params: { sessionId: string };
}) {
  const orderJsonString = await readOrder(params.sessionId);
  const orderJson = JSON.parse(orderJsonString);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h2 className="text-xl">
        Order for punchout {params.sessionId} completed
      </h2>
      <section>
        <h3 className="text-l mb-4 mt-4">Order JSON</h3>
        <JsonViewer json={orderJson} />
      </section>
    </main>
  );
}
