'use client'
import styles from '@/components/property-gallery/components/property-gallery-layout/PropertyGallery.module.scss'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { BackButton } from '@/components/ui/back-button'
import { animated, useTransition } from 'react-spring'
import { createPortal } from 'react-dom'
import { useScreenSize } from '@/hooks/useScreenSize'
import { MOBILE_SCREEN_SIZE } from '@/constant'

interface PropertyGalleryLayoutProps {
  searchComponent: ReactNode
  listComponent: ReactNode
  detailsComponent: ReactNode
  onBackButtonClick?: () => void
}

export const PropertyGalleryLayout = ({
  searchComponent,
  listComponent,
  detailsComponent,
  onBackButtonClick,
}: PropertyGalleryLayoutProps) => {
  const transition = useTransition(detailsComponent, {
    from: { opacity: 0, x: -400, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    leave: { opacity: 0, x: -400, y: 0 },
  })

  const [modalRoot, setModalRoot] = useState<Element | null>(null)

  const screenSize = useScreenSize()
  const hasWindow = typeof window !== 'undefined'

  const isMobile = screenSize.width <= MOBILE_SCREEN_SIZE

  useEffect(() => {
    if (!hasWindow) return

    setModalRoot(window.document.getElementById('modal-root'))
  }, [])

  const setBodyOverflow = (value: string) => {
    window.document.body.style.overflow = value
  }

  useEffect(() => {
    if (!hasWindow) return

    if (isMobile && detailsComponent) {
      setBodyOverflow('hidden')
    } else {
      setBodyOverflow('initial')
    }

    return () => {
      if (!hasWindow) return
      setBodyOverflow('initial')
    }
  }, [detailsComponent])

  const withAnimation = (component: ReactNode) =>
    transition((style, item) =>
      item ? (
        <animated.div style={style} className={styles.animatedItem}>
          {component}
        </animated.div>
      ) : null
    )

  const handleBackButtonClick = () => {
    if (onBackButtonClick) {
      onBackButtonClick?.()
    }
  }

  const ref = useRef<HTMLDivElement>(null)

  const handleRightContainerScroll = useCallback((event: WheelEvent) => {
    if (event.deltaY < 0) {
      // console.log('scrolling up')
      if (ref.current) {
        // console.dir(ref.current)
        // ref.current.style.top = '0px'
        // ref.current.style.alignSelf = 'initial'
      }
    } else if (event.deltaY > 0) {
      // console.log('scrolling down')
    }
  }, [])

  useEffect(() => {
    const currentRef = ref.current
    if (currentRef) {
      currentRef.addEventListener('wheel', handleRightContainerScroll)
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleRightContainerScroll)
      }
    }
  }, [handleRightContainerScroll])

  useEffect(() => {
    if (!ref.current) return
    ref.current.addEventListener('wheel', handleRightContainerScroll)
  }, [ref.current])

  return (
    <div className={styles.root}>
      <div className={clsx(styles.contentLeft)}>
        <div className={styles.search}>{searchComponent}</div>
        {listComponent}
      </div>

      {!isMobile && (
        <div className={clsx(styles.contentRightDesktop)} ref={ref}>
          {detailsComponent}
        </div>
      )}

      {isMobile &&
        detailsComponent &&
        createPortal(
          <div className={clsx(styles.contentRightMobile)}>
            <div className={styles.backButtonContainer}>
              <BackButton onClick={handleBackButtonClick} />
            </div>
            {withAnimation(detailsComponent)}
          </div>,
          modalRoot as Element
        )}
    </div>
  )
}
