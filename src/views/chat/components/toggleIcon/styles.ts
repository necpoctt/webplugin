import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(
  () => ({
    icon: {
      width: '64px',
      height: '64px',
      background: 'rgb(55, 171, 237)',
      position: 'absolute',
      borderRadius: '16px',
      cursor: 'pointer',
      transition: 'transform 0.16s linear 0s, opacity 0.08s linear 0s',
      border: 'none',
      bottom: '20px',
      right: '20px',
    },
    down: {
      fill: 'rgb(255, 255, 255)',
    },
  }),
  {
    name: 'ToggleIcon',
  },
);
