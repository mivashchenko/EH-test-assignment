import styles from './style.module.scss'
import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface PropertyCardProps {
  children: ReactNode
  selected?: boolean
}

export const PropertyCard = ({ children, selected }: PropertyCardProps) => {
  return (
    <div className={clsx(styles.propertyCard)}>
      <div className={clsx(selected && styles.selected)}>{children}</div>
    </div>
  )
}

const PropertyCardImage = ({ image }: { image?: string }) => {
  return (
    <figure className={styles.propertyImageWrapper}>
      <img
        src={image}
        alt={'property.titleImage?.alt || property.floorPlan?.titleImage?.alt'}
      />
    </figure>
  )
}

const PropertyCardContent = ({ children }: { children: ReactNode }) => {
  return <div className={styles.content}>{children}</div>
}

const PropertyCardBadge = ({ content }: { content: string }) => {
  return <span className={styles.badge}>{content}</span>
}

const PropertyCardPrice = ({ content }: { content: number }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 3,
  }).format(content)

  return <h3 className={styles.price}>{formattedPrice}</h3>
}

const PropertyCardAddress = ({ content }: { content: string }) => {
  return <p className={styles.address}>{content}</p>
}

const PropertyCardDescription = ({ content }: { content: string }) => {
  return <p className={styles.description}>{content}</p>
}

const PropertyCardFloorPlanDetails = ({
  details,
}: {
  details: {
    value?: number
    unit?: string
  }[]
}) => {
  return (
    <p className={styles.floorPlanDetails}>
      {details.map((detail, idx) => {
        if (!detail.value) return null
        return (
          <span key={idx} className={styles.floorPlanDetailsItem}>
            <span className={styles.floorPlanDetailsItemValue}>
              {detail.value}
            </span>
            &nbsp;
            <span className={styles.floorPlanDetailsItemUnit}>
              {detail.unit}
            </span>
          </span>
        )
      })}
    </p>
  )
}

const PropertyCardHead = ({ children }: { children: ReactNode }) => {
  return <div className={styles.head}>{children}</div>
}

const PropertyCardHeadLabelsContainer = ({
  children,
}: {
  children: ReactNode
}) => {
  return <div className={styles.headLabels}>{children}</div>
}

export {
  PropertyCardHead,
  PropertyCardHeadLabelsContainer,
  PropertyCardImage,
  PropertyCardContent,
  PropertyCardBadge,
  PropertyCardPrice,
  PropertyCardAddress,
  PropertyCardDescription,
  PropertyCardFloorPlanDetails,
}
