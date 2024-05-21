import styles from './PropertyCard.module.scss'
import { PropsWithChildren, ReactNode } from 'react'
import { clsx } from 'clsx'
import { IconLabel } from '@/components/ui/icon-label'
import { Icons } from '@/components/ui/icons'

interface PropertyCardProps {
  children: ReactNode
  selected?: boolean
}

export const PropertyCard = ({ children }: PropertyCardProps) => {
  return <div className={clsx(styles.root)}>{children}</div>
}

const PropertyCardHead = ({ children }: PropsWithChildren) => {
  return <div className={styles.head}>{children}</div>
}

interface PropertyCardHeadLabelsProps {
  floorPlanName: string | undefined
  houseStyleName: string | undefined
}

const PropertyCardHeadLabels = ({
  floorPlanName,
  houseStyleName,
}: PropertyCardHeadLabelsProps) => {
  return (
    <div className={styles.headLabels}>
      <IconLabel
        icon={<Icons.FloorPlan />}
        value={floorPlanName}
        background={'grey'}
      />
      <IconLabel
        icon={<Icons.PaintBrush />}
        value={houseStyleName}
        background={'grey'}
      />
    </div>
  )
}

interface PropertyCardImageProps {
  src?: string
}

const PropertyCardImage = ({ src }: PropertyCardImageProps) => {
  return (
    <figure className={styles.imageWrapper}>
      <img src={src} alt={'Property card image'} />
    </figure>
  )
}

const PropertyCardContent = ({ children }: PropsWithChildren) => {
  return <div className={styles.content}>{children}</div>
}

interface PropertyCardChipProps {
  content: string
}

const PropertyCardStatusLabel = ({ content }: PropertyCardChipProps) => {
  return <span className={styles.statusLabel}>{content}</span>
}

interface PropertyCardPriceProps {
  content: number
}

const PropertyCardPrice = ({ content }: PropertyCardPriceProps) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 3,
  }).format(content)

  return <h3 className={styles.price}>{formattedPrice}</h3>
}

interface PropertyCardAddressProps {
  content: string
}

const PropertyCardAddress = ({ content }: PropertyCardAddressProps) => {
  return <p className={styles.address}>{content}</p>
}

interface PropertyCardDescriptionProps {
  content: string
}

const PropertyCardDescription = ({ content }: PropertyCardDescriptionProps) => {
  return <p className={styles.description}>{content}</p>
}

export const PropertyCardChipValue = ({ content }: { content: number }) => {
  return <span className={styles.chipValue}>{content}</span>
}

export const PropertyCardChipUnit = ({ content }: { content: string }) => {
  return <span className={styles.chipUnit}>{content}</span>
}

export const PropertyCardChip = ({ children }: PropsWithChildren) => {
  return <span className={styles.chip}>{children}</span>
}

interface PropertyCardFloorPlanDetailsProps {
  details: {
    value?: number
    unit?: string
  }[]
}

const PropertyCardChipContainer = ({
  details,
}: PropertyCardFloorPlanDetailsProps) => {
  return (
    <p className={styles.chipContainer}>
      {details.map((detail, idx) => {
        if (!detail.value || !detail.unit) return null
        return (
          <PropertyCardChip key={idx}>
            <PropertyCardChipValue content={detail.value} />
            &nbsp;
            <PropertyCardChipUnit content={detail.unit} />
          </PropertyCardChip>
        )
      })}
    </p>
  )
}

export {
  PropertyCardHead,
  PropertyCardHeadLabels,
  PropertyCardImage,
  PropertyCardContent,
  PropertyCardStatusLabel,
  PropertyCardPrice,
  PropertyCardAddress,
  PropertyCardDescription,
  PropertyCardChipContainer,
}
