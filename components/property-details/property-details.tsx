import { Property } from '@/types'
import { getPropertyImageUrl } from '@/utils/getPropertyImageUrl'
import styles from './style.module.scss'
import {
  PropertyDetailsCard,
  PropertyDetailsCardAddress,
  PropertyDetailsCardDescription,
  PropertyDetailsCardIconLabelContainer,
  PropertyDetailsCardPrice,
} from '@/components/property-details-card'
import { IconLabel } from '../ui/icon-label'
import {
  FloorPlanColoredIcon,
  FloorPlanIcon,
  PaintBrushColoredIcon,
  PaintBrushIcon,
} from '@/components/ui/icons/icons'
import { Divider } from '../ui/divider'

interface PropertyDetailsProps {
  property: Property
}
export const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  return (
    <div className={styles.root}>
      <figure className={styles.imageTitleWrapper}>
        <img
          src={(property && getPropertyImageUrl(property)) || ''}
          alt={'rf'}
        />
      </figure>
      <PropertyDetailsCard>
        <PropertyDetailsCardPrice content={property.price} />
        <PropertyDetailsCardAddress content={property.streetAddress} />
        <PropertyDetailsCardDescription content={property.neighborhood.name} />
        <PropertyDetailsCardIconLabelContainer>
          <IconLabel
            icon={<FloorPlanColoredIcon />}
            value={property?.floorPlan?.name}
            background={'white'}
          />
          <Divider direction={'vertical'} />
          <IconLabel
            icon={<PaintBrushColoredIcon />}
            value={property?.houseStyle?.name}
            background={'white'}
          />
        </PropertyDetailsCardIconLabelContainer>
      </PropertyDetailsCard>
    </div>
  )
}
