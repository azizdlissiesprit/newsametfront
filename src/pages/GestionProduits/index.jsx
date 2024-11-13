import React from 'react'
import styles from './style.module.scss'
import FormikProduits from '../../components/FormikProducts'
function index() {
  return (
    <div className={styles.container}>
        <h1 className={styles.h1Text}>Gestion Produits</h1>
        <FormikProduits/>
    </div>
  )
}

export default index