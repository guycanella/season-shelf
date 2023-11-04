import type { Product } from 'apps/commerce/types.ts'
import ProductShelf, { ProductShelfProps } from "$store/components/product/ProductShelf.tsx";
import { VariantDatetime } from "$store/components/product/DynamicShelf.tsx";

export interface Props extends Omit<ProductShelfProps, 'products'>{
  variations: VariantDatetime[]
  /**
   * @title Pratilheira padrão
   * @description Sera exibidos esses produtos para caso não ouver variações validas para exibição
   */
  defaultShelf: Product[] | null
}

function convertInMilliseconds(
  hours: number,
  minutes: number,
  seconds: number
) {
  return (hours * 60 * 60 + minutes * 60 + seconds) * 1000
}

function checkTimeIsValid(startTime: string, endTime: string) {
  const currentDateTime = new Date()

  const startTimeConvert = startTime.split(':').map((item) => Number(item))
  const endTimeConvert = endTime.split(':').map((item) => Number(item))

  const currentTimeInMilliseconds = convertInMilliseconds(
    currentDateTime.getHours(),
    currentDateTime.getMinutes(),
    currentDateTime.getSeconds()
  )

  const startTimeInMilleseconds = convertInMilliseconds(
    startTimeConvert[0],
    startTimeConvert[1],
    startTimeConvert[2]
  )
  const endTimeInMilleseconds = convertInMilliseconds(
    endTimeConvert[0],
    endTimeConvert[1],
    endTimeConvert[2]
  )

  return (
    startTimeInMilleseconds < currentTimeInMilliseconds &&
    currentTimeInMilliseconds < endTimeInMilleseconds
  )
}

export default function TimeShelf ({ defaultShelf, variations, ...restOfProps }: Props) {
  const validateVariation = variations.find(
    (item) =>
      item.type === 'data' &&
      checkTimeIsValid(item.variantStart, item.variantEnd)
  )

  const renderProduct = validateVariation?.products ?? defaultShelf

  if (renderProduct?.length)
    return <ProductShelf products={defaultShelf} {...restOfProps} />
}