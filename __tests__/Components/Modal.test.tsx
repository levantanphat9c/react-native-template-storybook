import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Text} from 'react-native';

import Modal from '@/Components/Modal';
import {ModalContext} from '@/Components/Modal/ModalWrapper';

const mockModalContext = {
  onPushStackModal: jest.fn(),
  onPopStackModal: jest.fn(),
  stackModal: [],
};

const renderWithContext = (ui: React.ReactElement) => {
  return render(
    <ModalContext.Provider value={mockModalContext}>
      {ui}
    </ModalContext.Provider>,
  );
};

describe('Modal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when not visible', () => {
    const {queryByTestId} = renderWithContext(
      <Modal
        isVisible={false}
        keyModal="test-modal"
        onCloseModal={() => {}}
        testID="modal"
      />,
    );
    expect(queryByTestId('modal')).toBeNull();
  });

  it('renders modal content when visible', () => {
    const {getByText} = renderWithContext(
      <Modal isVisible={true} keyModal="test-modal" onCloseModal={() => {}}>
        <Text>Modal Content</Text>
      </Modal>,
    );
    expect(getByText('Modal Content')).toBeTruthy();
  });

  it('calls onCloseModal when backdrop is pressed', () => {
    const onCloseModal = jest.fn();
    const {getByTestId} = renderWithContext(
      <Modal
        isVisible={true}
        keyModal="test-modal"
        onCloseModal={onCloseModal}
        testID="modal-backdrop"
      />,
    );

    fireEvent.press(getByTestId('modal-backdrop'));
    expect(onCloseModal).toHaveBeenCalled();
  });

  it('does not render backdrop when isCloseBackdrop is false', () => {
    const {queryByTestId} = renderWithContext(
      <Modal
        isVisible={true}
        keyModal="test-modal"
        onCloseModal={() => {}}
        isCloseBackdrop={false}
        testID="modal-backdrop"
      />,
    );

    expect(queryByTestId('modal-backdrop')).toBeNull();
  });

  it('pushes to modal stack when visible', () => {
    renderWithContext(
      <Modal isVisible={true} keyModal="test-modal" onCloseModal={() => {}} />,
    );

    expect(mockModalContext.onPushStackModal).toHaveBeenCalledWith(
      'test-modal',
    );
  });

  it('pops from modal stack when hidden', () => {
    const {rerender} = renderWithContext(
      <Modal isVisible={true} keyModal="test-modal" onCloseModal={() => {}} />,
    );

    rerender(
      <ModalContext.Provider value={mockModalContext}>
        <Modal
          isVisible={false}
          keyModal="test-modal"
          onCloseModal={() => {}}
        />
      </ModalContext.Provider>,
    );

    expect(mockModalContext.onPopStackModal).toHaveBeenCalledWith('test-modal');
  });

  it('applies custom container style', () => {
    const customStyle = {backgroundColor: 'red'};
    const {getByTestId} = renderWithContext(
      <Modal
        isVisible={true}
        keyModal="test-modal"
        onCloseModal={() => {}}
        containerStyle={customStyle}
        testID="modal-container"
      />,
    );

    const container = getByTestId('modal-container');
    expect(container.props.style).toContainEqual(customStyle);
  });
});
