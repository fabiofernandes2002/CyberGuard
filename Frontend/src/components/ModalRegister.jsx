import React, {useState, useRef} from 'react';
import {
  Modal,
  HStack,
  Button,
  Input,
  Select,
  VStack,
  Switch,
  Text,
  Checkbox,
} from 'native-base';

function ModalRegister({
  isOwner,
  setIsOwner,
  companyName,
  setCompanyName,
  company,
  setCompany,
}) {
  const [showModal, setShowModal] = useState(true);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleSave = () => {
    const selectedCompanyName = isOwner ? companyName : company;
    console.log('Selected Company Name:', selectedCompanyName);
    setShowModal(false);
  };

  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}>
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Tipo de Utilizador - Empresarial</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              <Checkbox
                value="isOwner"
                isChecked={isOwner}
                onChange={isChecked => setIsOwner(isChecked)}>
                És Propetário?
              </Checkbox>
              {isOwner ? (
                <Input
                  ref={initialRef}
                  placeholder="Dá o nome da sua empresa"
                  onChangeText={text => setCompanyName(text)}
                />
              ) : (
                <Input
                  ref={initialRef}
                  placeholder="Insira o nome da empresa que trabalha"
                  onChangeText={text => setCompany(text)}
                />
              )}
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button onPress={handleSave}>Guardar</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
export default ModalRegister;
