import styles from './style.module.scss'
import { ReactNode } from 'react'
import { Divider } from '../ui/divider'

const PropertyDetailsCard = ({ children }: { children: ReactNode }) => {
  return <div className={styles.root}>{children}</div>
}

const PropertyDetailsCardPrice = ({ content }: { content: number }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 3,
  }).format(content)

  return <h3 className={styles.price}>{formattedPrice}</h3>
}

const PropertyDetailsCardAddress = ({ content }: { content: string }) => {
  return <p className={styles.address}>{content}</p>
}

const PropertyDetailsCardDescription = ({ content }: { content: string }) => {
  return <p className={styles.description}>{content}</p>
}

const PropertyDetailsCardIconLabelContainer = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <div>
      <Divider direction={'horizontal'} />
      <div className={styles.iconLabelContainer}>{children}</div>
      <Divider direction={'horizontal'} />
    </div>
  )
}

interface PropertyDetailsCardButtonContainerProps {
  topButtons: ReactNode
  bottomButtons: ReactNode
}

const PropertyDetailsCardButtonContainer = ({
  topButtons,
  bottomButtons,
}: PropertyDetailsCardButtonContainerProps) => {
  return (
    <div className={styles.buttonsContainer}>
      <button className={styles.buttonsContainer_block}>{topButtons}</button>
      <button className={styles.buttonsContainer_block}>{bottomButtons}</button>
    </div>
  )
}

export {
  PropertyDetailsCard,
  PropertyDetailsCardPrice,
  PropertyDetailsCardAddress,
  PropertyDetailsCardDescription,
  PropertyDetailsCardIconLabelContainer,
  PropertyDetailsCardButtonContainer,
}
