import { useRequest, useView, view, type ViewRef } from "react-fate";
import type { Environment } from "@app/api/src/trpc/views";
import { ServiceInstanceCard, ServiceInstanceView } from "./service-instance-card";

export const EnvironmentView = view<Environment>()({
  name: true,
  serviceInstances: { items: { node: ServiceInstanceView } },
});

export const ServicesList = ({
  environmentId,
  railwayProjectAccessToken,
}: {
  environmentId: string;
  railwayProjectAccessToken: string;
}) => {
  const { environment: environmentRef } = useRequest(
    {
      environment: {
        args: { railwayProjectAccessToken, environmentId },
        view: EnvironmentView,
      },
    },
    // somehow for now this does not play well with hot reloading
    // {
    //   mode: "network-only",
    // },
  );

  const environment = useView(EnvironmentView, environmentRef);

  return (
    <div>
      <h2 className="text-lg mb-8 mt-4">
        Environment: <span className="font-semibold">{environment.name}</span>
      </h2>
      <ul className="space-y-8">
        {environment.serviceInstances.items.map(({ node }: { node: ViewRef<"ServiceInstance"> }) => (
          <ServiceInstanceCard
            key={node.id}
            serviceInstance={node}
            railwayProjectAccessToken={railwayProjectAccessToken}
            environmentId={environmentId}
          />
        ))}
      </ul>
    </div>
  );
};
