import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import {
  getToken,
  initToken,
  getMessages,
  organizationId,
} from '../../features/messageSlice';
import FacebookAuth from './components/facebookAuth';

const Chat = require('twilio-chat');

let chatClient: any;
let generalChannel: any;

const Index = () => {
  const classes = useStyles();
  const orgId = useSelector(organizationId);
  const [messages, setMessages] = useState<any>([]);
  const [isLoad, setIsload] = useState(false);
  const myRef: any = useRef(null);

  const joinChannel = useCallback(async () => {
    try {
      await generalChannel.join();
    } catch {
      console.log('already');
    }
  }, []);

  const connectTwilio = async () => {
    const responset: any = await getToken();
    const { twilioToken } = responset;

    chatClient = await Chat.Client.create(twilioToken);
  };

  const scrollEnd = () => {
    myRef.current && myRef.current.scroll(0, myRef.current.scrollHeight);
  };

  const getMessage = async () => {
    const responseMsg: any = await getMessages();
    const oldMessages = responseMsg.result.map((d: any) => ({
      class: 'me',
      message: d.body,
    }));
    setMessages(oldMessages);
  };

  const signIn = async () => {
    await getMessage();
    scrollEnd();
    await connectTwilio();
    await chatClient.getSubscribedChannels();
    generalChannel = await chatClient.getChannelByUniqueName('general2');
  };

  const printMessage = useCallback((fromUser: any, message: any) => {
    const currentUser: any = JSON.parse(localStorage.getItem('super8') || '{}');
    if (fromUser === currentUser.uid) {
      setMessages((d: any) => [...d, { class: 'me', message }]);
    } else {
      setMessages((d: any) => [...d, { message }]);
    }
    scrollEnd();
  }, []);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    if (e.key === 'Enter') {
      generalChannel.sendMessage(e.target.value, {
        organizationId: orgId,
      });
      e.target.value = '';
    }
  };

  const createOrJoinGeneralChannel = useCallback(async () => {
    try {
      generalChannel = await chatClient.getChannelByUniqueName('general2');
    } catch {
      generalChannel = chatClient.createChannel({
        uniqueName: 'general2',
        friendlyName: 'General Chat Channel2',
      });
    } finally {
      await joinChannel();
      generalChannel.on('messageAdded', (message: any) => {
        printMessage(message.author, message.body);
      });
    }
  }, [joinChannel, printMessage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser: any = JSON.parse(
          localStorage.getItem('super8') || '{}',
        );
        if (!currentUser.uid) {
          await initToken();
        } else {
          await getMessage();
        }

        await connectTwilio();
        await chatClient.getSubscribedChannels();
        await createOrJoinGeneralChannel();

        setIsload(true);
        scrollEnd();
      } catch (e) {
        console.log(e);
        throw new Error('Unable to get token, please reload this page');
      }
    };

    fetchData();
  }, [createOrJoinGeneralChannel]);

  if (isLoad) {
    return (
      <div className={classes.main}>
        <FacebookAuth onSignIn={signIn} />
        <div className={classes.content} ref={myRef}>
          {messages.map((d: any) => (
            <div className={d.class && classes.me} key={d.message}>
              {d.message}
            </div>
          ))}
        </div>
        <input type="text" placeholder="請輸入訊息" onKeyDown={handleKeyDown} />
      </div>
    );
  }

  return (
    <div className={classes.loading}>
      <img
        src="https://console.no8.io/static/media/logo-super-8-color.4d8b565a5635488e4cc4a8e1df92ccbf.svg"
        alt="logo"
      />
    </div>
  );
};

export default Index;
