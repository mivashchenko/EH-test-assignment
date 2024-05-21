import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { useDotButton } from '@/components/ui/carousel/hooks/use-dot-button'
import { DotButton } from '@/components/ui/carousel/components/dot-button'
import { ReactNode } from 'react'

type PropType = {
  slides: ReactNode[]
  options?: EmblaOptionsType
  buttonWrapperRenderer: (buttons: ReactNode) => ReactNode
  buttonRenderer: (
    index: number,
    selectedIndex: number,
    onDotButtonClick: () => void
  ) => ReactNode
}

export const Carousel: React.FC<PropType> = (props) => {
  const { slides, options, buttonWrapperRenderer, buttonRenderer } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  return (
    <section className='embla'>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container'>
          {slides.map((slide, index) => (
            <div className='embla__slide' key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      {scrollSnaps.length > 1 && (
        <div className='embla__controls'>
          {buttonWrapperRenderer(
            scrollSnaps.map((_: any, index: number) => {
              return buttonRenderer(index, selectedIndex, () =>
                onDotButtonClick(index)
              )
            })
          )}
        </div>
      )}
    </section>
  )
}
