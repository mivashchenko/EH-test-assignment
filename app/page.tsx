import styles from './home-page.module.scss'
import { Logo } from '@/components/logo/logo'
import { getPropertyList } from '@/data/propertyList'
import { PropertyGallery } from '@/components/property-gallery'

export default async function Home() {
  const propertyList = await getPropertyList()

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <Logo />
      </header>
      <section className={styles.content}>
        <PropertyGallery propertyList={propertyList} />
      </section>
    </main>
  )
}
