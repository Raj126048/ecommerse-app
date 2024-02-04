import React from 'react'
import { Modal } from 'antd'
const CustomModel = (props) => {
    const {open,hideModal,performAction,title}=props
  return (
    <div>
           <Modal
        title="Modal"
        open={open}
        onOk={performAction}
        onCancel={hideModal}
        okText="OK"
        cancelText="CANCEL"
      >
        <p>{title}</p>
      </Modal>
    </div>
  )
}

export default CustomModel