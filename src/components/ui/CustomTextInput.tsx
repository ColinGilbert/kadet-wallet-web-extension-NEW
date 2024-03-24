import { styled } from '@mui/system';
import FormControl  from '@mui/material/FormControl';

const CustomTextInput = styled(FormControl)`
  && {
    margin: 1;
    width: 320px;
    height: 32px;

    & .MuiOutlinedInput-root {
      & fieldset {
        border-color: #8b9389; /* Customize default border color */
        border-width: 1px; /* Customize default border size */
        border-radius: 8px; /* Customize border radius */
      }
      &:hover fieldset {
        border-color: #c4c7c5; /* Customize hover border color */
      }
      &.Mui-focused fieldset {
        border-color: #86d992; /* Customize focus border color */
      }
      &.Mui-disabled fieldset {
        /* Customize disabled border color */
        border-color: #313633;
      }
      &.Mui-error fieldset {
        /* Customize error border color */
        border-color: #ffb4ab;
      }
      &.error-focused .MuiOutlinedInput-root.Mui-focused fieldset {
        border-color: #ffb4ab; /* Customize focus border color when there's an error */
        /* Customize focus text color when there's an error */
      }
    }
    & .MuiInputLabel-root {
      color: #8b9389; /* Customize input label color */
      font-weight: 400; /* Customize input label font weight */
      &.Mui-focused {
        color: #86d992; /* Customize focused input label color */
      }
      &.Mui-disabled {
        color: #313633; /* Customize disabled input label color */
      }
      &.Mui-error {
        color: #ffb4ab; /* Customize error input label color */
      }
    }
    & .MuiOutlinedInput-input {
      color: #c4c7c5; /* Customize text color in input field */
      &.Mui-focused {
        font-size: 18px; /* Customize focused input writing font size */
      }
      &.Mui-disabled {
        /* Customize disabled text color */
        color: #313633;
      }
      &.Mui-error {
        /* Customize error text color */
        color: #ffb4ab;
      }
    }

    & .custom-helper-text {
      color: #c1c9be;
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
    }

    & .custom-helper-text-error {
      color: #ffb4ab;
    }

    & .MuiIconButton-root {
      color: #8b9389; /* Customize icon button color */
      &:hover {
        color: #c4c7c5; /* Customize hover icon button color */
      }
      &:disabled {
        color: #313633; /* Customize disabled icon button color */
      }
      &.Mui-focusVisible {
        color: #c4c7c5; /* Customize focused icon button color */
      }
    }
  }
`;

export default CustomTextInput;
