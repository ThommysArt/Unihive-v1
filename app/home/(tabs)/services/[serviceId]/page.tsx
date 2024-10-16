import React, { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { ServiceDetails } from './_components/service-details'
import { getServiceById } from '@/actions/services'
import ServiceOptions from './_components/service-options'
import { Skeleton } from "@/components/ui/skeleton"
import { BackButton } from '@/components/back-button'

const ServicePage = async ({ params }: { params: { serviceId: string } }) => {
  const service = await getServiceById(params.serviceId)

  if (!service) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header */}
      <div className="flex items-center justify-between h-16 w-full border-b py-2 px-6 fixed top-0 backdrop-blur-sm z-50 bg-background/80">
        <div className="flex justify-start gap-3">
          <BackButton />
          <h1 className="text-2xl font-bold truncate">{service.name}</h1>
        </div>
        <ServiceOptions service={service} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 mt-24">
        <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
          <ServiceDetails service={service} />
        </Suspense>
      </div>
    </div>
  )
}

export default ServicePage