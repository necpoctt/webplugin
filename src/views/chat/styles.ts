import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(
  () => ({
    main: {
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: ' 1 1 auto',
      backgroundColor: 'rgb(240, 240, 240)',
      padding: '16px',
      overflowY: 'scroll',
      height: '100%',
      flexBasis: '0!important',
    },
    me: {
      textAlign: 'right',
    },
    loading: {
      justifyContent: 'center',
      display: 'flex',
      alignItems: 'center',
      height: '100%',
    },
  }),
  {
    name: 'chat',
  },
);
