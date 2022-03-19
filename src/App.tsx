import { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import Chat from './views/chat';
import ToggleIcon from './views/chat/components/toggleIcon/index';
import { setOrganizationId } from './features/messageSlice';

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isShowPanel, setIsShowPanel] = useState(false);

  useEffect(() => {
    window.addEventListener(
      'message',
      e => {
        try {
          const data = JSON.parse(e.data);
          if (data.key === 'getObjectId') {
            dispatch(setOrganizationId(data.value));
          }
        } catch {
          // console.log('already');
        }
      },
      false,
    );
    window.parent.postMessage({ key: 'getObjectId' }, '*');
  }, [dispatch]);

  const onToggle = (value: boolean) => {
    window.parent.postMessage({ key: 'toogle', value }, '*');
    setIsShowPanel(value);
  };

  return (
    <>
      <div
        className={classnames(
          classes.root,
          isShowPanel ? classes.open : classes.close,
        )}
      >
        {isShowPanel && <Chat />}
      </div>
      <ToggleIcon
        isToggle={!isShowPanel}
        onToggle={() => onToggle(!isShowPanel)}
      />
    </>
  );
};

export default App;
