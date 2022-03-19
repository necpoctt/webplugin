import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(
  () => ({
    root: {
      width: '340px',
      height: '70%',
      boxShadow: 'rgb(117 117 117 / 30%) 0px 0px 12px 0px',
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      bottom: '100px',
      right: '20px',
      transition: '.3s',
    },
    open: {
      opacity: '1',
    },
    close: {
      opacity: '0',
    },
  }),
  {
    name: 'App',
  },
);
