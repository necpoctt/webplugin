import useStyles from './styles';

const ToggleIcon = (props: {
  onToggle: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  isToggle: boolean;
}) => {
  const classes = useStyles();
  const { onToggle } = props;

  const icon = () => {
    if (props.isToggle) {
      return (
        <img
          src="https://play-lh.googleusercontent.com/4kHZ0qbjN_zZGfD3Dh7JZcV7557pmORteqSEHxFpx9c2pS-HgMhnVyB1wgYq8s189nwm=s180-rw"
          srcSet="https://play-lh.googleusercontent.com/4kHZ0qbjN_zZGfD3Dh7JZcV7557pmORteqSEHxFpx9c2pS-HgMhnVyB1wgYq8s189nwm=s360-rw 2x"
          className="T75of sHb2Xb"
          aria-hidden="true"
          alt="電影海報圖片"
          itemProp="image"
          data-atf="false"
          data-iml="8608.045000000857"
          width="50px"
          height="50px"
        />
      );
    }
    return (
      <svg
        className={classes.down}
        focusable="false"
        viewBox="0 0 16 14"
        width="28"
        height="25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M.116 4.884l1.768-1.768L8 9.232l6.116-6.116 1.768 1.768L8 12.768.116 4.884z"
        />
      </svg>
    );
  };

  return (
    <button className={classes.icon} type="button" onClick={onToggle}>
      {icon()}
    </button>
  );
};
export default ToggleIcon;
