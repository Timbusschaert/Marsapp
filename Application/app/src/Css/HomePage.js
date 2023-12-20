import { StyleSheet } from 'react-native';

const button = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    borderColor: '#000',
    borderRadius: 4,
    borderWidth: 1,
    boxShadow: '4px 4px 0 #fff, 4px 4px 0 1px #000',
    color: '#fff',
    cursor: 'pointer',
    fontFamily: 'ITCAvantGardeStd-Bk, Arial, sans-serif',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
    margin: '5px 5px 10px 5px',
    overflow: 'visible',
    padding: 20,
    textAlign: 'center',
    textTransform: 'none',
    touchAction: 'manipulation',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    width : '90%',
    height : '15%',
  },
  buttonFocus: {
    textDecoration: 'none',
  },
  buttonHover: {
    textDecoration: 'none',
  },
  buttonActive: {
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.125) inset',
    outline: 0,
  },
  buttonActiveNotDisabled: {
    boxShadow: '2px 2px 0 #fff, 2px 2px 0 1px #000',
    transform: [{ translateX: 2 }, { translateY: 2 }],
  },
  buttonLarge: {
    padding: 12,
  },
});

export default button;