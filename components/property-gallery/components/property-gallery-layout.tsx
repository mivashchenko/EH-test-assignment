import styles from '@/components/property-gallery/components/PropertyGallery.module.scss'
import { ReactNode } from 'react'

interface PropertyGalleryLayoutProps {
  searchComponent: ReactNode
  listComponent: ReactNode
  detailsComponent: ReactNode
}

export const PropertyGalleryLayout = ({
  searchComponent,
  listComponent,
  detailsComponent,
}: PropertyGalleryLayoutProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.search}>{searchComponent}</div>
        {listComponent}
      </div>
      <div className={styles.content}>{detailsComponent}</div>
    </div>
  )
}
