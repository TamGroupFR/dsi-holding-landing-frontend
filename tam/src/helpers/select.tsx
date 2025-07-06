export const selectStyles = {
  '&.MuiInputBase-root .MuiSelect-select.MuiSelect-outlined': {
    width: '100%',
    padding: '10px 16px',
  },
  '& .MuiSelect-icon': {
    top: 'calc(50% - 12px)',
  },
  '&.MuiInputBase-root .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ECEDF0',
  },
  '&.MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#081E37',
    borderWidth: '1px',
  },
  '&.MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#081E37',
  },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
