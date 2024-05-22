import styles from '@/components/property-gallery/components/PropertyGallery.module.scss'
import { ReactNode, useEffect } from 'react'
import { clsx } from 'clsx'
import { BackButton } from '@/components/ui/back-button'
import { animated, useTransition } from 'react-spring'
import { createPortal } from 'react-dom'

interface PropertyGalleryLayoutProps {
  searchComponent: ReactNode
  listComponent: ReactNode
  detailsComponent: ReactNode
  mode?: 'mobile' | 'desktop'
  onBackButtonClick?: () => void
}

export const PropertyGalleryLayout = ({
  searchComponent,
  listComponent,
  detailsComponent,
  mode = 'desktop',
  onBackButtonClick,
}: PropertyGalleryLayoutProps) => {
  const handleBackButtonClick = () => {
    if (onBackButtonClick) {
      onBackButtonClick?.()
    }
  }

  const modalRoot = document.getElementById('modal-root')

  const transition = useTransition(detailsComponent, {
    from: { opacity: 0, x: -400, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    leave: { opacity: 0, x: -400, y: 0 },
  })

  if (mode === 'mobile' && detailsComponent) {
    document.body.style.overflow = 'hidden'
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className={styles.root}>
      <div
        style={{
          overflow: mode === 'mobile' && detailsComponent ? 'hidden' : 'unset',
        }}
        className={clsx(styles.contentLeft)}
      >
        <div className={styles.search}>{searchComponent}</div>
        {listComponent}
      </div>

      {mode === 'desktop' && (
        <div className={clsx(styles.contentRightDesktop)}>
          <div>{detailsComponent}</div>
        </div>
      )}

      {mode === 'mobile' &&
        detailsComponent &&
        createPortal(
          <div className={clsx(styles.contentRightMobile)}>
            {transition((style, item) =>
              item ? (
                <animated.div style={style} className={styles.item}>
                  <div className={styles.backButtonContainer}>
                    <BackButton onClick={handleBackButtonClick} />
                  </div>
                  {detailsComponent}
                </animated.div>
              ) : null
            )}
          </div>,
          modalRoot as Element
        )}
    </div>
  )
}
