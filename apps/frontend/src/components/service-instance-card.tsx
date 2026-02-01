import { useFateClient, useView, view, type ViewRef } from "react-fate";
import type { Deployment, Service, ServiceInstance } from "@app/api/src/trpc/views";
import { Button } from "@/components/ui/button";
import { useActionState, useTransition } from "react";

const latestDeploymentView = view<Deployment>()({
  id: true,
  status: true,
});

const serviceView = view<Service>()({
  id: true,
  name: true,
});

export const ServiceInstanceView = view<ServiceInstance>()({
  id: true,
  numReplicas: true,
  sleepApplication: true,
  service: serviceView,
  latestDeployment: latestDeploymentView,
});

export const ServiceInstanceCard = ({
  serviceInstance: serviceInstanceRef,
  railwayProjectAccessToken,
  environmentId,
}: {
  serviceInstance: ViewRef<"ServiceInstance">;
  railwayProjectAccessToken: string;
  environmentId: string;
}) => {
  const serviceInstance = useView(ServiceInstanceView, serviceInstanceRef);
  const service = useView(serviceView, serviceInstance.service);
  const latestDeployment = useView(latestDeploymentView, serviceInstance.latestDeployment);

  const fate = useFateClient();

  const [isPending, startTransition] = useTransition();
  const [, syncServiceInstance] = useActionState(fate.actions.serviceInstance.sync, null);
  const [, redeployServiceInstance] = useActionState(fate.actions.serviceInstance.redeploy, null);
  const [, enableServerless] = useActionState(fate.actions.serviceInstance.enableServerless, null);
  const [, removeDeployment] = useActionState(fate.actions.serviceInstance.deploymentRemove, null);
  const [, updateReplicas] = useActionState(fate.actions.serviceInstance.updateReplicas, null);

  const buttonConfig = [
    {
      variant: "sync" as const,
      children: "Sync",
      onClick: () =>
        startTransition(() =>
          syncServiceInstance({
            input: {
              railwayProjectAccessToken,
              environmentId,
              serviceId: service.id,
            },
            view: ServiceInstanceView,
          }),
        ),
    },
    {
      variant: "redeploy" as const,
      children: "Redeploy",
      onClick: () =>
        startTransition(() =>
          redeployServiceInstance({
            input: {
              railwayProjectAccessToken,
              environmentId,
              serviceId: service.id,
            },
            view: ServiceInstanceView,
          }),
        ),
    },
    {
      variant: "surface" as const,
      children: "Scale up",
      onClick: () =>
        startTransition(() =>
          updateReplicas({
            input: {
              railwayProjectAccessToken,
              environmentId,
              serviceId: service.id,
              numReplicas: Math.min(serviceInstance.numReplicas + 1, 10),
            },
            view: ServiceInstanceView,
          }),
        ),
    },
    {
      variant: "surface" as const,
      children: "Scale down",
      disabled: serviceInstance.numReplicas <= 0,
      onClick: () =>
        startTransition(() =>
          updateReplicas({
            input: {
              railwayProjectAccessToken,
              environmentId,
              serviceId: service.id,
              numReplicas: Math.max(serviceInstance.numReplicas - 1, 0),
            },
            view: ServiceInstanceView,
          }),
        ),
    },
    {
      variant: "sleep" as const,
      children: "Enable Serverless",
      onClick: () =>
        startTransition(() =>
          enableServerless({
            input: {
              railwayProjectAccessToken,
              environmentId,
              serviceId: service.id,
              enabled: true,
            },
            view: ServiceInstanceView,
          }),
        ),
    },
    {
      variant: "wake" as const,
      children: "Disable Serverless",
      onClick: () =>
        startTransition(() =>
          enableServerless({
            input: {
              railwayProjectAccessToken,
              environmentId,
              serviceId: service.id,
              enabled: false,
            },
            view: ServiceInstanceView,
          }),
        ),
    },
    {
      variant: "destructive" as const,
      children: "Remove deployment",
      disabled: !latestDeployment?.id || isPending,
      onClick: () =>
        startTransition(() =>
          removeDeployment({
            input: {
              railwayProjectAccessToken,
              environmentId,
              serviceId: service.id,
              deploymentId: latestDeployment!.id,
            },
            view: ServiceInstanceView,
          }),
        ),
    },
  ];

  return (
    <li className="rounded-xl overflow-hidden p-6 bg-card-surface">
      <p className="text-center font-semibold text-foreground">{service.name}</p>
      <p className="text-left text-sm text-foreground mt-4">Current number of replicas: {serviceInstance.numReplicas}</p>
      <p className="text-left text-sm text-foreground mt-4">Latest deployment status: {latestDeployment?.status ?? "No deployments yet"}</p>
      <p className="text-left text-sm text-foreground mt-4">Serverless enabled: {serviceInstance.sleepApplication ? "Yes" : "No"}</p>
      <div className="flex flex-col items-stretch gap-2 mt-4 w-full min-w-[140px]">
        {buttonConfig.map(({ variant, children, onClick, disabled }) => (
          <Button key={children} variant={variant} className="w-full" disabled={isPending || disabled} onClick={onClick}>
            {children}
          </Button>
        ))}
      </div>
    </li>
  );
};
