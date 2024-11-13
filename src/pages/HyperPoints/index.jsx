import React from 'react'
import FormikHyperPoints from '../../components/FormikHyperPoints'
import styles from './style.module.scss'

function index() {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1Text}>Pop Ups</h1>
      <FormikHyperPoints/>
    </div>
  )
}

export default index