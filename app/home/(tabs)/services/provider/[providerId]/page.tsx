import React, { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { ProviderDetails } from './_components/provider-details'
import { ProviderServices } from './_components/provider-services'
import { getProviderById } from '@/actions/services'
import { Skeleton } from "@/components/ui/skeleton"

const ProviderPage = async ({ params }: { params: { providerId: string } }) => {
  const provider = await getProviderById(params.providerId)

  if (!provider) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header */}
      <div className="flex items-center justify-between h-16 w-full border-b py-2 px-6 fixed top-0 backdrop-blur-sm z-50 bg-background/80">
        <h1 className="text-2xl font-bold truncate">{provider.name}</h1>
      </div>

      {/* Content */}
      <div className="container md:mx-auto px-4 my-20 mx-2 mb-12 space-y-8">
        <Suspense fallback={<Skeleton className="w-full h-[200px]" />}>
          <ProviderDetails provider={{
            ...provider,
            name: provider.name ?? '',
            image: provider.image ?? undefined
          }} />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
          <ProviderServices providerId={provider.id} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProviderPage