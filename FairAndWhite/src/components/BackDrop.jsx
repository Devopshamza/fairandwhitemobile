import {Box, Modal, Spinner} from 'native-base';
import React from 'react';

const BackDrop = () => {
  return (
    <Modal
      isOpen={true}
      borderRadius="full"
      safeAreaTop={true}
      _backdrop={{
        bg: 'black',
      }}>
      <Modal.Content
        borderWidth="0"
        style={{backgroundColor: 'transparent', borderWidth: 0}}>
        <Modal.Body style={{backgroundColor: 'transparent', borderWidth: 0}}>
          <Box
            alignItems="center"
            bg="red.100"
            style={{backgroundColor: 'transparent', borderWidth: 0}}>
            <Spinner
              size="lg"
              color="primary.700"
              style={{backgroundColor: 'transparent', borderWidth: 0}}
            />
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default BackDrop;
