import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import type { Product } from 'apps/commerce/types.ts'

import ProductShelf, { ProductShelfProps } from "$store/components/product/ProductShelf.tsx";
import { Weather } from "$store/components/product/types/climate-shelf.ts";

export interface ClimateShelfProps extends Omit<ProductShelfProps, 'products'> {
    defaultShelf: Product[] | null
    shelfToRender: Product[] | null
    temperature: number
}

function ClimateShelf ({ defaultShelf, shelfToRender, temperature, ...restOfProps }: ClimateShelfProps) {
    const weatherData = useSignal<Weather | undefined>(undefined)
    const lat = useSignal<number | undefined>(undefined)
    const long = useSignal<number | undefined>(undefined)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                lat.value = latitude       
                long.value = longitude
            })
        }
    }, [])

    useEffect(() => {
        async function fetchData () {
            const url = `http://api.weatherapi.com/v1/current.json?key=74cb57e633494293a4a181804230311&q=${lat},${long}`
        
            const { data } = (await fetch(url).then((r) => r.json())) as { data: Weather }
        
            weatherData.value = data
        }

        if (lat && long) {
            fetchData()   
        }
    }, [lat, long])

    console.log('antes do if')
    if (weatherData.value) {
        console.log('entrou no 1 if')
        if (weatherData.value.current.temp_c < temperature) {
            console.log('entrou no 2 if')
            return <ProductShelf products={shelfToRender} {...restOfProps}  />
        }
    }

    console.log('antes da default')
    return <ProductShelf products={defaultShelf} {...restOfProps} />
}

export default ClimateShelf