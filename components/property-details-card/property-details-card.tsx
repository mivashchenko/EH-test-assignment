import styles from './PropertyDetailsCard.module.scss'
import { ReactNode } from 'react'
import { Divider } from '../ui/divider'
import { format } from 'date-fns'

const PropertyDetailsCard = ({ children }: { children: ReactNode }) => {
  return <div className={styles.root}>{children}</div>
}

const PropertyDetailsCardHeader = ({ children }: { children: ReactNode }) => {
  return <div className={styles.header}>{children}</div>
}

const PropertyDetailsCardHeaderClosing = ({
  label,
  value,
}: {
  label: string
  value: string
}) => {
  return (
    value && (
      <div className={styles.headerClosing}>
        <div className={styles.headerClosingLabel}>{label}</div>
        <div className={styles.headerClosingValue}>
          {format(value, 'MMMM d, yyyy')}
        </div>
      </div>
    )
  )
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

const PropertyDetailsCardButtonContainer = ({
  children,
}: {
  children: ReactNode
}) => {
  return <div className={styles.buttonsContainer}>{children}</div>
}

const PropertyDetailsCardButtonContainerBlock = ({
  children,
}: {
  children: ReactNode
}) => {
  return <div className={styles.buttonsContainer_block}>{children}</div>
}

const PropertyDetailsCardDataGridContainer = ({
  children,
}: {
  children: ReactNode
}) => {
  return <div className={styles.dataGridContainer}>{children}</div>
}

const PropertyDetailsCardDataGridRow = ({
  children,
}: {
  children: ReactNode
}) => {
  return <div className={styles.dataGridRow}>{children}</div>
}

const PropertyDetailsCardDataGridRowCell = ({
  children,
}: {
  children: ReactNode
}) => {
  return <div className={styles.dataGridRowCell}>{children}</div>
}

const PropertyDetailsCardDataGridRowCellLabel = ({
  children,
}: {
  children: ReactNode
}) => {
  return <div className={styles.dataGridRowCellLabel}>{children}</div>
}

const PropertyDetailsCardDataGridRowCellValue = ({
  children,
}: {
  children: ReactNode
}) => {
  return <div className={styles.dataGridRowCellValue}>{children}</div>
}

export {
  PropertyDetailsCard,
  PropertyDetailsCardHeader,
  PropertyDetailsCardHeaderClosing,
  PropertyDetailsCardPrice,
  PropertyDetailsCardAddress,
  PropertyDetailsCardDescription,
  PropertyDetailsCardIconLabelContainer,
  PropertyDetailsCardButtonContainer,
  PropertyDetailsCardButtonContainerBlock,
  PropertyDetailsCardDataGridContainer,
  PropertyDetailsCardDataGridRow,
  PropertyDetailsCardDataGridRowCell,
  PropertyDetailsCardDataGridRowCellLabel,
  PropertyDetailsCardDataGridRowCellValue,
}
