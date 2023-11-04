import { useSignal } from "@preact/signals";
import { Weather } from "$store/components/product/types/climate-shelf.ts";
import { useEffect } from "preact/hooks";

export interface Props {
    temperature: number
}

const GeolocationIsland = ({ temperature }: Props) => {
    const weatherData = useSignal<Weather | undefined>(undefined)
    const lat = useSignal<number | undefined>(undefined)
    const long = useSignal<number | undefined>(undefined)

    useEffect(() => {
        if ('geolocation' in globalThis.window.navigator) {
            window.navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                lat.value = latitude       
                long.value = longitude
            }, () => console.log('deu errado'))
        }
    }, [])

    useEffect(() => {
        async function fetchData () {
            console.log({ latitude: lat.value, longitude: long.value })
            const url = `http://api.weatherapi.com/v1/current.json?key=74cb57e633494293a4a181804230311&q=${lat.value},${long.value}`
        
            const data: Weather = (await fetch(url).then((r) => r.json()).catch((err) => console.log('error: ', err)))

            console.log({ data })

            weatherData.value = data
        }

        if (lat.value && long.value) {
            fetchData()   
        }
    }, [lat.value, long.value])

    useEffect(() => {
        const defaultSHelf = document.querySelector('.defaultShelf')
        const shelfToRender = document.querySelector('.shelfToRender')

        if (!weatherData.value) return

        if (weatherData.value.current.temp_c < temperature) {
            shelfToRender?.classList.toggle('block')
            defaultSHelf?.classList.toggle('hidden')
    
            return
        }

        shelfToRender?.classList.toggle('hidden')
        defaultSHelf?.classList.toggle('block')
    }, [weatherData.value])

    return <></>
}

export default GeolocationIsland