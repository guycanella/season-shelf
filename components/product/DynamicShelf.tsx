import type { Product } from 'apps/commerce/types.ts'
import { useId } from '$store/sdk/useId.ts'
import { usePlatform } from '$store/sdk/usePlatform.tsx'
import Icon from '$store/components/ui/Icon.tsx'
import Header from '$store/components/ui/SectionHeader.tsx'
import Slider from '$store/components/ui/Slider.tsx'
import SliderJS from '$store/islands/SliderJS.tsx'
import ProductCard from '$store/components/product/ProductCard.tsx'

interface VariantDatetime {
  type: 'data'
  /**
   * @title Start range at date
   * @format time
   */
  variantStart: string
  /**
   * @title End range at date
   * @format time
   */
  variantEnd: string
  products: Product[] | null
}

interface VariantClimate {
  type: 'clima'
  /**
   * @title Start range at climate
   */
  variantStart: number
  /**
   * @title End range at climate
   */
  variantEnd: number
  products: Product[] | null
}

interface VariantSeason {
  type: 'estacao'
  /**
   * @title Estação
   */
  variantActive: 'verão' | 'inverno'
  products: Product[] | null
}

export interface Props {
  variations: VariantDatetime[] | VariantClimate[] | VariantSeason[]
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

export default function DaynamicShelf({ defaultShelf, variations }: Props) {
  const id = useId()
  const platform = usePlatform()

  const validateVariation = variations.find(
    (item) =>
      item.type === 'data' &&
      checkTimeIsValid(item.variantStart, item.variantEnd)
  )

  const renderProduct = validateVariation?.products ?? defaultShelf

  if (renderProduct?.length)
    return (
      <div class="w-full container  py-8 flex flex-col gap-12 lg:gap-16 lg:py-10">
        <Header
          title={
            validateVariation?.products ? 'Shelf Por Clima' : 'Shelf Default'
          }
          alignment="left"
        />

        <div
          id={id}
          class="container grid grid-cols-[48px_1fr_48px] px-0 sm:px-5"
        >
          {' '}
          <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5">
            {renderProduct?.map((product, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-[270px] sm:w-[292px] first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
              >
                <ProductCard
                  product={product}
                  // itemListName={title}
                  // layout={cardLayout}
                  platform={platform}
                  index={index}
                />
              </Slider.Item>
            ))}
          </Slider>
          <>
            <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
              <Slider.PrevButton class="btn btn-circle btn-outline absolute right-1/2 bg-base-100">
                <Icon size={24} id="ChevronLeft" strokeWidth={3} />
              </Slider.PrevButton>
            </div>
            <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
              <Slider.NextButton class="btn btn-circle btn-outline absolute left-1/2 bg-base-100">
                <Icon size={24} id="ChevronRight" strokeWidth={3} />
              </Slider.NextButton>
            </div>
          </>
          <SliderJS rootId={id} />
        </div>
      </div>
    )
}
