import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Service } from '@prisma/client'
import Link from 'next/link'

type ServiceProps = {
  service: Service
}

export const ServiceCard: React.FC<ServiceProps> = ({ service }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={service.images[0]}
            alt={service.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-2">{service.name}</CardTitle>
        <CardDescription className="mb-4">
          {service.description.length > 100 ? `${service.description.substring(0, 100)}...` : service.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2 mb-4">
          {service.category.map((cat) => (
            <Badge key={cat} variant="secondary">
              {cat}
            </Badge>
          ))}
        </div>
        <p className="text-lg font-bold">${service.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4">
        <Link href={`/home/services/${service.id}`}><Button className="w-full">Book Now</Button></Link>
      </CardFooter>
    </Card>
  )
}