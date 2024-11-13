import React from 'react'
import DataGridProducts from '../../components/DataGridProducts'
import styles from './style.module.scss'
function Index() {
  return (
    <> 
      <div className={styles.container}>
        <div className={styles.tile}>
          <h1 className={styles.h1Text}>Produits</h1>
        </div>
        <div className={styles.DataGridContainer}>
          < DataGridProducts />
        </div>
      </div>

    </>
  )
}

export default Index